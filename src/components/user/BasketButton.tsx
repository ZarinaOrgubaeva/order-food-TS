import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/system'
import { ReactComponent as BasketIcon } from '../assets/icons/Basket-icon.svg'
type Props = ButtonProps & {
    count: number
    className: string
    onClick: () => void
}
export const BasketBtn = ({ count, onClick, className }: Props) => {
    return (
        <StyledButton onClick={onClick} className={className}>
            <BasketIcon />
            <StyledSpan>Your Card </StyledSpan>
            <StyledCount id="counter">{count || 0}</StyledCount>
        </StyledButton>
    )
}

const StyledButton = styled(Button)(() => ({
    '&': {
        backgroundColor: '#5a2611',
        borderRadius: '30px',
        padding: '12px 32px',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        '&.@keyframes bump': {
            '0%': {
                transform: 'scale(1)',
            },
            '10% ': {
                transform: 'scale(0.9)',
            },
            '30% ': {
                transform: 'scale(1.1)',
            },
            '50%': {
                transform: 'scale(1.15)',
            },
            '100%': {
                transform: 'scale(1)',
            },
        },
    },
}))
const StyledSpan = styled('span')(() => ({
    '&': { marginLeft: '12px', marginRight: '12px' },
}))

const StyledCount = styled('span')(() => ({
    background: '#8a2b06',
    borderRadius: '30px',
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '27px',
    color: '#ffffff',
    padding: '4px 20px',
    cursor: 'pointer',
}))
