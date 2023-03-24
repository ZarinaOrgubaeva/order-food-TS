import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth.slice'
import basketSlice from './basket/basket.Slice'
import { mealsSlice } from './meals/meals.slice'
import { orderSlice } from './order/orderSlice'
export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [mealsSlice.name]: mealsSlice.reducer,
        [orderSlice.name]: orderSlice.reducer,
        [basketSlice.name]: basketSlice.reducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
