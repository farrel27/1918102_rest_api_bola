const ApiKey = "c4969ed9645f4c3cabc21d0770b9b217";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Primer Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded} <br>
                       Markas: ${team.venue}
                    </p>
                    <a href="#" data-id="${team.id}" class="secondary-content"><i class="material-icons" data-id="${team.id}">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>';
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn=>{
                btn.onclick=(event)=>{
                    showTeamInfo(event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function showTeamInfo(id){
    title.innerHTML = "Detail Tim"
    let url = baseUrl + "teams/" + id;
    fetch(url, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            let detail = `
                <div class="row">
                    <div class="col s12">
                        <div class="card red">
                            <div class="card-content white-text">
                                <div class="col s5 right">
                                <img class ="responsive-img" src="${resJson.crestUrl}" width="300px">
                                </div>
                                <span class="card-title" style="font-weight:bold;">${resJson.name}</span>
                                <br>
                                <p>Didirikan pada tahun : ${resJson.founded}</p>
                                <br>
                                <p>Stadion Utama : ${resJson.venue}.</p>
                                <br>
                                <p>Warna Khas Tim : ${resJson.clubColors}</p>
                                <br>
                                <p class="left-align">Alamat Kantor: ${resJson.address}</p>
                                <br>
                                <p class="left-align">Website Resmi : ${resJson.website}</p>
                                <br>
                                <font class="left-align">Kontak : ${resJson.phone}</font> | 
                                <font class="right-align">Email : ${resJson.email}</font>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            let i = 1;
            let table = "";
            resJson.squad.forEach(squads => {
                table += `
                    <tr>
                        <td>${i++}</td>
                        <td>${squads.name}</td>
                        <td>${squads.position}</td>
                        <td>${squads.dateOfBirth}</td>
                        <td>${squads.nationality}</td>
                        <td>${squads.role}</td>
                    </tr>
                `;
            });
            contents.innerHTML = detail +
                `
                <div class="card red">
                        <div class="card-content white-text">
                            <span class="card-title" style="font-weight:bold;">Daftar Pemain</span>
                            <table class="stripped responsive-table">
                                    <th>No.</th>
                                    <th>Nama Pemain</th>
                                    <th>Posisi</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Kebangsaan</th>
                                    <th>Status</th>
                                <tbody>
                                    ${table}
                                </tbody>
                            </table>
                        </div>
                    </div>
            `;
        }).catch(err => {
            console.error(err);
        })
    
}

function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});