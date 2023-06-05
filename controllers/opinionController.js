const Opinion = require("../model/Opinion");

//Get All Opinions
const all_opinions = async (req, res) => {
    try {
        const opinions = await Opinion.find();
        console.log(opinions);
        res.json(opinions);
      } catch (error) {
        res.json({ message: error });
      }
};

//Get Single Opinion
const get_opinion = async (req, res) => {
  console.log("inside get opinion")
    try {
        console.log(req.params._id);
        // const opinion = await opinion.find({opinion_id:req.params.opinion_id})
        const opinion = await Opinion.findById(req.params._id);
        console.log(opinion);
        res.json(opinion);
      } catch (error) {
        res.json({ message: error });
      }
};

//Add New Opinion
const add_opinion = async (req, res) => {
  console.log("inside put")
    const opinion = new Opinion({
        title: req.body.Title,
        description: req.body.Description,
        start_date: req.body.Start_Date,
        end_date: req.body.End_Date,
        options: req.body.Options
      });
    
      try {
        const savedopinion = await opinion.save();
        res.send(savedopinion);
      } catch (error) {
        res.status(400).send(error);
      }
};

//Delete Opinion
const delete_opinion = async (req, res) => {
    try {
        const removeOpinion = await Opinion.deleteOne({_id:req.params._id});
        res.json(removeOpinion);
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
            options: req.body.options
        };

        console.log(opinion);
    
        const updatedopinion = await Opinion.updateOne(
          { _id: req.params._id },
          opinion
        );
        res.json(updatedopinion);
      } catch (error) {
        res.json({ message: error });
      }
};

module.exports = {
    all_opinions,
    get_opinion,
    add_opinion,
    delete_opinion,
    update_opinion
}