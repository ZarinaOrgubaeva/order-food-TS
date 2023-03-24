import { styled } from '@mui/system'
import BackgroundImg from '../assets/images/summary-background.jpg'
import SummaryInfoCard from './SummaryInfoCard'
export const Summary = () => {
    return (
        <Container>
            <StyledImg src={BackgroundImg} alt="summary" />
            <SummaryInfoCard />
        </Container>
    )
}
const Container = styled('div')(() => ({
    height: '527px',
}))

const StyledImg = styled('img')(() => ({
    height: '404.5px',
    marginTop: '-50px',
}))
