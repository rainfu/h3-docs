# Updaters相关类

Updaters相关类是VCMI奖励系统中的更新器组件，用于根据某些事件（如英雄升级）动态更新奖励值。这些类提供了奖励动态调整的机制。

## 类定义

```cpp
// 观察者用于根据某些事件更新奖励（例如英雄获得等级）

class DLL_LINKAGE IUpdater : public Serializeable
{
public:
    virtual ~IUpdater() = default;

    virtual std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const; // 创建更新后的奖励
    virtual std::string toString() const;       // 转换为字符串
    virtual JsonNode toJsonNode() const;       // 转换为JSON节点

    template <typename Handler> void serialize(Handler & h); // 序列化函数
};

class DLL_LINKAGE GrowsWithLevelUpdater : public IUpdater
{
public:
    int valPer20 = 0;                         // 每20级的增加值
    int stepSize = 1;                         // 步长

    GrowsWithLevelUpdater() = default;
    GrowsWithLevelUpdater(int valPer20, int stepSize = 1); // 构造函数

    template <typename Handler> void serialize(Handler & h); // 序列化函数

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override; // 创建更新后的奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点
};

class DLL_LINKAGE TimesHeroLevelUpdater : public IUpdater
{
    int stepSize = 1;                         // 步长
public:
    TimesHeroLevelUpdater() = default;
    TimesHeroLevelUpdater(int stepSize);      // 构造函数

    template <typename Handler> void serialize(Handler & h); // 序列化函数

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override; // 创建更新后的奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点
};

class DLL_LINKAGE TimesStackSizeUpdater : public IUpdater
{
    std::shared_ptr<Bonus> apply(const std::shared_ptr<Bonus> & b, int count) const; // 应用堆栈大小

    int minimum = std::numeric_limits<int>::min(); // 最小值
    int maximum = std::numeric_limits<int>::max(); // 最大值
    int stepSize = 1;                         // 步长
public:
    TimesStackSizeUpdater() = default;
    TimesStackSizeUpdater(int minimum, int maximum, int stepSize); // 构造函数

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override; // 创建更新后的奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler & h); // 序列化函数
};

class DLL_LINKAGE TimesArmySizeUpdater : public IUpdater
{
public:
    int minimum = std::numeric_limits<int>::min(); // 最小值
    int maximum = std::numeric_limits<int>::max(); // 最大值
    int stepSize = 1;                         // 步长
    int filteredLevel = -1;                   // 过滤等级
    CreatureID filteredCreature;              // 过滤生物
    factionID filteredFaction;                // 过滤派系
    TimesArmySizeUpdater() = default;         // 构造函数

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override; // 创建更新后的奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点

    template <typename Handler> void serialize(Handler & h); // 序列化函数
};

class DLL_LINKAGE TimesStackLevelUpdater : public IUpdater
{
    std::shared_ptr<Bonus> apply(const std::shared_ptr<Bonus> & b, int level) const; // 应用堆栈等级

public:
    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override; // 创建更新后的奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点
};

class DLL_LINKAGE DivideStackLevelUpdater : public IUpdater
{
    std::shared_ptr<Bonus> apply(const std::shared_ptr<Bonus> & b, int level) const; // 应用堆栈等级

public:
    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override; // 创建更新后的奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点
};

class DLL_LINKAGE TimesHeroLevelDivideStackLevelUpdater : public TimesHeroLevelUpdater
{
    std::shared_ptr<DivideStackLevelUpdater> divideStackLevel; // 除以堆栈等级

public:
    template <typename Handler> void serialize(Handler & h); // 序列化函数

    TimesHeroLevelDivideStackLevelUpdater();  // 构造函数

    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & context) const override; // 创建更新后的奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点
};

class DLL_LINKAGE OwnerUpdater : public IUpdater
{
public:
    std::shared_ptr<Bonus> createUpdatedBonus(const std::shared_ptr<Bonus>& b, const CBonusSystemNode& context) const override; // 创建更新后的奖励
    std::string toString() const override;     // 转换为字符串
    JsonNode toJsonNode() const override;     // 转换为JSON节点
};
```

## 功能说明

Updaters相关类是VCMI奖励系统中的更新器组件，用于根据某些游戏事件（如英雄升级、堆栈大小变化等）动态调整奖励的数值。这些类实现了奖励的动态行为，使得奖励值可以根据游戏状态的变化而更新。

## IUpdater基类

IUpdater是所有更新器的抽象基类，定义了更新器的基本接口。它提供了一个createUpdatedBonus方法，该方法接收原始奖励和上下文信息，返回更新后的奖励。

## 更新器类型

### 等级相关更新器

- `GrowsWithLevelUpdater`: 根据等级增长奖励，每20级增加指定值
- `TimesHeroLevelUpdater`: 根据英雄等级倍增奖励值
- `TimesStackLevelUpdater`: 根据堆栈等级倍增奖励值
- `DivideStackLevelUpdater`: 用堆栈等级除奖励值
- `TimesHeroLevelDivideStackLevelUpdater`: 结合英雄等级倍增和堆栈等级除法

### 数量相关更新器

- `TimesStackSizeUpdater`: 根据堆栈大小倍增奖励值
- `TimesArmySizeUpdater`: 根据军队规模倍增奖励值

### 其他更新器

- `OwnerUpdater`: 根据拥有者更新奖励

## 设计说明

更新器系统使得奖励系统更加动态和灵活。通过使用不同的更新器，奖励可以根据游戏状态的变化自动调整其数值。例如，一个随英雄等级增长的奖励可以通过GrowsWithLevelUpdater实现，或者一个根据堆栈大小变化的奖励可以通过TimesStackSizeUpdater实现。

每个更新器都有自己的逻辑来计算新的奖励值，这使得系统能够处理各种复杂的动态奖励场景。更新器与奖励关联，当相关事件发生时，系统会使用适当的更新器来计算奖励的新值。