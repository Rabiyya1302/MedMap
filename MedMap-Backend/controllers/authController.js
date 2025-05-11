// controllers/authController.ts
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const User =require( '../models/User');
const dotenv =require("dotenv");
dotenv.config();

const ADMIN_SECRET = process.env.ADMIN_SECRET;

if (!ADMIN_SECRET) {
  throw new Error('ADMIN_SECRET is not defined in the environment variables.');
}

export const register = async (req, res) => {
  const { name, email, password, role, adminSecret } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  let userRole = 'user';

  if (role === 'admin') {
    if (adminSecret !== ADMIN_SECRET) {
      return res.status(403).json({ message: 'Invalid admin secret.' });
    }
    userRole = 'admin';
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed.', error });
  }
};
export const login=async(req,res)=>{
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET is not defined in the environment variables.'); })(),
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed.', err });
  }

}