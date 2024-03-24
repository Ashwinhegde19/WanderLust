const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js")
const  reviews = require('./routes/review.js')

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // Allows us to access data from HTML forms
app.use(methodOverride("_method")); // Overrides HTTP verbs (GET, POST, PUT, DELETE etc.) in a form
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/listings", listings)
app.use("/listings/:id/reviews", reviews)

app.all("*", function (req, res, next) {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Internal Error" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
