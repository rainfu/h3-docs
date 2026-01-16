# ESpellCastResult枚举

ESpellCastResult枚举是VCMI中法术施放结果的枚举类型，用于表示法术施放操作的结果状态。

## 类定义

```cpp
enum class ESpellCastResult : int8_t
{
    OK, // 施放成功
    CANCEL, // 施放失败但不是错误，不消耗法力值
    PENDING, // 待处理
    ERROR // 发生错误，例如来自玩家的无效请求
};
```

## 功能说明

ESpellCastResult是VCMI法术系统中用于表示法术施放结果的枚举类型。它定义了法术施放操作可能的各种状态，从成功的施放到不同类型的失败情况。这个枚举主要用于法术效果执行函数的返回值，让调用方知道法术执行的状态。

## 依赖关系

- [IAdventureSpellEffect](./IAdventureSpellEffect.md): 冒险法术效果接口
- [SpellCastEnvironment](./SpellCastEnvironment.md): 法术施放环境
- [AdventureSpellCastParameters](./AdventureSpellCastParameters.md): 冒险法术施放参数

## 枚举值说明

- `OK`: 施放成功，法术正常执行
- `CANCEL`: 施放取消，这不是错误状态，不会消耗法力值
- `PENDING`: 施放待处理，可能需要等待某些操作完成
- `ERROR`: 发生错误，例如玩家发送了无效请求