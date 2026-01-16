# InfoAboutArmy

## 概述

`InfoAboutArmy` 模块提供了军队信息的抽象和表示功能。该模块包含了用于描述军队、英雄和城镇信息的结构体，主要用于游戏界面显示、AI决策和网络通信等场景。

## 主要组件

### ArmyDescriptor 结构体

军队描述符结构体，用于描述一支军队的组成和实力。

#### 主要属性

- `isDetailed`: 是否为详细模式（true表示确切数量，false表示数量等级）
- 继承自 `std::map<SlotID, CStackBasicDescriptor>`: 槽位ID到生物堆栈描述符的映射

#### 核心方法

```cpp
ArmyDescriptor(const CArmedInstance *army, bool detailed);
```

从武装实例创建军队描述符。

```cpp
int getStrength() const;
```

计算军队的总实力。

### InfoAboutArmy 结构体

基础军队信息结构体，包含所有者、名称和军队描述。

#### 主要属性

- `owner`: 所有者玩家颜色
- `name`: 军队名称
- `army`: 军队描述符

#### 核心方法

```cpp
InfoAboutArmy(const CArmedInstance *Army, bool detailed);
```

从武装实例创建军队信息。

```cpp
void initFromArmy(const CArmedInstance *Army, bool detailed);
```

从武装实例初始化军队信息。

### InfoAboutHero 结构体

英雄信息结构体，继承自InfoAboutArmy，包含英雄特有的详细信息。

#### 主要属性

- 继承所有 `InfoAboutArmy` 属性
- `details`: 可选的详细信息结构体
- `hclass`: 英雄职业指针
- `portraitSource`: 肖像来源英雄类型ID

#### Details 子结构体

```cpp
struct Details
{
    std::vector<si32> primskills;  // 主要技能
    si32 mana, manaLimit;          // 魔法值和魔法值上限
    si32 luck, morale;             // 幸运和士气
};
```

#### 信息等级枚举

```cpp
enum EInfoLevel
{
    BASIC,      // 基本信息
    DETAILED,   // 详细信息
    INBATTLE    // 战斗中信息
};
```

#### 核心方法

```cpp
InfoAboutHero(const CGHeroInstance *h, EInfoLevel infoLevel);
```

从英雄实例创建英雄信息。

```cpp
void initFromHero(const CGHeroInstance *h, EInfoLevel infoLevel);
```

从英雄实例初始化英雄信息。

```cpp
int32_t getIconIndex() const;
```

获取英雄图标索引。

### InfoAboutTown 结构体

城镇信息结构体，继承自InfoAboutArmy，包含城镇特有的详细信息。

#### 主要属性

- 继承所有 `InfoAboutArmy` 属性
- `details`: 可选的详细信息结构体
- `tType`: 城镇类型指针
- `built`: 已建造的建筑位图
- `fortLevel`: 堡垒等级（0表示无堡垒）

#### Details 子结构体

```cpp
struct Details
{
    si32 hallLevel;     // 市政厅等级
    si32 goldIncome;    // 金币收入
    bool customRes;     // 是否有自定义资源
    bool garrisonedHero; // 是否有驻守英雄
};
```

#### 核心方法

```cpp
InfoAboutTown(const CGTownInstance *t, bool detailed);
```

从城镇实例创建城镇信息。

```cpp
void initFromTown(const CGTownInstance *t, bool detailed);
```

从城镇实例初始化城镇信息。

## 依赖关系

- **CStackBasicDescriptor**: 生物堆栈基本描述符
- **CArmedInstance**: 武装实例类
- **CGHeroInstance**: 英雄实例类
- **CGTownInstance**: 城镇实例类
- **CHeroClass**: 英雄职业类
- **CTown**: 城镇类

## 使用示例

### 创建军队信息

```cpp
#include "InfoAboutArmy.h"

// 从武装实例创建详细军队信息
InfoAboutArmy armyInfo(armedInstance, true);

// 创建基本军队信息
InfoAboutArmy basicArmyInfo(armedInstance, false);
```

### 创建英雄信息

```cpp
#include "InfoAboutArmy.h"

// 创建详细英雄信息
InfoAboutHero heroInfo(heroInstance, InfoAboutHero::DETAILED);

// 访问英雄详细信息
if (heroInfo.details) {
    int mana = heroInfo.details->mana;
    int morale = heroInfo.details->morale;
}
```

### 创建城镇信息

```cpp
#include "InfoAboutArmy.h"

// 创建城镇信息
InfoAboutTown townInfo(townInstance, true);

// 检查城镇细节
if (townInfo.details) {
    int income = townInfo.details->goldIncome;
    bool hasGarrison = townInfo.details->garrisonedHero;
}
```

### 计算军队实力

```cpp
#include "InfoAboutArmy.h"

// 创建军队描述符
ArmyDescriptor armyDesc(armedInstance, true);

// 计算军队实力
int strength = armyDesc.getStrength();
```

## 性能特性

- **内存使用**: 结构体相对轻量，主要存储基本类型和指针
- **构造开销**: 从实例创建信息对象需要遍历军队组成
- **访问效率**: 详细信息通过optional包装，避免不必要的内存分配

## 实现注意事项

1. **信息等级**: 根据使用场景选择合适的信息等级，避免泄露过多信息
2. **数据一致性**: 信息对象创建后不会自动更新，需要手动重建
3. **内存管理**: 包含的指针引用外部对象，需要确保生命周期正确
4. **序列化**: 这些结构体主要用于运行时信息传递，不直接参与序列化

## 相关文档

- [CStackBasicDescriptor](CStackBasicDescriptor.md) - 生物堆栈基本描述符
- [CArmedInstance](CArmedInstance.md) - 武装实例类
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例类
- [CGTownInstance](CGTownInstance.md) - 城镇实例类