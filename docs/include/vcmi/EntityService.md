# EntityService

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi\EntityService.h`

## 概述
`EntityService`定义了VCMI引擎中实体服务的基础接口。该文件定义了[EntityService](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/EntityService.h#L15-L22)基类和[EntityServiceT](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/EntityService.h#L25-L33)模板类，用于管理游戏中的各种实体。

## 类定义

### EntityService
基础实体服务类，定义了访问和管理实体的通用接口。

#### 公共方法
- `virtual const Entity * getBaseByIndex(const int32_t index) const = 0;`
  - 功能：根据索引获取实体
  - 参数：index - 实体索引
  - 返回值：指向实体的常量指针

- `virtual void forEachBase(const std::function<void(const Entity * entity, bool & stop)> & cb) const = 0;`
  - 功能：遍历所有实体
  - 参数：cb - 遍历回调函数，接收实体指针和停止标志的引用

### EntityServiceT
模板实体服务类，继承自[EntityService](file:///e:/develop/heroes/vcmi-assets/vcmi-client/include/vcmi/EntityService.h#L15-L22)，针对特定类型的实体提供专门的访问接口。

#### 公共方法
- `virtual const EntityType * getById(const IdType & id) const = 0;`
  - 功能：根据ID获取实体
  - 参数：id - 实体ID
  - 返回值：指向实体类型的常量指针

- `virtual const EntityType * getByIndex(const int32_t index) const = 0;`
  - 功能：根据索引获取实体
  - 参数：index - 实体索引
  - 返回值：指向实体类型的常量指针

- `virtual void forEach(const std::function<void(const EntityType * entity, bool & stop)> & cb) const = 0;`
  - 功能：遍历所有特定类型的实体
  - 参数：cb - 遍历回调函数，接收实体类型指针和停止标志的引用