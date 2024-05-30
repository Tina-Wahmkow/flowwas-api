import express, { json, Express, Request, Response } from 'express';
import { config } from 'dotenv';
import './getFlowers.ts';
import getFlowers from './getFlowers.ts';

config();
const app: Express  = express();
app.use(json());

const port = 3000;

app.listen(port, () => {
   console.log("Server Listening on PORT:", port);
   console.log("Available under URL: 'http://localhost:3000'", port);
});

app.get("/flowers", (request: Request, response: Response) => {
   const result = getFlowers(request.params.color);

   response.send(result);
});

app.get("/{userid}/bouquets", (request: Request, response: Response) => {
   const status = {
      "Status": "Running"
   };

   response.send(status);
});

app.put("/bouquet", (request: Request, response: Response) => {
   const status = {
      "Status": "Running"
   };

   response.send(status);
});

app.delete("/bouquet", (request: Request, response: Response) => {
   const status = {
      "Status": "Running"
   };

   response.send(status);
});

app.get('/', (req, res) => {
   res.send('Hello, World!');
});

