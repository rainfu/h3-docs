<!-- 来源: E:\develop\heroes\vcmi\lib\CStack.h -->
# CStack类

CStack类表示VCMI中战斗场景中的单位堆栈，继承自多个基类以支持战斗逻辑和奖励系统。

## 类定义
```cpp
class DLL_LINKAGE CStack final : public CBonusSystemNode, public battle::CUnitState, public battle::IUnitEnvironment
```

## 构造函数
- `CStack(const CStackInstance * base, const PlayerColor & O, int I, BattleSide Side, const SlotID & S)`: 从驻军实例构造
- `CStack(const CStackBasicDescriptor * stack, const PlayerColor & O, int I, BattleSide Side, const SlotID & S = SlotID(255))`: 从堆栈描述符构造
- `CStack()`: 默认构造函数
- `~CStack()`: 析构函数

## 主要属性

### 基本信息
- `ui32 ID`: 堆栈唯一ID
- `CreatureID typeID`: 生物类型ID
- `ui32 baseAmount`: 基础数量
- `PlayerColor owner`: 所有者（255为中立）
- `BattleSide side`: 战斗方
- `SlotID slot`: 驻军位置（255为中立/召唤生物）

### 位置信息
- `BattleHex initialPosition`: 战场初始位置
- `const CStackInstance * base`: 来源驻军槽位

### 缓存
- `bool doubleWideCached`: 双宽缓存

## 主要方法

### 初始化
- `void postDeserialize(const CArmedInstance * army)`: 反序列化后处理
- `void localInit(BattleInfo * battleInfo)`: 本地初始化

### 信息查询
- `std::string getName() const`: 获取名称（单数或复数）
- `ui32 level() const`: 获取等级
- `bool canBeHealed() const`: 是否可以治疗
- `bool isOnNativeTerrain() const`: 是否在本土地形
- `TerrainId getCurrentTerrain() const`: 获取当前地形

### 战斗相关
- `si32 magicResistance() const override`: 获取魔法抗性
- `std::vector<SpellID> activeSpells() const`: 获取活跃法术
- `const CGHeroInstance * getMyHero() const`: 获取所属英雄

### 静态方法
- `static BattleHexArray meleeAttackHexes(...)`: 获取近战攻击六角格
- `static bool isMeleeAttackPossible(...)`: 检查近战攻击是否可能
- `static void prepareAttacked(...)`: 准备被攻击状态

### 单位接口实现
- `const CCreature * unitType() const override`: 获取单位类型
- `int32_t unitBaseAmount() const override`: 获取基础数量
- `uint32_t unitId() const override`: 获取单位ID
- `BattleSide unitSide() const override`: 获取单位方
- `PlayerColor unitOwner() const override`: 获取单位所有者
- `SlotID unitSlot() const override`: 获取单位槽位
- `bool doubleWide() const override`: 是否双宽

### 其他
- `std::string getDescription() const override`: 获取描述
- `bool unitHasAmmoCart(const battle::Unit * unit) const override`: 是否有弹药车
- `PlayerColor unitEffectiveOwner(const battle::Unit * unit) const override`: 获取有效所有者
- `void spendMana(ServerCallback * server, const int spellCost) const override`: 消耗法力
- `const IBonusBearer* getBonusBearer() const override`: 获取奖励承载者

## 序列化
- `template <typename Handler> void serialize(Handler & h)`: 序列化支持

## 私有成员
- `const BattleInfo * battle`: 战斗信息（不序列化）

## 继承关系

- `CBonusSystemNode`: 奖励系统节点
- `battle::CUnitState`: 战斗单位状态
- `battle::IUnitEnvironment`: 单位环境接口