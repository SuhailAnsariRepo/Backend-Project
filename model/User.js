const mongoose = require('mongoose');

// const CounterSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   sequence_value: { type: Number, default: 1 }
// });

// const Counter = mongoose.model('Counter', CounterSchema);

const UserSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true },
  name: { type: String },
  mobile: { type: Number },
  status: { type: String },
  kyc: { type: String },
});

// UserSchema.pre('save', function (next) {
//   const doc = this;
//   Counter.findByIdAndUpdate(
//     { _id: 'UserId' },
//     { $inc: { sequence_value: 1 } },
//     { new: true, upsert: true }
//   )
//     .then((counter) => {
//       doc.User_id = counter.sequence_value;
//       next();
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

const User = mongoose.model('User', UserSchema);

module.exports = User;
