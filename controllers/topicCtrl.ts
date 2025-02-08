import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ITopic, IDecodedToken } from "../utils/types";
import jwt from "jsonwebtoken";

const tokenEnv = {
  access: process.env.ACCESS_TOKEN_SECRET,
};

const prisma = new PrismaClient();

const topicCtrl = {
  getTopics: async (req: Request, res: Response) => {
    try {
      const topics: ITopic[] = await prisma.topic.findMany({
        include: {
          _count: {
            select: {posts: true}
          }
        }
      });
      return res.status(200).json({
        status: "success",
        message: "All topics found",
        data: topics,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  createTopic: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id)
        return res.status(400).json({ message: "Invalid Token Please Login" });
      const { text, topicUserId, country, image } = req.body;
      await prisma.topic.create({
        data: {
          topicId: `${text.slice(0, 20).replace(/\s+/g, '') + new Date().getMilliseconds()*6}`,
          text: text,
          topicUserId: topicUserId,
          image: image,
          country: country
        },
      });
      res.status(200).json({ message: "Topic has been created" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default topicCtrl;
