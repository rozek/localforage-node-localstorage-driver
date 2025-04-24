var hr = Object.defineProperty;
var dr = (a, h, d) => h in a ? hr(a, h, { enumerable: !0, configurable: !0, writable: !0, value: d }) : a[h] = d;
var ce = (a, h, d) => (dr(a, typeof h != "symbol" ? h + "" : h, d), d), Ie = (a, h, d) => {
  if (!h.has(a))
    throw TypeError("Cannot " + d);
};
var U = (a, h, d) => (Ie(a, h, "read from private field"), d ? d.call(a) : h.get(a)), J = (a, h, d) => {
  if (h.has(a))
    throw TypeError("Cannot add the same private member more than once");
  h instanceof WeakSet ? h.add(a) : h.set(a, d);
}, te = (a, h, d, E) => (Ie(a, h, "write to private field"), E ? E.call(a, d) : h.set(a, d), d);
var Re = (a, h, d) => (Ie(a, h, "access private method"), d);
var le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vr(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
function mr(a) {
  if (a.__esModule)
    return a;
  var h = a.default;
  if (typeof h == "function") {
    var d = function E() {
      return this instanceof E ? Reflect.construct(h, arguments, this.constructor) : h.apply(this, arguments);
    };
    d.prototype = h.prototype;
  } else
    d = {};
  return Object.defineProperty(d, "__esModule", { value: !0 }), Object.keys(a).forEach(function(E) {
    var R = Object.getOwnPropertyDescriptor(a, E);
    Object.defineProperty(d, E, R.get ? R : {
      enumerable: !0,
      get: function() {
        return a[E];
      }
    });
  }), d;
}
const Pe = {}, yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pe
}, Symbol.toStringTag, { value: "Module" })), se = /* @__PURE__ */ mr(yr);
var ve = { exports: {} }, rt;
function gr() {
  if (rt)
    return ve.exports;
  rt = 1;
  var a = typeof Reflect == "object" ? Reflect : null, h = a && typeof a.apply == "function" ? a.apply : function(o, u, f) {
    return Function.prototype.apply.call(o, u, f);
  }, d;
  a && typeof a.ownKeys == "function" ? d = a.ownKeys : Object.getOwnPropertySymbols ? d = function(o) {
    return Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o));
  } : d = function(o) {
    return Object.getOwnPropertyNames(o);
  };
  function E(c) {
    console && console.warn && console.warn(c);
  }
  var R = Number.isNaN || function(o) {
    return o !== o;
  };
  function v() {
    v.init.call(this);
  }
  ve.exports = v, ve.exports.once = m, v.EventEmitter = v, v.prototype._events = void 0, v.prototype._eventsCount = 0, v.prototype._maxListeners = void 0;
  var B = 10;
  function M(c) {
    if (typeof c != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof c);
  }
  Object.defineProperty(v, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return B;
    },
    set: function(c) {
      if (typeof c != "number" || c < 0 || R(c))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + c + ".");
      B = c;
    }
  }), v.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, v.prototype.setMaxListeners = function(o) {
    if (typeof o != "number" || o < 0 || R(o))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + o + ".");
    return this._maxListeners = o, this;
  };
  function j(c) {
    return c._maxListeners === void 0 ? v.defaultMaxListeners : c._maxListeners;
  }
  v.prototype.getMaxListeners = function() {
    return j(this);
  }, v.prototype.emit = function(o) {
    for (var u = [], f = 1; f < arguments.length; f++)
      u.push(arguments[f]);
    var g = o === "error", A = this._events;
    if (A !== void 0)
      g = g && A.error === void 0;
    else if (!g)
      return !1;
    if (g) {
      var w;
      if (u.length > 0 && (w = u[0]), w instanceof Error)
        throw w;
      var L = new Error("Unhandled error." + (w ? " (" + w.message + ")" : ""));
      throw L.context = w, L;
    }
    var z = A[o];
    if (z === void 0)
      return !1;
    if (typeof z == "function")
      h(z, this, u);
    else
      for (var q = z.length, X = N(z, q), f = 0; f < q; ++f)
        h(X[f], this, u);
    return !0;
  };
  function Y(c, o, u, f) {
    var g, A, w;
    if (M(u), A = c._events, A === void 0 ? (A = c._events = /* @__PURE__ */ Object.create(null), c._eventsCount = 0) : (A.newListener !== void 0 && (c.emit(
      "newListener",
      o,
      u.listener ? u.listener : u
    ), A = c._events), w = A[o]), w === void 0)
      w = A[o] = u, ++c._eventsCount;
    else if (typeof w == "function" ? w = A[o] = f ? [u, w] : [w, u] : f ? w.unshift(u) : w.push(u), g = j(c), g > 0 && w.length > g && !w.warned) {
      w.warned = !0;
      var L = new Error("Possible EventEmitter memory leak detected. " + w.length + " " + String(o) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      L.name = "MaxListenersExceededWarning", L.emitter = c, L.type = o, L.count = w.length, E(L);
    }
    return c;
  }
  v.prototype.addListener = function(o, u) {
    return Y(this, o, u, !1);
  }, v.prototype.on = v.prototype.addListener, v.prototype.prependListener = function(o, u) {
    return Y(this, o, u, !0);
  };
  function $() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function b(c, o, u) {
    var f = { fired: !1, wrapFn: void 0, target: c, type: o, listener: u }, g = $.bind(f);
    return g.listener = u, f.wrapFn = g, g;
  }
  v.prototype.once = function(o, u) {
    return M(u), this.on(o, b(this, o, u)), this;
  }, v.prototype.prependOnceListener = function(o, u) {
    return M(u), this.prependListener(o, b(this, o, u)), this;
  }, v.prototype.removeListener = function(o, u) {
    var f, g, A, w, L;
    if (M(u), g = this._events, g === void 0)
      return this;
    if (f = g[o], f === void 0)
      return this;
    if (f === u || f.listener === u)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete g[o], g.removeListener && this.emit("removeListener", o, f.listener || u));
    else if (typeof f != "function") {
      for (A = -1, w = f.length - 1; w >= 0; w--)
        if (f[w] === u || f[w].listener === u) {
          L = f[w].listener, A = w;
          break;
        }
      if (A < 0)
        return this;
      A === 0 ? f.shift() : T(f, A), f.length === 1 && (g[o] = f[0]), g.removeListener !== void 0 && this.emit("removeListener", o, L || u);
    }
    return this;
  }, v.prototype.off = v.prototype.removeListener, v.prototype.removeAllListeners = function(o) {
    var u, f, g;
    if (f = this._events, f === void 0)
      return this;
    if (f.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : f[o] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete f[o]), this;
    if (arguments.length === 0) {
      var A = Object.keys(f), w;
      for (g = 0; g < A.length; ++g)
        w = A[g], w !== "removeListener" && this.removeAllListeners(w);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (u = f[o], typeof u == "function")
      this.removeListener(o, u);
    else if (u !== void 0)
      for (g = u.length - 1; g >= 0; g--)
        this.removeListener(o, u[g]);
    return this;
  };
  function D(c, o, u) {
    var f = c._events;
    if (f === void 0)
      return [];
    var g = f[o];
    return g === void 0 ? [] : typeof g == "function" ? u ? [g.listener || g] : [g] : u ? p(g) : N(g, g.length);
  }
  v.prototype.listeners = function(o) {
    return D(this, o, !0);
  }, v.prototype.rawListeners = function(o) {
    return D(this, o, !1);
  }, v.listenerCount = function(c, o) {
    return typeof c.listenerCount == "function" ? c.listenerCount(o) : O.call(c, o);
  }, v.prototype.listenerCount = O;
  function O(c) {
    var o = this._events;
    if (o !== void 0) {
      var u = o[c];
      if (typeof u == "function")
        return 1;
      if (u !== void 0)
        return u.length;
    }
    return 0;
  }
  v.prototype.eventNames = function() {
    return this._eventsCount > 0 ? d(this._events) : [];
  };
  function N(c, o) {
    for (var u = new Array(o), f = 0; f < o; ++f)
      u[f] = c[f];
    return u;
  }
  function T(c, o) {
    for (; o + 1 < c.length; o++)
      c[o] = c[o + 1];
    c.pop();
  }
  function p(c) {
    for (var o = new Array(c.length), u = 0; u < o.length; ++u)
      o[u] = c[u].listener || c[u];
    return o;
  }
  function m(c, o) {
    return new Promise(function(u, f) {
      function g(w) {
        c.removeListener(o, A), f(w);
      }
      function A() {
        typeof c.removeListener == "function" && c.removeListener("error", g), u([].slice.call(arguments));
      }
      C(c, o, A, { once: !0 }), o !== "error" && I(c, g, { once: !0 });
    });
  }
  function I(c, o, u) {
    typeof c.on == "function" && C(c, "error", o, u);
  }
  function C(c, o, u, f) {
    if (typeof c.on == "function")
      f.once ? c.once(o, u) : c.on(o, u);
    else if (typeof c.addEventListener == "function")
      c.addEventListener(o, function g(A) {
        f.once && c.removeEventListener(o, g), u(A);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof c);
  }
  return ve.exports;
}
var oe = { exports: {} }, Te = { exports: {} };
/**
 * @preserve
 * JS Implementation of incremental MurmurHash3 (r150) (as of May 10, 2013)
 *
 * @author <a href="mailto:jensyt@gmail.com">Jens Taylor</a>
 * @see http://github.com/homebrewing/brauhaus-diff
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 */
var nt;
function pr() {
  return nt || (nt = 1, function(a) {
    (function() {
      var h;
      function d(E, R) {
        var v = this instanceof d ? this : h;
        if (v.reset(R), typeof E == "string" && E.length > 0 && v.hash(E), v !== this)
          return v;
      }
      d.prototype.hash = function(E) {
        var R, v, B, M, j;
        switch (j = E.length, this.len += j, v = this.k1, B = 0, this.rem) {
          case 0:
            v ^= j > B ? E.charCodeAt(B++) & 65535 : 0;
          case 1:
            v ^= j > B ? (E.charCodeAt(B++) & 65535) << 8 : 0;
          case 2:
            v ^= j > B ? (E.charCodeAt(B++) & 65535) << 16 : 0;
          case 3:
            v ^= j > B ? (E.charCodeAt(B) & 255) << 24 : 0, v ^= j > B ? (E.charCodeAt(B++) & 65280) >> 8 : 0;
        }
        if (this.rem = j + this.rem & 3, j -= this.rem, j > 0) {
          for (R = this.h1; v = v * 11601 + (v & 65535) * 3432906752 & 4294967295, v = v << 15 | v >>> 17, v = v * 13715 + (v & 65535) * 461832192 & 4294967295, R ^= v, R = R << 13 | R >>> 19, R = R * 5 + 3864292196 & 4294967295, !(B >= j); )
            v = E.charCodeAt(B++) & 65535 ^ (E.charCodeAt(B++) & 65535) << 8 ^ (E.charCodeAt(B++) & 65535) << 16, M = E.charCodeAt(B++), v ^= (M & 255) << 24 ^ (M & 65280) >> 8;
          switch (v = 0, this.rem) {
            case 3:
              v ^= (E.charCodeAt(B + 2) & 65535) << 16;
            case 2:
              v ^= (E.charCodeAt(B + 1) & 65535) << 8;
            case 1:
              v ^= E.charCodeAt(B) & 65535;
          }
          this.h1 = R;
        }
        return this.k1 = v, this;
      }, d.prototype.result = function() {
        var E, R;
        return E = this.k1, R = this.h1, E > 0 && (E = E * 11601 + (E & 65535) * 3432906752 & 4294967295, E = E << 15 | E >>> 17, E = E * 13715 + (E & 65535) * 461832192 & 4294967295, R ^= E), R ^= this.len, R ^= R >>> 16, R = R * 51819 + (R & 65535) * 2246770688 & 4294967295, R ^= R >>> 13, R = R * 44597 + (R & 65535) * 3266445312 & 4294967295, R ^= R >>> 16, R >>> 0;
      }, d.prototype.reset = function(E) {
        return this.h1 = typeof E == "number" ? E : 0, this.rem = this.k1 = this.len = 0, this;
      }, h = new d(), a.exports = d;
    })();
  }(Te)), Te.exports;
}
var Le = {}, Ae = {}, it;
function _r() {
  return it || (it = 1, function(a) {
    Object.defineProperty(a, "__esModule", { value: !0 }), a.signals = void 0, a.signals = [], a.signals.push("SIGHUP", "SIGINT", "SIGTERM"), process.platform !== "win32" && a.signals.push(
      "SIGALRM",
      "SIGABRT",
      "SIGVTALRM",
      "SIGXCPU",
      "SIGXFSZ",
      "SIGUSR2",
      "SIGTRAP",
      "SIGSYS",
      "SIGQUIT",
      "SIGIOT"
      // should detect profiler and enable/disable accordingly.
      // see #21
      // 'SIGPROF'
    ), process.platform === "linux" && a.signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
  }(Ae)), Ae;
}
var ot;
function wr() {
  return ot || (ot = 1, function(a) {
    var O, N, T, p, m, I, C, c, at, u, ft;
    var h;
    Object.defineProperty(a, "__esModule", { value: !0 }), a.unload = a.load = a.onExit = a.signals = void 0;
    const d = _r();
    Object.defineProperty(a, "signals", { enumerable: !0, get: function() {
      return d.signals;
    } });
    const E = (g) => !!g && typeof g == "object" && typeof g.removeListener == "function" && typeof g.emit == "function" && typeof g.reallyExit == "function" && typeof g.listeners == "function" && typeof g.kill == "function" && typeof g.pid == "number" && typeof g.on == "function", R = Symbol.for("signal-exit emitter"), v = globalThis, B = Object.defineProperty.bind(Object);
    class M {
      constructor() {
        ce(this, "emitted", {
          afterExit: !1,
          exit: !1
        });
        ce(this, "listeners", {
          afterExit: [],
          exit: []
        });
        ce(this, "count", 0);
        ce(this, "id", Math.random());
        if (v[R])
          return v[R];
        B(v, R, {
          value: this,
          writable: !1,
          enumerable: !1,
          configurable: !1
        });
      }
      on(A, w) {
        this.listeners[A].push(w);
      }
      removeListener(A, w) {
        const L = this.listeners[A], z = L.indexOf(w);
        z !== -1 && (z === 0 && L.length === 1 ? L.length = 0 : L.splice(z, 1));
      }
      emit(A, w, L) {
        if (this.emitted[A])
          return !1;
        this.emitted[A] = !0;
        let z = !1;
        for (const q of this.listeners[A])
          z = q(w, L) === !0 || z;
        return A === "exit" && (z = this.emit("afterExit", w, L) || z), z;
      }
    }
    class j {
    }
    const Y = (g) => ({
      onExit(A, w) {
        return g.onExit(A, w);
      },
      load() {
        return g.load();
      },
      unload() {
        return g.unload();
      }
    });
    class $ extends j {
      onExit() {
        return () => {
        };
      }
      load() {
      }
      unload() {
      }
    }
    class b extends j {
      constructor(w) {
        super();
        J(this, c);
        J(this, u);
        // "SIGHUP" throws an `ENOSYS` error on Windows,
        // so use a supported signal instead
        /* c8 ignore start */
        J(this, O, D.platform === "win32" ? "SIGINT" : "SIGHUP");
        /* c8 ignore stop */
        J(this, N, new M());
        J(this, T, void 0);
        J(this, p, void 0);
        J(this, m, void 0);
        J(this, I, {});
        J(this, C, !1);
        te(this, T, w), te(this, I, {});
        for (const L of d.signals)
          U(this, I)[L] = () => {
            const z = U(this, T).listeners(L);
            let { count: q } = U(this, N);
            const X = w;
            if (typeof X.__signal_exit_emitter__ == "object" && typeof X.__signal_exit_emitter__.count == "number" && (q += X.__signal_exit_emitter__.count), z.length === q) {
              this.unload();
              const re = U(this, N).emit("exit", null, L), ae = L === "SIGHUP" ? U(this, O) : L;
              re || w.kill(w.pid, ae);
            }
          };
        te(this, m, w.reallyExit), te(this, p, w.emit);
      }
      onExit(w, L) {
        if (!E(U(this, T)))
          return () => {
          };
        U(this, C) === !1 && this.load();
        const z = L != null && L.alwaysLast ? "afterExit" : "exit";
        return U(this, N).on(z, w), () => {
          U(this, N).removeListener(z, w), U(this, N).listeners.exit.length === 0 && U(this, N).listeners.afterExit.length === 0 && this.unload();
        };
      }
      load() {
        if (!U(this, C)) {
          te(this, C, !0), U(this, N).count += 1;
          for (const w of d.signals)
            try {
              const L = U(this, I)[w];
              L && U(this, T).on(w, L);
            } catch {
            }
          U(this, T).emit = (w, ...L) => Re(this, u, ft).call(this, w, ...L), U(this, T).reallyExit = (w) => Re(this, c, at).call(this, w);
        }
      }
      unload() {
        U(this, C) && (te(this, C, !1), d.signals.forEach((w) => {
          const L = U(this, I)[w];
          if (!L)
            throw new Error("Listener not defined for signal: " + w);
          try {
            U(this, T).removeListener(w, L);
          } catch {
          }
        }), U(this, T).emit = U(this, p), U(this, T).reallyExit = U(this, m), U(this, N).count -= 1);
      }
    }
    O = new WeakMap(), N = new WeakMap(), T = new WeakMap(), p = new WeakMap(), m = new WeakMap(), I = new WeakMap(), C = new WeakMap(), c = new WeakSet(), at = function(w) {
      return E(U(this, T)) ? (U(this, T).exitCode = w || 0, U(this, N).emit("exit", U(this, T).exitCode, null), U(this, m).call(U(this, T), U(this, T).exitCode)) : 0;
    }, u = new WeakSet(), ft = function(w, ...L) {
      const z = U(this, p);
      if (w === "exit" && E(U(this, T))) {
        typeof L[0] == "number" && (U(this, T).exitCode = L[0]);
        const q = z.call(U(this, T), w, ...L);
        return U(this, N).emit("exit", U(this, T).exitCode, null), q;
      } else
        return z.call(U(this, T), w, ...L);
    };
    const D = globalThis.process;
    h = Y(E(D) ? new b(D) : new $()), /**
     * Called when the process is exiting, whether via signal, explicit
     * exit, or running out of stuff to do.
     *
     * If the global process object is not suitable for instrumentation,
     * then this will be a no-op.
     *
     * Returns a function that may be used to unload signal-exit.
     */
    a.onExit = h.onExit, /**
     * Load the listeners.  Likely you never need to call this, unless
     * doing a rather deep integration with signal-exit functionality.
     * Mostly exposed for the benefit of testing.
     *
     * @internal
     */
    a.load = h.load, /**
     * Unload the listeners.  Likely you never need to call this, unless
     * doing a rather deep integration with signal-exit functionality.
     * Mostly exposed for the benefit of testing.
     *
     * @internal
     */
    a.unload = h.unload;
  }(Le)), Le;
}
var st;
function Sr() {
  if (st)
    return oe.exports;
  st = 1, oe.exports = O, oe.exports.sync = N, oe.exports._getTmpname = j, oe.exports._cleanupOnExit = Y;
  const a = se, h = pr(), { onExit: d } = wr(), E = se, { promisify: R } = se, v = {}, B = function() {
    try {
      return se.threadId;
    } catch {
      return 0;
    }
  }();
  let M = 0;
  function j(T) {
    return T + "." + h(__filename).hash(String(process.pid)).hash(String(B)).hash(String(++M)).result();
  }
  function Y(T) {
    return () => {
      try {
        a.unlinkSync(typeof T == "function" ? T() : T);
      } catch {
      }
    };
  }
  function $(T) {
    return new Promise((p) => {
      v[T] || (v[T] = []), v[T].push(p), v[T].length === 1 && p();
    });
  }
  function b(T) {
    return T.code === "ENOSYS" || (!process.getuid || process.getuid() !== 0) && (T.code === "EINVAL" || T.code === "EPERM");
  }
  async function D(T, p, m = {}) {
    typeof m == "string" && (m = { encoding: m });
    let I, C;
    const c = d(Y(() => C)), o = E.resolve(T);
    try {
      await $(o);
      const u = await R(a.realpath)(T).catch(() => T);
      if (C = j(u), !m.mode || !m.chown) {
        const f = await R(a.stat)(u).catch(() => {
        });
        f && (m.mode == null && (m.mode = f.mode), m.chown == null && process.getuid && (m.chown = { uid: f.uid, gid: f.gid }));
      }
      I = await R(a.open)(C, "w", m.mode), m.tmpfileCreated && await m.tmpfileCreated(C), ArrayBuffer.isView(p) ? await R(a.write)(I, p, 0, p.length, 0) : p != null && await R(a.write)(I, String(p), 0, String(m.encoding || "utf8")), m.fsync !== !1 && await R(a.fsync)(I), await R(a.close)(I), I = null, m.chown && await R(a.chown)(C, m.chown.uid, m.chown.gid).catch((f) => {
        if (!b(f))
          throw f;
      }), m.mode && await R(a.chmod)(C, m.mode).catch((f) => {
        if (!b(f))
          throw f;
      }), await R(a.rename)(C, u);
    } finally {
      I && await R(a.close)(I).catch(
        /* istanbul ignore next */
        () => {
        }
      ), c(), await R(a.unlink)(C).catch(() => {
      }), v[o].shift(), v[o].length > 0 ? v[o][0]() : delete v[o];
    }
  }
  async function O(T, p, m, I) {
    m instanceof Function && (I = m, m = {});
    const C = D(T, p, m);
    if (I)
      try {
        const c = await C;
        return I(c);
      } catch (c) {
        return I(c);
      }
    return C;
  }
  function N(T, p, m) {
    typeof m == "string" ? m = { encoding: m } : m || (m = {});
    try {
      T = a.realpathSync(T);
    } catch {
    }
    const I = j(T);
    if (!m.mode || !m.chown)
      try {
        const f = a.statSync(T);
        m = Object.assign({}, m), m.mode || (m.mode = f.mode), !m.chown && process.getuid && (m.chown = { uid: f.uid, gid: f.gid });
      } catch {
      }
    let C;
    const c = Y(I), o = d(c);
    let u = !0;
    try {
      if (C = a.openSync(I, "w", m.mode || 438), m.tmpfileCreated && m.tmpfileCreated(I), ArrayBuffer.isView(p) ? a.writeSync(C, p, 0, p.length, 0) : p != null && a.writeSync(C, String(p), 0, String(m.encoding || "utf8")), m.fsync !== !1 && a.fsyncSync(C), a.closeSync(C), C = null, m.chown)
        try {
          a.chownSync(I, m.chown.uid, m.chown.gid);
        } catch (f) {
          if (!b(f))
            throw f;
        }
      if (m.mode)
        try {
          a.chmodSync(I, m.mode);
        } catch (f) {
          if (!b(f))
            throw f;
        }
      a.renameSync(I, T), u = !1;
    } finally {
      if (C)
        try {
          a.closeSync(C);
        } catch {
        }
      o(), u && c();
    }
  }
  return oe.exports;
}
var De;
(function() {
  var a, h, d, E, R, v, B, M, j, Y, $, b, D;
  b = se, $ = se, Y = gr(), D = Sr().sync, a = "---.EMPTY_STRING.---", v = function(O) {
    var N, T, p, m, I;
    for (m = $.readdirSync(O), I = [], N = 0, T = m.length; N < T; N++)
      p = m[N], I.push(M(b.join(O, p)));
    return I;
  }, M = function(O) {
    return $.statSync(O).isDirectory() ? (v(O), $.rmdirSync(O)) : $.unlinkSync(O);
  }, B = function(O) {
    var N;
    return O === "" ? N = a : N = `${O}`, N;
  }, E = class extends Error {
    constructor(N = "Unknown error.") {
      super(), this.message = N, Error.captureStackTrace != null && Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name;
    }
    toString() {
      return `${this.name}: ${this.message}`;
    }
  }, R = class {
    constructor(N, T, p, m, I = "localStorage") {
      this.key = N, this.oldValue = T, this.newValue = p, this.url = m, this.storageArea = I;
    }
  }, d = class Ne {
    // MetaKey contains key and size
    constructor(N, T) {
      if (this.key = N, this.index = T, !(this instanceof Ne))
        return new Ne(this.key, this.index);
    }
  }, j = function() {
    var O;
    return O = function() {
    }, O.prototype = /* @__PURE__ */ Object.create(null), new O();
  }, h = (function() {
    var O;
    class N extends Y.EventEmitter {
      constructor(p, m = 5 * 1024 * 1024) {
        var I;
        return super(), this._location = p, this.quota = m, this instanceof N ? (this._location = b.resolve(this._location), O[this._location] != null ? O[this._location] : (this.length = 0, this._bytesInUse = 0, this._keys = [], this._metaKeyMap = j(), this._eventUrl = "pid:" + process.pid, this._init(), this._QUOTA_EXCEEDED_ERR = E, typeof Proxy < "u" && Proxy !== null ? (I = {
          set: (C, c, o) => (this[c] != null ? this[c] = o : this.setItem(c, o), !0),
          get: (C, c) => this[c] != null ? this[c] : this.getItem(c),
          ownKeys: (C) => this._keys.map(function(c) {
            return c === a ? "" : c;
          }),
          getOwnPropertyDescriptor: (C, c) => ({
            value: this[c],
            enumerable: !0,
            configurable: !0
          })
        }, O[this._location] = new Proxy(this, I), O[this._location]) : (O[this._location] = this, O[this._location]))) : new N(this._location, this.quota);
      }
      _init() {
        var p, m;
        try {
          if (m = $.statSync(this._location), m != null && !m.isDirectory())
            throw new Error(`A file exists at the location '${this._location}' when trying to create/open localStorage`);
          this._sync();
        } catch (I) {
          if (p = I, p.code !== "ENOENT")
            throw p;
          try {
            $.mkdirSync(this._location, {
              recursive: !0
            });
          } catch (C) {
            if (p = C, p.code !== "EEXIST")
              throw p;
          }
        }
      }
      _sync() {
        var p, m, I, C, c, o, u, f;
        for (this._bytesInUse = 0, this.length = 0, I = $.readdirSync(this._location), c = C = 0, u = I.length; C < u; c = ++C)
          o = I[c], m = decodeURIComponent(o), this._keys.push(m), p = new d(o, c), this._metaKeyMap[m] = p, f = this._getStat(o), (f != null ? f.size : void 0) != null && (p.size = f.size, this._bytesInUse += f.size);
        return this.length = I.length;
      }
      setItem(p, m) {
        var I, C, c, o, u, f, g, A, w, L;
        if (u = this.listenerCount("storage"), A = null, u && (A = this.getItem(p)), p = B(p), I = encodeURIComponent(p).replace(/[!'()]/g, escape).replace(/\*/g, "%2A"), o = b.join(this._location, I), w = `${m}`, L = w.length, f = this._metaKeyMap[p], c = !!f, c ? g = f.size : g = 0, this._bytesInUse - g + L > this.quota)
          throw new E();
        if (D(o, w, {
          encoding: "utf8"
        }), c || (f = new d(I, this._keys.push(p) - 1), f.size = L, this._metaKeyMap[p] = f, this.length += 1, this._bytesInUse += L), u)
          return C = new R(p, A, m, this._eventUrl), this.emit("storage", C);
      }
      getItem(p) {
        var m, I;
        return p = B(p), I = this._metaKeyMap[p], I ? (m = b.join(this._location, I.key), $.readFileSync(m, "utf8")) : null;
      }
      _getStat(p) {
        var m;
        p = B(p), m = b.join(this._location, encodeURIComponent(p));
        try {
          return $.statSync(m);
        } catch {
          return null;
        }
      }
      removeItem(p) {
        var m, I, C, c, o, u, f, g;
        if (p = B(p), u = this._metaKeyMap[p], u) {
          C = this.listenerCount("storage"), f = null, C && (f = this.getItem(p)), delete this._metaKeyMap[p], this.length -= 1, this._bytesInUse -= u.size, I = b.join(this._location, u.key), this._keys.splice(u.index, 1), g = this._metaKeyMap;
          for (c in g)
            g[c], o = this._metaKeyMap[c], o.index > u.index && (o.index -= 1);
          if (M(I), C)
            return m = new R(p, f, null, this._eventUrl), this.emit("storage", m);
        }
      }
      key(p) {
        var m;
        return m = this._keys[p], m === a ? "" : m;
      }
      clear() {
        var p;
        if (v(this._location), this._metaKeyMap = j(), this._keys = [], this.length = 0, this._bytesInUse = 0, this.listenerCount("storage"))
          return p = new R(null, null, null, this._eventUrl), this.emit("storage", p);
      }
      _getBytesInUse() {
        return this._bytesInUse;
      }
      _deleteLocation() {
        return delete O[this._location], M(this._location), this._metaKeyMap = {}, this._keys = [], this.length = 0, this._bytesInUse = 0;
      }
    }
    return O = {}, N;
  }).call(this), De = h;
}).call(le);
function me(a) {
  throw new Error('Could not dynamically require "' + a + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var ut = { exports: {} };
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(a, h) {
  (function(d) {
    a.exports = d();
  })(function() {
    return function d(E, R, v) {
      function B(Y, $) {
        if (!R[Y]) {
          if (!E[Y]) {
            var b = typeof me == "function" && me;
            if (!$ && b)
              return b(Y, !0);
            if (M)
              return M(Y, !0);
            var D = new Error("Cannot find module '" + Y + "'");
            throw D.code = "MODULE_NOT_FOUND", D;
          }
          var O = R[Y] = { exports: {} };
          E[Y][0].call(O.exports, function(N) {
            var T = E[Y][1][N];
            return B(T || N);
          }, O, O.exports, d, E, R, v);
        }
        return R[Y].exports;
      }
      for (var M = typeof me == "function" && me, j = 0; j < v.length; j++)
        B(v[j]);
      return B;
    }({ 1: [function(d, E, R) {
      (function(v) {
        var B = v.MutationObserver || v.WebKitMutationObserver, M;
        if (B) {
          var j = 0, Y = new B(N), $ = v.document.createTextNode("");
          Y.observe($, {
            characterData: !0
          }), M = function() {
            $.data = j = ++j % 2;
          };
        } else if (!v.setImmediate && typeof v.MessageChannel < "u") {
          var b = new v.MessageChannel();
          b.port1.onmessage = N, M = function() {
            b.port2.postMessage(0);
          };
        } else
          "document" in v && "onreadystatechange" in v.document.createElement("script") ? M = function() {
            var p = v.document.createElement("script");
            p.onreadystatechange = function() {
              N(), p.onreadystatechange = null, p.parentNode.removeChild(p), p = null;
            }, v.document.documentElement.appendChild(p);
          } : M = function() {
            setTimeout(N, 0);
          };
        var D, O = [];
        function N() {
          D = !0;
          for (var p, m, I = O.length; I; ) {
            for (m = O, O = [], p = -1; ++p < I; )
              m[p]();
            I = O.length;
          }
          D = !1;
        }
        E.exports = T;
        function T(p) {
          O.push(p) === 1 && !D && M();
        }
      }).call(this, typeof le < "u" ? le : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 2: [function(d, E, R) {
      var v = d(1);
      function B() {
      }
      var M = {}, j = ["REJECTED"], Y = ["FULFILLED"], $ = ["PENDING"];
      E.exports = b;
      function b(o) {
        if (typeof o != "function")
          throw new TypeError("resolver must be a function");
        this.state = $, this.queue = [], this.outcome = void 0, o !== B && T(this, o);
      }
      b.prototype.catch = function(o) {
        return this.then(null, o);
      }, b.prototype.then = function(o, u) {
        if (typeof o != "function" && this.state === Y || typeof u != "function" && this.state === j)
          return this;
        var f = new this.constructor(B);
        if (this.state !== $) {
          var g = this.state === Y ? o : u;
          O(f, g, this.outcome);
        } else
          this.queue.push(new D(f, o, u));
        return f;
      };
      function D(o, u, f) {
        this.promise = o, typeof u == "function" && (this.onFulfilled = u, this.callFulfilled = this.otherCallFulfilled), typeof f == "function" && (this.onRejected = f, this.callRejected = this.otherCallRejected);
      }
      D.prototype.callFulfilled = function(o) {
        M.resolve(this.promise, o);
      }, D.prototype.otherCallFulfilled = function(o) {
        O(this.promise, this.onFulfilled, o);
      }, D.prototype.callRejected = function(o) {
        M.reject(this.promise, o);
      }, D.prototype.otherCallRejected = function(o) {
        O(this.promise, this.onRejected, o);
      };
      function O(o, u, f) {
        v(function() {
          var g;
          try {
            g = u(f);
          } catch (A) {
            return M.reject(o, A);
          }
          g === o ? M.reject(o, new TypeError("Cannot resolve promise with itself")) : M.resolve(o, g);
        });
      }
      M.resolve = function(o, u) {
        var f = p(N, u);
        if (f.status === "error")
          return M.reject(o, f.value);
        var g = f.value;
        if (g)
          T(o, g);
        else {
          o.state = Y, o.outcome = u;
          for (var A = -1, w = o.queue.length; ++A < w; )
            o.queue[A].callFulfilled(u);
        }
        return o;
      }, M.reject = function(o, u) {
        o.state = j, o.outcome = u;
        for (var f = -1, g = o.queue.length; ++f < g; )
          o.queue[f].callRejected(u);
        return o;
      };
      function N(o) {
        var u = o && o.then;
        if (o && (typeof o == "object" || typeof o == "function") && typeof u == "function")
          return function() {
            u.apply(o, arguments);
          };
      }
      function T(o, u) {
        var f = !1;
        function g(z) {
          f || (f = !0, M.reject(o, z));
        }
        function A(z) {
          f || (f = !0, M.resolve(o, z));
        }
        function w() {
          u(A, g);
        }
        var L = p(w);
        L.status === "error" && g(L.value);
      }
      function p(o, u) {
        var f = {};
        try {
          f.value = o(u), f.status = "success";
        } catch (g) {
          f.status = "error", f.value = g;
        }
        return f;
      }
      b.resolve = m;
      function m(o) {
        return o instanceof this ? o : M.resolve(new this(B), o);
      }
      b.reject = I;
      function I(o) {
        var u = new this(B);
        return M.reject(u, o);
      }
      b.all = C;
      function C(o) {
        var u = this;
        if (Object.prototype.toString.call(o) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var f = o.length, g = !1;
        if (!f)
          return this.resolve([]);
        for (var A = new Array(f), w = 0, L = -1, z = new this(B); ++L < f; )
          q(o[L], L);
        return z;
        function q(X, re) {
          u.resolve(X).then(ae, function(ne) {
            g || (g = !0, M.reject(z, ne));
          });
          function ae(ne) {
            A[re] = ne, ++w === f && !g && (g = !0, M.resolve(z, A));
          }
        }
      }
      b.race = c;
      function c(o) {
        var u = this;
        if (Object.prototype.toString.call(o) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var f = o.length, g = !1;
        if (!f)
          return this.resolve([]);
        for (var A = -1, w = new this(B); ++A < f; )
          L(o[A]);
        return w;
        function L(z) {
          u.resolve(z).then(function(q) {
            g || (g = !0, M.resolve(w, q));
          }, function(q) {
            g || (g = !0, M.reject(w, q));
          });
        }
      }
    }, { 1: 1 }], 3: [function(d, E, R) {
      (function(v) {
        typeof v.Promise != "function" && (v.Promise = d(2));
      }).call(this, typeof le < "u" ? le : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, { 2: 2 }], 4: [function(d, E, R) {
      var v = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e;
      } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      };
      function B(e, r) {
        if (!(e instanceof r))
          throw new TypeError("Cannot call a class as a function");
      }
      function M() {
        try {
          if (typeof indexedDB < "u")
            return indexedDB;
          if (typeof webkitIndexedDB < "u")
            return webkitIndexedDB;
          if (typeof mozIndexedDB < "u")
            return mozIndexedDB;
          if (typeof OIndexedDB < "u")
            return OIndexedDB;
          if (typeof msIndexedDB < "u")
            return msIndexedDB;
        } catch {
          return;
        }
      }
      var j = M();
      function Y() {
        try {
          if (!j || !j.open)
            return !1;
          var e = typeof openDatabase < "u" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform), r = typeof fetch == "function" && fetch.toString().indexOf("[native code") !== -1;
          return (!e || r) && typeof indexedDB < "u" && // some outdated implementations of IDB that appear on Samsung
          // and HTC Android devices <4.4 are missing IDBKeyRange
          // See: https://github.com/mozilla/localForage/issues/128
          // See: https://github.com/mozilla/localForage/issues/272
          typeof IDBKeyRange < "u";
        } catch {
          return !1;
        }
      }
      function $(e, r) {
        e = e || [], r = r || {};
        try {
          return new Blob(e, r);
        } catch (n) {
          if (n.name !== "TypeError")
            throw n;
          for (var t = typeof BlobBuilder < "u" ? BlobBuilder : typeof MSBlobBuilder < "u" ? MSBlobBuilder : typeof MozBlobBuilder < "u" ? MozBlobBuilder : WebKitBlobBuilder, i = new t(), s = 0; s < e.length; s += 1)
            i.append(e[s]);
          return i.getBlob(r.type);
        }
      }
      typeof Promise > "u" && d(3);
      var b = Promise;
      function D(e, r) {
        r && e.then(function(t) {
          r(null, t);
        }, function(t) {
          r(t);
        });
      }
      function O(e, r, t) {
        typeof r == "function" && e.then(r), typeof t == "function" && e.catch(t);
      }
      function N(e) {
        return typeof e != "string" && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e;
      }
      function T() {
        if (arguments.length && typeof arguments[arguments.length - 1] == "function")
          return arguments[arguments.length - 1];
      }
      var p = "local-forage-detect-blob-support", m = void 0, I = {}, C = Object.prototype.toString, c = "readonly", o = "readwrite";
      function u(e) {
        for (var r = e.length, t = new ArrayBuffer(r), i = new Uint8Array(t), s = 0; s < r; s++)
          i[s] = e.charCodeAt(s);
        return t;
      }
      function f(e) {
        return new b(function(r) {
          var t = e.transaction(p, o), i = $([""]);
          t.objectStore(p).put(i, "key"), t.onabort = function(s) {
            s.preventDefault(), s.stopPropagation(), r(!1);
          }, t.oncomplete = function() {
            var s = navigator.userAgent.match(/Chrome\/(\d+)/), n = navigator.userAgent.match(/Edge\//);
            r(n || !s || parseInt(s[1], 10) >= 43);
          };
        }).catch(function() {
          return !1;
        });
      }
      function g(e) {
        return typeof m == "boolean" ? b.resolve(m) : f(e).then(function(r) {
          return m = r, m;
        });
      }
      function A(e) {
        var r = I[e.name], t = {};
        t.promise = new b(function(i, s) {
          t.resolve = i, t.reject = s;
        }), r.deferredOperations.push(t), r.dbReady ? r.dbReady = r.dbReady.then(function() {
          return t.promise;
        }) : r.dbReady = t.promise;
      }
      function w(e) {
        var r = I[e.name], t = r.deferredOperations.pop();
        if (t)
          return t.resolve(), t.promise;
      }
      function L(e, r) {
        var t = I[e.name], i = t.deferredOperations.pop();
        if (i)
          return i.reject(r), i.promise;
      }
      function z(e, r) {
        return new b(function(t, i) {
          if (I[e.name] = I[e.name] || Me(), e.db)
            if (r)
              A(e), e.db.close();
            else
              return t(e.db);
          var s = [e.name];
          r && s.push(e.version);
          var n = j.open.apply(j, s);
          r && (n.onupgradeneeded = function(l) {
            var y = n.result;
            try {
              y.createObjectStore(e.storeName), l.oldVersion <= 1 && y.createObjectStore(p);
            } catch (_) {
              if (_.name === "ConstraintError")
                console.warn('The database "' + e.name + '" has been upgraded from version ' + l.oldVersion + " to version " + l.newVersion + ', but the storage "' + e.storeName + '" already exists.');
              else
                throw _;
            }
          }), n.onerror = function(l) {
            l.preventDefault(), i(n.error);
          }, n.onsuccess = function() {
            var l = n.result;
            l.onversionchange = function(y) {
              y.target.close();
            }, t(l), w(e);
          };
        });
      }
      function q(e) {
        return z(e, !1);
      }
      function X(e) {
        return z(e, !0);
      }
      function re(e, r) {
        if (!e.db)
          return !0;
        var t = !e.db.objectStoreNames.contains(e.storeName), i = e.version < e.db.version, s = e.version > e.db.version;
        if (i && (e.version !== r && console.warn('The database "' + e.name + `" can't be downgraded from version ` + e.db.version + " to version " + e.version + "."), e.version = e.db.version), s || t) {
          if (t) {
            var n = e.db.version + 1;
            n > e.version && (e.version = n);
          }
          return !0;
        }
        return !1;
      }
      function ae(e) {
        return new b(function(r, t) {
          var i = new FileReader();
          i.onerror = t, i.onloadend = function(s) {
            var n = btoa(s.target.result || "");
            r({
              __local_forage_encoded_blob: !0,
              data: n,
              type: e.type
            });
          }, i.readAsBinaryString(e);
        });
      }
      function ne(e) {
        var r = u(atob(e.data));
        return $([r], { type: e.type });
      }
      function Be(e) {
        return e && e.__local_forage_encoded_blob;
      }
      function dt(e) {
        var r = this, t = r._initReady().then(function() {
          var i = I[r._dbInfo.name];
          if (i && i.dbReady)
            return i.dbReady;
        });
        return O(t, e, e), t;
      }
      function vt(e) {
        A(e);
        for (var r = I[e.name], t = r.forages, i = 0; i < t.length; i++) {
          var s = t[i];
          s._dbInfo.db && (s._dbInfo.db.close(), s._dbInfo.db = null);
        }
        return e.db = null, q(e).then(function(n) {
          return e.db = n, re(e) ? X(e) : n;
        }).then(function(n) {
          e.db = r.db = n;
          for (var l = 0; l < t.length; l++)
            t[l]._dbInfo.db = n;
        }).catch(function(n) {
          throw L(e, n), n;
        });
      }
      function Z(e, r, t, i) {
        i === void 0 && (i = 1);
        try {
          var s = e.db.transaction(e.storeName, r);
          t(null, s);
        } catch (n) {
          if (i > 0 && (!e.db || n.name === "InvalidStateError" || n.name === "NotFoundError"))
            return b.resolve().then(function() {
              if (!e.db || n.name === "NotFoundError" && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version)
                return e.db && (e.version = e.db.version + 1), X(e);
            }).then(function() {
              return vt(e).then(function() {
                Z(e, r, t, i - 1);
              });
            }).catch(t);
          t(n);
        }
      }
      function Me() {
        return {
          // Running localForages sharing a database.
          forages: [],
          // Shared database.
          db: null,
          // Database readiness (promise).
          dbReady: null,
          // Deferred operations on the database.
          deferredOperations: []
        };
      }
      function mt(e) {
        var r = this, t = {
          db: null
        };
        if (e)
          for (var i in e)
            t[i] = e[i];
        var s = I[t.name];
        s || (s = Me(), I[t.name] = s), s.forages.push(r), r._initReady || (r._initReady = r.ready, r.ready = dt);
        var n = [];
        function l() {
          return b.resolve();
        }
        for (var y = 0; y < s.forages.length; y++) {
          var _ = s.forages[y];
          _ !== r && n.push(_._initReady().catch(l));
        }
        var S = s.forages.slice(0);
        return b.all(n).then(function() {
          return t.db = s.db, q(t);
        }).then(function(x) {
          return t.db = x, re(t, r._defaultConfig.version) ? X(t) : x;
        }).then(function(x) {
          t.db = s.db = x, r._dbInfo = t;
          for (var P = 0; P < S.length; P++) {
            var F = S[P];
            F !== r && (F._dbInfo.db = t.db, F._dbInfo.version = t.version);
          }
        });
      }
      function yt(e, r) {
        var t = this;
        e = N(e);
        var i = new b(function(s, n) {
          t.ready().then(function() {
            Z(t._dbInfo, c, function(l, y) {
              if (l)
                return n(l);
              try {
                var _ = y.objectStore(t._dbInfo.storeName), S = _.get(e);
                S.onsuccess = function() {
                  var x = S.result;
                  x === void 0 && (x = null), Be(x) && (x = ne(x)), s(x);
                }, S.onerror = function() {
                  n(S.error);
                };
              } catch (x) {
                n(x);
              }
            });
          }).catch(n);
        });
        return D(i, r), i;
      }
      function gt(e, r) {
        var t = this, i = new b(function(s, n) {
          t.ready().then(function() {
            Z(t._dbInfo, c, function(l, y) {
              if (l)
                return n(l);
              try {
                var _ = y.objectStore(t._dbInfo.storeName), S = _.openCursor(), x = 1;
                S.onsuccess = function() {
                  var P = S.result;
                  if (P) {
                    var F = P.value;
                    Be(F) && (F = ne(F));
                    var K = e(F, P.key, x++);
                    K !== void 0 ? s(K) : P.continue();
                  } else
                    s();
                }, S.onerror = function() {
                  n(S.error);
                };
              } catch (P) {
                n(P);
              }
            });
          }).catch(n);
        });
        return D(i, r), i;
      }
      function pt(e, r, t) {
        var i = this;
        e = N(e);
        var s = new b(function(n, l) {
          var y;
          i.ready().then(function() {
            return y = i._dbInfo, C.call(r) === "[object Blob]" ? g(y.db).then(function(_) {
              return _ ? r : ae(r);
            }) : r;
          }).then(function(_) {
            Z(i._dbInfo, o, function(S, x) {
              if (S)
                return l(S);
              try {
                var P = x.objectStore(i._dbInfo.storeName);
                _ === null && (_ = void 0);
                var F = P.put(_, e);
                x.oncomplete = function() {
                  _ === void 0 && (_ = null), n(_);
                }, x.onabort = x.onerror = function() {
                  var K = F.error ? F.error : F.transaction.error;
                  l(K);
                };
              } catch (K) {
                l(K);
              }
            });
          }).catch(l);
        });
        return D(s, t), s;
      }
      function _t(e, r) {
        var t = this;
        e = N(e);
        var i = new b(function(s, n) {
          t.ready().then(function() {
            Z(t._dbInfo, o, function(l, y) {
              if (l)
                return n(l);
              try {
                var _ = y.objectStore(t._dbInfo.storeName), S = _.delete(e);
                y.oncomplete = function() {
                  s();
                }, y.onerror = function() {
                  n(S.error);
                }, y.onabort = function() {
                  var x = S.error ? S.error : S.transaction.error;
                  n(x);
                };
              } catch (x) {
                n(x);
              }
            });
          }).catch(n);
        });
        return D(i, r), i;
      }
      function wt(e) {
        var r = this, t = new b(function(i, s) {
          r.ready().then(function() {
            Z(r._dbInfo, o, function(n, l) {
              if (n)
                return s(n);
              try {
                var y = l.objectStore(r._dbInfo.storeName), _ = y.clear();
                l.oncomplete = function() {
                  i();
                }, l.onabort = l.onerror = function() {
                  var S = _.error ? _.error : _.transaction.error;
                  s(S);
                };
              } catch (S) {
                s(S);
              }
            });
          }).catch(s);
        });
        return D(t, e), t;
      }
      function St(e) {
        var r = this, t = new b(function(i, s) {
          r.ready().then(function() {
            Z(r._dbInfo, c, function(n, l) {
              if (n)
                return s(n);
              try {
                var y = l.objectStore(r._dbInfo.storeName), _ = y.count();
                _.onsuccess = function() {
                  i(_.result);
                }, _.onerror = function() {
                  s(_.error);
                };
              } catch (S) {
                s(S);
              }
            });
          }).catch(s);
        });
        return D(t, e), t;
      }
      function Et(e, r) {
        var t = this, i = new b(function(s, n) {
          if (e < 0) {
            s(null);
            return;
          }
          t.ready().then(function() {
            Z(t._dbInfo, c, function(l, y) {
              if (l)
                return n(l);
              try {
                var _ = y.objectStore(t._dbInfo.storeName), S = !1, x = _.openKeyCursor();
                x.onsuccess = function() {
                  var P = x.result;
                  if (!P) {
                    s(null);
                    return;
                  }
                  e === 0 || S ? s(P.key) : (S = !0, P.advance(e));
                }, x.onerror = function() {
                  n(x.error);
                };
              } catch (P) {
                n(P);
              }
            });
          }).catch(n);
        });
        return D(i, r), i;
      }
      function bt(e) {
        var r = this, t = new b(function(i, s) {
          r.ready().then(function() {
            Z(r._dbInfo, c, function(n, l) {
              if (n)
                return s(n);
              try {
                var y = l.objectStore(r._dbInfo.storeName), _ = y.openKeyCursor(), S = [];
                _.onsuccess = function() {
                  var x = _.result;
                  if (!x) {
                    i(S);
                    return;
                  }
                  S.push(x.key), x.continue();
                }, _.onerror = function() {
                  s(_.error);
                };
              } catch (x) {
                s(x);
              }
            });
          }).catch(s);
        });
        return D(t, e), t;
      }
      function xt(e, r) {
        r = T.apply(this, arguments);
        var t = this.config();
        e = typeof e != "function" && e || {}, e.name || (e.name = e.name || t.name, e.storeName = e.storeName || t.storeName);
        var i = this, s;
        if (!e.name)
          s = b.reject("Invalid arguments");
        else {
          var n = e.name === t.name && i._dbInfo.db, l = n ? b.resolve(i._dbInfo.db) : q(e).then(function(y) {
            var _ = I[e.name], S = _.forages;
            _.db = y;
            for (var x = 0; x < S.length; x++)
              S[x]._dbInfo.db = y;
            return y;
          });
          e.storeName ? s = l.then(function(y) {
            if (y.objectStoreNames.contains(e.storeName)) {
              var _ = y.version + 1;
              A(e);
              var S = I[e.name], x = S.forages;
              y.close();
              for (var P = 0; P < x.length; P++) {
                var F = x[P];
                F._dbInfo.db = null, F._dbInfo.version = _;
              }
              var K = new b(function(G, V) {
                var W = j.open(e.name, _);
                W.onerror = function(Q) {
                  var ue = W.result;
                  ue.close(), V(Q);
                }, W.onupgradeneeded = function() {
                  var Q = W.result;
                  Q.deleteObjectStore(e.storeName);
                }, W.onsuccess = function() {
                  var Q = W.result;
                  Q.close(), G(Q);
                };
              });
              return K.then(function(G) {
                S.db = G;
                for (var V = 0; V < x.length; V++) {
                  var W = x[V];
                  W._dbInfo.db = G, w(W._dbInfo);
                }
              }).catch(function(G) {
                throw (L(e, G) || b.resolve()).catch(function() {
                }), G;
              });
            }
          }) : s = l.then(function(y) {
            A(e);
            var _ = I[e.name], S = _.forages;
            y.close();
            for (var x = 0; x < S.length; x++) {
              var P = S[x];
              P._dbInfo.db = null;
            }
            var F = new b(function(K, G) {
              var V = j.deleteDatabase(e.name);
              V.onerror = function() {
                var W = V.result;
                W && W.close(), G(V.error);
              }, V.onblocked = function() {
                console.warn('dropInstance blocked for database "' + e.name + '" until all open connections are closed');
              }, V.onsuccess = function() {
                var W = V.result;
                W && W.close(), K(W);
              };
            });
            return F.then(function(K) {
              _.db = K;
              for (var G = 0; G < S.length; G++) {
                var V = S[G];
                w(V._dbInfo);
              }
            }).catch(function(K) {
              throw (L(e, K) || b.resolve()).catch(function() {
              }), K;
            });
          });
        }
        return D(s, r), s;
      }
      var It = {
        _driver: "asyncStorage",
        _initStorage: mt,
        _support: Y(),
        iterate: gt,
        getItem: yt,
        setItem: pt,
        removeItem: _t,
        clear: wt,
        length: St,
        key: Et,
        keys: bt,
        dropInstance: xt
      };
      function Rt() {
        return typeof openDatabase == "function";
      }
      var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Tt = "~~local_forage_type~", je = /^~~local_forage_type~([^~]+)~/, he = "__lfsc__:", ye = he.length, ge = "arbf", pe = "blob", Ue = "si08", Fe = "ui08", ze = "uic8", Ke = "si16", Ye = "si32", Ge = "ur16", $e = "ui32", We = "fl32", Ve = "fl64", He = ye + ge.length, qe = Object.prototype.toString;
      function Qe(e) {
        var r = e.length * 0.75, t = e.length, i, s = 0, n, l, y, _;
        e[e.length - 1] === "=" && (r--, e[e.length - 2] === "=" && r--);
        var S = new ArrayBuffer(r), x = new Uint8Array(S);
        for (i = 0; i < t; i += 4)
          n = k.indexOf(e[i]), l = k.indexOf(e[i + 1]), y = k.indexOf(e[i + 2]), _ = k.indexOf(e[i + 3]), x[s++] = n << 2 | l >> 4, x[s++] = (l & 15) << 4 | y >> 2, x[s++] = (y & 3) << 6 | _ & 63;
        return S;
      }
      function _e(e) {
        var r = new Uint8Array(e), t = "", i;
        for (i = 0; i < r.length; i += 3)
          t += k[r[i] >> 2], t += k[(r[i] & 3) << 4 | r[i + 1] >> 4], t += k[(r[i + 1] & 15) << 2 | r[i + 2] >> 6], t += k[r[i + 2] & 63];
        return r.length % 3 === 2 ? t = t.substring(0, t.length - 1) + "=" : r.length % 3 === 1 && (t = t.substring(0, t.length - 2) + "=="), t;
      }
      function Lt(e, r) {
        var t = "";
        if (e && (t = qe.call(e)), e && (t === "[object ArrayBuffer]" || e.buffer && qe.call(e.buffer) === "[object ArrayBuffer]")) {
          var i, s = he;
          e instanceof ArrayBuffer ? (i = e, s += ge) : (i = e.buffer, t === "[object Int8Array]" ? s += Ue : t === "[object Uint8Array]" ? s += Fe : t === "[object Uint8ClampedArray]" ? s += ze : t === "[object Int16Array]" ? s += Ke : t === "[object Uint16Array]" ? s += Ge : t === "[object Int32Array]" ? s += Ye : t === "[object Uint32Array]" ? s += $e : t === "[object Float32Array]" ? s += We : t === "[object Float64Array]" ? s += Ve : r(new Error("Failed to get type for BinaryArray"))), r(s + _e(i));
        } else if (t === "[object Blob]") {
          var n = new FileReader();
          n.onload = function() {
            var l = Tt + e.type + "~" + _e(this.result);
            r(he + pe + l);
          }, n.readAsArrayBuffer(e);
        } else
          try {
            r(JSON.stringify(e));
          } catch (l) {
            console.error("Couldn't convert value into a JSON string: ", e), r(null, l);
          }
      }
      function At(e) {
        if (e.substring(0, ye) !== he)
          return JSON.parse(e);
        var r = e.substring(He), t = e.substring(ye, He), i;
        if (t === pe && je.test(r)) {
          var s = r.match(je);
          i = s[1], r = r.substring(s[0].length);
        }
        var n = Qe(r);
        switch (t) {
          case ge:
            return n;
          case pe:
            return $([n], { type: i });
          case Ue:
            return new Int8Array(n);
          case Fe:
            return new Uint8Array(n);
          case ze:
            return new Uint8ClampedArray(n);
          case Ke:
            return new Int16Array(n);
          case Ge:
            return new Uint16Array(n);
          case Ye:
            return new Int32Array(n);
          case $e:
            return new Uint32Array(n);
          case We:
            return new Float32Array(n);
          case Ve:
            return new Float64Array(n);
          default:
            throw new Error("Unkown type: " + t);
        }
      }
      var we = {
        serialize: Lt,
        deserialize: At,
        stringToBuffer: Qe,
        bufferToString: _e
      };
      function Xe(e, r, t, i) {
        e.executeSql("CREATE TABLE IF NOT EXISTS " + r.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], t, i);
      }
      function Pt(e) {
        var r = this, t = {
          db: null
        };
        if (e)
          for (var i in e)
            t[i] = typeof e[i] != "string" ? e[i].toString() : e[i];
        var s = new b(function(n, l) {
          try {
            t.db = openDatabase(t.name, String(t.version), t.description, t.size);
          } catch (y) {
            return l(y);
          }
          t.db.transaction(function(y) {
            Xe(y, t, function() {
              r._dbInfo = t, n();
            }, function(_, S) {
              l(S);
            });
          }, l);
        });
        return t.serializer = we, s;
      }
      function ee(e, r, t, i, s, n) {
        e.executeSql(t, i, s, function(l, y) {
          y.code === y.SYNTAX_ERR ? l.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [r.storeName], function(_, S) {
            S.rows.length ? n(_, y) : Xe(_, r, function() {
              _.executeSql(t, i, s, n);
            }, n);
          }, n) : n(l, y);
        }, n);
      }
      function Nt(e, r) {
        var t = this;
        e = N(e);
        var i = new b(function(s, n) {
          t.ready().then(function() {
            var l = t._dbInfo;
            l.db.transaction(function(y) {
              ee(y, l, "SELECT * FROM " + l.storeName + " WHERE key = ? LIMIT 1", [e], function(_, S) {
                var x = S.rows.length ? S.rows.item(0).value : null;
                x && (x = l.serializer.deserialize(x)), s(x);
              }, function(_, S) {
                n(S);
              });
            });
          }).catch(n);
        });
        return D(i, r), i;
      }
      function Ot(e, r) {
        var t = this, i = new b(function(s, n) {
          t.ready().then(function() {
            var l = t._dbInfo;
            l.db.transaction(function(y) {
              ee(y, l, "SELECT * FROM " + l.storeName, [], function(_, S) {
                for (var x = S.rows, P = x.length, F = 0; F < P; F++) {
                  var K = x.item(F), G = K.value;
                  if (G && (G = l.serializer.deserialize(G)), G = e(G, K.key, F + 1), G !== void 0) {
                    s(G);
                    return;
                  }
                }
                s();
              }, function(_, S) {
                n(S);
              });
            });
          }).catch(n);
        });
        return D(i, r), i;
      }
      function Je(e, r, t, i) {
        var s = this;
        e = N(e);
        var n = new b(function(l, y) {
          s.ready().then(function() {
            r === void 0 && (r = null);
            var _ = r, S = s._dbInfo;
            S.serializer.serialize(r, function(x, P) {
              P ? y(P) : S.db.transaction(function(F) {
                ee(F, S, "INSERT OR REPLACE INTO " + S.storeName + " (key, value) VALUES (?, ?)", [e, x], function() {
                  l(_);
                }, function(K, G) {
                  y(G);
                });
              }, function(F) {
                if (F.code === F.QUOTA_ERR) {
                  if (i > 0) {
                    l(Je.apply(s, [e, _, t, i - 1]));
                    return;
                  }
                  y(F);
                }
              });
            });
          }).catch(y);
        });
        return D(n, t), n;
      }
      function Dt(e, r, t) {
        return Je.apply(this, [e, r, t, 1]);
      }
      function Ct(e, r) {
        var t = this;
        e = N(e);
        var i = new b(function(s, n) {
          t.ready().then(function() {
            var l = t._dbInfo;
            l.db.transaction(function(y) {
              ee(y, l, "DELETE FROM " + l.storeName + " WHERE key = ?", [e], function() {
                s();
              }, function(_, S) {
                n(S);
              });
            });
          }).catch(n);
        });
        return D(i, r), i;
      }
      function Bt(e) {
        var r = this, t = new b(function(i, s) {
          r.ready().then(function() {
            var n = r._dbInfo;
            n.db.transaction(function(l) {
              ee(l, n, "DELETE FROM " + n.storeName, [], function() {
                i();
              }, function(y, _) {
                s(_);
              });
            });
          }).catch(s);
        });
        return D(t, e), t;
      }
      function Mt(e) {
        var r = this, t = new b(function(i, s) {
          r.ready().then(function() {
            var n = r._dbInfo;
            n.db.transaction(function(l) {
              ee(l, n, "SELECT COUNT(key) as c FROM " + n.storeName, [], function(y, _) {
                var S = _.rows.item(0).c;
                i(S);
              }, function(y, _) {
                s(_);
              });
            });
          }).catch(s);
        });
        return D(t, e), t;
      }
      function jt(e, r) {
        var t = this, i = new b(function(s, n) {
          t.ready().then(function() {
            var l = t._dbInfo;
            l.db.transaction(function(y) {
              ee(y, l, "SELECT key FROM " + l.storeName + " WHERE id = ? LIMIT 1", [e + 1], function(_, S) {
                var x = S.rows.length ? S.rows.item(0).key : null;
                s(x);
              }, function(_, S) {
                n(S);
              });
            });
          }).catch(n);
        });
        return D(i, r), i;
      }
      function Ut(e) {
        var r = this, t = new b(function(i, s) {
          r.ready().then(function() {
            var n = r._dbInfo;
            n.db.transaction(function(l) {
              ee(l, n, "SELECT key FROM " + n.storeName, [], function(y, _) {
                for (var S = [], x = 0; x < _.rows.length; x++)
                  S.push(_.rows.item(x).key);
                i(S);
              }, function(y, _) {
                s(_);
              });
            });
          }).catch(s);
        });
        return D(t, e), t;
      }
      function Ft(e) {
        return new b(function(r, t) {
          e.transaction(function(i) {
            i.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(s, n) {
              for (var l = [], y = 0; y < n.rows.length; y++)
                l.push(n.rows.item(y).name);
              r({
                db: e,
                storeNames: l
              });
            }, function(s, n) {
              t(n);
            });
          }, function(i) {
            t(i);
          });
        });
      }
      function zt(e, r) {
        r = T.apply(this, arguments);
        var t = this.config();
        e = typeof e != "function" && e || {}, e.name || (e.name = e.name || t.name, e.storeName = e.storeName || t.storeName);
        var i = this, s;
        return e.name ? s = new b(function(n) {
          var l;
          e.name === t.name ? l = i._dbInfo.db : l = openDatabase(e.name, "", "", 0), e.storeName ? n({
            db: l,
            storeNames: [e.storeName]
          }) : n(Ft(l));
        }).then(function(n) {
          return new b(function(l, y) {
            n.db.transaction(function(_) {
              function S(K) {
                return new b(function(G, V) {
                  _.executeSql("DROP TABLE IF EXISTS " + K, [], function() {
                    G();
                  }, function(W, Q) {
                    V(Q);
                  });
                });
              }
              for (var x = [], P = 0, F = n.storeNames.length; P < F; P++)
                x.push(S(n.storeNames[P]));
              b.all(x).then(function() {
                l();
              }).catch(function(K) {
                y(K);
              });
            }, function(_) {
              y(_);
            });
          });
        }) : s = b.reject("Invalid arguments"), D(s, r), s;
      }
      var Kt = {
        _driver: "webSQLStorage",
        _initStorage: Pt,
        _support: Rt(),
        iterate: Ot,
        getItem: Nt,
        setItem: Dt,
        removeItem: Ct,
        clear: Bt,
        length: Mt,
        key: jt,
        keys: Ut,
        dropInstance: zt
      };
      function Yt() {
        try {
          return typeof localStorage < "u" && "setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
          !!localStorage.setItem;
        } catch {
          return !1;
        }
      }
      function Ze(e, r) {
        var t = e.name + "/";
        return e.storeName !== r.storeName && (t += e.storeName + "/"), t;
      }
      function Gt() {
        var e = "_localforage_support_test";
        try {
          return localStorage.setItem(e, !0), localStorage.removeItem(e), !1;
        } catch {
          return !0;
        }
      }
      function $t() {
        return !Gt() || localStorage.length > 0;
      }
      function Wt(e) {
        var r = this, t = {};
        if (e)
          for (var i in e)
            t[i] = e[i];
        return t.keyPrefix = Ze(e, r._defaultConfig), $t() ? (r._dbInfo = t, t.serializer = we, b.resolve()) : b.reject();
      }
      function Vt(e) {
        var r = this, t = r.ready().then(function() {
          for (var i = r._dbInfo.keyPrefix, s = localStorage.length - 1; s >= 0; s--) {
            var n = localStorage.key(s);
            n.indexOf(i) === 0 && localStorage.removeItem(n);
          }
        });
        return D(t, e), t;
      }
      function Ht(e, r) {
        var t = this;
        e = N(e);
        var i = t.ready().then(function() {
          var s = t._dbInfo, n = localStorage.getItem(s.keyPrefix + e);
          return n && (n = s.serializer.deserialize(n)), n;
        });
        return D(i, r), i;
      }
      function qt(e, r) {
        var t = this, i = t.ready().then(function() {
          for (var s = t._dbInfo, n = s.keyPrefix, l = n.length, y = localStorage.length, _ = 1, S = 0; S < y; S++) {
            var x = localStorage.key(S);
            if (x.indexOf(n) === 0) {
              var P = localStorage.getItem(x);
              if (P && (P = s.serializer.deserialize(P)), P = e(P, x.substring(l), _++), P !== void 0)
                return P;
            }
          }
        });
        return D(i, r), i;
      }
      function Qt(e, r) {
        var t = this, i = t.ready().then(function() {
          var s = t._dbInfo, n;
          try {
            n = localStorage.key(e);
          } catch {
            n = null;
          }
          return n && (n = n.substring(s.keyPrefix.length)), n;
        });
        return D(i, r), i;
      }
      function Xt(e) {
        var r = this, t = r.ready().then(function() {
          for (var i = r._dbInfo, s = localStorage.length, n = [], l = 0; l < s; l++) {
            var y = localStorage.key(l);
            y.indexOf(i.keyPrefix) === 0 && n.push(y.substring(i.keyPrefix.length));
          }
          return n;
        });
        return D(t, e), t;
      }
      function Jt(e) {
        var r = this, t = r.keys().then(function(i) {
          return i.length;
        });
        return D(t, e), t;
      }
      function Zt(e, r) {
        var t = this;
        e = N(e);
        var i = t.ready().then(function() {
          var s = t._dbInfo;
          localStorage.removeItem(s.keyPrefix + e);
        });
        return D(i, r), i;
      }
      function kt(e, r, t) {
        var i = this;
        e = N(e);
        var s = i.ready().then(function() {
          r === void 0 && (r = null);
          var n = r;
          return new b(function(l, y) {
            var _ = i._dbInfo;
            _.serializer.serialize(r, function(S, x) {
              if (x)
                y(x);
              else
                try {
                  localStorage.setItem(_.keyPrefix + e, S), l(n);
                } catch (P) {
                  (P.name === "QuotaExceededError" || P.name === "NS_ERROR_DOM_QUOTA_REACHED") && y(P), y(P);
                }
            });
          });
        });
        return D(s, t), s;
      }
      function er(e, r) {
        if (r = T.apply(this, arguments), e = typeof e != "function" && e || {}, !e.name) {
          var t = this.config();
          e.name = e.name || t.name, e.storeName = e.storeName || t.storeName;
        }
        var i = this, s;
        return e.name ? s = new b(function(n) {
          e.storeName ? n(Ze(e, i._defaultConfig)) : n(e.name + "/");
        }).then(function(n) {
          for (var l = localStorage.length - 1; l >= 0; l--) {
            var y = localStorage.key(l);
            y.indexOf(n) === 0 && localStorage.removeItem(y);
          }
        }) : s = b.reject("Invalid arguments"), D(s, r), s;
      }
      var tr = {
        _driver: "localStorageWrapper",
        _initStorage: Wt,
        _support: Yt(),
        iterate: qt,
        getItem: Ht,
        setItem: kt,
        removeItem: Zt,
        clear: Vt,
        length: Jt,
        key: Qt,
        keys: Xt,
        dropInstance: er
      }, rr = function(r, t) {
        return r === t || typeof r == "number" && typeof t == "number" && isNaN(r) && isNaN(t);
      }, nr = function(r, t) {
        for (var i = r.length, s = 0; s < i; ) {
          if (rr(r[s], t))
            return !0;
          s++;
        }
        return !1;
      }, ke = Array.isArray || function(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
      }, fe = {}, et = {}, ie = {
        INDEXEDDB: It,
        WEBSQL: Kt,
        LOCALSTORAGE: tr
      }, ir = [ie.INDEXEDDB._driver, ie.WEBSQL._driver, ie.LOCALSTORAGE._driver], de = ["dropInstance"], Se = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(de), or = {
        description: "",
        driver: ir.slice(),
        name: "localforage",
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        size: 4980736,
        storeName: "keyvaluepairs",
        version: 1
      };
      function sr(e, r) {
        e[r] = function() {
          var t = arguments;
          return e.ready().then(function() {
            return e[r].apply(e, t);
          });
        };
      }
      function Ee() {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];
          if (r)
            for (var t in r)
              r.hasOwnProperty(t) && (ke(r[t]) ? arguments[0][t] = r[t].slice() : arguments[0][t] = r[t]);
        }
        return arguments[0];
      }
      var ar = function() {
        function e(r) {
          B(this, e);
          for (var t in ie)
            if (ie.hasOwnProperty(t)) {
              var i = ie[t], s = i._driver;
              this[t] = s, fe[s] || this.defineDriver(i);
            }
          this._defaultConfig = Ee({}, or), this._config = Ee({}, this._defaultConfig, r), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {
          });
        }
        return e.prototype.config = function(t) {
          if ((typeof t > "u" ? "undefined" : v(t)) === "object") {
            if (this._ready)
              return new Error("Can't call config() after localforage has been used.");
            for (var i in t) {
              if (i === "storeName" && (t[i] = t[i].replace(/\W/g, "_")), i === "version" && typeof t[i] != "number")
                return new Error("Database version must be a number.");
              this._config[i] = t[i];
            }
            return "driver" in t && t.driver ? this.setDriver(this._config.driver) : !0;
          } else
            return typeof t == "string" ? this._config[t] : this._config;
        }, e.prototype.defineDriver = function(t, i, s) {
          var n = new b(function(l, y) {
            try {
              var _ = t._driver, S = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
              if (!t._driver) {
                y(S);
                return;
              }
              for (var x = Se.concat("_initStorage"), P = 0, F = x.length; P < F; P++) {
                var K = x[P], G = !nr(de, K);
                if ((G || t[K]) && typeof t[K] != "function") {
                  y(S);
                  return;
                }
              }
              var V = function() {
                for (var ue = function(cr) {
                  return function() {
                    var lr = new Error("Method " + cr + " is not implemented by the current driver"), tt = b.reject(lr);
                    return D(tt, arguments[arguments.length - 1]), tt;
                  };
                }, be = 0, ur = de.length; be < ur; be++) {
                  var xe = de[be];
                  t[xe] || (t[xe] = ue(xe));
                }
              };
              V();
              var W = function(ue) {
                fe[_] && console.info("Redefining LocalForage driver: " + _), fe[_] = t, et[_] = ue, l();
              };
              "_support" in t ? t._support && typeof t._support == "function" ? t._support().then(W, y) : W(!!t._support) : W(!0);
            } catch (Q) {
              y(Q);
            }
          });
          return O(n, i, s), n;
        }, e.prototype.driver = function() {
          return this._driver || null;
        }, e.prototype.getDriver = function(t, i, s) {
          var n = fe[t] ? b.resolve(fe[t]) : b.reject(new Error("Driver not found."));
          return O(n, i, s), n;
        }, e.prototype.getSerializer = function(t) {
          var i = b.resolve(we);
          return O(i, t), i;
        }, e.prototype.ready = function(t) {
          var i = this, s = i._driverSet.then(function() {
            return i._ready === null && (i._ready = i._initDriver()), i._ready;
          });
          return O(s, t, t), s;
        }, e.prototype.setDriver = function(t, i, s) {
          var n = this;
          ke(t) || (t = [t]);
          var l = this._getSupportedDrivers(t);
          function y() {
            n._config.driver = n.driver();
          }
          function _(P) {
            return n._extend(P), y(), n._ready = n._initStorage(n._config), n._ready;
          }
          function S(P) {
            return function() {
              var F = 0;
              function K() {
                for (; F < P.length; ) {
                  var G = P[F];
                  return F++, n._dbInfo = null, n._ready = null, n.getDriver(G).then(_).catch(K);
                }
                y();
                var V = new Error("No available storage method found.");
                return n._driverSet = b.reject(V), n._driverSet;
              }
              return K();
            };
          }
          var x = this._driverSet !== null ? this._driverSet.catch(function() {
            return b.resolve();
          }) : b.resolve();
          return this._driverSet = x.then(function() {
            var P = l[0];
            return n._dbInfo = null, n._ready = null, n.getDriver(P).then(function(F) {
              n._driver = F._driver, y(), n._wrapLibraryMethodsWithReady(), n._initDriver = S(l);
            });
          }).catch(function() {
            y();
            var P = new Error("No available storage method found.");
            return n._driverSet = b.reject(P), n._driverSet;
          }), O(this._driverSet, i, s), this._driverSet;
        }, e.prototype.supports = function(t) {
          return !!et[t];
        }, e.prototype._extend = function(t) {
          Ee(this, t);
        }, e.prototype._getSupportedDrivers = function(t) {
          for (var i = [], s = 0, n = t.length; s < n; s++) {
            var l = t[s];
            this.supports(l) && i.push(l);
          }
          return i;
        }, e.prototype._wrapLibraryMethodsWithReady = function() {
          for (var t = 0, i = Se.length; t < i; t++)
            sr(this, Se[t]);
        }, e.prototype.createInstance = function(t) {
          return new e(t);
        }, e;
      }(), fr = new ar();
      E.exports = fr;
    }, { 3: 3 }] }, {}, [4])(4);
  });
})(ut);
var Er = ut.exports;
const ct = /* @__PURE__ */ vr(Er), Ce = "NodeLocalStorage", lt = "./.localforage", Oe = {
  Description: "Node.js localStorage driver",
  Name: Ce,
  StoreName: "keyvaluepairs",
  StoragePath: lt,
  Size: 50 * 1024 * 1024
  // 50MB
};
let H = null;
const br = {
  _driver: Ce,
  _support: xr,
  _initStorage: Ir,
  getItem: Rr,
  setItem: Tr,
  removeItem: Lr,
  clear: Ar,
  length: Pr,
  key: Nr,
  keys: Or,
  iterate: Dr
};
function zr() {
  return ct.defineDriver(br);
}
function Kr(a) {
  const h = {
    ...Oe,
    ...a,
    driver: Ce
  };
  return ct.createInstance(h);
}
function xr() {
  try {
    return Promise.resolve(typeof De < "u");
  } catch {
    return Promise.resolve(!1);
  }
}
function Ir(a) {
  const h = {
    ...Oe,
    ...a
  }, d = h.StoragePath || lt, E = h.Size || Oe.Size;
  try {
    return Br(d), H = new De(d, E), Promise.resolve();
  } catch (R) {
    return Promise.reject(R);
  }
}
function Rr(a, h) {
  if (H == null) {
    const R = new Error("Storage is not initialized");
    return h != null && h(R, null), Promise.reject(R);
  }
  const d = H.getItem(a), E = ht(d);
  return h != null && h(null, E), Promise.resolve(E);
}
function Tr(a, h, d) {
  if (H == null) {
    const E = new Error("Storage is not initialized");
    return d != null && d(E, h), Promise.reject(E);
  }
  try {
    const E = Cr(h);
    return H.setItem(a, E), d != null && d(null, h), Promise.resolve(h);
  } catch (E) {
    return d != null && d(E, h), Promise.reject(E);
  }
}
function Lr(a, h) {
  if (H == null) {
    const d = new Error("Storage is not initialized");
    return h != null && h(d), Promise.reject(d);
  }
  try {
    return H.removeItem(a), h != null && h(null), Promise.resolve();
  } catch (d) {
    return h != null && h(d), Promise.reject(d);
  }
}
function Ar(a) {
  if (H == null) {
    const h = new Error("Storage is not initialized");
    return a != null && a(h), Promise.reject(h);
  }
  try {
    return H.clear(), a != null && a(null), Promise.resolve();
  } catch (h) {
    return a != null && a(h), Promise.reject(h);
  }
}
function Pr(a) {
  if (H == null) {
    const d = new Error("Storage is not initialized");
    return a != null && a(d, 0), Promise.reject(d);
  }
  const h = H.length;
  return a != null && a(null, h), Promise.resolve(h);
}
function Nr(a, h) {
  if (H == null) {
    const d = new Error("Storage is not initialized");
    return h != null && h(d, ""), Promise.reject(d);
  }
  try {
    const d = H.key(a);
    if (d === null) {
      const E = new Error(`Key at index ${a} not found`);
      return h != null && h(E, ""), Promise.reject(E);
    }
    return h != null && h(null, d), Promise.resolve(d);
  } catch (d) {
    return h != null && h(d, ""), Promise.reject(d);
  }
}
function Or(a) {
  if (H == null) {
    const h = new Error("Storage is not initialized");
    return a != null && a(h, []), Promise.reject(h);
  }
  try {
    const h = [];
    for (let d = 0; d < H.length; d++) {
      const E = H.key(d);
      E !== null && h.push(E);
    }
    return a != null && a(null, h), Promise.resolve(h);
  } catch (h) {
    return a != null && a(h, []), Promise.reject(h);
  }
}
function Dr(a, h) {
  if (H == null) {
    const d = new Error("Storage is not initialized");
    return h && h(d, void 0), Promise.reject(d);
  }
  try {
    const d = H.length;
    let E = 1;
    for (let R = 0; R < d; R++) {
      const v = H.key(R);
      if (v != null) {
        const B = ht(H.getItem(v));
        if (B !== null) {
          const M = a(B, v, E++);
          if (M !== void 0)
            return h != null && h(null, M), Promise.resolve(M);
        }
      }
    }
    return h != null && h(null, void 0), Promise.resolve(void 0);
  } catch (d) {
    return h != null && h(d, void 0), Promise.reject(d);
  }
}
function Cr(a) {
  return JSON.stringify(a);
}
function ht(a) {
  if (a === null)
    return null;
  try {
    return JSON.parse(a);
  } catch {
    return null;
  }
}
function Br(a) {
  Pe.existsSync(a) || Pe.mkdirSync(a, { recursive: !0 });
}
export {
  Ce as NodeLocalStorageDriver,
  Kr as createInstance,
  zr as defineDriver
};
