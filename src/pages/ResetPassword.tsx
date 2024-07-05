import React from 'react'
import ResetPassword from '../Components/ResetPassword'
import { Toaster } from 'react-hot-toast'

const ResetPasswordLayout: React.FC = () => {
    return (
        <>
            <Toaster />
            <ResetPassword />
        </>
    )
}

export default ResetPasswordLayout