import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                padding: 2,
            }}
        >
            <Box
                sx={{
                    width: '33%',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    padding: 2,
                }}
            >
                Tree placeholder
            </Box>

            <Box
                sx={{
                    flex: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    padding: 2,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default Home
