const router = require("express").Router();
const partnerController = require('../controllers/partnerController')

router.put("/update/:mobile", partnerController.update_partner);
router.get("/", partnerController.all_partners);
router.get("/:mobile", partnerController.get_partner);
router.post("/", partnerController.add_partner);
router.post("/login", partnerController.login_partner);
router.delete("/:mobile", partnerController.delete_partner);


module.exports = router;
