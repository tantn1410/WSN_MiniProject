import express from "express";
import { publish } from "./mqtt.js";
import client from "knex";

const app = express();
const port = 3000;

export const knex = client({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "tan",
    password: "Trannhattan14102000@",
    database: "WSN_MiniProject",
  },
  migrations: {
    directory: "./migrations",
    loadExtensions: ['mjs']
  },
});
// knex.migrate.latest().then(r => {
//   console.log("Migrate successfully");
// });


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/polling", async (req, res) => {
  const temps = await knex("temp")
       .select("*")
       .limit(50)
       .orderBy("id", "desc");
  const humids = await knex("temp")
      .select("*")
      .limit(50)
      .orderBy("id", "desc");
  const luxs = await knex("temp")
      .select("*")
      .limit(50)
      .orderBy("id", "desc");
  return res.json({ temps: temps, humids: humids, luxs: luxs });
});

// app.post("/up", (req, res) => {
//   publish("2_up");
// });
//
// app.post("/down", (req, res) => {
//   publish("2_down");
// });
//
// app.post("/left", (req, res) => {
//   publish("2_left");
// });
//
// app.post("/right", (req, res) => {
//   publish("2_right");
// });
//
// app.post("/stop", (req, res) => {
//   publish("2_stop");
// });
//
// app.post("/angle", (req, res) => {
//   const { vertical, horizontal } = req.body;
//   publish("3_" + vertical + "_" + horizontal);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
