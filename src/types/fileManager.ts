export interface FileItemDto {
    _id: string
    name: string
    isDirectory: boolean
    path: string
    parentId?: string
    size?: number
    mimeType?: string
}

export interface CreateFolderRequest {
    name: string
    parentId: string | null
}

export interface CreateFolderResponse {
    _id: string
    name: string
    isDirectory: boolean
    path: string
    parentId: string
    size: string
    mimeType: string
    createdAt: string
    updatedAt: string
}

export interface DeleteItemsRequest {
    ids: string[]
}

export interface RenameItemRequest {
    id: string
    newName: string
}
