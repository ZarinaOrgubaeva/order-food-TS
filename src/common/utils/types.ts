export enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}
export interface Meal {
    readonly _id: string
    price: number
    amount: number
    title: string
    description: string
}
export interface Basket {
    id: string
    title: string
    price: number
    amount: number
}
export type Column<T> = {
    header: string
    key: string
    minWidth?: string | number
    align?: 'left' | 'center' | 'right'
    index?: boolean
    render?: (meal: T) => JSX.Element
}
export interface Items {
    title: string
    price: number
    amount: number
    _id: string
}
export interface OrderMeals {
    _id: string
    createdAt: string
    totalAmount: number
    items: Items[]
    user: {
        _id: string
        name: string
    }
}
