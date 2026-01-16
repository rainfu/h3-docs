# VCMI 客户端库待转换文件列表

此文件记录了从 `/vcmi-client/lib` 目录中需要生成文档的头文件列表。已存在文档的文件已被排除。

## 转换规则
- 检查 `/vcmi-client/lib` 目录下的所有 `.h` 和 `.hpp` 文件
- 排除已存在于 `/docs/classes` 目录中的文档
- 按模块分类记录待转换文件
- 转换完成后更新此列表

## 待转换文件列表

### 战斗 (Battle)
- AutocombatPreferences.h [✓] 2026-01-17 06:50
- BattleHex.h [✓] 2026-01-17 06:52
- BattleHexArray.h [✓] 2026-01-17 06:55
- BattleLayout.h [✓] 2026-01-17 06:57
- BattleProxy.h [✓] 2026-01-17 07:00
- BattleStateInfoForRetreat.h [✓] 2026-01-17 07:02
- BattleUnitTurnReason.h [✓] 2026-01-17 07:04
- CBattleInfoEssentials.h [✓] 2026-01-17 07:07
- CObstacleInstance.h [✓] 2026-01-17 07:10
- CPlayerBattleCallback.h [✓] 2026-01-17 07:13
- Destination.h [✓] 2026-01-17 07:15
- IBattleInfoCallback.h [✓] 2026-01-17 07:18
- IBattleState.h [✓] 2026-01-17 07:20
- IUnitInfo.h [✓] 2026-01-17 07:23
- PossiblePlayerBattleAction.h [✓] 2026-01-17 07:26
- ReachabilityInfo.h [✓] 2026-01-17 07:29
- SiegeInfo.h [✓] 2026-01-17 07:32
- SideInBattle.h [✓] 2026-01-17 07:35

### 奖励系统 (Bonuses)
- BonusCache.h [✓] 2026-01-17 07:38
- BonusCustomTypes.h [✓] 2026-01-17 07:42
- BonusEnum.h [✓] 2026-01-17 07:47
- BonusList.h
- BonusSelector.h [✓] 2026-01-17 07:51
- Limiters.h
- Propagators.h
- Updaters.h

### 回调 (Callback)
- CAdventureAI.h
- CBattleCallback.h
- CBattleGameInterface.h
- CCallback.h
- CDynLibHandler.h
- CGameInterface.h
- CGlobalAI.h
- CNonConstInfoCallback.h
- CPlayerSpecificInfoCallback.h
- EditorCallback.h
- GameCallbackHolder.h
- IGameInfoCallback.h
- ILocalStateCallback.h
- IShipyard.h

### 常量 (Constants)
- CArtifactInstanceConsts.h
- CStackInstanceConsts.h
- GameConstants.h
- Global_consts.h
- Heroes.h
- ObjProperty.h
- PlayerStatus.h

### 实体 (Entities)
- CStackInstance.h
- Entity.h
- EntityIdentifiers.h
- EntityImplementation.h
- IdentifierStorage.h
- IConstBonusProvider.h
- IHandlerBase.h

### 事件 (Events)
- CEventBus.h
- Event.h
- EventBus.h
- Events.h
- IEventDispatcher.h
- IEventSink.h
- Subscriber.h

### 文件系统 (Filesystem)
- CInputStream.h
- COutputStream.h
- CZipLoader.h
- CVCMZFileReader.h
- Filesystem.h
- ISimpleResourceLoader.h
- JsonUtils.h
- Loaders.h
- MemoryReadWriteStream.h
- ReadableFileStream.h
- Resource.h
- ResourceID.h
- ResourcePath.h
- StandardPathProvider.h
- ZipArchive.h

### 游戏状态 (Game State)
- CGameState.h
- CPlayerState.h
- IGameStateCallback.h
- ILocalStateCallback.h
- IObjectConstructionManager.h

### JSON
- JsonDocument.h
- JsonEmitter.h
- JsonForwardDeclaration.h
- JsonNode.h
- JsonParser.h
- JsonUtils.h

### 日志 (Logging)
- ILogger.h
- Logger.h

### 地图对象 (Map Objects)
- CGObjectInstance.h
- CGTownInstance.h
- CArmedInstance.h
- CObstacleInstance.h
- CGDwelling.h
- CGShipyard.h
- CGMarket.h
- CGSignBottle.h
- CGWitchhut.h
- CGMagicWell.h
- CGSirens.h
- CGOracle.h
- CGJail.h
- CGEvent.h
- CGGrail.h
- CGMagi.h
- CGMonolith.h
- CGSubterraneanGate.h
- CGWhirlpool.h
- CGShip.h
- CGCreature.h
- CGArtifact.h
- CGResource.h
- CGMine.h
- CGTeleport.h
- CGSawmill.h
- CGAbandonedMine.h
- CGDaemonSummon.h
- CGQuestGuard.h
- CGSeerHut.h
- CGHeroes.h
- CGTownBuilding.h
- CGNotImplementedYet.h
- MapObjects.h
- MiscObjects.h
- ObjectTemplate.h
- ObstacleSetHandler.h
- TownBuildingInstance.h

### 模组 (Modding)
- ActiveModsInSaveList.h
- IdentifierStorage.h
- ModIncompatibility.h
- ModScope.h

### 网络 (Network)
- NetworkConnection.h
- NetworkDefines.h
- NetworkHandler.h
- NetworkInterface.h
- NetworkServer.h

### 网络包 (Network Packs)
- ArtifactLocation.h
- BattleChanges.h
- Component.h
- EInfoWindowMode.h
- EntityChanges.h
- EOpenWindowMode.h
- NetPacksBase.h
- NetPackVisitor.h
- ObjProperty.h
- PacksForClient.h
- PacksForClientBattle.h
- PacksForLobby.h
- PacksForServer.h
- SaveLocalState.h
- SetRewardableConfiguration.h
- SetStackEffect.h
- StackLocation.h
- TradeItem.h

### 寻路 (Pathfinder)
- INodeStorage.h
- NodeStorage.h
- PathfinderCache.h
- PathfinderOptions.h
- PathfinderUtil.h
- PathfindingRules.h

### RMG (Random Map Generator)
- modificators/ConnectionsPlacer.h
- modificators/MinePlacer.h
- modificators/Modificator.h
- modificators/ObjectDistributor.h
- modificators/ObjectManager.h
- modificators/ObstaclePlacer.h
- modificators/PrisonHeroPlacer.h
- modificators/QuestArtifactPlacer.h
- modificators/RiverPlacer.h
- modificators/RoadPlacer.h
- modificators/RockFiller.h
- modificators/RockPlacer.h
- modificators/TerrainPainter.h
- modificators/TownPlacer.h
- modificators/TreasurePlacer.h
- modificators/WaterAdopter.h
- modificators/WaterProxy.h
- modificators/WaterRoutes.h
- CMapGenerator.h
- CMapGenOptions.h
- CRmgTemplateStorage.h
- CRoadRandomizer.h
- CZonePlacer.h
- float3.h
- Functions.h
- MapProxy.h
- ObjectConfig.h
- ObjectInfo.h
- PenroseTiling.h
- RmgArea.h
- RmgMap.h
- RmgObject.h
- RmgPath.h
- TileInfo.h
- Zone.h

### 序列化 (Serializer)
- BinaryDeserializer.h
- CLoadFile.h
- CSaveFile.h
- GameConnection.h
- GameConnectionID.h
- JsonDeserializer.h
- JsonSerializeFormat.h
- JsonSerializer.h
- JsonTreeSerializer.h
- JsonUpdater.h
- PlayerConnectionID.h
- SerializerReflection.h

### 法术 (Spells)
- adventure/AdventureSpellEffect.h
- adventure/AdventureSpellMechanics.h
- adventure/DimensionDoorEffect.h
- adventure/RemoveObjectEffect.h
- adventure/SummonBoatEffect.h
- adventure/TownPortalEffect.h
- adventure/ViewWorldEffect.h
- effects/Catapult.h
- effects/Clone.h
- effects/Damage.h
- effects/DemonSummon.h
- effects/Dispel.h
- effects/Effect.h
- effects/Effects.h
- effects/EffectsFwd.h
- effects/Heal.h
- effects/LocationEffect.h
- effects/Moat.h
- effects/Obstacle.h
- effects/Registry.h
- effects/RemoveObstacle.h
- effects/Sacrifice.h
- effects/Summon.h
- effects/Teleport.h
- effects/Timed.h
- effects/UnitEffect.h
- AbilityCaster.h
- BattleSpellMechanics.h
- BonusCaster.h
- ExternalCaster.h
- ObstacleCasterProxy.h
- Problem.h
- ProxyCaster.h
- SpellSchoolHandler.h
- TargetCondition.h
- ViewSpellInt.h

### 文本 (Texts)
- CGeneralTextHandler.h
- CLegacyConfigParser.h
- Languages.h
- MetaString.h
- TextIdentifier.h
- TextLocalizationContainer.h
- TextOperations.h

## 转换状态
- 总文件数: 345
- 已完成: 0
- 剩余: 345

上次更新时间: 2026-01-17 06:45