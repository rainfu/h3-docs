import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'sk-a72df16405994a72ad28bb76a51626a0' });

// ----------------------------
// 配置
// ----------------------------
const CPP_LIB_DIR = "../vcmi/lib/logging";
const CPP_INCLUDE_DIR = "/heroes3/include/vcmi";
const TS_TARGET_DIR = "./heroes3-ts/lib";
const IGNORE_METHODS = ["networkConnect", "sendPacket", "modRegister"];

// ----------------------------
// 扫描 C++ 文件
// ----------------------------
function scanCppFiles(dir) {
    const files = [];
    function walk(d) {
        fs.readdirSync(d, { withFileTypes: true }).forEach((f) => {
            const fullPath = path.join(d, f.name);
            if (f.isDirectory()) walk(fullPath);
            else if (f.name.endsWith(".cpp") || f.name.endsWith(".h") || f.name.endsWith(".hpp"))
                files.push(fullPath);
        });
    }
    walk(dir);
    return files;
}

// ----------------------------
// 合并 h + cpp
// ----------------------------
function mergeHeaderAndSource(filePath) {
    const dir = path.dirname(filePath);
    const baseName = path.basename(filePath, path.extname(filePath));
    const hFile = path.join(dir, `${baseName}.h`);
    const cppFile = path.join(dir, `${baseName}.cpp`);
    let merged = "";

    if (fs.existsSync(hFile)) merged += fs.readFileSync(hFile, "utf-8") + "\n";
    if (fs.existsSync(cppFile)) merged += fs.readFileSync(cppFile, "utf-8") + "\n";

    return merged;
}

// ----------------------------
// 提取类块（按类划分功能块）
// ----------------------------
function extractClassBlocks(cppContent) {
    const classRegex = /class\s+(\w+)[^{]*{([\s\S]*?)};/g;
    const blocks = [];
    let match;
    while ((match = classRegex.exec(cppContent)) !== null) {
        blocks.push({ className: match[1], content: match[0] });
    }
    return blocks;
}

// ----------------------------
// 生成接口 I<Class>.ts
// ----------------------------
function generateInterface(filePath, className) {
    const interfaceName = `I${className}`;
    const tsDir = path.dirname(filePath.replace(CPP_LIB_DIR, TS_TARGET_DIR));
    fs.mkdirSync(tsDir, { recursive: true });

    const interfaceFile = path.join(tsDir, `${interfaceName}.ts`);
    const interfaceContent = `// 自动生成接口占位
export interface ${interfaceName} {
    // TODO: 方法、属性占位
}
`;
    fs.writeFileSync(interfaceFile, interfaceContent, "utf-8");
    console.log(`[接口生成] ${interfaceFile}`);
}

// ----------------------------
// 生成 AI prompt
// ----------------------------
function generatePrompt(classBlock) {
    return `
你是资深 C++ -> TypeScript 转换工程师。
任务：
1️⃣ 将以下 C++ 类完整转换为 TS，保持**所有方法逻辑一致**。
2️⃣ 忽略网络/联机/Mod 方法（${IGNORE_METHODS.join(", ")}）。
3️⃣ 自动生成依赖 import（相对路径）。
4️⃣ 忽略命名空间。
C++ 类：
\`\`\`cpp
${classBlock.content}
\`\`\`
`;
}

// ----------------------------
// AI 流式转换（每个类块）
// ----------------------------
async function aiConvertClassBlock(filePath, classBlock) {
    const prompt = generatePrompt(classBlock);

    const tsChunks = [];
    const response = await openai.chat.completions.create({
        model: "deep-coder",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
        stream: true,
    });

    response.on("data", (data) => {
        tsChunks.push(data.toString());
    });

    await new Promise((resolve) => response.on("end", resolve));

    let tsContent = tsChunks.join("");

    // 替换 include -> import 相对路径
    const fileDir = path.dirname(filePath.replace(CPP_LIB_DIR, TS_TARGET_DIR));
    tsContent = tsContent.replace(/#include\s+["<](.+)[">]/g, (match, incPath) => {
        let absPath = path.resolve(CPP_LIB_DIR, incPath);
        if (!fs.existsSync(absPath)) absPath = path.resolve(CPP_INCLUDE_DIR, incPath);
        let relPath = path.relative(fileDir, absPath).replace(/\\/g, "/").replace(/\.(h|hpp)$/, "");
        if (!relPath.startsWith(".")) relPath = "./" + relPath;
        return `import "${relPath}";`;
    });

    return tsContent;
}

// ----------------------------
// 单文件迁移
// ----------------------------
async function migrateFile(filePath) {
    const mergedContent = mergeHeaderAndSource(filePath);
    console.log(`[处理] ${filePath}`);
    console.log('mergedContent:', mergedContent.substring(0, 200)); // 输出前200字符以检查内容
    const classBlocks = extractClassBlocks(mergedContent);
    console.log('classBlocks:', classBlocks.substring(0, 200)); // 输出前200字符以检查内容

    const tsDir = path.dirname(filePath.replace(CPP_LIB_DIR, TS_TARGET_DIR));
    fs.mkdirSync(tsDir, { recursive: true });

    let tsFileContent = "";

    for (const classBlock of classBlocks) {
        generateInterface(filePath, classBlock.className);
        const tsClass = await aiConvertClassBlock(filePath, classBlock);
        tsFileContent += tsClass + "\n";
    }

    const relativePath = path.relative(CPP_LIB_DIR, filePath).replace(/\.(cpp|h|hpp)$/, ".ts");
    const tsPath = path.join(TS_TARGET_DIR, relativePath);
    fs.writeFileSync(tsPath, tsFileContent, "utf-8");
    console.log(`[TS生成] ${tsPath}`);
}

// ----------------------------
// 批量迁移
// ----------------------------
async function migrateProject() {
    const cppFiles = scanCppFiles(CPP_LIB_DIR);

    for (const file of cppFiles) {
        try {
            await migrateFile(file);
        } catch (err) {
            console.error(`[错误] ${file} 转换失败`, err);
            return
        }
    }
}

// ----------------------------
// 执行
// ----------------------------
migrateProject();
