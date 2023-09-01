const express = require("express")
const router = express.Router();
const {isAdmin , verifyAuth} = require("../middlewares/verifyAuth");

const {login,signUP} = require("../controllers/Auth");
const {deleteUser, makeAdmin} = require("../controllers/userController");

router.post("/login",login);
router.post("/signup",signUP);
router.delete("/deleteuser", verifyAuth , isAdmin ,deleteUser)
router.put('/makeadmin', verifyAuth , isAdmin , makeAdmin)

module.exports = router;