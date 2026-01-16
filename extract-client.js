#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 客户端相关的目录
const CLIENT_DIRS = [
    'client',
    'clientapp',
    'vcmiqt'
];

// 需要包含的共享库目录（客户端会使用的部分）
const SHARED_DIRS = [
    'lib/battle',
    'lib/bonuses',
    'lib/callback',
    'lib/constants',
    'lib/entities',
    'lib/events',
    'lib/filesystem',
    'lib/gameState',
    'lib/json',
    'lib/logging',
    'lib/mapObjects',
    'lib/modding',
    'lib/network',
    'lib/networkPacks',
    'lib/pathfinder',
    'lib/rmg',
    'lib/serializer',
    'lib/spells',
    'lib/texts',
    'lib/vstd'
];

// 需要排除的文件或目录
const EXCLUDE_PATTERNS = [
    '**/CMakeFiles/**',
    '**/*.o',
    '**/*.a',
    '**/*.so',
    '**/*.dll',
    '**/*.exe',
    '**/*.cmake',
    '**/cmake-build-*/**',
    '**/.git/**',
    '**/node_modules/**'
];

interface ExtractStats {
    totalFiles: number;
    cppFiles: number;
    headerFiles: number;
    otherFiles: number;
    copiedFiles: number;
    skippedFiles: number;
}

class ClientExtractor {
    private sourceRoot: string;
    private targetRoot: string;
    private stats: ExtractStats;

    constructor(sourceRoot: string, targetRoot: string) {
        this.sourceRoot = path.resolve(sourceRoot);
        this.targetRoot = path.resolve(targetRoot);
        this.stats = {
            totalFiles: 0,
            cppFiles: 0,
            headerFiles: 0,
            otherFiles: 0,
            copiedFiles: 0,
            skippedFiles: 0
        };
    }

    private shouldExclude(filePath: string): boolean {
        const relativePath = path.relative(this.sourceRoot, filePath);
        return EXCLUDE_PATTERNS.some(pattern => {
            // 简单的模式匹配
            if (pattern.includes('**')) {
                const regexPattern = pattern
                    .replace(/\*\*/g, '.*')
                    .replace(/\*/g, '[^/]*')
                    .replace(/\//g, '\\/');
                return new RegExp(regexPattern).test(relativePath);
            }
            return relativePath.includes(pattern.replace('**/', ''));
        });
    }

    private isClientFile(filePath: string): boolean {
        const relativePath = path.relative(this.sourceRoot, filePath);
        const dir = relativePath.split(path.sep)[0];

        // 检查是否在客户端目录中
        if (CLIENT_DIRS.includes(dir)) {
            return true;
        }

        // 检查是否在共享库的客户端相关目录中
        if (dir === 'lib') {
            const subPath = relativePath.split(path.sep).slice(0, 2).join('/');
            return SHARED_DIRS.includes(subPath);
        }

        return false;
    }

    private async copyFile(sourcePath: string, targetPath: string): Promise<void> {
        const targetDir = path.dirname(targetPath);

        // 确保目标目录存在
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // 复制文件
        fs.copyFileSync(sourcePath, targetPath);
        this.stats.copiedFiles++;
    }

    private async processDirectory(dirPath: string): Promise<void> {
        if (!fs.existsSync(dirPath)) {
            console.warn(`目录不存在: ${dirPath}`);
            return;
        }

        const items = fs.readdirSync(dirPath);

        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // 递归处理子目录
                await this.processDirectory(fullPath);
            } else if (stat.isFile()) {
                this.stats.totalFiles++;

                // 检查是否应该排除
                if (this.shouldExclude(fullPath)) {
                    this.stats.skippedFiles++;
                    continue;
                }

                // 检查是否是客户端相关文件
                if (!this.isClientFile(fullPath)) {
                    this.stats.skippedFiles++;
                    continue;
                }

                const ext = path.extname(fullPath).toLowerCase();
                if (ext === '.cpp') {
                    this.stats.cppFiles++;
                } else if (ext === '.h' || ext === '.hpp') {
                    this.stats.headerFiles++;
                } else {
                    this.stats.otherFiles++;
                }

                // 计算目标路径
                const relativePath = path.relative(this.sourceRoot, fullPath);
                const targetPath = path.join(this.targetRoot, relativePath);

                // 复制文件
                await this.copyFile(fullPath, targetPath);
                console.log(`📄 ${relativePath}`);
            }
        }
    }

    public async extract(): Promise<void> {
        console.log('🚀 开始提取VCMI客户端文件...');
        console.log(`📂 源目录: ${this.sourceRoot}`);
        console.log(`🎯 目标目录: ${this.targetRoot}`);
        console.log('');

        // 清空目标目录
        if (fs.existsSync(this.targetRoot)) {
            console.log('🗑️  清空目标目录...');
            fs.rmSync(this.targetRoot, { recursive: true, force: true });
        }
        fs.mkdirSync(this.targetRoot, { recursive: true });

        // 处理所有客户端相关目录
        const allDirs = [...CLIENT_DIRS.map(dir => path.join(this.sourceRoot, dir))];

        // 添加共享库目录
        SHARED_DIRS.forEach(sharedDir => {
            allDirs.push(path.join(this.sourceRoot, sharedDir));
        });

        console.log('📁 处理目录:');
        for (const dir of allDirs) {
            console.log(`  - ${path.relative(this.sourceRoot, dir)}`);
        }
        console.log('');

        // 处理每个目录
        for (const dir of allDirs) {
            await this.processDirectory(dir);
        }

        // 显示统计信息
        console.log('');
        console.log('='.repeat(50));
        console.log('🎯 提取完成');
        console.log('='.repeat(50));
        console.log(`📂 源目录: ${this.sourceRoot}`);
        console.log(`🎯 目标目录: ${this.targetRoot}`);
        console.log(`📄 总文件数: ${this.stats.totalFiles}`);
        console.log(`🔧 C++文件: ${this.stats.cppFiles}`);
        console.log(`📋 头文件: ${this.stats.headerFiles}`);
        console.log(`📦 其他文件: ${this.stats.otherFiles}`);
        console.log(`✅ 已复制: ${this.stats.copiedFiles}`);
        console.log(`⏭️  已跳过: ${this.stats.skippedFiles}`);
        console.log('='.repeat(50));
    }
}

// 主函数
async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.error('Usage: node extract-client.js <sourceDir> [targetDir]');
        console.error('  sourceDir: VCMI项目根目录 (默认: ../vcmi)');
        console.error('  targetDir: 目标目录 (默认: ./vcmi-client)');
        process.exit(1);
    }

    const sourceDir = args[0] || '../vcmi';
    const targetDir = args[1] || './vcmi-client';

    const extractor = new ClientExtractor(sourceDir, targetDir);

    try {
        await extractor.extract();
        console.log('✅ 客户端文件提取完成！');
    } catch (error) {
        console.error('❌ 提取失败:', error);
        process.exit(1);
    }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { ClientExtractor };