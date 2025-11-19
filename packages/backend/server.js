const express = require('express')
const cors = require('cors')
const fileSystemRoutes = require('./app/routes/fileSystem.routes')
const errorHandler = require('./app/middlewares/errorHandler.middleware')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
const FileSystem = require('./app/models/FileSystem.model')

dotenv.config()

const app = express()

// CORS setup
app.use(cors({ origin: process.env.CLIENT_URI }))

// Static files serving
app.use(express.static('public/uploads'))

// Middlewares to parse URL-encoded body & JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Initialize mock data
const initializeMockData = () => {
    const existingData = FileSystem.find()
    if (existingData.length > 0) {
        return
    }

    const project1 = FileSystem.save({
        name: 'Project1',
        isDirectory: true,
        path: '/Project1',
        parentId: null,
    })

    const contractsFolder = FileSystem.save({
        name: 'Contracts',
        isDirectory: true,
        path: '/Project1/Contracts',
        parentId: project1._id,
    })

    FileSystem.save({
        name: 'Contract1.pdf',
        isDirectory: false,
        path: '/Project1/Contracts/Contract1.pdf',
        parentId: contractsFolder._id,
        size: 102400, // 100 KB
        mimeType: 'application/pdf',
    })

    console.log('Mock data initialized')
}

// Initialize mock data on server start
initializeMockData()

// Routes
app.use('/api/file-system', fileSystemRoutes)

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
