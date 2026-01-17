<!-- 来源: E:\develop\heroes\vcmi\lib\filesystem\FileInfo.h -->
# FileInfo命名空间

FileInfo头文件定义了文件路径处理相关的工具函数，使用boost::string_ref进行高效的字符串操作。

## 主要函数

### GetFilename
```cpp
boost::string_ref DLL_LINKAGE GetFilename(boost::string_ref path)
```
返回文件名的函数。

**参数:**
- `path`: 文件路径

**返回值:**
- 文件名，例如 "foo.txt"

### GetExtension
```cpp
boost::string_ref DLL_LINKAGE GetExtension(boost::string_ref path)
```
获取文件扩展名的函数。

**参数:**
- `path`: 文件路径

**返回值:**
- 文件扩展名，例如 ".ext"

### GetStem
```cpp
boost::string_ref DLL_LINKAGE GetStem(boost::string_ref path)
```
获取不含扩展名的文件名的函数。

**参数:**
- `path`: 文件路径

**返回值:**
- 不含扩展名的文件名，例如 "foo"

### GetParentPath
```cpp
boost::string_ref DLL_LINKAGE GetParentPath(boost::string_ref path)
```
获取文件所在目录路径的函数。

**参数:**
- `path`: 文件路径

**返回值:**
- 目录路径，例如 "./dir/"

### GetPathStem
```cpp
boost::string_ref DLL_LINKAGE GetPathStem(boost::string_ref path)
```
获取包含路径但不含扩展名的文件名的函数。

**参数:**
- `path`: 文件路径

**返回值:**
- 包含路径但不含扩展名的文件名，例如 "./dir/foo"

## 设计特点

- 使用boost::string_ref进行高效的字符串引用操作，避免不必要的拷贝
- 所有函数都是无状态的纯函数
- 函数返回的string_ref引用原始字符串，不会分配新内存