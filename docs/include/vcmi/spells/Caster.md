# Caster

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/spells/Caster.h`

## 概述
`Caster`定义了VCMI引擎中施法者接口。该文件定义了能够施放法术的实体所需实现的接口。

## 功能说明

### Caster 接口的主要功能：

- 定义施法者的基本属性和方法
- 提供法力值管理的相关方法
- 定义施法能力的查询接口
- 支持法术强度和施法范围的计算
- 包含抗魔能力等相关属性

施法者接口是VCMI魔法系统的核心部分，任何能够施放法术的实体（如英雄、生物等）都需要实现此接口。