import DBClient from "../dbUtils/dbClient";
import { convertDbUserToUser } from "../helper/dbConverter";
import { DBUSER } from "../types/db-responses/DbUser";

export async function findUser(username: string) {
    const res = await findUserByName(username);
    if (res) return convertDbUserToUser(res)
    else "no User with that Username"
}

// Funktion zum Abrufen aller Inhalte und Spalten einer Tabelle
async function findUserByName(username: string) {
    const dbClient = new DBClient();

    try {
        await dbClient.connect();
        const query = `SELECT * FROM users WHERE username = :username`;
        const result: DBUSER[] = (
            await dbClient.executeQuery(query, [username])
        ).rows;

        return result[0];
    } catch (err) {
        console.error("Error in findUserByName: ", err);
    } finally {
        await dbClient.disconnect();
    }
}