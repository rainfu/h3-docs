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
            { text: 'CCreature', link: '/classes/entities/CCreature' }
          ]
        },
        {
          text: '奖励系统 (bonuses/)',
          items: [
            { text: 'Bonus', link: '/classes/bonuses/Bonus' },
            { text: 'BonusList', link: '/classes/bonuses/BonusList' },
            { text: 'CBonusSystemNode', link: '/classes/bonuses/CBonusSystemNode' },
            { text: 'IBonusBearer', link: '/classes/bonuses/IBonusBearer' }
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
            { text: 'CGObjectInstance', link: '/classes/mapObjects/CGObjectInstance' }
          ]
        },
        {
          text: '游戏状态系统 (gameState/)',
          items: [
            { text: 'CGameState', link: '/classes/gameState/CGameState' }
          ]
        },
        {
          text: '路径查找系统 (pathfinder/)',
          items: [
            { text: 'CGPathNode', link: '/classes/pathfinder/' },
            { text: 'CPathsInfo', link: '/classes/pathfinder/' }
          ]
        },
        {
          text: '法术系统 (spells/)',
          items: [
            { text: 'ISpellMechanics', link: '/classes/spells/' },
            { text: 'BattleCast', link: '/classes/spells/' },
            { text: 'Mechanics', link: '/classes/spells/' }
          ]
        },
        {
          text: 'RMG系统 (rmg/)',
          items: [
            { text: 'CRmgTemplate', link: '/classes/rmg/' },
            { text: 'Zone', link: '/classes/rmg/' },
            { text: 'CRandomMapGenerator', link: '/classes/rmg/' }
          ]
        },
        {
          text: '网络系统 (network/)',
          items: [
            { text: 'INetworkConnection', link: '/classes/network/INetworkConnection' },
            { text: 'CConnection', link: '/classes/network/' },
            { text: 'Pack', link: '/classes/network/' }
          ]
        },
        {
          text: '网络包系统 (networkPacks/)',
          items: [
            { text: 'CPack', link: '/classes/networkPacks/' },
            { text: 'CPackForServer', link: '/classes/networkPacks/' }
          ]
        },
        {
          text: '文件系统 (filesystem/)',
          items: [
            { text: 'ResourcePath', link: '/classes/filesystem/' }
          ]
        },
        {
          text: '事件系统 (events/)',
          items: [
            { text: 'CApplyDamage', link: '/classes/events/' }
          ]
        },
        {
          text: '日志系统 (logging/)',
          items: [
            { text: 'CLogger', link: '/classes/logging/CLogger' },
            { text: 'CLoggerDomain', link: '/classes/logging/' }
          ]
        },
        {
          text: 'JSON系统 (json/)',
          items: [
            { text: 'JsonNode', link: '/classes/json/' }
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