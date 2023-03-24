import { styled } from '@mui/system'
const SummaryInfoCard = () => {
    return (
        <Card>
            <StyledtagH2>Delicious Food, Delivered To You</StyledtagH2>
            <p>
                Choose your favorite meal from our broad selection of available
                meals and enjoy a delicious lunch or dinner at home.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients,
                just-in-time and of course by experienced chefs!
            </p>
        </Card>
    )
}
const Card = styled('div')(() => ({
    position: 'absolute',
    width: '854px',
    height: '270px',
    left: '293px',
    top: '358px',
    padding: '36px 40px',
    background: '#383838',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
    borderRadius: '16px',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '20px',
}))

const StyledtagH2 = styled('h2')(() => ({
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '36px',
    lineHeight: '54px',
    color: '#ffffff',
    marginBottom: '28px',
}))

export default SummaryInfoCard
