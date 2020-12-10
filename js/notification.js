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

// REQUEST API UNTUK PERTAMA KALI
document.addEventListener("DOMContentLoaded", function () {
    let page = window.location.hash.substr(1);
});

// Periksa fitur Notification API
if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
    Notification.requestPermission().then(result => {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }

        if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(registration => {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BPWoxkVYKu9INQ9T_Gc4W-PxqjVSDL4T1rdT4C0tupOpFG89mjX-wqaG8HvhCVZmI0eV0V2sqGsdc7ki5_g8lXA")
                }).then(subscribe => {
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(e => {
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                });
            });
        }
    });
}



function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


function DeletedNotification() {
    const title = 'Match Today Notification';
    const options = {
        'body': 'club berhasil di hapus',
        'icon': '../assets/icons/icon.png',
        'badge': '../assets/icons/icon.png'
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}
