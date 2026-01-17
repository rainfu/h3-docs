<!-- 来源: E:\develop\heroes\vcmi\lib\StdInc.h -->
# StdInc头文件

StdInc.h是VCMI引擎的预编译头文件，用于包含项目通用的头文件和宏定义。

## 文件概述

StdInc.h是一个预编译头文件（PCH），包含了VCMI项目中常用的头文件和宏定义。

## 包含的头文件

- `../Global.h`: 全局定义和宏

## 设计目的

- 作为预编译头文件，提高编译速度
- 包含项目特定的库和宏定义
- 统一项目代码风格和依赖

## 使用说明

StdInc.h通常作为项目中第一个包含的头文件，确保所有源文件都能访问全局定义和宏。

## 许可证

遵循GNU General Public License v2.0或更高版本。