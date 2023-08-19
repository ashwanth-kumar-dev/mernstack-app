const jwt = require("jsonwebtoken");

const checkUserRole = async (req, res, next) => {
  try {
    const authHeader = req?.headers?.["authorization"];
    const token = authHeader?.split(" ")?.[1] || "";

    if (token) {
      const decoded = jwt.verify(token, process?.env?.Secret_key);
      if (decoded?.role === "Admin") next();
      else
        res
          .status(401)
          .json({
            message: "The user is not authorized  to perform this action",
          });
    } else {
      res.status(404).json({ message: "Please enter valid token" });
    }
  } catch (error) {
    res.status(502).json(error?.message || error?._message);
  }
};

const auth = async (req, res, next) => {
    try {
        const authHeader = req?.headers?.["authorization"];
        const token = authHeader?.split(" ")?.[1];

        if (token) {
            const decoded = jwt.verify(token, process?.env?.Secret_key);

            if (decoded) next();
            else res.status(401).json("Unable to authorize the user");
        } else {
            res.status(404).json("Please enter valid token")
        }
    } catch (error) {
        res.status(502).json({ message: error?._message || error?.message });
    }
};

module.exports = { checkUserRole, auth};
