require('dotenv').config();

console.log('=== ENVIRONMENT VARIABLES CHECK ===');
console.log('DATABASE_URI:', process.env.DATABASE_URI);
console.log('PORT:', process.env.PORT);
console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET ? 'Loaded' : 'Not loaded');
console.log('Current directory:', __dirname);
console.log('==============================');

// Test if we can read the .env file directly
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
console.log('.env file path:', envPath);
console.log('.env file exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('.env file content:');
    console.log(envContent);
}