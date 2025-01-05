export default class User {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;

    constructor(
        id: number,
        username: string,
        password: string,
        name: string,
        email: string
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
    }
}