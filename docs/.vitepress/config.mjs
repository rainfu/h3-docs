import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VCMI Lib 文档',
  description: 'VCMI 客户端核心库 API 文档',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
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
            { text: 'CStackInstance', link: '/classes/battle/CStackInstance' }
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
            { text: 'CBonusSystemNode', link: '/classes/bonuses/CBonusSystemNode' }
          ]
        },
        {
          text: '序列化系统 (serializer/)',
          items: [
            { text: 'Serializeable', link: '/classes/serializer/Serializeable' },
            { text: 'CSerializer', link: '/classes/serializer/CSerializer' }
          ]
        },
        {
          text: '地图对象 (mapObjects/)',
          items: [
            { text: 'CGObjectInstance', link: '/classes/mapObjects/CGObjectInstance' }
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