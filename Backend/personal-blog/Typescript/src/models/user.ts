export default class User {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        username: string,
        password: string,
        name: string,
        email: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}