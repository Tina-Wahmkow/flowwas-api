import express, { Request, Response } from "express";
import cors from 'cors';
import session from "express-session";
import { getFlowersByFilter } from "./getFlowersByFilter";
import deleteBouquet from "./deleteBouquet";
import { readFromCSV } from "./dbImport";
import { FLOWERFILTER } from "./types/FlowerFilter";
import { getAllFlowers } from "./getAllFlowers";
import { initPassport, isAuthenticated } from "./auth/passport";
import passport from "passport";
import { registerUser } from "./auth/registerUser";
import { USER } from "./types/User";

const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: `http://localhost:${port}`, //reacts origin
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(session({
  secret: "This is a secret",
  resave: false,
  saveUninitialized: false
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
  const result = await getFlowersByFilter({
    color: request.query.color && !Array.isArray(request.query.color) ? [request.query.color] : request.query.color,
    searchTerm: request.query.searchTerm
  } as FLOWERFILTER);
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

app.post("/flowers/import-flowers-from-csv", (request: Request, response: Response) => {
  readFromCSV();
  response.status(204)
});

// -------------------         Authentication stuff         ------------------- //

app.post('/login', passport.authenticate('local'), async (req: Request, response: Response) => {
  response.json("You loggedin!!!");
});

app.post('/register', async (req: Request, response: Response) => {
  console.log(req.body)
  const res = await registerUser(req.body as USER);
  return res === true ?
    response.status(200).json("Successfully registered!")
    : response.status(500).json(res)
});

app.post('/logout', function (req: Request, res: Response, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.status(200).json("You are now logged out.");
  });
});

// -----   Bouquet related stuff (you need to be logged in to use that)   ----- //

// TODO

// get all bouquets including their flowers for the user with the given userId
app.get("/bouquets", isAuthenticated, (request: Request, response: Response) => {
  // userid aus req.user
  const status = {
    Status: "Running",
  };

  response.send(status);
});

// create a new bouquet or update an existing one
app.put("/bouquets", isAuthenticated, (request: Request, response: Response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

// delete a bouquet based on the given bouquetId
app.delete("/bouquets/:bouquetId", isAuthenticated, async (request: Request, response: Response) => {
  const result = await deleteBouquet(request.params.bouquetId);

  if (result) response.status(204);
  else response.status(404);
});