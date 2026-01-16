# CDynLibHandler类

CDynLibHandler类是VCMI系统中的动态库处理类，用于加载和创建各种AI和模块实例。它提供了一个统一的接口来从动态库中创建AI实例。

## 类定义

```cpp
class CGlobalAI;
class CBattleGameInterface;

#if SCRIPTING_ENABLED
namespace scripting
{
    class Module;
}
#endif

class DLL_LINKAGE CDynLibHandler
{
public:
    static std::shared_ptr<CGlobalAI> getNewAI(const std::string & dllname);                    // 获取新的AI实例
    static std::shared_ptr<CBattleGameInterface> getNewBattleAI(const std::string & dllname);  // 获取新的战斗AI实例
    #if SCRIPTING_ENABLED
    static std::shared_ptr<scripting::Module> getNewScriptingModule(const boost::filesystem::path & dllname); // 获取新的脚本模块实例
    #endif
};
```

## 功能说明

CDynLibHandler类是VCMI系统中的动态库处理类，主要用于从动态库文件中加载并创建AI实例。该类提供静态方法来创建不同类型的AI实例，包括全局AI和战斗AI。

## 重要方法

- `getNewAI(dllname)`: 根据DLL名称创建一个新的CGlobalAI实例，返回指向该实例的智能指针
- `getNewBattleAI(dllname)`: 根据DLL名称创建一个新的CBattleGameInterface实例，返回指向该实例的智能指针
- `getNewScriptingModule(dllname)`: （条件编译）当启用脚本功能时，根据DLL路径创建一个新的脚本模块实例

## 设计说明

CDynLibHandler类的设计体现了插件式架构的思想，允许在运行时动态加载不同类型的AI实现。这种设计提供了以下优势：

1. **可扩展性**: 可以轻松添加新的AI实现，只需编写相应的DLL并使用此接口加载
2. **模块化**: AI逻辑与核心系统分离，便于维护和更新
3. **灵活性**: 可以根据需要动态选择不同的AI实现

该类使用智能指针(std::shared_ptr)来管理创建的对象生命周期，确保适当的内存管理。

条件编译指令(#if SCRIPTING_ENABLED)允许在不支持脚本的构建中排除脚本相关功能，使系统更加灵活。