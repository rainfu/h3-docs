<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\ResourcePath.h -->
# ResourcePath头文件

ResourcePath头文件定义了VCMI中资源路径管理和类型识别的相关类和枚举。

## EResType枚举

### 定义
```cpp
enum class EResType
```

### 支持的资源类型
- `TEXT`: 文本文件 (.txt)
- `JSON`: JSON文件 (.json)
- `ANIMATION`: 动画文件 (.def)
- `MASK`: 遮罩文件 (.msk, .msg)
- `CAMPAIGN`: 战役文件 (.h3c)
- `MAP`: 地图文件 (.h3m)
- `BMP_FONT`: BMP字体 (.fnt)
- `TTF_FONT`: TTF字体
- `IMAGE`: 图像文件 (.bmp, .jpg, .pcx, .png, .tga)
- `VIDEO`: 视频文件 (.smk, .bik, .ogv, .webm)
- `VIDEO_LOW_QUALITY`: 低质量视频
- `SOUND`: 音效文件 (.wav, .82m)
- `ARCHIVE_VID`: VID归档 (.vid)
- `ARCHIVE_ZIP`: ZIP归档 (.zip)
- `ARCHIVE_SND`: SND归档 (.snd)
- `ARCHIVE_LOD`: LOD归档 (.lod)
- `ARCHIVE_PAK`: PAK归档 (.pac)
- `PALETTE`: 调色板文件 (.pal)
- `SAVEGAME`: 存档文件 (.v*gm1)
- `DIRECTORY`: 目录
- `ERM`: ERM脚本
- `ERT`: ERT脚本
- `ERS`: ERS脚本
- `LUA`: Lua脚本
- `AI_MODEL`: AI模型
- `OTHER`: 其他类型
- `UNDEFINED`: 未定义

## ResourcePath类

### 类定义
```cpp
class DLL_LINKAGE ResourcePath
```

### 构造函数
- `ResourcePath(const std::string & fullName)`: 根据完整文件名构造
- `ResourcePath(const std::string & name, EResType type)`: 根据名称和类型构造
- `ResourcePath(const JsonNode & name, EResType type)`: 根据JsonNode和类型构造

### 运算符重载
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
- `template <typename Handler> void serialize(Handler & h)`: 通用序列化

## ResourcePathTempl模板类

### 类定义
```cpp
template<EResType Type>
class ResourcePathTempl : public ResourcePath
```

### 构造函数
- `ResourcePathTempl()`: 默认构造
- `ResourcePathTempl(const std::string & path)`: 根据路径构造
- `ResourcePathTempl(const JsonNode & name)`: 根据JsonNode构造

### 静态方法
- `static ResourcePathTempl fromResource(const ResourcePath & resource)`: 从ResourcePath转换
- `static ResourcePathTempl builtin(const std::string & filename)`: 内置资源
- `static ResourcePathTempl builtinTODO(const std::string & filename)`: 待办内置资源
- `static ResourcePathTempl fromJson(const JsonNode & path)`: 从JSON构造

### 模板方法
- `template<EResType Type2> ResourcePathTempl<Type2> toType() const`: 类型转换
- `ResourcePathTempl addPrefix(const std::string & prefix) const`: 添加前缀

## 类型别名

- `AnimationPath`: 动画路径
- `ImagePath`: 图像路径
- `TextPath`: 文本路径
- `JsonPath`: JSON路径
- `VideoPath`: 视频路径
- `AudioPath`: 音频路径

## EResTypeHelper命名空间

### 主要函数
- `EResType getTypeFromExtension(std::string extension)`: 根据扩展名获取类型
- `std::string getEResTypeAsString(EResType type)`: 获取类型字符串表示

## 标准库支持

提供std::hash特化，支持将ResourcePath用作unordered容器键。