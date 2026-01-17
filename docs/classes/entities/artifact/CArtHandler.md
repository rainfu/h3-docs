# CArtHandler类

CArtHandler类是VCMI中神器处理器，负责加载、管理和提供对游戏中各种神器的访问。

## 类定义

```cpp
class DLL_LINKAGE CArtHandler : public CHandlerBase<ArtifactID, Artifact, CArtifact, ArtifactService>
{
public:
    void addBonuses(CArtifact * art, const JsonNode & bonusList);

    static EArtifactClass stringToClass(const std::string & className); //TODO: 重构EartClass以使其成为构造函数
    DischargeArtifactCondition stringToDischargeCond(const std::string & cond) const;

    bool legalArtifact(const ArtifactID & id) const;
    static void makeItCreatureArt(CArtifact * a, bool onlyCreature = true);
    static void makeItCommanderArt(CArtifact * a, bool onlyCommander = true);

    ~CArtHandler();

    std::vector<JsonNode> loadLegacyData() override;

    void loadObject(std::string scope, std::string name, const JsonNode & data) override;
    void loadObject(std::string scope, std::string name, const JsonNode & data, size_t index) override;
    void afterLoadFinalization() override;

    std::set<ArtifactID> getDefaultAllowed() const;

protected:
    const std::vector<std::string> & getTypeNames() const override;
    std::shared_ptr<CArtifact> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & identifier, size_t index) override;

private:
    void addSlot(CArtifact * art, const std::string & slotID) const;
    void loadSlots(CArtifact * art, const JsonNode & node) const;
    void loadClass(CArtifact * art, const JsonNode & node) const;
    void loadType(CArtifact * art, const JsonNode & node) const;
    void loadComponents(CArtifact * art, const JsonNode & node);
};
```

## 功能说明

CArtHandler是VCMI神器系统的主要处理器，负责加载、管理和提供对游戏中各种神器的访问。它继承自CHandlerBase，实现了对神器数据的统一管理。该处理器处理神器的JSON数据加载、奖励添加、插槽配置、分类和组件等。

## 依赖关系

- [CHandlerBase](../mapObjects/IHandlerBase.md): 处理器基类
- [CArtifact](./CArtifact.md): 神器类
- [EArtifactClass](./EArtifactClass.md): 神器类别
- [DischargeArtifactCondition](./DischargeArtifactCondition.md): 放电条件
- [ArtifactID](./ArtifactID.md): 神器ID
- [JsonNode](../json/JsonNode.md): JSON节点
- STL库: vector, set, string, shared_ptr等

## 函数注释

- `addBonuses(art, bonusList)`: 为神器添加奖励
- `stringToClass(className)`: 将字符串转换为神器类别
- `stringToDischargeCond(cond)`: 将字符串转换为放电条件
- `legalArtifact(id)`: 检查神器ID是否合法
- `makeItCreatureArt(a, onlyCreature)`: 将神器设为生物神器
- `makeItCommanderArt(a, onlyCommander)`: 将神器设为指挥官神器
- `loadLegacyData()`: 加载旧版数据
- `loadObject(scope, name, data)`: 从JSON加载对象
- `loadObject(scope, name, data, index)`: 从JSON加载对象（指定索引）
- `afterLoadFinalization()`: 加载完成后的最终化处理
- `getDefaultAllowed()`: 获取默认允许的神器集合
- `getTypeNames()`: 获取类型名称列表
- `loadFromJson(scope, json, identifier, index)`: 从JSON加载神器
- `addSlot(art, slotID)`: 为神器添加插槽（私有）
- `loadSlots(art, node)`: 加载神器插槽（私有）
- `loadClass(art, node)`: 加载神器类别（私有）
- `loadType(art, node)`: 加载神器类型（私有）
- `loadComponents(art, node)`: 加载神器组件（私有）