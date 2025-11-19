import { FileManager } from '@cubone/react-file-manager'
import '@cubone/react-file-manager/dist/style.css'
import { useState } from 'react'

import { mockFiles } from '../../services/fileManagerService'
import { FileItem } from '../../types/fileManager'
import { HomeContainer } from './Home.styled'

const Home = () => {
    const [files, setFiles] = useState<FileItem[]>(mockFiles)

    const handleCreateFolder = (name: string, parentFolder: string) => {
        const newFolder: FileItem = {
            name,
            isDirectory: true,
            path: parentFolder === '/' ? `/${name}` : `${parentFolder}/${name}`,
            updatedAt: new Date().toISOString(),
        }
        setFiles(prevFiles => [...prevFiles, newFolder])
    }

    const handleDelete = (items: FileItem[]) => {
        const pathsToDelete = items.map(item => item.path)
        setFiles(prevFiles =>
            prevFiles.filter(
                file =>
                    !pathsToDelete.includes(file.path) &&
                    !pathsToDelete.some(path =>
                        file.path.startsWith(`${path}/`)
                    )
            )
        )
    }

    const handleRename = (item: FileItem, newName: string) => {
        const oldPath = item.path
        const pathParts = oldPath.split('/')
        pathParts[pathParts.length - 1] = newName
        const newPath = pathParts.join('/')

        setFiles(prevFiles =>
            prevFiles.map(file => {
                if (file.path === oldPath) {
                    return { ...file, name: newName, path: newPath }
                }
                if (file.path.startsWith(`${oldPath}/`)) {
                    return {
                        ...file,
                        path: file.path.replace(oldPath, newPath),
                    }
                }
                return file
            })
        )
    }

    return (
        <HomeContainer>
            <FileManager
                files={files}
                onCreateFolder={handleCreateFolder}
                onDelete={handleDelete}
                onRename={handleRename}
                collapsibleNav={true}
                enableFilePreview={true}
            />
        </HomeContainer>
    )
}

export default Home
