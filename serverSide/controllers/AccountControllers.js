const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/BlacklistModel");

const createAccount = async (req, res) => {
  try {
    const {
      userName,
      emailId,
      password,
      userType,
      userRole,
      walletAmount,
      bookings = [],
    } = req?.body;

    const payload = {
      userName,
      emailId,
      password: bcrypt.hashSync(password, 8),
      userType,
      userRole,
      walletAmount,
      bookings,
    };
    const data = await UserModel.create(payload);
    if (data) {
      res?.status(200)?.json(data);
    } else {
      res?.status(404)?.json("Please send valid details");
    }
  } catch (error) {
    res
      ?.status(504)
      ?.json(error?.message || error?._message || "Something went wrong");
  }
};

const checkValidUser = async (req, res) => {
  try {
    const { emailId, password } = req?.body;
    const data = await UserModel.find({ emailId: emailId });
    if (
      data?.length > 0 &&
      bcrypt?.compareSync(password, data?.[0]?.password)
    ) {
      const token = jwt.sign(
        {
          email: emailId,
          role: data?.[0]?.userRole,
        },
        process.env.Secret_key,
        {
          expiresIn: "1h",
        }
      );
      if (token) {
        const { emailId, _id, userName, userRole, userType, walletAmount } =
          data?.[0];
        res.status(200).json({
          token,
          data: {
            email: emailId,
            userId: _id,
            userName,
            userType,
            userRole,
            walletAmount,
          },
          message: "Logged in sucessfully",
        });
      } else {
        res.status(404).json("The email, password doesnot match");
      }
    }
  } catch (error) {
    res.status(404).json(error?.message || error?._message);
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const data = await UserModel.find({});

    if (data) res.status(200).json(data);
  } catch (error) {
    res.status(504).json(error?.message || error?._message);
  }
};

const logoutUser = async (req, res) => {
  try {
    const authHeader = req?.header["authorization"];
    const accessToken = authHeader?.split(" ")?.[1];
    if (!authHeader) res.status(204).json("No authorized jeader");
    const checkIsExist = await BlackListModel.findOne({
      token: accessToken,
    });

    if (checkIsExist) res.status(204).json("User already logged out");

    BlackListModel.create({
      token: accessToken,
    });

    res.setHeader("Clear-site-data", '"cookies", "storage"');
    res.status(200).json({ message: "You are logged out" });
  } catch (error) {
    res.status(504).json(error?.message || error?._message);
  }
};

const getAccountById = async (req, res) => {
    try {
        const data = await UserModel.findById(req?.params?.id);

        if (data) res.status(200).json(data);

    } catch (error) {
        res.status(504).json(error?.message || error?._message);
    }
};

const updateUserDetail = async(req, res) => {
    try {
        const { id } = req?.params;
        const data = await UserModel.findByIdAndUpdate(id, req?.body);
        if (!data) {
            res.status(404).json({message: 'There are no accounts by this id'})
        }
        const updatedAccount = await UserModel.findById(id);
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(504).json(error?.message || error?._message);
    }
};

module.exports = {
    createAccount,
    checkValidUser,
    getAllAccounts,
    getAccountById,
    logoutUser,
    updateUserDetail,
}
