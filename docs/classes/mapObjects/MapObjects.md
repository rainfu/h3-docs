# MapObjects

## 概述

`MapObjects.h` 是VCMI中地图对象的集合头文件，提供所有主要地图对象类的统一包含入口。该头文件类似于旧的CObjectHandler.h，集中包含了游戏中所有重要的地图对象类型。

## 包含的类

### 核心地图对象

```cpp
#include "CGDwelling.h"           // 居民点对象
#include "CGHeroInstance.h"       // 英雄实例
#include "CGMarket.h"             // 市场对象
#include "CGTownInstance.h"       // 城镇实例
#include "CGPandoraBox.h"         // 潘多拉魔盒和事件对象
#include "CRewardableObject.h"    // 可奖励对象
#include "MiscObjects.h"          // 杂项对象
```

## 主要对象类型

### 居民点 (Dwellings)
- **CGDwelling**: 基础居民点类，支持生物招募和升级
- 提供各种生物类型的招募功能
- 支持守护者和访问限制

### 英雄 (Heroes)
- **CGHeroInstance**: 英雄实例类，完整的英雄功能实现
- 包含移动、战斗、技能、装备等所有英雄相关功能
- 支持路径查找和地图交互

### 市场 (Markets)
- **CGMarket**: 基础市场类，支持多种交易模式
- 包括城镇市场、黑市、大学等特殊市场类型
- 处理资源、生物、神器、技能间的交易

### 城镇 (Towns)
- **CGTownInstance**: 城镇实例类，完整的城镇功能
- 包含建筑、驻军、英雄驻扎、魔法 guild 等
- 支持城镇发展、税收、生物生产

### 奖励对象 (Rewardable Objects)
- **CGPandoraBox**: 潘多拉魔盒和事件对象
- **CRewardableObject**: 可奖励对象的基类
- 支持奖励授予、守护战斗、多重选择

### 杂项对象 (Miscellaneous)
- **MiscObjects.h**: 包含各种特殊对象
- 包括地标、装饰物、特殊功能对象等

## 使用方法

### 包含所有地图对象

```cpp
#include "mapObjects/MapObjects.h"

// 现在可以直接使用所有地图对象类
auto hero = std::make_shared<CGHeroInstance>();
auto town = std::make_shared<CGTownInstance>();
auto market = std::make_shared<CGMarket>();
auto dwelling = std::make_shared<CGDwelling>();
```

### 对象创建和管理

```cpp
#include "mapObjects/MapObjects.h"

// 创建不同类型的地图对象
std::vector<std::shared_ptr<CGObjectInstance>> objects;

// 英雄
objects.push_back(std::make_shared<CGHeroInstance>(cb));

// 城镇
objects.push_back(std::make_shared<CGTownInstance>(cb));

// 市场
objects.push_back(std::make_shared<CGBlackMarket>(cb)); // 黑市
objects.push_back(std::make_shared<CGUniversity>(cb));  // 大学

// 居民点
objects.push_back(std::make_shared<CGDwelling>(cb));

// 奖励对象
objects.push_back(std::make_shared<CGPandoraBox>(cb));
objects.push_back(std::make_shared<CGEvent>(cb));
```

### 类型检查和转换

```cpp
#include "mapObjects/MapObjects.h"

void processMapObject(const CGObjectInstance * obj)
{
    if (auto hero = dynamic_cast<const CGHeroInstance *>(obj))
    {
        // 处理英雄对象
        hero->getMovementPoints();
    }
    else if (auto town = dynamic_cast<const CGTownInstance *>(obj))
    {
        // 处理城镇对象
        town->getTownLevel();
    }
    else if (auto market = dynamic_cast<const CGMarket *>(obj))
    {
        // 处理市场对象
        market->availableModes();
    }
    else if (auto dwelling = dynamic_cast<const CGDwelling *>(obj))
    {
        // 处理居民点对象
        dwelling->getGrowthInfo();
    }
}
```

## 架构优势

### 统一包含
- **单一入口**: 一个头文件包含所有地图对象
- **简化依赖**: 减少复杂的包含关系
- **维护便利**: 集中管理地图对象类型

### 类型安全
- **继承层次**: 清晰的类继承关系
- **接口一致**: 统一的访问和操作接口
- **多态支持**: 支持运行时类型检查和转换

### 扩展性
- **模块化设计**: 每个对象类型独立实现
- **易于添加**: 新对象类型只需添加到此头文件
- **向后兼容**: 不影响现有代码

## 相关文档

- [CGObjectInstance](CGObjectInstance.md) - 地图对象基类
- [CGHeroInstance](CGHeroInstance.md) - 英雄实例
- [CGTownInstance](CGTownInstance.md) - 城镇实例
- [CGMarket](CGMarket.md) - 市场对象
- [CGDwelling](CGDwelling.md) - 居民点对象
- [CRewardableObject](CRewardableObject.md) - 可奖励对象