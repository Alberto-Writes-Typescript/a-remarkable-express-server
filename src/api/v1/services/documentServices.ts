import { Device, FileBuffer, ServiceManager } from 'a-remarkable-js-sdk'
import { type ResolversTypes } from '../graphql'
import { deserializeCreateDocumentInput, serializeDocument } from '../serializers/documentSerializers'

export async function createDocument (documentInput: ResolversTypes['CreateDocumentInput'], deviceToken: string): Promise<ResolversTypes['Document']> {
  const deserializedDocumentInput = await deserializeCreateDocumentInput(documentInput)

  const device = new Device(deviceToken)
  await device.connect()
  const serviceManager = new ServiceManager(device)

  const file = new FileBuffer(
    deserializedDocumentInput.name as string,
    deserializedDocumentInput.buffer as ArrayBuffer,
    serviceManager
  )

  const fileUpload = await file.upload()
  return serializeDocument(fileUpload)
}
