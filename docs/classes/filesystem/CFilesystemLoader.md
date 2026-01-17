<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\CFilesystemLoader.h -->
# CFilesystemLoader类

CFilesystemLoader类是VCMI文件系统中用于扫描和加载目录文件的类。它支持递归目录遍历和文件索引。

## 类定义

```cpp
class DLL_LINKAGE CFilesystemLoader : public ISimpleResourceLoader
```

## 构造函数

- `CFilesystemLoader(std::string mountPoint, boost::filesystem::path baseDirectory, size_t depth = 16, bool initial = false)`: 构造文件系统加载器

### 参数说明
- `mountPoint`: 挂载点
- `baseDirectory`: 基础目录
- `depth`: 子目录搜索递归深度，0表示不递归
- `initial`: 是否为初始加载

## 主要方法

- `std::unique_ptr<CInputStream> load(const ResourcePath & resourceName) const`: 加载资源
- `bool existsResource(const ResourcePath & resourceName) const`: 检查资源是否存在
- `std::string getMountPoint() const`: 获取挂载点
- `bool createResource(const std::string & filename, bool update = false)`: 创建资源
- `std::optional<boost::filesystem::path> getResourceName(const ResourcePath & resourceName) const`: 获取资源路径
- `void updateFilteredFiles(std::function<bool(const std::string &)> filter) const`: 更新过滤文件
- `std::unordered_set<ResourcePath> getFilteredFiles(std::function<bool(const ResourcePath &)> filter) const`: 获取过滤文件
- `std::string getFullFileURI(const ResourcePath& resourceName) const`: 获取完整文件URI
- `std::time_t getLastWriteTime(const ResourcePath& resourceName) const`: 获取最后写入时间

## 私有方法

- `std::unordered_map<ResourcePath, boost::filesystem::path> listFiles(const std::string &mountPoint, size_t depth, bool initial) const`: 列出目录中的文件

## 内部状态

- `boost::filesystem::path baseDirectory`: 基础目录
- `std::string mountPoint`: 挂载点
- `size_t recursiveDepth`: 递归深度
- `std::unordered_map<ResourcePath, boost::filesystem::path> fileList`: 文件列表映射

## 相关类

- `ISimpleResourceLoader`: 资源加载器接口