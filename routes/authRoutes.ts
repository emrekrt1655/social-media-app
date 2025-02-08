import express from "express";
import authCtrl from "../controllers/authCtrl";
import validRegister from "../middleware/valid";
const router: any = express.Router();

router.post("/register", validRegister, authCtrl.register);
router.post("/active", authCtrl.activeAccount);
router.post("/login", authCtrl.login);
router.put("/changePassword/:userId", authCtrl.changePassword);
router.get("/users", authCtrl.getUsers);
router.get("/refresh_token", authCtrl.refreshToken);
router.get("/logout", authCtrl.logout);
router.put("/useredit/:userId", authCtrl.updateUser);
router.delete("/userdelete/:userId", authCtrl.deleteUser);
router.post("/forgot_password", authCtrl.forgotPassword);
router.put("/reset_password", authCtrl.resetPassword);

export default router;
