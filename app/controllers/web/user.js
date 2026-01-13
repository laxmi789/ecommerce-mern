const userModel = require('../../models/web/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userRole = req.userRole


    // Check if user exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      userRole
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user from DB
    const user = await userModel.findOne({ email });
    const jwtSecret = "hffhighegknvkhbfdgfdlkgjlzdgdlgzlgljr"

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1d' })






    res.cookie('token', token, {
      httpOnly: true,
      secure: false,       // true in production
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    })
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userDetail = async (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Token is missing" })
    }
    const decoded = jwt.verify(token, jwtSecret)
    const user = await user.findOne({ _id: decoded.userID })

    if (!user) {
      res.status(404).json({ message: 'user not found' })
    }

    res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ message: 'server error' })
  }

}

module.exports = { registerUser, loginUser, userDetail }




