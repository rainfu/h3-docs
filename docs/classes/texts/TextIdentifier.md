# TextIdentifier

## 概述

`TextIdentifier` 是一个轻量级的工具类，用于构建和表示文本标识符。它支持通过字符串连接和索引构建复杂的层次化文本ID，是VCMI本地化系统中标识文本资源的标准方式。

## 核心功能

### 构造函数

#### 基本构造函数
```cpp
TextIdentifier(const char * id)
TextIdentifier(const std::string & id)
```

- **参数**: `id` - 文本标识符字符串
- **功能**: 创建包含指定标识符的TextIdentifier对象

#### 索引追加构造函数
```cpp
template<typename... T>
TextIdentifier(const std::string & id, size_t index, T... rest)
```

- **参数**:
  - `id`: 基础标识符
  - `index`: 要追加的数字索引
  - `rest...`: 其他要追加的参数
- **功能**: 在标识符后追加数字索引，然后继续处理剩余参数

#### 字符串追加构造函数
```cpp
template<typename... T>
TextIdentifier(const std::string & id, const std::string & id2, T... rest)
```

- **参数**:
  - `id`: 基础标识符
  - `id2`: 要追加的字符串
  - `rest...`: 其他要追加的参数
- **功能**: 在标识符后追加另一个字符串，然后继续处理剩余参数

### 访问方法

#### get()
```cpp
const std::string & get() const
```

- **返回值**: 存储的标识符字符串的常量引用
- **功能**: 获取标识符的字符串表示

## 使用场景

### 基本用法
```cpp
// 简单标识符
TextIdentifier simple("hero.name");
std::string id = simple.get(); // "hero.name"

// 从C字符串创建
TextIdentifier fromCStr("artifact.power");
```

### 构建层次化标识符
```cpp
// 使用索引构建
TextIdentifier heroName("hero", 15, "name");
// 结果: "hero.15.name"

// 使用多个字符串
TextIdentifier spellDesc("spell", "fireball", "description");
// 结果: "spell.fireball.description"

// 混合使用
TextIdentifier complex("unit", 5, "stats", "attack");
// 结果: "unit.5.stats.attack"
```

### 在本地化中的应用
```cpp
// 英雄名称
TextIdentifier heroId("hero", heroID, "name");
std::string localizedName = CGI->generaltexth->translate(heroId.get());

// 技能描述
TextIdentifier skillId("skill", skillID, "description", level);
std::string skillDesc = CGI->generaltexth->translate(skillId.get());
```

### 模板递归展开
```cpp
// 这个调用:
// TextIdentifier("a", 1, "b", 2, "c")
//
// 展开为:
// TextIdentifier("a", 1, TextIdentifier("b", 2, TextIdentifier("c")))
// TextIdentifier("a.1", TextIdentifier("b", 2, TextIdentifier("c")))
// TextIdentifier("a.1", TextIdentifier("b.2", TextIdentifier("c")))
// TextIdentifier("a.1", TextIdentifier("b.2.c"))
// TextIdentifier("a.1.b.2.c")
//
// 最终结果: "a.1.b.2.c"
```

## 设计意图

TextIdentifier的设计目标：

1. **类型安全**: 提供类型安全的标识符构建方式
2. **灵活构建**: 支持任意数量的参数组合
3. **性能优化**: 使用常量引用返回，避免不必要的复制
4. **模板递归**: 利用C++模板实现编译时递归展开
5. **点号分隔**: 使用标准的点号分隔符构建层次结构
6. **隐式转换**: 可以隐式转换为std::string用于兼容性

## 实现细节

### 模板递归机制
TextIdentifier使用可变参数模板实现递归构建：

```cpp
template<typename... T>
TextIdentifier(const std::string & id, size_t index, T... rest):
    TextIdentifier(id + '.' + std::to_string(index), rest...)
{}
```

这个构造函数会：
1. 将当前参数追加到基础字符串
2. 递归调用自身处理剩余参数
3. 直到所有参数处理完毕

### 字符串连接优化
- 使用`+`运算符进行字符串连接
- `std::to_string()`将数字转换为字符串
- 递归展开在编译时确定，无运行时开销

## 注意事项

- **参数顺序**: 参数按从左到右的顺序追加
- **分隔符**: 自动插入点号(.)分隔符
- **类型限制**: 仅支持size_t和std::string参数类型
- **空字符串**: 允许空字符串作为参数
- **常量性**: get()方法返回常量引用，保证数据不变性
- **线程安全**: 类的使用是线程安全的（无静态成员）

这个类为VCMI的本地化系统提供了简洁而强大的文本标识符构建工具，大大简化了多语言文本的组织和管理。