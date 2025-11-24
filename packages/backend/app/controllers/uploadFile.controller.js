const FileSystem = require('../models/FileSystem.model')

const uploadFile = async (req, res) => {
    // #swagger.summary = 'Uploads a new file.'
    /*
      #swagger.auto = false
      #swagger.consumes = ['multipart/form-data']  
      #swagger.parameters['file'] = {
          in: 'formData',
          type: 'file',
          required: 'true',
      }
      #swagger.parameters['parentId'] = {
          in: 'formData',
          type: 'string',
      }
      #swagger.responses[201] = {
      schema: { $ref: '#/definitions/File' }
      }
      #swagger.responses[400]
      #swagger.responses[500]
  */
    try {
        const { parentId } = req.body
        // upload.any() always provides req.files as an array
        const files = req.files || []

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded!' })
        }

        // Verify parent folder exists if parentId is provided
        let parentFolder = null
        if (parentId) {
            parentFolder = FileSystem.findByIdAndUserId(parentId, req.userId)
            if (!parentFolder || !parentFolder.isDirectory) {
                return res.status(400).json({ error: 'Invalid parentId!' })
            }
        }

        // Process each file
        const savedFiles = files.map(file => {
            let filePath = ''
            if (parentFolder) {
                filePath = `${parentFolder.path}/${file.originalname}`
            } else {
                filePath = `/${file.originalname}`
            }

            const newFile = FileSystem.save({
                name: file.originalname,
                isDirectory: false,
                path: filePath,
                parentId: parentId || null,
                size: file.size,
                mimeType: file.mimetype,
                userId: req.userId,
            })

            return newFile
        })

        // Return single file or array of files based on what was uploaded
        if (savedFiles.length === 1) {
            res.status(201).json(savedFiles[0])
        } else {
            res.status(201).json(savedFiles)
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = uploadFile
