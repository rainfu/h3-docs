# Artifact接口

Artifact接口是VCMI中游戏道具（物品）的抽象接口，继承自EntityWithBonuses。

## 类定义

```cpp
class DLL_LINKAGE Artifact : public EntityWithBonuses<ArtifactID>
{
public:
    virtual bool isBig() const = 0;
    virtual bool isTradable() const = 0;
    virtual uint32_t getPrice() const = 0;
    virtual CreatureID getWarMachine() const = 0;

    virtual std::string getDescriptionTranslated() const = 0;
    virtual std::string getEventTranslated() const = 0;

    virtual std::string getDescriptionTextID() const = 0;
    virtual std::string getEventTextID() const = 0;
};
```

## 功能说明

Artifact是VCMI游戏中道具系统的基接口，用于表示游戏中的各种道具，如武器、防具、特殊物品等。它提供了访问道具基本属性的方法，如是否为大物品、是否可交易、价格、战车信息等。该接口还提供了本地化文本获取功能。

## 依赖关系

- [EntityWithBonuses](../entities/EntityWithBonuses.md): 带奖励的实体基类
- [ArtifactID](../identifiers/ArtifactID.md): 道具ID类型
- [CreatureID](../identifiers/CreatureID.md): 生物ID类型
- STL库: string

## 函数注释

- `isBig()`: 返回此道具是否为大物品（占用全部8个装备槽位）
- `isTradable()`: 返回此道具是否可交易
- `getPrice()`: 获取道具的价格
- `getWarMachine()`: 获取与此道具关联的战争机器（如果有的话）
- `getDescriptionTranslated()`: 获取翻译后的描述文本
- `getEventTranslated()`: 获取翻译后的事件文本
- `getDescriptionTextID()`: 获取描述文本的ID
- `getEventTextID()`: 获取事件文本的ID