import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createUser = async (req, res) => {
  const { registrationNo, name, password, email, collegeName } = req.body;
  console.log(req.body);
  const result = await prisma.User.findUnique({
    where: {
      email: email,
    },
  });

  if (result == null) {
    if (password.length < 6)
      return res.json({
        status: 400,
        message: "Password Length must be greater than 6",
      });
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createResult = await prisma.User.create({
        data: {
          registrationNo: registrationNo,
          name: name,
          password: hashedPassword,
          email: email,
          collegeName: collegeName.toUpperCase(),
        },
      });
      if (createResult) {
        return res.json({
          status: "200",
          message: "User registered successfully",
        });
      }
    } catch (error) {
      return res.json({
        status: 500,
        message: "internal server error",
      });
    }
  } else if (
    result?.registrationNo === registrationNo ||
    result.email === email
  ) {
    return res.json({
      status: "400",
      message: "User already registered with this email or registration no ",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.query;

  const result = await prisma.User.findUnique({
    where: {
      email: email.toString(),
    },
  });
  console.log(result);
  if (result == null) {
    return res.json({
      status: 400,
      message: "user not found, please register to login",
    });
  }
  const token = jwt.sign({ result }, process.env.SECRET, { expiresIn: "7d" });
  // console.log(result);
  if (result && (await bcrypt.compare(password, result.password))) {
    return res.json({
      status: 200,
      message: "Login Successful",
      token: token,
      userData: {
        id: result.id,
        name: result.name,
        email: result.email,
        collegeName: result.collegeName,
      },
    });
  } else {
    return res.json({
      status: 400,
      message: "Invalid credentials",
    });
  }
};

export const testController = async (req, res) => {
  try {
    res.json({ status: 200, message: "authenticated User" });
  } catch (error) {
    res.json({
      status: "Server Error",
      message: "Error in authenticationg User",
    });
  }
};
