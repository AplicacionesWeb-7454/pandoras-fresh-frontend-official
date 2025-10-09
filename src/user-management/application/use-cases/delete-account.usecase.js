import { userService } from '../services/user.service'

export async function deleteAccountUseCase() {
    return userService.deleteOwnAccount()
}
