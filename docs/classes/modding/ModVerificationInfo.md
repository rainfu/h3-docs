# ModVerificationInfo类

ModVerificationInfo类是VCMI中模组验证信息的结构体，用于存储模组的验证信息，包括版本、校验和和兼容性状态。

## 类定义

```cpp
enum class ModVerificationStatus
{
    NOT_INSTALLED, /// 模组在本地未安装
    DISABLED, /// 模组在本地已安装但未启用
    EXCESSIVE, /// 模组已启用但在当前场景下必须禁用
    VERSION_MISMATCH, /// 模组在两端都存在，但版本不同
    FULL_MATCH, /// 没有检测到问题，所有内容都匹配
};

using ModListVerificationStatus = std::map<std::string, ModVerificationStatus>;

struct DLL_LINKAGE ModVerificationInfo
{
    /// 人类可读的模组名称
    std::string name;

    /// 模组版本
    CModVersion version;

    /// 模组的CRC-32校验和
    ui32 checksum = 0;

    /// 父模组ID，如果是根级模组则为空
    TModID parent;

    /// 为了序列化目的
    bool impactsGameplay = true;

    static JsonNode jsonSerializeList(const ModCompatibilityInfo & input);
    static ModCompatibilityInfo jsonDeserializeList(const JsonNode & input);
    static ModListVerificationStatus verifyListAgainstLocalMods(const ModCompatibilityInfo & input);

    template <typename Handler>
    void serialize(Handler & h)
    {
        h & name;
        h & version;
        h & checksum;
        h & parent;
        h & impactsGameplay;
    }
};
```

## 功能说明

ModVerificationInfo是VCMI模组系统中用于验证模组兼容性的结构体。它存储了模组的名称、版本、校验和等关键信息，用于在多玩家游戏或存档加载时验证模组的兼容性。它还包括一个验证状态枚举，用于指示模组在验证过程中可能出现的不同状态。

## 依赖关系

- [CModVersion](./CModVersion.md): 模组版本
- [JsonNode](../json/JsonNode.md): JSON节点
- STL库: string, map等

## 函数注释

- `ModVerificationInfo`: 结构体，包含模组验证信息
- `name`: 模组的人类可读名称
- `version`: 模组的版本信息
- `checksum`: 模组的CRC-32校验和
- `parent`: 父模组ID，如果是根级模组则为空
- `impactsGameplay`: 标识模组是否影响游戏玩法
- `jsonSerializeList(input)`: 将模组兼容性信息列表序列化为JSON
- `jsonDeserializeList(input)`: 从JSON反序列化模组兼容性信息列表
- `verifyListAgainstLocalMods(input)`: 验证模组列表与本地模组的兼容性
- `serialize(h)`: 序列化方法