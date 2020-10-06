var admin = require("firebase-admin");

var serviceAccount = require("./config/fir-server-e405f-firebase-adminsdk-dnc42-39eb759b13.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-server-e405f.firebaseio.com"
});
module.exports = admin;