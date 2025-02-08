import { NextFunction, Request, Response } from "express";

const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, userName, email, password } = req.body;

  // if (!userId) {
  //   return res.status(400).json({ msg: "Please add your User ID." });
  // } else if (userId.length > 5) {
  //   return res.status(400).json({ msg: "Your User ID must be 5 digits." });
  // } else if (userId.length < 5) {
  //   return res.status(400).json({ msg: "Your User ID must be 5 digits." });
  // }

  if (!userName) {
    return res.status(400).json({ message: "Please add your user name" });
  } else if (userName.length > 20) {
    return res.status(400).json({ message: "Your surname is up to 20 chars long" });
  }

  if (!email) {
    return res.status(400).json({ message: "Please add your email address" });
  } else if (!validateEmail(email)) {
    return res.status(400).json({ message: "Your email is not valid" });
  }

  if (password.length < 8) {
    return res.json({ message: "Password must be at least 8 chars." });
  }

  next();
};

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default validRegister;
