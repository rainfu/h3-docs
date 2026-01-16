# TRmgTemplateZoneId类型

TRmgTemplateZoneId类型是VCMI中随机地图生成系统中区域ID的类型定义，用于标识随机地图模板中的不同区域。

## 类定义

```cpp
using TRmgTemplateZoneId = int32_t;
```

## 功能说明

TRmgTemplateZoneId是VCMI随机地图生成系统中用于表示区域ID的类型别名。它是一个32位整数类型，用于唯一标识随机地图模板中的各个区域。这个类型在随机地图生成系统中广泛使用，用于区分不同的区域并管理它们之间的关系。

## 依赖关系

- STL库: int32_t (stdint.h)

## 类型别名

- `TRmgTemplateZoneId`: 32位整数类型的别名，专门用于随机地图模板区域ID