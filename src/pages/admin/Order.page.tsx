import styled from '@emotion/styled'
import { Grid, TableCell } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Column, OrderMeals } from '../../common/utils/types'
import { AppTable } from '../../components/UI/table'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getAllorderMeals } from '../../store/order/order.thunk'
import { RootState } from '../../store/store'

export const Orders = () => {
    const dispatch = useAppDispatch()
    const meals = useSelector((state: RootState) => state.order.allMeals)
    useEffect(() => {
        dispatch(getAllorderMeals())
    }, [])
    const columns: Column<OrderMeals>[] = [
        {
            header: 'Number',
            key: '_id',
            index: true,
        },
        {
            header: 'Name',
            key: 'name',
            render: (meal: OrderMeals) => <p>{meal.user.name}</p>,
        },
        {
            header: 'Meals',
            key: 'meals',
            render: (meal: OrderMeals) => (
                <TableCell>
                    {meal.items.map((item) => (
                        <p key={item._id}>{item.title}</p>
                    ))}
                </TableCell>
            ),
        },
        {
            header: 'Amount',
            key: 'amount',
            render: (meal: OrderMeals) => (
                <TableCell>
                    {meal.items.map((amount) => (
                        <p key={amount._id}>{amount.amount}</p>
                    ))}
                </TableCell>
            ),
        },
    ]
    return (
        <Container>
            <AppTable
                columns={columns}
                rows={meals}
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
