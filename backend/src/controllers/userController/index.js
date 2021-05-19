import { userListUseCase } from '../../useCases/userUseCase'

import getUserListController from './userListController'

const userListController = getUserListController({
  useCase: userListUseCase
})

export { userListController }
