# EVictoryLossCheckResult

## 源文件

[EVictoryLossCheckResult.h](https://github.com/vcmi/vcmi/blob/master/lib/gameState/EVictoryLossCheckResult.h)

## 类定义

```cpp
class DLL_LINKAGE EVictoryLossCheckResult
```

`EVictoryLossCheckResult` 表示游戏胜利或失败检查的结果，包含结果状态和相关的消息文本。

## 成员变量

- `MetaString messageToSelf` - 向胜利/失败玩家显示的消息
- `MetaString messageToOthers` - 向其他玩家显示的消息
- `si32 intValue` - 内部使用的整数值（使用EResult枚举）

## 枚举类型

### EResult

```cpp
enum EResult
{
    DEFEAT = -1,
    INGAME =  0,
    VICTORY= +1
};
```

定义游戏结果的状态值。

## 构造函数

- `EVictoryLossCheckResult()` - 默认构造函数，初始化为INGAME状态
- `EVictoryLossCheckResult(si32 intValue, MetaString toSelf, MetaString toOthers)` - 私有构造函数

## 静态工厂方法

- `static EVictoryLossCheckResult victory(MetaString toSelf, MetaString toOthers)` - 创建胜利结果
- `static EVictoryLossCheckResult defeat(MetaString toSelf, MetaString toOthers)` - 创建失败结果

## 运算符重载

- `bool operator==(EVictoryLossCheckResult const & other) const` - 相等比较
- `bool operator!=(EVictoryLossCheckResult const & other) const` - 不等比较

## 方法

- `bool victory() const` - 检查是否为胜利状态
- `bool loss() const` - 检查是否为失败状态
- `EVictoryLossCheckResult invert() const` - 返回相反的结果（胜利变失败，失败变胜利）

## 序列化

- `template <typename Handler> void serialize(Handler &h)` - 序列化支持

## 设计特点

- **状态管理**: 使用整数值表示三种游戏状态（胜利、游戏中、失败）
- **消息系统**: 支持为胜利者和失败者显示不同的消息
- **工厂模式**: 通过静态方法创建实例，确保正确初始化
- **可逆操作**: 支持结果的反转，用于某些游戏逻辑
- **序列化支持**: 可以保存和加载游戏状态