import { FileItem } from '@cubone/react-file-manager'
import { Box, IconButton } from '@mui/material'
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
    const [numPages, setNumPages] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getFilePreviewUrl = (item: FileItem): string | null => {
        // remove /api ending from API_BASE_URL
        const apiBaseUrl = API_BASE_URL.replace('/api', '')

        return `${apiBaseUrl}/${item.path}`
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
            <Document
                file={getFilePreviewUrl(item)}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            {!isLoading && (
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
                    <p>
                        Page {pageNumber || (numPages ? 1 : '--')} of{' '}
                        {numPages || '--'}
                    </p>
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
