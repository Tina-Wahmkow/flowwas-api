import oracledb, { ConnectionAttributes } from 'oracledb';
import dbConfig from './config/dbconfig';

export default async function getFlowers(color: string) {
    await run(color);
}

async function run(color: string) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig as ConnectionAttributes);

        const result = await connection.execute(
            `SELECT *
             FROM flowers
             WHERE color = :color`,

            // The "bind value" 3 for the bind variable ":idbv"
            [color],

            // Options argument.  Since the query only returns one
            // row, we can optimize memory usage by reducing the default
            // maxRows value.  For the complete list of other options see
            // the documentation.
            /* {
                maxRows: 1
                //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
                //, fetchArraySize: 100                    // internal buffer allocation size for tuning
            } */);
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                // Connections should always be released when not needed
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}