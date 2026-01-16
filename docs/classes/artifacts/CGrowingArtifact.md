# CGrowingArtifact类

CGrowingArtifact类是VCMI中成长型神器的实现类，用于处理随等级提升而增强的神器。

## 类定义

```cpp
class DLL_LINKAGE CGrowingArtifact
{
protected:
    CGrowingArtifact() = default;

    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> bonusesPerLevel; // 每n级给予的奖励
    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> thresholdBonuses; // 达到特定等级后一次性添加的奖励
public:
    bool isGrowing() const;

    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getBonusesPerLevel();
    const std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getBonusesPerLevel() const;
    std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getThresholdBonuses();
    const std::vector<std::pair<ui16, std::shared_ptr<Bonus>>> & getThresholdBonuses() const;
};
```

## 功能说明

CGrowingArtifact是VCMI神器系统中处理成长型神器的实现类，用于表示随英雄等级提升而增强的神器。这类神器在英雄达到特定等级时会提供额外的奖励，包括每N级给予的奖励和达到特定等级后一次性添加的奖励。该类管理这两种类型的等级奖励。

## 依赖关系

- [Bonus](../bonuses/Bonus.md): 奖励类
- STL库: vector, pair, shared_ptr

## 构造函数

- `CGrowingArtifact()`: 保护默认构造函数

## 函数注释

- `isGrowing()`: 检查神器是否为成长型
- `getBonusesPerLevel()`: 获取每N级给予的奖励列表（非const引用）
- `getBonusesPerLevel() const`: 获取每N级给予的奖励列表（const引用）
- `getThresholdBonuses()`: 获取阈值奖励列表（非const引用）
- `getThresholdBonuses() const`: 获取阈值奖励列表（const引用）