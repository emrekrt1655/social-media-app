import express from "express";
import followCtrl from "../controllers/followCtrl";
const router: any = express.Router();

// // it gets the followers of user
// router.get("/follower/:followedId", followerCtrl.getFollowers)
// // it gets the following ones of user
// router.get("/followed/:followerId", followerCtrl.getFollowings)
// // when you want to follow someone you need to send request below two routes together
// router.post("/follow", followerCtrl.follow)
// router.post("/followed", followerCtrl.followed)
// router.delete("/unfollow/:followingId", followerCtrl.unfollow)
// router.delete("/unfolloww/:folId", followerCtrl.unfollow2)



router.get("/followers", followCtrl.getFollowers)
router.post("/follow", followCtrl.follow)
router.delete("/unfollow/:folId", followCtrl.unfollow)




export default router