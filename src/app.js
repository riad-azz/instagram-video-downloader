import "dotenv/config";
import cors from "cors";
import express from "express";
import serveStatic from "serve-static";
import routes from "./routes/routers";
import cookieParser from "cookie-parser";

const app = express();

const staticOptions = { maxAge: 860000, cacheControl: true };

// --------- MIDDLEWARE ---------
app.set("view engine", "pug");
app.set("views", "views");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serveStatic("public", staticOptions));
app.use(cookieParser());

app.use((req, res, next) => {
  const userIp = req.ip.split(":").at(-1);
  console.log(`${req.method} Request from ${userIp} to ${req.url}`);
  next();
});

// --------- ROUTES ---------
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
app.listen(process.env.PORT, () =>
  console.log(`App Started on http://localhost:${process.env.PORT}`)
);
