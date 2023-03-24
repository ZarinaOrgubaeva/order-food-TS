import { Grid, TextField, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import useAppDispatch from '../../hooks/useAppDispatch'
import { singIn } from '../../store/auth/auth.thunk'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
type FormSchema = (typeof schema)['_output']
export const SingIn = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [, setError] = useState('')
    const submitHandler = (values: FormSchema) => {
        dispatch(singIn(values))
            .unwrap()
            .then(() => navigate('/'))
            .catch((e: string) => setError(e))
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })
    return (
        <FormGrid>
            <form onSubmit={handleSubmit(submitHandler)}>
                <TextField
                    error={!!errors.email}
                    label="Email"
                    {...register('email')}
                />
                {errors.email?.message && (
                    <StyledError>{errors.email?.message}</StyledError>
                )}
                <TextField
                    error={!!errors.password}
                    label="Password"
                    {...register('password')}
                />
                {errors.password?.message && (
                    <StyledError>{errors.password?.message}</StyledError>
                )}
                <Button type="submit">Sing In</Button>
                <Link to="/singUp">{`Don't have account?`}</Link>
            </form>
        </FormGrid>
    )
}
const FormGrid = styled(Grid)(() => ({
    '&': {
        width: '600px',
        margin: '230px 350px',
        padding: '20px',
        background: 'white',
    },
    form: {
        display: 'grid',
        gap: '15px',
    },
}))
const StyledError = styled(Typography)(() => ({
    textAlign: 'center',
}))
