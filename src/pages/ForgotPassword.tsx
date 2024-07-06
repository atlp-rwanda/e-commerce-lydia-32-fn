import React from 'react'
import ForgotPassword from '../Components/ForgotPassword'
import { Toaster } from 'react-hot-toast'

const ForgotPasswordLayout: React.FC = () => {
    return (
        <>
            <Toaster />
            <ForgotPassword />
        </>
    )
}

export default ForgotPasswordLayout