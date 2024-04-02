import { Device } from 'a-remarkable-js-sdk'
import { type ResolversTypes } from '../graphql'
import { deserializeCreateDeviceInput, serializeDevice } from '../serializers/deviceSerializers'

export async function createDevice (deviceInput: ResolversTypes['CreateDeviceInput']): Promise<ResolversTypes['Device']> {
  const deserializedDeviceInput = deserializeCreateDeviceInput(deviceInput)

  const device = await Device.pair(
    deserializedDeviceInput.id,
    // @ts-expect-error TODO: Fix importing DeviceDescription from a-remarkable-js-sdk
    deserializedDeviceInput.description,
    deserializedDeviceInput.oneTimeCode
  )

  return await serializeDevice(device)
}
