const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', CounterSchema);

const OpinionSchema = new mongoose.Schema({
  opinion_id: { type: Number, unique: true },
  title: { type: String },
  description: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  status: { type: String }
});

OpinionSchema.pre('save', function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { _id: 'opinionId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  )
    .then((counter) => {
      doc.opinion_id = counter.sequence_value;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

const Opinion = mongoose.model('Opinion', OpinionSchema);

module.exports = Opinion;
