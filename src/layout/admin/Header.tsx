import { NavLink } from 'react-router-dom'
import { singOut } from '../../store/auth/auth.thunk'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import useAppDispatch from '../../hooks/useAppDispatch'
const menus = [
    {
        path: 'meals',
        title: 'Meals',
    },
    {
        path: 'orders',
        title: 'Orders',
    },
]
export const Header = () => {
    const dispatch = useAppDispatch()
    const singOutHandler = () => {
        dispatch(singOut())
    }
    return (
        <AppBar position="static" style={{ background: '#8a2b06' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    {/* <MenuIcon /> */}
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {menus.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={{
                                listStyle: 'none',
                                textDecoration: 'none',
                                color: 'white',
                                marginRight: '10px',
                            }}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </Typography>
                <Button
                    color="inherit"
                    onClick={singOutHandler}
                    style={{ backgroundColor: '#5a2611' }}
                >
                    Sign out
                </Button>
            </Toolbar>
        </AppBar>
    )
}
