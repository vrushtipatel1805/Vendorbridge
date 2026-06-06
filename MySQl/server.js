const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.post("/vendors", (req, res) => {

    const {
        companyName,
        vendorName,
        email,
        phone,
        address,
        gstNumber
    } = req.body;

    const sql = `
        INSERT INTO vendors
        (
            company_name,
            vendor_name,
            email,
            phone,
            address,
            gst_number
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            companyName,
            vendorName,
            email,
            phone,
            address,
            gstNumber
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: err.sqlMessage
                });

            }

            res.json({
                message: "Vendor added successfully"
            });

        }
    );

});

app.post("/register", (req, res) => {

    const {
        firstName,
        lastName,
        email,
        phone,
        country,
        role,
        password,
        additional_info
    } = req.body;

    const sql = `
        INSERT INTO users
        (
            first_name,
            last_name,
            email,
            phone,
            country,
            role,
            password,
            additional_info
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            firstName,
            lastName,
            email,
            phone,
            country,
            role,
            password,
            additional_info
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: err.sqlMessage
                });

            }

            res.json({
                message: "Account created successfully"
            });

        }
    );

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});