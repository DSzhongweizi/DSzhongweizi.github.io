const express = require("express");
const cloudbase = require("@cloudbase/node-sdk");
const app = express();
const db = cloudbase.init({ env: "blog-4gr30cdu25d98dfd" }).database()

app.get("/", (req, res) => {
  res.send("result");
});
app.post("/save-article", (req, res) => {
  db.collection("articles").add({ name: "ds" }).then(result => {
    res.send(result);
  })
});

app.listen(8080);



