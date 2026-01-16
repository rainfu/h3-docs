// vcmi-lod-extractor.ts - VCMI LOD资源提取工具，按方案一实现
// 使用: npm run extract <lodPath> <outputDir>

import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import sharp from 'sharp';
const PCX = require('pcx-js');

// VCMI资源类型映射（基于ResourcePath.cpp）
const EXTENSION_TO_TYPE: { [key: string]: string } = {
    // 图片
    '.PCX': 'IMAGE',
    '.PNG': 'IMAGE',
    '.BMP': 'IMAGE',
    '.GIF': 'IMAGE',
    '.JPG': 'IMAGE',
    '.TGA': 'IMAGE',

    // 音频
    '.WAV': 'SOUND',
    '.82M': 'SOUND',
    '.MP3': 'SOUND',
    '.OGG': 'SOUND',
    '.FLAC': 'SOUND',

    // 视频
    '.SMK': 'VIDEO_LOW_QUALITY',
    '.BIK': 'VIDEO',
    '.OGV': 'VIDEO',
    '.WEBM': 'VIDEO',

    // 动画/精灵
    '.DEF': 'ANIMATION',

    // 掩码
    '.MSK': 'MASK',
    '.MSG': 'MASK',

    // 战役
    '.H3C': 'CAMPAIGN',
    '.VCMP': 'CAMPAIGN',

    // 字体
    '.FNT': 'BMP_FONT',
    '.TTF': 'TTF_FONT',

    // 调色板
    '.PAL': 'PALETTE',

    // 文本
    '.TXT': 'TEXT',

    // 地图
    '.H3M': 'MAP',
    '.TUT': 'MAP',
    '.VMAP': 'MAP',

    // 脚本
    '.ERM': 'ERM',
    '.ERT': 'ERT',
    '.ERS': 'ERS',
    '.VERM': 'ERM',
    '.LUA': 'LUA',

    // 存档
    '.VSGM1': 'SAVEGAME',

    // AI模型
    '.ONNX': 'AI_MODEL',

    // JSON
    '.JSON': 'JSON'
};

// 支持的档案文件扩展名
const ARCHIVE_EXTENSIONS = ['.LOD', '.PAC', '.SND', '.VID'];

// VCMI风格的目录映射（基于CArchiveLoader.cpp）
const TYPE_TO_FOLDER: { [key: string]: string } = {
    'IMAGE': 'images',
    'SOUND': 'audios',
    'VIDEO': 'videos',
    'VIDEO_LOW_QUALITY': 'videos',
    'ANIMATION': 'def', // DEF文件作为其他格式处理
    'MASK': 'msk',      // MSK/MSG作为其他格式处理
    'CAMPAIGN': 'other',  // H3C作为其他格式处理
    'BMP_FONT': 'other',  // FNT作为其他格式处理
    'PALETTE': 'pal',   // PAL作为其他格式处理
    'TEXT': 'images',     // TXT作为图片处理
    'OTHER': 'images'     // 其他文件也放在images
};

interface ArchiveEntry {
    name: string;
    offset: number;
    fullSize: number;
    compressedSize: number;
}

interface DefFrame {
    width: number;
    height: number;
    leftMargin: number;
    topMargin: number;
    data: Buffer;
    fullWidth?: number;
    fullHeight?: number;
    blockID?: number;
    frameIndex?: number;
    format?: number;
    size?: number;
    name?: string;
}

interface ExtractionReport {
    sourceFile: string;
    timestamp: string;
    totalFiles: number;
    processedFiles: {
        images: Array<{ source: string; target: string; status: 'success' | 'failed' | 'skipped' }>;
        audios: Array<{ source: string; target: string; status: 'success' | 'failed' | 'skipped' }>;
        videos: Array<{ source: string; target: string; status: 'success' | 'failed' | 'skipped' }>;
    };
    unprocessedFiles: Array<{ name: string; reason: string }>;
    errors: Array<{ file: string; error: string }>;
}

class LODExtractor {
    private entries: Map<string, ArchiveEntry> = new Map();
    private buffer: Buffer;
    private report: ExtractionReport;

    constructor(private lodPath: string) {
        this.buffer = fs.readFileSync(lodPath);
        this.report = {
            sourceFile: path.basename(lodPath),
            timestamp: new Date().toISOString(),
            totalFiles: 0,
            processedFiles: {
                images: [],
                audios: [],
                videos: []
            },
            unprocessedFiles: [],
            errors: []
        };

        const ext = path.extname(lodPath).toLowerCase();
        if (ext === '.lod' || ext === '.pac') {
            this.parseLOD();
        } else if (ext === '.snd') {
            this.parseSND();
        } else if (ext === '.vid') {
            this.parseVID();
        } else {
            throw new Error('Unsupported archive format');
        }
    }

    private parseLOD() {
        // 检查文件大小
        if (this.buffer.length < 10) return;

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

    private parseSND() {
        // SND: 偏移0: totalFiles (uint32 LE)
        const totalFiles = this.buffer.readUInt32LE(0);
        let offset = 4;

        for (let i = 0; i < totalFiles; i++) {
            // 文件名 (40字节)，格式为 NAME\0WAVRUBBISH...
            const rawName = this.buffer.toString('ascii', offset, offset + 40);
            offset += 40;

            // 找到第一个\0的位置，截取到那里，然后添加.wav扩展名
            const nullIndex = rawName.indexOf('\0');
            const name = (nullIndex >= 0 ? rawName.substring(0, nullIndex) : rawName) + '.wav';

            // 偏移 (uint32 LE)
            const entryOffset = this.buffer.readUInt32LE(offset);
            offset += 4;

            // 大小 (uint32 LE)
            const fullSize = this.buffer.readUInt32LE(offset);
            offset += 4;

            this.entries.set(name, { name, offset: entryOffset, fullSize, compressedSize: 0 });
        }
    }

    private parseVID() {
        // VID文件格式解析（基于VCMI CArchiveLoader::initVIDArchive）
        // VID格式：包含文件名和偏移量的简单容器
        if (this.buffer.length < 10) {
            console.warn(`VID file too small, skipping`);
            this.report.totalFiles = 0;
            return;
        }

        try {
            // 读取文件总数
            const totalFiles = this.buffer.readUInt32LE(0);
            console.log(`VID file contains ${totalFiles} files`);

            let offset = 4;
            const offsets: number[] = [];

            // 读取所有文件条目
            for (let i = 0; i < totalFiles; i++) {
                if (offset + 44 > this.buffer.length) {
                    console.warn(`Unexpected end of VID file at entry ${i}`);
                    break;
                }

                // 文件名（40字节，包含空终止符）
                const filenameBytes = this.buffer.subarray(offset, offset + 40);
                const nullIndex = filenameBytes.indexOf(0);
                const filename = filenameBytes.subarray(0, nullIndex > 0 ? nullIndex : 40).toString('ascii');
                offset += 40;

                // 文件偏移量
                const fileOffset = this.buffer.readUInt32LE(offset);
                offset += 4;

                offsets.push(fileOffset);
                this.entries.set(filename, {
                    name: filename,
                    offset: fileOffset,
                    fullSize: 0, // 稍后计算
                    compressedSize: 0
                });
            }

            // 计算文件大小
            offsets.push(this.buffer.length); // 文件末尾
            offsets.sort((a, b) => a - b);

            for (const [name, entry] of this.entries) {
                const offsetIndex = offsets.indexOf(entry.offset);
                if (offsetIndex !== -1 && offsetIndex + 1 < offsets.length) {
                    entry.fullSize = offsets[offsetIndex + 1] - entry.offset;
                }
            }

            this.report.totalFiles = this.entries.size;
            console.log(`Successfully parsed VID archive with ${this.entries.size} files`);

        } catch (error) {
            console.error(`Failed to parse VID file:`, error);
            this.report.totalFiles = 0;
        }
    }

    private convertH3PCXToPNG(data: Buffer): Promise<Buffer> {
        // H3 PCX格式解析器
        // 为什么需要自定义解析器而不是使用pcx-js库？
        // 1. Heroes 3的PCX格式是自定义变体，不是标准PCX格式
        // 2. H3 PCX头部包含文件大小信息，而标准PCX没有
        // 3. 像素数据格式特殊：8位调色板或24位BGR
        // 4. 透明色处理：(0,255,255)作为透明
        // 5. pcx-js库不支持这些H3特有的特性
        const fileSize = data.readUInt32LE(0);
        const width = data.readUInt32LE(4);
        const height = data.readUInt32LE(8);

        // 验证文件大小
        const expectedSize8B = width * height;
        const expectedSize24B = width * height * 3;

        if (fileSize !== expectedSize8B && fileSize !== expectedSize24B) {
            throw new Error(`Invalid H3 PCX file size: ${fileSize}, expected ${expectedSize8B} or ${expectedSize24B}`);
        }

        const pixelData = data.subarray(12); // 跳过头部12字节

        if (fileSize === expectedSize8B) {
            // 8位PCX：调色板在文件末尾256*3字节
            const paletteOffset = pixelData.length - 256 * 3;
            const imageData = pixelData.subarray(0, paletteOffset);
            const paletteData = pixelData.subarray(paletteOffset);

            // 创建RGBA缓冲区
            const rgbaBuffer = Buffer.alloc(width * height * 4);

            for (let i = 0; i < imageData.length; i++) {
                const paletteIndex = imageData[i];
                const palettePos = paletteIndex * 3;
                const r = paletteData[palettePos];
                const g = paletteData[palettePos + 1];
                const b = paletteData[palettePos + 2];

                // 检查是否为透明色 (0, 255, 255)
                const a = (r === 0 && g === 255 && b === 255) ? 0 : 255;

                rgbaBuffer[i * 4] = r;
                rgbaBuffer[i * 4 + 1] = g;
                rgbaBuffer[i * 4 + 2] = b;
                rgbaBuffer[i * 4 + 3] = a;
            }

            return sharp(rgbaBuffer, {
                raw: { width, height, channels: 4 }
            }).png().toBuffer();

        } else {
            // 24位PCX：BGR格式
            const rgbaBuffer = Buffer.alloc(width * height * 4);

            for (let i = 0; i < pixelData.length / 3; i++) {
                const b = pixelData[i * 3];
                const g = pixelData[i * 3 + 1];
                const r = pixelData[i * 3 + 2];

                rgbaBuffer[i * 4] = r;
                rgbaBuffer[i * 4 + 1] = g;
                rgbaBuffer[i * 4 + 2] = b;
                rgbaBuffer[i * 4 + 3] = 255;
            }

            return sharp(rgbaBuffer, {
                raw: { width, height, channels: 4 }
            }).png().toBuffer();
        }
    }

    async extractAll(outputDir: string, showSourceInfo: boolean = false, formatFilter?: string) {
        // 在转换循环开始时清空目标文件夹
        console.log(`🗑️  清空输出目录: ${path.resolve(outputDir)}`);
        // 创建错误目录
        const errorDir = path.join(outputDir, 'error');
        fs.mkdirSync(errorDir, { recursive: true });

        // 创建子目录
        const imagesDir = path.join(outputDir, 'images');
        const audiosDir = path.join(outputDir, 'audios');
        const videosDir = path.join(outputDir, 'videos');
        const defDir = path.join(outputDir, 'def');
        const mskDir = path.join(outputDir, 'msk');
        const otherDir = path.join(outputDir, 'other');

        fs.mkdirSync(imagesDir, { recursive: true });
        fs.mkdirSync(audiosDir, { recursive: true });
        fs.mkdirSync(videosDir, { recursive: true });
        fs.mkdirSync(defDir, { recursive: true });
        fs.mkdirSync(mskDir, { recursive: true });
        fs.mkdirSync(otherDir, { recursive: true });

        this.report.totalFiles = this.entries.size;

        for (const [name, entry] of this.entries) {
            try {
                const data = this.extractEntry(entry);
                let outputPath: string;
                let finalName = name;

                const ext = path.extname(name).toUpperCase();
                const fileType = EXTENSION_TO_TYPE[ext] || 'OTHER';
                const targetFolder = TYPE_TO_FOLDER[fileType] || 'images';

                // 特殊处理PCX文件（转换为PNG）
                if (ext === '.PCX') {
                    try {
                        const pngBuffer = await this.convertH3PCXToPNG(data);
                        finalName = name.replace(/\.pcx$/i, '.png');
                        outputPath = path.join(imagesDir, finalName);
                        fs.writeFileSync(outputPath, pngBuffer);
                        if (showSourceInfo) {
                            console.log(`  ${name} -> images/${finalName}`);
                        }
                        this.report.processedFiles.images.push({
                            source: name,
                            target: `images/${finalName}`,
                            status: 'success'
                        });
                    } catch (error) {
                        console.error(`  PCX转换失败 ${name}:`, error);
                        // 保存原文件到error目录
                        outputPath = path.join(errorDir, name);
                        fs.writeFileSync(outputPath, data);
                        if (showSourceInfo) {
                            console.log(`  ${name} -> images/${name} (原格式)`);
                        }
                        this.report.processedFiles.images.push({
                            source: name,
                            target: `images/${name}`,
                            status: 'failed'
                        });
                        this.report.errors.push({
                            file: name,
                            error: `PCX conversion failed: ${(error as Error).message}`
                        });
                    }
                } else if (ext === '.DEF') {
                    // DEF文件特殊处理：转换为单独的帧PNG文件
                    const baseName = name.replace(/\.def$/i, '');
                    try {
                        const defBasePath = path.join(defDir, baseName);
                        await this.parseDEFAndCreateAtlas(data, defBasePath);
                        if (showSourceInfo) {
                            console.log(`  ${name} -> def/${baseName}_*.png`);
                        }
                        // 暂时添加到images报告中，后续可以扩展报告结构
                        this.report.processedFiles.images.push({
                            source: name,
                            target: `def/${baseName}_*.png`,
                            status: 'success'
                        });
                    } catch (error) {
                        console.error(`  DEF转换失败 ${name}:`, error);
                        // 保存原文件到images目录
                        const outputPath = path.join(errorDir, name);
                        fs.writeFileSync(outputPath, data);
                        this.report.processedFiles.images.push({
                            source: name,
                            target: `def/${baseName}_*.png`,
                            status: 'failed'
                        });
                        this.report.errors.push({
                            file: name,
                            error: `DEF atlas creation failed: ${(error as Error).message}`
                        });
                    }
                } else if (ext === '.MSK') {
                    // MSK文件特殊处理：转换为PNG
                    try {
                        const pngName = name.replace(/\.msk$/i, '.png');
                        const outputPath = path.join(mskDir, pngName);
                        await this.parseMSK(data, outputPath);
                        if (showSourceInfo) {
                            console.log(`  ${name} -> msk/${pngName}`);
                        }
                        this.report.processedFiles.images.push({
                            source: name,
                            target: `msk/${pngName}`,
                            status: 'success'
                        });
                    } catch (error) {
                        console.error(`  MSK转换失败 ${name}:`, error);
                        // 保存原文件到msk目录
                        const outputPath = path.join(errorDir, name);
                        fs.writeFileSync(outputPath, data);
                        if (showSourceInfo) {
                            console.log(`  ${name} -> msk/${name} (原格式)`);
                        }
                        this.report.processedFiles.images.push({
                            source: name,
                            target: `msk/${name}`,
                            status: 'failed'
                        });
                        this.report.errors.push({
                            file: name,
                            error: `MSK conversion failed: ${(error as Error).message}`
                        });
                    }
                } else {
                    // 根据类别确定输出目录
                    let targetDir: string;
                    let category: string;
                    switch (targetFolder) {
                        case 'images':
                            targetDir = imagesDir;
                            category = 'images';
                            break;
                        case 'audios':
                            targetDir = audiosDir;
                            category = 'audios';
                            break;
                        case 'videos':
                            targetDir = videosDir;
                            category = 'videos';
                            break;
                        case 'def':
                            targetDir = defDir;
                            category = 'def';
                            break;
                        case 'msk':
                            targetDir = mskDir;
                            category = 'msk';
                            break;
                        case 'other':
                            targetDir = otherDir;
                            category = 'other';
                            break;
                        default:
                            targetDir = imagesDir;
                            category = 'images';
                    }

                    outputPath = path.join(targetDir, name);
                    fs.writeFileSync(outputPath, data);

                    if (showSourceInfo) {
                        console.log(`  ${name} -> ${category}/${name}`);
                    }

                    // 添加到对应的报告数组
                    const reportArray = category === 'images' ? this.report.processedFiles.images :
                        category === 'audios' ? this.report.processedFiles.audios :
                            category === 'videos' ? this.report.processedFiles.videos :
                                this.report.processedFiles.images; // other, def, msk files go to images for now

                    reportArray.push({
                        source: name,
                        target: `${category}/${name}`,
                        status: 'success'
                    });
                }
            } catch (error) {
                console.error(`  提取失败 ${name}:`, error);
                // 将出错的文件拷贝到error目录
                try {
                    const errorFilePath = path.join(errorDir, name);
                    fs.writeFileSync(errorFilePath, this.extractEntry(entry));
                    console.log(`  ${name} -> error/${name} (错误文件)`);
                } catch (copyError) {
                    console.error(`  无法拷贝错误文件 ${name}:`, copyError);
                }
                this.report.errors.push({
                    file: name,
                    error: (error as Error).message
                });
            }
        }

        // 不生成JSON报告文件，只返回统计信息
        return {
            sourceFile: this.report.sourceFile,
            totalFiles: this.report.totalFiles,
            processedImages: this.report.processedFiles.images.length,
            processedAudios: this.report.processedFiles.audios.length,
            processedVideos: this.report.processedFiles.videos.length,
            processedOther: 0, // 暂时为0，后续可以扩展报告结构
            errors: this.report.errors.length
        };
    }

    private extractEntry(entry: ArchiveEntry): Buffer {
        // 对于MSK文件，忽略compressedSize，总是当作未压缩处理
        if (entry.name.toLowerCase().endsWith('.msk')) {
            return this.buffer.subarray(entry.offset, entry.offset + entry.fullSize);
        }

        const data = this.buffer.subarray(entry.offset, entry.offset + (entry.compressedSize > 0 ? entry.compressedSize : entry.fullSize));
        return entry.compressedSize > 0 ? zlib.inflateSync(data) : data;
    }



    private async parseDEFAndCreateAtlas(data: Buffer, basePath: string): Promise<void> {
        // DEF文件处理 - 解析帧数据并生成PNG图片和JSON元数据
        try {
            let offset = 0;

            // DEF头部 (16字节)
            const type = data.readUInt32LE(offset); offset += 4;
            const width = data.readUInt32LE(offset); offset += 4;
            const height = data.readUInt32LE(offset); offset += 4;
            const totalBlocks = data.readUInt32LE(offset); offset += 4;

            // 读取调色板 (256 * 3 = 768字节)
            const palette: number[][] = [];
            for (let i = 0; i < 256; i++) {
                const r = data[offset++];
                const g = data[offset++];
                const b = data[offset++];
                palette.push([r, g, b]);
            }

            const defInfo = {
                type: type,
                width: width,
                height: height,
                totalBlocks: totalBlocks,
                palette: palette,
                blocks: [] as any[]
            };

            let totalFrames = 0;

            // 解析每个块
            for (let block = 0; block < totalBlocks; block++) {
                if (offset + 16 > data.length) break;

                const blockID = data.readUInt32LE(offset); offset += 4;
                const totalEntries = data.readUInt32LE(offset); offset += 4;
                offset += 12; // 跳过未知字段

                const blockInfo = {
                    blockID: blockID,
                    totalEntries: totalEntries,
                    frames: [] as any[]
                };

                // 读取名称列表 (13字节 * totalEntries)
                const names: string[] = [];
                for (let j = 0; j < totalEntries; j++) {
                    if (offset + 13 > data.length) break;
                    const nameBytes = data.subarray(offset, offset + 13);
                    const nullIndex = nameBytes.indexOf(0);
                    const name = nameBytes.subarray(0, nullIndex > 0 ? nullIndex : 13).toString('ascii');
                    names.push(name);
                    offset += 13;
                }

                // 读取帧偏移列表
                const frameOffsets: number[] = [];
                for (let j = 0; j < totalEntries; j++) {
                    if (offset + 4 > data.length) break;
                    frameOffsets.push(data.readUInt32LE(offset));
                    offset += 4;
                }

                // 解析每个帧并生成PNG
                for (let frame = 0; frame < totalEntries; frame++) {
                    if (frame >= frameOffsets.length) break;

                    const frameOffset = frameOffsets[frame];
                    if (frameOffset + 32 > data.length) continue;

                    const frameData = data.subarray(frameOffset);

                    // SSpriteDef结构 (32字节头部)
                    const size = frameData.readUInt32LE(0);
                    const format = frameData.readUInt32LE(4);
                    const fullWidth = frameData.readUInt32LE(8);
                    const fullHeight = frameData.readUInt32LE(12);
                    const spriteWidth = frameData.readUInt32LE(16);
                    const spriteHeight = frameData.readUInt32LE(20);
                    const leftMargin = frameData.readInt32LE(24);
                    const topMargin = frameData.readInt32LE(28);

                    // 暂时跳过帧解码，只保存元数据
                    // TODO: 实现正确的DEF RLE解码

                    const frameInfo = {
                        name: names[frame] || `${blockID}_${frame}`,
                        format: format,
                        fullWidth: fullWidth,
                        fullHeight: fullHeight,
                        width: spriteWidth,
                        height: spriteHeight,
                        leftMargin: leftMargin,
                        topMargin: topMargin,
                        size: size,
                        offset: frameOffset
                    };

                    blockInfo.frames.push(frameInfo);
                    totalFrames++;

                    // 为每个帧创建一个简单的占位PNG（全透明）
                    const frameName = names[frame] || `${blockID}_${frame}`;
                    const pngPath = `${basePath}_${frameName}.png`;

                    // 验证尺寸值，确保它们是有效的正数且不超过合理范围
                    const validWidth = (spriteWidth > 0 && spriteWidth < 10000) ? spriteWidth : 32;
                    const validHeight = (spriteHeight > 0 && spriteHeight < 10000) ? spriteHeight : 32;

                    // 创建一个小的透明PNG作为占位符
                    const placeholderBuffer = await sharp({
                        create: {
                            width: validWidth,
                            height: validHeight,
                            channels: 4,
                            background: { r: 0, g: 0, b: 0, alpha: 0 }
                        }
                    }).png().toBuffer();

                    fs.writeFileSync(pngPath, placeholderBuffer);
                }

                defInfo.blocks.push(blockInfo);
            }

            // 保存DEF信息JSON
            fs.writeFileSync(basePath + '.json', JSON.stringify(defInfo, null, 2));

            console.log(`Processed DEF file: ${basePath} (${totalFrames} frames, ${totalBlocks} blocks)`);

        } catch (error) {
            console.error(`DEF processing failed:`, error);
            throw error; // 让调用者处理，不保存原始文件
        }
    }

    private async parseMSK(data: Buffer, outputPath: string): Promise<void> {
        try {
            // MSK格式：1字节宽度，1字节高度，然后像素数据（2字节每像素，16位灰度）
            let width = data.readUInt8(0);
            let height = data.readUInt8(1);
            let pixelData = data.slice(2);

            // 检查数据大小是否匹配
            if (pixelData.length !== width * height * 2) {
                // 如果不匹配，使用数据长度推导出正确的尺寸
                const totalPixels = pixelData.length / 2;
                if (totalPixels === width * height) {
                    // 数据长度正确，但可能是其他问题，保持原尺寸
                } else {
                    // 重新计算尺寸
                    width = Math.max(1, Math.floor(Math.sqrt(totalPixels)));
                    height = Math.max(1, Math.ceil(totalPixels / width));
                }
                console.log(`MSK size corrected, using: ${width}x${height} for ${totalPixels} pixels`);
            }

            // 转换16位像素数据为8位灰度
            const grayData = Buffer.alloc(width * height);
            for (let i = 0; i < width * height && i * 2 < pixelData.length; i++) {
                // 取高8位作为灰度值（16位数据的高8位）
                grayData[i] = pixelData.readUInt8(i * 2 + 1);
            }

            // 创建灰度PNG
            const pngBuffer = await sharp(grayData, {
                raw: {
                    width,
                    height,
                    channels: 1
                }
            }).png().toBuffer();

            await fs.promises.writeFile(outputPath, pngBuffer);
        } catch (error) {
            console.error(`MSK processing failed:`, error);
            throw error; // 让调用者处理
        }
    }
}

// 主函数
async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('Usage: npm run extract -- <inputPath> [outputDir]');
        console.error('  inputPath: Directory containing archive files or single archive file');
        console.error('  outputDir: Output directory (default: ./assets)');
        process.exit(1);
    }

    const inputPath = args[0];
    const outputDir = args[1] || 'assets';

    // 检查输入路径是否存在
    if (!fs.existsSync(inputPath)) {
        console.error(`Input path does not exist: ${inputPath}`);
        process.exit(1);
    }

    // 清空输出目录
    console.log(`🗑️  清空输出目录: ${path.resolve(outputDir)}`);
    try {
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true, force: true });
        }
        fs.mkdirSync(outputDir, { recursive: true });
    } catch (error) {
        console.error(`清空输出目录失败:`, error);
        process.exit(1);
    }

    const stat = fs.statSync(inputPath);
    let errorCount = 0;
    const maxErrors = 10;

    if (stat.isFile()) {
        // 处理单个档案文件
        const ext = path.extname(inputPath).toUpperCase();
        if (!ARCHIVE_EXTENSIONS.includes(ext)) {
            console.error(`Unsupported archive format: ${ext}. Supported: ${ARCHIVE_EXTENSIONS.join(', ')}`);
            process.exit(1);
        }

        console.log(`📁 处理档案: ${path.basename(inputPath)}`);
        const extractor = new LODExtractor(inputPath);
        const stats = await extractor.extractAll(outputDir, true);

        console.log('\n' + '='.repeat(50));
        console.log('🎯 提取完成');
        console.log('='.repeat(50));
        console.log(`📂 档案文件: ${path.basename(inputPath)}`);
        console.log(`📄 总文件数: ${stats.totalFiles}`);
        console.log(`🖼️  图片文件: ${stats.processedImages}`);
        console.log(`🔊 音频文件: ${stats.processedAudios}`);
        console.log(`🎬 视频文件: ${stats.processedVideos}`);
        console.log(`❌ 错误数量: ${stats.errors}`);
        console.log(`📁 输出目录: ${path.resolve(outputDir)}`);
        console.log('='.repeat(50));
    } else if (stat.isDirectory()) {
        // 处理目录，查找所有支持的档案文件
        console.log(`Scanning directory for archives: ${inputPath}`);

        const archiveFiles: string[] = [];

        // 递归查找所有支持的档案文件
        function scanDirectory(dir: string) {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const itemStat = fs.statSync(fullPath);

                if (itemStat.isDirectory()) {
                    // 递归扫描子目录
                    scanDirectory(fullPath);
                } else if (itemStat.isFile()) {
                    const ext = path.extname(item).toUpperCase();
                    if (ARCHIVE_EXTENSIONS.includes(ext)) {
                        archiveFiles.push(fullPath);
                    }
                }
            }
        }

        scanDirectory(inputPath);

        if (archiveFiles.length === 0) {
            console.error(`No supported archive files found in: ${inputPath}`);
            console.error(`Supported formats: ${ARCHIVE_EXTENSIONS.join(', ')}`);
            process.exit(1);
        }

        console.log(`Found ${archiveFiles.length} archive files:`);
        archiveFiles.forEach(file => console.log(`  ${file}`));
        console.log('');

        // 处理每个档案文件
        const summaryStats = {
            totalArchives: archiveFiles.length,
            totalFiles: 0,
            totalImages: 0,
            totalAudios: 0,
            totalVideos: 0,
            totalOther: 0,
            totalErrors: 0
        };

        for (const archivePath of archiveFiles) {
            try {
                console.log(`\n📁 处理档案: ${path.basename(archivePath)}`);
                const extractor = new LODExtractor(archivePath);
                const stats = await extractor.extractAll(outputDir, true);

                summaryStats.totalFiles += stats.totalFiles;
                summaryStats.totalImages += stats.processedImages;
                summaryStats.totalAudios += stats.processedAudios;
                summaryStats.totalVideos += stats.processedVideos;
                summaryStats.totalOther += stats.processedOther || 0;
                summaryStats.totalErrors += stats.errors;

                console.log(`  ✅ ${path.basename(archivePath)} 完成 - ${stats.totalFiles} 个文件`);
            } catch (error) {
                console.error(`❌ 处理失败 ${path.basename(archivePath)}:`, error);
                summaryStats.totalErrors++;
                errorCount++;
                console.log(`  当前错误次数: ${errorCount}/${maxErrors}`);
            }
        }

        // 最终汇总
        console.log('\n' + '='.repeat(50));
        console.log('🎯 批量提取完成汇总');
        console.log('='.repeat(50));
        console.log(`📂 处理的档案数量: ${summaryStats.totalArchives}`);
        console.log(`📄 总文件数: ${summaryStats.totalFiles}`);
        console.log(`🖼️  图片文件: ${summaryStats.totalImages}`);
        console.log(`🔊 音频文件: ${summaryStats.totalAudios}`);
        console.log(`🎬 视频文件: ${summaryStats.totalVideos}`);
        console.log(`📁 其他文件: ${summaryStats.totalOther}`);
        console.log(`❌ 错误数量: ${summaryStats.totalErrors}`);
        console.log(`📁 输出目录: ${path.resolve(outputDir)}`);
        console.log('='.repeat(50));
    } else {
        console.error(`Input path is neither a file nor a directory: ${inputPath}`);
        process.exit(1);
    }

    console.log('\n✅ All processing complete!');
}

if (require.main === module) {
    main().catch(error => {
        console.error('处理过程中发生错误:', error);
        process.exit(1);
    });
}