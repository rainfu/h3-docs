# Languages

## 概述

`Languages` 命名空间提供了VCMI中多语言支持的核心定义，包括语言枚举、复数形式规则和语言选项配置。是本地化系统的语言基础组件。

## 主要组件

### 复数形式枚举 (EPluralForms)

定义了不同语言的复数形式规则：

```cpp
enum class EPluralForms
{
    NONE,   // 无复数形式
    VI_1,   // 单复数形式（越南语）
    EN_2,   // 两形式，单数仅用于1（英语）
    FR_2,   // 两形式，单数用于0和1（法语）
    UK_3,   // 三形式，特殊情况用于以1和2、3、4结尾的数字（乌克兰语）
    CZ_3,   // 三形式，特殊情况用于1和2、3、4（捷克语）
    PL_3,   // 三形式，特殊情况用于1和某些以2、3、4结尾的数字（波兰语）
    RO_3    // 三形式，特殊情况用于以00或[2-9][0-9]结尾的数字（罗马尼亚语）
};
```

### 语言枚举 (ELanguages)

定义了VCMI支持的所有语言：

```cpp
enum class ELanguages
{
    BELARUSIAN, BULGARIAN, CZECH, CHINESE, ENGLISH,
    FINNISH, FRENCH, GERMAN, GREEK, HUNGARIAN,
    ITALIAN, JAPANESE, KOREAN, NORWEGIAN, POLISH,
    PORTUGUESE, ROMANIAN, RUSSIAN, SPANISH, SWEDISH,
    TURKISH, UKRAINIAN, VIETNAMESE,
    COUNT
};
```

### 语言选项结构体 (Options)

包含每种语言的完整配置信息：

```cpp
struct Options
{
    std::string identifier;      // 字符串标识符（ASCII，小写）
    std::string nameEnglish;     // 英语中的语言名称
    std::string nameNative;      // 本族语中的语言名称
    std::string encoding;        // H3使用的编码
    std::string localeName;      // 正确的区域设置名称，如"en_US"
    std::string tagIETF;         // 主要的IETF语言标签
    std::string tagISO2;         // ISO 639-2 (B)语言代码
    std::string dateTimeFormat;  // 日期时间格式
    EPluralForms pluralForms;    // 该语言的复数形式规则
    bool selectable;             // 是否可在启动器中选择
};
```

## 核心函数

### getLanguageList()

```cpp
inline const auto & getLanguageList()
```

- **返回值**: 包含所有语言选项的数组
- **功能**: 返回所有支持语言的完整配置列表

### getLanguageOptions()

```cpp
inline const Options & getLanguageOptions(ELanguages language)
inline const Options & getLanguageOptions(const std::string & language)
```

- **参数**:
  - `language`: 语言枚举值或字符串标识符
- **返回值**: 指定语言的选项配置
- **异常**: 如果语言不存在，抛出`std::out_of_range`
- **功能**: 获取指定语言的配置选项

### getPluralFormIndex()

```cpp
template<typename Numeric>
inline constexpr int getPluralFormIndex(EPluralForms form, Numeric value)
```

- **参数**:
  - `form`: 复数形式规则
  - `value`: 数值
- **返回值**: 复数形式索引（0、1或2）
- **功能**: 根据语言规则和数值计算应使用的复数形式索引

### getPluralFormTextID()

```cpp
template<typename Numeric>
inline std::string getPluralFormTextID(std::string languageName, Numeric value, std::string textID)
```

- **参数**:
  - `languageName`: 语言名称
  - `value`: 数值
  - `textID`: 基础文本ID
- **返回值**: 包含复数形式后缀的完整文本ID
- **功能**: 生成包含正确复数形式的文本ID

## 复数形式规则详解

### VI_1 (越南语)
- 始终使用单一形式
- 索引：0

### EN_2 (英语)
- `value == 1` → 索引1（单数）
- 其他情况 → 索引2（复数）

### FR_2 (法语)
- `value == 0 || value == 1` → 索引1（单数）
- 其他情况 → 索引2（复数）

### UK_3 (乌克兰语/俄语)
- `value % 10 == 1 && value % 100 != 11` → 索引1
- `value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)` → 索引2
- 其他情况 → 索引0

### CZ_3 (捷克语)
- `value == 1` → 索引1
- `value >= 2 && value <= 4` → 索引2
- 其他情况 → 索引0

### PL_3 (波兰语)
- `value == 1` → 索引1
- `value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)` → 索引2
- 其他情况 → 索引0

### RO_3 (罗马尼亚语)
- `value == 1` → 索引1
- `value == 0 || (value % 100 > 0 && value % 100 < 20)` → 索引2
- 其他情况 → 索引0

## 使用场景

### 获取语言信息
```cpp
// 获取英语配置
const auto& english = Languages::getLanguageOptions(Languages::ELanguages::ENGLISH);
std::cout << "English name: " << english.nameEnglish << std::endl;
std::cout << "Native name: " << english.nameNative << std::endl;
std::cout << "Encoding: " << english.encoding << std::endl;

// 通过字符串标识符获取
const auto& chinese = Languages::getLanguageOptions("chinese");
```

### 处理复数形式
```cpp
// 英语复数处理
int count = 3;
int formIndex = Languages::getPluralFormIndex(Languages::EPluralForms::EN_2, count);
// formIndex = 2 (复数形式)

std::string textID = Languages::getPluralFormTextID("english", count, "creature.name");
// textID = "creature.name.2"
```

### 遍历所有语言
```cpp
for(const auto& lang : Languages::getLanguageList())
{
    if(lang.selectable)
    {
        std::cout << lang.nameEnglish << " (" << lang.nameNative << ")" << std::endl;
    }
}
```

## 设计意图

Languages命名空间的设计目标：

1. **标准化语言支持**: 为所有支持的语言提供一致的配置接口
2. **复数形式处理**: 正确处理不同语言的复杂复数规则
3. **编码兼容性**: 支持H3遗产编码和现代Unicode
4. **本地化友好**: 提供完整的本地化元数据
5. **类型安全**: 使用强类型枚举避免错误
6. **运行时灵活性**: 支持动态语言切换和配置

## 注意事项

- **语言标识符**: 全部使用小写ASCII字符
- **编码处理**: 某些语言使用遗留编码（如CP1251），需要正确处理
- **日期格式**: 不同语言使用不同的日期时间格式
- **可选择性**: 某些语言（如挪威语）在启动器中不可选择
- **复数规则**: 基于GNU gettext的复数形式实现
- **异常处理**: 访问不存在的语言会抛出异常

这个模块是VCMI本地化系统的语言基础，为文本处理和用户界面本地化提供必要的语言信息和规则。