# RumorState

## 概述

`RumorState` 结构体管理游戏中的谣言状态，包括谣言类型和更新逻辑。该结构体用于跟踪当前活跃的谣言以及各种类型谣言的最后出现时间。

## 主要属性

- `type`: 当前谣言类型 (ERumorType)
- `last`: 每种谣言类型的最后出现时间映射，键为谣言类型，值为<pair<int, int>>（ID和额外信息）

## 谣言类型枚举

```cpp
enum ERumorType : ui8
{
    TYPE_NONE = 0,   // 无谣言
    TYPE_RAND,       // 随机谣言
    TYPE_SPECIAL,    // 特殊谣言
    TYPE_MAP         // 地图谣言
};
```

## 特殊谣言类型枚举

```cpp
enum ERumorTypeSpecial : ui8
{
    RUMOR_OBELISKS = 208,   // 方尖碑谣言
    RUMOR_ARTIFACTS = 209,  // 神器谣言
    RUMOR_ARMY = 210,       // 军队谣言
    RUMOR_INCOME = 211,     // 收入谣言
    RUMOR_GRAIL = 212       // 圣杯谣言
};
```

## 核心方法

```cpp
bool update(int id, int extra);
```

更新谣言状态。如果谣言可以更新则返回true，否则返回false。

## 依赖关系

无外部依赖，主要使用标准库容器。

## 使用示例

### 创建和初始化谣言状态

```cpp
#include "RumorState.h"

// 创建谣言状态
RumorState rumorState;

// 默认类型为TYPE_NONE
assert(rumorState.type == RumorState::TYPE_NONE);
```

### 更新谣言状态

```cpp
#include "RumorState.h"

RumorState rumorState;

// 更新特殊谣言
bool updated = rumorState.update(RumorState::RUMOR_OBELISKS, 0);
if (updated) {
    // 谣言状态已更新
    // rumorState.type 现在可能变为 TYPE_SPECIAL
}
```

### 检查谣言历史

```cpp
#include "RumorState.h"

RumorState rumorState;

// 检查某种类型谣言的最后出现时间
auto it = rumorState.last.find(RumorState::TYPE_RAND);
if (it != rumorState.last.end()) {
    int lastId = it->second.first;
    int lastExtra = it->second.second;
}
```

## 性能特性

- **内存使用**: 轻量级结构体，主要存储枚举和映射
- **更新效率**: update方法执行简单的逻辑判断和映射更新
- **访问效率**: 直接访问成员变量，无额外开销

## 实现注意事项

1. **状态一致性**: update方法会同时更新type和last映射
2. **ID管理**: 谣言ID和额外信息的含义由调用者定义
3. **序列化**: 支持完整的序列化，便于保存游戏状态
4. **默认状态**: 构造函数初始化为TYPE_NONE状态

## 相关文档

- [CGameState](CGameState.md) - 游戏状态管理类（可能包含谣言状态）