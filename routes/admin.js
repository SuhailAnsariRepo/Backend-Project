const router = require("express").Router();
const adminController = require('../controllers/adminController')

router.post("/", adminController.update_admin);
router.get("/", adminController.all_admins);
router.get("/:admin_id", adminController.get_admin);
router.put("/:admin_id", adminController.add_admin);
router.delete("/:admin_id", adminController.delete_admin);


module.exports = router;
