const express = require("express");
const router = express.Router();
const customerCollection = require("../model/customerModel");

router.get("/", async (req, res) => {
    try {
        const customers = await customerCollection.find();
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
