// Set up the Express App
const express = require("express");
const app = express();

// Set up the JSON Body parser
app.use(express.json({ extended: false }));

//DB Connection
const connectDb = require("./config/db");
connectDb();

// Get the Main Route
const taskRoute = require("./routes/tasks");

// Set up the Link Route
app.use("/task_api", taskRoute);

// Set up the PORT to listen to
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The Server is running on port:${port}`);
});
