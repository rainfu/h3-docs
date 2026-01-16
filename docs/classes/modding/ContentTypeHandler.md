# ContentTypeHandler类

ContentTypeHandler类是VCMI中处理特定类型游戏数据加载的内部类型，用于管理一种特定数据类型（例如神器、生物）的加载。

## 类定义

```cpp
/// internal type to handle loading of one data type (e.g. artifacts, creatures)
class DLL_LINKAGE ContentTypeHandler
{
    JsonNode conflictList;

public:
    struct ModInfo
    {
        /// 来自此模组的数据
        JsonNode modData;
        /// 来自其他模组对此模组的补丁数据
        JsonNode patches;
    };
    /// 处理器，所有数据都将加载到这里
    IHandlerBase * handler;
    std::string entityName;

    /// 包含所有已加载的H3数据
    std::vector<JsonNode> originalData;
    std::map<std::string, ModInfo> modData;

    ContentTypeHandler(IHandlerBase * handler, const std::string & objectName);

    /// 本地化ContentHandler中的方法
    /// 如果加载成功则返回true
    bool preloadModData(const std::string & modName, const JsonNode & fileList, bool validate);
    bool loadMod(const std::string & modName, bool validate);
    void loadCustom();
    void afterLoadFinalization();
};

/// 用于将所有游戏数据加载到处理器的类。仅在加载期间使用
class DLL_LINKAGE CContentHandler
{
    std::map<std::string, ContentTypeHandler> handlers;

public:
    void init();

    /// 从fileList预加载所有数据作为来自modName的数据
    bool preloadData(const ModDescription & mod, bool validateMod);

    /// 实际加载mod中的数据
    bool load(const ModDescription & mod, bool validateMod);

    void loadCustom();

    /// 所有数据都已加载，进行最终验证/集成的时间
    void afterLoadFinalization();

    const ContentTypeHandler & operator[] (const std::string & name) const;
};
```

## 功能说明

ContentTypeHandler是VCMI模组系统中的一个内部类，专门用于处理特定类型的游戏数据加载。它管理单个数据类型（如神器、生物、法术等）的加载过程，处理来自不同模组的数据和补丁。CContentHandler类则是顶层管理器，协调所有ContentTypeHandler实例的工作，负责将所有游戏数据加载到相应的处理器中。

## 依赖关系

- [IHandlerBase](../mapObjects/IHandlerBase.md): 基础处理器接口
- [ModDescription](./ModDescription.md): 模组描述
- [JsonNode](../json/JsonNode.md): JSON节点
- STL库: vector, map, string等

## 函数注释

### ContentTypeHandler类

- `ContentTypeHandler(handler, objectName)`: 构造函数，使用指定的处理器和对象名称创建内容类型处理器
- `preloadModData(modName, fileList, validate)`: 预加载模组数据，如果验证通过则返回true
- `loadMod(modName, validate)`: 加载模组数据，如果验证通过则返回true
- `loadCustom()`: 加载自定义数据
- `afterLoadFinalization()`: 加载完成后进行最终处理

### CContentHandler类

- `init()`: 初始化内容处理器
- `preloadData(mod, validateMod)`: 预加载模组数据
- `load(mod, validateMod)`: 加载模组数据
- `loadCustom()`: 加载自定义数据
- `afterLoadFinalization()`: 加载完成后进行最终处理
- `operator[](name)`: 获取指定名称的ContentTypeHandler