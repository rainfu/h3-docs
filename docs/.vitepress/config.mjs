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
            { text: 'CBattleInfoCallback', link: '/classes/battle/CBattleInfoCallback' }
          ]
        },
        {
          text: '实体系统 (entities/)',
          items: [
            { text: 'CHero', link: '/classes/entities/CHero' },
            { text: 'CArtifact', link: '/classes/entities/CArtifact' },
            { text: 'CTown', link: '/classes/entities/CTown' },
            { text: 'Creature', link: '/classes/entities/Creature' },
            { text: 'CBuilding', link: '/classes/entities/CBuilding' },
            { text: 'CFaction', link: '/classes/entities/CFaction' }
          ]
        },
        {
          text: '奖励系统 (bonuses/)',
          items: [
            { text: 'Bonus', link: '/classes/bonuses/Bonus' },
            { text: 'CBonusSystemNode', link: '/classes/bonuses/CBonusSystemNode' },
            { text: 'IBonusBearer', link: '/classes/bonuses/IBonusBearer' },
            { text: 'CSelector', link: '/classes/bonuses/CSelector' },
            { text: 'ILimiter', link: '/classes/bonuses/ILimiter' },
            { text: 'IPropagator', link: '/classes/bonuses/IPropagator' },
            { text: 'IUpdater', link: '/classes/bonuses/IUpdater' }
          ]
        },
        {
          text: '序列化系统 (serializer/)',
          items: [
            { text: 'Serializeable', link: '/classes/serializer/Serializeable' },
            { text: 'BinarySerializer', link: '/classes/serializer/BinarySerializer' },
            { text: 'CSerializer', link: '/classes/serializer/CSerializer' }
          ]
        },
        {
          text: '地图对象 (mapObjects/)',
          items: [
            { text: 'CGObjectInstance', link: '/classes/mapObjects/CGObjectInstance' },
            { text: 'IHandlerBase', link: '/classes/mapObjects/IHandlerBase' }
          ]
        },
        {
          text: '游戏状态系统 (gameState/)',
          items: [
            { text: 'CGameState', link: '/classes/gameState/CGameState' },
            { text: 'IGameInfoCallback', link: '/classes/gameState/IGameInfoCallback' }
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
            { text: 'BaseMechanics', link: '/classes/spells/BaseMechanics' }
          ]
        },
        {
          text: 'RMG系统 (rmg/)',
          items: [
            { text: 'CRmgTemplate', link: '/classes/rmg/CRmgTemplate' }
          ]
        },
        {
          text: '网络系统 (network/)',
          items: [
            { text: 'INetworkConnection', link: '/classes/network/INetworkConnection' },
            { text: 'NetworkConnection', link: '/classes/network/NetworkConnection' },
            { text: 'IInternalConnection', link: '/classes/network/IInternalConnection' },
            { text: 'INetworkClient', link: '/classes/network/INetworkClient' },
            { text: 'INetworkServer', link: '/classes/network/INetworkServer' },
            { text: 'INetworkConnectionListener', link: '/classes/network/INetworkConnectionListener' },
            { text: 'INetworkClientListener', link: '/classes/network/INetworkClientListener' },
            { text: 'INetworkServerListener', link: '/classes/network/INetworkServerListener' },
            { text: 'INetworkTimerListener', link: '/classes/network/INetworkTimerListener' },
            { text: 'INetworkHandler', link: '/classes/network/INetworkHandler' },
            { text: 'InternalConnection', link: '/classes/network/InternalConnection' },
            { text: 'NetworkServer', link: '/classes/network/NetworkServer' },
            { text: 'NetworkHandler', link: '/classes/network/NetworkHandler' },
            { text: 'NetworkContext', link: '/classes/network/NetworkContext' },
            { text: 'NetworkSocket', link: '/classes/network/NetworkSocket' },
            { text: 'NetworkAcceptor', link: '/classes/network/NetworkAcceptor' },
            { text: 'NetworkBuffer', link: '/classes/network/NetworkBuffer' },
            { text: 'NetworkTimer', link: '/classes/network/NetworkTimer' }
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
            { text: 'EventBus', link: '/classes/events/EventBus' }
          ]
        },
        {
          text: '日志系统 (logging/)',
          items: [
            { text: 'CLogger', link: '/classes/logging/CLogger' },
            { text: 'CLoggerDomain', link: '/classes/logging/CLoggerDomain' },
            { text: 'CLogManager', link: '/classes/logging/CLogManager' },
            { text: 'LogRecord', link: '/classes/logging/LogRecord' },
            { text: 'CLogFormatter', link: '/classes/logging/CLogFormatter' },
            { text: 'ILogTarget', link: '/classes/logging/ILogTarget' },
            { text: 'CLogConsoleTarget', link: '/classes/logging/CLogConsoleTarget' },
            { text: 'CLogFileTarget', link: '/classes/logging/CLogFileTarget' },
            { text: 'CColorMapping', link: '/classes/logging/CColorMapping' },
            { text: 'ELogLevel', link: '/classes/logging/ELogLevel' },
            { text: 'EConsoleTextColor', link: '/classes/logging/EConsoleTextColor' }
          ]
        },
        {
          text: 'JSON系统 (json/)',
          items: [
            { text: 'JsonNode', link: '/classes/json/JsonNode' }
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