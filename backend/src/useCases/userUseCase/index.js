import { isValidEmailAddress } from '../../helper/utility'
import firebaseUtil from '../../helper/firebase'

import userList from './userList'
import createUser from './createUser'
import updateUser from './updateUser'
import deleteUser from './deleteUser'

const userListUseCase = userList({ allUserList: firebaseUtil.allUserList })
const createUseCase = createUser({ create: firebaseUtil.create, isValidEmailAddress })
const updateUseCase = updateUser({ update: firebaseUtil.update, isValidEmailAddress })
const deleteUseCase = deleteUser({ deleteUser: firebaseUtil.delete })

export { userListUseCase, createUseCase, updateUseCase, deleteUseCase }
