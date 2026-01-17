<!-- 来源: E:\develop\heroes\vcmi\lib\BattleFieldHandler.h -->
# BattleFieldHandler头文件

BattleFieldHandler头文件定义了VCMI中战场管理的相关类，包括战场信息、战场服务和战场处理器。

## BattleFieldInfo类

### 类定义
```cpp
class BattleFieldInfo : public EntityT<BattleField>
```

### 构造函数
- `BattleFieldInfo()`: 默认构造函数
- `BattleFieldInfo(BattleField battlefield, std::string identifier)`: 构造指定战场和标识符的战场信息

### 主要属性
- `BattleField battlefield`: 战场枚举值
- `std::vector<std::shared_ptr<Bonus>> bonuses`: 战场奖励列表
- `bool isSpecial`: 是否为特殊战场
- `ImagePath graphics`: 战场图形路径
- `std::string name`: 战场名称
- `std::string modScope`: 模组范围
- `std::string identifier`: 战场标识符
- `std::string icon`: 图标路径
- `si32 iconIndex`: 图标索引
- `BattleHexArray impassableHexes`: 不可通行六角格数组
- `AudioPath openingSoundFilename`: 开场音效文件名
- `AudioPath musicFilename`: 背景音乐文件名

### 重写方法
- `int32_t getIndex() const override`: 获取索引
- `int32_t getIconIndex() const override`: 获取图标索引
- `std::string getJsonKey() const override`: 获取JSON键
- `std::string getModScope() const override`: 获取模组范围
- `std::string getNameTextID() const override`: 获取名称文本ID
- `std::string getNameTranslated() const override`: 获取翻译后的名称
- `void registerIcons(const IconRegistar & cb) const override`: 注册图标
- `BattleField getId() const override`: 获取战场ID

## BattleFieldService类

### 类定义
```cpp
class DLL_LINKAGE BattleFieldService : public EntityServiceT<BattleField, BattleFieldInfo>
```

战场服务类，继承自实体服务模板类。

## BattleFieldHandler类

### 类定义
```cpp
class BattleFieldHandler : public CHandlerBase<BattleField, BattleFieldInfo, BattleFieldInfo, BattleFieldService>
```

### 主要方法
- `std::shared_ptr<BattleFieldInfo> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & identifier, size_t index) override`: 从JSON加载战场信息
- `const std::vector<std::string> & getTypeNames() const override`: 获取类型名称列表
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据

## 相关类型

- `BattleField`: 战场枚举类型
- `BattleHexArray`: 战场六角格数组
- `ImagePath`: 图像路径
- `AudioPath`: 音频路径