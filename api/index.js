require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./mongo");
const userRoutes = require("./rutas/usuarios");
const authRoutes = require("./rutas/auth");

// Conexion a la base de datos
connection();

// middlewares
app.use(express.json());
app.use(cors());

// rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));