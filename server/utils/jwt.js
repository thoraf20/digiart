import Jwt from "jsonwebtoken";

export const generateJwt = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    ethereum_address: user.ethereum_address,
    role: user.user_type
  };
  const options = {
    expiresIn: "2d",
    issuer: "digi_art"
  };
  const secret = process.env.JWT_SECRET;
  const token = Jwt.sign(payload, secret, options);
  return { token, ...payload };
}

export const verifyJwt = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Access denied! Unauthorized operation."
    });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const options = {
      expiresIn: "2d",
      issuer: "property-exchange"
    };
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET, options);

      req.decoded = decoded;
      next();
    } catch (err) {
      debug(err);
      return res.status(401).json({
        message: "Access denied! Invalid token."
      });
    }
  }
}