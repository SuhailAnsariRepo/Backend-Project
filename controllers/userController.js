const User = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

//Get All Users
const all_users = async (req, res) => {
  try {
    const { name, mobile, status, community, kyc } = req.query;

    // Build the filter object based on query parameters
    const filter = {};
    if (name) {
      filter.name = name;
    }
    if (mobile) {
      filter.mobile = mobile;
    }
    if (status) {
      filter.status = status;
    }
    if (community) {
      filter.community = community;
    }
    if (kyc) {
      filter.kyc = kyc;
    }

    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

//Get Single User
const get_user = async (req, res) => {
  console.log("inside get user")
    try {
        console.log(req.params.mobile);
        const user = await User.find({mobile:req.params.mobile})
        // const admin = await Admin.findById(req.params.admin_id);
        console.log(user);
        res.json(user);
      } catch (error) {
        res.json({ message: error });
      }
};

//Add New User
const add_user = async (req, res) => {
  console.log("inside put")
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        mobile: req.body.mobile,
        revenue: req.body.revenue,
        wallet: req.body.wallet,
        portfolio: req.body.portfolio,
        status: req.body.status,
        kyc: req.body.kyc,
        community: req.body.community
      });
    
      try {
        const saveduser = await user.save();
        res.send(saveduser);
      } catch (error) {
        res.status(400).send(error);
      }
};

//Delete User
const delete_user = async (req, res) => {
    try {
        const removeuser = await User.deleteOne({mobile:req.params.mobile});
        res.json(removeuser);
      } catch (error) {
        res.json({ message: error });
      }
};

//Update User
const update_user = async (req, res) => {
    try {
        const user = {
          name: req.body.name,
          password: req.body.password,
          mobile: req.body.mobile,
          revenue: req.body.revenue,
          wallet: req.body.wallet,
          portfolio: req.body.portfolio,
          status: req.body.status,
          kyc: req.body.kyc,
          community: req.body.community
        };

        console.log(user);
    
        const updateduser = await User.findOneAndUpdate(
          { mobile: req.params.mobile },
          user
        );
        res.json(updateduser);
      } catch (error) {
        res.json({ message: error });
      }
};

const sign_up = async (req, res) => {
  try {
    // Get user input
    
    const { name,  password, mobile, community} = req.body;

    // Validate user input
    if (!(name && password && mobile)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const existingUser = await User.findOne({ mobile: mobile });

    if (existingUser) {
      return res.status(409).json({message: "Admin Already Exist. Please Login"});
    }
    
    //Encrypt user password
    let salt = await bcrypt.genSalt();
    const hashedString = await bcrypt.hash(password, salt);
    // Create user in our database
    const user = await User.create({
      name : name,
      mobile: mobile,
      // email: email.toLowerCase(), // sanitize: convert email to lowercase
      community: community,
      password: hashedString,
    });

    // Create token
    const token = jwt.sign(
      { mobile : user.mobile, id : user._id },
      process.env.TOKEN_KEY,
    );
    // save user token
    res.cookie('jwtToken', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
    // return new user
    return res.status(201).json({ user : user, token: token});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Something went wrong"});
  }
  // Our register logic ends here
};

const login = async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { mobile, password } = req.body;

    // Validate user input
    if (!(mobile && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const existingUser = await User.findOne({ mobile: mobile });

    if (!existingUser) {
      return res.status(409).json({message: "User not found. Please Sign up"});
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
      // Create token
    if(matchPassword){
      const token = jwt.sign(
        { mobile: existingUser.mobile, id : existingUser._id },
        process.env.TOKEN_KEY,
      );

      res.cookie('jwtToken', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours

      // save user token
      return res.status(201).json({ user : existingUser, token: token});


      // user
      // res.status(200).json(user);
    }
    return res.status(400).json({message: "Invalid Credentials"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Something went wrong"});
  }
  // Our register logic ends here
};

module.exports = {
    all_users,
    get_user,
    add_user,
    delete_user,
    update_user,
    sign_up,
    login
}