# Artifact

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi\Artifact.h`

## 概述
`Artifact`定义了VCMI引擎中的道具系统接口。该文件定义了[Artifact](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Artifact.h#L15-L34)类，继承自[EntityWithBonuses](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/entities/CArtHandler.h#L37-L37)，表示游戏中的道具实体。

## 依赖关系
- [Entity.h](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h) - 定义基础实体接口

## 类定义

### Artifact
表示游戏中的道具实体，继承自[EntityWithBonuses](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/entities/CArtHandler.h#L37-L37)<[ArtifactID](file:///e:/develop/heroes/vcmi-assets/vcmi-client/lib/ArtifactService.h#L30-L30)>。

#### 公共方法

- `virtual bool isBig() const = 0;`
  - 功能：判断是否为大件道具（如战车、帐篷等不能放入英雄背包的道具）
  - 返回值：如果是大件道具返回true，否则返回false

- `virtual bool isTradable() const = 0;`
  - 功能：判断道具是否可以交易
  - 返回值：如果可以交易返回true，否则返回false

- `virtual uint32_t getPrice() const = 0;`
  - 功能：获取道具的价格
  - 返回值：道具的价格数值

- `virtual CreatureID getWarMachine() const = 0;`
  - 功能：获取与该道具关联的战争机器（如果此道具是战争机器）
  - 返回值：战争机器的生物ID

- `virtual std::string getDescriptionTranslated() const = 0;`
  - 功能：获取道具的描述文本（已翻译）
  - 返回值：翻译后的描述文本

- `virtual std::string getEventTranslated() const = 0;`
  - 功能：获取道具事件的文本（已翻译）
  - 返回值：翻译后的事件文本

- `virtual std::string getDescriptionTextID() const = 0;`
  - 功能：获取道具描述的文本ID
  - 返回值：描述文本的ID

- `virtual std::string getEventTextID() const = 0;`
  - 功能：获取道具事件的文本ID
  - 返回值：事件文本的ID