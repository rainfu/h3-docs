<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\AdapterLoaders.h -->
# AdapterLoaders类

AdapterLoaders头文件定义了VCMI文件系统中的适配器加载器类，包括文件映射加载器和文件系统列表管理器。

## 概述

该头文件包含两个主要的类：
- `CMappedFileLoader`: 实现文件映射功能（类似符号链接）
- `CFilesystemList`: 管理多个资源加载器的集合

## CMappedFileLoader类

### 类定义
```cpp
class DLL_LINKAGE CMappedFileLoader : public ISimpleResourceLoader
```

### 功能描述
CMappedFileLoader实现文件映射功能，允许将一个文件请求重定向到另一个文件。这类似于*nix系统中的符号链接，但通过JSON配置文件实现。

### 构造函数
- `explicit CMappedFileLoader(const std::string &mountPoint, const JsonNode & config)`: 使用挂载点和JSON配置构造

### 主要方法
- `std::unique_ptr<CInputStream> load(const ResourcePath & resourceName) const`: 加载映射的文件
- `bool existsResource(const ResourcePath & resourceName) const`: 检查映射资源是否存在
- `std::string getMountPoint() const`: 获取挂载点
- `std::optional<boost::filesystem::path> getResourceName(const ResourcePath & resourceName) const`: 获取资源路径
- `std::unordered_set<ResourcePath> getFilteredFiles(std::function<bool(const ResourcePath &)> filter) const`: 获取过滤后的文件集合
- `std::string getFullFileURI(const ResourcePath& resourceName) const`: 获取完整的文件URI
- `std::time_t getLastWriteTime(const ResourcePath& resourceName) const`: 获取最后写入时间

### 配置格式
JSON配置文件格式：
```json
{
  "fileA.txt": "fileB.txt",
  "config.json": "default_config.json"
}
```

其中：
- `fileA.txt`: 被替换的文件名
- `fileB.txt`: 实际使用的替换文件

### 内部数据结构
- `std::unordered_map<ResourcePath, ResourcePath> fileList`: 文件映射表

## CFilesystemList类

### 类定义
```cpp
class DLL_LINKAGE CFilesystemList : public ISimpleResourceLoader
```

### 功能描述
CFilesystemList管理多个资源加载器的集合，按照优先级顺序尝试加载资源。它支持可写和只读加载器的区分。

### 构造函数和析构函数
- `CFilesystemList()`: 默认构造函数
- `~CFilesystemList()`: 析构函数

### 主要方法
- `std::unique_ptr<CInputStream> load(const ResourcePath & resourceName) const`: 从第一个可用加载器加载资源
- `bool existsResource(const ResourcePath & resourceName) const`: 检查资源是否存在于任何加载器中
- `std::string getMountPoint() const`: 获取挂载点
- `std::optional<boost::filesystem::path> getResourceName(const ResourcePath & resourceName) const`: 获取资源路径
- `std::set<boost::filesystem::path> getResourceNames(const ResourcePath & resourceName) const`: 获取所有匹配的资源路径
- `void updateFilteredFiles(std::function<bool(const std::string &)> filter) const`: 更新过滤文件
- `std::unordered_set<ResourcePath> getFilteredFiles(std::function<bool(const ResourcePath &)> filter) const`: 获取过滤文件
- `bool createResource(const std::string & filename, bool update = false)`: 创建资源
- `std::vector<const ISimpleResourceLoader *> getResourcesWithName(const ResourcePath & resourceName) const`: 获取具有指定名称的所有资源
- `std::string getFullFileURI(const ResourcePath& resourceName) const`: 获取完整文件URI
- `std::time_t getLastWriteTime(const ResourcePath& resourceName) const`: 获取最后写入时间

### 加载器管理方法
- `void addLoader(std::unique_ptr<ISimpleResourceLoader> loader, bool writeable)`: 添加资源加载器
- `bool removeLoader(ISimpleResourceLoader * loader)`: 移除资源加载器

### 内部数据结构
- `std::vector<std::unique_ptr<ISimpleResourceLoader>> loaders`: 加载器列表
- `std::set<ISimpleResourceLoader *> writeableLoaders`: 可写加载器集合

## 使用示例

### 文件映射加载器
```cpp
// 创建JSON配置
JsonNode config;
config["old_texture.png"] = "new_texture.png";

// 创建映射加载器
auto loader = std::make_unique<CMappedFileLoader>("/mods", config);

// 加载被映射的文件
auto stream = loader->load(ResourcePath("old_texture.png"));
// 实际上会加载 new_texture.png
```

### 文件系统列表
```cpp
// 创建文件系统列表
CFilesystemList fsList;

// 添加多个加载器
fsList.addLoader(std::make_unique<CZipLoader>("data.zip"), false);
fsList.addLoader(std::make_unique<CFilesystemLoader>("/mods"), true);

// 加载资源（会按顺序尝试）
auto resource = fsList.load(ResourcePath("config.json"));
```

## 设计模式

- **适配器模式**: CMappedFileLoader适配文件访问请求
- **组合模式**: CFilesystemList组合多个加载器
- **策略模式**: 不同的加载器实现不同的加载策略

## 性能考虑

- 文件映射使用哈希表实现O(1)查找
- 文件系统列表按顺序搜索，第一个匹配的加载器被使用
- 支持延迟加载和资源缓存

## 相关类

- `ISimpleResourceLoader`: 资源加载器接口
- `ResourcePath`: 资源路径类
- `CInputStream`: 输入流类
- `JsonNode`: JSON节点类