import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VCMI Client Library",
  description: "Documentation for the VCMI client library",
  base: "/h3/",
  srcDir: "docs",
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Modules Overview', link: '/modules-overview' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Modules Overview', link: '/modules-overview' }
        ]
      },
      {
        text: 'Module Indexes',
        items: [
          { text: 'Filesystem', link: '/classes/filesystem/index' },
          { text: 'Events', link: '/classes/events/index' },
          { text: 'Logging', link: '/classes/logging/index' },
          { text: 'JSON', link: '/classes/json/index' },
          { text: 'Battle', link: '/classes/battle/index' },
          { text: 'Entities', link: '/classes/entities/index' },
          { text: 'Bonuses', link: '/classes/bonuses/index' },
          { text: 'Serializer', link: '/classes/serializer/index' },
          { text: 'Map Objects', link: '/classes/mapObjects/index' },
          { text: 'Game State', link: '/classes/gameState/index' },
          { text: 'Network', link: '/classes/network/index' },
          { text: 'Network Packs', link: '/classes/networkPacks/index' },
          { text: 'Pathfinder', link: '/classes/pathfinder/index' },
          { text: 'Spells', link: '/classes/spells/index' },
          { text: 'RMG', link: '/classes/rmg/index' },
          { text: 'Modding', link: '/classes/modding/index' }
        ]
      },
      {
        text: 'Classes',
        items: [
          // Logging classes
          { text: 'CLogger', link: '/classes/logging/CLogger' },
          { text: 'CLoggerDomain', link: '/classes/logging/CLoggerDomain' },
          { text: 'LogRecord', link: '/classes/logging/LogRecord' },
          { text: 'ILogTarget', link: '/classes/logging/ILogTarget' },
          { text: 'CLogConsoleTarget', link: '/classes/logging/CLogConsoleTarget' },
          { text: 'CLogFileTarget', link: '/classes/logging/CLogFileTarget' },
          { text: 'CLogFormatter', link: '/classes/logging/CLogFormatter' },
          { text: 'CColorMapping', link: '/classes/logging/CColorMapping' },
          { text: 'CLogManager', link: '/classes/logging/CLogManager' },
          { text: 'ELogLevel', link: '/classes/logging/ELogLevel' },
          { text: 'EConsoleTextColor', link: '/classes/logging/EConsoleTextColor' },
          
          // JSON classes
          { text: 'JsonNode', link: '/classes/json/JsonNode' },
          
          // Serializer classes
          { text: 'CSerializer', link: '/classes/serializer/CSerializer' },
          { text: 'BinarySerializer', link: '/classes/serializer/BinarySerializer' },
          { text: 'Serializeable', link: '/classes/serializer/Serializeable' },
          
          // Battle classes
          { text: 'CBattleInfoCallback', link: '/classes/battle/CBattleInfoCallback' },
          { text: 'CUnitState', link: '/classes/battle/CUnitState' },
          { text: 'BattleInfo', link: '/classes/battle/BattleInfo' },
          { text: 'Unit', link: '/classes/battle/Unit' },
          { text: 'DamageCalculator', link: '/classes/battle/DamageCalculator' },
          { text: 'BattleAction', link: '/classes/battle/BattleAction' },
          
          // Entities classes
          { text: 'CHero', link: '/classes/entities/CHero' },
          { text: 'CArtifact', link: '/classes/entities/CArtifact' },
          { text: 'CTown', link: '/classes/entities/CTown' },
          { text: 'Creature', link: '/classes/entities/Creature' },
          { text: 'CBuilding', link: '/classes/entities/CBuilding' },
          { text: 'CFaction', link: '/classes/entities/CFaction' },
          
          // Map Objects classes
          { text: 'CGObjectInstance', link: '/classes/mapObjects/CGObjectInstance' },
          { text: 'IHandlerBase', link: '/classes/mapObjects/IHandlerBase' },
          
          // Game State classes
          { text: 'CGameState', link: '/classes/gameState/CGameState' },
          { text: 'IGameInfoCallback', link: '/classes/gameState/IGameInfoCallback' },
          
          // Network classes
          { text: 'INetworkConnection', link: '/classes/network/INetworkConnection' },
          { text: 'NetworkConnection', link: '/classes/network/NetworkConnection' },
          
          // Network Packs classes
          { text: 'CPack', link: '/classes/networkPacks/CPack' },
          
          // Pathfinder classes
          { text: 'CGPathNode', link: '/classes/pathfinder/CGPathNode' },
          { text: 'CPathsInfo', link: '/classes/pathfinder/CPathsInfo' },
          { text: 'CPathfinder', link: '/classes/pathfinder/CPathfinder' },
          { text: 'PathfinderConfig', link: '/classes/pathfinder/PathfinderConfig' },
          { text: 'TurnInfo', link: '/classes/pathfinder/TurnInfo' },
          
          // Spells classes
          { text: 'ISpellMechanics', link: '/classes/spells/ISpellMechanics' },
          { text: 'BattleCast', link: '/classes/spells/BattleCast' },
          { text: 'Mechanics', link: '/classes/spells/Mechanics' },
          
          // RMG classes
          { text: 'CRmgTemplate', link: '/classes/rmg/CRmgTemplate' },
          
          // Bonuses classes
          { text: 'CBonusSystemNode', link: '/classes/bonuses/CBonusSystemNode' },
          { text: 'IBonusBearer', link: '/classes/bonuses/IBonusBearer' },
          { text: 'Bonus', link: '/classes/bonuses/Bonus' },
          { text: 'CSelector', link: '/classes/bonuses/CSelector' },
          { text: 'ILimiter', link: '/classes/bonuses/ILimiter' },
          { text: 'IPropagator', link: '/classes/bonuses/IPropagator' },
          { text: 'IUpdater', link: '/classes/bonuses/IUpdater' },
          
          // Modding classes
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vcmi/vcmi' }
    ]
  }
})