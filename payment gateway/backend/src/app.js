
const express = require("express");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
    res.send("MANAS360 Backend is Running!");
});

module.exports = app;
