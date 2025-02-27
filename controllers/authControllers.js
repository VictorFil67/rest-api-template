import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { addNewUser, register } from "../services/authServices.js";
import { findUser } from "../services/usersServices.js";

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

  const newUser = await register(req.body);
  res.status(201).json(newUser);
};

export default {
  createUser: ctrlWrapper(createUser),
  signup: ctrlWrapper(signup),
};
