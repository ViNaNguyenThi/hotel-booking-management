import express from "express";
import { createDefaultBranches, addBranch } from "../controllers/BranchControllers.js";

const router = express.Router();

// Định nghĩa route cho tạo chi nhánh mặc định
router.get("/default", createDefaultBranches);

// Route để thêm chi nhánh mới
router.post("/add", addBranch);

const route = (app) => {
    app.use('/branch', router); // Tất cả các route liên quan đến chi nhánh sẽ sử dụng '/branch'
};

export default route;
