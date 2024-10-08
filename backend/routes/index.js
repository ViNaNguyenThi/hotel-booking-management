const express = require('express');
const path = require('path'); 
const userController = require('../controllers/UseControllers'); // Đảm bảo tên file controller chính xác
const router = express.Router(); // Tạo một router mới

const routes = (app) => {
    // Route API cho user
    router.post('/create',userController.createUser);

    app.use('/api/user', router); // Sử dụng controller để xử lý

    // Định nghĩa đường dẫn đến thư mục build của frontend
    const frontendSrcPath = path.join(__dirname, '../../frontend/src'); // Đường dẫn đến thư mục src

    // Phân phát các tệp tĩnh từ thư mục src (nếu cần)
    app.use(express.static(frontendSrcPath));

    // Trả về tệp Login.jsx cho route /login
    app.get('/login', (req, res) => {
        res.sendFile(path.join(frontendSrcPath, 'Login/Login.jsx')); // Đường dẫn đến Login.jsx
    });
};

// Chỉ định route cho việc tạo người dùng
// router.post('/create', userController.createUser);

module.exports = routes;
