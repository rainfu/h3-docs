# CPropagatorNodeType类

CPropagatorNodeType类是VCMI奖励系统中基于节点类型的传播器实现类，用于控制奖励如何根据节点类型传播到奖励系统节点。

## 类定义

```cpp
class DLL_LINKAGE CPropagatorNodeType : public IPropagator
{
    BonusNodeType nodeType;

public:
    CPropagatorNodeType(BonusNodeType NodeType = BonusNodeType::UNKNOWN);
    bool shouldBeAttached(CBonusSystemNode *dest) const override;
    BonusNodeType getPropagatorType() const override;

    template <typename Handler> void serialize(Handler &h)
    {
        h & nodeType;
    }
};
```

## 功能说明

CPropagatorNodeType是VCMI奖励系统中IPropagator接口的具体实现之一，它根据节点类型来决定奖励的传播行为。该类用于确定奖励是否应该附加到特定类型的奖励系统节点上，从而控制奖励在整个系统中的传播范围。

## 依赖关系

- [IPropagator](./IPropagator.md): 传播器接口
- [CBonusSystemNode](./CBonusSystemNode.md): 奖励系统节点
- [BonusNodeType](./BonusNodeType.md): 奖励节点类型
- STL库: 序列化相关

## 构造函数

- `CPropagatorNodeType(NodeType)`: 构造函数，使用指定的节点类型创建传播器，默认为UNKNOWN类型

## 函数注释

- `shouldBeAttached(dest)`: 重写父类方法，根据节点类型判断奖励是否应该附加到目标节点
- `getPropagatorType()`: 重写父类方法，获取传播器的节点类型
- `serialize(h)`: 序列化方法，用于保存和加载传播器的节点类型