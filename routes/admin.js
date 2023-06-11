const router = require("express").Router();
const adminController = require('../controllers/adminController')

router.put("/update/:email", adminController.update_admin);
router.get("/", adminController.all_admins);
router.get("/:email", adminController.get_admin);
router.post("/", adminController.add_admin);
router.delete("/:email", adminController.delete_admin);
router.post("/signup", adminController.sign_up);
router.post("/login", adminController.login);


module.exports = router;
