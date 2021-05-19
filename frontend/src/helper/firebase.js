// const firebase = require("firebase/app").default;
// // require("firebase/auth");
// require("firebase/database");

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };
// const USER_TABLE_NAME = process.env.REACT_APP_USER_TABLE_NAME;

// let firebaseDb;

// const init = () => {
//   const app = firebase.initializeApp(firebaseConfig);
//   firebaseDb = app.database().ref();
// };

// init();
const BACKEND_PROTOCOL = process.env.REACT_APP_BACKEND_PROTOCOL;
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

const ERROR_MESSAGE = "Something went wrong. Please try again later.";

const formatHTTPResponse = (httpResponse) => {
  if (httpResponse.ok && httpResponse.status === 200) {
    return httpResponse.json();
  }
  return { isSuccess: false, message: ERROR_MESSAGE };
};
const formatErrorResponse = (error) => {
  return { isSuccess: false, message: error.message || ERROR_MESSAGE };
};

const APIPath = (endPoint, params) => {
  let querystring = "";
  if (params) {
    querystring = `${querystring}&${Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&")}`;
  }
  const path = `${BACKEND_PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}/user/${endPoint}`;

  return querystring === "" ? path : `${path}?${querystring}`;
};

const header = (payload) => {
  const headers = {
    "Content-type": "application/json",
    ...(payload.token && { Authorization: payload.token }),
    ...payload.headers,
  };

  if (headers["Content-type"] === null) {
    delete headers["Content-type"];
  }

  Object.keys(headers).forEach((key) => !headers[key] && delete headers[key]);

  return headers;
};

const onUpdate = () => {
  // firebaseDb.child(USER_TABLE_NAME).on("value", (snapshot) => {
  //   const data = snapshot.val();
  //   if (data != null) {
  //     callback(Object.keys(data).map((id) => ({ id, ...data[id] })));
  //   } else {
  //     callback([]);
  //   }
  // });

  return fetch(APIPath("user-list", {}), {
    method: "GET",
    headers: header({}),
  })
    .then((response) => formatHTTPResponse(response))
    .catch((error) => formatErrorResponse(error));
};

const create = (obj) => {
  // firebaseDb.child(USER_TABLE_NAME).push(obj, (err) => {
  //   if (err) {
  //     console.log(err);
  //     callback(err);
  //     return;
  //   }
  //   callback(null);
  // });

  return fetch(APIPath("user-create", {}), {
    method: "POST",
    headers: header({}),
    body: JSON.stringify(obj),
  })
    .then((response) => formatHTTPResponse(response))
    .catch((error) => formatErrorResponse(error));
};

const update = (uid, obj) => {
  // firebaseDb.child(`${USER_TABLE_NAME}/${id}`).set(obj, (err) => {
  //   if (err) {
  //     console.log(err);
  //     callback(err);
  //     return;
  //   }
  //   callback(null);
  // });

  return fetch(APIPath("user-update", {}), {
    method: "POST",
    headers: header({}),
    body: JSON.stringify({ uid, ...obj }),
  })
    .then((response) => formatHTTPResponse(response))
    .catch((error) => formatErrorResponse(error));
};

const remove = (uid) => {
  // firebaseDb.child(`${USER_TABLE_NAME}/${id}`).remove((err) => {
  //   if (err) {
  //     callback(err);
  //     return;
  //   }
  //   callback(null);
  // });

  return fetch(APIPath("user-delete", {}), {
    method: "POST",
    headers: header({}),
    body: JSON.stringify({ uid }),
  })
    .then((response) => formatHTTPResponse(response))
    .catch((error) => formatErrorResponse(error));
};

// const detachListener = () => {
//   firebaseDb.off();
// };

const firebaseUtil = {
  // detachListener,
  onUpdate,
  create,
  update,
  delete: remove,
};

export default firebaseUtil;
