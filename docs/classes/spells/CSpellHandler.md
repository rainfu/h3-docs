# CSpellHandler类

CSpellHandler类是VCMI中法术处理器，负责加载、管理和提供对游戏中各种法术的访问。

## 类定义

```cpp
class DLL_LINKAGE CSpellHandler: public CHandlerBase<SpellID, spells::Spell, CSpell, spells::Service>
{
    std::vector<int> spellRangeInHexes(std::string rng) const;

public:
    ///IHandler基类
    std::vector<JsonNode> loadLegacyData() override;
    void afterLoadFinalization() override;
    void beforeValidate(JsonNode & object) override;

    /**
     * 获取默认允许的法术列表。OH3法术默认都是允许的。
     *
     */
    std::set<SpellID> getDefaultAllowed() const;

protected:
    const std::vector<std::string> & getTypeNames() const override;
    std::shared_ptr<CSpell> loadFromJson(const std::string & scope, const JsonNode & json, const std::string & identifier, size_t index) override;
};
```

## 功能说明

CSpellHandler是VCMI法术系统的主要处理器，负责加载、管理和提供对游戏中各种法术的访问。它继承自CHandlerBase，实现了对法术数据的统一管理。该处理器处理法术的JSON数据加载、验证和初始化，以及提供对法术数据的访问接口。

## 依赖关系

- [CHandlerBase](../mapObjects/IHandlerBase.md): 处理器基类
- [CSpell](./CSpell.md): 法术类
- [SpellID](./SpellID.md): 法术ID
- [spells::Spell](./Spell.md): 法术接口
- [spells::Service](./Service.md): 法术服务
- [JsonNode](../json/JsonNode.md): JSON节点
- STL库: vector, set, string, shared_ptr等

## 函数注释

- `spellRangeInHexes(rng)`: 将法术范围字符串转换为六角网格距离数组
- `loadLegacyData()`: 加载旧版数据
- `afterLoadFinalization()`: 加载完成后的最终化处理
- `beforeValidate(object)`: 验证前的预处理
- `getDefaultAllowed()`: 获取默认允许的法术集合
- `getTypeNames()`: 获取类型名称列表
- `loadFromJson(scope, json, identifier, index)`: 从JSON加载法术