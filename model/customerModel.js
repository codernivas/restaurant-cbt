// const { default: mongoose } = require("mongoose")
// const mongooe = require("mongoose")

// const customerSchema = new mongooe.Schema(
//   {
//     customerName: { type: String, required: true },
//     mobileNo: { type: String, required: true },
//     billNumber: { type: String, required: true },
//     billAmt: { type: Number, required: true },
//     rewards:{type:Boolean, required:true},
//     rewardPoints:{type: String},
//     entryDate:{type:String},
//     validDate:{type:String}
//   },
//   { timestamps: true }
// )
// const customerCollection = new mongoose.model(
//   "customerCollection",
//   customerSchema
// )
// module.exports = customerCollection

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        customerName: { type: String, required: true },
        mobileNo: { type: String, required: true, unique: true }, // Make mobileNo unique
        bills: [
            {
                billNumber: { type: String, required: true },
                billAmt: { type: Number, required: true },
                rewardAction: { type: Boolean, required: true },
                rewardPoints: { type: String },
                entryDate: { type: String },
                validDate: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const customerCollection = mongoose.model("Customer", customerSchema); // Use singular name

module.exports = customerCollection;
