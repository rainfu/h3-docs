# PrisonHeroPlacer

## 源文件

[PrisonHeroPlacer.h](https://github.com/vcmi/vcmi/blob/master/lib/rmg/modificators/PrisonHeroPlacer.h)

## 类定义

```cpp
class PrisonHeroPlacer : public Modificator
```

`PrisonHeroPlacer` 是随机地图生成器中的监狱英雄放置器，负责在监狱中放置被囚禁的英雄。

## 继承关系

- 继承自 `Modificator`

## 成员变量

- `size_t reservedHeroes` - 保留的英雄数量
- `std::vector<HeroTypeID> allowedHeroes` - 允许的英雄列表

## 方法

### 主要处理方法

- `void process() override` - 执行监狱英雄放置的主要处理逻辑
- `void init() override` - 初始化监狱英雄放置器

### 英雄管理方法

- `int getPrisonsRemaining() const` - 获取剩余监狱数量
- `[[nodiscard]] HeroTypeID drawRandomHero()` - 随机抽取英雄
- `void restoreDrawnHero(const HeroTypeID & hid)` - 恢复已抽取的英雄

### 私有方法

- `void getAllowedHeroes()` - 获取允许的英雄列表

## 设计特点

- **英雄随机化**: 从允许的英雄列表中随机选择
- **数量控制**: 跟踪剩余监狱和保留英雄数量
- **可恢复**: 支持将抽取的英雄放回列表
- **配置驱动**: 根据游戏设置确定允许的英雄类型