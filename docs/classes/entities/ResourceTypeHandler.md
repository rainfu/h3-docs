# ResourceTypeHandler类

ResourceTypeHandler类是VCMI中资源类型处理器，用于管理游戏中的各种资源类型，如金币、木材、矿石等。

## 类定义

```cpp
class ResourceTypeHandler;

class DLL_LINKAGE Resource : public ResourceType
{
    friend class ResourceTypeHandler;

    GameResID id; //反向链接

    int price;
    std::string iconSmall;
    std::string iconMedium;
    std::string iconLarge;

    std::string identifier;
    std::string modScope;

public:
    int getPrice() const override { return price; }

    std::string getJsonKey() const override { return identifier; }
    int32_t getIndex() const override { return id.getNum(); }
    GameResID getId() const override { return id;}
    int32_t getIconIndex() const override { return id.getNum(); }
    std::string getModScope() const override { return modScope; };
    void registerIcons(const IconRegistar & cb) const override;
    std::string getNameTextID() const override;
    std::string getNameTranslated() const override;
};

class DLL_LINKAGE ResourceTypeHandler : public CHandlerBase<GameResID, ResourceType, Resource, ResourceTypeService>
{
    std::vector<GameResID> allObjects;

public:
    std::shared_ptr<Resource> loadFromJson(const std::string & scope,
                                        const JsonNode & json,
                                        const std::string & identifier,
                                        size_t index) override;

    void afterLoadFinalization() override;
    
    const std::vector<std::string> & getTypeNames() const override;
    std::vector<JsonNode> loadLegacyData() override;

    const std::vector<GameResID> & getAllObjects() const;
};
```

## 功能说明

ResourceTypeHandler是VCMI实体系统中的资源类型处理器，负责加载、管理和提供对游戏资源类型的访问。它继承自CHandlerBase，实现了对各种游戏资源的统一管理。Resource类表示具体的资源类型，如金币、木材、矿石等，包含价格、图标和名称等信息。

## 依赖关系

- [CHandlerBase](../mapObjects/IHandlerBase.md): 处理器基类
- [ResourceType](./ResourceType.md): 资源类型接口
- [GameResID](./GameResID.md): 游戏资源ID
- [JsonNode](../json/JsonNode.md): JSON节点
- [IconRegistar](./IconRegistar.md): 图标注册器
- STL库: vector, string, shared_ptr等

## 函数注释

### Resource类

- `getPrice()`: 获取资源的价格
- `getJsonKey()`: 获取资源的JSON键
- `getIndex()`: 获取资源的索引
- `getId()`: 获取资源的ID
- `getIconIndex()`: 获取资源的图标索引
- `getModScope()`: 获取资源的模组作用域
- `registerIcons(cb)`: 注册资源图标
- `getNameTextID()`: 获取资源名称的文本ID
- `getNameTranslated()`: 获取翻译后的资源名称

### ResourceTypeHandler类

- `loadFromJson(scope, json, identifier, index)`: 从JSON加载资源
- `afterLoadFinalization()`: 加载完成后的最终化处理
- `getTypeNames()`: 获取类型名称列表
- `loadLegacyData()`: 加载旧版数据
- `getAllObjects()`: 获取所有资源对象列表