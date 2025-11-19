import { Box, Typography } from '@mui/material'

import { HeaderContainer } from './Header.styled'

const Header = () => {
    return (
        <HeaderContainer>
            <Box
                sx={{
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
                }}
            >
                AC
            </Box>

            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 600,
                        lineHeight: 1.2,
                    }}
                >
                    Acme Corp
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    component="div"
                    sx={{
                        fontSize: '0.75rem',
                        lineHeight: 1,
                    }}
                >
                    Data Room
                </Typography>
            </Box>
        </HeaderContainer>
    )
}

export default Header
