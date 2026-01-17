# ArtSlotInfo类

ArtSlotInfo类是VCMI系统中的神器槽位信息类，用于描述神器装备槽位的状态，包括槽位中神器的ID和槽位是否被锁定。

## 类定义

```cpp
struct DLL_LINKAGE ArtSlotInfo : public GameCallbackHolder
{
    ArtifactInstanceID artifactID;        // 神器实例ID
    bool locked = false;                 // 是否锁定，若锁定则artifact指向组合神器

    explicit ArtSlotInfo(IGameInfoCallback * cb);                        // 构造函数
    ArtSlotInfo(const CArtifactInstance * artifact, bool locked);       // 构造函数

    const CArtifactInstance * getArt() const;                           // 获取神器实例
    ArtifactInstanceID getID() const;                                   // 获取ID

    template<typename Handler>
    void serialize(Handler & h)                                         // 序列化
    {
        if(h.saving || h.hasFeature(Handler::Version::NO_RAW_POINTERS_IN_SERIALIZER))
        {
            h & artifactID;
        }
        else
        {
            std::shared_ptr<CArtifactInstance> pointer;
            h & pointer;
            if(pointer->getId() == ArtifactInstanceID())
                CArtifactInstance::saveCompatibilityFixArtifactID(pointer);
            artifactID = pointer->getId();
        }
        h & locked;
    }
};
```

## 功能说明

ArtSlotInfo结构体用于描述神器装备槽位的状态信息，它存储了槽位中神器的ID和槽位的锁定状态。当槽位被锁定时，意味着该槽位属于一个组合神器，不能单独移除其中的部件。

ArtSlotInfo继承自GameCallbackHolder，使其能够参与游戏的回调机制，这对于处理游戏状态变化和同步是必要的。

## 重要方法

### 构造函数
- `ArtSlotInfo(IGameInfoCallback * cb)`：使用回调接口构造实例
- `ArtSlotInfo(const CArtifactInstance * artifact, bool locked)`：使用神器实例和锁定状态构造实例

### 数据访问
- `getArt()`：获取槽位中的神器实例
- `getID()`：获取神器实例ID

### 序列化
- `serialize()`：支持槽位信息的序列化，包括向后兼容性处理

## 设计说明

ArtSlotInfo类设计为一个简单的数据结构，但包含了必要的功能来处理复杂的神器系统：

1. **锁定机制**：locked标志位用于处理组合神器的情况，当槽位被锁定时，不能单独移除其中的神器
2. **序列化兼容性**：在序列化时处理了旧版本兼容性问题，确保游戏存档的向前兼容
3. **回调机制**：继承自GameCallbackHolder，允许槽位信息参与到游戏状态的更新中

该结构体是CArtifactSet类的基础组件，用于表示神器装备槽位的详细信息，是神器系统中不可或缺的一部分。