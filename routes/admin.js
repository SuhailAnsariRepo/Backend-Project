const router = require("express").Router();
const adminController = require('../controllers/adminController')

router.patch("/update/:mobile", adminController.update_admin);
router.get("/:role", adminController.all_admins);
router.get("/:mobile", adminController.get_admin);
router.post("/", adminController.add_admin);
router.delete("/:mobile", adminController.delete_admin);
router.post("/signup", adminController.sign_up);
router.post("/login", adminController.login);


module.exports = router;
