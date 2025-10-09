import { roleApi } from '../../infrastructure/api/role-api'

export const roleService = {
    async assignRole(userId, role) {
        return roleApi.assignRole(userId, role)
    }
}
