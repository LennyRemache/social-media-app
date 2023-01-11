import bcrypt from "bcrypt"; // allow us to encrypt password
import jwt from "jsonwebtoken"; // give us a way to send users a web token to use for authorization
import User from "../models/User.js";

/* REGISTER USER */

// needs to be async because making call to mondgoDB similar to calling an APi
export const register = async (req, res) => {
  try {
    // destructuring req.body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
    } = req.body;
  } catch (err) {}
};
