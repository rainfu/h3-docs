# IObjectInfo

## 源文件

[IObjectInfo.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/IObjectInfo.h)

## 类定义

```cpp
class DLL_LINKAGE IObjectInfo
```

`IObjectInfo` 是一个接口类，提供地图对象信息的查询功能。主要用于检查对象是否提供各种类型的奖励或有守卫。

## 内部结构体

### CArmyStructure

```cpp
struct CArmyStructure
{
    ui32 totalStrength;
    ui32 shootersStrength;
    ui32 flyersStrength;
    ui32 walkersStrength;
};
```

军队结构信息，包含军队的总强度和不同类型的强度。

**构造函数:**
- `CArmyStructure()` - 默认构造函数，初始化所有强度为0

**运算符:**
- `bool operator <(const CArmyStructure & other) const` - 比较运算符，按总强度比较

## 方法

### 奖励查询方法

所有方法都是虚函数，默认返回 `false`，子类可以重写以提供具体实现：

- `virtual bool givesResources() const` - 是否提供资源
- `virtual bool givesExperience() const` - 是否提供经验
- `virtual bool givesMana() const` - 是否提供法力
- `virtual bool givesMovement() const` - 是否提供移动点
- `virtual bool givesPrimarySkills() const` - 是否提供主要技能
- `virtual bool givesSecondarySkills() const` - 是否提供次要技能
- `virtual bool givesArtifacts() const` - 是否提供神器
- `virtual bool givesCreatures() const` - 是否提供生物
- `virtual bool givesSpells() const` - 是否提供法术
- `virtual bool givesBonuses() const` - 是否提供加成

### 守卫查询方法

- `virtual bool hasGuards() const` - 是否有守卫

### 析构函数

- `virtual ~IObjectInfo() = default` - 虚析构函数

## 设计特点

- **接口设计**: 纯接口类，所有方法都是虚函数
- **奖励系统**: 提供全面的奖励类型查询
- **守卫系统**: 支持检查对象是否有守卫
- **军队分析**: 包含军队结构分析的辅助结构体
- **可扩展性**: 子类可以重写任何方法以提供具体实现