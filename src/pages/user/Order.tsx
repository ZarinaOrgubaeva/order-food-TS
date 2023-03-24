import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Column, OrderMeals } from '../../common/utils/types'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getOrderMeals } from '../../store/order/order.thunk'
import { RootState } from '../../store/store'
import { AppTable } from '../../components/UI/table'
import styled from '@emotion/styled'
import { Grid, TableCell } from '@mui/material'
import { format } from 'date-fns'

export const Order = () => {
    const dispatch = useAppDispatch()
    const meals = useSelector((state: RootState) => state.order.meals)
    useEffect(() => {
        dispatch(getOrderMeals())
    }, [])
    const date = (day: string) => {
        const form = format(new Date(day), 'dd.MM.yy')
        return form
    }
    const column: Column<OrderMeals>[] = [
        {
            header: 'Number',
            key: '_id',
            index: true,
            minWidth: '5px',
        },
        {
            header: 'Meals',
            key: 'meals2',
            render: (meal: OrderMeals) => (
                <TableCell>
                    {meal.items.map((item) => (
                        <h4 key={item._id}>{item.title}</h4>
                    ))}
                </TableCell>
            ),
        },
        {
            header: 'Price',
            key: 'price2',
            render: (meal: OrderMeals) => (
                <TableCell>
                    {meal.items.map((item) => (
                        <h4 key={item._id}>{item.price}</h4>
                    ))}
                </TableCell>
            ),
        },
        {
            header: 'Amount',
            key: 'amount2',
            render: (meal: OrderMeals) => (
                <TableCell>
                    {meal.items.map((item) => (
                        <h4 key={item._id}>{item.amount}</h4>
                    ))}
                </TableCell>
            ),
        },
        {
            header: 'Date',
            key: 'date',
            render: (meal: OrderMeals) => (
                <TableCell>
                    <h4>{date(meal.createdAt)}</h4>
                </TableCell>
            ),
        },
    ]
    return (
        <Container>
            <AppTable
                rows={meals}
                columns={column}
                getUniqueId={(val) => val._id}
            />
        </Container>
    )
}
const Container = styled(Grid)(() => ({
    width: '700px',
    marginLeft: '25%',
    marginTop: '10%',
}))
