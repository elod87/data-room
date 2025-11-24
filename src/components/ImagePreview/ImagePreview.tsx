import { useAuth } from '@clerk/clerk-react'
import { FileItem } from '@cubone/react-file-manager'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

interface ImagePreviewProps {
    item: FileItem
}

const API_BASE_URL = import.meta.env.VITE_API_URL

const ImagePreview = ({ item }: ImagePreviewProps) => {
    const { userId } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    const getFilePreviewUrl = (item: FileItem): string | null => {
        if (!userId) {
            return null
        }

        // remove /api ending from API_BASE_URL
        const apiBaseUrl = API_BASE_URL.replace('/api', '')

        return `${apiBaseUrl}/${userId}${item.path}`
    }

    const imageUrl = getFilePreviewUrl(item)

    const handleImageLoad = () => {
        setIsLoading(false)
    }

    const handleImageError = () => {
        console.error('Error loading image:', imageUrl)
        setIsLoading(false)
        setIsError(true)
    }

    if (isError) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <Typography color="error">
                    Failed to load image preview
                </Typography>
            </Box>
        )
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
            sx={{
                overflow: 'auto',
            }}
        >
            {isLoading && <Typography>Loading image...</Typography>}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={item.name}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        display: isLoading ? 'none' : 'block',
                    }}
                />
            )}
        </Box>
    )
}

export default ImagePreview
