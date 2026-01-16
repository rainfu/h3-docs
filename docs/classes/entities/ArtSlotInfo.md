# ArtSlotInfo类

ArtSlotInfo类是VCMI中神器槽位信息结构，用于存储神器槽位的相关信息，包括神器实例ID和锁定状态。

## 类定义

```cpp
struct DLL_LINKAGE ArtSlotInfo : public GameCallbackHolder
{
    ArtifactInstanceID artifactID;
    bool locked = false; //如果锁定，则神器指向组合神器

    explicit ArtSlotInfo(IGameInfoCallback * cb);
    ArtSlotInfo(const CArtifactInstance * artifact, bool locked);

    const CArtifactInstance * getArt() const;
    ArtifactInstanceID getID() const;

    template<typename Handler>
    void serialize(Handler & h)
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

ArtSlotInfo是VCMI神器系统中表示神器槽位信息的结构体，用于存储单个神器槽位的相关信息。它包含神器实例ID和锁定状态，其中锁定状态用于标识该槽位是否被锁定（通常是因为该槽位是某个组合神器的一部分）。该结构体继承自GameCallbackHolder，以便能够访问游戏回调系统。

## 依赖关系

- [GameCallbackHolder](./GameCallbackHolder.md): 游戏回调持有者
- [CArtifactInstance](./CArtifactInstance.md): 神器实例
- [ArtifactInstanceID](./ArtifactInstanceID.md): 神器实例ID
- [IGameInfoCallback](../gameState/IGameInfoCallback.md): 游戏信息回调接口
- STL库: shared_ptr等

## 函数注释

- `ArtSlotInfo(cb)`: 构造函数，使用游戏回调创建槽位信息
- `ArtSlotInfo(artifact, locked)`: 构造函数，使用神器实例和锁定状态创建槽位信息
- `getArt()`: 获取神器实例
- `getID()`: 获取神器实例ID
- `serialize(h)`: 序列化方法，处理向后兼容性，确保在新旧版本间的兼容