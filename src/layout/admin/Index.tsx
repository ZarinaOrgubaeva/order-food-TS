import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export const AdminLayout = () => {
    return (
        <>
            <Header />
            <Grid>
                <Outlet />
            </Grid>
        </>
    )
}
