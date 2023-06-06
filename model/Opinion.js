const mongoose = require("mongoose");
// const autoIncrement = require('mongoose-sequence')(mongoose);

const OpinionSchema = new mongoose.Schema({
    opinion_id: {
        type: Number,
        required: true,
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    options: {
        type: String
    }
});

// OpinionSchema.plugin(autoIncrement);


const Opinion = mongoose.model("Opinion", OpinionSchema);
module.exports = Opinion;