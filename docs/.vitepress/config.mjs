import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/h3/',
  title: 'VCMI Lib 文档',
  description: 'VCMI 客户端核心库 API 文档',
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '模块概览', link: '/modules-overview' },
      { text: '类帮助', link: '/classes/' },
      { text: '依赖关系', link: '/dependencies/' }
    ],

    sidebar: {
      '/classes/': [
        {
          text: '战斗系统 (battle/)',
          items: [
            { text: 'BattleInfo', link: '/classes/battle/BattleInfo' },
            { text: 'Unit', link: '/classes/battle/Unit' },
            { text: 'DamageCalculator', link: '/classes/battle/DamageCalculator' },
            { text: 'BattleAction', link: '/classes/battle/BattleAction' },
            { text: 'CUnitState', link: '/classes/battle/CUnitState' },
            { text: 'CBattleInfoCallback', link: '/classes/battle/CBattleInfoCallback' },
            { text: 'CCasts', link: '/classes/battle/CCasts' },
            { text: 'CShots', link: '/classes/battle/CShots' },
            { text: 'CHealth', link: '/classes/battle/CHealth' },
            { text: 'CRetaliations', link: '/classes/battle/CRetaliations' },
            { text: 'ESpellCastProblem', link: '/classes/battle/ESpellCastProblem' },
            { text: 'AttackableTiles', link: '/classes/battle/AttackableTiles' },
            { text: 'BattleClientInterfaceData', link: '/classes/battle/BattleClientInterfaceData' },
            { text: 'ForcedAction', link: '/classes/battle/ForcedAction' },
            { text: 'AccessibilityInfo', link: '/classes/battle/AccessibilityInfo' },
            { text: 'DamageEstimation', link: '/classes/battle/DamageEstimation' },
            { text: 'BattleAttackInfo', link: '/classes/battle/BattleAttackInfo' },
            { text: 'CStackInstance', link: '/classes/battle/CStackInstance' },
            { text: 'AutocombatPreferences', link: '/classes/battle/AutocombatPreferences' },
            { text: 'BattleHex', link: '/classes/battle/BattleHex' },
            { text: 'BattleHexArray', link: '/classes/battle/BattleHexArray' },
            { text: 'BattleLayout', link: '/classes/battle/BattleLayout' },
            { text: 'BattleProxy', link: '/classes/battle/BattleProxy' },
            { text: 'BattleStateInfoForRetreat', link: '/classes/battle/BattleStateInfoForRetreat' },
            { text: 'BattleUnitTurnReason', link: '/classes/battle/BattleUnitTurnReason' },
            { text: 'CBattleInfoEssentials', link: '/classes/battle/CBattleInfoEssentials' },
            { text: 'CObstacleInstance', link: '/classes/battle/CObstacleInstance' },
            { text: 'CPlayerBattleCallback', link: '/classes/battle/CPlayerBattleCallback' },
            { text: 'Destination', link: '/classes/battle/Destination' },
            { text: 'IBattleInfoCallback', link: '/classes/battle/IBattleInfoCallback' },
            { text: 'IBattleState', link: '/classes/battle/IBattleState' },
            { text: 'IUnitInfo', link: '/classes/battle/IUnitInfo' },
            { text: 'PossiblePlayerBattleAction', link: '/classes/battle/PossiblePlayerBattleAction' },
            { text: 'ReachabilityInfo', link: '/classes/battle/ReachabilityInfo' },
            { text: 'SiegeInfo', link: '/classes/battle/SiegeInfo' },
            { text: 'SideInBattle', link: '/classes/battle/SideInBattle' }
          ]
        },
        {
          text: '实体 (Entities)',
          items: [
            {
              text: '神器系统 (artifact/)',
              items: [
                { text: 'CArtifact', link: '/classes/entities/CArtifact' },
                { text: 'CArtifactInstance', link: '/classes/entities/CArtifactInstance' },
                { text: 'CArtifactSet', link: '/classes/entities/CArtifactSet' },
                { text: 'CArtifactFittingSet', link: '/classes/entities/CArtifactFittingSet' },
                { text: 'ArtSlotInfo', link: '/classes/entities/ArtSlotInfo' },
                { text: 'CArtHandler', link: '/classes/entities/CArtHandler' },
                { text: 'ArtBearer', link: '/classes/entities/ArtBearer' },
                { text: 'ArtifactUtils', link: '/classes/entities/ArtifactUtils' },
                { text: 'EArtifactClass', link: '/classes/entities/EArtifactClass' }
              ]
            },
            {
              text: '建筑系统 (building/)',
              items: [
                { text: 'CBuilding', link: '/classes/entities/CBuilding' },
                { text: 'TownFortifications', link: '/classes/entities/TownFortifications' }
              ]
            },
            {
              text: '派系系统 (faction/)',
              items: [
                { text: 'CFaction', link: '/classes/entities/faction/CFaction' },
                { text: 'CTown', link: '/classes/entities/CTown' },
                { text: 'CTownHandler', link: '/classes/entities/CTownHandler' }
              ]
            },
            {
              text: '英雄系统 (hero/)',
              items: [
                { text: 'CHero', link: '/classes/entities/hero/CHero' },
                { text: 'CHeroClass', link: '/classes/entities/CHeroClass' },
                { text: 'CHeroClassHandler', link: '/classes/entities/CHeroClassHandler' },
                { text: 'CHeroHandler', link: '/classes/entities/CHeroHandler' },
                { text: 'EHeroGender', link: '/classes/entities/EHeroGender' }
              ]
            },
            {
              text: '生物系统 (creature/)',
              items: [
                { text: 'CCreature', link: '/classes/entities/CCreature' }
              ]
            },
            {
              text: '基础实体',
              items: [
                { text: 'Entity', link: '/classes/entities/Entity' },
                { text: 'EntityService', link: '/classes/entities/EntityService' },
                { text: 'EntityServiceT', link: '/classes/entities/EntityServiceT' },
                { text: 'EntityT', link: '/classes/entities/EntityT' },
                { text: 'EntityWithBonuses', link: '/classes/entities/EntityWithBonuses' },
                { text: 'IConstBonusProvider', link: '/classes/entities/IConstBonusProvider' },
                { text: 'ResourceTypeHandler', link: '/classes/entities/ResourceTypeHandler' }
              ]
            }
          ]
        },
        {
          text: '奖励系统 (bonuses/)',
          items: [
            { text: 'Bonus', link: '/classes/bonuses/Bonus' },
            { text: 'BonusList', link: '/classes/bonuses/BonusList' },
            { text: 'CBonusSystemNode', link: '/classes/bonuses/CBonusSystemNode' },
            { text: 'IBonusBearer', link: '/classes/bonuses/IBonusBearer' },
            { text: 'CSelector', link: '/classes/bonuses/CSelector' },
            { text: 'ILimiter', link: '/classes/bonuses/ILimiter' },
            { text: 'IPropagator', link: '/classes/bonuses/IPropagator' },
            { text: 'IUpdater', link: '/classes/bonuses/IUpdater' },
            { text: 'BonusValueType', link: '/classes/bonuses/BonusValueType' },
            { text: 'BonusType', link: '/classes/bonuses/BonusType' },
            { text: 'BonusStacking', link: '/classes/bonuses/BonusStacking' },
            { text: 'CPropagatorNodeType', link: '/classes/bonuses/CPropagatorNodeType' },
            { text: 'BonusCache', link: '/classes/bonuses/BonusCache' },
            { text: 'BonusCustomTypes', link: '/classes/bonuses/BonusCustomTypes' },
            { text: 'BonusEnum', link: '/classes/bonuses/BonusEnum' },
            { text: 'BonusSelector', link: '/classes/bonuses/BonusSelector' },
            { text: 'Limiters', link: '/classes/bonuses/Limiters' },
            { text: 'Propagators', link: '/classes/bonuses/Propagators' },
            { text: 'Updaters', link: '/classes/bonuses/Updaters' }
          ]
        },
        {
          text: '序列化系统 (serializer/)',
          items: [
            { text: 'Serializeable', link: '/classes/serializer/Serializeable' },
            { text: 'BinarySerializer', link: '/classes/serializer/BinarySerializer' },
            { text: 'CSerializer', link: '/classes/serializer/CSerializer' },
            { text: 'ESerializationVersion', link: '/classes/serializer/ESerializationVersion' },
            { text: 'JsonSerializer', link: '/classes/serializer/JsonSerializer' },
            { text: 'JsonDeserializer', link: '/classes/serializer/JsonDeserializer' },
            { text: 'JsonTreeSerializer', link: '/classes/serializer/JsonTreeSerializer' },
            { text: 'JsonSerializeFormat', link: '/classes/serializer/JsonSerializeFormat' },
            { text: 'CMemorySerializer', link: '/classes/serializer/CMemorySerializer' },
            { text: 'CTypeList', link: '/classes/serializer/CTypeList' },
            { text: 'RegisterTypes', link: '/classes/serializer/RegisterTypes' }
          ]
        },
        {
          text: '地图对象 (mapObjects/)',
          items: [
            { text: 'CGObjectInstance', link: '/classes/mapObjects/CGObjectInstance' },
            { text: 'IHandlerBase', link: '/classes/mapObjects/IHandlerBase' },
            { text: 'IObjectInterface', link: '/classes/mapObjects/IObjectInterface' },
            { text: 'ObjectTemplate', link: '/classes/mapObjects/ObjectTemplate' },
            { text: 'CGHeroInstance', link: '/classes/mapObjects/CGHeroInstance' },
            { text: 'CGTownInstance', link: '/classes/mapObjects/CGTownInstance' },
            { text: 'CGCreature', link: '/classes/mapObjects/CGCreature' },
            { text: 'CGDwelling', link: '/classes/mapObjects/CGDwelling' },
            { text: 'CGMarket', link: '/classes/mapObjects/CGMarket' },
            { text: 'CQuest', link: '/classes/mapObjects/CQuest' },
            { text: 'CGPandoraBox', link: '/classes/mapObjects/CGPandoraBox' },
            { text: 'CGResource', link: '/classes/mapObjects/CGResource' },
            { text: 'CRewardableObject', link: '/classes/mapObjects/CRewardableObject' },
            { text: 'FlaggableMapObject', link: '/classes/mapObjects/FlaggableMapObject' },
            { text: 'IMarket', link: '/classes/mapObjects/IMarket' },
            { text: 'IOwnableObject', link: '/classes/mapObjects/IOwnableObject' },
            { text: 'MapObjects', link: '/classes/mapObjects/MapObjects' },
            { text: 'MiscObjects', link: '/classes/mapObjects/MiscObjects' },
            { text: 'ObstacleSetHandler', link: '/classes/mapObjects/ObstacleSetHandler' },
            { text: 'TownBuildingInstance', link: '/classes/mapObjects/TownBuildingInstance' },
            {
              text: '军队系统 (army/)',
              items: [
                { text: 'CArmedInstance', link: '/classes/mapObjects/army/CArmedInstance' },
                { text: 'CCreatureSet', link: '/classes/mapObjects/army/CCreatureSet' },
                { text: 'CStackBasicDescriptor', link: '/classes/mapObjects/army/CStackBasicDescriptor' },
                { text: 'CCommanderInstance', link: '/classes/mapObjects/army/CCommanderInstance' },
                { text: 'CSimpleArmy', link: '/classes/mapObjects/army/CSimpleArmy' },
                { text: 'CStackInstance', link: '/classes/mapObjects/army/CStackInstance' }
              ]
            }
          ]
        },
        {
          text: '映射系统 (mapping/)',
          items: [
            { text: 'CMapHeader', link: '/classes/mapping/CMapHeader' }
          ]
        },
        {
          text: '游戏状态 (GameState)',
          items: [
            { text: 'CGameState', link: '/classes/gameState/CGameState' },
            { text: 'CGameStateCampaign', link: '/classes/gameState/CGameStateCampaign' },
            { text: 'CPlayerState', link: '/classes/gameState/CPlayerState' },
            { text: 'IGameInfoCallback', link: '/classes/gameState/IGameInfoCallback' },
            { text: 'TerrainTile', link: '/classes/gameState/TerrainTile' },
            { text: 'GameStatistics', link: '/classes/gameState/GameStatistics' },
            { text: 'InfoAboutArmy', link: '/classes/gameState/InfoAboutArmy' },
            { text: 'QuestInfo', link: '/classes/gameState/QuestInfo' },
            { text: 'RumorState', link: '/classes/gameState/RumorState' },
            { text: 'TavernHeroesPool', link: '/classes/gameState/TavernHeroesPool' },
            { text: 'UpgradeInfo', link: '/classes/gameState/UpgradeInfo' },
            { text: 'HighScore', link: '/classes/gameState/HighScore' },
            { text: 'SThievesGuildInfo', link: '/classes/gameState/SThievesGuildInfo' }
          ]
        },
        {
          text: '游戏启动',
          items: [
            { text: 'StartInfo', link: '/classes/StartInfo' }
          ]
        },
        {
          text: '路径查找系统 (pathfinder/)',
          items: [
            { text: 'CGPathNode', link: '/classes/pathfinder/CGPathNode' },
            { text: 'CPathsInfo', link: '/classes/pathfinder/CPathsInfo' },
            { text: 'CPathfinder', link: '/classes/pathfinder/CPathfinder' },
            { text: 'PathfinderConfig', link: '/classes/pathfinder/PathfinderConfig' },
            { text: 'TurnInfo', link: '/classes/pathfinder/TurnInfo' }
          ]
        },
        {
          text: '法术系统 (spells/)',
          items: [
            { text: 'ISpellMechanics', link: '/classes/spells/ISpellMechanics' },
            { text: 'BattleCast', link: '/classes/spells/BattleCast' },
            { text: 'Mechanics', link: '/classes/spells/Mechanics' },
            { text: 'IBattleCast', link: '/classes/spells/IBattleCast' },
            { text: 'CSpell', link: '/classes/spells/CSpell' },
            { text: 'CSpellHandler', link: '/classes/spells/CSpellHandler' },
            { text: 'IAdventureSpellMechanics', link: '/classes/spells/IAdventureSpellMechanics' },
            { text: 'AdventureSpellMechanics', link: '/classes/spells/AdventureSpellMechanics' },
            { text: 'IAdventureSpellEffect', link: '/classes/spells/IAdventureSpellEffect' },
            { text: 'TownPortalEffect', link: '/classes/spells/TownPortalEffect' },
            { text: 'DimensionDoorEffect', link: '/classes/spells/DimensionDoorEffect' },
            { text: 'AdventureSpellRangedEffect', link: '/classes/spells/AdventureSpellRangedEffect' },
            { text: 'ESpellCastResult', link: '/classes/spells/ESpellCastResult' },
            { text: 'AnimationInfo', link: '/classes/spells/AnimationInfo' },
            { text: 'ProjectileInfo', link: '/classes/spells/ProjectileInfo' },
            { text: 'AnimationItem', link: '/classes/spells/AnimationItem' },
            { text: 'VerticalPosition', link: '/classes/spells/VerticalPosition' },
            { text: 'TargetInfo', link: '/classes/spells/TargetInfo' },
            { text: 'LevelInfo', link: '/classes/spells/LevelInfo' },
            { text: 'SpellCastEnvironment', link: '/classes/spells/SpellCastEnvironment' },
            { text: 'AdventureSpellCastParameters', link: '/classes/spells/AdventureSpellCastParameters' },
            { text: 'BaseMechanics', link: '/classes/spells/BaseMechanics' },
            { text: 'Caster', link: '/classes/spells/Caster' },
            { text: 'Mode', link: '/classes/spells/Mode' },
            { text: 'SpellSchool', link: '/classes/spells/SpellSchool' },
            { text: 'SpellEffectValUptr', link: '/classes/spells/SpellEffectValUptr' },
            { text: 'TargetFilter', link: '/classes/spells/TargetFilter' },
            { text: 'TargetValidator', link: '/classes/spells/TargetValidator' },
            { text: 'TargetApplier', link: '/classes/spells/TargetApplier' },
            { text: 'TargetCalculator', link: '/classes/spells/TargetCalculator' },
            { text: 'TargetAggregator', link: '/classes/spells/TargetAggregator' },
            { text: 'TargetSelector', link: '/classes/spells/TargetSelector' },
            { text: 'TargetTransformer', link: '/classes/spells/TargetTransformer' },
            { text: 'TargetCombiner', link: '/classes/spells/TargetCombiner' },
            { text: 'TargetSplitter', link: '/classes/spells/TargetSplitter' },
            { text: 'TargetMerger', link: '/classes/spells/TargetMerger' }
          ]
        },
        {
          text: 'RMG系统 (rmg/)',
          items: [
            { text: 'CRmgTemplate', link: '/classes/rmg/CRmgTemplate' },
            { text: 'CTreasureInfo', link: '/classes/rmg/CTreasureInfo' },
            { text: 'ZoneConnection', link: '/classes/rmg/ZoneConnection' },
            { text: 'CTownInfo', link: '/classes/rmg/CTownInfo' },
            { text: 'CTownHints', link: '/classes/rmg/CTownHints' },
            { text: 'ZoneOptions', link: '/classes/rmg/ZoneOptions' },
            { text: 'ETemplateZoneType', link: '/classes/rmg/ETemplateZoneType' },
            { text: 'EZoneLevel', link: '/classes/rmg/EZoneLevel' },
            { text: 'EConnectionType', link: '/classes/rmg/EConnectionType' },
            { text: 'ERoadOption', link: '/classes/rmg/ERoadOption' },
            { text: 'TRmgTemplateZoneId', link: '/classes/rmg/TRmgTemplateZoneId' }
          ]
        },
        {
          text: '网络 (Network)',
          items: [
            { text: 'NetworkInterface', link: '/classes/network/NetworkInterface' },
            { text: 'NetworkHandler', link: '/classes/network/NetworkHandler' },
            { text: 'NetworkConnection', link: '/classes/network/NetworkConnection' },
            { text: 'NetworkServer', link: '/classes/network/NetworkServer' }
          ]
        },
        {
          text: '网络包系统 (networkPacks/)',
          items: [
            { text: 'CPack', link: '/classes/networkPacks/CPack' },
            { text: 'CPackForClient', link: '/classes/networkPacks/CPackForClient' },
            { text: 'CPackForServer', link: '/classes/networkPacks/CPackForServer' },
            { text: 'CPackForLobby', link: '/classes/networkPacks/CPackForLobby' },
            { text: 'ICPackVisitor', link: '/classes/networkPacks/ICPackVisitor' },
            { text: 'PackageApplied', link: '/classes/networkPacks/PackageApplied' },
            { text: 'EndTurn', link: '/classes/networkPacks/EndTurn' },
            { text: 'BattleStart', link: '/classes/networkPacks/BattleStart' },
            { text: 'LobbyClientConnected', link: '/classes/networkPacks/LobbyClientConnected' },
            { text: 'Query', link: '/classes/networkPacks/Query' }
          ]
        },
        {
          text: '文件系统 (filesystem/)',
          items: [
            { text: 'ResourcePath', link: '/classes/filesystem/ResourcePath' }
          ]
        },
        {
          text: '事件系统 (events/)',
          items: [
            { text: 'EventBus', link: '/classes/events/EventBus' },
            { text: 'Event', link: '/classes/events/Event' },
            { text: 'EventSubscription', link: '/classes/events/EventSubscription' },
            { text: 'SubscriptionRegistry', link: '/classes/events/SubscriptionRegistry' }
          ]
        },
        {
          text: '日志 (Logging)',
          items: [
            { text: 'CLogger', link: '/classes/logging/CLogger' }
          ]
        },
        {
          text: 'JSON系统 (json/)',
          items: [
            { text: 'JsonNode', link: '/classes/json/JsonNode' },
            { text: 'JsonType', link: '/classes/json/JsonType' },
            { text: 'JsonParsingSettings', link: '/classes/json/JsonParsingSettings' }
          ]
        },
        {
          text: '文本系统 (texts/)',
          items: [
            { text: 'MetaString', link: '/classes/texts/MetaString' }
          ]
        },
        {
          text: '模组系统 (modding/)',
          items: [
            { text: 'CModHandler', link: '/classes/modding/CModHandler' },
            { text: 'ModDescription', link: '/classes/modding/ModDescription' },
            { text: 'CModVersion', link: '/classes/modding/CModVersion' },
            { text: 'ModManager', link: '/classes/modding/ModManager' },
            { text: 'ContentTypeHandler', link: '/classes/modding/ContentTypeHandler' },
            { text: 'ModVerificationInfo', link: '/classes/modding/ModVerificationInfo' },
            { text: 'ModUtility', link: '/classes/modding/ModUtility' }
          ]
        },
        {
          text: '技能系统 (skills/)',
          items: [
            { text: 'Skill', link: '/classes/skills/Skill' }
          ]
        },
        {
          text: '派系系统 (factions/)',
          items: [
            { text: 'Faction', link: '/classes/factions/Faction' },
            { text: 'AFactionMember', link: '/classes/factions/AFactionMember' },
            { text: 'INativeTerrainProvider', link: '/classes/factions/INativeTerrainProvider' }
          ]
        },
        {
          text: '服务系统 (services/)',
          items: [
            { text: 'Services', link: '/classes/services/Services' }
          ]
        },
        {
          text: '设置系统',
          items: [
            { text: 'IGameSettings', link: '/classes/IGameSettings' }
          ]
        },
        {
          text: '英雄系统 (heroes/)',
          items: [
            { text: 'HeroClass', link: '/classes/heroes/HeroClass' }
          ]
        },
        {
          text: '玩家系统 (players/)',
          items: [
            { text: 'Player', link: '/classes/players/Player' }
          ]
        },
        {
          text: '资源系统 (resources/)',
          items: [
            { text: 'ResourceType', link: '/classes/resources/ResourceType' }
          ]
        },
        {
          text: '服务器系统 (server/)',
          items: [
            { text: 'ServerCallback', link: '/classes/server/ServerCallback' },
            { text: 'CGameHandler', link: '/classes/server/CGameHandler' },
            { text: 'CVCMIServer', link: '/classes/server/CVCMIServer' },
            { text: 'IGameServer', link: '/classes/server/IGameServer' },
            { text: 'TurnTimerHandler', link: '/classes/server/TurnTimerHandler' },
            { text: 'GlobalLobbyProcessor', link: '/classes/server/GlobalLobbyProcessor' },
            { text: 'ServerSpellCastEnvironment', link: '/classes/server/ServerSpellCastEnvironment' }
          ]
        },
        {
          text: '神器系统 (artifacts/)',
          items: [
            { text: 'Artifact', link: '/classes/artifacts/Artifact' },
            { text: 'CChargedArtifact', link: '/classes/artifacts/CChargedArtifact' },
            { text: 'CCombinedArtifact', link: '/classes/artifacts/CCombinedArtifact' },
            { text: 'CScrollArtifact', link: '/classes/artifacts/CScrollArtifact' },
            { text: 'CGrowingArtifact', link: '/classes/artifacts/CGrowingArtifact' }
          ]
        },
        {
          text: '脚本系统 (scripting/)',
          items: [
            { text: 'Context', link: '/classes/scripting/Context' },
            { text: 'Script', link: '/classes/scripting/Script' },
            { text: 'Pool', link: '/classes/scripting/Pool' },
            { text: 'Service', link: '/classes/scripting/Service' }
          ]
        },
        {
          text: '回调 (Callback)',
          items: [
            { text: 'CAdventureAI', link: '/classes/callback/CAdventureAI' },
            { text: 'CBattleCallback', link: '/classes/callback/CBattleCallback' },
            { text: 'CBattleGameInterface', link: '/classes/callback/CBattleGameInterface' },
            { text: 'CCallback', link: '/classes/callback/CCallback' },
            { text: 'CDynLibHandler', link: '/classes/callback/CDynLibHandler' },
            { text: 'CGameInterface', link: '/classes/callback/CGameInterface' },
            { text: 'CGlobalAI', link: '/classes/callback/CGlobalAI' },
            { text: 'CNonConstInfoCallback', link: '/classes/callback/CNonConstInfoCallback' },
            { text: 'CPlayerSpecificInfoCallback', link: '/classes/callback/CPlayerSpecificInfoCallback' },
            { text: 'IGameInfoCallback', link: '/classes/gameState/IGameInfoCallback' }
          ]
        },
        {
          text: '标识符系统 (identifiers/)',
          items: [
            { text: 'Metatype', link: '/classes/identifiers/Metatype' },
            { text: 'BattleHexEDir', link: '/classes/battle/BattleHexEDir' },
            { text: 'EWallPart', link: '/classes/battle/EWallPart' },
            { text: 'BattleSide', link: '/classes/battle/BattleSide' },
            { text: 'EActionType', link: '/classes/identifiers/EActionType' }
          ]
        },
        {
          text: '常量 (Constants)',
          items: [
            { text: 'Enumerations', link: '/classes/constants/Enumerations' },
            { text: 'NumericConstants', link: '/classes/constants/NumericConstants' },
            { text: 'StringConstants', link: '/classes/constants/StringConstants' }
          ]
        },
        {
          text: '环境系统 (environment/)',
          items: [
            { text: 'Environment', link: '/classes/environment/Environment' }
          ]
        }
      ],
      '/dependencies/': [
        {
          text: '依赖分析',
          items: [
            { text: '依赖层级', link: '/dependencies/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vcmi/vcmi' }
    ]
  }
})