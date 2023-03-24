import { createSlice } from '@reduxjs/toolkit'
import { OrderMeals } from '../../common/utils/types'
import { getAllorderMeals, getOrderMeals } from './order.thunk'
type OrderState = {
    meals: OrderMeals[]
    allMeals: OrderMeals[]
    isLoading: boolean
}
const initialState: OrderState = {
    meals: [],
    allMeals: [],
    isLoading: false,
}
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrderMeals.fulfilled, (state, action) => {
            state.meals = action.payload
            state.isLoading = false
        })
        builder.addCase(getAllorderMeals.fulfilled, (state, action) => {
            state.allMeals = action.payload
            state.isLoading = false
        })
    },
})
export const orderActions = orderSlice.actions
export default orderSlice
