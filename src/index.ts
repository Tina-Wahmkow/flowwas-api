import express from "express";
import getFlowers from "./getFlowers";
import { GETFLOWERSDTO } from "./types/GetFlowersDto";
import deleteBouquet from "./deleteBouquet";
import { readFromCSV } from "./dbImport";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
  console.log("Available under URL: 'http://localhost:3000'");
});

// get flowers based on certain filter criteria, e.g. color (1), description (n), name (1), latin_name (1), association
app.get("/flowers", async (request, response) => {
  const result = await getFlowers(
    (request.query as unknown as GETFLOWERSDTO).color
  );
  response.json(result);
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
