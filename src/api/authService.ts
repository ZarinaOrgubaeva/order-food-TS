import { UserRoles } from '../common/utils/types'
import { MainApi } from './instance'
type SingInResponse = {
    data: {
        token: string
        user: {
            role: UserRoles
            email: string
            name: string
        }
    }
}
const singIn = (data: { email: string; password: string }) => {
    return MainApi.post<SingInResponse>('auth/login', data)
}
const singUp = (data: { email: string; password: string; name: string }) => {
    return MainApi.post<SingInResponse>('auth/register', data)
}

export default {
    singIn,
    singUp,
}
