const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// 引入模型
const User = require('./models/User'); // 确保路径正确

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/learning_platform', {
    useNewUrlParser: true,  // 确保连接MongoDB使用新的解析器
    useUnifiedTopology: true // 确保使用统一的拓扑结构
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
    try {
        const newUser = new User({ username, password, userType });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user');
    }
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
