import DBClient from "./dbUtils/dbClient";

async function checkIfBouquetBelongsToUser(bouquetId: string, userId: number) {
  const dbClient = new DBClient();

  try {
    await dbClient.connect();
    const getBouquetsForUser = `
        SELECT b.id
        FROM bouquets b
        WHERE b.user_id = :userId AND b.id = :bouquetId
        `;

    return (await dbClient.executeQuery(getBouquetsForUser, [userId, bouquetId])).rows;
  } catch (err) {
    console.error("Error in deleteBouquet: ", err);
    return [];
  } finally {
    await dbClient.disconnect();
  }
}

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
