import { Button, Grid, IconButton, TableCell } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Column, Meal } from '../../common/utils/types'
import { AppTable } from '../../components/UI/table'
import useAppDispatch from '../../hooks/useAppDispatch'
import {
    deleteMeal,
    getAllMeals,
    updateMeal,
} from '../../store/meals/meals.thunk'
import { RootState } from '../../store/store'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import MealModal, {
    FormSchema,
} from '../../components/admin/pages/meals/MealModal'
import { useSearchParams } from 'react-router-dom'
import styled from '@emotion/styled'
export const Meals = () => {
    const dispatch = useAppDispatch()
    const meals = useSelector((state: RootState) => state.meals.items)
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        dispatch(getAllMeals())
    }, [])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const showModalHandler = (mode: 'add' | 'edit') => {
        searchParams.set('modal', 'add')
        setSearchParams(searchParams)
    }
    const closeModalHandler = () => {
        searchParams.delete('modal')
        setSearchParams(searchParams)
    }
    const deleteMealHadler = (id: string) => {
        dispatch(deleteMeal(id))
    }
    const EditMealHadler = (id: string) => {
        showModalHandler('edit')
        searchParams.set('mealId', id)
        setSearchParams(searchParams)
    }
    const columns: Column<Meal>[] = [
        {
            header: 'Number',
            key: '_id',
            align: 'left',
            index: true,
        },
        { header: 'Title', key: 'title', align: 'left' },
        { header: 'description', key: 'description', align: 'left' },
        { header: 'price', key: 'price', align: 'left' },
        {
            header: 'Actions',
            key: 'action',
            align: 'left',
            render: (meal: Meal) => (
                <TableCell>
                    <IconButton onClick={() => EditMealHadler(meal._id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteMealHadler(meal._id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            ),
        },
    ]
    const saveHandler = (id: string, values: FormSchema) => {
        dispatch(updateMeal({ id, values }))
    }
    const isModalOpen = !!searchParams.get('modal')
    return (
        <Container>
            <Button
                variant="contained"
                onClick={() => showModalHandler('add')}
                style={{ background: '#8a2b06', marginBottom: '10px' }}
            >
                Add new meal
            </Button>
            <MealModal
                open={isModalOpen}
                onClose={closeModalHandler}
                onSubmit={saveHandler}
            />
            <AppTable
                rows={meals}
                columns={columns}
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
