import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import mealsService from '../../api/meals.Service'
import { data, FormSchema } from '../../components/admin/pages/meals/MealModal'

export const getAllMeals = createAsyncThunk(
    'meals/getAll',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await mealsService.getAllMeals()
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
export const deleteMeal = createAsyncThunk(
    'meals/delete',
    async (payload: string, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await mealsService.deleteMealReq(payload)
            dispatch(getAllMeals())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const addMeals = createAsyncThunk(
    'meals/addMeals',
    async (payload: FormSchema, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await mealsService.addMeals(payload)
            dispatch(getAllMeals())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const updateMeal = createAsyncThunk(
    'meals/updateMeal',
    async ({ id, values }: data, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await mealsService.updateMeal(id, values)
            dispatch(getAllMeals())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
