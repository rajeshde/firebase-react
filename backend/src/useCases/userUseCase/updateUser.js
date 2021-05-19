const updateUser =
  ({ update, isValidEmailAddress }) =>
  (httpRequest) => {
    const { uid, email } = httpRequest.body

    if (!uid) {
      return {
        isSuccess: false,
        message: 'uid is mandatory'
      }
    }
    if (!email) {
      return {
        isSuccess: false,
        message: 'Email is mandatory'
      }
    }
    if (!isValidEmailAddress(email)) {
      return {
        isSuccess: false,
        message: 'Invalid email'
      }
    }

    return update(uid, { email })
      .then((uid) => ({
        isSuccess: true,
        data: uid
      }))
      .catch((err) => err.message)
  }

export default updateUser
