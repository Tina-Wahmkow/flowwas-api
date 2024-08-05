import DBClient from "./dbUtils/dbClient";

export default async function getFlowerImage(flowerid: string) {
    const dbClient = new DBClient();

    try {
        await dbClient.connect();
        const query = `SELECT image, img FROM flowers WHERE id = :flowerid`;
        const result = (await dbClient.executeQuery(query, [flowerid])).rows;
        if (result.length === 0) return null;
        const imageBlob = result[0][1];
        const imageData = await imageBlob.getData();
        const imageName = result[0][1];
        return { imageData, imageName };
    } catch (err) {
        console.error("Error in getAllFlowersTable: ", err);
    } finally {
        await dbClient.disconnect();
    }
}