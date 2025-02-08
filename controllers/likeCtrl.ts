import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ILike, IDecodedToken } from "../utils/types";
import jwt from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

declare module "http" {
  interface IncomingHttpHeaders {
    token?: string;
  }
}

const tokenEnv = {
  access: process.env.ACCESS_TOKEN_SECRET,
};

const prisma = new PrismaClient();

const likeCtrl = {
  getLikes: async (req: Request, res: Response) => {
    try {
      const likes: any = await prisma.like.findMany();
      return res.status(200).json({
        status: "success",
        message: "All likes found",
        data: likes,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getPostLikes: async (req: Request, res: Response) => {
    try {
      // const { token }: IncomingHttpHeaders = req.headers;
      // const decoded = <IDecodedToken>jwt.verify(token!, `${tokenEnv?.access}`);
      // const { id } = decoded;
      // if (!id)
      //   return res.status(400).json({ message: "Please Login to like!" });
      //
      const { likePostId } = req.params;
      const likes: any = await prisma.like.findMany({
        where: { likePostId: likePostId },
      });
      return res.status(200).json({
        status: "success",
        message: "All likes found",
        data: likes,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getCommentLikes: async (req: Request, res: Response) => {
    try {
      const { token }: IncomingHttpHeaders = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token!, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id)
        return res.status(400).json({ message: "Please Login to comment" });
      const { commentId } = req.params;
      const likes: any = await prisma.like.findMany({
        where: { likeCommentId: commentId },
      });
      return res.status(200).json({
        status: "success",
        message: "All likes found",
        data: likes,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  like: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id)
        return res.status(400).json({ message: "Please Login to comment" });

      const { likeId, likeUserId, likePostId } = req.body;
      await prisma.like.create({
        data: {
          likeId: `${likeUserId + new Date().getMilliseconds() * 11}`,
          likePostId: likePostId,
          likeUserId: likeUserId,
        },
      });
      res.status(200).json({ message: "It has been liked" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  likeComment: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id)
        return res.status(400).json({ message: "Please Login to comment" });

      const { likeUserId, likeCommentId } = req.body;
      await prisma.like.create({
        data: {
          likeId: `${likeUserId + new Date().getMilliseconds() * 11}`,
          likeCommentId: likeCommentId,
          likeUserId: likeUserId,
        },
      });
      res.status(200).json({ message: "It has been liked" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  unlike: async (req: Request, res: Response) => {
    try {
      const { likeId } = req.params;
      const like = await prisma.like.findUnique({
        where: { likeId: likeId },
      });
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id) return res.status(400).json({ message: "Invalid Token" });
      if (id !== like!.likeUserId)
        return res
          .status(400)
          .json({ message: "You are not authorized to delete this" });
      const deletedLike = await prisma.like.delete({
        where: { likeId: req.params.likeId },
      });
      return res
        .status(200)
        .send({ message: `${deletedLike.likeId} deleted successfully` });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default likeCtrl;
