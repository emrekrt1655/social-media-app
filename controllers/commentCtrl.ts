import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { IComment, IDecodedToken } from "../utils/types";
import jwt from "jsonwebtoken";

const tokenEnv = {
  access: process.env.ACCESS_TOKEN_SECRET,
};

const prisma = new PrismaClient();

const commentCtrl = {
  getComments: async (req: Request, res: Response) => {
    try {
      const comments: IComment[] = await prisma.comment.findMany({
        where: { commentPostId: req.params.postId },
      });
      return res.status(200).json({
        status: "success",
        message: "All comments found",
        data: comments,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  createComment:  async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id) return res.status(400).json({ message: "Please Login to comment" });
      const { text, commentPostId, commentUserId } = req.body;
      await prisma.comment.create({
        data: {
          commentId: `${text.slice(0, 20).replace(/\s+/g, '') + new Date().getMilliseconds()*5}`,
          text: text,
          commentPostId: commentPostId,
          commentUserId: commentUserId,
        },
      });
      res.status(200).json({ message: "Comment has been created" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;
      const comment = await prisma.comment.findUnique({
        where: { commentId: commentId },
      });
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id) return res.status(400).json({ message: "Invalid Token" });
      if (id !== comment!.commentUserId)
        return res
          .status(400)
          .json({ message: "You are not authorized to delete this" });
      const deletedComment = await prisma.comment.delete({
        where: { commentId: req.params.commentId },
      });
      return res
        .status(200)
        .send({ message: `${deletedComment.commentId} deleted successfully` });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default commentCtrl;
