import { QueryResult } from 'pg';
import { hashPassword } from '../hash';
import { User } from './user';
import { generateRandomString } from '../utils/generateRandomString';
import { client } from '../database/db';
import jwt from "jsonwebtoken";
import { config } from "../config";

export async function registerUser(username: string, email: string, password: string) : Promise<User | null> {
    try {
        let newUser = await createUser(username, email);
        newUser = await passwordUserHash(newUser, password);
        await addUser(newUser);
        return newUser;
    }
    catch(error) {
        console.error("Error registering user: ", error);
        return null;
    }
}

export async function authenticateUser(username: string, password: string): Promise<{ user: User; token: string } | null> {
    try {
        const query = 'SELECT * FROM users WHERE username = $1';
        const result: QueryResult<User> = await client.query(query, [username]);

        if (result.rowCount === 1) {
            const user = result.rows[0];
            const hashedPassword = await hashPassword(user.password_salt + password);

            if (hashedPassword.hash === user.password_hash) {
                const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });
                return { user, token };
            } else {
                console.error('Invalid password');
                return null;
            }
        } else {
            console.error('User not found');
            return null;
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
}

export async function createUser(username: string, email: string) : Promise<User> {
    try {
        const passwordSalt = await generateRandomString(5, 10);

        return {
            username,
            email,
            password_hash: '',
            password_salt: passwordSalt
        };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export async function passwordUserHash(user: User, password_for_hash: string) : Promise<User> {
    try {
        const result = await hashPassword(user.password_salt + password_for_hash);
        user.password_hash = result.hash;
        return user;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

export async function addUser(user: User) : Promise<void> {
    try {
        const query = `
        INSERT INTO users (username, email, password_hash, password_salt)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;
        const values = [user.username, user.email, user.password_hash, user.password_salt];
        const result: QueryResult<User> = await client.query(query, values);

        if (result.rowCount === 1) {
            console.log('User added successfully');
        } else {
            console.error('Failed to add user');
        }
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export async function deleteUser(id: number) : Promise<void> {
    try {
        const query = 'DELETE FROM users WHERE id = $1';
        await client.query(query, [id]);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export async function getAllUsers() : Promise<User[]> {
    try {
        const query = "SELECT * FROM users";
        const result: QueryResult<User> = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting all users:', error);
        throw error;
    }
};