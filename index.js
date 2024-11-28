const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// 引入模型
const User = require('./models/User'); // 确保路径正确

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/learning_platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// 用户注册路由
app.post('/api/users/register', async (req, res) => {
    const { username, password, userType } = req.body;
    try {
        const newUser = new User({ username, password, userType });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user');
    }
});

// 用户登陆路由
app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send('Invalid password');
    }
    res.send('Login successful');
});

//回放数据接口
app.get('/api/operation/replay', async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).send('User ID is required');
    }
    const operations = await OperationModel.find({ userId }).sort({ timestamp: 1 });
    res.json(operations);
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
