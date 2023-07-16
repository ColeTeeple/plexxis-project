const express = require("express");
const app = express();
const cors = require('cors');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.use(express.json());
require("dotenv").config();
const db = require("./models");

const employeesRouter = require("./routes/Employees");
app.use("/employees", employeesRouter);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => console.log("Server is up on port 3001"));
})


