<!-- 来源: E:\develop\heroes\vcmi\lib\IBonusTypeHandler.h -->
# IBonusTypeHandler接口

IBonusTypeHandler接口定义了奖励类型处理器的高级接口。

## 接口定义
```cpp
class DLL_LINKAGE IBonusTypeHandler : public IHandlerBase
```

## 析构函数
- `virtual ~IBonusTypeHandler() = default`: 虚析构函数

## 纯虚方法

### bonusToString
```cpp
virtual std::string bonusToString(const std::shared_ptr<Bonus> & bonus, const IBonusBearer * bearer) const = 0
```
将奖励转换为字符串表示。

**参数:**
- `bonus`: 奖励对象智能指针
- `bearer`: 奖励承载者指针

**返回值:**
- 奖励的字符串表示

### bonusToGraphics
```cpp
virtual ImagePath bonusToGraphics(const std::shared_ptr<Bonus> & bonus) const = 0
```
获取奖励的图形表示。

**参数:**
- `bonus`: 奖励对象智能指针

**返回值:**
- 奖励的图像路径

## 相关类型

- `Bonus`: 奖励结构体
- `IBonusBearer`: 奖励承载者接口
- `ImagePath`: 图像路径类型
- `IHandlerBase`: 处理器基类接口

## 设计特点

- 提供统一的奖励显示接口
- 支持文本和图形两种表示方式
- 允许根据承载者自定义奖励描述