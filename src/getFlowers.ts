import DBClient from "./dbUtils/dbClient";
import FLOWER from "./types/Flower";
import { DBFLOWER } from "./types/db-responses/DbFlower";

export default async function getFlowers(color: string) {
  const res = await getFlowersFromDB(color);
  if (res) return convertFlowerData(res);
  else return "no Results found";
}

async function getFlowersFromDB(color: string) {
  const dbClient = new DBClient();

  try {
    await dbClient.connect();
    const query = `SELECT * FROM flowers WHERE color = :color`;
    const result: DBFLOWER[] = (
      await dbClient.executeQuery(query, [color])
    ).rows;

    return result;
  } catch (err) {
    console.error("Error in getFlowers: ", err);
  } finally {
    await dbClient.disconnect();
  }
}

function convertFlowerData(data: DBFLOWER[]): FLOWER[] {
  return data.map(([id, name, latin_name, color, image, description]) => ({
    id,
    name,
    latin_name,
    color,
    image,
    description: description.replace(/\n/g, " "),
  }));
}
