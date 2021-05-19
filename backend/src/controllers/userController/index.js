import { userListUseCase, createUseCase, updateUseCase, deleteUseCase } from '../../useCases/userUseCase'

import getUserListController from './userListController'
import postCreateUserController from './createUserController'
import postUpdateUserController from './updateUserController'
import postDeleteUserController from './deleteUserController'

const userListController = getUserListController({
  useCase: userListUseCase
})
const createUserController = postCreateUserController({
  useCase: createUseCase
})
const updateUserController = postUpdateUserController({
  useCase: updateUseCase
})
const deleteUserController = postDeleteUserController({
  useCase: deleteUseCase
})

export { userListController, createUserController, updateUserController, deleteUserController }
