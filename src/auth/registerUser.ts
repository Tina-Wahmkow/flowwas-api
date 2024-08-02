import DBClient from "../dbUtils/dbClient";
import { USER } from "../types/User";
import bcrypt from "bcrypt";

export async function registerUser(user: USER) {
    return await createUserInDB(user);
}

// neuen Nutzer in DB anlegen
async function createUserInDB(user: USER) {
    const dbClient = new DBClient();

    try {
        await dbClient.connect();
        const query = `INSERT INTO users (username, password, isadmin) values (:username, :password, 0)`;
        const passwordHash = await bcrypt.hash(user.password, 10);
        await dbClient.executeQuery(query, {username: user.username, password: passwordHash})
        await dbClient.commitTransaction();
        return true;
    } catch (err) {
        console.error("Error in findUserByName: ", err);
        return err;
    } finally {
        await dbClient.disconnect();
    }
}