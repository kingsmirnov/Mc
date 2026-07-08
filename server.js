const express = require("express");
const path = require("path");
const app = express();

// Allow form POST data
app.use(express.urlencoded({ extended: true }));

// ⭐ Serve ALL static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// ⭐ Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Replace this with your real login logic
    if (email === "test@example.com" && password === "123") {
        return res.send("success");
    }

    // If login fails
    return res.status(401).send("Invalid credentials");
});

// ⭐ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
