/// <reference types="vite/client" />

declare module '@cubone/react-file-manager' {
    export interface FileItem {
        name: string
        isDirectory: boolean
        path: string
        updatedAt?: string
        size?: number
    }

    export interface FileManagerProps {
        files: FileItem[]
        onCreateFolder?: (name: string, parentFolder: FileItem) => void
        onDelete?: (items: FileItem[]) => void
        onRename?: (item: FileItem, newName: string) => void
        acceptedFileTypes?: string
        fileUploadConfig?: {
            url: string
            method?: string
            headers?: Record<string, string>
        }
        onFileUploading?: (
            item: FileItem,
            parentFolder: FileItem | null
        ) => { [key: string]: string | null }
        onFileUploaded?: (item: FileItem) => void
        onDownload?: (items: FileItem[]) => void
        collapsibleNav?: boolean
        enableFilePreview?: boolean
        filePreviewPath: string
        filePreviewComponent?: (item: FileItem) => React.ReactNode
        permissions?: {
            create?: boolean
            upload?: boolean
            move?: boolean
            copy?: boolean
            rename?: boolean
            download?: boolean
            delete?: boolean
        }
    }

    export const FileManager: React.FC<FileManagerProps>
}
