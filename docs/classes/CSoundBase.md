<!-- 来源: E:\develop\heroes\vcmi\lib\CSoundBase.h -->
# CSoundBase头文件

CSoundBase头文件定义了VCMI中音效管理的基类，包含大量的游戏音效枚举。

## soundBase类

### 类定义
```cpp
class soundBase
```

### soundID枚举

#### 特殊值
- `invalid = 0`: 无效音效
- `sound_todo = 1`: 临时音效（待修复代码）
- `sound_after_last`: 最后一个音效标记

#### 地图动作音效
- `KillFade`: 英雄或怪物消失

#### 单位音效（部分示例）
- `AAGLAttack`: 大天使攻击
- `AAGLDefend`: 大天使防御
- `AAGLKill`: 大天使死亡
- `AAGLMove`: 大天使移动
- `AAGLWNCE`: 大天使受伤

#### 法术和效果音效
- `acid`: 酸液
- `AIRSHELD`: 空气护盾
- `ARMGEDN`: 天启
- `BERSERK`: 狂暴
- `BACKLASH`: 反噬
- `BADLUCK`: 厄运
- `BADMRLE`: 坏士气

#### 战斗音效
- `battle00` 到 `battle07`: 战斗背景音乐

#### 其他音效
包含大量单位攻击、防御、移动、死亡、受伤音效，以及各种法术和游戏事件音效。

## 宏定义

### VCMI_SOUND_LIST
定义所有音效的宏列表，使用`VCMI_SOUND_NAME`和`VCMI_SOUND_FILE`宏来生成枚举和文件名映射。

### VCMI_SOUND_NAME(x)
用于生成音效枚举名称。

### VCMI_SOUND_FILE(y)
用于指定音效文件名。

## 设计特点

- 使用宏系统自动生成枚举和文件名映射
- 包含数百个游戏音效定义
- 为所有游戏音频事件提供统一的标识符系统
- 支持战斗、单位动作、法术效果等多种音效类型