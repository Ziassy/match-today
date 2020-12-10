import { getTeams, getStandings, getMatches, getSavedTeam } from "./helper/api-helper.js";

let page = window.location.hash.substr(1);
let path = window.location.pathname;

if (path === "index.html" || path === "") {
    page = "home"
}

if (page === "") {
    page = "home";
}


const loadNav = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status !== 200) return;

            // Muat daftar tautan menu
            document.querySelectorAll(".topnav").forEach(elm => {
                elm.innerHTML = xhttp.responseText;
            });
            // Daftarkan event listener untuk setiap tautan menu
            document
                .querySelectorAll(".topnav a")
                .forEach(elm => {
                    elm.addEventListener("click", event => {
                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
        }
    };
    xhttp.open("GET", "../component/nav.html", true);
    xhttp.send();
}


const loadPage = (page) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");

            if (page === "home") {
                getTeams();
            } else if (page === "saved") {
                getSavedTeam();
            } else if (page === "standing") {
                getStandings();
            } else if (page === "match") {
                getMatches();
            }

            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            }
        }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
}

export { loadNav, loadPage }