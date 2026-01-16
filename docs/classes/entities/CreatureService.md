# CreatureService类

CreatureService类是VCMI中生物服务类，提供对游戏中所有生物的访问和管理功能。

## 类定义

```cpp
class DLL_LINKAGE CreatureService : public EntityServiceT<CreatureID, Creature>
{
public:
};
```

## 功能说明

CreatureService是VCMI生物系统的服务类，继承自EntityServiceT模板类。它提供对游戏中所有生物的统一访问接口，允许客户端代码查询和获取特定的生物数据。作为服务类，它通常由游戏主系统实例化和管理，为其他系统提供生物相关的数据访问功能。

## 依赖关系

- [EntityServiceT](./EntityServiceT.md): 实体服务模板类
- [CreatureID](./CreatureID.md): 生物ID
- [Creature](./Creature.md): 生物接口

## 函数注释

CreatureService类直接继承EntityServiceT的所有功能，包括：

- `getById(id)`: 根据ID获取生物
- `getByIndex(index)`: 根据索引获取生物
- `forEach(callback)`: 遍历所有生物
- `getBaseByIndex(index)`: 根据索引获取基础实体
- `forEachBase(callback)`: 遍历所有基础实体

由于此类目前没有额外的方法，它主要作为一个专门化的服务接口，用于处理与生物相关的所有操作。