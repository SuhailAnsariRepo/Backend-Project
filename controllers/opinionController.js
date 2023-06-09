const Opinion = require("../model/Opinion");
let opinionLength = 0;
//Get All Opinions
const all_opinions = async (req, res) => {
    try {
        const opinions = await Opinion.find();
        res.json(opinions);
      } catch (error) {
        res.json({ message: error });
      }
};

//Get Single Opinion
const get_opinion = async (req, res) => {
  console.log("inside get opinion")
    try {
        const opinion = await Opinion.find({opinion_id:req.params.opinion_id})
        res.json(opinion);
      } catch (error) {
        res.json({ message: error });
      }
};

//Get Single Opinion
const get_status = async (req, res) => {
  console.log("inside get opinion")
    try {
        const opinion = await Opinion.find({status:req.params.status})
        res.json(opinion);
      } catch (error) {
        res.json({ message: error });
      }
};

//Add New Opinion
const add_opinion = async (req, res) => {
  console.log("inside post")
  const opinion = new Opinion({
      title: req.body.title,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      news: req.body.news,
      status: req.body.status,
      source_of_truth: req.body.source_of_truth,
      rules: req.body.rules,
      min_price: req.body.min_price,
      max_price: req.body.max_price,
      opinion_type: req.body.opinion_type
      });
    
      try {
        const savedadmin = await opinion.save();
        res.json({
          opinion_id : savedadmin.opinion_id
        });
      } catch (error) {
        res.status(400).send(error);
      }
};

//Delete Opinion
const delete_opinion = async (req, res) => {
    try {
        const removeOpinion = await Opinion.deleteOne({opinion_id:req.params.opinion_id});
        res.json({ message:`Opinion with id ${req.params.opinion_id} deleted sucessfully`});
      } catch (error) {
        res.json({ message: error });
      }
};

//Update Opinion
const update_opinion = async (req, res) => {
    try {
        const opinion = {
            title: req.body.title,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            news: req.body.news,
            status: req.body.status,
            source_of_truth: req.body.source_of_truth,
            rules: req.body.rules,
            min_price: req.body.min_price,
            max_price: req.body.max_price,
            opinion_type: req.body.opinion_type
        };
        console.log(opinion);
    
        const updatedopinion = await Opinion.findOneAndUpdate(
          { opinion_id: req.params.opinion_id },
          opinion
        );
        res.json({ message: "Opinion updated sucessfully" });
      } catch (error) {
        res.json({ message: error });
      }
};

module.exports = {
    all_opinions,
    get_opinion,
    add_opinion,
    delete_opinion,
    update_opinion,
    get_status
}
