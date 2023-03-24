import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import authService from '../../api/authService'
import { STORAGE_KEYS } from '../../common/contstants'

type SingInPayload = {
    email: string
    password: string
}
type SingUpPayload = SingInPayload & {
    name: string
    confirmPassword: string
    role: string
}

export const singIn = createAsyncThunk(
    'auth/singIn',
    async (payload: SingInPayload, { rejectWithValue }) => {
        try {
            const { data } = await authService.singIn(payload)
            localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.data))
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Some thing went wrong!')
        }
    }
)
export const singUp = createAsyncThunk(
    'auth/singUp',
    async (payload: SingUpPayload, { rejectWithValue }) => {
        try {
            const { data } = await authService.singUp(payload)
            localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.data))
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Some thing went wrong!')
        }
    }
)
export const singOut = createAsyncThunk('auth/singOut', () => {
    return localStorage.removeItem(STORAGE_KEYS.AUTH)
})
