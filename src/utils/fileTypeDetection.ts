/**
 * Detects the file type based on file extension
 * @param fileName - The name of the file
 * @returns 'pdf' | 'image' | 'unknown'
 */
export const getFileType = (fileName: string): 'pdf' | 'image' | 'unknown' => {
    if (!fileName) {
        return 'unknown'
    }

    const extension = fileName.toLowerCase().split('.').pop()

    if (!extension) {
        return 'unknown'
    }

    if (extension === 'pdf') {
        return 'pdf'
    }

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp']
    if (imageExtensions.includes(extension)) {
        return 'image'
    }

    return 'unknown'
}

