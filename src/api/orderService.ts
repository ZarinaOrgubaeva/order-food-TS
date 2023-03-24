import MainApi from './instance'

export const addOrderRequests = (totalAmount: number) => {
    return MainApi.post('orders', { totalAmount })
}

export const getOrderRequests = () => {
    return MainApi.get('orders')
}
export const getAllMealsOrderRequests = () => {
    return MainApi.get('orders/all')
}
