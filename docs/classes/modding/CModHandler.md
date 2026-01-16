# CModHandler类

CModHandler类是VCMI中模块管理系统的核心类，负责处理游戏模组的加载、管理和验证。

## 类定义

```cpp
using TModID = std::string;

class DLL_LINKAGE CModHandler final : boost::noncopyable
{
    std::unique_ptr<ModManager> modManager;
    std::map<std::string, uint32_t> modChecksums;
    std::set<std::string> validationPassed;

    void loadTranslation(const TModID & modName);
    void checkModFilesystemsConflicts(const std::map<TModID, std::unique_ptr<ISimpleResourceLoader>> & modFilesystems);

    bool isModValidationNeeded(const ModDescription & mod) const;

public:
    std::shared_ptr<CContentHandler> content;

    /// 接收可用模组列表并尝试从所有模组中加载mod.json
    void initializeConfig();
    void loadModFilesystems();

    /// 返回提供选定文件资源的模组ID
    TModID findResourceOrigin(const ResourcePath & name) const;

    /// 返回提供选定文件资源的模组的假定语言ID
    std::string findResourceLanguage(const ResourcePath & name) const;

    /// 返回提供选定文件资源的模组的语言编码
    std::string findResourceEncoding(const ResourcePath & name) const;

    std::string getModLanguage(const TModID & modId) const;

    std::set<TModID> getModDependencies(const TModID & modId) const;
    std::set<TModID> getModDependencies(const TModID & modId, bool & isModFound) const;
    std::set<TModID> getModSoftDependencies(const TModID & modId) const;
    std::set<TModID> getModEnabledSoftDependencies(const TModID & modId) const;

    /// 返回所有（活动）模组的列表
    std::vector<std::string> getAllMods() const;
    const std::vector<std::string> & getActiveMods() const;

    const ModDescription & getModInfo(const TModID & modId) const;

    /// 从所有可用模组加载内容
    void load();
    void afterLoad();

    CModHandler();
    ~CModHandler();
};
```

## 功能说明

CModHandler是VCMI模组管理系统的核心类，负责处理游戏模组的加载、管理和验证。它协调模组之间的依赖关系，解决文件系统冲突，并管理模组的内容加载。该类还负责确定资源的来源、语言和编码，以及处理模组间的依赖关系。

## 依赖关系

- [ModManager](./ModManager.md): 模组管理器
- [ModDescription](./ModDescription.md): 模组描述
- [CContentHandler](./CContentHandler.md): 内容处理器
- [ResourcePath](../filesystem/ResourcePath.md): 资源路径
- [ISimpleResourceLoader](./ISimpleResourceLoader.md): 简单资源加载器
- boost::noncopyable: 防拷贝基类
- STL库: map, set, vector, string, unique_ptr, shared_ptr等

## 函数注释

- `CModHandler()`: 构造函数，创建模组处理器对象
- `~CModHandler()`: 析构函数，清理模组处理器资源
- `initializeConfig()`: 初始化配置，尝试从所有可用模组加载mod.json
- `loadModFilesystems()`: 加载模组文件系统
- `findResourceOrigin(name)`: 查找提供指定资源的模组ID
- `findResourceLanguage(name)`: 查找提供指定资源的模组的假定语言ID
- `findResourceEncoding(name)`: 查找提供指定资源的模组的语言编码
- `getModLanguage(modId)`: 获取指定模组的语言
- `getModDependencies(modId)`: 获取模组的依赖项
- `getModDependencies(modId, isModFound)`: 获取模组的依赖项并返回模组是否找到
- `getModSoftDependencies(modId)`: 获取模组的软依赖项
- `getModEnabledSoftDependencies(modId)`: 获取模组启用的软依赖项
- `getAllMods()`: 获取所有模组的列表
- `getActiveMods()`: 获取激活模组的列表
- `getModInfo(modId)`: 获取指定模组的信息
- `load()`: 从所有可用模组加载内容
- `afterLoad()`: 加载后处理