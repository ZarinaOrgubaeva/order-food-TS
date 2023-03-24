import styled from '@emotion/styled'
import { Box, Modal } from '@mui/material'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../hooks/useAppDispatch'
import {
    deleteBasketItem,
    updateBasketItem,
} from '../../store/basket/basket.thunk'
import { orderSubmit } from '../../store/order/order.thunk'
import { RootState } from '../../store/store'
import { BasketItem } from './BasketItem'
import { TotalAmount } from './TotalAmount'
type Props = {
    onClose: () => void
    open: boolean
}
export const Basket = ({ onClose, open }: Props) => {
    const dispatch = useAppDispatch()
    const items = useSelector((state: RootState) => state.basket.items)
    const counterPluz = (id: string, amount: number) => {
        dispatch(updateBasketItem({ amount: amount + 1, id }))
    }
    const counterMinus = (id: string, amount: number) => {
        if (amount > 1) {
            dispatch(updateBasketItem({ amount: amount - 1, id }))
        } else {
            dispatch(deleteBasketItem(id))
        }
    }
    const getTotalPrice = () => {
        return items.reduce((sum, { price, amount }) => sum + amount * price, 0)
    }

    const orderSubmiteHandler = async () => {
        await dispatch(orderSubmit(getTotalPrice())).unwrap()
    }
    return (
        <>
            <Modal onClose={onClose} open={open}>
                <StyledModal>
                    <Content>
                        {items.length ? (
                            <FixedHeightContainer>
                                {items.map((item) => {
                                    return (
                                        <BasketItem
                                            key={item._id}
                                            counterPluz={() =>
                                                counterPluz(
                                                    item._id,
                                                    item.amount
                                                )
                                            }
                                            counterMinus={() =>
                                                counterMinus(
                                                    item._id,
                                                    item.amount
                                                )
                                            }
                                            title={item.title}
                                            price={item.price}
                                            amount={item.amount}
                                        />
                                    )
                                })}
                            </FixedHeightContainer>
                        ) : null}
                        <TotalAmount
                            price={getTotalPrice()}
                            onClose={onClose}
                            onOrder={orderSubmiteHandler}
                        />
                    </Content>
                </StyledModal>
            </Modal>
        </>
    )
}

const Content = styled('div')(() => ({
    width: '100%',
    height: '100%',
    padding: '1.5rem 1rem',
}))

const FixedHeightContainer = styled('div')(() => ({
    maxHeight: '228px',
    overflowY: 'scroll',
}))

const StyledModal = styled(Box)(() => ({
    position: 'fixed',
    top: '20vh',
    left: '5%',
    width: '50%',
    marginLeft: '20%',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    zIndex: '30',
}))
