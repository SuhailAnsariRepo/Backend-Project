const mongoose = require('mongoose');

// const CounterSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   sequence_value: { type: Number, default: 1 }
// });

// const Counter = mongoose.model('Counter', CounterSchema);

const UserSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true },
  name: { type: String },
  mobile: { type: Number, unique: true },
  password: { type: String },
  revenue: { type: Number },
  wallet: { type: Number },
  portfolio: { type: Number },
  status: { type: String },
  kyc: { type: String },
  community: { type: String }
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
