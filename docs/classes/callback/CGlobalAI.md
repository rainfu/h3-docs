# CGlobalAI类

CGlobalAI类是VCMI系统中的全局AI基类，用于实现AI逻辑。它继承自CGameInterface，为AI提供游戏交互能力。

## 类定义

```cpp
class DLL_LINKAGE CGlobalAI : public CGameInterface // AI类（用于继承）
{
public:
    std::shared_ptr<Environment> env;  // 环境智能指针
    CGlobalAI();                      // 构造函数
};
```

## 功能说明

CGlobalAI类是VCMI系统中AI实现的基类，作为所有AI实现的起点。它继承自CGameInterface，因此具备处理游戏事件和与游戏交互的能力。

这个类的设计目的是为AI开发者提供一个基础框架，让他们可以专注于AI逻辑的实现，而不必担心底层的游戏接口实现。

## 成员变量

- `env`: 指向Environment的智能指针，提供AI与游戏环境交互的能力

## 构造函数

- `CGlobalAI()`: 默认构造函数，初始化CGlobalAI实例

## 设计说明

CGlobalAI类的设计体现了以下特点：

1. **继承设计**: 继承自CGameInterface，自动获得处理游戏事件和玩家交互的能力
2. **环境访问**: 通过env成员变量提供对游戏环境的访问
3. **扩展性**: 作为一个基类，允许派生类实现特定的AI逻辑
4. **简单性**: 接口相对简洁，易于理解和扩展

CGlobalAI是AI实现的起点，实际的AI逻辑通常通过继承此类并实现其中的虚函数来完成。它为AI提供了与游戏世界交互的基础能力，包括处理英雄移动、战斗决策、资源管理等各种游戏事件。

所有AI实现都应该从这个类继承，并根据需要实现特定的游戏策略和决策逻辑。