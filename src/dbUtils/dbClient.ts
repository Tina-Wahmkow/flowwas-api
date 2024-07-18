import oracledb, { Connection } from "oracledb";
import dbconfig from "./dbconfig";

export default class DBClient {
  private connection: Connection | null = null;

  async connect(): Promise<void> {
    if (this.connection) {
      return;
    }

    try {
      this.connection = await oracledb.getConnection({
        user: dbconfig.DB_USERNAME,
        password: dbconfig.DB_PASSWORD,
        connectString: dbconfig.DB_CONNECTIONSTRING,
        externalAuth: false,
      });
    } catch (err) {
      console.error("Connection failed: ", err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.close();
      } catch (err) {
        console.error("Failed to close the connection: ", err);
        throw err;
      } finally {
        this.connection = null;
      }
    }
  }

  async executeQuery(query: string, binds: oracledb.BindParameters = {}): Promise<any> {
    if (!this.connection) {
      throw new Error("Not connected to the database");
    }

    try {
      const result = await this.connection.execute(query, binds);
      return result;
    } catch (err) {
      console.error("Query execution failed: ", err);
      throw err;
    }
  }

  async executeMany(query: string, binds: any[] = []): Promise<any> {
    if (!this.connection) {
      throw new Error("Not connected to the database");
    }

    try {
      const result = await this.connection.executeMany(query, binds);
      return result;
    } catch (err) {
      console.error("Query execution failed: ", err);
      throw err;
    }
  }

  async commitTransaction(){
    if (!this.connection) {
      throw new Error("Not connected to the database");
    }

    await this.connection.commit();
  }
}