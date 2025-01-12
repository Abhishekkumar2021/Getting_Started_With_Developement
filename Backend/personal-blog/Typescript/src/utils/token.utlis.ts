import User from "../models/user.js";

export function getToken(user: User){
    return `${user.id}_${user.username}`
}