export type RegisterPayload = {
    username: string,
    email: string,
    password: string,
    name: string
}

export type LoginPayload = {
    username: string | undefined,
    password: string,
}