import { Meal } from '../common/utils/types'
import { FormSchema } from '../components/admin/pages/meals/MealModal'
import MainApi from './instance'

type AllMealResponse = {
    data: Meal[]
}
const getAllMeals = () => {
    return MainApi.get<AllMealResponse>('/foods')
}
type MealResponse = {
    data: Meal
}
const getMealById = (id: string) => {
    return MainApi.get<MealResponse>(`foods/${id}`)
}
export const updateMeal = (id: string, values: FormSchema) => {
    return MainApi.put(`/foods/${id}`, values)
}
const deleteMealReq = (id: string) => {
    return MainApi.delete(`/foods/${id}`)
}
export const addMeals = (data: FormSchema) => {
    return MainApi.post('/foods', data)
}
export default { getAllMeals, getMealById, updateMeal, deleteMealReq, addMeals }
