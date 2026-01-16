# CLegacyConfigParser

## 概述

`CLegacyConfigParser` 是VCMI中用于解析《英雄无敌3》遗留文本配置文件的专用解析器。它能够处理H3的各种配置文件格式，支持引号字符串、数字数组和编码转换，是向后兼容H3资源的桥梁组件。

## 核心功能

### 文件加载和初始化

#### 构造函数
```cpp
explicit CLegacyConfigParser(const TextPath & URI);
```

- **参数**: `URI` - 文本文件的资源路径
- **功能**: 从指定路径加载并解析配置文件
- **异常**: 如果文件无法加载或解析失败会抛出异常

### 私有数据成员

```cpp
std::string fileEncoding;        // 文件编码
std::unique_ptr<char[]> data;    // 文件数据缓冲区
const char * curr;               // 当前解析位置指针
const char * end;                // 文件结束位置指针
```

## 解析方法

### 字符串解析

#### readString
```cpp
std::string readString();
```

- **返回值**: 从当前行读取的下一个字符串条目，如果到达行尾则返回空字符串
- **功能**: 读取一个字符串条目，支持引号和非引号格式

#### extractQuotedString
```cpp
std::string extractQuotedString();
```

- **返回值**: 提取的引号字符串
- **功能**: 提取引号包围的字符串，双引号作为转义字符，忽略行结束符

#### extractQuotedPart
```cpp
std::string extractQuotedPart();
```

- **功能**: 提取引号字符串的一部分

#### extractNormalString
```cpp
std::string extractNormalString();
```

- **功能**: 提取非引号字符串

#### readRawString
```cpp
std::string readRawString();
```

- **返回值**: 未进行编码转换的原始字符串
- **功能**: 读取未经编码转换处理的原始字符串

### 数字解析

#### readNumber
```cpp
float readNumber();
```

- **返回值**: 从当前行读取的浮点数
- **功能**: 读取下一个数字条目

#### readNumArray (模板方法)
```cpp
template <typename numeric>
std::vector<numeric> readNumArray(size_t size)
```

- **参数**: `size` - 要读取的数字数量
- **返回值**: 包含指定数量数字的向量
- **功能**: 读取指定数量的数字数组

### 控制方法

#### isNextEntryEmpty
```cpp
bool isNextEntryEmpty() const;
```

- **返回值**: 如果下一个条目为空则返回true
- **功能**: 检查下一个条目是否为空

#### endLine
```cpp
bool endLine();
```

- **返回值**: 如果成功结束当前行则返回true
- **功能**: 结束当前行的解析，移动到下一行

## H3配置文件格式支持

CLegacyConfigParser 支持以下H3配置文件格式：

### 字符串格式
- **引号字符串**: `"Hello World"` - 支持双引号转义
- **非引号字符串**: `Hello World` - 以空白字符分隔
- **跨行字符串**: 引号字符串可以跨越多行

### 数字格式
- **整数**: `123`, `-456`
- **浮点数**: `123.45`, `-67.89`
- **科学计数法**: `1.23e4`

### 数组格式
- **数字数组**: 连续的数字值，由空白字符分隔
- **字符串数组**: 连续的字符串值

## 使用场景

### 解析H3配置文件
```cpp
// 加载H3建筑配置文件
CLegacyConfigParser parser("config/buildings.txt");

// 读取建筑信息
std::string buildingName = parser.readString();     // 建筑名称
int cost = parser.readNumber();                     // 建造费用
std::string description = parser.readString();      // 描述文本

// 读取升级要求数组
auto requirements = parser.readNumArray<int>(5);    // 5个要求的资源ID

parser.endLine();  // 结束当前行
```

### 解析游戏数据文件
```cpp
CLegacyConfigParser dataParser("data/heroes.txt");

while (!dataParser.endLine()) {
    std::string heroName = dataParser.readString();
    if (heroName.empty()) continue;

    int heroClass = dataParser.readNumber();
    auto skills = dataParser.readNumArray<int>(8);  // 8个技能值

    // 处理英雄数据...
}
```

### 处理本地化文件
```cpp
// 解析H3本地化文件
CLegacyConfigParser langParser("german.txt");

// 读取本地化条目
while (!langParser.endLine()) {
    std::string key = langParser.readString();
    std::string value = langParser.readString();

    if (!key.empty() && !value.empty()) {
        // 注册本地化文本
        localizationMap[key] = value;
    }
}
```

## 设计意图

CLegacyConfigParser的设计目标：

1. **向后兼容**: 完全支持H3的配置文件格式
2. **编码处理**: 自动处理H3使用的各种遗留编码
3. **健壮解析**: 处理格式不规范或损坏的配置文件
4. **内存效率**: 使用内存映射和指针遍历避免不必要的复制
5. **类型安全**: 模板化数组读取提供类型安全
6. **错误恢复**: 在遇到无效数据时能够继续解析
7. **性能优化**: 流式解析，无需将整个文件加载到字符串

## 实现细节

### 解析策略
- **流式处理**: 使用指针直接遍历文件数据
- **惰性加载**: 只在需要时进行编码转换
- **状态保持**: 维护当前解析位置，支持顺序读取

### 编码支持
- 自动检测文件编码（CP1251、GBK等）
- 按需转换为UTF-8
- 支持H3使用的各种代码页

### 错误处理
- 无效数字返回0.0f
- 空条目返回空字符串
- 文件末尾安全处理

## 注意事项

- **文件格式**: 仅支持H3风格的配置文件，不适用于现代JSON/XML
- **编码依赖**: 需要正确设置文件编码才能正确解析
- **顺序读取**: 必须按顺序读取条目，不能随机访问
- **行结束**: 必须调用endLine()来正确处理行结束
- **内存管理**: 文件数据在解析器生命周期内保持加载
- **线程安全**: 非线程安全的，每个文件需要单独的解析器实例
- **异常处理**: 文件不存在或无法读取时会抛出异常

这个类是VCMI与《英雄无敌3》资源兼容的关键组件，确保了遗留配置文件的正确解析和使用。