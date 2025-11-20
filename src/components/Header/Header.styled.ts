import { Box, styled } from '@mui/material'

export const HeaderContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2, 3),
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    display: 'flex',
    alignItems: 'center',
    zIndex: theme.zIndex.appBar,
}))

export const LogoBox = styled(Box)({
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6155B4',
    borderRadius: '8px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    flexShrink: 0,
})
