import "regenerator-runtime";
import "materialize-css/dist/css/materialize.min.css";
import 'materialize-css/dist/js/materialize.js';
import { getDetailById } from "./script/helper/api-helper.js";
import { saveForLater, checkFav, deletedTeam } from "./script/helper/db-helper.js";


document.addEventListener("DOMContentLoaded", function () {
    getDetailById();

    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = Number(urlParams.get("id"))

    const save = document.getElementById("save");
    const deleted = document.getElementById("delete");

    const item = getDetailById();

    checkFav(isFromSaved)
        .then((message) => {
            save.style.display = 'none';
            deleted.style.display = 'block';
        }).catch((message) => {
            save.style.display = 'block';
            deleted.style.display = 'none';
        })

    save.onclick = () => {
        item.then(team => {
            saveForLater(team)
            save.style.display = 'none';
            deleted.style.display = 'block';
        });
    };

    deleted.onclick = () => {
        deletedTeam(isFromSaved);
        save.style.display = 'block';
        deleted.style.display = 'none';
    };
});
