const router = require("express").Router();
const opinionController = require('../controllers/opinionController')

router.post("/", opinionController.add_opinion);
router.get("/", opinionController.all_opinions);
router.get("/:opinion_id", opinionController.get_opinion);
router.put("/:opinion_id", opinionController.update_opinion);
router.get("/getStatus/:status", opinionController.get_status);


module.exports = router;
