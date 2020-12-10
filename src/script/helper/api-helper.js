import {
  teams, standings, saved, detailTeam, matches,
} from '../data/TemplateData';
import { getAll, getById } from './db-helper';
import '../../css/style.css';

const BaseUrl = 'https://api.football-data.org/v2/';
const endPointTeams = `${BaseUrl}competitions/2021/teams`;
const endPointStanding = `${BaseUrl}competitions/2021/standings`;
const endPointMatches = `${BaseUrl}competitions/2021/matches?matchday=1`;
const fetchData = (url) => fetch(url, {
  method: 'GET',
  headers: {
    'X-Auth-Token': 'f2eb8d781da04c64847d43d537872c8d',
  },
});

function stopLoading() {
  const loading = document.getElementById('preloader');
  loading.classList.add('hide-pre');
}

function status(response) {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
}
function json(response) {
  return response.json();
}

function error(Error) {
  document.querySelector('#body-content').innerHTML = '<h5 class="center">Seems like you do not have internet connection</h5>';
  stopLoading();
  console.log(`Error : ${Error}`);
}

const getTeams = () => {
  if ('caches' in window) {
    caches.match(endPointTeams).then((response) => {
      if (response) {
        response.json().then((data) => {
          teams(data);
        });
      }
    });
  }
  fetchData(endPointTeams)
    .then(status)
    .then(json)
    .then((data) => {
      teams(data);
      stopLoading(data);
    })
    .catch(error);
};

const getStandings = () => {
  if ('caches' in window) {
    caches.match(endPointStanding).then((response) => {
      if (response) {
        response.json().then((data) => {
          standings(data);
        });
      }
    });
  }

  fetchData(endPointStanding)
    .then(status)
    .then(json)
    .then((data) => {
      standings(data);
      stopLoading(data);
    })
    .catch(error);
};

const getMatches = () => {
  if ('caches' in window) {
    caches.match(endPointMatches).then((response) => {
      if (response) {
        response.json().then((data) => {
          matches(data);
        });
      }
    });
  }
  fetchData(endPointMatches)
    .then(status)
    .then(json)
    .then((data) => {
      matches(data);
      stopLoading(data);
    })
    .catch(error);
};

const getDetailById = () => new Promise((resolve, reject) => {
  // Ambil nilai query parameter (?id=)
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');

  if ('caches' in window) {
    caches.match(`${BaseUrl}teams/${idParam}`).then((response) => {
      if (response) {
        response.json().then((data) => {
          detailTeam(data);
        });
      }
    });
  }

  fetchData(`${BaseUrl}teams/${idParam}`)
    .then(status)
    .then(json)
    .then((data) => {
      detailTeam(data);
      stopLoading(data);
      resolve(data);
      reject(data);
    })
    .catch(error);
});

const getSavedTeam = () => {
  getAll().then((favorite) => {
    saved(favorite);
    stopLoading(favorite);
  });
};

const getSavedTeamsById = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');

  getById(idParam).then((team) => {
    detailTeam(team);
    stopLoading(team);
  });
};

export {
  getTeams, getStandings, getMatches, getDetailById, getSavedTeam, getSavedTeamsById,
};
