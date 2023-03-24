import styled from '@emotion/styled'
import { MealItemForm } from './MealForm'

type Props = {
    title: string
    description: string
    price: number
    id: string
}
export const MealItem = ({ title, description, price, id }: Props) => {
    return (
        <StyledItem>
            <StyledItemInfo>
                <StyledTitle>{title}</StyledTitle>
                <StyledText>{description}</StyledText>
                <span>${price}</span>
            </StyledItemInfo>
            <MealItemForm id={id} title={title} price={price} />
        </StyledItem>
    )
}
const StyledItem = styled('li')(() => ({
    listStyle: 'none',
    display: 'flex',
    marginBottom: '24px',
    justifyContent: 'space-between',
    borderBottom: '1px solid #d6d6d6',
    ':last-child': {
        border: 'none',
        marginBottom: '0',
    },
}))

const StyledItemInfo = styled('div')(() => ({
    marginBottom: '20px',
    span: {
        fontWeight: '700',
        fontSize: '20px',
        lineHeight: '30px',
        color: '#ad5502',
    },
}))

const StyledTitle = styled('h4')(() => ({
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '27px',
    color: '#ffff',
}))

const StyledText = styled('p')(() => ({
    fontStyle: 'italic',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#ffff',
    margin: '4px 0',
}))
