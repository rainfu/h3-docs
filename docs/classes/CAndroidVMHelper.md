<!-- 来源: E:\develop\heroes\vcmi\lib\CAndroidVMHelper.h -->
# CAndroidVMHelper类

CAndroidVMHelper类是VCMI在Android平台上用于原生代码与Java代码通信的辅助类。

## 类定义
```cpp
class DLL_LINKAGE CAndroidVMHelper
```

## 构造函数和析构函数
- `CAndroidVMHelper()`: 构造函数，获取JNIEnv
- `~CAndroidVMHelper()`: 析构函数，根据需要分离线程

## 主要方法

### get
```cpp
JNIEnv * get()
```
获取JNIEnv指针。

**返回值:**
- JNIEnv指针，用于JNI调用

### findClassloadedClass
```cpp
jclass findClassloadedClass(const std::string & name)
```
查找已加载的类。

**参数:**
- `name`: 类名

**返回值:**
- jclass对象

### callStaticVoidMethod
```cpp
void callStaticVoidMethod(const std::string & cls, const std::string & method, bool classloaded = false)
```
调用静态void方法。

**参数:**
- `cls`: 类名
- `method`: 方法名
- `classloaded`: 是否使用已加载的类

### callStaticStringMethod
```cpp
std::string callStaticStringMethod(const std::string & cls, const std::string & method, bool classloaded = false)
```
调用静态字符串方法。

**参数:**
- `cls`: 类名
- `method`: 方法名
- `classloaded`: 是否使用已加载的类

**返回值:**
- 方法返回的字符串

### callCustomMethod
```cpp
void callCustomMethod(const std::string & cls, const std::string & method, const std::string & signature,
                      std::function<void(JNIEnv *, jclass, jmethodID)> fun, bool classloaded = false)
```
调用自定义方法。

**参数:**
- `cls`: 类名
- `method`: 方法名
- `signature`: 方法签名
- `fun`: 执行函数的回调
- `classloaded`: 是否使用已加载的类

## 静态方法

### cacheVM
```cpp
static void cacheVM(JNIEnv * env)
```
缓存Java虚拟机。

**参数:**
- `env`: JNIEnv指针

### initClassloader
```cpp
static void initClassloader(void * baseEnv)
```
初始化类加载器。

**参数:**
- `baseEnv`: 基础环境指针

## 静态成员
- `static bool alwaysUseLoadedClass`: 总是使用已加载的类
- `static constexpr const char * NATIVE_METHODS_DEFAULT_CLASS`: 默认原生方法类名

## 私有成员
- `JNIEnv * envPtr`: JNIEnv指针
- `bool detachInDestructor`: 析构时是否分离线程

## 平台限制

仅在Android平台上定义（`#ifdef VCMI_ANDROID`）。