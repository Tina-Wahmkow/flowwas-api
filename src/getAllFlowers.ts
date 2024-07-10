import DBClient from "./dbUtils/dbClient";
import { convertFlowerData } from "./helper/dbConverter";
import { DBFLOWER } from "./types/db-responses/DbFlower";

export async function getAllFlowers() {
    const res = await getAllFlowersTable();
    if (res) return convertFlowerData(res);
    else return "no Flowers found";
}

// Funktion zum Abrufen aller Inhalte und Spalten einer Tabelle
async function getAllFlowersTable() {
    const dbClient = new DBClient();

    try {
        await dbClient.connect();
        const query = `SELECT * FROM flowers`;
        const result: DBFLOWER[] = (
            await dbClient.executeQuery(query)
        ).rows;

        return result;
    } catch (err) {
        console.error("Error in getAllFlowersTable: ", err);
    } finally {
        await dbClient.disconnect();
    }
}