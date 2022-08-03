const Products = require("../models/product.model");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", authentication, async (req, res) => {
    try {
        if (req.user.role === "staff") return res.status(400).send("Not Accessible")
        const products = await Products.find().lean().exec();
        res.status(201).send(products);
    }
    catch (err) {
        res.status(500).send(err.message);
    }

});

router.get("/:id", authentication, async (req, res) => {
    try {
        if (req.user.role === "staff") return res.status(400).send("You don't have access")
        const product = await Products.findById(req.params.id).lean().exec();
        res.status(201).send(product);
    } catch (err) {
        res.status(501).send(err.message);
    }
})

router.post("", authentication, async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(400).send("Not Accessiable")
        const product = await Products.create(req.body);
        res.status(201).send(product);
    } catch (err) {
        res.status(501).send(err.message);
    }
})

router.patch("/:id", authentication, async (req, res) => {
    try {
        if (req.user.role === "staff") return res.status(400).send("You don't have access")
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).send(product);
    } catch (err) {
        res.status(501).send(err.message);
    }
})



function authentication(req, res, next) {
    const token = req.body.token || req.headers.token;

    if (!token || token === null) return res.status(501).send("please login");

    jwt.verify(token, "Vineeth", (err, { user }) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
        return;
    })


}

module.exports = router;