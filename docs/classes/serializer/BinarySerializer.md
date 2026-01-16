# BinarySerializer类

BinarySerializer类是VCMI中用于将类序列化为二进制形式的主要类。

## 类定义

```cpp
class BinarySerializer
{
public:
    using Version = ESerializationVersion;
    static constexpr bool saving = true;

    Version version = Version::CURRENT;
    bool loadingGamestate = false;

    BinarySerializer(IBinaryWriter * w);

    template<class T>
    BinarySerializer & operator&(const T & t);

    void clear();

    bool hasFeature(Version v) const;

private:
    std::map<std::string, uint32_t> savedStrings;
    std::map<const Serializeable*, uint32_t> savedPointers;
    IBinaryWriter * writer;

    static constexpr bool trackSerializedPointers = true;

    template<typename Handler>
    struct VariantVisitorSaver
    {
        Handler & h;
        VariantVisitorSaver(Handler & H);
        template<typename T>
        void operator()(const T & t);
    };

    void write(const void * data, unsigned size);
    void saveEncodedInteger(int64_t value);

    template<typename T, typename std::enable_if_t<std::is_same_v<T, bool>, int> = 0>
    void save(const T & data);

    template<class T, typename std::enable_if_t<std::is_floating_point_v<T>, int> = 0>
    void save(const T & data);

    template<class T, typename std::enable_if_t<std::is_integral_v<T> && !std::is_same_v<T, bool>, int> = 0>
    void save(const T & data);

    void save(const Version & data);

    template<typename T, typename std::enable_if_t<std::is_enum_v<T>, int> = 0>
    void save(const T & data);

    template<typename T, typename std::enable_if_t<std::is_array_v<T>, int> = 0>
    void save(const T & data);

    template<class T, typename std::enable_if_t<std::is_pointer_v<T>, int> = 0>
    void save(const T & data);

    template<typename T, typename std::enable_if_t<is_serializeable<BinarySerializer, T>::value, int> = 0>
    void save(const T & data);

    void save(const std::monostate & data);

    template<typename T>
    void save(const std::shared_ptr<T> & data);

    template<typename T>
    void save(const std::shared_ptr<const T> & data);

    template<typename T>
    void save(const std::unique_ptr<T> & data);

    template<typename T, typename std::enable_if_t<!std::is_same_v<T, bool>, int> = 0>
    void save(const std::vector<T> & data);

    template<typename T, size_t N>
    void save(const boost::container::small_vector<T, N> & data);

    template<typename T, typename std::enable_if_t<!std::is_same_v<T, bool>, int> = 0>
    void save(const std::deque<T> & data);

    template<typename T, size_t N>
    void save(const std::array<T, N> & data);

    template<typename T>
    void save(const std::set<T> & data);

    template<typename T, typename U>
    void save(const std::unordered_set<T, U> & data);

    template<typename T>
    void save(const std::list<T> & data);

    void save(const std::string & data);

    template<typename T1, typename T2>
    void save(const std::pair<T1, T2> & data);

    template<typename T1, typename T2>
    void save(const std::unordered_map<T1, T2> & data);

    template<typename T1, typename T2>
    void save(const std::map<T1, T2> & data);

    template<typename T1, typename T2>
    void save(const std::multimap<T1, T2> & data);

    template<typename T0, typename... TN>
    void save(const std::variant<T0, TN...> & data);

    template<typename T>
    void save(const std::optional<T> & data);

    template<typename T>
    void save(const boost::multi_array<T, 3> & data);

    template<std::size_t T>
    void save(const std::bitset<T> & data);
};
```

## 功能说明

BinarySerializer是VCMI序列化系统的核心类，用于将各种类型的数据序列化为二进制格式。它支持基本类型、STL容器、智能指针、枚举、数组等多种数据类型的序列化。该类使用模板特化来处理不同类型的序列化需求，并通过指针跟踪机制避免重复序列化同一对象。

## 依赖关系

- [IBinaryWriter](./IBinaryWriter.md): 二进制写入器接口
- [ESerializationVersion](./ESerializationVersion.md): 序列化版本
- [Serializeable](./Serializeable.md): 序列化标记接口
- [CTypeList](./CTypeList.md): 类型列表
- [CSerializationApplier](./CSerializationApplier.md): 序列化应用器
- boost库: multi_array, container::small_vector等
- STL库: vector, deque, array, set, unordered_set, list, pair, map, multimap, variant, optional, bitset等

## 函数注释

- `BinarySerializer(writer)`: 构造函数，使用指定的写入器创建二进制序列化器
- `operator&(t)`: 序列化操作符，用于序列化数据
- `clear()`: 清除已保存的指针和字符串缓存
- `hasFeature(v)`: 检查当前版本是否支持指定功能
- `save(data)`: 保存各种类型的数据到序列化流中，有多个重载版本处理不同类型
- `write(data, size)`: 写入原始字节数据
- `saveEncodedInteger(value)`: 保存编码整数
- `save(const T & data)`: 模板函数，根据T的类型特化处理不同类型的保存