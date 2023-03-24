import { Button, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import mealsService from '../../../../api/meals.Service'
import useAppDispatch from '../../../../hooks/useAppDispatch'
import { addMeals } from '../../../../store/meals/meals.thunk'
const style = {
    display: 'grid',
    gap: '15px',
    width: '600px',
    position: 'fixed',
    top: '20vh',
    left: '25%',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    zIndex: '30',
}
const schema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number(),
})
export type FormSchema = (typeof schema)['_output']
type Props = {
    open: boolean
    onClose: () => void
    onSubmit: (id: string, data: FormSchema) => void
}
export type data = {
    id: string
    values: {
        title: string
        description: string
        price: number
    }
}
const MealModal = ({ open, onClose, onSubmit }: Props) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            price: 0,
            title: '',
            description: '',
        },
        resolver: zodResolver(schema),
    })
    useEffect(() => {
        const mealId = searchParams.get('mealId')
        if (open && searchParams.get('modal') === 'edit' && mealId) {
            mealsService.getMealById(mealId).then(({ data }) => {
                return reset(data.data)
            })
        }
    }, [open])
    const submitHandler = (values: FormSchema) => {
        open && searchParams.get('modal') === 'edit'
            ? onSubmit(id, values)
            : dispatch(addMeals(values))
        onClose()
    }
    const id = searchParams.get('mealId') || '1'

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <FormStyled onSubmit={handleSubmit(submitHandler)}>
                    <StyledInput
                        error={!!errors.title}
                        {...register('title')}
                        label="Title"
                    />
                    <StyledInput
                        error={!!errors.description}
                        {...register('description')}
                        label="Description"
                    />
                    <StyledInput
                        {...register('price', { valueAsNumber: true })}
                        label="Price"
                        error={!!errors.price}
                    />
                    <Button variant="outlined" color="info" type="submit">
                        Save
                    </Button>
                    <Button variant="outlined" color="info" onClick={onClose}>
                        Cancel
                    </Button>
                </FormStyled>
            </Box>
        </Modal>
    )
}

export default MealModal
const FormStyled = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    Button: {
        marginTop: '20px',
    },
}))
const StyledInput = styled(TextField)(() => ({
    marginTop: '20px',
}))
