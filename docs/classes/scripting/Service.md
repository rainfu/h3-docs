# scripting::Service接口

scripting::Service接口是VCMI中脚本服务的抽象接口，定义了脚本系统的基本服务功能。

## 类定义

```cpp
class DLL_LINKAGE Service
{
public:
    virtual ~Service() = default;

    virtual void performRegistration(Services * services) const = 0;
    virtual void run(std::shared_ptr<Pool> pool) const = 0;
};
```

## 功能说明

Service是VCMI脚本系统中的核心服务接口，负责注册脚本功能到系统服务中并运行脚本池。它提供了一种机制来集成脚本系统到VCMI的整体服务架构中，使脚本功能能够与其他系统组件交互。这个接口抽象了脚本服务的具体实现，使系统可以支持不同的脚本引擎和服务模式。

## 依赖关系

- STL库: shared_ptr
- [Pool](./Pool.md): 脚本池接口
- [Services](../services/Services.md): 系统服务接口

## 函数注释

- `~Service()`: 虚析构函数，确保派生类正确销毁
- `performRegistration(services)`: 执行服务注册，将脚本相关的服务注册到系统服务容器中
- `run(pool)`: 在指定的脚本池中运行脚本服务

## 设计说明

Service接口采用了服务注册模式，允许脚本系统动态地将自己注册到VCMI的服务架构中。这种设计使脚本功能成为系统的一等公民，能够与其他系统组件无缝协作。

通过将performRegistration和run方法分离，该接口支持灵活的服务部署方式：可以先注册服务，然后在适当的时候启动脚本执行。这种分离也便于测试和调试，因为可以在不运行脚本的情况下测试注册过程。

Service接口与Pool、Script和Context接口共同构成了VCMI的脚本系统架构，其中Service负责系统集成，Pool负责资源管理，Script定义脚本内容，Context提供执行环境。