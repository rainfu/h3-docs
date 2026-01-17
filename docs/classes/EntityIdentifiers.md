<!-- 来源: E:\develop\heroes\vcmi\lib\constants\EntityIdentifiers.h -->
# EntityIdentifiers头文件

EntityIdentifiers头文件定义了VCMI中各种实体的标识符类，包括英雄、生物、神器、阵营等实体的ID类型。

## 主要ID类

### ArtifactInstanceID类
```cpp
class ArtifactInstanceID : public StaticIdentifier<ArtifactInstanceID>
```
神器实例ID类。

### QueryID类
```cpp
class QueryID : public StaticIdentifier<QueryID>
```
查询ID类。

### BattleID类
```cpp
class BattleID : public StaticIdentifier<BattleID>
```
战斗ID类。

### ObjectInstanceID类
```cpp
class DLL_LINKAGE ObjectInstanceID : public StaticIdentifier<ObjectInstanceID>
```
对象实例ID类。

### QuestInstanceID类
```cpp
class DLL_LINKAGE QuestInstanceID : public StaticIdentifier<QuestInstanceID>
```
任务实例ID类。

### HeroClassID类
```cpp
class HeroClassID : public EntityIdentifier<HeroClassID>
```
英雄职业ID类。

### HeroTypeID类
```cpp
class DLL_LINKAGE HeroTypeID : public EntityIdentifier<HeroTypeID>
```
英雄类型ID类。

### SlotID类
```cpp
class SlotID : public StaticIdentifier<SlotID>
```
槽位ID类。

### PlayerColor类
```cpp
class DLL_LINKAGE PlayerColor : public StaticIdentifier<PlayerColor>
```
玩家颜色类。

### TeamID类
```cpp
class TeamID : public StaticIdentifier<TeamID>
```
队伍ID类。

### TeleportChannelID类
```cpp
class TeleportChannelID : public StaticIdentifier<TeleportChannelID>
```
传送通道ID类。

### SecondarySkillBase类
```cpp
class SecondarySkillBase : public IdentifierBase
```
二级技能基础类。

## 设计特点

- 提供类型安全的实体标识符
- 支持JSON序列化
- 包含预定义常量（如NONE、NEUTRAL等）
- 统一的编码/解码接口
- 继承自基础标识符类