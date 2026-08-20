import jwt from "jsonwebtoken";

const generateToken = (adminId: number, email: string) => {
  const jwtSecretKey = process.env.JWT_SECRET;

  console.log("JWT secret in generator:", jwtSecretKey);

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
