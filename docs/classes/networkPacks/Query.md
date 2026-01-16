# Query类

Query类是VCMI中网络查询的基类，用于表示需要响应的查询请求。

## 类定义

```cpp
struct Query : public CPackForClient
{
    QueryID queryID; // 如果不是实际查询（不需要应答），则等于-1
};
```

## 功能说明

Query是VCMI网络包系统中表示查询请求的基类，继承自CPackForClient。它包含一个查询ID，用于标识特定的查询请求。当queryID为-1时，表示这不是一个实际的查询，不需要应答。这类网络包通常用于处理需要玩家响应的情况，如选择、确认等。

## 依赖关系

- [CPackForClient](./CPackForClient.md): 客户端网络包基类
- [QueryID](../queries/QueryID.md): 查询ID类型

## 成员变量说明

- `queryID`: 查询的唯一标识符，用于关联请求和响应；若等于-1，则表示不需要应答