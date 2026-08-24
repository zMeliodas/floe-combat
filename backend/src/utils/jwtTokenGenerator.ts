import jwt from "jsonwebtoken";

const generateToken = (adminId: number, email: string) => {
  const jwtSecretKey = process.env.JWT_SECRET;

  return jwt.sign(
    {
      adminId,
      email,
    },
    jwtSecretKey!,
    { expiresIn: "7d" },
  );
};

export default generateToken;
