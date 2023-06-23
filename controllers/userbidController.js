const User = require("../model/User_Bid");
const Opinion = require("../model/Opinion");

//Get All Users
const all_bids = async (req, res) => {
     try {
      const userbids = await User.find()
      .populate({
        path: 'opinion_id',
        select: 'title -_id',
        model: Opinion,
        match: { opinion_id: { $exists: true } }
      })
      .lean()
      .exec();
  
      res.json(userbids);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

//Get Single User
const get_bid = async (req, res) => {
  console.log("inside get user")
    try {
        console.log(req.params.mobile);
        const user = await User.find({mobile:req.params.mobile})
        console.log(user);
        res.json(user);
      } catch (error) {
        res.json({ message: error });
      }
};

//Add New User
const add_bid = async (req, res) => {
  try {
    // Get user input
    const { mobile, opinion_id, bid_option, amount, no_of_share} = req.body;

    // Validate user input
    if (!(opinion_id && mobile && bid_option && amount && no_of_share)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const existingUser = await User.findOne({ mobile: mobile, opinion_id:opinion_id });

    if (existingUser) {
      return res.status(409).json({ message: "Admin Already Exist. Please Login" });
    }

  console.log("inside put")
    const user = new User({
        mobile: req.body.mobile,
        opinion_id: req.body.opinion_id,
        bid_option: req.body.bid_option,
        amount: req.body.amount,
        timestamp: req.body.timestamp,
        transaction_detail: req.body.transaction_detail,
        settlement_status: req.body.settlement_status,
        no_of_share: req.body.no_of_share
      });
    
      try {
        const saveduser = await user.save();
        res.send(saveduser);
      } catch (error) {
        res.status(400).send(error);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
};

//Delete User
const delete_bid = async (req, res) => {
    try {
        const removeuser = await User.deleteOne({opinion_id: req.params.opinion_id, mobile:req.params.mobile});
        res.json(removeuser);
      } catch (error) {
        res.json({ message: error });
      }
};

//Update User
const update_bid = async (req, res) => {
    try {
        const user = {
          mobile: req.body.mobile,
          opinion_id: req.body.opinion_id,
          bid_option: req.body.bid_option,
          amount: req.body.amount,
          timestamp: req.body.timestamp,
          transaction_detail: req.body.transaction_detail,
          settlement_status: req.body.settlement_status,
          no_of_share: req.body.no_of_share
        };

        console.log(user);
    
        const updateduser = await User.findOneAndUpdate(
          { opinion_id: req.params.opinion_id, mobile:req.params.mobile },
          user
        );
        res.json(user);
      } catch (error) {
        res.json({ message: error });
      }
};

module.exports = {
    all_bids,
    get_bid,
    add_bid,
    delete_bid,
    update_bid
}