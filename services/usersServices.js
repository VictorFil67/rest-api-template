import User from "../models/User.js";

export function findUser(params) {
  return User.findOne(params);
}

export function findUserById(id) {
  return User.findById(id);
}
