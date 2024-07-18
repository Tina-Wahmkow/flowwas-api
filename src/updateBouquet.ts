import DBClient from "./dbUtils/dbClient";
import { UPDATEBOUQUETDTO } from "./types/request-dtos/updateBouquetDto";
import { checkIfBouquetBelongsToUser } from "./helper/dbValidater";
import { DBError } from "oracledb";

export async function updateBouquet(bouquet: UPDATEBOUQUETDTO, userId: number) {
    if (!(await checkIfBouquetBelongsToUser(bouquet.bouquetId, userId)).length) return false;

    const dbClient = new DBClient();
    try {
        await dbClient.connect();
        const query = `INSERT INTO bouquet_has_flower (bouquet_id, flower_id) VALUES ( :bouquetId, :flowerId )`;

        for (const flowerId of bouquet.flowerIds) {
            try {
                const binds = {
                    bouquetId: bouquet.bouquetId,
                    flowerId
                };
                await dbClient.executeQuery(query, binds);
            } catch (err) {
                // Error: ORA-00001: unique constraint (C##MMDBA24_003.PK_BOUQUET) violated
                const error = err as DBError
                if ((error as DBError).errorNum === 1 && error.code === 'ORA-00001') {
                    console.warn(`Skipping flower ${flowerId} due to unique constraint violation.`);
                } else throw err;
            }
        }

        await dbClient.commitTransaction();
        return true;
    } catch (err) {
        console.error("Error in updateBouquet: ", err);
    } finally {
        await dbClient.disconnect();
    }
}