import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { IFollower, IDecodedToken } from "../utils/types";
import jwt from "jsonwebtoken";

const tokenEnv = {
  access: process.env.ACCESS_TOKEN_SECRET,
};

const prisma = new PrismaClient();

const followCtrl = {
  getFollowers: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id) return res.status(400).json({ message: "Please Login to see" });
      const followers: IFollower[] = await prisma.follower.findMany();
      return res.status(200).json({
        status: "success",
        message: "All followers found",
        data: followers,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  follow: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id)
        return res.status(400).json({ message: "Please Login to follow" });
        
        const { followerId, followedId } = req.body;
        
        if (id !== followerId)
          return res
            .status(400)
            .json({ message: "You are not authorized to follow this" });
      await prisma.follower.create({
        data: {
          folId: `${followerId + new Date().getMilliseconds() * 7}`,
          followedId: followedId,
          followerId: followerId,
        },
      });
      res.status(200).json({ message: "Following successfully" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  unfollow: async (req: Request, res: Response) => {
    try {
      const { folId } = req.params;
      const follower = await prisma.follower.findUnique({
        where: { folId: folId },
      });
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id) return res.status(400).json({ message: "Invalid Token" });
      if (id !== follower!.followerId)
        return res
          .status(400)
          .json({ message: "You are not authorized to unfollow this" });
      await prisma.follower.delete({
        where: { folId: req.params.folId },
      });
      return res.status(200).send({
        message: `Unfollowing Successfully`,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default followCtrl;
