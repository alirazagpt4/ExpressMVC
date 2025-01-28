const JWT_SECRET = process.env.JWT_SECRET;
import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if user already exists
    const existingUser = await User.findOne({ email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    let newUser = await User.create([{ name, email, password:hashedPassword }]);
    res.status(201).json({ message: "signup Successfully", newUser });
  } catch (err) {
    res.status(500).send("internal server error");
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
            return res.status(401).json({message:"User Not Found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    res.status(200).json({ message: "login Successfully", user, token });
  } catch (err) {
    res.status(500).send("internal server error");
  }
};

export const authenticationToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } else {
    res.status(401).json({ message: "Token is not provided" });
  }
};
