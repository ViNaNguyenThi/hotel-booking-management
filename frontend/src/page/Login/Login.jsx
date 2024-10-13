// Component Login.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { Link, useNavigate } from "react-router-dom";
 import Password from "../../components/Input/Password"; // Giả sử bạn đã tạo component Password
import { validateEmail } from '../../utils/helper'; // Giả sử bạn đã tạo hàm validateEmail
// eslint-disable-next-line no-unused-vars
import loginImage from '../../assets/images/login.jpg'; // Đường dẫn tới ảnh
import '../../index.css'; // Import file CSS
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setError("Vui lòng nhập lại email của bạn");
            return;
        }
        if (!password) {
            setError("Vui lòng nhập mật khẩu của bạn");
            return;
        }

        setError(""); // Reset lỗi

        try {
            const response = await axios.post('http://localhost:4000/api/user/login', {
                email,
                password,
            });
        
            console.log("Response:", response.data); // In ra dữ liệu trả về từ server
        
            if (response.data.success) {

                const {  user } = response.data; // Giả sử server trả về role và thông tin người dùng

                if (user.role === "Khách hàng") {
                    // Lưu thông tin người dùng vào localStorage
                    localStorage.setItem('user', JSON.stringify(user));
                    navigate('/'); // Chuyển đến trang chính
                } else {
                    setError("Tài khoản không tồn tại");
                }
            } else {
                setError("Đăng nhập thất bại!");
            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    return (
        <div className="login-container">
            <motion.div 
                className='image-container'
                initial={{ x: -100 }} // Vị trí bắt đầu
                animate={{ x: 0 }} // Vị trí kết thúc
                exit={{ x: -100 }} // Vị trí ra khỏi
                transition={{ duration: 0.5 }} // Thời gian chuyển động
            >
            </motion.div>
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <h1>Đăng Nhập</h1>
                    <p>Email <span style={{ color: 'red', fontSize: '28px'}}>*</span></p>
                    <input
                        type="text"
                        className="input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p>Mật khẩu <span style={{ color: 'red', fontSize: '28px'}}>*</span></p>
                    <Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='password-box'
                    />
                    {error && <p className='error-message'>{error}</p>}
                    <p className="forgot-password">
                        <Link to="/forgot-password" className="link">Quên mật khẩu</Link>
                    </p>
                    <button type="submit" className="btn-primary"> 
                        Đăng Nhập
                    </button>
                    <div className="create-account">
                        Bạn chưa có tài khoản? {" "}
                        <Link to="/signup" className="link-create">
                            Đăng ký
                        </Link>
                    </div>
                    <div className="footer">
                        <div className="login-role-container">
                            <span className="line"></span>
                            <span className="login-role-text">Đăng nhập với vai trò</span>
                            <span className="line"></span>
                        </div>
                        <Link to="/admin">
                            <button className="btn-role">Nhân viên khách sạn</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
