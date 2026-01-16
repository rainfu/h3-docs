# ArtifactService类

ArtifactService类是VCMI中神器服务类，提供对游戏中所有神器的访问和管理功能。

## 类定义

```cpp
class DLL_LINKAGE ArtifactService : public EntityServiceT<ArtifactID, Artifact>
{
public:
};
```

## 功能说明

ArtifactService是VCMI神器系统的服务类，继承自EntityServiceT模板类。它提供对游戏中所有神器的统一访问接口，允许客户端代码查询和获取特定的神器数据。作为服务类，它通常由游戏主系统实例化和管理，为其他系统提供神器相关的数据访问功能。

## 依赖关系

- [EntityServiceT](./EntityServiceT.md): 实体服务模板类
- [ArtifactID](./ArtifactID.md): 神器ID
- [Artifact](./Artifact.md): 神器接口

## 函数注释

ArtifactService类直接继承EntityServiceT的所有功能，包括：

- `findArtifact(id)`: 根据ID查找神器
- `getArtifact(id)`: 获取指定ID的神器，如果不存在则抛出异常
- `iterateArtifacts(callback)`: 遍历所有神器
- `getName()`: 获取服务名称

由于此类目前没有额外的方法，它主要作为一个专门化的服务接口，用于处理与神器相关的所有操作。