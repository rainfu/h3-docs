# TextLocalizationContainer

## 概述

`TextLocalizationContainer` 是VCMI本地化系统的核心容器类，负责存储、管理和检索本地化文本。它支持模块化文本注册、优先级覆盖、多语言支持和子容器层次结构，是整个文本本地化架构的基础。

## 核心组件

### StringState结构体

存储单个文本字符串的状态信息：

```cpp
struct StringState
{
    std::string translatedText;        // 用户可读的翻译文本
    std::string identifierModContext;  // 创建此字符串的模块ID
    std::string baseStringModContext;  // 提供原始未翻译版本的模块ID
    bool overriden = false;            // 是否被覆盖

    template <typename Handler>
    void serialize(Handler & h);       // 序列化支持
};
```

### 主要数据成员

```cpp
std::unordered_map<std::string, StringState> stringsLocalizations;  // 标识符 -> 本地化映射
std::vector<const TextLocalizationContainer *> subContainers;       // 子容器列表
static std::recursive_mutex globalTextMutex;                        // 全局文本互斥锁
```

## 核心方法

### 文本注册方法

#### registerString (多种重载)
```cpp
void registerString(const std::string & modContext, const TextIdentifier & UID, const JsonNode & localized);
void registerString(const std::string & modContext, const TextIdentifier & UID, const std::string & localized);
void registerString(const std::string & identifierModContext, const std::string & localizedStringModContext, const TextIdentifier & UID, const std::string & localized);
```

- **参数**:
  - `modContext`: 注册文本的模块上下文
  - `UID`: 文本标识符
  - `localized`: 本地化文本（JsonNode或字符串）
  - `localizedStringModContext`: 原始字符串的模块上下文
- **功能**: 将文本注册到容器中，支持模块上下文跟踪

#### registerStringOverride
```cpp
void registerStringOverride(const std::string & modContext, const TextIdentifier & UID, const std::string & localized, const std::string & language);
```

- **功能**: 注册高优先级字符串覆盖，用于翻译覆盖

### 文本检索方法

#### translate (模板方法)
```cpp
template<typename  ... Args>
std::string translate(std::string arg1, Args ... args) const
```

- **参数**: 可变参数，用于构建TextIdentifier
- **返回值**: 用户可读的翻译字符串
- **功能**: 将参数转换为TextIdentifier并翻译

#### translateString
```cpp
const std::string & translateString(const TextIdentifier & identifier) const;
```

- **参数**: `identifier` - 要翻译的文本标识符
- **返回值**: 翻译后的字符串常量引用
- **功能**: 将标识符转换为用户可读字符串

### 容器管理方法

#### addSubContainer
```cpp
void addSubContainer(const TextLocalizationContainer & container);
```

- **参数**: `container` - 要添加的子容器
- **功能**: 添加子容器以扩展文本搜索范围

#### removeSubContainer
```cpp
void removeSubContainer(const TextLocalizationContainer & container);
```

- **参数**: `container` - 要移除的子容器
- **功能**: 移除指定的子容器

### 高级功能方法

#### loadTranslationOverrides
```cpp
void loadTranslationOverrides(const std::string & modContext, const std::string & language, JsonNode const & file);
```

- **参数**:
  - `modContext`: 模块上下文
  - `language`: 语言标识符
  - `file`: 包含翻译覆盖的JSON节点
- **功能**: 从JSON加载翻译覆盖，高优先级

#### exportAllTexts
```cpp
void exportAllTexts(std::map<std::string, std::map<std::string, std::string>> & storage, bool onlyMissing) const;
```

- **参数**:
  - `storage`: 存储导出文本的映射
  - `onlyMissing`: 是否仅导出缺失的文本
- **功能**: 导出所有存储的文本用于调试

### 序列化方法

#### jsonSerialize
```cpp
void jsonSerialize(JsonNode & dest) const;
```

- **功能**: 将容器内容序列化为JSON格式

#### serialize (模板方法)
```cpp
template <typename Handler>
void serialize(Handler & h)
```

- **功能**: 支持二进制序列化，包含全局锁保护

## 辅助方法

### identifierExists
```cpp
bool identifierExists(const TextIdentifier & UID) const;
```

- **返回值**: 如果标识符已注册则返回true
- **功能**: 检查标识符是否存在（无论是否翻译）

### getModLanguage
```cpp
std::string getModLanguage(const std::string & modContext);
```

- **功能**: 获取模块的语言设置

## TextContainerRegistrable类

`TextContainerRegistrable` 是 `TextLocalizationContainer` 的子类，提供自动注册/注销功能：

```cpp
class DLL_LINKAGE TextContainerRegistrable : public TextLocalizationContainer
{
public:
    TextContainerRegistrable();
    ~TextContainerRegistrable();
    // 复制构造函数和移动构造函数
};
```

## 使用场景

### 基本文本注册和检索
```cpp
TextLocalizationContainer container;

// 注册文本
container.registerString("core", TextIdentifier("hero.name"), "Hero");
container.registerString("core", TextIdentifier("hero.class"), "Warrior");

// 检索文本
std::string name = container.translate("hero", "name");  // "Hero"
std::string className = container.translateString(TextIdentifier("hero.class"));  // "Warrior"
```

### 模块化文本管理
```cpp
// 核心模块注册
container.registerString("core", TextIdentifier("spell.fireball"), "Fireball");

// MOD覆盖
container.registerString("myMod", TextIdentifier("spell.fireball"), "Super Fireball");

// 检索时返回MOD版本（如果存在）
std::string spellName = container.translate("spell", "fireball");
```

### 子容器层次结构
```cpp
TextLocalizationContainer mainContainer;
TextLocalizationContainer subContainer;

// 子容器注册特定领域文本
subContainer.registerString("ui", TextIdentifier("button.ok"), "OK");

// 添加到主容器
mainContainer.addSubContainer(subContainer);

// 现在可以通过主容器访问子容器的文本
std::string buttonText = mainContainer.translate("button", "ok");
```

### 翻译覆盖加载
```cpp
JsonNode translationFile = JsonNode::parseFile("translations.json");
container.loadTranslationOverrides("english_mod", "en", translationFile);
```

## 设计意图

TextLocalizationContainer的设计目标：

1. **模块化支持**: 每个文本跟踪其来源模块，支持MOD覆盖
2. **优先级系统**: 翻译覆盖具有更高优先级
3. **层次结构**: 通过子容器支持文本继承
4. **线程安全**: 使用全局互斥锁保护并发访问
5. **序列化友好**: 支持JSON和二进制序列化
6. **类型安全**: 与TextIdentifier配合提供类型安全
7. **调试支持**: 提供文本导出功能便于调试

## 实现细节

### 文本搜索顺序
1. 在当前容器中搜索
2. 如果未找到，在所有子容器中搜索
3. 返回找到的第一个匹配项

### 模块上下文跟踪
- `identifierModContext`: 创建此翻译的模块
- `baseStringModContext`: 提供原始字符串的模块
- 支持区分原创内容和修改内容

### 线程安全保证
- 所有序列化操作使用`globalTextMutex`保护
- 读操作是线程安全的
- 写操作需要外部同步

## 注意事项

- **标识符唯一性**: 相同标识符的后续注册会覆盖之前的值
- **子容器生命周期**: 确保子容器的生命周期长于主容器
- **内存管理**: 大量文本时注意内存使用
- **语言特定**: 覆盖功能与特定语言绑定
- **调试导出**: exportAllTexts主要用于开发和调试

这个类是VCMI本地化系统的核心，为游戏提供了强大而灵活的多语言文本管理能力。