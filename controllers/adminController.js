const Admin = require("../model/Admin");
const bcrypt = require('bcrypt');

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

//Login Using Id/Pass
const login_admin = async (req, res) => {
  try {
      console.log("here")
      // check if the user exists
      const user = await Admin.findOne({ email: req.body.email });
      if (user) {
        //check if password matches
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          res.json({ message: "You have successfully logged in" });
        } else {
          res.status(400).json({ error: "password doesn't match" });
        }
      } else {
        res.status(400).json({ error: "email doesn't exist" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
};

//Add New Admin
const add_admin = async (req, res) => {
  console.log("inside post")
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        status: req.body.status
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
        const removeAdmin = await Admin.deleteOne({admin_id:req.params.admin_id});
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
            status: req.body.status
        };

        console.log(admin);
    
        const updatedAdmin = await Admin.findOneAndUpdate(
          { admin_id: req.params.admin_id },
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
    login_admin
}