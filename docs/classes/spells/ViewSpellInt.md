# ViewSpellInt

## 概述

`ViewSpellInt.h` 文件定义了法术视图相关的辅助结构体，主要用于存储和传递地图对象的定位信息。这些结构在法术可视化和地图交互中发挥重要作用。

## ObjectPosInfo 结构体

### 概述
`ObjectPosInfo` 结构体封装了地图对象的完整定位信息，用于法术效果可视化和对象识别。

### 公共成员变量

#### pos
```cpp
int3 pos;
```
- **类型**: `int3` (三维坐标)
- **描述**: 对象在地图上的位置坐标

#### id
```cpp
Obj id = Obj::NO_OBJ;
```
- **类型**: `Obj` (对象类型枚举)
- **默认值**: `Obj::NO_OBJ`
- **描述**: 对象的类型标识

#### subId
```cpp
si32 subId = -1;
```
- **类型**: `si32` (32位有符号整数)
- **默认值**: -1
- **描述**: 对象的子类型标识，用于区分同一类型下的不同变体

#### owner
```cpp
PlayerColor owner = PlayerColor::CANNOT_DETERMINE;
```
- **类型**: `PlayerColor`
- **默认值**: `PlayerColor::CANNOT_DETERMINE`
- **描述**: 对象的所有者颜色

### 构造函数

#### ObjectPosInfo()
```cpp
ObjectPosInfo() = default;
```
- **描述**: 默认构造函数，使用默认值初始化所有成员

#### ObjectPosInfo(const CGObjectInstance * obj)
```cpp
ObjectPosInfo(const CGObjectInstance * obj);
```
- **参数**:
  - `obj`: 地图对象实例的指针
- **描述**: 从地图对象实例构造定位信息
- **初始化逻辑**:
  - `pos`: 从 `obj->visitablePos()` 获取
  - `id`: 从 `obj->ID` 获取
  - `subId`: 从 `obj->getObjTypeIndex()` 获取
  - `owner`: 从 `obj->tempOwner` 获取

### 序列化方法

#### serialize
```cpp
template <typename Handler> void serialize(Handler & h)
```
- **参数**:
  - `h`: 序列化处理器
- **描述**: 支持序列化所有成员变量，用于网络传输和保存

## 使用示例

### 基本构造
```cpp
// 默认构造
ObjectPosInfo defaultInfo;

// 从地图对象构造
const CGObjectInstance* mapObject = getMapObject();
ObjectPosInfo objInfo(mapObject);

// 手动设置信息
ObjectPosInfo manualInfo;
manualInfo.pos = int3(10, 20, 0);
manualInfo.id = Obj::HERO;
manualInfo.subId = 5;
manualInfo.owner = PlayerColor::RED;
```

### 在法术系统中的应用
```cpp
// 在法术可视化中记录目标位置
ObjectPosInfo spellTarget(targetObject);

// 用于网络包传输法术效果信息
void sendSpellEffect(const ObjectPosInfo& targetInfo) {
    // 序列化并发送定位信息
    // ...
}
```

### 序列化使用
```cpp
// 保存到文件
ObjectPosInfo info(mapObject);
JsonSerializer serializer("save.json");
info.serialize(serializer);

// 从网络接收
ObjectPosInfo receivedInfo;
networkStream.serialize(receivedInfo);
```

## 设计意图

ObjectPosInfo 的设计目的是为了：

1. **统一定位信息**: 将地图对象的各种定位属性封装到单个结构体中
2. **网络传输友好**: 支持序列化，便于在客户端和服务器之间传递
3. **类型安全**: 使用强类型枚举和结构体，避免魔数
4. **扩展性**: 可以轻松添加新的定位属性而不破坏现有代码

这在法术效果可视化、地图事件处理和网络通信中都非常有用。