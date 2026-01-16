# IUnitInfo接口

IUnitInfo接口是VCMI战斗系统中用于获取战斗单位信息的接口，定义了获取单位基本信息的方法。

## 接口定义

```cpp
class DLL_LINKAGE IUnitEnvironment
{
public:
    virtual bool unitHasAmmoCart(const Unit * unit) const = 0; // 检查单位是否有弹药车
    virtual PlayerColor unitEffectiveOwner(const Unit * unit) const = 0; // 获取单位的实际所有者
};

class DLL_LINKAGE IUnitInfo
{
public:
    virtual int32_t unitBaseAmount() const = 0; // 获取单位基础数量

    virtual uint32_t unitId() const = 0;        // 获取单位ID
    virtual BattleSide unitSide() const = 0;    // 获取单位阵营
    virtual PlayerColor unitOwner() const = 0;  // 获取单位所有者
    virtual SlotID unitSlot() const = 0;        // 获取单位槽位

    virtual const CCreature * unitType() const = 0; // 获取单位类型
};
```

## 功能说明

IUnitInfo是VCMI战斗系统中用于获取战斗单位基本信息的接口。它提供了访问单位标识、阵营、所有者、槽位和类型等基本信息的方法。该接口与IUnitEnvironment一起，为战斗单位提供了一个通用的信息访问层。

## IUnitEnvironment函数注释

- `unitHasAmmoCart(unit)`: 检查指定单位是否拥有弹药车，返回布尔值
- `unitEffectiveOwner(unit)`: 获取指定单位的实际所有者颜色

## IUnitInfo函数注释

- `unitBaseAmount()`: 获取单位的基础数量，返回32位整数
- `unitId()`: 获取单位的唯一ID，返回32位无符号整数
- `unitSide()`: 获取单位所属的阵营，返回BattleSide枚举值
- `unitOwner()`: 获取单位的所有者，返回PlayerColor枚举值
- `unitSlot()`: 获取单位所在的槽位，返回SlotID枚举值
- `unitType()`: 获取单位的类型，返回CCreature类型的常量指针

## 设计说明

IUnitInfo接口是战斗系统中单位信息访问的基础接口，它将单位的基本信息访问标准化，使得不同类型的战斗单位可以通过统一的接口提供信息。IUnitEnvironment则提供了单位环境相关的信息，如弹药车的存在和实际所有者。

这种设计使得战斗逻辑可以与具体单位实现解耦，只需要通过接口访问单位信息，而不需要知道单位的具体实现细节。