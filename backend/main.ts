import { Client, QueryResult } from 'pg';
import { hashPassword } from './hash';
import { User } from './user';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mbf_crm',
  password: '123123',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

///////////////////

async function createUser(user: User) : Promise<void> {
    const { hash, salt } = await hashPassword(user.password_hash);
    const query = `
    INSERT INTO users (username, email, password_hash, password_salt)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const values = [user.username, user.email, hash, salt];
    const result: QueryResult<User> = await client.query(query, values);
};

async function deleteUser(id: number) : Promise<void> {
    const query = 'DELETE FROM users WHERE id = $1';
    await client.query(query, [id]);
};

async function getAllUsers() : Promise<User[]> {
    const query = "SELECT * FROM users";
    const result: QueryResult<User> = await client.query(query);
    return result.rows;
}

///////////////////


async function main() {
    const newUser: User = {
      username: 'johndoe',
      email: 'johndoe@example.com',
      password_hash: 'mypassword',
      password_salt: ''
    };
  
    const createdUser = await createUser(newUser);
    console.log("Created user");

    const users = await getAllUsers();
    console.log('All users:', users);
}

main();