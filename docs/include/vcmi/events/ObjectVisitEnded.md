# ObjectVisitEnded

## 源文件地址
`e:\develop\heroes\vcmi-assets\vcmi-client\include\vcmi/events/ObjectVisitEnded.h`

## 概述
`ObjectVisitEnded`定义了VCMI引擎中对象访问结束事件的接口。该文件定义了当英雄结束访问地图对象时触发的事件。

## 功能说明

### ObjectVisitEnded 事件的主要功能：

- 表示英雄已完成对某个地图对象的访问
- 通知系统英雄与地图对象交互过程已结束
- 允许清理与对象访问相关的状态或效果
- 支持对象访问后续处理的触发机制

此事件在英雄完成对地图对象（如资源点、建筑、宝箱等）的访问后触发，允许其他系统响应访问结束的情况，例如移除临时效果、处理后访问逻辑等。