# Artifact类

Artifact类是VCMI中神器接口，定义了游戏中神器的基本属性和功能。

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

Artifact是VCMI神器系统的基础接口，定义了游戏中所有神器类型的通用功能。它继承自EntityWithBonuses，这意味着神器可以拥有并应用奖励效果。该接口定义了神器的基本属性，如是否为大型神器、是否可交易、价格、关联的战争机器等，以及与之相关的文本信息。

## 依赖关系

- [EntityWithBonuses](./EntityWithBonuses.md): 带奖励的实体基类
- [ArtifactID](./ArtifactID.md): 神器ID
- [CreatureID](./CreatureID.md): 生物ID
- STL库: string等

## 函数注释

- `isBig()`: 纯虚函数，检查神器是否为大型神器（如战争机器）
- `isTradable()`: 纯虚函数，检查神器是否可交易（能否放入背包或与其他神器交换）
- `getPrice()`: 纯虚函数，获取神器的价格
- `getWarMachine()`: 纯虚函数，获取与此神器关联的战争机器生物ID（如果不是战争机器则返回无效ID）
- `getDescriptionTranslated()`: 纯虚函数，获取翻译后的神器描述
- `getEventTranslated()`: 纯虚函数，获取翻译后的神器事件文本
- `getDescriptionTextID()`: 纯虚函数，获取神器描述的文本ID
- `getEventTextID()`: 纯虚函数，获取神器事件的文本ID