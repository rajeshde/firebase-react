import { userListController, createUserController, updateUserController, deleteUserController } from '../controllers/userController'

import { callController } from '../middlewares'

const getEndPoint = (subPath) => `/user/${subPath}`

const onBoardQuestionRoute = ({ app }) => {
  app.get(getEndPoint('user-list'), callController(userListController))
  app.post(getEndPoint('user-create'), callController(createUserController))
  app.post(getEndPoint('user-update'), callController(updateUserController))
  app.post(getEndPoint('user-delete'), callController(deleteUserController))
}

export default onBoardQuestionRoute
