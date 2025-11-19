import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import Header from './components/Header/Header'
import AppRoutes from './routes/AppRoute'

const queryClient = new QueryClient()

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Box
                    sx={{
                        height: '100vh',
                        width: '100vw',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Header />
                    <AppRoutes />
                </Box>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
