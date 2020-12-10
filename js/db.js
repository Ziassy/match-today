const dbPromised = idb.open("football-app", 1, upgradeDb => {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(team) {
  dbPromised
    .then(db => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      store.add(team);
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: `${team.name} berhasil di simpan`, classes: `rounded green-light` })
      const title = 'Match Today Notifkasi'
      const options = {
        'body': `${team.name} berhasil di simpan`,
        'icon': `../assets/images/${team.id}.svg`,
        'badge': '../assets/icons/icon.png'
      }
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(title, options);
        });
      } else {
        console.error('Fitur notifikasi tidak diijinkan!');
      }

    });

}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(teams => {
        resolve(teams);
      });
  });
}


function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then(team => {
        resolve(team);
      });
  });
}

function checkFav(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then(team => {
        if (team) {
          resolve(true);
        } else {
          reject();
        }
      });
  });
}

function deletedTeam(team) {
  dbPromised
    .then(db => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      store.delete(team)
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: `Club berhasil di hapus`, classes: `rounded red-light` })
      DeletedNotification();
    });
  const deletedInside = document.getElementById("delete");
  const deletedTeam = document.getElementById("deleted");

  if (deletedTeam) {
    getSavedTeams();
  }
  if (deletedInside) {
    console.log("Club berhasil di hapus");
  }
}
