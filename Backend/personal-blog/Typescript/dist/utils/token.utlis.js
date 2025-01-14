import { UserDatabase } from "../db/user.db.js";
export function getToken(user) {
    const date = new Date();
    return `${user.id}*${user.username}*${date.getTime()}`;
}
export function tokenValidation(token) {
    const tokenDetails = token.split("*");
    const userDb = new UserDatabase();
    const id = parseInt(tokenDetails[0]);
    const username = tokenDetails[1];
    const givenTime = parseInt(tokenDetails[2]);
    const currTime = new Date().getTime();
    const diffInMilliseconds = Math.abs(currTime - givenTime);
    const minDiff = diffInMilliseconds / (1000 * 60);
    if (minDiff > 60) {
        return false;
    }
    let user = userDb.getUserById(id);
    if (!user)
        return false;
    user = userDb.getUserByUsername(username);
    if (!user)
        return false;
    return true;
}
