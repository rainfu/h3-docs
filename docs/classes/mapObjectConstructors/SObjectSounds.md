# SObjectSounds

## 源文件

[SObjectSounds.h](https://github.com/vcmi/vcmi/blob/master/lib/mapObjectConstructors/SObjectSounds.h)

## 结构体定义

```cpp
struct SObjectSounds
```

`SObjectSounds` 结构体定义了地图对象相关的音效配置，包括环境音、访问音和移除音。

## 成员变量

- `std::vector<AudioPath> ambient` - 环境音效列表（对象周围持续播放的声音）
- `std::vector<AudioPath> visit` - 访问音效列表（英雄访问对象时播放的声音）
- `std::vector<AudioPath> removal` - 移除音效列表（对象被移除时播放的声音）

## 设计特点

- **多音效支持**: 每个音效类型都支持多个音频文件
- **事件驱动**: 根据对象交互事件播放相应音效
- **资源路径**: 使用 `AudioPath` 类型管理音频资源
- **灵活配置**: 支持为空列表，表示没有相应音效