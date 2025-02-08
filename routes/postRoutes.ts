import express from "express";
import postCtrl from "../controllers/postCtrl";
const router: any = express.Router();


router.post("/postCreate", postCtrl.create)
router.get("/posts", postCtrl.getPosts)
router.get("/posts/:userId", postCtrl.getPostsbyUserId)
router.delete("/postDelete/:postId", postCtrl.delete)


export default router