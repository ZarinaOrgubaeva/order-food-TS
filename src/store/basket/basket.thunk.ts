import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import {
    deleteBasketItems,
    getBasketMeals,
    postAddToBasket,
    putUpdateBasket,
} from '../../api/basketService'
import { Basket } from '../../common/utils/types'

type UpdateBasket = {
    amount: number
    id: string
}

export const getBasket = createAsyncThunk(
    'basket/getBasket',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getBasketMeals()
            return data.data.items
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

export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async (newItem: Basket, { dispatch, rejectWithValue }) => {
        try {
            await postAddToBasket(newItem)
            return dispatch(getBasket())
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

export const updateBasketItem = createAsyncThunk(
    'basket/updeteBasket',
    async ({ id, amount }: UpdateBasket, { dispatch, rejectWithValue }) => {
        try {
            await putUpdateBasket(id, amount)
            dispatch(getBasket())
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

export const deleteBasketItem = createAsyncThunk(
    'basket/deleteBasketItem',
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            await deleteBasketItems(id)
            dispatch(getBasket())
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
