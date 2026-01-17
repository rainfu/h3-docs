# VCMI 客户端库已完成文档列表

此文件记录了已经生成文档的 VCMI 客户端库头文件。

## 按模块分类

### 文件系统 (Filesystem)
- ResourcePath
- Filesystem
- CInputStream
- COutputStream
- ISimpleResourceLoader

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
- ESerializationVersion
- JsonSerializer
- JsonDeserializer
- JsonTreeSerializer
- JsonSerializeFormat
- CMemorySerializer
- CTypeList
- RegisterTypes
### 文本 (Texts)
- CGeneralTextHandler
- MetaString
- Languages
- TextIdentifier
- TextLocalizationContainer
- TextOperations
- CLegacyConfigParser
### 回调 (Callback)
- CAdventureAI
- CBattleCallback
- CBattleGameInterface
- CCallback
- CDynLibHandler
- CGameInfoCallback
- CGameInterface
- CGlobalAI
- CNonConstInfoCallback
- CPlayerSpecificInfoCallback
- EditorCallback
- GameCallbackHolder

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
- CStackInstance
- AutocombatPreferences
- BattleHex
- BattleHexArray
- BattleLayout
- BattleProxy
- BattleStateInfoForRetreat
- BattleUnitTurnReason
- CBattleInfoEssentials
- CObstacleInstance
- CPlayerBattleCallback
- Destination
- IBattleInfoCallback
- IBattleState
- IUnitInfo
- PossiblePlayerBattleAction
- ReachabilityInfo
- SiegeInfo
- SideInBattle

### 实体 (Entities)
- CArtifact
- CArtifactInstance
- CArtifactSet
- ArtSlotInfo
- CBuilding
- CFaction
- CHero
- Creature
- ResourceTypeHandler
- CArtHandler
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
- IObjectInterface
- ObjectTemplate
- CGHeroInstance
- CGTownInstance
- CGCreature
- CGDwelling
- CGMarket
- CQuest
- CGPandoraBox
- CGResource
- CRewardableObject
- FlaggableMapObject
- IMarket
- IOwnableObject
- MapObjects
- MiscObjects
- ObstacleSetHandler
- TownBuildingInstance
- CArmedInstance
- CCreatureSet
- CStackBasicDescriptor
- CCommanderInstance
- CSimpleArmy
- CStackInstance

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
- NetworkInterface

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
- TargetFilter
- TargetValidator
- TargetApplier
- TargetCalculator
- TargetAggregator
- TargetSelector
- TargetTransformer
- TargetCombiner
- TargetSplitter
- TargetMerger

### 效果 (Effects)
- Effect
- UnitEffect
- LocationEffect
- Damage
- Heal
- Summon
- Teleport
- Clone
- Dispel
- Catapult
- DemonSummon
- Moat
- Obstacle
- RemoveObstacle
- Sacrifice
- Registry
- Effects
- EffectsFwd

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
- Bonus
- CBonusSystemNode
- IBonusBearer
- CSelector
- ILimiter
- IPropagator
- IUpdater
- BonusValueType
- BonusType
- BonusStacking
- CPropagatorNodeType
- BonusCache
- BonusCustomTypes
- BonusEnum
- BonusSelector
- Limiters
- Propagators
- Updaters

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

### 英雄 (Heroes)
- HeroClass

### 玩家 (Players)
- Player

### 资源 (Resources)
- ResourceType

### 服务器 (Server)
- ServerCallback

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

### 回调 (Callback)
- CAdventureAI
- CBattleCallback
- CBattleGameInterface
- CCallback
- CDynLibHandler
- CGameInterface
- CGlobalAI
- CNonConstInfoCallback
- CPlayerSpecificInfoCallback

### 其他模块的类（待补充）
- 以下是从源代码中识别出的其他重要类，需要添加文档：

  - CGameInfoCallback
  - CPlayerEnvironment
  - CClientState
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
  - CGHeroInstance
  - CGTownInstance
  - CArmedInstance
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
  - CCreatureHandler
  - CHeroHandler
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
  - CSpell::Target
