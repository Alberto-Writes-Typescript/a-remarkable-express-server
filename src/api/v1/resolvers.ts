import { type Resolvers, type ResolversTypes } from './graphql'
import { Device } from 'a-remarkable-js-sdk'

export const resolvers: Resolvers = {
  Query: {
    hello: (): string => {
      return 'Hello, world!'
    }
  },
  Mutation: {
    createDevice: async (_, { id, description, oneTimeCode }): Promise<ResolversTypes['Device']> => {
      // @ts-expect-error - TODO: map autogenerated description to DeviceDescription
      const newPairedDevice = await Device.pair(id, description, oneTimeCode)

      return {
        id: newPairedDevice.id,
        // @ts-expect-error - TODO: map autogenerated description to DeviceDescription
        description: newPairedDevice.description,
        token: newPairedDevice.pairToken.token
      }
    }
  }
}
