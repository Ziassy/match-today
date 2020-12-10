const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPWoxkVYKu9INQ9T_Gc4W-PxqjVSDL4T1rdT4C0tupOpFG89mjX-wqaG8HvhCVZmI0eV0V2sqGsdc7ki5_g8lXA",
    "privateKey": "08sC_4kYFufNaMkULksYIyv3tQptHab-JdxH2qboKIo"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fK20voNtahE:APA91bHvKy5zE96aK8oP6tOGC5IsWDdqvNLVeVIhM0taI5E7jQPqU1SA9_0shY_aLjwoig3ainZ-ISMhA5Qxq6RHxRyd1SwS8Vyoy377585u3bBeWc5i9lhpIiktmuUO9ysgIC8fGkDA",
    "keys": {
        "p256dh": "BOn4YAmb51hROpQtevvOiID6nfSbhb57D8KfGRXx+mMepyNR/EwLcCcEpgB/AXBGcl9VfYmlJzIzjJRlUo0n9Co=",
        "auth": "NZTy8z1fOLoh27KC48+foQ=="
    }
};
const payload = 'Congratulation ! your payload work perfectly';

const options = {
    gcmAPIKey: '818906305398',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);