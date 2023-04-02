import "dotenv/config";
import fs from "fs";
import cors from "cors";
import path from "path";
import express from "express";
import serveStatic from "serve-static";
import routes from "./routes/routers";
import session from "express-session";
import sqlite from "better-sqlite3";
import sessionStore from "better-sqlite3-session-store";

const app = express();
const dbDirectory = path.join(__dirname, "db");
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory);
}
const SqliteStore = sessionStore(session);
const db = new sqlite(path.join(dbDirectory, "sessions.db")); // { verbose: console.log } for debug
const staticOptions = { maxAge: 860000, cacheControl: true };
// --------- ENV VARS ---------
const PORT = process.env.PORT;
const SECRET = process.env.PORT;

// --------- Middleware ---------
app.set("view engine", "pug");
app.set("views", "views");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serveStatic("public", staticOptions));
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
  const userIp = req.ip.split(":").at(-1);
  console.log(`${req.method} Request from ${userIp} to ${req.url}`);
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

  return res.status(error.statusCode).json({ error: error.message });
});

// --------- START APP ---------
app.listen(PORT, () => console.log(`App Started on http://localhost:${PORT}`));
