import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'




const ProtectRoutesDisplay = ({ user, children, redirect = "/signin" }) => {
    if (!user) {
        return (
            <Navigate to={redirect} />
        )
    }

    return (
        children ? children : <Outlet />
    )
}

export default ProtectRoutesDisplay
