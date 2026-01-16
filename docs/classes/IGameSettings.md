# IGameSettings

游戏设置接口，提供游戏规则和配置的访问。

## 概述

`IGameSettings` 定义了游戏中各种规则和设置的接口，包括战斗规则、英雄属性、经济系统等。是游戏平衡和规则配置的核心接口。

## 主要属性
- 战斗相关：攻击/防御点伤害因子、士气/幸运系统
- 生物相关：生长率、加入规则、经验系统
- 英雄相关：技能点、移动点、背包容量
- 城镇相关：建筑限制、侦察范围、法术研究
- 其他：市场重置、路径寻找规则等

## 核心方法
- `JsonNode getFullConfig() const`：获取完整配置
- `const JsonNode & getValue(EGameSettings option) const`：获取特定设置值
- `bool getBoolean(EGameSettings option) const`：获取布尔值设置
- `int64_t getInteger(EGameSettings option) const`：获取整数设置
- `double getDouble(EGameSettings option) const`：获取浮点设置

## 依赖关系
- 关联：`JsonNode`, `EGameSettings` 枚举
- 使用：游戏逻辑各个模块的配置查询

## 用途
- 规则配置：定义游戏平衡参数
- 模组支持：允许模组修改游戏规则
- 向后兼容：支持不同版本的规则变化
- 调试支持：运行时检查和修改设置

## 实现说明
- 配置驱动：基于JSON配置文件的设置系统
- 类型安全：强类型设置枚举避免错误
- 性能优化：缓存常用设置值
- 扩展性：易于添加新的游戏规则