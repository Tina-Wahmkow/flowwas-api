import DBClient from "./dbUtils/dbClient";

export default async function deleteBouquet(bouquetId: string) {
  const dbClient = new DBClient();

  try {
    await dbClient.connect();
    const query = `
        DELETE *
        FROM Bouquets
        WHERE id = :bouquetId
      `;
    await dbClient.executeQuery(query, [bouquetId]);
    return true;
  } catch (err) {
    console.error("Error in deleteFlowers: ", err);
    return false;
  } finally {
    await dbClient.disconnect();
  }
}
