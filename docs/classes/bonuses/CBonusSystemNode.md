# CBonusSystemNode类

CBonusSystemNode类是VCMI中奖励系统的核心节点类，用于处理游戏中各种奖励效果的传播和管理。

## 类定义

```cpp
using TNodes = std::set<CBonusSystemNode *>;
using TCNodes = std::set<const CBonusSystemNode *>;
using TNodesVector = std::vector<CBonusSystemNode *>;
using TCNodesVector = std::vector<const CBonusSystemNode *>;

class DLL_LINKAGE CBonusSystemNode : public virtual IBonusBearer, public virtual Serializeable, public boost::noncopyable
{
public:
    struct HashStringCompare {
        static size_t hash(const std::string& data)
        {
            std::hash<std::string> hasher;
            return hasher(data);
        }
        static bool equal(const std::string& x, const std::string& y)
        {
            return x == y;
        }
    };

private:
    /// 影响此节点的奖励列表，无论是本地的还是传播到此节点的
    BonusList bonuses;

    /// 来自此节点的奖励列表
    /// 还包括从此节点传播出去的节点，可能不影响此节点本身
    BonusList exportedBonuses;

    TCNodesVector parentsToInherit; // 我们从中继承奖励
    TNodesVector parentsToPropagate; // 我们可以将我们的奖励附加到它们上
    TNodesVector children;

    BonusNodeType nodeType;
    bool isHypotheticNode;

    mutable BonusList cachedBonuses;
    mutable int32_t cachedLast;
    std::atomic<int32_t> nodeChanged;

    void invalidateChildrenNodes(int32_t changeCounter);

    // 在获取任何奖励之前设置缓存字符串会将结果缓存以供后续请求使用
    // 此字符串需要是唯一的，这就是为什么它必须以下面的方式设置：
    // [属性键]_[值] => 仅用于选择器
    using RequestsMap = tbb::concurrent_hash_map<std::string, std::pair<int32_t, TBonusListPtr>, HashStringCompare>;
    mutable RequestsMap cachedRequests;
    mutable std::shared_mutex sync;

    void getAllBonusesRec(BonusList &out) const;
    TConstBonusListPtr getAllBonusesWithoutCaching(const CSelector &selector) const;
    std::shared_ptr<Bonus> getUpdatedBonus(const std::shared_ptr<Bonus> & b, const TUpdaterPtr & updater) const;
    void limitBonuses(const BonusList &allBonuses, BonusList &out) const; // out将填充不受限制的奖励

    void getRedParents(TCNodes &out) const;  //检索红色父节点列表（奖励传播的节点）
    void getRedAncestors(TCNodes &out) const;
    void getRedChildren(TNodes &out);

    void propagateBonus(const std::shared_ptr<Bonus> & b, const CBonusSystemNode & source);
    void unpropagateBonus(const std::shared_ptr<Bonus> & b);
    bool actsAsBonusSourceOnly() const;

    void newRedDescendant(CBonusSystemNode & descendant) const; //需要传播
    void removedRedDescendant(CBonusSystemNode & descendant) const; //需要取消传播

    std::string nodeShortInfo() const;

    void exportBonus(const std::shared_ptr<Bonus> & b);

protected:
    bool isIndependentNode() const; //当节点没有父节点也没有子节点时，它是独立的
    void exportBonuses();

public:
    explicit CBonusSystemNode(BonusNodeType nodeType, bool isHypotetic);
    explicit CBonusSystemNode(BonusNodeType nodeType);
    virtual ~CBonusSystemNode();

    TConstBonusListPtr getAllBonuses(const CSelector &selector, const std::string &cachingStr = "") const override;
    void getDirectParents(TCNodes &out) const;  //检索父节点列表（从中继承奖励的节点）

    /// 返回第一个匹配选择器的奖励
    std::shared_ptr<const Bonus> getFirstBonus(const CSelector & selector) const;

    /// 提供对来自此节点的第一个匹配选择器的奖励的写访问权限
    std::shared_ptr<Bonus> getLocalBonus(const CSelector & selector);

    void attachTo(CBonusSystemNode & parent);
    void attachToSource(const CBonusSystemNode & parent);
    void detachFrom(CBonusSystemNode & parent);
    void detachFromSource(const CBonusSystemNode & parent);
    void detachFromAll();
    virtual void addNewBonus(const std::shared_ptr<Bonus>& b);
    void accumulateBonus(const std::shared_ptr<Bonus>& b); //添加相同类型/子类型的奖励值或创建新奖励

    void removeBonus(const std::shared_ptr<Bonus>& b);
    void removeBonuses(const CSelector & selector);
    void removeBonusesRecursive(const CSelector & s);

    ///更新剩余回合数并删除过时的奖励
    void reduceBonusDurations(const CSelector &s);
    virtual std::string bonusToString(const std::shared_ptr<Bonus>& bonus) const {return "";}; //奖励描述或名称
    virtual std::string nodeName() const;
    bool isHypothetic() const { return isHypotheticNode; }

    BonusList & getExportedBonusList();
    const BonusList & getExportedBonusList() const;
    BonusNodeType getNodeType() const;
    const TCNodesVector & getParentNodes() const;

    void nodeHasChanged();

    int32_t getTreeVersion() const override;

    virtual PlayerColor getOwner() const
    {
        return PlayerColor::NEUTRAL;
    }

    template <typename Handler> void serialize(Handler &h)
    {
        h & nodeType;
        h & exportedBonuses;

        if(!h.saving && h.loadingGamestate)
            exportBonuses();
    }

    friend class CBonusProxy;
};
```

## 功能说明

CBonusSystemNode是VCMI奖励系统的核心组件，用于管理游戏中的各种奖励效果。它可以处理奖励的传播、缓存和管理，支持复杂的奖励系统，如英雄能力、神器效果、地形奖励等。该节点可以作为奖励的来源或接收者，并能够处理奖励的继承和传播。

## 依赖关系

- [IBonusBearer](./IBonusBearer.md): 奖励承载者接口
- [Serializeable](../serializer/Serializeable.md): 可序列化接口
- [BonusList](./BonusList.md): 奖励列表
- [Bonus](./Bonus.md): 奖励类
- [CSelector](./CSelector.md): 奖励选择器
- boost::noncopyable: 防拷贝基类
- tbb::concurrent_hash_map: 并发哈希映射
- STL库: set, vector, atomic, shared_mutex等

## 函数注释

- `CBonusSystemNode(nodeType, isHypotetic)`: 构造函数，创建具有指定类型和假想状态的奖励系统节点
- `CBonusSystemNode(nodeType)`: 构造函数，创建具有指定类型的奖励系统节点
- `~CBonusSystemNode()`: 析构函数，清理奖励系统节点资源
- `getAllBonuses(selector, cachingStr)`: 获取所有匹配选择器的奖励，可选地使用缓存
- `getFirstBonus(selector)`: 获取第一个匹配选择器的奖励
- `getLocalBonus(selector)`: 获取本地匹配选择器的奖励并提供写访问
- `attachTo(parent)`: 将此节点附加到父节点
- `attachToSource(parent)`: 将此节点附加到源父节点
- `detachFrom(parent)`: 从此节点分离父节点
- `addNewBonus(b)`: 添加新的奖励到节点
- `accumulateBonus(b)`: 累积奖励值或创建新奖励
- `removeBonus(b)`: 从此节点移除奖励
- `removeBonuses(selector)`: 移除匹配选择器的所有奖励
- `reduceBonusDurations(s)`: 更新剩余回合数并删除过时的奖励
- `bonusToString(bonus)`: 将奖励转换为字符串表示
- `nodeName()`: 获取节点名称
- `isHypothetic()`: 检查节点是否为假想节点
- `getNodeType()`: 获取节点类型
- `nodeHasChanged()`: 标记节点已更改
- `getTreeVersion()`: 获取树版本号
- `getOwner()`: 获取节点拥有者
