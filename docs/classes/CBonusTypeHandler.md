<!-- 来源: E:\develop\heroes\vcmi\lib\CBonusTypeHandler.h -->
# CBonusTypeHandler头文件

CBonusTypeHandler头文件定义了VCMI中奖励类型管理的相关类。

## CBonusType类

### 类定义
```cpp
class DLL_LINKAGE CBonusType : boost::noncopyable
```

### 主要方法
- `std::string getDescriptionTextID() const`: 获取描述文本ID

### 私有属性
- `ImagePath icon`: 图标路径
- `std::map<int, ImagePath> subtypeIcons`: 子类型图标映射
- `std::map<int, ImagePath> valueIcons`: 值图标映射
- `std::map<int, std::string> subtypeDescriptions`: 子类型描述映射
- `std::map<int, std::string> valueDescriptions`: 值描述映射
- `std::string identifier`: 标识符
- `bool creatureNature`: 是否为生物性质奖励
- `bool hidden`: 是否隐藏
- `bool blockDescriptionPropagation`: 是否阻止描述传播

## CBonusTypeHandler类

### 类定义
```cpp
class DLL_LINKAGE CBonusTypeHandler : public IBonusTypeHandler
```

### 构造函数和析构函数
- `CBonusTypeHandler()`: 构造函数
- `virtual ~CBonusTypeHandler()`: 虚析构函数

### 主要方法

#### 奖励转换方法
- `std::string bonusToString(const std::shared_ptr<Bonus> & bonus, const IBonusBearer * bearer) const override`: 将奖励转换为字符串
- `ImagePath bonusToGraphics(const std::shared_ptr<Bonus> & bonus) const override`: 获取奖励图形

#### 数据加载方法
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据
- `void loadObject(std::string scope, std::string name, const JsonNode & data) override`: 加载对象
- `void loadObject(std::string scope, std::string name, const JsonNode & data, size_t index) override`: 加载带索引的对象

#### 查询方法
- `const std::string & bonusToString(BonusType bonus) const`: 奖励类型转换为字符串
- `bool isCreatureNatureBonus(BonusType bonus) const`: 检查是否为生物性质奖励
- `bool shouldPropagateDescription(BonusType bonus) const`: 检查是否应该传播描述
- `std::vector<BonusType> getAllObjets() const`: 获取所有对象

### 私有方法
- `void loadItem(const JsonNode & source, CBonusType & dest, const std::string & name) const`: 加载项目

### 私有成员
- `std::vector<std::string> builtinBonusNames`: 内置奖励名称列表
- `std::vector<std::shared_ptr<CBonusType>> bonusTypes`: 奖励类型列表（索引 = BonusType）

## 相关类型

- `BonusType`: 奖励类型枚举
- `ImagePath`: 图像路径类型
- `IBonusTypeHandler`: 奖励类型处理器接口
- `IBonusBearer`: 奖励承载者接口