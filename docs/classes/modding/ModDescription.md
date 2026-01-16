# ModDescription类

ModDescription类是VCMI中模组描述的实现类，用于描述模组的基本信息、依赖关系和其他元数据。

## 类定义

```cpp
using TModID = std::string;
using TModList = std::vector<TModID>;
using TModSet = std::set<TModID>;

class DLL_LINKAGE ModDescription : boost::noncopyable
{
    TModID identifier;

    std::unique_ptr<JsonNode> localConfig;
    std::unique_ptr<JsonNode> repositoryConfig;

    TModSet dependencies;
    TModSet softDependencies;
    TModSet conflicts;

    TModSet loadModList(const JsonNode & configNode) const;

public:
    ModDescription(const TModID & fullID, const JsonNode & localConfig, const JsonNode & repositoryConfig);
    ~ModDescription();

    const TModID & getID() const;
    TModID getParentID() const;
    TModID getTopParentID() const;

    const TModSet & getDependencies() const;
    const TModSet & getSoftDependencies() const;
    const TModSet & getConflicts() const;

    const std::string & getBaseLanguage() const;
    const std::string & getName() const;

    const JsonNode & getFilesystemConfig() const;
    const JsonNode & getLocalConfig() const;
    const JsonNode & getValue(const std::string & keyName) const;
    const JsonNode & getLocalizedValue(const std::string & keyName) const;
    const JsonNode & getLocalValue(const std::string & keyName) const;
    const JsonNode & getRepositoryValue(const std::string & keyName) const;

    CModVersion getVersion() const;
    ModVerificationInfo getVerificationInfo() const;

    bool isCompatible() const;
    bool isUpdateAvailable() const;

    bool affectsGameplay() const;
    bool isCompatibility() const;
    bool isTranslation() const;
    bool keepDisabled() const;
    bool isInstalled() const;
};
```

## 功能说明

ModDescription是VCMI模组管理系统中的模组描述类，用于存储和管理单个模组的元数据。它包含模组的标识符、依赖关系、冲突列表、版本信息、本地和仓库配置等。该类提供了访问模组各种属性的方法，包括名称、语言、兼容性等。

## 依赖关系

- [CModVersion](./CModVersion.md): 模组版本
- [ModVerificationInfo](./ModVerificationInfo.md): 模组验证信息
- [JsonNode](../json/JsonNode.md): JSON节点
- boost::noncopyable: 防拷贝基类
- STL库: vector, set, string, unique_ptr等

## 函数注释

- `ModDescription(fullID, localConfig, repositoryConfig)`: 构造函数，使用完整ID、本地配置和仓库配置创建模组描述
- `~ModDescription()`: 析构函数，清理模组描述资源
- `getID()`: 获取模组ID
- `getParentID()`: 获取父模组ID
- `getTopParentID()`: 获取顶级父模组ID
- `getDependencies()`: 获取硬依赖列表
- `getSoftDependencies()`: 获取软依赖列表
- `getConflicts()`: 获取冲突模组列表
- `getBaseLanguage()`: 获取基础语言
- `getName()`: 获取模组名称
- `getFilesystemConfig()`: 获取文件系统配置
- `getLocalConfig()`: 获取本地配置
- `getValue(keyName)`: 获取指定键的值（合并本地和仓库配置）
- `getLocalizedValue(keyName)`: 获取本地化的指定键值
- `getLocalValue(keyName)`: 获取本地配置中的指定键值
- `getRepositoryValue(keyName)`: 获取仓库配置中的指定键值
- `getVersion()`: 获取模组版本
- `getVerificationInfo()`: 获取模组验证信息
- `isCompatible()`: 检查模组是否与当前VCMI版本兼容
- `isUpdateAvailable()`: 检查是否有可用更新
- `affectsGameplay()`: 检查模组是否影响游戏玩法
- `isCompatibility()`: 检查是否为兼容性模组
- `isTranslation()`: 检查是否为翻译模组
- `keepDisabled()`: 检查是否应保持禁用状态
- `isInstalled()`: 检查模组是否已安装