const express = require("express");
const cloudbase = require("@cloudbase/node-sdk");
const app = express();
const db = cloudbase.init({ env: "blog" }).database();

app.get("/", (req, res) => {
  res.send("result");
});
app.post("/save-article", (req, res) => {
  db.collection("articles").add({ name: "luke-111111" }).then(result => {
    res.send(result);
  })
});

app.listen(8080);



