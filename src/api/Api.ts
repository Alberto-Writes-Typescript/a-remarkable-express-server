import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import type * as core from 'express-serve-static-core'
import { type DocumentNode } from 'graphql/language'
import type * as http from 'http'
import type { Resolvers } from './v1/graphql'
import { readFileSync } from 'node:fs'

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
  static fromVersion (app: core.Express, httpServer: http.Server, version: string): Api {
    const typeDefs = gql(readFileSync(`./src/api/${version}/schema.graphql`, 'utf8'))
    const resolvers = import(`./${version}/resolvers`)

    // @ts-expect-error - This is a dynamic import
    return new this(app, httpServer, typeDefs, resolvers)
  }

  app: core.Express
  apolloServer: ApolloServer
  httpServer: http.Server
  typeDefs: DocumentNode
  resolvers: Resolvers

  constructor (app: core.Express, httpServer: http.Server, typeDefs: DocumentNode, resolvers: Resolvers) {
    this.app = app
    this.httpServer = httpServer
    this.resolvers = resolvers
    this.typeDefs = typeDefs

    this.apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true })
      ]
    })
  }

  async start (app: core.Express, path: string): Promise<ApolloServer> {
    await this.apolloServer.start()
    this.apolloServer.applyMiddleware({ app, path })
    return this.apolloServer
  }
}
