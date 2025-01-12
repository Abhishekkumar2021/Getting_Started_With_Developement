export function getToken(user) {
    return `${user.id}_${user.username}`;
}
