const express = require('express')
const cors = require('cors')
const fileSystemRoutes = require('./app/routes/fileSystem.routes')
const errorHandler = require('./app/middlewares/errorHandler.middleware')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
const { clerkMiddleware } = require('@clerk/express')
const fs = require('fs')
const path = require('path')

dotenv.config()

// Clean up uploads directory on startup (since we use in-memory storage)
const cleanupUploadsDirectory = () => {
    const uploadsDir = path.join(__dirname, 'public', 'uploads')

    try {
        // Check if directory exists
        if (fs.existsSync(uploadsDir)) {
            // Remove all contents recursively
            fs.rmSync(uploadsDir, { recursive: true, force: true })
            console.log('Cleaned up uploads directory')
        }

        // Recreate the directory
        fs.mkdirSync(uploadsDir, { recursive: true })
        console.log('Created uploads directory')
    } catch (error) {
        console.error('Error cleaning up uploads directory:', error)
        // Continue anyway - directory might not exist yet
    }
}

// Clean up on startup
cleanupUploadsDirectory()

const app = express()

console.log('CLIENT_URI from env:', process.env.CLIENT_URI)

// CORS setup
const corsOptions = {
    origin: process.env.CLIENT_URI,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))

app.use(clerkMiddleware())

// Static files serving
app.use(express.static('public/uploads'))

// Middlewares to parse URL-encoded body & JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
