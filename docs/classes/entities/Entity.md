# Entity类

Entity类是VCMI中基础实体类，为游戏中所有实体提供通用接口和基本属性。

## 类定义

```cpp
class DLL_LINKAGE INativeTerrainProvider
{
public:
    virtual TerrainId getNativeTerrain() const = 0;
    virtual FactionID getFactionID() const = 0;
    virtual bool isNativeTerrain(TerrainId terrain) const;
};

class DLL_LINKAGE Entity : boost::noncopyable
{
public:
    using IconRegistar = std::function<void(int32_t index, int32_t group, const std::string & listName, const std::string & imageName)>;

    virtual ~Entity() = default;

    virtual int32_t getIndex() const = 0;
    virtual int32_t getIconIndex() const = 0;
    virtual std::string getJsonKey() const = 0;
    virtual std::string getModScope() const = 0;
    virtual std::string getNameTranslated() const = 0;
    virtual std::string getNameTextID() const = 0;

    virtual void registerIcons(const IconRegistar & cb) const = 0;
};
```

## 功能说明

Entity是VCMI实体系统的基础类，为游戏中所有实体（如生物、神器、英雄、城镇等）提供通用接口和基本属性。它定义了实体应具有的基本功能，如获取索引、图标索引、JSON键、名称等。INativeTerrainProvider是一个辅助接口，用于提供原生地形信息。

## 依赖关系

- [boost::noncopyable](../boost/noncopyable.md): 防拷贝基类
- [FactionID](./FactionID.md): 派系ID
- [TerrainId](./TerrainId.md): 地形ID
- STL库: function, string等

## 函数注释

### INativeTerrainProvider接口

- `getNativeTerrain()`: 纯虚函数，获取实体的原生地形
- `getFactionID()`: 纯虚函数，获取实体所属的派系ID
- `isNativeTerrain(terrain)`: 虚函数，检查指定地形是否为实体的原生地形

### Entity类

- `~Entity()`: 虚析构函数，确保派生类正确析构
- `getIndex()`: 纯虚函数，获取实体的索引
- `getIconIndex()`: 纯虚函数，获取实体的图标索引
- `getJsonKey()`: 纯虚函数，获取实体的JSON键
- `getModScope()`: 纯虚函数，获取实体的模组作用域
- `getNameTranslated()`: 纯虚函数，获取翻译后的实体名称
- `getNameTextID()`: 纯虚函数，获取实体名称的文本ID
- `registerIcons(cb)`: 纯虚函数，使用回调函数注册实体图标
- `IconRegistar`: 类型别名，定义图标注册器的函数签名