import { type Session } from 'a-remarkable-js-sdk'
import { type ResolversTypes } from '../graphql'

export function serializeSession (session: Session): ResolversTypes['Session'] {
  function expiresAt (session: Session): string {
    return session.expiresAt.toString()
  }

  function token (session: Session): string {
    return session.token
  }

  return {
    expiresAt: expiresAt(session),
    token: token(session)
  }
}
