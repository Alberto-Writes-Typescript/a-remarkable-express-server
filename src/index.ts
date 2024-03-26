import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

dotenv.config()

if (process.env.PORT == null) process.exit(1)

const PORT: number = parseInt(process.env.PORT, 10)

const app = express()

/**
 * Middleware Configuration
 */
// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet())
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(cors())
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json())

/**
 * Server Initialization
 */
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
