import express from "express";
import path from "path";
import  { login, createUser, addNewAdmin, getAllLeTan,
          getUserDetails, logoutAdmin, logoutKhachhang,
          createReceptionist, forgotPassword,resetPassword} from "../controllers/UseControllers.js"; // Đảm bảo đổi đuôi sang .js
import { isAdminAuthenticated,isPatientAuthenticated } from "../middlewares/auth.js"; 
const router = express.Router();


const routes = (app) => {
    // Định nghĩa route cho việc tạo người dùng
    router.post("/createUser", createUser); // Đặt đây để đảm bảo route được thiết lập
    router.post("/login",login);
    router.post("/admin/addnew", addNewAdmin);
    router.get("/LeTan",getAllLeTan);
    router.get("admin/me",isAdminAuthenticated,getUserDetails);
    router.get("/khachhang/me",isPatientAuthenticated,getUserDetails);
    router.get("/admin/logout",isAdminAuthenticated,logoutAdmin);
    router.get("/khachhang/logout",isPatientAuthenticated,logoutKhachhang);
    router.post("/letan/addnew",createReceptionist);

    //test quên mật khẩu
    router.post("/forgot-password",forgotPassword);
    router.post("/reset-password/:token",resetPassword);


    app.use("/api/user", router); // Sử dụng controller để xử lý

    // Định nghĩa đường dẫn đến thư mục build của frontend
    const frontendSrcPath = path.join(process.cwd(), 'frontend/src'); // Thay đổi đường dẫn

    // Phân phát các tệp tĩnh từ thư mục src (nếu cần)
    app.use(express.static(frontendSrcPath));

    // Trả về tệp Login.jsx cho route /login
    app.get('/login', (req, res) => {
        res.sendFile(path.join(frontendSrcPath, 'Login/Login.jsx')); // Đường dẫn đến Login.jsx
    });
};

export default routes; // Sử dụng export mặc định
