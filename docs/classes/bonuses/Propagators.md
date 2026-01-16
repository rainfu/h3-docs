# Propagators相关类

Propagators相关类是VCMI奖励系统中的传播器组件，用于定义奖励如何在奖励系统节点之间传播。这些类控制奖励传播的规则和范围。

## 类定义

```cpp
extern DLL_LINKAGE const std::map<std::string, TPropagatorPtr> bonusPropagatorMap; // 奖励传播器映射

class DLL_LINKAGE IPropagator : public Serializeable
{
public:
    virtual ~IPropagator() = default;
    
    virtual bool shouldBeAttached(CBonusSystemNode *dest) const; // 判断是否应附加到目标节点
    virtual BonusNodeType getPropagatorType() const;            // 获取传播器类型

    template <typename Handler> void serialize(Handler &h);     // 序列化函数
};

class DLL_LINKAGE CPropagatorNodeType : public IPropagator
{
    BonusNodeType nodeType;                                    // 节点类型

public:
    CPropagatorNodeType(BonusNodeType NodeType = BonusNodeType::UNKNOWN); // 构造函数
    bool shouldBeAttached(CBonusSystemNode *dest) const override;         // 判断是否应附加到目标节点
    BonusNodeType getPropagatorType() const override;                     // 获取传播器类型

    template <typename Handler> void serialize(Handler &h);               // 序列化函数
};
```

## 功能说明

Propagators相关类是VCMI奖励系统中的传播器组件，用于控制奖励如何在奖励系统节点之间传播。传播器决定了奖励应该应用到哪些节点，以及传播的范围和方式。

## IPropagator基类

IPropagator是所有传播器的抽象基类，定义了传播器的基本接口。它提供了两个关键的虚函数：

- `shouldBeAttached`: 判断奖励是否应该附加到指定的目标节点
- `getPropagatorType`: 获取传播器的节点类型

## CPropagatorNodeType类

CPropagatorNodeType是IPropagator的一个具体实现，根据节点类型来决定奖励的传播。它使用一个BonusNodeType类型的值来指定奖励应该传播到哪种类型的节点。

### 方法说明

- `CPropagatorNodeType`: 构造函数，接受一个可选的节点类型参数，默认为UNKNOWN
- `shouldBeAttached`: 根据目标节点的类型判断是否应该附加奖励
- `getPropagatorType`: 返回传播器的节点类型

## 设计说明

传播器系统是奖励系统的关键组成部分，它允许奖励在系统节点之间灵活传播。通过使用不同类型的传播器，系统可以实现不同级别的奖励应用，例如：

- 仅应用于特定类型的节点（如英雄、生物、军队等）
- 按照预定义的层次结构传播奖励
- 控制奖励的影响范围

这种设计使得奖励系统具有高度的灵活性和可扩展性，可以适应各种不同的游戏机制和规则。