const UserService = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        
        // Sửa lỗi trong điều kiện
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is not a valid email'
            });
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The password does not match confirm password'
            });
        }
        
        const response = await UserService.createUser(req.body);
        return res.status(201).json(response); // Trả về mã trạng thái 201 khi thành công
    } catch (e) {
        console.error(e); // In lỗi ra console để dễ dàng kiểm tra
        return res.status(500).json({
            status: 'ERR',
            message: 'An error occurred while creating the user'
        });
    }
};

module.exports = {
    createUser
};
