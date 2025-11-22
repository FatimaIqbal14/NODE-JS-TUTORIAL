const fs = require('fs');

if (!fs.existsSync('existsSync')){
    fs.mkdir('existsSync', (err) => {
        console.log(`We encountered an error: ${err}`)
        console.log('Directory created successfully!')
    } )
}

if (fs.existsSync('existsSync')){
    fs.rmdir('existsSync', (err) => {
        console.log(`We encountered an error: ${err}`)
        console.log('Directory removed successfully!')
    } )
}