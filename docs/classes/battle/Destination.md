# Destination类

Destination类是VCMI战斗系统中表示目标位置或目标单位的数据结构，用于定义攻击、移动或其他战斗动作的目标。

## 类定义

```cpp
class DLL_LINKAGE Destination
{
public:
    Destination();                                   // 默认构造函数
    ~Destination() = default;                       // 析构函数
    explicit Destination(const Unit * destination);  // 用单位构造
    explicit Destination(const BattleHex & destination); // 用战场格子构造
    explicit Destination(const Unit * destination, const BattleHex & exactHex); // 用单位和精确格子构造

    Destination(const Destination & other) = default; // 拷贝构造函数
    Destination & operator=(const Destination & other) = default; // 赋值运算符

    const Unit * unitValue;  // 目标单位指针
    BattleHex hexValue;      // 目标格子值
};

using Target = std::vector<Destination>; // 目标类型定义为Destination的向量
```

## 功能说明

Destination类是VCMI战斗系统中用于表示战斗动作目标的数据结构。它可以指向一个特定的战斗单位，也可以指向一个战场格子，或者同时包含单位和精确格子信息。这个类主要用于战斗动作（如攻击、技能释放等）中指定目标。

## 构造函数

- `Destination()`: 默认构造函数，创建一个空的目标
- `Destination(const Unit * destination)`: 显式构造函数，用一个单位指针构造目标
- `Destination(const BattleHex & destination)`: 显式构造函数，用一个战场格子构造目标
- `Destination(const Unit * destination, const BattleHex & exactHex)`: 显式构造函数，同时指定单位和精确格子
- `Destination(const Destination & other)`: 拷贝构造函数

## 成员变量

- `unitValue`: 指向目标单位的常量指针，如果目标不是特定单位则为nullptr
- `hexValue`: 目标战场格子，表示目标的具体位置

## 类型别名

- `Target`: 一个Destination向量的类型别名，用于表示多个目标的集合

## 运算符

- `operator=`: 赋值运算符，允许将一个Destination对象赋值给另一个

## 设计说明

Destination类设计为轻量级的数据结构，用于在战斗系统中灵活表示各种类型的目标。它可以单独指向一个单位、一个格子，或者同时包含单位和精确位置信息，这使其能够满足不同战斗动作的需求。

Target类型别名为战斗动作可能涉及多个目标的情况提供了便利，例如范围攻击或群体治疗等技能。