# BonusSelector相关类

BonusSelector相关类是VCMI奖励系统中用于筛选和过滤奖励的工具集，提供了灵活的奖励查询机制。

## 类定义

```cpp
class CSelector : std::function<bool(const Bonus*)>
{
    using TBase = std::function<bool(const Bonus*)>;
public:
    CSelector() = default;
    template<typename T>
    CSelector(const T &t,    // SFINAE技巧 -> 只有当参数是类（包括函数对象、lambda）或函数时才包含此构造函数
                            // (包括函数对象、lambda)或函数。没有这个技巧，VC会对歧义感到困惑。
        typename std::enable_if_t < std::is_class_v<T> || std::is_function_v<T> > *dummy = nullptr);

    CSelector(std::nullptr_t);  // 用空指针构造

    CSelector And(CSelector rhs) const;  // 与操作
    CSelector Or(CSelector rhs) const;   // 或操作
    CSelector Not() const;               // 非操作

    bool operator()(const Bonus *b) const;  // 调用操作符
    operator bool() const;                  // 布尔转换操作符
};

template<typename T>
class CSelectFieldEqual
{
    T Bonus::*ptr;  // 指向Bonus类中字段的指针

public:
    CSelectFieldEqual(T Bonus::*Ptr);  // 构造函数

    CSelector operator()(const T &valueToCompareAgainst) const;  // 生成选择器
};

class DLL_LINKAGE CWillLastTurns
{
    int turnsRequested;  // 请求的回合数
public:
    CWillLastTurns(int turnsRequested);  // 构造函数

    bool operator()(const Bonus *bonus) const;  // 检查奖励是否会持续指定回合
};

class DLL_LINKAGE CWillLastDays
{
    int daysRequested;  // 请求的天数

public:
    CWillLastDays(int daysRequested);  // 构造函数

    bool operator()(const Bonus *bonus) const;  // 检查奖励是否会持续指定天数
};

namespace Selector
{
    extern DLL_LINKAGE const CSelectFieldEqual<BonusType> & type();  // 按类型选择
    extern DLL_LINKAGE const CSelectFieldEqual<BonusSubtypeID> & subtype();  // 按子类型选择
    extern DLL_LINKAGE const CSelectFieldEqual<CAddInfo> & info();  // 按附加信息选择
    extern DLL_LINKAGE const CSelectFieldEqual<BonusSource> & sourceType();  // 按来源类型选择
    extern DLL_LINKAGE const CSelectFieldEqual<BonusSource> & targetSourceType();  // 按目标来源类型选择
    extern DLL_LINKAGE const CSelectFieldEqual<BonusLimitEffect> & effectRange();  // 按效果范围选择
    
    CWillLastTurns DLL_LINKAGE turns(int turns);  // 持续指定回合的选择器
    CWillLastDays DLL_LINKAGE days(int days);     // 持续指定天数的选择器

    CSelector DLL_LINKAGE typeSubtype(BonusType Type, BonusSubtypeID Subtype);  // 类型和子类型组合选择器
    CSelector DLL_LINKAGE typeSubtypeInfo(BonusType type, BonusSubtypeID subtype, const CAddInfo & info);  // 类型、子类型和信息组合选择器
    CSelector DLL_LINKAGE source(BonusSource source, BonusSourceID sourceID);  // 来源选择器
    CSelector DLL_LINKAGE sourceTypeSel(BonusSource source);  // 来源类型选择器
    CSelector DLL_LINKAGE valueType(BonusValueType valType);  // 值类型选择器
    CSelector DLL_LINKAGE typeSubtypeValueType(BonusType Type, BonusSubtypeID Subtype, BonusValueType valType);  // 类型、子类型和值类型组合选择器

    extern DLL_LINKAGE CSelector all;  // 选择所有奖励
    extern DLL_LINKAGE CSelector none; // 选择无奖励
}
```

## 功能说明

BonusSelector相关类是VCMI奖励系统中的筛选工具集，用于从奖励列表中筛选出满足特定条件的奖励。这套工具提供了灵活的查询机制，支持链式操作和复杂条件的组合。

## CSelector类

CSelector继承自std::function<bool(const Bonus*)>，本质上是一个函数对象，接收一个Bonus指针并返回布尔值表示是否匹配。它提供了以下功能：

- 逻辑运算：And、Or、Not方法用于组合多个选择条件
- 调用操作符：允许像函数一样调用选择器
- 布尔转换：允许将选择器转换为布尔值

## CSelectFieldEqual类

这是一个模板类，用于比较Bonus对象的特定字段与给定值是否相等。它通过指向Bonus类成员的指针来访问字段，并提供一个operator()方法来创建具体的比较选择器。

## CWillLastTurns类

此类用于检查奖励是否将持续指定的回合数。它实现了函数调用操作符，判断一个奖励是否能够持续指定的回合数。

## CWillLastDays类

类似于CWillLastTurns，但用于检查奖励是否将持续指定的天数。它考虑了奖励的持续时间类型，如永久、一天、一周等。

## Selector命名空间

Selector命名空间提供了一系列预定义的选择器，用于常见的筛选需求：

- `type()`: 按奖励类型筛选
- `subtype()`: 按奖励子类型筛选
- `info()`: 按附加信息筛选
- `sourceType()`: 按奖励来源类型筛选
- `turns()`和`days()`: 按持续时间筛选
- `all`和`none`: 通用选择器，分别选择所有和无奖励

## 使用示例

```cpp
// 创建一个选择器，查找所有来自神器的攻击奖励
auto attackFromArtifact = Selector::typeSubtype(BonusType::PRIMARY_SKILL, 
                                               BonusSubtypeID(PrimarySkill::ATTACK))
                          .And(Selector::sourceTypeSel(BonusSource::ARTIFACT));

// 使用选择器从奖励列表中筛选奖励
BonusList filteredList;
originalList.getBonuses(filteredList, attackFromArtifact);

// 组合多个条件
auto complexSelector = Selector::type()(BonusType::MORALE)
                       .And(Selector::subtype()(BonusSubtypeID()))
                       .Or(Selector::type()(BonusType::LUCK));
```

## 设计说明

这套选择器系统的设计遵循了函数式编程的思想，通过函数对象和lambda表达式的组合来实现灵活的筛选逻辑。CSelector的And、Or、Not方法返回新的选择器对象，使得可以构建复杂的筛选条件。

这种设计的优点是高度灵活，可以根据需要组合不同的筛选条件，同时保持代码的可读性和可维护性。通过使用模板和SFINAE技巧，系统还能很好地支持各种自定义筛选函数。