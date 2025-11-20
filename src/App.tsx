import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import { AppContainer, AppContent } from './App.styled'
import Header from './components/Header/Header'
import AppRoutes from './routes/AppRoute'

const queryClient = new QueryClient()

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function App() {
    return (
        <BrowserRouter>
            <ClerkProvider
                publishableKey={clerkPublishableKey}
                afterSignOutUrl="/sign-in"
                signInUrl="/sign-in"
                signUpUrl="/sign-up"
            >
                <QueryClientProvider client={queryClient}>
                    <Toaster />
                    <AppContainer>
                        <Header />
                        <AppContent>
                            <AppRoutes />
                        </AppContent>
                    </AppContainer>
                </QueryClientProvider>
            </ClerkProvider>
        </BrowserRouter>
    )
}

export default App
