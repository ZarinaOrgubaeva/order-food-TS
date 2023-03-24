import { createSlice } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '../../common/contstants'
import { UserRoles } from '../../common/utils/types'
import { singIn, singOut, singUp } from './auth.thunk'
interface AuthState {
    isAuthorized: boolean
    token: string
    user: {
        role: UserRoles
        name: string
        email: string
    }
}
const getInitialState = () => {
    const json = localStorage.getItem(STORAGE_KEYS.AUTH)
    if (json) {
        const userData = JSON.parse(json) as Omit<AuthState, 'isAuthorized'>
        return {
            isAuthorized: true,
            token: userData.token,
            user: {
                name: userData.user.name,
                email: userData.user.email,
                role: userData.user.role,
            },
        }
    }
    return {
        isAuthorized: false,
        token: '',
        user: {
            role: UserRoles.ADMIN,
            email: '',
            name: '',
        },
    }
}
const initialState: AuthState = getInitialState()
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(singIn.fulfilled, (state, action) => {
            state.isAuthorized = true
            state.token = action.payload?.token
            state.user = {
                role: action.payload?.user.role,
                email: action.payload?.user.email,
                name: action.payload?.user.name,
            }
        })
        builder.addCase(singUp.fulfilled, (state, action) => {
            state.isAuthorized = true
            state.token = action.payload?.token
            state.user = {
                role: action.payload?.user.role,
                email: action.payload?.user.email,
                name: action.payload?.user.name,
            }
        })
        builder.addCase(singOut.fulfilled, (state) => {
            state.isAuthorized = false
            state.token = ''
            state.user = {
                role: UserRoles.GUEST,
                email: '',
                name: '',
            }
        })
    },
})
export const authActions = authSlice.actions
export default authSlice
