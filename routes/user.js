const router = require("express").Router();
const userController = require('../controllers/userController')

router.put("/", userController.update_user);
router.get("/", userController.all_users);
router.get("/:user_id", userController.get_user);
router.post("/", userController.add_user);
router.delete("/:user_id", userController.delete_user);


module.exports = router;
