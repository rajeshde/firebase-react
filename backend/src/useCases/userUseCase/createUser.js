const createUser =
  ({ create, isValidEmailAddress }) =>
  (httpRequest) => {
    const { email, password } = httpRequest.body

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

    return create({ email, password })
      .then((uid) => ({
        isSuccess: true,
        data: uid
      }))
      .catch((err) => err.message)
  }

export default createUser
