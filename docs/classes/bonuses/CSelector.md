# CSelector类

CSelector类是VCMI奖励系统中的选择器类，用于筛选和过滤奖励对象。

## 类定义

```cpp
class CSelector : std::function<bool(const Bonus*)>
{
    using TBase = std::function<bool(const Bonus*)>;
public:
    CSelector() = default;
    template<typename T>
    CSelector(const T &t,    // SFINAE技巧 -> 仅当参数是类时才将此构造函数包含在重载解析中
                            // （包括仿函数、lambda）或函数。没有这个，VC会因歧义而疯狂。
        typename std::enable_if_t < std::is_class_v<T> || std::is_function_v<T> > *dummy = nullptr)
        : TBase(t)
    {}

    CSelector(std::nullptr_t)
    {}

    CSelector And(CSelector rhs) const
    {
        // lambda可能比"this"活得更久（它甚至可能是临时的）=> 我们复制对象（不是指针）
        auto thisCopy = *this;
        return [thisCopy, rhs](const Bonus *b) mutable { return thisCopy(b) && rhs(b); };
    }
    CSelector Or(CSelector rhs) const
    {
        auto thisCopy = *this;
        return [thisCopy, rhs](const Bonus *b) mutable { return thisCopy(b) || rhs(b); };
    }

    CSelector Not() const
    {
        auto thisCopy = *this;
        return [thisCopy](const Bonus *b) mutable { return !thisCopy(b); };
    }

    bool operator()(const Bonus *b) const
    {
        return TBase::operator()(b);
    }

    operator bool() const
    {
        return !!static_cast<const TBase&>(*this);
    }
};

template<typename T>
class CSelectFieldEqual
{
    T Bonus::*ptr;

public:
    CSelectFieldEqual(T Bonus::*Ptr)
        : ptr(Ptr)
    {
    }

    CSelector operator()(const T &valueToCompareAgainst) const
    {
        auto ptr2 = ptr; //我们需要COPY因为不想引用this（可能被lambda超出生命周期）
        return [ptr2, valueToCompareAgainst](const Bonus *bonus)
        {
            return bonus->*ptr2 == valueToCompareAgainst;
        };
    }
};

class DLL_LINKAGE CWillLastTurns
{
    int turnsRequested;
public:
    CWillLastTurns(int turnsRequested):
        turnsRequested(turnsRequested)
    {}

    bool operator()(const Bonus *bonus) const
    {
        return turnsRequested <= 0                    //每个当前效果将持续零（或"更少"）回合
            || !Bonus::NTurns(bonus) //所以每个不会在N回合后过期的效果也是如此
            || bonus->turnsRemain > turnsRequested;
    }
};

class DLL_LINKAGE CWillLastDays
{
    int daysRequested;

public:
    CWillLastDays(int daysRequested):
        daysRequested(daysRequested)
    {}

    bool operator()(const Bonus *bonus) const
    {
        if(daysRequested <= 0 || Bonus::Permanent(bonus) || Bonus::OneBattle(bonus))
            return true;
        else if(Bonus::OneDay(bonus))
            return false;
        else if(Bonus::NDays(bonus) || Bonus::OneWeek(bonus))
        {
            return bonus->turnsRemain > daysRequested;
        }
        return false; // TODO: ONE_WEEK 需要对turnsRemain的支持，但现在我们排除所有未处理的持续时间
    }
};

namespace Selector
{
    extern DLL_LINKAGE const CSelectFieldEqual<BonusType> & type();
    extern DLL_LINKAGE const CSelectFieldEqual<BonusSubtypeID> & subtype();
    extern DLL_LINKAGE const CSelectFieldEqual<CAddInfo> & info();
    extern DLL_LINKAGE const CSelectFieldEqual<BonusSource> & sourceType();
    extern DLL_LINKAGE const CSelectFieldEqual<BonusSource> & targetSourceType();
    extern DLL_LINKAGE const CSelectFieldEqual<BonusLimitEffect> & effectRange();
    CWillLastTurns DLL_LINKAGE turns(int turns);
    CWillLastDays DLL_LINKAGE days(int days);

    CSelector DLL_LINKAGE typeSubtype(BonusType Type, BonusSubtypeID Subtype);
    CSelector DLL_LINKAGE typeSubtypeInfo(BonusType type, BonusSubtypeID subtype, const CAddInfo & info);
    CSelector DLL_LINKAGE source(BonusSource source, BonusSourceID sourceID);
    CSelector DLL_LINKAGE sourceTypeSel(BonusSource source);
    CSelector DLL_LINKAGE valueType(BonusValueType valType);
    CSelector DLL_LINKAGE typeSubtypeValueType(BonusType Type, BonusSubtypeID Subtype, BonusValueType valType);

    /**
     * 选择所有奖励
     * 使用示例: Selector::all.And(<functor>).And(<functor>)...)
     */
    extern DLL_LINKAGE CSelector all;

    /**
     * 什么都不选择
     * 使用示例: Selector::none.Or(<functor>).Or(<functor>)...)
     */
    extern DLL_LINKAGE CSelector none;
}
```

## 功能说明

CSelector是VCMI奖励系统中的选择器类，用于筛选和过滤奖励对象。它本质上是一个函数对象，接受一个[Bonus](./Bonus.md)指针并返回布尔值，指示该奖励是否满足特定条件。该类支持逻辑运算（And、Or、Not），允许组合多个选择条件。

## 依赖关系

- [Bonus](./Bonus.md): 奖励类
- STL库: function, enable_if_t等
- 其他奖励系统相关类型

## 函数注释

- `CSelector()`: 默认构造函数，创建空的选择器
- `CSelector(t)`: 模板构造函数，从函数对象或函数创建选择器
- `CSelector(nullptr_t)`: 从空指针创建选择器
- `And(rhs)`: 逻辑与操作，返回同时满足两个条件的选择器
- `Or(rhs)`: 逻辑或操作，返回满足任一条件的选择器
- `Not()`: 逻辑非操作，返回条件相反的选择器
- `operator()(b)`: 函数调用操作符，检查奖励是否满足条件
- `operator bool()`: 布尔转换操作符，检查选择器是否有效

## 选择器工具类

- `CSelectFieldEqual`: 模板类，用于创建字段相等比较的选择器
- `CWillLastTurns`: 检查奖励是否将持续指定回合数
- `CWillLastDays`: 检查奖励是否将持续指定天数

## 选择器命名空间

Selector命名空间提供了许多预定义的选择器工厂函数，如[type](./Bonus.md#type)、[subtype](./Bonus.md#subtype)、[info](./Bonus.md#info)等，用于方便地创建特定类型的选择器。