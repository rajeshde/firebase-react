const firebase = require("firebase/app").default;
// require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const USER_TABLE_NAME = process.env.REACT_APP_USER_TABLE_NAME;

let firebaseDb;

const init = () => {
  const app = firebase.initializeApp(firebaseConfig);
  firebaseDb = app.database().ref();
};

init();

const onUpdate = (callback) => {
  firebaseDb.child(USER_TABLE_NAME).on("value", (snapshot) => {
    const data = snapshot.val();
    if (data != null) {
      callback(Object.keys(data).map((id) => ({ id, ...data[id] })));
    } else {
      callback([]);
    }
  });
};

const create = (obj, callback) => {
  firebaseDb.child(USER_TABLE_NAME).push(obj, (err) => {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    callback(null);
  });
};

const update = (id, obj, callback) => {
  firebaseDb.child(`${USER_TABLE_NAME}/${id}`).set(obj, (err) => {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    callback(null);
  });
};

const remove = (id, callback) => {
  firebaseDb.child(`${USER_TABLE_NAME}/${id}`).remove((err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

const detachListener = () => {
  firebaseDb.off();
};

const firebaseUtil = {
  detachListener,
  onUpdate,
  create,
  update,
  delete: remove,
};

export default firebaseUtil;
