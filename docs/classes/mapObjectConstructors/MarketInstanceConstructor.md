# MarketInstanceConstructor

## 源文件

[MarketInstanceConstructor.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/MarketInstanceConstructor.h)

## 类定义

```cpp
class MarketInstanceConstructor : public CDefaultObjectTypeHandler<CGMarket>
```

`MarketInstanceConstructor` 是市场实例的构造函数，负责创建和配置允许玩家进行资源交易的市场对象。

## 继承关系

- 继承自 `CDefaultObjectTypeHandler<CGMarket>`

## 成员变量

- `std::string descriptionTextID` - 描述文本ID
- `std::string speechTextID` - 对话文本ID
- `std::set<EMarketMode> marketModes` - 可用的市场模式集合
- `JsonNode predefinedOffer` - 预定义的交易提议
- `int marketEfficiency` - 市场效率

## 方法

### 重写的方法

- `void initTypeData(const JsonNode & config) override` - 初始化类型数据
- `std::shared_ptr<CGMarket> createObject(IGameInfoCallback * cb) const override` - 创建市场对象
- `void randomizeObject(CGMarket * object, IGameRandomizer & gameRandomizer) const override` - 随机化市场对象

### 公共方法

- `const std::set<EMarketMode> & availableModes() const` - 获取可用的市场模式
- `bool hasDescription() const` - 检查是否有描述
- `std::string getDescriptionTextID() const` - 获取描述文本ID
- `std::string getSpeechTranslated() const` - 获取翻译后的对话文本
- `int getMarketEfficiency() const` - 获取市场效率

## 设计特点

- **交易系统**: 支持多种市场模式和交易类型
- **预定义提议**: 可以配置预设的交易选项
- **效率系统**: 市场效率影响交易汇率
- **多语言支持**: 提供描述和对话的文本ID
- **随机化**: 支持市场属性的随机化配置