const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BM1TgzriayJjp1HdsUiDu7oR42ZkG-BtPedFPAr_JEbN_SkWeFOlSDtYBca5wDfe1IXkv6wBXFdb_tehcTCGdfs',
  privateKey: '9UnS2VleJsJFwPx556oK9gHM0LcLtN_j4IX_hRERr-U',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/cgHi4se5YYU:APA91bFyU5KjpdHBI1sPm7wCitaPBLZ_yLAOnx00Z42TVSGcrOu-SKHQx4C87UBqG4Cv8_V8GXxmIfcoBZewZ_FhE0nXvDXYolq0pBK22C7aZf1rnC402PPkbM7RoJ7OkdkF0jYZftUl',
  keys: {
    p256dh: 'BLfeo+qUJJV+LGembihc4wKptSWxOtGjdS96w2DAdCBHbPSkTPo8enb5+b+OsVGr6e8FBW0/tuBQsVkEICqJlyM=',
    auth: 'KhlFbXpGObKhAXDdla0aOA==',
  },
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
  gcmAPIKey: '743411083136',
  TTL: 60,
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
