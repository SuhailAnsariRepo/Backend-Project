const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    admin_id : {
        type:Number,
    },
    name : {
        type: String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;