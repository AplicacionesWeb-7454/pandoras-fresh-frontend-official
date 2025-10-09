import { roleService } from '../services/role.service'

export async function assignRoleUseCase(userId, role) {
    return roleService.assignRole(userId, role)
}
