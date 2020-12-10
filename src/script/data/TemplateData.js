const teams = (data) => {
  let teamsHTML = "";
  data.teams.forEach(team => {
    teamsHTML += `
      <div class="col s12 m3" >
      <div class="card">
              <div class="card-image">
                  <a href="../detail-teams.html?id=${team.id}">
                  <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${team.name}"> </a>
              </div>
              <div class="card-content">
              </div>
          </div>
      </div>
      `;
  });
  document.getElementById("teams").innerHTML = teamsHTML;
}

const standings = (data) => {
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

const matches = (data) => {
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
                        <img src="../images/${match.homeTeam.id}.svg" alt="${match.homeTeam.name}" class="center-block circle responsive-img" crossorigin="anonymous">
                    </div>
                </li>
                <li class="vs col s4">
                    <h6 class="center">VS</h6>
                </li>
                <li class="col s4">
                    <div class="awayTeam">
                        <img src="../images/${match.awayTeam.id}.svg" alt="${match.awayTeam.name}" class="center-block circle responsive-img" crossorigin="anonymous">
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
  document.getElementById("matches-day").innerHTML = matchesHTML;
}


const saved = (favorite) => {
  let favTeamHTML = "";
  favorite.forEach(fav => {
    favTeamHTML += `
    <div class="col s12 m3" >
    <div class="card">
            <div class="card-image">
                <a href="../detail-teams.html?id=${fav.id}">
                <img src="${fav.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${fav.name}"> </a>
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
}

const detailTeam = (data) => {
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
  document.getElementById("body-content").innerHTML = detailsHTML;
}

export { teams, standings, saved, detailTeam, matches }