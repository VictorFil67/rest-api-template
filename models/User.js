import { Schema, model, version } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password mast have at least 6 characters"],
      required: [true, "Password is required"],
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSetting);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
