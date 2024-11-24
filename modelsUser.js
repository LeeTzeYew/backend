const mongoose = require('mongoose');

// 定义用户模型
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true }, // 'teacher' or 'student'
});

module.exports = mongoose.model('User', UserSchema);
