import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import { AppContainer } from './App.styled'
import Header from './components/Header/Header'
import AppRoutes from './routes/AppRoute'

const queryClient = new QueryClient()

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AppContainer>
                    <Header />
                    <AppRoutes />
                </AppContainer>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
