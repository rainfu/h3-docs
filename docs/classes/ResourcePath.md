<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\ResourcePath.h -->
# ResourcePath头文件

ResourcePath头文件定义了VCMI中资源路径管理的类和枚举，用于统一管理各种游戏资源的路径和类型。

## EResType枚举

### 资源类型定义
- `TEXT`: 文本文件 (.txt)
- `JSON`: JSON文件 (.json)
- `ANIMATION`: 动画文件 (.def)
- `MASK`: 遮罩文件 (.msk .msg)
- `CAMPAIGN`: 战役文件 (.h3c)
- `MAP`: 地图文件 (.h3m)
- `BMP_FONT`: BMP字体 (.fnt)
- `TTF_FONT`: TTF字体
- `IMAGE`: 图像文件 (.bmp, .jpg, .pcx, .png, .tga)
- `VIDEO`: 视频文件 (.smk, .bik .ogv .webm)
- `VIDEO_LOW_QUALITY`: 低质量视频
- `SOUND`: 音效文件 (.wav .82m)
- `MUSIC`: 音乐文件 (.mp3, .ogg)
- `ARCHIVE_VID`: VID存档
- `ARCHIVE_ZIP`: ZIP存档
- `ARCHIVE_SND`: SND存档
- `ARCHIVE_LOD`: LOD存档
- `ARCHIVE_PAK`: PAK存档
- `PALETTE`: 调色板文件 (.pal)
- `SAVEGAME`: 存档文件 (.v*gm1)
- `DIRECTORY`: 目录
- `ERM`: ERM脚本
- `ERT`: ERT脚本
- `ERS`: ERS脚本
- `LUA`: Lua脚本
- `AI_MODEL`: AI模型
- `OTHER`: 其他类型
- `UNDEFINED`: 未定义类型

## ResourcePath类

### 类定义
```cpp
class DLL_LINKAGE ResourcePath
```

### 构造函数
- `ResourcePath(const JsonNode & name, EResType type)`: 从JSON节点构造
- `ResourcePath(const std::string & fullName)`: 从完整名称构造
- `ResourcePath(const std::string & name, EResType type)`: 从名称和类型构造

### 比较运算符
- `bool operator==(const ResourcePath & other) const`: 相等比较
- `bool operator!=(const ResourcePath & other) const`: 不等比较
- `bool operator<(const ResourcePath & other) const`: 小于比较

### 主要方法
- `bool empty() const`: 检查是否为空
- `std::string getName() const`: 获取资源名称
- `std::string getOriginalName() const`: 获取原始名称
- `EResType getType() const`: 获取资源类型
- `void serializeJson(JsonSerializeFormat & handler)`: JSON序列化

### 序列化支持
- `template <typename Handler> void serialize(Handler & h)`: 序列化支持

### 私有成员
- `EResType type`: 资源类型
- `std::string name`: 资源名称（大写，无扩展名）
- `std::string originalName`: 原始名称

## ResourcePathTempl模板类

### 类定义
```cpp
template<EResType Type>
class ResourcePathTempl : public ResourcePath
```

### 静态方法
- `static ResourcePathTempl fromResource(const ResourcePath & resource)`: 从资源路径创建
- `static ResourcePathTempl builtin(const std::string & filename)`: 创建内置资源
- `static ResourcePathTempl builtinTODO(const std::string & filename)`: 创建待办内置资源
- `static ResourcePathTempl fromJson(const JsonNode & path)`: 从JSON创建

### 转换方法
- `template<EResType Type2> ResourcePathTempl<Type2> toType() const`: 转换为其他类型
- `ResourcePathTempl addPrefix(const std::string & prefix) const`: 添加前缀

## 类型别名

- `using AnimationPath = ResourcePathTempl<EResType::ANIMATION>`: 动画路径
- `using ImagePath = ResourcePathTempl<EResType::IMAGE>`: 图像路径
- `using TextPath = ResourcePathTempl<EResType::TEXT>`: 文本路径
- `using JsonPath = ResourcePathTempl<EResType::JSON>`: JSON路径
- `using VideoPath = ResourcePathTempl<EResType::VIDEO>`: 视频路径
- `using AudioPath = ResourcePathTempl<EResType::SOUND>`: 音频路径

## EResTypeHelper命名空间

### 工具函数
- `EResType getTypeFromExtension(std::string extension)`: 从扩展名获取类型
- `std::string getEResTypeAsString(EResType type)`: 获取类型字符串表示

## std命名空间扩展

### 哈希特化
```cpp
template <> struct hash<VCMI_LIB_WRAP_NAMESPACE(ResourcePath)>
```
为ResourcePath提供哈希函数支持。

## 设计特点

- 类型安全：通过模板类确保资源类型正确性
- 扩展名无关：内部使用无扩展名的大写名称
- 序列化支持：支持JSON和二进制序列化
- 哈希支持：可作为unordered_map的键使用
- 丰富的资源类型：支持游戏所需的各种资源格式