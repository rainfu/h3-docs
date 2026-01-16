# IPropagator接口

IPropagator接口是VCMI奖励系统中的传播器接口，用于控制奖励如何传播到奖励系统节点。

## 类定义

```cpp
extern DLL_LINKAGE const std::map<std::string, TPropagatorPtr> bonusPropagatorMap;

class DLL_LINKAGE IPropagator : public Serializeable
{
public:
    virtual ~IPropagator() = default;
    virtual bool shouldBeAttached(CBonusSystemNode *dest) const;
    virtual BonusNodeType getPropagatorType() const;

    template <typename Handler> void serialize(Handler &h)
    {}
};

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

IPropagator是VCMI奖励系统中的传播器接口，定义了奖励如何传播到奖励系统节点的标准方法。传播器决定了奖励应该附加到哪些节点上，以及奖励的传播范围。CPropagatorNodeType是其具体实现之一，根据节点类型来决定传播行为。

## 依赖关系

- [Serializeable](../serializer/Serializeable.md): 可序列化接口
- [CBonusSystemNode](./CBonusSystemNode.md): 奖励系统节点
- [BonusNodeType](./BonusNodeType.md): 奖励节点类型
- STL库: map等

## 函数注释

- `~IPropagator()`: 虚析构函数，确保派生类正确销毁
- `shouldBeAttached(dest)`: 判断奖励是否应该附加到指定的目标节点
- `getPropagatorType()`: 获取传播器类型
- `serialize(h)`: 序列化方法

### CPropagatorNodeType类

- `CPropagatorNodeType(NodeType)`: 构造函数，使用指定的节点类型创建传播器
- `shouldBeAttached(dest)`: 根据节点类型判断奖励是否应该附加到目标节点
- `getPropagatorType()`: 获取传播器的节点类型