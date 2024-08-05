import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import DBClient from "./dbUtils/dbClient";
import OracleDB, { BindParameters, Lob } from "oracledb";

type CSVFLOWER = {
    id: number;
    name: string;
    latin_name: string;
    color: string;
    image: string;
    link_image: string;
    description: string;
    link_description: string;
    association_term1: string;
    association_term2?: string;
    association_term3?: string;
    association_term4?: string;
    association_term5?: string;
    association_term6?: string;
    association_term7?: string;
    association_term8?: string;
};

async function importFlowers(values: CSVFLOWER[]) {
    values.shift(); // removes headings object from array
    const dbClient = new DBClient();
    try {
        await dbClient.connect();

        for (let index = 0; index < values.length; index++) {
            const value = values[index];
            const imageBuffer = fs.readFileSync(path.resolve(__dirname, `flower_images/${value.image}`));
            let associations = [value.association_term1];
            if (value.association_term2) associations.push(value.association_term2);
            if (value.association_term3) associations.push(value.association_term3);
            if (value.association_term4) associations.push(value.association_term4);
            if (value.association_term5) associations.push(value.association_term5);
            if (value.association_term6) associations.push(value.association_term6);
            if (value.association_term7) associations.push(value.association_term7);
            if (value.association_term8) associations.push(value.association_term8);

            const query = `INSERT INTO FLOWERS (name, latin_name, color, image, description, associations, img) VALUES (:name , :latin_name, :color, :image, :description, :associations, EMPTY_BLOB()) RETURNING img INTO :img`;
            const binds: BindParameters = {
                name: value.name,
                latin_name: value.latin_name,
                color: value.color,
                image: value.image,
                description: value.description,
                associations: associations.join(","),
                img: { type: OracleDB.BLOB, dir: OracleDB.BIND_OUT }
            }

            const result = (await dbClient.executeQuery(query, binds))

            const lob = result.outBinds.img[0] as Lob;
            await lob.write(imageBuffer);
            await lob.close();
            await dbClient.commitTransaction();
            console.log(`Flower ${value.name} inserted successfully. (${index+1} / ${values.length})`)
        }

        console.log('All Flowers inserted :D')
        return true;
    } catch (error) {
        console.error("Error in createFlowers: ", error);
        return false;
    } finally {
        await dbClient.disconnect()
    }
}


export function readFromCSV() {
    const csvFilePath = path.resolve(__dirname, 'dbUtils/flower_data.csv');

    const headers = ['id', 'name', 'latin_name', 'color', 'image', 'link_image', 'description', 'link_description', 'association_term1', 'association_term2', 'association_term3', 'association_term4', 'association_term5', 'association_term6', 'association_term7', 'association_term8'];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
        delimiter: ',',
        columns: headers,
    }, async (error, result: CSVFLOWER[]) => {
        if (error) {
            console.error(error);
        }
        await importFlowers(result);
    });
}