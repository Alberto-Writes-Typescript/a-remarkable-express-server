import { Device } from 'a-remarkable-js-sdk'
import { type ResolversTypes } from '../graphql'
import { serializeSession } from '../serializers/sessionSerializers'

export async function createSession (): Promise<ResolversTypes['Session']> {
  const device = new Device('token goes here')
  await device.connect()
  const session = device.session
  return serializeSession(session)
}
