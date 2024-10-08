const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require("./routes"); // Import routes từ file routes

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use(bodyParser.json());

// Kết nối tới MongoDB
mongoose.connect(`${process.env.MONGO_db}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB:", err));

// Định nghĩa route mặc định
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Định nghĩa các route cho API
routes(app); // Gọi hàm routes để thiết lập các route

// Khởi động server
const port = process.env.PORT || 7003;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app; // Xuất app để có thể sử dụng trong các tệp khác
