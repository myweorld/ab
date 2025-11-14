console.log("[BUNDLE] 🚀 Starting execution..."); alert("BUNDLE LOADED!");
(function () {
  'use strict';

  /**
   * Node - Represents a single cell in the game
   */

  class Node {
    constructor(data) {
      // Core properties
      this.id = data.id;
      this.originalId = data.id; // Keep original ID for debugging
      this.botId = data.botId || null; // Which bot owns this node

      // Position (current)
      this.x = data.x;
      this.y = data.y;

      // Position (old - for interpolation)
      this.ox = data.x;
      this.oy = data.y;

      // Position (next - for smooth movement)
      this.nx = data.x;
      this.ny = data.y;

      // Size
      this.size = data.size;
      this.oSize = data.size;
      this.nSize = data.size;

      // Visual properties
      this.color = data.color || '#FF0000';
      this.name = data.name || '';
      this.skin = data.skin || null;

      // Flags
      this.isVirus = data.isVirus || false;
      this.isAgitated = data.isAgitated || false;
      this.isEjected = data.isEjected || false;
      this.isPlayer = data.isPlayer || false; // Is this a player-owned cell?

      // Timing
      this.updateTime = Date.now();
      this.lastSeenTime = Date.now();

      // Rendering
      this.points = []; // For smooth blob rendering
      this.pointsAcc = []; // Point acceleration
      this.destroyed = false;
    }

    /**
     * Update node position and size
     */
    update(data) {
      // Save old position for interpolation
      this.ox = this.x;
      this.oy = this.y;
      this.oSize = this.size;

      // Set new target position
      this.nx = data.x !== undefined ? data.x : this.nx;
      this.ny = data.y !== undefined ? data.y : this.ny;
      this.nSize = data.size !== undefined ? data.size : this.nSize;

      // Update other properties
      if (data.color) this.color = data.color;
      if (data.name !== undefined) this.name = data.name;
      if (data.skin !== undefined) this.skin = data.skin;
      if (data.isVirus !== undefined) this.isVirus = data.isVirus;
      if (data.isAgitated !== undefined) this.isAgitated = data.isAgitated;
      if (data.isEjected !== undefined) this.isEjected = data.isEjected;

      this.updateTime = Date.now();
      this.lastSeenTime = Date.now();
    }

    /**
     * Interpolate position and size (for smooth animation)
     */
    interpolate(timestamp) {
      const delta = Math.min((timestamp - this.updateTime) / 120, 1);

      this.x = this.ox + (this.nx - this.ox) * delta;
      this.y = this.oy + (this.ny - this.oy) * delta;
      this.size = this.oSize + (this.nSize - this.oSize) * delta;

      return delta; // Return progress (0-1)
    }

    /**
     * Check if node should be visible in viewport
     */
    shouldRender(cameraX, cameraY, viewportWidth, viewportHeight, zoom) {
      const padding = 100; // Extra padding for off-screen rendering
      const halfW = viewportWidth / (2 * zoom);
      const halfH = viewportHeight / (2 * zoom);

      return !(
        this.x + this.size + padding < cameraX - halfW ||
        this.y + this.size + padding < cameraY - halfH ||
        this.x - this.size - padding > cameraX + halfW ||
        this.y - this.size - padding > cameraY + halfH
      );
    }

    /**
     * Get mass from size
     */
    getMass() {
      return Math.floor((this.size * this.size) / 100);
    }

    /**
     * Check if node is stale (not updated recently)
     */
    isStale(timeout = 30000) {
      return Date.now() - this.lastSeenTime > timeout;
    }

    /**
     * Mark node for destruction
     */
    destroy() {
      this.destroyed = true;
    }

    /**
     * Create a copy of this node
     */
    clone() {
      return new Node({
        id: this.id,
        botId: this.botId,
        x: this.x,
        y: this.y,
        size: this.size,
        color: this.color,
        name: this.name,
        skin: this.skin,
        isVirus: this.isVirus,
        isAgitated: this.isAgitated,
        isEjected: this.isEjected,
        isPlayer: this.isPlayer,
      });
    }

    /**
     * Generate smooth blob points for rendering
     */
    generatePoints(numPoints) {
      if (this.points.length !== numPoints) {
        this.points = [];
        this.pointsAcc = [];

        for (let i = 0; i < numPoints; i++) {
          this.points.push({
            x: this.x,
            y: this.y,
            size: this.size,
          });
          this.pointsAcc.push(Math.random() - 0.5);
        }
      }
    }

    /**
     * Update blob points for smooth rendering
     */
    updatePoints(timestamp) {
      const numPoints = this.points.length;
      if (numPoints === 0) return;

      // Update point accelerations
      for (let i = 0; i < numPoints; i++) {
        const prev = this.pointsAcc[(i - 1 + numPoints) % numPoints];
        const next = this.pointsAcc[(i + 1) % numPoints];

        this.pointsAcc[i] += (Math.random() - 0.5) * (this.isAgitated ? 3 : 1);
        this.pointsAcc[i] *= 0.7;
        this.pointsAcc[i] = Math.max(-10, Math.min(10, this.pointsAcc[i]));
        this.pointsAcc[i] = (prev + next + 8 * this.pointsAcc[i]) / 10;
      }

      // Update point positions
      const angleStep = (Math.PI * 2) / numPoints;
      const rotation = this.isVirus ? 0 : (this.id / 1000 + timestamp / 10000) % (Math.PI * 2);

      for (let i = 0; i < numPoints; i++) {
        const pointSize = this.size + this.pointsAcc[i];
        const angle = angleStep * i + rotation;

        this.points[i].x = this.x + Math.cos(angle) * pointSize;
        this.points[i].y = this.y + Math.sin(angle) * pointSize;
        this.points[i].size = pointSize;
      }
    }

    /**
     * Convert to string for debugging
     */
    toString() {
      return `Node[${this.id}] ${this.name} @ (${Math.floor(this.x)}, ${Math.floor(this.y)}) size=${Math.floor(this.size)}`;
    }
  }

  /**
   * Configuration settings for the spectate system
   */

  const Config = {
    // Bot settings
    bots: {
      count: 3,                    // Number of spectate bots
      reconnectDelay: 2000,        // Reconnect delay in ms
      initialDelay: 300,           // Delay between bot spawns
      freeRoamDelay: 200,          // Delay before free roam
    },

    // reCAPTCHA settings
    recaptcha: {
      siteKey: '6LcnrKQUAAAAADohV5Cksikz89WSP-ZPHNA7ViZm',
    },

    // Network settings
    network: {
      protocols: ['protocol1', 'protocol2'],
      binaryType: 'arraybuffer',
      pingInterval: 5000,
    },

    // Node management
    nodes: {
      useIdPrefix: true,           // Prefix node IDs with bot ID
      maxNodes: 10000,             // Maximum nodes to track
      cleanupInterval: 5000,       // Cleanup old nodes every 5s
      nodeTimeout: 30000,          // Remove nodes not updated for 30s
    },

    // Rendering
    render: {
      smoothing: 0.4,
      transparentCells: false,
      showSkins: true,
      showNames: true,
      showMass: false,
      darkTheme: true,
      showGrid: true,
      gridSize: 50,
    },

    // Debug
    debug: {
      enabled: true,
      logPackets: false,
      logNodes: false,
      logBots: true,
      showStats: true,
    },
  };

  /**
   * NodeManager - Manages all nodes from multiple bots
   * Handles ID collision by prefixing node IDs with bot ID
   */


  class NodeManager {
    constructor() {
      this.nodes = new Map(); // All nodes: Map<prefixedId, Node>
      this.playerNodes = new Set(); // Player-owned node IDs
      this.cleanupInterval = null;

      // Statistics
      this.stats = {
        totalNodes: 0,
        playerNodes: 0,
        botNodes: 0,
        lastUpdate: Date.now(),
      };

      // Start cleanup timer
      this.startCleanup();
    }

    /**
     * Generate prefixed node ID
     * Prevents ID collision between bots
     */
    getPrefixedId(nodeId, botId) {
      if (!botId) {
        return nodeId;
      }
      return `${botId}_${nodeId}`;
    }

    /**
     * Add or update node from bot
     */
    addOrUpdateNode(nodeData, botId = null) {
      const prefixedId = this.getPrefixedId(nodeData.id, botId);

      if (this.nodes.has(prefixedId)) {
        // Update existing node
        const node = this.nodes.get(prefixedId);
        node.update(nodeData);
      } else {
        // Create new node
        const node = new Node({
          ...nodeData,
          id: prefixedId,
          botId,
        });
        this.nodes.set(prefixedId, node);
      }

      this.updateStats();
    }

    /**
     * Add multiple nodes from a bot
     */
    addOrUpdateNodes(nodeDataArray, botId = null) {
      for (const nodeData of nodeDataArray) {
        this.addOrUpdateNode(nodeData, botId);
      }
    }

    /**
     * Remove node
     */
    removeNode(nodeId, botId = null) {
      const prefixedId = this.getPrefixedId(nodeId, botId);
      const node = this.nodes.get(prefixedId);

      if (node) {
        node.destroy();
        this.nodes.delete(prefixedId);
        this.playerNodes.delete(prefixedId);
      }

      this.updateStats();
    }

    /**
     * Remove multiple nodes
     */
    removeNodes(nodeIds, botId = null) {
      for (const nodeId of nodeIds) {
        this.removeNode(nodeId, botId);
      }
    }

    /**
     * Mark node as player-owned
     */
    addPlayerNode(nodeId, botId = null) {
      const prefixedId = this.getPrefixedId(nodeId, botId);
      this.playerNodes.add(prefixedId);

      const node = this.nodes.get(prefixedId);
      if (node) {
        node.isPlayer = true;
      }
    }

    /**
     * Clear all nodes from a specific bot
     */
    clearBotNodes(botId) {
      for (const [id, node] of this.nodes.entries()) {
        if (node.botId === botId) {
          this.nodes.delete(id);
        }
      }
      this.updateStats();
    }

    /**
     * Clear all nodes
     */
    clearAllNodes() {
      this.nodes.clear();
      this.playerNodes.clear();
      this.updateStats();
    }

    /**
     * Get node by ID
     */
    getNode(nodeId, botId = null) {
      const prefixedId = this.getPrefixedId(nodeId, botId);
      return this.nodes.get(prefixedId);
    }

    /**
     * Get all nodes
     */
    getAllNodes() {
      return Array.from(this.nodes.values());
    }

    /**
     * Get nodes from specific bot
     */
    getBotNodes(botId) {
      return this.getAllNodes().filter(node => node.botId === botId);
    }

    /**
     * Get player nodes
     */
    getPlayerNodes() {
      return Array.from(this.playerNodes)
        .map(id => this.nodes.get(id))
        .filter(node => node !== undefined);
    }

    /**
     * Get visible nodes for rendering
     */
    getVisibleNodes(cameraX, cameraY, viewportWidth, viewportHeight, zoom) {
      const visible = [];

      for (const node of this.nodes.values()) {
        if (node.shouldRender(cameraX, cameraY, viewportWidth, viewportHeight, zoom)) {
          visible.push(node);
        }
      }

      // Sort by size (smaller cells first, for rendering order)
      return visible.sort((a, b) => a.size - b.size);
    }

    /**
     * Interpolate all nodes (for smooth animation)
     */
    interpolateAll(timestamp) {
      for (const node of this.nodes.values()) {
        node.interpolate(timestamp);
      }
    }

    /**
     * Handle node destruction queue
     */
    handleDestroyQueue(destroyQueue, botId = null) {
      for (const { killerId, killedId } of destroyQueue) {
        const killedPrefixedId = this.getPrefixedId(killedId, botId);
        const killedNode = this.nodes.get(killedPrefixedId);

        if (killedNode) {
          // Animate destruction (move to killer)
          const killerPrefixedId = this.getPrefixedId(killerId, botId);
          const killerNode = this.nodes.get(killerPrefixedId);

          if (killerNode) {
            killedNode.ox = killedNode.x;
            killedNode.oy = killedNode.y;
            killedNode.nx = killerNode.x;
            killedNode.ny = killerNode.y;
            killedNode.nSize = killedNode.size;
            killedNode.updateTime = Date.now();
          }

          killedNode.destroy();
        }
      }
    }

    /**
     * Clean up stale nodes
     */
    cleanup() {
      const staleNodes = [];

      for (const [id, node] of this.nodes.entries()) {
        if (node.isStale(Config.nodes.nodeTimeout)) {
          staleNodes.push(id);
        }
      }

      for (const id of staleNodes) {
        this.nodes.delete(id);
        this.playerNodes.delete(id);
      }

      if (staleNodes.length > 0 && Config.debug.enabled) {
        console.log(`[NodeManager] Cleaned up ${staleNodes.length} stale nodes`);
      }

      this.updateStats();
    }

    /**
     * Start automatic cleanup
     */
    startCleanup() {
      if (this.cleanupInterval) {
        clearInterval(this.cleanupInterval);
      }

      this.cleanupInterval = setInterval(() => {
        this.cleanup();
      }, Config.nodes.cleanupInterval);
    }

    /**
     * Stop automatic cleanup
     */
    stopCleanup() {
      if (this.cleanupInterval) {
        clearInterval(this.cleanupInterval);
        this.cleanupInterval = null;
      }
    }

    /**
     * Update statistics
     */
    updateStats() {
      this.stats.totalNodes = this.nodes.size;
      this.stats.playerNodes = this.playerNodes.size;
      this.stats.botNodes = this.stats.totalNodes - this.stats.playerNodes;
      this.stats.lastUpdate = Date.now();
    }

    /**
     * Get statistics
     */
    getStats() {
      return { ...this.stats };
    }

    /**
     * Get node count by bot
     */
    getBotStats() {
      const botStats = new Map();

      for (const node of this.nodes.values()) {
        const botId = node.botId || 'main';
        botStats.set(botId, (botStats.get(botId) || 0) + 1);
      }

      return Object.fromEntries(botStats);
    }

    /**
     * Destroy manager
     */
    destroy() {
      this.stopCleanup();
      this.clearAllNodes();
    }

    /**
     * Debug info
     */
    toString() {
      return `NodeManager[total=${this.stats.totalNodes}, player=${this.stats.playerNodes}, bot=${this.stats.botNodes}]`;
    }
  }

  /**
   * Agar.io Protocol Constants
   * Based on protocol documentation
   */

  // Client -> Server OpCodes
  const ClientOpCode = {
    SET_NICKNAME: 0,      // Spawn player with nickname
    SPECTATE: 1,          // Enter spectate mode
    MOUSE_MOVE: 16,       // Mouse position update
    SPLIT: 17,            // Split cell
    Q_PRESSED: 18,        // Free roam spectate (Q pressed)
    Q_RELEASED: 19,       // Q released
    EJECT_MASS: 21,       // Eject mass (W key)
    CHAT_MESSAGE: 99,     // Send chat message (unofficial)
    CAPTCHA: 35,          // reCAPTCHA verification
    RESET_1: 254,         // Connection reset 1
    RESET_2: 255,         // Connection reset 2
  };

  // Server -> Client OpCodes
  const ServerOpCode = {
    UPDATE_NODES: 16,     // Update node data
    UPDATE_POSITION: 17,  // Update camera position (spectate)
    CLEAR_NODES: 18,      // Clear all nodes (protocol 4+)
    CLEAR_MY_NODES: 20,   // Clear player nodes
    DRAW_LINE: 21,        // Draw split line
    ADD_NODE: 32,         // Add node (owned cell)
    UPDATE_LB_FFA: 49,    // Update FFA leaderboard
    UPDATE_LB_TEAM: 50,   // Update Team leaderboard
    SET_BORDER: 64,       // Set map borders
    CHAT_MESSAGE: 99,     // Chat message (unofficial)
    COMPRESSED: 240,      // Compressed packet (LZ4)
  };

  // Node Flags (bitfield)
  const NodeFlags = {
    IS_VIRUS: 1,          // 0x01 - Node is a virus
    HAS_COLOR: 2,         // 0x02 - Color data present
    HAS_SKIN: 4,          // 0x04 - Skin data present
    HAS_NAME: 8,          // 0x08 - Name data present
    IS_AGITATED: 16,      // 0x10 - Agitated virus
    IS_EJECTED: 32,       // 0x20 - Ejected mass
  };

  // Data type sizes (in bytes)
  const DataSize = {
    UINT8: 1,
    UINT16: 2,
    UINT32: 4,
    INT16: 2,
    INT32: 4,
    FLOAT32: 4,
    FLOAT64: 8,
  };

  /**
   * PacketParser - Parses binary packets from the server
   */


  class PacketParser {
    constructor() {
      this.offset = 0;
      this.dataView = null;
    }

    /**
     * Parse incoming packet
     * @param {ArrayBuffer} data - Raw packet data
     * @returns {Object} Parsed packet
     */
    parse(data) {
      this.dataView = new DataView(data);
      this.offset = 0;

      // Check for compression header (240)
      if (this.dataView.getUint8(0) === ServerOpCode.COMPRESSED) {
        this.offset += 5;
      }

      const opCode = this.readUint8();

      switch (opCode) {
        case ServerOpCode.UPDATE_NODES:
          return this.parseUpdateNodes();
        case ServerOpCode.UPDATE_POSITION:
          return this.parseUpdatePosition();
        case ServerOpCode.CLEAR_NODES:
          return { type: 'clearNodes' };
        case ServerOpCode.CLEAR_MY_NODES:
          return { type: 'clearMyNodes' };
        case ServerOpCode.DRAW_LINE:
          return this.parseDrawLine();
        case ServerOpCode.ADD_NODE:
          return this.parseAddNode();
        case ServerOpCode.UPDATE_LB_FFA:
          return this.parseLeaderboardFFA();
        case ServerOpCode.UPDATE_LB_TEAM:
          return this.parseLeaderboardTeam();
        case ServerOpCode.SET_BORDER:
          return this.parseSetBorder();
        case ServerOpCode.CHAT_MESSAGE:
          return this.parseChatMessage();
        default:
          return { type: 'unknown', opCode };
      }
    }

    /**
     * Parse UPDATE_NODES packet (OpCode 16)
     * Most important packet - contains all node data
     */
    parseUpdateNodes() {
      const nodes = [];
      const destroyQueue = [];

      // Read destroy queue
      const destroyCount = this.readUint16();
      for (let i = 0; i < destroyCount; i++) {
        const killerId = this.readUint32();
        const killedId = this.readUint32();
        destroyQueue.push({ killerId, killedId });
      }

      // Read node data
      while (true) {
        const nodeId = this.readUint32();
        if (nodeId === 0) break; // End of nodes

        const node = this.parseNodeData(nodeId);
        nodes.push(node);
      }

      // Skip terminator
      this.readUint32(); // Always 0

      // Read final destroy list
      const finalDestroyCount = this.readUint16();
      const finalDestroy = [];
      for (let i = 0; i < finalDestroyCount; i++) {
        finalDestroy.push(this.readUint32());
      }

      return {
        type: 'updateNodes',
        nodes,
        destroyQueue,
        finalDestroy,
      };
    }

    /**
     * Parse single node data
     */
    parseNodeData(nodeId) {
      const x = this.readInt32();
      const y = this.readInt32();
      const size = this.readUint16();
      const flags = this.readUint8();

      const node = {
        id: nodeId,
        x,
        y,
        size,
        isVirus: !!(flags & NodeFlags.IS_VIRUS),
        isAgitated: !!(flags & NodeFlags.IS_AGITATED),
        isEjected: !!(flags & NodeFlags.IS_EJECTED),
      };

      // Color (if flag set)
      if (flags & NodeFlags.HAS_COLOR) {
        node.color = this.readColor();
      }

      // Skin (if flag set)
      if (flags & NodeFlags.HAS_SKIN) {
        node.skin = this.readString();
      }

      // Name (if flag set)
      if (flags & NodeFlags.HAS_NAME) {
        node.name = this.readString();
      }

      return node;
    }

    /**
     * Parse UPDATE_POSITION packet (OpCode 17)
     * Used for spectating
     */
    parseUpdatePosition() {
      return {
        type: 'updatePosition',
        x: this.readFloat32(),
        y: this.readFloat32(),
        zoom: this.readFloat32(),
      };
    }

    /**
     * Parse DRAW_LINE packet (OpCode 21)
     */
    parseDrawLine() {
      return {
        type: 'drawLine',
        x: this.readInt16(),
        y: this.readInt16(),
      };
    }

    /**
     * Parse ADD_NODE packet (OpCode 32)
     */
    parseAddNode() {
      return {
        type: 'addNode',
        nodeId: this.readUint32(),
      };
    }

    /**
     * Parse LEADERBOARD_FFA packet (OpCode 49)
     */
    parseLeaderboardFFA() {
      const count = this.readUint32();
      const players = [];

      for (let i = 0; i < count && i < 10; i++) {
        const nodeId = this.readUint32();
        const name = this.readString();
        players.push({ nodeId, name });
      }

      return {
        type: 'leaderboardFFA',
        players,
      };
    }

    /**
     * Parse LEADERBOARD_TEAM packet (OpCode 50)
     */
    parseLeaderboardTeam() {
      const teamCount = this.readUint32();
      const scores = [];

      for (let i = 0; i < teamCount; i++) {
        scores.push(this.readFloat32());
      }

      return {
        type: 'leaderboardTeam',
        scores,
      };
    }

    /**
     * Parse SET_BORDER packet (OpCode 64)
     */
    parseSetBorder() {
      return {
        type: 'setBorder',
        left: this.readFloat64(),
        top: this.readFloat64(),
        right: this.readFloat64(),
        bottom: this.readFloat64(),
      };
    }

    /**
     * Parse CHAT_MESSAGE packet (OpCode 99)
     */
    parseChatMessage() {
      const flags = this.readUint8();
      const color = this.readColor();
      const name = this.readString();
      const message = this.readString();

      return {
        type: 'chatMessage',
        flags,
        color,
        name,
        message,
      };
    }

    // ========== Data Type Readers ==========

    readUint8() {
      const value = this.dataView.getUint8(this.offset);
      this.offset += DataSize.UINT8;
      return value;
    }

    readUint16() {
      const value = this.dataView.getUint16(this.offset, true); // little-endian
      this.offset += DataSize.UINT16;
      return value;
    }

    readUint32() {
      const value = this.dataView.getUint32(this.offset, true);
      this.offset += DataSize.UINT32;
      return value;
    }

    readInt16() {
      const value = this.dataView.getInt16(this.offset, true);
      this.offset += DataSize.INT16;
      return value;
    }

    readInt32() {
      const value = this.dataView.getInt32(this.offset, true);
      this.offset += DataSize.INT32;
      return value;
    }

    readFloat32() {
      const value = this.dataView.getFloat32(this.offset, true);
      this.offset += DataSize.FLOAT32;
      return value;
    }

    readFloat64() {
      const value = this.dataView.getFloat64(this.offset, true);
      this.offset += DataSize.FLOAT64;
      return value;
    }

    /**
     * Read null-terminated UTF-8 string
     */
    readString() {
      let str = '';
      while (this.offset < this.dataView.byteLength) {
        const char = this.dataView.getUint8(this.offset);
        this.offset++;

        if (char === 0) break; // Null terminator
        str += String.fromCharCode(char);
      }
      return str;
    }

    /**
     * Read RGB color
     */
    readColor() {
      const r = this.readUint8();
      const g = this.readUint8();
      const b = this.readUint8();
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  /**
   * PacketBuilder - Builds binary packets to send to server
   */


  class PacketBuilder {
    /**
     * Create a DataView buffer
     */
    static createBuffer(size) {
      return new DataView(new ArrayBuffer(size));
    }

    /**
     * Write string to DataView
     */
    static writeString(dataView, offset, str) {
      for (let i = 0; i < str.length; i++) {
        dataView.setUint8(offset + i, str.charCodeAt(i));
      }
      dataView.setUint8(offset + str.length, 0); // Null terminator
      return offset + str.length + 1;
    }

    /**
     * SET_NICKNAME packet (OpCode 0)
     * Spawns player with nickname
     */
    static setNickname(nickname) {
      const buffer = this.createBuffer(1 + nickname.length + 1);
      buffer.setUint8(0, ClientOpCode.SET_NICKNAME);
      this.writeString(buffer, 1, nickname);
      return buffer.buffer;
    }

    /**
     * SPECTATE packet (OpCode 1)
     * Enter spectate mode
     */
    static spectate() {
      const buffer = this.createBuffer(1);
      buffer.setUint8(0, ClientOpCode.SPECTATE);
      return buffer.buffer;
    }

    /**
     * MOUSE_MOVE packet (OpCode 16)
     * Send mouse position
     */
    static mouseMove(x, y, nodeId = 0) {
      const buffer = this.createBuffer(21);
      buffer.setUint8(0, ClientOpCode.MOUSE_MOVE);
      buffer.setFloat64(1, x, true);
      buffer.setFloat64(9, y, true);
      buffer.setUint32(17, nodeId, true);
      return buffer.buffer;
    }

    /**
     * SPLIT packet (OpCode 17)
     * Split player cell
     */
    static split() {
      const buffer = this.createBuffer(1);
      buffer.setUint8(0, ClientOpCode.SPLIT);
      return buffer.buffer;
    }

    /**
     * Q_PRESSED packet (OpCode 18)
     * Enable free roam spectate mode
     */
    static qPressed() {
      const buffer = this.createBuffer(1);
      buffer.setUint8(0, ClientOpCode.Q_PRESSED);
      return buffer.buffer;
    }

    /**
     * Q_RELEASED packet (OpCode 19)
     * Disable free roam spectate mode
     */
    static qReleased() {
      const buffer = this.createBuffer(1);
      buffer.setUint8(0, ClientOpCode.Q_RELEASED);
      return buffer.buffer;
    }

    /**
     * EJECT_MASS packet (OpCode 21)
     * Eject mass from cell
     */
    static ejectMass() {
      const buffer = this.createBuffer(1);
      buffer.setUint8(0, ClientOpCode.EJECT_MASS);
      return buffer.buffer;
    }

    /**
     * CAPTCHA packet (OpCode 35)
     * Send reCAPTCHA token
     */
    static captcha(token) {
      const buffer = this.createBuffer(1 + token.length * 2 + 2);
      buffer.setUint8(0, ClientOpCode.CAPTCHA);

      let offset = 1;
      for (let i = 0; i < token.length; i++) {
        buffer.setUint16(offset, token.charCodeAt(i), true);
        offset += 2;
      }

      return buffer.buffer;
    }

    /**
     * CHAT_MESSAGE packet (OpCode 99)
     * Send chat message
     */
    static chatMessage(message, isClan = false) {
      const buffer = this.createBuffer(2 + message.length + 1);
      buffer.setUint8(0, ClientOpCode.CHAT_MESSAGE);
      buffer.setUint8(1, isClan ? 1 : 0); // Flags
      this.writeString(buffer, 2, message);
      return buffer.buffer;
    }

    /**
     * RESET_1 packet (OpCode 254)
     * Connection reset packet 1
     */
    static reset1(protocolVersion = 5) {
      const buffer = this.createBuffer(5);
      buffer.setUint8(0, ClientOpCode.RESET_1);
      buffer.setUint32(1, protocolVersion, true);
      return buffer.buffer;
    }

    /**
     * RESET_2 packet (OpCode 255)
     * Connection reset packet 2
     */
    static reset2(magicNumber = 1332175218) {
      const buffer = this.createBuffer(5);
      buffer.setUint8(0, ClientOpCode.RESET_2);
      buffer.setUint32(1, magicNumber, true);
      return buffer.buffer;
    }

    /**
     * Generic single uint8 packet
     */
    static singleUint8(opCode) {
      const buffer = this.createBuffer(1);
      buffer.setUint8(0, opCode);
      return buffer.buffer;
    }
  }

  /**
   * SpectateBot - A bot that spectates the game and collects node data
   */


  class SpectateBot {
    constructor(botId, serverUrl, nodeManager) {
      this.botId = botId;
      this.serverUrl = serverUrl;
      this.nodeManager = nodeManager;

      // WebSocket
      this.socket = null;
      this.isConnected = false;
      this.isSpectating = false;

      // Parser
      this.parser = new PacketParser();

      // State
      this.position = { x: 0, y: 0 };
      this.reconnectTimeout = null;
      this.lastPacketTime = Date.now();

      // Statistics
      this.stats = {
        packetsReceived: 0,
        nodesReceived: 0,
        reconnects: 0,
        uptime: 0,
        startTime: Date.now(),
      };

      // Event handlers (can be overridden)
      this.onConnect = null;
      this.onDisconnect = null;
      this.onError = null;
      this.onSpectateStart = null;
    }

    /**
     * Connect to server
     */
    connect() {
      if (this.socket) {
        this.disconnect();
      }

      const wsUrl = this.serverUrl.startsWith('wss://')
        ? this.serverUrl
        : `wss://${this.serverUrl}`;

      {
        console.log(`[Bot ${this.botId}] Connecting to ${wsUrl}`);
      }

      try {
        this.socket = new WebSocket(wsUrl, Config.network.protocols);
        this.socket.binaryType = Config.network.binaryType;

        this.socket.onopen = this._onOpen.bind(this);
        this.socket.onmessage = this._onMessage.bind(this);
        this.socket.onerror = this._onError.bind(this);
        this.socket.onclose = this._onClose.bind(this);
      } catch (error) {
        console.error(`[Bot ${this.botId}] Connection error:`, error);
        this._scheduleReconnect();
      }
    }

    /**
     * Disconnect from server
     */
    disconnect() {
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }

      if (this.socket) {
        this.socket.onopen = null;
        this.socket.onmessage = null;
        this.socket.onerror = null;
        this.socket.onclose = null;

        try {
          this.socket.close();
        } catch (error) {
          // Ignore close errors
        }

        this.socket = null;
      }

      this.isConnected = false;
      this.isSpectating = false;

      // Clear bot nodes from NodeManager
      this.nodeManager.clearBotNodes(this.botId);
    }

    /**
     * Send packet to server
     */
    send(packet) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(packet);
        return true;
      }
      return false;
    }

    /**
     * Start spectating
     */
    async startSpectate() {
      if (!this.isConnected) {
        console.warn(`[Bot ${this.botId}] Not connected, cannot spectate`);
        return false;
      }

      // Send spectate packet
      this.send(PacketBuilder.spectate());

      // Wait a bit
      await this._wait(Config.bots.freeRoamDelay);

      // Enable free roam
      this.send(PacketBuilder.qPressed());

      this.isSpectating = true;

      {
        console.log(`[Bot ${this.botId}] Spectating in free roam mode`);
      }

      if (this.onSpectateStart) {
        this.onSpectateStart(this);
      }

      return true;
    }

    /**
     * Move to specific position
     */
    moveTo(x, y) {
      if (this.isSpectating) {
        this.send(PacketBuilder.mouseMove(x, y));
        this.position = { x, y };
      }
    }

    /**
     * WebSocket open handler
     */
    async _onOpen() {
      this.isConnected = true;

      {
        console.log(`[Bot ${this.botId}] Connected`);
      }

      // Send handshake
      this.send(PacketBuilder.reset1(5));
      this.send(PacketBuilder.reset2(1332175218));

      // Wait for reCAPTCHA
      try {
        const token = await this._getCaptchaToken();
        if (token) {
          this.send(PacketBuilder.captcha(token));
        }
      } catch (error) {
        console.error(`[Bot ${this.botId}] Captcha error:`, error);
      }

      // Start spectating after a delay
      await this._wait(500);
      await this.startSpectate();

      if (this.onConnect) {
        this.onConnect(this);
      }
    }

    /**
     * WebSocket message handler
     */
    _onMessage(event) {
      this.lastPacketTime = Date.now();
      this.stats.packetsReceived++;

      try {
        const packet = this.parser.parse(event.data);
        this._handlePacket(packet);
      } catch (error) {
      }
    }

    /**
     * Handle parsed packet
     */
    _handlePacket(packet) {
      switch (packet.type) {
        case 'updateNodes':
          this._handleUpdateNodes(packet);
          break;

        case 'updatePosition':
          this.position = { x: packet.x, y: packet.y };
          break;

        case 'clearNodes':
          this.nodeManager.clearBotNodes(this.botId);
          break;
      }
    }

    /**
     * Handle UPDATE_NODES packet
     */
    _handleUpdateNodes(packet) {
      // Handle destroy queue
      if (packet.destroyQueue && packet.destroyQueue.length > 0) {
        this.nodeManager.handleDestroyQueue(packet.destroyQueue, this.botId);
      }

      // Add/update nodes
      if (packet.nodes && packet.nodes.length > 0) {
        this.nodeManager.addOrUpdateNodes(packet.nodes, this.botId);
        this.stats.nodesReceived += packet.nodes.length;
      }

      // Handle final destroy list
      if (packet.finalDestroy && packet.finalDestroy.length > 0) {
        this.nodeManager.removeNodes(packet.finalDestroy, this.botId);
      }
    }

    /**
     * WebSocket error handler
     */
    _onError(error) {
      {
        console.error(`[Bot ${this.botId}] Socket error:`, error);
      }

      if (this.onError) {
        this.onError(this, error);
      }
    }

    /**
     * WebSocket close handler
     */
    _onClose(event) {
      this.isConnected = false;
      this.isSpectating = false;

      {
        console.log(`[Bot ${this.botId}] Disconnected (code: ${event.code})`);
      }

      // Clear bot nodes
      this.nodeManager.clearBotNodes(this.botId);

      if (this.onDisconnect) {
        this.onDisconnect(this);
      }

      // Reconnect
      this._scheduleReconnect();
    }

    /**
     * Schedule reconnect
     */
    _scheduleReconnect() {
      if (this.reconnectTimeout) return;

      this.stats.reconnects++;

      this.reconnectTimeout = setTimeout(() => {
        this.reconnectTimeout = null;
        this.connect();
      }, Config.bots.reconnectDelay);
    }

    /**
     * Get reCAPTCHA token
     */
    async _getCaptchaToken() {
      if (typeof grecaptcha === 'undefined') {
        return null;
      }

      return new Promise((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(Config.recaptcha.siteKey, { action: 'play_game' })
            .then(resolve)
            .catch(() => resolve(null));
        });
      });
    }

    /**
     * Wait helper
     */
    _wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get statistics
     */
    getStats() {
      return {
        ...this.stats,
        uptime: Date.now() - this.stats.startTime,
        isConnected: this.isConnected,
        isSpectating: this.isSpectating,
        position: { ...this.position },
      };
    }

    /**
     * Destroy bot
     */
    destroy() {
      this.disconnect();
      this.nodeManager = null;
    }

    /**
     * Debug info
     */
    toString() {
      return `SpectateBot[${this.botId}] ${this.isSpectating ? 'SPECTATING' : 'IDLE'} @ (${Math.floor(this.position.x)}, ${Math.floor(this.position.y)})`;
    }
  }

  /**
   * BotManager - Manages multiple spectate bots
   * Coordinates bot positions for optimal map coverage
   */


  class BotManager {
    constructor(nodeManager) {
      this.nodeManager = nodeManager;
      this.bots = new Map(); // Map<botId, SpectateBot>
      this.serverUrl = null;
      this.isActive = false;

      // Map boundaries (updated from game)
      this.mapBounds = {
        left: 0,
        top: 0,
        right: 10000,
        bottom: 10000,
      };

      // Statistics
      this.stats = {
        totalBots: 0,
        connectedBots: 0,
        spectatingBots: 0,
        startTime: null,
      };
    }

    /**
     * Initialize bots and connect to server
     */
    async initialize(serverUrl) {
      if (this.isActive) {
        console.warn('[BotManager] Already active, stopping first');
        this.stop();
      }

      this.serverUrl = serverUrl;
      this.isActive = true;
      this.stats.startTime = Date.now();

      console.log(`[BotManager] Initializing ${Config.bots.count} bots...`);

      // Create and connect bots sequentially
      for (let i = 0; i < Config.bots.count; i++) {
        const botId = `bot${i + 1}`;
        await this._createBot(botId);

        // Wait between bot spawns
        if (i < Config.bots.count - 1) {
          await this._wait(Config.bots.initialDelay);
        }
      }

      console.log(`[BotManager] All bots initialized`);
      this._updateStats();
    }

    /**
     * Create and connect a bot
     */
    async _createBot(botId) {
      const bot = new SpectateBot(botId, this.serverUrl, this.nodeManager);

      // Set event handlers
      bot.onConnect = this._onBotConnect.bind(this);
      bot.onDisconnect = this._onBotDisconnect.bind(this);
      bot.onSpectateStart = this._onBotSpectateStart.bind(this);

      this.bots.set(botId, bot);
      bot.connect();

      this._updateStats();
    }

    /**
     * Stop all bots
     */
    stop() {
      console.log('[BotManager] Stopping all bots...');

      for (const bot of this.bots.values()) {
        bot.destroy();
      }

      this.bots.clear();
      this.isActive = false;
      this._updateStats();
    }

    /**
     * Update map boundaries
     */
    setMapBounds(left, top, right, bottom) {
      this.mapBounds = { left, top, right, bottom };

      // Reposition bots
      this._positionBots();
    }

    /**
     * Position bots strategically across the map
     */
    _positionBots() {
      const bots = Array.from(this.bots.values());
      const count = bots.length;

      if (count === 0) return;

      const { left, top, right, bottom } = this.mapBounds;
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;
      const width = right - left;
      const height = bottom - top;

      // Strategy: Position bots in a circle around the center
      const radius = Math.min(width, height) / 3;

      bots.forEach((bot, index) => {
        const angle = (index / count) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        bot.moveTo(x, y);
      });

      {
        console.log('[BotManager] Repositioned bots');
      }
    }

    /**
     * Get a specific bot
     */
    getBot(botId) {
      return this.bots.get(botId);
    }

    /**
     * Get all bots
     */
    getAllBots() {
      return Array.from(this.bots.values());
    }

    /**
     * Get bot statistics
     */
    getBotStats() {
      const stats = {};

      for (const [botId, bot] of this.bots.entries()) {
        stats[botId] = bot.getStats();
      }

      return stats;
    }

    /**
     * Bot connect handler
     */
    _onBotConnect(bot) {
      {
        console.log(`[BotManager] ${bot.botId} connected`);
      }
      this._updateStats();
    }

    /**
     * Bot disconnect handler
     */
    _onBotDisconnect(bot) {
      {
        console.log(`[BotManager] ${bot.botId} disconnected`);
      }
      this._updateStats();
    }

    /**
     * Bot spectate start handler
     */
    _onBotSpectateStart(bot) {
      {
        console.log(`[BotManager] ${bot.botId} started spectating`);
      }

      // Position bot when it starts spectating
      this._positionBots();
      this._updateStats();
    }

    /**
     * Update statistics
     */
    _updateStats() {
      this.stats.totalBots = this.bots.size;
      this.stats.connectedBots = 0;
      this.stats.spectatingBots = 0;

      for (const bot of this.bots.values()) {
        if (bot.isConnected) this.stats.connectedBots++;
        if (bot.isSpectating) this.stats.spectatingBots++;
      }
    }

    /**
     * Get statistics
     */
    getStats() {
      return {
        ...this.stats,
        uptime: this.stats.startTime ? Date.now() - this.stats.startTime : 0,
        isActive: this.isActive,
        mapBounds: { ...this.mapBounds },
      };
    }

    /**
     * Wait helper
     */
    _wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Destroy manager
     */
    destroy() {
      this.stop();
      this.nodeManager = null;
    }

    /**
     * Debug info
     */
    toString() {
      return `BotManager[bots=${this.stats.totalBots}, connected=${this.stats.connectedBots}, spectating=${this.stats.spectatingBots}]`;
    }
  }

  /**
   * Main Entry Point - Integrates the new spectate system
   */

  // IMMEDIATE LOG - Test if code runs at all
  console.log('[SpectateSystem] ✅ Module loading...');

  console.log('[SpectateSystem] ✅ Imports loaded');

  /**
   * SpectateSystem - Main class that ties everything together
   */
  class SpectateSystem {
    constructor() {
      this.nodeManager = null;
      this.botManager = null;
      this.isInitialized = false;
      this.isActive = false;
    }

    /**
     * Initialize the system
     */
    initialize() {
      if (this.isInitialized) {
        console.warn('[SpectateSystem] Already initialized');
        return;
      }

      console.log('[SpectateSystem] Initializing...');

      // Create managers
      this.nodeManager = new NodeManager();
      this.botManager = new BotManager(this.nodeManager);

      this.isInitialized = true;
      console.log('[SpectateSystem] Initialized successfully');
    }

    /**
     * Start the spectate system
     * @param {string} serverUrl - Server URL (e.g., "ffa1.agariodns.cyou")
     */
    async start(serverUrl) {
      if (!this.isInitialized) {
        this.initialize();
      }

      if (this.isActive) {
        console.warn('[SpectateSystem] Already active');
        return;
      }

      console.log(`[SpectateSystem] Starting with server: ${serverUrl}`);

      // Initialize bots
      await this.botManager.initialize(serverUrl);

      this.isActive = true;
      console.log('[SpectateSystem] Started successfully');
    }

    /**
     * Stop the spectate system
     */
    stop() {
      if (!this.isActive) {
        return;
      }

      console.log('[SpectateSystem] Stopping...');

      if (this.botManager) {
        this.botManager.stop();
      }

      if (this.nodeManager) {
        this.nodeManager.clearAllNodes();
      }

      this.isActive = false;
      console.log('[SpectateSystem] Stopped');
    }

    /**
     * Update map boundaries from game
     */
    setMapBounds(left, top, right, bottom) {
      if (this.botManager) {
        this.botManager.setMapBounds(left, top, right, bottom);
      }
    }

    /**
     * Get all visible nodes for rendering
     */
    getVisibleNodes(cameraX, cameraY, viewportWidth, viewportHeight, zoom) {
      if (!this.nodeManager) {
        return [];
      }

      return this.nodeManager.getVisibleNodes(
        cameraX,
        cameraY,
        viewportWidth,
        viewportHeight,
        zoom
      );
    }

    /**
     * Get all nodes
     */
    getAllNodes() {
      if (!this.nodeManager) {
        return [];
      }

      return this.nodeManager.getAllNodes();
    }

    /**
     * Interpolate nodes (call this in render loop)
     */
    interpolateNodes(timestamp) {
      if (this.nodeManager) {
        this.nodeManager.interpolateAll(timestamp);
      }
    }

    /**
     * Get system statistics
     */
    getStats() {
      return {
        system: {
          initialized: this.isInitialized,
          active: this.isActive,
        },
        nodes: this.nodeManager ? this.nodeManager.getStats() : null,
        bots: this.botManager ? this.botManager.getStats() : null,
        botDetails: this.botManager ? this.botManager.getBotStats() : null,
        nodesByBot: this.nodeManager ? this.nodeManager.getBotStats() : null,
      };
    }

    /**
     * Destroy the system
     */
    destroy() {
      this.stop();

      if (this.botManager) {
        this.botManager.destroy();
        this.botManager = null;
      }

      if (this.nodeManager) {
        this.nodeManager.destroy();
        this.nodeManager = null;
      }

      this.isInitialized = false;
      console.log('[SpectateSystem] Destroyed');
    }
  }

  // ========== Global Integration ==========

  /**
   * Create global instance for easy access
   */
  let spectateSystem = null;

  /**
   * Initialize and expose to window for legacy code compatibility
   */
  function setupSpectateSystem() {
    spectateSystem = new SpectateSystem();
    spectateSystem.initialize();

    // Expose to window for integration with existing code
    window.spectateSystem = spectateSystem;

    // Expose managers for debugging
    {
      window.__debug = {
        spectateSystem,
        nodeManager: spectateSystem.nodeManager,
        botManager: spectateSystem.botManager,
        getStats: () => spectateSystem.getStats(),
      };
    }

    console.log('[SpectateSystem] Global instance created');
    return spectateSystem;
  }

  /**
   * Legacy compatibility: Create window.create function
   * This was the old way to activate the full map feature
   */
  function setupLegacyCompatibility() {
    window.create = async () => {
      if (!spectateSystem) {
        spectateSystem = setupSpectateSystem();
      }

      // Get current server URL from the game
      const serverSelect = document.getElementById('gamemode');
      const serverUrl = serverSelect ? serverSelect.value : 'ffa1.agariodns.cyou';

      console.log('[Legacy] Starting spectate system via window.create()');
      await spectateSystem.start(serverUrl);

      // Show notification
      const button = document.getElementById('createButton');
      if (button) {
        button.disabled = true;
        button.innerText = 'Full Map (Active)';
        button.classList.add('bg-green-500');
      }
    };

    console.log('[SpectateSystem] Legacy compatibility enabled');
  }

  // ========== Auto-initialize when script loads ==========

  // Ensure we're in browser context
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Auto-init - runs when bundle loads
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initializeGlobalSystem();
      });
    } else {
      // DOM already loaded
      initializeGlobalSystem();
    }
  }

  function initializeGlobalSystem() {
    try {
      console.log('[SpectateSystem] Starting initialization...');

      const system = setupSpectateSystem();
      setupLegacyCompatibility();

      // EXPLICITLY expose to window - CRITICAL for userscript!
      window.spectateSystem = system;
      window.__spectateSystem = system; // Backup reference

      console.log('[SpectateSystem] Successfully exposed to window.spectateSystem');
      console.log('[SpectateSystem] Type:', typeof window.spectateSystem);
      console.log('[SpectateSystem] Instance:', window.spectateSystem);
    } catch (error) {
      console.error('[SpectateSystem] Auto-init failed:', error);
      console.error('[SpectateSystem] Stack:', error.stack);
    }
  }

  // No exports - this is a pure side-effect bundle that auto-initializes

})();
console.log("[BUNDLE] ✅ Finished execution"); alert("BUNDLE FINISHED!");
//# sourceMappingURL=bundle.js.map
