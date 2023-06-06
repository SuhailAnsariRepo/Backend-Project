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

//Add New Opinion
const add_opinion = async (req, res) => {
  const countOpinions = async () => {
    try {
      const count = await Opinion.countDocuments({});
      return count;
    } catch (error) {
      console.log(error);
    }
  };
  
  countOpinions()
  .then( async (count) => {
    console.log(opinionLength);
    opinionLength = count; // Store the count value globally
    console.log("Opinion length is: " + opinionLength);

    const opinion = new Opinion({
      opinion_id: opinionLength+1,
      title: req.body.title,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      options: req.body.options
    });
    console.log(opinion);
    try {
      const savedopinion = await opinion.save();
      console.log(savedopinion);
      res.json({
          opinion_id : savedopinion.opinion_id
        });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .catch((error) => {
    // Handle any errors that occurred during counting
    console.log(error);
  });
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