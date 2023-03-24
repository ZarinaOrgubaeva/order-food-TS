import { FC } from 'react'
import { Navigate } from 'react-router-dom'
type Props = {
    component: FC
    fallBackPath: string
    allowedRoles: boolean
}
export const ProtectedRoute = ({
    component: Component, //userLayout
    fallBackPath, // "/admin/meals"
    allowedRoles, // ['USER',"GUEST"]
}: Props) => {
    if (!allowedRoles) {
        return <Navigate to={fallBackPath} />
    }
    return <Component />
}
