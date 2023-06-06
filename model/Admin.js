const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 }
  });

  
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

adminSchema.pre('save', function (next) {
    const doc = this;
    Counter.findByIdAndUpdate(
      { _id: 'adminId' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    )
      .then((counter) => {
        doc.admin_id = counter.sequence_value;
        next();
      })
      .catch((error) => {
        next(error);
      });
  });
  

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;