require('dotenv').config();
const express = require('express');
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

const serveStatic = require("serve-static");
app.use(serveStatic(__dirname + "/client/build"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require("./router");
app.use("/api/v1", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});