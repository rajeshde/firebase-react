import { userListController } from '../controllers/userController'

import { callController } from '../middlewares'

const getEndPoint = (subPath) => `/user/${subPath}`

const onBoardQuestionRoute = ({ app }) => {
  app.get(getEndPoint('user-list'), callController(userListController))
}

export default onBoardQuestionRoute
