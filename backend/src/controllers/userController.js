import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { registrationNo, name, password, email } = req.body;

  const result = await prisma.user.findUnique({
    where: {
      registrationNo: registrationNo,
    },
  });
  //   console.log(result);
  if (result == null) {
    if (password.length < 6)
      return res.json({
        status: 400,
        message: "Password Length must be greater than 6",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const createResult = await prisma.user.create({
      data: {
        registrationNo: registrationNo,
        name: name,
        password: hashedPassword,
        email: email,
      },
    });

    if (createResult) {
      return res.json({
        status: "200",
        message: "User registered successfully",
      });
    }
  } else if (result != null && result?.registrationNo === registrationNo) {
    return res.json({
      status: "400",
      message: "User already registered with email or registration number",
    });
  }
};

export const loginUser = async (req, res) => {
  const { regNo, password } = req.query;
  const result = await prisma.user.findUnique({
    where: {
      registrationNo: regNo,
    },
  });
  console.log(result);
  if (result == null) {
    return res.json({
      status: 400,
      message: "user nor found, please register to login",
    });
  }
  if (result && (await bcrypt.compare(password, result.password))) {
    return res.json({
      status: 200,
      message: "Login Successful",
    });
  } else {
    return res.json({
      status: 400,
      message: "Invalid credentials",
    });
  }
};
