# VCMI 文档生成任务跟踪器

此文件用于跟踪文档生成任务，避免重复生成已存在的文档。

## 跟踪规则
- 检查全局已完成文档列表（completed-docs-list.md）
- 确认待处理类是否已存在于完成列表中
- 只有确认未完成的情况下才可开始生成新文档
- 生成完成后立即同步更新完成列表

## 已完成任务
- CPropagatorNodeType [✓] 2026-01-17 06:13
- AccessibilityInfo [✓] 2026-01-17 06:15  
- DamageEstimation [✓] 2026-01-17 06:16
- BattleAttackInfo [✓] 2026-01-17 06:17
- CStackInstance [✓] 2026-01-17 06:20
- Metatype [✓] 2026-01-17 06:22
- Environment [✓] 2026-01-17 06:24

## 任务清单（按模块分类）

### 文件系统 (Filesystem)
- ResourcePath [✓] 2026-01-17 06:00

### 事件 (Events)
- EventBus [✓] 2026-01-17 06:00
- Event [✓] 2026-01-17 06:00
- EventSubscription [✓] 2026-01-17 06:00
- SubscriptionRegistry [✓] 2026-01-17 06:00

### 日志 (Logging)
- CLogger [✓] 2026-01-17 06:00
- CLoggerDomain [✓] 2026-01-17 06:00
- LogRecord [✓] 2026-01-17 06:00
- ILogTarget [✓] 2026-01-17 06:00
- CLogConsoleTarget [✓] 2026-01-17 06:00
- CLogFileTarget [✓] 2026-01-17 06:00
- CLogFormatter [✓] 2026-01-17 06:00
- CColorMapping [✓] 2026-01-17 06:00
- CLogManager [✓] 2026-01-17 06:00
- ELogLevel [✓] 2026-01-17 06:00
- EConsoleTextColor [✓] 2026-01-17 06:00

### JSON
- JsonNode [✓] 2026-01-17 06:00
- JsonType [✓] 2026-01-17 06:00
- JsonParsingSettings [✓] 2026-01-17 06:00

### 序列化 (Serializer)
- CSerializer [✓] 2026-01-17 06:00
- BinarySerializer [✓] 2026-01-17 06:00
- Serializeable [✓] 2026-01-17 06:00
- ESerializationVersion [✓] 2026-01-17 06:00
- JsonSerializer [✓] 2026-01-17 06:00
- JsonDeserializer [✓] 2026-01-17 06:00
- JsonTreeSerializer [✓] 2026-01-17 06:00
- JsonSerializeFormat [✓] 2026-01-17 06:00
- CMemorySerializer [✓] 2026-01-17 06:00
- CTypeList [✓] 2026-01-17 06:00
- RegisterTypes [✓] 2026-01-17 06:00

### 战斗 (Battle)
- CBattleInfoCallback [✓] 2026-01-17 06:00
- CUnitState [✓] 2026-01-17 06:00
- BattleInfo [✓] 2026-01-17 06:00
- Unit [✓] 2026-01-17 06:00
- DamageCalculator [✓] 2026-01-17 06:00
- BattleAction [✓] 2026-01-17 06:00
- CCasts [✓] 2026-01-17 06:00
- CShots [✓] 2026-01-17 06:00
- CHealth [✓] 2026-01-17 06:00
- CRetaliations [✓] 2026-01-17 06:00
- ESpellCastProblem [✓] 2026-01-17 06:00
- AttackableTiles [✓] 2026-01-17 06:00
- BattleClientInterfaceData [✓] 2026-01-17 06:00
- ForcedAction [✓] 2026-01-17 06:00
- AccessibilityInfo [✓] 2026-01-17 06:15
- DamageEstimation [✓] 2026-01-17 06:16
- BattleAttackInfo [✓] 2026-01-17 06:17
- CStackInstance [✓] 2026-01-17 06:20

### 实体 (Entities)
- CHero [✓] 2026-01-17 06:00
- CArtifact [✓] 2026-01-17 06:00
- CTown [✓] 2026-01-17 06:00
- Creature [✓] 2026-01-17 06:00
- CBuilding [✓] 2026-01-17 06:00
- CFaction [✓] 2026-01-17 06:00
- ResourceTypeHandler [✓] 2026-01-17 06:00
- CArtHandler [✓] 2026-01-17 06:00
- CArtifactInstance [✓] 2026-01-17 06:00
- CArtifactSet [✓] 2026-01-17 06:00
- ArtSlotInfo [✓] 2026-01-17 06:00
- Artifact [✓] 2026-01-17 06:00
- EntityWithBonuses [✓] 2026-01-17 06:00
- IConstBonusProvider [✓] 2026-01-17 06:00
- EntityT [✓] 2026-01-17 06:00
- Entity [✓] 2026-01-17 06:00
- ArtifactService [✓] 2026-01-17 06:00
- EntityServiceT [✓] 2026-01-17 06:00
- EntityService [✓] 2026-01-17 06:00
- ACreature [✓] 2026-01-17 06:00
- CreatureEntity [✓] 2026-01-17 06:00
- AFactionMember [✓] 2026-01-17 06:00
- CreatureService [✓] 2026-01-17 06:00
- HeroType [✓] 2026-01-17 06:00
- HeroTypeService [✓] 2026-01-17 06:00

### 地图对象 (Map Objects)
- CGObjectInstance [✓] 2026-01-17 06:00
- IHandlerBase [✓] 2026-01-17 06:00
- IObjectInterface [✓] 2026-01-17 16:15
- ObjectTemplate [✓] 2026-01-17 16:15
- CGHeroInstance [✓] 2026-01-17 16:15
- CGTownInstance [✓] 2026-01-17 16:15
- CGCreature [✓] 2026-01-17 16:15
- CGDwelling [✓] 2026-01-17 16:15
- CGMarket [✓] 2026-01-17 16:15
- CQuest [✓] 2026-01-17 16:15
- CGPandoraBox [✓] 2026-01-17 16:15
- CGResource [✓] 2026-01-17 16:15
- CRewardableObject [✓] 2026-01-17 16:15
- FlaggableMapObject [✓] 2026-01-17 16:15
- IMarket [✓] 2026-01-17 16:15
- IOwnableObject [✓] 2026-01-17 16:15
- MapObjects [✓] 2026-01-17 16:15
- MiscObjects [✓] 2026-01-17 16:15
- ObstacleSetHandler [✓] 2026-01-17 16:15
- TownBuildingInstance [✓] 2026-01-17 16:15
- CArmedInstance [✓] 2026-01-17 16:15
- CCreatureSet [✓] 2026-01-17 16:15
- CStackBasicDescriptor [✓] 2026-01-17 16:15
- CCommanderInstance [✓] 2026-01-17 16:15
- CSimpleArmy [✓] 2026-01-17 16:15
- CStackInstance [✓] 2026-01-17 16:15

### 游戏状态 (Game State)
- CGameState [✓] 2026-01-17 06:00
- IGameInfoCallback [✓] 2026-01-17 06:00

### 网络 (Network)
- INetworkConnection [✓] 2026-01-17 06:00
- NetworkConnection [✓] 2026-01-17 06:00
- NetworkContext [✓] 2026-01-17 06:00
- NetworkSocket [✓] 2026-01-17 06:00
- NetworkBuffer [✓] 2026-01-17 06:00
- NetworkTimer [✓] 2026-01-17 06:00
- NetworkAcceptor [✓] 2026-01-17 06:00
- INetworkHandler [✓] 2026-01-17 06:00
- INetworkClient [✓] 2026-01-17 06:00
- INetworkServer [✓] 2026-01-17 06:00
- INetworkConnectionListener [✓] 2026-01-17 06:00
- INetworkClientListener [✓] 2026-01-17 06:00
- INetworkServerListener [✓] 2026-01-17 06:00
- INetworkTimerListener [✓] 2026-01-17 06:00
- IInternalConnection [✓] 2026-01-17 06:00
- NetworkHandler [✓] 2026-01-17 06:00
- InternalConnection [✓] 2026-01-17 06:00
- NetworkServer [✓] 2026-01-17 06:00

### 网络包 (Network Packs)
- CPack [✓] 2026-01-17 06:00
- CPackForClient [✓] 2026-01-17 06:00
- CPackForServer [✓] 2026-01-17 06:00
- CPackForLobby [✓] 2026-01-17 06:00
- ICPackVisitor [✓] 2026-01-17 06:00
- PackageApplied [✓] 2026-01-17 06:00
- EndTurn [✓] 2026-01-17 06:00
- BattleStart [✓] 2026-01-17 06:00
- LobbyClientConnected [✓] 2026-01-17 06:00
- Query [✓] 2026-01-17 06:00

### 寻路 (Pathfinder)
- CGPathNode [✓] 2026-01-17 06:00
- CPathsInfo [✓] 2026-01-17 06:00
- CPathfinder [✓] 2026-01-17 06:00
- PathfinderConfig [✓] 2026-01-17 06:00
- TurnInfo [✓] 2026-01-17 06:00

### 法术 (Spells)
- ISpellMechanics [✓] 2026-01-17 06:00
- BattleCast [✓] 2026-01-17 06:00
- Mechanics [✓] 2026-01-17 06:00
- IBattleCast [✓] 2026-01-17 06:00
- CSpell [✓] 2026-01-17 06:00
- CSpellHandler [✓] 2026-01-17 06:00
- IAdventureSpellMechanics [✓] 2026-01-17 06:00
- AdventureSpellMechanics [✓] 2026-01-17 06:00
- IAdventureSpellEffect [✓] 2026-01-17 06:00
- TownPortalEffect [✓] 2026-01-17 06:00
- DimensionDoorEffect [✓] 2026-01-17 06:00
- AdventureSpellRangedEffect [✓] 2026-01-17 06:00
- ESpellCastResult [✓] 2026-01-17 06:00
- AnimationInfo [✓] 2026-01-17 06:00
- ProjectileInfo [✓] 2026-01-17 06:00
- AnimationItem [✓] 2026-01-17 06:00
- VerticalPosition [✓] 2026-01-17 06:00
- TargetInfo [✓] 2026-01-17 06:00
- LevelInfo [✓] 2026-01-17 06:00
- SpellCastEnvironment [✓] 2026-01-17 06:00
- AdventureSpellCastParameters [✓] 2026-01-17 06:00
- BaseMechanics [✓] 2026-01-17 06:00
- Caster [✓] 2026-01-17 06:00
- Mode [✓] 2026-01-17 06:00
- SpellSchool [✓] 2026-01-17 06:00
- SpellEffectValUptr [✓] 2026-01-17 06:00
- TargetFilter [✓] 2026-01-17 06:00
- TargetValidator [✓] 2026-01-17 06:00
- TargetApplier [✓] 2026-01-17 06:00
- TargetCalculator [✓] 2026-01-17 06:00
- TargetAggregator [✓] 2026-01-17 06:00
- TargetSelector [✓] 2026-01-17 06:00
- TargetTransformer [✓] 2026-01-17 06:00
- TargetCombiner [✓] 2026-01-17 06:00
- TargetSplitter [✓] 2026-01-17 06:00
- TargetMerger [✓] 2026-01-17 06:00

### 随机地图生成 (RMG)
- CRmgTemplate [✓] 2026-01-17 06:00
- CTreasureInfo [✓] 2026-01-17 06:00
- ZoneConnection [✓] 2026-01-17 06:00
- CTownInfo [✓] 2026-01-17 06:00
- CTownHints [✓] 2026-01-17 06:00
- ZoneOptions [✓] 2026-01-17 06:00
- ETemplateZoneType [✓] 2026-01-17 06:00
- EZoneLevel [✓] 2026-01-17 06:00
- EConnectionType [✓] 2026-01-17 06:00
- ERoadOption [✓] 2026-01-17 06:00
- TRmgTemplateZoneId [✓] 2026-01-17 06:00

### 奖励系统 (Bonuses)
- CBonusSystemNode [✓] 2026-01-17 06:00
- IBonusBearer [✓] 2026-01-17 06:00
- Bonus [✓] 2026-01-17 06:00
- CSelector [✓] 2026-01-17 06:00
- ILimiter [✓] 2026-01-17 06:00
- IPropagator [✓] 2026-01-17 06:00
- IUpdater [✓] 2026-01-17 06:00
- BonusValueType [✓] 2026-01-17 06:00
- BonusType [✓] 2026-01-17 06:00
- BonusStacking [✓] 2026-01-17 06:00
- CPropagatorNodeType [✓] 2026-01-17 06:13

### 模组 (Modding)
- CModHandler [✓] 2026-01-17 06:00
- ModDescription [✓] 2026-01-17 06:00
- CModVersion [✓] 2026-01-17 06:00
- ModManager [✓] 2026-01-17 06:00
- ContentTypeHandler [✓] 2026-01-17 06:00
- ModVerificationInfo [✓] 2026-01-17 06:00
- ModUtility [✓] 2026-01-17 06:00

### 技能 (Skills)
- Skill [✓] 2026-01-17 06:00

### 派系 (Factions)
- Faction [✓] 2026-01-17 06:00
- AFactionMember [✓] 2026-01-17 06:00
- INativeTerrainProvider [✓] 2026-01-17 06:00

### 服务 (Services)
- Services [✓] 2026-01-17 06:00

### 英雄 (Heroes)
- HeroClass [✓] 2026-01-17 06:00

### 玩家 (Players)
- Player [✓] 2026-01-17 06:00

### 资源 (Resources)
- ResourceType [✓] 2026-01-17 06:00

### 服务器 (Server)
- ServerCallback [✓] 2026-01-17 06:00

### 神器 (Artifacts)
- CChargedArtifact [✓] 2026-01-17 06:00
- CCombinedArtifact [✓] 2026-01-17 06:00
- CScrollArtifact [✓] 2026-01-17 06:00
- CGrowingArtifact [✓] 2026-01-17 06:00

### 脚本 (Scripting)
- Context [✓] 2026-01-17 06:00
- Script [✓] 2026-01-17 06:00
- Pool [✓] 2026-01-17 06:00
- Service [✓] 2026-01-17 06:00

### 标识符 (Identifiers)
- Metatype [✓] 2026-01-17 06:22
- BattleHexEDir [✓] 2026-01-17 06:00
- EWallPart [✓] 2026-01-17 06:00
- BattleSide [✓] 2026-01-17 06:00
- EActionType [✓] 2026-01-17 06:00

### 其他
- Artifact [✓] 2026-01-17 06:00
- Environment [✓] 2026-01-17 06:24

## 说明
所有已生成的文档都已标记为完成。根据扫描结果，当前没有未完成的文档需要生成。