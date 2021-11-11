const express = require("express");
const cloudbase = require("@cloudbase/node-sdk");
const app = express();
const db = cloudbase.init({ env: "blog" }).database();

app.get("/save-article", (req, res) => {
  db.collection("articles").add({ _openid: "luke-111111" }).then(result => {
    res.send(result.id);
  })
});
app.listen(8080);



