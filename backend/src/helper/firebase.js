import { FIREBASE_DATABASE_URL } from './settings'

const admin = require('firebase-admin')

const serviceAccount = require('../../serviceAccountKey.json')

const init = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DATABASE_URL
  })
}

init()

const allUserList = () => {
  const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    return admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        const arr = listUsersResult.users.map((userRecord) => {
          const { uid, email, passwordHash, passwordSalt } = userRecord.toJSON()
          return { uid, email, passwordHash, passwordSalt }
        })
        return arr

        // if (listUsersResult.pageToken) {
        //   // List next batch of users.
        //   listAllUsers(listUsersResult.pageToken)
        // }
      })
      .catch((error) => error.message || 'Could not fetch')
  }
  // Start listing users from the beginning, 1000 at a time.
  return listAllUsers()
}

const create = (obj) => {
  return admin
    .auth()
    .createUser(obj)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid)
      return userRecord.uid
    })
    .catch((error) => error.message || 'Could not create')
}

const update = (uid, obj) => {
  return admin
    .auth()
    .updateUser(uid, obj)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      const { uid, email, passwordHash, passwordSalt } = userRecord.toJSON()
      return { uid, email, passwordHash, passwordSalt }
    })
    .catch((error) => error.message || 'Could not update')
}

const remove = (uid) => {
  return admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      return
    })
    .catch((error) => error.message || 'Could not delete')
}

const firebaseUtil = {
  allUserList,
  create,
  update,
  delete: remove
}

export default firebaseUtil
