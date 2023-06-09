const Partner = require("../model/Partner");
const bcrypt = require('bcrypt');

//Get All partners
const all_partners = async (req, res) => {
    try {
        const partners = await Partner.find();
        console.log(partners);
        res.json(partners);
      } catch (error) {
        res.json({ message: error });
      }
};

//Get Single partner
const get_partner = async (req, res) => {
  console.log("inside get partner")
    try {
        console.log(req.params.email);
        const partner = await Partner.find({mobile:req.params.mobile})
        // const partner = await partner.findById(req.params.partner_id);
        console.log(partner);
        res.json(partner);
      } catch (error) {
        res.json({ message: error });
      }
};

//Login Using Id/Pass
const login_partner = async (req, res) => {
  try {
      console.log("here")
      // check if the user exists
      const user = await Partner.findOne({ email: req.body.email });
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

//Add New partner
const add_partner = async (req, res) => {
  console.log("inside post")
    const partner = new Partner({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        status: req.body.status,
        access: req.body.access
      });
    
      try {
        const savedpartner = await partner.save();
        res.send(savedpartner);
      } catch (error) {
        res.status(400).send(error);
      }
};

//Delete partner
const delete_partner = async (req, res) => {
    try {
        const removepartner = await Partner.deleteOne({mobile: req.params.mobile});
        res.json(removepartner);
      } catch (error) {
        res.json({ message: error });
      }
};

//Update partner
const update_partner = async (req, res) => {
    try {
        const partner = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            status: req.body.status,
            access: req.body.access,
            company: req.body.company,
            access: req.body.access,
            revenue: req.body.revenue
        };

        console.log(partner);
    
        const updatedpartner = await Partner.findOneAndUpdate(
          { mobile: req.params.mobile },
          partner
        );
        res.json(updatedpartner);
      } catch (error) {
        res.json({ message: error });
      }
};

module.exports = {
    all_partners,
    get_partner,
    add_partner,
    delete_partner,
    update_partner,
    login_partner
}