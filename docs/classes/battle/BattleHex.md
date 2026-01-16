# BattleHex类

BattleHex类是VCMI战斗系统中战场六边形瓦片的表示类，用于表示战场上的六角形格子。

## 类定义

```cpp
class DLL_LINKAGE BattleHex
{
public:
    // 城堡攻城相关的辅助常量
    static constexpr si16 CASTLE_CENTRAL_TOWER = -2;   // 城堡中央塔
    static constexpr si16 CASTLE_BOTTOM_TOWER = -3;    // 城堡底部塔
    static constexpr si16 CASTLE_UPPER_TOWER = -4;     // 城堡上部塔

    // 英雄交互相关的常量
    static constexpr si16 HERO_ATTACKER = 0;           // 攻击方英雄
    static constexpr si16 HERO_DEFENDER = GameConstants::BFIELD_WIDTH - 1; // 防守方英雄

    // 渲染相关的辅助常量
    static constexpr si16 HEX_BEFORE_ALL = std::numeric_limits<si16>::min(); // 所有格子之前
    static constexpr si16 HEX_AFTER_ALL = std::numeric_limits<si16>::max();  // 所有格子之后

    // 城墙和城门相关常量
    static constexpr si16 DESTRUCTIBLE_WALL_1 = 29;    // 可摧毁城墙1
    static constexpr si16 DESTRUCTIBLE_WALL_2 = 78;    // 可摧毁城墙2
    static constexpr si16 DESTRUCTIBLE_WALL_3 = 130;   // 可摧毁城墙3
    static constexpr si16 DESTRUCTIBLE_WALL_4 = 182;   // 可摧毁城墙4
    static constexpr si16 GATE_BRIDGE = 94;            // 桥梁门
    static constexpr si16 GATE_OUTER = 95;             // 外部门
    static constexpr si16 GATE_INNER = 96;             // 内部门

    static constexpr si16 INVALID = -1;                // 无效格子

    // 方向枚举
    enum EDir
    {
        NONE = -1,

        TOP_LEFT,      // 左上
        TOP_RIGHT,     // 右上
        RIGHT,         // 右
        BOTTOM_RIGHT,  // 右下
        BOTTOM_LEFT,   // 左下
        LEFT,          // 左

        // 注意：BattleHex类未使用，由其他代码使用
        TOP,           // 上
        BOTTOM         // 下
    };

    BattleHex() noexcept;                               // 默认构造函数
    BattleHex(si16 _hex) noexcept;                      // 用整数值构造
    BattleHex(si16 x, si16 y);                         // 用坐标构造
    BattleHex(std::pair<si16, si16> xy);               // 用坐标对构造

    [[nodiscard]] bool isValid() const noexcept;        // 检查格子是否有效
    [[nodiscard]] bool isAvailable() const noexcept;    // 检查格子是否可用
    [[nodiscard]] bool isTower() const noexcept;        // 检查是否为塔
    void setX(si16 x);                                 // 设置X坐标
    void setY(si16 y);                                 // 设置Y坐标
    void setXY(si16 x, si16 y, bool hasToBeValid = true); // 设置坐标
    void setXY(std::pair<si16, si16> xy);              // 用坐标对设置坐标
    [[nodiscard]] si16 getX() const noexcept;           // 获取X坐标
    [[nodiscard]] si16 getY() const noexcept;           // 获取Y坐标
    [[nodiscard]] std::pair<si16, si16> getXY() const noexcept; // 获取坐标对

    BattleHex & moveInDirection(EDir dir, bool hasToBeValid = true); // 按方向移动
    [[nodiscard]] BattleHex cloneInDirection(EDir dir, bool hasToBeValid = true) const; // 按方向复制
    [[nodiscard]] static uint8_t getDistance(const BattleHex & hex1, const BattleHex & hex2) noexcept; // 获取距离
    [[nodiscard]] static BattleHex getClosestTile(BattleSide side, const BattleHex & initialPos, const BattleHexArray & hexes); // 获取最近格子

    [[nodiscard]] static constexpr auto hexagonalDirections() noexcept; // 获取六边形方向数组
    [[nodiscard]] static EDir mutualPosition(const BattleHex & hex1, const BattleHex & hex2); // 获取相对位置

    [[nodiscard]] const BattleHexArray & getAllNeighbouringTiles() const noexcept; // 获取所有相邻格子
    [[nodiscard]] const BattleHexArray & getNeighbouringTiles() const noexcept;    // 获取有效相邻格子
    [[nodiscard]] const BattleHexArray & getNeighbouringTilesDoubleWide(BattleSide side) const noexcept; // 获取双宽生物相邻格子

    [[nodiscard]] si16 toInt() const noexcept;          // 转换为整数
    BattleHex & operator+=(EDir dir);                   // 方向移动赋值运算符
    [[nodiscard]] BattleHex operator+(EDir dir) const;  // 方向移动运算符
    BattleHex & operator++() noexcept;                  // 前缀递增运算符
    BattleHex operator++(int) = delete;                 // 删除后缀递增运算符
    [[nodiscard]] bool operator ==(const BattleHex & other) const noexcept; // 等于运算符
    [[nodiscard]] bool operator !=(const BattleHex & other) const noexcept; // 不等于运算符
    [[nodiscard]] bool operator <(const BattleHex & other) const noexcept;  // 小于运算符
    [[nodiscard]] bool operator <=(const BattleHex & other) const noexcept; // 小于等于运算符

    template <typename Handler> void serialize(Handler & h); // 序列化函数
};
```

## 功能说明

BattleHex是VCMI战斗系统中表示战场六边形瓦片的核心类。它代表战场上的一个六角形格子，有效格子范围为0到186，但排除了一些无效值（如城堡塔-2,-3,-4）。可用的格子是那些有效的但不在第一列或最后一列的格子。

## 构造函数

- `BattleHex()`: 默认构造函数，初始化为无效格子
- `BattleHex(_hex)`: 用整数值构造格子
- `BattleHex(x, y)`: 用坐标构造格子
- `BattleHex(xy)`: 用坐标对构造格子

## 函数注释

- `isValid()`: 检查格子是否有效（在0到BFIELD_SIZE范围内）
- `isAvailable()`: 检查格子是否可用（有效且不在首列或末列）
- `isTower()`: 检查格子是否为城堡塔
- `setX(x)`: 设置X坐标
- `setY(y)`: 设置Y坐标
- `setXY(x, y, hasToBeValid)`: 设置坐标
- `getXY()`: 获取坐标对
- `moveInDirection(dir, hasToBeValid)`: 按指定方向移动
- `cloneInDirection(dir, hasToBeValid)`: 按指定方向复制格子
- `getDistance(hex1, hex2)`: 计算两格子间距离
- `getClosestTile(...)`: 获取最近的格子
- `hexagonalDirections()`: 获取六边形方向数组
- `mutualPosition(hex1, hex2)`: 获取两格子间的相对位置
- `getAllNeighbouringTiles()`: 获取所有相邻格子
- `getNeighbouringTiles()`: 获取有效相邻格子
- `getNeighbouringTilesDoubleWide(side)`: 获取双宽生物的有效相邻格子
- `toInt()`: 转换为整数值
- 各种运算符重载：支持格子间的比较和移动操作

## 成员变量

- `hex`: 内部存储的格子整数值

## 设计说明

BattleHex类是战斗系统中位置管理的核心组件，它处理六边形网格的复杂坐标系统，包括奇偶行的偏移处理。该类提供了完整的六边形网格操作功能，包括移动、距离计算、相邻格子查找等，是战斗AI和单位移动逻辑的重要基础。