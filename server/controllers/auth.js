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

    // encryption process
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // storing user in DB
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();
    // Saves this document by inserting a new document into the database if document.isNew is true,
    // or sends an updateOne operation with just the modified paths if isNew is false.

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
