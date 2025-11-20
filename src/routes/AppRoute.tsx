import { SignIn, SignUp } from '@clerk/clerk-react'
import { useAuth } from '@clerk/clerk-react'
import { CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import Home from '../pages/Home/Home'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isSignedIn, isLoaded } = useAuth()

    if (!isLoaded) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </div>
        )
    }

    if (isSignedIn) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/sign-in/*"
                element={
                    <PublicRoute>
                        <SignIn routing="path" path="/sign-in" />
                    </PublicRoute>
                }
            />
            <Route
                path="/sign-up/*"
                element={
                    <PublicRoute>
                        <SignUp routing="path" path="/sign-up" />
                    </PublicRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            {/* Not found for 404 */}
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    )
}

export default AppRoutes
