import { Basket } from '../common/utils/types'
import MainApi from './instance'
export const mealsGet = () => {
    return MainApi.get('/foods')
}
export const getBasketMeals = () => {
    return MainApi.get('/basket')
}
export const postAddToBasket = (newItem: Basket) => {
    return MainApi.post(`foods/${newItem.id}/addToBasket`, {
        amount: newItem.amount,
    })
}
export const putUpdateBasket = (id: string, basketAmount: number) => {
    return MainApi.put(`/basketItem/${id}/update`, {
        amount: basketAmount,
    })
}
export const deleteBasketItems = (id: string) => {
    return MainApi.delete(`/basketItem/${id}/delete`)
}
