const express = require("express");
const router = express.Router();
const customerCollection = require("../model/customerModel");
const authMiddle=require("../helper/auth")

router.get("/", authMiddle,async (req, res) => {
    try {
        const customers = await customerCollection.find();
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// GET customer by ID
router.get("/:id",authMiddle, async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await customerCollection.findById(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// // GET bill by customer ID and bill ID
// router.get("/bill/:id", authMiddle,async (req, res) => {
//     const { customerId, billId } = req.params;
//     try {
//         const customer = await customerCollection.findById(customerId);
//         if (!customer) {
//             return res.status(404).json({ error: 'Customer not found' });
//         }
//         const bill = customer.bills.find(bill => bill._id.toString() === billId);
//         if (!bill) {
//             return res.status(404).json({ error: 'Bill not found' });
//         }
//         res.json(bill);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
module.exports = router;
