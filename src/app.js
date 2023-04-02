import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes/routers";
import session from "express-session";
import sqlite from "better-sqlite3";
import sessionStore from "better-sqlite3-session-store";

const app = express();
const SqliteStore = sessionStore(session);
const db = new sqlite("src/db/sessions.db"); // { verbose: console.log } for debug

// --------- ENV VARS ---------
const PORT = process.env.PORT;
const SECRET = process.env.PORT;

// --------- Middleware ---------
app.set("view engine", "pug");
app.set("views", "views");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    store: new SqliteStore({
      client: db,
      maxAge: null,
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    maxAge: null,
  })
);

app.use((req, res, next) => {
  if (!req.session.counter) req.session.counter = 0;
  res.cookie("counter", req.session.counter, {
    maxAge: 360000,
    httpOnly: false,
    secure: true,
    sameSite: "strict",
  });
  req.session.counter += 1;
  const userIp = req.ip.split(":").at(-1);
  console.log(`${userIp} has refreshed ${req.session.counter} times`);
  next();
});

// --------- Routes ---------
app.use("/", routes.pages);
app.use("/api", routes.api);

app.get("/not-found", (req, res) => {
  return res.status(404).render("404");
});

app.get("*", (req, res, next) => {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 301;
  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect("/not-found");
  }

  return res.status(error.statusCode).json({ response: error.message });
});

// --------- START APP ---------
app.listen(PORT, () => console.log(`App Started on http://localhost:${PORT}`));
