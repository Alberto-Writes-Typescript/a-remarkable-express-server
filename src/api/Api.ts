import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import type * as core from 'express-serve-static-core'
import { type DocumentNode } from 'graphql/language'
import type * as http from 'http'
import type { Resolvers } from './v1/graphql'
import { readFileSync } from 'node:fs'
import { graphqlUploadExpress } from 'graphql-upload-ts'
import express from 'express'

interface ApiContext {
  token: string
  req: Request
}

/**
 * Creates an Apollo Server instance of a specific API version.
 *
 * Our project is organized in versions. Each version consist on
 * a specific `GraphQL` schema and its respective resolvers. The
 * specification of each version is stored under the `api/<version>`
 * folder.
 *
 * This class is a factory that creates an Apollo Server instance
 * with the schema and resolvers of a specific version, given that
 * version.
 */
export default class Api {
  static async fromVersion (app: core.Express, httpServer: http.Server, version: string): Promise<Api> {
    const typeDefs = gql(readFileSync(`./src/api/${version}/schema.graphql`, 'utf8'))
    const { resolvers } = await import(`./${version}/resolvers`)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new this(app, httpServer, typeDefs, resolvers)
  }

  app: core.Express
  apolloServer: ApolloServer<ApiContext>
  httpServer: http.Server
  typeDefs: DocumentNode
  resolvers: Resolvers

  constructor (app: core.Express, httpServer: http.Server, typeDefs: DocumentNode, resolvers: Resolvers) {
    this.app = app
    this.httpServer = httpServer
    this.resolvers = resolvers
    this.typeDefs = typeDefs

    this.apolloServer = new ApolloServer<ApiContext>({
      // Required for multi-file uploads
      allowBatchedHttpRequests: true,
      typeDefs,
      resolvers,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true })
      ],
      context: async ({ req }: { req: Request }) => {
        // @ts-expect-error TODO: Fix this
        const token = req.headers?.authorization?.split(' ')[1]
        return { token, req: req.body }
      }
    })
  }

  async start (app: core.Express, path: string): Promise<ApolloServer<ApiContext>> {
    await this.apolloServer.start()

    /**
     * Apply the middleware for multi-file uploads.
     * More information in here: https://github.com/meabed/graphql-upload-ts?tab=readme-ov-file#expressjs
     */
    app.use(path, graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

    this.apolloServer.applyMiddleware({ app, path })
    return this.apolloServer
  }
}
