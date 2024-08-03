import jwt from "jsonwebtoken";

const secret = "N@bar@J2000";
export function getToken(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);

  return token;
}

export const verifyToken = (token) => {
  const payloadData = jwt.verify(token, secret);
  return payloadData;
};
