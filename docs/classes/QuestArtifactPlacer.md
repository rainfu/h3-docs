# QuestArtifactPlacer

## 源文件

[QuestArtifactPlacer.h](lib/rmg/modificators/QuestArtifactPlacer.h)

## 类定义

```cpp
class QuestArtifactPlacer : public Modificator
```

QuestArtifactPlacer 类继承自 Modificator，用于在随机地图生成过程中放置任务神器（quest artifacts），特别是与Seer Huts相关的神器。

## 宏定义

```cpp
MODIFICATOR(QuestArtifactPlacer);
```

## 嵌套结构体

### QuestArtifactRequest

```cpp
struct QuestArtifactRequest
{
    ArtifactID id;
    ui32 desiredValue;
};
```

表示一个任务神器请求，包含神器ID和期望价值。

### ReplacementCandidate

```cpp
struct ReplacementCandidate
{
    CGObjectInstance* object;
    ui32 value;
};
```

表示一个可以被替换的神器候选对象，包含对象指针和价值。

## 成员变量

```cpp
std::vector<std::shared_ptr<Zone>> questArtZones;
```

用于放置Seer Huts所需神器的区域列表。如果为null，则不放置神器。

```cpp
std::vector<QuestArtifactRequest> questArtifactsToPlace;
```

需要放置的任务神器请求列表。

```cpp
std::vector<ReplacementCandidate> artifactsToReplace;
```

可以被其他区域任务神器替换的普通神器列表。

```cpp
size_t maxQuestArtifacts;
```

最大任务神器数量。

```cpp
std::vector<ArtifactID> questArtifacts;
```

任务神器ID列表。

## 方法

### process()

```cpp
void process() override;
```

重写基类的process方法，执行任务神器的放置逻辑。

### init()

```cpp
void init() override;
```

重写基类的init方法，初始化任务神器放置器。

### addQuestArtZone()

```cpp
void addQuestArtZone(std::shared_ptr<Zone> otherZone);
```

添加一个用于放置任务神器的区域。

### findZonesForQuestArts()

```cpp
void findZonesForQuestArts();
```

查找适合放置任务神器的区域。

### addQuestArtifact()

```cpp
void addQuestArtifact(const ArtifactID& id, ui32 desiredValue);
```

添加一个需要放置的任务神器及其期望价值。

### removeQuestArtifact()

```cpp
void removeQuestArtifact(const ArtifactID& id);
```

从放置列表中移除指定的任务神器。

### rememberPotentialArtifactToReplace()

```cpp
void rememberPotentialArtifactToReplace(CGObjectInstance* obj, ui32 value);
```

记录一个可能被任务神器替换的普通神器。

### drawObjectToReplace()

```cpp
CGObjectInstance * drawObjectToReplace(ui32 desiredValue);
```

根据期望价值选择一个要替换的神器对象。

### getPossibleArtifactsToReplace()

```cpp
std::vector<CGObjectInstance*> getPossibleArtifactsToReplace() const;
```

获取所有可能被替换的神器对象的列表。

### placeQuestArtifacts()

```cpp
void placeQuestArtifacts(vstd::RNG & rand);
```

使用随机数生成器放置任务神器。

### dropReplacedArtifact()

```cpp
void dropReplacedArtifact(const CGObjectInstance* obj);
```

移除被替换的神器对象。

### getMaxQuestArtifactCount()

```cpp
size_t getMaxQuestArtifactCount() const;
```

获取最大任务神器数量。

### drawRandomArtifact()

```cpp
[[nodiscard]] ArtifactID drawRandomArtifact();
```

随机选择一个任务神器ID。

### addRandomArtifact()

```cpp
void addRandomArtifact(const ArtifactID & artid);
```

添加一个随机神器到任务神器列表中。

## 设计特点

QuestArtifactPlacer 专门处理随机地图生成中的任务神器放置逻辑，特别是与Seer Huts（先知小屋）相关的神器。它维护了任务神器的区域分配、价值评估和替换机制，确保地图中的任务内容具有适当的难度和平衡性。

该类通过Modificator接口集成到RMG系统中，能够与其他地图生成组件协同工作，创建具有挑战性和趣味性的任务场景。