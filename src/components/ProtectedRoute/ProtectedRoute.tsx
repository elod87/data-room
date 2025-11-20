import { useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoaded, isSignedIn } = useAuth()

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
                Loading...
            </div>
        )
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
