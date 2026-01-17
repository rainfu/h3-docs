# CArtifactFittingSet

## 概述

`CArtifactFittingSet` 类继承自 `CArtifactSet`，用于在实际应用更改之前尝试装备神器。它提供了一个安全的方式来测试神器装备的可能性，而不会影响实际的神器状态。

## 继承关系

```cpp
CArtifactSet
├── GameCallbackHolder
└── CArtifactFittingSet
```

## 主要用途

CArtifactFittingSet 的主要用途包括：

1. **装备测试**: 在实际装备神器之前测试装备的可能性
2. **组合验证**: 检查神器组合是否可行
3. **临时状态**: 提供临时的神器装备状态用于计算和验证
4. **回调支持**: 集成游戏回调系统用于状态查询

## 构造函数

### CArtifactFittingSet(IGameInfoCallback * cb, ArtBearer bearer)
```cpp
CArtifactFittingSet(IGameInfoCallback * cb, ArtBearer bearer);
```
- **参数**:
  - `cb`: 游戏信息回调接口
  - `bearer`: 神器载体类型
- **描述**: 使用指定的回调和载体类型创建装备测试集合

### CArtifactFittingSet(const CArtifactSet & artSet)
```cpp
explicit CArtifactFittingSet(const CArtifactSet & artSet);
```
- **参数**:
  - `artSet`: 要复制的原始神器集合
- **描述**: 从现有的神器集合创建装备测试集合
- **行为**: 复制所有神器状态（装备中、背包中、过渡位置）

## 重写方法

### bearerType
```cpp
ArtBearer bearerType() const override;
```
- **返回值**: 神器载体类型
- **描述**: 返回此装备测试集合的载体类型

### getCallback (私有重写)
```cpp
IGameInfoCallback * getCallback() const final;
```
- **返回值**: 游戏信息回调接口
- **描述**: 返回存储的回调接口指针

## 继承的功能

CArtifactFittingSet 继承了 CArtifactSet 的所有功能，包括：

- 神器装备和移除操作
- 背包管理
- 槽位验证
- 神器查询

但这些操作不会影响原始的神器集合。

## 使用示例

### 测试神器装备
```cpp
// 创建装备测试集合
CArtifactFittingSet testSet(callback, ArtBearer::HERO);

// 复制当前英雄的神器状态
CArtifactFittingSet fittingSet(*hero);

// 尝试装备新神器
if (fittingSet.putArtifact(ArtifactPosition::RIGHT_HAND, newArtifact)) {
    // 装备成功，检查效果
    auto attackBonus = fittingSet.getAttackBonus();
    // 可以安全地测试装备效果
} else {
    // 装备失败
}

// 原始英雄的神器状态保持不变
```

### 验证神器组合
```cpp
// 测试组合神器装配
CArtifactFittingSet testFitting(*hero);

// 尝试装配所有部件
bool canAssemble = true;
for (const auto& part : combinedArtifact->getConstituents()) {
    auto position = testFitting.getArtPos(part->getId(), false, false);
    if (position == ArtifactPosition::PRE_FIRST) {
        canAssemble = false;
        break;
    }
    testFitting.lockSlot(position); // 锁定槽位
}

if (canAssemble) {
    // 可以组装组合神器
    hero->assembleCombinedArtifact(combinedArtifact);
}
```

### 检查装备兼容性
```cpp
// 检查两个神器是否可以同时装备
CArtifactFittingSet compatibilityTest(*hero);

// 装备第一个神器
compatibilityTest.putArtifact(pos1, art1);

// 尝试装备第二个神器
if (compatibilityTest.canPutArtifact(pos2, art2)) {
    // 神器兼容，可以同时装备
} else {
    // 神器冲突
}
```

## 设计意图

CArtifactFittingSet 的设计目的是为了：

1. **安全测试**: 提供无副作用的神器装备测试
2. **状态隔离**: 测试操作不影响原始神器状态
3. **性能优化**: 避免在验证过程中修改实际游戏状态
4. **组合支持**: 便于验证复杂的组合神器装配
5. **回调集成**: 支持游戏状态查询和验证

这在神器装备系统、组合神器装配和装备冲突检测中都非常重要。