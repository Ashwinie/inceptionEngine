var  admin = require('firebase-admin');
// Fetch the service account key JSON file contents
var serviceAccount = require("../constants/serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://inception-3662c.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");
//to save to database
var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});
//to read data once
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
//to update a particular one
var hopperRef = usersRef.child("gracehop");
hopperRef.update({
  "nickname": "Amazing Grace"
});
// to update multiple contents
usersRef.update({
  "alanisawesome": {
    "nickname": "Alan The Machine"
  },
  "gracehop": {
    "nickname": "Amazing Grace"
  }
});
