import "regenerator-runtime";
import "materialize-css/dist/css/materialize.min.css";
import "./css/style.css";
import { loadNav, loadPage } from "./script/nav.js";
import "./main.js";

document.addEventListener("DOMContentLoaded", function () {
    let page = window.location.hash.substr(1);

    if (page === "") {
        page = "home";
    }
    loadNav();
    loadPage(page);
});

