# CModVersion类

CModVersion类是VCMI中模组版本号的表示类，用于处理模组的版本比较和兼容性检查。

## 类定义

```cpp
struct DLL_LINKAGE CModVersion
{
    static const int Any = -1;
    
    int major = Any;
    int minor = Any;
    int patch = Any;

    CModVersion() = default;
    CModVersion(int mj, int mi, int p): major(mj), minor(mi), patch(p) {}

    static CModVersion GameVersion();
    static CModVersion fromString(const std::string & from);
    std::string toString() const;

    bool operator !=(const CModVersion & other) const;
    bool operator ==(const CModVersion & other) const;
    bool compatible(const CModVersion & other, bool checkMinor = false, bool checkPatch = false) const;
    bool isNull() const;

    template <typename Handler> void serialize(Handler &h)
    {
        h & major;
        h & minor;
        h & patch;
    }
};

DLL_LINKAGE bool operator < (const CModVersion & lesser, const CModVersion & greater);
```

## 功能说明

CModVersion是VCMI模组管理系统中的版本号表示类，采用语义化版本号方案（主版本号.次版本号.修订号）。该类用于比较版本、检查兼容性以及解析和格式化版本字符串。它支持特殊的"Any"值，用于表示通配符匹配。

## 依赖关系

- STL库: string等
- 序列化相关: Handler模板

## 函数注释

- `CModVersion()`: 默认构造函数，创建默认版本对象（全为Any）
- `CModVersion(mj, mi, p)`: 构造函数，使用指定的主版本号、次版本号和修订号创建版本对象
- `GameVersion()`: 静态方法，获取当前游戏版本
- `fromString(from)`: 静态方法，从字符串创建版本对象
- `toString()`: 将版本对象转换为字符串表示
- `operator!=, operator==`: 版本比较运算符
- `compatible(other, checkMinor, checkPatch)`: 检查版本兼容性
- `isNull()`: 检查版本是否为null（即major、minor、patch都为Any）
- `serialize(h)`: 序列化方法
- `operator<`: 版本号小于比较运算符