import { Session } from '../../domain/model/session.entity'

export function toSessionEntity(dto) {
    return new Session({ token: dto.token, expiresAt: dto.expiresAt, remember: dto.remember })
}
