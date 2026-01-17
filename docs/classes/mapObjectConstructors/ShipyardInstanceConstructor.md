# ShipyardInstanceConstructor

## 源文件

[ShipyardInstanceConstructor.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/ShipyardInstanceConstructor.h)

## 类定义

```cpp
class ShipyardInstanceConstructor final : public CDefaultObjectTypeHandler<CGShipyard>
```

`ShipyardInstanceConstructor` 是船厂实例的构造函数，负责创建和配置允许玩家建造船只的船厂对象。

## 继承关系

- 继承自 `CDefaultObjectTypeHandler<CGShipyard>`
- 使用 `final` 关键字，禁止进一步继承

## 成员变量

- `JsonNode parameters` - 参数配置

## 方法

### 重写的方法

- `void initTypeData(const JsonNode & config) override` - 初始化类型数据
- `void initializeObject(CGShipyard * object) const override` - 初始化船厂对象

## 设计特点

- **船只建造**: 专门处理船只建造设施
- **参数化配置**: 通过JSON参数控制船厂的属性
- **不可继承**: 使用 `final` 确保这是对象层次的最终实现
- **标准接口**: 遵循 `CDefaultObjectTypeHandler` 的标准创建和初始化流程