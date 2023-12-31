const mongoose = require('mongoose');

const User_BidSchema = new mongoose.Schema({
    mobile: { type: Number,
         required: true,
         trim: true,
    },
    opinion_id: { 
        type: Number, 
    },
    bid_option:{
        type: Boolean
    },
    amount:{
        type: Number
    },
    timestamp:{
        type: Date
    },
    transaction_detail:{
        type: String
    },
    settlement_status:{
        type: String
    },
    no_of_share:{
        type: Number
    },
});


const User_Bid = mongoose.model('User_Bid', User_BidSchema);

module.exports = User_Bid;
