import express from "express"; // able to use import statements rather tha require due to the "type": "module" in package.json
import bodyParser from "body-parser"; // Parse incoming request bodies in a middleware before your handlers
import mongoose, { mongo } from "mongoose"; // Mongoose is a MongoDB object modeling tool
import cors from "cors"; // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
import dotenv from "dotenv"; /* Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
                                The process.env property returns an object containing the user environment.*/
import multer from "multer"; // for handling multipart/form-data , which is primarily used for uploading files
import helmet from "helmet"; // Helmet helps you secure your Express apps by setting various HTTP headers.
import morgan from "morgan"; // HTTP request logger middleware
import path from "path";
import { fileURLToPath } from "url"; /* 
                                       url <URL> | <string> The file URL string or URL object to convert to a path.
                                       Returns: <string> The fully-resolved platform-specific Node.js file path. 
                                     */
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // creates an backend express application

/* app.use([path,] callback [, callback...])
    - if no path is specified then the middleware callback function
      will execute for every request to the app
      (path by default is the root directory "/")
*/
app.use(express.json());
app.use(helmet()); // Sets Helmets default headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // sets the Cross-Origin-Resource-Policy header in Helmets default headers
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // where to store the files
    cb(null, "/public/assets");
  },
  filename: function (req, file, cb) {
    // how the files should be named
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }); // anytime a file is uploaded this variable will be used

/* ROUTES WITH FILES */
// (route, middleware, controller)
app.post("/auth/register", upload.single("picture"), register); // Routes HTTP POST requests to the specified path with the specified callback functions

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/* MONGOOSE SETUP */
dotenv.config(); // process.env now has the keys and values you defined in your .env file

const PORT = process.env.PORT || 6001;

mongoose.set("strictQuery", false); // mongoose recommends adding this to prepare for future changes in Mongoose 7

// connecting application to mongoDB through mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
