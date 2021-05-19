const userList =
  ({ allUserList }) =>
  (httpRequest) =>
    allUserList()
      .then((users) => ({
        isSuccess: true,
        data: users
      }))
      .catch((err) => err.message)

export default userList
