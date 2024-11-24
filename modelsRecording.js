const mongoose = require('mongoose');

// 定义录制模型
const RecordingSchema = new mongoose.Schema({
    teacherId: { type: String, required: true },
    code: { type: String, required: true },
    audioPath: { type: String }, // 音频文件路径
});

module.exports = mongoose.model('Recording', RecordingSchema);


const Recording = require('./models/Recording'); // 引入录制模型

// 保存录制内容
app.post('/api/recordings', async (req, res) => {
    const { teacherId, code } = req.body;
    const newRecording = new Recording({ teacherId, code });
    try {
        await newRecording.save();
        res.send('Recording saved successfully');
    } catch (err) {
        res.status(500).send('Error saving recording');
    }
});
