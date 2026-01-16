# BattleHexArray类

BattleHexArray类是VCMI战斗系统中战场六边形瓦片集合的表示类，专门设计用于存储BattleHex对象的集合。

## 类定义

```cpp
class DLL_LINKAGE BattleHexArray
{
public:
    static constexpr uint8_t totalSize = GameConstants::BFIELD_SIZE; // 总大小常量
    using StorageType = boost::container::small_vector<BattleHex, 8>; // 存储类型
    using ArrayOfBattleHexArrays = std::array<BattleHexArray, totalSize>; // 数组类型

    using value_type = BattleHex; // 值类型
    using size_type = StorageType::size_type; // 大小类型
    using reference = value_type &; // 引用类型
    using const_reference = const value_type &; // 常量引用类型
    using pointer = value_type *; // 指针类型
    using const_pointer = const value_type *; // 常量指针类型
    using difference_type = typename StorageType::difference_type; // 差异类型
    using const_iterator = typename StorageType::const_iterator; // 常量迭代器类型
    using const_reverse_iterator = typename StorageType::const_reverse_iterator; // 常量逆向迭代器类型

    BattleHexArray() = default; // 默认构造函数

    template <typename Container, typename = std::enable_if_t<
        std::is_convertible_v<typename Container::value_type, BattleHex>>>
        BattleHexArray(const Container & container) noexcept; // 用容器构造

    void resize(size_type size); // 调整大小
    BattleHexArray(std::initializer_list<BattleHex> initList) noexcept; // 用初始化列表构造

    void checkAndPush(const BattleHex & tile); // 检查并添加格子
    void insert(const BattleHex & hex) noexcept; // 插入格子
    void set(size_type index, const BattleHex & hex); // 设置指定索引的格子
    void insert(const BattleHexArray & other) noexcept; // 插入另一个数组
    void insert(const Container & container) noexcept; // 插入容器中的所有格子

    template<typename Predicate> void sort(Predicate pred); // 按谓词排序
    template<typename Predicate> void eraseIf(Predicate pred); // 按谓词删除
    void shuffle(vstd::RNG & rand); // 随机打乱
    void clear() noexcept; // 清空数组
    void erase(const BattleHex & target) noexcept; // 删除指定格子
    void pop_back() noexcept; // 弹出最后一个元素

    std::vector<BattleHex> toVector() const noexcept; // 转换为向量
    [[nodiscard]] std::string toString(const std::string & delimiter = ", ") const noexcept; // 转换为字符串
    template <typename Predicate> const_iterator findIf(Predicate predicate) const noexcept; // 按谓词查找
    template <typename Predicate> BattleHexArray filterBy(Predicate predicate) const noexcept; // 按谓词过滤

    // 静态方法：获取预计算的相邻格子
    static const BattleHexArray & getAllNeighbouringTiles(const BattleHex & hex) noexcept;
    static const BattleHexArray & getNeighbouringTiles(const BattleHex & hex) noexcept;
    static const BattleHexArray & getNeighbouringTilesDoubleWide(const BattleHex & hex, BattleSide side) noexcept;

    [[nodiscard]] bool isValidToInsert(const BattleHex & hex) const noexcept; // 检查是否可插入
    [[nodiscard]] bool contains(const BattleHex & hex) const noexcept; // 检查是否包含格子

    template <typename Serializer> void serialize(Serializer & s); // 序列化函数

    [[nodiscard]] const BattleHex & back() const noexcept; // 获取最后一个元素
    [[nodiscard]] const BattleHex & front() const noexcept; // 获取第一个元素
    [[nodiscard]] const BattleHex & operator[](size_type index) const noexcept; // 下标访问
    [[nodiscard]] const BattleHex & at(size_type index) const; // 安全下标访问
    [[nodiscard]] size_type size() const noexcept; // 获取大小
    [[nodiscard]] const_iterator begin() const noexcept; // 获取开始迭代器
    [[nodiscard]] bool empty() const noexcept; // 检查是否为空
    [[nodiscard]] const_iterator end() const noexcept; // 获取结束迭代器
    [[nodiscard]] const_reverse_iterator rbegin() const noexcept; // 获取逆向开始迭代器
    [[nodiscard]] const_reverse_iterator rend() const noexcept; // 获取逆向结束迭代器

    bool operator ==(const BattleHexArray & other) const noexcept; // 等于运算符

private:
    StorageType internalStorage; // 内部存储
    std::bitset<totalSize> presenceFlags; // 存在标志位图

    // 预计算的相邻格子数组
    static const ArrayOfBattleHexArrays neighbouringTiles;
    static const ArrayOfBattleHexArrays allNeighbouringTiles;
    static const std::map<BattleSide, ArrayOfBattleHexArrays> neighbouringTilesDoubleWide;

    // 预计算函数
    static ArrayOfBattleHexArrays precalculateNeighbouringTiles();
    static ArrayOfBattleHexArrays precalculateAllNeighbouringTiles();
    static ArrayOfBattleHexArrays precalculateNeighbouringTilesDoubleWide(BattleSide side);
};
```

## 功能说明

BattleHexArray是VCMI战斗系统中专门用于存储BattleHex对象集合的容器类。该类确保每个BattleHex对象在数组中是唯一的，并且不允许插入无效的BattleHex对象。它使用高效的存储机制和位图快速存在性检查系统，为战斗逻辑提供高性能的格子集合操作。

## 构造函数

- `BattleHexArray()`: 默认构造函数
- `BattleHexArray(container)`: 用容器构造，将容器中的所有元素插入数组
- `BattleHexArray(initList)`: 用初始化列表构造

## 函数注释

- `resize(size)`: 调整内部存储大小
- `checkAndPush(tile)`: 检查格子是否可用且不存在，如果是则添加到数组
- `insert(hex)`: 插入一个格子，如果无效或已存在则忽略
- `set(index, hex)`: 设置指定索引位置的格子
- `insert(other)`: 插入另一个数组中的所有格子
- `sort(pred)`: 按给定谓词对数组进行排序
- `eraseIf(pred)`: 按给定谓词删除符合条件的元素
- `shuffle(rand)`: 使用随机数生成器随机打乱数组
- `clear()`: 清空数组
- `erase(target)`: 删除指定格子
- `pop_back()`: 弹出最后一个元素
- `toVector()`: 将数组转换为std::vector
- `toString(delimiter)`: 将数组转换为字符串表示
- `findIf(predicate)`: 按给定谓词查找元素
- `filterBy(predicate)`: 按给定谓词过滤数组
- `isValidToInsert(hex)`: 检查格子是否可以插入（有效且不存在）
- `contains(hex)`: 检查数组是否包含指定格子
- `back()`: 获取最后一个元素
- `front()`: 获取第一个元素
- `operator[]`: 下标访问操作
- `at(index)`: 安全下标访问（会抛出异常）
- `size()`: 获取数组大小
- `empty()`: 检查数组是否为空
- `begin()/end()`: 迭代器访问
- `rbegin()/rend()`: 逆向迭代器访问
- `operator==`: 等于比较操作

## 成员变量

- `internalStorage`: 内部存储容器，使用small_vector优化小数组性能
- `presenceFlags`: 位图，用于快速检查格子是否存在

## 设计说明

BattleHexArray类是战斗系统中格子集合管理的核心组件，它优化了BattleHex对象的存储和访问性能。通过使用位图进行快速存在性检查，该类能够在常数时间内判断某个格子是否存在于集合中，这对于战斗AI和路径计算非常重要。