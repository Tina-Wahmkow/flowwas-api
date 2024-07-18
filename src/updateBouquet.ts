import DBClient from "./dbUtils/dbClient";
import { UPDATEBOUQUETDTO } from "./types/request-dtos/updateBouquetDto";
import { checkIfBouquetBelongsToUser } from "./helper/dbValidater";
import { DBError } from "oracledb";

export async function updateBouquet(bouquet: UPDATEBOUQUETDTO, userId: number) {
    if (!(await checkIfBouquetBelongsToUser(bouquet.bouquetId, userId)).length) return false;

    const dbClient = new DBClient();
    try {
        await dbClient.connect();
        await deleteExistingRelations(dbClient, bouquet.bouquetId);
        const query = `INSERT INTO bouquet_has_flower (bouquet_id, flower_id) VALUES ( :bouquetId, :flowerId )`;
        const binds = bouquet.flowerIds.map(flowerId => ({ bouquetId: bouquet.bouquetId, flowerId }));

        await dbClient.executeMany(query, binds)
        await dbClient.commitTransaction();
        return true;
    } catch (err) {
        console.error("Error in updateBouquet: ", err);
    } finally {
        await dbClient.disconnect();
    }
}

async function deleteExistingRelations(dbClient: DBClient, bouquetId: string) {
    const deleteRelationQuery = `
        DELETE
        FROM bouquet_has_flower
        WHERE bouquet_id = :bouquetId
      `;
    await dbClient.executeQuery(deleteRelationQuery, [bouquetId]);
}