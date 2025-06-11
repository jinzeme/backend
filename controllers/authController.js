import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ✅ Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // ✅ Fetch user from database
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // ✅ Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // ✅ Create JWT token with id, username, and profile_picture
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                profile_picture: user.profile_picture // ✅ Add this line
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // ✅ Return token to frontend
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
