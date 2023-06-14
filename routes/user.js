const router = require("express").Router();
const userController = require('../controllers/userController')

router.put("/update/:user_id", userController.update_user);
router.get("/", userController.all_users);
router.get("/:mobile", userController.get_user);
router.post("/", userController.add_user);
router.delete("/:user_id", userController.delete_user);
router.post("/signup", userController.sign_up);
router.post("/login", userController.login);

module.exports = router;
