# ObjectVisitStarted

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/events/ObjectVisitStarted.h`

## 概述
`ObjectVisitStarted`定义了VCMI引擎中对象访问开始事件的接口。该文件定义了当英雄开始访问地图对象时触发的事件。

## 功能说明

### ObjectVisitStarted 事件的主要功能：

- 表示英雄已开始访问某个地图对象
- 通知系统英雄与地图对象交互过程已启动
- 允许在访问开始时应用临时效果或状态
- 支持对象访问前处理的触发机制

此事件在英雄开始与地图对象（如资源点、建筑、宝箱等）交互时触发，允许其他系统响应访问开始的情况，例如应用临时效果、处理预访问逻辑等。