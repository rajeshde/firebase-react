const updateUser =
  ({ update, isValidEmailAddress }) =>
  (httpRequest) => {
    const { uid, email, password } = httpRequest.body

    if (!uid) {
      return {
        isSuccess: false,
        message: 'uid is mandatory'
      }
    }
    if (!email || !password) {
      return {
        isSuccess: false,
        message: 'Email and password is mandatory'
      }
    }
    if (!isValidEmailAddress(email)) {
      return {
        isSuccess: false,
        message: 'Invalid email'
      }
    }

    return update(uid, { email, password })
      .then((uid) => ({
        isSuccess: true,
        data: uid
      }))
      .catch((err) => err.message)
  }

export default updateUser
