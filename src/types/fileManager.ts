export interface FileItem {
    name: string
    isDirectory: boolean
    path: string
    updatedAt?: string
    size?: number
}

export type FileItemArray = FileItem[]

