# HeroTypeService类

HeroTypeService类是VCMI中英雄类型服务类，提供对游戏中所有英雄类型的访问和管理功能。

## 类定义

```cpp
class DLL_LINKAGE HeroTypeService : public EntityServiceT<HeroTypeID, HeroType>
{
public:
};
```

## 功能说明

HeroTypeService是VCMI英雄类型系统的服务类，继承自EntityServiceT模板类。它提供对游戏中所有英雄类型的统一访问接口，允许客户端代码查询和获取特定的英雄类型数据。作为服务类，它通常由游戏主系统实例化和管理，为其他系统提供英雄类型相关的数据访问功能。

## 依赖关系

- [EntityServiceT](./EntityServiceT.md): 实体服务模板类
- [HeroTypeID](./HeroTypeID.md): 英雄类型ID
- [HeroType](./HeroType.md): 英雄类型接口

## 函数注释

HeroTypeService类直接继承EntityServiceT的所有功能，包括：

- `getById(id)`: 根据ID获取英雄类型
- `getByIndex(index)`: 根据索引获取英雄类型
- `forEach(callback)`: 遍历所有英雄类型
- `getBaseByIndex(index)`: 根据索引获取基础实体
- `forEachBase(callback)`: 遍历所有基础实体

由于此类目前没有额外的方法，它主要作为一个专门化的服务接口，用于处理与英雄类型相关的所有操作。