import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

type CSVFLOWER = {
    id: number;
    name: string;
    latin_name: string;
    color: number;
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

function importFlowers(values: CSVFLOWER[]) {
    values.shift(); // removes headings object from array

    values.map((value) => {
        let associations = [value.association_term1];
        if (value.association_term2) associations.push(value.association_term2);
        if (value.association_term3) associations.push(value.association_term3);
        if (value.association_term4) associations.push(value.association_term4);
        if (value.association_term5) associations.push(value.association_term5);
        if (value.association_term6) associations.push(value.association_term6);
        if (value.association_term7) associations.push(value.association_term7);
        if (value.association_term8) associations.push(value.association_term8);

        console.log(`INSERT INTO FLOWERS (id, name, latin_name, color, image, description, associations) VALUES (${value.id}, '${value.name}', '${value.latin_name}', '${value.color}', '${value.image}', '${value.description}', '${associations.join(",")}');`)
    })

    return true;
}


export function readFromCSV() {
    const csvFilePath = path.resolve(__dirname, 'flower_data.csv');

    const headers = ['id', 'name', 'latin_name', 'color', 'image', 'link_image', 'description', 'link_description', 'association_term1', 'association_term2', 'association_term3', 'association_term4', 'association_term5', 'association_term6', 'association_term7', 'association_term8'];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
        delimiter: ',',
        columns: headers,
    }, (error, result: CSVFLOWER[]) => {
        if (error) {
            console.error(error);
        }
        importFlowers(result);
    });
}