import { Box, styled } from '@mui/material'

export const HomeContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
}))

export const TreeGridContainer = styled(Box)(({ theme }) => ({
    width: '33%',
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
}))

export const FolderContentContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
}))
