import DBClient from "./dbUtils/dbClient";
import { convertFlowerData } from "./helper/dbConverter";
import { FLOWERFILTER } from "./types/FlowerFilter";
import { DBFLOWER } from "./types/db-responses/DbFlower";

export async function getFlowersByFilter(filter: FLOWERFILTER) {
  const res = await getFlowersFromDB(filter);
  if (res) return convertFlowerData(res);
  else return "no Results found";
}

async function getFlowersFromDB(filter: FLOWERFILTER) {
  const dbClient = new DBClient();

  try {
    await dbClient.connect();
    const bindVars: { [key: string]: string } = {};
    let query = `SELECT * FROM flowers `;

    if (filter.color) {
      const placeholders = filter.color.map((_, index) => `:color${index}`).join(', ');
      query += `WHERE color IN (${placeholders})`;

      // cant use array directly for bind, so we have to generate variables in the PS that we can assert later 
      filter.color.forEach((color, index) => {
        bindVars[`color${index}`] = color;
      });
    }

    if (filter.searchTerm) {
      // '||' -> concatenates 2 strings together
      query += `${!filter.color ? 'WHERE' : ' AND'} (LOWER(name) LIKE '%' || :name || '%' OR LOWER(latin_name) LIKE '%' || :name || '%' OR CONTAINS(description, 'SYN(' || :searchterm || ', flower-thes)', 0) > 0)`;
      bindVars['name'] = filter.searchTerm.toLowerCase();
      bindVars['searchterm'] = capitalizeFirstLetter(filter.searchTerm.toLowerCase());
    }
    
    return (await dbClient.executeQuery(query, bindVars)).rows as DBFLOWER[];
  } catch (err) {
    console.error("Error in getFlowersByFilter: ", err);
  } finally {
    await dbClient.disconnect();
  }
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
