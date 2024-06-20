import { ConsumerReducer } from './reducers/consumer-reducer'
import { RoleGroupReducer } from './reducers/role-group-reducer'
import { RoleReducer } from './reducers/role-reducer'
import { UserReducer } from './reducers/user-reducer'

export const AuthReducer = { role: RoleReducer, roleGroup: RoleGroupReducer, user: UserReducer, consumer: ConsumerReducer }