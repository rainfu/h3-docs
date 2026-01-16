# EConsoleTextColor枚举

EConsoleTextColor枚举是VCMI日志系统中的控制台文本颜色枚举，用于在控制台输出中显示不同颜色的日志消息。

## 枚举定义

```cpp
enum class EConsoleTextColor : int8_t
{
    DEFAULT,        // 默认颜色
    BLACK,          // 黑色
    BLUE,           // 蓝色
    CYAN,           // 青色
    GREEN,          // 绿色
    MAGENTA,        // 洋红色
    RED,            // 红色
    WHITE,          // 白色
    YELLOW,         // 黄色
    GREY,           // 灰色
    LIGHT_BLUE,     // 浅蓝色
    LIGHT_CYAN,     // 浅青色
    LIGHT_GREEN,    // 浅绿色
    LIGHT_MAGENTA,  // 浅洋红色
    LIGHT_RED,      // 浅红色
    LIGHT_WHITE,    // 浅白色
    LIGHT_YELLOW    // 浅黄色
};
```

## 功能说明

EConsoleTextColor是VCMI日志系统中的控制台文本颜色枚举，用于在控制台输出中以不同颜色显示不同类型的日志消息。通过使用不同的颜色，可以更容易地区分不同级别的日志消息，提高日志的可读性。

## 依赖关系

- 无直接依赖

## 枚举值说明

- `DEFAULT`: 默认控制台颜色
- `BLACK`: 黑色文本
- `BLUE`: 蓝色文本
- `CYAN`: 青色文本
- `GREEN`: 绿色文本
- `MAGENTA`: 洋红色文本
- `RED`: 红色文本
- `WHITE`: 白色文本
- `YELLOW`: 黄色文本
- `GREY`: 灰色文本
- `LIGHT_BLUE`: 浅蓝色文本
- `LIGHT_CYAN`: 浅青色文本
- `LIGHT_GREEN`: 浅绿色文本
- `LIGHT_MAGENTA`: 浅洋红色文本
- `LIGHT_RED`: 浅红色文本
- `LIGHT_WHITE`: 浅白色文本
- `LIGHT_YELLOW`: 浅黄色文本