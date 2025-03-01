import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { addNewUser, register, setToken } from "../services/authServices.js";
import { findUser, findUserById } from "../services/usersServices.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const createUser = async (req, res) => {
  const result = await addNewUser(req.body);
  res.status(201).json(result);
};

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    throw HttpError(409, "This email is already in use");
  }

  const { name, email: newEmail } = await register(req.body);
  const newUser = { name, email: newEmail };
  res.status(201).json(newUser);
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const existedUser = await findUser({ email });
  console.log("existedUser: ", existedUser);
  if (!existedUser) {
    throw HttpError(401, "Email is wrong");
  }
  const { password: hashPassword, _id } = existedUser;
  const compare = await bcrypt.compare(password, hashPassword);
  if (!compare) {
    throw HttpError(401, "Password is wrong");
  }

  const payload = { id: _id };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  await setToken(_id, accessToken);

  //   const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  //   await setTokens(_id, accessToken, refreshToken);

  const user = await findUserById(_id, "-password -accessToken");
  console.log("user: ", user);
  res.status(200).json({ user, accessToken });
};

const logout = async (req, res) => {
  const { _id: id } = req.user;
  await setToken(id);
  //   await setTokens(id);
  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { _id, name, email, accessToken } = req.user;
  const user = { _id, name, email };

  res.json({ user, accessToken });
};

export default {
  createUser: ctrlWrapper(createUser),
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
