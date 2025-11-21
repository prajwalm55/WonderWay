// hashAdmin.js
import bcrypt from 'bcrypt';

const password = "admin123";
const saltRounds = 10;

const hashed = await bcrypt.hash(password, saltRounds);
console.log("Hashed password:", hashed);
