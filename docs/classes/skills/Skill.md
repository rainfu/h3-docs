# Skill接口

Skill接口是VCMI中技能的抽象接口，继承自EntityT。

## 类定义

```cpp
class DLL_LINKAGE Skill : public EntityT<SecondarySkill>
{
public:
    virtual std::string getDescriptionTextID(int level) const = 0;
    virtual std::string getDescriptionTranslated(int level) const = 0;
};
```

## 功能说明

Skill是VCMI游戏中技能系统的基接口，用于表示游戏中的各种二级技能（如智慧、攻击、防御等）。它提供了访问技能描述信息的方法，可以根据技能等级获取不同的描述内容。该接口继承自EntityT，使其具备实体特征和ID管理功能。

## 依赖关系

- [EntityT](../entities/EntityT.md): 通用实体基类
- [SecondarySkill](../identifiers/SecondarySkill.md): 二级技能ID类型
- STL库: string

## 函数注释

- `getDescriptionTextID(level)`: 根据技能等级获取描述文本的ID
- `getDescriptionTranslated(level)`: 根据技能等级获取翻译后的描述文本