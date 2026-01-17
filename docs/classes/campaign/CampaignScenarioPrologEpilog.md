<!-- 来源: E:\develop\heroes\vcmi\lib\campaign\CampaignScenarioPrologEpilog.h -->
# CampaignScenarioPrologEpilog结构体

CampaignScenarioPrologEpilog结构体定义了VCMI战役系统中场景的前奏和尾声内容配置。

## 结构体定义

```cpp
struct DLL_LINKAGE CampaignScenarioPrologEpilog
```

## 概述

CampaignScenarioPrologEpilog结构体管理战役场景的开场和结束内容，包括视频、音乐、语音和文本信息，为玩家提供沉浸式的故事情节体验。

## 成员变量

### 控制标志
```cpp
bool hasPrologEpilog = false;
```
指示是否启用前奏/尾声内容。

### 视频资源
```cpp
std::pair<VideoPath, VideoPath> prologVideo;
```
前奏视频文件路径对：
- `first`: 主要视频文件
- `second`: 备用视频文件（某些版本可能不存在）

### 音频资源
```cpp
AudioPath prologMusic;    // 前奏背景音乐
AudioPath prologVoice;    // 前奏语音旁白
```

### 文本内容
```cpp
MetaString prologText;    // 前奏文本内容
```

## 序列化支持

支持版本兼容的序列化：

```cpp
template <typename Handler> void serialize(Handler &h)
{
    h & hasPrologEpilog;
    if(h.version >= Handler::Version::CAMPAIGN_VIDEO)
        h & prologVideo;        // 新版本：支持双视频
    else
        h & prologVideo.first;  // 旧版本：仅主要视频
    h & prologMusic;
    h & prologVoice;
    h & prologText;
}
```

## 版本兼容性

### Handler::Version::CAMPAIGN_VIDEO
- **新版本**: 支持双视频文件(prologVideo.first 和 prologVideo.second)
- **旧版本**: 只支持单个视频文件(prologVideo.first)

## 资源类型

- **VideoPath**: 视频文件路径
- **AudioPath**: 音频文件路径
- **MetaString**: 支持本地化的文本字符串

## 使用场景

CampaignScenarioPrologEpilog用于：

1. **场景介绍**: 在场景开始前播放视频和音乐
2. **故事情节**: 通过语音旁白和文本讲述故事背景
3. **氛围营造**: 使用专门的音乐增强游戏体验

## 相关类

- `CampaignScenario`: 使用此结构体定义场景的前奏内容
- `MetaString`: 提供本地化文本支持
- `VideoPath/AudioPath`: 资源路径管理

## 配置示例

```json
{
    "hasPrologEpilog": true,
    "prologVideo": ["VIDEO/INTRO.SMK", "VIDEO/INTRO_ALT.SMK"],
    "prologMusic": "MUSIC/PROLOG.MP3",
    "prologVoice": "SOUND/PROLOG_VOICE.WAV",
    "prologText": "场景开始前的故事介绍..."
}
```

## 注意事项

- 视频文件可能有主备两个版本，以确保兼容性
- 所有资源路径都支持本地化
- 文本内容使用MetaString支持多语言