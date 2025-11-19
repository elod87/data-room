import { Box, styled } from '@mui/material'

export const HeaderContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
}))
