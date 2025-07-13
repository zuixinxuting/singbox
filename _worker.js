var __defProp = Object.defineProperty;
var __name = (target, value) => {
  if (target && typeof target === "object" || typeof target === "function") {
    return __defProp(target, "name", { value, configurable: true });
  }
  return target;
};
var __export = (target, all) => {
  if (!target || (typeof target !== "object" && typeof target !== "function")) {
    return;
  }
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// node_modules/wrangler/node_modules/unenv/dist/runtime/npm/node-fetch.mjs
var fetch = /* @__PURE__ */ __name((...args) => globalThis.fetch(...args), "fetch");
var Headers2 = globalThis.Headers;
var Request = globalThis.Request;
var Response2 = globalThis.Response;
var AbortController = globalThis.AbortController;
var redirectStatus = /* @__PURE__ */ new Set([
  301,
  302,
  303,
  307,
  308
]);
var isRedirect = /* @__PURE__ */ __name((code) => redirectStatus.has(code), "isRedirect");
fetch.Promise = globalThis.Promise;
fetch.isRedirect = isRedirect;
var node_fetch_default = fetch;

// node_modules/yaml/browser/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  Alias: () => Alias,
  CST: () => cst_exports,
  Composer: () => Composer,
  Document: () => Document,
  Lexer: () => Lexer,
  LineCounter: () => LineCounter,
  Pair: () => Pair,
  Parser: () => Parser,
  Scalar: () => Scalar,
  Schema: () => Schema,
  YAMLError: () => YAMLError,
  YAMLMap: () => YAMLMap,
  YAMLParseError: () => YAMLParseError,
  YAMLSeq: () => YAMLSeq,
  YAMLWarning: () => YAMLWarning,
  isAlias: () => isAlias,
  isCollection: () => isCollection,
  isDocument: () => isDocument,
  isMap: () => isMap,
  isNode: () => isNode,
  isPair: () => isPair,
  isScalar: () => isScalar,
  isSeq: () => isSeq,
  parse: () => parse,
  parseAllDocuments: () => parseAllDocuments,
  parseDocument: () => parseDocument,
  stringify: () => stringify3,
  visit: () => visit,
  visitAsync: () => visitAsync
});

// node_modules/yaml/browser/dist/nodes/identity.js
var ALIAS = Symbol.for("yaml.alias");
var DOC = Symbol.for("yaml.document");
var MAP = Symbol.for("yaml.map");
var PAIR = Symbol.for("yaml.pair");
var SCALAR = Symbol.for("yaml.scalar");
var SEQ = Symbol.for("yaml.seq");
var NODE_TYPE = Symbol.for("yaml.node.type");
var isAlias = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS, "isAlias");
var isDocument = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC, "isDocument");
var isMap = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP, "isMap");
var isPair = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR, "isPair");
var isScalar = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR, "isScalar");
var isSeq = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ, "isSeq");
function isCollection(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case MAP:
      case SEQ:
        return true;
    }
  return false;
}
__name(isCollection, "isCollection");
function isNode(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case ALIAS:
      case MAP:
      case SCALAR:
      case SEQ:
        return true;
    }
  return false;
}
__name(isNode, "isNode");
var hasAnchor = /* @__PURE__ */ __name((node) => (isScalar(node) || isCollection(node)) && !!node.anchor, "hasAnchor");

// node_modules/yaml/browser/dist/visit.js
var BREAK = Symbol("break visit");
var SKIP = Symbol("skip children");
var REMOVE = Symbol("remove node");
function visit(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE)
      node.contents = null;
  } else
    visit_(null, node, visitor_, Object.freeze([]));
}
__name(visit, "visit");
visit.BREAK = BREAK;
visit.SKIP = SKIP;
visit.REMOVE = REMOVE;
function visit_(key, node, visitor, path) {
  const ctrl = callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visit_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = visit_(i, node.items[i], visitor, path);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK)
          return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = visit_("key", node.key, visitor, path);
      if (ck === BREAK)
        return BREAK;
      else if (ck === REMOVE)
        node.key = null;
      const cv = visit_("value", node.value, visitor, path);
      if (cv === BREAK)
        return BREAK;
      else if (cv === REMOVE)
        node.value = null;
    }
  }
  return ctrl;
}
__name(visit_, "visit_");
async function visitAsync(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE)
      node.contents = null;
  } else
    await visitAsync_(null, node, visitor_, Object.freeze([]));
}
__name(visitAsync, "visitAsync");
visitAsync.BREAK = BREAK;
visitAsync.SKIP = SKIP;
visitAsync.REMOVE = REMOVE;
async function visitAsync_(key, node, visitor, path) {
  const ctrl = await callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visitAsync_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = await visitAsync_(i, node.items[i], visitor, path);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK)
          return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = await visitAsync_("key", node.key, visitor, path);
      if (ck === BREAK)
        return BREAK;
      else if (ck === REMOVE)
        node.key = null;
      const cv = await visitAsync_("value", node.value, visitor, path);
      if (cv === BREAK)
        return BREAK;
      else if (cv === REMOVE)
        node.value = null;
    }
  }
  return ctrl;
}
__name(visitAsync_, "visitAsync_");
function initVisitor(visitor) {
  if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
    return Object.assign({
      Alias: visitor.Node,
      Map: visitor.Node,
      Scalar: visitor.Node,
      Seq: visitor.Node
    }, visitor.Value && {
      Map: visitor.Value,
      Scalar: visitor.Value,
      Seq: visitor.Value
    }, visitor.Collection && {
      Map: visitor.Collection,
      Seq: visitor.Collection
    }, visitor);
  }
  return visitor;
}
__name(initVisitor, "initVisitor");
function callVisitor(key, node, visitor, path) {
  if (typeof visitor === "function")
    return visitor(key, node, path);
  if (isMap(node))
    return visitor.Map?.(key, node, path);
  if (isSeq(node))
    return visitor.Seq?.(key, node, path);
  if (isPair(node))
    return visitor.Pair?.(key, node, path);
  if (isScalar(node))
    return visitor.Scalar?.(key, node, path);
  if (isAlias(node))
    return visitor.Alias?.(key, node, path);
  return void 0;
}
__name(callVisitor, "callVisitor");
function replaceNode(key, path, node) {
  const parent = path[path.length - 1];
  if (isCollection(parent)) {
    parent.items[key] = node;
  } else if (isPair(parent)) {
    if (key === "key")
      parent.key = node;
    else
      parent.value = node;
  } else if (isDocument(parent)) {
    parent.contents = node;
  } else {
    const pt = isAlias(parent) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${pt} parent`);
  }
}
__name(replaceNode, "replaceNode");

// node_modules/yaml/browser/dist/doc/directives.js
var escapeChars = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
};
var escapeTagName = /* @__PURE__ */ __name((tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]), "escapeTagName");
var Directives = class _Directives {
  static {
    __name(this, "Directives");
  }
  constructor(yaml, tags) {
    this.docStart = null;
    this.docEnd = false;
    this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
    this.tags = Object.assign({}, _Directives.defaultTags, tags);
  }
  clone() {
    const copy = new _Directives(this.yaml, this.tags);
    copy.docStart = this.docStart;
    return copy;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const res = new _Directives(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = true;
        break;
      case "1.2":
        this.atNextDocument = false;
        this.yaml = {
          explicit: _Directives.defaultYaml.explicit,
          version: "1.2"
        };
        this.tags = Object.assign({}, _Directives.defaultTags);
        break;
    }
    return res;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(line, onError) {
    if (this.atNextDocument) {
      this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
      this.tags = Object.assign({}, _Directives.defaultTags);
      this.atNextDocument = false;
    }
    const parts = line.trim().split(/[ \t]+/);
    const name = parts.shift();
    switch (name) {
      case "%TAG": {
        if (parts.length !== 2) {
          onError(0, "%TAG directive should contain exactly two parts");
          if (parts.length < 2)
            return false;
        }
        const [handle, prefix] = parts;
        this.tags[handle] = prefix;
        return true;
      }
      case "%YAML": {
        this.yaml.explicit = true;
        if (parts.length !== 1) {
          onError(0, "%YAML directive should contain exactly one part");
          return false;
        }
        const [version2] = parts;
        if (version2 === "1.1" || version2 === "1.2") {
          this.yaml.version = version2;
          return true;
        } else {
          const isValid = /^\d+\.\d+$/.test(version2);
          onError(6, `Unsupported YAML version ${version2}`, isValid);
          return false;
        }
      }
      default:
        onError(0, `Unknown directive ${name}`, true);
        return false;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(source, onError) {
    if (source === "!")
      return "!";
    if (source[0] !== "!") {
      onError(`Not a valid tag: ${source}`);
      return null;
    }
    if (source[1] === "<") {
      const verbatim = source.slice(2, -1);
      if (verbatim === "!" || verbatim === "!!") {
        onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
        return null;
      }
      if (source[source.length - 1] !== ">")
        onError("Verbatim tags must end with a >");
      return verbatim;
    }
    const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
    if (!suffix)
      onError(`The ${source} tag has no suffix`);
    const prefix = this.tags[handle];
    if (prefix) {
      try {
        return prefix + decodeURIComponent(suffix);
      } catch (error3) {
        onError(String(error3));
        return null;
      }
    }
    if (handle === "!")
      return source;
    onError(`Could not resolve tag: ${source}`);
    return null;
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(tag) {
    for (const [handle, prefix] of Object.entries(this.tags)) {
      if (tag.startsWith(prefix))
        return handle + escapeTagName(tag.substring(prefix.length));
    }
    return tag[0] === "!" ? tag : `!<${tag}>`;
  }
  toString(doc) {
    const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
    const tagEntries = Object.entries(this.tags);
    let tagNames;
    if (doc && tagEntries.length > 0 && isNode(doc.contents)) {
      const tags = {};
      visit(doc.contents, (_key, node) => {
        if (isNode(node) && node.tag)
          tags[node.tag] = true;
      });
      tagNames = Object.keys(tags);
    } else
      tagNames = [];
    for (const [handle, prefix] of tagEntries) {
      if (handle === "!!" && prefix === "tag:yaml.org,2002:")
        continue;
      if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
        lines.push(`%TAG ${handle} ${prefix}`);
    }
    return lines.join("\n");
  }
};
Directives.defaultYaml = { explicit: false, version: "1.2" };
Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };

// node_modules/yaml/browser/dist/doc/anchors.js
function anchorIsValid(anchor) {
  if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
    const sa = JSON.stringify(anchor);
    const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
    throw new Error(msg);
  }
  return true;
}
__name(anchorIsValid, "anchorIsValid");
function anchorNames(root) {
  const anchors = /* @__PURE__ */ new Set();
  visit(root, {
    Value(_key, node) {
      if (node.anchor)
        anchors.add(node.anchor);
    }
  });
  return anchors;
}
__name(anchorNames, "anchorNames");
function findNewAnchor(prefix, exclude) {
  for (let i = 1; true; ++i) {
    const name = `${prefix}${i}`;
    if (!exclude.has(name))
      return name;
  }
}
__name(findNewAnchor, "findNewAnchor");
function createNodeAnchors(doc, prefix) {
  const aliasObjects = [];
  const sourceObjects = /* @__PURE__ */ new Map();
  let prevAnchors = null;
  return {
    onAnchor: /* @__PURE__ */ __name((source) => {
      aliasObjects.push(source);
      prevAnchors ?? (prevAnchors = anchorNames(doc));
      const anchor = findNewAnchor(prefix, prevAnchors);
      prevAnchors.add(anchor);
      return anchor;
    }, "onAnchor"),
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: /* @__PURE__ */ __name(() => {
      for (const source of aliasObjects) {
        const ref = sourceObjects.get(source);
        if (typeof ref === "object" && ref.anchor && (isScalar(ref.node) || isCollection(ref.node))) {
          ref.node.anchor = ref.anchor;
        } else {
          const error3 = new Error("Failed to resolve repeated object (this should not happen)");
          error3.source = source;
          throw error3;
        }
      }
    }, "setAnchors"),
    sourceObjects
  };
}
__name(createNodeAnchors, "createNodeAnchors");

// node_modules/yaml/browser/dist/doc/applyReviver.js
function applyReviver(reviver, obj, key, val) {
  if (val && typeof val === "object") {
    if (Array.isArray(val)) {
      for (let i = 0, len = val.length; i < len; ++i) {
        const v0 = val[i];
        const v1 = applyReviver(reviver, val, String(i), v0);
        if (v1 === void 0)
          delete val[i];
        else if (v1 !== v0)
          val[i] = v1;
      }
    } else if (val instanceof Map) {
      for (const k of Array.from(val.keys())) {
        const v0 = val.get(k);
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0)
          val.delete(k);
        else if (v1 !== v0)
          val.set(k, v1);
      }
    } else if (val instanceof Set) {
      for (const v0 of Array.from(val)) {
        const v1 = applyReviver(reviver, val, v0, v0);
        if (v1 === void 0)
          val.delete(v0);
        else if (v1 !== v0) {
          val.delete(v0);
          val.add(v1);
        }
      }
    } else {
      for (const [k, v0] of Object.entries(val)) {
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0)
          delete val[k];
        else if (v1 !== v0)
          val[k] = v1;
      }
    }
  }
  return reviver.call(obj, key, val);
}
__name(applyReviver, "applyReviver");

// node_modules/yaml/browser/dist/nodes/toJS.js
function toJS(value, arg, ctx) {
  if (Array.isArray(value))
    return value.map((v, i) => toJS(v, String(i), ctx));
  if (value && typeof value.toJSON === "function") {
    if (!ctx || !hasAnchor(value))
      return value.toJSON(arg, ctx);
    const data = { aliasCount: 0, count: 1, res: void 0 };
    ctx.anchors.set(value, data);
    ctx.onCreate = (res2) => {
      data.res = res2;
      delete ctx.onCreate;
    };
    const res = value.toJSON(arg, ctx);
    if (ctx.onCreate)
      ctx.onCreate(res);
    return res;
  }
  if (typeof value === "bigint" && !ctx?.keep)
    return Number(value);
  return value;
}
__name(toJS, "toJS");

// node_modules/yaml/browser/dist/nodes/Node.js
var NodeBase = class {
  static {
    __name(this, "NodeBase");
  }
  constructor(type) {
    Object.defineProperty(this, NODE_TYPE, { value: type });
  }
  /** Create a copy of this node.  */
  clone() {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /** A plain JavaScript representation of this node. */
  toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    if (!isDocument(doc))
      throw new TypeError("A document argument is required");
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc,
      keep: true,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
    };
    const res = toJS(this, "", ctx);
    if (typeof onAnchor === "function")
      for (const { count: count3, res: res2 } of ctx.anchors.values())
        onAnchor(res2, count3);
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
  }
};

// node_modules/yaml/browser/dist/nodes/Alias.js
var Alias = class extends NodeBase {
  static {
    __name(this, "Alias");
  }
  constructor(source) {
    super(ALIAS);
    this.source = source;
    Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(doc, ctx) {
    let nodes;
    if (ctx?.aliasResolveCache) {
      nodes = ctx.aliasResolveCache;
    } else {
      nodes = [];
      visit(doc, {
        Node: /* @__PURE__ */ __name((_key, node) => {
          if (isAlias(node) || hasAnchor(node))
            nodes.push(node);
        }, "Node")
      });
      if (ctx)
        ctx.aliasResolveCache = nodes;
    }
    let found = void 0;
    for (const node of nodes) {
      if (node === this)
        break;
      if (node.anchor === this.source)
        found = node;
    }
    return found;
  }
  toJSON(_arg, ctx) {
    if (!ctx)
      return { source: this.source };
    const { anchors, doc, maxAliasCount } = ctx;
    const source = this.resolve(doc, ctx);
    if (!source) {
      const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(msg);
    }
    let data = anchors.get(source);
    if (!data) {
      toJS(source, null, ctx);
      data = anchors.get(source);
    }
    if (!data || data.res === void 0) {
      const msg = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(msg);
    }
    if (maxAliasCount >= 0) {
      data.count += 1;
      if (data.aliasCount === 0)
        data.aliasCount = getAliasCount(doc, source, anchors);
      if (data.count * data.aliasCount > maxAliasCount) {
        const msg = "Excessive alias count indicates a resource exhaustion attack";
        throw new ReferenceError(msg);
      }
    }
    return data.res;
  }
  toString(ctx, _onComment, _onChompKeep) {
    const src = `*${this.source}`;
    if (ctx) {
      anchorIsValid(this.source);
      if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
        const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(msg);
      }
      if (ctx.implicitKey)
        return `${src} `;
    }
    return src;
  }
};
function getAliasCount(doc, node, anchors) {
  if (isAlias(node)) {
    const source = node.resolve(doc);
    const anchor = anchors && source && anchors.get(source);
    return anchor ? anchor.count * anchor.aliasCount : 0;
  } else if (isCollection(node)) {
    let count3 = 0;
    for (const item of node.items) {
      const c = getAliasCount(doc, item, anchors);
      if (c > count3)
        count3 = c;
    }
    return count3;
  } else if (isPair(node)) {
    const kc = getAliasCount(doc, node.key, anchors);
    const vc = getAliasCount(doc, node.value, anchors);
    return Math.max(kc, vc);
  }
  return 1;
}
__name(getAliasCount, "getAliasCount");

// node_modules/yaml/browser/dist/nodes/Scalar.js
var isScalarValue = /* @__PURE__ */ __name((value) => !value || typeof value !== "function" && typeof value !== "object", "isScalarValue");
var Scalar = class extends NodeBase {
  static {
    __name(this, "Scalar");
  }
  constructor(value) {
    super(SCALAR);
    this.value = value;
  }
  toJSON(arg, ctx) {
    return ctx?.keep ? this.value : toJS(this.value, arg, ctx);
  }
  toString() {
    return String(this.value);
  }
};
Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
Scalar.PLAIN = "PLAIN";
Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";

// node_modules/yaml/browser/dist/doc/createNode.js
var defaultTagPrefix = "tag:yaml.org,2002:";
function findTagObject(value, tagName, tags) {
  if (tagName) {
    const match = tags.filter((t) => t.tag === tagName);
    const tagObj = match.find((t) => !t.format) ?? match[0];
    if (!tagObj)
      throw new Error(`Tag ${tagName} not found`);
    return tagObj;
  }
  return tags.find((t) => t.identify?.(value) && !t.format);
}
__name(findTagObject, "findTagObject");
function createNode(value, tagName, ctx) {
  if (isDocument(value))
    value = value.contents;
  if (isNode(value))
    return value;
  if (isPair(value)) {
    const map2 = ctx.schema[MAP].createNode?.(ctx.schema, null, ctx);
    map2.items.push(value);
    return map2;
  }
  if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
    value = value.valueOf();
  }
  const { aliasDuplicateObjects, onAnchor, onTagObj, schema: schema4, sourceObjects } = ctx;
  let ref = void 0;
  if (aliasDuplicateObjects && value && typeof value === "object") {
    ref = sourceObjects.get(value);
    if (ref) {
      ref.anchor ?? (ref.anchor = onAnchor(value));
      return new Alias(ref.anchor);
    } else {
      ref = { anchor: null, node: null };
      sourceObjects.set(value, ref);
    }
  }
  if (tagName?.startsWith("!!"))
    tagName = defaultTagPrefix + tagName.slice(2);
  let tagObj = findTagObject(value, tagName, schema4.tags);
  if (!tagObj) {
    if (value && typeof value.toJSON === "function") {
      value = value.toJSON();
    }
    if (!value || typeof value !== "object") {
      const node2 = new Scalar(value);
      if (ref)
        ref.node = node2;
      return node2;
    }
    tagObj = value instanceof Map ? schema4[MAP] : Symbol.iterator in Object(value) ? schema4[SEQ] : schema4[MAP];
  }
  if (onTagObj) {
    onTagObj(tagObj);
    delete ctx.onTagObj;
  }
  const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar(value);
  if (tagName)
    node.tag = tagName;
  else if (!tagObj.default)
    node.tag = tagObj.tag;
  if (ref)
    ref.node = node;
  return node;
}
__name(createNode, "createNode");

// node_modules/yaml/browser/dist/nodes/Collection.js
function collectionFromPath(schema4, path, value) {
  let v = value;
  for (let i = path.length - 1; i >= 0; --i) {
    const k = path[i];
    if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
      const a = [];
      a[k] = v;
      v = a;
    } else {
      v = /* @__PURE__ */ new Map([[k, v]]);
    }
  }
  return createNode(v, void 0, {
    aliasDuplicateObjects: false,
    keepUndefined: false,
    onAnchor: /* @__PURE__ */ __name(() => {
      throw new Error("This should not happen, please report a bug.");
    }, "onAnchor"),
    schema: schema4,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
__name(collectionFromPath, "collectionFromPath");
var isEmptyPath = /* @__PURE__ */ __name((path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done, "isEmptyPath");
var Collection = class extends NodeBase {
  static {
    __name(this, "Collection");
  }
  constructor(type, schema4) {
    super(type);
    Object.defineProperty(this, "schema", {
      value: schema4,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(schema4) {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (schema4)
      copy.schema = schema4;
    copy.items = copy.items.map((it) => isNode(it) || isPair(it) ? it.clone(schema4) : it);
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(path, value) {
    if (isEmptyPath(path))
      this.add(value);
    else {
      const [key, ...rest] = path;
      const node = this.get(key, true);
      if (isCollection(node))
        node.addIn(rest, value);
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value));
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0)
      return this.delete(key);
    const node = this.get(key, true);
    if (isCollection(node))
      return node.deleteIn(rest);
    else
      throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    const [key, ...rest] = path;
    const node = this.get(key, true);
    if (rest.length === 0)
      return !keepScalar && isScalar(node) ? node.value : node;
    else
      return isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
  }
  hasAllNullValues(allowScalar) {
    return this.items.every((node) => {
      if (!isPair(node))
        return false;
      const n = node.value;
      return n == null || allowScalar && isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0)
      return this.has(key);
    const node = this.get(key, true);
    return isCollection(node) ? node.hasIn(rest) : false;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    const [key, ...rest] = path;
    if (rest.length === 0) {
      this.set(key, value);
    } else {
      const node = this.get(key, true);
      if (isCollection(node))
        node.setIn(rest, value);
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value));
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyComment.js
var stringifyComment = /* @__PURE__ */ __name((str) => str.replace(/^(?!$)(?: $)?/gm, "#"), "stringifyComment");
function indentComment(comment, indent) {
  if (/^\n+$/.test(comment))
    return comment.substring(1);
  return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
}
__name(indentComment, "indentComment");
var lineComment = /* @__PURE__ */ __name((str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment, "lineComment");

// node_modules/yaml/browser/dist/stringify/foldFlowLines.js
var FOLD_FLOW = "flow";
var FOLD_BLOCK = "block";
var FOLD_QUOTED = "quoted";
function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
  if (!lineWidth || lineWidth < 0)
    return text;
  if (lineWidth < minContentWidth)
    minContentWidth = 0;
  const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
  if (text.length <= endStep)
    return text;
  const folds = [];
  const escapedFolds = {};
  let end = lineWidth - indent.length;
  if (typeof indentAtStart === "number") {
    if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
      folds.push(0);
    else
      end = lineWidth - indentAtStart;
  }
  let split = void 0;
  let prev = void 0;
  let overflow = false;
  let i = -1;
  let escStart = -1;
  let escEnd = -1;
  if (mode === FOLD_BLOCK) {
    i = consumeMoreIndentedLines(text, i, indent.length);
    if (i !== -1)
      end = i + endStep;
  }
  for (let ch; ch = text[i += 1]; ) {
    if (mode === FOLD_QUOTED && ch === "\\") {
      escStart = i;
      switch (text[i + 1]) {
        case "x":
          i += 3;
          break;
        case "u":
          i += 5;
          break;
        case "U":
          i += 9;
          break;
        default:
          i += 1;
      }
      escEnd = i;
    }
    if (ch === "\n") {
      if (mode === FOLD_BLOCK)
        i = consumeMoreIndentedLines(text, i, indent.length);
      end = i + indent.length + endStep;
      split = void 0;
    } else {
      if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
        const next = text[i + 1];
        if (next && next !== " " && next !== "\n" && next !== "	")
          split = i;
      }
      if (i >= end) {
        if (split) {
          folds.push(split);
          end = split + endStep;
          split = void 0;
        } else if (mode === FOLD_QUOTED) {
          while (prev === " " || prev === "	") {
            prev = ch;
            ch = text[i += 1];
            overflow = true;
          }
          const j = i > escEnd + 1 ? i - 2 : escStart - 1;
          if (escapedFolds[j])
            return text;
          folds.push(j);
          escapedFolds[j] = true;
          end = j + endStep;
          split = void 0;
        } else {
          overflow = true;
        }
      }
    }
    prev = ch;
  }
  if (overflow && onOverflow)
    onOverflow();
  if (folds.length === 0)
    return text;
  if (onFold)
    onFold();
  let res = text.slice(0, folds[0]);
  for (let i2 = 0; i2 < folds.length; ++i2) {
    const fold = folds[i2];
    const end2 = folds[i2 + 1] || text.length;
    if (fold === 0)
      res = `
${indent}${text.slice(0, end2)}`;
    else {
      if (mode === FOLD_QUOTED && escapedFolds[fold])
        res += `${text[fold]}\\`;
      res += `
${indent}${text.slice(fold + 1, end2)}`;
    }
  }
  return res;
}
__name(foldFlowLines, "foldFlowLines");
function consumeMoreIndentedLines(text, i, indent) {
  let end = i;
  let start = i + 1;
  let ch = text[start];
  while (ch === " " || ch === "	") {
    if (i < start + indent) {
      ch = text[++i];
    } else {
      do {
        ch = text[++i];
      } while (ch && ch !== "\n");
      end = i;
      start = i + 1;
      ch = text[start];
    }
  }
  return end;
}
__name(consumeMoreIndentedLines, "consumeMoreIndentedLines");

// node_modules/yaml/browser/dist/stringify/stringifyString.js
var getFoldOptions = /* @__PURE__ */ __name((ctx, isBlock2) => ({
  indentAtStart: isBlock2 ? ctx.indent.length : ctx.indentAtStart,
  lineWidth: ctx.options.lineWidth,
  minContentWidth: ctx.options.minContentWidth
}), "getFoldOptions");
var containsDocumentMarker = /* @__PURE__ */ __name((str) => /^(%|---|\.\.\.)/m.test(str), "containsDocumentMarker");
function lineLengthOverLimit(str, lineWidth, indentLength) {
  if (!lineWidth || lineWidth < 0)
    return false;
  const limit = lineWidth - indentLength;
  const strLen = str.length;
  if (strLen <= limit)
    return false;
  for (let i = 0, start = 0; i < strLen; ++i) {
    if (str[i] === "\n") {
      if (i - start > limit)
        return true;
      start = i + 1;
      if (strLen - start <= limit)
        return false;
    }
  }
  return true;
}
__name(lineLengthOverLimit, "lineLengthOverLimit");
function doubleQuotedString(value, ctx) {
  const json = JSON.stringify(value);
  if (ctx.options.doubleQuotedAsJSON)
    return json;
  const { implicitKey } = ctx;
  const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  let str = "";
  let start = 0;
  for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
    if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
      str += json.slice(start, i) + "\\ ";
      i += 1;
      start = i;
      ch = "\\";
    }
    if (ch === "\\")
      switch (json[i + 1]) {
        case "u":
          {
            str += json.slice(start, i);
            const code = json.substr(i + 2, 4);
            switch (code) {
              case "0000":
                str += "\\0";
                break;
              case "0007":
                str += "\\a";
                break;
              case "000b":
                str += "\\v";
                break;
              case "001b":
                str += "\\e";
                break;
              case "0085":
                str += "\\N";
                break;
              case "00a0":
                str += "\\_";
                break;
              case "2028":
                str += "\\L";
                break;
              case "2029":
                str += "\\P";
                break;
              default:
                if (code.substr(0, 2) === "00")
                  str += "\\x" + code.substr(2);
                else
                  str += json.substr(i, 6);
            }
            i += 5;
            start = i + 1;
          }
          break;
        case "n":
          if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
            i += 1;
          } else {
            str += json.slice(start, i) + "\n\n";
            while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
              str += "\n";
              i += 2;
            }
            str += indent;
            if (json[i + 2] === " ")
              str += "\\";
            i += 1;
            start = i + 1;
          }
          break;
        default:
          i += 1;
      }
  }
  str = start ? str + json.slice(start) : json;
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx, false));
}
__name(doubleQuotedString, "doubleQuotedString");
function singleQuotedString(value, ctx) {
  if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
    return doubleQuotedString(value, ctx);
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
  return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
__name(singleQuotedString, "singleQuotedString");
function quotedString(value, ctx) {
  const { singleQuote } = ctx.options;
  let qs;
  if (singleQuote === false)
    qs = doubleQuotedString;
  else {
    const hasDouble = value.includes('"');
    const hasSingle = value.includes("'");
    if (hasDouble && !hasSingle)
      qs = singleQuotedString;
    else if (hasSingle && !hasDouble)
      qs = doubleQuotedString;
    else
      qs = singleQuote ? singleQuotedString : doubleQuotedString;
  }
  return qs(value, ctx);
}
__name(quotedString, "quotedString");
var blockEndNewlines;
try {
  blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
} catch {
  blockEndNewlines = /\n+(?!\n|$)/g;
}
function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
  const { blockQuote, commentString, lineWidth } = ctx.options;
  if (!blockQuote || /\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
    return quotedString(value, ctx);
  }
  const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
  const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.BLOCK_FOLDED ? false : type === Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
  if (!value)
    return literal ? "|\n" : ">\n";
  let chomp;
  let endStart;
  for (endStart = value.length; endStart > 0; --endStart) {
    const ch = value[endStart - 1];
    if (ch !== "\n" && ch !== "	" && ch !== " ")
      break;
  }
  let end = value.substring(endStart);
  const endNlPos = end.indexOf("\n");
  if (endNlPos === -1) {
    chomp = "-";
  } else if (value === end || endNlPos !== end.length - 1) {
    chomp = "+";
    if (onChompKeep)
      onChompKeep();
  } else {
    chomp = "";
  }
  if (end) {
    value = value.slice(0, -end.length);
    if (end[end.length - 1] === "\n")
      end = end.slice(0, -1);
    end = end.replace(blockEndNewlines, `$&${indent}`);
  }
  let startWithSpace = false;
  let startEnd;
  let startNlPos = -1;
  for (startEnd = 0; startEnd < value.length; ++startEnd) {
    const ch = value[startEnd];
    if (ch === " ")
      startWithSpace = true;
    else if (ch === "\n")
      startNlPos = startEnd;
    else
      break;
  }
  let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
  if (start) {
    value = value.substring(start.length);
    start = start.replace(/\n+/g, `$&${indent}`);
  }
  const indentSize = indent ? "2" : "1";
  let header = (startWithSpace ? indentSize : "") + chomp;
  if (comment) {
    header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
    if (onComment)
      onComment();
  }
  if (!literal) {
    const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
    let literalFallback = false;
    const foldOptions = getFoldOptions(ctx, true);
    if (blockQuote !== "folded" && type !== Scalar.BLOCK_FOLDED) {
      foldOptions.onOverflow = () => {
        literalFallback = true;
      };
    }
    const body = foldFlowLines(`${start}${foldedValue}${end}`, indent, FOLD_BLOCK, foldOptions);
    if (!literalFallback)
      return `>${header}
${indent}${body}`;
  }
  value = value.replace(/\n+/g, `$&${indent}`);
  return `|${header}
${indent}${start}${value}${end}`;
}
__name(blockString, "blockString");
function plainString(item, ctx, onComment, onChompKeep) {
  const { type, value } = item;
  const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
  if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
    return quotedString(value, ctx);
  }
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
    return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
  }
  if (!implicitKey && !inFlow && type !== Scalar.PLAIN && value.includes("\n")) {
    return blockString(item, ctx, onComment, onChompKeep);
  }
  if (containsDocumentMarker(value)) {
    if (indent === "") {
      ctx.forceBlockIndent = true;
      return blockString(item, ctx, onComment, onChompKeep);
    } else if (implicitKey && indent === indentStep) {
      return quotedString(value, ctx);
    }
  }
  const str = value.replace(/\n+/g, `$&
${indent}`);
  if (actualString) {
    const test = /* @__PURE__ */ __name((tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str), "test");
    const { compat, tags } = ctx.doc.schema;
    if (tags.some(test) || compat?.some(test))
      return quotedString(value, ctx);
  }
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
__name(plainString, "plainString");
function stringifyString(item, ctx, onComment, onChompKeep) {
  const { implicitKey, inFlow } = ctx;
  const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
  let { type } = item;
  if (type !== Scalar.QUOTE_DOUBLE) {
    if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
      type = Scalar.QUOTE_DOUBLE;
  }
  const _stringify = /* @__PURE__ */ __name((_type) => {
    switch (_type) {
      case Scalar.BLOCK_FOLDED:
      case Scalar.BLOCK_LITERAL:
        return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
      case Scalar.QUOTE_DOUBLE:
        return doubleQuotedString(ss.value, ctx);
      case Scalar.QUOTE_SINGLE:
        return singleQuotedString(ss.value, ctx);
      case Scalar.PLAIN:
        return plainString(ss, ctx, onComment, onChompKeep);
      default:
        return null;
    }
  }, "_stringify");
  let res = _stringify(type);
  if (res === null) {
    const { defaultKeyType, defaultStringType } = ctx.options;
    const t = implicitKey && defaultKeyType || defaultStringType;
    res = _stringify(t);
    if (res === null)
      throw new Error(`Unsupported default string type ${t}`);
  }
  return res;
}
__name(stringifyString, "stringifyString");

// node_modules/yaml/browser/dist/stringify/stringify.js
function createStringifyContext(doc, options) {
  const opt = Object.assign({
    blockQuote: true,
    commentString: stringifyComment,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: false,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: true,
    indentSeq: true,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: false,
    singleQuote: null,
    trueStr: "true",
    verifyAliasOrder: true
  }, doc.schema.toStringOptions, options);
  let inFlow;
  switch (opt.collectionStyle) {
    case "block":
      inFlow = false;
      break;
    case "flow":
      inFlow = true;
      break;
    default:
      inFlow = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc,
    flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
    inFlow,
    options: opt
  };
}
__name(createStringifyContext, "createStringifyContext");
function getTagObject(tags, item) {
  if (item.tag) {
    const match = tags.filter((t) => t.tag === item.tag);
    if (match.length > 0)
      return match.find((t) => t.format === item.format) ?? match[0];
  }
  let tagObj = void 0;
  let obj;
  if (isScalar(item)) {
    obj = item.value;
    let match = tags.filter((t) => t.identify?.(obj));
    if (match.length > 1) {
      const testMatch = match.filter((t) => t.test);
      if (testMatch.length > 0)
        match = testMatch;
    }
    tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
  } else {
    obj = item;
    tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
  }
  if (!tagObj) {
    const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
    throw new Error(`Tag not resolved for ${name} value`);
  }
  return tagObj;
}
__name(getTagObject, "getTagObject");
function stringifyProps(node, tagObj, { anchors, doc }) {
  if (!doc.directives)
    return "";
  const props = [];
  const anchor = (isScalar(node) || isCollection(node)) && node.anchor;
  if (anchor && anchorIsValid(anchor)) {
    anchors.add(anchor);
    props.push(`&${anchor}`);
  }
  const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
  if (tag)
    props.push(doc.directives.tagString(tag));
  return props.join(" ");
}
__name(stringifyProps, "stringifyProps");
function stringify(item, ctx, onComment, onChompKeep) {
  if (isPair(item))
    return item.toString(ctx, onComment, onChompKeep);
  if (isAlias(item)) {
    if (ctx.doc.directives)
      return item.toString(ctx);
    if (ctx.resolvedAliases?.has(item)) {
      throw new TypeError(`Cannot stringify circular structure without alias nodes`);
    } else {
      if (ctx.resolvedAliases)
        ctx.resolvedAliases.add(item);
      else
        ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
      item = item.resolve(ctx.doc);
    }
  }
  let tagObj = void 0;
  const node = isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: /* @__PURE__ */ __name((o) => tagObj = o, "onTagObj") });
  tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
  const props = stringifyProps(node, tagObj, ctx);
  if (props.length > 0)
    ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
  const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : isScalar(node) ? stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
  if (!props)
    return str;
  return isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
}
__name(stringify, "stringify");

// node_modules/yaml/browser/dist/stringify/stringifyPair.js
function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
  const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
  let keyComment = isNode(key) && key.comment || null;
  if (simpleKeys) {
    if (keyComment) {
      throw new Error("With simple keys, key nodes cannot have comments");
    }
    if (isCollection(key) || !isNode(key) && typeof key === "object") {
      const msg = "With simple keys, collection cannot be used as a key value";
      throw new Error(msg);
    }
  }
  let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || isCollection(key) || (isScalar(key) ? key.type === Scalar.BLOCK_FOLDED || key.type === Scalar.BLOCK_LITERAL : typeof key === "object"));
  ctx = Object.assign({}, ctx, {
    allNullValues: false,
    implicitKey: !explicitKey && (simpleKeys || !allNullValues),
    indent: indent + indentStep
  });
  let keyCommentDone = false;
  let chompKeep = false;
  let str = stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
  if (!explicitKey && !ctx.inFlow && str.length > 1024) {
    if (simpleKeys)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    explicitKey = true;
  }
  if (ctx.inFlow) {
    if (allNullValues || value == null) {
      if (keyCommentDone && onComment)
        onComment();
      return str === "" ? "?" : explicitKey ? `? ${str}` : str;
    }
  } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
    str = `? ${str}`;
    if (keyComment && !keyCommentDone) {
      str += lineComment(str, ctx.indent, commentString(keyComment));
    } else if (chompKeep && onChompKeep)
      onChompKeep();
    return str;
  }
  if (keyCommentDone)
    keyComment = null;
  if (explicitKey) {
    if (keyComment)
      str += lineComment(str, ctx.indent, commentString(keyComment));
    str = `? ${str}
${indent}:`;
  } else {
    str = `${str}:`;
    if (keyComment)
      str += lineComment(str, ctx.indent, commentString(keyComment));
  }
  let vsb, vcb, valueComment;
  if (isNode(value)) {
    vsb = !!value.spaceBefore;
    vcb = value.commentBefore;
    valueComment = value.comment;
  } else {
    vsb = false;
    vcb = null;
    valueComment = null;
    if (value && typeof value === "object")
      value = doc.createNode(value);
  }
  ctx.implicitKey = false;
  if (!explicitKey && !keyComment && isScalar(value))
    ctx.indentAtStart = str.length + 1;
  chompKeep = false;
  if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && isSeq(value) && !value.flow && !value.tag && !value.anchor) {
    ctx.indent = ctx.indent.substring(2);
  }
  let valueCommentDone = false;
  const valueStr = stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
  let ws = " ";
  if (keyComment || vsb || vcb) {
    ws = vsb ? "\n" : "";
    if (vcb) {
      const cs = commentString(vcb);
      ws += `
${indentComment(cs, ctx.indent)}`;
    }
    if (valueStr === "" && !ctx.inFlow) {
      if (ws === "\n")
        ws = "\n\n";
    } else {
      ws += `
${ctx.indent}`;
    }
  } else if (!explicitKey && isCollection(value)) {
    const vs0 = valueStr[0];
    const nl0 = valueStr.indexOf("\n");
    const hasNewline = nl0 !== -1;
    const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
    if (hasNewline || !flow) {
      let hasPropsLine = false;
      if (hasNewline && (vs0 === "&" || vs0 === "!")) {
        let sp0 = valueStr.indexOf(" ");
        if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
          sp0 = valueStr.indexOf(" ", sp0 + 1);
        }
        if (sp0 === -1 || nl0 < sp0)
          hasPropsLine = true;
      }
      if (!hasPropsLine)
        ws = `
${ctx.indent}`;
    }
  } else if (valueStr === "" || valueStr[0] === "\n") {
    ws = "";
  }
  str += ws + valueStr;
  if (ctx.inFlow) {
    if (valueCommentDone && onComment)
      onComment();
  } else if (valueComment && !valueCommentDone) {
    str += lineComment(str, ctx.indent, commentString(valueComment));
  } else if (chompKeep && onChompKeep) {
    onChompKeep();
  }
  return str;
}
__name(stringifyPair, "stringifyPair");

// node_modules/yaml/browser/dist/log.js
function warn3(logLevel, warning) {
  if (logLevel === "debug" || logLevel === "warn") {
    console.warn(warning);
  }
}
__name(warn3, "warn");

// node_modules/yaml/browser/dist/schema/yaml-1.1/merge.js
var MERGE_KEY = "<<";
var merge = {
  identify: /* @__PURE__ */ __name((value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY, "identify"),
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: /* @__PURE__ */ __name(() => Object.assign(new Scalar(Symbol(MERGE_KEY)), {
    addToJSMap: addMergeToJSMap
  }), "resolve"),
  stringify: /* @__PURE__ */ __name(() => MERGE_KEY, "stringify")
};
var isMergeKey = /* @__PURE__ */ __name((ctx, key) => (merge.identify(key) || isScalar(key) && (!key.type || key.type === Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default), "isMergeKey");
function addMergeToJSMap(ctx, map2, value) {
  value = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
  if (isSeq(value))
    for (const it of value.items)
      mergeValue(ctx, map2, it);
  else if (Array.isArray(value))
    for (const it of value)
      mergeValue(ctx, map2, it);
  else
    mergeValue(ctx, map2, value);
}
__name(addMergeToJSMap, "addMergeToJSMap");
function mergeValue(ctx, map2, value) {
  const source = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
  if (!isMap(source))
    throw new Error("Merge sources must be maps or map aliases");
  const srcMap = source.toJSON(null, ctx, Map);
  for (const [key, value2] of srcMap) {
    if (map2 instanceof Map) {
      if (!map2.has(key))
        map2.set(key, value2);
    } else if (map2 instanceof Set) {
      map2.add(key);
    } else if (!Object.prototype.hasOwnProperty.call(map2, key)) {
      Object.defineProperty(map2, key, {
        value: value2,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }
  return map2;
}
__name(mergeValue, "mergeValue");

// node_modules/yaml/browser/dist/nodes/addPairToJSMap.js
function addPairToJSMap(ctx, map2, { key, value }) {
  if (isNode(key) && key.addToJSMap)
    key.addToJSMap(ctx, map2, value);
  else if (isMergeKey(ctx, key))
    addMergeToJSMap(ctx, map2, value);
  else {
    const jsKey = toJS(key, "", ctx);
    if (map2 instanceof Map) {
      map2.set(jsKey, toJS(value, jsKey, ctx));
    } else if (map2 instanceof Set) {
      map2.add(jsKey);
    } else {
      const stringKey = stringifyKey(key, jsKey, ctx);
      const jsValue = toJS(value, stringKey, ctx);
      if (stringKey in map2)
        Object.defineProperty(map2, stringKey, {
          value: jsValue,
          writable: true,
          enumerable: true,
          configurable: true
        });
      else
        map2[stringKey] = jsValue;
    }
  }
  return map2;
}
__name(addPairToJSMap, "addPairToJSMap");
function stringifyKey(key, jsKey, ctx) {
  if (jsKey === null)
    return "";
  if (typeof jsKey !== "object")
    return String(jsKey);
  if (isNode(key) && ctx?.doc) {
    const strCtx = createStringifyContext(ctx.doc, {});
    strCtx.anchors = /* @__PURE__ */ new Set();
    for (const node of ctx.anchors.keys())
      strCtx.anchors.add(node.anchor);
    strCtx.inFlow = true;
    strCtx.inStringifyKey = true;
    const strKey = key.toString(strCtx);
    if (!ctx.mapKeyWarned) {
      let jsonStr = JSON.stringify(strKey);
      if (jsonStr.length > 40)
        jsonStr = jsonStr.substring(0, 36) + '..."';
      warn3(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
      ctx.mapKeyWarned = true;
    }
    return strKey;
  }
  return JSON.stringify(jsKey);
}
__name(stringifyKey, "stringifyKey");

// node_modules/yaml/browser/dist/nodes/Pair.js
function createPair(key, value, ctx) {
  const k = createNode(key, void 0, ctx);
  const v = createNode(value, void 0, ctx);
  return new Pair(k, v);
}
__name(createPair, "createPair");
var Pair = class _Pair {
  static {
    __name(this, "Pair");
  }
  constructor(key, value = null) {
    Object.defineProperty(this, NODE_TYPE, { value: PAIR });
    this.key = key;
    this.value = value;
  }
  clone(schema4) {
    let { key, value } = this;
    if (isNode(key))
      key = key.clone(schema4);
    if (isNode(value))
      value = value.clone(schema4);
    return new _Pair(key, value);
  }
  toJSON(_, ctx) {
    const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return addPairToJSMap(ctx, pair, this);
  }
  toString(ctx, onComment, onChompKeep) {
    return ctx?.doc ? stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyCollection.js
function stringifyCollection(collection, ctx, options) {
  const flow = ctx.inFlow ?? collection.flow;
  const stringify4 = flow ? stringifyFlowCollection : stringifyBlockCollection;
  return stringify4(collection, ctx, options);
}
__name(stringifyCollection, "stringifyCollection");
function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
  const { indent, options: { commentString } } = ctx;
  const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
  let chompKeep = false;
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment2 = null;
    if (isNode(item)) {
      if (!chompKeep && item.spaceBefore)
        lines.push("");
      addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
      if (item.comment)
        comment2 = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (!chompKeep && ik.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
      }
    }
    chompKeep = false;
    let str2 = stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
    if (comment2)
      str2 += lineComment(str2, itemIndent, commentString(comment2));
    if (chompKeep && comment2)
      chompKeep = false;
    lines.push(blockItemPrefix + str2);
  }
  let str;
  if (lines.length === 0) {
    str = flowChars.start + flowChars.end;
  } else {
    str = lines[0];
    for (let i = 1; i < lines.length; ++i) {
      const line = lines[i];
      str += line ? `
${indent}${line}` : "\n";
    }
  }
  if (comment) {
    str += "\n" + indentComment(commentString(comment), indent);
    if (onComment)
      onComment();
  } else if (chompKeep && onChompKeep)
    onChompKeep();
  return str;
}
__name(stringifyBlockCollection, "stringifyBlockCollection");
function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
  const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
  itemIndent += indentStep;
  const itemCtx = Object.assign({}, ctx, {
    indent: itemIndent,
    inFlow: true,
    type: null
  });
  let reqNewline = false;
  let linesAtValue = 0;
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment = null;
    if (isNode(item)) {
      if (item.spaceBefore)
        lines.push("");
      addCommentBefore(ctx, lines, item.commentBefore, false);
      if (item.comment)
        comment = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (ik.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, ik.commentBefore, false);
        if (ik.comment)
          reqNewline = true;
      }
      const iv = isNode(item.value) ? item.value : null;
      if (iv) {
        if (iv.comment)
          comment = iv.comment;
        if (iv.commentBefore)
          reqNewline = true;
      } else if (item.value == null && ik?.comment) {
        comment = ik.comment;
      }
    }
    if (comment)
      reqNewline = true;
    let str = stringify(item, itemCtx, () => comment = null);
    if (i < items.length - 1)
      str += ",";
    if (comment)
      str += lineComment(str, itemIndent, commentString(comment));
    if (!reqNewline && (lines.length > linesAtValue || str.includes("\n")))
      reqNewline = true;
    lines.push(str);
    linesAtValue = lines.length;
  }
  const { start, end } = flowChars;
  if (lines.length === 0) {
    return start + end;
  } else {
    if (!reqNewline) {
      const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
      reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
    }
    if (reqNewline) {
      let str = start;
      for (const line of lines)
        str += line ? `
${indentStep}${indent}${line}` : "\n";
      return `${str}
${indent}${end}`;
    } else {
      return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
    }
  }
}
__name(stringifyFlowCollection, "stringifyFlowCollection");
function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
  if (comment && chompKeep)
    comment = comment.replace(/^\n+/, "");
  if (comment) {
    const ic = indentComment(commentString(comment), indent);
    lines.push(ic.trimStart());
  }
}
__name(addCommentBefore, "addCommentBefore");

// node_modules/yaml/browser/dist/nodes/YAMLMap.js
function findPair(items, key) {
  const k = isScalar(key) ? key.value : key;
  for (const it of items) {
    if (isPair(it)) {
      if (it.key === key || it.key === k)
        return it;
      if (isScalar(it.key) && it.key.value === k)
        return it;
    }
  }
  return void 0;
}
__name(findPair, "findPair");
var YAMLMap = class extends Collection {
  static {
    __name(this, "YAMLMap");
  }
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(schema4) {
    super(MAP, schema4);
    this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(schema4, obj, ctx) {
    const { keepUndefined, replacer } = ctx;
    const map2 = new this(schema4);
    const add = /* @__PURE__ */ __name((key, value) => {
      if (typeof replacer === "function")
        value = replacer.call(obj, key, value);
      else if (Array.isArray(replacer) && !replacer.includes(key))
        return;
      if (value !== void 0 || keepUndefined)
        map2.items.push(createPair(key, value, ctx));
    }, "add");
    if (obj instanceof Map) {
      for (const [key, value] of obj)
        add(key, value);
    } else if (obj && typeof obj === "object") {
      for (const key of Object.keys(obj))
        add(key, obj[key]);
    }
    if (typeof schema4.sortMapEntries === "function") {
      map2.items.sort(schema4.sortMapEntries);
    }
    return map2;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(pair, overwrite) {
    let _pair;
    if (isPair(pair))
      _pair = pair;
    else if (!pair || typeof pair !== "object" || !("key" in pair)) {
      _pair = new Pair(pair, pair?.value);
    } else
      _pair = new Pair(pair.key, pair.value);
    const prev = findPair(this.items, _pair.key);
    const sortEntries = this.schema?.sortMapEntries;
    if (prev) {
      if (!overwrite)
        throw new Error(`Key ${_pair.key} already set`);
      if (isScalar(prev.value) && isScalarValue(_pair.value))
        prev.value.value = _pair.value;
      else
        prev.value = _pair.value;
    } else if (sortEntries) {
      const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
      if (i === -1)
        this.items.push(_pair);
      else
        this.items.splice(i, 0, _pair);
    } else {
      this.items.push(_pair);
    }
  }
  delete(key) {
    const it = findPair(this.items, key);
    if (!it)
      return false;
    const del = this.items.splice(this.items.indexOf(it), 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const it = findPair(this.items, key);
    const node = it?.value;
    return (!keepScalar && isScalar(node) ? node.value : node) ?? void 0;
  }
  has(key) {
    return !!findPair(this.items, key);
  }
  set(key, value) {
    this.add(new Pair(key, value), true);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(_, ctx, Type) {
    const map2 = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    if (ctx?.onCreate)
      ctx.onCreate(map2);
    for (const item of this.items)
      addPairToJSMap(ctx, map2, item);
    return map2;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    for (const item of this.items) {
      if (!isPair(item))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
    }
    if (!ctx.allNullValues && this.hasAllNullValues(false))
      ctx = Object.assign({}, ctx, { allNullValues: true });
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: ctx.indent || "",
      onChompKeep,
      onComment
    });
  }
};

// node_modules/yaml/browser/dist/schema/common/map.js
var map = {
  collection: "map",
  default: true,
  nodeClass: YAMLMap,
  tag: "tag:yaml.org,2002:map",
  resolve(map2, onError) {
    if (!isMap(map2))
      onError("Expected a mapping for this tag");
    return map2;
  },
  createNode: /* @__PURE__ */ __name((schema4, obj, ctx) => YAMLMap.from(schema4, obj, ctx), "createNode")
};

// node_modules/yaml/browser/dist/nodes/YAMLSeq.js
var YAMLSeq = class extends Collection {
  static {
    __name(this, "YAMLSeq");
  }
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(schema4) {
    super(SEQ, schema4);
    this.items = [];
  }
  add(value) {
    this.items.push(value);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      return false;
    const del = this.items.splice(idx, 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      return void 0;
    const it = this.items[idx];
    return !keepScalar && isScalar(it) ? it.value : it;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(key) {
    const idx = asItemIndex(key);
    return typeof idx === "number" && idx < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(key, value) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      throw new Error(`Expected a valid index, not ${key}.`);
    const prev = this.items[idx];
    if (isScalar(prev) && isScalarValue(value))
      prev.value = value;
    else
      this.items[idx] = value;
  }
  toJSON(_, ctx) {
    const seq2 = [];
    if (ctx?.onCreate)
      ctx.onCreate(seq2);
    let i = 0;
    for (const item of this.items)
      seq2.push(toJS(item, String(i++), ctx));
    return seq2;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (ctx.indent || "") + "  ",
      onChompKeep,
      onComment
    });
  }
  static from(schema4, obj, ctx) {
    const { replacer } = ctx;
    const seq2 = new this(schema4);
    if (obj && Symbol.iterator in Object(obj)) {
      let i = 0;
      for (let it of obj) {
        if (typeof replacer === "function") {
          const key = obj instanceof Set ? it : String(i++);
          it = replacer.call(obj, key, it);
        }
        seq2.items.push(createNode(it, void 0, ctx));
      }
    }
    return seq2;
  }
};
function asItemIndex(key) {
  let idx = isScalar(key) ? key.value : key;
  if (idx && typeof idx === "string")
    idx = Number(idx);
  return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
}
__name(asItemIndex, "asItemIndex");

// node_modules/yaml/browser/dist/schema/common/seq.js
var seq = {
  collection: "seq",
  default: true,
  nodeClass: YAMLSeq,
  tag: "tag:yaml.org,2002:seq",
  resolve(seq2, onError) {
    if (!isSeq(seq2))
      onError("Expected a sequence for this tag");
    return seq2;
  },
  createNode: /* @__PURE__ */ __name((schema4, obj, ctx) => YAMLSeq.from(schema4, obj, ctx), "createNode")
};

// node_modules/yaml/browser/dist/schema/common/string.js
var string = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "string", "identify"),
  default: true,
  tag: "tag:yaml.org,2002:str",
  resolve: /* @__PURE__ */ __name((str) => str, "resolve"),
  stringify(item, ctx, onComment, onChompKeep) {
    ctx = Object.assign({ actualString: true }, ctx);
    return stringifyString(item, ctx, onComment, onChompKeep);
  }
};

// node_modules/yaml/browser/dist/schema/common/null.js
var nullTag = {
  identify: /* @__PURE__ */ __name((value) => value == null, "identify"),
  createNode: /* @__PURE__ */ __name(() => new Scalar(null), "createNode"),
  default: true,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: /* @__PURE__ */ __name(() => new Scalar(null), "resolve"),
  stringify: /* @__PURE__ */ __name(({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr, "stringify")
};

// node_modules/yaml/browser/dist/schema/core/bool.js
var boolTag = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "boolean", "identify"),
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: /* @__PURE__ */ __name((str) => new Scalar(str[0] === "t" || str[0] === "T"), "resolve"),
  stringify({ source, value }, ctx) {
    if (source && boolTag.test.test(source)) {
      const sv = source[0] === "t" || source[0] === "T";
      if (value === sv)
        return source;
    }
    return value ? ctx.options.trueStr : ctx.options.falseStr;
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyNumber.js
function stringifyNumber({ format, minFractionDigits, tag, value }) {
  if (typeof value === "bigint")
    return String(value);
  const num = typeof value === "number" ? value : Number(value);
  if (!isFinite(num))
    return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
  let n = JSON.stringify(value);
  if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
    let i = n.indexOf(".");
    if (i < 0) {
      i = n.length;
      n += ".";
    }
    let d = minFractionDigits - (n.length - i - 1);
    while (d-- > 0)
      n += "0";
  }
  return n;
}
__name(stringifyNumber, "stringifyNumber");

// node_modules/yaml/browser/dist/schema/core/float.js
var floatNaN = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "number", "identify"),
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: /* @__PURE__ */ __name((str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY, "resolve"),
  stringify: stringifyNumber
};
var floatExp = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "number", "identify"),
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: /* @__PURE__ */ __name((str) => parseFloat(str), "resolve"),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
var float = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "number", "identify"),
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str));
    const dot = str.indexOf(".");
    if (dot !== -1 && str[str.length - 1] === "0")
      node.minFractionDigits = str.length - dot - 1;
    return node;
  },
  stringify: stringifyNumber
};

// node_modules/yaml/browser/dist/schema/core/int.js
var intIdentify = /* @__PURE__ */ __name((value) => typeof value === "bigint" || Number.isInteger(value), "intIdentify");
var intResolve = /* @__PURE__ */ __name((str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix), "intResolve");
function intStringify(node, radix, prefix) {
  const { value } = node;
  if (intIdentify(value) && value >= 0)
    return prefix + value.toString(radix);
  return stringifyNumber(node);
}
__name(intStringify, "intStringify");
var intOct = {
  identify: /* @__PURE__ */ __name((value) => intIdentify(value) && value >= 0, "identify"),
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: /* @__PURE__ */ __name((str, _onError, opt) => intResolve(str, 2, 8, opt), "resolve"),
  stringify: /* @__PURE__ */ __name((node) => intStringify(node, 8, "0o"), "stringify")
};
var int = {
  identify: intIdentify,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: /* @__PURE__ */ __name((str, _onError, opt) => intResolve(str, 0, 10, opt), "resolve"),
  stringify: stringifyNumber
};
var intHex = {
  identify: /* @__PURE__ */ __name((value) => intIdentify(value) && value >= 0, "identify"),
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: /* @__PURE__ */ __name((str, _onError, opt) => intResolve(str, 2, 16, opt), "resolve"),
  stringify: /* @__PURE__ */ __name((node) => intStringify(node, 16, "0x"), "stringify")
};

// node_modules/yaml/browser/dist/schema/core/schema.js
var schema = [
  map,
  seq,
  string,
  nullTag,
  boolTag,
  intOct,
  int,
  intHex,
  floatNaN,
  floatExp,
  float
];

// node_modules/yaml/browser/dist/schema/json/schema.js
function intIdentify2(value) {
  return typeof value === "bigint" || Number.isInteger(value);
}
__name(intIdentify2, "intIdentify");
var stringifyJSON = /* @__PURE__ */ __name(({ value }) => JSON.stringify(value), "stringifyJSON");
var jsonScalars = [
  {
    identify: /* @__PURE__ */ __name((value) => typeof value === "string", "identify"),
    default: true,
    tag: "tag:yaml.org,2002:str",
    resolve: /* @__PURE__ */ __name((str) => str, "resolve"),
    stringify: stringifyJSON
  },
  {
    identify: /* @__PURE__ */ __name((value) => value == null, "identify"),
    createNode: /* @__PURE__ */ __name(() => new Scalar(null), "createNode"),
    default: true,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: /* @__PURE__ */ __name(() => null, "resolve"),
    stringify: stringifyJSON
  },
  {
    identify: /* @__PURE__ */ __name((value) => typeof value === "boolean", "identify"),
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: /* @__PURE__ */ __name((str) => str === "true", "resolve"),
    stringify: stringifyJSON
  },
  {
    identify: intIdentify2,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: /* @__PURE__ */ __name((str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10), "resolve"),
    stringify: /* @__PURE__ */ __name(({ value }) => intIdentify2(value) ? value.toString() : JSON.stringify(value), "stringify")
  },
  {
    identify: /* @__PURE__ */ __name((value) => typeof value === "number", "identify"),
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: /* @__PURE__ */ __name((str) => parseFloat(str), "resolve"),
    stringify: stringifyJSON
  }
];
var jsonError = {
  default: true,
  tag: "",
  test: /^/,
  resolve(str, onError) {
    onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
    return str;
  }
};
var schema2 = [map, seq].concat(jsonScalars, jsonError);

// node_modules/yaml/browser/dist/schema/yaml-1.1/binary.js
var binary = {
  identify: /* @__PURE__ */ __name((value) => value instanceof Uint8Array, "identify"),
  // Buffer inherits from Uint8Array
  default: false,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(src, onError) {
    if (typeof atob === "function") {
      const str = atob(src.replace(/[\n\r]/g, ""));
      const buffer = new Uint8Array(str.length);
      for (let i = 0; i < str.length; ++i)
        buffer[i] = str.charCodeAt(i);
      return buffer;
    } else {
      onError("This environment does not support reading binary tags; either Buffer or atob is required");
      return src;
    }
  },
  stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
    if (!value)
      return "";
    const buf = value;
    let str;
    if (typeof btoa === "function") {
      let s = "";
      for (let i = 0; i < buf.length; ++i)
        s += String.fromCharCode(buf[i]);
      str = btoa(s);
    } else {
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    }
    type ?? (type = Scalar.BLOCK_LITERAL);
    if (type !== Scalar.QUOTE_DOUBLE) {
      const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
      const n = Math.ceil(str.length / lineWidth);
      const lines = new Array(n);
      for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
        lines[i] = str.substr(o, lineWidth);
      }
      str = lines.join(type === Scalar.BLOCK_LITERAL ? "\n" : " ");
    }
    return stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
  }
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/pairs.js
function resolvePairs(seq2, onError) {
  if (isSeq(seq2)) {
    for (let i = 0; i < seq2.items.length; ++i) {
      let item = seq2.items[i];
      if (isPair(item))
        continue;
      else if (isMap(item)) {
        if (item.items.length > 1)
          onError("Each pair must have its own sequence indicator");
        const pair = item.items[0] || new Pair(new Scalar(null));
        if (item.commentBefore)
          pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
        if (item.comment) {
          const cn = pair.value ?? pair.key;
          cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
        }
        item = pair;
      }
      seq2.items[i] = isPair(item) ? item : new Pair(item);
    }
  } else
    onError("Expected a sequence for this tag");
  return seq2;
}
__name(resolvePairs, "resolvePairs");
function createPairs(schema4, iterable, ctx) {
  const { replacer } = ctx;
  const pairs2 = new YAMLSeq(schema4);
  pairs2.tag = "tag:yaml.org,2002:pairs";
  let i = 0;
  if (iterable && Symbol.iterator in Object(iterable))
    for (let it of iterable) {
      if (typeof replacer === "function")
        it = replacer.call(iterable, String(i++), it);
      let key, value;
      if (Array.isArray(it)) {
        if (it.length === 2) {
          key = it[0];
          value = it[1];
        } else
          throw new TypeError(`Expected [key, value] tuple: ${it}`);
      } else if (it && it instanceof Object) {
        const keys = Object.keys(it);
        if (keys.length === 1) {
          key = keys[0];
          value = it[key];
        } else {
          throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
        }
      } else {
        key = it;
      }
      pairs2.items.push(createPair(key, value, ctx));
    }
  return pairs2;
}
__name(createPairs, "createPairs");
var pairs = {
  collection: "seq",
  default: false,
  tag: "tag:yaml.org,2002:pairs",
  resolve: resolvePairs,
  createNode: createPairs
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/omap.js
var YAMLOMap = class _YAMLOMap extends YAMLSeq {
  static {
    __name(this, "YAMLOMap");
  }
  constructor() {
    super();
    this.add = YAMLMap.prototype.add.bind(this);
    this.delete = YAMLMap.prototype.delete.bind(this);
    this.get = YAMLMap.prototype.get.bind(this);
    this.has = YAMLMap.prototype.has.bind(this);
    this.set = YAMLMap.prototype.set.bind(this);
    this.tag = _YAMLOMap.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(_, ctx) {
    if (!ctx)
      return super.toJSON(_);
    const map2 = /* @__PURE__ */ new Map();
    if (ctx?.onCreate)
      ctx.onCreate(map2);
    for (const pair of this.items) {
      let key, value;
      if (isPair(pair)) {
        key = toJS(pair.key, "", ctx);
        value = toJS(pair.value, key, ctx);
      } else {
        key = toJS(pair, "", ctx);
      }
      if (map2.has(key))
        throw new Error("Ordered maps must not include duplicate keys");
      map2.set(key, value);
    }
    return map2;
  }
  static from(schema4, iterable, ctx) {
    const pairs2 = createPairs(schema4, iterable, ctx);
    const omap2 = new this();
    omap2.items = pairs2.items;
    return omap2;
  }
};
YAMLOMap.tag = "tag:yaml.org,2002:omap";
var omap = {
  collection: "seq",
  identify: /* @__PURE__ */ __name((value) => value instanceof Map, "identify"),
  nodeClass: YAMLOMap,
  default: false,
  tag: "tag:yaml.org,2002:omap",
  resolve(seq2, onError) {
    const pairs2 = resolvePairs(seq2, onError);
    const seenKeys = [];
    for (const { key } of pairs2.items) {
      if (isScalar(key)) {
        if (seenKeys.includes(key.value)) {
          onError(`Ordered maps must not include duplicate keys: ${key.value}`);
        } else {
          seenKeys.push(key.value);
        }
      }
    }
    return Object.assign(new YAMLOMap(), pairs2);
  },
  createNode: /* @__PURE__ */ __name((schema4, iterable, ctx) => YAMLOMap.from(schema4, iterable, ctx), "createNode")
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/bool.js
function boolStringify({ value, source }, ctx) {
  const boolObj = value ? trueTag : falseTag;
  if (source && boolObj.test.test(source))
    return source;
  return value ? ctx.options.trueStr : ctx.options.falseStr;
}
__name(boolStringify, "boolStringify");
var trueTag = {
  identify: /* @__PURE__ */ __name((value) => value === true, "identify"),
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: /* @__PURE__ */ __name(() => new Scalar(true), "resolve"),
  stringify: boolStringify
};
var falseTag = {
  identify: /* @__PURE__ */ __name((value) => value === false, "identify"),
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: /* @__PURE__ */ __name(() => new Scalar(false), "resolve"),
  stringify: boolStringify
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/float.js
var floatNaN2 = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "number", "identify"),
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: /* @__PURE__ */ __name((str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY, "resolve"),
  stringify: stringifyNumber
};
var floatExp2 = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "number", "identify"),
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: /* @__PURE__ */ __name((str) => parseFloat(str.replace(/_/g, "")), "resolve"),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
var float2 = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "number", "identify"),
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str.replace(/_/g, "")));
    const dot = str.indexOf(".");
    if (dot !== -1) {
      const f = str.substring(dot + 1).replace(/_/g, "");
      if (f[f.length - 1] === "0")
        node.minFractionDigits = f.length;
    }
    return node;
  },
  stringify: stringifyNumber
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/int.js
var intIdentify3 = /* @__PURE__ */ __name((value) => typeof value === "bigint" || Number.isInteger(value), "intIdentify");
function intResolve2(str, offset, radix, { intAsBigInt }) {
  const sign = str[0];
  if (sign === "-" || sign === "+")
    offset += 1;
  str = str.substring(offset).replace(/_/g, "");
  if (intAsBigInt) {
    switch (radix) {
      case 2:
        str = `0b${str}`;
        break;
      case 8:
        str = `0o${str}`;
        break;
      case 16:
        str = `0x${str}`;
        break;
    }
    const n2 = BigInt(str);
    return sign === "-" ? BigInt(-1) * n2 : n2;
  }
  const n = parseInt(str, radix);
  return sign === "-" ? -1 * n : n;
}
__name(intResolve2, "intResolve");
function intStringify2(node, radix, prefix) {
  const { value } = node;
  if (intIdentify3(value)) {
    const str = value.toString(radix);
    return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
  }
  return stringifyNumber(node);
}
__name(intStringify2, "intStringify");
var intBin = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: /* @__PURE__ */ __name((str, _onError, opt) => intResolve2(str, 2, 2, opt), "resolve"),
  stringify: /* @__PURE__ */ __name((node) => intStringify2(node, 2, "0b"), "stringify")
};
var intOct2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: /* @__PURE__ */ __name((str, _onError, opt) => intResolve2(str, 1, 8, opt), "resolve"),
  stringify: /* @__PURE__ */ __name((node) => intStringify2(node, 8, "0"), "stringify")
};
var int2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: /* @__PURE__ */ __name((str, _onError, opt) => intResolve2(str, 0, 10, opt), "resolve"),
  stringify: stringifyNumber
};
var intHex2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: /* @__PURE__ */ __name((str, _onError, opt) => intResolve2(str, 2, 16, opt), "resolve"),
  stringify: /* @__PURE__ */ __name((node) => intStringify2(node, 16, "0x"), "stringify")
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/set.js
var YAMLSet = class _YAMLSet extends YAMLMap {
  static {
    __name(this, "YAMLSet");
  }
  constructor(schema4) {
    super(schema4);
    this.tag = _YAMLSet.tag;
  }
  add(key) {
    let pair;
    if (isPair(key))
      pair = key;
    else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
      pair = new Pair(key.key, null);
    else
      pair = new Pair(key, null);
    const prev = findPair(this.items, pair.key);
    if (!prev)
      this.items.push(pair);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(key, keepPair) {
    const pair = findPair(this.items, key);
    return !keepPair && isPair(pair) ? isScalar(pair.key) ? pair.key.value : pair.key : pair;
  }
  set(key, value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
    const prev = findPair(this.items, key);
    if (prev && !value) {
      this.items.splice(this.items.indexOf(prev), 1);
    } else if (!prev && value) {
      this.items.push(new Pair(key));
    }
  }
  toJSON(_, ctx) {
    return super.toJSON(_, ctx, Set);
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    if (this.hasAllNullValues(true))
      return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
    else
      throw new Error("Set items must all have null values");
  }
  static from(schema4, iterable, ctx) {
    const { replacer } = ctx;
    const set2 = new this(schema4);
    if (iterable && Symbol.iterator in Object(iterable))
      for (let value of iterable) {
        if (typeof replacer === "function")
          value = replacer.call(iterable, value, value);
        set2.items.push(createPair(value, null, ctx));
      }
    return set2;
  }
};
YAMLSet.tag = "tag:yaml.org,2002:set";
var set = {
  collection: "map",
  identify: /* @__PURE__ */ __name((value) => value instanceof Set, "identify"),
  nodeClass: YAMLSet,
  default: false,
  tag: "tag:yaml.org,2002:set",
  createNode: /* @__PURE__ */ __name((schema4, iterable, ctx) => YAMLSet.from(schema4, iterable, ctx), "createNode"),
  resolve(map2, onError) {
    if (isMap(map2)) {
      if (map2.hasAllNullValues(true))
        return Object.assign(new YAMLSet(), map2);
      else
        onError("Set items must all have null values");
    } else
      onError("Expected a mapping for this tag");
    return map2;
  }
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/timestamp.js
function parseSexagesimal(str, asBigInt) {
  const sign = str[0];
  const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
  const num = /* @__PURE__ */ __name((n) => asBigInt ? BigInt(n) : Number(n), "num");
  const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
  return sign === "-" ? num(-1) * res : res;
}
__name(parseSexagesimal, "parseSexagesimal");
function stringifySexagesimal(node) {
  let { value } = node;
  let num = /* @__PURE__ */ __name((n) => n, "num");
  if (typeof value === "bigint")
    num = /* @__PURE__ */ __name((n) => BigInt(n), "num");
  else if (isNaN(value) || !isFinite(value))
    return stringifyNumber(node);
  let sign = "";
  if (value < 0) {
    sign = "-";
    value *= num(-1);
  }
  const _60 = num(60);
  const parts = [value % _60];
  if (value < 60) {
    parts.unshift(0);
  } else {
    value = (value - parts[0]) / _60;
    parts.unshift(value % _60);
    if (value >= 60) {
      value = (value - parts[0]) / _60;
      parts.unshift(value);
    }
  }
  return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
__name(stringifySexagesimal, "stringifySexagesimal");
var intTime = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "bigint" || Number.isInteger(value), "identify"),
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: /* @__PURE__ */ __name((str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt), "resolve"),
  stringify: stringifySexagesimal
};
var floatTime = {
  identify: /* @__PURE__ */ __name((value) => typeof value === "number", "identify"),
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: /* @__PURE__ */ __name((str) => parseSexagesimal(str, false), "resolve"),
  stringify: stringifySexagesimal
};
var timestamp = {
  identify: /* @__PURE__ */ __name((value) => value instanceof Date, "identify"),
  default: true,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(str) {
    const match = str.match(timestamp.test);
    if (!match)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, year, month, day, hour, minute, second] = match.map(Number);
    const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
    let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
    const tz = match[8];
    if (tz && tz !== "Z") {
      let d = parseSexagesimal(tz, false);
      if (Math.abs(d) < 30)
        d *= 60;
      date -= 6e4 * d;
    }
    return new Date(date);
  },
  stringify: /* @__PURE__ */ __name(({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? "", "stringify")
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/schema.js
var schema3 = [
  map,
  seq,
  string,
  nullTag,
  trueTag,
  falseTag,
  intBin,
  intOct2,
  int2,
  intHex2,
  floatNaN2,
  floatExp2,
  float2,
  binary,
  merge,
  omap,
  pairs,
  set,
  intTime,
  floatTime,
  timestamp
];

// node_modules/yaml/browser/dist/schema/tags.js
var schemas = /* @__PURE__ */ new Map([
  ["core", schema],
  ["failsafe", [map, seq, string]],
  ["json", schema2],
  ["yaml11", schema3],
  ["yaml-1.1", schema3]
]);
var tagsByName = {
  binary,
  bool: boolTag,
  float,
  floatExp,
  floatNaN,
  floatTime,
  int,
  intHex,
  intOct,
  intTime,
  map,
  merge,
  null: nullTag,
  omap,
  pairs,
  seq,
  set,
  timestamp
};
var coreKnownTags = {
  "tag:yaml.org,2002:binary": binary,
  "tag:yaml.org,2002:merge": merge,
  "tag:yaml.org,2002:omap": omap,
  "tag:yaml.org,2002:pairs": pairs,
  "tag:yaml.org,2002:set": set,
  "tag:yaml.org,2002:timestamp": timestamp
};
function getTags(customTags, schemaName, addMergeTag) {
  const schemaTags = schemas.get(schemaName);
  if (schemaTags && !customTags) {
    return addMergeTag && !schemaTags.includes(merge) ? schemaTags.concat(merge) : schemaTags.slice();
  }
  let tags = schemaTags;
  if (!tags) {
    if (Array.isArray(customTags))
      tags = [];
    else {
      const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
    }
  }
  if (Array.isArray(customTags)) {
    for (const tag of customTags)
      tags = tags.concat(tag);
  } else if (typeof customTags === "function") {
    tags = customTags(tags.slice());
  }
  if (addMergeTag)
    tags = tags.concat(merge);
  return tags.reduce((tags2, tag) => {
    const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
    if (!tagObj) {
      const tagName = JSON.stringify(tag);
      const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
    }
    if (!tags2.includes(tagObj))
      tags2.push(tagObj);
    return tags2;
  }, []);
}
__name(getTags, "getTags");

// node_modules/yaml/browser/dist/schema/Schema.js
var sortMapEntriesByKey = /* @__PURE__ */ __name((a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0, "sortMapEntriesByKey");
var Schema = class _Schema {
  static {
    __name(this, "Schema");
  }
  constructor({ compat, customTags, merge: merge2, resolveKnownTags, schema: schema4, sortMapEntries, toStringDefaults }) {
    this.compat = Array.isArray(compat) ? getTags(compat, "compat") : compat ? getTags(null, compat) : null;
    this.name = typeof schema4 === "string" && schema4 || "core";
    this.knownTags = resolveKnownTags ? coreKnownTags : {};
    this.tags = getTags(customTags, this.name, merge2);
    this.toStringOptions = toStringDefaults ?? null;
    Object.defineProperty(this, MAP, { value: map });
    Object.defineProperty(this, SCALAR, { value: string });
    Object.defineProperty(this, SEQ, { value: seq });
    this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
  }
  clone() {
    const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
    copy.tags = this.tags.slice();
    return copy;
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyDocument.js
function stringifyDocument(doc, options) {
  const lines = [];
  let hasDirectives = options.directives === true;
  if (options.directives !== false && doc.directives) {
    const dir3 = doc.directives.toString(doc);
    if (dir3) {
      lines.push(dir3);
      hasDirectives = true;
    } else if (doc.directives.docStart)
      hasDirectives = true;
  }
  if (hasDirectives)
    lines.push("---");
  const ctx = createStringifyContext(doc, options);
  const { commentString } = ctx.options;
  if (doc.commentBefore) {
    if (lines.length !== 1)
      lines.unshift("");
    const cs = commentString(doc.commentBefore);
    lines.unshift(indentComment(cs, ""));
  }
  let chompKeep = false;
  let contentComment = null;
  if (doc.contents) {
    if (isNode(doc.contents)) {
      if (doc.contents.spaceBefore && hasDirectives)
        lines.push("");
      if (doc.contents.commentBefore) {
        const cs = commentString(doc.contents.commentBefore);
        lines.push(indentComment(cs, ""));
      }
      ctx.forceBlockIndent = !!doc.comment;
      contentComment = doc.contents.comment;
    }
    const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
    let body = stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
    if (contentComment)
      body += lineComment(body, "", commentString(contentComment));
    if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
      lines[lines.length - 1] = `--- ${body}`;
    } else
      lines.push(body);
  } else {
    lines.push(stringify(doc.contents, ctx));
  }
  if (doc.directives?.docEnd) {
    if (doc.comment) {
      const cs = commentString(doc.comment);
      if (cs.includes("\n")) {
        lines.push("...");
        lines.push(indentComment(cs, ""));
      } else {
        lines.push(`... ${cs}`);
      }
    } else {
      lines.push("...");
    }
  } else {
    let dc = doc.comment;
    if (dc && chompKeep)
      dc = dc.replace(/^\n+/, "");
    if (dc) {
      if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
        lines.push("");
      lines.push(indentComment(commentString(dc), ""));
    }
  }
  return lines.join("\n") + "\n";
}
__name(stringifyDocument, "stringifyDocument");

// node_modules/yaml/browser/dist/doc/Document.js
var Document = class _Document {
  static {
    __name(this, "Document");
  }
  constructor(value, replacer, options) {
    this.commentBefore = null;
    this.comment = null;
    this.errors = [];
    this.warnings = [];
    Object.defineProperty(this, NODE_TYPE, { value: DOC });
    let _replacer = null;
    if (typeof replacer === "function" || Array.isArray(replacer)) {
      _replacer = replacer;
    } else if (options === void 0 && replacer) {
      options = replacer;
      replacer = void 0;
    }
    const opt = Object.assign({
      intAsBigInt: false,
      keepSourceTokens: false,
      logLevel: "warn",
      prettyErrors: true,
      strict: true,
      stringKeys: false,
      uniqueKeys: true,
      version: "1.2"
    }, options);
    this.options = opt;
    let { version: version2 } = opt;
    if (options?._directives) {
      this.directives = options._directives.atDocument();
      if (this.directives.yaml.explicit)
        version2 = this.directives.yaml.version;
    } else
      this.directives = new Directives({ version: version2 });
    this.setSchema(version2, options);
    this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const copy = Object.create(_Document.prototype, {
      [NODE_TYPE]: { value: DOC }
    });
    copy.commentBefore = this.commentBefore;
    copy.comment = this.comment;
    copy.errors = this.errors.slice();
    copy.warnings = this.warnings.slice();
    copy.options = Object.assign({}, this.options);
    if (this.directives)
      copy.directives = this.directives.clone();
    copy.schema = this.schema.clone();
    copy.contents = isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /** Adds a value to the document. */
  add(value) {
    if (assertCollection(this.contents))
      this.contents.add(value);
  }
  /** Adds a value to the document. */
  addIn(path, value) {
    if (assertCollection(this.contents))
      this.contents.addIn(path, value);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(node, name) {
    if (!node.anchor) {
      const prev = anchorNames(this);
      node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !name || prev.has(name) ? findNewAnchor(name || "a", prev) : name;
    }
    return new Alias(node.anchor);
  }
  createNode(value, replacer, options) {
    let _replacer = void 0;
    if (typeof replacer === "function") {
      value = replacer.call({ "": value }, "", value);
      _replacer = replacer;
    } else if (Array.isArray(replacer)) {
      const keyToStr = /* @__PURE__ */ __name((v) => typeof v === "number" || v instanceof String || v instanceof Number, "keyToStr");
      const asStr = replacer.filter(keyToStr).map(String);
      if (asStr.length > 0)
        replacer = replacer.concat(asStr);
      _replacer = replacer;
    } else if (options === void 0 && replacer) {
      options = replacer;
      replacer = void 0;
    }
    const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
    const { onAnchor, setAnchors, sourceObjects } = createNodeAnchors(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      anchorPrefix || "a"
    );
    const ctx = {
      aliasDuplicateObjects: aliasDuplicateObjects ?? true,
      keepUndefined: keepUndefined ?? false,
      onAnchor,
      onTagObj,
      replacer: _replacer,
      schema: this.schema,
      sourceObjects
    };
    const node = createNode(value, tag, ctx);
    if (flow && isCollection(node))
      node.flow = true;
    setAnchors();
    return node;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(key, value, options = {}) {
    const k = this.createNode(key, null, options);
    const v = this.createNode(value, null, options);
    return new Pair(k, v);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    return assertCollection(this.contents) ? this.contents.delete(key) : false;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    if (isEmptyPath(path)) {
      if (this.contents == null)
        return false;
      this.contents = null;
      return true;
    }
    return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(key, keepScalar) {
    return isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    if (isEmptyPath(path))
      return !keepScalar && isScalar(this.contents) ? this.contents.value : this.contents;
    return isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(key) {
    return isCollection(this.contents) ? this.contents.has(key) : false;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(path) {
    if (isEmptyPath(path))
      return this.contents !== void 0;
    return isCollection(this.contents) ? this.contents.hasIn(path) : false;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(key, value) {
    if (this.contents == null) {
      this.contents = collectionFromPath(this.schema, [key], value);
    } else if (assertCollection(this.contents)) {
      this.contents.set(key, value);
    }
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    if (isEmptyPath(path)) {
      this.contents = value;
    } else if (this.contents == null) {
      this.contents = collectionFromPath(this.schema, Array.from(path), value);
    } else if (assertCollection(this.contents)) {
      this.contents.setIn(path, value);
    }
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(version2, options = {}) {
    if (typeof version2 === "number")
      version2 = String(version2);
    let opt;
    switch (version2) {
      case "1.1":
        if (this.directives)
          this.directives.yaml.version = "1.1";
        else
          this.directives = new Directives({ version: "1.1" });
        opt = { resolveKnownTags: false, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        if (this.directives)
          this.directives.yaml.version = version2;
        else
          this.directives = new Directives({ version: version2 });
        opt = { resolveKnownTags: true, schema: "core" };
        break;
      case null:
        if (this.directives)
          delete this.directives;
        opt = null;
        break;
      default: {
        const sv = JSON.stringify(version2);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
      }
    }
    if (options.schema instanceof Object)
      this.schema = options.schema;
    else if (opt)
      this.schema = new Schema(Object.assign(opt, options));
    else
      throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !json,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
    };
    const res = toJS(this.contents, jsonArg ?? "", ctx);
    if (typeof onAnchor === "function")
      for (const { count: count3, res: res2 } of ctx.anchors.values())
        onAnchor(res2, count3);
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(jsonArg, onAnchor) {
    return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
  }
  /** A YAML representation of the document. */
  toString(options = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
      const s = JSON.stringify(options.indent);
      throw new Error(`"indent" option must be a positive integer, not ${s}`);
    }
    return stringifyDocument(this, options);
  }
};
function assertCollection(contents) {
  if (isCollection(contents))
    return true;
  throw new Error("Expected a YAML collection as document contents");
}
__name(assertCollection, "assertCollection");

// node_modules/yaml/browser/dist/errors.js
var YAMLError = class extends Error {
  static {
    __name(this, "YAMLError");
  }
  constructor(name, pos, code, message) {
    super();
    this.name = name;
    this.code = code;
    this.message = message;
    this.pos = pos;
  }
};
var YAMLParseError = class extends YAMLError {
  static {
    __name(this, "YAMLParseError");
  }
  constructor(pos, code, message) {
    super("YAMLParseError", pos, code, message);
  }
};
var YAMLWarning = class extends YAMLError {
  static {
    __name(this, "YAMLWarning");
  }
  constructor(pos, code, message) {
    super("YAMLWarning", pos, code, message);
  }
};
var prettifyError = /* @__PURE__ */ __name((src, lc) => (error3) => {
  if (error3.pos[0] === -1)
    return;
  error3.linePos = error3.pos.map((pos) => lc.linePos(pos));
  const { line, col } = error3.linePos[0];
  error3.message += ` at line ${line}, column ${col}`;
  let ci = col - 1;
  let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
  if (ci >= 60 && lineStr.length > 80) {
    const trimStart = Math.min(ci - 39, lineStr.length - 79);
    lineStr = "\u2026" + lineStr.substring(trimStart);
    ci -= trimStart - 1;
  }
  if (lineStr.length > 80)
    lineStr = lineStr.substring(0, 79) + "\u2026";
  if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
    let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
    if (prev.length > 80)
      prev = prev.substring(0, 79) + "\u2026\n";
    lineStr = prev + lineStr;
  }
  if (/[^ ]/.test(lineStr)) {
    let count3 = 1;
    const end = error3.linePos[1];
    if (end && end.line === line && end.col > col) {
      count3 = Math.max(1, Math.min(end.col - col, 80 - ci));
    }
    const pointer = " ".repeat(ci) + "^".repeat(count3);
    error3.message += `:

${lineStr}
${pointer}
`;
  }
}, "prettifyError");

// node_modules/yaml/browser/dist/compose/resolve-props.js
function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
  let spaceBefore = false;
  let atNewline = startOnNewline;
  let hasSpace = startOnNewline;
  let comment = "";
  let commentSep = "";
  let hasNewline = false;
  let reqSpace = false;
  let tab = null;
  let anchor = null;
  let tag = null;
  let newlineAfterProp = null;
  let comma = null;
  let found = null;
  let start = null;
  for (const token of tokens) {
    if (reqSpace) {
      if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
        onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      reqSpace = false;
    }
    if (tab) {
      if (atNewline && token.type !== "comment" && token.type !== "newline") {
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      }
      tab = null;
    }
    switch (token.type) {
      case "space":
        if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
          tab = token;
        }
        hasSpace = true;
        break;
      case "comment": {
        if (!hasSpace)
          onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const cb = token.source.substring(1) || " ";
        if (!comment)
          comment = cb;
        else
          comment += commentSep + cb;
        commentSep = "";
        atNewline = false;
        break;
      }
      case "newline":
        if (atNewline) {
          if (comment)
            comment += token.source;
          else if (!found || indicator !== "seq-item-ind")
            spaceBefore = true;
        } else
          commentSep += token.source;
        atNewline = true;
        hasNewline = true;
        if (anchor || tag)
          newlineAfterProp = token;
        hasSpace = true;
        break;
      case "anchor":
        if (anchor)
          onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
        if (token.source.endsWith(":"))
          onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
        anchor = token;
        start ?? (start = token.offset);
        atNewline = false;
        hasSpace = false;
        reqSpace = true;
        break;
      case "tag": {
        if (tag)
          onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
        tag = token;
        start ?? (start = token.offset);
        atNewline = false;
        hasSpace = false;
        reqSpace = true;
        break;
      }
      case indicator:
        if (anchor || tag)
          onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
        if (found)
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
        found = token;
        atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
        hasSpace = false;
        break;
      case "comma":
        if (flow) {
          if (comma)
            onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
          comma = token;
          atNewline = false;
          hasSpace = false;
          break;
        }
      // else fallthrough
      default:
        onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
        atNewline = false;
        hasSpace = false;
    }
  }
  const last = tokens[tokens.length - 1];
  const end = last ? last.offset + last.source.length : offset;
  if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
    onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
  }
  if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq"))
    onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
  return {
    comma,
    found,
    spaceBefore,
    comment,
    hasNewline,
    anchor,
    tag,
    newlineAfterProp,
    end,
    start: start ?? end
  };
}
__name(resolveProps, "resolveProps");

// node_modules/yaml/browser/dist/compose/util-contains-newline.js
function containsNewline(key) {
  if (!key)
    return null;
  switch (key.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (key.source.includes("\n"))
        return true;
      if (key.end) {
        for (const st of key.end)
          if (st.type === "newline")
            return true;
      }
      return false;
    case "flow-collection":
      for (const it of key.items) {
        for (const st of it.start)
          if (st.type === "newline")
            return true;
        if (it.sep) {
          for (const st of it.sep)
            if (st.type === "newline")
              return true;
        }
        if (containsNewline(it.key) || containsNewline(it.value))
          return true;
      }
      return false;
    default:
      return true;
  }
}
__name(containsNewline, "containsNewline");

// node_modules/yaml/browser/dist/compose/util-flow-indent-check.js
function flowIndentCheck(indent, fc, onError) {
  if (fc?.type === "flow-collection") {
    const end = fc.end[0];
    if (end.indent === indent && (end.source === "]" || end.source === "}") && containsNewline(fc)) {
      const msg = "Flow end indicator should be more indented than parent";
      onError(end, "BAD_INDENT", msg, true);
    }
  }
}
__name(flowIndentCheck, "flowIndentCheck");

// node_modules/yaml/browser/dist/compose/util-map-includes.js
function mapIncludes(ctx, items, search) {
  const { uniqueKeys } = ctx.options;
  if (uniqueKeys === false)
    return false;
  const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || isScalar(a) && isScalar(b) && a.value === b.value;
  return items.some((pair) => isEqual(pair.key, search));
}
__name(mapIncludes, "mapIncludes");

// node_modules/yaml/browser/dist/compose/resolve-block-map.js
var startColMsg = "All mapping items must start at the same column";
function resolveBlockMap({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bm, onError, tag) {
  const NodeClass = tag?.nodeClass ?? YAMLMap;
  const map2 = new NodeClass(ctx.schema);
  if (ctx.atRoot)
    ctx.atRoot = false;
  let offset = bm.offset;
  let commentEnd = null;
  for (const collItem of bm.items) {
    const { start, key, sep, value } = collItem;
    const keyProps = resolveProps(start, {
      indicator: "explicit-key-ind",
      next: key ?? sep?.[0],
      offset,
      onError,
      parentIndent: bm.indent,
      startOnNewline: true
    });
    const implicitKey = !keyProps.found;
    if (implicitKey) {
      if (key) {
        if (key.type === "block-seq")
          onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
        else if ("indent" in key && key.indent !== bm.indent)
          onError(offset, "BAD_INDENT", startColMsg);
      }
      if (!keyProps.anchor && !keyProps.tag && !sep) {
        commentEnd = keyProps.end;
        if (keyProps.comment) {
          if (map2.comment)
            map2.comment += "\n" + keyProps.comment;
          else
            map2.comment = keyProps.comment;
        }
        continue;
      }
      if (keyProps.newlineAfterProp || containsNewline(key)) {
        onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
      }
    } else if (keyProps.found?.indent !== bm.indent) {
      onError(offset, "BAD_INDENT", startColMsg);
    }
    ctx.atKey = true;
    const keyStart = keyProps.end;
    const keyNode = key ? composeNode2(ctx, key, keyProps, onError) : composeEmptyNode2(ctx, keyStart, start, null, keyProps, onError);
    if (ctx.schema.compat)
      flowIndentCheck(bm.indent, key, onError);
    ctx.atKey = false;
    if (mapIncludes(ctx, map2.items, keyNode))
      onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
    const valueProps = resolveProps(sep ?? [], {
      indicator: "map-value-ind",
      next: value,
      offset: keyNode.range[2],
      onError,
      parentIndent: bm.indent,
      startOnNewline: !key || key.type === "block-scalar"
    });
    offset = valueProps.end;
    if (valueProps.found) {
      if (implicitKey) {
        if (value?.type === "block-map" && !valueProps.hasNewline)
          onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
        if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
          onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
      }
      const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : composeEmptyNode2(ctx, offset, sep, null, valueProps, onError);
      if (ctx.schema.compat)
        flowIndentCheck(bm.indent, value, onError);
      offset = valueNode.range[2];
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens)
        pair.srcToken = collItem;
      map2.items.push(pair);
    } else {
      if (implicitKey)
        onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
      if (valueProps.comment) {
        if (keyNode.comment)
          keyNode.comment += "\n" + valueProps.comment;
        else
          keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode);
      if (ctx.options.keepSourceTokens)
        pair.srcToken = collItem;
      map2.items.push(pair);
    }
  }
  if (commentEnd && commentEnd < offset)
    onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
  map2.range = [bm.offset, offset, commentEnd ?? offset];
  return map2;
}
__name(resolveBlockMap, "resolveBlockMap");

// node_modules/yaml/browser/dist/compose/resolve-block-seq.js
function resolveBlockSeq({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bs, onError, tag) {
  const NodeClass = tag?.nodeClass ?? YAMLSeq;
  const seq2 = new NodeClass(ctx.schema);
  if (ctx.atRoot)
    ctx.atRoot = false;
  if (ctx.atKey)
    ctx.atKey = false;
  let offset = bs.offset;
  let commentEnd = null;
  for (const { start, value } of bs.items) {
    const props = resolveProps(start, {
      indicator: "seq-item-ind",
      next: value,
      offset,
      onError,
      parentIndent: bs.indent,
      startOnNewline: true
    });
    if (!props.found) {
      if (props.anchor || props.tag || value) {
        if (value && value.type === "block-seq")
          onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
        else
          onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
      } else {
        commentEnd = props.end;
        if (props.comment)
          seq2.comment = props.comment;
        continue;
      }
    }
    const node = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, start, null, props, onError);
    if (ctx.schema.compat)
      flowIndentCheck(bs.indent, value, onError);
    offset = node.range[2];
    seq2.items.push(node);
  }
  seq2.range = [bs.offset, offset, commentEnd ?? offset];
  return seq2;
}
__name(resolveBlockSeq, "resolveBlockSeq");

// node_modules/yaml/browser/dist/compose/resolve-end.js
function resolveEnd(end, offset, reqSpace, onError) {
  let comment = "";
  if (end) {
    let hasSpace = false;
    let sep = "";
    for (const token of end) {
      const { source, type } = token;
      switch (type) {
        case "space":
          hasSpace = true;
          break;
        case "comment": {
          if (reqSpace && !hasSpace)
            onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const cb = source.substring(1) || " ";
          if (!comment)
            comment = cb;
          else
            comment += sep + cb;
          sep = "";
          break;
        }
        case "newline":
          if (comment)
            sep += source;
          hasSpace = true;
          break;
        default:
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
      }
      offset += source.length;
    }
  }
  return { comment, offset };
}
__name(resolveEnd, "resolveEnd");

// node_modules/yaml/browser/dist/compose/resolve-flow-collection.js
var blockMsg = "Block collections are not allowed within flow collections";
var isBlock = /* @__PURE__ */ __name((token) => token && (token.type === "block-map" || token.type === "block-seq"), "isBlock");
function resolveFlowCollection({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, fc, onError, tag) {
  const isMap2 = fc.start.source === "{";
  const fcName = isMap2 ? "flow map" : "flow sequence";
  const NodeClass = tag?.nodeClass ?? (isMap2 ? YAMLMap : YAMLSeq);
  const coll = new NodeClass(ctx.schema);
  coll.flow = true;
  const atRoot = ctx.atRoot;
  if (atRoot)
    ctx.atRoot = false;
  if (ctx.atKey)
    ctx.atKey = false;
  let offset = fc.offset + fc.start.source.length;
  for (let i = 0; i < fc.items.length; ++i) {
    const collItem = fc.items[i];
    const { start, key, sep, value } = collItem;
    const props = resolveProps(start, {
      flow: fcName,
      indicator: "explicit-key-ind",
      next: key ?? sep?.[0],
      offset,
      onError,
      parentIndent: fc.indent,
      startOnNewline: false
    });
    if (!props.found) {
      if (!props.anchor && !props.tag && !sep && !value) {
        if (i === 0 && props.comma)
          onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        else if (i < fc.items.length - 1)
          onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
        if (props.comment) {
          if (coll.comment)
            coll.comment += "\n" + props.comment;
          else
            coll.comment = props.comment;
        }
        offset = props.end;
        continue;
      }
      if (!isMap2 && ctx.options.strict && containsNewline(key))
        onError(
          key,
          // checked by containsNewline()
          "MULTILINE_IMPLICIT_KEY",
          "Implicit keys of flow sequence pairs need to be on a single line"
        );
    }
    if (i === 0) {
      if (props.comma)
        onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
    } else {
      if (!props.comma)
        onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
      if (props.comment) {
        let prevItemComment = "";
        loop: for (const st of start) {
          switch (st.type) {
            case "comma":
            case "space":
              break;
            case "comment":
              prevItemComment = st.source.substring(1);
              break loop;
            default:
              break loop;
          }
        }
        if (prevItemComment) {
          let prev = coll.items[coll.items.length - 1];
          if (isPair(prev))
            prev = prev.value ?? prev.key;
          if (prev.comment)
            prev.comment += "\n" + prevItemComment;
          else
            prev.comment = prevItemComment;
          props.comment = props.comment.substring(prevItemComment.length + 1);
        }
      }
    }
    if (!isMap2 && !sep && !props.found) {
      const valueNode = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, sep, null, props, onError);
      coll.items.push(valueNode);
      offset = valueNode.range[2];
      if (isBlock(value))
        onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
    } else {
      ctx.atKey = true;
      const keyStart = props.end;
      const keyNode = key ? composeNode2(ctx, key, props, onError) : composeEmptyNode2(ctx, keyStart, start, null, props, onError);
      if (isBlock(key))
        onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
      ctx.atKey = false;
      const valueProps = resolveProps(sep ?? [], {
        flow: fcName,
        indicator: "map-value-ind",
        next: value,
        offset: keyNode.range[2],
        onError,
        parentIndent: fc.indent,
        startOnNewline: false
      });
      if (valueProps.found) {
        if (!isMap2 && !props.found && ctx.options.strict) {
          if (sep)
            for (const st of sep) {
              if (st === valueProps.found)
                break;
              if (st.type === "newline") {
                onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          if (props.start < valueProps.found.offset - 1024)
            onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else if (value) {
        if ("source" in value && value.source && value.source[0] === ":")
          onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
        else
          onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
      }
      const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode2(ctx, valueProps.end, sep, null, valueProps, onError) : null;
      if (valueNode) {
        if (isBlock(value))
          onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
      } else if (valueProps.comment) {
        if (keyNode.comment)
          keyNode.comment += "\n" + valueProps.comment;
        else
          keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens)
        pair.srcToken = collItem;
      if (isMap2) {
        const map2 = coll;
        if (mapIncludes(ctx, map2.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        map2.items.push(pair);
      } else {
        const map2 = new YAMLMap(ctx.schema);
        map2.flow = true;
        map2.items.push(pair);
        const endRange = (valueNode ?? keyNode).range;
        map2.range = [keyNode.range[0], endRange[1], endRange[2]];
        coll.items.push(map2);
      }
      offset = valueNode ? valueNode.range[2] : valueProps.end;
    }
  }
  const expectedEnd = isMap2 ? "}" : "]";
  const [ce, ...ee] = fc.end;
  let cePos = offset;
  if (ce && ce.source === expectedEnd)
    cePos = ce.offset + ce.source.length;
  else {
    const name = fcName[0].toUpperCase() + fcName.substring(1);
    const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
    onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
    if (ce && ce.source.length !== 1)
      ee.unshift(ce);
  }
  if (ee.length > 0) {
    const end = resolveEnd(ee, cePos, ctx.options.strict, onError);
    if (end.comment) {
      if (coll.comment)
        coll.comment += "\n" + end.comment;
      else
        coll.comment = end.comment;
    }
    coll.range = [fc.offset, cePos, end.offset];
  } else {
    coll.range = [fc.offset, cePos, cePos];
  }
  return coll;
}
__name(resolveFlowCollection, "resolveFlowCollection");

// node_modules/yaml/browser/dist/compose/compose-collection.js
function resolveCollection(CN2, ctx, token, onError, tagName, tag) {
  const coll = token.type === "block-map" ? resolveBlockMap(CN2, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq(CN2, ctx, token, onError, tag) : resolveFlowCollection(CN2, ctx, token, onError, tag);
  const Coll = coll.constructor;
  if (tagName === "!" || tagName === Coll.tagName) {
    coll.tag = Coll.tagName;
    return coll;
  }
  if (tagName)
    coll.tag = tagName;
  return coll;
}
__name(resolveCollection, "resolveCollection");
function composeCollection(CN2, ctx, token, props, onError) {
  const tagToken = props.tag;
  const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
  if (token.type === "block-seq") {
    const { anchor, newlineAfterProp: nl } = props;
    const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
    if (lastProp && (!nl || nl.offset < lastProp.offset)) {
      const message = "Missing newline after block sequence props";
      onError(lastProp, "MISSING_CHAR", message);
    }
  }
  const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
  if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.tagName && expType === "seq") {
    return resolveCollection(CN2, ctx, token, onError, tagName);
  }
  let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
  if (!tag) {
    const kt = ctx.schema.knownTags[tagName];
    if (kt && kt.collection === expType) {
      ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
      tag = kt;
    } else {
      if (kt) {
        onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
      } else {
        onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
      }
      return resolveCollection(CN2, ctx, token, onError, tagName);
    }
  }
  const coll = resolveCollection(CN2, ctx, token, onError, tagName, tag);
  const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
  const node = isNode(res) ? res : new Scalar(res);
  node.range = coll.range;
  node.tag = tagName;
  if (tag?.format)
    node.format = tag.format;
  return node;
}
__name(composeCollection, "composeCollection");

// node_modules/yaml/browser/dist/compose/resolve-block-scalar.js
function resolveBlockScalar(ctx, scalar, onError) {
  const start = scalar.offset;
  const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
  if (!header)
    return { value: "", type: null, comment: "", range: [start, start, start] };
  const type = header.mode === ">" ? Scalar.BLOCK_FOLDED : Scalar.BLOCK_LITERAL;
  const lines = scalar.source ? splitLines(scalar.source) : [];
  let chompStart = lines.length;
  for (let i = lines.length - 1; i >= 0; --i) {
    const content = lines[i][1];
    if (content === "" || content === "\r")
      chompStart = i;
    else
      break;
  }
  if (chompStart === 0) {
    const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
    let end2 = start + header.length;
    if (scalar.source)
      end2 += scalar.source.length;
    return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
  }
  let trimIndent = scalar.indent + header.indent;
  let offset = scalar.offset + header.length;
  let contentStart = 0;
  for (let i = 0; i < chompStart; ++i) {
    const [indent, content] = lines[i];
    if (content === "" || content === "\r") {
      if (header.indent === 0 && indent.length > trimIndent)
        trimIndent = indent.length;
    } else {
      if (indent.length < trimIndent) {
        const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
        onError(offset + indent.length, "MISSING_CHAR", message);
      }
      if (header.indent === 0)
        trimIndent = indent.length;
      contentStart = i;
      if (trimIndent === 0 && !ctx.atRoot) {
        const message = "Block scalar values in collections must be indented";
        onError(offset, "BAD_INDENT", message);
      }
      break;
    }
    offset += indent.length + content.length + 1;
  }
  for (let i = lines.length - 1; i >= chompStart; --i) {
    if (lines[i][0].length > trimIndent)
      chompStart = i + 1;
  }
  let value = "";
  let sep = "";
  let prevMoreIndented = false;
  for (let i = 0; i < contentStart; ++i)
    value += lines[i][0].slice(trimIndent) + "\n";
  for (let i = contentStart; i < chompStart; ++i) {
    let [indent, content] = lines[i];
    offset += indent.length + content.length + 1;
    const crlf = content[content.length - 1] === "\r";
    if (crlf)
      content = content.slice(0, -1);
    if (content && indent.length < trimIndent) {
      const src = header.indent ? "explicit indentation indicator" : "first line";
      const message = `Block scalar lines must not be less indented than their ${src}`;
      onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
      indent = "";
    }
    if (type === Scalar.BLOCK_LITERAL) {
      value += sep + indent.slice(trimIndent) + content;
      sep = "\n";
    } else if (indent.length > trimIndent || content[0] === "	") {
      if (sep === " ")
        sep = "\n";
      else if (!prevMoreIndented && sep === "\n")
        sep = "\n\n";
      value += sep + indent.slice(trimIndent) + content;
      sep = "\n";
      prevMoreIndented = true;
    } else if (content === "") {
      if (sep === "\n")
        value += "\n";
      else
        sep = "\n";
    } else {
      value += sep + content;
      sep = " ";
      prevMoreIndented = false;
    }
  }
  switch (header.chomp) {
    case "-":
      break;
    case "+":
      for (let i = chompStart; i < lines.length; ++i)
        value += "\n" + lines[i][0].slice(trimIndent);
      if (value[value.length - 1] !== "\n")
        value += "\n";
      break;
    default:
      value += "\n";
  }
  const end = start + header.length + scalar.source.length;
  return { value, type, comment: header.comment, range: [start, end, end] };
}
__name(resolveBlockScalar, "resolveBlockScalar");
function parseBlockScalarHeader({ offset, props }, strict, onError) {
  if (props[0].type !== "block-scalar-header") {
    onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
    return null;
  }
  const { source } = props[0];
  const mode = source[0];
  let indent = 0;
  let chomp = "";
  let error3 = -1;
  for (let i = 1; i < source.length; ++i) {
    const ch = source[i];
    if (!chomp && (ch === "-" || ch === "+"))
      chomp = ch;
    else {
      const n = Number(ch);
      if (!indent && n)
        indent = n;
      else if (error3 === -1)
        error3 = offset + i;
    }
  }
  if (error3 !== -1)
    onError(error3, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
  let hasSpace = false;
  let comment = "";
  let length = source.length;
  for (let i = 1; i < props.length; ++i) {
    const token = props[i];
    switch (token.type) {
      case "space":
        hasSpace = true;
      // fallthrough
      case "newline":
        length += token.source.length;
        break;
      case "comment":
        if (strict && !hasSpace) {
          const message = "Comments must be separated from other tokens by white space characters";
          onError(token, "MISSING_CHAR", message);
        }
        length += token.source.length;
        comment = token.source.substring(1);
        break;
      case "error":
        onError(token, "UNEXPECTED_TOKEN", token.message);
        length += token.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const message = `Unexpected token in block scalar header: ${token.type}`;
        onError(token, "UNEXPECTED_TOKEN", message);
        const ts = token.source;
        if (ts && typeof ts === "string")
          length += ts.length;
      }
    }
  }
  return { mode, indent, chomp, comment, length };
}
__name(parseBlockScalarHeader, "parseBlockScalarHeader");
function splitLines(source) {
  const split = source.split(/\n( *)/);
  const first = split[0];
  const m = first.match(/^( *)/);
  const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
  const lines = [line0];
  for (let i = 1; i < split.length; i += 2)
    lines.push([split[i], split[i + 1]]);
  return lines;
}
__name(splitLines, "splitLines");

// node_modules/yaml/browser/dist/compose/resolve-flow-scalar.js
function resolveFlowScalar(scalar, strict, onError) {
  const { offset, type, source, end } = scalar;
  let _type;
  let value;
  const _onError = /* @__PURE__ */ __name((rel, code, msg) => onError(offset + rel, code, msg), "_onError");
  switch (type) {
    case "scalar":
      _type = Scalar.PLAIN;
      value = plainValue(source, _onError);
      break;
    case "single-quoted-scalar":
      _type = Scalar.QUOTE_SINGLE;
      value = singleQuotedValue(source, _onError);
      break;
    case "double-quoted-scalar":
      _type = Scalar.QUOTE_DOUBLE;
      value = doubleQuotedValue(source, _onError);
      break;
    /* istanbul ignore next should not happen */
    default:
      onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
      return {
        value: "",
        type: null,
        comment: "",
        range: [offset, offset + source.length, offset + source.length]
      };
  }
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, strict, onError);
  return {
    value,
    type: _type,
    comment: re.comment,
    range: [offset, valueEnd, re.offset]
  };
}
__name(resolveFlowScalar, "resolveFlowScalar");
function plainValue(source, onError) {
  let badChar = "";
  switch (source[0]) {
    /* istanbul ignore next should not happen */
    case "	":
      badChar = "a tab character";
      break;
    case ",":
      badChar = "flow indicator character ,";
      break;
    case "%":
      badChar = "directive indicator character %";
      break;
    case "|":
    case ">": {
      badChar = `block scalar indicator ${source[0]}`;
      break;
    }
    case "@":
    case "`": {
      badChar = `reserved character ${source[0]}`;
      break;
    }
  }
  if (badChar)
    onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
  return foldLines(source);
}
__name(plainValue, "plainValue");
function singleQuotedValue(source, onError) {
  if (source[source.length - 1] !== "'" || source.length === 1)
    onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
  return foldLines(source.slice(1, -1)).replace(/''/g, "'");
}
__name(singleQuotedValue, "singleQuotedValue");
function foldLines(source) {
  let first, line;
  try {
    first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
    line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
  } catch {
    first = /(.*?)[ \t]*\r?\n/sy;
    line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let match = first.exec(source);
  if (!match)
    return source;
  let res = match[1];
  let sep = " ";
  let pos = first.lastIndex;
  line.lastIndex = pos;
  while (match = line.exec(source)) {
    if (match[1] === "") {
      if (sep === "\n")
        res += sep;
      else
        sep = "\n";
    } else {
      res += sep + match[1];
      sep = " ";
    }
    pos = line.lastIndex;
  }
  const last = /[ \t]*(.*)/sy;
  last.lastIndex = pos;
  match = last.exec(source);
  return res + sep + (match?.[1] ?? "");
}
__name(foldLines, "foldLines");
function doubleQuotedValue(source, onError) {
  let res = "";
  for (let i = 1; i < source.length - 1; ++i) {
    const ch = source[i];
    if (ch === "\r" && source[i + 1] === "\n")
      continue;
    if (ch === "\n") {
      const { fold, offset } = foldNewline(source, i);
      res += fold;
      i = offset;
    } else if (ch === "\\") {
      let next = source[++i];
      const cc = escapeCodes[next];
      if (cc)
        res += cc;
      else if (next === "\n") {
        next = source[i + 1];
        while (next === " " || next === "	")
          next = source[++i + 1];
      } else if (next === "\r" && source[i + 1] === "\n") {
        next = source[++i + 1];
        while (next === " " || next === "	")
          next = source[++i + 1];
      } else if (next === "x" || next === "u" || next === "U") {
        const length = { x: 2, u: 4, U: 8 }[next];
        res += parseCharCode(source, i + 1, length, onError);
        i += length;
      } else {
        const raw = source.substr(i - 1, 2);
        onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        res += raw;
      }
    } else if (ch === " " || ch === "	") {
      const wsStart = i;
      let next = source[i + 1];
      while (next === " " || next === "	")
        next = source[++i + 1];
      if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
        res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
    } else {
      res += ch;
    }
  }
  if (source[source.length - 1] !== '"' || source.length === 1)
    onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
  return res;
}
__name(doubleQuotedValue, "doubleQuotedValue");
function foldNewline(source, offset) {
  let fold = "";
  let ch = source[offset + 1];
  while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
    if (ch === "\r" && source[offset + 2] !== "\n")
      break;
    if (ch === "\n")
      fold += "\n";
    offset += 1;
    ch = source[offset + 1];
  }
  if (!fold)
    fold = " ";
  return { fold, offset };
}
__name(foldNewline, "foldNewline");
var escapeCodes = {
  "0": "\0",
  // null character
  a: "\x07",
  // bell character
  b: "\b",
  // backspace
  e: "\x1B",
  // escape character
  f: "\f",
  // form feed
  n: "\n",
  // line feed
  r: "\r",
  // carriage return
  t: "	",
  // horizontal tab
  v: "\v",
  // vertical tab
  N: "\x85",
  // Unicode next line
  _: "\xA0",
  // Unicode non-breaking space
  L: "\u2028",
  // Unicode line separator
  P: "\u2029",
  // Unicode paragraph separator
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	"
};
function parseCharCode(source, offset, length, onError) {
  const cc = source.substr(offset, length);
  const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
  const code = ok ? parseInt(cc, 16) : NaN;
  if (isNaN(code)) {
    const raw = source.substr(offset - 2, length + 2);
    onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
    return raw;
  }
  return String.fromCodePoint(code);
}
__name(parseCharCode, "parseCharCode");

// node_modules/yaml/browser/dist/compose/compose-scalar.js
function composeScalar(ctx, token, tagToken, onError) {
  const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar(ctx, token, onError) : resolveFlowScalar(token, ctx.options.strict, onError);
  const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
  let tag;
  if (ctx.options.stringKeys && ctx.atKey) {
    tag = ctx.schema[SCALAR];
  } else if (tagName)
    tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
  else if (token.type === "scalar")
    tag = findScalarTagByTest(ctx, value, token, onError);
  else
    tag = ctx.schema[SCALAR];
  let scalar;
  try {
    const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
    scalar = isScalar(res) ? res : new Scalar(res);
  } catch (error3) {
    const msg = error3 instanceof Error ? error3.message : String(error3);
    onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
    scalar = new Scalar(value);
  }
  scalar.range = range;
  scalar.source = value;
  if (type)
    scalar.type = type;
  if (tagName)
    scalar.tag = tagName;
  if (tag.format)
    scalar.format = tag.format;
  if (comment)
    scalar.comment = comment;
  return scalar;
}
__name(composeScalar, "composeScalar");
function findScalarTagByName(schema4, value, tagName, tagToken, onError) {
  if (tagName === "!")
    return schema4[SCALAR];
  const matchWithTest = [];
  for (const tag of schema4.tags) {
    if (!tag.collection && tag.tag === tagName) {
      if (tag.default && tag.test)
        matchWithTest.push(tag);
      else
        return tag;
    }
  }
  for (const tag of matchWithTest)
    if (tag.test?.test(value))
      return tag;
  const kt = schema4.knownTags[tagName];
  if (kt && !kt.collection) {
    schema4.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
    return kt;
  }
  onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
  return schema4[SCALAR];
}
__name(findScalarTagByName, "findScalarTagByName");
function findScalarTagByTest({ atKey, directives, schema: schema4 }, value, token, onError) {
  const tag = schema4.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema4[SCALAR];
  if (schema4.compat) {
    const compat = schema4.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema4[SCALAR];
    if (tag.tag !== compat.tag) {
      const ts = directives.tagString(tag.tag);
      const cs = directives.tagString(compat.tag);
      const msg = `Value may be parsed as either ${ts} or ${cs}`;
      onError(token, "TAG_RESOLVE_FAILED", msg, true);
    }
  }
  return tag;
}
__name(findScalarTagByTest, "findScalarTagByTest");

// node_modules/yaml/browser/dist/compose/util-empty-scalar-position.js
function emptyScalarPosition(offset, before, pos) {
  if (before) {
    pos ?? (pos = before.length);
    for (let i = pos - 1; i >= 0; --i) {
      let st = before[i];
      switch (st.type) {
        case "space":
        case "comment":
        case "newline":
          offset -= st.source.length;
          continue;
      }
      st = before[++i];
      while (st?.type === "space") {
        offset += st.source.length;
        st = before[++i];
      }
      break;
    }
  }
  return offset;
}
__name(emptyScalarPosition, "emptyScalarPosition");

// node_modules/yaml/browser/dist/compose/compose-node.js
var CN = { composeNode, composeEmptyNode };
function composeNode(ctx, token, props, onError) {
  const atKey = ctx.atKey;
  const { spaceBefore, comment, anchor, tag } = props;
  let node;
  let isSrcToken = true;
  switch (token.type) {
    case "alias":
      node = composeAlias(ctx, token, onError);
      if (anchor || tag)
        onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      node = composeScalar(ctx, token, tag, onError);
      if (anchor)
        node.anchor = anchor.source.substring(1);
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      node = composeCollection(CN, ctx, token, props, onError);
      if (anchor)
        node.anchor = anchor.source.substring(1);
      break;
    default: {
      const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
      onError(token, "UNEXPECTED_TOKEN", message);
      node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError);
      isSrcToken = false;
    }
  }
  if (anchor && node.anchor === "")
    onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
  if (atKey && ctx.options.stringKeys && (!isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
    const msg = "With stringKeys, all keys must be strings";
    onError(tag ?? token, "NON_STRING_KEY", msg);
  }
  if (spaceBefore)
    node.spaceBefore = true;
  if (comment) {
    if (token.type === "scalar" && token.source === "")
      node.comment = comment;
    else
      node.commentBefore = comment;
  }
  if (ctx.options.keepSourceTokens && isSrcToken)
    node.srcToken = token;
  return node;
}
__name(composeNode, "composeNode");
function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
  const token = {
    type: "scalar",
    offset: emptyScalarPosition(offset, before, pos),
    indent: -1,
    source: ""
  };
  const node = composeScalar(ctx, token, tag, onError);
  if (anchor) {
    node.anchor = anchor.source.substring(1);
    if (node.anchor === "")
      onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
  }
  if (spaceBefore)
    node.spaceBefore = true;
  if (comment) {
    node.comment = comment;
    node.range[2] = end;
  }
  return node;
}
__name(composeEmptyNode, "composeEmptyNode");
function composeAlias({ options }, { offset, source, end }, onError) {
  const alias = new Alias(source.substring(1));
  if (alias.source === "")
    onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
  if (alias.source.endsWith(":"))
    onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, options.strict, onError);
  alias.range = [offset, valueEnd, re.offset];
  if (re.comment)
    alias.comment = re.comment;
  return alias;
}
__name(composeAlias, "composeAlias");

// node_modules/yaml/browser/dist/compose/compose-doc.js
function composeDoc(options, directives, { offset, start, value, end }, onError) {
  const opts = Object.assign({ _directives: directives }, options);
  const doc = new Document(void 0, opts);
  const ctx = {
    atKey: false,
    atRoot: true,
    directives: doc.directives,
    options: doc.options,
    schema: doc.schema
  };
  const props = resolveProps(start, {
    indicator: "doc-start",
    next: value ?? end?.[0],
    offset,
    onError,
    parentIndent: 0,
    startOnNewline: true
  });
  if (props.found) {
    doc.directives.docStart = true;
    if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
      onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
  }
  doc.contents = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
  const contentEnd = doc.contents.range[2];
  const re = resolveEnd(end, contentEnd, false, onError);
  if (re.comment)
    doc.comment = re.comment;
  doc.range = [offset, contentEnd, re.offset];
  return doc;
}
__name(composeDoc, "composeDoc");

// node_modules/yaml/browser/dist/compose/composer.js
function getErrorPos(src) {
  if (typeof src === "number")
    return [src, src + 1];
  if (Array.isArray(src))
    return src.length === 2 ? src : [src[0], src[1]];
  const { offset, source } = src;
  return [offset, offset + (typeof source === "string" ? source.length : 1)];
}
__name(getErrorPos, "getErrorPos");
function parsePrelude(prelude) {
  let comment = "";
  let atComment = false;
  let afterEmptyLine = false;
  for (let i = 0; i < prelude.length; ++i) {
    const source = prelude[i];
    switch (source[0]) {
      case "#":
        comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
        atComment = true;
        afterEmptyLine = false;
        break;
      case "%":
        if (prelude[i + 1]?.[0] !== "#")
          i += 1;
        atComment = false;
        break;
      default:
        if (!atComment)
          afterEmptyLine = true;
        atComment = false;
    }
  }
  return { comment, afterEmptyLine };
}
__name(parsePrelude, "parsePrelude");
var Composer = class {
  static {
    __name(this, "Composer");
  }
  constructor(options = {}) {
    this.doc = null;
    this.atDirectives = false;
    this.prelude = [];
    this.errors = [];
    this.warnings = [];
    this.onError = (source, code, message, warning) => {
      const pos = getErrorPos(source);
      if (warning)
        this.warnings.push(new YAMLWarning(pos, code, message));
      else
        this.errors.push(new YAMLParseError(pos, code, message));
    };
    this.directives = new Directives({ version: options.version || "1.2" });
    this.options = options;
  }
  decorate(doc, afterDoc) {
    const { comment, afterEmptyLine } = parsePrelude(this.prelude);
    if (comment) {
      const dc = doc.contents;
      if (afterDoc) {
        doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
      } else if (afterEmptyLine || doc.directives.docStart || !dc) {
        doc.commentBefore = comment;
      } else if (isCollection(dc) && !dc.flow && dc.items.length > 0) {
        let it = dc.items[0];
        if (isPair(it))
          it = it.key;
        const cb = it.commentBefore;
        it.commentBefore = cb ? `${comment}
${cb}` : comment;
      } else {
        const cb = dc.commentBefore;
        dc.commentBefore = cb ? `${comment}
${cb}` : comment;
      }
    }
    if (afterDoc) {
      Array.prototype.push.apply(doc.errors, this.errors);
      Array.prototype.push.apply(doc.warnings, this.warnings);
    } else {
      doc.errors = this.errors;
      doc.warnings = this.warnings;
    }
    this.prelude = [];
    this.errors = [];
    this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: parsePrelude(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(tokens, forceDoc = false, endOffset = -1) {
    for (const token of tokens)
      yield* this.next(token);
    yield* this.end(forceDoc, endOffset);
  }
  /** Advance the composer by one CST token. */
  *next(token) {
    switch (token.type) {
      case "directive":
        this.directives.add(token.source, (offset, message, warning) => {
          const pos = getErrorPos(token);
          pos[0] += offset;
          this.onError(pos, "BAD_DIRECTIVE", message, warning);
        });
        this.prelude.push(token.source);
        this.atDirectives = true;
        break;
      case "document": {
        const doc = composeDoc(this.options, this.directives, token, this.onError);
        if (this.atDirectives && !doc.directives.docStart)
          this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
        this.decorate(doc, false);
        if (this.doc)
          yield this.doc;
        this.doc = doc;
        this.atDirectives = false;
        break;
      }
      case "byte-order-mark":
      case "space":
        break;
      case "comment":
      case "newline":
        this.prelude.push(token.source);
        break;
      case "error": {
        const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
        const error3 = new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
        if (this.atDirectives || !this.doc)
          this.errors.push(error3);
        else
          this.doc.errors.push(error3);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const msg = "Unexpected doc-end without preceding document";
          this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
          break;
        }
        this.doc.directives.docEnd = true;
        const end = resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
        this.decorate(this.doc, true);
        if (end.comment) {
          const dc = this.doc.comment;
          this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
        }
        this.doc.range[2] = end.offset;
        break;
      }
      default:
        this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(forceDoc = false, endOffset = -1) {
    if (this.doc) {
      this.decorate(this.doc, true);
      yield this.doc;
      this.doc = null;
    } else if (forceDoc) {
      const opts = Object.assign({ _directives: this.directives }, this.options);
      const doc = new Document(void 0, opts);
      if (this.atDirectives)
        this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
      doc.range = [0, endOffset, endOffset];
      this.decorate(doc, false);
      yield doc;
    }
  }
};

// node_modules/yaml/browser/dist/parse/cst.js
var cst_exports = {};
__export(cst_exports, {
  BOM: () => BOM,
  DOCUMENT: () => DOCUMENT,
  FLOW_END: () => FLOW_END,
  SCALAR: () => SCALAR2,
  createScalarToken: () => createScalarToken,
  isCollection: () => isCollection2,
  isScalar: () => isScalar2,
  prettyToken: () => prettyToken,
  resolveAsScalar: () => resolveAsScalar,
  setScalarValue: () => setScalarValue,
  stringify: () => stringify2,
  tokenType: () => tokenType,
  visit: () => visit2
});

// node_modules/yaml/browser/dist/parse/cst-scalar.js
function resolveAsScalar(token, strict = true, onError) {
  if (token) {
    const _onError = /* @__PURE__ */ __name((pos, code, message) => {
      const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
      if (onError)
        onError(offset, code, message);
      else
        throw new YAMLParseError([offset, offset + 1], code, message);
    }, "_onError");
    switch (token.type) {
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return resolveFlowScalar(token, strict, _onError);
      case "block-scalar":
        return resolveBlockScalar({ options: { strict } }, token, _onError);
    }
  }
  return null;
}
__name(resolveAsScalar, "resolveAsScalar");
function createScalarToken(value, context2) {
  const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context2;
  const source = stringifyString({ type, value }, {
    implicitKey,
    indent: indent > 0 ? " ".repeat(indent) : "",
    inFlow,
    options: { blockQuote: true, lineWidth: -1 }
  });
  const end = context2.end ?? [
    { type: "newline", offset: -1, indent, source: "\n" }
  ];
  switch (source[0]) {
    case "|":
    case ">": {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      const props = [
        { type: "block-scalar-header", offset, indent, source: head }
      ];
      if (!addEndtoBlockProps(props, end))
        props.push({ type: "newline", offset: -1, indent, source: "\n" });
      return { type: "block-scalar", offset, indent, props, source: body };
    }
    case '"':
      return { type: "double-quoted-scalar", offset, indent, source, end };
    case "'":
      return { type: "single-quoted-scalar", offset, indent, source, end };
    default:
      return { type: "scalar", offset, indent, source, end };
  }
}
__name(createScalarToken, "createScalarToken");
function setScalarValue(token, value, context2 = {}) {
  let { afterKey = false, implicitKey = false, inFlow = false, type } = context2;
  let indent = "indent" in token ? token.indent : null;
  if (afterKey && typeof indent === "number")
    indent += 2;
  if (!type)
    switch (token.type) {
      case "single-quoted-scalar":
        type = "QUOTE_SINGLE";
        break;
      case "double-quoted-scalar":
        type = "QUOTE_DOUBLE";
        break;
      case "block-scalar": {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
        break;
      }
      default:
        type = "PLAIN";
    }
  const source = stringifyString({ type, value }, {
    implicitKey: implicitKey || indent === null,
    indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
    inFlow,
    options: { blockQuote: true, lineWidth: -1 }
  });
  switch (source[0]) {
    case "|":
    case ">":
      setBlockScalarValue(token, source);
      break;
    case '"':
      setFlowScalarValue(token, source, "double-quoted-scalar");
      break;
    case "'":
      setFlowScalarValue(token, source, "single-quoted-scalar");
      break;
    default:
      setFlowScalarValue(token, source, "scalar");
  }
}
__name(setScalarValue, "setScalarValue");
function setBlockScalarValue(token, source) {
  const he = source.indexOf("\n");
  const head = source.substring(0, he);
  const body = source.substring(he + 1) + "\n";
  if (token.type === "block-scalar") {
    const header = token.props[0];
    if (header.type !== "block-scalar-header")
      throw new Error("Invalid block scalar header");
    header.source = head;
    token.source = body;
  } else {
    const { offset } = token;
    const indent = "indent" in token ? token.indent : -1;
    const props = [
      { type: "block-scalar-header", offset, indent, source: head }
    ];
    if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
      props.push({ type: "newline", offset: -1, indent, source: "\n" });
    for (const key of Object.keys(token))
      if (key !== "type" && key !== "offset")
        delete token[key];
    Object.assign(token, { type: "block-scalar", indent, props, source: body });
  }
}
__name(setBlockScalarValue, "setBlockScalarValue");
function addEndtoBlockProps(props, end) {
  if (end)
    for (const st of end)
      switch (st.type) {
        case "space":
        case "comment":
          props.push(st);
          break;
        case "newline":
          props.push(st);
          return true;
      }
  return false;
}
__name(addEndtoBlockProps, "addEndtoBlockProps");
function setFlowScalarValue(token, source, type) {
  switch (token.type) {
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      token.type = type;
      token.source = source;
      break;
    case "block-scalar": {
      const end = token.props.slice(1);
      let oa = source.length;
      if (token.props[0].type === "block-scalar-header")
        oa -= token.props[0].source.length;
      for (const tok of end)
        tok.offset += oa;
      delete token.props;
      Object.assign(token, { type, source, end });
      break;
    }
    case "block-map":
    case "block-seq": {
      const offset = token.offset + source.length;
      const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
      delete token.items;
      Object.assign(token, { type, source, end: [nl] });
      break;
    }
    default: {
      const indent = "indent" in token ? token.indent : -1;
      const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
      for (const key of Object.keys(token))
        if (key !== "type" && key !== "offset")
          delete token[key];
      Object.assign(token, { type, indent, source, end });
    }
  }
}
__name(setFlowScalarValue, "setFlowScalarValue");

// node_modules/yaml/browser/dist/parse/cst-stringify.js
var stringify2 = /* @__PURE__ */ __name((cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst), "stringify");
function stringifyToken(token) {
  switch (token.type) {
    case "block-scalar": {
      let res = "";
      for (const tok of token.props)
        res += stringifyToken(tok);
      return res + token.source;
    }
    case "block-map":
    case "block-seq": {
      let res = "";
      for (const item of token.items)
        res += stringifyItem(item);
      return res;
    }
    case "flow-collection": {
      let res = token.start.source;
      for (const item of token.items)
        res += stringifyItem(item);
      for (const st of token.end)
        res += st.source;
      return res;
    }
    case "document": {
      let res = stringifyItem(token);
      if (token.end)
        for (const st of token.end)
          res += st.source;
      return res;
    }
    default: {
      let res = token.source;
      if ("end" in token && token.end)
        for (const st of token.end)
          res += st.source;
      return res;
    }
  }
}
__name(stringifyToken, "stringifyToken");
function stringifyItem({ start, key, sep, value }) {
  let res = "";
  for (const st of start)
    res += st.source;
  if (key)
    res += stringifyToken(key);
  if (sep)
    for (const st of sep)
      res += st.source;
  if (value)
    res += stringifyToken(value);
  return res;
}
__name(stringifyItem, "stringifyItem");

// node_modules/yaml/browser/dist/parse/cst-visit.js
var BREAK2 = Symbol("break visit");
var SKIP2 = Symbol("skip children");
var REMOVE2 = Symbol("remove item");
function visit2(cst, visitor) {
  if ("type" in cst && cst.type === "document")
    cst = { start: cst.start, value: cst.value };
  _visit(Object.freeze([]), cst, visitor);
}
__name(visit2, "visit");
visit2.BREAK = BREAK2;
visit2.SKIP = SKIP2;
visit2.REMOVE = REMOVE2;
visit2.itemAtPath = (cst, path) => {
  let item = cst;
  for (const [field, index] of path) {
    const tok = item?.[field];
    if (tok && "items" in tok) {
      item = tok.items[index];
    } else
      return void 0;
  }
  return item;
};
visit2.parentCollection = (cst, path) => {
  const parent = visit2.itemAtPath(cst, path.slice(0, -1));
  const field = path[path.length - 1][0];
  const coll = parent?.[field];
  if (coll && "items" in coll)
    return coll;
  throw new Error("Parent collection not found");
};
function _visit(path, item, visitor) {
  let ctrl = visitor(item, path);
  if (typeof ctrl === "symbol")
    return ctrl;
  for (const field of ["key", "value"]) {
    const token = item[field];
    if (token && "items" in token) {
      for (let i = 0; i < token.items.length; ++i) {
        const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK2)
          return BREAK2;
        else if (ci === REMOVE2) {
          token.items.splice(i, 1);
          i -= 1;
        }
      }
      if (typeof ctrl === "function" && field === "key")
        ctrl = ctrl(item, path);
    }
  }
  return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
}
__name(_visit, "_visit");

// node_modules/yaml/browser/dist/parse/cst.js
var BOM = "\uFEFF";
var DOCUMENT = "";
var FLOW_END = "";
var SCALAR2 = "";
var isCollection2 = /* @__PURE__ */ __name((token) => !!token && "items" in token, "isCollection");
var isScalar2 = /* @__PURE__ */ __name((token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar"), "isScalar");
function prettyToken(token) {
  switch (token) {
    case BOM:
      return "<BOM>";
    case DOCUMENT:
      return "<DOC>";
    case FLOW_END:
      return "<FLOW_END>";
    case SCALAR2:
      return "<SCALAR>";
    default:
      return JSON.stringify(token);
  }
}
__name(prettyToken, "prettyToken");
function tokenType(source) {
  switch (source) {
    case BOM:
      return "byte-order-mark";
    case DOCUMENT:
      return "doc-mode";
    case FLOW_END:
      return "flow-error-end";
    case SCALAR2:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case "\n":
    case "\r\n":
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (source[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}
__name(tokenType, "tokenType");

// node_modules/yaml/browser/dist/parse/lexer.js
function isEmpty(ch) {
  switch (ch) {
    case void 0:
    case " ":
    case "\n":
    case "\r":
    case "	":
      return true;
    default:
      return false;
  }
}
__name(isEmpty, "isEmpty");
var hexDigits = new Set("0123456789ABCDEFabcdef");
var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
var flowIndicatorChars = new Set(",[]{}");
var invalidAnchorChars = new Set(" ,[]{}\n\r	");
var isNotAnchorChar = /* @__PURE__ */ __name((ch) => !ch || invalidAnchorChars.has(ch), "isNotAnchorChar");
var Lexer = class {
  static {
    __name(this, "Lexer");
  }
  constructor() {
    this.atEnd = false;
    this.blockScalarIndent = -1;
    this.blockScalarKeep = false;
    this.buffer = "";
    this.flowKey = false;
    this.flowLevel = 0;
    this.indentNext = 0;
    this.indentValue = 0;
    this.lineEndPos = null;
    this.next = null;
    this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(source, incomplete = false) {
    if (source) {
      if (typeof source !== "string")
        throw TypeError("source is not a string");
      this.buffer = this.buffer ? this.buffer + source : source;
      this.lineEndPos = null;
    }
    this.atEnd = !incomplete;
    let next = this.next ?? "stream";
    while (next && (incomplete || this.hasChars(1)))
      next = yield* this.parseNext(next);
  }
  atLineEnd() {
    let i = this.pos;
    let ch = this.buffer[i];
    while (ch === " " || ch === "	")
      ch = this.buffer[++i];
    if (!ch || ch === "#" || ch === "\n")
      return true;
    if (ch === "\r")
      return this.buffer[i + 1] === "\n";
    return false;
  }
  charAt(n) {
    return this.buffer[this.pos + n];
  }
  continueScalar(offset) {
    let ch = this.buffer[offset];
    if (this.indentNext > 0) {
      let indent = 0;
      while (ch === " ")
        ch = this.buffer[++indent + offset];
      if (ch === "\r") {
        const next = this.buffer[indent + offset + 1];
        if (next === "\n" || !next && !this.atEnd)
          return offset + indent + 1;
      }
      return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
    }
    if (ch === "-" || ch === ".") {
      const dt = this.buffer.substr(offset, 3);
      if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
        return -1;
    }
    return offset;
  }
  getLine() {
    let end = this.lineEndPos;
    if (typeof end !== "number" || end !== -1 && end < this.pos) {
      end = this.buffer.indexOf("\n", this.pos);
      this.lineEndPos = end;
    }
    if (end === -1)
      return this.atEnd ? this.buffer.substring(this.pos) : null;
    if (this.buffer[end - 1] === "\r")
      end -= 1;
    return this.buffer.substring(this.pos, end);
  }
  hasChars(n) {
    return this.pos + n <= this.buffer.length;
  }
  setNext(state) {
    this.buffer = this.buffer.substring(this.pos);
    this.pos = 0;
    this.lineEndPos = null;
    this.next = state;
    return null;
  }
  peek(n) {
    return this.buffer.substr(this.pos, n);
  }
  *parseNext(next) {
    switch (next) {
      case "stream":
        return yield* this.parseStream();
      case "line-start":
        return yield* this.parseLineStart();
      case "block-start":
        return yield* this.parseBlockStart();
      case "doc":
        return yield* this.parseDocument();
      case "flow":
        return yield* this.parseFlowCollection();
      case "quoted-scalar":
        return yield* this.parseQuotedScalar();
      case "block-scalar":
        return yield* this.parseBlockScalar();
      case "plain-scalar":
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let line = this.getLine();
    if (line === null)
      return this.setNext("stream");
    if (line[0] === BOM) {
      yield* this.pushCount(1);
      line = line.substring(1);
    }
    if (line[0] === "%") {
      let dirEnd = line.length;
      let cs = line.indexOf("#");
      while (cs !== -1) {
        const ch = line[cs - 1];
        if (ch === " " || ch === "	") {
          dirEnd = cs - 1;
          break;
        } else {
          cs = line.indexOf("#", cs + 1);
        }
      }
      while (true) {
        const ch = line[dirEnd - 1];
        if (ch === " " || ch === "	")
          dirEnd -= 1;
        else
          break;
      }
      const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
      yield* this.pushCount(line.length - n);
      this.pushNewline();
      return "stream";
    }
    if (this.atLineEnd()) {
      const sp = yield* this.pushSpaces(true);
      yield* this.pushCount(line.length - sp);
      yield* this.pushNewline();
      return "stream";
    }
    yield DOCUMENT;
    return yield* this.parseLineStart();
  }
  *parseLineStart() {
    const ch = this.charAt(0);
    if (!ch && !this.atEnd)
      return this.setNext("line-start");
    if (ch === "-" || ch === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const s = this.peek(3);
      if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
        yield* this.pushCount(3);
        this.indentValue = 0;
        this.indentNext = 0;
        return s === "---" ? "doc" : "stream";
      }
    }
    this.indentValue = yield* this.pushSpaces(false);
    if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
      this.indentNext = this.indentValue;
    return yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [ch0, ch1] = this.peek(2);
    if (!ch1 && !this.atEnd)
      return this.setNext("block-start");
    if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
      const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
      this.indentNext = this.indentValue + 1;
      this.indentValue += n;
      return yield* this.parseBlockStart();
    }
    return "doc";
  }
  *parseDocument() {
    yield* this.pushSpaces(true);
    const line = this.getLine();
    if (line === null)
      return this.setNext("doc");
    let n = yield* this.pushIndicators();
    switch (line[n]) {
      case "#":
        yield* this.pushCount(line.length - n);
      // fallthrough
      case void 0:
        yield* this.pushNewline();
        return yield* this.parseLineStart();
      case "{":
      case "[":
        yield* this.pushCount(1);
        this.flowKey = false;
        this.flowLevel = 1;
        return "flow";
      case "}":
      case "]":
        yield* this.pushCount(1);
        return "doc";
      case "*":
        yield* this.pushUntil(isNotAnchorChar);
        return "doc";
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case "|":
      case ">":
        n += yield* this.parseBlockScalarHeader();
        n += yield* this.pushSpaces(true);
        yield* this.pushCount(line.length - n);
        yield* this.pushNewline();
        return yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let nl, sp;
    let indent = -1;
    do {
      nl = yield* this.pushNewline();
      if (nl > 0) {
        sp = yield* this.pushSpaces(false);
        this.indentValue = indent = sp;
      } else {
        sp = 0;
      }
      sp += yield* this.pushSpaces(true);
    } while (nl + sp > 0);
    const line = this.getLine();
    if (line === null)
      return this.setNext("flow");
    if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
      const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
      if (!atFlowEndMarker) {
        this.flowLevel = 0;
        yield FLOW_END;
        return yield* this.parseLineStart();
      }
    }
    let n = 0;
    while (line[n] === ",") {
      n += yield* this.pushCount(1);
      n += yield* this.pushSpaces(true);
      this.flowKey = false;
    }
    n += yield* this.pushIndicators();
    switch (line[n]) {
      case void 0:
        return "flow";
      case "#":
        yield* this.pushCount(line.length - n);
        return "flow";
      case "{":
      case "[":
        yield* this.pushCount(1);
        this.flowKey = false;
        this.flowLevel += 1;
        return "flow";
      case "}":
      case "]":
        yield* this.pushCount(1);
        this.flowKey = true;
        this.flowLevel -= 1;
        return this.flowLevel ? "flow" : "doc";
      case "*":
        yield* this.pushUntil(isNotAnchorChar);
        return "flow";
      case '"':
      case "'":
        this.flowKey = true;
        return yield* this.parseQuotedScalar();
      case ":": {
        const next = this.charAt(1);
        if (this.flowKey || isEmpty(next) || next === ",") {
          this.flowKey = false;
          yield* this.pushCount(1);
          yield* this.pushSpaces(true);
          return "flow";
        }
      }
      // fallthrough
      default:
        this.flowKey = false;
        return yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const quote = this.charAt(0);
    let end = this.buffer.indexOf(quote, this.pos + 1);
    if (quote === "'") {
      while (end !== -1 && this.buffer[end + 1] === "'")
        end = this.buffer.indexOf("'", end + 2);
    } else {
      while (end !== -1) {
        let n = 0;
        while (this.buffer[end - 1 - n] === "\\")
          n += 1;
        if (n % 2 === 0)
          break;
        end = this.buffer.indexOf('"', end + 1);
      }
    }
    const qb = this.buffer.substring(0, end);
    let nl = qb.indexOf("\n", this.pos);
    if (nl !== -1) {
      while (nl !== -1) {
        const cs = this.continueScalar(nl + 1);
        if (cs === -1)
          break;
        nl = qb.indexOf("\n", cs);
      }
      if (nl !== -1) {
        end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
      }
    }
    if (end === -1) {
      if (!this.atEnd)
        return this.setNext("quoted-scalar");
      end = this.buffer.length;
    }
    yield* this.pushToIndex(end + 1, false);
    return this.flowLevel ? "flow" : "doc";
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1;
    this.blockScalarKeep = false;
    let i = this.pos;
    while (true) {
      const ch = this.buffer[++i];
      if (ch === "+")
        this.blockScalarKeep = true;
      else if (ch > "0" && ch <= "9")
        this.blockScalarIndent = Number(ch) - 1;
      else if (ch !== "-")
        break;
    }
    return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
  }
  *parseBlockScalar() {
    let nl = this.pos - 1;
    let indent = 0;
    let ch;
    loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
      switch (ch) {
        case " ":
          indent += 1;
          break;
        case "\n":
          nl = i2;
          indent = 0;
          break;
        case "\r": {
          const next = this.buffer[i2 + 1];
          if (!next && !this.atEnd)
            return this.setNext("block-scalar");
          if (next === "\n")
            break;
        }
        // fallthrough
        default:
          break loop;
      }
    }
    if (!ch && !this.atEnd)
      return this.setNext("block-scalar");
    if (indent >= this.indentNext) {
      if (this.blockScalarIndent === -1)
        this.indentNext = indent;
      else {
        this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      }
      do {
        const cs = this.continueScalar(nl + 1);
        if (cs === -1)
          break;
        nl = this.buffer.indexOf("\n", cs);
      } while (nl !== -1);
      if (nl === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        nl = this.buffer.length;
      }
    }
    let i = nl + 1;
    ch = this.buffer[i];
    while (ch === " ")
      ch = this.buffer[++i];
    if (ch === "	") {
      while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
        ch = this.buffer[++i];
      nl = i - 1;
    } else if (!this.blockScalarKeep) {
      do {
        let i2 = nl - 1;
        let ch2 = this.buffer[i2];
        if (ch2 === "\r")
          ch2 = this.buffer[--i2];
        const lastChar = i2;
        while (ch2 === " ")
          ch2 = this.buffer[--i2];
        if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar)
          nl = i2;
        else
          break;
      } while (true);
    }
    yield SCALAR2;
    yield* this.pushToIndex(nl + 1, true);
    return yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const inFlow = this.flowLevel > 0;
    let end = this.pos - 1;
    let i = this.pos - 1;
    let ch;
    while (ch = this.buffer[++i]) {
      if (ch === ":") {
        const next = this.buffer[i + 1];
        if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
          break;
        end = i;
      } else if (isEmpty(ch)) {
        let next = this.buffer[i + 1];
        if (ch === "\r") {
          if (next === "\n") {
            i += 1;
            ch = "\n";
            next = this.buffer[i + 1];
          } else
            end = i;
        }
        if (next === "#" || inFlow && flowIndicatorChars.has(next))
          break;
        if (ch === "\n") {
          const cs = this.continueScalar(i + 1);
          if (cs === -1)
            break;
          i = Math.max(i, cs - 2);
        }
      } else {
        if (inFlow && flowIndicatorChars.has(ch))
          break;
        end = i;
      }
    }
    if (!ch && !this.atEnd)
      return this.setNext("plain-scalar");
    yield SCALAR2;
    yield* this.pushToIndex(end + 1, true);
    return inFlow ? "flow" : "doc";
  }
  *pushCount(n) {
    if (n > 0) {
      yield this.buffer.substr(this.pos, n);
      this.pos += n;
      return n;
    }
    return 0;
  }
  *pushToIndex(i, allowEmpty) {
    const s = this.buffer.slice(this.pos, i);
    if (s) {
      yield s;
      this.pos += s.length;
      return s.length;
    } else if (allowEmpty)
      yield "";
    return 0;
  }
  *pushIndicators() {
    switch (this.charAt(0)) {
      case "!":
        return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
      case "&":
        return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
      case "-":
      // this is an error
      case "?":
      // this is an error outside flow collections
      case ":": {
        const inFlow = this.flowLevel > 0;
        const ch1 = this.charAt(1);
        if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
          if (!inFlow)
            this.indentNext = this.indentValue + 1;
          else if (this.flowKey)
            this.flowKey = false;
          return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
        }
      }
    }
    return 0;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let i = this.pos + 2;
      let ch = this.buffer[i];
      while (!isEmpty(ch) && ch !== ">")
        ch = this.buffer[++i];
      return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
    } else {
      let i = this.pos + 1;
      let ch = this.buffer[i];
      while (ch) {
        if (tagChars.has(ch))
          ch = this.buffer[++i];
        else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
          ch = this.buffer[i += 3];
        } else
          break;
      }
      return yield* this.pushToIndex(i, false);
    }
  }
  *pushNewline() {
    const ch = this.buffer[this.pos];
    if (ch === "\n")
      return yield* this.pushCount(1);
    else if (ch === "\r" && this.charAt(1) === "\n")
      return yield* this.pushCount(2);
    else
      return 0;
  }
  *pushSpaces(allowTabs) {
    let i = this.pos - 1;
    let ch;
    do {
      ch = this.buffer[++i];
    } while (ch === " " || allowTabs && ch === "	");
    const n = i - this.pos;
    if (n > 0) {
      yield this.buffer.substr(this.pos, n);
      this.pos = i;
    }
    return n;
  }
  *pushUntil(test) {
    let i = this.pos;
    let ch = this.buffer[i];
    while (!test(ch))
      ch = this.buffer[++i];
    return yield* this.pushToIndex(i, false);
  }
};

// node_modules/yaml/browser/dist/parse/line-counter.js
var LineCounter = class {
  static {
    __name(this, "LineCounter");
  }
  constructor() {
    this.lineStarts = [];
    this.addNewLine = (offset) => this.lineStarts.push(offset);
    this.linePos = (offset) => {
      let low = 0;
      let high = this.lineStarts.length;
      while (low < high) {
        const mid = low + high >> 1;
        if (this.lineStarts[mid] < offset)
          low = mid + 1;
        else
          high = mid;
      }
      if (this.lineStarts[low] === offset)
        return { line: low + 1, col: 1 };
      if (low === 0)
        return { line: 0, col: offset };
      const start = this.lineStarts[low - 1];
      return { line: low, col: offset - start + 1 };
    };
  }
};

// node_modules/yaml/browser/dist/parse/parser.js
function includesToken(list, type) {
  for (let i = 0; i < list.length; ++i)
    if (list[i].type === type)
      return true;
  return false;
}
__name(includesToken, "includesToken");
function findNonEmptyIndex(list) {
  for (let i = 0; i < list.length; ++i) {
    switch (list[i].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return i;
    }
  }
  return -1;
}
__name(findNonEmptyIndex, "findNonEmptyIndex");
function isFlowToken(token) {
  switch (token?.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return true;
    default:
      return false;
  }
}
__name(isFlowToken, "isFlowToken");
function getPrevProps(parent) {
  switch (parent.type) {
    case "document":
      return parent.start;
    case "block-map": {
      const it = parent.items[parent.items.length - 1];
      return it.sep ?? it.start;
    }
    case "block-seq":
      return parent.items[parent.items.length - 1].start;
    /* istanbul ignore next should not happen */
    default:
      return [];
  }
}
__name(getPrevProps, "getPrevProps");
function getFirstKeyStartProps(prev) {
  if (prev.length === 0)
    return [];
  let i = prev.length;
  loop: while (--i >= 0) {
    switch (prev[i].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break loop;
    }
  }
  while (prev[++i]?.type === "space") {
  }
  return prev.splice(i, prev.length);
}
__name(getFirstKeyStartProps, "getFirstKeyStartProps");
function fixFlowSeqItems(fc) {
  if (fc.start.type === "flow-seq-start") {
    for (const it of fc.items) {
      if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
        if (it.key)
          it.value = it.key;
        delete it.key;
        if (isFlowToken(it.value)) {
          if (it.value.end)
            Array.prototype.push.apply(it.value.end, it.sep);
          else
            it.value.end = it.sep;
        } else
          Array.prototype.push.apply(it.start, it.sep);
        delete it.sep;
      }
    }
  }
}
__name(fixFlowSeqItems, "fixFlowSeqItems");
var Parser = class {
  static {
    __name(this, "Parser");
  }
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(onNewLine) {
    this.atNewLine = true;
    this.atScalar = false;
    this.indent = 0;
    this.offset = 0;
    this.onKeyLine = false;
    this.stack = [];
    this.source = "";
    this.type = "";
    this.lexer = new Lexer();
    this.onNewLine = onNewLine;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(source, incomplete = false) {
    if (this.onNewLine && this.offset === 0)
      this.onNewLine(0);
    for (const lexeme of this.lexer.lex(source, incomplete))
      yield* this.next(lexeme);
    if (!incomplete)
      yield* this.end();
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(source) {
    this.source = source;
    if (this.atScalar) {
      this.atScalar = false;
      yield* this.step();
      this.offset += source.length;
      return;
    }
    const type = tokenType(source);
    if (!type) {
      const message = `Not a YAML token: ${source}`;
      yield* this.pop({ type: "error", offset: this.offset, message, source });
      this.offset += source.length;
    } else if (type === "scalar") {
      this.atNewLine = false;
      this.atScalar = true;
      this.type = "scalar";
    } else {
      this.type = type;
      yield* this.step();
      switch (type) {
        case "newline":
          this.atNewLine = true;
          this.indent = 0;
          if (this.onNewLine)
            this.onNewLine(this.offset + source.length);
          break;
        case "space":
          if (this.atNewLine && source[0] === " ")
            this.indent += source.length;
          break;
        case "explicit-key-ind":
        case "map-value-ind":
        case "seq-item-ind":
          if (this.atNewLine)
            this.indent += source.length;
          break;
        case "doc-mode":
        case "flow-error-end":
          return;
        default:
          this.atNewLine = false;
      }
      this.offset += source.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    while (this.stack.length > 0)
      yield* this.pop();
  }
  get sourceToken() {
    const st = {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
    return st;
  }
  *step() {
    const top = this.peek(1);
    if (this.type === "doc-end" && (!top || top.type !== "doc-end")) {
      while (this.stack.length > 0)
        yield* this.pop();
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!top)
      return yield* this.stream();
    switch (top.type) {
      case "document":
        return yield* this.document(top);
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(top);
      case "block-scalar":
        return yield* this.blockScalar(top);
      case "block-map":
        return yield* this.blockMap(top);
      case "block-seq":
        return yield* this.blockSequence(top);
      case "flow-collection":
        return yield* this.flowCollection(top);
      case "doc-end":
        return yield* this.documentEnd(top);
    }
    yield* this.pop();
  }
  peek(n) {
    return this.stack[this.stack.length - n];
  }
  *pop(error3) {
    const token = error3 ?? this.stack.pop();
    if (!token) {
      const message = "Tried to pop an empty stack";
      yield { type: "error", offset: this.offset, source: "", message };
    } else if (this.stack.length === 0) {
      yield token;
    } else {
      const top = this.peek(1);
      if (token.type === "block-scalar") {
        token.indent = "indent" in top ? top.indent : 0;
      } else if (token.type === "flow-collection" && top.type === "document") {
        token.indent = 0;
      }
      if (token.type === "flow-collection")
        fixFlowSeqItems(token);
      switch (top.type) {
        case "document":
          top.value = token;
          break;
        case "block-scalar":
          top.props.push(token);
          break;
        case "block-map": {
          const it = top.items[top.items.length - 1];
          if (it.value) {
            top.items.push({ start: [], key: token, sep: [] });
            this.onKeyLine = true;
            return;
          } else if (it.sep) {
            it.value = token;
          } else {
            Object.assign(it, { key: token, sep: [] });
            this.onKeyLine = !it.explicitKey;
            return;
          }
          break;
        }
        case "block-seq": {
          const it = top.items[top.items.length - 1];
          if (it.value)
            top.items.push({ start: [], value: token });
          else
            it.value = token;
          break;
        }
        case "flow-collection": {
          const it = top.items[top.items.length - 1];
          if (!it || it.value)
            top.items.push({ start: [], key: token, sep: [] });
          else if (it.sep)
            it.value = token;
          else
            Object.assign(it, { key: token, sep: [] });
          return;
        }
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop();
          yield* this.pop(token);
      }
      if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
        const last = token.items[token.items.length - 1];
        if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
          if (top.type === "document")
            top.end = last.start;
          else
            top.items.push({ start: last.start });
          token.items.splice(-1, 1);
        }
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield { type: "directive", offset: this.offset, source: this.source };
        return;
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken;
        return;
      case "doc-mode":
      case "doc-start": {
        const doc = {
          type: "document",
          offset: this.offset,
          start: []
        };
        if (this.type === "doc-start")
          doc.start.push(this.sourceToken);
        this.stack.push(doc);
        return;
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(doc) {
    if (doc.value)
      return yield* this.lineEnd(doc);
    switch (this.type) {
      case "doc-start": {
        if (findNonEmptyIndex(doc.start) !== -1) {
          yield* this.pop();
          yield* this.step();
        } else
          doc.start.push(this.sourceToken);
        return;
      }
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        doc.start.push(this.sourceToken);
        return;
    }
    const bv = this.startBlockValue(doc);
    if (bv)
      this.stack.push(bv);
    else {
      yield {
        type: "error",
        offset: this.offset,
        message: `Unexpected ${this.type} token in YAML document`,
        source: this.source
      };
    }
  }
  *scalar(scalar) {
    if (this.type === "map-value-ind") {
      const prev = getPrevProps(this.peek(2));
      const start = getFirstKeyStartProps(prev);
      let sep;
      if (scalar.end) {
        sep = scalar.end;
        sep.push(this.sourceToken);
        delete scalar.end;
      } else
        sep = [this.sourceToken];
      const map2 = {
        type: "block-map",
        offset: scalar.offset,
        indent: scalar.indent,
        items: [{ start, key: scalar, sep }]
      };
      this.onKeyLine = true;
      this.stack[this.stack.length - 1] = map2;
    } else
      yield* this.lineEnd(scalar);
  }
  *blockScalar(scalar) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        scalar.props.push(this.sourceToken);
        return;
      case "scalar":
        scalar.source = this.source;
        this.atNewLine = true;
        this.indent = 0;
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        yield* this.pop();
        break;
      /* istanbul ignore next should not happen */
      default:
        yield* this.pop();
        yield* this.step();
    }
  }
  *blockMap(map2) {
    const it = map2.items[map2.items.length - 1];
    switch (this.type) {
      case "newline":
        this.onKeyLine = false;
        if (it.value) {
          const end = "end" in it.value ? it.value.end : void 0;
          const last = Array.isArray(end) ? end[end.length - 1] : void 0;
          if (last?.type === "comment")
            end?.push(this.sourceToken);
          else
            map2.items.push({ start: [this.sourceToken] });
        } else if (it.sep) {
          it.sep.push(this.sourceToken);
        } else {
          it.start.push(this.sourceToken);
        }
        return;
      case "space":
      case "comment":
        if (it.value) {
          map2.items.push({ start: [this.sourceToken] });
        } else if (it.sep) {
          it.sep.push(this.sourceToken);
        } else {
          if (this.atIndentedComment(it.start, map2.indent)) {
            const prev = map2.items[map2.items.length - 2];
            const end = prev?.value?.end;
            if (Array.isArray(end)) {
              Array.prototype.push.apply(end, it.start);
              end.push(this.sourceToken);
              map2.items.pop();
              return;
            }
          }
          it.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= map2.indent) {
      const atMapIndent = !this.onKeyLine && this.indent === map2.indent;
      const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
      let start = [];
      if (atNextItem && it.sep && !it.value) {
        const nl = [];
        for (let i = 0; i < it.sep.length; ++i) {
          const st = it.sep[i];
          switch (st.type) {
            case "newline":
              nl.push(i);
              break;
            case "space":
              break;
            case "comment":
              if (st.indent > map2.indent)
                nl.length = 0;
              break;
            default:
              nl.length = 0;
          }
        }
        if (nl.length >= 2)
          start = it.sep.splice(nl[1]);
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          if (atNextItem || it.value) {
            start.push(this.sourceToken);
            map2.items.push({ start });
            this.onKeyLine = true;
          } else if (it.sep) {
            it.sep.push(this.sourceToken);
          } else {
            it.start.push(this.sourceToken);
          }
          return;
        case "explicit-key-ind":
          if (!it.sep && !it.explicitKey) {
            it.start.push(this.sourceToken);
            it.explicitKey = true;
          } else if (atNextItem || it.value) {
            start.push(this.sourceToken);
            map2.items.push({ start, explicitKey: true });
          } else {
            this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken], explicitKey: true }]
            });
          }
          this.onKeyLine = true;
          return;
        case "map-value-ind":
          if (it.explicitKey) {
            if (!it.sep) {
              if (includesToken(it.start, "newline")) {
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              } else {
                const start2 = getFirstKeyStartProps(it.start);
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                });
              }
            } else if (it.value) {
              map2.items.push({ start: [], key: null, sep: [this.sourceToken] });
            } else if (includesToken(it.sep, "map-value-ind")) {
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start, key: null, sep: [this.sourceToken] }]
              });
            } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
              const start2 = getFirstKeyStartProps(it.start);
              const key = it.key;
              const sep = it.sep;
              sep.push(this.sourceToken);
              delete it.key;
              delete it.sep;
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: start2, key, sep }]
              });
            } else if (start.length > 0) {
              it.sep = it.sep.concat(start, this.sourceToken);
            } else {
              it.sep.push(this.sourceToken);
            }
          } else {
            if (!it.sep) {
              Object.assign(it, { key: null, sep: [this.sourceToken] });
            } else if (it.value || atNextItem) {
              map2.items.push({ start, key: null, sep: [this.sourceToken] });
            } else if (includesToken(it.sep, "map-value-ind")) {
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: [], key: null, sep: [this.sourceToken] }]
              });
            } else {
              it.sep.push(this.sourceToken);
            }
          }
          this.onKeyLine = true;
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const fs = this.flowScalar(this.type);
          if (atNextItem || it.value) {
            map2.items.push({ start, key: fs, sep: [] });
            this.onKeyLine = true;
          } else if (it.sep) {
            this.stack.push(fs);
          } else {
            Object.assign(it, { key: fs, sep: [] });
            this.onKeyLine = true;
          }
          return;
        }
        default: {
          const bv = this.startBlockValue(map2);
          if (bv) {
            if (bv.type === "block-seq") {
              if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                yield* this.pop({
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected block-seq-ind on same line with key",
                  source: this.source
                });
                return;
              }
            } else if (atMapIndent) {
              map2.items.push({ start });
            }
            this.stack.push(bv);
            return;
          }
        }
      }
    }
    yield* this.pop();
    yield* this.step();
  }
  *blockSequence(seq2) {
    const it = seq2.items[seq2.items.length - 1];
    switch (this.type) {
      case "newline":
        if (it.value) {
          const end = "end" in it.value ? it.value.end : void 0;
          const last = Array.isArray(end) ? end[end.length - 1] : void 0;
          if (last?.type === "comment")
            end?.push(this.sourceToken);
          else
            seq2.items.push({ start: [this.sourceToken] });
        } else
          it.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (it.value)
          seq2.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(it.start, seq2.indent)) {
            const prev = seq2.items[seq2.items.length - 2];
            const end = prev?.value?.end;
            if (Array.isArray(end)) {
              Array.prototype.push.apply(end, it.start);
              end.push(this.sourceToken);
              seq2.items.pop();
              return;
            }
          }
          it.start.push(this.sourceToken);
        }
        return;
      case "anchor":
      case "tag":
        if (it.value || this.indent <= seq2.indent)
          break;
        it.start.push(this.sourceToken);
        return;
      case "seq-item-ind":
        if (this.indent !== seq2.indent)
          break;
        if (it.value || includesToken(it.start, "seq-item-ind"))
          seq2.items.push({ start: [this.sourceToken] });
        else
          it.start.push(this.sourceToken);
        return;
    }
    if (this.indent > seq2.indent) {
      const bv = this.startBlockValue(seq2);
      if (bv) {
        this.stack.push(bv);
        return;
      }
    }
    yield* this.pop();
    yield* this.step();
  }
  *flowCollection(fc) {
    const it = fc.items[fc.items.length - 1];
    if (this.type === "flow-error-end") {
      let top;
      do {
        yield* this.pop();
        top = this.peek(1);
      } while (top && top.type === "flow-collection");
    } else if (fc.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          if (!it || it.sep)
            fc.items.push({ start: [this.sourceToken] });
          else
            it.start.push(this.sourceToken);
          return;
        case "map-value-ind":
          if (!it || it.value)
            fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
          else if (it.sep)
            it.sep.push(this.sourceToken);
          else
            Object.assign(it, { key: null, sep: [this.sourceToken] });
          return;
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          if (!it || it.value)
            fc.items.push({ start: [this.sourceToken] });
          else if (it.sep)
            it.sep.push(this.sourceToken);
          else
            it.start.push(this.sourceToken);
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const fs = this.flowScalar(this.type);
          if (!it || it.value)
            fc.items.push({ start: [], key: fs, sep: [] });
          else if (it.sep)
            this.stack.push(fs);
          else
            Object.assign(it, { key: fs, sep: [] });
          return;
        }
        case "flow-map-end":
        case "flow-seq-end":
          fc.end.push(this.sourceToken);
          return;
      }
      const bv = this.startBlockValue(fc);
      if (bv)
        this.stack.push(bv);
      else {
        yield* this.pop();
        yield* this.step();
      }
    } else {
      const parent = this.peek(2);
      if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
        yield* this.pop();
        yield* this.step();
      } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        fixFlowSeqItems(fc);
        const sep = fc.end.splice(1, fc.end.length);
        sep.push(this.sourceToken);
        const map2 = {
          type: "block-map",
          offset: fc.offset,
          indent: fc.indent,
          items: [{ start, key: fc, sep }]
        };
        this.onKeyLine = true;
        this.stack[this.stack.length - 1] = map2;
      } else {
        yield* this.lineEnd(fc);
      }
    }
  }
  flowScalar(type) {
    if (this.onNewLine) {
      let nl = this.source.indexOf("\n") + 1;
      while (nl !== 0) {
        this.onNewLine(this.offset + nl);
        nl = this.source.indexOf("\n", nl) + 1;
      }
    }
    return {
      type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(parent) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type);
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ""
        };
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }]
        };
      case "explicit-key-ind": {
        this.onKeyLine = true;
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        start.push(this.sourceToken);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start, explicitKey: true }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = true;
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(start, indent) {
    if (this.type !== "comment")
      return false;
    if (this.indent <= indent)
      return false;
    return start.every((st) => st.type === "newline" || st.type === "space");
  }
  *documentEnd(docEnd) {
    if (this.type !== "doc-mode") {
      if (docEnd.end)
        docEnd.end.push(this.sourceToken);
      else
        docEnd.end = [this.sourceToken];
      if (this.type === "newline")
        yield* this.pop();
    }
  }
  *lineEnd(token) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop();
        yield* this.step();
        break;
      case "newline":
        this.onKeyLine = false;
      // fallthrough
      case "space":
      case "comment":
      default:
        if (token.end)
          token.end.push(this.sourceToken);
        else
          token.end = [this.sourceToken];
        if (this.type === "newline")
          yield* this.pop();
    }
  }
};

// node_modules/yaml/browser/dist/public-api.js
function parseOptions(options) {
  const prettyErrors = options.prettyErrors !== false;
  const lineCounter = options.lineCounter || prettyErrors && new LineCounter() || null;
  return { lineCounter, prettyErrors };
}
__name(parseOptions, "parseOptions");
function parseAllDocuments(source, options = {}) {
  const { lineCounter, prettyErrors } = parseOptions(options);
  const parser = new Parser(lineCounter?.addNewLine);
  const composer = new Composer(options);
  const docs = Array.from(composer.compose(parser.parse(source)));
  if (prettyErrors && lineCounter)
    for (const doc of docs) {
      doc.errors.forEach(prettifyError(source, lineCounter));
      doc.warnings.forEach(prettifyError(source, lineCounter));
    }
  if (docs.length > 0)
    return docs;
  return Object.assign([], { empty: true }, composer.streamInfo());
}
__name(parseAllDocuments, "parseAllDocuments");
function parseDocument(source, options = {}) {
  const { lineCounter, prettyErrors } = parseOptions(options);
  const parser = new Parser(lineCounter?.addNewLine);
  const composer = new Composer(options);
  let doc = null;
  for (const _doc of composer.compose(parser.parse(source), true, source.length)) {
    if (!doc)
      doc = _doc;
    else if (doc.options.logLevel !== "silent") {
      doc.errors.push(new YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  }
  if (prettyErrors && lineCounter) {
    doc.errors.forEach(prettifyError(source, lineCounter));
    doc.warnings.forEach(prettifyError(source, lineCounter));
  }
  return doc;
}
__name(parseDocument, "parseDocument");
function parse(src, reviver, options) {
  let _reviver = void 0;
  if (typeof reviver === "function") {
    _reviver = reviver;
  } else if (options === void 0 && reviver && typeof reviver === "object") {
    options = reviver;
  }
  const doc = parseDocument(src, options);
  if (!doc)
    return null;
  doc.warnings.forEach((warning) => warn3(doc.options.logLevel, warning));
  if (doc.errors.length > 0) {
    if (doc.options.logLevel !== "silent")
      throw doc.errors[0];
    else
      doc.errors = [];
  }
  return doc.toJS(Object.assign({ reviver: _reviver }, options));
}
__name(parse, "parse");
function stringify3(value, replacer, options) {
  let _replacer = null;
  if (typeof replacer === "function" || Array.isArray(replacer)) {
    _replacer = replacer;
  } else if (options === void 0 && replacer) {
    options = replacer;
  }
  if (typeof options === "string")
    options = options.length;
  if (typeof options === "number") {
    const indent = Math.round(options);
    options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
  }
  if (value === void 0) {
    const { keepUndefined } = options ?? replacer ?? {};
    if (!keepUndefined)
      return void 0;
  }
  if (isDocument(value) && !_replacer)
    return value.toString(options);
  return new Document(value, _replacer, options).toString(options);
}
__name(stringify3, "stringify");

// node_modules/yaml/browser/index.js
var browser_default = dist_exports;

// src/utils.js
var backimg = "https://t.alcy.cc/ycy";
var subapi = "https://url.v1.mk";
var mihomo_top = "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/Config/Mihomo_lite.yaml";
var singbox_1_11 = "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/refs/heads/main/Config/singbox_1.11.X.json";
var singbox_1_12 = "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/refs/heads/main/Config/singbox-1.12.X.json";
var singbox_1_12_alpha = "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/refs/heads/main/Config/singbox-1.12.X.alpha.json";
var beiantext = base64DecodeUtf8("6JCMSUNQ5aSHMjAyNTAwMDHlj7c=");
var beiandizi = atob("aHR0cHM6Ly90Lm1lL01hcmlzYV9rcmlzdGk=");
function base64DecodeUtf8(base64) {
  const binary2 = atob(base64);
  const bytes = Uint8Array.from(binary2, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}
__name(base64DecodeUtf8, "base64DecodeUtf8");
function buildApiUrl(rawUrl, BASE_API, ua) {
  const params = new URLSearchParams({
    target: ua,
    url: rawUrl,
    emoji: "true",
    list: "true",
    new_name: "true"
  });
  return `${BASE_API}/sub?${params}`;
}
__name(buildApiUrl, "buildApiUrl");
async function fetchResponse(url, userAgent) {
  if (!userAgent) {
    userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";
  }
  let response;
  try {
    response = await node_fetch_default(url, {
      method: "GET",
      headers: {
        "User-Agent": userAgent
      }
    });
  } catch {
    return true;
  }
  const headersObj = Object.fromEntries(response.headers.entries());
  const sanitizedCD = sanitizeContentDisposition(response.headers);
  if (sanitizedCD) {
    headersObj["content-disposition"] = sanitizedCD;
  }
  const textData = await response.text();
  let jsonData;
  try {
    jsonData = browser_default.parse(textData, { maxAliasCount: -1, merge: true });
  } catch (e) {
    try {
      jsonData = JSON.parse(textData);
    } catch (yamlError) {
      jsonData = textData;
    }
  }
  return {
    status: response.status,
    headers: headersObj,
    data: jsonData
  };
}
__name(fetchResponse, "fetchResponse");
function splitUrlsAndProxies(urls) {
  const result = [];
  let proxyText = "";
  for (const url of urls) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      result.push(url);
    } else {
      if (proxyText) {
        proxyText += "|";
      }
      proxyText += url;
    }
  }
  if (proxyText) {
    result.push(proxyText);
  }
  return result;
}
__name(splitUrlsAndProxies, "splitUrlsAndProxies");
async function Top_Data(top) {
  return await fetchResponse(top);
}
__name(Top_Data, "Top_Data");
async function Rule_Data(rule) {
  if (!rule) {
    throw new Error(`\u7F3A\u5C11\u89C4\u5219\u6A21\u677F`);
  }
  return await fetchResponse(rule);
}
__name(Rule_Data, "Rule_Data");
async function getFakePage(variable, configdata) {
  return `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20id='Partition-Auto--Streamline-Carbon'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20height='16'%20width='16'%3E%3Cdesc%3EPartition%20Auto%20Streamline%20Icon%3A%20https%3A//streamlinehq.com%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cpath%20d='M13%209.5c-1.1028%200%20-2%200.8972%20-2%202%200%200.3418%200.0941%200.6587%200.24585%200.94045C10.30775%2013.12675%209.17285%2013.5%208%2013.5%204.9673%2013.5%202.5%2011.0327%202.5%208H1.5c0%203.584%202.9159%206.5%206.5%206.5%201.42275%200%202.79615%20-0.468%203.92165%20-1.3208C12.2334%2013.38015%2012.6023%2013.5%2013%2013.5c1.1028%200%202%20-0.8972%202%20-2s-0.8972%20-2%20-2%20-2Zm0%203c-0.5514%200%20-1%20-0.44875%20-1%20-1s0.4486%20-1%201%20-1%201%200.44875%201%201%20-0.4486%201%20-1%201Z'%20fill='%23000000'%20stroke-width='0.5'/%3E%3Cpath%20d='M8%201.5c-1.42275%200%20-2.79615%200.468%20-3.92165%201.3208C3.7666%202.61985%203.3977%202.5%203%202.5%201.8972%202.5%201%203.3972%201%204.5s0.8972%202%202%202%202%20-0.8972%202%20-2c0%20-0.3418%20-0.0941%20-0.6587%20-0.24585%20-0.94045C5.69225%202.87325%206.82715%202.5%208%202.5c3.0327%200%205.5%202.4673%205.5%205.5h1c0%20-3.584%20-2.9159%20-6.5%20-6.5%20-6.5ZM3%205.5c-0.5514%200%20-1%20-0.44875%20-1%20-1s0.4486%20-1%201%20-1%201%200.44875%201%201%20-0.4486%201%20-1%201Z'%20fill='%23000000'%20stroke-width='0.5'/%3E%3Cpath%20id='_Transparent_Rectangle_'%20d='M0%200h16v16H0Z'%20fill='none'%20stroke-width='0.5'/%3E%3C/svg%3E">
    <title>mihomo/singbox\u6C47\u805A\uFF08\u8BA2\u9605\u8F6C\u6362\uFF09\u5DE5\u5177</title>
    <style>
        :root {
            --primary-color: #4361ee;
            --hover-color: #3b4fd3;
            --bg-color: #f5f6fa;
            --card-bg: #ffffff;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-image: url(${variable.IMG});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-color: var(--bg-color);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            padding: 60px 0;
            align-items: center;
        }

        .container {
            position: relative;
            /* \u4F7F\u7528rgba\u8BBE\u7F6E\u534A\u900F\u660E\u80CC\u666F */
            background: rgba(255, 255, 255, 0.7);
            /* \u6DFB\u52A0\u78E8\u7802\u73BB\u7483\u6548\u679C */
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            /* Safari\u517C\u5BB9 */
            max-width: 600px;
            margin: 0;
            width: 90%;
            height: 90%;
            padding: 2rem;
            border-radius: 20px;
            /* \u8C03\u6574\u9634\u5F71\u6548\u679C\u589E\u52A0\u901A\u900F\u611F */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1);
            transition: transform 0.3s ease;
        }

        /* \u8C03\u6574hover\u6548\u679C */
        .container:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1),
                inset 0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        h1 {
            text-align: center;
            color: var(--primary-color);
            margin-bottom: 2rem;
            font-size: 1.8rem;
        }

        .input-group {
            margin-bottom: 1.5rem;
        }

        .link-input {
            flex: 1; /* \u5360\u636E\u5269\u4F59\u7A7A\u95F4 */
            min-width: 0; /* \u9632\u6B62\u5185\u5BB9\u6EA2\u51FA */
            margin-top: 0;
            padding: 12px;
            border: 2px solid rgba(0, 0, 0, 0.15);
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
        }

        .link-row {
            display: flex;
            align-items: center;
            position: relative;
            margin-bottom: 8px;
            gap: 10px;
        }

        /* \u5706\u5F62\u6DFB\u52A0\u6309\u94AE\u6837\u5F0F */
        .add-btn {
            flex-shrink: 0; /* \u9632\u6B62\u6309\u94AE\u88AB\u538B\u7F29 */
            width: 40px;
            height: 40px;
            background-color: #f8f9fa;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .add-btn:hover {
            background-color: #ddd;
            /* \u9F20\u6807\u60AC\u505C\u6548\u679C */
        }


        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #555;
            font-weight: 500;
        }

        input {
            width: 100%;
            padding: 12px;
            /* \u4FEE\u6539\u8FB9\u6846\u989C\u8272\u4ECE #eee \u5230\u66F4\u6DF1\u7684\u989C\u8272 */
            border: 2px solid rgba(0, 0, 0, 0.15);
            /* \u4F7F\u7528rgba\u5B9E\u73B0\u66F4\u81EA\u7136\u7684\u6DF1\u5EA6 */
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
            /* \u6DFB\u52A0\u8F7B\u5FAE\u7684\u5185\u9634\u5F71\u589E\u5F3A\u8FB9\u6846\u6548\u679C */
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
        }

        input:focus {
            outline: none;
            border-color: var(--primary-color);
            /* \u589E\u5F3Afocus\u72B6\u6001\u4E0B\u7684\u9634\u5F71\u6548\u679C */
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15),
                inset 0 2px 4px rgba(0, 0, 0, 0.03);
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 1.5rem;
        }

        button:hover {
            background-color: var(--hover-color);
            transform: translateY(-2px);
        }

        button:active {
            transform: translateY(0);
        }

        #result {
            background-color: #f8f9fa;
            font-family: monospace;
            word-break: break-all;
        }

        .github-corner svg {
            fill: var(--primary-color);
            color: var(--card-bg);
            position: absolute;
            top: 0;
            right: 0;
            border: 0;
            width: 80px;
            height: 80px;
        }

        .github-corner:hover .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
        }

        @keyframes octocat-wave {

            0%,
            100% {
                transform: rotate(0)
            }

            20%,
            60% {
                transform: rotate(-25deg)
            }

            40%,
            80% {
                transform: rotate(10deg)
            }
        }

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }

        .logo-title {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 2rem;
        }

        .logo-title img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: relative;
            z-index: 1;
            background: var(--card-bg);
            box-shadow: 0 0 15px rgba(67, 97, 238, 0.1);
        }


        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }

        .logo-title h1 {
            margin-bottom: 0;
            text-align: center;
        }

        @media (max-width: 480px) {
            .container {
                padding: 1.5rem;
            }

            h1 {
                font-size: 1.5rem;
            }

            .github-corner:hover .octo-arm {
                animation: none;
            }

            .github-corner .octo-arm {
                animation: octocat-wave 560ms ease-in-out;
            }
        }

        .beian-info {
            text-align: center;
            font-size: 13px;
        }

        .beian-info a {
            color: var(--primary-color);
            text-decoration: none;
            border-bottom: 1px dashed var(--primary-color);
            padding-bottom: 2px;
        }

        .beian-info a:hover {
            border-bottom-style: solid;
        }

        #qrcode {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }
        
        /* \u65B0\u589E\u6A21\u677F\u9009\u62E9\u5668\u6837\u5F0F - \u5355\u5C55\u5F00\u9762\u677F\u7248\u672C */
        .template-selector {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .template-toggle {
            padding: 12px 15px;
            background-color: rgba(67, 97, 238, 0.1);
            font-weight: bold;
            cursor: pointer;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background-color 0.2s;
        }
        
        .template-toggle:hover {
            background-color: rgba(67, 97, 238, 0.2);
        }
        
        .template-toggle:after {
            content: "\u25B6"; /* \u6539\u4E3A\u5411\u53F3\u7BAD\u5934 */
            font-size: 12px;
            transition: transform 0.3s;
            margin-left: 8px; /* \u589E\u52A0\u95F4\u8DDD */
        }
        
        .template-toggle.collapsed:after {
            transform: rotate(90deg);
        }
        
        .template-options {
            position: absolute;
            top: 100%; /* \u7D27\u8D34 toggle \u4E0B\u9762 */
            left: 0;
            width: 100%;
            z-index: 10;
            background-color: white;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            display: none;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .template-options.show {
            display: block;
        }
        
        .template-option {
            padding: 10px 20px;
            cursor: pointer;
            transition: all 0.2s;
            border-bottom: 1px solid #eee;
        }
        
        .template-option:last-child {
            border-bottom: none;
        }
        
        .template-option:hover {
            background-color: rgba(67, 97, 238, 0.1);
        }
        
        .template-option.selected {
            background-color: rgba(67, 97, 238, 0.2);
            font-weight: bold;
        }

        /* Add new styles for the toggle switch */
        .config-toggle {
            display: flex;
            justify-content: center;
            margin-bottom: 1.5rem;
            background: rgba(67, 97, 238, 0.1);
            border-radius: 10px;
            padding: 8px;
        }

        .toggle-option {
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
            text-align: center;
            flex: 1;
        }

        .toggle-option.active {
            background-color: #4361ee;
            color: white;
        }

        .toggle-option:not(.active):hover {
            background-color: rgba(67, 97, 238, 0.2);
        }

        .singbox-options {
            display: none;
        }

        .singbox-mode .singbox-options {
            display: block;
        }

        .singbox-mode .mihomo-options {
            display: none;
        }

        /* \u611F\u53F9\u53F7 */
        .tip-icon {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: #4a60ea;
            color: white;
            font-weight: bold;
            font-size: 12px;
            cursor: pointer;
            user-select: none;
        }

        .tip-wrapper {
            position: relative;
            display: inline-block;
        }

        .tip-panel {
            display: none;
            position: absolute;
            top: 24px;
            left: 0;
            min-width: 260px;
            max-width: 320px;
            max-height: 50vh; /* \u9650\u5236\u6700\u5927\u9AD8\u5EA6\uFF0C\u9632\u6B62\u8D85\u51FA\u5C4F\u5E55 */
            background: white;
            color: #333;
            font-size: 14px;
            border-radius: 8px;
            padding: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 999;
            white-space: normal;
            line-height: 1.6;
            overflow-y: auto; /* \u589E\u52A0\u6EDA\u52A8\u6761\u652F\u6301 */
            overflow-x: hidden;
            word-break: break-word;
        }

        .tip-panel ul {
            margin: 8px 0;
            padding-left: 20px;
            list-style-type: disc;
        }

        .tip-panel li {
            margin-bottom: 6px;
        }

        .tip-panel strong, .tip-panel b {
            font-weight: bold;
            color: #4a60ea;
            display: block;
            margin-top: 10px;
        }

        .tip-wrapper.active .tip-panel {
            display: block;
        }

    </style>
    <script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.5/dist/purify.min.js"><\/script>
</head>

<body>
    <a href="${atob("aHR0cHM6Ly9naXRodWIuY29tL0t3aXNtYS9jZi13b3JrZXItbWlob21v")}" target="_blank" class="github-corner"
        aria-label="View source on Github">
        <svg viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
            <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor" class="octo-body"></path>
        </svg>
    </a>
    <div class="container">
        <div class="logo-title">
            <h1>mihomo/singbox\u6C47\u805A\uFF08\u8BA2\u9605\u8F6C\u6362\uFF09\u5DE5\u5177</h1>
        </div>
        <div class="config-toggle">
            <div class="toggle-option active" data-mode="mihomo">Clash (mihomo)</div>
            <div class="toggle-option" data-mode="singbox">Singbox</div>
        </div>
        <div class="mihomo-options">
            <div class="template-selector">
                <div class="template-toggle collapsed">\u9009\u62E9\u914D\u7F6E\u6A21\u677F\uFF08\u672A\u9009\u62E9\uFF09</div>
                <div class="template-options">
                    <!-- \u6A21\u677F\u9009\u9879\u5C06\u901A\u8FC7JavaScript\u586B\u5145 -->
                </div>
            </div>

            <div class="input-group">
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                    <label for="link" style="margin: 0;">\u8BA2\u9605\u94FE\u63A5</label>
                    <div class="tip-wrapper">
                        <span class="tip-icon" data-mode="mihomo">!</span>
                        <div class="tip-panel"></div>
                    </div>
                </div>
                <div id="link-container">
                    <div class="link-row">
                        <input type="text" class="link-input"/>
                        <div class="add-btn" onclick="addLinkInput(this)">\u2795</div>
                    </div>
                </div>
            </div>

            <button onclick="generateLink()">\u751F\u6210mihomo\u914D\u7F6E</button>
        </div>

        <div class="singbox-options">
            <div class="template-selector">
                <div class="template-toggle collapsed">\u9009\u62E9\u914D\u7F6E\u6A21\u677F\uFF08\u672A\u9009\u62E9\uFF09</div>
                <div class="template-options">
                    <!-- \u6A21\u677F\u9009\u9879\u5C06\u901A\u8FC7JavaScript\u586B\u5145 -->
                </div>
            </div>
            <div class="input-group">
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                    <label for="link" style="margin: 0;">\u8BA2\u9605\u94FE\u63A5</label>
                    <div class="tip-wrapper">
                        <span class="tip-icon" data-mode="singbox">!</span>
                        <div class="tip-panel"></div>
                    </div>
                </div>
                <div id="link-container-singbox">
                    <div class="link-row">
                        <input type="text" class="link-input"/>
                        <div class="add-btn" onclick="addLinkInput(this, 'singbox')">\u2795</div>
                    </div>
                </div>
            </div>

            <button onclick="generateSingboxLink()">\u751F\u6210Singbox\u914D\u7F6E</button>
        </div>


        <div class="input-group">
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
                <label for="result">\u8BA2\u9605\u5730\u5740\uFF1A</label>
            </div>
            <input type="text" id="result" readonly onclick="copyToClipboard()">
            <label id="qrcode" style="margin: 15px 10px -15px 10px;"></label>
        </div>
        <div class="beian-info" style="text-align: center; font-size: 13px;">
            <a href='${variable.beianurl}'>${variable.beian}</a>
        </div>
    </div>

    <script>
        function copyToClipboard() {
            const resultInput = document.getElementById('result');
            if (!resultInput.value) {
                return;
            }

            resultInput.select();
            navigator.clipboard.writeText(resultInput.value).then(() => {
                const tooltip = document.createElement('div');
                tooltip.style.position = 'fixed';
                tooltip.style.left = '50%';
                tooltip.style.top = '20px';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.padding = '8px 16px';
                tooltip.style.background = '#4361ee';
                tooltip.style.color = 'white';
                tooltip.style.borderRadius = '4px';
                tooltip.style.zIndex = '1000';
                tooltip.textContent = '\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F';

                document.body.appendChild(tooltip);

                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 2000);
            }).catch(err => {
                alert('\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236');
            });
        }

        // \u52A8\u6001\u8BBE\u7F6E\u8F93\u5165\u6846\u7684placeholder\uFF0C\u6839\u636E\u5F53\u524D\u6A21\u5F0F
        function setPlaceholderForMode(input, mode = 'mihomo') {
            input.placeholder = mode === 'singbox' 
                ? '\u8BF7\u8F93\u5165singbox\u8BA2\u9605\u5730\u5740url\uFF0C\u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5' 
                : '\u8BF7\u8F93\u5165clash\u8BA2\u9605\u5730\u5740url\uFF0C\u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5';
        }

        // \u521D\u59CB\u5316\u6240\u6709\u8F93\u5165\u6846\u7684placeholder
        function initializePlaceholders(mode) {
            const selector = mode === 'singbox' 
                ? '.singbox-options .link-input' 
                : '.mihomo-options .link-input';
    
            document.querySelectorAll(selector).forEach(input => {
                setPlaceholderForMode(input, mode);
            });
        }
        // \u4FEE\u6539addLinkInput\u4EE5\u652F\u6301singbox\u5BB9\u5668
        function addLinkInput(button, mode = 'mihomo') {
            const containerId = mode === 'singbox' ? 'link-container-singbox' : 'link-container';
            const container = document.getElementById(containerId);
            const row = document.createElement('div');
            row.className = 'link-row';

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'link-input';
            setPlaceholderForMode(input, mode);

            button.style.display = 'none';
            row.appendChild(input);
            container.appendChild(row);

            const btn = document.createElement('div');
            btn.className = 'add-btn';
            btn.textContent = '\u2795';
            btn.onclick = function () {
                addLinkInput(btn, mode);
            };

            row.appendChild(btn);
        }

        // \u5728mihomo\u548Csingbox\u6A21\u5F0F\u4E4B\u95F4\u5207\u6362
        document.addEventListener('DOMContentLoaded', function () {
            const toggleOptions = document.querySelectorAll('.toggle-option');
            const container = document.querySelector('.container');
            const tipModal = document.getElementById('tipModal');
            const tipContent = document.getElementById('tipContent');

            const tipTexts = {
                mihomo: \`
## mihomo \u4F7F\u7528\u63D0\u793A\uFF1A

- \u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5\uFF0C\u81EA\u52A8\u5408\u5E76\u751F\u6210\u914D\u7F6E
- \u53EF\u9009\u6A21\u677F\u751F\u6210 Clash (mihomo) \u94FE\u63A5
- \u53EF\u590D\u5236\u6216\u626B\u7801\u5BFC\u5165
- \u53BB\u5E7F\u544A\u8FC7\u6EE4
- \u9632\u6B62 DNS \u6CC4\u6F0F\uFF08\u5B89\u5168DNS/DoH\uFF09
- \u5C4F\u853D WebRTC \u6CC4\u6F0F\uFF08\u9632\u6B62\u771F\u5B9EIP\u66B4\u9732\uFF09
- \u5173\u95ED\u6240\u6709\u8986\u5199\u529F\u80FD\uFF08\u4E0D\u662F\u5173\u95ED\u529F\u80FD\uFF0C\u662F\u5173\u95ED\u8986\u5199\uFF09\u4EE5\u786E\u4FDD\u914D\u7F6E\u6B63\u5E38\u751F\u6548

## \u914D\u7F6E\u4FE1\u606F

**userAgent** ${variable.userAgent}

**\u8F6C\u6362\u540E\u7AEF** ${variable.sub}

**\u9ED8\u8BA4** ${variable.Mihomo_default}
                \`,
                singbox: \`
## singbox \u4F7F\u7528\u63D0\u793A\uFF1A

- \u652F\u6301\u5404\u79CD\u8BA2\u9605\u6216\u5355\u8282\u70B9\u94FE\u63A5\uFF0C\u81EA\u52A8\u5408\u5E76\u751F\u6210\u914D\u7F6E
- \u9002\u7528\u4E8E sing-box \u5BA2\u6237\u7AEF
- \u652F\u6301 1.11.x
- \u652F\u6301 1.12.x
- \u652F\u6301\u626B\u7801\u6216\u94FE\u63A5\u590D\u5236\u5BFC\u5165
- \u9632\u6B62 DNS \u6CC4\u6F0F\uFF08\u5B89\u5168DNS/DoH\uFF09

## \u914D\u7F6E\u4FE1\u606F

**userAgent** ${variable.userAgent}

**\u8F6C\u6362\u540E\u7AEF** ${variable.sub}

**1.11** ${variable.Singbox_default.singbox_1_11}

**1.12** ${variable.Singbox_default.singbox_1_12}

**1.12_alpha** ${variable.Singbox_default.singbox_1_12_alpha}
                \`
            };
            // \u5F39\u7A97\u63D0\u793A
            document.querySelectorAll('.tip-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    e.stopPropagation(); // \u9632\u6B62\u89E6\u53D1\u5168\u5C40\u70B9\u51FB\u5173\u95ED

                    // \u5173\u95ED\u6240\u6709\u5DF2\u5C55\u5F00
                    document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));

                    const wrapper = icon.closest('.tip-wrapper');
                    wrapper.classList.toggle('active');

                    const panel = wrapper.querySelector('.tip-panel');
                    const mode = icon.dataset.mode;

                    // \u4F7F\u7528 marked \u6E32\u67D3 Markdown \u4E3A HTML
                    const rawMarkdown = tipTexts[mode] || '\u6682\u65E0\u63D0\u793A\u5185\u5BB9';
                    panel.innerHTML = DOMPurify.sanitize(marked.parse(rawMarkdown));

                });
            });


            // \u70B9\u51FB\u9875\u9762\u5176\u4ED6\u5730\u65B9\u5173\u95ED\u63D0\u793A
            document.addEventListener('click', () => {
                document.querySelectorAll('.tip-wrapper').forEach(w => w.classList.remove('active'));
            });

            // \u8BBE\u7F6E\u9ED8\u8BA4\u6A21\u5F0F\u4E3Amihomo
            const defaultMode = 'mihomo';
            document.querySelector(\`.toggle-option[data-mode="\${defaultMode}"]\`).classList.add('active');
            initializePlaceholders(defaultMode);
            toggleOptions.forEach(option => {
                option.addEventListener('click', function () {
                    // \u8BBE\u7F6E\u6D3B\u52A8\u72B6\u6001
                    toggleOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');

                    // \u5207\u6362\u6A21\u5F0F
                    const newMode = this.dataset.mode;
                    if (this.dataset.mode === 'singbox') {
                        container.classList.add('singbox-mode');
                    } else {
                        container.classList.remove('singbox-mode');
                    }
                   // \u521D\u59CB\u5316\u65B0\u6A21\u5F0F\u7684placeholder
                   initializePlaceholders(newMode);
                });
            });
            // \u521D\u59CB\u5316\u6A21\u677F\u9009\u62E9\u5668
            initTemplateSelector('mihomo');
            initTemplateSelector('singbox');
        });
        // \u521D\u59CB\u5316\u6A21\u677F\u9009\u62E9\u5668
        function initTemplateSelector(mode = 'mihomo') {
            const selectorClass = mode === 'singbox' ? '.singbox-options .template-selector' : '.mihomo-options .template-selector';
            const templateToggle = document.querySelector(\`\${selectorClass} .template-toggle\`);
            const optionsContainer = document.querySelector(\`\${selectorClass} .template-options\`);
            const configs = ${configdata}
            // \u751F\u6210\u6240\u6709\u6A21\u677F\u9009\u9879
            configs[mode].forEach(group => {
                // \u6DFB\u52A0\u5206\u7EC4\u6807\u7B7E
                const groupLabel = document.createElement('div');
                groupLabel.style.padding = '10px 20px';
                groupLabel.style.fontWeight = 'bold';
                groupLabel.style.color = '#555';
                groupLabel.style.backgroundColor = '#f5f5f5';
                groupLabel.textContent = group.label;
                optionsContainer.appendChild(groupLabel);

                // \u6DFB\u52A0\u9009\u9879
                group.options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'template-option';
                    optionElement.textContent = option.label;
                    optionElement.dataset.value = option.value;
                    optionElement.dataset.group = group.label;

                    optionElement.addEventListener('click', function () {
                        // \u79FB\u9664\u4E4B\u524D\u9009\u4E2D\u7684\u6837\u5F0F
                        document.querySelectorAll(\`\${selectorClass} .template-option.selected\`).forEach(item => {
                            item.classList.remove('selected');
                        });

                        // \u66F4\u65B0\u663E\u793A\u6587\u672C
                        templateToggle.textContent = \`\${group.label}-\${option.label}\`;

                        // \u6DFB\u52A0\u9009\u4E2D\u6837\u5F0F
                        this.classList.add('selected');

                        // \u70B9\u51FB\u540E\u81EA\u52A8\u6298\u53E0\u9009\u9879\u9762\u677F
                        templateToggle.classList.add('collapsed');
                        optionsContainer.classList.remove('show');
                    });

                    optionsContainer.appendChild(optionElement);
                });
            });

            // \u9ED8\u8BA4\u9009\u62E9\u7B2C\u4E00\u4E2A\u9009\u9879
            const firstOption = document.querySelector(\`\${selectorClass} .template-option\`);
            if (firstOption) {
                firstOption.classList.add('selected');
                const groupLabel = firstOption.dataset.group;
                const optionLabel = firstOption.textContent;
                templateToggle.textContent = \`\u8BF7\u9009\u62E9\u914D\u7F6E\u6A21\u677F\uFF08\u9ED8\u8BA4-\${groupLabel}\uFF09\`;
                // templateToggle.textContent = \`\u8BF7\u9009\u62E9\u914D\u7F6E\u6A21\u677F\uFF08\${groupLabel}-\${firstOption.textContent}\uFF09\`;
            }

            // \u70B9\u51FB\u5207\u6362\u6309\u94AE\u5C55\u5F00/\u6298\u53E0\u9009\u9879
            templateToggle.addEventListener('click', function () {
                this.classList.toggle('collapsed');
                optionsContainer.classList.toggle('show');
            });

            // \u70B9\u51FB\u9875\u9762\u5176\u4ED6\u533A\u57DF\u5173\u95ED\u9009\u9879\u9762\u677F
            document.addEventListener('click', function (event) {
                if (!templateToggle.contains(event.target) && !optionsContainer.contains(event.target)) {
                    templateToggle.classList.add('collapsed');
                    optionsContainer.classList.remove('show');
                }
            });
        }

        // \u751F\u6210mihomo\u94FE\u63A5
        function generateLink() {
            const inputs = document.querySelectorAll('.mihomo-options .link-input');
            const selectedOption = document.querySelector('.template-option.selected');

            const subscriptionLinks = Array.from(inputs)
                .map(input => input.value.trim())
                .filter(val => val !== '');

            const templateLink = selectedOption ? selectedOption.dataset.value : '';

            if (subscriptionLinks.length === 0 && templateLink) {
                alert('\u8BF7\u8F93\u5165\u81F3\u5C11\u4E00\u4E2A\u8BA2\u9605\u94FE\u63A5');
                return;
            }

            const allLinks = [];
            subscriptionLinks.forEach(link => {
                allLinks.push(encodeURIComponent(link));
            });

            const origin = window.location.origin;
            const urlLink = \`\${origin}/?template=\${encodeURIComponent(templateLink)}&url=\${allLinks.join(',')}&mihomo=true\`;
            updateResult(urlLink);
        }
        // \u751F\u6210singbox\u94FE\u63A5
        function generateSingboxLink() {
            const inputs = document.querySelectorAll('.singbox-options .link-input');
            const selectedOption = document.querySelector('.singbox-options .template-option.selected');
            const subscriptionLinks = Array.from(inputs)
                .map(input => input.value.trim())
                .filter(val => val !== '');

            const templateLink = selectedOption ? selectedOption.dataset.value : '';

            if (subscriptionLinks.length === 0 && templateLink) {
                alert('\u8BF7\u8F93\u5165\u81F3\u5C11\u4E00\u4E2A\u8BA2\u9605\u94FE\u63A5');
                return;
            }

            const allLinks = [];
            subscriptionLinks.forEach(link => {
                allLinks.push(encodeURIComponent(link));
            });

            const origin = window.location.origin;
            const urlLink = \`\${origin}/?template=\${encodeURIComponent(templateLink)}&url=\${allLinks.join(',')}&singbox=true\`;
            updateResult(urlLink);
        }
        // \u66F4\u65B0\u7ED3\u679C\u548C\u4E8C\u7EF4\u7801
        function updateResult(urlLink) {
            document.getElementById('result').value = urlLink;

            // \u751F\u6210\u4E8C\u7EF4\u7801
            const qrcodeDiv = document.getElementById('qrcode');
            qrcodeDiv.innerHTML = '';
            new QRCode(qrcodeDiv, {
                text: urlLink,
                width: 220,
                height: 220,
                colorDark: "#4a60ea",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.L,
                scale: 1
            });
        }
    <\/script>
</body>

</html>    `;
}
__name(getFakePage, "getFakePage");
function configs() {
  const data = {
    mihomo: [
      {
        label: "\u901A\u7528",
        options: [
          {
            label: "\u9ED8\u8BA4\uFF08\u7CBE\u7B80\u7248\uFF09\uFF08\u4EC5\u56FD\u5185\u5916\u5206\u6D41\uFF09[\u79CB\u98CE_ads]",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default.yaml"
          },
          {
            label: "\u9ED8\u8BA4\uFF08\u7CBE\u7B80\u7248\uFF09\uFF08\u4EC5\u56FD\u5185\u5916\u5206\u6D41\uFF09[Dustinwin_ads]",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_Ads_Dustinwin.yaml"
          },
          {
            label: "\u9ED8\u8BA4\uFF08\u7CBE\u7B80\u7248\uFF09\uFF08\u65E0\u53BB\u5E7F\u544A\uFF09",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_NoAds.yaml"
          },
          {
            label: "\u9ED8\u8BA4\uFF08\u5168\u5206\u7EC4\uFF09[\u79CB\u98CE_ads]",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_full.yaml"
          },
          {
            label: "\u9ED8\u8BA4\uFF08\u5168\u5206\u7EC4\uFF09[Dustinwin_ads]",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_full_Ads_Dustinwin.yaml"
          },
          {
            label: "\u9ED8\u8BA4\uFF08\u5168\u5206\u7EC4\uFF09\uFF08\u65E0\u53BB\u5E7F\u544A\uFF09",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_default_full_NoAds.yaml"
          }
        ]
      },
      {
        label: "Mihomo-Party-ACL4SSR",
        options: [
          {
            label: "ACL4SSR_Online_Full \u5168\u5305\u91CD\u5EA6\u7528\u6237\u4F7F\u7528\uFF08\u4E0EGithub\u540C\u6B65\uFF09",
            value: "https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full.yaml"
          },
          {
            label: "ACL4SSR_Online_Full_AdblockPlus \u5168\u5305\u91CD\u5EA6\u7528\u6237\u4F7F\u7528\u66F4\u591A\u53BB\u5E7F\u544A\uFF08\u4E0EGithub\u540C\u6B65\uFF09",
            value: "https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_AdblockPlus.yaml"
          },
          {
            label: "ACL4SSR_Online_Full_Tiktok \u5168\u5305\u91CD\u5EA6\u7528\u6237\u4F7F\u7528\u6296\u97F3\u5168\u91CF\uFF08\u4E0EGithub\u540C\u6B65\uFF09",
            value: "https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_Tiktok.yaml"
          },
          {
            label: "ACL4SSR_Online_Full_WithIcon \u5168\u5305\u91CD\u5EA6\u7528\u6237\u4F7F\u7528\uFF08\u4E0EGithub\u540C\u6B65\uFF09\uFF08\u65E0\u56FE\u6807\uFF09",
            value: "https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Full_WithIcon.yaml"
          },
          {
            label: "ACL4SSR_Online_Mini_MultiMode \u4E13\u4E1A\u7248\u81EA\u52A8\u6D4B\u901F\u3001\u6545\u969C\u8F6C\u79FB\u3001\u8D1F\u8F7D\u5747\u8861\uFF08\u4E0EGithub\u540C\u6B65\uFF09",
            value: "https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/ACL4SSR_Online_Mini_MultiMode.yaml"
          },
          {
            label: "\u6781\u7B80\u5206\u6D41\u89C4\u5219",
            value: "https://raw.githubusercontent.com/zhuqq2020/Mihomo-Party-ACL4SSR/main/\u6781\u7B80\u5206\u6D41\u89C4\u5219.yaml"
          }
        ]
      },
      {
        label: "\u7F51\u7EDC\u6536\u96C6",
        options: [
          {
            label: "\u5E03\u4E01\u72D7\u7684\u8BA2\u9605\u8F6C\u6362 (\u4E0EGithub\u540C\u6B65)",
            value: "https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/%E5%B8%83%E4%B8%81%E7%8B%97%E7%9A%84%E8%AE%A2%E9%98%85%E8%BD%AC%E6%8D%A2.yaml"
          },
          {
            label: "6D \u81EA\u7528\u6A21\u677F ",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/Mihomo_6D_\u81EA\u7528\u6A21\u677F.yaml"
          },
          {
            label: "ACL4SSR_Online_Full \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65)",
            value: "https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/ACL4SSR_Online_Full.yaml"
          },
          {
            label: "ACL4SSR_Online_Full_WithIcon \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65) (\u65E0\u56FE\u6807)",
            value: "https://raw.githubusercontent.com/mihomo-party-org/override-hub/main/yaml/ACL4SSR_Online_Full_WithIcon.yaml"
          }
        ]
      },
      {
        label: "Lanlan13-14",
        options: [
          {
            label: "configfull \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65)",
            value: "https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull.yaml"
          },
          {
            label: "configfull_NoAd \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65) (\u65E0\u53BB\u5E7F\u544A)",
            value: "https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd.yaml"
          },
          {
            label: "configfull_NoAd_Stash \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65) (\u65E0\u53BB\u5E7F\u544A) (Stash)",
            value: "https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd_Stash.yaml"
          },
          {
            label: "configfull_NoAd_Stash_lite \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65) (\u65E0\u53BB\u5E7F\u544A) (\u7CBE\u7B80\u7248) (Stash)",
            value: "https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd_Stash_lite.yaml"
          },
          {
            label: "configfull_NoAd_lite \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65) (\u65E0\u53BB\u5E7F\u544A) (\u7CBE\u7B80\u7248)",
            value: "https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_NoAd_lite.yaml"
          },
          {
            label: "configfull_Stash \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65) (Stash)",
            value: "https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_Stash.yaml"
          },
          {
            label: "configfull_Stash_lite \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65) (\u7CBE\u7B80\u7248) (Stash)",
            value: "https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_Stash_lite.yaml"
          },
          {
            label: "configfull_lite \u5168\u5206\u7EC4\u7248 (\u4E0EGithub\u540C\u6B65) (\u7CBE\u7B80\u7248)",
            value: "https://raw.githubusercontent.com/Lanlan13-14/Rules/main/configfull_lite.yaml"
          }
        ]
      }
    ],
    singbox: [
      {
        label: "\u901A\u7528",
        options: [
          {
            label: "\u9ED8\u8BA4\uFF08\u7CBE\u7B80\u7248\uFF09[\u79CB\u98CE_ads]",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default.yaml"
          },
          {
            label: "\u9ED8\u8BA4\uFF08mini\u7248\uFF09[geo_ads]",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_mini.yaml"
          },
          {
            label: "\u9ED8\u8BA4\uFF08\u5168\u5206\u7EC4\uFF09[\u79CB\u98CE_ads]",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_default_full.yaml"
          },
          {
            label: "DustinWin \u5168\u5206\u7EC4\u7248[ads]",
            value: "https://raw.githubusercontent.com/Kwisma/cf-worker-mihomo/main/template/singbox_DustinWin_full.yaml"
          }
        ]
      }
    ]
  };
  return JSON.stringify(data);
}
__name(configs, "configs");
function sanitizeContentDisposition(headers) {
  const contentDisposition = headers.get("Content-Disposition") || headers.get("content-disposition");
  if (!contentDisposition) return null;
  const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
  if (!filenameMatch) return null;
  const originalFilename = filenameMatch[1];
  const isNonAscii = /[^\x00-\x7F]/.test(originalFilename);
  if (!isNonAscii) return contentDisposition;
  const fallback = "download.json";
  const encoded = encodeURIComponent(originalFilename);
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}
__name(sanitizeContentDisposition, "sanitizeContentDisposition");

// src/mihomo.js
async function getmihomo_config(urls, rule, top, userAgent, subapi2) {
  if (!/meta|clash.meta|clash|clashverge|mihomo/i.test(userAgent)) {
    throw new Error("\u4E0D\u652F\u6301\u7684\u5BA2\u6237\u7AEF");
  }
  urls = splitUrlsAndProxies(urls);
  const [Mihomo_Top_Data, Mihomo_Rule_Data, Mihomo_Proxies_Data] = await Promise.all([
    Top_Data(top),
    Rule_Data(rule),
    getMihomo_Proxies_Data(urls, userAgent, subapi2)
  ]);
  if (!Mihomo_Proxies_Data?.data?.proxies || Mihomo_Proxies_Data?.data?.proxies?.length === 0) throw new Error("\u8282\u70B9\u4E3A\u7A7A");
  Mihomo_Rule_Data.data.proxies = [...Mihomo_Rule_Data?.data?.proxies || [], ...Mihomo_Proxies_Data?.data?.proxies];
  Mihomo_Top_Data.data["proxy-providers"] = Mihomo_Proxies_Data?.data?.providers;
  applyTemplate(Mihomo_Top_Data.data, Mihomo_Rule_Data.data);
  return {
    status: Mihomo_Proxies_Data.status,
    headers: Mihomo_Proxies_Data.headers,
    data: JSON.stringify(Mihomo_Top_Data.data, null, 4)
  };
}
__name(getmihomo_config, "getmihomo_config");
async function getMihomo_Proxies_Data(urls, userAgent, subapi2) {
  let res;
  if (urls.length === 1) {
    res = await fetchResponse(urls[0], userAgent);
    if (res?.data?.proxies && Array.isArray(res?.data?.proxies) && res?.data?.proxies?.length > 0) {
      res.data.proxies.forEach((p) => {
        p.udp = true;
      });
      return {
        status: res.status,
        headers: res.headers,
        data: res.data
      };
    } else {
      const apiurl = buildApiUrl(urls[0], subapi2, "clash");
      res = await fetchResponse(apiurl, userAgent);
      if (res?.data?.proxies && Array.isArray(res?.data?.proxies) && res?.data?.proxies?.length > 0) {
        res.data.proxies.forEach((p) => {
          p.udp = true;
        });
        return {
          status: res.status,
          headers: res.headers,
          data: res.data
        };
      }
    }
  } else {
    const proxies_list = [];
    const hesList = [];
    for (let i = 0; i < urls.length; i++) {
      let res2 = await fetchResponse(urls[i], userAgent);
      if (res2?.data && Array.isArray(res2?.data?.proxies)) {
        res2.data.proxies.forEach((p) => {
          p.name = `${p.name} [${i + 1}]`;
          p.udp = true;
        });
        hesList.push({
          status: res2.status,
          headers: res2.headers
        });
        proxies_list.push(...res2.data.proxies);
      } else {
        const apiurl = buildApiUrl(urls[i], subapi2, "clash");
        res2 = await fetchResponse(apiurl, userAgent);
        if (res2?.data?.proxies && Array.isArray(res2?.data?.proxies)) {
          res2.data.proxies.forEach((p) => {
            p.name = `${p.name} [${i + 1}]`;
            p.udp = true;
          });
          hesList.push({
            status: res2.status,
            headers: res2.headers
          });
          proxies_list.push(...res2.data.proxies);
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * hesList.length);
    const hes = hesList[randomIndex];
    const data = { providers: {}, proxies: proxies_list };
    return {
      status: hes.status,
      headers: hes.headers,
      data
    };
  }
}
__name(getMihomo_Proxies_Data, "getMihomo_Proxies_Data");
function applyTemplate(top, rule) {
  top.proxies = rule.proxies || [];
  top["proxy-groups"] = rule["proxy-groups"] || [];
  top.rules = rule.rules || [];
  top["sub-rules"] = rule["sub-rules"] || {};
  top["rule-providers"] = { ...top["rule-providers"] || {}, ...rule["rule-providers"] || {} };
}
__name(applyTemplate, "applyTemplate");

// src/singbox.js
async function getsingbox_config(urls, rule, top_default, userAgent, subapi2) {
  let top, matched = false;
  if (/singbox|sing-box|sfa/i.test(userAgent)) {
    const alphaMatch = userAgent.match(/1\.12\.0\-alpha\.(\d{1,2})\b/);
    const betaMatch = userAgent.match(/1\.12\.0\-beta\.(\d{1,2})\b/);
    const v111Match = userAgent.match(/1\.11\.\d+/);
    const v112Match = userAgent.match(/1\.12\.(\d+)/);
    if (alphaMatch && !matched) {
      const num = parseInt(alphaMatch[1], 10);
      if (num >= 0 && num <= 23) {
        top = top_default.singbox_1_12_alpha;
        matched = true;
      }
    }
    if (betaMatch && !matched) {
      const num = parseInt(betaMatch[1], 10);
      if (num >= 0 && num <= 9) {
        top = top_default.singbox_1_11;
        matched = true;
      }
    }
    if (v111Match && !matched) {
      top = top_default.singbox_1_11;
      matched = true;
    }
    if (v112Match && !matched) {
      top = top_default.singbox_1_12;
      matched = true;
    }
    if (!matched) {
      throw new Error(`\u4E0D\u652F\u6301\u7684 Singbox \u7248\u672C\uFF1A${userAgent}`);
    }
  } else {
    throw new Error("\u4E0D\u652F\u6301\u7684\u5BA2\u6237\u7AEF");
  }
  urls = splitUrlsAndProxies(urls);
  const [Singbox_Top_Data, Singbox_Rule_Data, Singbox_Outbounds_Data] = await Promise.all([
    Top_Data(top),
    Rule_Data(rule),
    getSingbox_Outbounds_Data(urls, subapi2, userAgent)
  ]);
  if (!Singbox_Outbounds_Data?.data?.outbounds || Singbox_Outbounds_Data?.data?.outbounds?.length === 0 || typeof Singbox_Outbounds_Data?.data?.outbounds === "object" && !Array.isArray(Singbox_Outbounds_Data?.data?.outbounds) && Object.keys(Singbox_Outbounds_Data?.data?.outbounds).length === 0) throw new Error(`\u8282\u70B9\u4E3A\u7A7A\uFF0C\u8BF7\u4F7F\u7528\u6709\u6548\u8BA2\u9605`);
  Singbox_Outbounds_Data.data.outbounds = outboundArrs(Singbox_Outbounds_Data.data);
  const ApiUrlname = [];
  Singbox_Outbounds_Data.data.outbounds.forEach((res) => {
    ApiUrlname.push(res.tag);
  });
  Singbox_Rule_Data.data.outbounds = loadAndSetOutbounds(Singbox_Rule_Data.data.outbounds, ApiUrlname);
  Singbox_Rule_Data.data.outbounds.push(...Singbox_Outbounds_Data.data.outbounds);
  applyTemplate2(Singbox_Top_Data.data, Singbox_Rule_Data.data);
  return {
    status: Singbox_Outbounds_Data.status,
    headers: Singbox_Outbounds_Data.headers,
    data: JSON.stringify(Singbox_Top_Data.data, null, 4)
  };
}
__name(getsingbox_config, "getsingbox_config");
async function getSingbox_Outbounds_Data(urls, subapi2, userAgent) {
  let res;
  if (urls.length === 1) {
    res = await fetchResponse(urls[0], userAgent);
    if (res?.data?.outbounds && Array.isArray(res?.data?.outbounds) && res?.data?.outbounds?.length > 0) {
      return {
        status: res.status,
        headers: res.headers,
        data: res.data
      };
    } else {
      const apiurl = buildApiUrl(urls[0], subapi2, "singbox");
      res = await fetchResponse(apiurl, userAgent);
      return {
        status: res.status,
        headers: res.headers,
        data: res.data
      };
    }
  } else {
    const outbounds_list = [];
    const hesList = [];
    let res2;
    for (let i = 0; i < urls.length; i++) {
      res2 = await fetchResponse(urls[i], userAgent);
      if (res2?.data && Array.isArray(res2?.data?.outbounds)) {
        res2.data.outbounds.forEach((p) => {
          p.tag = `${p.tag} [${i + 1}]`;
        });
        hesList.push({
          status: res2.status,
          headers: res2.headers
        });
        outbounds_list.push(res2.data.outbounds);
      } else {
        const apiurl = buildApiUrl(urls[i], subapi2, "singbox");
        res2 = await fetchResponse(apiurl, userAgent);
        if (res2?.data?.outbounds && Array.isArray(res2?.data?.outbounds)) {
          res2.data.outbounds.forEach((p) => {
            p.tag = `${p.tag} [${i + 1}]`;
          });
          hesList.push({
            status: res2.status,
            headers: res2.headers
          });
          outbounds_list.push(res2.data.outbounds);
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * hesList.length);
    const hes = hesList[randomIndex];
    const data = { outbounds: outbounds_list.flat() };
    return {
      status: hes.status,
      headers: hes.headers,
      data
    };
  }
}
__name(getSingbox_Outbounds_Data, "getSingbox_Outbounds_Data");
function outboundArrs(data) {
  const excludedTypes = ["direct", "block", "dns", "selector", "urltest"];
  if (data && Array.isArray(data.outbounds)) {
    const filteredOutbounds = data.outbounds.filter((outbound) => {
      if (excludedTypes.includes(outbound.type)) return false;
      if (outbound?.server === "") return false;
      if (outbound?.server_port < 1) return false;
      if (outbound?.password === "") return false;
      return true;
    });
    return filteredOutbounds;
  }
}
__name(outboundArrs, "outboundArrs");
function loadAndSetOutbounds(Outbounds, ApiUrlname) {
  Outbounds.forEach((res) => {
    let matchedOutbounds;
    let hasValidAction = false;
    res.filter?.forEach((ac) => {
      const keywordReg = new RegExp(ac.keywords) || "";
      if (ac.action === "include") {
        matchedOutbounds = ApiUrlname.filter((name) => keywordReg.test(name));
        hasValidAction = true;
      } else if (ac.action === "exclude") {
        matchedOutbounds = ApiUrlname.filter((name) => !keywordReg.test(name));
        hasValidAction = true;
      } else if (ac.action === "all") {
        matchedOutbounds = ApiUrlname;
        hasValidAction = true;
      }
    });
    if (hasValidAction) {
      res.outbounds = [...res.outbounds, ...new Set(matchedOutbounds)];
    } else if (res.outbounds !== null) {
      matchedOutbounds = res.outbounds;
    } else {
      delete res.outbounds;
    }
    delete res.filter;
    return res;
  });
  const removedTags = Outbounds.filter((item) => Array.isArray(item.outbounds) && item.outbounds.length === 0).map((item) => item.tag);
  const cleanedOutbounds = Outbounds.map((item) => {
    if (Array.isArray(item.outbounds)) {
      item.outbounds = item.outbounds.filter((tag) => !removedTags.includes(tag));
    }
    return item;
  });
  const filteredOutbounds = cleanedOutbounds.filter((item) => {
    return !(Array.isArray(item.outbounds) && item.outbounds.length === 0);
  });
  return filteredOutbounds;
}
__name(loadAndSetOutbounds, "loadAndSetOutbounds");
function applyTemplate2(top, rule) {
  const existingSet = Array.isArray(top.route.rule_set) ? top.route.rule_set : [];
  const newSet = Array.isArray(rule.route.rule_set) ? rule.route.rule_set : [];
  const mergedMap = /* @__PURE__ */ new Map();
  for (const item of existingSet) {
    if (item?.tag) mergedMap.set(item.tag, item);
  }
  for (const item of newSet) {
    if (item?.tag) mergedMap.set(item.tag, item);
  }
  top.inbounds = rule?.inbounds || top.inbounds;
  top.outbounds = [...Array.isArray(top.outbounds) ? top.outbounds : [], ...Array.isArray(rule?.outbounds) ? rule.outbounds : []];
  top.route.final = rule?.route?.final || top.route.final;
  top.route.rules = [...Array.isArray(top.route.rules) ? top.route.rules : [], ...Array.isArray(rule?.route?.rules) ? rule.route.rules : []];
  top.route.rule_set = Array.from(mergedMap.values());
}
__name(applyTemplate2, "applyTemplate");

// src/index.js
var index_default = {
  async fetch(request, env2) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent");
    const rule = url.searchParams.get("template");
    const singbox = url.searchParams.get("singbox");
    const IMG = env2.IMG || backimg;
    const sub = env2.SUB || subapi;
    const Mihomo_default = env2.MIHOMO || mihomo_top;
    const Singbox_default = {
      singbox_1_11: env2.SINGBOX_1_11 || singbox_1_11,
      singbox_1_12: env2.SINGBOX_1_12 || singbox_1_12,
      singbox_1_12_alpha: env2.SINGBOX_1_12_ALPHA || singbox_1_12_alpha
    };
    const beian = env2.BEIAN || beiantext;
    const beianurl = env2.BEIANURL || beiandizi;
    const variable = {
      userAgent,
      rule,
      singbox,
      IMG,
      sub,
      Mihomo_default,
      Singbox_default,
      beian,
      beianurl
    };
    let urls = url.searchParams.getAll("url");
    if (urls.length === 1 && urls[0].includes(",")) {
      urls = urls[0].split(",").map((u) => u.trim());
    }
    if (urls.length === 0 || urls[0] === "") {
      return new Response(await getFakePage(variable, configs()), {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      });
    }
    try {
      let res, headers, status;
      if (singbox) {
        res = await getsingbox_config(urls, rule, Singbox_default, userAgent, sub);
      } else {
        res = await getmihomo_config(urls, rule, Mihomo_default, userAgent, sub);
      }
      const responseHeaders = res.headers || {};
      headers = new Headers(responseHeaders);
      status = res.status;
      headers.set("Content-Type", "application/json; charset=utf-8");
      headers.set("Profile-web-page-url", url.origin);
      return new Response(res.data, {
        status,
        headers
      });
    } catch (err) {
      return new Response(err.message, {
        status: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      });
    }
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
