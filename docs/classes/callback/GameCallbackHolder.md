# GameCallbackHolder

## 概述

`GameCallbackHolder` 类是一个简单的容器类，用于持有 `IGameInfoCallback` 接口的引用。它提供了一种统一的方式来访问游戏信息回调接口。

## 继承关系

```cpp
GameCallbackHolder
```

## 主要功能

GameCallbackHolder 提供了以下核心功能：

1. **回调持有**: 安全地持有游戏信息回调接口的引用
2. **访问代理**: 提供对回调接口的统一访问点
3. **生命周期管理**: 确保回调接口的正确初始化和访问

## 核心成员

### 公共成员变量

#### cb
```cpp
IGameInfoCallback * cb;
```
- **类型**: `IGameInfoCallback*`
- **含义**: 指向游戏信息回调接口的指针
- **访问**: 公共成员，可直接访问

## 构造函数

### GameCallbackHolder
```cpp
explicit GameCallbackHolder(IGameInfoCallback *cb):
    cb(cb)
{}
```
- **参数**:
  - `cb`: 要持有的游戏信息回调接口指针
- **功能**: 使用指定的回调接口初始化持有者
- **说明**: 构造函数标记为 `explicit`，防止隐式转换

## 使用场景

### 在游戏组件中持有回调
```cpp
// 在游戏组件中创建回调持有者
class GameComponent {
private:
    GameCallbackHolder callbackHolder;

public:
    GameComponent(IGameInfoCallback* cb)
        : callbackHolder(cb)
    {}

    void doSomething() {
        // 通过持有者访问回调
        if (callbackHolder.cb) {
            auto playerState = callbackHolder.cb->getPlayerState(PlayerColor::RED);
            // 使用玩家状态...
        }
    }
};
```

### 作为参数传递
```cpp
// 函数接受回调持有者作为参数
void processGameData(const GameCallbackHolder& holder) {
    if (holder.cb) {
        auto currentDate = holder.cb->getDate(Date::DAY);
        // 处理游戏日期...
    }
}
```

### 依赖注入
```cpp
// 使用依赖注入模式
class GameService {
private:
    GameCallbackHolder& callbackHolder;

public:
    GameService(GameCallbackHolder& holder)
        : callbackHolder(holder)
    {}

    void performAction() {
        // 使用注入的回调持有者
        auto heroes = callbackHolder.cb->getHeroes(PlayerColor::BLUE);
        // 处理英雄列表...
    }
};
```

## 设计意图

GameCallbackHolder 的设计目的是为了：

1. **封装回调访问**: 提供对游戏信息回调的统一访问接口
2. **生命周期管理**: 确保回调接口的正确持有和访问
3. **依赖注入**: 支持依赖注入模式，便于测试和解耦
4. **类型安全**: 通过显式构造函数防止意外的类型转换
5. **简洁性**: 保持类的简单性，只专注于回调持有功能

## 注意事项

- **空指针检查**: 使用前应检查 `cb` 指针是否为空
- **生命周期**: 确保传入的回调接口在持有者生命周期内有效
- **线程安全**: 如果在多线程环境中使用，需要额外的同步机制
- **所有权**: 持有者不拥有回调接口的所有权，只持有引用

这个类为VCMI提供了灵活的回调管理机制，支持组件间的松耦合设计。