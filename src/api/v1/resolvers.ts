import { type Resolvers, type ResolversTypes } from './graphql'
import { createDevice } from './services/deviceServices'

export const resolvers: Resolvers = {
  Query: {
    hello: (): string => {
      return 'Hello, world!'
    }
  },
  Mutation: {
    createDevice: async (_, { input }: { input: ResolversTypes['CreateDeviceInput'] }): Promise<ResolversTypes['Device']> => {
      return await createDevice(input)
    }
  }
}
