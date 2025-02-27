import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export function addNewUser(data) {
  return User.create(data);
}

export const register = async (data) => {
  const { password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  return User.create({ ...data, password: hashPassword });
};
