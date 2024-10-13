import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import routes from './routes/index.js'; // Import routes from routes file
import route from "./routes/branch.js"
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL], // Make sure these variables are set in your .env file
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_db}`,)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB:", err));

// Default route
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Define API routes
routes(app); // Call the routes function to set up routes
route(app);
// Start the server
const port = process.env.PORT || 7003;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app; // Export app for use in other files
