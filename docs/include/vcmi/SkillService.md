# SkillService

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/SkillService.h`

## 概述
`SkillService`定义了VCMI引擎中处理技能的服务接口。该文件定义了[SkillService](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/SkillService.h#L15-L18)类，继承自[EntityServiceT](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/EntityService.h#L28-L33)，负责管理游戏中的所有技能实体。

## 依赖关系
- [EntityService.h](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/EntityService.h) - 定义基础实体服务接口

## 类定义

### SkillService
继承自[EntityServiceT](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/EntityService.h#L28-L33)<[SecondarySkillID](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/SecondarySkillsManager.h#L31-L31), [Skill](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Skill.h#L15-L26)>，提供对所有技能实体的访问和管理功能。