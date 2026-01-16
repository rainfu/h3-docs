# ServerSpellCastEnvironment

## 概述

`ServerSpellCastEnvironment` 类为服务器端提供法术施放的环境支持。该类实现了 `SpellCastEnvironment` 接口，负责处理法术施放过程中的各种操作，包括效果应用、状态查询和游戏状态修改。

## 主要属性

- `gh`: 游戏处理器指针

## 核心方法

### 初始化

```cpp
ServerSpellCastEnvironment(CGameHandler * gh);
```

构造函数，绑定游戏处理器。

### 环境查询

```cpp
const CMap * getMap() const override;
```

获取当前地图。

```cpp
const IGameInfoCallback * getCb() const override;
```

获取游戏信息回调接口。

```cpp
vstd::RNG * getRNG() override;
```

获取随机数生成器。

### 效果应用

```cpp
void apply(CPackForClient & pack) override;
```

应用客户端数据包。

```cpp
void apply(BattleLogMessage & pack) override;
void apply(BattleStackMoved & pack) override;
void apply(BattleUnitsChanged & pack) override;
void apply(SetStackEffect & pack) override;
void apply(StacksInjured & pack) override;
void apply(BattleObstaclesChanged & pack) override;
void apply(CatapultAttack & pack) override;
```

应用各种战斗相关的数据包。

### 游戏操作

```cpp
bool moveHero(ObjectInstanceID hid, int3 dst, EMovementMode mode) override;
```

移动英雄。

```cpp
void createBoat(const int3 & visitablePosition, BoatId type, PlayerColor initiator) override;
```

创建船只。

### 查询处理

```cpp
void genericQuery(Query * request, PlayerColor color, std::function<void(std::optional<int32_t>)> callback) override;
```

处理通用查询。

### 错误处理

```cpp
void complain(const std::string & problem) override;
```

报告问题或错误。

```cpp
bool describeChanges() const override;
```

是否描述变化（用于调试）。

## 依赖关系

- **SpellCastEnvironment**: 法术施放环境基类
- **CGameHandler**: 游戏处理器类
- **ISpellMechanics**: 法术机制接口
- **各种数据包类**: CPackForClient, BattleLogMessage等

## 使用示例

### 创建法术施放环境

```cpp
#include "ServerSpellCastEnvironment.h"

// 创建法术施放环境
ServerSpellCastEnvironment spellEnv(gameHandler);
```

### 应用法术效果

```cpp
#include "ServerSpellCastEnvironment.h"

// 应用战斗日志消息
BattleLogMessage logMessage;
spellEnv.apply(logMessage);

// 应用生物受伤效果
StacksInjured injuryPack;
spellEnv.apply(injuryPack);
```

### 执行游戏操作

```cpp
#include "ServerSpellCastEnvironment.h"

// 移动英雄
bool success = spellEnv.moveHero(heroID, destination, EMovementMode::NORMAL);

// 创建船只
spellEnv.createBoat(position, BoatId::NECROPOLIS, PlayerColor::RED);
```

### 处理查询

```cpp
#include "ServerSpellCastEnvironment.h"

// 创建查询
Query * query = new SomeQueryType();

// 处理查询
spellEnv.genericQuery(query, PlayerColor::RED, [](std::optional<int32_t> result) {
    // 处理查询结果
    if (result) {
        // 使用结果
    }
});
```

## 架构设计

该类作为法术系统与游戏核心的桥梁：

1. **环境提供**: 为法术机制提供必要的游戏环境信息
2. **效果执行**: 将法术效果转换为具体的游戏状态变更
3. **同步处理**: 确保服务器端和客户端状态的一致性
4. **查询代理**: 将法术相关的查询转发给游戏处理器

## 性能特性

- **直接调用**: 直接调用游戏处理器方法，性能开销小
- **即时应用**: 效果立即应用到游戏状态
- **内存效率**: 不维护额外状态，主要通过指针引用

## 实现注意事项

1. **线程安全**: 需要确保在正确的线程上下文中调用
2. **状态一致性**: 所有操作都必须保持游戏状态一致
3. **错误处理**: 通过complain方法报告错误情况
4. **调试支持**: describeChanges方法支持调试模式

## 相关文档

- [CGameHandler](CGameHandler.md) - 游戏处理器
- [SpellCastEnvironment](../spells/SpellCastEnvironment.md) - 法术施放环境基类
- [ISpellMechanics](../spells/ISpellMechanics.md) - 法术机制接口