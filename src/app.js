import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/routers";

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use((req, res, next) => {
  const userIp = req.ip.split(":").at(-1);
  console.log(`/${req.method} from "${userIp}"`);
  next();
});

app.use("/", routes.pages);

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

app.listen(PORT, () => console.log(`App Started on http://localhost:${PORT}`));
