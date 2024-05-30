import { ConnectionAttributes } from "oracledb";

export const config: ConnectionAttributes = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // For information on connection strings see:
    // https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#connectionstrings
    connectString: process.env.DB_CONNECTIONSTRING,
    externalAuth: false,
};

export default { config }
