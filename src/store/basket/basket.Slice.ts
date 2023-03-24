import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../../common/utils/types'
import {
    addToBasket,
    deleteBasketItem,
    getBasket,
    updateBasketItem,
} from './basket.thunk'

type BasketState = {
    items: Meal[]
    isLoading: boolean
    error: string
}
const initialState: BasketState = {
    items: [],
    isLoading: false,
    error: '',
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToBasket.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(addToBasket.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addToBasket.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(getBasket.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
        })
        builder.addCase(getBasket.rejected, (state) => {
            state.isLoading = false
            state.error = 'error'
        })
        builder.addCase(updateBasketItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateBasketItem.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(updateBasketItem.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(deleteBasketItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteBasketItem.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(deleteBasketItem.rejected, (state) => {
            state.isLoading = false
        })
    },
})
export const basketAction = basketSlice.actions
export default basketSlice
