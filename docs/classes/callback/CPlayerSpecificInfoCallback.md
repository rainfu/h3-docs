# CPlayerSpecificInfoCallback类

CPlayerSpecificInfoCallback类是VCMI系统中的玩家特定信息回调类，扩展了CGameInfoCallback的功能。它专门提供与特定玩家相关的信息访问，包括城镇、英雄、资源等玩家特定的数据。

## 类定义

```cpp
struct QuestInfo;

class ResourceSet;

class DLL_LINKAGE CPlayerSpecificInfoCallback : public CGameInfoCallback
{
public:
    // 保持玩家特定的重写在作用域内
    using CGameInfoCallback::howManyTowns;

    virtual int howManyTowns() const;                                                        // 获取城镇数量
    virtual int howManyHeroes(bool includeGarrisoned = true) const;                         // 获取英雄数量
    virtual int3 getGrailPos(double *outKnownRatio);                                       // 获取圣杯位置

    virtual std::vector <const CGTownInstance *> getTownsInfo(bool onlyOur = true) const;   // 获取城镇信息
    virtual int getHeroSerial(const CGHeroInstance * hero, bool includeGarrisoned=true) const; // 获取英雄序号
    virtual const CGTownInstance* getTownBySerial(int serialId) const;                      // 根据序号获取城镇
    virtual const CGHeroInstance* getHeroBySerial(int serialId, bool includeGarrisoned=true) const; // 根据序号获取英雄
    virtual std::vector <const CGHeroInstance *> getHeroesInfo() const;                     // 获取英雄信息
    virtual std::vector <const CGObjectInstance * > getMyObjects() const;                   // 获取我的对象
    virtual std::vector <QuestInfo> getMyQuests() const;                                   // 获取我的任务

    virtual int getResourceAmount(GameResID type) const;                                   // 获取特定资源数量
    virtual ResourceSet getResourceAmount() const;                                         // 获取所有资源数量
};
```

## 功能说明

CPlayerSpecificInfoCallback类是CGameInfoCallback的扩展，专门为特定玩家提供信息访问功能。它提供了获取玩家特定数据的方法，如城镇、英雄、资源和任务信息等。

该类的主要作用是封装与玩家相关的信息查询，使得可以方便地获取属于特定玩家的游戏实体信息。

## 继承关系

- 继承自CGameInfoCallback，扩展了其功能
- 使用`using`声明保留了基类的howManyTowns方法

## 重要方法

### 统计方法
- `howManyTowns()`: 获取玩家拥有的城镇数量
- `howManyHeroes(includeGarrisoned)`: 获取玩家拥有的英雄数量，可以选择是否包含驻扎的英雄
- `getGrailPos(outKnownRatio)`: 获取圣杯位置，同时输出已知比例

### 获取实体列表
- `getTownsInfo(onlyOur)`: 获取城镇信息列表，可以选择是否只获取自己的城镇
- `getHeroesInfo()`: 获取所有英雄信息列表
- `getMyObjects()`: 获取属于该玩家的所有对象
- `getMyQuests()`: 获取该玩家的所有任务

### 通过序号获取实体
- `getHeroSerial(hero, includeGarrisoned)`: 获取英雄的序号，可以选择是否包含驻扎的英雄
- `getHeroBySerial(serialId, includeGarrisoned)`: 根据序号获取英雄，可以选择是否包含驻扎的英雄
- `getTownBySerial(serialId)`: 根据序号获取城镇（序号范围是[0, 城镇总数)）

### 资源管理
- `getResourceAmount(type)`: 获取指定类型资源的数量
- `getResourceAmount()`: 获取所有资源的数量

## 设计说明

CPlayerSpecificInfoCallback类的设计体现了以下特点：

1. **玩家特定**: 专门针对特定玩家的信息访问，提供玩家视角的数据
2. **序列化访问**: 提供通过序号获取实体的方法，便于序列化和索引操作
3. **数据聚合**: 提供获取实体列表的方法，便于批量处理
4. **灵活性**: 提供多种选项（如includeGarrisoned参数）来控制返回数据的范围
5. **资源导向**: 专门提供资源相关的查询方法

这类主要用于需要访问特定玩家数据的场景，例如AI决策、UI显示、游戏状态查询等，为玩家特定的数据访问提供了统一的接口。