// Construct a schema, using GraphQL schema language
import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import express from 'express'
import * as http from 'http'

void (async () => {
  /**
   * Express.js APP configuration
   */
  const app = express()

  const httpServer = http.createServer(app)

  /**
   * Apollo Server configuration
   */
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `

  const resolvers = {
    Query: {
      hello: () => 'Hello world!'
    }
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  })

  /**
   * Server kick-off
   */
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
})()
