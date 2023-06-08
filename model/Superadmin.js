const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const superadminSchema = new mongoose.Schema({
    status : {
        type: String
    },
    name : {
        type: String
    },
    email : {
        type : String,
        unique: true
    },
    password : {
        type : String
    },
    mobile:{
        type : String
    },
    access:{
        type: Number
    },
    revenue:[{
        winning_commission: {type:Number},
        trading_fee: { type : Number}
    }]
});

superadminSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password=hashedString;
    console.log(this.password);
});
const Superadmin = mongoose.model("Superadmin", superadminSchema);
module.exports = Superadmin;