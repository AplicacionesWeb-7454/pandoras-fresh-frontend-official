import { Role } from '../../domain/model/role.entity'

export function toRoleEntity(dto) {
    return new Role({ id: dto.id, name: dto.name })
}
