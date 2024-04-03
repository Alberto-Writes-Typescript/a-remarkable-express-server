import { Device } from 'a-remarkable-js-sdk'
import { type ResolversTypes } from '../graphql'
import { serializeSession } from '../serializers/sessionSerializers'

export async function createSession (deviceToken: string): Promise<ResolversTypes['Session']> {
  const device = new Device(deviceToken)
  await device.connect()
  const session = device.session
  // @ts-expect-error TODO: Fix this
  return serializeSession(session)
}
