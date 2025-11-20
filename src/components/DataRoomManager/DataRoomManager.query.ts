import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

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
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ['files'],
        queryFn: () => {
            const url = `/file-system`
            return getData<FileItemDto[]>(url, getToken)
        },
    })
}

export const useCreateFolder = () => {
    const queryClient = useQueryClient()
    const { getToken } = useAuth()

    return useMutation({
        mutationFn: async (data: CreateFolderRequest) => {
            const url = `/file-system/folder`
            return postData(url, data as unknown as BodyInit, getToken)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] })
            toast.success('Folder created successfully')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create folder')
        },
    })
}

export const useDeleteItems = () => {
    const queryClient = useQueryClient()
    const { getToken } = useAuth()

    return useMutation({
        mutationFn: async (data: DeleteItemsRequest) => {
            const url = `/file-system`
            return deleteData(url, data as unknown as BodyInit, getToken)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] })
            toast.success('Items deleted successfully')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete items')
        },
    })
}

export const useRenameItem = () => {
    const queryClient = useQueryClient()
    const { getToken } = useAuth()

    return useMutation({
        mutationFn: async (data: RenameItemRequest) => {
            const url = `/file-system/rename`
            return patchData(url, data as unknown as BodyInit, getToken)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] })
            toast.success('Item renamed successfully')
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to rename item')
        },
    })
}
