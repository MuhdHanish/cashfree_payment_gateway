import { Cashfree } from "cashfree-pg";
import express from "express";
import crypto from "crypto";
import cors from "cors";
import "dotenv/config";

const app = express();

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

const generateOrderID = () => {
    const uniqueID = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHash("sha256").update(uniqueID).digest("hex");
    return hash.substring(0, 12);
};

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Cashfree Payment Gateway running..."
    });
});

app.get("/payment", async (req, res) => {
    try {
        const request = {
            order_amount: 1.00,
            order_currency: "INR",
            order_id: generateOrderID(),
            customer_details: {
                customer_id: crypto.randomUUID(),
                customer_name: "John Doe",
                customer_email: "Xh2xq@example.com",
                customer_phone: "9090407368"
            },
        };

        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        
        res.json({
            success: true,
            message: "Payment order created successfully",
            payment: {
                ...response.data
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
});

app.post("/verify", async (req, res) => {
    try {
        const { orderID } = req.body;
        
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderID);

        res.json({
            success: true,
            message: "Payment verified successfully",
            payment: {
                ...response.data
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});