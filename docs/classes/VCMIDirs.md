<!-- 来源: E:\develop\heroes\vcmi\lib\VCMIDirs.h -->
# VCMIDirs头文件

VCMIDirs头文件定义了VCMI中目录路径管理的接口类，用于管理用户数据、配置、缓存等各种目录路径。

## IVCMIDirs接口类

### 类定义
```cpp
class DLL_LINKAGE IVCMIDirs
```

### 用户目录方法
- `virtual boost::filesystem::path userDataPath() const = 0`: 用户数据目录路径
- `virtual boost::filesystem::path userCachePath() const = 0`: 缓存目录路径
- `virtual boost::filesystem::path userConfigPath() const = 0`: 用户配置目录路径
- `virtual boost::filesystem::path userLogsPath() const`: 日志文件目录路径
- `virtual boost::filesystem::path userSavePath() const`: 保存游戏目录路径
- `virtual boost::filesystem::path userExtractedPath() const`: 提取文件临时目录路径

### 系统目录方法
- `virtual std::vector<boost::filesystem::path> dataPaths() const = 0`: 全局系统数据目录列表（优先级从高到低）
- `virtual boost::filesystem::path clientPath() const = 0`: 客户端可执行文件完整路径
- `virtual boost::filesystem::path mapEditorPath() const = 0`: 地图编辑器可执行文件完整路径
- `virtual boost::filesystem::path serverPath() const = 0`: 服务器可执行文件完整路径
- `virtual boost::filesystem::path libraryPath() const = 0`: VCMI库文件目录路径
- `virtual boost::filesystem::path binaryPath() const = 0`: VCMI二进制文件目录路径

### 库文件方法
- `virtual boost::filesystem::path fullLibraryPath(const std::string & desiredFolder, const std::string & baseLibName) const`: 获取完整库文件路径
- `virtual std::string libraryName(const std::string & basename) const = 0`: 获取系统特定的动态库名称

### 工具方法
- `virtual std::string genHelpString() const`: 生成帮助字符串
- `virtual void init()`: 初始化和创建必需的目录

## VCMIDirs命名空间

### 函数
- `const IVCMIDirs & get()`: 获取全局目录管理器实例

## 设计特点

- 纯虚接口设计，支持不同平台的目录结构
- 区分用户数据和系统数据目录
- 支持多数据目录搜索（优先级机制）
- 提供便捷的库文件路径生成
- 自动创建和更新必需目录