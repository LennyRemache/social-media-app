import mongoose from "mongoose"; // will help us setup the user model

// Everything in Mongoose starts with a Schema.
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true } // will give us automatic dates
);

const User = mongoose.model("User", UserSchema); // https://mongoosejs.com/docs/api/model.html#model_Model

export default User;
