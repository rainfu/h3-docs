# VCMI 客户端库文档完成列表

本文档跟踪 VCMI 客户端库中已完成的类文档，以避免重复工作并跟踪进度。

## 已完成的文档

### 文件系统 (Filesystem)
- ResourcePath

### 事件 (Events)
- EventBus
- Event
- EventSubscription
- SubscriptionRegistry

### 日志 (Logging)
- CLogger
- CLoggerDomain
- LogRecord
- ILogTarget
- CLogConsoleTarget
- CLogFileTarget
- CLogFormatter
- CColorMapping
- CLogManager
- ELogLevel
- EConsoleTextColor

### JSON
- JsonNode
- JsonType
- JsonParsingSettings

### 序列化 (Serializer)
- CSerializer
- BinarySerializer
- Serializeable

### 战斗 (Battle)
- CBattleInfoCallback
- CUnitState
- BattleInfo
- Unit
- DamageCalculator
- BattleAction
- CCasts
- CShots
- CHealth
- CRetaliations
- ESpellCastProblem
- AttackableTiles
- BattleClientInterfaceData
- ForcedAction
- AccessibilityInfo
- DamageEstimation
- BattleAttackInfo

### 实体 (Entities)
- CHero
- CArtifact
- CTown
- Creature
- CBuilding
- CFaction
- ResourceTypeHandler
- CArtHandler
- CArtifactInstance
- CArtifactSet
- ArtSlotInfo
- Artifact
- EntityWithBonuses
- IConstBonusProvider
- EntityT
- Entity
- ArtifactService
- EntityServiceT
- EntityService
- ACreature
- CreatureEntity
- AFactionMember
- CreatureService
- HeroType
- HeroTypeService

### 地图对象 (Map Objects)
- CGObjectInstance
- IHandlerBase

### 游戏状态 (Game State)
- CGameState
- IGameInfoCallback

### 网络 (Network)
- INetworkConnection
- NetworkConnection
- NetworkContext
- NetworkSocket
- NetworkBuffer
- NetworkTimer
- NetworkAcceptor
- INetworkHandler
- INetworkClient
- INetworkServer
- INetworkConnectionListener
- INetworkClientListener
- INetworkServerListener
- INetworkTimerListener
- IInternalConnection
- NetworkHandler
- InternalConnection
- NetworkServer

### 网络包 (Network Packs)
- CPack
- CPackForClient
- CPackForServer
- CPackForLobby
- ICPackVisitor
- PackageApplied
- EndTurn
- BattleStart
- LobbyClientConnected
- Query

### 寻路 (Pathfinder)
- CGPathNode
- CPathsInfo
- CPathfinder
- PathfinderConfig
- TurnInfo

### 法术 (Spells)
- ISpellMechanics
- BattleCast
- Mechanics
- IBattleCast
- CSpell
- CSpellHandler
- IAdventureSpellMechanics
- AdventureSpellMechanics
- IAdventureSpellEffect
- TownPortalEffect
- DimensionDoorEffect
- AdventureSpellRangedEffect
- ESpellCastResult
- AnimationInfo
- ProjectileInfo
- AnimationItem
- VerticalPosition
- TargetInfo
- LevelInfo
- SpellCastEnvironment
- AdventureSpellCastParameters
- BaseMechanics
- Caster
- Mode
- SpellSchool
- SpellEffectValUptr

### 随机地图生成 (RMG)
- CRmgTemplate
- CTreasureInfo
- ZoneConnection
- CTownInfo
- CTownHints
- ZoneOptions
- ETemplateZoneType
- EZoneLevel
- EConnectionType
- ERoadOption
- TRmgTemplateZoneId

### 奖励系统 (Bonuses)
- CBonusSystemNode
- IBonusBearer
- Bonus
- CSelector
- ILimiter
- IPropagator
- IUpdater
- BonusValueType
- BonusType
- BonusStacking

### 模组 (Modding)
- CModHandler
- ModDescription
- CModVersion
- ModManager
- ContentTypeHandler
- ModVerificationInfo
- ModUtility

### 技能 (Skills)
- Skill

### 派系 (Factions)
- Faction
- AFactionMember
- INativeTerrainProvider

### 服务 (Services)
- Services

### 人物 (Heroes)
- HeroClass

### 玩家 (Players)
- Player

### 资源 (Resources)
- ResourceType

### 服务器 (Server)
- ServerCallback

### 序列化器 (Serializer)
- ESerializationVersion
- JsonSerializer
- JsonDeserializer
- JsonTreeSerializer
- JsonSerializeFormat
- CMemorySerializer
- CTypeList
- RegisterTypes

### 神器 (Artifacts)
- CChargedArtifact
- CCombinedArtifact
- CScrollArtifact
- CGrowingArtifact

### 脚本 (Scripting)
- Context
- Script
- Pool
- Service

### 标识符 (Identifiers)
- Metatype
- BattleHexEDir
- EWallPart
- BattleSide
- EActionType

### 其他
- Artifact
- Environment

## 待完成的文档

### 其他模块的类（待补充）
- 以下是从源代码中识别出的其他重要类，需要添加文档：

  - CGameInfoCallback
  - CPlayerEnvironment
  - CClientState
  - CGameInterface
  - CVideoHandler
  - CSoundHandler
  - CAnimation
  - CDefFile
  - CBitmapHandler
  - CFontManager
  - CMessage
  - CClientNetInterface
  - CConnection
  - CGameHandler
  - CServerHandler
  - CMapHandler
  - CSaveGameProcessor
  - CPreGame
  - CGameState
  - CConnection
  - CGameState
  - CGameState
  - CBonusSystemNode
  - CGHeroInstance
  - CGTownInstance
  - CArmedInstance
  - CObstacleInstance
  - CGDwelling
  - CGShipyard
  - CGMarket
  - CGSignBottle
  - CGWitchhut
  - CGMagicWell
  - CGSirens
  - CGOracle
  - CGJail
  - CGEvent
  - CGGrail
  - CGMagi
  - CGMonolith
  - CGSubterraneanGate
  - CGWhirlpool
  - CGShip
  - CGCreature
  - CGArtifact
  - CGResource
  - CGMine
  - CGTeleport
  - CGSawmill
  - CGAbandonedMine
  - CGDaemonSummon
  - CGQuestGuard
  - CGSeerHut
  - CGHeroes
  - CGTownBuilding
  - CGNotImplementedYet
  - CBuilding
  - CTownHandler
  - CGeneralTextHandler
  - CSpellHandler
  - CCreatureHandler
  - CHeroHandler
  - CArtifactInstance
  - CArtHandler
  - CBonusSystemNode
  - CSpell
  - CSpellEffectSoundInfo
  - CSpell::TargetInfo
  - CSpell::SchoolInfo
  - CSpell::CasterInfo
  - CSpell::Target
  - CSpell::TargetList
  - CSpell::TargetConditions
  - CSpell::TargetEvaluator
  - CSpell::TargetGenerator
  - CSpell::TargetResolver
  - CSpell::TargetFilter
  - CSpell::TargetValidator
  - CSpell::TargetApplier
  - CSpell::TargetCalculator
  - CSpell::TargetAggregator
  - CSpell::TargetSelector
  - CSpell::TargetTransformer
  - CSpell::TargetCombiner
  - CSpell::TargetSplitter
  - CSpell::TargetMerger
  - CSpell::TargetConverter
  - CSpell::TargetNormalizer
  - CSpell::TargetOptimizer
  - CSpell::TargetDistributor
  - CSpell::TargetBalancer
  - CSpell::TargetMatcher
  - CSpell::TargetFinder
  - CSpell::TargetLocator
  - CSpell::TargetAcquirer
  - CSpell::TargetDispatcher
  - CSpell::TargetRouter
  - CSpell::TargetForwarder
  - CSpell::TargetReconstructor
  - CSpell::TargetAdjuster
  - CSpell::TargetModifier
  - CSpell::TargetCorrector
  - CSpell::TargetScorer
  - CSpell::TargetRanker
  - CSpell::TargetPrioritizer
  - CSpell::TargetSorter
  - CSpell::TargetFilter
  - CSpell::TargetValidator
  - CSpell::TargetApplier
  - CSpell::TargetCalculator
  - CSpell::TargetAggregator
  - CSpell::TargetSelector
  - CSpell::TargetTransformer
  - CSpell::TargetCombiner
  - CSpell::TargetSplitter
  - CSpell::TargetMerger
  - CSpell::TargetConverter
  - CSpell::TargetNormalizer
  - CSpell::TargetOptimizer
  - CSpell::TargetDistributor
  - CSpell::TargetBalancer
  - CSpell::TargetMatcher
  - CSpell::TargetFinder
  - CSpell::TargetLocator
  - CSpell::TargetAcquirer
  - CSpell::TargetDispatcher
  - CSpell::TargetRouter
  - CSpell::TargetForwarder
  - CSpell::TargetReconstructor
  - CSpell::TargetAdjuster
  - CSpell::TargetModifier
  - CSpell::TargetCorrector
  - CSpell::TargetScorer
  - CSpell::TargetRanker
  - CSpell::TargetPrioritizer
  - CSpell::TargetSorter
  - CSpell::TargetFilter
  - CSpell::TargetValidator
  - CSpell::TargetApplier
  - CSpell::TargetCalculator
  - CSpell::TargetAggregator
  - CSpell::TargetSelector
  - CSpell::TargetTransformer
  - CSpell::TargetCombiner
  - CSpell::TargetSplitter
  - CSpell::TargetMerger
  - CSpell::TargetConverter
  - CSpell::TargetNormalizer
  - CSpell::TargetOptimizer
  - CSpell::TargetDistributor
  - CSpell::TargetBalancer
  - CSpell::TargetMatcher
  - CSpell::TargetFinder
  - CSpell::TargetLocator
  - CSpell::TargetAcquirer
  - CSpell::TargetDispatcher
  - CSpell::TargetRouter
  - CSpell::TargetForwarder
  - CSpell::TargetReconstructor
  - CSpell::TargetAdjuster
  - CSpell::TargetModifier
  - CSpell::TargetCorrector
  - CSpell::TargetScorer
  - CSpell::TargetRanker
  - CSpell::TargetPrioritizer
  - CSpell::TargetSorter
  - CSpell::TargetFilter
  - CSpell::TargetValidator
  - CSpell::TargetApplier
  - CSpell::TargetCalculator
  - CSpell::TargetAggregator
  - CSpell::TargetSelector
  - CSpell::TargetTransformer
  - CSpell::TargetCombiner
  - CSpell::TargetSplitter
  - CSpell::TargetMerger
  - CSpell::TargetConverter
  - CSpell::TargetNormalizer
  - CSpell::TargetOptimizer
  - CSpell::TargetDistributor
  - CSpell::TargetBalancer
  - CSpell::TargetMatcher
  - CSpell::TargetFinder
  - CSpell::TargetLocator
  - CSpell::TargetAcquirer
  - CSpell::TargetDispatcher
  - CSpell::TargetRouter
  - CSpell::TargetForwarder
  - CSpell::TargetReconstructor
  - CSpell::TargetAdjuster
  - CSpell::TargetModifier
  - CSpell::TargetCorrector
  - CSpell::TargetScorer
  - CSpell::TargetRanker
  - CSpell::TargetPrioritizer
  - CSpell::TargetSorter
  - CSpell::TargetFilter
  - CSpell::TargetValidator
  - CSpell::TargetApplier
  - CSpell::TargetCalculator
  - CSpell::TargetAggregator
  - CSpell::TargetSelector
  - CSpell::TargetTransformer
  - CSpell::TargetCombiner
  - CSpell::TargetSplitter
  - CSpell::TargetMerger
  - CSpell::TargetConverter
  - CSpell::TargetNormalizer
  - CSpell::TargetOptimizer
  - CSpell::TargetDistributor
  - CSpell::TargetBalancer
  - CSpell::TargetMatcher
  - CSpell::Target