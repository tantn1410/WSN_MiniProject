import express from "express";
import { publish } from "./mqtt.js";
import client from "knex";

const app = express();
const port = 3000;

export const knex = client({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "secret",
    database: "project2",
  },
  migrations: {
    tableName: "migrations",
  },
});

// Write migration
// console.log(await knex("data").select(["GPIO", "temperature"]))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/polling", async (req, res) => {
  // const lights = await knex("light")
  //     .select("*")
  //     .limit(100)
  //     .orderBy("id", "desc");
  // const mode = await knex("mode").select("*").limit(1).orderBy("id", "desc");
  // return res.json({ lights: lights, mode: mode });
  return res.json({})
});

app.post("/up", (req, res) => {
  publish("2_up");
});

app.post("/down", (req, res) => {
  publish("2_down");
});

app.post("/left", (req, res) => {
  publish("2_left");
});

app.post("/right", (req, res) => {
  publish("2_right");
});

app.post("/stop", (req, res) => {
  publish("2_stop");
});

app.post("/angle", (req, res) => {
  const { vertical, horizontal } = req.body;
  publish("3_" + vertical + "_" + horizontal);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
