import express, { query } from "express";
import path from "path";
import * as url from "url";
import hbs from "hbs";
import { title } from "process";
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);
const templatesPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const publicDirectory = path.join(__dirname, "../public");

const app = express();

app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yatsentyuk Illia",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Yatsentyuk Illia",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Yatsentyuk Illia",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({ error: "You must enter a address!" });

  geocode(req.query.address, (err, { place, lon, lat } = {}) => {
    if (err) return res.send({ Geocode: err });

    forecast(place, lon, lat, (error, data_from_forecast) => {
      if (error) return res.send({ Forecast: error });
      res.send({
        forecast: data_from_forecast,
        location: place,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({ error: "You must provide search term!" });

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    type: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    type: "ERROR 404",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
