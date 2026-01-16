# PathfinderConfig类

PathfinderConfig类是VCMI中路径寻找系统的配置类，用于配置路径寻找算法的各种参数和选项。

## 类定义

```cpp
class PathfinderConfig
{
public:
    /// 路径寻找算法选项
    PathfinderOptions options;

    /// 可用的路径寻找层（陆地、水面、地下等）
    std::vector<EPathfindingLayer> availableLayers;

    /// 各层之间的转换规则
    std::map<std::pair<EPathfindingLayer, EPathfindingLayer>, bool> layerTransitions;

    /// 各种地形的移动成本
    std::map<TerrainId, int> terrainMovementCosts;

    /// 特殊对象的处理规则
    std::map<ObjectIdType, std::function<bool(const CGObjectInstance*)>> objectHandlingRules;

    /// 是否启用高级路径优化
    bool enableAdvancedOptimizations;

    /// 最大搜索深度限制
    int maxSearchDepth;

    /// 最大搜索节点数限制
    int maxSearchNodes;

    /// 构造函数
    PathfinderConfig();

    /// 根据英雄实例创建配置
    static std::shared_ptr<PathfinderConfig> createConfigForHero(const CGHeroInstance * hero);

    /// 获取指定地形的移动成本
    int getTerrainCost(TerrainId terrain) const;

    /// 检查是否允许层间转换
    bool isLayerTransitionAllowed(EPathfindingLayer from, EPathfindingLayer to) const;

    /// 检查对象是否可以通行
    bool isPassable(const CGObjectInstance * obj) const;

    /// 获取可用的路径寻找层
    const std::vector<EPathfindingLayer> & getAvailableLayers() const;

    /// 序列化函数
    template <typename Handler>
    void serialize(Handler & h);
};
```

## 功能说明

PathfinderConfig是VCMI路径寻找系统的配置类，用于定义路径寻找算法的行为和参数。它控制着寻路算法如何处理不同的地形、对象和层级转换。这个类提供了灵活的配置选项，使得寻路算法能够适应不同的游戏对象（如英雄、生物）的移动特性。

## 依赖关系

- [PathfinderOptions](./PathfinderOptions.md): 路径寻找选项
- [EPathfindingLayer](./EPathfindingLayer.md): 路径寻找层枚举
- [TerrainId](../entities/TerrainId.md): 地形ID
- [CGObjectInstance](../mapObjects/CGObjectInstance.md): 游戏对象实例
- [CGHeroInstance](../entities/CGHeroInstance.md): 英雄实例
- STL库: vector, map, function, shared_ptr等

## 函数注释

- `PathfinderConfig()`: 默认构造函数
- `createConfigForHero(hero)`: 静态方法，为指定英雄创建配置
- `getTerrainCost(terrain)`: 获取指定地形的移动成本
- `isLayerTransitionAllowed(from, to)`: 检查是否允许从一层转换到另一层
- `isPassable(obj)`: 检查对象是否可以通行
- `getAvailableLayers()`: 获取可用的路径寻找层
- `serialize(h)`: 序列化方法