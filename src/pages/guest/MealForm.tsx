import styled from '@emotion/styled'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAppDispatch from '../../hooks/useAppDispatch'
import { RootState } from '../../store/store'
import { ReactComponent as PlusIcon } from '../../components/assets/icons/pluzIcon.svg'
import { addToBasket } from '../../store/basket/basket.thunk'
type Props = {
    title: string
    price: number
    id: string
}
export const MealItemForm = ({ id, title, price }: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [amount, setAmount] = useState(1)
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    )
    const [isModalOpen, setModalOpen] = useState(false)
    const amountChangehandler = (event: {
        target: { value: string | number }
    }) => {
        setAmount(+event.target.value)
    }
    const submitHandler = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        if (!isAuthorized) {
            setModalOpen(true)
        }
        const basketItem = {
            id,
            price,
            title,
            amount: +amount,
        }
        dispatch(addToBasket(basketItem))
    }
    return (
        <>
            <Dialog
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Not Authorized
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        In order to compelete this action, please sing in.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate('/singIn')}>
                        Go to singIn
                    </Button>
                    <Button onClick={() => setModalOpen(false)} autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
            <StyledForm onSubmit={submitHandler}>
                <InputContainer>
                    <label htmlFor={id}>Amount</label>
                </InputContainer>
                <InputContainer>
                    <StyledTextField
                        id={id}
                        label=""
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size="small"
                        value={amount}
                        onChange={amountChangehandler}
                    />
                </InputContainer>
                <BtnStyled type="submit">
                    <PlusIcon id="pluzIcon" />
                    Add
                </BtnStyled>
            </StyledForm>
        </>
    )
}
const StyledTextField = styled(TextField)(() => ({
    '&.MuiTextField-root': {
        width: '70px',
        border: '1px solid #682409',
    },
    '&..MuiOutlinedInput-input': {
        padding: '5px 10px',
        fontSize: '14px',
    },
}))
const StyledForm = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
}))

const InputContainer = styled('div')(() => ({
    marginBottom: '12px',
    color: 'white',
    label: {
        fontWeight: '600',
        fontSize: '18px',
        lineHeight: '27px',
        color: '#ffff',
    },
}))
const BtnStyled = styled(Button)(() => ({
    backgroundColor: '#8a2b06',
    color: '#fff',
}))
