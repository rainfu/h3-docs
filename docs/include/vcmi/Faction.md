# Faction

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi\Faction.h`

## 概述
`Faction`定义了VCMI引擎中的派系系统接口。该文件定义了[Faction](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Faction.h#L17-L25)类，继承自[EntityT](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L48-L54)和[INativeTerrainProvider](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L23-L29)，表示游戏中的派系实体。

## 依赖关系
- [Entity.h](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h) - 定义基础实体接口

## 类定义

### Faction
表示游戏中的派系实体，继承自[EntityT](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L48-L54)<[FactionID](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/FactionService.h#L30-L30)>和[INativeTerrainProvider](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L23-L29)。

#### 公共方法

- `virtual bool hasTown() const = 0;`
  - 功能：判断派系是否有城镇
  - 返回值：如果派系有城镇则返回true，否则返回false

- `virtual EAlignment getAlignment() const = 0;`
  - 功能：获取派系的阵营
  - 返回值：阵营枚举值

- `virtual BoatId getBoatType() const = 0;`
  - 功能：获取派系的船类型
  - 返回值：船类型ID