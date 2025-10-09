import { User } from '../../domain/model/user.entity'

export function toUserEntity(dto) {
    return new User({ id: dto.id, name: dto.name, email: dto.email, role: dto.role, roles: dto.roles })
}
