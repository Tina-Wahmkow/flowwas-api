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
import { getBouquetsForUser } from "./getBouquetsForUser";

const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allows the frontend to access the backend
app.use(cors({
  origin: `http://localhost:3000`, //reacts origin!!
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
  res.send("Hello, backend stuff is happening here yoo!");
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

// new endpoint to access all the data of the table flowers
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
  response.json("You logged in!!!");
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

// get all bouquets including their flowers for the user with the given userId
app.get("/bouquets", isAuthenticated, async (request: Request, response: Response) => {
  const user = await request.user as USER;
  if (user) {
    const result = await getBouquetsForUser(user.id);
    if (result.length) response.send(result);
    else response.status(404).send(result);

  } else response.status(401).send("You need to be logged in to see your bouquets.")
});


// TODO

// create a new bouquet
app.post("/bouquets", isAuthenticated, async (request: Request, response: Response) => {
  const user = await request.user as USER;
  if (user) {
    const result = await getBouquetsForUser(user.id);
    if (result.length) response.send(result);
    else response.status(404).send(result);

  } else response.status(401).send("You need to be logged in to see your bouquets.")
});

// update an existing bouquet 
app.put("/bouquets", isAuthenticated, async (request: Request, response: Response) => {
  const user = await request.user as USER;
  if (user) {
    const result = await getBouquetsForUser(user.id);
    if (result.length) response.send(result);
    else response.status(404).send(result);

  } else response.status(401).send("You need to be logged in to see your bouquets.")
});

// delete a bouquet based on the given bouquetId
app.delete("/bouquets/:bouquetId", isAuthenticated, async (request: Request, response: Response) => {
  const user = await request.user as USER;
  console.log(user)
  if (user) {
    const result = await deleteBouquet(request.params.bouquetId, user.id);

    if (result) response.status(200).send("Bouquet deleted successfully.");
    else response.status(404).send('None of your bouquets matched with the given id.');

  } else response.status(401).send("You need to be logged in to delete one of your bouquets.")

});