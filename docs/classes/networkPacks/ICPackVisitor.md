# ICPackVisitor类

ICPackVisitor类是VCMI中网络包访问者接口，用于处理不同类型的网络包。

## 类定义

```cpp
class ICPackVisitor
{
public:
    virtual bool callTyped() { return true; }

    virtual void visitForLobby(CPackForLobby & pack) {}
    virtual void visitForServer(CPackForServer & pack) {}
    virtual void visitForClient(CPackForClient & pack) {}
    virtual void visitPackageApplied(PackageApplied & pack) {}
    virtual void visitPackageReceived(PackageReceived & pack) {}
    virtual void visitSystemMessage(SystemMessage & pack) {}
    virtual void visitPlayerBlocked(PlayerBlocked & pack) {}
    virtual void visitPlayerCheated(PlayerCheated & pack) {}
    virtual void visitPlayerStartsTurn(PlayerStartsTurn & pack) {}
    virtual void visitDaysWithoutTown(DaysWithoutTown & pack) {}
    virtual void visitTurnTimeUpdate(TurnTimeUpdate & pack) {}
    virtual void visitGamePause(GamePause & pack) {}
    virtual void visitEntitiesChanged(EntitiesChanged & pack) {}
    virtual void visitSetRewardableConfiguration(SetRewardableConfiguration & pack) {}
    virtual void visitSetResources(SetResources & pack) {}
    virtual void visitSetPrimarySkill(SetPrimarySkill & pack) {}
    virtual void visitSetHeroExperience(SetHeroExperience & pack) {}
    virtual void visitGiveStackExperience(GiveStackExperience & pack) {}
    virtual void visitSetSecSkill(SetSecSkill & pack) {}
    virtual void visitHeroVisitCastle(HeroVisitCastle & pack) {}
    virtual void visitChangeSpells(ChangeSpells & pack) {}
    virtual void visitSetResearchedSpells(SetResearchedSpells & pack) {}
    virtual void visitSetMana(SetMana & pack) {}
    virtual void visitSetMovePoints(SetMovePoints & pack) {}
    virtual void visitFoWChange(FoWChange & pack) {}
    virtual void visitSetAvailableHero(SetAvailableHero & pack) {}
    virtual void visitGiveBonus(GiveBonus & pack) {}
    virtual void visitChangeObjPos(ChangeObjPos & pack) {}
    virtual void visitPlayerEndsTurn(PlayerEndsTurn & pack) {};
    virtual void visitPlayerEndsGame(PlayerEndsGame & pack) {}
    virtual void visitRemoveBonus(RemoveBonus & pack) {}
    virtual void visitSetCommanderProperty(SetCommanderProperty & pack) {}
    virtual void visitAddQuest(AddQuest & pack) {}
    virtual void visitChangeFormation(ChangeFormation & pack) {}
    virtual void visitChangeTownName(ChangeTownName & pack) {}
    virtual void visitRemoveObject(RemoveObject & pack) {}
    virtual void visitTryMoveHero(TryMoveHero & pack) {}
    virtual void visitNewStructures(NewStructures & pack) {}
    virtual void visitRazeStructures(RazeStructures & pack) {}
    virtual void visitSetAvailableCreatures(SetAvailableCreatures & pack) {}
    virtual void visitSetHeroesInTown(SetHeroesInTown & pack) {}
    virtual void visitHeroRecruited(HeroRecruited & pack) {}
    virtual void visitGiveHero(GiveHero & pack) {}
    virtual void visitCatapultAttack(CatapultAttack & pack) {}
    virtual void visitOpenWindow(OpenWindow & pack) {}
    virtual void visitNewObject(NewObject & pack) {}
    virtual void visitSetAvailableArtifacts(SetAvailableArtifacts & pack) {}
    virtual void visitNewArtifact(NewArtifact & pack) {}
    virtual void visitChangeStackCount(ChangeStackCount & pack) {}
    virtual void visitSetStackType(SetStackType & pack) {}
    virtual void visitEraseStack(EraseStack & pack) {}
    virtual void visitSwapStacks(SwapStacks & pack) {}
    virtual void visitInsertNewStack(InsertNewStack & pack) {}
    virtual void visitRebalanceStacks(RebalanceStacks & pack) {}
    virtual void visitBulkRebalanceStacks(BulkRebalanceStacks & pack) {}
    virtual void visitGrowUpArtifact(GrowUpArtifact & pack) {}
    virtual void visitPutArtifact(PutArtifact & pack) {}
    virtual void visitBulkEraseArtifacts(BulkEraseArtifacts & pack) {}
    virtual void visitBulkMoveArtifacts(BulkMoveArtifacts & pack) {}
    virtual void visitDischargeArtifact(DischargeArtifact & pack) {}
    virtual void visitAssembledArtifact(AssembledArtifact & pack) {}
    virtual void visitDisassembledArtifact(DisassembledArtifact & pack) {}
    virtual void visitHeroVisit(HeroVisit & pack) {}
    virtual void visitNewTurn(NewTurn & pack) {}
    virtual void visitInfoWindow(InfoWindow & pack) {}
    virtual void visitSetObjectProperty(SetObjectProperty & pack) {}
    virtual void visitChangeObjectVisitors(ChangeObjectVisitors & pack) {}
    virtual void visitChangeArtifactsCostume(ChangeArtifactsCostume & pack) {}
    virtual void visitHeroLevelUp(HeroLevelUp & pack) {}
    virtual void visitCommanderLevelUp(CommanderLevelUp & pack) {}
    virtual void visitBlockingDialog(BlockingDialog & pack) {}
    virtual void visitGarrisonDialog(GarrisonDialog & pack) {}
    virtual void visitExchangeDialog(ExchangeDialog & pack) {}
    virtual void visitTeleportDialog(TeleportDialog & pack) {}
    virtual void visitMapObjectSelectDialog(MapObjectSelectDialog & pack) {}
    virtual void visitBattleStart(BattleStart & pack) {}
    virtual void visitBattleNextRound(BattleNextRound & pack) {}
    virtual void visitBattleSetActiveStack(BattleSetActiveStack & pack) {}
    virtual void visitBattleResult(BattleResult & pack) {}
    virtual void visitBattleLogMessage(BattleLogMessage & pack) {}
    virtual void visitBattleStackMoved(BattleStackMoved & pack) {}
    virtual void visitBattleUnitsChanged(BattleUnitsChanged & pack) {}
    virtual void visitBattleAttack(BattleAttack & pack) {}
    virtual void visitStartAction(StartAction & pack) {}
    virtual void visitEndAction(EndAction & pack) {}
    virtual void visitBattleSpellCast(BattleSpellCast & pack) {}
    virtual void visitSetStackEffect(SetStackEffect & pack) {}
    virtual void visitStacksInjured(StacksInjured & pack) {}
    virtual void visitBattleResultsApplied(BattleResultsApplied & pack) {}
    virtual void visitBattleEnded(BattleEnded & pack) {}
    virtual void visitBattleObstaclesChanged(BattleObstaclesChanged & pack) {}
    virtual void visitBattleSetStackProperty(BattleSetStackProperty & pack) {}
    virtual void visitBattleTriggerEffect(BattleTriggerEffect & pack) {}
    virtual void visitBattleUpdateGateState(BattleUpdateGateState & pack) {}
    virtual void visitAdvmapSpellCast(AdvmapSpellCast & pack) {}
    virtual void visitShowWorldViewEx(ShowWorldViewEx & pack) {}
    virtual void visitEndTurn(EndTurn & pack) {}
    virtual void visitDismissHero(DismissHero & pack) {}
    virtual void visitMoveHero(MoveHero & pack) {}
    virtual void visitCastleTeleportHero(CastleTeleportHero & pack) {}
    virtual void visitArrangeStacks(ArrangeStacks & pack) {}
    virtual void visitBulkMoveArmy(BulkMoveArmy & pack) {}
    virtual void visitBulkSplitStack(BulkSplitStack & pack) {}
    virtual void visitBulkMergeStacks(BulkMergeStacks & pack) {}
    virtual void visitBulkSplitAndRebalanceStack(BulkSplitAndRebalanceStack & pack) {}
    virtual void visitDisbandCreature(DisbandCreature & pack) {}
    virtual void visitBuildStructure(BuildStructure & pack) {}
    virtual void visitVisitTownBuilding(VisitTownBuilding & pack) {}
    virtual void visitRazeStructure(RazeStructure & pack) {}
    virtual void visitSpellResearch(SpellResearch & pack) {}
    virtual void visitRecruitCreatures(RecruitCreatures & pack) {}
    virtual void visitUpgradeCreature(UpgradeCreature & pack) {}
    virtual void visitGarrisonHeroSwap(GarrisonHeroSwap & pack) {}
    virtual void visitExchangeArtifacts(ExchangeArtifacts & pack) {}
    virtual void visitBulkExchangeArtifacts(BulkExchangeArtifacts & pack) {}
    virtual void visitManageBackpackArtifacts(ManageBackpackArtifacts & pack) {}
    virtual void visitManageEquippedArtifacts(ManageEquippedArtifacts & pack) {}
    virtual void visitAssembleArtifacts(AssembleArtifacts & pack) {}
    virtual void visitEraseArtifactByClient(EraseArtifactByClient & pack) {}
    virtual void visitBuyArtifact(BuyArtifact & pack) {}
    virtual void visitTradeOnMarketplace(TradeOnMarketplace & pack) {}
    virtual void visitSetFormation(SetFormation & pack) {}
    virtual void visitSetTownName(SetTownName & pack) {}
    virtual void visitHireHero(HireHero & pack) {}
    virtual void visitBuildBoat(BuildBoat & pack) {}
    virtual void visitQueryReply(QueryReply & pack) {}
    virtual void visitMakeAction(MakeAction & pack) {}
    virtual void visitDigWithHero(DigWithHero & pack) {}
    virtual void visitCastAdvSpell(CastAdvSpell & pack) {}
    virtual void visitRequestStatistic(RequestStatistic & pack) {}
    virtual void visitSaveGame(SaveGame & pack) {}
    virtual void visitPlayerMessage(PlayerMessage & pack) {}
    virtual void visitPlayerMessageClient(PlayerMessageClient & pack) {}
    virtual void visitCenterView(CenterView & pack) {}
    virtual	void visitLobbyQuickLoadGame(LobbyQuickLoadGame & pack) {}
    virtual void visitLobbyClientConnected(LobbyClientConnected & pack) {}
    virtual void visitLobbyClientDisconnected(LobbyClientDisconnected & pack) {}
    virtual void visitLobbyChatMessage(LobbyChatMessage & pack) {}
    virtual void visitLobbyGuiAction(LobbyGuiAction & pack) {}
    virtual void visitLobbyLoadProgress(LobbyLoadProgress & pack) {}
    virtual void visitLobbyRestartGame(LobbyRestartGame & pack) {}
    virtual void visitLobbyPrepareStartGame(LobbyPrepareStartGame & pack) {}
    virtual void visitLobbyStartGame(LobbyStartGame & pack) {}
    virtual void visitLobbyChangeHost(LobbyChangeHost & pack) {}
    virtual void visitLobbyUpdateState(LobbyUpdateState & pack) {}
    virtual void visitLobbySetMap(LobbySetMap & pack) {}
    virtual void visitLobbySetCampaign(LobbySetCampaign & pack) {}
    virtual void visitLobbySetCampaignMap(LobbySetCampaignMap & pack) {}
    virtual void visitLobbySetCampaignBonus(LobbySetCampaignBonus & pack) {}
    virtual void visitLobbySetBattleOnlyModeStartInfo(LobbySetBattleOnlyModeStartInfo & pack) {}
    virtual void visitLobbyChangePlayerOption(LobbyChangePlayerOption & pack) {}
    virtual void visitLobbySetPlayer(LobbySetPlayer & pack) {}
    virtual void visitLobbySetPlayerName(LobbySetPlayerName & pack) {}
    virtual void visitLobbySetPlayerHandicap(LobbySetPlayerHandicap & pack) {}
    virtual void visitLobbySetSimturns(LobbySetSimturns & pack) {}
    virtual void visitLobbySetTurnTime(LobbySetTurnTime & pack) {}
    virtual void visitLobbySetExtraOptions(LobbySetExtraOptions & pack) {}
    virtual void visitLobbySetDifficulty(LobbySetDifficulty & pack) {}
    virtual void visitLobbyForceSetPlayer(LobbyForceSetPlayer & pack) {}
    virtual void visitLobbyShowMessage(LobbyShowMessage & pack) {}
    virtual void visitLobbyPvPAction(LobbyPvPAction & pack) {}
    virtual void visitLobbyDelete(LobbyDelete & pack) {}
    virtual void visitSaveLocalState(SaveLocalState & pack) {}
    virtual void visitBattleCancelled(BattleCancelled & pack) {}
    virtual void visitBattleResultAccepted(BattleResultAccepted & pack) {}
    virtual void visitBattleStackMoved(BattleLogMessage & pack) {}
    virtual void visitResponseStatistic(ResponseStatistic & pack) {}
};
```

## 功能说明

ICPackVisitor是VCMI网络包系统中的访问者接口，实现了访问者设计模式。它允许对网络包层次结构中的不同类型的网络包执行操作，而无需修改网络包类本身。该接口为每种类型的网络包提供了专门的访问方法。

## 依赖关系

- [CPackForLobby](./CPackForLobby.md): 大厅网络包基类
- [CPackForServer](./CPackForServer.md): 服务器网络包基类
- [CPackForClient](./CPackForClient.md): 客户端网络包基类
- 以及其他大量的具体网络包类型

## 函数注释

- `callTyped()`: 虚函数，决定是否调用特定类型的访问方法，默认返回true
- `visitForLobby(pack)`: 访问大厅网络包
- `visitForServer(pack)`: 访问服务器网络包
- `visitForClient(pack)`: 访问客户端网络包
- 以及其他针对特定网络包类型的访问方法，如:
  - `visitPlayerStartsTurn(pack)`: 访问玩家开始回合网络包
  - `visitBattleStart(pack)`: 访问战斗开始网络包
  - `visitInfoWindow(pack)`: 访问信息窗口网络包
  - `visitQueryReply(pack)`: 访问查询回复网络包
  - 等等...