import { Button, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { BasketBtn } from '../../components/user/BasketButton'
import { singOut } from '../../store/auth/auth.thunk'
import { getBasket } from '../../store/basket/basket.thunk'
import { AppDispatch, RootState } from '../../store/store'

type Props = {
    onShowBasket: () => void
}
export const Header = ({ onShowBasket }: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    )
    const items = useSelector((state: RootState) => state.basket.items)
    const [animationClass, setAnimationClass] = useState('')
    const BtnNavigate = () => {
        navigate('/singIn')
    }
    const singOutHandler = () => {
        dispatch(singOut())
        navigate('/singIn')
    }
    useEffect(() => {
        dispatch(getBasket())
    }, [dispatch])

    const calculateTotalAmount = () => {
        const sum = items.reduce((summa, item) => {
            return summa + item.amount
        }, 0)
        return sum
    }
    const showBasketHandler = () => {
        setAnimationClass('dsds')
        return onShowBasket()
    }

    const userOrders = () => {
        if (!isAuthorized) {
            //xchjk
        }
        return navigate('myOrder')
    }

    useEffect(() => {
        setAnimationClass('bump')
        const id = setTimeout(() => {
            setAnimationClass('')
        }, 300)
        return () => {
            clearTimeout(id)
        }
    }, [items])

    return (
        <Container>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Logo>ReactMeals</Logo>
            </Link>
            <Grid display="flex" alignItems="center">
                <BasketBtn
                    className={animationClass}
                    onClick={showBasketHandler}
                    count={calculateTotalAmount()}
                />
                {isAuthorized && (
                    <Button
                        onClick={userOrders}
                        style={{
                            backgroundColor: '#5a2611',
                            color: '#fff',
                            marginLeft: '10px',
                        }}
                    >
                        My Orders
                    </Button>
                )}
                {isAuthorized ? (
                    <Button
                        onClick={singOutHandler}
                        style={{
                            backgroundColor: '#5a2611',
                            color: '#fff',
                            marginLeft: '50px',
                        }}
                    >
                        {' '}
                        Sign out
                    </Button>
                ) : (
                    <Button
                        onClick={BtnNavigate}
                        style={{
                            backgroundColor: '#5a2611',
                            color: '#fff',
                            marginLeft: '30rem',
                            marginRight: '2rem',
                        }}
                    >
                        Sign In
                    </Button>
                )}
            </Grid>
        </Container>
    )
}
//style
const Container = styled('header')(() => ({
    '&': {
        width: '100%',
        position: 'fixed',
        zIndex: '1',
        top: '0',
        height: '6.31rem',
        display: 'flex',
        justifyContent: 'space-between',
        // paddingLeft: '7.5rem',
        // paddingRight: '7.5rem',
        alignItems: 'center',
        background: '#8a2b06',
    },
}))
const Logo = styled('p')(() => ({
    '&': {
        fontWeight: '600',
        fontSize: '38px',
        lineHeight: '57px',
        color: '#ffffff',
        marginLeft: '2rem',
    },
}))
