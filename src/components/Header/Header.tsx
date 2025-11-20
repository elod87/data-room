import { SignInButton, UserButton, useAuth } from '@clerk/clerk-react'
import { Box, Button, Typography } from '@mui/material'

import { HeaderContainer, LogoBox } from './Header.styled'

const Header = () => {
    const { isSignedIn, isLoaded } = useAuth()

    return (
        <HeaderContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LogoBox>AC</LogoBox>

                <Box>
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
            </Box>

            {isLoaded && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <SignInButton mode="modal">
                            <Button variant="contained" color="primary">
                                Sign In
                            </Button>
                        </SignInButton>
                    )}
                </Box>
            )}
        </HeaderContainer>
    )
}

export default Header
