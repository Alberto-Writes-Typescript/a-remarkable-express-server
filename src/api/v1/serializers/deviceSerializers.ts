import { type Device } from 'a-remarkable-js-sdk'
import { type DeviceDescription, type ResolversTypes } from '../graphql'

const DEVICE_DESCRIPTION_MAPPINGS = {
  browser_chrome: 'browser-chrome',
  desktop_macos: 'desktop-macos',
  desktop_windows: 'desktop-windows',
  mobile_android: 'mobile-android',
  mobile_ios: 'mobile-ios',
  remarkable: 'remarkable'
}

export function deserializeCreateDeviceInput (input: ResolversTypes['CreateDeviceInput']): { id: string, description: string, oneTimeCode: string } {
  function id (input: ResolversTypes['CreateDeviceInput']): string {
    return input.id
  }

  function description (input: ResolversTypes['CreateDeviceInput']): string {
    return DEVICE_DESCRIPTION_MAPPINGS[input.description]
  }

  function oneTimeCode (input: ResolversTypes['CreateDeviceInput']): string {
    return input.oneTimeCode
  }

  return {
    id: id(input),
    description: description(input),
    oneTimeCode: oneTimeCode(input)
  }
}

export function serializeDevice (device: Device): ResolversTypes['Device'] {
  function id (device: Device): string {
    return device.id
  }

  function description (device: Device): DeviceDescription {
    return device.description as DeviceDescription
  }

  function token (device: Device): string {
    return device.token
  }

  return {
    id: id(device),
    description: description(device),
    token: token(device)
  }
}
