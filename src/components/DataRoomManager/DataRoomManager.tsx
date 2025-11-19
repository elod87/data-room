import { FileItem, FileManager } from '@cubone/react-file-manager'
import '@cubone/react-file-manager/dist/style.css'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { FileItemDto } from '../../types/fileManager'
import {
    useCreateFolder,
    useDeleteItems,
    useFiles,
    useRenameItem,
} from './DataRoomManager.query'

const DataRoomManager = () => {
    const { data: files } = useFiles()
    const queryClient = useQueryClient()
    const createFolderMutation = useCreateFolder()
    const deleteItemsMutation = useDeleteItems()
    const renameItemMutation = useRenameItem()

    const API_BASE_URL = import.meta.env.VITE_API_URL

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
        _file: File,
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

    const buildDownloadUrl = (ids: string[]): string => {
        const queryParams = ids
            .map(id => `files=${encodeURIComponent(id)}`)
            .join('&')
        return `${API_BASE_URL}/file-system/download?${queryParams}`
    }

    const handleDownload = (items: FileItem[]) => {
        if (!files || items.length === 0) {
            return
        }

        const ids = items
            .map(item => findFileByItem(item)?._id)
            .filter((id): id is string => id !== undefined)

        if (ids.length === 0) {
            console.warn('No matching items found to download')
            return
        }

        const downloadUrl = buildDownloadUrl(ids)

        // Trigger browser download using anchor element
        const link = document.createElement('a')
        link.href = downloadUrl
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <FileManager
            files={filesData}
            acceptedFileTypes=".pdf"
            collapsibleNav={true}
            enableFilePreview={true}
            onCreateFolder={handleCreateFolder}
            onDelete={handleDelete}
            onRename={handleRename}
            onFileUploading={handleFileUploading}
            onFileUploaded={handleFileUploaded}
            onDownload={handleDownload}
            fileUploadConfig={{
                url: `${API_BASE_URL}/file-system/upload`,
                method: 'POST',
            }}
            permissions={{
                copy: false,
                move: false,
            }}
        />
    )
}

export default DataRoomManager
