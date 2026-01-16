# ESerializationVersion枚举

ESerializationVersion枚举是VCMI中序列化版本控制的枚举类型，用于管理保存游戏的兼容性支持。

## 枚举定义

```cpp
enum class ESerializationVersion : int32_t
{
    NONE = 0,

    RELEASE_160 = 873,
    MINIMAL = RELEASE_160,

    MAP_HEADER_DISPOSED_HEROES, // map header contains disposed heroes list
    NO_RAW_POINTERS_IN_SERIALIZER, // large rework that removed all non-owning pointers from serializer
    STACK_INSTANCE_EXPERIENCE_FIX, // stack experience is stored as total, not as average
    STACK_INSTANCE_ARMY_FIX, // remove serialization of army that owns stack instance
    STORE_UID_COUNTER_IN_CMAP,  // fix crash caused by conflicting instanceName after loading game
    REWARDABLE_EXTENSIONS, // new functionality for rewardable objects
    FLAGGABLE_BONUS_SYSTEM_NODE, // flaggable objects now contain bonus system node
    RANDOMIZATION_REWORK, // random rolls logic has been moved to server
    CUSTOM_BONUS_ICONS, // support for custom icons in bonuses
    SERVER_STATISTICS, // statistics now only saved on server
    OPPOSITE_SIDE_LIMITER_OWNER, // opposite side limiter no longer stores owner in itself
    UNIVERSITY_CONFIG, // town university is configurable
    CAMPAIGN_BONUSES, // new format for scenario bonuses in campaigns
    BONUS_HIDDEN, // hidden bonus
    MORE_MAP_LAYERS, // more map layers
    CONFIGURABLE_RESOURCES, // configurable resources
    CUSTOM_NAMES, // custom names
    BATTLE_ONLY, // battle only mode
    CAMPAIGN_VIDEO, // second video for prolog/epilog in campaigns
    HOTA_MAP_STACK_COUNT, // support Hota 1.7 stack count feature

    CURRENT = HOTA_MAP_STACK_COUNT,
};
```

## 功能说明

ESerializationVersion是VCMI中用于控制保存游戏兼容性的版本枚举。它定义了从最旧支持版本到当前版本的不同序列化格式。这个枚举用于确保旧版本的保存游戏可以在新版本中加载，并且在进行可能破坏兼容性的更改时提供指导。

## 设计说明

- `MINIMAL`: 表示最低支持的版本。只有版本号至少为MINIMAL的保存游戏才能被加载。
- `CURRENT`: 表示当前的保存版本。保存游戏使用CURRENT版本创建。

### 进行破坏性更改的方法：
1. 将MINIMAL改为高于CURRENT的值
2. 删除MINIMAL和CURRENT之间所有的枚举键值及其使用（编译器会检测到）
3. 将CURRENT设为CURRENT = MINIMAL

### 进行非破坏性更改的方法：
1. 在CURRENT之前添加新的枚举值
2. 将CURRENT改为CURRENT = NEW_TEST_KEY

### 在序列化函数中检查版本的示例：
```cpp
if (h.hasFeature(Handler::Version::NEW_TEST_KEY))
    h & newKey; // 加载新版本的保存游戏
else
    newKey = saneDefaultValue; // 加载旧版本的保存游戏
```

## 重要版本说明

- `NONE`: 表示无版本或未知版本
- `RELEASE_160`: 表示1.6.0版本的序列化格式
- `MAP_HEADER_DISPOSED_HEROES`: 地图头部包含已处置英雄列表
- `NO_RAW_POINTERS_IN_SERIALIZER`: 重构了序列化器，移除了所有非拥有指针
- `STACK_INSTANCE_EXPERIENCE_FIX`: 部队经验存储为总数而非平均值
- `CURRENT`: 当前使用的序列化版本，支持Hota 1.7部队计数功能