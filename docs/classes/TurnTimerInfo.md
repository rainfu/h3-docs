<!-- 来源: E:\develop\heroes\vcmi\lib\TurnTimerInfo.h -->
# TurnTimerInfo头文件

TurnTimerInfo头文件定义了VCMI中回合计时器的信息结构体，用于管理游戏中的各种计时器。

## TurnTimerInfo结构体

### 结构体定义
```cpp
struct DLL_LINKAGE TurnTimerInfo
```

### 计时器属性
- `int turnTimer`: 回合计时器（毫秒），在玩家冒险地图回合时倒计时
- `int baseTimer`: 基础计时器（毫秒），仅在回合计时器耗尽时倒计时
- `int battleTimer`: 战斗计时器（毫秒），在战斗中生物计时器耗尽时倒计时
- `int unitTimer`: 单位计时器（毫秒），在玩家选择战斗行动时倒计时

### 状态标志
- `bool accumulatingTurnTimer`: 回合计时器是否累积
- `bool accumulatingUnitTimer`: 单位计时器是否累积
- `bool isActive`: 是否正在倒计时
- `bool isBattle`: 当前是否为战斗模式

### 主要方法
- `bool isEnabled() const`: 检查计时器是否启用
- `bool isBattleEnabled() const`: 检查战斗计时器是否启用
- `void subtractTimer(int timeMs)`: 减去计时器时间
- `int valueMs() const`: 获取当前计时器值（毫秒）
- `bool operator == (const TurnTimerInfo & other) const`: 相等比较运算符

### 序列化支持
- `template <typename Handler> void serialize(Handler &h)`: 序列化方法

## 设计特点

- 支持多种计时器类型（回合、基础、战斗、单位）
- 提供累积和非累积计时器模式
- 支持战斗和冒险地图模式切换
- 提供便捷的状态检查方法