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
        onCreateFolder?: (name: string, parentFolder: string) => void
        onDelete?: (items: FileItem[]) => void
        onRename?: (item: FileItem, newName: string) => void
        acceptedFileTypes?: string
        fileUploadConfig?: {
            url: string
            method?: string
            headers?: Record<string, string>
        }
        collapsibleNav?: boolean
        enableFilePreview?: boolean
    }

    export const FileManager: React.FC<FileManagerProps>
}
