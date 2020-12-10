// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = Number(urlParams.get("id"))

    const save = document.getElementById("save");
    const deleted = document.getElementById("delete");

    const item = getTeamById();

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