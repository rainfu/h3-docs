# HillFortInstanceConstructor

## 源文件

[HillFortInstanceConstructor.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/HillFortInstanceConstructor.h)

## 类定义

```cpp
class HillFortInstanceConstructor final : public CDefaultObjectTypeHandler<HillFort>
```

`HillFortInstanceConstructor` 是山丘堡垒实例的构造函数，负责创建和配置山丘堡垒对象。

## 继承关系

- 继承自 `CDefaultObjectTypeHandler<HillFort>`
- 使用 `final` 关键字，禁止进一步继承

## 成员变量

- `JsonNode parameters` - 参数配置

## 方法

### 重写的方法

- `void initTypeData(const JsonNode & config) override` - 初始化类型数据
- `void initializeObject(HillFort * object) const override` - 初始化山丘堡垒对象

## 设计特点

- **专用建筑**: 专门处理山丘堡垒这种特殊地图对象
- **参数化配置**: 通过JSON参数控制堡垒的属性
- **不可继承**: 使用 `final` 确保这是对象层次的最终实现
- **标准接口**: 遵循 `CDefaultObjectTypeHandler` 的标准创建和初始化流程