# ModManager类

ModManager类是VCMI中模组管理系统的主控制器类，负责管理模组的加载、激活、预设和依赖关系解析。

## 类定义

```cpp
/// 提供访问本地已安装模组列表的接口
class ModsState : boost::noncopyable
{
    TModList modList;

    TModList scanModsDirectory(const std::string & modDir) const;

public:
    ModsState();

    TModList getInstalledMods() const;
    double getInstalledModSizeMegabytes(const TModID & modName) const;

    uint32_t computeChecksum(const TModID & modName) const;
};

/// 提供访问或更改当前模组预设的接口
class ModsPresetState : boost::noncopyable
{
    JsonNode modConfig;

    void createInitialPreset();
    void importInitialPreset();

    const JsonNode & getActivePresetConfig() const;

public:
    ModsPresetState();

    void createNewPreset(const std::string & presetName);
    void deletePreset(const std::string & presetName);
    void activatePreset(const std::string & presetName);
    void renamePreset(const std::string & oldPresetName, const std::string & newPresetName);

    std::vector<std::string> getAllPresets() const;
    std::string getActivePreset() const;

    JsonNode exportCurrentPreset() const;

    /// 从提供的json导入预设
    /// 成功时返回导入的预设名称
    std::string importPreset(const JsonNode & data);

    void setModActive(const TModID & modName, bool isActive);

    void addRootMod(const TModID & modName);
    void eraseRootMod(const TModID & modName);
    void removeOldMods(const TModList & modsToKeep);

    void setSettingActive(const TModID & modName, const TModID & settingName, bool isActive);
    void eraseModSetting(const TModID & modName, const TModID & settingName);

    /// 返回当前预设中所有活跃的模组列表，模组顺序未指定
    TModList getActiveMods() const;

    /// 返回当前活跃的根模组（非子模组）列表
    TModList getActiveRootMods() const;
    /// 返回指定预设中存在的根模组列表
    TModList getRootMods(const std::string & presetName) const;

    /// 返回指定模组的所有已知设置（子模组）列表
    std::map<TModID, bool> getModSettings(const TModID & modID) const;
    std::optional<uint32_t> getValidatedChecksum(const TModID & modName) const;
    void setValidatedChecksum(const TModID & modName, std::optional<uint32_t> value);

    void saveConfigurationState() const;
};

/// 提供对模组属性的访问
class ModsStorage : boost::noncopyable
{
    std::map<TModID, ModDescription> mods;

public:
    ModsStorage(const TModList & modsToLoad, const JsonNode & repositoryList);

    const ModDescription & getMod(const TModID & fullID) const;

    TModList getAllMods() const;
};

class ModDependenciesResolver : boost::noncopyable
{
    /// 当前所有活跃的模组，按加载顺序排列
    TModList activeMods;

    /// 由于无效依赖关系而未能加载的当前预设中的模组
    TModList brokenMods;

public:
    ModDependenciesResolver(const TModList & modsToResolve, const ModsStorage & storage);

    void tryAddMods(TModList modsToResolve, const ModsStorage & storage);

    const TModList & getActiveMods() const;
    const TModList & getBrokenMods() const;
};

/// 提供对模组状态的公共接口
class DLL_LINKAGE ModManager : boost::noncopyable
{
    std::unique_ptr<ModsState> modsState;
    std::unique_ptr<ModsPresetState> modsPreset;
    std::unique_ptr<ModsStorage> modsStorage;
    std::unique_ptr<ModDependenciesResolver> depedencyResolver;

    void generateLoadOrder(TModList desiredModList);
    void eraseMissingModsFromPreset();
    void addNewModsToPreset();
    void updatePreset(const ModDependenciesResolver & newData);

    TModList getInstalledValidMods() const;
    TModList collectDependenciesRecursive(const TModID & modID) const;

    void tryEnableMod(const TModID & modList);

public:
    ModManager(const JsonNode & repositoryList);
    ModManager();
    ~ModManager();

    const ModDescription & getModDescription(const TModID & modID) const;
    const TModList & getActiveMods() const;
    TModList getAllMods() const;

    bool isModSettingActive(const TModID & rootModID, const TModID & modSettingID) const;
    bool isModActive(const TModID & modID) const;
    uint32_t computeChecksum(const TModID & modName) const;
    std::optional<uint32_t> getValidatedChecksum(const TModID & modName) const;
    void setValidatedChecksum(const TModID & modName, std::optional<uint32_t> value);
    void saveConfigurationState() const;
    double getInstalledModSizeMegabytes(const TModID & modName) const;

    void tryEnableMods(const TModList & modList);
    void tryDisableMod(const TModID & modName);

    void createNewPreset(const std::string & presetName);
    void deletePreset(const std::string & presetName);
    void activatePreset(const std::string & presetName);
    void renamePreset(const std::string & oldPresetName, const std::string & newPresetName);

    std::vector<std::string> getAllPresets() const;
    std::string getActivePreset() const;

    JsonNode exportCurrentPreset() const;

    /// 从提供的json导入预设
    /// 返回导入的预设名称和激活预设所需的模组列表
    std::tuple<std::string, TModList> importPreset(const JsonNode & data);
};
```

## 功能说明

ModManager是VCMI模组管理系统的核心类，它整合了多个子系统来管理模组的生命周期。它包含四个主要组件：

1. ModsState: 负责管理本地已安装的模组列表
2. ModsPresetState: 管理模组预设（配置文件）
3. ModsStorage: 存储和访问模组描述信息
4. ModDependenciesResolver: 解析和处理模组依赖关系

该类提供了完整的模组管理功能，包括模组的启用/禁用、预设的创建/切换、依赖关系解析和校验和计算。

## 依赖关系

- [JsonNode](../json/JsonNode.md): JSON节点
- [ModDescription](./ModDescription.md): 模组描述
- [CModVersion](./CModVersion.md): 模组版本
- boost::noncopyable: 防拷贝基类
- STL库: vector, set, map, string, tuple, optional, unique_ptr等

## 函数注释

- `ModManager(repositoryList)`: 构造函数，使用仓库列表初始化模组管理器
- `getModDescription(modID)`: 获取指定模组的描述信息
- `getActiveMods()`: 获取当前活跃模组列表
- `getAllMods()`: 获取所有模组列表
- `isModActive(modID)`: 检查模组是否处于活跃状态
- `isModSettingActive(rootModID, modSettingID)`: 检查模组设置是否处于活跃状态
- `computeChecksum(modName)`: 计算模组的校验和
- `getValidatedChecksum(modName)`: 获取已验证的校验和
- `setValidatedChecksum(modName, value)`: 设置已验证的校验和
- `tryEnableMods(modList)`: 尝试启用模组列表
- `tryDisableMod(modName)`: 尝试禁用模组
- `createNewPreset(presetName)`: 创建新预设
- `activatePreset(presetName)`: 激活预设
- `getAllPresets()`: 获取所有预设列表
- `importPreset(data)`: 导入预设并返回预设名称和所需模组列表
- `getInstalledModSizeMegabytes(modName)`: 获取已安装模组的大小（以兆字节为单位）
- `saveConfigurationState()`: 保存配置状态