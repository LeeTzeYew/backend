// index.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

// 引入用户模型
const User = require('./models/User'); 

const app = express();

// 中间件
app.use(cors()); // 允许跨域请求
app.use(bodyParser.json()); // 解析 JSON 请求体

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/learning_platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// 根路径路由
app.get('/', (req, res) => {
    res.send('Welcome to the Learning Platform API');
});

// 用户注册路由
app.post('/api/users/register', async (req, res) => {
    const { username, password, userType } = req.body;

    // 验证输入是否合法
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // 验证密码长度（可以根据需要设置更严格的要求）
    if (password.length < 6) {
        return res.status(400).send('Password must be at least 6 characters long');
    }

    try {
        // 检查用户名是否已存在
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10); // 10 是加密强度

        // 创建新用户
        const newUser = new User({ username, password: hashedPassword, userType });

        // 保存到数据库
        await newUser.save();

        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user');
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
