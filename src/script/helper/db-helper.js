/* eslint-disable no-undef */
/* eslint-disable radix */
const { default: idb } = require('./idb');

const dbPromised = idb.open('football-app', 1, (upgradeDb) => {
  const teamsObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: 'id',
  });
  teamsObjectStore.createIndex('name', 'name', {
    unique: false,
  });
});

const saveForLater = (team) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction('teams', 'readwrite');
      const store = tx.objectStore('teams');
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      M.toast({ html: `${team.name} berhasil di simpan`, classes: 'rounded green-light' });
      const title = 'Match Today Notifkasi';
      const options = {
        body: `${team.name} berhasil di simpan`,
        icon: `${team.crestUrl.replace(/^http:\/\//i, 'https://')}`,
        badge: './icons/icon.png',
      };
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
        });
      } else {
        console.error('Fitur notifikasi tidak diijinkan!');
      }
    });
};

const getAll = () => new Promise((resolve) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction('teams', 'readonly');
      const store = tx.objectStore('teams');
      return store.getAll();
    })
    .then((teams) => {
      resolve(teams);
    });
});

const getById = (id) => new Promise((resolve) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction('teams', 'readonly');
      const store = tx.objectStore('teams');
      return store.get(parseInt(id));
    })
    .then((team) => {
      resolve(team);
    });
});

const checkFav = (id) => new Promise((resolve, reject) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction('teams', 'readonly');
      const store = tx.objectStore('teams');
      return store.get(parseInt(id));
    })
    .then((team) => {
      if (team) {
        resolve(true);
      } else {
        reject();
      }
    });
});

const deletedTeam = (team) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction('teams', 'readwrite');
      const store = tx.objectStore('teams');
      store.delete(team);
      return tx.complete;
    })
    .then(() => {
      M.toast({ html: 'club berhasil di hapus', classes: 'rounded red-light' });
    });
};

export {
  saveForLater, getAll, getById, deletedTeam, checkFav,
};
