const router = require("express").Router();
const opinionController = require('../controllers/opinionController')

router.post("/", opinionController.update_opinion);
router.get("/", opinionController.all_opinions);
router.get("/:_id", opinionController.get_opinion);

module.exports = router;
