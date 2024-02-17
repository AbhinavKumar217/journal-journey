const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config();
app.use(
  cors({
    origin: "https://journal-journey-client.vercel.app",
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(
    "mongodb+srv://dummyuser:HlFGNwh8fkhIZJKw@cluster0.e7kxje8.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
