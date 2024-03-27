import { type Resolvers } from './graphql'

export const resolvers: Resolvers = {
  Query: {
    hello: (): string => {
      return 'Hello, world!'
    }
  }
}
