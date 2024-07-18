import { BOUQUET } from "../types/Bouquet";
import { DBBOUQUET } from "../types/db-responses/DbBouqquet";
import { DBFLOWER } from "../types/db-responses/DbFlower";
import { DBUSER } from "../types/db-responses/DbUser";
import FLOWER from "../types/Flower";
import { USER } from "../types/User";

export function convertFlowerData(data: DBFLOWER[]): FLOWER[] {
    return data.map(([id, name, latin_name, color, image, description, associations]) => ({
        id,
        name,
        latin_name,
        color,
        image,
        description: description.replace(/\n/g, " "),
        associations: associations.split(",")
    }));
}

export function convertDbUserToUser(data: DBUSER): USER {
    const [id, username, password,] = data
    return {
        id,
        username,
        password
    };
}

export function convertToBouquet(data: DBBOUQUET[]): BOUQUET[] {
    const bouquetsMap: { [key: number]: { name: string, flowers: FLOWER[] } } = {};

    data.forEach((item) => {
        const bouquetId = item[0];
        const bouquetName = item[1];
        item.shift();
        const flower: FLOWER = convertFlowerData([item as unknown as DBFLOWER])[0];

        // bouquetIds + namen werden in map gespeichert, wenn noch nicht da
        if (!bouquetsMap[bouquetId]) bouquetsMap[bouquetId] = { name: bouquetName, flowers: [] };

        // Blumen werden zu einzelnen BouquetIds hinterlegt
        bouquetsMap[bouquetId].flowers.push(flower);
    });

    // bouquetMap wird in response objekt umgewandelt und returned
    return Object.keys(bouquetsMap).map((key) => ({
        bouquetId: Number(key),
        name: bouquetsMap[Number(key)].name,
        flowers: bouquetsMap[Number(key)].flowers
    }));
}