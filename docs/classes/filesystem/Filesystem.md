# CFilesystemGenerator & CResourceHandler

## 概述

`CFilesystemGenerator` 和 `CResourceHandler` 类提供了VCMI的文件系统管理和资源加载功能。`CFilesystemGenerator` 用于从JSON配置生成文件系统，而 `CResourceHandler` 提供全局资源加载器的访问和管理。

## CFilesystemGenerator

### 主要功能

CFilesystemGenerator 提供了以下核心功能：

1. **文件系统生成**: 从JSON配置创建文件系统结构
2. **多种加载器支持**: 支持目录、压缩包、映射等多种资源加载方式
3. **前缀管理**: 为所有文件路径添加统一前缀
4. **归档提取**: 可选择是否提取原始H3归档文件

### 核心方法

#### 构造函数
```cpp
CFilesystemGenerator(std::string prefix, bool extractArchives = false);
```
- **参数**:
  - `prefix`: 文件路径的前缀
  - `extractArchives`: 是否提取H3归档文件到单独文件夹
- **功能**: 创建文件系统生成器实例

#### loadConfig
```cpp
void loadConfig(const JsonNode & config);
```
- **参数**: `config` - JSON配置文件
- **功能**: 从JSON配置加载文件系统设置
- **配置格式**: 使用config/filesystem.json中的"filesystem"条目格式

#### acquireFilesystem
```cpp
std::unique_ptr<CFilesystemList> acquireFilesystem();
```
- **返回值**: 生成的文件系统智能指针
- **功能**: 获取生成的完整文件系统

### 支持的加载类型

#### loadDirectory
```cpp
void loadDirectory(const std::string & mountPoint, const JsonNode & config);
```
- **功能**: 加载目录作为文件系统挂载点

#### loadZipArchive
```cpp
void loadZipArchive(const std::string & mountPoint, const JsonNode & config);
```
- **功能**: 加载ZIP压缩包作为文件系统

#### loadArchive (模板方法)
```cpp
template<EResType archiveType>
void loadArchive(const std::string & mountPoint, const JsonNode & config);
```
- **功能**: 加载特定类型的游戏归档文件

#### loadJsonMap
```cpp
void loadJsonMap(const std::string & mountPoint, const JsonNode & config);
```
- **功能**: 加载JSON映射文件

## CResourceHandler

### 主要功能

CResourceHandler 提供了以下核心功能：

1. **全局资源管理**: 提供对全局资源加载器的访问
2. **多加载器支持**: 支持多个命名加载器的管理
3. **初始化和销毁**: 管理资源系统的生命周期
4. **配置加载**: 从配置文件初始化整个文件系统

### 静态方法

#### initialize
```cpp
static void initialize();
```
- **功能**: 创建初始资源加载器实例（不填充数据）

#### destroy
```cpp
static void destroy();
```
- **功能**: 销毁所有文件系统数据，恢复未初始化状态

#### load
```cpp
static void load(const std::string & fsConfigURI, bool extractArchives = false);
```
- **参数**:
  - `fsConfigURI`: 文件系统配置文件的URI
  - `extractArchives`: 是否提取归档文件
- **功能**: 从JSON配置文件加载完整的文件系统数据

#### get
```cpp
static ISimpleResourceLoader * get();
static ISimpleResourceLoader * get(const std::string & identifier);
```
- **参数**: `identifier` - 加载器标识符（可选）
- **返回值**: 资源加载器实例
- **功能**: 获取全局资源加载器实例

#### addFilesystem
```cpp
static void addFilesystem(const std::string & parent, const std::string & identifier, std::unique_ptr<ISimpleResourceLoader> loader);
```
- **参数**:
  - `parent`: 父加载器名称
  - `identifier`: 新加载器的标识符
  - `loader`: 要添加的资源加载器
- **功能**: 将文件系统添加到全局资源加载器

#### removeFilesystem
```cpp
static bool removeFilesystem(const std::string & parent, const std::string & identifier);
```
- **参数**:
  - `parent`: 父加载器名称
  - `identifier`: 要移除的加载器标识符
- **返回值**: 是否成功移除
- **功能**: 从全局资源加载器中移除文件系统

#### createFileSystem
```cpp
static std::unique_ptr<ISimpleResourceLoader> createFileSystem(const std::string &prefix, const JsonNode & fsConfig, bool extractArchives = false);
```
- **参数**:
  - `prefix`: 路径前缀
  - `fsConfig`: 文件系统配置
  - `extractArchives`: 是否提取归档
- **返回值**: 创建的文件系统加载器
- **功能**: 从配置创建模组文件系统

## JSON配置格式

文件系统配置使用以下JSON格式：

```json
{
  "filesystem": [
    {
      "type": "zip",
      "path": "data.zip",
      "mountPoint": "/"
    },
    {
      "type": "dir",
      "path": "data",
      "mountPoint": "/data"
    }
  ]
}
```

### 配置字段说明
- **type**: 加载器类型 ("zip", "dir", "archive", "json")
- **path**: 资源路径
- **mountPoint**: 挂载点路径

## 使用场景

### 初始化全局文件系统
```cpp
// 在程序启动时初始化
CResourceHandler::initialize();

// 加载配置文件
CResourceHandler::load("config/filesystem.json", true);

// 获取全局加载器
auto loader = CResourceHandler::get();
```

### 创建模组文件系统
```cpp
// 为模组创建文件系统
JsonNode modConfig = {
  {"type", "dir"},
  {"path", "mods/myMod"},
  {"mountPoint", "/"}
};

auto modFS = CResourceHandler::createFileSystem("myMod", modConfig);
CResourceHandler::addFilesystem("root", "myMod", std::move(modFS));
```

### 生成器使用
```cpp
// 使用生成器创建自定义文件系统
CFilesystemGenerator generator("myPrefix", false);
generator.loadConfig(jsonConfig);
auto filesystem = generator.acquireFilesystem();
```

## 设计意图

文件系统模块的设计目的是为了：

1. **统一资源管理**: 提供统一的资源加载接口
2. **多格式支持**: 支持多种资源存储格式
3. **模组兼容**: 支持模组文件的动态加载
4. **性能优化**: 通过缓存和索引优化资源访问
5. **扩展性**: 支持自定义加载器和挂载点

这为VCMI提供了灵活而强大的资源管理系统，支持从简单目录到复杂压缩包的各种资源存储方式。