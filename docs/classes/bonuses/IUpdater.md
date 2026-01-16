# IUpdater接口

IUpdater接口是VCMI奖励系统中的更新器接口，用于在特定事件发生时更新奖励值。

## 类定义

```cpp
// 用于基于某些事件更新奖励的观察者（例如英雄获得等级）

class DLL_LINKAGE IUpdater : public Serializeable
{
public:
    virtual ~IUpdater() = default;

    virtual std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const;
    virtual std::string toString() const;
    virtual JsonNode toJsonNode() const;

    template <typename Handler> void serialize(Handler & h)
    {
    }
};

class DLL_LINKAGE GrowsWithLevelUpdater : public IUpdater
{
public:
    int valPer20 = 0;
    int stepSize = 1;

    GrowsWithLevelUpdater() = default;
    GrowsWithLevelUpdater(int valPer20, int stepSize = 1);

    template <typename Handler> void serialize(Handler & h)
    {
        h & static_cast<IUpdater &>(*this);
        h & valPer20;
        h & stepSize;
    }

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;
};

class DLL_LINKAGE TimesHeroLevelUpdater : public IUpdater
{
    int stepSize = 1;
public:
    TimesHeroLevelUpdater() = default;
    TimesHeroLevelUpdater(int stepSize)
        : stepSize(stepSize)
    {
        assert(stepSize > 0);
    }

    template <typename Handler> void serialize(Handler & h)
    {
        h & static_cast<IUpdater &>(*this);
        if (h.hasFeature(Handler::Version::UNIVERSITY_CONFIG))
            h & stepSize;
    }

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;
};

class DLL_LINKAGE TimesStackSizeUpdater : public IUpdater
{
    std::shared_ptr<Bonus> apply(const std::shared_ptr<Bonus> & b, int count) const;

    int minimum = std::numeric_limits<int>::min();
    int maximum = std::numeric_limits<int>::max();
    int stepSize = 1;
public:
    TimesStackSizeUpdater() = default;
    TimesStackSizeUpdater(int minimum, int maximum, int stepSize)
        : minimum(minimum)
        , maximum(maximum)
        , stepSize(stepSize)
    {}

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler & h)
    {
        h & static_cast<IUpdater &>(*this);
        h & minimum;
        h & maximum;
        h & stepSize;
    }
};

class DLL_LINKAGE TimesArmySizeUpdater : public IUpdater
{
public:
    int minimum = std::numeric_limits<int>::min();
    int maximum = std::numeric_limits<int>::max();
    int stepSize = 1;
    int filteredLevel = -1;
    CreatureID filteredCreature;
    FactionID filteredFaction;
    TimesArmySizeUpdater() = default;

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;

    template <typename Handler> void serialize(Handler & h)
    {
        h & static_cast<IUpdater &>(*this);
        h & minimum;
        h & maximum;
        h & stepSize;
        h & filteredLevel;
        h & filteredCreature;
        h & filteredFaction;
    }
};

class DLL_LINKAGE TimesStackLevelUpdater : public IUpdater
{
    std::shared_ptr<Bonus> apply(const std::shared_ptr<Bonus> & b, int level) const;

public:
    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;
};

class DLL_LINKAGE DivideStackLevelUpdater : public IUpdater
{
    std::shared_ptr<Bonus> apply(const std::shared_ptr<Bonus> & b, int level) const;

public:
    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;
};

class DLL_LINKAGE TimesHeroLevelDivideStackLevelUpdater : public TimesHeroLevelUpdater
{
    std::shared_ptr<DivideStackLevelUpdater> divideStackLevel;
public:
    template <typename Handler> void serialize(Handler & h)
    {
        h & static_cast<TimesHeroLevelUpdater &>(*this);
        h & divideStackLevel;
    }

    TimesHeroLevelDivideStackLevelUpdater()
        : divideStackLevel(std::make_shared<DivideStackLevelUpdater>())
    {}

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;
};

class DLL_LINKAGE OwnerUpdater : public IUpdater
{
public:
    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus>& b, const CBonusSystemNode& context) const override;
    std::string toString() const override;
    JsonNode toJsonNode() const override;
};
```

## 功能说明

IUpdater是VCMI奖励系统中的更新器接口，用于在特定事件发生时动态更新奖励值。例如，当英雄升级时，某些奖励可能需要根据英雄的新等级进行调整。IUpdater的各种实现类提供了不同的更新策略，如随等级增长、与堆栈大小相关等。

## 依赖关系

- [Serializeable](../serializer/Serializeable.md): 可序列化接口
- [CBonusSystemNode](./CBonusSystemNode.md): 奖励系统节点
- [Bonus](./Bonus.md): 奖励类
- STL库: shared_ptr等

## 函数注释

### IUpdater接口

- `~IUpdater()`: 虚析构函数，确保派生类正确销毁
- `createUpdatedBonus(b, context)`: 根据上下文创建更新后的奖励
- `toString()`: 返回更新器的字符串表示
- `toJsonNode()`: 返回更新器的JSON节点表示
- `serialize(h)`: 序列化方法

### 具体更新器类

- `GrowsWithLevelUpdater`: 随等级增长的更新器，按每20级增加指定值
- `TimesHeroLevelUpdater`: 基于英雄等级倍增的更新器
- `TimesStackSizeUpdater`: 基于堆栈大小倍增的更新器，有最小最大值限制
- `TimesArmySizeUpdater`: 基于军队规模倍增的更新器
- `TimesStackLevelUpdater`: 基于堆栈等级倍增的更新器
- `DivideStackLevelUpdater`: 基于堆栈等级除法的更新器
- `TimesHeroLevelDivideStackLevelUpdater`: 结合英雄等级乘法和堆栈等级除法的更新器
- `OwnerUpdater`: 基于拥有者的更新器