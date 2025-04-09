// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa'; // Importing icons

import './Profile.css';

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BacktoTop from "../../components/BacktoTop/BacktoTop";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State riêng cho form chỉnh sửa
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editBirthday, setEditBirthday] = useState('');
  const [editGender, setEditGender] = useState('');

  const userId = localStorage.getItem('userId');

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/profileuser/${userId}`);
      const { name, email, phone, birthday, gender } = response.data;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setBirthday(birthday ? birthday.split('T')[0] : '');
      setGender(gender);
    } catch (error) {
      console.error("Error fetching user data:", error.response || error.message);
      toast.error("Không thể tải thông tin người dùng");
    }
  };

  useEffect(() => {
    if (!userId || isDialogOpen) return; // Không gọi API khi dialog đang mở
    fetchUserData();
  }, [userId, isDialogOpen]);

  const validateEmail = (email) => {
    if (/\s/.test(email)) {
      toast.error("Email không hợp lệ: Không được chứa khoảng trắng.");
      return false;
    }
    if (!/^[a-zA-Z0-9@.]+$/.test(email)) {
      toast.error("Email không hợp lệ: Không được chứa ký tự đặc biệt khác.");
      return false;
    }
    if (!email.endsWith("@gmail.com")) {
      toast.error("Email không hợp lệ: Phải có định dạng '@gmail.com'.");
      return false;
    }
    return true;
  };

  const handleOpenDialog = () => {
    setEditName(name);
    setEditEmail(email);
    setEditPhone(phone);
    setEditBirthday(birthday);
    setEditGender(gender);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editName || !editPhone || !editBirthday || !editGender) {
      toast.error("Không được để trống trường dữ liệu.");
      return;
    }

    if (editName.length < 2) {
      toast.error("Tên phải có ít nhất 2 ký tự.");
      return;
    }

    if (!validateEmail(editEmail)) {
      return;
    }

    const today = new Date();
    const birthDate = new Date(editBirthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (age < 18 || (age === 18 && monthDifference < 0)) {
      toast.warning("Bạn phải từ 18 tuổi trở lên.");
      return;
    }

    try {
      const updatedUserData = {
        name: editName,
        email: editEmail,
        phone: editPhone,
        birthday: editBirthday,
        gender: editGender,
      };

      await axios.put(`http://localhost:4000/api/user/updateprofile/${userId}`, updatedUserData);

      toast.success("Thông tin đã được cập nhật thành công");
      
      // Cập nhật lại state gốc sau khi lưu
      setName(editName);
      setEmail(editEmail);
      setPhone(editPhone);
      setBirthday(editBirthday);
      setGender(editGender);

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating user data:", error.response || error.message);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-tittle">THÔNG TIN NGƯỜI DÙNG</div>
      <div className='body-profile'>
        <div className="form-group-profile">
          <label>Tên người dùng</label>
          <div className="profile-info full-width">{name}</div>
        </div>

        <div className="form-row">
          <div className="form-group-profile half-width">
            <label>Email</label>
            <div className="profile-info">{email}</div>
          </div>

          <div className="form-group-profile half-width">
            <label>Số điện thoại</label>
            <div className="profile-info">{phone}</div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group-profile half-width">
            <label>Ngày sinh</label>
            <div className="profile-info">{birthday ? new Date(birthday).toLocaleDateString() : ''}</div>
          </div>

          <div className="form-group-profile half-width">
            <label>Giới tính</label>
            <div className="profile-info">{gender}</div>
          </div>
        </div>

        <div className='edit-content'>
          <button onClick={handleOpenDialog} className='btn-edit-profile'>Chỉnh sửa</button>
        </div>

        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <button onClick={() => setIsDialogOpen(false)} className="close-icon">
                <FaTimes />
              </button>
              <div className="dialog-title">Chỉnh sửa thông tin</div>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="dialog-input" />
              <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="dialog-input" />
              <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="dialog-input" />
              <input type="date" value={editBirthday} onChange={(e) => setEditBirthday(e.target.value)} className="dialog-input date-input" />
              <select value={editGender || ''} onChange={(e) => setEditGender(e.target.value)} className="dialog-input">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
              <button onClick={handleSave} className="dialog-submit-button">Lưu</button>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
      <BacktoTop />
      <Footer />
    </div>
  );
};

export default Profile;
