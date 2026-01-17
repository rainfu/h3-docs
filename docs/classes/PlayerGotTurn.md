<!-- 来源: E:\develop\heroes\vcmi\lib\events\PlayerGotTurn.h -->
# PlayerGotTurn头文件

PlayerGotTurn头文件定义了玩家获得回合事件的类，用于处理游戏中玩家回合开始的事件。

## events命名空间

### CPlayerGotTurn类

#### 类定义
```cpp
class DLL_LINKAGE CPlayerGotTurn : public PlayerGotTurn
```

#### 构造函数
- `CPlayerGotTurn()`: 默认构造函数

#### 继承的方法
- `bool isEnabled() const override`: 检查事件是否启用
- `PlayerColor getPlayer() const override`: 获取玩家颜色
- `void setPlayer(const PlayerColor & value) override`: 设置玩家颜色
- `int32_t getPlayerIndex() const override`: 获取玩家索引
- `void setPlayerIndex(int32_t value) override`: 设置玩家索引

#### 私有成员
- `PlayerColor player`: 玩家颜色

## 设计特点

- 继承自PlayerGotTurn基类
- 提供玩家回合开始事件的处理
- 支持玩家颜色和索引的管理
- 实现事件启用状态检查