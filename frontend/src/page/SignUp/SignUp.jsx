// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Password from "../../components/Input/Password"; // Adjust this path as needed
// eslint-disable-next-line no-unused-vars
import signupImage from '../../assets/images/signup.jpg'; // Đường dẫn tới ảnh
import '../../index.css'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // Define password state
  const [error, setError] = useState(null);
// Hàm kiểm tra số điện thoại chính xác 10 số
const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/; // Kiểm tra đúng 10 số
  return phoneRegex.test(phone);
};

  const handlesSignUp = async (e) => {
    
    e.preventDefault();
    if (!name) {
      setError("Vui lòng nhập tên của bạn");
      return;
    }
    if (!validateEmail(email)) {
      setError("Vui lòng nhập email của bạn");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Vui lòng nhập số điện thoại của bạn");
      return;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu của bạn");
      return;
    }
    setError('');
    // Handle sign up logic here (add to Firebase or elsewhere)
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <form onSubmit={handlesSignUp}>
          <h1>Tạo Tài Khoản</h1>
          <p>Tên đăng nhập <span style={{ color: 'red', fontSize: '28px'}}>*</span></p>
          <input
            type="text"
            // placeholder="Name"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Email <span style={{ color: 'red', fontSize: '28px'}}>*</span></p>
          <input
            type="text"
            // placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Số điện thoại <span style={{ color: 'red', fontSize: '28px'}}>*</span></p>
          <input
            type="text"
            // placeholder="Phone"
            className="input-box"
            value={phone}
            pattern="[0-9]{10}"  // Chỉ chấp nhận đúng 10 số
            // maxLength={10}  // Giới hạn nhập tối đa 10 số
            inputMode="numeric"  // Bật bàn phím số trên di động
            onChange={(e) => setPhone(e.target.value)}
          />
          <p>Mật khẩu <span style={{ color: 'red', fontSize: '28px'}}>*</span></p>
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-primary-signup">Đăng Ký</button>
          <div className="create-account">
            Bạn đã có tài khoản? {" "}
            <Link to="/login" className="link-create">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
      <motion.div 
          className='image-container-signup'
          initial={{ x: 100 }} // Vị trí bắt đầu
          animate={{ x: 0 }} // Vị trí kết thúc
          exit={{ x: 100 }} // Vị trí ra khỏi
          transition={{ duration: 0.5 }} // Thời gian chuyển động
      >
      </motion.div>
    </div>
  );
}

export default SignUp;