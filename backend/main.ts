import { User } from './models/user'; 
import { client, addUser, createUser, passwordUserHash, deleteUser, getAllUsers, authenticateUser } from './models/userRepository';

async function main() {
  try {
      let newUser = await createUser("444", "bebra@gmail.com");
      newUser = await passwordUserHash(newUser, "123123");
      await addUser(newUser);
      console.log(newUser);

      const users = await getAllUsers();
      console.log("bebra");
      console.log(users);
      const resultUser = await authenticateUser("444", "123123");
      console.log(resultUser);
  } catch (error) {
      console.error('Error:', error);
  } finally {
      await client.end();
  }
}

main();