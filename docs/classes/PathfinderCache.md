<!-- 来源: E:\develop\heroes\vcmi\lib\pathfinder\PathfinderCache.h -->
# PathfinderCache头文件

PathfinderCache头文件定义了VCMI中寻路缓存类，用于缓存和重用英雄的路径计算结果。

## PathfinderCache类

### 类定义
```cpp
class DLL_LINKAGE PathfinderCache
```

### 私有成员
- `const IGameInfoCallback * cb`: 游戏信息回调指针
- `std::mutex pathCacheMutex`: 路径缓存互斥量
- `std::map<const CGHeroInstance *, std::shared_ptr<CPathsInfo>> pathCache`: 路径缓存映射
- `PathfinderOptions options`: 寻路选项

### 私有方法
- `std::shared_ptr<PathfinderConfig> createConfig(const CGHeroInstance *h, CPathsInfo &out)`: 创建寻路配置
- `std::shared_ptr<CPathsInfo> buildPaths(const CGHeroInstance *h)`: 构建路径

### 构造函数
- `PathfinderCache(const IGameInfoCallback * cb, const PathfinderOptions & options)`: 构造函数

### 公共方法
- `void invalidatePaths()`: 使所有缓存路径无效并清除
- `std::shared_ptr<const CPathsInfo> getPathsInfo(const CGHeroInstance * h)`: 获取指定英雄的路径信息

## 设计特点

- 提供路径计算结果的缓存机制，提高性能
- 线程安全，使用互斥量保护缓存访问
- 支持按英雄缓存路径信息
- 提供缓存失效功能以处理游戏状态变化