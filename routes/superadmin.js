const router = require("express").Router();
const superadminController = require('../controllers/superadminController')

router.put("/update/:email", superadminController.update_admin);
router.get("/", superadminController.all_admins);
router.get("/:email", superadminController.get_admin);
router.post("/", superadminController.add_admin);
router.post("/login", superadminController.login_admin);
router.delete("/:email", superadminController.delete_admin);


module.exports = router;
