const express = require("express");
const path = require("path");
const app = express();

// Allow form POST data
app.use(express.urlencoded({ extended: true }));

// Serve all static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// ⭐ ALWAYS SUCCESSFUL LOGIN ⭐
app.post("/login", (req, res) => {
    // No checking email or password
    res.send("success");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
