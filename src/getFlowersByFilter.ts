import { BindParameters } from "oracledb";
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

    let searchTermCondition = '';
    let nameCondition = '';
    let latinNameCondition = '';
    let withStatements = '';
    if (filter.searchTerm && filter.searchTerm.length) {
      filter.searchTerm.forEach((name, index) => {
        if (index > 0) {/* gibt mehr als einen Searchterm */
          nameCondition += ' OR ';
          latinNameCondition += ' OR ';

          /* werden nur erstellt, wenn mehr als ein Searchterm vorhanden ist */
          // '||' -> konkateniert 2 strings zsm --> Bsp.: '%' || :name || '%' -> '%:name%'
          withStatements += `,
            flower_matches${index} AS (
              SELECT *
              FROM flower_matches${index - 1}
              WHERE (
                CONTAINS(description, 'SYN(' || :name${index} || ', flower-thes)', 0) > 0
              )
            )`

        }
        nameCondition += `LOWER(name) LIKE '%' || :lower_name${index} || '%'`
        latinNameCondition += `LOWER(latin_name) LIKE '%' || :lower_name${index} || '%'`
        bindVars[`name${index}`] = name;
        bindVars[`lower_name${index}`] = name.toLowerCase();
      })

      searchTermCondition = `
      AND (
        ${nameCondition}
        OR (${latinNameCondition})
        OR CONTAINS(description, 'SYN(' || :name0 || ', flower-thes)', 0) > 0
      )`
    }

    /* in sqlScripts\select_statements_examples.sql kann ein Beispiel für diese Query nachgeschaut werden */
    const query = `
      WITH flower_matches0 AS (
        SELECT *
        FROM flowers
        WHERE 1=1
        ${colorCondition}
        ${searchTermCondition}
      )
      ${withStatements}
      SELECT *
      FROM flower_matches${filter.searchTerm?.length ? filter.searchTerm?.length - 1 : 0}`

    return (await dbClient.executeQuery(query, bindVars)).rows as DBFLOWER[];
  } catch (err) {
    console.error("Error in getFlowersByFilter: ", err);
  } finally {
    await dbClient.disconnect();
  }
}