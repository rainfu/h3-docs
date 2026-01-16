# CObstacleInstance类

CObstacleInstance类是VCMI战斗系统中障碍物实例的基类，用于表示战场上的各种障碍物。

## 类定义

```cpp
struct DLL_LINKAGE CObstacleInstance : public Serializeable
{
    // 障碍物类型枚举
    enum EObstacleType : ui8
    {
        USUAL,              // 普通障碍
        ABSOLUTE_OBSTACLE,  // 绝对障碍（注意：ABSOLUTE需要下划线是因为它是Windows关键字）
        SPELL_CREATED,      // 法术创造的障碍
        MOAT                // 护城河
    };

    BattleHex pos;                          // 战场上的位置，通常为左下角
    EObstacleType obstacleType = USUAL;     // 障碍物类型
    si32 uniqueID = -1;                    // 唯一ID
    si32 ID = -1;                          // 障碍物ID（定义障碍物类型）

    virtual ~CObstacleInstance() = default; // 虚析构函数

    const ObstacleInfo &getInfo() const;    // 获取障碍信息（仅用于非法术生成的障碍）

    BattleHexArray getBlockedTiles() const; // 获取被阻挡的格子
    BattleHexArray getStoppingTile() const; // 获取阻止移动的格子

    // 以下两个函数描述障碍如何影响受影响的格子
    // 额外效果（如伤害堆栈或消失）在相应的obstacleTypes中硬编码
    virtual bool blocksTiles() const;       // 是否阻挡格子
    virtual bool stopsMovement() const;     // 是否阻止移动（如果单位踏上障碍，则无法继续移动）
    virtual bool triggersEffects() const;   // 是否触发效果
    virtual SpellID getTrigger() const;     // 获取触发器

    virtual BattleHexArray getAffectedTiles() const; // 获取受影响的格子
    virtual bool visibleForSide(BattleSide side, bool hasNativeStack) const; // 对指定方是否可见

    virtual void battleTurnPassed();        // 战斗回合经过时调用

    // 客户端辅助函数，便于渲染动画
    virtual const AnimationPath & getAnimation() const;       // 获取动画路径
    virtual const AnimationPath & getAppearAnimation() const; // 获取出现动画路径
    virtual const AudioPath & getAppearSound() const;         // 获取出现音效路径
    virtual int getAnimationYOffset(int imageHeight) const;   // 获取动画Y偏移

    void toInfo(ObstacleChanges & info, BattleChanges::EOperation operation = BattleChanges::EOperation::ADD); // 转换为信息
    
    virtual void serializeJson(JsonSerializeFormat & handler); // JSON序列化

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};

struct DLL_LINKAGE SpellCreatedObstacle : CObstacleInstance
{
    int32_t turnsRemaining;         // 剩余回合数
    int32_t casterSpellPower;       // 施法者法术强度
    int32_t spellLevel;             // 法术等级
    int32_t minimalDamage;          // 最小伤害（无论施法者的强度和等级如何都应造成的伤害）
    BattleSide casterSide;          // 施法方

    SpellID trigger;                // 触发法术ID

    bool hidden;                    // 是否隐藏
    bool passable;                  // 是否可通过
    bool trap;                      // 是否为陷阱
    bool removeOnTrigger;           // 触发时是否移除
    bool revealed;                  // 是否已揭示
    bool nativeVisible;             // 本土地形生物是否能看到障碍

    AudioPath appearSound;          // 出现音效路径
    AnimationPath appearAnimation;  // 出现动画路径
    AnimationPath animation;        // 动画路径

    int animationYOffset;           // 动画Y偏移

    BattleHexArray customSize;      // 自定义尺寸

    SpellCreatedObstacle();         // 构造函数

    BattleHexArray getAffectedTiles() const override; // 获取受影响的格子
    bool visibleForSide(BattleSide side, bool hasNativeStack) const override; // 对指定方是否可见

    bool blocksTiles() const override;    // 是否阻挡格子
    bool stopsMovement() const override;  // 是否阻止移动
    SpellID getTrigger() const override;  // 获取触发器

    void battleTurnPassed() override;     // 战斗回合经过时调用

    // 客户端辅助函数，便于渲染动画
    const AnimationPath & getAnimation() const override;       // 获取动画路径
    const AnimationPath & getAppearAnimation() const override; // 获取出现动画路径
    const AudioPath & getAppearSound() const override;         // 获取出现音效路径
    int getAnimationYOffset(int imageHeight) const override;   // 获取动画Y偏移

    void fromInfo(const ObstacleChanges & info); // 从信息创建

    void serializeJson(JsonSerializeFormat & handler) override; // JSON序列化

    template <typename Handler> void serialize(Handler &h); // 序列化函数
};
```

## 功能说明

CObstacleInstance是VCMI战斗系统中所有障碍物的基础类。它定义了战场上各种障碍物的通用属性和行为。障碍物可以是静态的（如城墙部分、岩石等）或动态的（如法术创建的障碍物）。该类提供了处理障碍物在战斗中位置、类型、影响区域等功能的通用接口。

SpellCreatedObstacle是CObstacleInstance的派生类，专门用于表示由法术创建的障碍物，如"飞行毯"、"火墙"等。这些障碍物具有特殊的属性，如持续时间、施法者信息等。

## 枚举

- `EObstacleType`: 障碍物类型枚举，定义了不同类型的障碍物：
  - `USUAL`: 普通障碍物
  - `ABSOLUTE_OBSTACLE`: 绝对障碍物（完全阻挡）
  - `SPELL_CREATED`: 由法术创建的障碍物
  - `MOAT`: 护城河

## 成员变量

### CObstacleInstance成员变量
- `pos`: 障碍物在战场上的位置，通常为左下角
- `obstacleType`: 障碍物类型
- `uniqueID`: 障碍物的唯一ID
- `ID`: 障碍物ID（定义障碍物类型）

### SpellCreatedObstacle成员变量
- `turnsRemaining`: 剩余持续回合数
- `casterSpellPower`: 施法者的法术强度
- `spellLevel`: 法术等级
- `minimalDamage`: 最小伤害值
- `casterSide`: 施法方
- `trigger`: 触发法术ID
- `hidden`: 是否隐藏
- `passable`: 是否可通过
- `trap`: 是否为陷阱
- `removeOnTrigger`: 触发时是否移除
- `revealed`: 是否已揭示
- `nativeVisible`: 本土地形生物是否能看到障碍
- `appearSound`: 出现音效路径
- `appearAnimation`: 出现动画路径
- `animation`: 动画路径
- `animationYOffset`: 动画Y偏移
- `customSize`: 自定义尺寸

## 设计说明

CObstacleInstance类采用了面向对象的继承设计，通过基类定义通用接口，派生类实现特定行为。这样的设计使得系统可以统一处理各种类型的障碍物，同时又能针对特殊类型的障碍物（如法术创建的障碍物）实现特定功能。

SpellCreatedObstacle类提供了更丰富的功能，包括持续时间、施法者信息、视觉和听觉效果等，这些都是法术创造障碍物所特有的属性。