# QuestInfo

## 概述

`QuestInfo` 结构体提供了任务信息的统一接口，用于表示与任务相关的对象信息。该结构体主要用于AI和人类玩家都能使用的通用任务信息接口，封装了任务相关的对象ID和相关操作。

## 主要属性

- `obj`: 相关对象ID (ObjectInstanceID)，通常是Seer Hut（先知小屋）或Border Guard（边境守卫）

## 核心方法

```cpp
QuestInfo(ObjectInstanceID Obj);
```

构造函数，从对象ID创建任务信息。

```cpp
const CQuest * getQuest(IGameInfoCallback *cb) const;
```

获取相关的任务对象。

```cpp
const CGObjectInstance * getObject(IGameInfoCallback *cb) const;
```

获取相关的游戏对象实例。

```cpp
int3 getPosition(IGameInfoCallback *cb) const;
```

获取对象的位置坐标。

```cpp
bool operator== (const QuestInfo & qi) const;
```

相等性比较运算符。

## 依赖关系

- **int3**: 三维坐标类
- **EntityIdentifiers.h**: 实体标识符定义
- **CQuest**: 任务类
- **CGObjectInstance**: 游戏对象实例类
- **IGameInfoCallback**: 游戏信息回调接口

## 使用示例

### 创建任务信息

```cpp
#include "QuestInfo.h"

// 从对象ID创建任务信息
ObjectInstanceID hutID = ObjectInstanceID(123);
QuestInfo questInfo(hutID);
```

### 获取任务相关信息

```cpp
#include "QuestInfo.h"

// 获取任务对象
const CQuest * quest = questInfo.getQuest(gameInfoCallback);

// 获取相关对象
const CGObjectInstance * obj = questInfo.getObject(gameInfoCallback);

// 获取位置
int3 position = questInfo.getPosition(gameInfoCallback);
```

### 比较任务信息

```cpp
#include "QuestInfo.h"

QuestInfo quest1(objID1);
QuestInfo quest2(objID2);

// 比较是否为同一任务
if (quest1 == quest2) {
    // 相同的任务对象
}
```

## 性能特性

- **内存使用**: 非常轻量，只存储一个ObjectInstanceID
- **访问效率**: 通过回调接口获取详细信息，避免存储大量数据
- **构造开销**: 构造函数开销极小

## 实现注意事项

1. **回调依赖**: 所有获取方法都需要IGameInfoCallback参数
2. **数据一致性**: QuestInfo对象本身不存储任务数据，通过回调动态获取
3. **线程安全**: 需要确保回调接口的线程安全
4. **序列化**: 支持序列化，便于网络传输和保存

## 相关文档

- [CQuest](../entities/CQuest.md) - 任务类
- [CGObjectInstance](CGObjectInstance.md) - 游戏对象实例类
- [IGameInfoCallback](IGameInfoCallback.md) - 游戏信息回调接口