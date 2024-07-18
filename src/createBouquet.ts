import DBClient from "./dbUtils/dbClient";
import oracledb from 'oracledb';
import { CREATEBOUQUETDTO } from "./types/request-dtos/createBouquetDto";

export async function createBouquet(bouquet: CREATEBOUQUETDTO, userId: number) {
    const dbClient = new DBClient();
    try {
        await dbClient.connect();

        // returned die ID des erstellten Bouquets
        const bouquetId = await createBouquetEntry(dbClient, bouquet.name, userId);
        await addFlowersToBouquet(dbClient, bouquetId, bouquet.flowerIds)

        await dbClient.commitTransaction();
        return true;
    } catch (err) {
        console.error("Error in addFlowersToBouquet: ", err);
        return false;
    } finally {
        await dbClient.disconnect();
    }
}

async function createBouquetEntry(dbClient: DBClient, bouquetName: string, userId: number) {
    const query = `
            INSERT INTO bouquets (name, user_id) 
            VALUES ( :bouquetName, :userId )
            RETURNING id INTO :id
        `;
    const binds = {
        bouquetName,
        userId,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
    const result = (await dbClient.executeQuery(query, binds));
    // returned die ID des erstellten Bouquets
    return result.outBinds.id[0];
}

async function addFlowersToBouquet(dbClient: DBClient, bouquetId: number, flowerIds: number[]) {
    const query = `INSERT INTO bouquet_has_flower (bouquet_id, flower_id) VALUES ( :bouquetId, :flowerId )`;
    const binds = flowerIds.map(flowerId => ({ bouquetId, flowerId }));
    await dbClient.executeMany(query, binds);
}