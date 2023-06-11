const Admin = require("../model/Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

//Get All Admins
const all_admins = async (req, res) => {
    try {
        const admins = await Admin.find();
        console.log(admins);
        res.json(admins);
      } catch (error) {
        res.json({ message: error });
      }
};

//Get Single Admin
const get_admin = async (req, res) => {
  console.log("inside get admin")
    try {
        console.log(req.params.email);
        const admin = await Admin.find({email:req.params.email})
        // const admin = await Admin.findById(req.params.admin_id);
        console.log(admin);
        res.json(admin);
      } catch (error) {
        res.json({ message: error });
      }
};

const sign_up = async (req, res) => {
  try {
    // Get user input
    
    const { name,  password, mobile, email} = req.body;

    // Validate user input
    if (!(name && password && mobile&& email)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const existingUser = await Admin.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({message: "Admin Already Exist. Please Login"});
    }
    
    //Encrypt user password
    let salt = await bcrypt.genSalt();
    const hashedString = await bcrypt.hash(password, salt);
    // Create user in our database
    const user = await Admin.create({
      name : name,
      mobile: mobile,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: hashedString
    });

    // Create token
    const token = jwt.sign(
      { email : user.email, id : user._id },
      process.env.TOKEN_KEY,
    );
    // save user token

    // return new user
    res.status(201).json({ user : user, token: token});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Something went wrong"});
  }
  // Our register logic ends here
};

const login = async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const existingUser = await Admin.findOne({ email: email });

    if (!existingUser) {
      return res.status(409).json({message: "User not found. Please Sign up"});
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
      // Create token
    if(matchPassword){
      const token = jwt.sign(
        { email: existingUser.email, id : existingUser._id },
        process.env.TOKEN_KEY,
      );

      res.cookie("token", token, { maxAge: jwtExpirySeconds * 24*60*60 })

      // save user token
      res.status(201).json({ user : existingUser, token: token});


      // user
      // res.status(200).json(user);
    }
    res.status(400).json({message: "Invalid Credentials"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Something went wrong"});
  }
  // Our register logic ends here
};

//Add New Admin
const add_admin = async (req, res) => {
  console.log("inside post")
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        status: req.body.status,
        access: req.body.access
      });
    
      try {
        const savedadmin = await admin.save();
        res.send(savedadmin);
      } catch (error) {
        res.status(400).send(error);
      }
};

//Delete Admin
const delete_admin = async (req, res) => {
    try {
        const removeAdmin = await Admin.deleteOne({email: req.params.email});
        res.json(removeAdmin);
      } catch (error) {
        res.json({ message: error });
      }
};

//Update Admin
const update_admin = async (req, res) => {
    try {
        const admin = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            status: req.body.status,
            access: req.body.access
        };

        console.log(admin);
    
        const updatedAdmin = await Admin.findOneAndUpdate(
          { email: req.params.email },
          admin
        );
        res.json(updatedAdmin);
      } catch (error) {
        res.json({ message: error });
      }
};

module.exports = {
    all_admins,
    get_admin,
    add_admin,
    delete_admin,
    update_admin,
    login,
    sign_up
}