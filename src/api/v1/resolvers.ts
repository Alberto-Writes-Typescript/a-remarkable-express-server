import { type Resolvers, type ResolversTypes } from './graphql'
import { createDevice } from './services/deviceServices'
import { createSession } from './services/sessionServices'
import { createDocument } from './services/documentServices'
import { GraphQLUpload } from 'graphql-upload-ts'

export const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Query: {
    hello: (): string => {
      return 'Hello, world!'
    }
  },
  Mutation: {
    createDevice: async (_, { input }: { input: ResolversTypes['CreateDeviceInput'] }): Promise<ResolversTypes['Device']> => {
      return await createDevice(input)
    },
    createSession: async (parent, args, context): Promise<ResolversTypes['Session']> => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return await createSession(context.token)
    },
    createDocument: async (_, { input }: { input: ResolversTypes['CreateDocumentInput'] }, context): Promise<ResolversTypes['Document']> => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return await createDocument(input, context.token)
    }
  }
}
