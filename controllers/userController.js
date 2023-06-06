const User = require("../model/User");

//Get All Users
const all_users = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.json(users);
      } catch (error) {
        res.json({ message: error });
      }
};

//Get Single User
const get_user = async (req, res) => {
  console.log("inside get user")
    try {
        console.log(req.params.user_id);
        const user = await User.find({user_id:req.params.user_id})
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
        email: req.body.email,
        password: req.body.password
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
        const removeuser = await User.deleteOne({user_id:req.params.user_id});
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
            email: req.body.email,
            password: req.body.password
        };

        console.log(user);
    
        const updateduser = await User.findOneAndUpdate(
          { user_id: req.params.user_id },
          user
        );
        res.json(updateduser);
      } catch (error) {
        res.json({ message: error });
      }
};

module.exports = {
    all_users,
    get_user,
    add_user,
    delete_user,
    update_user
}