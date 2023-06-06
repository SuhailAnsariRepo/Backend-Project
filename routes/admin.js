const router = require("express").Router();
const adminController = require('../controllers/adminController')

router.put("update/:admin_id", adminController.update_admin);
router.get("/", adminController.all_admins);
router.get("/:admin_id", adminController.get_admin);
router.post("/", adminController.add_admin);
router.delete("/:admin_id", adminController.delete_admin);


module.exports = router;
