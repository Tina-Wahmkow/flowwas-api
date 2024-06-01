import express, { json } from "express";
import getFlowers from "./getFlowers";
import { GETFLOWERSDTO } from "./types/GetFlowersDto";
import FLOWER from "./types/Flower";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
  console.log("Available under URL: 'http://localhost:3000'");
});

app.get("/flowers", async (request, response) => {
  const result = await getFlowers((request.query as unknown as GETFLOWERSDTO).color);

  response.json(result)
});

app.get("/{userid}/bouquets", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

app.put("/bouquet", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

app.delete("/bouquet", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
