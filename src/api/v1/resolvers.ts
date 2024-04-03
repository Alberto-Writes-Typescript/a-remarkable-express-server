import { type Resolvers, type ResolversTypes } from './graphql'
import { createDevice } from './services/deviceServices'
import { createSession } from './services/sessionServices'

export const resolvers: Resolvers = {
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
      return await createSession(context.token)
    }
  }
}
