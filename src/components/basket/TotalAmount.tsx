import styled from '@emotion/styled'
import { Button } from '@mui/material'
type Props = {
    price: number
    onClose: () => void
    onOrder: () => void
}
export const TotalAmount = ({ price, onClose, onOrder }: Props) => {
    const orderButton =
        price > 0 ? (
            <Button
                onClick={onOrder}
                style={{ backgroundColor: '#8a2b06', color: '#fff' }}
            >
                Order
            </Button>
        ) : null
    const fixedPrice = price.toFixed(2)
    return (
        <div>
            <InfoContainer>
                <Label>Total amount</Label>
                <Price>${fixedPrice}</Price>
            </InfoContainer>
            <ActionBtnsContainer>
                <Button
                    onClick={onClose}
                    style={{ backgroundColor: '#8a2b06', color: '#fff' }}
                >
                    Close
                </Button>
                {orderButton}
            </ActionBtnsContainer>
        </div>
    )
}
//style
const InfoContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))

const ActionBtnsContainer = styled('div')(() => ({
    marginTop: '24px',
    gap: '16px',
    display: 'flex',
    justifyContent: 'flex-end',
}))

const Label = styled('p')(() => ({
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    color: '#222222',
    margin: '0',
}))

const Price = styled('p')(() => ({
    fontWeight: '600',
    fontSize: '22px',
    lineHeight: '33px',
    color: '#8a2b06',
    margin: '0',
}))
