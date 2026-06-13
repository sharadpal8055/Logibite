import jwt from "jsonwebtoken";

const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    const token =
      req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;