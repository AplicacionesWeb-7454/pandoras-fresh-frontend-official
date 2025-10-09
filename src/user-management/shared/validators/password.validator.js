export function isStrongPassword(pwd) {
    return typeof pwd === 'string' && pwd.length >= 8
}
