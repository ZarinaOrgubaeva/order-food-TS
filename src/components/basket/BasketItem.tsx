import styled from '@emotion/styled'
import { Button, ButtonProps } from '@mui/material'
import { ReactComponent as PlusSgv } from '../assets/icons/pluzIcon.svg'
import { ReactComponent as MinusSvg } from '../assets/icons/minus.svg'
type Props = ButtonProps & {
    title: string
    price: number
    amount: number
    counterMinus: () => void
    counterPluz: () => void
}

export const BasketItem = ({
    title,
    price,
    amount,
    counterMinus,
    counterPluz,
}: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Content>
                <PriceAndAmountContainer>
                    <Price>${price}</Price>
                    <Amount>X{amount}</Amount>
                </PriceAndAmountContainer>
                <CounterContainer>
                    <StyledBtn onClick={counterMinus}>
                        <MinusSvg />
                    </StyledBtn>
                    <StyledBtn onClick={counterPluz}>
                        <PlusSgv />
                    </StyledBtn>
                </CounterContainer>
            </Content>
        </Container>
    )
}

const Container = styled('div')(() => ({
    padding: '24px 0',
    width: '100%',
    borderBottom: '1px solid #d6d6d6',
}))

const Title = styled('p')(() => ({
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#222222',
    margin: '0',
    marginBottom: '0 0 12px 0',
}))

const Price = styled('p')(() => ({
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '27px',
    color: '#ad5502',
}))

const Amount = styled('span')(() => ({
    border: '1px solid #d6d6d6',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#222222',
    padding: '6px 14px',
    display: 'block',
}))

const PriceAndAmountContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    width: '153px',
    justifyContent: 'space-between',
}))

const CounterContainer = styled('div')(() => ({
    display: 'flex',
    gap: '14px',
}))

const Content = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '30px',
}))

const StyledBtn = styled(Button)(() => ({
    backgroundColor: '#6e3118',
    padding: '10px',
}))
