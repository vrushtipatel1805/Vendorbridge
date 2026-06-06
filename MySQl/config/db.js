const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vb@3",
    database: "vendorbridge"
});

connection.connect((err) => {

    if (err) {
        console.log("Connection failed");
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }

});

module.exports = connection;