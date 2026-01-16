# SpellSchoolHandler

## 概述

`SpellSchoolHandler` 类负责管理游戏中的法术学派数据。它继承自 `IHandlerBase`，实现了法术学派对象的加载、存储和管理功能。每个法术学派包含视觉资源路径和本地化信息。

## 架构设计

SpellSchoolHandler 系统包含两个主要组件：

- `SpellSchoolType`: 表示单个法术学派的数据结构
- `SpellSchoolHandler`: 法术学派的管理器和加载器

## SpellSchoolType 类

### 概述
`SpellSchoolType` 类表示一个法术学派，包含其视觉资源和标识信息。

### 继承关系
```cpp
EntityT<SpellSchool>
└── SpellSchoolType
```

### 私有成员变量

#### id
```cpp
SpellSchool id;
```
- **描述**: 法术学派的唯一标识符

#### spellBordersPath
```cpp
AnimationPath spellBordersPath;
```
- **描述**: 法术边框动画的资源路径

#### schoolBookmarkPath
```cpp
AnimationPath schoolBookmarkPath;
```
- **描述**: 学派书签动画的资源路径

#### schoolHeaderPath
```cpp
ImagePath schoolHeaderPath;
```
- **描述**: 学派标题图片的资源路径

#### identifier
```cpp
std::string identifier;
```
- **描述**: 法术学派的字符串标识符

#### modScope
```cpp
std::string modScope;
```
- **描述**: 法术学派所属的模组范围

### 公共方法

#### getSpellBordersPath
```cpp
AnimationPath getSpellBordersPath() const;
```
- **返回值**: 法术边框动画的路径
- **描述**: 获取用于法术边框显示的动画资源路径

#### getSchoolBookmarkPath
```cpp
AnimationPath getSchoolBookmarkPath() const;
```
- **返回值**: 学派书签动画的路径
- **描述**: 获取用于学派书签显示的动画资源路径

#### getSchoolHeaderPath
```cpp
ImagePath getSchoolHeaderPath() const;
```
- **返回值**: 学派标题图片的路径
- **描述**: 获取用于学派标题显示的图片资源路径

#### getJsonKey
```cpp
std::string getJsonKey() const override;
```
- **返回值**: 返回identifier作为JSON键
- **描述**: 获取JSON配置中的键名

#### getIndex
```cpp
int32_t getIndex() const override;
```
- **返回值**: 法术学派的数字索引
- **描述**: 获取法术学派的数字标识

#### getId
```cpp
SpellSchool getId() const override;
```
- **返回值**: 法术学派的SpellSchool对象
- **描述**: 获取法术学派的完整标识

#### getIconIndex
```cpp
int32_t getIconIndex() const override;
```
- **返回值**: 始终返回0
- **描述**: 获取图标索引（法术学派不使用图标索引）

#### getModScope
```cpp
std::string getModScope() const override;
```
- **返回值**: 模组范围字符串
- **描述**: 获取法术学派所属的模组范围

#### registerIcons
```cpp
void registerIcons(const IconRegistar & cb) const override;
```
- **描述**: 空实现，法术学派不注册图标

#### getNameTextID
```cpp
std::string getNameTextID() const override;
```
- **返回值**: 本地化文本ID，格式为 "spellSchool.{modScope}.{identifier}.name"
- **描述**: 获取法术学派名称的本地化文本ID

#### getNameTranslated
```cpp
std::string getNameTranslated() const override;
```
- **返回值**: 翻译后的法术学派名称
- **描述**: 获取当前语言下的法术学派名称

## SpellSchoolHandler 类

### 概述
`SpellSchoolHandler` 类负责加载和管理所有的法术学派对象。

### 继承关系
```cpp
IHandlerBase
└── SpellSchoolHandler
```

### 私有成员变量

#### objects
```cpp
std::vector<std::shared_ptr<spells::SpellSchoolType>> objects;
```
- **描述**: 存储所有法术学派对象的向量

### 公共方法

#### loadLegacyData
```cpp
std::vector<JsonNode> loadLegacyData() override;
```
- **返回值**: 包含4个空JsonNode的向量（对应4个基础法术学派）
- **描述**: 加载遗留数据，为基础法术学派预留空间

#### loadObject (重载)
```cpp
void loadObject(std::string scope, std::string name, const JsonNode & data) override;
void loadObject(std::string scope, std::string name, const JsonNode & data, size_t index) override;
```
- **描述**: 从JSON数据加载法术学派对象
- **参数**:
  - `scope`: 模组范围
  - `name`: 对象名称
  - `data`: JSON配置数据
  - `index`: 对象索引（第二个重载版本）

#### getAllObjects
```cpp
std::vector<SpellSchool> getAllObjects() const;
```
- **返回值**: 所有法术学派的ID列表
- **描述**: 获取所有已加载法术学派的标识符

#### getById
```cpp
const spells::SpellSchoolType * getById(SpellSchool index) const;
```
- **参数**:
  - `index`: 法术学派的索引
- **返回值**: 指向对应法术学派对象的指针
- **描述**: 通过ID获取法术学派对象

### 私有方法

#### loadObjectImpl
```cpp
std::shared_ptr<spells::SpellSchoolType> loadObjectImpl(std::string scope, std::string name, const JsonNode & data, size_t index);
```
- **描述**: 实际的对象加载实现
- **返回值**: 新创建的法术学派对象的智能指针

## JSON配置格式

法术学派的JSON配置示例：
```json
{
  "name": "Fire Magic",
  "schoolBorders": "spellBorders/fire",
  "schoolBookmark": "bookmarks/fire",
  "schoolHeader": "headers/fire"
}
```

### 配置字段说明

- **name**: 法术学派显示名称（支持本地化）
- **schoolBorders**: 法术边框动画资源路径
- **schoolBookmark**: 学派书签动画资源路径
- **schoolHeader**: 学派标题图片资源路径

## 使用示例

### 获取法术学派信息
```cpp
// 获取法术学派处理器
const auto& schoolHandler = LIBRARY->spellSchoolHandler;

// 获取所有法术学派
auto allSchools = schoolHandler->getAllObjects();

// 获取特定法术学派
const auto* fireSchool = schoolHandler->getById(SpellSchool::FIRE);

// 获取资源路径
auto bordersPath = fireSchool->getSpellBordersPath();
auto bookmarkPath = fireSchool->getSchoolBookmarkPath();

// 获取本地化名称
std::string name = fireSchool->getNameTranslated();
```

### 加载自定义法术学派
```cpp
// 在模组配置中定义新的法术学派
JsonNode schoolData;
schoolData["name"] = "Custom Magic";
schoolData["schoolBorders"] = "customBorders";
schoolData["schoolBookmark"] = "customBookmark";
schoolData["schoolHeader"] = "customHeader";

// 加载到处理器
schoolHandler->loadObject("myMod", "customSchool", schoolData);
```

## 设计意图

SpellSchoolHandler 的设计目的是为了：

1. **资源管理**: 统一管理法术学派的视觉资源路径
2. **本地化支持**: 提供多语言法术学派名称支持
3. **模组扩展**: 允许模组添加自定义法术学派
4. **向后兼容**: 支持遗留的4个基础法术学派系统

这为游戏提供了灵活的法术学派系统，支持视觉定制和多语言本地化。