const fs = require("fs");
const crypto = require("crypto");

const SECRET_KEY = crypto
  .createHash("sha256")
  .update("my-secret-key") // <-- MUST MATCH server.js
  .digest();

const ALGO = "aes-256-cbc";

function decrypt(line) {
    const [ivBase64, encryptedBase64] = line.split(":");
    if (!ivBase64 || !encryptedBase64) return null;

    const iv = Buffer.from(ivBase64, "base64");
    const encrypted = Buffer.from(encryptedBase64, "base64");

    const decipher = crypto.createDecipheriv(ALGO, SECRET_KEY, iv);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

const file = fs.readFileSync("users.enc.txt", "utf8");
const lines = file.split("\n").filter(l => l.trim().length > 0);

for (const line of lines) {
    const result = decrypt(line);
    console.log(result);
}
