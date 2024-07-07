import express from "express";
import cors from 'cors';
import { getFlowers } from "./getFlowers";
import { getAllFlowers } from "./getFlowers";
import deleteBouquet from "./deleteBouquet";
import { readFromCSV } from "./dbImport";
import { GETFLOWERSDTO } from "./types/GetFlowersDto";

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3002', //reacts origin
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
  console.log("Available under URL: http://localhost:",port);
});

// get flowers based on certain filter criteria, e.g. color (1), description (n), name (1), latin_name (1), association
app.get("/flowers", async (request, response) => {
  const result = await getFlowers(
    (request.query as unknown as GETFLOWERSDTO).color
  );
  response.json(result);
});

// Neuer Endpunkt zum Abrufen aller Inhalte und Spalten der Tabelle Flowers
app.get('/allFlowers', async (req, res) => {
  try {
    const data = await getAllFlowers();
    res.json(data);
  } catch (err) {
    console.error('Error in /allFlowers:', err);
    res.status(500).send('Error fetching data from Oracle database');
  }
});


// get all bouquets including their flowers for the user with the given userId
app.get("/{userid}/bouquets", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

// create a new bouquet or update an existing one
app.put("/bouquets", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

// delete a bouquet based on the given bouquetId
app.delete("/bouquets/:bouquetId", async (request, response) => {
  const result = await deleteBouquet(request.params.bouquetId);

  if (result) response.status(204);
  else response.status(404);
});

app.post("/flowers/import-flowers-from-csv", (request, response) => {
  readFromCSV();
  response.status(204)
});