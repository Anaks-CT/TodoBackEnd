import { JwtPayload, sign, verify } from "jsonwebtoken";

export const signToken = (_id: string): string => {
  return sign({ _id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET as string);
};
