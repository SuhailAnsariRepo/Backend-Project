const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const partnerSchema = new mongoose.Schema({
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
    company :{ type : String},
    mobile:{
        type : String
    },
    kyc :{ type : String},
    access:{
        type: String
    },
    revenue:{
        winning_commission: { type : Number},
        trading_fee: { type : Number}
    }
});

partnerSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password=hashedString;
    console.log(this.password);
});
const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;