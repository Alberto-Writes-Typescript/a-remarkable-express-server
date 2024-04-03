import { type ResolversTypes } from '../graphql'

export async function deserializeCreateDocumentInput (documentInput: ResolversTypes['CreateDocumentInput']): Promise<any> {
  function name (documentInput): string {
    return documentInput.name
  }

  async function buffer (documentInput): Promise<any> {
    const { createReadStream } = await documentInput.buffer
    const stream = createReadStream()
    const data = []

    return new Promise((resolve, reject) => {
      stream.on('data', chunk => { data.push(chunk) })

      stream.on('end', async () => { resolve(Buffer.concat(data)) })

      stream.on('error', reject)
    })
  }

  return {
    name: name(documentInput),
    buffer: await buffer(documentInput)
  }
}

export function serializeDocument (document): ResolversTypes['Document'] {
  function id (document): string {
    return 'id'
  }

  function name (document): string {
    return 'name'
  }

  return {
    id: id(document),
    name: name(document)
  }
}
