<!-- 来源: E:\develop\heroes\vcmi\lib\ExtraOptionsInfo.h -->
# ExtraOptionsInfo结构体

ExtraOptionsInfo结构体定义了VCMI中游戏的额外选项信息。

## 结构体定义
```cpp
struct DLL_LINKAGE ExtraOptionsInfo
```

## 成员变量

### cheatsAllowed
```cpp
bool cheatsAllowed = true
```
是否允许作弊。

**默认值:** true

### unlimitedReplay
```cpp
bool unlimitedReplay = false
```
是否允许无限重放。

**默认值:** false

## 运算符重载

### operator==
```cpp
bool operator == (const ExtraOptionsInfo & other) const
```
相等比较运算符。

**参数:**
- `other`: 要比较的另一个ExtraOptionsInfo对象

**返回值:**
- 如果所有成员变量相等则返回true

## 序列化支持

### serialize
```cpp
template <typename Handler>
void serialize(Handler &h)
```
序列化支持。

**参数:**
- `h`: 序列化处理器

**功能:**
- 序列化`cheatsAllowed`和`unlimitedReplay`成员

## 设计特点

- 提供游戏额外选项的配置
- 支持序列化以便保存游戏设置
- 具有合理的默认值