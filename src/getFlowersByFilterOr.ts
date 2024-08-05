import { BindParameters } from "oracledb";
import DBClient from "./dbUtils/dbClient";
import { convertFlowerData } from "./helper/dbConverter";
import { FLOWERFILTER } from "./types/FlowerFilter";
import { DBFLOWER } from "./types/db-responses/DbFlower";

export async function getFlowersByFilterOr(filter: FLOWERFILTER) {
  const res = await getFlowersFromDB(filter);
  if (res) {
    const flowers = convertFlowerData(res);
    const response = Array.from(new Set(flowers.map(a => a.id)))
      .map(id => {
        return flowers.find(a => a.id === id)
      })
    return response
  }
  else return "no Results found";
}

async function getFlowersFromDB(filter: FLOWERFILTER) {
  const dbClient = new DBClient();
  try {
    await dbClient.connect();
    let bindVars: { [key: string]: string } = {};

    /* add color filter */
    let colorCondition = '';
    if (filter.color && filter.color.length) {
      colorCondition = `AND color IN (${filter.color.map((_, index) => `:color${index}`).join(', ')})`
      // cant use array directly for bind, so we have to generate variables in the PS that we can assert later
      filter.color.forEach((color, index) => {
        bindVars[`color${index}`] = color;
      });
    }

    let result: DBFLOWER[] = [];
    if (filter.searchTerm && filter.searchTerm.length) {
      for (let index = 0; index < filter.searchTerm.length; index++) {
        const term = filter.searchTerm[index];
        const nameCondition = filter.searchTerm.map((_, index) => `LOWER(name) LIKE '%' || :lower_name${index} || '%'`).join(' OR ')
        let latinNameCondition = filter.searchTerm.map((_, index) => `LOWER(latin_name) LIKE '%' || :lower_name${index} || '%'`).join(' OR ');
        const query = `
      SELECT id, name, latin_name, color, image, description, associations
        FROM flowers
        WHERE 1=1
        ${colorCondition}
      AND (
        ${nameCondition}
        OR ${latinNameCondition}
        OR CONTAINS(description, 'SYN(' || :term || ', flower-thes)', 0) > 0
      )`

        bindVars[`term`] = term;
        filter.searchTerm.forEach((word, index) => bindVars[`lower_name${index}`] = word.toLowerCase());
        const response = await dbClient.executeQuery(query, bindVars);
        result = result.concat(response.rows)
      }
    }
    return result;
  } catch (err) {
    console.error("Error in getFlowersByFilter: ", err);
  } finally {
    await dbClient.disconnect();
  }
}