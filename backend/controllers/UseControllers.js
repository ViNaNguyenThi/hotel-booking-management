import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
 //import UserService from "../services/UserService.js";
import User from "../models/user.model.js";
import { generateToken } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import Branch from "../models/chinhanh.js";
import crypto from "crypto";
import bcrypt from "bcryptjs"; // Correct import
import {sendPasswordResetEmail,sendResetSuccessEmail} from "../mailtrap/emails.js"

export const createUser = catchAsyncErrors(async(req,res,next)=>{
    const{ name, email, phone, password } = req.body;
    if( !name ||
        !email ||
        !phone || 
        !password 
        ){
            return next(new ErrorHandler("Vui lòng nhập đủ thông tin", 400))
        }
        // if(password != confirmpassword){
        //     return next(new ErrorHandler("Confirm password do not match", 400))
        // }
        let user = await User.findOne({ email })
        if(user){
            return next(new ErrorHandler("Người dùng đã tạo tài khoản", 400))
        }
        user = await User.create({name, email, phone, password, role: "Khách hàng"});
    generateToken(user, "user registered",200,res)
   
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body; // Chỉ cần email và password
    if (!email || !password) {
        return next(new ErrorHandler("Vui lòng nhập đủ thông tin!", 400));
    }
    
    
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }

    // Kiểm tra role
    const userRole = user.role; // Lấy role của user từ database
    generateToken(user, "User login successfully", 200, res);
    res.status(200).json({ success: true, role: userRole, user });
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next) => {
    console.log(req.body);
    const{ name, email, phone, password } = req.body;
    if( !name ||
        !email ||
        !phone ||
        !password ){
            return next(new ErrorHandler("Vui lòng điền đủ thông tin", 400))
        }
const isRegistered = await User.findOne({email});
if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} with this email already exists!`, 400));
}
const admin = await User.create({name, email, phone, password,role: "Quản lý",});
res.status(200).json ({
    success: true,
    message:"Tạo tài khoản admin mới thành công!",
})
});
export const getAllLeTan = catchAsyncErrors(async(req,res,next) =>{
    const doctors = await User.find({role:"Lễ Tân"});
    res.status(200).json({
        success: true,
        doctors,
    });
});
export const getUserDetails = catchAsyncErrors(async(req, res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    })
});
export const logoutAdmin = catchAsyncErrors(async (req,res,next) => {
    res.status(200).cookie("adminToken", " ",{
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message:"Admin Log Out Successfully!",
    })
});
export const logoutKhachhang = catchAsyncErrors(async (req,res,next) => {
    res.status(200).cookie("khachhangToken", " ",{
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message:"khách hàng Log Out Successfully!",
    })
});

//tạo tài khoản lễ tân
export const createReceptionist = async (req, res, next) => { // Thêm next vào tham số
    try {
        const { name, email, phone, password, branch } = req.body;
        
        // Kiểm tra nếu thiếu thông tin
        if (!name || !email || !phone || !password || !branch ) {
            return res.status(400).json({ message: "Vui lòng điền đủ thông tin" });
        }

        // Tìm chi nhánh theo ID
        const branchData = await Branch.findById(branch); // Sửa từ Branch sang branch
        if (!branchData) {
            return res.status(404).json({ message: "Branch not found" });
        }

        // Tạo tài khoản lễ tân (trong User model)
        const user = await User.create({ // Sửa từ letan sang receptionist
            name,
            email,
            phone,
            password,
            branch: branchData._id, // Lưu ID chi nhánh
            role: "Lễ tân" // Thiết lập role là "Lễ tân"
        });
        res.status(201).json ({
            success: true,
            message:"Tạo tài khoản lễ tân mới thành công!",
            user:user
        })
    } catch (error) {
        console.error("Error creating lễ tân:", error);
        next(error); // Gọi next để chuyển lỗi cho middleware xử lý lỗi
    }
};
 
//Quên mật khẩu
export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
//reset lại mật khẩu
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Xuất createUser như là một export named
// export default { createUser }; // Sửa đổi xuất để phù hợp
