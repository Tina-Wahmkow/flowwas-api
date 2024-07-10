import { DBFLOWER } from "../types/db-responses/DbFlower";
import FLOWER from "../types/Flower";

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
