import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import {
    addOrderRequests,
    getAllMealsOrderRequests,
    getOrderRequests,
} from '../../api/orderService'

export const getOrderMeals = createAsyncThunk(
    'basket/getOrderMeals',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getOrderRequests()
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)
export const orderSubmit = createAsyncThunk(
    'basket/orderSubmit',
    async (payload: number, { rejectWithValue }) => {
        try {
            const { data } = await addOrderRequests(payload)
            return data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)
export const getAllorderMeals = createAsyncThunk(
    'basket/getAllOrdersMeals',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getAllMealsOrderRequests()
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)
