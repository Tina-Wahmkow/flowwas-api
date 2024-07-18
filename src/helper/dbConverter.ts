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
    const bouquetsMap: { [key: number]: FLOWER[] } = {};

    data.forEach((item) => {
        const bouquetId = item[0];
        item.shift();
        const flower: FLOWER = convertFlowerData([item as unknown as DBFLOWER])[0];

        // bouquetIds werden in map gespeichert, wenn noch nicht da
        if (!bouquetsMap[bouquetId]) bouquetsMap[bouquetId] = [];

        // Blumen werden zu einzelnen BouquetIds hinterlegt
        bouquetsMap[bouquetId].push(flower);
    });

    // bouquetMap wird in response objekt umgewandelt und returned
    return Object.keys(bouquetsMap).map((key) => ({
        bouquetId: Number(key),
        flowers: bouquetsMap[Number(key)]
    }));
}