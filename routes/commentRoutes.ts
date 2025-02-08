import express from "express";
import commentCtrl from "../controllers/commentCtrl";
const router: any = express.Router();


router.post("/commentCreate", commentCtrl.createComment)
router.get("/comments/:postId", commentCtrl.getComments)
router.delete("/commentDelete/:commentId", commentCtrl.delete)


export default router