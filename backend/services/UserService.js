const User = require('../models/user.model'); // Nhớ import mô hình người dùng
const bcrypt = require('bcrypt'); // Thêm bcrypt để mã hóa mật khẩu

const createUser = async (userData) => {
    const { name, email, password, phone } = userData; // Bỏ qua confirmPassword ở đây vì bạn đã kiểm tra trước đó
    // Thêm logic để kiểm tra xem người dùng đã tồn tại hay chưa
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return {
            status: 'ERR',
            message: 'Email already exists'
        };
    }
    
    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = await User.create({ name, email, password: hashedPassword, phone });
    return {
        status: 'OK',
        message: 'User created successfully',
        data: newUser
    };
};

module.exports = {
    createUser
};
