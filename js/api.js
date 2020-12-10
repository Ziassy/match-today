const base_url = "https://api.football-data.org/v2/";
const endPointTeams = `${base_url}competitions/2021/teams`
const endPointStanding = `${base_url}competitions/2021/standings`
const endPointMatches = `${base_url}competitions/2021/matches?matchday=1`
const fetchData = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      'X-Auth-Token': `f2eb8d781da04c64847d43d537872c8d`
    }
  })
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
  function showTeams(data) {
    let teamsHTML = "";
    data.teams.forEach(team => {
      teamsHTML += `
      <div class="col s12 m3" >
      <div class="card">
              <div class="card-image">
                  <a href="./detail-teams.html?id=${team.id}">
                  <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${team.name}">
              </div>
              <div class="card-content">
              </div>
          </div>
      </div>
          `;
    });
    document.getElementById("teams").innerHTML = teamsHTML;
  }

  if ("caches" in window) {
    caches.match(endPointTeams).then(response => {
      if (response) {
        response.json().then(data => {
          showTeams(data);
        });
      }
    });
  }
  fetchData(endPointTeams)
    .then(status)
    .then(json)
    .then(data => {
      showTeams(data);
    })
    .catch(error);
}

function getStandings() {
  function showStanding(data) {
    let standingHTML = "";
    data.standings[0].table.forEach(standing => {
      standingHTML += `
            <tr>
            <td>
                <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${standing.team.name}">
            </td>
            <td class="hide-on-small-only">${standing.team.name}</td>
            <td>${standing.playedGames}</td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td>${standing.goalsFor}</td>
            <td>${standing.goalsAgainst}</td>
            <td>${standing.goalDifference}</td>
            </tr>
            `;
    });
    document.getElementById("standing-content").innerHTML = standingHTML;
  }

  if ("caches" in window) {
    caches.match(endPointStanding).then(response => {
      if (response) {
        response.json().then(data => {
          showStanding(data);
        });
      }
    });
  }

  fetchData(endPointStanding)
    .then(status)
    .then(json)
    .then(data => {
      showStanding(data);
    })
    .catch(error);
}


function getMatches() {
  function showMatches(data) {
    let matchesHTML = "";
    data.matches.forEach(match => {
      matchesHTML += `
            <div class="col s12 m6">
            <div class="card horizontal" style="height:180px">
                <div class="card-stacked">
                    <div class="card-content">
                        <div class="col s12">
                            <p class="center">${match.season.startDate}</p>
                        </div>
                        <li class="col s4">
                            <div class="homeTeam">
                                <img src="../assets/images/${match.homeTeam.id}.svg" alt="${match.homeTeam.name}" class="center-block circle responsive-img">
                            </div>
                        </li>
                        <li class="vs col s4">
                            <h6 class="center">VS</h6>
                        </li>
                        <li class="col s4">
                            <div class="awayTeam">
                                <img src="../assets/images/${match.awayTeam.id}.svg" alt="${match.awayTeam.name}" class="center-block circle responsive-img">
                            </div>
                        </li>
                        </ul>
                        <div class="col s6">
                            <p>${match.homeTeam.name}</p>
                        </div>
                        <div class="col s6">
                            <p class="float-right">${match.awayTeam.name}</p>
                        </div>
                        <div class="col s12">
                            <p class="center"><strong>${match.status}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                `;
    });
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("matches-day").innerHTML = matchesHTML;

  }

  if ("caches" in window) {
    caches.match(endPointMatches).then(response => {
      if (response) {
        response.json().then(data => {
          showMatches(data);
        });
      }
    });
  }
  fetchData(endPointMatches)
    .then(status)
    .then(json)
    .then(data => {
      showMatches(data);
    })
    .catch(error);
}

//menampilkan halaman teams
function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    function showDetailTeams(data) {
      let detailsHTML = `
      <div class="card">
      <img class="materialboxed center-block" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${data.name}">
      <h4 class="center">${data.name}</h4>
      <div class="row">
        <div class="col s12 m12">
          <div class="card horizontal">
            <table>
              <tbody>
                <tr>
                  <th><h5>Contact: </h5></th>
                  <td></td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td class="green-text">${data.name}</td>
                </tr>
                <tr>
                  <th>Founded</th>
                  <td class="green-text">${data.founded}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td class="green-text">${data.address}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td class="green-text">${data.phone}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td class="green-text">${data.email}</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td class="green-text">${data.website}</td>
                </tr>
                <tr>
                  <th>Venue</th>
                  <td class="green-text">${data.venue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    `;
      document.getElementById("preloader").innerHTML = "";
      document.getElementById("body-content").innerHTML = detailsHTML;
      resolve(data);

    }

    if ("caches" in window) {
      caches.match(`${base_url}teams/${idParam}`).then(response => {
        if (response) {
          response.json().then(data => {
            showDetailTeams(data);
          });
        }
      });
    }

    fetchData(`${base_url}teams/${idParam}`)
      .then(status)
      .then(json)
      .then(data => {
        showDetailTeams(data);
      });
  });
}


function getSavedTeams() {
  getAll().then(favorite => {
    let favTeamHTML = "";
    favorite.forEach(fav => {
      favTeamHTML += `
      <div class="col s12 m3" >
        <div class="card" >
                  <div class="card-image medium">
                      <a href="./detail-teams.html?id=${fav.id}&saved=true">
                      <img src="${fav.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${fav.name}">
                      </a>
                      <a class="btn-floating halfway-fab waves-effect waves-light red" id="deleted" onclick="deletedTeam(${fav.id})"><i class="material-icons">delete</i></a>
                  </div>
               <div class="card-content">
             </div>
          </div>
        </div>
                `;
    });

    if (!favTeamHTML) {
      document.getElementById("details").innerHTML = `<p class="grey-text center">Tidak ada team favorite</p>`;
    } else {
      document.getElementById("details").innerHTML = favTeamHTML;
    }
  });
}

function getSavedTeamsById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  getById(idParam).then(teams => {
    showDetailTeams(teams);
  });
}

