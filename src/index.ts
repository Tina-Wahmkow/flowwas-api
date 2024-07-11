import express, { Request, Response } from "express";
import cors from 'cors';
import { getFlowersByFilter } from "./getFlowersByFilter";
import deleteBouquet from "./deleteBouquet";
import { readFromCSV } from "./dbImport";
import { FLOWERFILTER } from "./types/FlowerFilter";
import { getAllFlowers } from "./getAllFlowers";
import { initPassport } from "./auth/passport";
import passport from "passport";

const app = express();
const port = 3002;

app.use(cors({
  origin: `http://localhost:${port}`, //reacts origin
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

initPassport(app);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
  console.log("Available under URL: http://localhost:", port);
});

// get flowers based on certain filter criteria, e.g. color (1), description (n), name (1), latin_name (1), association
app.get("/flowers", async (request: Request, response: Response) => {
  const result = await getFlowersByFilter(
    (request.query as unknown as FLOWERFILTER)
  );
  response.json(result);
});

// Neuer Endpunkt zum Abrufen aller Inhalte und Spalten der Tabelle Flowers
app.get('/allFlowers', async (request: Request, response: Response) => {
  try {
    const data = await getAllFlowers();
    response.json(data);
  } catch (err) {
    console.error('Error in /allFlowers:', err);
    response.status(500).send('Error fetching data from Oracle database');
  }
});


// get all bouquets including their flowers for the user with the given userId
app.get("/{userid}/bouquets", (request: Request, response: Response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

// create a new bouquet or update an existing one
app.put("/bouquets", (request: Request, response: Response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

// delete a bouquet based on the given bouquetId
app.delete("/bouquets/:bouquetId", async (request: Request, response: Response) => {
  const result = await deleteBouquet(request.params.bouquetId);

  if (result) response.status(204);
  else response.status(404);
});

app.post("/flowers/import-flowers-from-csv", (request: Request, response: Response) => {
  readFromCSV();
  response.status(204)
});


app.post('/login', passport.authenticate('local'), async (req: Request, res: Response) => {
  res.json("You loggedin!!!");
});

app.get('/api/user', async (request: Request, response: Response) => {
  response.send({ user: request.params.user});
});