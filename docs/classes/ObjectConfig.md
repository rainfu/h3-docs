<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\ObjectConfig.h -->
# ObjectConfig头文件

ObjectConfig头文件定义了VCMI中随机地图生成器的对象配置类，用于管理对象生成规则和限制。

## ObjectConfig类

### 类定义
```cpp
class DLL_LINKAGE ObjectConfig
```

### 枚举类型
```cpp
enum class EObjectCategory
```
- `OTHER = -2`: 其他
- `ALL = -1`: 全部
- `NONE = 0`: 无
- `CREATURE_BANK = 1`: 生物银行
- `BONUS`: 奖励
- `DWELLING`: 建筑
- `RESOURCE`: 资源
- `RESOURCE_GENERATOR`: 资源生成器
- `SPELL_SCROLL`: 法术卷轴
- `RANDOM_ARTIFACT`: 随机神器
- `PANDORAS_BOX`: 潘多拉魔盒
- `QUEST_ARTIFACT`: 任务神器
- `SEER_HUT`: 预言者小屋

### 主要方法
- `void addBannedObject(const CompoundMapObjectID & objid)`: 添加禁止对象
- `void addCustomObject(const ObjectInfo & object)`: 添加自定义对象
- `void clearBannedObjects()`: 清除禁止对象列表
- `void clearCustomObjects()`: 清除自定义对象列表
- `const std::vector<CompoundMapObjectID> & getBannedObjects() const`: 获取禁止对象列表
- `const std::vector<EObjectCategory> & getBannedObjectCategories() const`: 获取禁止对象类别列表
- `const std::vector<ObjectInfo> & getConfiguredObjects() const`: 获取配置对象列表

### 序列化支持
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化

### 私有成员
- `std::vector<CompoundMapObjectID> bannedObjects`: 禁止对象列表
- `std::vector<EObjectCategory> bannedObjectCategories`: 禁止对象类别列表
- `std::vector<ObjectInfo> customObjects`: 自定义对象列表

## 设计特点

- 支持按对象ID和类别禁止对象生成
- 允许添加自定义对象配置
- 提供完整的对象过滤机制
- 支持JSON序列化以便保存配置