<!-- 来源: E:\develop\heroes\vcmi\lib\json\JsonUtils.h -->
# JsonUtils头文件

JsonUtils头文件提供VCMI中JSON数据处理的实用函数，包括合并、继承、验证和文件组装等功能。

## JsonUtils命名空间

### 合并函数

#### merge函数
```cpp
DLL_LINKAGE void merge(JsonNode & dest, JsonNode & source, bool ignoreOverride = false, bool copyMeta = false)
```
递归合并source到dest，替换相同字段。

#### mergeCopy函数
```cpp
DLL_LINKAGE void mergeCopy(JsonNode & dest, JsonNode source, bool ignoreOverride = false, bool copyMeta = false)
```
递归合并source到dest的副本，替换相同字段。

#### inherit函数
```cpp
DLL_LINKAGE void inherit(JsonNode & descendant, const JsonNode & base)
```
递归合并后代到基础节点的副本，模拟继承语义。

### 文件组装函数

#### assembleFromFiles重载函数
```cpp
DLL_LINKAGE JsonNode assembleFromFiles(const JsonNode & files)
DLL_LINKAGE JsonNode assembleFromFiles(const JsonNode & files, bool & isValid)
DLL_LINKAGE JsonNode assembleFromFiles(const std::vector<std::string> & files)
DLL_LINKAGE JsonNode assembleFromFiles(const std::vector<std::string> & files, std::string modName, bool & isValid)
DLL_LINKAGE JsonNode assembleFromFiles(const std::string & filename)
```
从多个文件生成一个JSON结构。

### 最小化/最大化函数

#### minimize函数
```cpp
DLL_LINKAGE void minimize(JsonNode & node, const std::string & schemaName)
```
移除所有与schema默认值相同的节点。

#### maximize函数
```cpp
DLL_LINKAGE void maximize(JsonNode & node, const std::string & schemaName)
```
添加所有缺失的必需条目（具有默认值）。

### 验证函数

#### validate函数
```cpp
DLL_LINKAGE bool validate(const JsonNode & node, const std::string & schemaName, const std::string & dataName)
```
根据指定schema验证节点。

### Schema函数

#### getSchema函数
```cpp
DLL_LINKAGE const JsonNode & getSchema(const std::string & URI)
```
通过JSON URI获取schema：`vcmi:<schemas目录中的文件名>#<文件中的条目，可选>`。

### 冲突检测函数

#### detectConflicts函数
```cpp
DLL_LINKAGE void detectConflicts(JsonNode & result, const JsonNode & left, const JsonNode & right, const std::string & keyName)
```
检测潜在冲突 - 两个节点中都存在的JSON条目。

## 设计特点

- 支持递归JSON合并和继承
- 提供文件组装功能，支持模组覆盖
- 实现JSON数据的最小化和最大化
- 包含完整的schema验证系统
- 支持冲突检测用于模组兼容性检查