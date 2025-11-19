import { FileItem } from '../types/fileManager'

// Mock data structure for initial testing
export const mockFiles: FileItem[] = [
    {
        name: 'My Drive',
        isDirectory: true,
        path: '/',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        name: 'Documents',
        isDirectory: true,
        path: '/Documents',
        updatedAt: '2024-01-02T00:00:00Z',
    },
    {
        name: 'Pictures',
        isDirectory: true,
        path: '/Pictures',
        updatedAt: '2024-01-02T00:00:00Z',
    },
    {
        name: 'example.pdf',
        isDirectory: false,
        path: '/Documents/example.pdf',
        updatedAt: '2024-01-03T00:00:00Z',
        size: 102400, // 100 KB
    },
    {
        name: 'photo.jpg',
        isDirectory: false,
        path: '/Pictures/photo.jpg',
        updatedAt: '2024-01-04T00:00:00Z',
        size: 2048000, // 2 MB
    },
    {
        name: 'Project',
        isDirectory: true,
        path: '/Documents/Project',
        updatedAt: '2024-01-05T00:00:00Z',
    },
    {
        name: 'readme.txt',
        isDirectory: false,
        path: '/Documents/Project/readme.txt',
        updatedAt: '2024-01-06T00:00:00Z',
        size: 5120, // 5 KB
    },
]

