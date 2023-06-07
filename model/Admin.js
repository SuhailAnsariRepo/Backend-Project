const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
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
    }
});

adminSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password=hashedString;
    console.log(this.password);
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;