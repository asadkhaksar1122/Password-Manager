const express = require("express");
const app = express();
const homeroute=require("./router/home")
const cors=require("cors")
const passwordroute=require("./router/password")
const port = 3000;
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/passwordmanagermern");

  
}
app.use(express.json())
app.use(cors())
app.use("/api",homeroute)
app.use("/api",passwordroute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
