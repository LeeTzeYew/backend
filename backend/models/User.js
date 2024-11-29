// models/User.js

const mongoose = require('mongoose');

// 定义用户模型
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true }); // 自动添加 createdAt 和 updatedAt 字段

// 创建并导出模型
const User = mongoose.model('User', userSchema);

module.exports = User;
