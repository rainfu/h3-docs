# BonusCache相关类

BonusCache相关类是VCMI奖励系统中用于缓存奖励值的组件，用于优化频繁的奖励查询操作，避免重复计算。

## 类定义

```cpp
enum class BonusCacheMode : int8_t
{
    VALUE,      // 缓存奖励的总值
    PRESENCE,   // 缓存奖励的存在状态
};

/// 无自有缓存的内部基类
class BonusCacheBase
{
protected:
    const IBonusBearer * target;  // 目标对象

    explicit BonusCacheBase(const IBonusBearer * target);  // 构造函数

    struct BonusCacheEntry
    {
        std::atomic<int32_t> version = 0;  // 版本号
        std::atomic<int32_t> value = 0;    // 值

        BonusCacheEntry() = default;
        BonusCacheEntry(const BonusCacheEntry & other);
        BonusCacheEntry & operator =(const BonusCacheEntry & other);
    };

    int getBonusValueImpl(BonusCacheEntry & currentValue, const CSelector & selector, BonusCacheMode) const;  // 获取奖励值实现
};

/// 缓存单个查询结果到奖励系统的缓存
class BonusValueCache : public BonusCacheBase
{
    CSelector selector;              // 选择器
    mutable BonusCacheEntry value;   // 缓存值
public:
    BonusValueCache(const IBonusBearer * target, const CSelector & selector);  // 构造函数
    int getValue() const;     // 获取值
    bool hasBonus() const;    // 检查是否有奖励
};

/// 可以跟踪奖励系统查询列表的缓存
template<size_t SIZE>
class BonusValuesArrayCache : public BonusCacheBase
{
public:
    using SelectorsArray = std::array<const CSelector, SIZE>;  // 选择器数组类型

    BonusValuesArrayCache(const IBonusBearer * target, const SelectorsArray * selectors);  // 构造函数

    int getBonusValue(int index) const;  // 获取指定索引的奖励值
    int hasBonus(int index) const;       // 检查指定索引是否有奖励

private:
    using CacheArray = std::array<BonusCacheEntry, SIZE>;  // 缓存数组类型

    const SelectorsArray * selectors;  // 选择器数组
    mutable CacheArray cache;          // 缓存数组
};

class UnitBonusValuesProxy
{
public:
    enum ECacheKeys : int8_t
    {
        TOTAL_ATTACKS_MELEE,     // 近战总攻击次数
        TOTAL_ATTACKS_RANGED,    // 远程总攻击次数

        MIN_DAMAGE_MELEE,        // 近战最小伤害
        MIN_DAMAGE_RANGED,       // 远程最小伤害
        MAX_DAMAGE_MELEE,        // 近战最大伤害
        MAX_DAMAGE_RANGED,       // 远程最大伤害

        ATTACK_MELEE,            // 近战攻击力修正
        ATTACK_RANGED,           // 远程攻击力修正

        DEFENCE_MELEE,           // 近战防御力修正
        DEFENCE_RANGED,          // 远程防御力修正

        IN_FRENZY,               // 处于狂暴状态
        HYPNOTIZED,              // 被催眠
        FORGETFULL,              // 健忘
        HAS_FREE_SHOOTING,       // 拥有自由射击能力
        STACK_HEALTH,            // 堆栈生命值
        INVINCIBLE,              // 无敌

        CLONE_MARKER,            // 克隆标记

        TOTAL_KEYS,              // 总键数
    };
    static constexpr size_t KEYS_COUNT = static_cast<size_t>(ECacheKeys::TOTAL_KEYS);

    using SelectorsArray = BonusValuesArrayCache<KEYS_COUNT>::SelectorsArray;

    UnitBonusValuesProxy(const IBonusBearer * Target);  // 构造函数

    int getBonusValue(ECacheKeys which) const;  // 获取指定类型的奖励值
    int hasBonus(ECacheKeys which) const;       // 检查指定类型是否有奖励

private:
    const SelectorsArray * generateSelectors();  // 生成选择器数组
    BonusValuesArrayCache<KEYS_COUNT> cache;     // 缓存
};

/// 缓存主技能值的奖励系统
class PrimarySkillsCache
{
    const IBonusBearer * target;                           // 目标对象
    mutable std::atomic<int32_t> version = 0;              // 版本号
    mutable std::array<std::atomic<int32_t>, 4> skills;    // 技能数组

    void update() const;  // 更新缓存
public:
    PrimarySkillsCache(const IBonusBearer * target);  // 构造函数

    const std::array<std::atomic<int32_t>, 4> & getSkills() const;  // 获取技能数组
    const std::atomic<int32_t> & getSkill(PrimarySkill id) const;   // 获取指定技能
};

/// 缓存法术学派精通值的奖励系统
class MagicSchoolMasteryCache
{
    const IBonusBearer * target;                           // 目标对象
    mutable std::atomic<int32_t> version = 0;              // 版本号
    mutable std::vector<std::atomic<int32_t>> schools;     // 学派数组

    void update() const;  // 更新缓存
public:
    MagicSchoolMasteryCache(const IBonusBearer * target);  // 构造函数

    int32_t getMastery(const SpellSchool & school) const;  // 获取指定学派的精通等级
};

/// 为不同奖励持续时间值缓存的奖励系统
class BonusCachePerTurn : public BonusCacheBase
{
    static constexpr int cachedTurns = 8;                 // 缓存回合数

    const CSelector selector;                              // 选择器
    mutable TConstBonusListPtr bonusList;                  // 奖励列表
    mutable std::mutex bonusListMutex;                     // 奖励列表互斥锁
    mutable std::atomic<int32_t> bonusListVersion = 0;     // 奖励列表版本
    mutable std::array<BonusCacheEntry, cachedTurns> cache; // 缓存数组
    const BonusCacheMode mode;                             // 缓存模式

    int getValueUncached(int turns) const;  // 获取未缓存的值
public:
    BonusCachePerTurn(const IBonusBearer * target, const CSelector & selector, BonusCacheMode mode);  // 构造函数
    int getValue(int turns) const;  // 获取指定回合数的值
};
```

## 功能说明

BonusCache系列类是VCMI奖励系统中的缓存组件，用于优化频繁的奖励值查询操作。由于奖励系统的计算可能涉及复杂的树形结构和大量遍历，因此引入缓存机制可以显著提升性能。

## 枚举

- `BonusCacheMode`: 缓存模式枚举
  - `VALUE`: 缓存奖励的总值
  - `PRESENCE`: 缓存奖励的存在状态

## 类型别名

- `SelectorsArray`: 选择器数组类型，是一个包含CSelector的固定大小数组
- `CacheArray`: 缓存数组类型，是一个包含BonusCacheEntry的固定大小数组

## BonusCacheBase类

这是所有奖励缓存类的基类，提供了一些基础功能：

- `target`: 指向被缓存对象的指针
- `BonusCacheEntry`: 内部结构体，包含版本号和值的原子变量
- `getBonusValueImpl`: 获取奖励值的实现方法

## BonusValueCache类

缓存单个查询结果到奖励系统的缓存，适用于只需要查询一个特定奖励值的场景。

## BonusValuesArrayCache类

模板类，可以跟踪奖励系统中一系列查询的缓存，适用于需要查询多个相关奖励值的场景。

## UnitBonusValuesProxy类

单元奖励值代理，专门用于缓存单位相关的重要奖励值，如攻击、防御、伤害等，提供便捷的访问接口。

## PrimarySkillsCache类

缓存主技能值的奖励系统，专门用于处理英雄主技能（攻击、防御、法力、知识）的奖励计算。

## MagicSchoolMasteryCache类

缓存法术学派精通值的奖励系统，专门用于处理法术学派（火、水、土、气）精通等级的奖励计算。

## BonusCachePerTurn类

缓存不同回合数的奖励值，适用于有时限的奖励效果。

## 设计说明

整个奖励缓存系统采用分层设计，从通用的基础缓存到特定用途的专业缓存，提供了灵活性和性能的平衡。通过使用原子变量来存储版本号和值，确保了多线程环境下的安全性。缓存系统会自动跟踪底层奖励的变化，并在必要时更新缓存值，保证数据的一致性。