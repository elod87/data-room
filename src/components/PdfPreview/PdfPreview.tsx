import { useAuth } from '@clerk/clerk-react'
import { FileItem } from '@cubone/react-file-manager'
import { Box, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

interface PdfPreviewProps {
    item: FileItem
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString()

const API_BASE_URL = import.meta.env.VITE_API_URL

const PdfPreview = ({ item }: PdfPreviewProps) => {
    const { userId } = useAuth()
    const [numPages, setNumPages] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1)
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

    const onDocumentLoadSuccess = ({
        numPages,
    }: {
        numPages: number
    }): void => {
        setNumPages(numPages)
        setIsLoading(false)
    }

    const onDocumentLoadError = (error: Error) => {
        console.error('Error loading PDF:', error)
        setIsLoading(false)
        setIsError(true)
    }

    const changePage = (offset: number) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset)
    }

    const previousPage = () => {
        changePage(-1)
    }

    const nextPage = () => {
        changePage(1)
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                }}
            >
                <Document
                    file={getFilePreviewUrl(item)}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </Box>
            {!isLoading && !isError && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    zIndex={1000}
                >
                    <IconButton
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        aria-label="Previous page"
                    >
                        ←
                    </IconButton>
                    <Typography component="span" fontSize={14}>
                        Page {pageNumber || (numPages ? 1 : '--')} of{' '}
                        {numPages || '--'}
                    </Typography>
                    <IconButton
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                        aria-label="Next page"
                    >
                        →
                    </IconButton>
                </Box>
            )}
        </>
    )
}

export default PdfPreview
