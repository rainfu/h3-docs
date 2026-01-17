<!-- 来源: E:\develop\heroes\vcmi\lib\callback\MapInfoCallback.h -->
# MapInfoCallback类

MapInfoCallback类是VCMI游戏信息回调系统中提供地图相关查询功能的类。它继承自IGameInfoCallback，专门处理地图对象的访问和地图属性的查询。

## 类定义

```cpp
class DLL_LINKAGE MapInfoCallback : public IGameInfoCallback
```

## 概述

MapInfoCallback是地图信息查询的核心类，提供对地图上对象、英雄、城镇等的访问方法。它封装了地图数据的访问逻辑，确保安全和一致的查询操作。

## 核心方法

### 对象查询方法

#### 通用对象查询
- `const CGObjectInstance * getObj(ObjectInstanceID objId, bool verbose = true) const`: 获取地图对象（带检查）
- `const CGObjectInstance * getObjInstance(ObjectInstanceID oid) const`: 获取地图对象实例（原始访问）

#### 特定类型对象查询
- `const CArtifactInstance * getArtInstance(ArtifactInstanceID aid) const`: 获取神器实例
- `const CGHeroInstance * getHero(ObjectInstanceID objid) const`: 获取英雄实例
- `const CGTownInstance * getTown(ObjectInstanceID objid) const`: 获取城镇实例

### 所有权查询
- `PlayerColor getOwner(ObjectInstanceID heroID) const`: 获取英雄的所有者

## 地图属性查询方法

### 位置和边界检查
- `bool isInTheMap(const int3 & pos) const`: 检查位置是否在地图内
- `int3 getMapSize() const`: 获取地图尺寸

### 允许性检查
- `bool isAllowed(SpellID id) const`: 检查法术是否被允许
- `bool isAllowed(ArtifactID id) const`: 检查神器是否被允许
- `bool isAllowed(SecondarySkill id) const`: 检查副属性技能是否被允许

### 法术列表获取
- `void getAllowedSpells(std::vector<SpellID> & out, std::optional<ui16> level)`: 获取允许的法术列表

## 地图信息查询方法

- `const IGameSettings & getSettings() const`: 获取游戏设置
- `const CMapHeader * getMapHeader() const`: 获取地图头部信息

## 受保护方法

- `virtual const CMap * getMapConstPtr() const = 0`: 获取地图常量指针（纯虚方法，由子类实现）

## 参数说明

### 对象标识符
- `ObjectInstanceID objId/oid`: 对象实例ID
- `ArtifactInstanceID aid`: 神器实例ID
- `heroID`: 英雄对象ID

### 位置参数
- `int3 pos`: 三维坐标位置

### 标识符参数
- `SpellID id`: 法术ID
- `ArtifactID id`: 神器ID
- `SecondarySkill id`: 副属性技能ID

### 其他参数
- `bool verbose`: 是否启用详细检查和错误报告
- `std::optional<ui16> level`: 可选的法术等级过滤器

## 返回值说明

- `const CGObjectInstance *`: 地图对象指针（可能为nullptr）
- `const CArtifactInstance *`: 神器实例指针
- `const CGHeroInstance *`: 英雄实例指针
- `const CGTownInstance *`: 城镇实例指针
- `PlayerColor`: 玩家颜色
- `bool`: 布尔值表示检查结果
- `int3`: 地图尺寸坐标

## 实现类

MapInfoCallback是抽象基类，具体实现包括：
- 服务器端的地图信息回调
- 客户端的地图信息回调
- AI的地图信息回调

## 使用示例

```cpp
// 获取地图信息回调
const MapInfoCallback * mapCallback = getMapCallback();

// 检查位置是否有效
int3 position(10, 20, 0);
if (mapCallback->isInTheMap(position)) {
    // 位置在地图内
}

// 获取英雄实例
const CGHeroInstance * hero = mapCallback->getHero(heroId);
if (hero) {
    // 英雄存在
}

// 检查法术是否允许
if (mapCallback->isAllowed(SpellID::FIREBALL)) {
    // 法术被允许
}

// 获取地图尺寸
int3 mapSize = mapCallback->getMapSize();
```

## 安全考虑

MapInfoCallback提供了两级对象访问：

1. **安全访问** (`getObj`): 包含边界检查和错误报告
2. **原始访问** (`getObjInstance`): 直接访问，性能更高但需要调用者确保有效性

## 错误处理

- 无效的对象ID会返回nullptr
- 越界的地图位置检查返回false
- 详细模式下会报告访问错误

## 相关类

- `IGameInfoCallback`: 父类接口
- `CMap`: 地图类
- `CGObjectInstance`: 地图对象基类
- `CGHeroInstance`: 英雄类
- `CGTownInstance`: 城镇类
- `CArtifactInstance`: 神器实例类