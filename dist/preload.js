"use strict";

var _require = require('electron'),
  contextBridge = _require.contextBridge;
contextBridge.exposeInMainWorld('version', {
  node: function node() {
    return process.versions.node;
  },
  chrome: function chrome() {
    return process.versions.chrome;
  },
  electron: function electron() {
    return process.versions.electron;
  }
});