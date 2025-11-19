import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    deleteData,
    getData,
    patchData,
    postData,
} from '../../services/fetchService'
import {
    CreateFolderRequest,
    DeleteItemsRequest,
    FileItemDto,
    RenameItemRequest,
} from '../../types/fileManager'

export const useFiles = () => {
    return useQuery({
        queryKey: ['files'],
        queryFn: () => {
            const url = `/file-system`
            return getData<FileItemDto[]>(url)
        },
    })
}

export const useCreateFolder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateFolderRequest) => {
            const url = `/file-system/folder`
            return postData(url, data as unknown as BodyInit)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] })
        },
    })
}

export const useDeleteItems = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: DeleteItemsRequest) => {
            const url = `/file-system`
            return deleteData(url, data as unknown as BodyInit)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] })
        },
    })
}

export const useRenameItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: RenameItemRequest) => {
            const url = `/file-system/rename`
            return patchData(url, data as unknown as BodyInit)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] })
        },
    })
}
