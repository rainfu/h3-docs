# MetaString

元字符串类，支持网络传输和本地化字符串格式化。

## 概述

`MetaString` 是VCMI中用于字符串格式化的高级工具类，支持占位符替换、本地化文本、网络序列化等功能。是文本处理系统的核心组件。

## 主要属性
- `message`: 消息类型序列
- `localStrings`: 本地化字符串列表
- `exactStrings`: 精确字符串列表
- `stringsTextID`: 文本ID字符串列表
- `numbers`: 数字列表

## 核心方法
- `void appendLocalString(EMetaText type, ui32 serial)`：追加本地化字符串
- `void appendRawString(const std::string & value)`：追加原始字符串
- `void appendTextID(const std::string & value)`：追加文本ID
- `void appendNumber(int64_t value)`：追加数字
- `void replaceRawString(const std::string & txt)`：替换占位符为原始字符串
- `void replaceNumber(int64_t txt)`：替换占位符为数字
- `std::string toString() const`：转换为用户可读字符串
- `bool empty() const`：检查是否为空

## 依赖关系
- 关联：`JsonNode`, `ArtifactID`, `CreatureID` 等标识符类
- 使用：文本本地化系统和网络序列化

## 用途
- 文本格式化：支持占位符替换和本地化
- 网络传输：序列化支持跨网络传输
- UI显示：生成最终的用户界面文本

## 实现说明
- 延迟求值：存储操作序列，在需要时生成最终字符串
- 本地化支持：支持多种文本源（GENERAL_TXT, ARRAY_TXT等）
- 序列化友好：完整的序列化支持用于保存/加载