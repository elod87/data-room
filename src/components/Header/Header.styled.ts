import { Box, styled } from '@mui/material'

export const HeaderContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    zIndex: theme.zIndex.appBar,
}))
