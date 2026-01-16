# INativeTerrainProvider接口

INativeTerrainProvider接口是VCMI中原生地形提供者的抽象接口。

## 类定义

```cpp
class DLL_LINKAGE INativeTerrainProvider
{
public:
    virtual TerrainId getNativeTerrain() const = 0;
    virtual FactionID getFactionID() const = 0;
    virtual bool isNativeTerrain(TerrainId terrain) const;
};
```

## 功能说明

INativeTerrainProvider是VCMI中提供原生地形信息的接口，用于确定实体的原生地形类型。这在游戏逻辑中很重要，特别是对于生物和英雄等实体，它们可能在某些地形上有特殊的优势或能力。该接口还提供了检查特定地形是否为实体原生地形的功能。

## 依赖关系

- [TerrainId](../terrain/TerrainId.md): 地形ID类型
- [FactionID](../identifiers/FactionID.md): 种族ID类型

## 函数注释

- `getNativeTerrain()`: 获取实体的原生地形ID
- `getFactionID()`: 获取实体所属派系的ID
- `isNativeTerrain(terrain)`: 检查指定地形是否为实体的原生地形