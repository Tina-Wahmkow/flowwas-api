import DBClient from "../dbUtils/dbClient";

export async function checkIfBouquetBelongsToUser(bouquetId: string, userId: number) {
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