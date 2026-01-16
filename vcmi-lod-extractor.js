"use strict";
// vcmi-lod-extractor.ts - VCMI LOD资源提取工具，按方案一实现
// 使用: npm run extract <lodPath> <outputDir>
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const zlib = __importStar(require("zlib"));
const sharp_1 = __importDefault(require("sharp"));
const pcx = require('pcx');
class LODExtractor {
    constructor(lodPath) {
        this.lodPath = lodPath;
        this.entries = new Map();
        this.buffer = fs.readFileSync(lodPath);
        const ext = path.extname(lodPath).toLowerCase();
        if (ext === '.lod' || ext === '.pac') {
            this.parseLOD();
        }
        else if (ext === '.snd') {
            this.parseSND();
        }
        else if (ext === '.vid') {
            this.parseVID();
        }
        else {
            throw new Error('Unsupported archive format');
        }
    }
    parseLOD() {
        // 检查文件大小
        if (this.buffer.length < 10)
            return;
        // 读取总文件数 (偏移8, uint32 LE)
        const totalFiles = this.buffer.readUInt32LE(8);
        let offset = 0x5c; // 条目起始偏移
        for (let i = 0; i < totalFiles; i++) {
            // 读取文件名 (16字节, null-terminated)
            const nameEnd = this.buffer.indexOf(0, offset);
            const name = this.buffer.toString('ascii', offset, nameEnd > offset + 16 ? offset + 16 : nameEnd);
            offset += 16;
            // 读取偏移 (uint32 LE)
            const entryOffset = this.buffer.readUInt32LE(offset);
            offset += 4;
            // 读取fullSize (uint32 LE)
            const fullSize = this.buffer.readUInt32LE(offset);
            offset += 4;
            // 跳过4字节未知
            offset += 4;
            // 读取compressedSize (uint32 LE)
            const compressedSize = this.buffer.readUInt32LE(offset);
            offset += 4;
            this.entries.set(name, { name, offset: entryOffset, fullSize, compressedSize });
        }
    }
    parseSND() {
        // SND: 偏移0: totalFiles (uint32 LE)
        const totalFiles = this.buffer.readUInt32LE(0);
        let offset = 4;
        for (let i = 0; i < totalFiles; i++) {
            // 文件名 (40字节)
            const name = this.buffer.toString('ascii', offset, offset + 40).replace(/\0/g, '');
            offset += 40;
            // 偏移 (uint32 LE)
            const entryOffset = this.buffer.readUInt32LE(offset);
            offset += 4;
            // 大小 (uint32 LE)
            const fullSize = this.buffer.readUInt32LE(offset);
            offset += 4;
            this.entries.set(name, { name, offset: entryOffset, fullSize, compressedSize: 0 });
        }
    }
    parseVID() {
        // VID类似SND，但可能有不同头部
        // 简化：假设类似
        this.parseSND();
    }
    async extractAll(outputDir) {
        fs.mkdirSync(outputDir, { recursive: true });
        for (const [name, entry] of this.entries) {
            try {
                const data = this.extractEntry(entry);
                const outputPath = path.join(outputDir, name);
                // 确保目录存在
                fs.mkdirSync(path.dirname(outputPath), { recursive: true });
                if (name.toLowerCase().endsWith('.pcx')) {
                    // 转换为PNG
                    try {
                        const pcxData = pcx.decode(data);
                        const pngBuffer = await (0, sharp_1.default)(pcxData.pixels, {
                            raw: { width: pcxData.width, height: pcxData.height, channels: 4 }
                        }).png().toBuffer();
                        const pngPath = outputPath.replace(/\.pcx$/i, '.png');
                        fs.writeFileSync(pngPath, pngBuffer);
                        console.log(`Extracted and converted: ${name} -> ${pngPath}`);
                    }
                    catch (error) {
                        console.error(`PCX conversion failed for ${name}:`, error);
                        // 保存原文件
                        fs.writeFileSync(outputPath, data);
                        console.log(`Saved original PCX: ${name}`);
                    }
                }
                else if (name.toLowerCase().endsWith('.wav') || name.toLowerCase().endsWith('.smk')) {
                    // 音频或视频文件
                    fs.writeFileSync(outputPath, data);
                    console.log(`Extracted media: ${name}`);
                }
                else if (name.toLowerCase().endsWith('.def')) {
                    // 解析DEF并创建Atlas
                    this.parseDEFAndCreateAtlas(data, outputPath.replace(/\.def$/i, ''));
                }
                else {
                    // 其他文件直接保存
                    fs.writeFileSync(outputPath, data);
                    console.log(`Extracted: ${name}`);
                }
            }
            catch (error) {
                console.error(`Error extracting ${name}:`, error);
            }
        }
    }
    extractEntry(entry) {
        const data = this.buffer.subarray(entry.offset, entry.offset + (entry.compressedSize > 0 ? entry.compressedSize : entry.fullSize));
        return entry.compressedSize > 0 ? zlib.inflateSync(data) : data;
    }
    parseDEFAndCreateAtlas(data, basePath) {
        // 简化DEF解析 (基于VCMI CDefFile逻辑)
        let offset = 0;
        // 跳过类型 (4), 宽度/高度 (8)
        offset += 16;
        // 读取块数量
        const totalBlocks = data.readUInt32LE(offset);
        offset += 4;
        // 跳过调色板 (256*3)
        offset += 768;
        const frames = [];
        const atlas = {
            frames: {},
            meta: {
                image: path.basename(basePath) + '.png',
                format: 'RGBA8888',
                size: { w: 0, h: 0 },
                scale: 1
            }
        };
        for (let block = 0; block < totalBlocks; block++) {
            const blockID = data.readUInt32LE(offset);
            offset += 4;
            const totalEntries = data.readUInt32LE(offset);
            offset += 16; // 跳过未知
            // 跳过名称列表 (13*totalEntries)
            offset += 13 * totalEntries;
            // 读取偏移列表
            const offsets = [];
            for (let j = 0; j < totalEntries; j++) {
                offsets.push(data.readUInt32LE(offset));
                offset += 4;
            }
            // 解析每帧
            for (let frame = 0; frame < totalEntries; frame++) {
                const frameOffset = offsets[frame];
                const frameData = data.subarray(frameOffset);
                // 读取SSpriteDef (24字节)
                const size = frameData.readUInt32LE(0);
                const format = frameData.readUInt32LE(4);
                const fullWidth = frameData.readUInt32LE(8);
                const fullHeight = frameData.readUInt32LE(12);
                const width = frameData.readUInt32LE(16);
                const height = frameData.readUInt32LE(20);
                const leftMargin = frameData.readInt32LE(24);
                const topMargin = frameData.readInt32LE(28);
                // 像素数据从32字节开始
                const pixelData = frameData.subarray(32, 32 + width * height);
                frames.push({ width, height, leftMargin, topMargin, data: pixelData });
                // 添加到atlas
                const frameName = `${blockID}_${frame}`;
                atlas.frames[frameName] = {
                    frame: { x: 0, y: 0, w: width, h: height }, // 简化，实际应计算位置
                    rotated: false,
                    trimmed: false,
                    spriteSourceSize: { x: leftMargin, y: topMargin, w: width, h: height },
                    sourceSize: { w: fullWidth, h: fullHeight }
                };
            }
        }
        // 生成合并图像 (简化: 水平排列帧)
        let totalWidth = 0;
        let maxHeight = 0;
        frames.forEach(f => {
            totalWidth += f.width;
            maxHeight = Math.max(maxHeight, f.height);
        });
        const combinedImage = Buffer.alloc(totalWidth * maxHeight * 4); // RGBA
        let xOffset = 0;
        frames.forEach((f, i) => {
            // 假设像素数据是调色板索引，转换为RGBA (简化)
            for (let y = 0; y < f.height; y++) {
                for (let x = 0; x < f.width; x++) {
                    const idx = f.data[y * f.width + x];
                    // 简化调色板 (实际应从DEF头部读取)
                    const r = idx, g = idx, b = idx, a = 255;
                    const pos = ((y * totalWidth + xOffset + x) * 4);
                    combinedImage[pos] = r;
                    combinedImage[pos + 1] = g;
                    combinedImage[pos + 2] = b;
                    combinedImage[pos + 3] = a;
                }
            }
            atlas.frames[`${i}`].frame.x = xOffset;
            xOffset += f.width;
        });
        atlas.meta.size.w = totalWidth;
        atlas.meta.size.h = maxHeight;
        // 保存atlas JSON
        fs.writeFileSync(basePath + '.atlas', JSON.stringify(atlas, null, 2));
        // 保存合并PNG
        (0, sharp_1.default)(combinedImage, { raw: { width: totalWidth, height: maxHeight, channels: 4 } })
            .png()
            .toFile(basePath + '.png');
        console.log(`Created atlas: ${basePath}.atlas and ${basePath}.png`);
    }
}
// 主函数
function main() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Usage: npm run extract -- <lodPath> <outputDir>');
        process.exit(1);
    }
    const [lodPath, outputDir] = args;
    const extractor = new LODExtractor(lodPath);
    extractor.extractAll(outputDir);
    console.log('Extraction complete!');
}
if (require.main === module) {
    main();
}
