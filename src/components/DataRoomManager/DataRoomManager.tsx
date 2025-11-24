import { useAuth } from '@clerk/clerk-react'
import { FileItem, FileManager } from '@cubone/react-file-manager'
import '@cubone/react-file-manager/dist/style.css'
import { Box } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { FileItemDto } from '../../types/fileManager'
import { getFileType } from '../../utils/fileTypeDetection'
import ImagePreview from '../ImagePreview/ImagePreview'
import PdfPreview from '../PdfPreview/PdfPreview'
import {
    useCreateFolder,
    useDeleteItems,
    useFiles,
    useRenameItem,
} from './DataRoomManager.query'

const API_BASE_URL = import.meta.env.VITE_API_URL

const DataRoomManager = () => {
    const { getToken } = useAuth()
    const [authToken, setAuthToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getToken()
            setAuthToken(token)
        }
        fetchToken()
    }, [getToken])
    const { data: files, error: filesError } = useFiles()
    const queryClient = useQueryClient()
    const createFolderMutation = useCreateFolder()
    const deleteItemsMutation = useDeleteItems()
    const renameItemMutation = useRenameItem()

    useEffect(() => {
        if (filesError) {
            const errorMessage =
                filesError instanceof Error
                    ? filesError.message
                    : 'Failed to fetch files'
            toast.error(errorMessage)
        }
    }, [filesError])

    const filesData: FileItem[] = useMemo(
        () =>
            files?.map(
                (file: FileItemDto): FileItem => ({
                    name: file.name,
                    isDirectory: file.isDirectory,
                    path: file.path,
                    size: file.size,
                })
            ) || [],
        [files]
    )

    const findFileByItem = (item: FileItem) => {
        return files?.find(
            file =>
                file.path === item.path &&
                file.isDirectory === item.isDirectory &&
                file.name === item.name
        )
    }

    const handleCreateFolder = (name: string, parentFolder: FileItem) => {
        let parentId: string | null = null

        if (parentFolder) {
            const folder = findFileByItem(parentFolder)
            if (folder) {
                parentId = folder._id
            }
        }

        createFolderMutation.mutate({ name, parentId })
    }

    const handleDelete = (items: FileItem[]) => {
        if (!files || items.length === 0) {
            return
        }

        const ids = items
            .map(item => findFileByItem(item)?._id)
            .filter(id => id !== undefined)

        deleteItemsMutation.mutate({ ids })
    }

    const handleRename = (item: FileItem, newName: string) => {
        if (!files) {
            return
        }

        const fileDto = findFileByItem(item)
        if (!fileDto) {
            console.warn('Item not found for rename')
            return
        }

        renameItemMutation.mutate({ id: fileDto._id, newName })
    }

    const handleFileUploading = (
        _item: FileItem,
        parentFolder: FileItem | null
    ): { [key: string]: string | null } => {
        let parentId: string | null = null

        if (parentFolder) {
            const folder = findFileByItem(parentFolder)
            if (folder) {
                parentId = folder._id
            }
        }

        return parentId ? { parentId } : {}
    }

    const handleFileUploaded = () => {
        queryClient.invalidateQueries({ queryKey: ['files'] })
    }

    const handleDownload = async (items: FileItem[]) => {
        if (!files || items.length === 0) {
            return
        }

        const ids = items
            .map(item => findFileByItem(item)?._id)
            .filter((id): id is string => id !== undefined)

        if (ids.length === 0) {
            toast.error('No matching items found to download')
            return
        }

        try {
            const queryParams = ids
                .map(id => `files=${encodeURIComponent(id)}`)
                .join('&')
            const downloadUrl = `${API_BASE_URL}/file-system/download?${queryParams}`
            const token = await getToken()

            const response = await fetch(downloadUrl, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            })

            if (!response.ok) {
                const errorText = await response.text()
                let errorMessage = 'Download failed'
                try {
                    const errorData = JSON.parse(errorText)
                    errorMessage = errorData.message || errorMessage
                } catch {
                    errorMessage = response.statusText || errorMessage
                }
                toast.error(errorMessage)
                return
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = items.length === 1 ? items[0].name : 'download.zip'
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success('Download completed successfully')
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Download failed'
            toast.error(errorMessage)
        }
    }

    return (
        <FileManager
            height="95%"
            width="95%"
            files={filesData}
            collapsibleNav={true}
            onCreateFolder={handleCreateFolder}
            onDelete={handleDelete}
            onRename={handleRename}
            onFileUploading={handleFileUploading}
            onFileUploaded={handleFileUploaded}
            onDownload={handleDownload}
            fileUploadConfig={{
                url: `${API_BASE_URL}/file-system/upload`,
                method: 'POST',
                headers: authToken
                    ? { Authorization: `Bearer ${authToken}` }
                    : undefined,
            }}
            enableFilePreview={true}
            filePreviewPath={`${API_BASE_URL}`}
            filePreviewComponent={(item: FileItem) => {
                const fileType = getFileType(item.name)

                if (fileType === 'pdf') {
                    return <PdfPreview item={item} />
                }

                if (fileType === 'image') {
                    return <ImagePreview item={item} />
                }

                return (
                    <Box sx={{ padding: '20px', textAlign: 'center' }}>
                        Preview not available for this file type
                    </Box>
                )
            }}
            permissions={{
                copy: false,
                move: false,
            }}
        />
    )
}

export default DataRoomManager
