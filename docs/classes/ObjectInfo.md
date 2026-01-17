<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\ObjectInfo.h -->
# ObjectInfo头文件

ObjectInfo头文件定义了VCMI中随机地图生成器的对象信息结构体，用于描述地图对象的生成配置。

## ObjectInfo结构体

### 结构体定义
```cpp
struct DLL_LINKAGE ObjectInfo
```

### 构造函数
- `ObjectInfo()`: 默认构造函数
- `ObjectInfo(si32 ID, si32 subID)`: 带ID参数的构造函数
- `ObjectInfo(CompoundMapObjectID id)`: 带复合ID的构造函数
- `ObjectInfo(const ObjectInfo & other)`: 拷贝构造函数

### 赋值运算符
- `ObjectInfo & operator=(const ObjectInfo & other)`: 赋值运算符

### 成员变量
- `std::vector<std::shared_ptr<const ObjectTemplate>> templates`: 对象模板列表
- `si32 primaryID`: 主ID
- `si32 secondaryID`: 次ID
- `ui32 value`: 值
- `ui16 probability`: 概率
- `ui32 maxPerZone`: 每个区域最大数量

### 函数对象
- `std::function<std::shared_ptr<CGObjectInstance>()> generateObject`: 对象生成函数
- `std::function<void(CGObjectInstance &)> destroyObject`: 对象销毁函数

### 主要方法
- `void setAllTemplates(MapObjectID type, MapObjectSubID subtype)`: 设置所有模板
- `void setTemplates(MapObjectID type, MapObjectSubID subtype, TerrainId terrain)`: 设置特定地形的模板
- `CompoundMapObjectID getCompoundID() const`: 获取复合ID

## 设计特点

- 封装对象生成的所有必要信息
- 支持多种模板和地形配置
- 提供概率和数量控制
- 包含生成和销毁的回调函数