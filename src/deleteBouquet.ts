import DBClient from "./dbUtils/dbClient";
import { checkIfBouquetBelongsToUser } from "./helper/dbValidater";

export default async function deleteBouquet(bouquetId: string, userId: number) {
  if (!(await checkIfBouquetBelongsToUser(bouquetId, userId)).length) return false;

  const dbClient = new DBClient();
  try {
    await dbClient.connect();

    const deleteRelationQuery = `
      DELETE
      FROM bouquet_has_flower
      WHERE bouquet_id = :bouquetId
    `;
    const deleteBouquetQuery = `
        DELETE
        FROM bouquets
        WHERE id = :bouquetId AND user_id = :userId
      `;

    await dbClient.executeQuery(deleteRelationQuery, [bouquetId]);
    await dbClient.executeQuery(deleteBouquetQuery, [bouquetId, userId]);
    await dbClient.commitTransaction();
    return true;
  } catch (err) {
    console.error("Error in deleteBouquet: ", err);
    return false;
  } finally {
    await dbClient.disconnect();
  }
}
