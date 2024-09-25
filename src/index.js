const express = require("express");
var cors = require("cors");
var path = require("path");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost",
    preflightContinue: true,
  })
);

// call router function from routes folder wher manage the API routing
const router = require("./routes/index");

router(app);

app.use("/images", express.static(path.join(__dirname, "../data/images")));

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
