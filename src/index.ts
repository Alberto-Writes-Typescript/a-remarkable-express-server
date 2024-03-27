import express from 'express'
import * as http from 'http'
import helmet from 'helmet'
import Api from './api/Api'

void (async () => {
  /**
   * Express.js APP configuration
   */
  const app = express()

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: process.env.NODE_ENV === 'production'
    })
  )
  app.use(express.json())

  /**
   * Apollo Server API configuration
   */
  const httpServer = http.createServer(app)

  const apiV1: Api = Api.fromVersion(app, httpServer, 'v1')
  await apiV1.start(app, '/api/v1')

  /**
   * Start the HTTP server
   */
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${apiV1.apolloServer.graphqlPath}`)
})()
