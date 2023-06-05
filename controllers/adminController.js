const Admin = require("../model/Admin");

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
        console.log(req.params.admin_id);
        const admin = await Admin.find({admin_id:req.params.admin_id})
        // const admin = await Admin.findById(req.params.admin_id);
        console.log(admin);
        res.json(admin);
      } catch (error) {
        res.json({ message: error });
      }
};

//Add New Admin
const add_admin = async (req, res) => {
  console.log("inside put")
    const admin = new Admin({
        admin_id: req.body.admin_id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
            admin_id: req.body.admin_id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        console.log(admin);
    
        const updatedAdmin = await Admin.updateOne(
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
    update_admin
}