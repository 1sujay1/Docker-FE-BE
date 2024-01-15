const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Goal = require("./models/goal.model");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  //allow access to current url. work for https as well
  res.setHeader("Access-Control-Allow-Origin", req.header("Origin"));
  res.removeHeader("x-powered-by");
  //allow access to current method
  res.setHeader("Access-Control-Allow-Methods", req.method);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

/**API START*/
app.get("/goals", async (req, res) => {
  try {
    let resp = await Goal.find();
    return res.json({
      status: true,
      data: resp.map((item) => ({ id: item.id, text: item.text })),
    });
  } catch (error) {
    res.json({
      status: false,
      error: error,
      message: error.message,
    });
  }
});
app.post("/goals", async (req, res) => {
  try {
    const { text } = req.body;
    console.log("text", text);
    if (!text || text.trim().length == 0) {
      console.log("Invalid Goal Input");
      return res
        .status(422)
        .json({ status: false, message: "Invalid Goal input" });
    }
    let resp = await Goal.create({ text });
    return res.json({
      status: true,
      data: { id: resp.id, text },
    });
  } catch (error) {
    console.error(error.message, "Catch Error");
    res.json({
      status: false,
      error: error,
      message: error.message,
    });
  }
});
app.delete("/goals/:id", async (req, res) => {
  try {
    let resp = await Goal.deleteOne({ _id: req.params.id });
    console.log("resp", resp);
    return res.json({
      status: true,
      message: "Goal deleted Successfully!!!",
    });
  } catch (error) {
    res.json({
      status: false,
      error: error,
      message: error.message,
    });
  }
});
/**API END*/

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DD_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MONGODB ...", process.env.DD_URL);
    app.listen(PORT, () => {
      console.log("Listening to port", PORT);
    });
  })
  .catch((err) => {
    console.error("Error Connecting to Mongodb instance", err);
    process.exit();
  });
