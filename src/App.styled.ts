import { Box, styled } from '@mui/material'

export const AppContainer = styled(Box)({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
})

export const AppContent = styled(Box)({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})
