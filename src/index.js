const express = require("express");
const connect = require("./config/db")
const { register, login } = require("./controllers/register.controller")
const productController = require("./controllers/product.controller");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json())
const Port = process.env.PORT || 3000;

app.post("/register", register);
app.post("/login", login)
app.use("/products", productController);

app.listen(Port, async () => {
    try {
        await connect();
        console.log(`Listning ${Port}`);
    } catch (err) {
        console.log(err.message);
    }

})