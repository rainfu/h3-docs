# ACreature类

ACreature类是VCMI中抽象生物类，为生物和战斗堆栈提供基础功能。

## 类定义

```cpp
/// 用于生物和战斗堆栈的基类
class DLL_LINKAGE ACreature: public AFactionMember
{
public:
    bool isLiving() const; //非亡灵，非非生命或活着
    virtual ui32 getMovementRange(int turn) const; //获取考虑所有修正的生物速度（移动格数）
    virtual ui32 getMovementRange() const; //获取考虑所有修正的生物速度（移动格数）
    virtual ui32 getMaxHealth() const; //获取考虑所有修正的堆栈最大生命值
    virtual int32_t getInitiative(int turn = 0) const;
};
```

## 功能说明

ACreature是VCMI生物系统中的抽象基类，为生物和战斗堆栈提供基础功能。它继承自AFactionMember，因此具备派系相关的功能。这个类定义了生物的基本行为特征，如移动范围、生命值和主动性，这些是生物在战斗和地图移动中所需的核心属性。

## 依赖关系

- [AFactionMember](./AFactionMember.md): 派系成员基类
- STL库: 基本数据类型

## 函数注释

- `isLiving()`: 检查生物是否为活物（非亡灵，非无生命单位）
- `getMovementRange(turn)`: 虚函数，获取指定回合的移动范围（以格为单位），考虑所有修饰符
- `getMovementRange()`: 虚函数，获取当前移动范围（以格为单位），考虑所有修饰符
- `getMaxHealth()`: 虚函数，获取最大生命值，考虑所有修饰符
- `getInitiative(turn)`: 虚函数，获取指定回合的主动性（决定行动顺序）