# CGObjectInstance

地图对象实例基类，所有地图对象的基类。

## 📋 类概述

`CGObjectInstance` 是 VCMI 中所有地图对象实例的基类，包括城镇、英雄、生物、资源等各种地图元素。该类定义了地图对象的通用属性和行为，如位置、所有者、外观、访问规则等。

## 🔧 主要属性

### 基本标识
- `ID`: 对象类型ID（如城镇、英雄、生物等）
- `subID`: 对象子类型ID（依赖于类型）
- `id`: 对象在地图对象列表中的索引
- `instanceName`: 实例名称

### 位置和外观
- `pos`: 对象在地图上的位置（右下角坐标）
- `appearance`: 对象外观模板（动画、阻挡格子等）
- `tempOwner`: 当前所有者（玩家颜色）

### 访问控制
- `blockVisit`: 是否阻挡访问
- `removable`: 是否可移除

## 🎯 核心方法

### 基本信息查询
```cpp
// 获取对象类型和子类型
MapObjectID getObjGroupIndex() const;
MapObjectSubID getObjTypeIndex() const;

// 获取名称
std::string getTypeName() const;
std::string getSubtypeName() const;
std::string getObjectName() const;
```

### 位置和尺寸
```cpp
// 获取对象尺寸
int getWidth() const;  // 宽度（格子数）
int getHeight() const; // 高度（格子数）

// 获取关键位置
int3 visitablePos() const;     // 可访问位置
int3 anchorPos() const;        // 锚点位置
int3 getSightCenter() const;   // 视野中心
```

### 访问和阻挡检查
```cpp
// 检查位置属性
bool visitableAt(const int3 & pos) const;  // 是否可访问
bool blockingAt(const int3 & pos) const;   // 是否阻挡
bool coveringAt(const int3 & pos) const;   // 是否覆盖

// 获取阻挡位置集合
std::set<int3> getBlockedPos() const;
const std::set<int3> & getBlockedOffsets() const;
```

### 所有者管理
```cpp
// 所有者操作
PlayerColor getOwner() const;
void setOwner(const PlayerColor & ow);
```

### 虚拟方法（可重写）
```cpp
// 访问相关
virtual bool passableFor(PlayerColor color) const;
virtual int getSightRadius() const;
virtual bool isBlockedVisitable() const;
virtual bool isCoastVisitable() const;

// 显示文本
virtual std::string getHoverText(PlayerColor player) const;
virtual std::string getHoverText(const CGHeroInstance * hero) const;
virtual std::string getPopupText(PlayerColor player) const;
virtual std::string getPopupText(const CGHeroInstance * hero) const;

// 组件获取
virtual std::vector<Component> getPopupComponents(PlayerColor player) const;
virtual std::vector<Component> getPopupComponents(const CGHeroInstance * hero) const;
```

## 🔗 依赖关系

- **基类**：IObjectInterface
- **关联类**：ObjectTemplate, CMap, CGameState, CGHeroInstance
- **关联模块**：bonuses/, constants/, filesystem/, int3.h

## 💡 使用示例

### 创建地图对象
```cpp
// 创建一个地图对象实例
CGObjectInstance * obj = new CGTownInstance(); // 城镇实例
obj->ID = MapObjectID::TOWN;
obj->pos = int3(10, 15, 0); // 设置位置
obj->tempOwner = PlayerColor::RED; // 设置所有者
```

### 检查对象属性
```cpp
// 检查对象是否可访问
if (obj->isVisitable())
{
    int3 visitPos = obj->visitablePos();
    // 处理访问逻辑
}

// 获取阻挡的格子
auto blockedTiles = obj->getBlockedPos();
for (const auto & tile : blockedTiles)
{
    // 处理阻挡逻辑
}
```

### 序列化支持
```cpp
// 二进制序列化
template <typename Handler>
void serialize(Handler &h)
{
    h & instanceName;
    h & pos;
    h & ID;
    // ... 其他属性
}

// JSON 序列化
void serializeJson(JsonSerializeFormat & handler);
```

## 📝 实现说明

- **模板方法模式**：使用模板序列化支持不同序列化器
- **多态设计**：大量虚方法支持不同对象类型的定制行为
- **坐标系统**：使用 int3 表示地图三维坐标
- **外观分离**：使用 ObjectTemplate 分离逻辑和显示

## 🔍 相关类

- **派生类**：
  - `CGTownInstance` - 城镇实例
  - `CGHeroInstance` - 英雄实例
  - `CGCreature` - 生物实例
  - `CGResource` - 资源实例

- **关联类**：
  - `IObjectInterface` - 对象接口
  - `ObjectTemplate` - 外观模板
  - `CMap` - 地图类

## ⚡ 性能特性

- **延迟加载**：外观和类型处理器按需加载
- **缓存友好**：连续内存布局的基本属性
- **虚函数优化**：关键路径避免虚函数调用