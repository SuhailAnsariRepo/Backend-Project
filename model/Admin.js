const mongoose = require("mongoose");

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

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;