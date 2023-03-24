import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Summary } from '../../components/summary/Summary'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getAllMeals } from '../../store/meals/meals.thunk'
import { RootState } from '../../store/store'
import { MealItem } from './MealItem'

export const UserMeals = () => {
    const dispatch = useAppDispatch()
    const meals = useSelector((state: RootState) => state.meals.items)
    useEffect(() => {
        dispatch(getAllMeals())
    }, [])

    return (
        <>
            <Summary />
            <Card>
                {meals.map((meal) => {
                    return (
                        <MealItem
                            key={meal._id}
                            title={meal.title}
                            description={meal.description}
                            price={meal.price}
                            id={meal._id}
                        />
                    )
                })}
            </Card>
        </>
    )
}
const Card = styled('ul')(() => ({
    borderRadius: '16px',
    width: '1039px',
    margin: '40px auto',
    padding: '40px 36px 40px 40px',
    background: '#222222',
    marginTop: '5%',
}))
