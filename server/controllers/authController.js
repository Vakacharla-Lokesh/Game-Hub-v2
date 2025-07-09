const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { userName, emailId, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ userName, emailId, password: hashedPassword });
    await user.save();
    const token = sign(
      { userId: user._id, user_name: user.userName, email_id: emailId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = sign(
      { userId: user._id, user_name: user.userName, email_id: emailId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
