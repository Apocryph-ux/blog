import  express from 'express';
import  jwt from 'jsonwebtoken';
import bcrypt from'bcryptjs';
import cors from  'cors';
import connectDB from './db.js';
import User from './models/User.js';


import dot from 'dotenv'; 


dot.config();

const app = express();


connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());


const JWT_SECRET = process.env.JWT_SECRET || 'shyngys05';
const PORT = process.env.PORT || 8080;


app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Регистрация успешна',
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Вход успешен',
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Токен не передан' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Недействительный токен' });
  }
};




app.post('/logout', (req, res) => {
  res.json({ message: 'Выход выполнен (токен удаляется на клиенте)' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});