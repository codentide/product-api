const { mongoConnection } = require("./database/mongoConnection");
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes
const productRoutes = require("./routes/product.routes");

const api = express();
api.use(express.json());
api.use(cors());
mongoConnection();

api.use("/api/products", productRoutes);

api.listen(3000, () => {
	console.log("API listening on port 3000");
});
