<!-- 来源: E:\develop\heroes\vcmi\lib\LogicalExpression.h -->
# LogicalExpression头文件

LogicalExpression头文件定义了VCMI中运行时逻辑表达式评估的模板类系统。

## LogicalExpression模板类

### 类定义
```cpp
template<typename ContainedClass>
class LogicalExpression
```

### 类型定义
- `using Value = typename Base::Value`: 值类型
- `using OperatorAny = typename Base::OperatorAny`: "任意"操作符
- `using OperatorAll = typename Base::OperatorAll`: "全部"操作符
- `using OperatorNone = typename Base::OperatorNone`: "无"操作符
- `using Variant = typename Base::Variant`: 变体类型

### 构造函数
- `LogicalExpression() = default`: 默认构造函数
- `LogicalExpression(const Variant & data)`: 从变体构造
- `LogicalExpression(const JsonNode & input, std::function<Value(const JsonNode &)> parser)`: 从JSON构造

### 主要方法

#### 获取数据
- `Variant get() const`: 获取内部变体数据

#### 表达式操作
- `Variant morph(std::function<Variant(const Value &)> morpher) const`: 变换表达式
- `void minimize()`: 最小化表达式，移除冗余元素

#### 评估方法
- `bool test(std::function<bool(const Value &)> toBool) const`: 测试表达式是否为真
- `bool satisfiable(...) const`: 测试表达式是否可满足（可为真）
- `bool falsifiable(...) const`: 测试表达式是否可证伪（可为假）

#### 候选生成
- `std::vector<Value> getFulfillmentCandidates(std::function<bool(const Value &)> toBool) const`: 获取满足候选

#### 字符串转换
- `std::string toString(std::function<std::string(const Value &)> toStr) const`: 转换为字符串
- `std::string toString(std::function<std::string(const Value &)> toStr, std::function<bool(const Value &)> toBool) const`: 转换为带状态的字符串

#### JSON转换
- `JsonNode toJson(std::function<JsonNode(const Value &)> toJson) const`: 转换为JSON

### 序列化支持
- `template <typename Handler> void serialize(Handler & h)`: 序列化支持

## ExpressionBase模板类

### 枚举
```cpp
enum EOperations
```
- `ANY_OF`: 任意满足
- `ALL_OF`: 全部满足
- `NONE_OF`: 无满足

### 嵌套类
- `template<EOperations tag> class Element`: 操作元素类

## 访问者类

### TestVisitor
测试表达式结果的访问者。

### SatisfiabilityVisitor
测试表达式是否可满足的访问者。

### FalsifiabilityVisitor
测试表达式是否可证伪的访问者。

### 其他访问者
- `PossibilityVisitor`: 可能性访问者基类
- `ForEachVisitor`: 遍历访问者
- `MinimizingVisitor`: 最小化访问者
- `CandidatesVisitor`: 候选访问者
- `Printer`: 打印访问者
- `Reader`: 读取访问者
- `Writer`: 写入访问者

## 设计特点

- 支持复杂的逻辑表达式（AND、OR、NOT组合）
- 提供表达式最小化和优化
- 支持满意度和可证伪性检查
- 适用于AI决策和条件判断
- 支持JSON序列化和反序列化