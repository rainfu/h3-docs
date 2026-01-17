# Service

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/spells/Service.h`

## 概述
`Service`定义了VCMI引擎中魔法服务接口。该文件定义了魔法系统的服务接口，负责管理游戏中的所有法术实体。

## 依赖关系
- [EntityService.h](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/EntityService.h) - 定义基础实体服务接口

## 类定义

### spells::Service
继承自[EntityServiceT](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/EntityService.h#L28-L33)<[SpellID](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/spells/Service.h#L34-L34), [Spell](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/spells/Spell.h#L42-L78)>，提供对所有法术实体的访问和管理功能。

魔法服务负责：
- 法术的加载和初始化
- 根据ID或名称查找法术
- 提供对所有可用法术的访问
- 管理法术的生命周期