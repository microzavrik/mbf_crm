export interface User {
    id?: number,
    username: string,
    email: string,
    password_hash: string,
    password_salt: string
};