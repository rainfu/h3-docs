# ISimpleResourceLoader

## 概述

`ISimpleResourceLoader` 是VCMI文件系统中的资源加载器接口，定义了从各种存储介质（文件系统、压缩包、内存等）加载资源的标准方法。这个接口提供了统一的资源访问API。

## 主要功能

ISimpleResourceLoader 提供了以下核心功能：

1. **资源加载**: 从存储介质加载资源文件
2. **资源查询**: 检查资源是否存在，获取资源信息
3. **路径管理**: 处理挂载点和资源路径映射
4. **文件过滤**: 支持按条件过滤和搜索资源
5. **元数据访问**: 获取文件修改时间等信息

## 核心方法

### 资源加载

#### load
```cpp
virtual std::unique_ptr<CInputStream> load(const ResourcePath & resourceName) const = 0;
```
- **参数**: `resourceName` - 资源的唯一标识路径
- **返回值**: 指向输入流的智能指针
- **功能**: 加载指定资源，返回可读取的输入流
- **说明**: 这是核心的资源加载方法

### 资源查询

#### existsResource
```cpp
virtual bool existsResource(const ResourcePath & resourceName) const = 0;
```
- **参数**: `resourceName` - 要检查的资源路径
- **返回值**: 资源是否存在
- **功能**: 检查指定资源是否可用

#### getMountPoint
```cpp
virtual std::string getMountPoint() const = 0;
```
- **返回值**: 加载器的挂载点URI
- **功能**: 获取此加载器被挂载的路径

### 文件路径操作

#### getResourceName
```cpp
virtual std::optional<boost::filesystem::path> getResourceName(const ResourcePath & resourceName) const
```
- **参数**: `resourceName` - 资源路径
- **返回值**: 文件的完整路径（如果可直接访问）
- **功能**: 获取资源的实际文件系统路径
- **默认实现**: 返回空（用于压缩包等不可直接访问的资源）

#### getResourceNames
```cpp
virtual std::set<boost::filesystem::path> getResourceNames(const ResourcePath & resourceName) const
```
- **参数**: `resourceName` - 资源路径
- **返回值**: 匹配资源的文件路径集合
- **功能**: 获取所有匹配资源的实际路径

### 文件过滤和搜索

#### updateFilteredFiles
```cpp
virtual void updateFilteredFiles(std::function<bool(const std::string &)> filter) const = 0;
```
- **参数**: `filter` - 过滤函数，判断挂载点是否匹配
- **功能**: 更新符合过滤条件的文件列表

#### getFilteredFiles
```cpp
virtual std::unordered_set<ResourcePath> getFilteredFiles(std::function<bool(const ResourcePath &)> filter) const = 0;
```
- **参数**: `filter` - 过滤函数，判断资源ID是否匹配
- **返回值**: 符合条件的资源路径集合
- **功能**: 获取符合过滤条件的所有文件

### 资源创建和管理

#### createResource
```cpp
virtual bool createResource(const std::string & filename, bool update = false)
```
- **参数**:
  - `filename`: 要创建的资源文件名
  - `update`: 是否更新现有文件
- **返回值**: 是否成功创建新资源
- **功能**: 创建新的资源文件
- **默认实现**: 返回false（只读加载器不支持）

#### getResourcesWithName
```cpp
virtual std::vector<const ISimpleResourceLoader *> getResourcesWithName(const ResourcePath & resourceName) const
```
- **参数**: `resourceName` - 资源名称
- **返回值**: 包含此资源的加载器列表
- **功能**: 查找所有包含指定资源的加载器

### 元数据访问

#### getFullFileURI
```cpp
virtual std::string getFullFileURI(const ResourcePath& resourceName) const = 0;
```
- **参数**: `resourceName` - 资源路径
- **返回值**: 资源的完整URI
- **功能**: 获取资源的完整统一资源标识符

#### getLastWriteTime
```cpp
virtual std::time_t getLastWriteTime(const ResourcePath& resourceName) const = 0;
```
- **参数**: `resourceName` - 资源路径
- **返回值**: 文件的最后修改时间
- **功能**: 获取资源的最后修改时间戳

## 实现类

ISimpleResourceLoader 有多个具体实现：

### 文件系统加载器
- **CFilesystemLoader**: 从目录加载文件
- **CZipLoader**: 从ZIP压缩包加载文件
- **CArchiveLoader**: 从游戏归档文件加载资源

### 复合加载器
- **CFilesystemList**: 管理多个加载器的复合加载器

## 使用场景

### 基本资源加载
```cpp
// 获取全局资源加载器
auto loader = CResourceHandler::get();

// 加载资源文件
ResourcePath path("sprites/hero.png");
if (loader->existsResource(path)) {
    auto stream = loader->load(path);
    // 处理流数据...
}
```

### 资源搜索
```cpp
// 搜索所有PNG文件
auto pngFiles = loader->getFilteredFiles([](const ResourcePath& path) {
    return path.getName().ends_with(".png");
});

// 搜索特定目录下的文件
auto spriteFiles = loader->getFilteredFiles([](const ResourcePath& path) {
    return path.getName().starts_with("sprites/");
});
```

### 多加载器资源查找
```cpp
// 查找包含特定资源的加载器
ResourcePath resource("data/config.json");
auto loaders = loader->getResourcesWithName(resource);

for (auto* resLoader : loaders) {
    std::cout << "Found in: " << resLoader->getMountPoint() << std::endl;
}
```

### 文件元数据访问
```cpp
// 获取文件信息
std::string uri = loader->getFullFileURI(path);
std::time_t modTime = loader->getLastWriteTime(path);

// 检查文件是否最近修改
auto now = std::time(nullptr);
if (now - modTime < 3600) { // 1小时内
    std::cout << "File recently modified" << std::endl;
}
```

## 设计意图

ISimpleResourceLoader 的设计目的是为了：

1. **统一接口**: 为所有类型的资源存储提供统一的访问接口
2. **抽象存储**: 隐藏底层存储介质的差异（文件、压缩包、内存等）
3. **资源管理**: 提供完整的资源生命周期管理
4. **性能优化**: 支持缓存、过滤和批量操作
5. **扩展性**: 允许自定义加载器实现
6. **元数据支持**: 提供丰富的资源信息查询

## 注意事项

- **路径格式**: 使用ResourcePath而不是普通字符串
- **生命周期**: 加载器实例需要正确管理生命周期
- **线程安全**: 具体实现可能有不同的线程安全保证
- **错误处理**: 资源不存在时返回nullptr而不是抛出异常
- **性能考虑**: 频繁的existsResource调用可能影响性能

这个接口为VCMI的资源管理系统提供了基础，使得游戏可以从多种来源透明地加载资源文件。