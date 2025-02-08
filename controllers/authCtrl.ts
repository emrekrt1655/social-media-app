import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, IDecodedToken, IReqAuth } from "../utils/types";
import {
  genActiveToken,
  genAccessToken,
  genRefreshToken,
} from "../config/genToken";
import sendMail from "../config/sendMail";
import { validateEmail } from "../middleware/valid";

const prisma = new PrismaClient();

const tokenEnv = {
  active: process.env.ACTIVE_TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
  access: process.env.ACCESS_TOKEN_SECRET,
};
const CLIENT_URL = `${process.env.BASE_URL}`;
const authCtrl = {
  // register handler don't save to the database,
  //  it creates only a user data to generate a activation token

  register: async (req: Request, res: Response) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (existingUser)
      return res.status(400).json({ message: "This user already exists" });

    const password = await bcrypt.hash(req.body.password, 12);

    const { userName, email, name, surname } = req.body;

    try {
      const user: IUser = {
        userId: `${userName + new Date().getMilliseconds() * 5}`,
        userName: userName,
        name: name,
        surname: surname,
        email: email,
        password: password,
      };

      //it generates a token for five minutes to activate account
      const activeToken = genActiveToken({ user });
      const url = `${CLIENT_URL}/active/${activeToken}`;
      if (validateEmail(email)) {
        sendMail(email, url, "Verify your email address!");
        return res.json({
          message: "Succsess! Please check your email address!",
          active_token: activeToken,
        });
      }
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  },

  //it saves the user to the database with token

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${tokenEnv.active}`)
      );
      const { user } = decoded;

      if (!user) return res.status(400).json({ message: "Invalid token" });

      await prisma.user.create({
        data: {
          userId: user.userId,
          name: user.name,
          surname: user.surname,
          userName: user.userName,
          email: user.email,
          password: user.password,
        },
      });
      res.status(200).json({ message: "Account has been activated" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user)
        return res
          .status(400)
          .json({ message: "This account does not exists" });

      // if the user exists

      loginUser(user, password, res);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.status(200).json({ message: "Logged Out!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ mesage: "Please Login now!" });
      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${tokenEnv.refresh}`)
      );
      if (!decoded.id)
        return res.status(400).json({ mesage: "Please Login now!" });

      const user = await prisma.user.findUnique({
        where: { userId: decoded.id },
        //TODO
        //select: {password: false}
      });
      if (!user)
        return res.status(404).json({ mesage: "This account does not exist." });

      const access_token = genAccessToken({ id: user.userId });

      res.status(200).json({ access_token, user });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUsers: async (req: Request, res: Response) => {
    try {
      // const { token }: any = req.headers;
      // const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      // const { id } = decoded;
      // if (!id) return res.status(400).json({ message: "Invalid Token" });
      const users: IUser[] = await prisma.user.findMany({
        include: {
          _count: {
            select: {
              posts: true,
              likes: true,
              topics: true,
              comments: true,
            },
          },
        },
      });
      return res.json({
        status: "success",
        message: "All users found",
        data: users,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.messege });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id, user } = decoded;
      if (!id) return res.status(400).json({ message: "Invalid Token" });
      // if (user?.userId !== req.params.userId)
      if (id !== req.params.userId)
        return res
          .status(400)
          .json({ message: "You are not authorized to update this" });
      const { avatar, name, surname, bio } = <IUser>req.body;
      const updatedUser: IUser = await prisma.user.update({
        where: { userId: req.params.userId },
        data: <IUser>{
          avatar: avatar,
          //userId: userId,
          //userName: userName,
          bio: bio,
          name: name,
          surname: surname,
          //email: email,
          //password: hashedPassword,
        },
      });
      res.status(200).json({
        status: "OK",
        message: "User updated successfully",
        data: <IUser>updatedUser,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);

      const { id, user } = decoded;
      if (!id) return res.status(400).json({ message: "Invalid Token" });

      if (id !== req.params.userId)
        return res
          .status(400)
          .json({ message: "You are not authorized to delete this" });
      const deletedUser = await prisma.user.delete({
        where: { userId: req.params.userId },
      });

      return res
        .status(200)
        .send({ message: `${deletedUser.userId} deleted successfully` });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  changePassword: async (req: Request, res: Response) => {
    try {
      const { userId, oldPassword, password } = req.body;
      const { token }: any = req.headers;
      const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
      const { id } = decoded;
      if (!id) return res.status(400).json({ message: "Invalid Token" });
      // if (user?.userId !== req.params.userId)
      if (id !== req.params.userId)
        return res
          .status(400)
          .json({ message: "You are not authorized to change password" });
      const user = await prisma.user.findUnique({ where: { userId: userId } });
      if (!user)
        return res
          .status(400)
          .json({ message: "This account does not exists" });

      // if the user exists

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Password is incorrect" });

      const hashedPassword = await bcrypt.hash(password, 12);
      const updatedPassword: IUser = await prisma.user.update({
        where: { userId: req.params.userId },
        data: <IUser>{
          password: hashedPassword,
        },
      });
      res.status(200).json({
        status: "OK",
        message: "Password updated successfully",
        data: <IUser>updatedPassword,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user)
        return res
          .status(400)
          .json({ message: "This account does not exist." });
      const access_token = genAccessToken({ id: user?.userId });
      const url = `${CLIENT_URL}/reset_password/${access_token}`;
      if (validateEmail(email)) {
        sendMail(email, url, "Forgot password?");
        return res.json({ message: "Success! Please check your email." });
      }
    } catch (err: any) {
      return res.status(500).json({ message: err?.message });
    }
  },
  resetPassword: async (req: IReqAuth, res: Response) => {
    const { token }: any = req.headers;
    const decoded = <IDecodedToken>jwt.verify(token, `${tokenEnv?.access}`);
    const { id } = decoded;
    if (!id) return res.status(400).json({ message: "Invalid Token" });

    try {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);

      await prisma.user.update({
        where: { userId: id },
        data: { password: hashedPassword },
      });

      res.json({ message: "Password updated successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Password is incorrect" });

  //after login creates a access token
  const access_token = genAccessToken({ id: user.userId });
  // it creates a new access token
  const refresh_token = genRefreshToken({ id: user.userId });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/refresh_token",
    maxAge: 30 * 24 * 60 * 1000, //30 days
  });

  res.json({
    message: "Login successfully completed!",
    access_token,
    user,
    // user: { ...user, password: "" },
  });
};

export default authCtrl;
