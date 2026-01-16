# BonusList

奖励列表类，用于管理和操作奖励集合。

## 📋 类概述

`BonusList` 是 VCMI 奖励系统中管理奖励集合的核心容器类，提供了一系列操作奖励列表的方法，包括添加、删除、查询和计算总值。该类使用高效的 `small_vector` 容器来存储奖励指针。

## 🔧 主要属性

### 内部容器
- `bonuses`: 奖励指针的内部容器，使用 `small_vector` 优化小集合性能

## 🎯 核心方法

### 容器操作
```cpp
// 大小和容量
size_type size() const;
size_type capacity() const;
bool empty() const;

// 添加和删除
void push_back(const std::shared_ptr<Bonus> & x);
iterator erase(int position);
void clear();

// 访问元素
std::shared_ptr<Bonus> & operator[](size_type n);
const std::shared_ptr<Bonus> & operator[](size_type n) const;
std::shared_ptr<Bonus> & back();
std::shared_ptr<Bonus> & front();

// 迭代器
const_iterator begin() const;
const_iterator end() const;
```

### 奖励操作
```cpp
// 堆叠奖励（合并相同类型的奖励）
void stackBonuses();

// 计算总值
int totalValue(int baseValue = 0) const;

// 获取符合条件的奖励
void getBonuses(BonusList &out, const CSelector &selector) const;
void getAllBonuses(BonusList &out) const;
```

### 查询方法
```cpp
// 查找第一个符合条件的奖励
std::shared_ptr<Bonus> getFirst(const CSelector &select);
std::shared_ptr<const Bonus> getFirst(const CSelector &select) const;

// 计算符合条件的奖励总值
int valOfBonuses(const CSelector &select, int baseValue = 0) const;
```

### 高级操作
```cpp
// 条件删除
template <class Predicate>
void remove_if(Predicate pred);

// 插入操作
void insert(iterator position, size_type n, const std::shared_ptr<Bonus> & x);

// 调整大小
void resize(size_type sz, const std::shared_ptr<Bonus> & c = nullptr);
```

### 序列化和输出
```cpp
// 转换为JSON
JsonNode toJsonNode() const;

// 运算符重载
size_type operator-=(const std::shared_ptr<Bonus> & i);
```

## 🔗 依赖关系

### 依赖的类
- `Bonus`: 奖励类
- `CSelector`: 奖励选择器
- `boost::container::small_vector`: 小向量容器

### 被依赖关系
- 被所有奖励承载者用于管理奖励
- 被 `CBonusSystemNode` 用于奖励树管理
- 被奖励计算系统用于批量操作

## 📝 使用示例

### 基本容器操作
```cpp
// 创建奖励列表
BonusList bonusList;

// 添加奖励
auto attackBonus = std::make_shared<Bonus>(
    BonusDuration::PERMANENT,
    BonusType::PRIMARY_SKILL,
    BonusSource::ARTIFACT,
    2,
    BonusSourceID(),
    BonusSubtypeID(PrimarySkill::ATTACK)
);
bonusList.push_back(attackBonus);

// 检查大小
if (!bonusList.empty()) {
    log.info() << "奖励列表包含 " << bonusList.size() << " 个奖励";
}

// 访问元素
auto firstBonus = bonusList[0];
auto lastBonus = bonusList.back();
```

### 奖励查询和计算
```cpp
// 计算所有攻击奖励的总值
int totalAttack = bonusList.valOfBonuses(Selector::type()(BonusType::PRIMARY_SKILL)
                                       .And(Selector::subtype()(PrimarySkill::ATTACK)));

// 获取所有主要技能奖励
BonusList skillBonuses;
bonusList.getBonuses(skillBonuses, Selector::type()(BonusType::PRIMARY_SKILL));

// 查找特定奖励
auto luckBonus = bonusList.getFirst(Selector::type()(BonusType::LUCK));
if (luckBonus) {
    log.info() << "找到幸运奖励: " << luckBonus->val;
}
```

### 奖励堆叠和清理
```cpp
// 堆叠相同类型的奖励
bonusList.stackBonuses();

// 删除过期奖励
bonusList.remove_if([](const Bonus * bonus) {
    return bonus->duration == BonusDuration::ONE_BATTLE &&
           bonus->turnsRemain <= 0;
});

// 计算基础值加奖励后的总值
int baseAttack = 10;
int totalAttack = bonusList.totalValue(baseAttack);
```

### 奖励过滤和分组
```cpp
// 获取所有永久奖励
BonusList permanentBonuses;
bonusList.getBonuses(permanentBonuses,
    Selector::duration()(BonusDuration::PERMANENT));

// 获取所有神器来源的奖励
BonusList artifactBonuses;
bonusList.getBonuses(artifactBonuses,
    Selector::sourceType()(BonusSource::ARTIFACT));

// 计算不同类型的奖励数量
std::map<BonusType, int> bonusCount;
for (const auto & bonus : bonusList) {
    bonusCount[bonus->type]++;
}
```

### 高级操作
```cpp
// 在指定位置插入奖励
auto insertPos = bonusList.begin() + 2;
bonusList.insert(insertPos, 3, newBonus);  // 插入3个相同奖励

// 调整列表大小
bonusList.resize(10, defaultBonus);  // 扩展到10个元素

// 移除特定奖励
bonusList.erase(5);  // 移除第6个奖励

// 批量操作
BonusList tempList;
bonusList.getAllBonuses(tempList);  // 复制所有奖励
tempList.clear();  // 清空临时列表
```

## ⚡ 性能特性

- **小向量优化**: 使用 `small_vector` 优化小集合内存使用
- **缓存友好**: 连续内存布局提高缓存命中率
- **只读迭代**: 提供只读迭代器确保数据一致性
- **堆叠优化**: `stackBonuses()` 减少重复奖励数量

## 🔍 注意事项

1. **只读访问**: 主要通过只读迭代器访问，确保缓存有效性
2. **堆叠机制**: `stackBonuses()` 会合并相同奖励，改变列表结构
3. **共享指针**: 奖励使用共享指针，确保生命周期管理
4. **线程安全**: 非线程安全，需要外部同步

## 📊 相关概念

### 奖励堆叠
奖励堆叠是指将相同类型的奖励合并为单个奖励的过程：
- 相同类型、来源和子类型的奖励会被合并
- 数值根据奖励类型进行累加或选择最大值
- 减少奖励列表大小，提高计算性能

### 选择器模式
`CSelector` 用于定义奖励过滤条件：
- `Selector::type()`: 按奖励类型过滤
- `Selector::sourceType()`: 按来源类型过滤
- `Selector::subtype()`: 按子类型过滤
- 支持逻辑组合（And、Or、Not）

### 奖励计算
奖励总值计算考虑不同奖励类型的组合规则：
- **加法奖励**: 直接累加（如攻击力+2）
- **乘法奖励**: 百分比累乘（如伤害+50%）
- **条件奖励**: 根据条件应用奖励

## 🔧 扩展点

- **自定义选择器**: 实现新的 `CSelector` 子类
- **奖励处理器**: 添加新的奖励处理逻辑
- **性能优化**: 实现更高效的奖励查询算法