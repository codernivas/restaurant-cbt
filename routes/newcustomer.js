// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const customerCollection = require("../model/customerModel");

// router.post("/", async (req, res) => {
//     try {
//         const { customerName, mobileNo, bills } = req.body;
//         let existingUser = await customerCollection.findOne({ mobileNo });
        
//         if (existingUser) {
//             // Update existing user with new bills
//             existingUser.bills.push(...bills);
//             await existingUser.save();
//             return res.status(200).send(existingUser);
//         }

//         // Create a new user with bills
//         const formattedBills = bills.map(bill => ({
//             ...bill,
//             _id: mongoose.Types.ObjectId() // Generate a new ObjectId for each bill
//         }));

//         const newUser = new customerCollection({ customerName, mobileNo, bills: formattedBills });
//         await newUser.save();

//         res.status(200).send(newUser);
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const customerCollection = require("../model/customerModel");

router.post("/", async (req, res) => {
    try {
        const { mobileNo, bills } = req.body;

        // Check if a customer with the provided mobileNo already exists
        const existingCustomer = await customerCollection.findOne({ mobileNo });

        if (existingCustomer) {
            // If customer exists, update the bills array
            existingCustomer.bills.push(...bills);
            existingCustomer.updatedAt = Date.now();
            const updatedCustomer = await existingCustomer.save();
            res.status(200).json(updatedCustomer);
        } else {
            // If customer does not exist, create a new customer
            const newCustomer = new customerCollection(req.body);
            const savedCustomer = await newCustomer.save();
            res.status(201).json(savedCustomer);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
