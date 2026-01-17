<!-- 来源: E:\develop\heroes\vcmi\lib\rmg\CRmgTemplateStorage.h -->
# CRmgTemplateStorage头文件

CRmgTemplateStorage头文件定义了VCMI中随机地图生成器模板存储类，用于管理和加载地图生成模板。

## CRmgTemplateStorage类

### 类定义
```cpp
class DLL_LINKAGE CRmgTemplateStorage : public IHandlerBase
```

### 构造函数
- `CRmgTemplateStorage() = default`: 默认构造函数

### 继承的方法
- `std::vector<JsonNode> loadLegacyData() override`: 加载遗留数据
- `void loadObject(std::string scope, std::string name, const JsonNode & data) override`: 加载对象
- `void loadObject(std::string scope, std::string name, const JsonNode & data, size_t index) override`: 加载带索引的对象
- `void afterLoadFinalization() override`: 加载后最终化

### 模板访问方法
- `const CRmgTemplate* getTemplate(const std::string & templateName) const`: 获取指定模板
- `std::vector<const CRmgTemplate *> getTemplates() const`: 获取所有模板

### 私有成员
- `std::map<std::string, std::shared_ptr<CRmgTemplate>> templates`: 模板映射

## 设计特点

- 继承自IHandlerBase，支持标准加载机制
- 提供模板的存储和检索功能
- 支持JSON格式的模板加载
- 包含遗留数据兼容性