const fs = require('fs');
const zlib = require('zlib');
const data = fs.readFileSync('e:\\develop\\heroes\\vcmi\\Data\\H3sprite.lod');
console.log('File size:', data.length);
let offset = 8;
const numFiles = data.readUInt32LE(4);
console.log('Number of files:', numFiles);
let mskCount = 0;
let entryOffset = 0x5c; // VCMI LOD条目起始偏移
for (let i = 0; i < numFiles; i++) {
    // 16字节文件名
    const nameEnd = data.indexOf(0, entryOffset);
    const name = data.toString('ascii', entryOffset, nameEnd > entryOffset + 16 ? entryOffset + 16 : nameEnd);
    entryOffset += 16;

    // 4字节文件偏移
    const fileOffset = data.readUInt32LE(entryOffset);
    entryOffset += 4;

    // 4字节fullSize
    const fullSize = data.readUInt32LE(entryOffset);
    entryOffset += 4;

    // 4字节unused
    entryOffset += 4;

    // 4字节compressedSize
    const compressedSize = data.readUInt32LE(entryOffset);
    entryOffset += 4;

    if (name.endsWith('.msk')) {
        mskCount++;
        console.log(`${i}: ${name} offset=${fileOffset} fullSize=${fullSize} compressedSize=${compressedSize}`);
        if (mskCount === 1) { // 检查第一个MSK文件
            console.log('Checking first MSK file...');
            const dataSize = compressedSize > 0 ? compressedSize : fullSize;
            const fileData = data.subarray(fileOffset, fileOffset + dataSize);
            console.log('Data length:', fileData.length);
            console.log('First 20 bytes:', fileData.subarray(0, Math.min(20, fileData.length)));
            if (compressedSize > 0) {
                try {
                    const decompressed = zlib.inflateSync(fileData);
                    console.log('Decompressed size:', decompressed.length);
                    console.log('Width:', decompressed.readUInt8(0), 'Height:', decompressed.readUInt8(1));
                    console.log('Expected pixels:', decompressed.readUInt8(0) * decompressed.readUInt8(1));
                    console.log('Actual data after header:', decompressed.length - 2);
                } catch (e) {
                    console.log('Decompression failed:', e.message);
                }
            } else {
                console.log('Uncompressed data');
                console.log('Width:', fileData.readUInt8(0), 'Height:', fileData.readUInt8(1));
                console.log('Expected pixels:', fileData.readUInt8(0) * fileData.readUInt8(1));
                console.log('Actual data after header:', fileData.length - 2);
            }
        }
    }
}
console.log('Total MSK files:', mskCount);