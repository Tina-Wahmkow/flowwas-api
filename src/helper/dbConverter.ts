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
    const [ _, username, password, isAdmin] = data
    return {
        username, 
        password, 
        isAdmin
    };
}