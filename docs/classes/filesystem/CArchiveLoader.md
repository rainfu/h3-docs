<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CArchiveLoader.h -->
# CArchiveLoader类

CArchiveLoader类是VCMI文件系统中用于加载和解析归档文件的类。它支持多种归档格式，包括LOD、SND和VID格式，主要用于处理《英雄无敌3》的原始游戏资源。

## 类定义

```cpp
class DLL_LINKAGE CArchiveLoader : public ISimpleResourceLoader
```

## 概述

CArchiveLoader负责扫描和加载归档文件中的资源。它可以处理压缩和未压缩的文件，支持按需提取到文件系统。特别为《英雄无敌3》的资源格式（LOD、SND、VID）进行了优化。

## ArchiveEntry结构体

### 定义
```cpp
struct ArchiveEntry
```

### 字段
- `std::string name`: 条目名称
- `int offset`: 从归档文件开始的字节偏移量
- `int fullSize`: 未压缩时的完整大小（字节）
- `int compressedSize`: 压缩后的大小（字节），0表示未压缩

## 构造函数

- `CArchiveLoader(std::string mountPoint, boost::filesystem::path archive, bool extractArchives = false)`: 构造归档加载器

### 参数说明
- `mountPoint`: 挂载点路径
- `archive`: 归档文件路径
- `extractArchives`: 是否将原始H3归档提取到单独文件夹

### 支持的归档格式
根据文件扩展名确定归档类型：
- `.LOD`: LOD格式归档
- `.SND`: 声音格式归档
- `.VID`: 视频格式归档

## 主要方法

### 资源加载
- `std::unique_ptr<CInputStream> load(const ResourcePath & resourceName) const`: 加载归档中的资源
- `bool existsResource(const ResourcePath & resourceName) const`: 检查资源是否存在

### 信息查询
- `std::string getMountPoint() const`: 获取挂载点
- `const std::unordered_map<ResourcePath, ArchiveEntry> & getEntries() const`: 获取所有条目
- `std::unordered_set<ResourcePath> getFilteredFiles(std::function<bool(const ResourcePath &)> filter) const`: 获取过滤后的文件
- `std::string getFullFileURI(const ResourcePath& resourceName) const`: 获取完整文件URI
- `std::time_t getLastWriteTime(const ResourcePath& resourceName) const`: 获取最后写入时间

### 提取功能
- `void extractToFolder(const std::string & outputSubFolder, CInputStream & fileStream, const ArchiveEntry & entry, bool absolute = false) const`: 提取单个条目到文件夹（用于视频和声音）
- `void extractToFolder(const std::string & outputSubFolder, const std::string & mountPoint, ArchiveEntry entry, bool absolute = false) const`: 提取单个条目到文件夹（用于图像、精灵等）

## 私有初始化方法

### 归档格式处理
- `void initLODArchive(const std::string &mountPoint, CFileInputStream & fileStream)`: 初始化LOD归档
- `void initVIDArchive(const std::string &mountPoint, CFileInputStream & fileStream)`: 初始化VID归档
- `void initSNDArchive(const std::string &mountPoint, CFileInputStream & fileStream)`: 初始化SND归档

## 内部数据结构

- `boost::filesystem::path archive`: 归档文件路径
- `std::string mountPoint`: 挂载点
- `std::unordered_map<ResourcePath, ArchiveEntry> entries`: 归档条目映射表
- `bool extractArchives`: 是否提取归档标志

## 辅助函数

- `boost::filesystem::path createExtractedFilePath(const std::string & outputSubFolder, const std::string & entryName, bool absolute)`: 构造提取文件路径并创建子文件夹层次结构

## 使用示例

### 基本使用
```cpp
// 加载LOD归档文件
auto loader = std::make_unique<CArchiveLoader>(
    "/h3data", 
    "DATA/HEROES3.LOD", 
    false
);

// 加载资源
auto stream = loader->load(ResourcePath("icons.def"));
```

### 提取资源
```cpp
// 获取条目信息
const auto& entries = loader->getEntries();
auto it = entries.find(ResourcePath("video.smk"));

// 提取视频文件
if (it != entries.end()) {
    std::ifstream file(loader->archive.string(), std::ios::binary);
    CFileInputStream stream(&file);
    loader->extractToFolder("extracted", stream, it->second);
}
```

### 检查资源存在
```cpp
if (loader->existsResource(ResourcePath("config.txt"))) {
    // 资源存在，可以加载
}
```

## 归档格式支持

### LOD格式
《英雄无敌3》主要资源格式，包含图像、精灵、配置文件等。

### SND格式
声音资源格式，包含游戏音效和音乐。

### VID格式
视频资源格式，包含游戏过场动画和视频。

## 性能优化

- 使用哈希表存储条目信息，实现O(1)查找
- 支持按需提取，避免预先解压所有文件
- 支持压缩和未压缩条目的混合存储

## 错误处理

- 归档文件未找到抛出 `std::runtime_error`
- 不支持的归档格式抛出 `std::runtime_error`
- 资源不存在返回 `nullptr` 或 `false`

## 相关类

- `ISimpleResourceLoader`: 资源加载器接口
- `ResourcePath`: 资源路径类
- `CInputStream`: 输入流类
- `CFileInputStream`: 文件输入流类