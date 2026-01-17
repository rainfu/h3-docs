# ObjectDistributor

## 源文件

[ObjectDistributor.h](https://github.com/vcmi/vcmi/blob/master/lib/rmg/modificators/ObjectDistributor.h)

## 类定义

```cpp
class ObjectDistributor : public Modificator
```

`ObjectDistributor` 是随机地图生成器中的对象分发器，负责在地图上智能分布各种特殊对象。

## 继承关系

- 继承自 `Modificator`

## 方法

### 主要处理方法

- `void process() override` - 执行对象分发的主要处理逻辑
- `void init() override` - 初始化对象分发器

### 私有分发方法

- `void distributeLimitedObjects()` - 分发有限对象（如唯一物品、特殊建筑）
- `void distributeSeerHuts()` - 分发先知小屋
- `void distributePrisons()` - 分发监狱

## 设计特点

- **智能分布**: 确保特殊对象在地图上的合理分布
- **游戏平衡**: 防止重要对象过于集中或稀疏
- **多样化**: 处理不同类型的特殊地图对象
- **唯一性保证**: 确保某些对象在地图上只出现一次