import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Basket } from '../../components/basket/Basket'
import { Header } from './Header'

export const UserLayout = () => {
    const [isBasketVisible, setBasketVisible] = useState(false)
    const showBasketHandler = useCallback(() => {
        setBasketVisible((prevState) => !prevState)
    }, [])
    return (
        <>
            <Header onShowBasket={showBasketHandler} />
            {isBasketVisible && (
                <Basket open={isBasketVisible} onClose={showBasketHandler} />
            )}
            <Content>
                <Outlet />
            </Content>
        </>
    )
}
const Content = styled('div')(() => ({
    marginTop: '101px',
}))
