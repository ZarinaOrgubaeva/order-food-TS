import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { UserRoles } from '../common/utils/types'
import { SingIn } from '../layout/guest/SingIn'
import { SingUp } from '../layout/guest/SignUp'
import { UserLayout } from '../layout/user'
import { Meals } from '../pages/admin/Meals.page'
import { RootState } from '../store/store'
import { ProtectedRoute } from './ProtectedRoute'
import { AdminLayout } from '../layout/admin/Index'
import { Orders } from '../pages/admin/Order.page'
import { Order } from '../pages/user/Order'
import { UserMeals } from '../pages/guest/Meals'

export const AppRoutes = () => {
    const role = useSelector((state: RootState) => state.auth.user.role)
    const allowedRoles = (roles: UserRoles[]) => {
        return roles.includes(role)
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute
                        allowedRoles={allowedRoles([
                            UserRoles.GUEST,
                            UserRoles.USER,
                        ])}
                        fallBackPath={'/admin/meals'}
                        component={UserLayout}
                    />
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoute
                            allowedRoles={allowedRoles([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={UserMeals}
                        />
                    }
                />
                <Route
                    path="myOrder"
                    element={
                        <ProtectedRoute
                            allowedRoles={allowedRoles([UserRoles.USER])}
                            fallBackPath={'/'}
                            component={Order}
                        />
                    }
                />
                <Route
                    path="singUp"
                    element={
                        <ProtectedRoute
                            allowedRoles={allowedRoles([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SingUp}
                        />
                    }
                />
                <Route
                    path="singIn"
                    element={
                        <ProtectedRoute
                            allowedRoles={allowedRoles([UserRoles.GUEST])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SingIn}
                        />
                    }
                />
            </Route>
            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        allowedRoles={allowedRoles([UserRoles.ADMIN])}
                        fallBackPath={'/'}
                        component={AdminLayout}
                    />
                }
            >
                <Route
                    path="meals"
                    element={
                        <ProtectedRoute
                            allowedRoles={allowedRoles([UserRoles.ADMIN])}
                            fallBackPath={'/'}
                            component={Meals}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoute
                            allowedRoles={allowedRoles([UserRoles.ADMIN])}
                            fallBackPath={'/'}
                            component={Orders}
                        />
                    }
                />
            </Route>
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    )
}
