const deleteUser =
  ({ deleteUser }) =>
  (httpRequest) => {
    const { uid } = httpRequest.body

    if (!uid) {
      return {
        isSuccess: false,
        message: 'uid is mandatory'
      }
    }

    return deleteUser(uid)
      .then(() => ({
        isSuccess: true,
        message: 'Deletion successful'
      }))
      .catch((err) => err.message)
  }

export default deleteUser
