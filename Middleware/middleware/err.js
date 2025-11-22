const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const { logInfo } = require('./log');

const ErrInfo = async (err, req, res, next) => {
    console.log('🚨 ErrInfo middleware called!');
    console.log('Error details:', {
        name: err.name,
        message: err.message,
        url: req.url,
        method: req.method
    });
    
    try {
        const filePath = path.join(__dirname, 'logs');
        console.log('📁 Logs directory path:', filePath);
        
        if (!fs.existsSync(filePath)) {
            console.log('📂 Creating logs directory...');
            fs.mkdirSync(filePath);
        }

        const errorFilePath = path.join(filePath, 'ErrorInfo.txt');
        console.log('📄 Error file path:', errorFilePath);
        
        const errorMessage = `${new Date().toISOString()}\t${err.name}\t${err.message}\t${req.method}\t${req.url}\n`;
        console.log('📝 Error message:', errorMessage);
        
        await logInfo(`ERROR: ${err.name}\t${err.message}\t${req.method}\t${req.url}`);
        await fsPromises.appendFile(errorFilePath, errorMessage);
        
        console.log('✅ Successfully wrote to ErrorInfo.txt');
       
    } catch (error) {
        console.log('❌ Failed to write error file:', error.message);
        console.log('Error stack:', error.stack);
    }
    
    // Always send response
    const statusCode = err.status || 500;
    console.log('📤 Sending response with status:', statusCode);
    res.status(statusCode).json({
        error: err.message,
        status: statusCode
    });
}

module.exports = { ErrInfo };