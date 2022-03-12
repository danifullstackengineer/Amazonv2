import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const exists = await User.findOne({ email: email });

    if (exists) {
      res.send({ success: false, message: "User already exists!" });
      return;
    }

    const user = new User({
      email: email,
      password: hashed,
    });
    user.save().then((response) => {
      if (response) {
        res.send({ success: true, message: "Successfuly registered!" });
        return;
      } else {
        res.send({ success: false, message: "Failed to register!" });
        return;
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.send({
        success: false,
        message: "Username or password is incorrect!",
      });
      return;
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      res.send({
        success: false,
        message: "Username or password is incorrect",
      });
      return;
    }
    const id = foundUser.id;
    const token = jwt.sign({ id }, "jwtSecret", {
      expiresIn: 3000,
    });
    res.send({
      success: true,
      message: "Successfully logged in!",
      token: token,
    });
  } catch (err) {
    console.error(err);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const id = req.body.id;
    const userFound = await User.findById(id)

    if(!userFound){
      res.send({success: false, message: "User not found!"})
      return;
    }
    const email = userFound.email;

    res.send({success: true, message: "Found user!", email: email})

  }
  catch(err){
    console.error(err);
  }
}

const verifyJWT = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send({ success: false, message: "No token was found!" });
    return;
  }
  jwt.verify(token, "jwtSecret", (err, decoded) => {
    if (err) {
      console.log(err)
      res.send({ success: false, message: "Failed to authenticate!" });
      return;
    }
    req.userId = decoded.id;
    next();
  });
};

const isAuth = async (_, res) => {
  res.send({ success: true, message: "User is authenticated!" });
};

export { createUser, loginUser, verifyJWT, isAuth, getUserInfo };
