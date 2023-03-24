import styled from '@emotion/styled'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAppDispatch from '../../hooks/useAppDispatch'
import { singUp } from '../../store/auth/auth.thunk'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { UserLayout } from '../user'
import { UserRoles } from '../../common/utils/types'
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    role: z.string(),
    confirmPassword: z.string().min(6, 'wrong'),
})
type FormSchema = (typeof schema)['_output']
export const SingUp = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [, setError] = useState('')
    const submitHandler = (values: FormSchema) => {
        dispatch(singUp(values))
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
            name: '',
            role: UserRoles.USER,
            confirmPassword: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })
    return (
        <FormGrid>
            <form onSubmit={handleSubmit(submitHandler)}>
                <TextField
                    error={!!errors.name}
                    label="Name"
                    {...register('name')}
                />
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
                <TextField
                    error={!!errors.confirmPassword}
                    label="Confirm_Password"
                    {...register('confirmPassword')}
                />
                <Button type="submit">Sign Up</Button>
                <Link to="/singIn">{`Have an account?`}</Link>
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
    // color: theme.palette.error.main,
}))
