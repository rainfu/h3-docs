# Entity

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi\Entity.h`

## 概述
`Entity`定义了VCMI引擎中所有实体的基础接口。该文件定义了基础[Entity](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L30-L45)类及相关的接口，为游戏中的所有实体提供通用功能。

## 类定义

### IConstBonusProvider
常量奖励提供者接口，提供对奖励承载者的访问。

#### 公共方法
- `virtual const IBonusBearer * getBonusBearer() const = 0;`
  - 功能：获取奖励承载者指针
  - 返回值：指向奖励承载者的常量指针

### INativeTerrainProvider
原生地形提供者接口，定义了获取原生地形和派系ID的方法。

#### 公共方法
- `virtual TerrainId getNativeTerrain() const = 0;`
  - 功能：获取原生地形
  - 返回值：地形ID
  
- `virtual FactionID getFactionID() const = 0;`
  - 功能：获取派系ID
  - 返回值：派系ID
  
- `virtual bool isNativeTerrain(TerrainId terrain) const;`
  - 功能：判断指定地形是否为原生地形
  - 参数：terrain - 地形ID
  - 返回值：如果是原生地形返回true，否则返回false

### Entity
基础实体类，定义了所有游戏实体的通用属性和方法。

#### 公共方法
- `virtual int32_t getIndex() const = 0;`
  - 功能：获取实体索引
  - 返回值：实体索引值

- `virtual int32_t getIconIndex() const = 0;`
  - 功能：获取图标索引
  - 返回值：图标索引值

- `virtual std::string getJsonKey() const = 0;`
  - 功能：获取JSON键名
  - 返回值：JSON键名字符串

- `virtual std::string getModScope() const = 0;`
  - 功能：获取模组作用域
  - 返回值：模组作用域字符串

- `virtual std::string getNameTranslated() const = 0;`
  - 功能：获取翻译后的名称
  - 返回值：翻译后的名称字符串

- `virtual std::string getNameTextID() const = 0;`
  - 功能：获取名称的文本ID
  - 返回值：名称的文本ID字符串

- `virtual void registerIcons(const IconRegistar & cb) const = 0;`
  - 功能：注册图标
  - 参数：cb - 图标注册回调函数

#### 类型定义
- `using IconRegistar = std::function<void(int32_t index, int32_t group, const std::string & listName, const std::string & imageName)>;`
  - 图标注册器类型定义

### EntityT
模板实体类，继承自[Entity](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L30-L45)，添加了ID类型信息。

#### 类型定义
- `using IdentifierType = IdType;`
  - 标识符类型定义

#### 公共方法
- `virtual IdType getId() const = 0;`
  - 功能：获取实体ID
  - 返回值：实体ID

### EntityWithBonuses
带奖励的实体模板类，继承自[EntityT](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L48-L54)<IdType>和[IConstBonusProvider](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/Entity.h#L17-L21)，为实体提供奖励系统支持。