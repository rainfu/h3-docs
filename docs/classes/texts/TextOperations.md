# TextOperations

## 概述

`TextOperations` 命名空间提供了VCMI中Unicode文本处理的核心功能，包括UTF-8编解码、字符验证、格式化输出、字符串比较和文件路径处理。是文本处理系统的底层支持组件。

## Unicode处理功能

### 字符编码转换

#### getUnicodeCodepoint
```cpp
uint32_t getUnicodeCodepoint(const char *data, size_t maxSize);
uint32_t getUnicodeCodepoint(char data, const std::string & encoding);
```

- **参数**:
  - `data`: UTF-8字符数据或单字节字符
  - `maxSize`: UTF-8字符的最大字节数
  - `encoding`: 单字节编码名称
- **返回值**: 32位Unicode码点
- **功能**: 将UTF-8字符或指定编码的字符转换为Unicode码点

#### toUnicode / fromUnicode
```cpp
std::string toUnicode(const std::string & text, const std::string & encoding);
std::string fromUnicode(const std::string & text, const std::string & encoding);
```

- **参数**:
  - `text`: 要转换的文本
  - `encoding`: 目标编码或来源编码
- **返回值**: 转换后的文本
- **功能**: 在Unicode和指定编码之间转换文本

### 字符验证

#### isValidUnicodeCharacter
```cpp
bool isValidUnicodeCharacter(const char * character, size_t maxSize);
```

- **参数**:
  - `character`: 要验证的字符指针
  - `maxSize`: 字符可能的最大字节数
- **返回值**: 如果是有效的UTF-8字符则返回true
- **功能**: 验证字符是否为有效的UTF-8符号

#### isValidASCII / isValidUnicodeString
```cpp
bool isValidASCII(const std::string & text);
bool isValidASCII(const char * data, size_t size);
bool isValidUnicodeString(std::string_view text);
bool isValidUnicodeString(const char * data, size_t size);
```

- **返回值**: 如果文本是有效的ASCII或UTF-8则返回true
- **功能**: 验证文本是否包含有效的ASCII或UTF-8序列

### 字符大小和计数

#### getUnicodeCharacterSize
```cpp
size_t getUnicodeCharacterSize(char firstByte);
```

- **参数**: `firstByte` - UTF-8字符的第一个字节
- **返回值**: 字符的字节长度
- **功能**: 返回UTF-8字符的字节长度

#### getUnicodeCharactersCount
```cpp
size_t getUnicodeCharactersCount(std::string_view text);
```

- **参数**: `text` - 要计数的文本
- **返回值**: Unicode字符的数量
- **功能**: 返回字符串中的Unicode字符数量（不是字节数）

## 文本格式化和处理

### 度量单位格式化

#### formatMetric (模板函数)
```cpp
template<typename Arithmetic>
std::string formatMetric(Arithmetic number, int maxDigits);
```

- **参数**:
  - `number`: 要格式化的数字
  - `maxDigits`: 最大数字位数
- **返回值**: 使用度量单位前缀格式化的字符串
- **功能**: 使用k、M、G等前缀保持字符串在指定长度内

#### parseMetric (模板函数)
```cpp
template<typename Arithmetic>
Arithmetic parseMetric(const std::string &text);
```

- **参数**: `text` - 包含度量前缀的字符串
- **返回值**: 解析后的数值
- **功能**: 解析包含度量前缀的字符串为数值

### 字符串操作

#### trimRightUnicode
```cpp
void trimRightUnicode(std::string & text, size_t amount = 1);
```

- **参数**:
  - `text`: 要修剪的字符串（会被修改）
  - `amount`: 要删除的Unicode字符数量
- **功能**: 从右侧删除指定数量的UTF-8字符

#### escapeString
```cpp
std::string escapeString(std::string input);
```

- **参数**: `input` - 需要转义的输入字符串
- **返回值**: 转义后的字符串
- **功能**: 将需要转义的符号替换为适当的转义序列

## 日期时间格式化

### 本地化日期时间
```cpp
std::string getFormattedDateTimeLocal(std::time_t dt);
std::string getCurrentFormattedDateTimeLocal(std::chrono::seconds timeOffset = {});
std::string getFormattedTimeLocal(std::time_t dt);
std::string getCurrentFormattedTimeLocal(std::chrono::seconds timeOffset = {});
```

- **参数**:
  - `dt`: 时间戳
  - `timeOffset`: 时间偏移（秒）
- **返回值**: 根据当前语言设置格式化的日期时间字符串
- **功能**: 获取本地化的日期时间格式

## 字符串比较和搜索

### 莱文斯坦距离
```cpp
int getLevenshteinDistance(std::string_view s, std::string_view t);
```

- **参数**: `s`, `t` - 要比较的两个字符串
- **返回值**: 将一个字符串转换为另一个字符串所需的最少编辑操作数
- **功能**: 计算两个字符串之间的编辑距离

### 本地化字符串比较
```cpp
bool compareLocalizedStrings(std::string_view str1, std::string_view str2);
```

- **参数**: `str1`, `str2` - 要比较的字符串
- **返回值**: 基于当前游戏语言的本地化比较结果
- **功能**: 使用语言感知的排序规则比较字符串

### 文本搜索相似度
```cpp
std::optional<int> textSearchSimilarityScore(const std::string & s, const std::string & t);
```

- **参数**: `s` - 搜索文本，`t` - 目标文本
- **返回值**: 相似度分数，std::nullopt表示不相关
- **功能**: 计算文本在搜索框中的相似度分数

## 文件系统路径处理

### 路径编码转换
```cpp
std::string filesystemPathToUtf8(const boost::filesystem::path& path);
boost::filesystem::path Utf8TofilesystemPath(const std::string& path);
```

- **功能**: 在文件系统路径和UTF-8字符串之间转换，避免非ASCII字符路径问题

### 地图名称转换
```cpp
std::string convertMapName(std::string input);
```

- **参数**: `input` - 原始地图名称
- **返回值**: 清理后的地图名称
- **功能**: 从地图名称中去除不需要的字符

## 使用场景

### Unicode验证和处理
```cpp
// 验证UTF-8字符串
if (TextOperations::isValidUnicodeString(userInput)) {
    // 处理有效字符串
}

// 获取字符数量
size_t charCount = TextOperations::getUnicodeCharactersCount(text);

// 修剪字符串
std::string trimmed = text;
TextOperations::trimRightUnicode(trimmed, 5);
```

### 数值格式化
```cpp
// 格式化大数字
std::string displayValue = TextOperations::formatMetric(1500000, 4);  // "1.5M"

// 解析格式化字符串
long long parsed = TextOperations::parseMetric("2.5k");  // 2500
```

### 编码转换
```cpp
// 从CP1251转换为UTF-8
std::string utf8Text = TextOperations::toUnicode(cp1251Text, "CP1251");

// 转换回CP1251
std::string legacyText = TextOperations::fromUnicode(utf8Text, "CP1251");
```

### 字符串比较
```cpp
// 本地化排序
if (TextOperations::compareLocalizedStrings(name1, name2)) {
    // name1 在本地化排序中排在 name2 之前
}

// 搜索相似度
auto score = TextOperations::textSearchSimilarityScore("fire", "fireball");
if (score && *score <= 1) {
    // 认为是匹配的
}
```

### 日期时间格式化
```cpp
// 获取本地化当前时间
std::string currentTime = TextOperations::getCurrentFormattedDateTimeLocal();

// 格式化特定时间戳
std::string formatted = TextOperations::getFormattedDateTimeLocal(timestamp);
```

### 文件路径处理
```cpp
// 安全处理包含Unicode的文件路径
boost::filesystem::path safePath = TextOperations::Utf8TofilesystemPath(utf8PathString);
std::string safeUtf8 = TextOperations::filesystemPathToUtf8(filesystemPath);
```

## 设计意图

TextOperations的设计目标：

1. **Unicode友好**: 完整的UTF-8支持和编码转换
2. **跨平台兼容**: 处理不同操作系统的编码差异
3. **本地化支持**: 语言感知的字符串操作
4. **性能优化**: 高效的字符处理算法
5. **安全性**: 防止编码相关的安全问题
6. **易用性**: 简单的API隐藏复杂的Unicode细节
7. **错误处理**: 健壮的验证和错误恢复

## 实现细节

### UTF-8处理
- 使用标准UTF-8编码规则
- 支持1-4字节的UTF-8字符
- 正确的字节顺序处理

### 度量格式化算法
- 使用国际单位制前缀（k、M、G、T、P、E）
- 保持指定最大位数
- 处理负数和溢出

### 编辑距离实现
- 使用动态规划算法
- 空间优化（仅使用两行矩阵）
- 支持任意长度的字符串

## 注意事项

- **编码转换**: 避免不必要的编码转换，使用UTF-8作为内部表示
- **性能考虑**: Unicode操作比ASCII操作更耗时
- **平台差异**: Windows和Unix系统对路径编码处理不同
- **内存管理**: 字符串操作会创建临时对象
- **线程安全**: 所有函数都是线程安全的
- **异常处理**: 解析函数在无效输入时返回默认值而不是抛出异常

这个命名空间为VCMI提供了完整的Unicode文本处理能力，确保了游戏在多语言环境下的正确运行。