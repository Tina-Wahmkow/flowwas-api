import DBClient from "./dbUtils/dbClient";
import { convertToBouquet } from "./helper/dbConverter";
import { DBBOUQUET } from "./types/db-responses/DbBouqquet";

export async function getBouquetsForUser(userId: number) {
    const res = await getBouquetsFromDB(userId); 
    if (res) return convertToBouquet(res)
    else return [];
}

async function getBouquetsFromDB(userId: number) {
    const dbClient = new DBClient();

    try {
        await dbClient.connect();
        const query = `
            SELECT b.id as bouquetId, b.name as bouquetName, f.id as flowerid, f.name as flowerName, f.latin_name, f.color, f.image, f.description, f.associations
            FROM bouquets b
            JOIN bouquet_has_flower bf ON bf.bouquet_id = b.id
            JOIN flowers f ON f.id = bf.flower_id
            WHERE b.user_id = :userId`;
        const result: DBBOUQUET[] = (
            await dbClient.executeQuery(query, [userId])
        ).rows;
        return result;
    } catch (err) {
        console.error("Error in getBouquetsFromDB: ", err);
    } finally {
        await dbClient.disconnect();
    }
}