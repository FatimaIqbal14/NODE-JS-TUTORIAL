const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), {encoding: 'utf-8'});
const ws = fs.createWriteStream(path.join(__dirname, 'files', 'new-lorem.txt'))


rs.on('error', (err) => {
    console.error('Read stream error:', err);
});

ws.on('error', (err) => {
    console.error('Write stream error:', err);
});

ws.on('finish', () => {
    console.log('Write completed successfully!');
});
/*rs.on('data', (dataChunk) => {
    ws.write(dataChunk);
})*/

rs.pipe(ws);
