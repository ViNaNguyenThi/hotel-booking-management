// import User from "../models/user.model.js"; // Sử dụng import thay vì require
// import bcrypt from "bcrypt"; // Thêm bcrypt để mã hóa mật khẩu

// const createUser = async (userData) => {
//     const { name, email, password, phone,role } = userData; // Bỏ qua confirmPassword ở đây vì bạn đã kiểm tra trước đó

//     // Thêm logic để kiểm tra xem người dùng đã tồn tại hay chưa
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//         return {
//             status: 'ERR',
//             message: 'Email already exists'
//         };
//     }
    
//     try {
//         // Mã hóa mật khẩu trước khi lưu
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Tạo người dùng mới
//         const newUser = await User.create({ name, email, password: hashedPassword, phone,role });
        
//         // Xóa mật khẩu khỏi thông tin người dùng để không bị lộ
//         newUser.password = undefined;

//         return {
//             status: 'OK',
//             message: 'User created successfully',
//             data: newUser
//         };
//     } catch (error) {
//         return {
//             status: 'ERR',
//             message: 'Error creating user',
//             error: error.message // Bạn có thể tùy chỉnh thông điệp lỗi ở đây
//         };
//     }
// };

// export default createUser;
