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
    const hashedPassword = await bcrypt.hash(password, 10);
    const createResult = await prisma.user.create({
      data: {
        registrationNo: registrationNo,
        name: name,
        password: hashedPassword,
        email: email,
      },
    });
    console.log(createResult);
    if (createResult) {
      res.json({
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
