# Faction接口

Faction接口是VCMI中种族/派系的抽象接口，继承自EntityT和INativeTerrainProvider。

## 类定义

```cpp
class DLL_LINKAGE Faction : public EntityT<FactionID>, public INativeTerrainProvider
{
public:
    virtual bool hasTown() const = 0;
    virtual EAlignment getAlignment() const = 0;
    virtual BoatId getBoatType() const = 0;
};
```

## 功能说明

Faction是VCMI游戏中种族或派系系统的基接口，用于表示游戏中的不同种族（如城堡、壁垒、塔楼等）。它提供了访问种族基本属性的方法，如是否有城镇、阵营归属、船只类型等。该接口继承自EntityT和INativeTerrainProvider，使其具备实体特性和地形提供能力。

## 依赖关系

- [EntityT](../entities/EntityT.md): 通用实体基类
- [FactionID](../identifiers/FactionID.md): 种族ID类型
- [INativeTerrainProvider](./INativeTerrainProvider.md): 原生地形提供者接口
- [EAlignment](../enums/EAlignment.md): 阵营枚举
- [BoatId](../identifiers/BoatId.md): 船只ID类型

## 函数注释

- `hasTown()`: 返回该种族是否有对应的城镇
- `getAlignment()`: 获取种族的阵营（善良、中立或邪恶）
- `getBoatType()`: 获取该种族使用的船只类型