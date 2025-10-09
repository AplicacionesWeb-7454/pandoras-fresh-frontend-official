import { userService } from '../services/user.service'

export async function editProfileUseCase(payload) {
    return userService.updateProfile(payload)
}
