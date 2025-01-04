!function(e) {
    function t(t) {
        for (var n, i, o = t[0], s = t[1], a = 0, c = []; a < o.length; a++)
            i = o[a],
            Object.prototype.hasOwnProperty.call(r, i) && r[i] && c.push(r[i][0]),
            r[i] = 0;
        for (n in s)
            Object.prototype.hasOwnProperty.call(s, n) && (e[n] = s[n]);
        for (u && u(t); c.length; )
            c.shift()()
    }
    var n = {}
      , r = {
        2: 0
    };
    function i(t) {
        if (n[t])
            return n[t].exports;
        var r = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, i),
        r.l = !0,
        r.exports
    }
    i.e = function(e) {
        var t = []
          , n = r[e];
        if (0 !== n)
            if (n)
                t.push(n[2]);
            else {
                var o = new Promise((function(t, i) {
                    n = r[e] = [t, i]
                }
                ));
                t.push(n[2] = o);
                var s, a = document.createElement("script");
                a.charset = "utf-8",
                a.timeout = 120,
                i.nc && a.setAttribute("nonce", i.nc),
                a.src = function(e) {
                    return i.p + "" + ({}[e] || e) + ".fe8415897932ee6cfc43.js"
                }(e);
                var u = new Error;
                s = function(t) {
                    a.onerror = a.onload = null,
                    clearTimeout(c);
                    var n = r[e];
                    if (0 !== n) {
                        if (n) {
                            var i = t && ("load" === t.type ? "missing" : t.type)
                              , o = t && t.target && t.target.src;
                            u.message = "Loading chunk " + e + " failed.\n(" + i + ": " + o + ")",
                            u.name = "ChunkLoadError",
                            u.type = i,
                            u.request = o,
                            n[1](u)
                        }
                        r[e] = void 0
                    }
                }
                ;
                var c = setTimeout((function() {
                    s({
                        type: "timeout",
                        target: a
                    })
                }
                ), 12e4);
                a.onerror = a.onload = s,
                document.head.appendChild(a)
            }
        return Promise.all(t)
    }
    ,
    i.m = e,
    i.c = n,
    i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }
    ,
    i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    i.t = function(e, t) {
        if (1 & t && (e = i(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (i.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var r in e)
                i.d(n, r, function(t) {
                    return e[t]
                }
                .bind(null, r));
        return n
    }
    ,
    i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return i.d(t, "a", t),
        t
    }
    ,
    i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    i.p = "",
    i.oe = function(e) {
        throw console.error(e),
        e
    }
    ;
    var o = window.webpackJsonp = window.webpackJsonp || []
      , s = o.push.bind(o);
    o.push = t,
    o = o.slice();
    for (var a = 0; a < o.length; a++)
        t(o[a]);
    var u = s;
    i(i.s = 145)
}([function(e, t, n) {
    var r = {
        util: n(2)
    };
    ({}).toString(),
    e.exports = r,
    r.util.update(r, {
        VERSION: "2.518.0",
        Signers: {},
        Protocol: {
            Json: n(19),
            Query: n(27),
            Rest: n(14),
            RestJson: n(29),
            RestXml: n(30)
        },
        XML: {
            Builder: n(58),
            Parser: null
        },
        JSON: {
            Builder: n(20),
            Parser: n(21)
        },
        Model: {
            Api: n(31),
            Operation: n(32),
            Shape: n(11),
            Paginator: n(33),
            ResourceWaiter: n(34)
        },
        apiLoader: n(63),
        EndpointCache: n(64).EndpointCache
    }),
    n(35),
    n(66),
    n(69),
    n(38),
    n(70),
    n(75),
    n(77),
    n(78),
    n(79),
    n(86),
    r.events = new r.SequentialExecutor,
    r.util.memoizedProperty(r, "endpointCache", (function() {
        return new r.EndpointCache(r.config.endpointCacheSize)
    }
    ), !0)
}
, function(e, t, n) {
    "use strict";
    (function(e) {
        /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
        var r = n(93)
          , i = n(94)
          , o = n(95);
        function s() {
            return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }
        function a(e, t) {
            if (s() < t)
                throw new RangeError("Invalid typed array length");
            return u.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = u.prototype : (null === e && (e = new u(t)),
            e.length = t),
            e
        }
        function u(e, t, n) {
            if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
                return new u(e,t,n);
            if ("number" == typeof e) {
                if ("string" == typeof t)
                    throw new Error("If encoding is specified then the first argument must be a string");
                return h(this, e)
            }
            return c(this, e, t, n)
        }
        function c(e, t, n, r) {
            if ("number" == typeof t)
                throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, n, r) {
                if (t.byteLength,
                n < 0 || t.byteLength < n)
                    throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < n + (r || 0))
                    throw new RangeError("'length' is out of bounds");
                t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t,n) : new Uint8Array(t,n,r);
                u.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = u.prototype : e = f(e, t);
                return e
            }(e, t, n, r) : "string" == typeof t ? function(e, t, n) {
                "string" == typeof n && "" !== n || (n = "utf8");
                if (!u.isEncoding(n))
                    throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | p(t, n)
                  , i = (e = a(e, r)).write(t, n);
                i !== r && (e = e.slice(0, i));
                return e
            }(e, t, n) : function(e, t) {
                if (u.isBuffer(t)) {
                    var n = 0 | d(t.length);
                    return 0 === (e = a(e, n)).length || t.copy(e, 0, 0, n),
                    e
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length"in t)
                        return "number" != typeof t.length || (r = t.length) != r ? a(e, 0) : f(e, t);
                    if ("Buffer" === t.type && o(t.data))
                        return f(e, t.data)
                }
                var r;
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }(e, t)
        }
        function l(e) {
            if ("number" != typeof e)
                throw new TypeError('"size" argument must be a number');
            if (e < 0)
                throw new RangeError('"size" argument must not be negative')
        }
        function h(e, t) {
            if (l(t),
            e = a(e, t < 0 ? 0 : 0 | d(t)),
            !u.TYPED_ARRAY_SUPPORT)
                for (var n = 0; n < t; ++n)
                    e[n] = 0;
            return e
        }
        function f(e, t) {
            var n = t.length < 0 ? 0 : 0 | d(t.length);
            e = a(e, n);
            for (var r = 0; r < n; r += 1)
                e[r] = 255 & t[r];
            return e
        }
        function d(e) {
            if (e >= s())
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
            return 0 | e
        }
        function p(e, t) {
            if (u.isBuffer(e))
                return e.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))
                return e.byteLength;
            "string" != typeof e && (e = "" + e);
            var n = e.length;
            if (0 === n)
                return 0;
            for (var r = !1; ; )
                switch (t) {
                case "ascii":
                case "latin1":
                case "binary":
                    return n;
                case "utf8":
                case "utf-8":
                case void 0:
                    return j(e).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * n;
                case "hex":
                    return n >>> 1;
                case "base64":
                    return B(e).length;
                default:
                    if (r)
                        return j(e).length;
                    t = ("" + t).toLowerCase(),
                    r = !0
                }
        }
        function g(e, t, n) {
            var r = !1;
            if ((void 0 === t || t < 0) && (t = 0),
            t > this.length)
                return "";
            if ((void 0 === n || n > this.length) && (n = this.length),
            n <= 0)
                return "";
            if ((n >>>= 0) <= (t >>>= 0))
                return "";
            for (e || (e = "utf8"); ; )
                switch (e) {
                case "hex":
                    return x(this, t, n);
                case "utf8":
                case "utf-8":
                    return I(this, t, n);
                case "ascii":
                    return T(this, t, n);
                case "latin1":
                case "binary":
                    return k(this, t, n);
                case "base64":
                    return C(this, t, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return P(this, t, n);
                default:
                    if (r)
                        throw new TypeError("Unknown encoding: " + e);
                    e = (e + "").toLowerCase(),
                    r = !0
                }
        }
        function m(e, t, n) {
            var r = e[t];
            e[t] = e[n],
            e[n] = r
        }
        function y(e, t, n, r, i) {
            if (0 === e.length)
                return -1;
            if ("string" == typeof n ? (r = n,
            n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648),
            n = +n,
            isNaN(n) && (n = i ? 0 : e.length - 1),
            n < 0 && (n = e.length + n),
            n >= e.length) {
                if (i)
                    return -1;
                n = e.length - 1
            } else if (n < 0) {
                if (!i)
                    return -1;
                n = 0
            }
            if ("string" == typeof t && (t = u.from(t, r)),
            u.isBuffer(t))
                return 0 === t.length ? -1 : v(e, t, n, r, i);
            if ("number" == typeof t)
                return t &= 255,
                u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : v(e, [t], n, r, i);
            throw new TypeError("val must be string, number or Buffer")
        }
        function v(e, t, n, r, i) {
            var o, s = 1, a = e.length, u = t.length;
            if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (e.length < 2 || t.length < 2)
                    return -1;
                s = 2,
                a /= 2,
                u /= 2,
                n /= 2
            }
            function c(e, t) {
                return 1 === s ? e[t] : e.readUInt16BE(t * s)
            }
            if (i) {
                var l = -1;
                for (o = n; o < a; o++)
                    if (c(e, o) === c(t, -1 === l ? 0 : o - l)) {
                        if (-1 === l && (l = o),
                        o - l + 1 === u)
                            return l * s
                    } else
                        -1 !== l && (o -= o - l),
                        l = -1
            } else
                for (n + u > a && (n = a - u),
                o = n; o >= 0; o--) {
                    for (var h = !0, f = 0; f < u; f++)
                        if (c(e, o + f) !== c(t, f)) {
                            h = !1;
                            break
                        }
                    if (h)
                        return o
                }
            return -1
        }
        function b(e, t, n, r) {
            n = Number(n) || 0;
            var i = e.length - n;
            r ? (r = Number(r)) > i && (r = i) : r = i;
            var o = t.length;
            if (o % 2 != 0)
                throw new TypeError("Invalid hex string");
            r > o / 2 && (r = o / 2);
            for (var s = 0; s < r; ++s) {
                var a = parseInt(t.substr(2 * s, 2), 16);
                if (isNaN(a))
                    return s;
                e[n + s] = a
            }
            return s
        }
        function w(e, t, n, r) {
            return V(j(t, e.length - n), e, n, r)
        }
        function S(e, t, n, r) {
            return V(function(e) {
                for (var t = [], n = 0; n < e.length; ++n)
                    t.push(255 & e.charCodeAt(n));
                return t
            }(t), e, n, r)
        }
        function E(e, t, n, r) {
            return S(e, t, n, r)
        }
        function _(e, t, n, r) {
            return V(B(t), e, n, r)
        }
        function A(e, t, n, r) {
            return V(function(e, t) {
                for (var n, r, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s)
                    n = e.charCodeAt(s),
                    r = n >> 8,
                    i = n % 256,
                    o.push(i),
                    o.push(r);
                return o
            }(t, e.length - n), e, n, r)
        }
        function C(e, t, n) {
            return 0 === t && n === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, n))
        }
        function I(e, t, n) {
            n = Math.min(e.length, n);
            for (var r = [], i = t; i < n; ) {
                var o, s, a, u, c = e[i], l = null, h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                if (i + h <= n)
                    switch (h) {
                    case 1:
                        c < 128 && (l = c);
                        break;
                    case 2:
                        128 == (192 & (o = e[i + 1])) && (u = (31 & c) << 6 | 63 & o) > 127 && (l = u);
                        break;
                    case 3:
                        o = e[i + 1],
                        s = e[i + 2],
                        128 == (192 & o) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (l = u);
                        break;
                    case 4:
                        o = e[i + 1],
                        s = e[i + 2],
                        a = e[i + 3],
                        128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (l = u)
                    }
                null === l ? (l = 65533,
                h = 1) : l > 65535 && (l -= 65536,
                r.push(l >>> 10 & 1023 | 55296),
                l = 56320 | 1023 & l),
                r.push(l),
                i += h
            }
            return function(e) {
                var t = e.length;
                if (t <= 4096)
                    return String.fromCharCode.apply(String, e);
                var n = ""
                  , r = 0;
                for (; r < t; )
                    n += String.fromCharCode.apply(String, e.slice(r, r += 4096));
                return n
            }(r)
        }
        t.Buffer = u,
        t.SlowBuffer = function(e) {
            +e != e && (e = 0);
            return u.alloc(+e)
        }
        ,
        t.INSPECT_MAX_BYTES = 50,
        u.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
            try {
                var e = new Uint8Array(1);
                return e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                },
                42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
            } catch (e) {
                return !1
            }
        }(),
        t.kMaxLength = s(),
        u.poolSize = 8192,
        u._augment = function(e) {
            return e.__proto__ = u.prototype,
            e
        }
        ,
        u.from = function(e, t, n) {
            return c(null, e, t, n)
        }
        ,
        u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype,
        u.__proto__ = Uint8Array,
        "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
            value: null,
            configurable: !0
        })),
        u.alloc = function(e, t, n) {
            return function(e, t, n, r) {
                return l(t),
                t <= 0 ? a(e, t) : void 0 !== n ? "string" == typeof r ? a(e, t).fill(n, r) : a(e, t).fill(n) : a(e, t)
            }(null, e, t, n)
        }
        ,
        u.allocUnsafe = function(e) {
            return h(null, e)
        }
        ,
        u.allocUnsafeSlow = function(e) {
            return h(null, e)
        }
        ,
        u.isBuffer = function(e) {
            return !(null == e || !e._isBuffer)
        }
        ,
        u.compare = function(e, t) {
            if (!u.isBuffer(e) || !u.isBuffer(t))
                throw new TypeError("Arguments must be Buffers");
            if (e === t)
                return 0;
            for (var n = e.length, r = t.length, i = 0, o = Math.min(n, r); i < o; ++i)
                if (e[i] !== t[i]) {
                    n = e[i],
                    r = t[i];
                    break
                }
            return n < r ? -1 : r < n ? 1 : 0
        }
        ,
        u.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }
        ,
        u.concat = function(e, t) {
            if (!o(e))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length)
                return u.alloc(0);
            var n;
            if (void 0 === t)
                for (t = 0,
                n = 0; n < e.length; ++n)
                    t += e[n].length;
            var r = u.allocUnsafe(t)
              , i = 0;
            for (n = 0; n < e.length; ++n) {
                var s = e[n];
                if (!u.isBuffer(s))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                s.copy(r, i),
                i += s.length
            }
            return r
        }
        ,
        u.byteLength = p,
        u.prototype._isBuffer = !0,
        u.prototype.swap16 = function() {
            var e = this.length;
            if (e % 2 != 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2)
                m(this, t, t + 1);
            return this
        }
        ,
        u.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 != 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4)
                m(this, t, t + 3),
                m(this, t + 1, t + 2);
            return this
        }
        ,
        u.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 != 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8)
                m(this, t, t + 7),
                m(this, t + 1, t + 6),
                m(this, t + 2, t + 5),
                m(this, t + 3, t + 4);
            return this
        }
        ,
        u.prototype.toString = function() {
            var e = 0 | this.length;
            return 0 === e ? "" : 0 === arguments.length ? I(this, 0, e) : g.apply(this, arguments)
        }
        ,
        u.prototype.equals = function(e) {
            if (!u.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === u.compare(this, e)
        }
        ,
        u.prototype.inspect = function() {
            var e = ""
              , n = t.INSPECT_MAX_BYTES;
            return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "),
            this.length > n && (e += " ... ")),
            "<Buffer " + e + ">"
        }
        ,
        u.prototype.compare = function(e, t, n, r, i) {
            if (!u.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
            if (void 0 === t && (t = 0),
            void 0 === n && (n = e ? e.length : 0),
            void 0 === r && (r = 0),
            void 0 === i && (i = this.length),
            t < 0 || n > e.length || r < 0 || i > this.length)
                throw new RangeError("out of range index");
            if (r >= i && t >= n)
                return 0;
            if (r >= i)
                return -1;
            if (t >= n)
                return 1;
            if (this === e)
                return 0;
            for (var o = (i >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (t >>>= 0), a = Math.min(o, s), c = this.slice(r, i), l = e.slice(t, n), h = 0; h < a; ++h)
                if (c[h] !== l[h]) {
                    o = c[h],
                    s = l[h];
                    break
                }
            return o < s ? -1 : s < o ? 1 : 0
        }
        ,
        u.prototype.includes = function(e, t, n) {
            return -1 !== this.indexOf(e, t, n)
        }
        ,
        u.prototype.indexOf = function(e, t, n) {
            return y(this, e, t, n, !0)
        }
        ,
        u.prototype.lastIndexOf = function(e, t, n) {
            return y(this, e, t, n, !1)
        }
        ,
        u.prototype.write = function(e, t, n, r) {
            if (void 0 === t)
                r = "utf8",
                n = this.length,
                t = 0;
            else if (void 0 === n && "string" == typeof t)
                r = t,
                n = this.length,
                t = 0;
            else {
                if (!isFinite(t))
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t |= 0,
                isFinite(n) ? (n |= 0,
                void 0 === r && (r = "utf8")) : (r = n,
                n = void 0)
            }
            var i = this.length - t;
            if ((void 0 === n || n > i) && (n = i),
            e.length > 0 && (n < 0 || t < 0) || t > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var o = !1; ; )
                switch (r) {
                case "hex":
                    return b(this, e, t, n);
                case "utf8":
                case "utf-8":
                    return w(this, e, t, n);
                case "ascii":
                    return S(this, e, t, n);
                case "latin1":
                case "binary":
                    return E(this, e, t, n);
                case "base64":
                    return _(this, e, t, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return A(this, e, t, n);
                default:
                    if (o)
                        throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(),
                    o = !0
                }
        }
        ,
        u.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        function T(e, t, n) {
            var r = "";
            n = Math.min(e.length, n);
            for (var i = t; i < n; ++i)
                r += String.fromCharCode(127 & e[i]);
            return r
        }
        function k(e, t, n) {
            var r = "";
            n = Math.min(e.length, n);
            for (var i = t; i < n; ++i)
                r += String.fromCharCode(e[i]);
            return r
        }
        function x(e, t, n) {
            var r = e.length;
            (!t || t < 0) && (t = 0),
            (!n || n < 0 || n > r) && (n = r);
            for (var i = "", o = t; o < n; ++o)
                i += F(e[o]);
            return i
        }
        function P(e, t, n) {
            for (var r = e.slice(t, n), i = "", o = 0; o < r.length; o += 2)
                i += String.fromCharCode(r[o] + 256 * r[o + 1]);
            return i
        }
        function R(e, t, n) {
            if (e % 1 != 0 || e < 0)
                throw new RangeError("offset is not uint");
            if (e + t > n)
                throw new RangeError("Trying to access beyond buffer length")
        }
        function O(e, t, n, r, i, o) {
            if (!u.isBuffer(e))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > i || t < o)
                throw new RangeError('"value" argument is out of bounds');
            if (n + r > e.length)
                throw new RangeError("Index out of range")
        }
        function N(e, t, n, r) {
            t < 0 && (t = 65535 + t + 1);
            for (var i = 0, o = Math.min(e.length - n, 2); i < o; ++i)
                e[n + i] = (t & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
        }
        function U(e, t, n, r) {
            t < 0 && (t = 4294967295 + t + 1);
            for (var i = 0, o = Math.min(e.length - n, 4); i < o; ++i)
                e[n + i] = t >>> 8 * (r ? i : 3 - i) & 255
        }
        function D(e, t, n, r, i, o) {
            if (n + r > e.length)
                throw new RangeError("Index out of range");
            if (n < 0)
                throw new RangeError("Index out of range")
        }
        function L(e, t, n, r, o) {
            return o || D(e, 0, n, 4),
            i.write(e, t, n, r, 23, 4),
            n + 4
        }
        function q(e, t, n, r, o) {
            return o || D(e, 0, n, 8),
            i.write(e, t, n, r, 52, 8),
            n + 8
        }
        u.prototype.slice = function(e, t) {
            var n, r = this.length;
            if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            t < e && (t = e),
            u.TYPED_ARRAY_SUPPORT)
                (n = this.subarray(e, t)).__proto__ = u.prototype;
            else {
                var i = t - e;
                n = new u(i,void 0);
                for (var o = 0; o < i; ++o)
                    n[o] = this[o + e]
            }
            return n
        }
        ,
        u.prototype.readUIntLE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || R(e, t, this.length);
            for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
                r += this[e + o] * i;
            return r
        }
        ,
        u.prototype.readUIntBE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || R(e, t, this.length);
            for (var r = this[e + --t], i = 1; t > 0 && (i *= 256); )
                r += this[e + --t] * i;
            return r
        }
        ,
        u.prototype.readUInt8 = function(e, t) {
            return t || R(e, 1, this.length),
            this[e]
        }
        ,
        u.prototype.readUInt16LE = function(e, t) {
            return t || R(e, 2, this.length),
            this[e] | this[e + 1] << 8
        }
        ,
        u.prototype.readUInt16BE = function(e, t) {
            return t || R(e, 2, this.length),
            this[e] << 8 | this[e + 1]
        }
        ,
        u.prototype.readUInt32LE = function(e, t) {
            return t || R(e, 4, this.length),
            (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
        }
        ,
        u.prototype.readUInt32BE = function(e, t) {
            return t || R(e, 4, this.length),
            16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }
        ,
        u.prototype.readIntLE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || R(e, t, this.length);
            for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
                r += this[e + o] * i;
            return r >= (i *= 128) && (r -= Math.pow(2, 8 * t)),
            r
        }
        ,
        u.prototype.readIntBE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || R(e, t, this.length);
            for (var r = t, i = 1, o = this[e + --r]; r > 0 && (i *= 256); )
                o += this[e + --r] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)),
            o
        }
        ,
        u.prototype.readInt8 = function(e, t) {
            return t || R(e, 1, this.length),
            128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
        }
        ,
        u.prototype.readInt16LE = function(e, t) {
            t || R(e, 2, this.length);
            var n = this[e] | this[e + 1] << 8;
            return 32768 & n ? 4294901760 | n : n
        }
        ,
        u.prototype.readInt16BE = function(e, t) {
            t || R(e, 2, this.length);
            var n = this[e + 1] | this[e] << 8;
            return 32768 & n ? 4294901760 | n : n
        }
        ,
        u.prototype.readInt32LE = function(e, t) {
            return t || R(e, 4, this.length),
            this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }
        ,
        u.prototype.readInt32BE = function(e, t) {
            return t || R(e, 4, this.length),
            this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }
        ,
        u.prototype.readFloatLE = function(e, t) {
            return t || R(e, 4, this.length),
            i.read(this, e, !0, 23, 4)
        }
        ,
        u.prototype.readFloatBE = function(e, t) {
            return t || R(e, 4, this.length),
            i.read(this, e, !1, 23, 4)
        }
        ,
        u.prototype.readDoubleLE = function(e, t) {
            return t || R(e, 8, this.length),
            i.read(this, e, !0, 52, 8)
        }
        ,
        u.prototype.readDoubleBE = function(e, t) {
            return t || R(e, 8, this.length),
            i.read(this, e, !1, 52, 8)
        }
        ,
        u.prototype.writeUIntLE = function(e, t, n, r) {
            (e = +e,
            t |= 0,
            n |= 0,
            r) || O(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var i = 1
              , o = 0;
            for (this[t] = 255 & e; ++o < n && (i *= 256); )
                this[t + o] = e / i & 255;
            return t + n
        }
        ,
        u.prototype.writeUIntBE = function(e, t, n, r) {
            (e = +e,
            t |= 0,
            n |= 0,
            r) || O(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var i = n - 1
              , o = 1;
            for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); )
                this[t + i] = e / o & 255;
            return t + n
        }
        ,
        u.prototype.writeUInt8 = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 1, 255, 0),
            u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            this[t] = 255 & e,
            t + 1
        }
        ,
        u.prototype.writeUInt16LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
            this[t + 1] = e >>> 8) : N(this, e, t, !0),
            t + 2
        }
        ,
        u.prototype.writeUInt16BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
            this[t + 1] = 255 & e) : N(this, e, t, !1),
            t + 2
        }
        ,
        u.prototype.writeUInt32LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24,
            this[t + 2] = e >>> 16,
            this[t + 1] = e >>> 8,
            this[t] = 255 & e) : U(this, e, t, !0),
            t + 4
        }
        ,
        u.prototype.writeUInt32BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = 255 & e) : U(this, e, t, !1),
            t + 4
        }
        ,
        u.prototype.writeIntLE = function(e, t, n, r) {
            if (e = +e,
            t |= 0,
            !r) {
                var i = Math.pow(2, 8 * n - 1);
                O(this, e, t, n, i - 1, -i)
            }
            var o = 0
              , s = 1
              , a = 0;
            for (this[t] = 255 & e; ++o < n && (s *= 256); )
                e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1),
                this[t + o] = (e / s >> 0) - a & 255;
            return t + n
        }
        ,
        u.prototype.writeIntBE = function(e, t, n, r) {
            if (e = +e,
            t |= 0,
            !r) {
                var i = Math.pow(2, 8 * n - 1);
                O(this, e, t, n, i - 1, -i)
            }
            var o = n - 1
              , s = 1
              , a = 0;
            for (this[t + o] = 255 & e; --o >= 0 && (s *= 256); )
                e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1),
                this[t + o] = (e / s >> 0) - a & 255;
            return t + n
        }
        ,
        u.prototype.writeInt8 = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 1, 127, -128),
            u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            e < 0 && (e = 255 + e + 1),
            this[t] = 255 & e,
            t + 1
        }
        ,
        u.prototype.writeInt16LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
            this[t + 1] = e >>> 8) : N(this, e, t, !0),
            t + 2
        }
        ,
        u.prototype.writeInt16BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
            this[t + 1] = 255 & e) : N(this, e, t, !1),
            t + 2
        }
        ,
        u.prototype.writeInt32LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 4, 2147483647, -2147483648),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
            this[t + 1] = e >>> 8,
            this[t + 2] = e >>> 16,
            this[t + 3] = e >>> 24) : U(this, e, t, !0),
            t + 4
        }
        ,
        u.prototype.writeInt32BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || O(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = 255 & e) : U(this, e, t, !1),
            t + 4
        }
        ,
        u.prototype.writeFloatLE = function(e, t, n) {
            return L(this, e, t, !0, n)
        }
        ,
        u.prototype.writeFloatBE = function(e, t, n) {
            return L(this, e, t, !1, n)
        }
        ,
        u.prototype.writeDoubleLE = function(e, t, n) {
            return q(this, e, t, !0, n)
        }
        ,
        u.prototype.writeDoubleBE = function(e, t, n) {
            return q(this, e, t, !1, n)
        }
        ,
        u.prototype.copy = function(e, t, n, r) {
            if (n || (n = 0),
            r || 0 === r || (r = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            r > 0 && r < n && (r = n),
            r === n)
                return 0;
            if (0 === e.length || 0 === this.length)
                return 0;
            if (t < 0)
                throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)
                throw new RangeError("sourceStart out of bounds");
            if (r < 0)
                throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length),
            e.length - t < r - n && (r = e.length - t + n);
            var i, o = r - n;
            if (this === e && n < t && t < r)
                for (i = o - 1; i >= 0; --i)
                    e[i + t] = this[i + n];
            else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT)
                for (i = 0; i < o; ++i)
                    e[i + t] = this[i + n];
            else
                Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
            return o
        }
        ,
        u.prototype.fill = function(e, t, n, r) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (r = t,
                t = 0,
                n = this.length) : "string" == typeof n && (r = n,
                n = this.length),
                1 === e.length) {
                    var i = e.charCodeAt(0);
                    i < 256 && (e = i)
                }
                if (void 0 !== r && "string" != typeof r)
                    throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !u.isEncoding(r))
                    throw new TypeError("Unknown encoding: " + r)
            } else
                "number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < n)
                throw new RangeError("Out of range index");
            if (n <= t)
                return this;
            var o;
            if (t >>>= 0,
            n = void 0 === n ? this.length : n >>> 0,
            e || (e = 0),
            "number" == typeof e)
                for (o = t; o < n; ++o)
                    this[o] = e;
            else {
                var s = u.isBuffer(e) ? e : j(new u(e,r).toString())
                  , a = s.length;
                for (o = 0; o < n - t; ++o)
                    this[o + t] = s[o % a]
            }
            return this
        }
        ;
        var M = /[^+\/0-9A-Za-z-_]/g;
        function F(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16)
        }
        function j(e, t) {
            var n;
            t = t || 1 / 0;
            for (var r = e.length, i = null, o = [], s = 0; s < r; ++s) {
                if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {
                    if (!i) {
                        if (n > 56319) {
                            (t -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (s + 1 === r) {
                            (t -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = n;
                        continue
                    }
                    if (n < 56320) {
                        (t -= 3) > -1 && o.push(239, 191, 189),
                        i = n;
                        continue
                    }
                    n = 65536 + (i - 55296 << 10 | n - 56320)
                } else
                    i && (t -= 3) > -1 && o.push(239, 191, 189);
                if (i = null,
                n < 128) {
                    if ((t -= 1) < 0)
                        break;
                    o.push(n)
                } else if (n < 2048) {
                    if ((t -= 2) < 0)
                        break;
                    o.push(n >> 6 | 192, 63 & n | 128)
                } else if (n < 65536) {
                    if ((t -= 3) < 0)
                        break;
                    o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(n < 1114112))
                        throw new Error("Invalid code point");
                    if ((t -= 4) < 0)
                        break;
                    o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return o
        }
        function B(e) {
            return r.toByteArray(function(e) {
                if ((e = function(e) {
                    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                }(e).replace(M, "")).length < 2)
                    return "";
                for (; e.length % 4 != 0; )
                    e += "=";
                return e
            }(e))
        }
        function V(e, t, n, r) {
            for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i)
                t[i + n] = e[i];
            return i
        }
    }
    ).call(this, n(13))
}
, function(e, t, n) {
    (function(t, r) {
        var i, o = {
            environment: "nodejs",
            engine: function() {
                if (o.isBrowser() && "undefined" != typeof navigator)
                    return navigator.userAgent;
                var e = t.platform + "/" + t.version;
                return t.env.AWS_EXECUTION_ENV && (e += " exec-env/" + t.env.AWS_EXECUTION_ENV),
                e
            },
            userAgent: function() {
                var e = o.environment
                  , t = "aws-sdk-" + e + "/" + n(0).VERSION;
                return "nodejs" === e && (t += " " + o.engine()),
                t
            },
            uriEscape: function(e) {
                var t = encodeURIComponent(e);
                return t = (t = t.replace(/[^A-Za-z0-9_.~\-%]+/g, escape)).replace(/[*]/g, (function(e) {
                    return "%" + e.charCodeAt(0).toString(16).toUpperCase()
                }
                ))
            },
            uriEscapePath: function(e) {
                var t = [];
                return o.arrayEach(e.split("/"), (function(e) {
                    t.push(o.uriEscape(e))
                }
                )),
                t.join("/")
            },
            urlParse: function(e) {
                return o.url.parse(e)
            },
            urlFormat: function(e) {
                return o.url.format(e)
            },
            queryStringParse: function(e) {
                return o.querystring.parse(e)
            },
            queryParamsToString: function(e) {
                var t = []
                  , n = o.uriEscape
                  , r = Object.keys(e).sort();
                return o.arrayEach(r, (function(r) {
                    var i = e[r]
                      , s = n(r)
                      , a = s + "=";
                    if (Array.isArray(i)) {
                        var u = [];
                        o.arrayEach(i, (function(e) {
                            u.push(n(e))
                        }
                        )),
                        a = s + "=" + u.sort().join("&" + s + "=")
                    } else
                        null != i && (a = s + "=" + n(i));
                    t.push(a)
                }
                )),
                t.join("&")
            },
            readFileSync: function(e) {
                return o.isBrowser() ? null : n(24).readFileSync(e, "utf-8")
            },
            base64: {
                encode: function(e) {
                    if ("number" == typeof e)
                        throw o.error(new Error("Cannot base64 encode number " + e));
                    return null == e ? e : o.buffer.toBuffer(e).toString("base64")
                },
                decode: function(e) {
                    if ("number" == typeof e)
                        throw o.error(new Error("Cannot base64 decode number " + e));
                    return null == e ? e : o.buffer.toBuffer(e, "base64")
                }
            },
            buffer: {
                toBuffer: function(e, t) {
                    return "function" == typeof o.Buffer.from && o.Buffer.from !== Uint8Array.from ? o.Buffer.from(e, t) : new o.Buffer(e,t)
                },
                alloc: function(e, t, n) {
                    if ("number" != typeof e)
                        throw new Error("size passed to alloc must be a number.");
                    if ("function" == typeof o.Buffer.alloc)
                        return o.Buffer.alloc(e, t, n);
                    var r = new o.Buffer(e);
                    return void 0 !== t && "function" == typeof r.fill && r.fill(t, void 0, void 0, n),
                    r
                },
                toStream: function(e) {
                    o.Buffer.isBuffer(e) || (e = o.buffer.toBuffer(e));
                    var t = new o.stream.Readable
                      , n = 0;
                    return t._read = function(r) {
                        if (n >= e.length)
                            return t.push(null);
                        var i = n + r;
                        i > e.length && (i = e.length),
                        t.push(e.slice(n, i)),
                        n = i
                    }
                    ,
                    t
                },
                concat: function(e) {
                    var t, n, r = 0, i = 0;
                    for (n = 0; n < e.length; n++)
                        r += e[n].length;
                    for (t = o.buffer.alloc(r),
                    n = 0; n < e.length; n++)
                        e[n].copy(t, i),
                        i += e[n].length;
                    return t
                }
            },
            string: {
                byteLength: function(e) {
                    if (null == e)
                        return 0;
                    if ("string" == typeof e && (e = o.buffer.toBuffer(e)),
                    "number" == typeof e.byteLength)
                        return e.byteLength;
                    if ("number" == typeof e.length)
                        return e.length;
                    if ("number" == typeof e.size)
                        return e.size;
                    if ("string" == typeof e.path)
                        return n(24).lstatSync(e.path).size;
                    throw o.error(new Error("Cannot determine length of " + e), {
                        object: e
                    })
                },
                upperFirst: function(e) {
                    return e[0].toUpperCase() + e.substr(1)
                },
                lowerFirst: function(e) {
                    return e[0].toLowerCase() + e.substr(1)
                }
            },
            ini: {
                parse: function(e) {
                    var t, n = {};
                    return o.arrayEach(e.split(/\r?\n/), (function(e) {
                        var r = (e = e.split(/(^|\s)[;#]/)[0]).match(/^\s*\[([^\[\]]+)\]\s*$/);
                        if (r)
                            t = r[1];
                        else if (t) {
                            var i = e.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);
                            i && (n[t] = n[t] || {},
                            n[t][i[1]] = i[2])
                        }
                    }
                    )),
                    n
                }
            },
            fn: {
                noop: function() {},
                callback: function(e) {
                    if (e)
                        throw e
                },
                makeAsync: function(e, t) {
                    return t && t <= e.length ? e : function() {
                        var t = Array.prototype.slice.call(arguments, 0)
                          , n = t.pop()
                          , r = e.apply(null, t);
                        n(r)
                    }
                }
            },
            date: {
                getDate: function() {
                    return i || (i = n(0)),
                    i.config.systemClockOffset ? new Date((new Date).getTime() + i.config.systemClockOffset) : new Date
                },
                iso8601: function(e) {
                    return void 0 === e && (e = o.date.getDate()),
                    e.toISOString().replace(/\.\d{3}Z$/, "Z")
                },
                rfc822: function(e) {
                    return void 0 === e && (e = o.date.getDate()),
                    e.toUTCString()
                },
                unixTimestamp: function(e) {
                    return void 0 === e && (e = o.date.getDate()),
                    e.getTime() / 1e3
                },
                from: function(e) {
                    return "number" == typeof e ? new Date(1e3 * e) : new Date(e)
                },
                format: function(e, t) {
                    return t || (t = "iso8601"),
                    o.date[t](o.date.from(e))
                },
                parseTimestamp: function(e) {
                    if ("number" == typeof e)
                        return new Date(1e3 * e);
                    if (e.match(/^\d+$/))
                        return new Date(1e3 * e);
                    if (e.match(/^\d{4}/))
                        return new Date(e);
                    if (e.match(/^\w{3},/))
                        return new Date(e);
                    throw o.error(new Error("unhandled timestamp format: " + e), {
                        code: "TimestampParserError"
                    })
                }
            },
            crypto: {
                crc32Table: [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117],
                crc32: function(e) {
                    var t = o.crypto.crc32Table
                      , n = -1;
                    "string" == typeof e && (e = o.buffer.toBuffer(e));
                    for (var r = 0; r < e.length; r++) {
                        n = n >>> 8 ^ t[255 & (n ^ e.readUInt8(r))]
                    }
                    return (-1 ^ n) >>> 0
                },
                hmac: function(e, t, n, r) {
                    return n || (n = "binary"),
                    "buffer" === n && (n = void 0),
                    r || (r = "sha256"),
                    "string" == typeof t && (t = o.buffer.toBuffer(t)),
                    o.crypto.lib.createHmac(r, e).update(t).digest(n)
                },
                md5: function(e, t, n) {
                    return o.crypto.hash("md5", e, t, n)
                },
                sha256: function(e, t, n) {
                    return o.crypto.hash("sha256", e, t, n)
                },
                hash: function(e, t, n, r) {
                    var i = o.crypto.createHash(e);
                    n || (n = "binary"),
                    "buffer" === n && (n = void 0),
                    "string" == typeof t && (t = o.buffer.toBuffer(t));
                    var s = o.arraySliceFn(t)
                      , a = o.Buffer.isBuffer(t);
                    if (o.isBrowser() && "undefined" != typeof ArrayBuffer && t && t.buffer instanceof ArrayBuffer && (a = !0),
                    r && "object" == typeof t && "function" == typeof t.on && !a)
                        t.on("data", (function(e) {
                            i.update(e)
                        }
                        )),
                        t.on("error", (function(e) {
                            r(e)
                        }
                        )),
                        t.on("end", (function() {
                            r(null, i.digest(n))
                        }
                        ));
                    else {
                        if (!r || !s || a || "undefined" == typeof FileReader) {
                            o.isBrowser() && "object" == typeof t && !a && (t = new o.Buffer(new Uint8Array(t)));
                            var u = i.update(t).digest(n);
                            return r && r(null, u),
                            u
                        }
                        var c = 0
                          , l = new FileReader;
                        l.onerror = function() {
                            r(new Error("Failed to read data."))
                        }
                        ,
                        l.onload = function() {
                            var e = new o.Buffer(new Uint8Array(l.result));
                            i.update(e),
                            c += e.length,
                            l._continueReading()
                        }
                        ,
                        l._continueReading = function() {
                            if (c >= t.size)
                                r(null, i.digest(n));
                            else {
                                var e = c + 524288;
                                e > t.size && (e = t.size),
                                l.readAsArrayBuffer(s.call(t, c, e))
                            }
                        }
                        ,
                        l._continueReading()
                    }
                },
                toHex: function(e) {
                    for (var t = [], n = 0; n < e.length; n++)
                        t.push(("0" + e.charCodeAt(n).toString(16)).substr(-2, 2));
                    return t.join("")
                },
                createHash: function(e) {
                    return o.crypto.lib.createHash(e)
                }
            },
            abort: {},
            each: function(e, t) {
                for (var n in e) {
                    if (Object.prototype.hasOwnProperty.call(e, n))
                        if (t.call(this, n, e[n]) === o.abort)
                            break
                }
            },
            arrayEach: function(e, t) {
                for (var n in e) {
                    if (Object.prototype.hasOwnProperty.call(e, n))
                        if (t.call(this, e[n], parseInt(n, 10)) === o.abort)
                            break
                }
            },
            update: function(e, t) {
                return o.each(t, (function(t, n) {
                    e[t] = n
                }
                )),
                e
            },
            merge: function(e, t) {
                return o.update(o.copy(e), t)
            },
            copy: function(e) {
                if (null == e)
                    return e;
                var t = {};
                for (var n in e)
                    t[n] = e[n];
                return t
            },
            isEmpty: function(e) {
                for (var t in e)
                    if (Object.prototype.hasOwnProperty.call(e, t))
                        return !1;
                return !0
            },
            arraySliceFn: function(e) {
                var t = e.slice || e.webkitSlice || e.mozSlice;
                return "function" == typeof t ? t : null
            },
            isType: function(e, t) {
                return "function" == typeof t && (t = o.typeName(t)),
                Object.prototype.toString.call(e) === "[object " + t + "]"
            },
            typeName: function(e) {
                if (Object.prototype.hasOwnProperty.call(e, "name"))
                    return e.name;
                var t = e.toString()
                  , n = t.match(/^\s*function (.+)\(/);
                return n ? n[1] : t
            },
            error: function(e, t) {
                var n = null;
                return "string" == typeof e.message && "" !== e.message && ("string" == typeof t || t && t.message) && ((n = o.copy(e)).message = e.message),
                e.message = e.message || null,
                "string" == typeof t ? e.message = t : "object" == typeof t && null !== t && (o.update(e, t),
                t.message && (e.message = t.message),
                (t.code || t.name) && (e.code = t.code || t.name),
                t.stack && (e.stack = t.stack)),
                "function" == typeof Object.defineProperty && (Object.defineProperty(e, "name", {
                    writable: !0,
                    enumerable: !1
                }),
                Object.defineProperty(e, "message", {
                    enumerable: !0
                })),
                e.name = t && t.name || e.name || e.code || "Error",
                e.time = new Date,
                n && (e.originalError = n),
                e
            },
            inherit: function(e, t) {
                var n = null;
                if (void 0 === t)
                    t = e,
                    e = Object,
                    n = {};
                else {
                    var r = function() {};
                    r.prototype = e.prototype,
                    n = new r
                }
                return t.constructor === Object && (t.constructor = function() {
                    if (e !== Object)
                        return e.apply(this, arguments)
                }
                ),
                t.constructor.prototype = n,
                o.update(t.constructor.prototype, t),
                t.constructor.__super__ = e,
                t.constructor
            },
            mixin: function() {
                for (var e = arguments[0], t = 1; t < arguments.length; t++)
                    for (var n in arguments[t].prototype) {
                        var r = arguments[t].prototype[n];
                        "constructor" !== n && (e.prototype[n] = r)
                    }
                return e
            },
            hideProperties: function(e, t) {
                "function" == typeof Object.defineProperty && o.arrayEach(t, (function(t) {
                    Object.defineProperty(e, t, {
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    })
                }
                ))
            },
            property: function(e, t, n, r, i) {
                var o = {
                    configurable: !0,
                    enumerable: void 0 === r || r
                };
                "function" != typeof n || i ? (o.value = n,
                o.writable = !0) : o.get = n,
                Object.defineProperty(e, t, o)
            },
            memoizedProperty: function(e, t, n, r) {
                var i = null;
                o.property(e, t, (function() {
                    return null === i && (i = n()),
                    i
                }
                ), r)
            },
            hoistPayloadMember: function(e) {
                var t = e.request
                  , n = t.operation
                  , r = t.service.api.operations[n]
                  , i = r.output;
                if (i.payload && !r.hasEventOutput) {
                    var s = i.members[i.payload]
                      , a = e.data[i.payload];
                    "structure" === s.type && o.each(a, (function(t, n) {
                        o.property(e.data, t, n, !1)
                    }
                    ))
                }
            },
            computeSha256: function(e, t) {
                if (o.isNode()) {
                    var r = o.stream.Stream
                      , i = n(24);
                    if ("function" == typeof r && e instanceof r) {
                        if ("string" != typeof e.path)
                            return t(new Error("Non-file stream objects are not supported with SigV4"));
                        var s = {};
                        "number" == typeof e.start && (s.start = e.start),
                        "number" == typeof e.end && (s.end = e.end),
                        e = i.createReadStream(e.path, s)
                    }
                }
                o.crypto.sha256(e, "hex", (function(e, n) {
                    e ? t(e) : t(null, n)
                }
                ))
            },
            isClockSkewed: function(e) {
                if (e)
                    return o.property(i.config, "isClockSkewed", Math.abs((new Date).getTime() - e) >= 3e5, !1),
                    i.config.isClockSkewed
            },
            applyClockOffset: function(e) {
                e && (i.config.systemClockOffset = e - (new Date).getTime())
            },
            extractRequestId: function(e) {
                var t = e.httpResponse.headers["x-amz-request-id"] || e.httpResponse.headers["x-amzn-requestid"];
                !t && e.data && e.data.ResponseMetadata && (t = e.data.ResponseMetadata.RequestId),
                t && (e.requestId = t),
                e.error && (e.error.requestId = t)
            },
            addPromises: function(e, t) {
                var n = !1;
                void 0 === t && i && i.config && (t = i.config.getPromisesDependency()),
                void 0 === t && "undefined" != typeof Promise && (t = Promise),
                "function" != typeof t && (n = !0),
                Array.isArray(e) || (e = [e]);
                for (var r = 0; r < e.length; r++) {
                    var o = e[r];
                    n ? o.deletePromisesFromClass && o.deletePromisesFromClass() : o.addPromisesToClass && o.addPromisesToClass(t)
                }
            },
            promisifyMethod: function(e, t) {
                return function() {
                    var n = this;
                    return new t((function(t, r) {
                        n[e]((function(e, n) {
                            e ? r(e) : t(n)
                        }
                        ))
                    }
                    ))
                }
            },
            isDualstackAvailable: function(e) {
                if (!e)
                    return !1;
                var t = n(87);
                return "string" != typeof e && (e = e.serviceIdentifier),
                !("string" != typeof e || !t.hasOwnProperty(e)) && !!t[e].dualstackAvailable
            },
            calculateRetryDelay: function(e, t) {
                t || (t = {});
                var n = t.customBackoff || null;
                if ("function" == typeof n)
                    return n(e);
                var r = "number" == typeof t.base ? t.base : 100;
                return Math.random() * (Math.pow(2, e) * r)
            },
            handleRequestWithRetries: function(e, t, n) {
                t || (t = {});
                var r = i.HttpClient.getInstance()
                  , s = t.httpOptions || {}
                  , a = 0
                  , u = function(e) {
                    var r = t.maxRetries || 0;
                    if (e && "TimeoutError" === e.code && (e.retryable = !0),
                    e && e.retryable && a < r) {
                        a++;
                        var i = o.calculateRetryDelay(a, t.retryDelayOptions);
                        setTimeout(c, i + (e.retryAfter || 0))
                    } else
                        n(e)
                }
                  , c = function() {
                    var t = "";
                    r.handleRequest(e, s, (function(e) {
                        e.on("data", (function(e) {
                            t += e.toString()
                        }
                        )),
                        e.on("end", (function() {
                            var r = e.statusCode;
                            if (r < 300)
                                n(null, t);
                            else {
                                var i = 1e3 * parseInt(e.headers["retry-after"], 10) || 0
                                  , s = o.error(new Error, {
                                    retryable: r >= 500 || 429 === r
                                });
                                i && s.retryable && (s.retryAfter = i),
                                u(s)
                            }
                        }
                        ))
                    }
                    ), u)
                };
                i.util.defer(c)
            },
            uuid: {
                v4: function() {
                    return n(88).v4()
                }
            },
            convertPayloadToString: function(e) {
                var t = e.request
                  , n = t.operation
                  , r = t.service.api.operations[n].output || {};
                r.payload && e.data[r.payload] && (e.data[r.payload] = e.data[r.payload].toString())
            },
            defer: function(e) {
                "object" == typeof t && "function" == typeof t.nextTick ? t.nextTick(e) : "function" == typeof r ? r(e) : setTimeout(e, 0)
            },
            getRequestPayloadShape: function(e) {
                var t = e.service.api.operations;
                if (t) {
                    var n = (t || {})[e.operation];
                    if (n && n.input && n.input.payload)
                        return n.input.members[n.input.payload]
                }
            },
            getProfilesFromSharedConfig: function(e, n) {
                var r = {}
                  , i = {};
                if (t.env[o.configOptInEnv])
                    i = e.loadFrom({
                        isConfig: !0,
                        filename: t.env[o.sharedConfigFileEnv]
                    });
                for (var s = e.loadFrom({
                    filename: n || t.env[o.configOptInEnv] && t.env[o.sharedCredentialsFileEnv]
                }), a = 0, u = Object.keys(i); a < u.length; a++)
                    r[u[a]] = i[u[a]];
                for (a = 0,
                u = Object.keys(s); a < u.length; a++)
                    r[u[a]] = s[u[a]];
                return r
            },
            defaultProfile: "default",
            configOptInEnv: "AWS_SDK_LOAD_CONFIG",
            sharedCredentialsFileEnv: "AWS_SHARED_CREDENTIALS_FILE",
            sharedConfigFileEnv: "AWS_CONFIG_FILE",
            imdsDisabledEnv: "AWS_EC2_METADATA_DISABLED"
        };
        e.exports = o
    }
    ).call(this, n(7), n(55).setImmediate)
}
, function(e, t, n) {
    var r;
    e.exports = (r = r || function(e, t) {
        var n = Object.create || function() {
            function e() {}
            return function(t) {
                var n;
                return e.prototype = t,
                n = new e,
                e.prototype = null,
                n
            }
        }()
          , r = {}
          , i = r.lib = {}
          , o = i.Base = {
            extend: function(e) {
                var t = n(this);
                return e && t.mixIn(e),
                t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
                    t.$super.init.apply(this, arguments)
                }
                ),
                t.init.prototype = t,
                t.$super = this,
                t
            },
            create: function() {
                var e = this.extend();
                return e.init.apply(e, arguments),
                e
            },
            init: function() {},
            mixIn: function(e) {
                for (var t in e)
                    e.hasOwnProperty(t) && (this[t] = e[t]);
                e.hasOwnProperty("toString") && (this.toString = e.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        }
          , s = i.WordArray = o.extend({
            init: function(e, t) {
                e = this.words = e || [],
                this.sigBytes = null != t ? t : 4 * e.length
            },
            toString: function(e) {
                return (e || u).stringify(this)
            },
            concat: function(e) {
                var t = this.words
                  , n = e.words
                  , r = this.sigBytes
                  , i = e.sigBytes;
                if (this.clamp(),
                r % 4)
                    for (var o = 0; o < i; o++) {
                        var s = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        t[r + o >>> 2] |= s << 24 - (r + o) % 4 * 8
                    }
                else
                    for (o = 0; o < i; o += 4)
                        t[r + o >>> 2] = n[o >>> 2];
                return this.sigBytes += i,
                this
            },
            clamp: function() {
                var t = this.words
                  , n = this.sigBytes;
                t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8,
                t.length = e.ceil(n / 4)
            },
            clone: function() {
                var e = o.clone.call(this);
                return e.words = this.words.slice(0),
                e
            },
            random: function(t) {
                for (var n, r = [], i = function(t) {
                    t = t;
                    var n = 987654321
                      , r = 4294967295;
                    return function() {
                        var i = ((n = 36969 * (65535 & n) + (n >> 16) & r) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & r) & r;
                        return i /= 4294967296,
                        (i += .5) * (e.random() > .5 ? 1 : -1)
                    }
                }, o = 0; o < t; o += 4) {
                    var a = i(4294967296 * (n || e.random()));
                    n = 987654071 * a(),
                    r.push(4294967296 * a() | 0)
                }
                return new s.init(r,t)
            }
        })
          , a = r.enc = {}
          , u = a.Hex = {
            stringify: function(e) {
                for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
                    var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    r.push((o >>> 4).toString(16)),
                    r.push((15 & o).toString(16))
                }
                return r.join("")
            },
            parse: function(e) {
                for (var t = e.length, n = [], r = 0; r < t; r += 2)
                    n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                return new s.init(n,t / 2)
            }
        }
          , c = a.Latin1 = {
            stringify: function(e) {
                for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
                    var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    r.push(String.fromCharCode(o))
                }
                return r.join("")
            },
            parse: function(e) {
                for (var t = e.length, n = [], r = 0; r < t; r++)
                    n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                return new s.init(n,t)
            }
        }
          , l = a.Utf8 = {
            stringify: function(e) {
                try {
                    return decodeURIComponent(escape(c.stringify(e)))
                } catch (e) {
                    throw new Error("Malformed UTF-8 data")
                }
            },
            parse: function(e) {
                return c.parse(unescape(encodeURIComponent(e)))
            }
        }
          , h = i.BufferedBlockAlgorithm = o.extend({
            reset: function() {
                this._data = new s.init,
                this._nDataBytes = 0
            },
            _append: function(e) {
                "string" == typeof e && (e = l.parse(e)),
                this._data.concat(e),
                this._nDataBytes += e.sigBytes
            },
            _process: function(t) {
                var n = this._data
                  , r = n.words
                  , i = n.sigBytes
                  , o = this.blockSize
                  , a = i / (4 * o)
                  , u = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o
                  , c = e.min(4 * u, i);
                if (u) {
                    for (var l = 0; l < u; l += o)
                        this._doProcessBlock(r, l);
                    var h = r.splice(0, u);
                    n.sigBytes -= c
                }
                return new s.init(h,c)
            },
            clone: function() {
                var e = o.clone.call(this);
                return e._data = this._data.clone(),
                e
            },
            _minBufferSize: 0
        })
          , f = (i.Hasher = h.extend({
            cfg: o.extend(),
            init: function(e) {
                this.cfg = this.cfg.extend(e),
                this.reset()
            },
            reset: function() {
                h.reset.call(this),
                this._doReset()
            },
            update: function(e) {
                return this._append(e),
                this._process(),
                this
            },
            finalize: function(e) {
                return e && this._append(e),
                this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function(e) {
                return function(t, n) {
                    return new e.init(n).finalize(t)
                }
            },
            _createHmacHelper: function(e) {
                return function(t, n) {
                    return new f.HMAC.init(e,n).finalize(t)
                }
            }
        }),
        r.algo = {});
        return r
    }(Math),
    r)
}
, function(e, t, n) {
    "use strict";
    (function(e) {
        var n = [{
            type: "text/plain",
            ext: "txt"
        }, {
            type: "text/html",
            ext: "html"
        }, {
            type: "text/javascript",
            ext: "js"
        }, {
            type: "text/css",
            ext: "css"
        }, {
            type: "text/csv",
            ext: "csv"
        }, {
            type: "text/yaml",
            ext: "yml"
        }, {
            type: "text/yaml",
            ext: "yaml"
        }, {
            type: "text/calendar",
            ext: "ics"
        }, {
            type: "text/calendar",
            ext: "ical"
        }, {
            type: "image/png",
            ext: "png"
        }, {
            type: "image/gif",
            ext: "gif"
        }, {
            type: "image/jpeg",
            ext: "jpg"
        }, {
            type: "image/jpeg",
            ext: "jpeg"
        }, {
            type: "image/bmp",
            ext: "bmp"
        }, {
            type: "image/x-icon",
            ext: "ico"
        }, {
            type: "image/tiff",
            ext: "tif"
        }, {
            type: "image/tiff",
            ext: "tiff"
        }, {
            type: "image/svg+xml",
            ext: "svg"
        }, {
            type: "application/json",
            ext: "json"
        }, {
            type: "application/xml",
            ext: "xml"
        }, {
            type: "application/x-sh",
            ext: "sh"
        }, {
            type: "application/zip",
            ext: "zip"
        }, {
            type: "application/x-rar-compressed",
            ext: "rar"
        }, {
            type: "application/x-tar",
            ext: "tar"
        }, {
            type: "application/x-bzip",
            ext: "bz"
        }, {
            type: "application/x-bzip2",
            ext: "bz2"
        }, {
            type: "application/pdf",
            ext: "pdf"
        }, {
            type: "application/java-archive",
            ext: "jar"
        }, {
            type: "application/msword",
            ext: "doc"
        }, {
            type: "application/vnd.ms-excel",
            ext: "xls"
        }, {
            type: "application/vnd.ms-excel",
            ext: "xlsx"
        }, {
            type: "message/rfc822",
            ext: "eml"
        }]
          , r = function() {
            function t() {}
            return t.isEmpty = function(e) {
                return 0 === Object.keys(e).length
            }
            ,
            t.sortByField = function(e, t, n) {
                if (!e || !e.sort)
                    return !1;
                var r = n && "desc" === n ? -1 : 1;
                return e.sort((function(e, n) {
                    var i = e[t]
                      , o = n[t];
                    return void 0 === o ? void 0 === i ? 0 : 1 * r : void 0 === i || i < o ? -1 * r : i > o ? 1 * r : 0
                }
                )),
                !0
            }
            ,
            t.objectLessAttributes = function(e, t) {
                var n = Object.assign({}, e);
                return t && ("string" == typeof t ? delete n[t] : t.forEach((function(e) {
                    delete n[e]
                }
                ))),
                n
            }
            ,
            t.filenameToContentType = function(e, t) {
                void 0 === t && (t = "application/octet-stream");
                var r = e.toLowerCase()
                  , i = n.filter((function(e) {
                    return r.endsWith("." + e.ext)
                }
                ));
                return i.length > 0 ? i[0].type : t
            }
            ,
            t.isTextFile = function(e) {
                var t = e.toLowerCase();
                return !!t.startsWith("text/") || ("application/json" === t || "application/xml" === t || "application/sh" === t)
            }
            ,
            t.generateRandomString = function() {
                for (var e = "", t = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", n = 32; n > 0; n -= 1)
                    e += t[Math.floor(Math.random() * t.length)];
                return e
            }
            ,
            t.makeQuerablePromise = function(e) {
                if (e.isResolved)
                    return e;
                var t = !0
                  , n = !1
                  , r = !1
                  , i = e.then((function(e) {
                    return r = !0,
                    t = !1,
                    e
                }
                ), (function(e) {
                    throw n = !0,
                    t = !1,
                    e
                }
                ));
                return i.isFullfilled = function() {
                    return r
                }
                ,
                i.isPending = function() {
                    return t
                }
                ,
                i.isRejected = function() {
                    return n
                }
                ,
                i
            }
            ,
            t.browserOrNode = function() {
                return {
                    isBrowser: "undefined" != typeof window && void 0 !== window.document,
                    isNode: void 0 !== e && null != e.versions && null != e.versions.node
                }
            }
            ,
            t.transferKeyToLowerCase = function(e, n, r) {
                if (void 0 === n && (n = []),
                void 0 === r && (r = []),
                !t.isStrictObject(e))
                    return e;
                var i = {};
                for (var o in e) {
                    if (e.hasOwnProperty(o))
                        i[n.includes(o) ? o : o[0].toLowerCase() + o.slice(1)] = r.includes(o) ? e[o] : t.transferKeyToLowerCase(e[o], n, r)
                }
                return i
            }
            ,
            t.transferKeyToUpperCase = function(e, n, r) {
                if (void 0 === n && (n = []),
                void 0 === r && (r = []),
                !t.isStrictObject(e))
                    return e;
                var i = {};
                for (var o in e) {
                    if (e.hasOwnProperty(o))
                        i[n.includes(o) ? o : o[0].toUpperCase() + o.slice(1)] = r.includes(o) ? e[o] : t.transferKeyToUpperCase(e[o], n, r)
                }
                return i
            }
            ,
            t.isStrictObject = function(e) {
                return !(!(e instanceof Object) || e instanceof Array || e instanceof Function || e instanceof Number || e instanceof String || e instanceof Boolean)
            }
            ,
            t
        }();
        t.a = r
    }
    ).call(this, n(7))
}
, function(e, t, n) {
    "use strict";
    var r = n(43)
      , i = Object.prototype.toString;
    function o(e) {
        return "[object Array]" === i.call(e)
    }
    function s(e) {
        return void 0 === e
    }
    function a(e) {
        return null !== e && "object" == typeof e
    }
    function u(e) {
        return "[object Function]" === i.call(e)
    }
    function c(e, t) {
        if (null != e)
            if ("object" != typeof e && (e = [e]),
            o(e))
                for (var n = 0, r = e.length; n < r; n++)
                    t.call(null, e[n], n, e);
            else
                for (var i in e)
                    Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
    }
    e.exports = {
        isArray: o,
        isArrayBuffer: function(e) {
            return "[object ArrayBuffer]" === i.call(e)
        },
        isBuffer: function(e) {
            return null !== e && !s(e) && null !== e.constructor && !s(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
        },
        isFormData: function(e) {
            return "undefined" != typeof FormData && e instanceof FormData
        },
        isArrayBufferView: function(e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
        },
        isString: function(e) {
            return "string" == typeof e
        },
        isNumber: function(e) {
            return "number" == typeof e
        },
        isObject: a,
        isUndefined: s,
        isDate: function(e) {
            return "[object Date]" === i.call(e)
        },
        isFile: function(e) {
            return "[object File]" === i.call(e)
        },
        isBlob: function(e) {
            return "[object Blob]" === i.call(e)
        },
        isFunction: u,
        isStream: function(e) {
            return a(e) && u(e.pipe)
        },
        isURLSearchParams: function(e) {
            return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
        },
        isStandardBrowserEnv: function() {
            return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
        },
        forEach: c,
        merge: function e() {
            var t = {};
            function n(n, r) {
                "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n
            }
            for (var r = 0, i = arguments.length; r < i; r++)
                c(arguments[r], n);
            return t
        },
        deepMerge: function e() {
            var t = {};
            function n(n, r) {
                "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = "object" == typeof n ? e({}, n) : n
            }
            for (var r = 0, i = arguments.length; r < i; r++)
                c(arguments[r], n);
            return t
        },
        extend: function(e, t, n) {
            return c(t, (function(t, i) {
                e[i] = n && "function" == typeof t ? r(t, n) : t
            }
            )),
            e
        },
        trim: function(e) {
            return e.replace(/^\s*/, "").replace(/\s*$/, "")
        }
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(99)
      , i = n(101);
    function o() {
        this.protocol = null,
        this.slashes = null,
        this.auth = null,
        this.host = null,
        this.port = null,
        this.hostname = null,
        this.hash = null,
        this.search = null,
        this.query = null,
        this.pathname = null,
        this.path = null,
        this.href = null
    }
    t.parse = b,
    t.resolve = function(e, t) {
        return b(e, !1, !0).resolve(t)
    }
    ,
    t.resolveObject = function(e, t) {
        return e ? b(e, !1, !0).resolveObject(t) : t
    }
    ,
    t.format = function(e) {
        i.isString(e) && (e = b(e));
        return e instanceof o ? e.format() : o.prototype.format.call(e)
    }
    ,
    t.Url = o;
    var s = /^([a-z0-9.+-]+:)/i
      , a = /:[0-9]*$/
      , u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
      , c = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"])
      , l = ["'"].concat(c)
      , h = ["%", "/", "?", ";", "#"].concat(l)
      , f = ["/", "?", "#"]
      , d = /^[+a-z0-9A-Z_-]{0,63}$/
      , p = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
      , g = {
        javascript: !0,
        "javascript:": !0
    }
      , m = {
        javascript: !0,
        "javascript:": !0
    }
      , y = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
    }
      , v = n(42);
    function b(e, t, n) {
        if (e && i.isObject(e) && e instanceof o)
            return e;
        var r = new o;
        return r.parse(e, t, n),
        r
    }
    o.prototype.parse = function(e, t, n) {
        if (!i.isString(e))
            throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
        var o = e.indexOf("?")
          , a = -1 !== o && o < e.indexOf("#") ? "?" : "#"
          , c = e.split(a);
        c[0] = c[0].replace(/\\/g, "/");
        var b = e = c.join(a);
        if (b = b.trim(),
        !n && 1 === e.split("#").length) {
            var w = u.exec(b);
            if (w)
                return this.path = b,
                this.href = b,
                this.pathname = w[1],
                w[2] ? (this.search = w[2],
                this.query = t ? v.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "",
                this.query = {}),
                this
        }
        var S = s.exec(b);
        if (S) {
            var E = (S = S[0]).toLowerCase();
            this.protocol = E,
            b = b.substr(S.length)
        }
        if (n || S || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var _ = "//" === b.substr(0, 2);
            !_ || S && m[S] || (b = b.substr(2),
            this.slashes = !0)
        }
        if (!m[S] && (_ || S && !y[S])) {
            for (var A, C, I = -1, T = 0; T < f.length; T++) {
                -1 !== (k = b.indexOf(f[T])) && (-1 === I || k < I) && (I = k)
            }
            -1 !== (C = -1 === I ? b.lastIndexOf("@") : b.lastIndexOf("@", I)) && (A = b.slice(0, C),
            b = b.slice(C + 1),
            this.auth = decodeURIComponent(A)),
            I = -1;
            for (T = 0; T < h.length; T++) {
                var k;
                -1 !== (k = b.indexOf(h[T])) && (-1 === I || k < I) && (I = k)
            }
            -1 === I && (I = b.length),
            this.host = b.slice(0, I),
            b = b.slice(I),
            this.parseHost(),
            this.hostname = this.hostname || "";
            var x = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!x)
                for (var P = this.hostname.split(/\./), R = (T = 0,
                P.length); T < R; T++) {
                    var O = P[T];
                    if (O && !O.match(d)) {
                        for (var N = "", U = 0, D = O.length; U < D; U++)
                            O.charCodeAt(U) > 127 ? N += "x" : N += O[U];
                        if (!N.match(d)) {
                            var L = P.slice(0, T)
                              , q = P.slice(T + 1)
                              , M = O.match(p);
                            M && (L.push(M[1]),
                            q.unshift(M[2])),
                            q.length && (b = "/" + q.join(".") + b),
                            this.hostname = L.join(".");
                            break
                        }
                    }
                }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
            x || (this.hostname = r.toASCII(this.hostname));
            var F = this.port ? ":" + this.port : ""
              , j = this.hostname || "";
            this.host = j + F,
            this.href += this.host,
            x && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
            "/" !== b[0] && (b = "/" + b))
        }
        if (!g[E])
            for (T = 0,
            R = l.length; T < R; T++) {
                var B = l[T];
                if (-1 !== b.indexOf(B)) {
                    var V = encodeURIComponent(B);
                    V === B && (V = escape(B)),
                    b = b.split(B).join(V)
                }
            }
        var z = b.indexOf("#");
        -1 !== z && (this.hash = b.substr(z),
        b = b.slice(0, z));
        var H = b.indexOf("?");
        if (-1 !== H ? (this.search = b.substr(H),
        this.query = b.substr(H + 1),
        t && (this.query = v.parse(this.query)),
        b = b.slice(0, H)) : t && (this.search = "",
        this.query = {}),
        b && (this.pathname = b),
        y[E] && this.hostname && !this.pathname && (this.pathname = "/"),
        this.pathname || this.search) {
            F = this.pathname || "";
            var K = this.search || "";
            this.path = F + K
        }
        return this.href = this.format(),
        this
    }
    ,
    o.prototype.format = function() {
        var e = this.auth || "";
        e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"),
        e += "@");
        var t = this.protocol || ""
          , n = this.pathname || ""
          , r = this.hash || ""
          , o = !1
          , s = "";
        this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"),
        this.port && (o += ":" + this.port)),
        this.query && i.isObject(this.query) && Object.keys(this.query).length && (s = v.stringify(this.query));
        var a = this.search || s && "?" + s || "";
        return t && ":" !== t.substr(-1) && (t += ":"),
        this.slashes || (!t || y[t]) && !1 !== o ? (o = "//" + (o || ""),
        n && "/" !== n.charAt(0) && (n = "/" + n)) : o || (o = ""),
        r && "#" !== r.charAt(0) && (r = "#" + r),
        a && "?" !== a.charAt(0) && (a = "?" + a),
        t + o + (n = n.replace(/[?#]/g, (function(e) {
            return encodeURIComponent(e)
        }
        ))) + (a = a.replace("#", "%23")) + r
    }
    ,
    o.prototype.resolve = function(e) {
        return this.resolveObject(b(e, !1, !0)).format()
    }
    ,
    o.prototype.resolveObject = function(e) {
        if (i.isString(e)) {
            var t = new o;
            t.parse(e, !1, !0),
            e = t
        }
        for (var n = new o, r = Object.keys(this), s = 0; s < r.length; s++) {
            var a = r[s];
            n[a] = this[a]
        }
        if (n.hash = e.hash,
        "" === e.href)
            return n.href = n.format(),
            n;
        if (e.slashes && !e.protocol) {
            for (var u = Object.keys(e), c = 0; c < u.length; c++) {
                var l = u[c];
                "protocol" !== l && (n[l] = e[l])
            }
            return y[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"),
            n.href = n.format(),
            n
        }
        if (e.protocol && e.protocol !== n.protocol) {
            if (!y[e.protocol]) {
                for (var h = Object.keys(e), f = 0; f < h.length; f++) {
                    var d = h[f];
                    n[d] = e[d]
                }
                return n.href = n.format(),
                n
            }
            if (n.protocol = e.protocol,
            e.host || m[e.protocol])
                n.pathname = e.pathname;
            else {
                for (var p = (e.pathname || "").split("/"); p.length && !(e.host = p.shift()); )
                    ;
                e.host || (e.host = ""),
                e.hostname || (e.hostname = ""),
                "" !== p[0] && p.unshift(""),
                p.length < 2 && p.unshift(""),
                n.pathname = p.join("/")
            }
            if (n.search = e.search,
            n.query = e.query,
            n.host = e.host || "",
            n.auth = e.auth,
            n.hostname = e.hostname || e.host,
            n.port = e.port,
            n.pathname || n.search) {
                var g = n.pathname || ""
                  , v = n.search || "";
                n.path = g + v
            }
            return n.slashes = n.slashes || e.slashes,
            n.href = n.format(),
            n
        }
        var b = n.pathname && "/" === n.pathname.charAt(0)
          , w = e.host || e.pathname && "/" === e.pathname.charAt(0)
          , S = w || b || n.host && e.pathname
          , E = S
          , _ = n.pathname && n.pathname.split("/") || []
          , A = (p = e.pathname && e.pathname.split("/") || [],
        n.protocol && !y[n.protocol]);
        if (A && (n.hostname = "",
        n.port = null,
        n.host && ("" === _[0] ? _[0] = n.host : _.unshift(n.host)),
        n.host = "",
        e.protocol && (e.hostname = null,
        e.port = null,
        e.host && ("" === p[0] ? p[0] = e.host : p.unshift(e.host)),
        e.host = null),
        S = S && ("" === p[0] || "" === _[0])),
        w)
            n.host = e.host || "" === e.host ? e.host : n.host,
            n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname,
            n.search = e.search,
            n.query = e.query,
            _ = p;
        else if (p.length)
            _ || (_ = []),
            _.pop(),
            _ = _.concat(p),
            n.search = e.search,
            n.query = e.query;
        else if (!i.isNullOrUndefined(e.search)) {
            if (A)
                n.hostname = n.host = _.shift(),
                (x = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = x.shift(),
                n.host = n.hostname = x.shift());
            return n.search = e.search,
            n.query = e.query,
            i.isNull(n.pathname) && i.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
            n.href = n.format(),
            n
        }
        if (!_.length)
            return n.pathname = null,
            n.search ? n.path = "/" + n.search : n.path = null,
            n.href = n.format(),
            n;
        for (var C = _.slice(-1)[0], I = (n.host || e.host || _.length > 1) && ("." === C || ".." === C) || "" === C, T = 0, k = _.length; k >= 0; k--)
            "." === (C = _[k]) ? _.splice(k, 1) : ".." === C ? (_.splice(k, 1),
            T++) : T && (_.splice(k, 1),
            T--);
        if (!S && !E)
            for (; T--; T)
                _.unshift("..");
        !S || "" === _[0] || _[0] && "/" === _[0].charAt(0) || _.unshift(""),
        I && "/" !== _.join("/").substr(-1) && _.push("");
        var x, P = "" === _[0] || _[0] && "/" === _[0].charAt(0);
        A && (n.hostname = n.host = P ? "" : _.length ? _.shift() : "",
        (x = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@")) && (n.auth = x.shift(),
        n.host = n.hostname = x.shift()));
        return (S = S || n.host && _.length) && !P && _.unshift(""),
        _.length ? n.pathname = _.join("/") : (n.pathname = null,
        n.path = null),
        i.isNull(n.pathname) && i.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
        n.auth = e.auth || n.auth,
        n.slashes = n.slashes || e.slashes,
        n.href = n.format(),
        n
    }
    ,
    o.prototype.parseHost = function() {
        var e = this.host
          , t = a.exec(e);
        t && (":" !== (t = t[0]) && (this.port = t.substr(1)),
        e = e.substr(0, e.length - t.length)),
        e && (this.hostname = e)
    }
}
, function(e, t) {
    var n, r, i = e.exports = {};
    function o() {
        throw new Error("setTimeout has not been defined")
    }
    function s() {
        throw new Error("clearTimeout has not been defined")
    }
    function a(e) {
        if (n === setTimeout)
            return setTimeout(e, 0);
        if ((n === o || !n) && setTimeout)
            return n = setTimeout,
            setTimeout(e, 0);
        try {
            return n(e, 0)
        } catch (t) {
            try {
                return n.call(null, e, 0)
            } catch (t) {
                return n.call(this, e, 0)
            }
        }
    }
    !function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : o
        } catch (e) {
            n = o
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : s
        } catch (e) {
            r = s
        }
    }();
    var u, c = [], l = !1, h = -1;
    function f() {
        l && u && (l = !1,
        u.length ? c = u.concat(c) : h = -1,
        c.length && d())
    }
    function d() {
        if (!l) {
            var e = a(f);
            l = !0;
            for (var t = c.length; t; ) {
                for (u = c,
                c = []; ++h < t; )
                    u && u[h].run();
                h = -1,
                t = c.length
            }
            u = null,
            l = !1,
            function(e) {
                if (r === clearTimeout)
                    return clearTimeout(e);
                if ((r === s || !r) && clearTimeout)
                    return r = clearTimeout,
                    clearTimeout(e);
                try {
                    r(e)
                } catch (t) {
                    try {
                        return r.call(null, e)
                    } catch (t) {
                        return r.call(this, e)
                    }
                }
            }(e)
        }
    }
    function p(e, t) {
        this.fun = e,
        this.array = t
    }
    function g() {}
    i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
        c.push(new p(e,t)),
        1 !== c.length || l || a(d)
    }
    ,
    p.prototype.run = function() {
        this.fun.apply(null, this.array)
    }
    ,
    i.title = "browser",
    i.browser = !0,
    i.env = {},
    i.argv = [],
    i.version = "",
    i.versions = {},
    i.on = g,
    i.addListener = g,
    i.once = g,
    i.off = g,
    i.removeListener = g,
    i.removeAllListeners = g,
    i.emit = g,
    i.prependListener = g,
    i.prependOnceListener = g,
    i.listeners = function(e) {
        return []
    }
    ,
    i.binding = function(e) {
        throw new Error("process.binding is not supported")
    }
    ,
    i.cwd = function() {
        return "/"
    }
    ,
    i.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }
    ,
    i.umask = function() {
        return 0
    }
}
, function(e, t, n) {
    var r, i;
    /*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
    !function(o) {
        if (void 0 === (i = "function" == typeof (r = o) ? r.call(t, n, t, e) : r) || (e.exports = i),
        !0,
        e.exports = o(),
        !!0) {
            var s = window.Cookies
              , a = window.Cookies = o();
            a.noConflict = function() {
                return window.Cookies = s,
                a
            }
        }
    }((function() {
        function e() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    t[r] = n[r]
            }
            return t
        }
        function t(e) {
            return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
        }
        return function n(r) {
            function i() {}
            function o(t, n, o) {
                if ("undefined" != typeof document) {
                    "number" == typeof (o = e({
                        path: "/"
                    }, i.defaults, o)).expires && (o.expires = new Date(1 * new Date + 864e5 * o.expires)),
                    o.expires = o.expires ? o.expires.toUTCString() : "";
                    try {
                        var s = JSON.stringify(n);
                        /^[\{\[]/.test(s) && (n = s)
                    } catch (e) {}
                    n = r.write ? r.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    t = encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                    var a = "";
                    for (var u in o)
                        o[u] && (a += "; " + u,
                        !0 !== o[u] && (a += "=" + o[u].split(";")[0]));
                    return document.cookie = t + "=" + n + a
                }
            }
            function s(e, n) {
                if ("undefined" != typeof document) {
                    for (var i = {}, o = document.cookie ? document.cookie.split("; ") : [], s = 0; s < o.length; s++) {
                        var a = o[s].split("=")
                          , u = a.slice(1).join("=");
                        n || '"' !== u.charAt(0) || (u = u.slice(1, -1));
                        try {
                            var c = t(a[0]);
                            if (u = (r.read || r)(u, c) || t(u),
                            n)
                                try {
                                    u = JSON.parse(u)
                                } catch (e) {}
                            if (i[c] = u,
                            e === c)
                                break
                        } catch (e) {}
                    }
                    return e ? i[e] : i
                }
            }
            return i.set = o,
            i.get = function(e) {
                return s(e, !1)
            }
            ,
            i.getJSON = function(e) {
                return s(e, !0)
            }
            ,
            i.remove = function(t, n) {
                o(t, "", e(n, {
                    expires: -1
                }))
            }
            ,
            i.defaults = {},
            i.withConverter = n,
            i
        }((function() {}
        ))
    }
    ))
}
, function(e, t, n) {
    "use strict";
    n.d(t, "c", (function() {
        return r
    }
    )),
    n.d(t, "a", (function() {
        return i
    }
    )),
    n.d(t, "b", (function() {
        return o
    }
    ));
    const r = ()=>navigator.maxTouchPoints && navigator.maxTouchPoints > 0 || window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches
      , i = ()=>/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      , o = ()=>"onLine"in navigator && !navigator.onLine
}
, function(e, t, n) {
    var r;
    e.exports = (r = n(3),
    n(16),
    n(144),
    r.HmacSHA256)
}
, function(e, t, n) {
    var r = n(28)
      , i = n(2);
    function o(e, t, n) {
        null != n && i.property.apply(this, arguments)
    }
    function s(e, t) {
        e.constructor.prototype[t] || i.memoizedProperty.apply(this, arguments)
    }
    function a(e, t, n) {
        t = t || {},
        o(this, "shape", e.shape),
        o(this, "api", t.api, !1),
        o(this, "type", e.type),
        o(this, "enum", e.enum),
        o(this, "min", e.min),
        o(this, "max", e.max),
        o(this, "pattern", e.pattern),
        o(this, "location", e.location || this.location || "body"),
        o(this, "name", this.name || e.xmlName || e.queryName || e.locationName || n),
        o(this, "isStreaming", e.streaming || this.isStreaming || !1),
        o(this, "requiresLength", e.requiresLength, !1),
        o(this, "isComposite", e.isComposite || !1),
        o(this, "isShape", !0, !1),
        o(this, "isQueryName", Boolean(e.queryName), !1),
        o(this, "isLocationName", Boolean(e.locationName), !1),
        o(this, "isIdempotent", !0 === e.idempotencyToken),
        o(this, "isJsonValue", !0 === e.jsonvalue),
        o(this, "isSensitive", !0 === e.sensitive || e.prototype && !0 === e.prototype.sensitive),
        o(this, "isEventStream", Boolean(e.eventstream), !1),
        o(this, "isEvent", Boolean(e.event), !1),
        o(this, "isEventPayload", Boolean(e.eventpayload), !1),
        o(this, "isEventHeader", Boolean(e.eventheader), !1),
        o(this, "isTimestampFormatSet", Boolean(e.timestampFormat) || e.prototype && !0 === e.prototype.isTimestampFormatSet, !1),
        o(this, "endpointDiscoveryId", Boolean(e.endpointdiscoveryid), !1),
        o(this, "hostLabel", Boolean(e.hostLabel), !1),
        t.documentation && (o(this, "documentation", e.documentation),
        o(this, "documentationUrl", e.documentationUrl)),
        e.xmlAttribute && o(this, "isXmlAttribute", e.xmlAttribute || !1),
        o(this, "defaultValue", null),
        this.toWireFormat = function(e) {
            return null == e ? "" : e
        }
        ,
        this.toType = function(e) {
            return e
        }
    }
    function u(e) {
        a.apply(this, arguments),
        o(this, "isComposite", !0),
        e.flattened && o(this, "flattened", e.flattened || !1)
    }
    function c(e, t) {
        var n = this
          , i = null
          , c = !this.isShape;
        u.apply(this, arguments),
        c && (o(this, "defaultValue", (function() {
            return {}
        }
        )),
        o(this, "members", {}),
        o(this, "memberNames", []),
        o(this, "required", []),
        o(this, "isRequired", (function() {
            return !1
        }
        ))),
        e.members && (o(this, "members", new r(e.members,t,(function(e, n) {
            return a.create(n, t, e)
        }
        ))),
        s(this, "memberNames", (function() {
            return e.xmlOrder || Object.keys(e.members)
        }
        )),
        e.event && (s(this, "eventPayloadMemberName", (function() {
            for (var e = n.members, t = n.memberNames, r = 0, i = t.length; r < i; r++)
                if (e[t[r]].isEventPayload)
                    return t[r]
        }
        )),
        s(this, "eventHeaderMemberNames", (function() {
            for (var e = n.members, t = n.memberNames, r = [], i = 0, o = t.length; i < o; i++)
                e[t[i]].isEventHeader && r.push(t[i]);
            return r
        }
        )))),
        e.required && (o(this, "required", e.required),
        o(this, "isRequired", (function(t) {
            if (!i) {
                i = {};
                for (var n = 0; n < e.required.length; n++)
                    i[e.required[n]] = !0
            }
            return i[t]
        }
        ), !1, !0)),
        o(this, "resultWrapper", e.resultWrapper || null),
        e.payload && o(this, "payload", e.payload),
        "string" == typeof e.xmlNamespace ? o(this, "xmlNamespaceUri", e.xmlNamespace) : "object" == typeof e.xmlNamespace && (o(this, "xmlNamespacePrefix", e.xmlNamespace.prefix),
        o(this, "xmlNamespaceUri", e.xmlNamespace.uri))
    }
    function l(e, t) {
        var n = this
          , r = !this.isShape;
        if (u.apply(this, arguments),
        r && o(this, "defaultValue", (function() {
            return []
        }
        )),
        e.member && s(this, "member", (function() {
            return a.create(e.member, t)
        }
        )),
        this.flattened) {
            var i = this.name;
            s(this, "name", (function() {
                return n.member.name || i
            }
            ))
        }
    }
    function h(e, t) {
        var n = !this.isShape;
        u.apply(this, arguments),
        n && (o(this, "defaultValue", (function() {
            return {}
        }
        )),
        o(this, "key", a.create({
            type: "string"
        }, t)),
        o(this, "value", a.create({
            type: "string"
        }, t))),
        e.key && s(this, "key", (function() {
            return a.create(e.key, t)
        }
        )),
        e.value && s(this, "value", (function() {
            return a.create(e.value, t)
        }
        ))
    }
    function f() {
        a.apply(this, arguments);
        var e = ["rest-xml", "query", "ec2"];
        this.toType = function(t) {
            return t = this.api && e.indexOf(this.api.protocol) > -1 ? t || "" : t,
            this.isJsonValue ? JSON.parse(t) : t && "function" == typeof t.toString ? t.toString() : t
        }
        ,
        this.toWireFormat = function(e) {
            return this.isJsonValue ? JSON.stringify(e) : e
        }
    }
    function d() {
        a.apply(this, arguments),
        this.toType = function(e) {
            var t = i.base64.decode(e);
            if (this.isSensitive && i.isNode() && "function" == typeof i.Buffer.alloc) {
                var n = i.Buffer.alloc(t.length, t);
                t.fill(0),
                t = n
            }
            return t
        }
        ,
        this.toWireFormat = i.base64.encode
    }
    function p() {
        d.apply(this, arguments)
    }
    function g() {
        a.apply(this, arguments),
        this.toType = function(e) {
            return "boolean" == typeof e ? e : null == e ? null : "true" === e
        }
    }
    a.normalizedTypes = {
        character: "string",
        double: "float",
        long: "integer",
        short: "integer",
        biginteger: "integer",
        bigdecimal: "float",
        blob: "binary"
    },
    a.types = {
        structure: c,
        list: l,
        map: h,
        boolean: g,
        timestamp: function(e) {
            var t = this;
            if (a.apply(this, arguments),
            e.timestampFormat)
                o(this, "timestampFormat", e.timestampFormat);
            else if (t.isTimestampFormatSet && this.timestampFormat)
                o(this, "timestampFormat", this.timestampFormat);
            else if ("header" === this.location)
                o(this, "timestampFormat", "rfc822");
            else if ("querystring" === this.location)
                o(this, "timestampFormat", "iso8601");
            else if (this.api)
                switch (this.api.protocol) {
                case "json":
                case "rest-json":
                    o(this, "timestampFormat", "unixTimestamp");
                    break;
                case "rest-xml":
                case "query":
                case "ec2":
                    o(this, "timestampFormat", "iso8601")
                }
            this.toType = function(e) {
                return null == e ? null : "function" == typeof e.toUTCString ? e : "string" == typeof e || "number" == typeof e ? i.date.parseTimestamp(e) : null
            }
            ,
            this.toWireFormat = function(e) {
                return i.date.format(e, t.timestampFormat)
            }
        },
        float: function() {
            a.apply(this, arguments),
            this.toType = function(e) {
                return null == e ? null : parseFloat(e)
            }
            ,
            this.toWireFormat = this.toType
        },
        integer: function() {
            a.apply(this, arguments),
            this.toType = function(e) {
                return null == e ? null : parseInt(e, 10)
            }
            ,
            this.toWireFormat = this.toType
        },
        string: f,
        base64: p,
        binary: d
    },
    a.resolve = function(e, t) {
        if (e.shape) {
            var n = t.api.shapes[e.shape];
            if (!n)
                throw new Error("Cannot find shape reference: " + e.shape);
            return n
        }
        return null
    }
    ,
    a.create = function(e, t, n) {
        if (e.isShape)
            return e;
        var r = a.resolve(e, t);
        if (r) {
            var i = Object.keys(e);
            t.documentation || (i = i.filter((function(e) {
                return !e.match(/documentation/)
            }
            )));
            var o = function() {
                r.constructor.call(this, e, t, n)
            };
            return o.prototype = r,
            new o
        }
        e.type || (e.members ? e.type = "structure" : e.member ? e.type = "list" : e.key ? e.type = "map" : e.type = "string");
        var s = e.type;
        if (a.normalizedTypes[e.type] && (e.type = a.normalizedTypes[e.type]),
        a.types[e.type])
            return new a.types[e.type](e,t,n);
        throw new Error("Unrecognized shape type: " + s)
    }
    ,
    a.shapes = {
        StructureShape: c,
        ListShape: l,
        MapShape: h,
        StringShape: f,
        BooleanShape: g,
        Base64Shape: p
    },
    e.exports = a
}
, function(e, t, n) {
    n(18);
    var r = n(0)
      , i = r.Service
      , o = r.apiLoader;
    o.services.sts = {},
    r.STS = i.defineService("sts", ["2011-06-15"]),
    n(112),
    Object.defineProperty(o.services.sts, "2011-06-15", {
        get: function() {
            var e = n(113);
            return e.paginators = n(114).pagination,
            e
        },
        enumerable: !0,
        configurable: !0
    }),
    e.exports = r.STS
}
, function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}
, function(e, t, n) {
    var r = n(2)
      , i = n(22).populateHostPrefix;
    function o(e, t, n, i) {
        var o = [e, t].join("/");
        o = o.replace(/\/+/g, "/");
        var s = {}
          , a = !1;
        if (r.each(n.members, (function(e, t) {
            var n = i[e];
            if (null != n)
                if ("uri" === t.location) {
                    var u = new RegExp("\\{" + t.name + "(\\+)?\\}");
                    o = o.replace(u, (function(e, t) {
                        return (t ? r.uriEscapePath : r.uriEscape)(String(n))
                    }
                    ))
                } else
                    "querystring" === t.location && (a = !0,
                    "list" === t.type ? s[t.name] = n.map((function(e) {
                        return r.uriEscape(t.member.toWireFormat(e).toString())
                    }
                    )) : "map" === t.type ? r.each(n, (function(e, t) {
                        Array.isArray(t) ? s[e] = t.map((function(e) {
                            return r.uriEscape(String(e))
                        }
                        )) : s[e] = r.uriEscape(String(t))
                    }
                    )) : s[t.name] = r.uriEscape(t.toWireFormat(n).toString()))
        }
        )),
        a) {
            o += o.indexOf("?") >= 0 ? "&" : "?";
            var u = [];
            r.arrayEach(Object.keys(s).sort(), (function(e) {
                Array.isArray(s[e]) || (s[e] = [s[e]]);
                for (var t = 0; t < s[e].length; t++)
                    u.push(r.uriEscape(String(e)) + "=" + s[e][t])
            }
            )),
            o += u.join("&")
        }
        return o
    }
    e.exports = {
        buildRequest: function(e) {
            !function(e) {
                e.httpRequest.method = e.service.api.operations[e.operation].httpMethod
            }(e),
            function(e) {
                var t = e.service.api.operations[e.operation]
                  , n = t.input
                  , r = o(e.httpRequest.endpoint.path, t.httpPath, n, e.params);
                e.httpRequest.path = r
            }(e),
            function(e) {
                var t = e.service.api.operations[e.operation];
                r.each(t.input.members, (function(t, n) {
                    var i = e.params[t];
                    null != i && ("headers" === n.location && "map" === n.type ? r.each(i, (function(t, r) {
                        e.httpRequest.headers[n.name + t] = r
                    }
                    )) : "header" === n.location && (i = n.toWireFormat(i).toString(),
                    n.isJsonValue && (i = r.base64.encode(i)),
                    e.httpRequest.headers[n.name] = i))
                }
                ))
            }(e),
            i(e)
        },
        extractError: function() {},
        extractData: function(e) {
            var t = e.request
              , n = {}
              , i = e.httpResponse
              , o = t.service.api.operations[t.operation].output
              , s = {};
            r.each(i.headers, (function(e, t) {
                s[e.toLowerCase()] = t
            }
            )),
            r.each(o.members, (function(e, t) {
                var o = (t.name || e).toLowerCase();
                if ("headers" === t.location && "map" === t.type) {
                    n[e] = {};
                    var a = t.isLocationName ? t.name : ""
                      , u = new RegExp("^" + a + "(.+)","i");
                    r.each(i.headers, (function(t, r) {
                        var i = t.match(u);
                        null !== i && (n[e][i[1]] = r)
                    }
                    ))
                } else if ("header" === t.location) {
                    if (void 0 !== s[o]) {
                        var c = t.isJsonValue ? r.base64.decode(s[o]) : s[o];
                        n[e] = t.toType(c)
                    }
                } else
                    "statusCode" === t.location && (n[e] = parseInt(i.statusCode, 10))
            }
            )),
            e.data = n
        },
        generateURI: o
    }
}
, function(e, t, n) {
    var r = n(1).Buffer;
    "undefined" != typeof ArrayBuffer && void 0 === ArrayBuffer.isView && (ArrayBuffer.isView = function(e) {
        return i.indexOf(Object.prototype.toString.call(e)) > -1
    }
    );
    var i = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]", "[object DataView]"];
    e.exports = {
        isEmptyData: function(e) {
            return "string" == typeof e ? 0 === e.length : 0 === e.byteLength
        },
        convertToBuffer: function(e) {
            return "string" == typeof e && (e = new r(e,"utf8")),
            ArrayBuffer.isView(e) ? new Uint8Array(e.buffer,e.byteOffset,e.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(e)
        }
    }
}
, function(e, t, n) {
    var r;
    e.exports = (r = n(3),
    function(e) {
        var t = r
          , n = t.lib
          , i = n.WordArray
          , o = n.Hasher
          , s = t.algo
          , a = []
          , u = [];
        !function() {
            function t(t) {
                for (var n = e.sqrt(t), r = 2; r <= n; r++)
                    if (!(t % r))
                        return !1;
                return !0
            }
            function n(e) {
                return 4294967296 * (e - (0 | e)) | 0
            }
            for (var r = 2, i = 0; i < 64; )
                t(r) && (i < 8 && (a[i] = n(e.pow(r, .5))),
                u[i] = n(e.pow(r, 1 / 3)),
                i++),
                r++
        }();
        var c = []
          , l = s.SHA256 = o.extend({
            _doReset: function() {
                this._hash = new i.init(a.slice(0))
            },
            _doProcessBlock: function(e, t) {
                for (var n = this._hash.words, r = n[0], i = n[1], o = n[2], s = n[3], a = n[4], l = n[5], h = n[6], f = n[7], d = 0; d < 64; d++) {
                    if (d < 16)
                        c[d] = 0 | e[t + d];
                    else {
                        var p = c[d - 15]
                          , g = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3
                          , m = c[d - 2]
                          , y = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;
                        c[d] = g + c[d - 7] + y + c[d - 16]
                    }
                    var v = r & i ^ r & o ^ i & o
                      , b = (r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22)
                      , w = f + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & l ^ ~a & h) + u[d] + c[d];
                    f = h,
                    h = l,
                    l = a,
                    a = s + w | 0,
                    s = o,
                    o = i,
                    i = r,
                    r = w + (b + v) | 0
                }
                n[0] = n[0] + r | 0,
                n[1] = n[1] + i | 0,
                n[2] = n[2] + o | 0,
                n[3] = n[3] + s | 0,
                n[4] = n[4] + a | 0,
                n[5] = n[5] + l | 0,
                n[6] = n[6] + h | 0,
                n[7] = n[7] + f | 0
            },
            _doFinalize: function() {
                var t = this._data
                  , n = t.words
                  , r = 8 * this._nDataBytes
                  , i = 8 * t.sigBytes;
                return n[i >>> 5] |= 128 << 24 - i % 32,
                n[14 + (i + 64 >>> 9 << 4)] = e.floor(r / 4294967296),
                n[15 + (i + 64 >>> 9 << 4)] = r,
                t.sigBytes = 4 * n.length,
                this._process(),
                this._hash
            },
            clone: function() {
                var e = o.clone.call(this);
                return e._hash = this._hash.clone(),
                e
            }
        });
        t.SHA256 = o._createHelper(l),
        t.HmacSHA256 = o._createHmacHelper(l)
    }(Math),
    r.SHA256)
}
, function(e, t, n) {
    var r, i, o;
    e.exports = (o = n(3),
    i = (r = o).lib.WordArray,
    r.enc.Base64 = {
        stringify: function(e) {
            var t = e.words
              , n = e.sigBytes
              , r = this._map;
            e.clamp();
            for (var i = [], o = 0; o < n; o += 3)
                for (var s = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < n; a++)
                    i.push(r.charAt(s >>> 6 * (3 - a) & 63));
            var u = r.charAt(64);
            if (u)
                for (; i.length % 4; )
                    i.push(u);
            return i.join("")
        },
        parse: function(e) {
            var t = e.length
              , n = this._map
              , r = this._reverseMap;
            if (!r) {
                r = this._reverseMap = [];
                for (var o = 0; o < n.length; o++)
                    r[n.charCodeAt(o)] = o
            }
            var s = n.charAt(64);
            if (s) {
                var a = e.indexOf(s);
                -1 !== a && (t = a)
            }
            return function(e, t, n) {
                for (var r = [], o = 0, s = 0; s < t; s++)
                    if (s % 4) {
                        var a = n[e.charCodeAt(s - 1)] << s % 4 * 2
                          , u = n[e.charCodeAt(s)] >>> 6 - s % 4 * 2;
                        r[o >>> 2] |= (a | u) << 24 - o % 4 * 8,
                        o++
                    }
                return i.create(r, o)
            }(e, t, r)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    },
    o.enc.Base64)
}
, function(e, t, n) {
    var r = n(2);
    r.crypto.lib = n(91),
    r.Buffer = n(1).Buffer,
    r.url = n(6),
    r.querystring = n(42),
    r.realClock = n(104),
    r.environment = "js",
    r.createEventStream = n(105).createEventStream,
    r.isBrowser = function() {
        return !0
    }
    ,
    r.isNode = function() {
        return !1
    }
    ;
    var i = n(0);
    if (e.exports = i,
    n(36),
    n(37),
    n(111),
    n(115),
    n(116),
    n(117),
    n(122),
    i.XML.Parser = n(123),
    n(124),
    void 0 === o)
        var o = {
            browser: !0
        }
}
, function(e, t, n) {
    var r = n(2)
      , i = n(20)
      , o = n(21)
      , s = n(22).populateHostPrefix;
    e.exports = {
        buildRequest: function(e) {
            var t = e.httpRequest
              , n = e.service.api
              , r = n.targetPrefix + "." + n.operations[e.operation].name
              , o = n.jsonVersion || "1.0"
              , a = n.operations[e.operation].input
              , u = new i;
            1 === o && (o = "1.0"),
            t.body = u.build(e.params || {}, a),
            t.headers["Content-Type"] = "application/x-amz-json-" + o,
            t.headers["X-Amz-Target"] = r,
            s(e)
        },
        extractError: function(e) {
            var t = {}
              , n = e.httpResponse;
            if (t.code = n.headers["x-amzn-errortype"] || "UnknownError",
            "string" == typeof t.code && (t.code = t.code.split(":")[0]),
            n.body.length > 0)
                try {
                    var i = JSON.parse(n.body.toString());
                    (i.__type || i.code) && (t.code = (i.__type || i.code).split("#").pop()),
                    "RequestEntityTooLarge" === t.code ? t.message = "Request body must be less than 1 MB" : t.message = i.message || i.Message || null
                } catch (i) {
                    t.statusCode = n.statusCode,
                    t.message = n.statusMessage
                }
            else
                t.statusCode = n.statusCode,
                t.message = n.statusCode.toString();
            e.error = r.error(new Error, t)
        },
        extractData: function(e) {
            var t = e.httpResponse.body.toString() || "{}";
            if (!1 === e.request.service.config.convertResponseTypes)
                e.data = JSON.parse(t);
            else {
                var n = e.request.service.api.operations[e.request.operation].output || {}
                  , r = new o;
                e.data = r.parse(t, n)
            }
        }
    }
}
, function(e, t, n) {
    var r = n(2);
    function i() {}
    function o(e, t) {
        if (t && null != e)
            switch (t.type) {
            case "structure":
                return function(e, t) {
                    var n = {};
                    return r.each(e, (function(e, r) {
                        var i = t.members[e];
                        if (i) {
                            if ("body" !== i.location)
                                return;
                            var s = i.isLocationName ? i.name : e
                              , a = o(r, i);
                            void 0 !== a && (n[s] = a)
                        }
                    }
                    )),
                    n
                }(e, t);
            case "map":
                return function(e, t) {
                    var n = {};
                    return r.each(e, (function(e, r) {
                        var i = o(r, t.value);
                        void 0 !== i && (n[e] = i)
                    }
                    )),
                    n
                }(e, t);
            case "list":
                return function(e, t) {
                    var n = [];
                    return r.arrayEach(e, (function(e) {
                        var r = o(e, t.member);
                        void 0 !== r && n.push(r)
                    }
                    )),
                    n
                }(e, t);
            default:
                return function(e, t) {
                    return t.toWireFormat(e)
                }(e, t)
            }
    }
    i.prototype.build = function(e, t) {
        return JSON.stringify(o(e, t))
    }
    ,
    e.exports = i
}
, function(e, t, n) {
    var r = n(2);
    function i() {}
    function o(e, t) {
        if (t && void 0 !== e)
            switch (t.type) {
            case "structure":
                return function(e, t) {
                    if (null == e)
                        return;
                    var n = {}
                      , i = t.members;
                    return r.each(i, (function(t, r) {
                        var i = r.isLocationName ? r.name : t;
                        if (Object.prototype.hasOwnProperty.call(e, i)) {
                            var s = o(e[i], r);
                            void 0 !== s && (n[t] = s)
                        }
                    }
                    )),
                    n
                }(e, t);
            case "map":
                return function(e, t) {
                    if (null == e)
                        return;
                    var n = {};
                    return r.each(e, (function(e, r) {
                        var i = o(r, t.value);
                        n[e] = void 0 === i ? null : i
                    }
                    )),
                    n
                }(e, t);
            case "list":
                return function(e, t) {
                    if (null == e)
                        return;
                    var n = [];
                    return r.arrayEach(e, (function(e) {
                        var r = o(e, t.member);
                        void 0 === r ? n.push(null) : n.push(r)
                    }
                    )),
                    n
                }(e, t);
            default:
                return function(e, t) {
                    return t.toType(e)
                }(e, t)
            }
    }
    i.prototype.parse = function(e, t) {
        return o(JSON.parse(e), t)
    }
    ,
    e.exports = i
}
, function(e, t, n) {
    var r = n(2)
      , i = n(0);
    e.exports = {
        populateHostPrefix: function(e) {
            if (!e.service.config.hostPrefixEnabled)
                return e;
            var t, n, o, s = e.service.api.operations[e.operation];
            if (function(e) {
                var t = e.service.api
                  , n = t.operations[e.operation]
                  , i = t.endpointOperation && t.endpointOperation === r.string.lowerFirst(n.name);
                return "NULL" !== n.endpointDiscoveryRequired || !0 === i
            }(e))
                return e;
            if (s.endpoint && s.endpoint.hostPrefix) {
                var a = function(e, t, n) {
                    return r.each(n.members, (function(n, i) {
                        if (!0 === i.hostLabel) {
                            if ("string" != typeof t[n] || "" === t[n])
                                throw r.error(new Error, {
                                    message: "Parameter " + n + " should be a non-empty string.",
                                    code: "InvalidParameter"
                                });
                            var o = new RegExp("\\{" + n + "\\}","g");
                            e = e.replace(o, t[n])
                        }
                    }
                    )),
                    e
                }(s.endpoint.hostPrefix, e.params, s.input);
                !function(e, t) {
                    e.host && (e.host = t + e.host);
                    e.hostname && (e.hostname = t + e.hostname)
                }(e.httpRequest.endpoint, a),
                t = e.httpRequest.endpoint.hostname,
                n = t.split("."),
                o = /^[a-zA-Z0-9]{1}$|^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]$/,
                r.arrayEach(n, (function(e) {
                    if (!e.length || e.length < 1 || e.length > 63)
                        throw r.error(new Error, {
                            code: "ValidationError",
                            message: "Hostname label length should be between 1 to 63 characters, inclusive."
                        });
                    if (!o.test(e))
                        throw i.util.error(new Error, {
                            code: "ValidationError",
                            message: e + " is not hostname compatible."
                        })
                }
                ))
            }
            return e
        }
    }
}
, function(e, t, n) {
    !function(e) {
        "use strict";
        function t(e) {
            return null !== e && "[object Array]" === Object.prototype.toString.call(e)
        }
        function n(e) {
            return null !== e && "[object Object]" === Object.prototype.toString.call(e)
        }
        function r(e, i) {
            if (e === i)
                return !0;
            if (Object.prototype.toString.call(e) !== Object.prototype.toString.call(i))
                return !1;
            if (!0 === t(e)) {
                if (e.length !== i.length)
                    return !1;
                for (var o = 0; o < e.length; o++)
                    if (!1 === r(e[o], i[o]))
                        return !1;
                return !0
            }
            if (!0 === n(e)) {
                var s = {};
                for (var a in e)
                    if (hasOwnProperty.call(e, a)) {
                        if (!1 === r(e[a], i[a]))
                            return !1;
                        s[a] = !0
                    }
                for (var u in i)
                    if (hasOwnProperty.call(i, u) && !0 !== s[u])
                        return !1;
                return !0
            }
            return !1
        }
        function i(e) {
            if ("" === e || !1 === e || null === e)
                return !0;
            if (t(e) && 0 === e.length)
                return !0;
            if (n(e)) {
                for (var r in e)
                    if (e.hasOwnProperty(r))
                        return !1;
                return !0
            }
            return !1
        }
        var o;
        o = "function" == typeof String.prototype.trimLeft ? function(e) {
            return e.trimLeft()
        }
        : function(e) {
            return e.match(/^\s*(.*)/)[1]
        }
        ;
        var s = 0
          , a = 2
          , u = {
            ".": "Dot",
            "*": "Star",
            ",": "Comma",
            ":": "Colon",
            "{": "Lbrace",
            "}": "Rbrace",
            "]": "Rbracket",
            "(": "Lparen",
            ")": "Rparen",
            "@": "Current"
        }
          , c = {
            "<": !0,
            ">": !0,
            "=": !0,
            "!": !0
        }
          , l = {
            " ": !0,
            "\t": !0,
            "\n": !0
        };
        function h(e) {
            return e >= "0" && e <= "9" || "-" === e
        }
        function f() {}
        f.prototype = {
            tokenize: function(e) {
                var t, n, r, i, o = [];
                for (this._current = 0; this._current < e.length; )
                    if ((i = e[this._current]) >= "a" && i <= "z" || i >= "A" && i <= "Z" || "_" === i)
                        t = this._current,
                        n = this._consumeUnquotedIdentifier(e),
                        o.push({
                            type: "UnquotedIdentifier",
                            value: n,
                            start: t
                        });
                    else if (void 0 !== u[e[this._current]])
                        o.push({
                            type: u[e[this._current]],
                            value: e[this._current],
                            start: this._current
                        }),
                        this._current++;
                    else if (h(e[this._current]))
                        r = this._consumeNumber(e),
                        o.push(r);
                    else if ("[" === e[this._current])
                        r = this._consumeLBracket(e),
                        o.push(r);
                    else if ('"' === e[this._current])
                        t = this._current,
                        n = this._consumeQuotedIdentifier(e),
                        o.push({
                            type: "QuotedIdentifier",
                            value: n,
                            start: t
                        });
                    else if ("'" === e[this._current])
                        t = this._current,
                        n = this._consumeRawStringLiteral(e),
                        o.push({
                            type: "Literal",
                            value: n,
                            start: t
                        });
                    else if ("`" === e[this._current]) {
                        t = this._current;
                        var s = this._consumeLiteral(e);
                        o.push({
                            type: "Literal",
                            value: s,
                            start: t
                        })
                    } else if (void 0 !== c[e[this._current]])
                        o.push(this._consumeOperator(e));
                    else if (void 0 !== l[e[this._current]])
                        this._current++;
                    else if ("&" === e[this._current])
                        t = this._current,
                        this._current++,
                        "&" === e[this._current] ? (this._current++,
                        o.push({
                            type: "And",
                            value: "&&",
                            start: t
                        })) : o.push({
                            type: "Expref",
                            value: "&",
                            start: t
                        });
                    else {
                        if ("|" !== e[this._current]) {
                            var a = new Error("Unknown character:" + e[this._current]);
                            throw a.name = "LexerError",
                            a
                        }
                        t = this._current,
                        this._current++,
                        "|" === e[this._current] ? (this._current++,
                        o.push({
                            type: "Or",
                            value: "||",
                            start: t
                        })) : o.push({
                            type: "Pipe",
                            value: "|",
                            start: t
                        })
                    }
                return o
            },
            _consumeUnquotedIdentifier: function(e) {
                var t, n = this._current;
                for (this._current++; this._current < e.length && ((t = e[this._current]) >= "a" && t <= "z" || t >= "A" && t <= "Z" || t >= "0" && t <= "9" || "_" === t); )
                    this._current++;
                return e.slice(n, this._current)
            },
            _consumeQuotedIdentifier: function(e) {
                var t = this._current;
                this._current++;
                for (var n = e.length; '"' !== e[this._current] && this._current < n; ) {
                    var r = this._current;
                    "\\" !== e[r] || "\\" !== e[r + 1] && '"' !== e[r + 1] ? r++ : r += 2,
                    this._current = r
                }
                return this._current++,
                JSON.parse(e.slice(t, this._current))
            },
            _consumeRawStringLiteral: function(e) {
                var t = this._current;
                this._current++;
                for (var n = e.length; "'" !== e[this._current] && this._current < n; ) {
                    var r = this._current;
                    "\\" !== e[r] || "\\" !== e[r + 1] && "'" !== e[r + 1] ? r++ : r += 2,
                    this._current = r
                }
                return this._current++,
                e.slice(t + 1, this._current - 1).replace("\\'", "'")
            },
            _consumeNumber: function(e) {
                var t = this._current;
                this._current++;
                for (var n = e.length; h(e[this._current]) && this._current < n; )
                    this._current++;
                return {
                    type: "Number",
                    value: parseInt(e.slice(t, this._current)),
                    start: t
                }
            },
            _consumeLBracket: function(e) {
                var t = this._current;
                return this._current++,
                "?" === e[this._current] ? (this._current++,
                {
                    type: "Filter",
                    value: "[?",
                    start: t
                }) : "]" === e[this._current] ? (this._current++,
                {
                    type: "Flatten",
                    value: "[]",
                    start: t
                }) : {
                    type: "Lbracket",
                    value: "[",
                    start: t
                }
            },
            _consumeOperator: function(e) {
                var t = this._current
                  , n = e[t];
                return this._current++,
                "!" === n ? "=" === e[this._current] ? (this._current++,
                {
                    type: "NE",
                    value: "!=",
                    start: t
                }) : {
                    type: "Not",
                    value: "!",
                    start: t
                } : "<" === n ? "=" === e[this._current] ? (this._current++,
                {
                    type: "LTE",
                    value: "<=",
                    start: t
                }) : {
                    type: "LT",
                    value: "<",
                    start: t
                } : ">" === n ? "=" === e[this._current] ? (this._current++,
                {
                    type: "GTE",
                    value: ">=",
                    start: t
                }) : {
                    type: "GT",
                    value: ">",
                    start: t
                } : "=" === n && "=" === e[this._current] ? (this._current++,
                {
                    type: "EQ",
                    value: "==",
                    start: t
                }) : void 0
            },
            _consumeLiteral: function(e) {
                this._current++;
                for (var t, n = this._current, r = e.length; "`" !== e[this._current] && this._current < r; ) {
                    var i = this._current;
                    "\\" !== e[i] || "\\" !== e[i + 1] && "`" !== e[i + 1] ? i++ : i += 2,
                    this._current = i
                }
                var s = o(e.slice(n, this._current));
                return s = s.replace("\\`", "`"),
                t = this._looksLikeJSON(s) ? JSON.parse(s) : JSON.parse('"' + s + '"'),
                this._current++,
                t
            },
            _looksLikeJSON: function(e) {
                if ("" === e)
                    return !1;
                if ('[{"'.indexOf(e[0]) >= 0)
                    return !0;
                if (["true", "false", "null"].indexOf(e) >= 0)
                    return !0;
                if (!("-0123456789".indexOf(e[0]) >= 0))
                    return !1;
                try {
                    return JSON.parse(e),
                    !0
                } catch (e) {
                    return !1
                }
            }
        };
        var d = {};
        function p() {}
        function g(e) {
            this.runtime = e
        }
        function m(e) {
            this._interpreter = e,
            this.functionTable = {
                abs: {
                    _func: this._functionAbs,
                    _signature: [{
                        types: [s]
                    }]
                },
                avg: {
                    _func: this._functionAvg,
                    _signature: [{
                        types: [8]
                    }]
                },
                ceil: {
                    _func: this._functionCeil,
                    _signature: [{
                        types: [s]
                    }]
                },
                contains: {
                    _func: this._functionContains,
                    _signature: [{
                        types: [a, 3]
                    }, {
                        types: [1]
                    }]
                },
                ends_with: {
                    _func: this._functionEndsWith,
                    _signature: [{
                        types: [a]
                    }, {
                        types: [a]
                    }]
                },
                floor: {
                    _func: this._functionFloor,
                    _signature: [{
                        types: [s]
                    }]
                },
                length: {
                    _func: this._functionLength,
                    _signature: [{
                        types: [a, 3, 4]
                    }]
                },
                map: {
                    _func: this._functionMap,
                    _signature: [{
                        types: [6]
                    }, {
                        types: [3]
                    }]
                },
                max: {
                    _func: this._functionMax,
                    _signature: [{
                        types: [8, 9]
                    }]
                },
                merge: {
                    _func: this._functionMerge,
                    _signature: [{
                        types: [4],
                        variadic: !0
                    }]
                },
                max_by: {
                    _func: this._functionMaxBy,
                    _signature: [{
                        types: [3]
                    }, {
                        types: [6]
                    }]
                },
                sum: {
                    _func: this._functionSum,
                    _signature: [{
                        types: [8]
                    }]
                },
                starts_with: {
                    _func: this._functionStartsWith,
                    _signature: [{
                        types: [a]
                    }, {
                        types: [a]
                    }]
                },
                min: {
                    _func: this._functionMin,
                    _signature: [{
                        types: [8, 9]
                    }]
                },
                min_by: {
                    _func: this._functionMinBy,
                    _signature: [{
                        types: [3]
                    }, {
                        types: [6]
                    }]
                },
                type: {
                    _func: this._functionType,
                    _signature: [{
                        types: [1]
                    }]
                },
                keys: {
                    _func: this._functionKeys,
                    _signature: [{
                        types: [4]
                    }]
                },
                values: {
                    _func: this._functionValues,
                    _signature: [{
                        types: [4]
                    }]
                },
                sort: {
                    _func: this._functionSort,
                    _signature: [{
                        types: [9, 8]
                    }]
                },
                sort_by: {
                    _func: this._functionSortBy,
                    _signature: [{
                        types: [3]
                    }, {
                        types: [6]
                    }]
                },
                join: {
                    _func: this._functionJoin,
                    _signature: [{
                        types: [a]
                    }, {
                        types: [9]
                    }]
                },
                reverse: {
                    _func: this._functionReverse,
                    _signature: [{
                        types: [a, 3]
                    }]
                },
                to_array: {
                    _func: this._functionToArray,
                    _signature: [{
                        types: [1]
                    }]
                },
                to_string: {
                    _func: this._functionToString,
                    _signature: [{
                        types: [1]
                    }]
                },
                to_number: {
                    _func: this._functionToNumber,
                    _signature: [{
                        types: [1]
                    }]
                },
                not_null: {
                    _func: this._functionNotNull,
                    _signature: [{
                        types: [1],
                        variadic: !0
                    }]
                }
            }
        }
        d.EOF = 0,
        d.UnquotedIdentifier = 0,
        d.QuotedIdentifier = 0,
        d.Rbracket = 0,
        d.Rparen = 0,
        d.Comma = 0,
        d.Rbrace = 0,
        d.Number = 0,
        d.Current = 0,
        d.Expref = 0,
        d.Pipe = 1,
        d.Or = 2,
        d.And = 3,
        d.EQ = 5,
        d.GT = 5,
        d.LT = 5,
        d.GTE = 5,
        d.LTE = 5,
        d.NE = 5,
        d.Flatten = 9,
        d.Star = 20,
        d.Filter = 21,
        d.Dot = 40,
        d.Not = 45,
        d.Lbrace = 50,
        d.Lbracket = 55,
        d.Lparen = 60,
        p.prototype = {
            parse: function(e) {
                this._loadTokens(e),
                this.index = 0;
                var t = this.expression(0);
                if ("EOF" !== this._lookahead(0)) {
                    var n = this._lookaheadToken(0)
                      , r = new Error("Unexpected token type: " + n.type + ", value: " + n.value);
                    throw r.name = "ParserError",
                    r
                }
                return t
            },
            _loadTokens: function(e) {
                var t = (new f).tokenize(e);
                t.push({
                    type: "EOF",
                    value: "",
                    start: e.length
                }),
                this.tokens = t
            },
            expression: function(e) {
                var t = this._lookaheadToken(0);
                this._advance();
                for (var n = this.nud(t), r = this._lookahead(0); e < d[r]; )
                    this._advance(),
                    n = this.led(r, n),
                    r = this._lookahead(0);
                return n
            },
            _lookahead: function(e) {
                return this.tokens[this.index + e].type
            },
            _lookaheadToken: function(e) {
                return this.tokens[this.index + e]
            },
            _advance: function() {
                this.index++
            },
            nud: function(e) {
                var t, n;
                switch (e.type) {
                case "Literal":
                    return {
                        type: "Literal",
                        value: e.value
                    };
                case "UnquotedIdentifier":
                    return {
                        type: "Field",
                        name: e.value
                    };
                case "QuotedIdentifier":
                    var r = {
                        type: "Field",
                        name: e.value
                    };
                    if ("Lparen" === this._lookahead(0))
                        throw new Error("Quoted identifier not allowed for function names.");
                    return r;
                case "Not":
                    return {
                        type: "NotExpression",
                        children: [t = this.expression(d.Not)]
                    };
                case "Star":
                    return t = null,
                    {
                        type: "ValueProjection",
                        children: [{
                            type: "Identity"
                        }, t = "Rbracket" === this._lookahead(0) ? {
                            type: "Identity"
                        } : this._parseProjectionRHS(d.Star)]
                    };
                case "Filter":
                    return this.led(e.type, {
                        type: "Identity"
                    });
                case "Lbrace":
                    return this._parseMultiselectHash();
                case "Flatten":
                    return {
                        type: "Projection",
                        children: [{
                            type: "Flatten",
                            children: [{
                                type: "Identity"
                            }]
                        }, t = this._parseProjectionRHS(d.Flatten)]
                    };
                case "Lbracket":
                    return "Number" === this._lookahead(0) || "Colon" === this._lookahead(0) ? (t = this._parseIndexExpression(),
                    this._projectIfSlice({
                        type: "Identity"
                    }, t)) : "Star" === this._lookahead(0) && "Rbracket" === this._lookahead(1) ? (this._advance(),
                    this._advance(),
                    {
                        type: "Projection",
                        children: [{
                            type: "Identity"
                        }, t = this._parseProjectionRHS(d.Star)]
                    }) : this._parseMultiselectList();
                case "Current":
                    return {
                        type: "Current"
                    };
                case "Expref":
                    return {
                        type: "ExpressionReference",
                        children: [n = this.expression(d.Expref)]
                    };
                case "Lparen":
                    for (var i = []; "Rparen" !== this._lookahead(0); )
                        "Current" === this._lookahead(0) ? (n = {
                            type: "Current"
                        },
                        this._advance()) : n = this.expression(0),
                        i.push(n);
                    return this._match("Rparen"),
                    i[0];
                default:
                    this._errorToken(e)
                }
            },
            led: function(e, t) {
                var n;
                switch (e) {
                case "Dot":
                    var r = d.Dot;
                    return "Star" !== this._lookahead(0) ? {
                        type: "Subexpression",
                        children: [t, n = this._parseDotRHS(r)]
                    } : (this._advance(),
                    {
                        type: "ValueProjection",
                        children: [t, n = this._parseProjectionRHS(r)]
                    });
                case "Pipe":
                    return {
                        type: "Pipe",
                        children: [t, n = this.expression(d.Pipe)]
                    };
                case "Or":
                    return {
                        type: "OrExpression",
                        children: [t, n = this.expression(d.Or)]
                    };
                case "And":
                    return {
                        type: "AndExpression",
                        children: [t, n = this.expression(d.And)]
                    };
                case "Lparen":
                    for (var i, o = t.name, s = []; "Rparen" !== this._lookahead(0); )
                        "Current" === this._lookahead(0) ? (i = {
                            type: "Current"
                        },
                        this._advance()) : i = this.expression(0),
                        "Comma" === this._lookahead(0) && this._match("Comma"),
                        s.push(i);
                    return this._match("Rparen"),
                    {
                        type: "Function",
                        name: o,
                        children: s
                    };
                case "Filter":
                    var a = this.expression(0);
                    return this._match("Rbracket"),
                    {
                        type: "FilterProjection",
                        children: [t, n = "Flatten" === this._lookahead(0) ? {
                            type: "Identity"
                        } : this._parseProjectionRHS(d.Filter), a]
                    };
                case "Flatten":
                    return {
                        type: "Projection",
                        children: [{
                            type: "Flatten",
                            children: [t]
                        }, this._parseProjectionRHS(d.Flatten)]
                    };
                case "EQ":
                case "NE":
                case "GT":
                case "GTE":
                case "LT":
                case "LTE":
                    return this._parseComparator(t, e);
                case "Lbracket":
                    var u = this._lookaheadToken(0);
                    return "Number" === u.type || "Colon" === u.type ? (n = this._parseIndexExpression(),
                    this._projectIfSlice(t, n)) : (this._match("Star"),
                    this._match("Rbracket"),
                    {
                        type: "Projection",
                        children: [t, n = this._parseProjectionRHS(d.Star)]
                    });
                default:
                    this._errorToken(this._lookaheadToken(0))
                }
            },
            _match: function(e) {
                if (this._lookahead(0) !== e) {
                    var t = this._lookaheadToken(0)
                      , n = new Error("Expected " + e + ", got: " + t.type);
                    throw n.name = "ParserError",
                    n
                }
                this._advance()
            },
            _errorToken: function(e) {
                var t = new Error("Invalid token (" + e.type + '): "' + e.value + '"');
                throw t.name = "ParserError",
                t
            },
            _parseIndexExpression: function() {
                if ("Colon" === this._lookahead(0) || "Colon" === this._lookahead(1))
                    return this._parseSliceExpression();
                var e = {
                    type: "Index",
                    value: this._lookaheadToken(0).value
                };
                return this._advance(),
                this._match("Rbracket"),
                e
            },
            _projectIfSlice: function(e, t) {
                var n = {
                    type: "IndexExpression",
                    children: [e, t]
                };
                return "Slice" === t.type ? {
                    type: "Projection",
                    children: [n, this._parseProjectionRHS(d.Star)]
                } : n
            },
            _parseSliceExpression: function() {
                for (var e = [null, null, null], t = 0, n = this._lookahead(0); "Rbracket" !== n && t < 3; ) {
                    if ("Colon" === n)
                        t++,
                        this._advance();
                    else {
                        if ("Number" !== n) {
                            var r = this._lookahead(0)
                              , i = new Error("Syntax error, unexpected token: " + r.value + "(" + r.type + ")");
                            throw i.name = "Parsererror",
                            i
                        }
                        e[t] = this._lookaheadToken(0).value,
                        this._advance()
                    }
                    n = this._lookahead(0)
                }
                return this._match("Rbracket"),
                {
                    type: "Slice",
                    children: e
                }
            },
            _parseComparator: function(e, t) {
                return {
                    type: "Comparator",
                    name: t,
                    children: [e, this.expression(d[t])]
                }
            },
            _parseDotRHS: function(e) {
                var t = this._lookahead(0);
                return ["UnquotedIdentifier", "QuotedIdentifier", "Star"].indexOf(t) >= 0 ? this.expression(e) : "Lbracket" === t ? (this._match("Lbracket"),
                this._parseMultiselectList()) : "Lbrace" === t ? (this._match("Lbrace"),
                this._parseMultiselectHash()) : void 0
            },
            _parseProjectionRHS: function(e) {
                var t;
                if (d[this._lookahead(0)] < 10)
                    t = {
                        type: "Identity"
                    };
                else if ("Lbracket" === this._lookahead(0))
                    t = this.expression(e);
                else if ("Filter" === this._lookahead(0))
                    t = this.expression(e);
                else {
                    if ("Dot" !== this._lookahead(0)) {
                        var n = this._lookaheadToken(0)
                          , r = new Error("Sytanx error, unexpected token: " + n.value + "(" + n.type + ")");
                        throw r.name = "ParserError",
                        r
                    }
                    this._match("Dot"),
                    t = this._parseDotRHS(e)
                }
                return t
            },
            _parseMultiselectList: function() {
                for (var e = []; "Rbracket" !== this._lookahead(0); ) {
                    var t = this.expression(0);
                    if (e.push(t),
                    "Comma" === this._lookahead(0) && (this._match("Comma"),
                    "Rbracket" === this._lookahead(0)))
                        throw new Error("Unexpected token Rbracket")
                }
                return this._match("Rbracket"),
                {
                    type: "MultiSelectList",
                    children: e
                }
            },
            _parseMultiselectHash: function() {
                for (var e, t, n, r = [], i = ["UnquotedIdentifier", "QuotedIdentifier"]; ; ) {
                    if (e = this._lookaheadToken(0),
                    i.indexOf(e.type) < 0)
                        throw new Error("Expecting an identifier token, got: " + e.type);
                    if (t = e.value,
                    this._advance(),
                    this._match("Colon"),
                    n = {
                        type: "KeyValuePair",
                        name: t,
                        value: this.expression(0)
                    },
                    r.push(n),
                    "Comma" === this._lookahead(0))
                        this._match("Comma");
                    else if ("Rbrace" === this._lookahead(0)) {
                        this._match("Rbrace");
                        break
                    }
                }
                return {
                    type: "MultiSelectHash",
                    children: r
                }
            }
        },
        g.prototype = {
            search: function(e, t) {
                return this.visit(e, t)
            },
            visit: function(e, o) {
                var s, a, u, c, l, h, f, d, p;
                switch (e.type) {
                case "Field":
                    return null === o ? null : n(o) ? void 0 === (h = o[e.name]) ? null : h : null;
                case "Subexpression":
                    for (u = this.visit(e.children[0], o),
                    p = 1; p < e.children.length; p++)
                        if (null === (u = this.visit(e.children[1], u)))
                            return null;
                    return u;
                case "IndexExpression":
                    return f = this.visit(e.children[0], o),
                    this.visit(e.children[1], f);
                case "Index":
                    if (!t(o))
                        return null;
                    var g = e.value;
                    return g < 0 && (g = o.length + g),
                    void 0 === (u = o[g]) && (u = null),
                    u;
                case "Slice":
                    if (!t(o))
                        return null;
                    var m = e.children.slice(0)
                      , y = this.computeSliceParams(o.length, m)
                      , v = y[0]
                      , b = y[1]
                      , w = y[2];
                    if (u = [],
                    w > 0)
                        for (p = v; p < b; p += w)
                            u.push(o[p]);
                    else
                        for (p = v; p > b; p += w)
                            u.push(o[p]);
                    return u;
                case "Projection":
                    var S = this.visit(e.children[0], o);
                    if (!t(S))
                        return null;
                    for (d = [],
                    p = 0; p < S.length; p++)
                        null !== (a = this.visit(e.children[1], S[p])) && d.push(a);
                    return d;
                case "ValueProjection":
                    if (!n(S = this.visit(e.children[0], o)))
                        return null;
                    d = [];
                    var E = function(e) {
                        for (var t = Object.keys(e), n = [], r = 0; r < t.length; r++)
                            n.push(e[t[r]]);
                        return n
                    }(S);
                    for (p = 0; p < E.length; p++)
                        null !== (a = this.visit(e.children[1], E[p])) && d.push(a);
                    return d;
                case "FilterProjection":
                    if (!t(S = this.visit(e.children[0], o)))
                        return null;
                    var _ = []
                      , A = [];
                    for (p = 0; p < S.length; p++)
                        i(s = this.visit(e.children[2], S[p])) || _.push(S[p]);
                    for (var C = 0; C < _.length; C++)
                        null !== (a = this.visit(e.children[1], _[C])) && A.push(a);
                    return A;
                case "Comparator":
                    switch (c = this.visit(e.children[0], o),
                    l = this.visit(e.children[1], o),
                    e.name) {
                    case "EQ":
                        u = r(c, l);
                        break;
                    case "NE":
                        u = !r(c, l);
                        break;
                    case "GT":
                        u = c > l;
                        break;
                    case "GTE":
                        u = c >= l;
                        break;
                    case "LT":
                        u = c < l;
                        break;
                    case "LTE":
                        u = c <= l;
                        break;
                    default:
                        throw new Error("Unknown comparator: " + e.name)
                    }
                    return u;
                case "Flatten":
                    var I = this.visit(e.children[0], o);
                    if (!t(I))
                        return null;
                    var T = [];
                    for (p = 0; p < I.length; p++)
                        t(a = I[p]) ? T.push.apply(T, a) : T.push(a);
                    return T;
                case "Identity":
                    return o;
                case "MultiSelectList":
                    if (null === o)
                        return null;
                    for (d = [],
                    p = 0; p < e.children.length; p++)
                        d.push(this.visit(e.children[p], o));
                    return d;
                case "MultiSelectHash":
                    if (null === o)
                        return null;
                    var k;
                    for (d = {},
                    p = 0; p < e.children.length; p++)
                        d[(k = e.children[p]).name] = this.visit(k.value, o);
                    return d;
                case "OrExpression":
                    return i(s = this.visit(e.children[0], o)) && (s = this.visit(e.children[1], o)),
                    s;
                case "AndExpression":
                    return !0 === i(c = this.visit(e.children[0], o)) ? c : this.visit(e.children[1], o);
                case "NotExpression":
                    return i(c = this.visit(e.children[0], o));
                case "Literal":
                    return e.value;
                case "Pipe":
                    return f = this.visit(e.children[0], o),
                    this.visit(e.children[1], f);
                case "Current":
                    return o;
                case "Function":
                    var x = [];
                    for (p = 0; p < e.children.length; p++)
                        x.push(this.visit(e.children[p], o));
                    return this.runtime.callFunction(e.name, x);
                case "ExpressionReference":
                    var P = e.children[0];
                    return P.jmespathType = "Expref",
                    P;
                default:
                    throw new Error("Unknown node type: " + e.type)
                }
            },
            computeSliceParams: function(e, t) {
                var n = t[0]
                  , r = t[1]
                  , i = t[2]
                  , o = [null, null, null];
                if (null === i)
                    i = 1;
                else if (0 === i) {
                    var s = new Error("Invalid slice, step cannot be 0");
                    throw s.name = "RuntimeError",
                    s
                }
                var a = i < 0;
                return n = null === n ? a ? e - 1 : 0 : this.capSliceRange(e, n, i),
                r = null === r ? a ? -1 : e : this.capSliceRange(e, r, i),
                o[0] = n,
                o[1] = r,
                o[2] = i,
                o
            },
            capSliceRange: function(e, t, n) {
                return t < 0 ? (t += e) < 0 && (t = n < 0 ? -1 : 0) : t >= e && (t = n < 0 ? e - 1 : e),
                t
            }
        },
        m.prototype = {
            callFunction: function(e, t) {
                var n = this.functionTable[e];
                if (void 0 === n)
                    throw new Error("Unknown function: " + e + "()");
                return this._validateArgs(e, t, n._signature),
                n._func.call(this, t)
            },
            _validateArgs: function(e, t, n) {
                var r, i, o, s;
                if (n[n.length - 1].variadic) {
                    if (t.length < n.length)
                        throw r = 1 === n.length ? " argument" : " arguments",
                        new Error("ArgumentError: " + e + "() takes at least" + n.length + r + " but received " + t.length)
                } else if (t.length !== n.length)
                    throw r = 1 === n.length ? " argument" : " arguments",
                    new Error("ArgumentError: " + e + "() takes " + n.length + r + " but received " + t.length);
                for (var a = 0; a < n.length; a++) {
                    s = !1,
                    i = n[a].types,
                    o = this._getTypeName(t[a]);
                    for (var u = 0; u < i.length; u++)
                        if (this._typeMatches(o, i[u], t[a])) {
                            s = !0;
                            break
                        }
                    if (!s)
                        throw new Error("TypeError: " + e + "() expected argument " + (a + 1) + " to be type " + i + " but received type " + o + " instead.")
                }
            },
            _typeMatches: function(e, t, n) {
                if (1 === t)
                    return !0;
                if (9 !== t && 8 !== t && 3 !== t)
                    return e === t;
                if (3 === t)
                    return 3 === e;
                if (3 === e) {
                    var r;
                    8 === t ? r = s : 9 === t && (r = a);
                    for (var i = 0; i < n.length; i++)
                        if (!this._typeMatches(this._getTypeName(n[i]), r, n[i]))
                            return !1;
                    return !0
                }
            },
            _getTypeName: function(e) {
                switch (Object.prototype.toString.call(e)) {
                case "[object String]":
                    return a;
                case "[object Number]":
                    return s;
                case "[object Array]":
                    return 3;
                case "[object Boolean]":
                    return 5;
                case "[object Null]":
                    return 7;
                case "[object Object]":
                    return "Expref" === e.jmespathType ? 6 : 4
                }
            },
            _functionStartsWith: function(e) {
                return 0 === e[0].lastIndexOf(e[1])
            },
            _functionEndsWith: function(e) {
                var t = e[0]
                  , n = e[1];
                return -1 !== t.indexOf(n, t.length - n.length)
            },
            _functionReverse: function(e) {
                if (this._getTypeName(e[0]) === a) {
                    for (var t = e[0], n = "", r = t.length - 1; r >= 0; r--)
                        n += t[r];
                    return n
                }
                var i = e[0].slice(0);
                return i.reverse(),
                i
            },
            _functionAbs: function(e) {
                return Math.abs(e[0])
            },
            _functionCeil: function(e) {
                return Math.ceil(e[0])
            },
            _functionAvg: function(e) {
                for (var t = 0, n = e[0], r = 0; r < n.length; r++)
                    t += n[r];
                return t / n.length
            },
            _functionContains: function(e) {
                return e[0].indexOf(e[1]) >= 0
            },
            _functionFloor: function(e) {
                return Math.floor(e[0])
            },
            _functionLength: function(e) {
                return n(e[0]) ? Object.keys(e[0]).length : e[0].length
            },
            _functionMap: function(e) {
                for (var t = [], n = this._interpreter, r = e[0], i = e[1], o = 0; o < i.length; o++)
                    t.push(n.visit(r, i[o]));
                return t
            },
            _functionMerge: function(e) {
                for (var t = {}, n = 0; n < e.length; n++) {
                    var r = e[n];
                    for (var i in r)
                        t[i] = r[i]
                }
                return t
            },
            _functionMax: function(e) {
                if (e[0].length > 0) {
                    if (this._getTypeName(e[0][0]) === s)
                        return Math.max.apply(Math, e[0]);
                    for (var t = e[0], n = t[0], r = 1; r < t.length; r++)
                        n.localeCompare(t[r]) < 0 && (n = t[r]);
                    return n
                }
                return null
            },
            _functionMin: function(e) {
                if (e[0].length > 0) {
                    if (this._getTypeName(e[0][0]) === s)
                        return Math.min.apply(Math, e[0]);
                    for (var t = e[0], n = t[0], r = 1; r < t.length; r++)
                        t[r].localeCompare(n) < 0 && (n = t[r]);
                    return n
                }
                return null
            },
            _functionSum: function(e) {
                for (var t = 0, n = e[0], r = 0; r < n.length; r++)
                    t += n[r];
                return t
            },
            _functionType: function(e) {
                switch (this._getTypeName(e[0])) {
                case s:
                    return "number";
                case a:
                    return "string";
                case 3:
                    return "array";
                case 4:
                    return "object";
                case 5:
                    return "boolean";
                case 6:
                    return "expref";
                case 7:
                    return "null"
                }
            },
            _functionKeys: function(e) {
                return Object.keys(e[0])
            },
            _functionValues: function(e) {
                for (var t = e[0], n = Object.keys(t), r = [], i = 0; i < n.length; i++)
                    r.push(t[n[i]]);
                return r
            },
            _functionJoin: function(e) {
                var t = e[0];
                return e[1].join(t)
            },
            _functionToArray: function(e) {
                return 3 === this._getTypeName(e[0]) ? e[0] : [e[0]]
            },
            _functionToString: function(e) {
                return this._getTypeName(e[0]) === a ? e[0] : JSON.stringify(e[0])
            },
            _functionToNumber: function(e) {
                var t, n = this._getTypeName(e[0]);
                return n === s ? e[0] : n !== a || (t = +e[0],
                isNaN(t)) ? null : t
            },
            _functionNotNull: function(e) {
                for (var t = 0; t < e.length; t++)
                    if (7 !== this._getTypeName(e[t]))
                        return e[t];
                return null
            },
            _functionSort: function(e) {
                var t = e[0].slice(0);
                return t.sort(),
                t
            },
            _functionSortBy: function(e) {
                var t = e[0].slice(0);
                if (0 === t.length)
                    return t;
                var n = this._interpreter
                  , r = e[1]
                  , i = this._getTypeName(n.visit(r, t[0]));
                if ([s, a].indexOf(i) < 0)
                    throw new Error("TypeError");
                for (var o = this, u = [], c = 0; c < t.length; c++)
                    u.push([c, t[c]]);
                u.sort((function(e, t) {
                    var s = n.visit(r, e[1])
                      , a = n.visit(r, t[1]);
                    if (o._getTypeName(s) !== i)
                        throw new Error("TypeError: expected " + i + ", received " + o._getTypeName(s));
                    if (o._getTypeName(a) !== i)
                        throw new Error("TypeError: expected " + i + ", received " + o._getTypeName(a));
                    return s > a ? 1 : s < a ? -1 : e[0] - t[0]
                }
                ));
                for (var l = 0; l < u.length; l++)
                    t[l] = u[l][1];
                return t
            },
            _functionMaxBy: function(e) {
                for (var t, n, r = e[1], i = e[0], o = this.createKeyFunction(r, [s, a]), u = -1 / 0, c = 0; c < i.length; c++)
                    (n = o(i[c])) > u && (u = n,
                    t = i[c]);
                return t
            },
            _functionMinBy: function(e) {
                for (var t, n, r = e[1], i = e[0], o = this.createKeyFunction(r, [s, a]), u = 1 / 0, c = 0; c < i.length; c++)
                    (n = o(i[c])) < u && (u = n,
                    t = i[c]);
                return t
            },
            createKeyFunction: function(e, t) {
                var n = this
                  , r = this._interpreter;
                return function(i) {
                    var o = r.visit(e, i);
                    if (t.indexOf(n._getTypeName(o)) < 0) {
                        var s = "TypeError: expected one of " + t + ", received " + n._getTypeName(o);
                        throw new Error(s)
                    }
                    return o
                }
            }
        },
        e.tokenize = function(e) {
            return (new f).tokenize(e)
        }
        ,
        e.compile = function(e) {
            return (new p).parse(e)
        }
        ,
        e.search = function(e, t) {
            var n = new p
              , r = new m
              , i = new g(r);
            r._interpreter = i;
            var o = n.parse(t);
            return i.search(o, e)
        }
        ,
        e.strictDeepEqual = r
    }(t)
}
, function(e, t) {}
, function(e, t, n) {
    e.exports = n(128)
}
, function(e, t, n) {
    n(18);
    var r = n(0);
    "undefined" != typeof window && (window.AWS = r),
    e.exports = r,
    "undefined" != typeof self && (self.AWS = r)
}
, function(e, t, n) {
    var r = n(0)
      , i = n(2)
      , o = n(57)
      , s = n(11)
      , a = n(22).populateHostPrefix;
    e.exports = {
        buildRequest: function(e) {
            var t = e.service.api.operations[e.operation]
              , n = e.httpRequest;
            n.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8",
            n.params = {
                Version: e.service.api.apiVersion,
                Action: t.name
            },
            (new o).serialize(e.params, t.input, (function(e, t) {
                n.params[e] = t
            }
            )),
            n.body = i.queryParamsToString(n.params),
            a(e)
        },
        extractError: function(e) {
            var t, n = e.httpResponse.body.toString();
            if (n.match("<UnknownOperationException"))
                t = {
                    Code: "UnknownOperation",
                    Message: "Unknown operation " + e.request.operation
                };
            else
                try {
                    t = (new r.XML.Parser).parse(n)
                } catch (n) {
                    t = {
                        Code: e.httpResponse.statusCode,
                        Message: e.httpResponse.statusMessage
                    }
                }
            t.requestId && !e.requestId && (e.requestId = t.requestId),
            t.Errors && (t = t.Errors),
            t.Error && (t = t.Error),
            t.Code ? e.error = i.error(new Error, {
                code: t.Code,
                message: t.Message
            }) : e.error = i.error(new Error, {
                code: e.httpResponse.statusCode,
                message: null
            })
        },
        extractData: function(e) {
            var t = e.request
              , n = t.service.api.operations[t.operation].output || {}
              , o = n;
            if (o.resultWrapper) {
                var a = s.create({
                    type: "structure"
                });
                a.members[o.resultWrapper] = n,
                a.memberNames = [o.resultWrapper],
                i.property(n, "name", n.resultWrapper),
                n = a
            }
            var u = new r.XML.Parser;
            if (n && n.members && !n.members._XAMZRequestId) {
                var c = s.create({
                    type: "string"
                }, {
                    api: {
                        protocol: "query"
                    }
                }, "requestId");
                n.members._XAMZRequestId = c
            }
            var l = u.parse(e.httpResponse.body.toString(), n);
            e.requestId = l._XAMZRequestId || l.requestId,
            l._XAMZRequestId && delete l._XAMZRequestId,
            o.resultWrapper && l[o.resultWrapper] && (i.update(l, l[o.resultWrapper]),
            delete l[o.resultWrapper]),
            e.data = l
        }
    }
}
, function(e, t, n) {
    var r = n(2).memoizedProperty;
    function i(e, t, n, i) {
        r(this, i(e), (function() {
            return n(e, t)
        }
        ))
    }
    e.exports = function(e, t, n, r, o) {
        for (var s in r = r || String,
        e)
            Object.prototype.hasOwnProperty.call(e, s) && (i.call(this, s, e[s], n, r),
            o && o(s, e[s]))
    }
}
, function(e, t, n) {
    var r = n(2)
      , i = n(14)
      , o = n(19)
      , s = n(20)
      , a = n(21);
    function u(e, t) {
        e.service.api.operations[e.operation].input;
        if (!e.httpRequest.headers["Content-Type"]) {
            var n = t ? "binary/octet-stream" : "application/json";
            e.httpRequest.headers["Content-Type"] = n
        }
    }
    e.exports = {
        buildRequest: function(e) {
            i.buildRequest(e),
            ["HEAD", "DELETE"].indexOf(e.httpRequest.method) < 0 && function(e) {
                var t = new s
                  , n = e.service.api.operations[e.operation].input;
                if (n.payload) {
                    var r, i = n.members[n.payload];
                    if (void 0 === (r = e.params[n.payload]))
                        return;
                    "structure" === i.type ? (e.httpRequest.body = t.build(r, i),
                    u(e)) : (e.httpRequest.body = r,
                    ("binary" === i.type || i.isStreaming) && u(e, !0))
                } else {
                    var o = t.build(e.params, n);
                    "{}" === o && "GET" === e.httpRequest.method || (e.httpRequest.body = o),
                    u(e)
                }
            }(e)
        },
        extractError: function(e) {
            o.extractError(e)
        },
        extractData: function(e) {
            i.extractData(e);
            var t = e.request
              , n = t.service.api.operations[t.operation]
              , s = t.service.api.operations[t.operation].output || {};
            if (n.hasEventOutput,
            s.payload) {
                var u = s.members[s.payload]
                  , c = e.httpResponse.body;
                if (u.isEventStream)
                    l = new a,
                    e.data[payload] = r.createEventStream(2 === AWS.HttpClient.streamsApiVersion ? e.httpResponse.stream : c, l, u);
                else if ("structure" === u.type || "list" === u.type) {
                    var l = new a;
                    e.data[s.payload] = l.parse(c, u)
                } else
                    "binary" === u.type || u.isStreaming ? e.data[s.payload] = c : e.data[s.payload] = u.toType(c)
            } else {
                var h = e.data;
                o.extractData(e),
                e.data = r.merge(h, e.data)
            }
        }
    }
}
, function(e, t, n) {
    var r = n(0)
      , i = n(2)
      , o = n(14);
    e.exports = {
        buildRequest: function(e) {
            o.buildRequest(e),
            ["GET", "HEAD"].indexOf(e.httpRequest.method) < 0 && function(e) {
                var t = e.service.api.operations[e.operation].input
                  , n = new r.XML.Builder
                  , o = e.params
                  , s = t.payload;
                if (s) {
                    var a = t.members[s];
                    if (void 0 === (o = o[s]))
                        return;
                    if ("structure" === a.type) {
                        var u = a.name;
                        e.httpRequest.body = n.toXML(o, a, u, !0)
                    } else
                        e.httpRequest.body = o
                } else
                    e.httpRequest.body = n.toXML(o, t, t.name || t.shape || i.string.upperFirst(e.operation) + "Request")
            }(e)
        },
        extractError: function(e) {
            var t;
            o.extractError(e);
            try {
                t = (new r.XML.Parser).parse(e.httpResponse.body.toString())
            } catch (n) {
                t = {
                    Code: e.httpResponse.statusCode,
                    Message: e.httpResponse.statusMessage
                }
            }
            t.Errors && (t = t.Errors),
            t.Error && (t = t.Error),
            t.Code ? e.error = i.error(new Error, {
                code: t.Code,
                message: t.Message
            }) : e.error = i.error(new Error, {
                code: e.httpResponse.statusCode,
                message: null
            })
        },
        extractData: function(e) {
            var t;
            o.extractData(e);
            var n = e.request
              , s = e.httpResponse.body
              , a = n.service.api.operations[n.operation]
              , u = a.output
              , c = (a.hasEventOutput,
            u.payload);
            if (c) {
                var l = u.members[c];
                l.isEventStream ? (t = new r.XML.Parser,
                e.data[c] = i.createEventStream(2 === r.HttpClient.streamsApiVersion ? e.httpResponse.stream : e.httpResponse.body, t, l)) : "structure" === l.type ? (t = new r.XML.Parser,
                e.data[c] = t.parse(s.toString(), l)) : "binary" === l.type || l.isStreaming ? e.data[c] = s : e.data[c] = l.toType(s)
            } else if (s.length > 0) {
                var h = (t = new r.XML.Parser).parse(s.toString(), u);
                i.update(e.data, h)
            }
        }
    }
}
, function(e, t, n) {
    var r = n(28)
      , i = n(32)
      , o = n(11)
      , s = n(33)
      , a = n(34)
      , u = n(2)
      , c = u.property
      , l = u.memoizedProperty;
    e.exports = function(e, t) {
        var n = this;
        e = e || {},
        (t = t || {}).api = this,
        e.metadata = e.metadata || {},
        c(this, "isApi", !0, !1),
        c(this, "apiVersion", e.metadata.apiVersion),
        c(this, "endpointPrefix", e.metadata.endpointPrefix),
        c(this, "signingName", e.metadata.signingName),
        c(this, "globalEndpoint", e.metadata.globalEndpoint),
        c(this, "signatureVersion", e.metadata.signatureVersion),
        c(this, "jsonVersion", e.metadata.jsonVersion),
        c(this, "targetPrefix", e.metadata.targetPrefix),
        c(this, "protocol", e.metadata.protocol),
        c(this, "timestampFormat", e.metadata.timestampFormat),
        c(this, "xmlNamespaceUri", e.metadata.xmlNamespace),
        c(this, "abbreviation", e.metadata.serviceAbbreviation),
        c(this, "fullName", e.metadata.serviceFullName),
        c(this, "serviceId", e.metadata.serviceId),
        l(this, "className", (function() {
            var t = e.metadata.serviceAbbreviation || e.metadata.serviceFullName;
            return t ? ("ElasticLoadBalancing" === (t = t.replace(/^Amazon|AWS\s*|\(.*|\s+|\W+/g, "")) && (t = "ELB"),
            t) : null
        }
        )),
        c(this, "operations", new r(e.operations,t,(function(e, n) {
            return new i(e,n,t)
        }
        ),u.string.lowerFirst,(function(e, t) {
            !0 === t.endpointoperation && c(n, "endpointOperation", u.string.lowerFirst(e))
        }
        ))),
        c(this, "shapes", new r(e.shapes,t,(function(e, n) {
            return o.create(n, t)
        }
        ))),
        c(this, "paginators", new r(e.paginators,t,(function(e, n) {
            return new s(e,n,t)
        }
        ))),
        c(this, "waiters", new r(e.waiters,t,(function(e, n) {
            return new a(e,n,t)
        }
        ),u.string.lowerFirst)),
        t.documentation && (c(this, "documentation", e.documentation),
        c(this, "documentationUrl", e.documentationUrl))
    }
}
, function(e, t, n) {
    var r = n(11)
      , i = n(2)
      , o = i.property
      , s = i.memoizedProperty;
    e.exports = function(e, t, n) {
        var i = this;
        n = n || {},
        o(this, "name", t.name || e),
        o(this, "api", n.api, !1),
        t.http = t.http || {},
        o(this, "endpoint", t.endpoint),
        o(this, "httpMethod", t.http.method || "POST"),
        o(this, "httpPath", t.http.requestUri || "/"),
        o(this, "authtype", t.authtype || ""),
        o(this, "endpointDiscoveryRequired", t.endpointdiscovery ? t.endpointdiscovery.required ? "REQUIRED" : "OPTIONAL" : "NULL"),
        s(this, "input", (function() {
            return t.input ? r.create(t.input, n) : new r.create({
                type: "structure"
            },n)
        }
        )),
        s(this, "output", (function() {
            return t.output ? r.create(t.output, n) : new r.create({
                type: "structure"
            },n)
        }
        )),
        s(this, "errors", (function() {
            var e = [];
            if (!t.errors)
                return null;
            for (var i = 0; i < t.errors.length; i++)
                e.push(r.create(t.errors[i], n));
            return e
        }
        )),
        s(this, "paginator", (function() {
            return n.api.paginators[e]
        }
        )),
        n.documentation && (o(this, "documentation", t.documentation),
        o(this, "documentationUrl", t.documentationUrl)),
        s(this, "idempotentMembers", (function() {
            var e = []
              , t = i.input
              , n = t.members;
            if (!t.members)
                return e;
            for (var r in n)
                n.hasOwnProperty(r) && !0 === n[r].isIdempotent && e.push(r);
            return e
        }
        )),
        s(this, "hasEventOutput", (function() {
            return function(e) {
                var t = e.members
                  , n = e.payload;
                if (!e.members)
                    return !1;
                if (n) {
                    return t[n].isEventStream
                }
                for (var r in t)
                    if (!t.hasOwnProperty(r) && !0 === t[r].isEventStream)
                        return !0;
                return !1
            }(i.output)
        }
        ))
    }
}
, function(e, t, n) {
    var r = n(2).property;
    e.exports = function(e, t) {
        r(this, "inputToken", t.input_token),
        r(this, "limitKey", t.limit_key),
        r(this, "moreResults", t.more_results),
        r(this, "outputToken", t.output_token),
        r(this, "resultKey", t.result_key)
    }
}
, function(e, t, n) {
    var r = n(2)
      , i = r.property;
    e.exports = function(e, t, n) {
        n = n || {},
        i(this, "name", e),
        i(this, "api", n.api, !1),
        t.operation && i(this, "operation", r.string.lowerFirst(t.operation));
        var o = this;
        ["type", "description", "delay", "maxAttempts", "acceptors"].forEach((function(e) {
            var n = t[e];
            n && i(o, e, n)
        }
        ))
    }
}
, function(e, t, n) {
    var r = n(0);
    r.SequentialExecutor = r.util.inherit({
        constructor: function() {
            this._events = {}
        },
        listeners: function(e) {
            return this._events[e] ? this._events[e].slice(0) : []
        },
        on: function(e, t, n) {
            return this._events[e] ? n ? this._events[e].unshift(t) : this._events[e].push(t) : this._events[e] = [t],
            this
        },
        onAsync: function(e, t, n) {
            return t._isAsync = !0,
            this.on(e, t, n)
        },
        removeListener: function(e, t) {
            var n = this._events[e];
            if (n) {
                for (var r = n.length, i = -1, o = 0; o < r; ++o)
                    n[o] === t && (i = o);
                i > -1 && n.splice(i, 1)
            }
            return this
        },
        removeAllListeners: function(e) {
            return e ? delete this._events[e] : this._events = {},
            this
        },
        emit: function(e, t, n) {
            n || (n = function() {}
            );
            var r = this.listeners(e)
              , i = r.length;
            return this.callListeners(r, t, n),
            i > 0
        },
        callListeners: function(e, t, n, i) {
            var o = this
              , s = i || null;
            function a(i) {
                if (i && (s = r.util.error(s || new Error, i),
                o._haltHandlersOnError))
                    return n.call(o, s);
                o.callListeners(e, t, n, s)
            }
            for (; e.length > 0; ) {
                var u = e.shift();
                if (u._isAsync)
                    return void u.apply(o, t.concat([a]));
                try {
                    u.apply(o, t)
                } catch (e) {
                    s = r.util.error(s || new Error, e)
                }
                if (s && o._haltHandlersOnError)
                    return void n.call(o, s)
            }
            n.call(o, s)
        },
        addListeners: function(e) {
            var t = this;
            return e._events && (e = e._events),
            r.util.each(e, (function(e, n) {
                "function" == typeof n && (n = [n]),
                r.util.arrayEach(n, (function(n) {
                    t.on(e, n)
                }
                ))
            }
            )),
            t
        },
        addNamedListener: function(e, t, n, r) {
            return this[e] = n,
            this.addListener(t, n, r),
            this
        },
        addNamedAsyncListener: function(e, t, n, r) {
            return n._isAsync = !0,
            this.addNamedListener(e, t, n, r)
        },
        addNamedListeners: function(e) {
            var t = this;
            return e((function() {
                t.addNamedListener.apply(t, arguments)
            }
            ), (function() {
                t.addNamedAsyncListener.apply(t, arguments)
            }
            )),
            this
        }
    }),
    r.SequentialExecutor.prototype.addListener = r.SequentialExecutor.prototype.on,
    e.exports = r.SequentialExecutor
}
, function(e, t, n) {
    var r = n(0);
    r.Credentials = r.util.inherit({
        constructor: function() {
            if (r.util.hideProperties(this, ["secretAccessKey"]),
            this.expired = !1,
            this.expireTime = null,
            this.refreshCallbacks = [],
            1 === arguments.length && "object" == typeof arguments[0]) {
                var e = arguments[0].credentials || arguments[0];
                this.accessKeyId = e.accessKeyId,
                this.secretAccessKey = e.secretAccessKey,
                this.sessionToken = e.sessionToken
            } else
                this.accessKeyId = arguments[0],
                this.secretAccessKey = arguments[1],
                this.sessionToken = arguments[2]
        },
        expiryWindow: 15,
        needsRefresh: function() {
            var e = r.util.date.getDate().getTime()
              , t = new Date(e + 1e3 * this.expiryWindow);
            return !!(this.expireTime && t > this.expireTime) || (this.expired || !this.accessKeyId || !this.secretAccessKey)
        },
        get: function(e) {
            var t = this;
            this.needsRefresh() ? this.refresh((function(n) {
                n || (t.expired = !1),
                e && e(n)
            }
            )) : e && e()
        },
        refresh: function(e) {
            this.expired = !1,
            e()
        },
        coalesceRefresh: function(e, t) {
            var n = this;
            1 === n.refreshCallbacks.push(e) && n.load((function(e) {
                r.util.arrayEach(n.refreshCallbacks, (function(n) {
                    t ? n(e) : r.util.defer((function() {
                        n(e)
                    }
                    ))
                }
                )),
                n.refreshCallbacks.length = 0
            }
            ))
        },
        load: function(e) {
            e()
        }
    }),
    r.Credentials.addPromisesToClass = function(e) {
        this.prototype.getPromise = r.util.promisifyMethod("get", e),
        this.prototype.refreshPromise = r.util.promisifyMethod("refresh", e)
    }
    ,
    r.Credentials.deletePromisesFromClass = function() {
        delete this.prototype.getPromise,
        delete this.prototype.refreshPromise
    }
    ,
    r.util.addPromises(r.Credentials)
}
, function(e, t, n) {
    var r = n(0);
    r.CredentialProviderChain = r.util.inherit(r.Credentials, {
        constructor: function(e) {
            this.providers = e || r.CredentialProviderChain.defaultProviders.slice(0),
            this.resolveCallbacks = []
        },
        resolve: function(e) {
            var t = this;
            if (0 === t.providers.length)
                return e(new Error("No providers")),
                t;
            if (1 === t.resolveCallbacks.push(e)) {
                var n = 0
                  , i = t.providers.slice(0);
                !function e(o, s) {
                    if (!o && s || n === i.length)
                        return r.util.arrayEach(t.resolveCallbacks, (function(e) {
                            e(o, s)
                        }
                        )),
                        void (t.resolveCallbacks.length = 0);
                    var a = i[n++];
                    (s = "function" == typeof a ? a.call() : a).get ? s.get((function(t) {
                        e(t, t ? null : s)
                    }
                    )) : e(null, s)
                }()
            }
            return t
        }
    }),
    r.CredentialProviderChain.defaultProviders = [],
    r.CredentialProviderChain.addPromisesToClass = function(e) {
        this.prototype.resolvePromise = r.util.promisifyMethod("resolve", e)
    }
    ,
    r.CredentialProviderChain.deletePromisesFromClass = function() {
        delete this.prototype.resolvePromise
    }
    ,
    r.util.addPromises(r.CredentialProviderChain)
}
, function(e, t, n) {
    var r = n(0)
      , i = r.util.inherit;
    r.Endpoint = i({
        constructor: function(e, t) {
            if (r.util.hideProperties(this, ["slashes", "auth", "hash", "search", "query"]),
            null == e)
                throw new Error("Invalid endpoint: " + e);
            if ("string" != typeof e)
                return r.util.copy(e);
            e.match(/^http/) || (e = ((t && void 0 !== t.sslEnabled ? t.sslEnabled : r.config.sslEnabled) ? "https" : "http") + "://" + e);
            r.util.update(this, r.util.urlParse(e)),
            this.port ? this.port = parseInt(this.port, 10) : this.port = "https:" === this.protocol ? 443 : 80
        }
    }),
    r.HttpRequest = i({
        constructor: function(e, t) {
            e = new r.Endpoint(e),
            this.method = "POST",
            this.path = e.path || "/",
            this.headers = {},
            this.body = "",
            this.endpoint = e,
            this.region = t,
            this._userAgent = "",
            this.setUserAgent()
        },
        setUserAgent: function() {
            this._userAgent = this.headers[this.getUserAgentHeaderName()] = r.util.userAgent()
        },
        getUserAgentHeaderName: function() {
            return (r.util.isBrowser() ? "X-Amz-" : "") + "User-Agent"
        },
        appendToUserAgent: function(e) {
            "string" == typeof e && e && (this._userAgent += " " + e),
            this.headers[this.getUserAgentHeaderName()] = this._userAgent
        },
        getUserAgent: function() {
            return this._userAgent
        },
        pathname: function() {
            return this.path.split("?", 1)[0]
        },
        search: function() {
            var e = this.path.split("?", 2)[1];
            return e ? (e = r.util.queryStringParse(e),
            r.util.queryParamsToString(e)) : ""
        },
        updateEndpoint: function(e) {
            var t = new r.Endpoint(e);
            this.endpoint = t,
            this.path = t.path || "/"
        }
    }),
    r.HttpResponse = i({
        constructor: function() {
            this.statusCode = void 0,
            this.headers = {},
            this.body = void 0,
            this.streaming = !1,
            this.stream = null
        },
        createUnbufferedStream: function() {
            return this.streaming = !0,
            this.stream
        }
    }),
    r.HttpClient = i({}),
    r.HttpClient.getInstance = function() {
        return void 0 === this.singleton && (this.singleton = new this),
        this.singleton
    }
}
, function(e, t, n) {
    var r = n(0)
      , i = r.util.inherit;
    r.Signers.V3 = i(r.Signers.RequestSigner, {
        addAuthorization: function(e, t) {
            var n = r.util.date.rfc822(t);
            this.request.headers["X-Amz-Date"] = n,
            e.sessionToken && (this.request.headers["x-amz-security-token"] = e.sessionToken),
            this.request.headers["X-Amzn-Authorization"] = this.authorization(e, n)
        },
        authorization: function(e) {
            return "AWS3 AWSAccessKeyId=" + e.accessKeyId + ",Algorithm=HmacSHA256,SignedHeaders=" + this.signedHeaders() + ",Signature=" + this.signature(e)
        },
        signedHeaders: function() {
            var e = [];
            return r.util.arrayEach(this.headersToSign(), (function(t) {
                e.push(t.toLowerCase())
            }
            )),
            e.sort().join(";")
        },
        canonicalHeaders: function() {
            var e = this.request.headers
              , t = [];
            return r.util.arrayEach(this.headersToSign(), (function(n) {
                t.push(n.toLowerCase().trim() + ":" + String(e[n]).trim())
            }
            )),
            t.sort().join("\n") + "\n"
        },
        headersToSign: function() {
            var e = [];
            return r.util.each(this.request.headers, (function(t) {
                ("Host" === t || "Content-Encoding" === t || t.match(/^X-Amz/i)) && e.push(t)
            }
            )),
            e
        },
        signature: function(e) {
            return r.util.crypto.hmac(e.secretAccessKey, this.stringToSign(), "base64")
        },
        stringToSign: function() {
            var e = [];
            return e.push(this.request.method),
            e.push("/"),
            e.push(""),
            e.push(this.canonicalHeaders()),
            e.push(this.request.body),
            r.util.crypto.sha256(e.join("\n"))
        }
    }),
    e.exports = r.Signers.V3
}
, function(e, t) {
    var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
    if (n) {
        var r = new Uint8Array(16);
        e.exports = function() {
            return n(r),
            r
        }
    } else {
        var i = new Array(16);
        e.exports = function() {
            for (var e, t = 0; t < 16; t++)
                0 == (3 & t) && (e = 4294967296 * Math.random()),
                i[t] = e >>> ((3 & t) << 3) & 255;
            return i
        }
    }
}
, function(e, t) {
    for (var n = [], r = 0; r < 256; ++r)
        n[r] = (r + 256).toString(16).substr(1);
    e.exports = function(e, t) {
        var r = t || 0
          , i = n;
        return [i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]]].join("")
    }
}
, function(e, t, n) {
    "use strict";
    t.decode = t.parse = n(102),
    t.encode = t.stringify = n(103)
}
, function(e, t, n) {
    "use strict";
    e.exports = function(e, t) {
        return function() {
            for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
                n[r] = arguments[r];
            return e.apply(t, n)
        }
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(5);
    function i(e) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }
    e.exports = function(e, t, n) {
        if (!t)
            return e;
        var o;
        if (n)
            o = n(t);
        else if (r.isURLSearchParams(t))
            o = t.toString();
        else {
            var s = [];
            r.forEach(t, (function(e, t) {
                null != e && (r.isArray(e) ? t += "[]" : e = [e],
                r.forEach(e, (function(e) {
                    r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)),
                    s.push(i(t) + "=" + i(e))
                }
                )))
            }
            )),
            o = s.join("&")
        }
        if (o) {
            var a = e.indexOf("#");
            -1 !== a && (e = e.slice(0, a)),
            e += (-1 === e.indexOf("?") ? "?" : "&") + o
        }
        return e
    }
}
, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return !(!e || !e.__CANCEL__)
    }
}
, function(e, t, n) {
    "use strict";
    (function(t) {
        var r = n(5)
          , i = n(133)
          , o = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        function s(e, t) {
            !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
        }
        var a, u = {
            adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== t && "[object process]" === Object.prototype.toString.call(t)) && (a = n(47)),
            a),
            transformRequest: [function(e, t) {
                return i(t, "Accept"),
                i(t, "Content-Type"),
                r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (s(t, "application/x-www-form-urlencoded;charset=utf-8"),
                e.toString()) : r.isObject(e) ? (s(t, "application/json;charset=utf-8"),
                JSON.stringify(e)) : e
            }
            ],
            transformResponse: [function(e) {
                if ("string" == typeof e)
                    try {
                        e = JSON.parse(e)
                    } catch (e) {}
                return e
            }
            ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            validateStatus: function(e) {
                return e >= 200 && e < 300
            }
        };
        u.headers = {
            common: {
                Accept: "application/json, text/plain, */*"
            }
        },
        r.forEach(["delete", "get", "head"], (function(e) {
            u.headers[e] = {}
        }
        )),
        r.forEach(["post", "put", "patch"], (function(e) {
            u.headers[e] = r.merge(o)
        }
        )),
        e.exports = u
    }
    ).call(this, n(7))
}
, function(e, t, n) {
    "use strict";
    var r = n(5)
      , i = n(134)
      , o = n(44)
      , s = n(136)
      , a = n(139)
      , u = n(140)
      , c = n(48);
    e.exports = function(e) {
        return new Promise((function(t, l) {
            var h = e.data
              , f = e.headers;
            r.isFormData(h) && delete f["Content-Type"];
            var d = new XMLHttpRequest;
            if (e.auth) {
                var p = e.auth.username || ""
                  , g = e.auth.password || "";
                f.Authorization = "Basic " + btoa(p + ":" + g)
            }
            var m = s(e.baseURL, e.url);
            if (d.open(e.method.toUpperCase(), o(m, e.params, e.paramsSerializer), !0),
            d.timeout = e.timeout,
            d.onreadystatechange = function() {
                if (d && 4 === d.readyState && (0 !== d.status || d.responseURL && 0 === d.responseURL.indexOf("file:"))) {
                    var n = "getAllResponseHeaders"in d ? a(d.getAllResponseHeaders()) : null
                      , r = {
                        data: e.responseType && "text" !== e.responseType ? d.response : d.responseText,
                        status: d.status,
                        statusText: d.statusText,
                        headers: n,
                        config: e,
                        request: d
                    };
                    i(t, l, r),
                    d = null
                }
            }
            ,
            d.onabort = function() {
                d && (l(c("Request aborted", e, "ECONNABORTED", d)),
                d = null)
            }
            ,
            d.onerror = function() {
                l(c("Network Error", e, null, d)),
                d = null
            }
            ,
            d.ontimeout = function() {
                var t = "timeout of " + e.timeout + "ms exceeded";
                e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                l(c(t, e, "ECONNABORTED", d)),
                d = null
            }
            ,
            r.isStandardBrowserEnv()) {
                var y = n(141)
                  , v = (e.withCredentials || u(m)) && e.xsrfCookieName ? y.read(e.xsrfCookieName) : void 0;
                v && (f[e.xsrfHeaderName] = v)
            }
            if ("setRequestHeader"in d && r.forEach(f, (function(e, t) {
                void 0 === h && "content-type" === t.toLowerCase() ? delete f[t] : d.setRequestHeader(t, e)
            }
            )),
            r.isUndefined(e.withCredentials) || (d.withCredentials = !!e.withCredentials),
            e.responseType)
                try {
                    d.responseType = e.responseType
                } catch (t) {
                    if ("json" !== e.responseType)
                        throw t
                }
            "function" == typeof e.onDownloadProgress && d.addEventListener("progress", e.onDownloadProgress),
            "function" == typeof e.onUploadProgress && d.upload && d.upload.addEventListener("progress", e.onUploadProgress),
            e.cancelToken && e.cancelToken.promise.then((function(e) {
                d && (d.abort(),
                l(e),
                d = null)
            }
            )),
            void 0 === h && (h = null),
            d.send(h)
        }
        ))
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(135);
    e.exports = function(e, t, n, i, o) {
        var s = new Error(e);
        return r(s, t, n, i, o)
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(5);
    e.exports = function(e, t) {
        t = t || {};
        var n = {}
          , i = ["url", "method", "params", "data"]
          , o = ["headers", "auth", "proxy"]
          , s = ["baseURL", "url", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"];
        r.forEach(i, (function(e) {
            void 0 !== t[e] && (n[e] = t[e])
        }
        )),
        r.forEach(o, (function(i) {
            r.isObject(t[i]) ? n[i] = r.deepMerge(e[i], t[i]) : void 0 !== t[i] ? n[i] = t[i] : r.isObject(e[i]) ? n[i] = r.deepMerge(e[i]) : void 0 !== e[i] && (n[i] = e[i])
        }
        )),
        r.forEach(s, (function(r) {
            void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r])
        }
        ));
        var a = i.concat(o).concat(s)
          , u = Object.keys(t).filter((function(e) {
            return -1 === a.indexOf(e)
        }
        ));
        return r.forEach(u, (function(r) {
            void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r])
        }
        )),
        n
    }
}
, function(e, t, n) {
    "use strict";
    function r(e) {
        this.message = e
    }
    r.prototype.toString = function() {
        return "Cancel" + (this.message ? ": " + this.message : "")
    }
    ,
    r.prototype.__CANCEL__ = !0,
    e.exports = r
}
, function(e, t, n) {
    var r;
    e.exports = (r = n(3),
    function() {
        if ("function" == typeof ArrayBuffer) {
            var e = r.lib.WordArray
              , t = e.init;
            (e.init = function(e) {
                if (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
                (e instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array) && (e = new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),
                e instanceof Uint8Array) {
                    for (var n = e.byteLength, r = [], i = 0; i < n; i++)
                        r[i >>> 2] |= e[i] << 24 - i % 4 * 8;
                    t.call(this, r, n)
                } else
                    t.apply(this, arguments)
            }
            ).prototype = e
        }
    }(),
    r.lib.WordArray)
}
, function(e, t, n) {
    e.exports = n(126).Observable
}
, function(e, t, n) {
    "use strict";
    class r extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({
                mode: "open"
            }).innerHTML = '\n            <style>\n                :host {\n                    --header-background: #ffffff;\n                    --body-background: #ffffff;\n                    --footer-background: #ffffff;\n                    --backdrop-color: rgba(128,128,128,0.5);\n                    --dialog-width: 90%;\n                    --dialog-height: auto;\n                    display: block;\n                }\n                \n                @media (min-width: 768px) {\n                  :host {\n                    --dialog-width: 70%;\n                  }\n                }\n                \n                @media (min-width: 1024px) {\n                  :host {\n                    --dialog-width: 40%;\n                  }\n                }\n                \n                @media (min-width: 1200px) {\n                  :host {\n                    --dialog-width: 30%;\n                  }\n                }\n                \n                #backdrop {\n                    position: fixed;\n                    top: 0;\n                    left: 0;\n                    width: 100%;\n                    height: 100%;\n                    background: var(--backdrop-color);\n                    animation-name: fadein;\n                    animation-duration: .2s;\n                    animation-fill-mode: forwards;\n                    animation-timing-function: ease-out;\n                    z-index: 9999;\n                }\n                #modal {\n                    display: grid;\n                    grid-template-rows: 1fr 3fr 1fr;\n                    position: fixed;\n                    top: 50%;\n                    left: 50%;\n                    transform: translate(-50%, -50%);\n                    width: var(--dialog-width);\n                    height: var(--dialog-height);\n                    background: transparent;\n                    animation-name: slidedown;\n                    animation-duration: .2s;\n                    animation-fill-mode: forwards;\n                    animation-timing-function: ease-out;\n                }\n                header {\n                    background: var(--header-background);\n                    display: flex;\n                    align-items: center;\n                    padding: 0 10px;\n                }\n                main {\n                    background: var(--body-background);\n                    padding: 0 10px;\n                }\n                footer {\n                    background: var(--footer-background);\n                    display: flex;\n                    align-items: center;\n                    padding: 0 10px;\n                }\n                ::slotted([slot]) {\n                    margin: 10px;\n                }\n                ::slotted([slot]:empty) {\n                    margin: 0px;\n                }\n                @keyframes fadein {\n                    from {\n                        opacity: 0;\n                    }\n                    to {\n                        opacity: 1;\n                    }\n                }\n                \n                @keyframes slidedown {\n                    from {\n                        transform: translate(-50%, -65%);\n                    }\n                    to {\n                        transform: translate(-50%, -50%);\n                    }\n                }\n                \n                @keyframes fadeout {\n                    from {\n                        opacity: 1;\n                    }\n                    to {\n                        opacity: 0;\n                    }\n                }\n                \n                @keyframes slideup {\n                    from {\n                        transform: translate(-50%, -50%);\n                    }\n                    to {\n                        transform: translate(-50%, -65%);\n                    }\n                }\n                #backdrop.close {\n                    animation-name: fadeout;\n                    animation-duration: .2s;\n                    animation-fill-mode: forwards;\n                    animation-timing-function: ease-out;\n                }\n                #backdrop.close #modal {\n                    animation-name: slideup;\n                    animation-duration: .2s;\n                    animation-fill-mode: forwards;\n                    animation-timing-function: ease-out;\n                }\n                \n            </style>\n            \n            <div id="backdrop">\n                <div id="modal">\n                    <header>\n                        <slot name="header"></slot>\n                    </header>\n                    <main>\n                        <slot name="body"></slot>\n                    </main>\n                    <footer>\n                        <slot name="footer"></slot>\n                    </footer>\n                </div>\n            </div>\n        ',
            this.backdrop = this.shadowRoot.querySelector("#backdrop"),
            this.modal = this.shadowRoot.querySelector("#modal"),
            this.headerSlot = this.shadowRoot.querySelector('slot[name="header"]'),
            this.bodySlot = this.shadowRoot.querySelector('slot[name="body"]'),
            this.footerSlot = this.shadowRoot.querySelector('slot[name="footer"]')
        }
        connectedCallback() {
            this.style.display = "none",
            this.backdrop.addEventListener("click", this.handleClick.bind(this)),
            this.backdrop.addEventListener("animationend", this.handleAnimationEnd.bind(this))
        }
        handleAnimationEnd(e) {
            "fadeout" === e.animationName && (this.style.display = "none",
            this.backdrop.classList.remove("close"))
        }
        handleClick(e) {
            this.hasAttribute("modal") || e.composedPath()[0] !== this.backdrop || this.close()
        }
        open() {
            this.style.display = "block"
        }
        close() {
            this.backdrop.classList.add("close")
        }
        get header() {
            return this.headerSlot.assignedNodes()[0]
        }
        set header(e) {
            const t = this.headerSlot.assignedNodes();
            t.length && (t[0].innerHTML = e)
        }
        get body() {
            return this.bodySlot.assignedNodes()[0]
        }
        set body(e) {
            const t = this.bodySlot.assignedNodes();
            t.length && (t[0].innerHTML = e)
        }
        get footer() {
            return this.footerSlot.assignedNodes()[0]
        }
        set footer(e) {
            const t = this.footerSlot.assignedNodes();
            t.length && (t[0].innerHTML = e)
        }
    }
    customElements.get("material-dialog") || customElements.define("material-dialog", r)
}
, , function(e, t, n) {
    (function(e) {
        var r = void 0 !== e && e || "undefined" != typeof self && self || window
          , i = Function.prototype.apply;
        function o(e, t) {
            this._id = e,
            this._clearFn = t
        }
        t.setTimeout = function() {
            return new o(i.call(setTimeout, r, arguments),clearTimeout)
        }
        ,
        t.setInterval = function() {
            return new o(i.call(setInterval, r, arguments),clearInterval)
        }
        ,
        t.clearTimeout = t.clearInterval = function(e) {
            e && e.close()
        }
        ,
        o.prototype.unref = o.prototype.ref = function() {}
        ,
        o.prototype.close = function() {
            this._clearFn.call(r, this._id)
        }
        ,
        t.enroll = function(e, t) {
            clearTimeout(e._idleTimeoutId),
            e._idleTimeout = t
        }
        ,
        t.unenroll = function(e) {
            clearTimeout(e._idleTimeoutId),
            e._idleTimeout = -1
        }
        ,
        t._unrefActive = t.active = function(e) {
            clearTimeout(e._idleTimeoutId);
            var t = e._idleTimeout;
            t >= 0 && (e._idleTimeoutId = setTimeout((function() {
                e._onTimeout && e._onTimeout()
            }
            ), t))
        }
        ,
        n(56),
        t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate,
        t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
    }
    ).call(this, n(13))
}
, function(e, t, n) {
    (function(e, t) {
        !function(e, n) {
            "use strict";
            if (!e.setImmediate) {
                var r, i, o, s, a, u = 1, c = {}, l = !1, h = e.document, f = Object.getPrototypeOf && Object.getPrototypeOf(e);
                f = f && f.setTimeout ? f : e,
                "[object process]" === {}.toString.call(e.process) ? r = function(e) {
                    t.nextTick((function() {
                        p(e)
                    }
                    ))
                }
                : !function() {
                    if (e.postMessage && !e.importScripts) {
                        var t = !0
                          , n = e.onmessage;
                        return e.onmessage = function() {
                            t = !1
                        }
                        ,
                        e.postMessage("", "*"),
                        e.onmessage = n,
                        t
                    }
                }() ? e.MessageChannel ? ((o = new MessageChannel).port1.onmessage = function(e) {
                    p(e.data)
                }
                ,
                r = function(e) {
                    o.port2.postMessage(e)
                }
                ) : h && "onreadystatechange"in h.createElement("script") ? (i = h.documentElement,
                r = function(e) {
                    var t = h.createElement("script");
                    t.onreadystatechange = function() {
                        p(e),
                        t.onreadystatechange = null,
                        i.removeChild(t),
                        t = null
                    }
                    ,
                    i.appendChild(t)
                }
                ) : r = function(e) {
                    setTimeout(p, 0, e)
                }
                : (s = "setImmediate$" + Math.random() + "$",
                a = function(t) {
                    t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(s) && p(+t.data.slice(s.length))
                }
                ,
                e.addEventListener ? e.addEventListener("message", a, !1) : e.attachEvent("onmessage", a),
                r = function(t) {
                    e.postMessage(s + t, "*")
                }
                ),
                f.setImmediate = function(e) {
                    "function" != typeof e && (e = new Function("" + e));
                    for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++)
                        t[n] = arguments[n + 1];
                    var i = {
                        callback: e,
                        args: t
                    };
                    return c[u] = i,
                    r(u),
                    u++
                }
                ,
                f.clearImmediate = d
            }
            function d(e) {
                delete c[e]
            }
            function p(e) {
                if (l)
                    setTimeout(p, 0, e);
                else {
                    var t = c[e];
                    if (t) {
                        l = !0;
                        try {
                            !function(e) {
                                var t = e.callback
                                  , n = e.args;
                                switch (n.length) {
                                case 0:
                                    t();
                                    break;
                                case 1:
                                    t(n[0]);
                                    break;
                                case 2:
                                    t(n[0], n[1]);
                                    break;
                                case 3:
                                    t(n[0], n[1], n[2]);
                                    break;
                                default:
                                    t.apply(void 0, n)
                                }
                            }(t)
                        } finally {
                            d(e),
                            l = !1
                        }
                    }
                }
            }
        }("undefined" == typeof self ? void 0 === e ? this : e : self)
    }
    ).call(this, n(13), n(7))
}
, function(e, t, n) {
    var r = n(2);
    function i() {}
    function o(e) {
        return e.isQueryName || "ec2" !== e.api.protocol ? e.name : e.name[0].toUpperCase() + e.name.substr(1)
    }
    function s(e, t, n, i) {
        r.each(n.members, (function(n, r) {
            var s = t[n];
            if (null != s) {
                var u = o(r);
                a(u = e ? e + "." + u : u, s, r, i)
            }
        }
        ))
    }
    function a(e, t, n, i) {
        null != t && ("structure" === n.type ? s(e, t, n, i) : "list" === n.type ? function(e, t, n, i) {
            var s = n.member || {};
            0 !== t.length ? r.arrayEach(t, (function(t, r) {
                var u = "." + (r + 1);
                if ("ec2" === n.api.protocol)
                    u += "";
                else if (n.flattened) {
                    if (s.name) {
                        var c = e.split(".");
                        c.pop(),
                        c.push(o(s)),
                        e = c.join(".")
                    }
                } else
                    u = "." + (s.name ? s.name : "member") + u;
                a(e + u, t, s, i)
            }
            )) : i.call(this, e, null)
        }(e, t, n, i) : "map" === n.type ? function(e, t, n, i) {
            var o = 1;
            r.each(t, (function(t, r) {
                var s = (n.flattened ? "." : ".entry.") + o++ + "."
                  , u = s + (n.key.name || "key")
                  , c = s + (n.value.name || "value");
                a(e + u, t, n.key, i),
                a(e + c, r, n.value, i)
            }
            ))
        }(e, t, n, i) : i(e, n.toWireFormat(t).toString()))
    }
    i.prototype.serialize = function(e, t, n) {
        s("", e, t, n)
    }
    ,
    e.exports = i
}
, function(e, t, n) {
    var r = n(2)
      , i = n(59).XmlNode
      , o = n(61).XmlText;
    function s() {}
    function a(e, t, n) {
        switch (n.type) {
        case "structure":
            return function(e, t, n) {
                r.arrayEach(n.memberNames, (function(r) {
                    var o = n.members[r];
                    if ("body" === o.location) {
                        var s = t[r]
                          , c = o.name;
                        if (null != s)
                            if (o.isXmlAttribute)
                                e.addAttribute(c, s);
                            else if (o.flattened)
                                a(e, s, o);
                            else {
                                var l = new i(c);
                                e.addChildNode(l),
                                u(l, o),
                                a(l, s, o)
                            }
                    }
                }
                ))
            }(e, t, n);
        case "map":
            return function(e, t, n) {
                var o = n.key.name || "key"
                  , s = n.value.name || "value";
                r.each(t, (function(t, r) {
                    var u = new i(n.flattened ? n.name : "entry");
                    e.addChildNode(u);
                    var c = new i(o)
                      , l = new i(s);
                    u.addChildNode(c),
                    u.addChildNode(l),
                    a(c, t, n.key),
                    a(l, r, n.value)
                }
                ))
            }(e, t, n);
        case "list":
            return function(e, t, n) {
                n.flattened ? r.arrayEach(t, (function(t) {
                    var r = n.member.name || n.name
                      , o = new i(r);
                    e.addChildNode(o),
                    a(o, t, n.member)
                }
                )) : r.arrayEach(t, (function(t) {
                    var r = n.member.name || "member"
                      , o = new i(r);
                    e.addChildNode(o),
                    a(o, t, n.member)
                }
                ))
            }(e, t, n);
        default:
            return function(e, t, n) {
                e.addChildNode(new o(n.toWireFormat(t)))
            }(e, t, n)
        }
    }
    function u(e, t, n) {
        var r, i = "xmlns";
        t.xmlNamespaceUri ? (r = t.xmlNamespaceUri,
        t.xmlNamespacePrefix && (i += ":" + t.xmlNamespacePrefix)) : n && t.api.xmlNamespaceUri && (r = t.api.xmlNamespaceUri),
        r && e.addAttribute(i, r)
    }
    s.prototype.toXML = function(e, t, n, r) {
        var o = new i(n);
        return u(o, t, !0),
        a(o, e, t),
        o.children.length > 0 || r ? o.toString() : ""
    }
    ,
    e.exports = s
}
, function(e, t, n) {
    var r = n(60).escapeAttribute;
    function i(e, t) {
        void 0 === t && (t = []),
        this.name = e,
        this.children = t,
        this.attributes = {}
    }
    i.prototype.addAttribute = function(e, t) {
        return this.attributes[e] = t,
        this
    }
    ,
    i.prototype.addChildNode = function(e) {
        return this.children.push(e),
        this
    }
    ,
    i.prototype.removeAttribute = function(e) {
        return delete this.attributes[e],
        this
    }
    ,
    i.prototype.toString = function() {
        for (var e = Boolean(this.children.length), t = "<" + this.name, n = this.attributes, i = 0, o = Object.keys(n); i < o.length; i++) {
            var s = o[i]
              , a = n[s];
            null != a && (t += " " + s + '="' + r("" + a) + '"')
        }
        return t + (e ? ">" + this.children.map((function(e) {
            return e.toString()
        }
        )).join("") + "</" + this.name + ">" : "/>")
    }
    ,
    e.exports = {
        XmlNode: i
    }
}
, function(e, t) {
    e.exports = {
        escapeAttribute: function(e) {
            return e.replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }
    }
}
, function(e, t, n) {
    var r = n(62).escapeElement;
    function i(e) {
        this.value = e
    }
    i.prototype.toString = function() {
        return r("" + this.value)
    }
    ,
    e.exports = {
        XmlText: i
    }
}
, function(e, t) {
    e.exports = {
        escapeElement: function(e) {
            return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
    }
}
, function(e, t) {
    function n(e, t) {
        if (!n.services.hasOwnProperty(e))
            throw new Error("InvalidService: Failed to load api for " + e);
        return n.services[e][t]
    }
    n.services = {},
    e.exports = n
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(65)
      , i = function() {
        function e(e) {
            void 0 === e && (e = 1e3),
            this.maxSize = e,
            this.cache = new r.LRUCache(e)
        }
        return Object.defineProperty(e.prototype, "size", {
            get: function() {
                return this.cache.length
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.put = function(t, n) {
            var r = "string" != typeof t ? e.getKeyString(t) : t
              , i = this.populateValue(n);
            this.cache.put(r, i)
        }
        ,
        e.prototype.get = function(t) {
            var n = "string" != typeof t ? e.getKeyString(t) : t
              , r = Date.now()
              , i = this.cache.get(n);
            if (i)
                for (var o = 0; o < i.length; o++) {
                    if (i[o].Expire < r)
                        return void this.cache.remove(n)
                }
            return i
        }
        ,
        e.getKeyString = function(e) {
            for (var t = [], n = Object.keys(e).sort(), r = 0; r < n.length; r++) {
                var i = n[r];
                void 0 !== e[i] && t.push(e[i])
            }
            return t.join(" ")
        }
        ,
        e.prototype.populateValue = function(e) {
            var t = Date.now();
            return e.map((function(e) {
                return {
                    Address: e.Address || "",
                    Expire: t + 60 * (e.CachePeriodInMinutes || 1) * 1e3
                }
            }
            ))
        }
        ,
        e.prototype.empty = function() {
            this.cache.empty()
        }
        ,
        e.prototype.remove = function(t) {
            var n = "string" != typeof t ? e.getKeyString(t) : t;
            this.cache.remove(n)
        }
        ,
        e
    }();
    t.EndpointCache = i
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(e, t) {
        this.key = e,
        this.value = t
    }
      , i = function() {
        function e(e) {
            if (this.nodeMap = {},
            this.size = 0,
            "number" != typeof e || e < 1)
                throw new Error("Cache size can only be positive number");
            this.sizeLimit = e
        }
        return Object.defineProperty(e.prototype, "length", {
            get: function() {
                return this.size
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.prependToList = function(e) {
            this.headerNode ? (this.headerNode.prev = e,
            e.next = this.headerNode) : this.tailNode = e,
            this.headerNode = e,
            this.size++
        }
        ,
        e.prototype.removeFromTail = function() {
            if (this.tailNode) {
                var e = this.tailNode
                  , t = e.prev;
                return t && (t.next = void 0),
                e.prev = void 0,
                this.tailNode = t,
                this.size--,
                e
            }
        }
        ,
        e.prototype.detachFromList = function(e) {
            this.headerNode === e && (this.headerNode = e.next),
            this.tailNode === e && (this.tailNode = e.prev),
            e.prev && (e.prev.next = e.next),
            e.next && (e.next.prev = e.prev),
            e.next = void 0,
            e.prev = void 0,
            this.size--
        }
        ,
        e.prototype.get = function(e) {
            if (this.nodeMap[e]) {
                var t = this.nodeMap[e];
                return this.detachFromList(t),
                this.prependToList(t),
                t.value
            }
        }
        ,
        e.prototype.remove = function(e) {
            if (this.nodeMap[e]) {
                var t = this.nodeMap[e];
                this.detachFromList(t),
                delete this.nodeMap[e]
            }
        }
        ,
        e.prototype.put = function(e, t) {
            if (this.nodeMap[e])
                this.remove(e);
            else if (this.size === this.sizeLimit) {
                var n = this.removeFromTail().key;
                delete this.nodeMap[n]
            }
            var i = new r(e,t);
            this.nodeMap[e] = i,
            this.prependToList(i)
        }
        ,
        e.prototype.empty = function() {
            for (var e = Object.keys(this.nodeMap), t = 0; t < e.length; t++) {
                var n = e[t]
                  , r = this.nodeMap[n];
                this.detachFromList(r),
                delete this.nodeMap[n]
            }
        }
        ,
        e
    }();
    t.LRUCache = i
}
, function(e, t, n) {
    (function(t) {
        var r = n(0)
          , i = n(31)
          , o = n(67)
          , s = r.util.inherit
          , a = 0;
        r.Service = s({
            constructor: function(e) {
                if (!this.loadServiceClass)
                    throw r.util.error(new Error, "Service must be constructed with `new' operator");
                var t = this.loadServiceClass(e || {});
                if (t) {
                    var n = r.util.copy(e)
                      , i = new t(e);
                    return Object.defineProperty(i, "_originalConfig", {
                        get: function() {
                            return n
                        },
                        enumerable: !1,
                        configurable: !0
                    }),
                    i._clientId = ++a,
                    i
                }
                this.initialize(e)
            },
            initialize: function(e) {
                var n = r.config[this.serviceIdentifier];
                if (this.config = new r.Config(r.config),
                n && this.config.update(n, !0),
                e && this.config.update(e, !0),
                this.validateService(),
                this.config.endpoint || o(this),
                this.config.endpoint = this.endpointFromTemplate(this.config.endpoint),
                this.setEndpoint(this.config.endpoint),
                r.SequentialExecutor.call(this),
                r.Service.addDefaultMonitoringListeners(this),
                (this.config.clientSideMonitoring || r.Service._clientSideMonitoring) && this.publisher) {
                    var i = this.publisher;
                    this.addNamedListener("PUBLISH_API_CALL", "apiCall", (function(e) {
                        t.nextTick((function() {
                            i.eventHandler(e)
                        }
                        ))
                    }
                    )),
                    this.addNamedListener("PUBLISH_API_ATTEMPT", "apiCallAttempt", (function(e) {
                        t.nextTick((function() {
                            i.eventHandler(e)
                        }
                        ))
                    }
                    ))
                }
            },
            validateService: function() {},
            loadServiceClass: function(e) {
                var t = e;
                if (r.util.isEmpty(this.api)) {
                    if (t.apiConfig)
                        return r.Service.defineServiceApi(this.constructor, t.apiConfig);
                    if (this.constructor.services) {
                        (t = new r.Config(r.config)).update(e, !0);
                        var n = t.apiVersions[this.constructor.serviceIdentifier];
                        return n = n || t.apiVersion,
                        this.getLatestServiceClass(n)
                    }
                    return null
                }
                return null
            },
            getLatestServiceClass: function(e) {
                return e = this.getLatestServiceVersion(e),
                null === this.constructor.services[e] && r.Service.defineServiceApi(this.constructor, e),
                this.constructor.services[e]
            },
            getLatestServiceVersion: function(e) {
                if (!this.constructor.services || 0 === this.constructor.services.length)
                    throw new Error("No services defined on " + this.constructor.serviceIdentifier);
                if (e ? r.util.isType(e, Date) && (e = r.util.date.iso8601(e).split("T")[0]) : e = "latest",
                Object.hasOwnProperty(this.constructor.services, e))
                    return e;
                for (var t = Object.keys(this.constructor.services).sort(), n = null, i = t.length - 1; i >= 0; i--)
                    if ("*" !== t[i][t[i].length - 1] && (n = t[i]),
                    t[i].substr(0, 10) <= e)
                        return n;
                throw new Error("Could not find " + this.constructor.serviceIdentifier + " API to satisfy version constraint `" + e + "'")
            },
            api: {},
            defaultRetryCount: 3,
            customizeRequests: function(e) {
                if (e) {
                    if ("function" != typeof e)
                        throw new Error("Invalid callback type '" + typeof e + "' provided in customizeRequests");
                    this.customRequestHandler = e
                } else
                    this.customRequestHandler = null
            },
            makeRequest: function(e, t, n) {
                if ("function" == typeof t && (n = t,
                t = null),
                t = t || {},
                this.config.params) {
                    var i = this.api.operations[e];
                    i && (t = r.util.copy(t),
                    r.util.each(this.config.params, (function(e, n) {
                        i.input.members[e] && (void 0 !== t[e] && null !== t[e] || (t[e] = n))
                    }
                    )))
                }
                var o = new r.Request(this,e,t);
                return this.addAllRequestListeners(o),
                this.attachMonitoringEmitter(o),
                n && o.send(n),
                o
            },
            makeUnauthenticatedRequest: function(e, t, n) {
                "function" == typeof t && (n = t,
                t = {});
                var r = this.makeRequest(e, t).toUnauthenticated();
                return n ? r.send(n) : r
            },
            waitFor: function(e, t, n) {
                return new r.ResourceWaiter(this,e).wait(t, n)
            },
            addAllRequestListeners: function(e) {
                for (var t = [r.events, r.EventListeners.Core, this.serviceInterface(), r.EventListeners.CorePost], n = 0; n < t.length; n++)
                    t[n] && e.addListeners(t[n]);
                this.config.paramValidation || e.removeListener("validate", r.EventListeners.Core.VALIDATE_PARAMETERS),
                this.config.logger && e.addListeners(r.EventListeners.Logger),
                this.setupRequestListeners(e),
                "function" == typeof this.constructor.prototype.customRequestHandler && this.constructor.prototype.customRequestHandler(e),
                Object.prototype.hasOwnProperty.call(this, "customRequestHandler") && "function" == typeof this.customRequestHandler && this.customRequestHandler(e)
            },
            apiCallEvent: function(e) {
                var t = e.service.api.operations[e.operation]
                  , n = {
                    Type: "ApiCall",
                    Api: t ? t.name : e.operation,
                    Version: 1,
                    Service: e.service.api.serviceId || e.service.api.endpointPrefix,
                    Region: e.httpRequest.region,
                    MaxRetriesExceeded: 0,
                    UserAgent: e.httpRequest.getUserAgent()
                }
                  , r = e.response;
                if (r.httpResponse.statusCode && (n.FinalHttpStatusCode = r.httpResponse.statusCode),
                r.error) {
                    var i = r.error;
                    r.httpResponse.statusCode > 299 ? (i.code && (n.FinalAwsException = i.code),
                    i.message && (n.FinalAwsExceptionMessage = i.message)) : ((i.code || i.name) && (n.FinalSdkException = i.code || i.name),
                    i.message && (n.FinalSdkExceptionMessage = i.message))
                }
                return n
            },
            apiAttemptEvent: function(e) {
                var t = e.service.api.operations[e.operation]
                  , n = {
                    Type: "ApiCallAttempt",
                    Api: t ? t.name : e.operation,
                    Version: 1,
                    Service: e.service.api.serviceId || e.service.api.endpointPrefix,
                    Fqdn: e.httpRequest.endpoint.hostname,
                    UserAgent: e.httpRequest.getUserAgent()
                }
                  , r = e.response;
                return r.httpResponse.statusCode && (n.HttpStatusCode = r.httpResponse.statusCode),
                !e._unAuthenticated && e.service.config.credentials && e.service.config.credentials.accessKeyId && (n.AccessKey = e.service.config.credentials.accessKeyId),
                r.httpResponse.headers ? (e.httpRequest.headers["x-amz-security-token"] && (n.SessionToken = e.httpRequest.headers["x-amz-security-token"]),
                r.httpResponse.headers["x-amzn-requestid"] && (n.XAmznRequestId = r.httpResponse.headers["x-amzn-requestid"]),
                r.httpResponse.headers["x-amz-request-id"] && (n.XAmzRequestId = r.httpResponse.headers["x-amz-request-id"]),
                r.httpResponse.headers["x-amz-id-2"] && (n.XAmzId2 = r.httpResponse.headers["x-amz-id-2"]),
                n) : n
            },
            attemptFailEvent: function(e) {
                var t = this.apiAttemptEvent(e)
                  , n = e.response
                  , r = n.error;
                return n.httpResponse.statusCode > 299 ? (r.code && (t.AwsException = r.code),
                r.message && (t.AwsExceptionMessage = r.message)) : ((r.code || r.name) && (t.SdkException = r.code || r.name),
                r.message && (t.SdkExceptionMessage = r.message)),
                t
            },
            attachMonitoringEmitter: function(e) {
                var t, n, i, o, s, a, u = 0, c = this;
                e.on("validate", (function() {
                    o = r.util.realClock.now(),
                    a = Date.now()
                }
                ), !0),
                e.on("sign", (function() {
                    n = r.util.realClock.now(),
                    t = Date.now(),
                    s = e.httpRequest.region,
                    u++
                }
                ), !0),
                e.on("validateResponse", (function() {
                    i = Math.round(r.util.realClock.now() - n)
                }
                )),
                e.addNamedListener("API_CALL_ATTEMPT", "success", (function() {
                    var n = c.apiAttemptEvent(e);
                    n.Timestamp = t,
                    n.AttemptLatency = i >= 0 ? i : 0,
                    n.Region = s,
                    c.emit("apiCallAttempt", [n])
                }
                )),
                e.addNamedListener("API_CALL_ATTEMPT_RETRY", "retry", (function() {
                    var o = c.attemptFailEvent(e);
                    o.Timestamp = t,
                    i = i || Math.round(r.util.realClock.now() - n),
                    o.AttemptLatency = i >= 0 ? i : 0,
                    o.Region = s,
                    c.emit("apiCallAttempt", [o])
                }
                )),
                e.addNamedListener("API_CALL", "complete", (function() {
                    var t = c.apiCallEvent(e);
                    if (t.AttemptCount = u,
                    !(t.AttemptCount <= 0)) {
                        t.Timestamp = a;
                        var n = Math.round(r.util.realClock.now() - o);
                        t.Latency = n >= 0 ? n : 0;
                        var i = e.response;
                        "number" == typeof i.retryCount && "number" == typeof i.maxRetries && i.retryCount >= i.maxRetries && (t.MaxRetriesExceeded = 1),
                        c.emit("apiCall", [t])
                    }
                }
                ))
            },
            setupRequestListeners: function(e) {},
            getSignerClass: function(e) {
                var t, n = null, i = "";
                e && (i = (n = (e.service.api.operations || {})[e.operation] || null) ? n.authtype : "");
                return t = this.config.signatureVersion ? this.config.signatureVersion : "v4" === i || "v4-unsigned-body" === i ? "v4" : this.api.signatureVersion,
                r.Signers.RequestSigner.getVersion(t)
            },
            serviceInterface: function() {
                switch (this.api.protocol) {
                case "ec2":
                case "query":
                    return r.EventListeners.Query;
                case "json":
                    return r.EventListeners.Json;
                case "rest-json":
                    return r.EventListeners.RestJson;
                case "rest-xml":
                    return r.EventListeners.RestXml
                }
                if (this.api.protocol)
                    throw new Error("Invalid service `protocol' " + this.api.protocol + " in API config")
            },
            successfulResponse: function(e) {
                return e.httpResponse.statusCode < 300
            },
            numRetries: function() {
                return void 0 !== this.config.maxRetries ? this.config.maxRetries : this.defaultRetryCount
            },
            retryDelays: function(e) {
                return r.util.calculateRetryDelay(e, this.config.retryDelayOptions)
            },
            retryableError: function(e) {
                return !!this.timeoutError(e) || (!!this.networkingError(e) || (!!this.expiredCredentialsError(e) || (!!this.throttledError(e) || e.statusCode >= 500)))
            },
            networkingError: function(e) {
                return "NetworkingError" === e.code
            },
            timeoutError: function(e) {
                return "TimeoutError" === e.code
            },
            expiredCredentialsError: function(e) {
                return "ExpiredTokenException" === e.code
            },
            clockSkewError: function(e) {
                switch (e.code) {
                case "RequestTimeTooSkewed":
                case "RequestExpired":
                case "InvalidSignatureException":
                case "SignatureDoesNotMatch":
                case "AuthFailure":
                case "RequestInTheFuture":
                    return !0;
                default:
                    return !1
                }
            },
            getSkewCorrectedDate: function() {
                return new Date(Date.now() + this.config.systemClockOffset)
            },
            applyClockOffset: function(e) {
                e && (this.config.systemClockOffset = e - Date.now())
            },
            isClockSkewed: function(e) {
                if (e)
                    return Math.abs(this.getSkewCorrectedDate().getTime() - e) >= 3e4
            },
            throttledError: function(e) {
                switch (e.code) {
                case "ProvisionedThroughputExceededException":
                case "Throttling":
                case "ThrottlingException":
                case "RequestLimitExceeded":
                case "RequestThrottled":
                case "RequestThrottledException":
                case "TooManyRequestsException":
                case "TransactionInProgressException":
                    return !0;
                default:
                    return !1
                }
            },
            endpointFromTemplate: function(e) {
                if ("string" != typeof e)
                    return e;
                var t = e;
                return t = (t = (t = t.replace(/\{service\}/g, this.api.endpointPrefix)).replace(/\{region\}/g, this.config.region)).replace(/\{scheme\}/g, this.config.sslEnabled ? "https" : "http")
            },
            setEndpoint: function(e) {
                this.endpoint = new r.Endpoint(e,this.config)
            },
            paginationConfig: function(e, t) {
                var n = this.api.operations[e].paginator;
                if (!n) {
                    if (t) {
                        var i = new Error;
                        throw r.util.error(i, "No pagination configuration for " + e)
                    }
                    return null
                }
                return n
            }
        }),
        r.util.update(r.Service, {
            defineMethods: function(e) {
                r.util.each(e.prototype.api.operations, (function(t) {
                    e.prototype[t] || ("none" === e.prototype.api.operations[t].authtype ? e.prototype[t] = function(e, n) {
                        return this.makeUnauthenticatedRequest(t, e, n)
                    }
                    : e.prototype[t] = function(e, n) {
                        return this.makeRequest(t, e, n)
                    }
                    )
                }
                ))
            },
            defineService: function(e, t, n) {
                r.Service._serviceMap[e] = !0,
                Array.isArray(t) || (n = t,
                t = []);
                var i = s(r.Service, n || {});
                if ("string" == typeof e) {
                    r.Service.addVersions(i, t);
                    var o = i.serviceIdentifier || e;
                    i.serviceIdentifier = o
                } else
                    i.prototype.api = e,
                    r.Service.defineMethods(i);
                if (r.SequentialExecutor.call(this.prototype),
                !this.prototype.publisher && r.util.clientSideMonitoring) {
                    var a = r.util.clientSideMonitoring.Publisher
                      , u = (0,
                    r.util.clientSideMonitoring.configProvider)();
                    this.prototype.publisher = new a(u),
                    u.enabled && (r.Service._clientSideMonitoring = !0)
                }
                return r.SequentialExecutor.call(i.prototype),
                r.Service.addDefaultMonitoringListeners(i.prototype),
                i
            },
            addVersions: function(e, t) {
                Array.isArray(t) || (t = [t]),
                e.services = e.services || {};
                for (var n = 0; n < t.length; n++)
                    void 0 === e.services[t[n]] && (e.services[t[n]] = null);
                e.apiVersions = Object.keys(e.services).sort()
            },
            defineServiceApi: function(e, t, n) {
                var o = s(e, {
                    serviceIdentifier: e.serviceIdentifier
                });
                function a(e) {
                    e.isApi ? o.prototype.api = e : o.prototype.api = new i(e)
                }
                if ("string" == typeof t) {
                    if (n)
                        a(n);
                    else
                        try {
                            a(r.apiLoader(e.serviceIdentifier, t))
                        } catch (n) {
                            throw r.util.error(n, {
                                message: "Could not find API configuration " + e.serviceIdentifier + "-" + t
                            })
                        }
                    Object.prototype.hasOwnProperty.call(e.services, t) || (e.apiVersions = e.apiVersions.concat(t).sort()),
                    e.services[t] = o
                } else
                    a(t);
                return r.Service.defineMethods(o),
                o
            },
            hasService: function(e) {
                return Object.prototype.hasOwnProperty.call(r.Service._serviceMap, e)
            },
            addDefaultMonitoringListeners: function(e) {
                e.addNamedListener("MONITOR_EVENTS_BUBBLE", "apiCallAttempt", (function(t) {
                    var n = Object.getPrototypeOf(e);
                    n._events && n.emit("apiCallAttempt", [t])
                }
                )),
                e.addNamedListener("CALL_EVENTS_BUBBLE", "apiCall", (function(t) {
                    var n = Object.getPrototypeOf(e);
                    n._events && n.emit("apiCall", [t])
                }
                ))
            },
            _serviceMap: {}
        }),
        r.util.mixin(r.Service, r.SequentialExecutor),
        e.exports = r.Service
    }
    ).call(this, n(7))
}
, function(e, t, n) {
    var r = n(2)
      , i = n(68);
    function o(e, t) {
        r.each(t, (function(t, n) {
            "globalEndpoint" !== t && (void 0 !== e.config[t] && null !== e.config[t] || (e.config[t] = n))
        }
        ))
    }
    e.exports = function(e) {
        for (var t = function(e) {
            var t = e.config.region
              , n = function(e) {
                if (!e)
                    return null;
                var t = e.split("-");
                return t.length < 3 ? null : t.slice(0, t.length - 2).join("-") + "-*"
            }(t)
              , r = e.api.endpointPrefix;
            return [[t, r], [n, r], [t, "*"], [n, "*"], ["*", r], ["*", "*"]].map((function(e) {
                return e[0] && e[1] ? e.join("/") : null
            }
            ))
        }(e), n = 0; n < t.length; n++) {
            var s = t[n];
            if (s && Object.prototype.hasOwnProperty.call(i.rules, s)) {
                var a = i.rules[s];
                return "string" == typeof a && (a = i.patterns[a]),
                e.config.useDualstack && r.isDualstackAvailable(e) && ((a = r.copy(a)).endpoint = "{service}.dualstack.{region}.amazonaws.com"),
                e.isGlobalEndpoint = !!a.globalEndpoint,
                a.signatureVersion || (a.signatureVersion = "v4"),
                void o(e, a)
            }
        }
    }
}
, function(e) {
    e.exports = JSON.parse('{"rules":{"*/*":{"endpoint":"{service}.{region}.amazonaws.com"},"cn-*/*":{"endpoint":"{service}.{region}.amazonaws.com.cn"},"*/budgets":"globalSSL","*/cloudfront":"globalSSL","*/iam":"globalSSL","*/sts":"globalSSL","*/importexport":{"endpoint":"{service}.amazonaws.com","signatureVersion":"v2","globalEndpoint":true},"*/route53":{"endpoint":"https://{service}.amazonaws.com","signatureVersion":"v3https","globalEndpoint":true},"*/waf":"globalSSL","us-gov-*/iam":"globalGovCloud","us-gov-*/sts":{"endpoint":"{service}.{region}.amazonaws.com"},"us-gov-west-1/s3":"s3signature","us-west-1/s3":"s3signature","us-west-2/s3":"s3signature","eu-west-1/s3":"s3signature","ap-southeast-1/s3":"s3signature","ap-southeast-2/s3":"s3signature","ap-northeast-1/s3":"s3signature","sa-east-1/s3":"s3signature","us-east-1/s3":{"endpoint":"{service}.amazonaws.com","signatureVersion":"s3"},"us-east-1/sdb":{"endpoint":"{service}.amazonaws.com","signatureVersion":"v2"},"*/sdb":{"endpoint":"{service}.{region}.amazonaws.com","signatureVersion":"v2"}},"patterns":{"globalSSL":{"endpoint":"https://{service}.amazonaws.com","globalEndpoint":true},"globalGovCloud":{"endpoint":"{service}.us-gov.amazonaws.com"},"s3signature":{"endpoint":"{service}.{region}.amazonaws.com","signatureVersion":"s3"}}}')
}
, function(e, t, n) {
    var r, i = n(0);
    n(36),
    n(37),
    i.Config = i.util.inherit({
        constructor: function(e) {
            void 0 === e && (e = {}),
            e = this.extractCredentials(e),
            i.util.each.call(this, this.keys, (function(t, n) {
                this.set(t, e[t], n)
            }
            ))
        },
        getCredentials: function(e) {
            var t, n = this;
            function r(t) {
                e(t, t ? null : n.credentials)
            }
            function o(e, t) {
                return new i.util.error(t || new Error,{
                    code: "CredentialsError",
                    message: e,
                    name: "CredentialsError"
                })
            }
            n.credentials ? "function" == typeof n.credentials.get ? n.credentials.get((function(e) {
                e && (e = o("Could not load credentials from " + n.credentials.constructor.name, e)),
                r(e)
            }
            )) : (t = null,
            n.credentials.accessKeyId && n.credentials.secretAccessKey || (t = o("Missing credentials")),
            r(t)) : n.credentialProvider ? n.credentialProvider.resolve((function(e, t) {
                e && (e = o("Could not load credentials from any providers", e)),
                n.credentials = t,
                r(e)
            }
            )) : r(o("No credentials to load"))
        },
        update: function(e, t) {
            t = t || !1,
            e = this.extractCredentials(e),
            i.util.each.call(this, e, (function(e, n) {
                (t || Object.prototype.hasOwnProperty.call(this.keys, e) || i.Service.hasService(e)) && this.set(e, n)
            }
            ))
        },
        loadFromPath: function(e) {
            this.clear();
            var t = JSON.parse(i.util.readFileSync(e))
              , n = new i.FileSystemCredentials(e)
              , r = new i.CredentialProviderChain;
            return r.providers.unshift(n),
            r.resolve((function(e, n) {
                if (e)
                    throw e;
                t.credentials = n
            }
            )),
            this.constructor(t),
            this
        },
        clear: function() {
            i.util.each.call(this, this.keys, (function(e) {
                delete this[e]
            }
            )),
            this.set("credentials", void 0),
            this.set("credentialProvider", void 0)
        },
        set: function(e, t, n) {
            void 0 === t ? (void 0 === n && (n = this.keys[e]),
            this[e] = "function" == typeof n ? n.call(this) : n) : "httpOptions" === e && this[e] ? this[e] = i.util.merge(this[e], t) : this[e] = t
        },
        keys: {
            credentials: null,
            credentialProvider: null,
            region: null,
            logger: null,
            apiVersions: {},
            apiVersion: null,
            endpoint: void 0,
            httpOptions: {
                timeout: 12e4
            },
            maxRetries: void 0,
            maxRedirects: 10,
            paramValidation: !0,
            sslEnabled: !0,
            s3ForcePathStyle: !1,
            s3BucketEndpoint: !1,
            s3DisableBodySigning: !0,
            computeChecksums: !0,
            convertResponseTypes: !0,
            correctClockSkew: !1,
            customUserAgent: null,
            dynamoDbCrc32: !0,
            systemClockOffset: 0,
            signatureVersion: null,
            signatureCache: !0,
            retryDelayOptions: {},
            useAccelerateEndpoint: !1,
            clientSideMonitoring: !1,
            endpointDiscoveryEnabled: !1,
            endpointCacheSize: 1e3,
            hostPrefixEnabled: !0
        },
        extractCredentials: function(e) {
            return e.accessKeyId && e.secretAccessKey && ((e = i.util.copy(e)).credentials = new i.Credentials(e)),
            e
        },
        setPromisesDependency: function(e) {
            r = e,
            null === e && "function" == typeof Promise && (r = Promise);
            var t = [i.Request, i.Credentials, i.CredentialProviderChain];
            i.S3 && i.S3.ManagedUpload && t.push(i.S3.ManagedUpload),
            i.util.addPromises(t, r)
        },
        getPromisesDependency: function() {
            return r
        }
    }),
    i.config = new i.Config
}
, function(e, t, n) {
    var r = n(0)
      , i = n(35)
      , o = n(71).discoverEndpoint;
    r.EventListeners = {
        Core: {}
    },
    r.EventListeners = {
        Core: (new i).addNamedListeners((function(e, t) {
            t("VALIDATE_CREDENTIALS", "validate", (function(e, t) {
                if (!e.service.api.signatureVersion)
                    return t();
                e.service.config.getCredentials((function(n) {
                    n && (e.response.error = r.util.error(n, {
                        code: "CredentialsError",
                        message: "Missing credentials in config"
                    })),
                    t()
                }
                ))
            }
            )),
            e("VALIDATE_REGION", "validate", (function(e) {
                e.service.config.region || e.service.isGlobalEndpoint || (e.response.error = r.util.error(new Error, {
                    code: "ConfigError",
                    message: "Missing region in config"
                }))
            }
            )),
            e("BUILD_IDEMPOTENCY_TOKENS", "validate", (function(e) {
                if (e.service.api.operations) {
                    var t = e.service.api.operations[e.operation];
                    if (t) {
                        var n = t.idempotentMembers;
                        if (n.length) {
                            for (var i = r.util.copy(e.params), o = 0, s = n.length; o < s; o++)
                                i[n[o]] || (i[n[o]] = r.util.uuid.v4());
                            e.params = i
                        }
                    }
                }
            }
            )),
            e("VALIDATE_PARAMETERS", "validate", (function(e) {
                if (e.service.api.operations) {
                    var t = e.service.api.operations[e.operation].input
                      , n = e.service.config.paramValidation;
                    new r.ParamValidator(n).validate(t, e.params)
                }
            }
            )),
            t("COMPUTE_SHA256", "afterBuild", (function(e, t) {
                if (e.haltHandlersOnError(),
                e.service.api.operations) {
                    var n = e.service.api.operations[e.operation]
                      , i = n ? n.authtype : "";
                    if (!e.service.api.signatureVersion && !i)
                        return t();
                    if (e.service.getSignerClass(e) === r.Signers.V4) {
                        var o = e.httpRequest.body || "";
                        if (i.indexOf("unsigned-body") >= 0)
                            return e.httpRequest.headers["X-Amz-Content-Sha256"] = "UNSIGNED-PAYLOAD",
                            t();
                        r.util.computeSha256(o, (function(n, r) {
                            n ? t(n) : (e.httpRequest.headers["X-Amz-Content-Sha256"] = r,
                            t())
                        }
                        ))
                    } else
                        t()
                }
            }
            )),
            e("SET_CONTENT_LENGTH", "afterBuild", (function(e) {
                var t = function(e) {
                    if (!e.service.api.operations)
                        return "";
                    var t = e.service.api.operations[e.operation];
                    return t ? t.authtype : ""
                }(e)
                  , n = r.util.getRequestPayloadShape(e);
                if (void 0 === e.httpRequest.headers["Content-Length"])
                    try {
                        var i = r.util.string.byteLength(e.httpRequest.body);
                        e.httpRequest.headers["Content-Length"] = i
                    } catch (r) {
                        if (n && n.isStreaming) {
                            if (n.requiresLength)
                                throw r;
                            if (t.indexOf("unsigned-body") >= 0)
                                return void (e.httpRequest.headers["Transfer-Encoding"] = "chunked");
                            throw r
                        }
                        throw r
                    }
            }
            )),
            e("SET_HTTP_HOST", "afterBuild", (function(e) {
                e.httpRequest.headers.Host = e.httpRequest.endpoint.host
            }
            )),
            e("RESTART", "restart", (function() {
                var e = this.response.error;
                e && e.retryable && (this.httpRequest = new r.HttpRequest(this.service.endpoint,this.service.region),
                this.response.retryCount < this.service.config.maxRetries ? this.response.retryCount++ : this.response.error = null)
            }
            ));
            t("DISCOVER_ENDPOINT", "sign", o, !0),
            t("SIGN", "sign", (function(e, t) {
                var n = e.service
                  , r = (e.service.api.operations || {})[e.operation]
                  , i = r ? r.authtype : "";
                if (!n.api.signatureVersion && !i)
                    return t();
                n.config.getCredentials((function(i, o) {
                    if (i)
                        return e.response.error = i,
                        t();
                    try {
                        var s = n.getSkewCorrectedDate()
                          , a = new (n.getSignerClass(e))(e.httpRequest,n.api.signingName || n.api.endpointPrefix,{
                            signatureCache: n.config.signatureCache,
                            operation: r,
                            signatureVersion: n.api.signatureVersion
                        });
                        a.setServiceClientId(n._clientId),
                        delete e.httpRequest.headers.Authorization,
                        delete e.httpRequest.headers.Date,
                        delete e.httpRequest.headers["X-Amz-Date"],
                        a.addAuthorization(o, s),
                        e.signedAt = s
                    } catch (t) {
                        e.response.error = t
                    }
                    t()
                }
                ))
            }
            )),
            e("VALIDATE_RESPONSE", "validateResponse", (function(e) {
                this.service.successfulResponse(e, this) ? (e.data = {},
                e.error = null) : (e.data = null,
                e.error = r.util.error(new Error, {
                    code: "UnknownError",
                    message: "An unknown error occurred."
                }))
            }
            )),
            t("SEND", "send", (function(e, t) {
                function n(n) {
                    e.httpResponse.stream = n;
                    var i = e.request.httpRequest.stream
                      , o = e.request.service
                      , s = o.api
                      , a = e.request.operation
                      , u = s.operations[a] || {};
                    n.on("headers", (function(i, s, a) {
                        if (e.request.emit("httpHeaders", [i, s, e, a]),
                        !e.httpResponse.streaming)
                            if (2 === r.HttpClient.streamsApiVersion) {
                                if (u.hasEventOutput && o.successfulResponse(e))
                                    return e.request.emit("httpDone"),
                                    void t();
                                n.on("readable", (function() {
                                    var t = n.read();
                                    null !== t && e.request.emit("httpData", [t, e])
                                }
                                ))
                            } else
                                n.on("data", (function(t) {
                                    e.request.emit("httpData", [t, e])
                                }
                                ))
                    }
                    )),
                    n.on("end", (function() {
                        if (!i || !i.didCallback) {
                            if (2 === r.HttpClient.streamsApiVersion && u.hasEventOutput && o.successfulResponse(e))
                                return;
                            e.request.emit("httpDone"),
                            t()
                        }
                    }
                    ))
                }
                function i(n) {
                    if ("RequestAbortedError" !== n.code) {
                        var i = "TimeoutError" === n.code ? n.code : "NetworkingError";
                        n = r.util.error(n, {
                            code: i,
                            region: e.request.httpRequest.region,
                            hostname: e.request.httpRequest.endpoint.hostname,
                            retryable: !0
                        })
                    }
                    e.error = n,
                    e.request.emit("httpError", [e.error, e], (function() {
                        t()
                    }
                    ))
                }
                function o() {
                    var t, o = r.HttpClient.getInstance(), s = e.request.service.config.httpOptions || {};
                    try {
                        var a = o.handleRequest(e.request.httpRequest, s, n, i);
                        (t = a).on("sendProgress", (function(t) {
                            e.request.emit("httpUploadProgress", [t, e])
                        }
                        )),
                        t.on("receiveProgress", (function(t) {
                            e.request.emit("httpDownloadProgress", [t, e])
                        }
                        ))
                    } catch (e) {
                        i(e)
                    }
                }
                e.httpResponse._abortCallback = t,
                e.error = null,
                e.data = null,
                (e.request.service.getSkewCorrectedDate() - this.signedAt) / 1e3 >= 600 ? this.emit("sign", [this], (function(e) {
                    e ? t(e) : o()
                }
                )) : o()
            }
            )),
            e("HTTP_HEADERS", "httpHeaders", (function(e, t, n, i) {
                n.httpResponse.statusCode = e,
                n.httpResponse.statusMessage = i,
                n.httpResponse.headers = t,
                n.httpResponse.body = r.util.buffer.toBuffer(""),
                n.httpResponse.buffers = [],
                n.httpResponse.numBytes = 0;
                var o = t.date || t.Date
                  , s = n.request.service;
                if (o) {
                    var a = Date.parse(o);
                    s.config.correctClockSkew && s.isClockSkewed(a) && s.applyClockOffset(a)
                }
            }
            )),
            e("HTTP_DATA", "httpData", (function(e, t) {
                if (e) {
                    if (r.util.isNode()) {
                        t.httpResponse.numBytes += e.length;
                        var n = t.httpResponse.headers["content-length"]
                          , i = {
                            loaded: t.httpResponse.numBytes,
                            total: n
                        };
                        t.request.emit("httpDownloadProgress", [i, t])
                    }
                    t.httpResponse.buffers.push(r.util.buffer.toBuffer(e))
                }
            }
            )),
            e("HTTP_DONE", "httpDone", (function(e) {
                if (e.httpResponse.buffers && e.httpResponse.buffers.length > 0) {
                    var t = r.util.buffer.concat(e.httpResponse.buffers);
                    e.httpResponse.body = t
                }
                delete e.httpResponse.numBytes,
                delete e.httpResponse.buffers
            }
            )),
            e("FINALIZE_ERROR", "retry", (function(e) {
                e.httpResponse.statusCode && (e.error.statusCode = e.httpResponse.statusCode,
                void 0 === e.error.retryable && (e.error.retryable = this.service.retryableError(e.error, this)))
            }
            )),
            e("INVALIDATE_CREDENTIALS", "retry", (function(e) {
                if (e.error)
                    switch (e.error.code) {
                    case "RequestExpired":
                    case "ExpiredTokenException":
                    case "ExpiredToken":
                        e.error.retryable = !0,
                        e.request.service.config.credentials.expired = !0
                    }
            }
            )),
            e("EXPIRED_SIGNATURE", "retry", (function(e) {
                var t = e.error;
                t && "string" == typeof t.code && "string" == typeof t.message && t.code.match(/Signature/) && t.message.match(/expired/) && (e.error.retryable = !0)
            }
            )),
            e("CLOCK_SKEWED", "retry", (function(e) {
                e.error && this.service.clockSkewError(e.error) && this.service.config.correctClockSkew && (e.error.retryable = !0)
            }
            )),
            e("REDIRECT", "retry", (function(e) {
                e.error && e.error.statusCode >= 300 && e.error.statusCode < 400 && e.httpResponse.headers.location && (this.httpRequest.endpoint = new r.Endpoint(e.httpResponse.headers.location),
                this.httpRequest.headers.Host = this.httpRequest.endpoint.host,
                e.error.redirect = !0,
                e.error.retryable = !0)
            }
            )),
            e("RETRY_CHECK", "retry", (function(e) {
                e.error && (e.error.redirect && e.redirectCount < e.maxRedirects ? e.error.retryDelay = 0 : e.retryCount < e.maxRetries && (e.error.retryDelay = this.service.retryDelays(e.retryCount) || 0))
            }
            )),
            t("RESET_RETRY_STATE", "afterRetry", (function(e, t) {
                var n, r = !1;
                e.error && (n = e.error.retryDelay || 0,
                e.error.retryable && e.retryCount < e.maxRetries ? (e.retryCount++,
                r = !0) : e.error.redirect && e.redirectCount < e.maxRedirects && (e.redirectCount++,
                r = !0)),
                r ? (e.error = null,
                setTimeout(t, n)) : t()
            }
            ))
        }
        )),
        CorePost: (new i).addNamedListeners((function(e) {
            e("EXTRACT_REQUEST_ID", "extractData", r.util.extractRequestId),
            e("EXTRACT_REQUEST_ID", "extractError", r.util.extractRequestId),
            e("ENOTFOUND_ERROR", "httpError", (function(e) {
                if ("NetworkingError" === e.code && "ENOTFOUND" === e.errno) {
                    var t = "Inaccessible host: `" + e.hostname + "'. This service may not be available in the `" + e.region + "' region.";
                    this.response.error = r.util.error(new Error(t), {
                        code: "UnknownEndpoint",
                        region: e.region,
                        hostname: e.hostname,
                        retryable: !0,
                        originalError: e
                    })
                }
            }
            ))
        }
        )),
        Logger: (new i).addNamedListeners((function(e) {
            e("LOG_REQUEST", "complete", (function(e) {
                var t = e.request
                  , i = t.service.config.logger;
                if (i) {
                    var o = function() {
                        var o = (e.request.service.getSkewCorrectedDate().getTime() - t.startTime.getTime()) / 1e3
                          , s = !!i.isTTY
                          , a = e.httpResponse.statusCode
                          , u = t.params;
                        t.service.api.operations && t.service.api.operations[t.operation] && t.service.api.operations[t.operation].input && (u = function e(t, n) {
                            if (!n)
                                return n;
                            switch (t.type) {
                            case "structure":
                                var i = {};
                                return r.util.each(n, (function(n, r) {
                                    Object.prototype.hasOwnProperty.call(t.members, n) ? i[n] = e(t.members[n], r) : i[n] = r
                                }
                                )),
                                i;
                            case "list":
                                var o = [];
                                return r.util.arrayEach(n, (function(n, r) {
                                    o.push(e(t.member, n))
                                }
                                )),
                                o;
                            case "map":
                                var s = {};
                                return r.util.each(n, (function(n, r) {
                                    s[n] = e(t.value, r)
                                }
                                )),
                                s;
                            default:
                                return t.isSensitive ? "***SensitiveInformation***" : n
                            }
                        }(t.service.api.operations[t.operation].input, t.params));
                        var c = n(72).inspect(u, !0, null)
                          , l = "";
                        return s && (l += "[33m"),
                        l += "[AWS " + t.service.serviceIdentifier + " " + a,
                        l += " " + o.toString() + "s " + e.retryCount + " retries]",
                        s && (l += "[0;1m"),
                        l += " " + r.util.string.lowerFirst(t.operation),
                        l += "(" + c + ")",
                        s && (l += "[0m"),
                        l
                    }();
                    "function" == typeof i.log ? i.log(o) : "function" == typeof i.write && i.write(o + "\n")
                }
            }
            ))
        }
        )),
        Json: (new i).addNamedListeners((function(e) {
            var t = n(19);
            e("BUILD", "build", t.buildRequest),
            e("EXTRACT_DATA", "extractData", t.extractData),
            e("EXTRACT_ERROR", "extractError", t.extractError)
        }
        )),
        Rest: (new i).addNamedListeners((function(e) {
            var t = n(14);
            e("BUILD", "build", t.buildRequest),
            e("EXTRACT_DATA", "extractData", t.extractData),
            e("EXTRACT_ERROR", "extractError", t.extractError)
        }
        )),
        RestJson: (new i).addNamedListeners((function(e) {
            var t = n(29);
            e("BUILD", "build", t.buildRequest),
            e("EXTRACT_DATA", "extractData", t.extractData),
            e("EXTRACT_ERROR", "extractError", t.extractError)
        }
        )),
        RestXml: (new i).addNamedListeners((function(e) {
            var t = n(30);
            e("BUILD", "build", t.buildRequest),
            e("EXTRACT_DATA", "extractData", t.extractData),
            e("EXTRACT_ERROR", "extractError", t.extractError)
        }
        )),
        Query: (new i).addNamedListeners((function(e) {
            var t = n(27);
            e("BUILD", "build", t.buildRequest),
            e("EXTRACT_DATA", "extractData", t.extractData),
            e("EXTRACT_ERROR", "extractError", t.extractError)
        }
        ))
    }
}
, function(e, t, n) {
    (function(t) {
        var r = n(0)
          , i = n(2)
          , o = ["AWS_ENABLE_ENDPOINT_DISCOVERY", "AWS_ENDPOINT_DISCOVERY_ENABLED"];
        function s(e) {
            var t = e.service
              , n = t.api || {}
              , r = (n.operations,
            {});
            return t.config.region && (r.region = t.config.region),
            n.serviceId && (r.serviceId = n.serviceId),
            t.config.credentials.accessKeyId && (r.accessKeyId = t.config.credentials.accessKeyId),
            r
        }
        function a(e, t) {
            var n = {};
            return function e(t, n, r) {
                r && null != n && "structure" === r.type && r.required && r.required.length > 0 && i.arrayEach(r.required, (function(i) {
                    var o = r.members[i];
                    if (!0 === o.endpointDiscoveryId) {
                        var s = o.isLocationName ? o.name : i;
                        t[s] = String(n[i])
                    } else
                        e(t, n[i], o)
                }
                ))
            }(n, e.params, t),
            n
        }
        function u(e) {
            var t = e.service
              , n = t.api
              , o = n.operations ? n.operations[e.operation] : void 0
              , u = a(e, o ? o.input : void 0)
              , c = s(e);
            Object.keys(u).length > 0 && (c = i.update(c, u),
            o && (c.operation = o.name));
            var l = r.endpointCache.get(c);
            if (!l || 1 !== l.length || "" !== l[0].Address)
                if (l && l.length > 0)
                    e.httpRequest.updateEndpoint(l[0].Address);
                else {
                    var f = t.makeRequest(n.endpointOperation, {
                        Operation: o.name,
                        Identifiers: u
                    });
                    h(f),
                    f.removeListener("validate", r.EventListeners.Core.VALIDATE_PARAMETERS),
                    f.removeListener("retry", r.EventListeners.Core.RETRY_CHECK),
                    r.endpointCache.put(c, [{
                        Address: "",
                        CachePeriodInMinutes: 1
                    }]),
                    f.send((function(e, t) {
                        t && t.Endpoints ? r.endpointCache.put(c, t.Endpoints) : e && r.endpointCache.put(c, [{
                            Address: "",
                            CachePeriodInMinutes: 1
                        }])
                    }
                    ))
                }
        }
        var c = {};
        function l(e, t) {
            var n = e.service
              , o = n.api
              , u = o.operations ? o.operations[e.operation] : void 0
              , l = u ? u.input : void 0
              , f = a(e, l)
              , d = s(e);
            Object.keys(f).length > 0 && (d = i.update(d, f),
            u && (d.operation = u.name));
            var p = r.EndpointCache.getKeyString(d)
              , g = r.endpointCache.get(p);
            if (g && 1 === g.length && "" === g[0].Address)
                return c[p] || (c[p] = []),
                void c[p].push({
                    request: e,
                    callback: t
                });
            if (g && g.length > 0)
                e.httpRequest.updateEndpoint(g[0].Address),
                t();
            else {
                var m = n.makeRequest(o.endpointOperation, {
                    Operation: u.name,
                    Identifiers: f
                });
                m.removeListener("validate", r.EventListeners.Core.VALIDATE_PARAMETERS),
                h(m),
                r.endpointCache.put(p, [{
                    Address: "",
                    CachePeriodInMinutes: 60
                }]),
                m.send((function(n, o) {
                    if (n) {
                        var s = {
                            code: "EndpointDiscoveryException",
                            message: "Request cannot be fulfilled without specifying an endpoint",
                            retryable: !1
                        };
                        if (e.response.error = i.error(n, s),
                        r.endpointCache.remove(d),
                        c[p]) {
                            var a = c[p];
                            i.arrayEach(a, (function(e) {
                                e.request.response.error = i.error(n, s),
                                e.callback()
                            }
                            )),
                            delete c[p]
                        }
                    } else if (o && (r.endpointCache.put(p, o.Endpoints),
                    e.httpRequest.updateEndpoint(o.Endpoints[0].Address),
                    c[p])) {
                        a = c[p];
                        i.arrayEach(a, (function(e) {
                            e.request.httpRequest.updateEndpoint(o.Endpoints[0].Address),
                            e.callback()
                        }
                        )),
                        delete c[p]
                    }
                    t()
                }
                ))
            }
        }
        function h(e) {
            var t = e.service.api.apiVersion;
            t && !e.httpRequest.headers["x-amz-api-version"] && (e.httpRequest.headers["x-amz-api-version"] = t)
        }
        function f(e) {
            var t = e.error
              , n = e.httpResponse;
            if (t && ("InvalidEndpointException" === t.code || 421 === n.statusCode)) {
                var o = e.request
                  , u = o.service.api.operations || {}
                  , c = a(o, u[o.operation] ? u[o.operation].input : void 0)
                  , l = s(o);
                Object.keys(c).length > 0 && (l = i.update(l, c),
                u[o.operation] && (l.operation = u[o.operation].name)),
                r.endpointCache.remove(l)
            }
        }
        function d(e) {
            return ["false", "0"].indexOf(e) >= 0
        }
        e.exports = {
            discoverEndpoint: function(e, n) {
                var s = e.service || {};
                if (function(e) {
                    if (e._originalConfig && e._originalConfig.endpoint && !0 === e._originalConfig.endpointDiscoveryEnabled)
                        throw i.error(new Error, {
                            code: "ConfigurationException",
                            message: "Custom endpoint is supplied; endpointDiscoveryEnabled must not be true."
                        });
                    var t = r.config[e.serviceIdentifier] || {};
                    return Boolean(r.config.endpoint || t.endpoint || e._originalConfig && e._originalConfig.endpoint)
                }(s) || e.isPresigned())
                    return n();
                if (!function(e) {
                    if (!0 === (e.service || {}).config.endpointDiscoveryEnabled)
                        return !0;
                    if (i.isBrowser())
                        return !1;
                    for (var n = 0; n < o.length; n++) {
                        var s = o[n];
                        if (Object.prototype.hasOwnProperty.call(t.env, s)) {
                            if ("" === t.env[s] || void 0 === t.env[s])
                                throw i.error(new Error, {
                                    code: "ConfigurationException",
                                    message: "environmental variable " + s + " cannot be set to nothing"
                                });
                            if (!d(t.env[s]))
                                return !0
                        }
                    }
                    var a = {};
                    try {
                        a = r.util.iniLoader ? r.util.iniLoader.loadFrom({
                            isConfig: !0,
                            filename: t.env[r.util.sharedConfigFileEnv]
                        }) : {}
                    } catch (e) {}
                    var u = a[t.env.AWS_PROFILE || r.util.defaultProfile] || {};
                    if (Object.prototype.hasOwnProperty.call(u, "endpoint_discovery_enabled")) {
                        if (void 0 === u.endpoint_discovery_enabled)
                            throw i.error(new Error, {
                                code: "ConfigurationException",
                                message: "config file entry 'endpoint_discovery_enabled' cannot be set to nothing"
                            });
                        if (!d(u.endpoint_discovery_enabled))
                            return !0
                    }
                    return !1
                }(e))
                    return n();
                e.httpRequest.appendToUserAgent("endpoint-discovery");
                var a = (s.api.operations || {})[e.operation];
                switch (a ? a.endpointDiscoveryRequired : "NULL") {
                case "OPTIONAL":
                    u(e),
                    e.addNamedListener("INVALIDATE_CACHED_ENDPOINTS", "extractError", f),
                    n();
                    break;
                case "REQUIRED":
                    e.addNamedListener("INVALIDATE_CACHED_ENDPOINTS", "extractError", f),
                    l(e, n);
                    break;
                case "NULL":
                default:
                    n()
                }
            },
            requiredDiscoverEndpoint: l,
            optionalDiscoverEndpoint: u,
            marshallCustomIdentifiers: a,
            getCacheKey: s,
            invalidateCachedEndpoint: f
        }
    }
    ).call(this, n(7))
}
, function(e, t, n) {
    (function(e) {
        var r = Object.getOwnPropertyDescriptors || function(e) {
            for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++)
                n[t[r]] = Object.getOwnPropertyDescriptor(e, t[r]);
            return n
        }
          , i = /%[sdj%]/g;
        t.format = function(e) {
            if (!y(e)) {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t.push(a(arguments[n]));
                return t.join(" ")
            }
            n = 1;
            for (var r = arguments, o = r.length, s = String(e).replace(i, (function(e) {
                if ("%%" === e)
                    return "%";
                if (n >= o)
                    return e;
                switch (e) {
                case "%s":
                    return String(r[n++]);
                case "%d":
                    return Number(r[n++]);
                case "%j":
                    try {
                        return JSON.stringify(r[n++])
                    } catch (e) {
                        return "[Circular]"
                    }
                default:
                    return e
                }
            }
            )), u = r[n]; n < o; u = r[++n])
                g(u) || !w(u) ? s += " " + u : s += " " + a(u);
            return s
        }
        ,
        t.deprecate = function(n, r) {
            if (void 0 !== e && !0 === e.noDeprecation)
                return n;
            if (void 0 === e)
                return function() {
                    return t.deprecate(n, r).apply(this, arguments)
                }
                ;
            var i = !1;
            return function() {
                if (!i) {
                    if (e.throwDeprecation)
                        throw new Error(r);
                    e.traceDeprecation ? console.trace(r) : console.error(r),
                    i = !0
                }
                return n.apply(this, arguments)
            }
        }
        ;
        var o, s = {};
        function a(e, n) {
            var r = {
                seen: [],
                stylize: c
            };
            return arguments.length >= 3 && (r.depth = arguments[2]),
            arguments.length >= 4 && (r.colors = arguments[3]),
            p(n) ? r.showHidden = n : n && t._extend(r, n),
            v(r.showHidden) && (r.showHidden = !1),
            v(r.depth) && (r.depth = 2),
            v(r.colors) && (r.colors = !1),
            v(r.customInspect) && (r.customInspect = !0),
            r.colors && (r.stylize = u),
            l(r, e, r.depth)
        }
        function u(e, t) {
            var n = a.styles[t];
            return n ? "[" + a.colors[n][0] + "m" + e + "[" + a.colors[n][1] + "m" : e
        }
        function c(e, t) {
            return e
        }
        function l(e, n, r) {
            if (e.customInspect && n && _(n.inspect) && n.inspect !== t.inspect && (!n.constructor || n.constructor.prototype !== n)) {
                var i = n.inspect(r, e);
                return y(i) || (i = l(e, i, r)),
                i
            }
            var o = function(e, t) {
                if (v(t))
                    return e.stylize("undefined", "undefined");
                if (y(t)) {
                    var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(n, "string")
                }
                if (m(t))
                    return e.stylize("" + t, "number");
                if (p(t))
                    return e.stylize("" + t, "boolean");
                if (g(t))
                    return e.stylize("null", "null")
            }(e, n);
            if (o)
                return o;
            var s = Object.keys(n)
              , a = function(e) {
                var t = {};
                return e.forEach((function(e, n) {
                    t[e] = !0
                }
                )),
                t
            }(s);
            if (e.showHidden && (s = Object.getOwnPropertyNames(n)),
            E(n) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0))
                return h(n);
            if (0 === s.length) {
                if (_(n)) {
                    var u = n.name ? ": " + n.name : "";
                    return e.stylize("[Function" + u + "]", "special")
                }
                if (b(n))
                    return e.stylize(RegExp.prototype.toString.call(n), "regexp");
                if (S(n))
                    return e.stylize(Date.prototype.toString.call(n), "date");
                if (E(n))
                    return h(n)
            }
            var c, w = "", A = !1, C = ["{", "}"];
            (d(n) && (A = !0,
            C = ["[", "]"]),
            _(n)) && (w = " [Function" + (n.name ? ": " + n.name : "") + "]");
            return b(n) && (w = " " + RegExp.prototype.toString.call(n)),
            S(n) && (w = " " + Date.prototype.toUTCString.call(n)),
            E(n) && (w = " " + h(n)),
            0 !== s.length || A && 0 != n.length ? r < 0 ? b(n) ? e.stylize(RegExp.prototype.toString.call(n), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(n),
            c = A ? function(e, t, n, r, i) {
                for (var o = [], s = 0, a = t.length; s < a; ++s)
                    k(t, String(s)) ? o.push(f(e, t, n, r, String(s), !0)) : o.push("");
                return i.forEach((function(i) {
                    i.match(/^\d+$/) || o.push(f(e, t, n, r, i, !0))
                }
                )),
                o
            }(e, n, r, a, s) : s.map((function(t) {
                return f(e, n, r, a, t, A)
            }
            )),
            e.seen.pop(),
            function(e, t, n) {
                if (e.reduce((function(e, t) {
                    return t.indexOf("\n") >= 0 && 0,
                    e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                }
                ), 0) > 60)
                    return n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1];
                return n[0] + t + " " + e.join(", ") + " " + n[1]
            }(c, w, C)) : C[0] + w + C[1]
        }
        function h(e) {
            return "[" + Error.prototype.toString.call(e) + "]"
        }
        function f(e, t, n, r, i, o) {
            var s, a, u;
            if ((u = Object.getOwnPropertyDescriptor(t, i) || {
                value: t[i]
            }).get ? a = u.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : u.set && (a = e.stylize("[Setter]", "special")),
            k(r, i) || (s = "[" + i + "]"),
            a || (e.seen.indexOf(u.value) < 0 ? (a = g(n) ? l(e, u.value, null) : l(e, u.value, n - 1)).indexOf("\n") > -1 && (a = o ? a.split("\n").map((function(e) {
                return "  " + e
            }
            )).join("\n").substr(2) : "\n" + a.split("\n").map((function(e) {
                return "   " + e
            }
            )).join("\n")) : a = e.stylize("[Circular]", "special")),
            v(s)) {
                if (o && i.match(/^\d+$/))
                    return a;
                (s = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2),
                s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"),
                s = e.stylize(s, "string"))
            }
            return s + ": " + a
        }
        function d(e) {
            return Array.isArray(e)
        }
        function p(e) {
            return "boolean" == typeof e
        }
        function g(e) {
            return null === e
        }
        function m(e) {
            return "number" == typeof e
        }
        function y(e) {
            return "string" == typeof e
        }
        function v(e) {
            return void 0 === e
        }
        function b(e) {
            return w(e) && "[object RegExp]" === A(e)
        }
        function w(e) {
            return "object" == typeof e && null !== e
        }
        function S(e) {
            return w(e) && "[object Date]" === A(e)
        }
        function E(e) {
            return w(e) && ("[object Error]" === A(e) || e instanceof Error)
        }
        function _(e) {
            return "function" == typeof e
        }
        function A(e) {
            return Object.prototype.toString.call(e)
        }
        function C(e) {
            return e < 10 ? "0" + e.toString(10) : e.toString(10)
        }
        t.debuglog = function(n) {
            if (v(o) && (o = e.env.NODE_DEBUG || ""),
            n = n.toUpperCase(),
            !s[n])
                if (new RegExp("\\b" + n + "\\b","i").test(o)) {
                    var r = e.pid;
                    s[n] = function() {
                        var e = t.format.apply(t, arguments);
                        console.error("%s %d: %s", n, r, e)
                    }
                } else
                    s[n] = function() {}
                    ;
            return s[n]
        }
        ,
        t.inspect = a,
        a.colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39]
        },
        a.styles = {
            special: "cyan",
            number: "yellow",
            boolean: "yellow",
            undefined: "grey",
            null: "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
        },
        t.isArray = d,
        t.isBoolean = p,
        t.isNull = g,
        t.isNullOrUndefined = function(e) {
            return null == e
        }
        ,
        t.isNumber = m,
        t.isString = y,
        t.isSymbol = function(e) {
            return "symbol" == typeof e
        }
        ,
        t.isUndefined = v,
        t.isRegExp = b,
        t.isObject = w,
        t.isDate = S,
        t.isError = E,
        t.isFunction = _,
        t.isPrimitive = function(e) {
            return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
        }
        ,
        t.isBuffer = n(73);
        var I = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        function T() {
            var e = new Date
              , t = [C(e.getHours()), C(e.getMinutes()), C(e.getSeconds())].join(":");
            return [e.getDate(), I[e.getMonth()], t].join(" ")
        }
        function k(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        t.log = function() {
            console.log("%s - %s", T(), t.format.apply(t, arguments))
        }
        ,
        t.inherits = n(74),
        t._extend = function(e, t) {
            if (!t || !w(t))
                return e;
            for (var n = Object.keys(t), r = n.length; r--; )
                e[n[r]] = t[n[r]];
            return e
        }
        ;
        var x = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0;
        function P(e, t) {
            if (!e) {
                var n = new Error("Promise was rejected with a falsy value");
                n.reason = e,
                e = n
            }
            return t(e)
        }
        t.promisify = function(e) {
            if ("function" != typeof e)
                throw new TypeError('The "original" argument must be of type Function');
            if (x && e[x]) {
                var t;
                if ("function" != typeof (t = e[x]))
                    throw new TypeError('The "util.promisify.custom" argument must be of type Function');
                return Object.defineProperty(t, x, {
                    value: t,
                    enumerable: !1,
                    writable: !1,
                    configurable: !0
                }),
                t
            }
            function t() {
                for (var t, n, r = new Promise((function(e, r) {
                    t = e,
                    n = r
                }
                )), i = [], o = 0; o < arguments.length; o++)
                    i.push(arguments[o]);
                i.push((function(e, r) {
                    e ? n(e) : t(r)
                }
                ));
                try {
                    e.apply(this, i)
                } catch (e) {
                    n(e)
                }
                return r
            }
            return Object.setPrototypeOf(t, Object.getPrototypeOf(e)),
            x && Object.defineProperty(t, x, {
                value: t,
                enumerable: !1,
                writable: !1,
                configurable: !0
            }),
            Object.defineProperties(t, r(e))
        }
        ,
        t.promisify.custom = x,
        t.callbackify = function(t) {
            if ("function" != typeof t)
                throw new TypeError('The "original" argument must be of type Function');
            function n() {
                for (var n = [], r = 0; r < arguments.length; r++)
                    n.push(arguments[r]);
                var i = n.pop();
                if ("function" != typeof i)
                    throw new TypeError("The last argument must be of type Function");
                var o = this
                  , s = function() {
                    return i.apply(o, arguments)
                };
                t.apply(this, n).then((function(t) {
                    e.nextTick(s, null, t)
                }
                ), (function(t) {
                    e.nextTick(P, t, s)
                }
                ))
            }
            return Object.setPrototypeOf(n, Object.getPrototypeOf(t)),
            Object.defineProperties(n, r(t)),
            n
        }
    }
    ).call(this, n(7))
}
, function(e, t) {
    e.exports = function(e) {
        return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
    }
}
, function(e, t) {
    "function" == typeof Object.create ? e.exports = function(e, t) {
        e.super_ = t,
        e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    }
    : e.exports = function(e, t) {
        e.super_ = t;
        var n = function() {};
        n.prototype = t.prototype,
        e.prototype = new n,
        e.prototype.constructor = e
    }
}
, function(e, t, n) {
    (function(e) {
        var t = n(0)
          , r = n(76)
          , i = t.util.inherit
          , o = t.util.domain
          , s = n(23)
          , a = {
            success: 1,
            error: 1,
            complete: 1
        };
        var u = new r;
        u.setupStates = function() {
            var e = function(e, t) {
                var n = this;
                n._haltHandlersOnError = !1,
                n.emit(n._asm.currentState, (function(e) {
                    if (e)
                        if (r = n,
                        Object.prototype.hasOwnProperty.call(a, r._asm.currentState)) {
                            if (!(o && n.domain instanceof o.Domain))
                                throw e;
                            e.domainEmitter = n,
                            e.domain = n.domain,
                            e.domainThrown = !1,
                            n.domain.emit("error", e)
                        } else
                            n.response.error = e,
                            t(e);
                    else
                        t(n.response.error);
                    var r
                }
                ))
            };
            this.addState("validate", "build", "error", e),
            this.addState("build", "afterBuild", "restart", e),
            this.addState("afterBuild", "sign", "restart", e),
            this.addState("sign", "send", "retry", e),
            this.addState("retry", "afterRetry", "afterRetry", e),
            this.addState("afterRetry", "sign", "error", e),
            this.addState("send", "validateResponse", "retry", e),
            this.addState("validateResponse", "extractData", "extractError", e),
            this.addState("extractError", "extractData", "retry", e),
            this.addState("extractData", "success", "retry", e),
            this.addState("restart", "build", "error", e),
            this.addState("success", "complete", "complete", e),
            this.addState("error", "complete", "complete", e),
            this.addState("complete", null, null, e)
        }
        ,
        u.setupStates(),
        t.Request = i({
            constructor: function(e, n, i) {
                var s = e.endpoint
                  , a = e.config.region
                  , c = e.config.customUserAgent;
                e.isGlobalEndpoint && (a = "us-east-1"),
                this.domain = o && o.active,
                this.service = e,
                this.operation = n,
                this.params = i || {},
                this.httpRequest = new t.HttpRequest(s,a),
                this.httpRequest.appendToUserAgent(c),
                this.startTime = e.getSkewCorrectedDate(),
                this.response = new t.Response(this),
                this._asm = new r(u.states,"validate"),
                this._haltHandlersOnError = !1,
                t.SequentialExecutor.call(this),
                this.emit = this.emitEvent
            },
            send: function(e) {
                return e && (this.httpRequest.appendToUserAgent("callback"),
                this.on("complete", (function(t) {
                    e.call(t, t.error, t.data)
                }
                ))),
                this.runTo(),
                this.response
            },
            build: function(e) {
                return this.runTo("send", e)
            },
            runTo: function(e, t) {
                return this._asm.runTo(e, t, this),
                this
            },
            abort: function() {
                return this.removeAllListeners("validateResponse"),
                this.removeAllListeners("extractError"),
                this.on("validateResponse", (function(e) {
                    e.error = t.util.error(new Error("Request aborted by user"), {
                        code: "RequestAbortedError",
                        retryable: !1
                    })
                }
                )),
                this.httpRequest.stream && !this.httpRequest.stream.didCallback && (this.httpRequest.stream.abort(),
                this.httpRequest._abortCallback ? this.httpRequest._abortCallback() : this.removeAllListeners("send")),
                this
            },
            eachPage: function(e) {
                e = t.util.fn.makeAsync(e, 3),
                this.on("complete", (function n(r) {
                    e.call(r, r.error, r.data, (function(i) {
                        !1 !== i && (r.hasNextPage() ? r.nextPage().on("complete", n).send() : e.call(r, null, null, t.util.fn.noop))
                    }
                    ))
                }
                )).send()
            },
            eachItem: function(e) {
                var n = this;
                this.eachPage((function(r, i) {
                    if (r)
                        return e(r, null);
                    if (null === i)
                        return e(null, null);
                    var o = n.service.paginationConfig(n.operation).resultKey;
                    Array.isArray(o) && (o = o[0]);
                    var a = s.search(i, o)
                      , u = !0;
                    return t.util.arrayEach(a, (function(n) {
                        if (!1 === (u = e(null, n)))
                            return t.util.abort
                    }
                    )),
                    u
                }
                ))
            },
            isPageable: function() {
                return !!this.service.paginationConfig(this.operation)
            },
            createReadStream: function() {
                var n = t.util.stream
                  , r = this
                  , i = null;
                return 2 === t.HttpClient.streamsApiVersion ? (i = new n.PassThrough,
                e.nextTick((function() {
                    r.send()
                }
                ))) : ((i = new n.Stream).readable = !0,
                i.sent = !1,
                i.on("newListener", (function(t) {
                    i.sent || "data" !== t || (i.sent = !0,
                    e.nextTick((function() {
                        r.send()
                    }
                    )))
                }
                ))),
                this.on("error", (function(e) {
                    i.emit("error", e)
                }
                )),
                this.on("httpHeaders", (function(e, o, s) {
                    if (e < 300) {
                        r.removeListener("httpData", t.EventListeners.Core.HTTP_DATA),
                        r.removeListener("httpError", t.EventListeners.Core.HTTP_ERROR),
                        r.on("httpError", (function(e) {
                            s.error = e,
                            s.error.retryable = !1
                        }
                        ));
                        var a, u = !1;
                        if ("HEAD" !== r.httpRequest.method && (a = parseInt(o["content-length"], 10)),
                        void 0 !== a && !isNaN(a) && a >= 0) {
                            u = !0;
                            var c = 0
                        }
                        var l = function() {
                            u && c !== a ? i.emit("error", t.util.error(new Error("Stream content length mismatch. Received " + c + " of " + a + " bytes."), {
                                code: "StreamContentLengthMismatch"
                            })) : 2 === t.HttpClient.streamsApiVersion ? i.end() : i.emit("end")
                        }
                          , h = s.httpResponse.createUnbufferedStream();
                        if (2 === t.HttpClient.streamsApiVersion)
                            if (u) {
                                var f = new n.PassThrough;
                                f._write = function(e) {
                                    return e && e.length && (c += e.length),
                                    n.PassThrough.prototype._write.apply(this, arguments)
                                }
                                ,
                                f.on("end", l),
                                i.on("error", (function(e) {
                                    u = !1,
                                    h.unpipe(f),
                                    f.emit("end"),
                                    f.end()
                                }
                                )),
                                h.pipe(f).pipe(i, {
                                    end: !1
                                })
                            } else
                                h.pipe(i);
                        else
                            u && h.on("data", (function(e) {
                                e && e.length && (c += e.length)
                            }
                            )),
                            h.on("data", (function(e) {
                                i.emit("data", e)
                            }
                            )),
                            h.on("end", l);
                        h.on("error", (function(e) {
                            u = !1,
                            i.emit("error", e)
                        }
                        ))
                    }
                }
                )),
                i
            },
            emitEvent: function(e, n, r) {
                "function" == typeof n && (r = n,
                n = null),
                r || (r = function() {}
                ),
                n || (n = this.eventParameters(e, this.response)),
                t.SequentialExecutor.prototype.emit.call(this, e, n, (function(e) {
                    e && (this.response.error = e),
                    r.call(this, e)
                }
                ))
            },
            eventParameters: function(e) {
                switch (e) {
                case "restart":
                case "validate":
                case "sign":
                case "build":
                case "afterValidate":
                case "afterBuild":
                    return [this];
                case "error":
                    return [this.response.error, this.response];
                default:
                    return [this.response]
                }
            },
            presign: function(e, n) {
                return n || "function" != typeof e || (n = e,
                e = null),
                (new t.Signers.Presign).sign(this.toGet(), e, n)
            },
            isPresigned: function() {
                return Object.prototype.hasOwnProperty.call(this.httpRequest.headers, "presigned-expires")
            },
            toUnauthenticated: function() {
                return this._unAuthenticated = !0,
                this.removeListener("validate", t.EventListeners.Core.VALIDATE_CREDENTIALS),
                this.removeListener("sign", t.EventListeners.Core.SIGN),
                this
            },
            toGet: function() {
                return "query" !== this.service.api.protocol && "ec2" !== this.service.api.protocol || (this.removeListener("build", this.buildAsGet),
                this.addListener("build", this.buildAsGet)),
                this
            },
            buildAsGet: function(e) {
                e.httpRequest.method = "GET",
                e.httpRequest.path = e.service.endpoint.path + "?" + e.httpRequest.body,
                e.httpRequest.body = "",
                delete e.httpRequest.headers["Content-Length"],
                delete e.httpRequest.headers["Content-Type"]
            },
            haltHandlersOnError: function() {
                this._haltHandlersOnError = !0
            }
        }),
        t.Request.addPromisesToClass = function(e) {
            this.prototype.promise = function() {
                var t = this;
                return this.httpRequest.appendToUserAgent("promise"),
                new e((function(e, n) {
                    t.on("complete", (function(t) {
                        t.error ? n(t.error) : e(Object.defineProperty(t.data || {}, "$response", {
                            value: t
                        }))
                    }
                    )),
                    t.runTo()
                }
                ))
            }
        }
        ,
        t.Request.deletePromisesFromClass = function() {
            delete this.prototype.promise
        }
        ,
        t.util.addPromises(t.Request),
        t.util.mixin(t.Request, t.SequentialExecutor)
    }
    ).call(this, n(7))
}
, function(e, t) {
    function n(e, t) {
        this.currentState = t || null,
        this.states = e || {}
    }
    n.prototype.runTo = function(e, t, n, r) {
        "function" == typeof e && (r = n,
        n = t,
        t = e,
        e = null);
        var i = this
          , o = i.states[i.currentState];
        o.fn.call(n || i, r, (function(r) {
            if (r) {
                if (!o.fail)
                    return t ? t.call(n, r) : null;
                i.currentState = o.fail
            } else {
                if (!o.accept)
                    return t ? t.call(n) : null;
                i.currentState = o.accept
            }
            if (i.currentState === e)
                return t ? t.call(n, r) : null;
            i.runTo(e, t, n, r)
        }
        ))
    }
    ,
    n.prototype.addState = function(e, t, n, r) {
        return "function" == typeof t ? (r = t,
        t = null,
        n = null) : "function" == typeof n && (r = n,
        n = null),
        this.currentState || (this.currentState = e),
        this.states[e] = {
            accept: t,
            fail: n,
            fn: r
        },
        this
    }
    ,
    e.exports = n
}
, function(e, t, n) {
    var r = n(0)
      , i = r.util.inherit
      , o = n(23);
    r.Response = i({
        constructor: function(e) {
            this.request = e,
            this.data = null,
            this.error = null,
            this.retryCount = 0,
            this.redirectCount = 0,
            this.httpResponse = new r.HttpResponse,
            e && (this.maxRetries = e.service.numRetries(),
            this.maxRedirects = e.service.config.maxRedirects)
        },
        nextPage: function(e) {
            var t, n = this.request.service, i = this.request.operation;
            try {
                t = n.paginationConfig(i, !0)
            } catch (e) {
                this.error = e
            }
            if (!this.hasNextPage()) {
                if (e)
                    e(this.error, null);
                else if (this.error)
                    throw this.error;
                return null
            }
            var o = r.util.copy(this.request.params);
            if (this.nextPageTokens) {
                var s = t.inputToken;
                "string" == typeof s && (s = [s]);
                for (var a = 0; a < s.length; a++)
                    o[s[a]] = this.nextPageTokens[a];
                return n.makeRequest(this.request.operation, o, e)
            }
            return e ? e(null, null) : null
        },
        hasNextPage: function() {
            return this.cacheNextPageTokens(),
            !!this.nextPageTokens || void 0 === this.nextPageTokens && void 0
        },
        cacheNextPageTokens: function() {
            if (Object.prototype.hasOwnProperty.call(this, "nextPageTokens"))
                return this.nextPageTokens;
            this.nextPageTokens = void 0;
            var e = this.request.service.paginationConfig(this.request.operation);
            if (!e)
                return this.nextPageTokens;
            if (this.nextPageTokens = null,
            e.moreResults && !o.search(this.data, e.moreResults))
                return this.nextPageTokens;
            var t = e.outputToken;
            return "string" == typeof t && (t = [t]),
            r.util.arrayEach.call(this, t, (function(e) {
                var t = o.search(this.data, e);
                t && (this.nextPageTokens = this.nextPageTokens || [],
                this.nextPageTokens.push(t))
            }
            )),
            this.nextPageTokens
        }
    })
}
, function(e, t, n) {
    var r = n(0)
      , i = r.util.inherit
      , o = n(23);
    function s(e) {
        var t = e.request._waiter
          , n = t.config.acceptors
          , r = !1
          , i = "retry";
        n.forEach((function(n) {
            if (!r) {
                var o = t.matchers[n.matcher];
                o && o(e, n.expected, n.argument) && (r = !0,
                i = n.state)
            }
        }
        )),
        !r && e.error && (i = "failure"),
        "success" === i ? t.setSuccess(e) : t.setError(e, "retry" === i)
    }
    r.ResourceWaiter = i({
        constructor: function(e, t) {
            this.service = e,
            this.state = t,
            this.loadWaiterConfig(this.state)
        },
        service: null,
        state: null,
        config: null,
        matchers: {
            path: function(e, t, n) {
                try {
                    var r = o.search(e.data, n)
                } catch (e) {
                    return !1
                }
                return o.strictDeepEqual(r, t)
            },
            pathAll: function(e, t, n) {
                try {
                    var r = o.search(e.data, n)
                } catch (e) {
                    return !1
                }
                Array.isArray(r) || (r = [r]);
                var i = r.length;
                if (!i)
                    return !1;
                for (var s = 0; s < i; s++)
                    if (!o.strictDeepEqual(r[s], t))
                        return !1;
                return !0
            },
            pathAny: function(e, t, n) {
                try {
                    var r = o.search(e.data, n)
                } catch (e) {
                    return !1
                }
                Array.isArray(r) || (r = [r]);
                for (var i = r.length, s = 0; s < i; s++)
                    if (o.strictDeepEqual(r[s], t))
                        return !0;
                return !1
            },
            status: function(e, t) {
                var n = e.httpResponse.statusCode;
                return "number" == typeof n && n === t
            },
            error: function(e, t) {
                return "string" == typeof t && e.error ? t === e.error.code : t === !!e.error
            }
        },
        listeners: (new r.SequentialExecutor).addNamedListeners((function(e) {
            e("RETRY_CHECK", "retry", (function(e) {
                var t = e.request._waiter;
                e.error && "ResourceNotReady" === e.error.code && (e.error.retryDelay = 1e3 * (t.config.delay || 0))
            }
            )),
            e("CHECK_OUTPUT", "extractData", s),
            e("CHECK_ERROR", "extractError", s)
        }
        )),
        wait: function(e, t) {
            "function" == typeof e && (t = e,
            e = void 0),
            e && e.$waiter && ("number" == typeof (e = r.util.copy(e)).$waiter.delay && (this.config.delay = e.$waiter.delay),
            "number" == typeof e.$waiter.maxAttempts && (this.config.maxAttempts = e.$waiter.maxAttempts),
            delete e.$waiter);
            var n = this.service.makeRequest(this.config.operation, e);
            return n._waiter = this,
            n.response.maxRetries = this.config.maxAttempts,
            n.addListeners(this.listeners),
            t && n.send(t),
            n
        },
        setSuccess: function(e) {
            e.error = null,
            e.data = e.data || {},
            e.request.removeAllListeners("extractData")
        },
        setError: function(e, t) {
            e.data = null,
            e.error = r.util.error(e.error || new Error, {
                code: "ResourceNotReady",
                message: "Resource is not in the state " + this.state,
                retryable: t
            })
        },
        loadWaiterConfig: function(e) {
            if (!this.service.api.waiters[e])
                throw new r.util.error(new Error,{
                    code: "StateNotFoundError",
                    message: "State " + e + " not found."
                });
            this.config = r.util.copy(this.service.api.waiters[e])
        }
    })
}
, function(e, t, n) {
    var r = n(0)
      , i = r.util.inherit;
    r.Signers.RequestSigner = i({
        constructor: function(e) {
            this.request = e
        },
        setServiceClientId: function(e) {
            this.serviceClientId = e
        },
        getServiceClientId: function() {
            return this.serviceClientId
        }
    }),
    r.Signers.RequestSigner.getVersion = function(e) {
        switch (e) {
        case "v2":
            return r.Signers.V2;
        case "v3":
            return r.Signers.V3;
        case "s3v4":
        case "v4":
            return r.Signers.V4;
        case "s3":
            return r.Signers.S3;
        case "v3https":
            return r.Signers.V3Https
        }
        throw new Error("Unknown signing version " + e)
    }
    ,
    n(80),
    n(39),
    n(81),
    n(82),
    n(84),
    n(85)
}
, function(e, t, n) {
    var r = n(0)
      , i = r.util.inherit;
    r.Signers.V2 = i(r.Signers.RequestSigner, {
        addAuthorization: function(e, t) {
            t || (t = r.util.date.getDate());
            var n = this.request;
            n.params.Timestamp = r.util.date.iso8601(t),
            n.params.SignatureVersion = "2",
            n.params.SignatureMethod = "HmacSHA256",
            n.params.AWSAccessKeyId = e.accessKeyId,
            e.sessionToken && (n.params.SecurityToken = e.sessionToken),
            delete n.params.Signature,
            n.params.Signature = this.signature(e),
            n.body = r.util.queryParamsToString(n.params),
            n.headers["Content-Length"] = n.body.length
        },
        signature: function(e) {
            return r.util.crypto.hmac(e.secretAccessKey, this.stringToSign(), "base64")
        },
        stringToSign: function() {
            var e = [];
            return e.push(this.request.method),
            e.push(this.request.endpoint.host.toLowerCase()),
            e.push(this.request.pathname()),
            e.push(r.util.queryParamsToString(this.request.params)),
            e.join("\n")
        }
    }),
    e.exports = r.Signers.V2
}
, function(e, t, n) {
    var r = n(0)
      , i = r.util.inherit;
    n(39),
    r.Signers.V3Https = i(r.Signers.V3, {
        authorization: function(e) {
            return "AWS3-HTTPS AWSAccessKeyId=" + e.accessKeyId + ",Algorithm=HmacSHA256,Signature=" + this.signature(e)
        },
        stringToSign: function() {
            return this.request.headers["X-Amz-Date"]
        }
    }),
    e.exports = r.Signers.V3Https
}
, function(e, t, n) {
    var r = n(0)
      , i = n(83)
      , o = r.util.inherit;
    r.Signers.V4 = o(r.Signers.RequestSigner, {
        constructor: function(e, t, n) {
            r.Signers.RequestSigner.call(this, e),
            this.serviceName = t,
            n = n || {},
            this.signatureCache = "boolean" != typeof n.signatureCache || n.signatureCache,
            this.operation = n.operation,
            this.signatureVersion = n.signatureVersion
        },
        algorithm: "AWS4-HMAC-SHA256",
        addAuthorization: function(e, t) {
            var n = r.util.date.iso8601(t).replace(/[:\-]|\.\d{3}/g, "");
            this.isPresigned() ? this.updateForPresigned(e, n) : this.addHeaders(e, n),
            this.request.headers.Authorization = this.authorization(e, n)
        },
        addHeaders: function(e, t) {
            this.request.headers["X-Amz-Date"] = t,
            e.sessionToken && (this.request.headers["x-amz-security-token"] = e.sessionToken)
        },
        updateForPresigned: function(e, t) {
            var n = this.credentialString(t)
              , i = {
                "X-Amz-Date": t,
                "X-Amz-Algorithm": this.algorithm,
                "X-Amz-Credential": e.accessKeyId + "/" + n,
                "X-Amz-Expires": this.request.headers["presigned-expires"],
                "X-Amz-SignedHeaders": this.signedHeaders()
            };
            e.sessionToken && (i["X-Amz-Security-Token"] = e.sessionToken),
            this.request.headers["Content-Type"] && (i["Content-Type"] = this.request.headers["Content-Type"]),
            this.request.headers["Content-MD5"] && (i["Content-MD5"] = this.request.headers["Content-MD5"]),
            this.request.headers["Cache-Control"] && (i["Cache-Control"] = this.request.headers["Cache-Control"]),
            r.util.each.call(this, this.request.headers, (function(e, t) {
                if ("presigned-expires" !== e && this.isSignableHeader(e)) {
                    var n = e.toLowerCase();
                    0 === n.indexOf("x-amz-meta-") ? i[n] = t : 0 === n.indexOf("x-amz-") && (i[e] = t)
                }
            }
            ));
            var o = this.request.path.indexOf("?") >= 0 ? "&" : "?";
            this.request.path += o + r.util.queryParamsToString(i)
        },
        authorization: function(e, t) {
            var n = []
              , r = this.credentialString(t);
            return n.push(this.algorithm + " Credential=" + e.accessKeyId + "/" + r),
            n.push("SignedHeaders=" + this.signedHeaders()),
            n.push("Signature=" + this.signature(e, t)),
            n.join(", ")
        },
        signature: function(e, t) {
            var n = i.getSigningKey(e, t.substr(0, 8), this.request.region, this.serviceName, this.signatureCache);
            return r.util.crypto.hmac(n, this.stringToSign(t), "hex")
        },
        stringToSign: function(e) {
            var t = [];
            return t.push("AWS4-HMAC-SHA256"),
            t.push(e),
            t.push(this.credentialString(e)),
            t.push(this.hexEncodedHash(this.canonicalString())),
            t.join("\n")
        },
        canonicalString: function() {
            var e = []
              , t = this.request.pathname();
            return "s3" !== this.serviceName && "s3v4" !== this.signatureVersion && (t = r.util.uriEscapePath(t)),
            e.push(this.request.method),
            e.push(t),
            e.push(this.request.search()),
            e.push(this.canonicalHeaders() + "\n"),
            e.push(this.signedHeaders()),
            e.push(this.hexEncodedBodyHash()),
            e.join("\n")
        },
        canonicalHeaders: function() {
            var e = [];
            r.util.each.call(this, this.request.headers, (function(t, n) {
                e.push([t, n])
            }
            )),
            e.sort((function(e, t) {
                return e[0].toLowerCase() < t[0].toLowerCase() ? -1 : 1
            }
            ));
            var t = [];
            return r.util.arrayEach.call(this, e, (function(e) {
                var n = e[0].toLowerCase();
                if (this.isSignableHeader(n)) {
                    var i = e[1];
                    if (null == i || "function" != typeof i.toString)
                        throw r.util.error(new Error("Header " + n + " contains invalid value"), {
                            code: "InvalidHeader"
                        });
                    t.push(n + ":" + this.canonicalHeaderValues(i.toString()))
                }
            }
            )),
            t.join("\n")
        },
        canonicalHeaderValues: function(e) {
            return e.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "")
        },
        signedHeaders: function() {
            var e = [];
            return r.util.each.call(this, this.request.headers, (function(t) {
                t = t.toLowerCase(),
                this.isSignableHeader(t) && e.push(t)
            }
            )),
            e.sort().join(";")
        },
        credentialString: function(e) {
            return i.createScope(e.substr(0, 8), this.request.region, this.serviceName)
        },
        hexEncodedHash: function(e) {
            return r.util.crypto.sha256(e, "hex")
        },
        hexEncodedBodyHash: function() {
            var e = this.request;
            return this.isPresigned() && "s3" === this.serviceName && !e.body ? "UNSIGNED-PAYLOAD" : e.headers["X-Amz-Content-Sha256"] ? e.headers["X-Amz-Content-Sha256"] : this.hexEncodedHash(this.request.body || "")
        },
        unsignableHeaders: ["authorization", "content-type", "content-length", "user-agent", "presigned-expires", "expect", "x-amzn-trace-id"],
        isSignableHeader: function(e) {
            return 0 === e.toLowerCase().indexOf("x-amz-") || this.unsignableHeaders.indexOf(e) < 0
        },
        isPresigned: function() {
            return !!this.request.headers["presigned-expires"]
        }
    }),
    e.exports = r.Signers.V4
}
, function(e, t, n) {
    var r = n(0)
      , i = {}
      , o = []
      , s = "aws4_request";
    e.exports = {
        createScope: function(e, t, n) {
            return [e.substr(0, 8), t, n, s].join("/")
        },
        getSigningKey: function(e, t, n, a, u) {
            var c = [r.util.crypto.hmac(e.secretAccessKey, e.accessKeyId, "base64"), t, n, a].join("_");
            if ((u = !1 !== u) && c in i)
                return i[c];
            var l = r.util.crypto.hmac("AWS4" + e.secretAccessKey, t, "buffer")
              , h = r.util.crypto.hmac(l, n, "buffer")
              , f = r.util.crypto.hmac(h, a, "buffer")
              , d = r.util.crypto.hmac(f, s, "buffer");
            return u && (i[c] = d,
            o.push(c),
            o.length > 50 && delete i[o.shift()]),
            d
        },
        emptyCache: function() {
            i = {},
            o = []
        }
    }
}
, function(e, t, n) {
    var r = n(0)
      , i = r.util.inherit;
    r.Signers.S3 = i(r.Signers.RequestSigner, {
        subResources: {
            acl: 1,
            accelerate: 1,
            analytics: 1,
            cors: 1,
            lifecycle: 1,
            delete: 1,
            inventory: 1,
            location: 1,
            logging: 1,
            metrics: 1,
            notification: 1,
            partNumber: 1,
            policy: 1,
            requestPayment: 1,
            replication: 1,
            restore: 1,
            tagging: 1,
            torrent: 1,
            uploadId: 1,
            uploads: 1,
            versionId: 1,
            versioning: 1,
            versions: 1,
            website: 1
        },
        responseHeaders: {
            "response-content-type": 1,
            "response-content-language": 1,
            "response-expires": 1,
            "response-cache-control": 1,
            "response-content-disposition": 1,
            "response-content-encoding": 1
        },
        addAuthorization: function(e, t) {
            this.request.headers["presigned-expires"] || (this.request.headers["X-Amz-Date"] = r.util.date.rfc822(t)),
            e.sessionToken && (this.request.headers["x-amz-security-token"] = e.sessionToken);
            var n = this.sign(e.secretAccessKey, this.stringToSign())
              , i = "AWS " + e.accessKeyId + ":" + n;
            this.request.headers.Authorization = i
        },
        stringToSign: function() {
            var e = this.request
              , t = [];
            t.push(e.method),
            t.push(e.headers["Content-MD5"] || ""),
            t.push(e.headers["Content-Type"] || ""),
            t.push(e.headers["presigned-expires"] || "");
            var n = this.canonicalizedAmzHeaders();
            return n && t.push(n),
            t.push(this.canonicalizedResource()),
            t.join("\n")
        },
        canonicalizedAmzHeaders: function() {
            var e = [];
            r.util.each(this.request.headers, (function(t) {
                t.match(/^x-amz-/i) && e.push(t)
            }
            )),
            e.sort((function(e, t) {
                return e.toLowerCase() < t.toLowerCase() ? -1 : 1
            }
            ));
            var t = [];
            return r.util.arrayEach.call(this, e, (function(e) {
                t.push(e.toLowerCase() + ":" + String(this.request.headers[e]))
            }
            )),
            t.join("\n")
        },
        canonicalizedResource: function() {
            var e = this.request
              , t = e.path.split("?")
              , n = t[0]
              , i = t[1]
              , o = "";
            if (e.virtualHostedBucket && (o += "/" + e.virtualHostedBucket),
            o += n,
            i) {
                var s = [];
                r.util.arrayEach.call(this, i.split("&"), (function(e) {
                    var t = e.split("=")[0]
                      , n = e.split("=")[1];
                    if (this.subResources[t] || this.responseHeaders[t]) {
                        var r = {
                            name: t
                        };
                        void 0 !== n && (this.subResources[t] ? r.value = n : r.value = decodeURIComponent(n)),
                        s.push(r)
                    }
                }
                )),
                s.sort((function(e, t) {
                    return e.name < t.name ? -1 : 1
                }
                )),
                s.length && (i = [],
                r.util.arrayEach(s, (function(e) {
                    void 0 === e.value ? i.push(e.name) : i.push(e.name + "=" + e.value)
                }
                )),
                o += "?" + i.join("&"))
            }
            return o
        },
        sign: function(e, t) {
            return r.util.crypto.hmac(e, t, "base64", "sha1")
        }
    }),
    e.exports = r.Signers.S3
}
, function(e, t, n) {
    var r = n(0)
      , i = r.util.inherit
      , o = "presigned-expires";
    function s(e) {
        var t = e.httpRequest.headers[o]
          , n = e.service.getSignerClass(e);
        if (delete e.httpRequest.headers["User-Agent"],
        delete e.httpRequest.headers["X-Amz-User-Agent"],
        n === r.Signers.V4) {
            if (t > 604800) {
                throw r.util.error(new Error, {
                    code: "InvalidExpiryTime",
                    message: "Presigning does not support expiry time greater than a week with SigV4 signing.",
                    retryable: !1
                })
            }
            e.httpRequest.headers[o] = t
        } else {
            if (n !== r.Signers.S3)
                throw r.util.error(new Error, {
                    message: "Presigning only supports S3 or SigV4 signing.",
                    code: "UnsupportedSigner",
                    retryable: !1
                });
            var i = e.service ? e.service.getSkewCorrectedDate() : r.util.date.getDate();
            e.httpRequest.headers[o] = parseInt(r.util.date.unixTimestamp(i) + t, 10).toString()
        }
    }
    function a(e) {
        var t = e.httpRequest.endpoint
          , n = r.util.urlParse(e.httpRequest.path)
          , i = {};
        n.search && (i = r.util.queryStringParse(n.search.substr(1)));
        var s = e.httpRequest.headers.Authorization.split(" ");
        if ("AWS" === s[0])
            s = s[1].split(":"),
            i.AWSAccessKeyId = s[0],
            i.Signature = s[1],
            r.util.each(e.httpRequest.headers, (function(e, t) {
                e === o && (e = "Expires"),
                0 === e.indexOf("x-amz-meta-") && (delete i[e],
                e = e.toLowerCase()),
                i[e] = t
            }
            )),
            delete e.httpRequest.headers[o],
            delete i.Authorization,
            delete i.Host;
        else if ("AWS4-HMAC-SHA256" === s[0]) {
            s.shift();
            var a = s.join(" ").match(/Signature=(.*?)(?:,|\s|\r?\n|$)/)[1];
            i["X-Amz-Signature"] = a,
            delete i.Expires
        }
        t.pathname = n.pathname,
        t.search = r.util.queryParamsToString(i)
    }
    r.Signers.Presign = i({
        sign: function(e, t, n) {
            if (e.httpRequest.headers[o] = t || 3600,
            e.on("build", s),
            e.on("sign", a),
            e.removeListener("afterBuild", r.EventListeners.Core.SET_CONTENT_LENGTH),
            e.removeListener("afterBuild", r.EventListeners.Core.COMPUTE_SHA256),
            e.emit("beforePresign", [e]),
            !n) {
                if (e.build(),
                e.response.error)
                    throw e.response.error;
                return r.util.urlFormat(e.httpRequest.endpoint)
            }
            e.build((function() {
                this.response.error ? n(this.response.error) : n(null, r.util.urlFormat(e.httpRequest.endpoint))
            }
            ))
        }
    }),
    e.exports = r.Signers.Presign
}
, function(e, t, n) {
    var r = n(0);
    r.ParamValidator = r.util.inherit({
        constructor: function(e) {
            !0 !== e && void 0 !== e || (e = {
                min: !0
            }),
            this.validation = e
        },
        validate: function(e, t, n) {
            if (this.errors = [],
            this.validateMember(e, t || {}, n || "params"),
            this.errors.length > 1) {
                var i = this.errors.join("\n* ");
                throw i = "There were " + this.errors.length + " validation errors:\n* " + i,
                r.util.error(new Error(i), {
                    code: "MultipleValidationErrors",
                    errors: this.errors
                })
            }
            if (1 === this.errors.length)
                throw this.errors[0];
            return !0
        },
        fail: function(e, t) {
            this.errors.push(r.util.error(new Error(t), {
                code: e
            }))
        },
        validateStructure: function(e, t, n) {
            var r;
            this.validateType(t, n, ["object"], "structure");
            for (var i = 0; e.required && i < e.required.length; i++) {
                var o = t[r = e.required[i]];
                null == o && this.fail("MissingRequiredParameter", "Missing required key '" + r + "' in " + n)
            }
            for (r in t)
                if (Object.prototype.hasOwnProperty.call(t, r)) {
                    var s = t[r]
                      , a = e.members[r];
                    if (void 0 !== a) {
                        var u = [n, r].join(".");
                        this.validateMember(a, s, u)
                    } else
                        this.fail("UnexpectedParameter", "Unexpected key '" + r + "' found in " + n)
                }
            return !0
        },
        validateMember: function(e, t, n) {
            switch (e.type) {
            case "structure":
                return this.validateStructure(e, t, n);
            case "list":
                return this.validateList(e, t, n);
            case "map":
                return this.validateMap(e, t, n);
            default:
                return this.validateScalar(e, t, n)
            }
        },
        validateList: function(e, t, n) {
            if (this.validateType(t, n, [Array])) {
                this.validateRange(e, t.length, n, "list member count");
                for (var r = 0; r < t.length; r++)
                    this.validateMember(e.member, t[r], n + "[" + r + "]")
            }
        },
        validateMap: function(e, t, n) {
            if (this.validateType(t, n, ["object"], "map")) {
                var r = 0;
                for (var i in t)
                    Object.prototype.hasOwnProperty.call(t, i) && (this.validateMember(e.key, i, n + "[key='" + i + "']"),
                    this.validateMember(e.value, t[i], n + "['" + i + "']"),
                    r++);
                this.validateRange(e, r, n, "map member count")
            }
        },
        validateScalar: function(e, t, n) {
            switch (e.type) {
            case null:
            case void 0:
            case "string":
                return this.validateString(e, t, n);
            case "base64":
            case "binary":
                return this.validatePayload(t, n);
            case "integer":
            case "float":
                return this.validateNumber(e, t, n);
            case "boolean":
                return this.validateType(t, n, ["boolean"]);
            case "timestamp":
                return this.validateType(t, n, [Date, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/, "number"], "Date object, ISO-8601 string, or a UNIX timestamp");
            default:
                return this.fail("UnkownType", "Unhandled type " + e.type + " for " + n)
            }
        },
        validateString: function(e, t, n) {
            var r = ["string"];
            e.isJsonValue && (r = r.concat(["number", "object", "boolean"])),
            null !== t && this.validateType(t, n, r) && (this.validateEnum(e, t, n),
            this.validateRange(e, t.length, n, "string length"),
            this.validatePattern(e, t, n),
            this.validateUri(e, t, n))
        },
        validateUri: function(e, t, n) {
            "uri" === e.location && 0 === t.length && this.fail("UriParameterError", 'Expected uri parameter to have length >= 1, but found "' + t + '" for ' + n)
        },
        validatePattern: function(e, t, n) {
            this.validation.pattern && void 0 !== e.pattern && (new RegExp(e.pattern).test(t) || this.fail("PatternMatchError", 'Provided value "' + t + '" does not match regex pattern /' + e.pattern + "/ for " + n))
        },
        validateRange: function(e, t, n, r) {
            this.validation.min && void 0 !== e.min && t < e.min && this.fail("MinRangeError", "Expected " + r + " >= " + e.min + ", but found " + t + " for " + n),
            this.validation.max && void 0 !== e.max && t > e.max && this.fail("MaxRangeError", "Expected " + r + " <= " + e.max + ", but found " + t + " for " + n)
        },
        validateEnum: function(e, t, n) {
            this.validation.enum && void 0 !== e.enum && -1 === e.enum.indexOf(t) && this.fail("EnumError", "Found string value of " + t + ", but expected " + e.enum.join("|") + " for " + n)
        },
        validateType: function(e, t, n, i) {
            if (null == e)
                return !1;
            for (var o = !1, s = 0; s < n.length; s++) {
                if ("string" == typeof n[s]) {
                    if (typeof e === n[s])
                        return !0
                } else if (n[s]instanceof RegExp) {
                    if ((e || "").toString().match(n[s]))
                        return !0
                } else {
                    if (e instanceof n[s])
                        return !0;
                    if (r.util.isType(e, n[s]))
                        return !0;
                    i || o || (n = n.slice()),
                    n[s] = r.util.typeName(n[s])
                }
                o = !0
            }
            var a = i;
            a || (a = n.join(", ").replace(/,([^,]+)$/, ", or$1"));
            var u = a.match(/^[aeiou]/i) ? "n" : "";
            return this.fail("InvalidParameterType", "Expected " + t + " to be a" + u + " " + a),
            !1
        },
        validateNumber: function(e, t, n) {
            if (null != t) {
                if ("string" == typeof t) {
                    var r = parseFloat(t);
                    r.toString() === t && (t = r)
                }
                this.validateType(t, n, ["number"]) && this.validateRange(e, t, n, "numeric value")
            }
        },
        validatePayload: function(e, t) {
            if (null != e && "string" != typeof e && (!e || "number" != typeof e.byteLength)) {
                if (r.util.isNode()) {
                    var n = r.util.stream.Stream;
                    if (r.util.Buffer.isBuffer(e) || e instanceof n)
                        return
                } else if (void 0 !== typeof Blob && e instanceof Blob)
                    return;
                var i = ["Buffer", "Stream", "File", "Blob", "ArrayBuffer", "DataView"];
                if (e)
                    for (var o = 0; o < i.length; o++) {
                        if (r.util.isType(e, i[o]))
                            return;
                        if (r.util.typeName(e.constructor) === i[o])
                            return
                    }
                this.fail("InvalidParameterType", "Expected " + t + " to be a string, Buffer, Stream, Blob, or typed array object")
            }
        }
    })
}
, function(e) {
    e.exports = JSON.parse('{"acm":{"name":"ACM","cors":true},"apigateway":{"name":"APIGateway","cors":true},"applicationautoscaling":{"prefix":"application-autoscaling","name":"ApplicationAutoScaling","cors":true},"appstream":{"name":"AppStream"},"autoscaling":{"name":"AutoScaling","cors":true},"batch":{"name":"Batch"},"budgets":{"name":"Budgets"},"clouddirectory":{"name":"CloudDirectory","versions":["2016-05-10*"]},"cloudformation":{"name":"CloudFormation","cors":true},"cloudfront":{"name":"CloudFront","versions":["2013-05-12*","2013-11-11*","2014-05-31*","2014-10-21*","2014-11-06*","2015-04-17*","2015-07-27*","2015-09-17*","2016-01-13*","2016-01-28*","2016-08-01*","2016-08-20*","2016-09-07*","2016-09-29*","2016-11-25*","2017-03-25*","2017-10-30*","2018-06-18*","2018-11-05*"],"cors":true},"cloudhsm":{"name":"CloudHSM","cors":true},"cloudsearch":{"name":"CloudSearch"},"cloudsearchdomain":{"name":"CloudSearchDomain"},"cloudtrail":{"name":"CloudTrail","cors":true},"cloudwatch":{"prefix":"monitoring","name":"CloudWatch","cors":true},"cloudwatchevents":{"prefix":"events","name":"CloudWatchEvents","versions":["2014-02-03*"],"cors":true},"cloudwatchlogs":{"prefix":"logs","name":"CloudWatchLogs","cors":true},"codebuild":{"name":"CodeBuild","cors":true},"codecommit":{"name":"CodeCommit","cors":true},"codedeploy":{"name":"CodeDeploy","cors":true},"codepipeline":{"name":"CodePipeline","cors":true},"cognitoidentity":{"prefix":"cognito-identity","name":"CognitoIdentity","cors":true},"cognitoidentityserviceprovider":{"prefix":"cognito-idp","name":"CognitoIdentityServiceProvider","cors":true},"cognitosync":{"prefix":"cognito-sync","name":"CognitoSync","cors":true},"configservice":{"prefix":"config","name":"ConfigService","cors":true},"cur":{"name":"CUR","cors":true},"datapipeline":{"name":"DataPipeline"},"devicefarm":{"name":"DeviceFarm","cors":true},"directconnect":{"name":"DirectConnect","cors":true},"directoryservice":{"prefix":"ds","name":"DirectoryService"},"discovery":{"name":"Discovery"},"dms":{"name":"DMS"},"dynamodb":{"name":"DynamoDB","cors":true},"dynamodbstreams":{"prefix":"streams.dynamodb","name":"DynamoDBStreams","cors":true},"ec2":{"name":"EC2","versions":["2013-06-15*","2013-10-15*","2014-02-01*","2014-05-01*","2014-06-15*","2014-09-01*","2014-10-01*","2015-03-01*","2015-04-15*","2015-10-01*","2016-04-01*","2016-09-15*"],"cors":true},"ecr":{"name":"ECR","cors":true},"ecs":{"name":"ECS","cors":true},"efs":{"prefix":"elasticfilesystem","name":"EFS","cors":true},"elasticache":{"name":"ElastiCache","versions":["2012-11-15*","2014-03-24*","2014-07-15*","2014-09-30*"],"cors":true},"elasticbeanstalk":{"name":"ElasticBeanstalk","cors":true},"elb":{"prefix":"elasticloadbalancing","name":"ELB","cors":true},"elbv2":{"prefix":"elasticloadbalancingv2","name":"ELBv2","cors":true},"emr":{"prefix":"elasticmapreduce","name":"EMR","cors":true},"es":{"name":"ES"},"elastictranscoder":{"name":"ElasticTranscoder","cors":true},"firehose":{"name":"Firehose","cors":true},"gamelift":{"name":"GameLift","cors":true},"glacier":{"name":"Glacier"},"health":{"name":"Health"},"iam":{"name":"IAM","cors":true},"importexport":{"name":"ImportExport"},"inspector":{"name":"Inspector","versions":["2015-08-18*"],"cors":true},"iot":{"name":"Iot","cors":true},"iotdata":{"prefix":"iot-data","name":"IotData","cors":true},"kinesis":{"name":"Kinesis","cors":true},"kinesisanalytics":{"name":"KinesisAnalytics"},"kms":{"name":"KMS","cors":true},"lambda":{"name":"Lambda","cors":true},"lexruntime":{"prefix":"runtime.lex","name":"LexRuntime","cors":true},"lightsail":{"name":"Lightsail"},"machinelearning":{"name":"MachineLearning","cors":true},"marketplacecommerceanalytics":{"name":"MarketplaceCommerceAnalytics","cors":true},"marketplacemetering":{"prefix":"meteringmarketplace","name":"MarketplaceMetering"},"mturk":{"prefix":"mturk-requester","name":"MTurk","cors":true},"mobileanalytics":{"name":"MobileAnalytics","cors":true},"opsworks":{"name":"OpsWorks","cors":true},"opsworkscm":{"name":"OpsWorksCM"},"organizations":{"name":"Organizations"},"pinpoint":{"name":"Pinpoint"},"polly":{"name":"Polly","cors":true},"rds":{"name":"RDS","versions":["2014-09-01*"],"cors":true},"redshift":{"name":"Redshift","cors":true},"rekognition":{"name":"Rekognition","cors":true},"resourcegroupstaggingapi":{"name":"ResourceGroupsTaggingAPI"},"route53":{"name":"Route53","cors":true},"route53domains":{"name":"Route53Domains","cors":true},"s3":{"name":"S3","dualstackAvailable":true,"cors":true},"s3control":{"name":"S3Control","dualstackAvailable":true},"servicecatalog":{"name":"ServiceCatalog","cors":true},"ses":{"prefix":"email","name":"SES","cors":true},"shield":{"name":"Shield"},"simpledb":{"prefix":"sdb","name":"SimpleDB"},"sms":{"name":"SMS"},"snowball":{"name":"Snowball"},"sns":{"name":"SNS","cors":true},"sqs":{"name":"SQS","cors":true},"ssm":{"name":"SSM","cors":true},"storagegateway":{"name":"StorageGateway","cors":true},"stepfunctions":{"prefix":"states","name":"StepFunctions"},"sts":{"name":"STS","cors":true},"support":{"name":"Support"},"swf":{"name":"SWF"},"xray":{"name":"XRay"},"waf":{"name":"WAF","cors":true},"wafregional":{"prefix":"waf-regional","name":"WAFRegional"},"workdocs":{"name":"WorkDocs","cors":true},"workspaces":{"name":"WorkSpaces"},"codestar":{"name":"CodeStar"},"lexmodelbuildingservice":{"prefix":"lex-models","name":"LexModelBuildingService","cors":true},"marketplaceentitlementservice":{"prefix":"entitlement.marketplace","name":"MarketplaceEntitlementService"},"athena":{"name":"Athena"},"greengrass":{"name":"Greengrass"},"dax":{"name":"DAX"},"migrationhub":{"prefix":"AWSMigrationHub","name":"MigrationHub"},"cloudhsmv2":{"name":"CloudHSMV2"},"glue":{"name":"Glue"},"mobile":{"name":"Mobile"},"pricing":{"name":"Pricing","cors":true},"costexplorer":{"prefix":"ce","name":"CostExplorer","cors":true},"mediaconvert":{"name":"MediaConvert"},"medialive":{"name":"MediaLive"},"mediapackage":{"name":"MediaPackage"},"mediastore":{"name":"MediaStore"},"mediastoredata":{"prefix":"mediastore-data","name":"MediaStoreData","cors":true},"appsync":{"name":"AppSync"},"guardduty":{"name":"GuardDuty"},"mq":{"name":"MQ"},"comprehend":{"name":"Comprehend","cors":true},"iotjobsdataplane":{"prefix":"iot-jobs-data","name":"IoTJobsDataPlane"},"kinesisvideoarchivedmedia":{"prefix":"kinesis-video-archived-media","name":"KinesisVideoArchivedMedia","cors":true},"kinesisvideomedia":{"prefix":"kinesis-video-media","name":"KinesisVideoMedia","cors":true},"kinesisvideo":{"name":"KinesisVideo","cors":true},"sagemakerruntime":{"prefix":"runtime.sagemaker","name":"SageMakerRuntime"},"sagemaker":{"name":"SageMaker"},"translate":{"name":"Translate","cors":true},"resourcegroups":{"prefix":"resource-groups","name":"ResourceGroups","cors":true},"alexaforbusiness":{"name":"AlexaForBusiness"},"cloud9":{"name":"Cloud9"},"serverlessapplicationrepository":{"prefix":"serverlessrepo","name":"ServerlessApplicationRepository"},"servicediscovery":{"name":"ServiceDiscovery"},"workmail":{"name":"WorkMail"},"autoscalingplans":{"prefix":"autoscaling-plans","name":"AutoScalingPlans"},"transcribeservice":{"prefix":"transcribe","name":"TranscribeService"},"connect":{"name":"Connect"},"acmpca":{"prefix":"acm-pca","name":"ACMPCA"},"fms":{"name":"FMS"},"secretsmanager":{"name":"SecretsManager","cors":true},"iotanalytics":{"name":"IoTAnalytics"},"iot1clickdevicesservice":{"prefix":"iot1click-devices","name":"IoT1ClickDevicesService"},"iot1clickprojects":{"prefix":"iot1click-projects","name":"IoT1ClickProjects"},"pi":{"name":"PI"},"neptune":{"name":"Neptune"},"mediatailor":{"name":"MediaTailor"},"eks":{"name":"EKS"},"macie":{"name":"Macie"},"dlm":{"name":"DLM"},"signer":{"name":"Signer"},"chime":{"name":"Chime"},"pinpointemail":{"prefix":"pinpoint-email","name":"PinpointEmail"},"ram":{"name":"RAM"},"route53resolver":{"name":"Route53Resolver"},"pinpointsmsvoice":{"prefix":"sms-voice","name":"PinpointSMSVoice"},"quicksight":{"name":"QuickSight"},"rdsdataservice":{"prefix":"rds-data","name":"RDSDataService"},"amplify":{"name":"Amplify"},"datasync":{"name":"DataSync"},"robomaker":{"name":"RoboMaker"},"transfer":{"name":"Transfer"},"globalaccelerator":{"name":"GlobalAccelerator"},"comprehendmedical":{"name":"ComprehendMedical","cors":true},"kinesisanalyticsv2":{"name":"KinesisAnalyticsV2"},"mediaconnect":{"name":"MediaConnect"},"fsx":{"name":"FSx"},"securityhub":{"name":"SecurityHub"},"appmesh":{"name":"AppMesh","versions":["2018-10-01*"]},"licensemanager":{"prefix":"license-manager","name":"LicenseManager"},"kafka":{"name":"Kafka"},"apigatewaymanagementapi":{"name":"ApiGatewayManagementApi"},"apigatewayv2":{"name":"ApiGatewayV2"},"docdb":{"name":"DocDB"},"backup":{"name":"Backup"},"worklink":{"name":"WorkLink"},"textract":{"name":"Textract"},"managedblockchain":{"name":"ManagedBlockchain"},"mediapackagevod":{"prefix":"mediapackage-vod","name":"MediaPackageVod"},"groundstation":{"name":"GroundStation"},"iotthingsgraph":{"name":"IoTThingsGraph"},"iotevents":{"name":"IoTEvents"},"ioteventsdata":{"prefix":"iotevents-data","name":"IoTEventsData"},"personalize":{"name":"Personalize","cors":true},"personalizeevents":{"prefix":"personalize-events","name":"PersonalizeEvents","cors":true},"personalizeruntime":{"prefix":"personalize-runtime","name":"PersonalizeRuntime","cors":true},"applicationinsights":{"prefix":"application-insights","name":"ApplicationInsights"},"servicequotas":{"prefix":"service-quotas","name":"ServiceQuotas"},"ec2instanceconnect":{"prefix":"ec2-instance-connect","name":"EC2InstanceConnect"},"eventbridge":{"name":"EventBridge"},"lakeformation":{"name":"LakeFormation"},"forecastservice":{"prefix":"forecast","name":"ForecastService"},"forecastqueryservice":{"prefix":"forecastquery","name":"ForecastQueryService"}}')
}
, function(e, t, n) {
    var r = n(89)
      , i = n(90)
      , o = i;
    o.v1 = r,
    o.v4 = i,
    e.exports = o
}
, function(e, t, n) {
    var r, i, o = n(40), s = n(41), a = 0, u = 0;
    e.exports = function(e, t, n) {
        var c = t && n || 0
          , l = t || []
          , h = (e = e || {}).node || r
          , f = void 0 !== e.clockseq ? e.clockseq : i;
        if (null == h || null == f) {
            var d = o();
            null == h && (h = r = [1 | d[0], d[1], d[2], d[3], d[4], d[5]]),
            null == f && (f = i = 16383 & (d[6] << 8 | d[7]))
        }
        var p = void 0 !== e.msecs ? e.msecs : (new Date).getTime()
          , g = void 0 !== e.nsecs ? e.nsecs : u + 1
          , m = p - a + (g - u) / 1e4;
        if (m < 0 && void 0 === e.clockseq && (f = f + 1 & 16383),
        (m < 0 || p > a) && void 0 === e.nsecs && (g = 0),
        g >= 1e4)
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        a = p,
        u = g,
        i = f;
        var y = (1e4 * (268435455 & (p += 122192928e5)) + g) % 4294967296;
        l[c++] = y >>> 24 & 255,
        l[c++] = y >>> 16 & 255,
        l[c++] = y >>> 8 & 255,
        l[c++] = 255 & y;
        var v = p / 4294967296 * 1e4 & 268435455;
        l[c++] = v >>> 8 & 255,
        l[c++] = 255 & v,
        l[c++] = v >>> 24 & 15 | 16,
        l[c++] = v >>> 16 & 255,
        l[c++] = f >>> 8 | 128,
        l[c++] = 255 & f;
        for (var b = 0; b < 6; ++b)
            l[c + b] = h[b];
        return t || s(l)
    }
}
, function(e, t, n) {
    var r = n(40)
      , i = n(41);
    e.exports = function(e, t, n) {
        var o = t && n || 0;
        "string" == typeof e && (t = "binary" === e ? new Array(16) : null,
        e = null);
        var s = (e = e || {}).random || (e.rng || r)();
        if (s[6] = 15 & s[6] | 64,
        s[8] = 63 & s[8] | 128,
        t)
            for (var a = 0; a < 16; ++a)
                t[o + a] = s[a];
        return t || i(s)
    }
}
, function(e, t, n) {
    var r = n(92)
      , i = n(96)
      , o = n(97)
      , s = n(98);
    e.exports = {
        createHash: function(e) {
            if ("md5" === (e = e.toLowerCase()))
                return new i;
            if ("sha256" === e)
                return new s;
            if ("sha1" === e)
                return new o;
            throw new Error("Hash algorithm " + e + " is not supported in the browser SDK")
        },
        createHmac: function(e, t) {
            if ("md5" === (e = e.toLowerCase()))
                return new r(i,t);
            if ("sha256" === e)
                return new r(s,t);
            if ("sha1" === e)
                return new r(o,t);
            throw new Error("HMAC algorithm " + e + " is not supported in the browser SDK")
        },
        createSign: function() {
            throw new Error("createSign is not implemented in the browser")
        }
    }
}
, function(e, t, n) {
    var r = n(15);
    function i(e, t) {
        this.hash = new e,
        this.outer = new e;
        var n = function(e, t) {
            var n = r.convertToBuffer(t);
            if (n.byteLength > e.BLOCK_SIZE) {
                var i = new e;
                i.update(n),
                n = i.digest()
            }
            var o = new Uint8Array(e.BLOCK_SIZE);
            return o.set(n),
            o
        }(e, t)
          , i = new Uint8Array(e.BLOCK_SIZE);
        i.set(n);
        for (var o = 0; o < e.BLOCK_SIZE; o++)
            n[o] ^= 54,
            i[o] ^= 92;
        this.hash.update(n),
        this.outer.update(i);
        for (o = 0; o < n.byteLength; o++)
            n[o] = 0
    }
    e.exports = i,
    i.prototype.update = function(e) {
        if (r.isEmptyData(e) || this.error)
            return this;
        try {
            this.hash.update(r.convertToBuffer(e))
        } catch (e) {
            this.error = e
        }
        return this
    }
    ,
    i.prototype.digest = function(e) {
        return this.outer.finished || this.outer.update(this.hash.digest()),
        this.outer.digest(e)
    }
}
, function(e, t, n) {
    "use strict";
    t.byteLength = function(e) {
        var t = c(e)
          , n = t[0]
          , r = t[1];
        return 3 * (n + r) / 4 - r
    }
    ,
    t.toByteArray = function(e) {
        var t, n, r = c(e), s = r[0], a = r[1], u = new o(function(e, t, n) {
            return 3 * (t + n) / 4 - n
        }(0, s, a)), l = 0, h = a > 0 ? s - 4 : s;
        for (n = 0; n < h; n += 4)
            t = i[e.charCodeAt(n)] << 18 | i[e.charCodeAt(n + 1)] << 12 | i[e.charCodeAt(n + 2)] << 6 | i[e.charCodeAt(n + 3)],
            u[l++] = t >> 16 & 255,
            u[l++] = t >> 8 & 255,
            u[l++] = 255 & t;
        2 === a && (t = i[e.charCodeAt(n)] << 2 | i[e.charCodeAt(n + 1)] >> 4,
        u[l++] = 255 & t);
        1 === a && (t = i[e.charCodeAt(n)] << 10 | i[e.charCodeAt(n + 1)] << 4 | i[e.charCodeAt(n + 2)] >> 2,
        u[l++] = t >> 8 & 255,
        u[l++] = 255 & t);
        return u
    }
    ,
    t.fromByteArray = function(e) {
        for (var t, n = e.length, i = n % 3, o = [], s = 0, a = n - i; s < a; s += 16383)
            o.push(l(e, s, s + 16383 > a ? a : s + 16383));
        1 === i ? (t = e[n - 1],
        o.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === i && (t = (e[n - 2] << 8) + e[n - 1],
        o.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
        return o.join("")
    }
    ;
    for (var r = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = s.length; a < u; ++a)
        r[a] = s[a],
        i[s.charCodeAt(a)] = a;
    function c(e) {
        var t = e.length;
        if (t % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
        var n = e.indexOf("=");
        return -1 === n && (n = t),
        [n, n === t ? 0 : 4 - n % 4]
    }
    function l(e, t, n) {
        for (var i, o, s = [], a = t; a < n; a += 3)
            i = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]),
            s.push(r[(o = i) >> 18 & 63] + r[o >> 12 & 63] + r[o >> 6 & 63] + r[63 & o]);
        return s.join("")
    }
    i["-".charCodeAt(0)] = 62,
    i["_".charCodeAt(0)] = 63
}
, function(e, t) {
    t.read = function(e, t, n, r, i) {
        var o, s, a = 8 * i - r - 1, u = (1 << a) - 1, c = u >> 1, l = -7, h = n ? i - 1 : 0, f = n ? -1 : 1, d = e[t + h];
        for (h += f,
        o = d & (1 << -l) - 1,
        d >>= -l,
        l += a; l > 0; o = 256 * o + e[t + h],
        h += f,
        l -= 8)
            ;
        for (s = o & (1 << -l) - 1,
        o >>= -l,
        l += r; l > 0; s = 256 * s + e[t + h],
        h += f,
        l -= 8)
            ;
        if (0 === o)
            o = 1 - c;
        else {
            if (o === u)
                return s ? NaN : 1 / 0 * (d ? -1 : 1);
            s += Math.pow(2, r),
            o -= c
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - r)
    }
    ,
    t.write = function(e, t, n, r, i, o) {
        var s, a, u, c = 8 * o - i - 1, l = (1 << c) - 1, h = l >> 1, f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = r ? 0 : o - 1, p = r ? 1 : -1, g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t),
        isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0,
        s = l) : (s = Math.floor(Math.log(t) / Math.LN2),
        t * (u = Math.pow(2, -s)) < 1 && (s--,
        u *= 2),
        (t += s + h >= 1 ? f / u : f * Math.pow(2, 1 - h)) * u >= 2 && (s++,
        u /= 2),
        s + h >= l ? (a = 0,
        s = l) : s + h >= 1 ? (a = (t * u - 1) * Math.pow(2, i),
        s += h) : (a = t * Math.pow(2, h - 1) * Math.pow(2, i),
        s = 0)); i >= 8; e[n + d] = 255 & a,
        d += p,
        a /= 256,
        i -= 8)
            ;
        for (s = s << i | a,
        c += i; c > 0; e[n + d] = 255 & s,
        d += p,
        s /= 256,
        c -= 8)
            ;
        e[n + d - p] |= 128 * g
    }
}
, function(e, t) {
    var n = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == n.call(e)
    }
}
, function(e, t, n) {
    var r = n(15)
      , i = n(1).Buffer;
    function o() {
        this.state = [1732584193, 4023233417, 2562383102, 271733878],
        this.buffer = new DataView(new ArrayBuffer(64)),
        this.bufferLength = 0,
        this.bytesHashed = 0,
        this.finished = !1
    }
    function s(e, t, n, r, i, o) {
        return ((t = (t + e & 4294967295) + (r + o & 4294967295) & 4294967295) << i | t >>> 32 - i) + n & 4294967295
    }
    function a(e, t, n, r, i, o, a) {
        return s(t & n | ~t & r, e, t, i, o, a)
    }
    function u(e, t, n, r, i, o, a) {
        return s(t & r | n & ~r, e, t, i, o, a)
    }
    function c(e, t, n, r, i, o, a) {
        return s(t ^ n ^ r, e, t, i, o, a)
    }
    function l(e, t, n, r, i, o, a) {
        return s(n ^ (t | ~r), e, t, i, o, a)
    }
    e.exports = o,
    o.BLOCK_SIZE = 64,
    o.prototype.update = function(e) {
        if (r.isEmptyData(e))
            return this;
        if (this.finished)
            throw new Error("Attempted to update an already finished hash.");
        var t = r.convertToBuffer(e)
          , n = 0
          , i = t.byteLength;
        for (this.bytesHashed += i; i > 0; )
            this.buffer.setUint8(this.bufferLength++, t[n++]),
            i--,
            64 === this.bufferLength && (this.hashBuffer(),
            this.bufferLength = 0);
        return this
    }
    ,
    o.prototype.digest = function(e) {
        if (!this.finished) {
            var t = this.buffer
              , n = this.bufferLength
              , r = 8 * this.bytesHashed;
            if (t.setUint8(this.bufferLength++, 128),
            n % 64 >= 56) {
                for (var o = this.bufferLength; o < 64; o++)
                    t.setUint8(o, 0);
                this.hashBuffer(),
                this.bufferLength = 0
            }
            for (o = this.bufferLength; o < 56; o++)
                t.setUint8(o, 0);
            t.setUint32(56, r >>> 0, !0),
            t.setUint32(60, Math.floor(r / 4294967296), !0),
            this.hashBuffer(),
            this.finished = !0
        }
        var s = new DataView(new ArrayBuffer(16));
        for (o = 0; o < 4; o++)
            s.setUint32(4 * o, this.state[o], !0);
        var a = new i(s.buffer,s.byteOffset,s.byteLength);
        return e ? a.toString(e) : a
    }
    ,
    o.prototype.hashBuffer = function() {
        var e = this.buffer
          , t = this.state
          , n = t[0]
          , r = t[1]
          , i = t[2]
          , o = t[3];
        n = a(n, r, i, o, e.getUint32(0, !0), 7, 3614090360),
        o = a(o, n, r, i, e.getUint32(4, !0), 12, 3905402710),
        i = a(i, o, n, r, e.getUint32(8, !0), 17, 606105819),
        r = a(r, i, o, n, e.getUint32(12, !0), 22, 3250441966),
        n = a(n, r, i, o, e.getUint32(16, !0), 7, 4118548399),
        o = a(o, n, r, i, e.getUint32(20, !0), 12, 1200080426),
        i = a(i, o, n, r, e.getUint32(24, !0), 17, 2821735955),
        r = a(r, i, o, n, e.getUint32(28, !0), 22, 4249261313),
        n = a(n, r, i, o, e.getUint32(32, !0), 7, 1770035416),
        o = a(o, n, r, i, e.getUint32(36, !0), 12, 2336552879),
        i = a(i, o, n, r, e.getUint32(40, !0), 17, 4294925233),
        r = a(r, i, o, n, e.getUint32(44, !0), 22, 2304563134),
        n = a(n, r, i, o, e.getUint32(48, !0), 7, 1804603682),
        o = a(o, n, r, i, e.getUint32(52, !0), 12, 4254626195),
        i = a(i, o, n, r, e.getUint32(56, !0), 17, 2792965006),
        n = u(n, r = a(r, i, o, n, e.getUint32(60, !0), 22, 1236535329), i, o, e.getUint32(4, !0), 5, 4129170786),
        o = u(o, n, r, i, e.getUint32(24, !0), 9, 3225465664),
        i = u(i, o, n, r, e.getUint32(44, !0), 14, 643717713),
        r = u(r, i, o, n, e.getUint32(0, !0), 20, 3921069994),
        n = u(n, r, i, o, e.getUint32(20, !0), 5, 3593408605),
        o = u(o, n, r, i, e.getUint32(40, !0), 9, 38016083),
        i = u(i, o, n, r, e.getUint32(60, !0), 14, 3634488961),
        r = u(r, i, o, n, e.getUint32(16, !0), 20, 3889429448),
        n = u(n, r, i, o, e.getUint32(36, !0), 5, 568446438),
        o = u(o, n, r, i, e.getUint32(56, !0), 9, 3275163606),
        i = u(i, o, n, r, e.getUint32(12, !0), 14, 4107603335),
        r = u(r, i, o, n, e.getUint32(32, !0), 20, 1163531501),
        n = u(n, r, i, o, e.getUint32(52, !0), 5, 2850285829),
        o = u(o, n, r, i, e.getUint32(8, !0), 9, 4243563512),
        i = u(i, o, n, r, e.getUint32(28, !0), 14, 1735328473),
        n = c(n, r = u(r, i, o, n, e.getUint32(48, !0), 20, 2368359562), i, o, e.getUint32(20, !0), 4, 4294588738),
        o = c(o, n, r, i, e.getUint32(32, !0), 11, 2272392833),
        i = c(i, o, n, r, e.getUint32(44, !0), 16, 1839030562),
        r = c(r, i, o, n, e.getUint32(56, !0), 23, 4259657740),
        n = c(n, r, i, o, e.getUint32(4, !0), 4, 2763975236),
        o = c(o, n, r, i, e.getUint32(16, !0), 11, 1272893353),
        i = c(i, o, n, r, e.getUint32(28, !0), 16, 4139469664),
        r = c(r, i, o, n, e.getUint32(40, !0), 23, 3200236656),
        n = c(n, r, i, o, e.getUint32(52, !0), 4, 681279174),
        o = c(o, n, r, i, e.getUint32(0, !0), 11, 3936430074),
        i = c(i, o, n, r, e.getUint32(12, !0), 16, 3572445317),
        r = c(r, i, o, n, e.getUint32(24, !0), 23, 76029189),
        n = c(n, r, i, o, e.getUint32(36, !0), 4, 3654602809),
        o = c(o, n, r, i, e.getUint32(48, !0), 11, 3873151461),
        i = c(i, o, n, r, e.getUint32(60, !0), 16, 530742520),
        n = l(n, r = c(r, i, o, n, e.getUint32(8, !0), 23, 3299628645), i, o, e.getUint32(0, !0), 6, 4096336452),
        o = l(o, n, r, i, e.getUint32(28, !0), 10, 1126891415),
        i = l(i, o, n, r, e.getUint32(56, !0), 15, 2878612391),
        r = l(r, i, o, n, e.getUint32(20, !0), 21, 4237533241),
        n = l(n, r, i, o, e.getUint32(48, !0), 6, 1700485571),
        o = l(o, n, r, i, e.getUint32(12, !0), 10, 2399980690),
        i = l(i, o, n, r, e.getUint32(40, !0), 15, 4293915773),
        r = l(r, i, o, n, e.getUint32(4, !0), 21, 2240044497),
        n = l(n, r, i, o, e.getUint32(32, !0), 6, 1873313359),
        o = l(o, n, r, i, e.getUint32(60, !0), 10, 4264355552),
        i = l(i, o, n, r, e.getUint32(24, !0), 15, 2734768916),
        r = l(r, i, o, n, e.getUint32(52, !0), 21, 1309151649),
        n = l(n, r, i, o, e.getUint32(16, !0), 6, 4149444226),
        o = l(o, n, r, i, e.getUint32(44, !0), 10, 3174756917),
        i = l(i, o, n, r, e.getUint32(8, !0), 15, 718787259),
        r = l(r, i, o, n, e.getUint32(36, !0), 21, 3951481745),
        t[0] = n + t[0] & 4294967295,
        t[1] = r + t[1] & 4294967295,
        t[2] = i + t[2] & 4294967295,
        t[3] = o + t[3] & 4294967295
    }
}
, function(e, t, n) {
    var r = n(1).Buffer
      , i = n(15);
    new Uint32Array([1518500249, 1859775393, -1894007588, -899497514]),
    Math.pow(2, 53);
    function o() {
        this.h0 = 1732584193,
        this.h1 = 4023233417,
        this.h2 = 2562383102,
        this.h3 = 271733878,
        this.h4 = 3285377520,
        this.block = new Uint32Array(80),
        this.offset = 0,
        this.shift = 24,
        this.totalLength = 0
    }
    e.exports = o,
    o.BLOCK_SIZE = 64,
    o.prototype.update = function(e) {
        if (this.finished)
            throw new Error("Attempted to update an already finished hash.");
        if (i.isEmptyData(e))
            return this;
        var t = (e = i.convertToBuffer(e)).length;
        this.totalLength += 8 * t;
        for (var n = 0; n < t; n++)
            this.write(e[n]);
        return this
    }
    ,
    o.prototype.write = function(e) {
        this.block[this.offset] |= (255 & e) << this.shift,
        this.shift ? this.shift -= 8 : (this.offset++,
        this.shift = 24),
        16 === this.offset && this.processBlock()
    }
    ,
    o.prototype.digest = function(e) {
        this.write(128),
        (this.offset > 14 || 14 === this.offset && this.shift < 24) && this.processBlock(),
        this.offset = 14,
        this.shift = 24,
        this.write(0),
        this.write(0),
        this.write(this.totalLength > 0xffffffffff ? this.totalLength / 1099511627776 : 0),
        this.write(this.totalLength > 4294967295 ? this.totalLength / 4294967296 : 0);
        for (var t = 24; t >= 0; t -= 8)
            this.write(this.totalLength >> t);
        var n = new r(20)
          , i = new DataView(n.buffer);
        return i.setUint32(0, this.h0, !1),
        i.setUint32(4, this.h1, !1),
        i.setUint32(8, this.h2, !1),
        i.setUint32(12, this.h3, !1),
        i.setUint32(16, this.h4, !1),
        e ? n.toString(e) : n
    }
    ,
    o.prototype.processBlock = function() {
        for (var e = 16; e < 80; e++) {
            var t = this.block[e - 3] ^ this.block[e - 8] ^ this.block[e - 14] ^ this.block[e - 16];
            this.block[e] = t << 1 | t >>> 31
        }
        var n, r, i = this.h0, o = this.h1, s = this.h2, a = this.h3, u = this.h4;
        for (e = 0; e < 80; e++) {
            e < 20 ? (n = a ^ o & (s ^ a),
            r = 1518500249) : e < 40 ? (n = o ^ s ^ a,
            r = 1859775393) : e < 60 ? (n = o & s | a & (o | s),
            r = 2400959708) : (n = o ^ s ^ a,
            r = 3395469782);
            var c = (i << 5 | i >>> 27) + n + u + r + (0 | this.block[e]);
            u = a,
            a = s,
            s = o << 30 | o >>> 2,
            o = i,
            i = c
        }
        for (this.h0 = this.h0 + i | 0,
        this.h1 = this.h1 + o | 0,
        this.h2 = this.h2 + s | 0,
        this.h3 = this.h3 + a | 0,
        this.h4 = this.h4 + u | 0,
        this.offset = 0,
        e = 0; e < 16; e++)
            this.block[e] = 0
    }
}
, function(e, t, n) {
    var r = n(1).Buffer
      , i = n(15)
      , o = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])
      , s = Math.pow(2, 53) - 1;
    function a() {
        this.state = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
        this.temp = new Int32Array(64),
        this.buffer = new Uint8Array(64),
        this.bufferLength = 0,
        this.bytesHashed = 0,
        this.finished = !1
    }
    e.exports = a,
    a.BLOCK_SIZE = 64,
    a.prototype.update = function(e) {
        if (this.finished)
            throw new Error("Attempted to update an already finished hash.");
        if (i.isEmptyData(e))
            return this;
        var t = 0
          , n = (e = i.convertToBuffer(e)).byteLength;
        if (this.bytesHashed += n,
        8 * this.bytesHashed > s)
            throw new Error("Cannot hash more than 2^53 - 1 bits");
        for (; n > 0; )
            this.buffer[this.bufferLength++] = e[t++],
            n--,
            64 === this.bufferLength && (this.hashBuffer(),
            this.bufferLength = 0);
        return this
    }
    ,
    a.prototype.digest = function(e) {
        if (!this.finished) {
            var t = 8 * this.bytesHashed
              , n = new DataView(this.buffer.buffer,this.buffer.byteOffset,this.buffer.byteLength)
              , i = this.bufferLength;
            if (n.setUint8(this.bufferLength++, 128),
            i % 64 >= 56) {
                for (var o = this.bufferLength; o < 64; o++)
                    n.setUint8(o, 0);
                this.hashBuffer(),
                this.bufferLength = 0
            }
            for (o = this.bufferLength; o < 56; o++)
                n.setUint8(o, 0);
            n.setUint32(56, Math.floor(t / 4294967296), !0),
            n.setUint32(60, t),
            this.hashBuffer(),
            this.finished = !0
        }
        var s = new r(32);
        for (o = 0; o < 8; o++)
            s[4 * o] = this.state[o] >>> 24 & 255,
            s[4 * o + 1] = this.state[o] >>> 16 & 255,
            s[4 * o + 2] = this.state[o] >>> 8 & 255,
            s[4 * o + 3] = this.state[o] >>> 0 & 255;
        return e ? s.toString(e) : s
    }
    ,
    a.prototype.hashBuffer = function() {
        for (var e = this.buffer, t = this.state, n = t[0], r = t[1], i = t[2], s = t[3], a = t[4], u = t[5], c = t[6], l = t[7], h = 0; h < 64; h++) {
            if (h < 16)
                this.temp[h] = (255 & e[4 * h]) << 24 | (255 & e[4 * h + 1]) << 16 | (255 & e[4 * h + 2]) << 8 | 255 & e[4 * h + 3];
            else {
                var f = this.temp[h - 2]
                  , d = (f >>> 17 | f << 15) ^ (f >>> 19 | f << 13) ^ f >>> 10
                  , p = ((f = this.temp[h - 15]) >>> 7 | f << 25) ^ (f >>> 18 | f << 14) ^ f >>> 3;
                this.temp[h] = (d + this.temp[h - 7] | 0) + (p + this.temp[h - 16] | 0)
            }
            var g = (((a >>> 6 | a << 26) ^ (a >>> 11 | a << 21) ^ (a >>> 25 | a << 7)) + (a & u ^ ~a & c) | 0) + (l + (o[h] + this.temp[h] | 0) | 0) | 0
              , m = ((n >>> 2 | n << 30) ^ (n >>> 13 | n << 19) ^ (n >>> 22 | n << 10)) + (n & r ^ n & i ^ r & i) | 0;
            l = c,
            c = u,
            u = a,
            a = s + g | 0,
            s = i,
            i = r,
            r = n,
            n = g + m | 0
        }
        t[0] += n,
        t[1] += r,
        t[2] += i,
        t[3] += s,
        t[4] += a,
        t[5] += u,
        t[6] += c,
        t[7] += l
    }
}
, function(e, t, n) {
    (function(e, r) {
        var i;
        /*! https://mths.be/punycode v1.4.1 by @mathias */
        !function(o) {
            t && t.nodeType,
            e && e.nodeType;
            var s = "object" == typeof r && r;
            s.global !== s && s.window !== s && s.self;
            var a, u = 2147483647, c = /^xn--/, l = /[^\x20-\x7E]/, h = /[\x2E\u3002\uFF0E\uFF61]/g, f = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            }, d = Math.floor, p = String.fromCharCode;
            function g(e) {
                throw new RangeError(f[e])
            }
            function m(e, t) {
                for (var n = e.length, r = []; n--; )
                    r[n] = t(e[n]);
                return r
            }
            function y(e, t) {
                var n = e.split("@")
                  , r = "";
                return n.length > 1 && (r = n[0] + "@",
                e = n[1]),
                r + m((e = e.replace(h, ".")).split("."), t).join(".")
            }
            function v(e) {
                for (var t, n, r = [], i = 0, o = e.length; i < o; )
                    (t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < o ? 56320 == (64512 & (n = e.charCodeAt(i++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t),
                    i--) : r.push(t);
                return r
            }
            function b(e) {
                return m(e, (function(e) {
                    var t = "";
                    return e > 65535 && (t += p((e -= 65536) >>> 10 & 1023 | 55296),
                    e = 56320 | 1023 & e),
                    t += p(e)
                }
                )).join("")
            }
            function w(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
            }
            function S(e, t, n) {
                var r = 0;
                for (e = n ? d(e / 700) : e >> 1,
                e += d(e / t); e > 455; r += 36)
                    e = d(e / 35);
                return d(r + 36 * e / (e + 38))
            }
            function E(e) {
                var t, n, r, i, o, s, a, c, l, h, f, p = [], m = e.length, y = 0, v = 128, w = 72;
                for ((n = e.lastIndexOf("-")) < 0 && (n = 0),
                r = 0; r < n; ++r)
                    e.charCodeAt(r) >= 128 && g("not-basic"),
                    p.push(e.charCodeAt(r));
                for (i = n > 0 ? n + 1 : 0; i < m; ) {
                    for (o = y,
                    s = 1,
                    a = 36; i >= m && g("invalid-input"),
                    ((c = (f = e.charCodeAt(i++)) - 48 < 10 ? f - 22 : f - 65 < 26 ? f - 65 : f - 97 < 26 ? f - 97 : 36) >= 36 || c > d((u - y) / s)) && g("overflow"),
                    y += c * s,
                    !(c < (l = a <= w ? 1 : a >= w + 26 ? 26 : a - w)); a += 36)
                        s > d(u / (h = 36 - l)) && g("overflow"),
                        s *= h;
                    w = S(y - o, t = p.length + 1, 0 == o),
                    d(y / t) > u - v && g("overflow"),
                    v += d(y / t),
                    y %= t,
                    p.splice(y++, 0, v)
                }
                return b(p)
            }
            function _(e) {
                var t, n, r, i, o, s, a, c, l, h, f, m, y, b, E, _ = [];
                for (m = (e = v(e)).length,
                t = 128,
                n = 0,
                o = 72,
                s = 0; s < m; ++s)
                    (f = e[s]) < 128 && _.push(p(f));
                for (r = i = _.length,
                i && _.push("-"); r < m; ) {
                    for (a = u,
                    s = 0; s < m; ++s)
                        (f = e[s]) >= t && f < a && (a = f);
                    for (a - t > d((u - n) / (y = r + 1)) && g("overflow"),
                    n += (a - t) * y,
                    t = a,
                    s = 0; s < m; ++s)
                        if ((f = e[s]) < t && ++n > u && g("overflow"),
                        f == t) {
                            for (c = n,
                            l = 36; !(c < (h = l <= o ? 1 : l >= o + 26 ? 26 : l - o)); l += 36)
                                E = c - h,
                                b = 36 - h,
                                _.push(p(w(h + E % b, 0))),
                                c = d(E / b);
                            _.push(p(w(c, 0))),
                            o = S(n, y, r == i),
                            n = 0,
                            ++r
                        }
                    ++n,
                    ++t
                }
                return _.join("")
            }
            a = {
                version: "1.4.1",
                ucs2: {
                    decode: v,
                    encode: b
                },
                decode: E,
                encode: _,
                toASCII: function(e) {
                    return y(e, (function(e) {
                        return l.test(e) ? "xn--" + _(e) : e
                    }
                    ))
                },
                toUnicode: function(e) {
                    return y(e, (function(e) {
                        return c.test(e) ? E(e.slice(4).toLowerCase()) : e
                    }
                    ))
                }
            },
            void 0 === (i = function() {
                return a
            }
            .call(t, n, t, e)) || (e.exports = i)
        }()
    }
    ).call(this, n(100)(e), n(13))
}
, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}
        ,
        e.paths = [],
        e.children || (e.children = []),
        Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l
            }
        }),
        Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i
            }
        }),
        e.webpackPolyfill = 1),
        e
    }
}
, function(e, t, n) {
    "use strict";
    e.exports = {
        isString: function(e) {
            return "string" == typeof e
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e
        },
        isNull: function(e) {
            return null === e
        },
        isNullOrUndefined: function(e) {
            return null == e
        }
    }
}
, function(e, t, n) {
    "use strict";
    function r(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    e.exports = function(e, t, n, o) {
        t = t || "&",
        n = n || "=";
        var s = {};
        if ("string" != typeof e || 0 === e.length)
            return s;
        var a = /\+/g;
        e = e.split(t);
        var u = 1e3;
        o && "number" == typeof o.maxKeys && (u = o.maxKeys);
        var c = e.length;
        u > 0 && c > u && (c = u);
        for (var l = 0; l < c; ++l) {
            var h, f, d, p, g = e[l].replace(a, "%20"), m = g.indexOf(n);
            m >= 0 ? (h = g.substr(0, m),
            f = g.substr(m + 1)) : (h = g,
            f = ""),
            d = decodeURIComponent(h),
            p = decodeURIComponent(f),
            r(s, d) ? i(s[d]) ? s[d].push(p) : s[d] = [s[d], p] : s[d] = p
        }
        return s
    }
    ;
    var i = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
}
, function(e, t, n) {
    "use strict";
    var r = function(e) {
        switch (typeof e) {
        case "string":
            return e;
        case "boolean":
            return e ? "true" : "false";
        case "number":
            return isFinite(e) ? e : "";
        default:
            return ""
        }
    };
    e.exports = function(e, t, n, a) {
        return t = t || "&",
        n = n || "=",
        null === e && (e = void 0),
        "object" == typeof e ? o(s(e), (function(s) {
            var a = encodeURIComponent(r(s)) + n;
            return i(e[s]) ? o(e[s], (function(e) {
                return a + encodeURIComponent(r(e))
            }
            )).join(t) : a + encodeURIComponent(r(e[s]))
        }
        )).join(t) : a ? encodeURIComponent(r(a)) + n + encodeURIComponent(r(e)) : ""
    }
    ;
    var i = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    ;
    function o(e, t) {
        if (e.map)
            return e.map(t);
        for (var n = [], r = 0; r < e.length; r++)
            n.push(t(e[r], r));
        return n
    }
    var s = Object.keys || function(e) {
        var t = [];
        for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
        return t
    }
}
, function(e, t) {
    e.exports = {
        now: function() {
            return "undefined" != typeof performance && "function" == typeof performance.now ? performance.now() : Date.now()
        }
    }
}
, function(e, t, n) {
    var r = n(106).eventMessageChunker
      , i = n(107).parseEvent;
    e.exports = {
        createEventStream: function(e, t, n) {
            for (var o = r(e), s = [], a = 0; a < o.length; a++)
                s.push(i(t, o[a], n));
            return s
        }
    }
}
, function(e, t) {
    e.exports = {
        eventMessageChunker: function(e) {
            for (var t = [], n = 0; n < e.length; ) {
                var r = e.readInt32BE(n)
                  , i = e.slice(n, r + n);
                n += r,
                t.push(i)
            }
            return t
        }
    }
}
, function(e, t, n) {
    var r = n(108).parseMessage;
    e.exports = {
        parseEvent: function(e, t, n) {
            var i = r(t)
              , o = i.headers[":message-type"];
            if (o) {
                if ("error" === o.value)
                    throw function(e) {
                        var t = e.headers[":error-code"]
                          , n = e.headers[":error-message"]
                          , r = new Error(n.value || n);
                        return r.code = r.name = t.value || t,
                        r
                    }(i);
                if ("event" !== o.value)
                    return
            }
            var s = i.headers[":event-type"]
              , a = n.members[s.value];
            if (a) {
                var u = {}
                  , c = a.eventPayloadMemberName;
                if (c) {
                    var l = a.members[c];
                    "binary" === l.type ? u[c] = i.body : u[c] = e.parse(i.body.toString(), l)
                }
                for (var h = a.eventHeaderMemberNames, f = 0; f < h.length; f++) {
                    var d = h[f];
                    i.headers[d] && (u[d] = a.members[d].toType(i.headers[d].value))
                }
                var p = {};
                return p[s.value] = u,
                p
            }
        }
    }
}
, function(e, t, n) {
    var r = n(109).Int64
      , i = n(110).splitMessage;
    function o(e) {
        for (var t = {}, n = 0; n < e.length; ) {
            var i = e.readUInt8(n++)
              , o = e.slice(n, n + i).toString();
            switch (n += i,
            e.readUInt8(n++)) {
            case 0:
                t[o] = {
                    type: "boolean",
                    value: !0
                };
                break;
            case 1:
                t[o] = {
                    type: "boolean",
                    value: !1
                };
                break;
            case 2:
                t[o] = {
                    type: "byte",
                    value: e.readInt8(n++)
                };
                break;
            case 3:
                t[o] = {
                    type: "short",
                    value: e.readInt16BE(n)
                },
                n += 2;
                break;
            case 4:
                t[o] = {
                    type: "integer",
                    value: e.readInt32BE(n)
                },
                n += 4;
                break;
            case 5:
                t[o] = {
                    type: "long",
                    value: new r(e.slice(n, n + 8))
                },
                n += 8;
                break;
            case 6:
                var s = e.readUInt16BE(n);
                n += 2,
                t[o] = {
                    type: "binary",
                    value: e.slice(n, n + s)
                },
                n += s;
                break;
            case 7:
                var a = e.readUInt16BE(n);
                n += 2,
                t[o] = {
                    type: "string",
                    value: e.slice(n, n + a).toString()
                },
                n += a;
                break;
            case 8:
                t[o] = {
                    type: "timestamp",
                    value: new Date(new r(e.slice(n, n + 8)).valueOf())
                },
                n += 8;
                break;
            case 9:
                var u = e.slice(n, n + 16).toString("hex");
                n += 16,
                t[o] = {
                    type: "uuid",
                    value: u.substr(0, 8) + "-" + u.substr(8, 4) + "-" + u.substr(12, 4) + "-" + u.substr(16, 4) + "-" + u.substr(20)
                };
                break;
            default:
                throw new Error("Unrecognized header type tag")
            }
        }
        return t
    }
    e.exports = {
        parseMessage: function(e) {
            var t = i(e);
            return {
                headers: o(t.headers),
                body: t.body
            }
        }
    }
}
, function(e, t, n) {
    var r = n(0).util
      , i = r.buffer.toBuffer;
    function o(e) {
        if (8 !== e.length)
            throw new Error("Int64 buffers must be exactly 8 bytes");
        r.Buffer.isBuffer(e) || (e = i(e)),
        this.bytes = e
    }
    function s(e) {
        for (var t = 0; t < 8; t++)
            e[t] ^= 255;
        for (t = 7; t > -1 && (e[t]++,
        0 === e[t]); t--)
            ;
    }
    o.fromNumber = function(e) {
        if (e > 0x8000000000000000 || e < -0x8000000000000000)
            throw new Error(e + " is too large (or, if negative, too small) to represent as an Int64");
        for (var t = new Uint8Array(8), n = 7, r = Math.abs(Math.round(e)); n > -1 && r > 0; n--,
        r /= 256)
            t[n] = r;
        return e < 0 && s(t),
        new o(t)
    }
    ,
    o.prototype.valueOf = function() {
        var e = this.bytes.slice(0)
          , t = 128 & e[0];
        return t && s(e),
        parseInt(e.toString("hex"), 16) * (t ? -1 : 1)
    }
    ,
    o.prototype.toString = function() {
        return String(this.valueOf())
    }
    ,
    e.exports = {
        Int64: o
    }
}
, function(e, t, n) {
    var r = n(0).util
      , i = r.buffer.toBuffer;
    e.exports = {
        splitMessage: function(e) {
            if (r.Buffer.isBuffer(e) || (e = i(e)),
            e.length < 16)
                throw new Error("Provided message too short to accommodate event stream message overhead");
            if (e.length !== e.readUInt32BE(0))
                throw new Error("Reported message length does not match received message length");
            var t = e.readUInt32BE(8);
            if (t !== r.crypto.crc32(e.slice(0, 8)))
                throw new Error("The prelude checksum specified in the message (" + t + ") does not match the calculated CRC32 checksum.");
            var n = e.readUInt32BE(e.length - 4);
            if (n !== r.crypto.crc32(e.slice(0, e.length - 4)))
                throw new Error("The message checksum did not match the expected value of " + n);
            var o = 12 + e.readUInt32BE(4);
            return {
                headers: e.slice(12, o),
                body: e.slice(o, e.length - 4)
            }
        }
    }
}
, function(e, t, n) {
    var r = n(0)
      , i = n(12);
    r.TemporaryCredentials = r.util.inherit(r.Credentials, {
        constructor: function(e, t) {
            r.Credentials.call(this),
            this.loadMasterCredentials(t),
            this.expired = !0,
            this.params = e || {},
            this.params.RoleArn && (this.params.RoleSessionName = this.params.RoleSessionName || "temporary-credentials")
        },
        refresh: function(e) {
            this.coalesceRefresh(e || r.util.fn.callback)
        },
        load: function(e) {
            var t = this;
            t.createClients(),
            t.masterCredentials.get((function() {
                t.service.config.credentials = t.masterCredentials,
                (t.params.RoleArn ? t.service.assumeRole : t.service.getSessionToken).call(t.service, (function(n, r) {
                    n || t.service.credentialsFrom(r, t),
                    e(n)
                }
                ))
            }
            ))
        },
        loadMasterCredentials: function(e) {
            for (this.masterCredentials = e || r.config.credentials; this.masterCredentials.masterCredentials; )
                this.masterCredentials = this.masterCredentials.masterCredentials;
            "function" != typeof this.masterCredentials.get && (this.masterCredentials = new r.Credentials(this.masterCredentials))
        },
        createClients: function() {
            this.service = this.service || new i({
                params: this.params
            })
        }
    })
}
, function(e, t, n) {
    var r = n(0);
    r.util.update(r.STS.prototype, {
        credentialsFrom: function(e, t) {
            return e ? (t || (t = new r.TemporaryCredentials),
            t.expired = !1,
            t.accessKeyId = e.Credentials.AccessKeyId,
            t.secretAccessKey = e.Credentials.SecretAccessKey,
            t.sessionToken = e.Credentials.SessionToken,
            t.expireTime = e.Credentials.Expiration,
            t) : null
        },
        assumeRoleWithWebIdentity: function(e, t) {
            return this.makeUnauthenticatedRequest("assumeRoleWithWebIdentity", e, t)
        },
        assumeRoleWithSAML: function(e, t) {
            return this.makeUnauthenticatedRequest("assumeRoleWithSAML", e, t)
        }
    })
}
, function(e) {
    e.exports = JSON.parse('{"version":"2.0","metadata":{"apiVersion":"2011-06-15","endpointPrefix":"sts","globalEndpoint":"sts.amazonaws.com","protocol":"query","serviceAbbreviation":"AWS STS","serviceFullName":"AWS Security Token Service","serviceId":"STS","signatureVersion":"v4","uid":"sts-2011-06-15","xmlNamespace":"https://sts.amazonaws.com/doc/2011-06-15/"},"operations":{"AssumeRole":{"input":{"type":"structure","required":["RoleArn","RoleSessionName"],"members":{"RoleArn":{},"RoleSessionName":{},"PolicyArns":{"shape":"S4"},"Policy":{},"DurationSeconds":{"type":"integer"},"ExternalId":{},"SerialNumber":{},"TokenCode":{}}},"output":{"resultWrapper":"AssumeRoleResult","type":"structure","members":{"Credentials":{"shape":"Sc"},"AssumedRoleUser":{"shape":"Sh"},"PackedPolicySize":{"type":"integer"}}}},"AssumeRoleWithSAML":{"input":{"type":"structure","required":["RoleArn","PrincipalArn","SAMLAssertion"],"members":{"RoleArn":{},"PrincipalArn":{},"SAMLAssertion":{},"PolicyArns":{"shape":"S4"},"Policy":{},"DurationSeconds":{"type":"integer"}}},"output":{"resultWrapper":"AssumeRoleWithSAMLResult","type":"structure","members":{"Credentials":{"shape":"Sc"},"AssumedRoleUser":{"shape":"Sh"},"PackedPolicySize":{"type":"integer"},"Subject":{},"SubjectType":{},"Issuer":{},"Audience":{},"NameQualifier":{}}}},"AssumeRoleWithWebIdentity":{"input":{"type":"structure","required":["RoleArn","RoleSessionName","WebIdentityToken"],"members":{"RoleArn":{},"RoleSessionName":{},"WebIdentityToken":{},"ProviderId":{},"PolicyArns":{"shape":"S4"},"Policy":{},"DurationSeconds":{"type":"integer"}}},"output":{"resultWrapper":"AssumeRoleWithWebIdentityResult","type":"structure","members":{"Credentials":{"shape":"Sc"},"SubjectFromWebIdentityToken":{},"AssumedRoleUser":{"shape":"Sh"},"PackedPolicySize":{"type":"integer"},"Provider":{},"Audience":{}}}},"DecodeAuthorizationMessage":{"input":{"type":"structure","required":["EncodedMessage"],"members":{"EncodedMessage":{}}},"output":{"resultWrapper":"DecodeAuthorizationMessageResult","type":"structure","members":{"DecodedMessage":{}}}},"GetAccessKeyInfo":{"input":{"type":"structure","required":["AccessKeyId"],"members":{"AccessKeyId":{}}},"output":{"resultWrapper":"GetAccessKeyInfoResult","type":"structure","members":{"Account":{}}}},"GetCallerIdentity":{"input":{"type":"structure","members":{}},"output":{"resultWrapper":"GetCallerIdentityResult","type":"structure","members":{"UserId":{},"Account":{},"Arn":{}}}},"GetFederationToken":{"input":{"type":"structure","required":["Name"],"members":{"Name":{},"Policy":{},"PolicyArns":{"shape":"S4"},"DurationSeconds":{"type":"integer"}}},"output":{"resultWrapper":"GetFederationTokenResult","type":"structure","members":{"Credentials":{"shape":"Sc"},"FederatedUser":{"type":"structure","required":["FederatedUserId","Arn"],"members":{"FederatedUserId":{},"Arn":{}}},"PackedPolicySize":{"type":"integer"}}}},"GetSessionToken":{"input":{"type":"structure","members":{"DurationSeconds":{"type":"integer"},"SerialNumber":{},"TokenCode":{}}},"output":{"resultWrapper":"GetSessionTokenResult","type":"structure","members":{"Credentials":{"shape":"Sc"}}}}},"shapes":{"S4":{"type":"list","member":{"type":"structure","members":{"arn":{}}}},"Sc":{"type":"structure","required":["AccessKeyId","SecretAccessKey","SessionToken","Expiration"],"members":{"AccessKeyId":{},"SecretAccessKey":{},"SessionToken":{},"Expiration":{"type":"timestamp"}}},"Sh":{"type":"structure","required":["AssumedRoleId","Arn"],"members":{"AssumedRoleId":{},"Arn":{}}}}}')
}
, function(e) {
    e.exports = JSON.parse('{"pagination":{}}')
}
, function(e, t, n) {
    var r = n(0)
      , i = n(12);
    r.ChainableTemporaryCredentials = r.util.inherit(r.Credentials, {
        constructor: function(e) {
            r.Credentials.call(this),
            e = e || {},
            this.errorCode = "ChainableTemporaryCredentialsProviderFailure",
            this.expired = !0,
            this.tokenCodeFn = null;
            var t = r.util.copy(e.params) || {};
            if (t.RoleArn && (t.RoleSessionName = t.RoleSessionName || "temporary-credentials"),
            t.SerialNumber) {
                if (!e.tokenCodeFn || "function" != typeof e.tokenCodeFn)
                    throw new r.util.error(new Error("tokenCodeFn must be a function when params.SerialNumber is given"),{
                        code: this.errorCode
                    });
                this.tokenCodeFn = e.tokenCodeFn
            }
            config = r.util.merge({
                params: t,
                credentials: e.masterCredentials || r.config.credentials
            }, e.stsConfig || {}),
            this.service = new i(config)
        },
        refresh: function(e) {
            this.coalesceRefresh(e || r.util.fn.callback)
        },
        load: function(e) {
            var t = this
              , n = t.service.config.params.RoleArn ? "assumeRole" : "getSessionToken";
            this.getTokenCode((function(r, i) {
                var o = {};
                r ? e(r) : (i && (o.TokenCode = i),
                t.service[n](o, (function(n, r) {
                    n || t.service.credentialsFrom(r, t),
                    e(n)
                }
                )))
            }
            ))
        },
        getTokenCode: function(e) {
            var t = this;
            this.tokenCodeFn ? this.tokenCodeFn(this.service.config.params.SerialNumber, (function(n, i) {
                if (n) {
                    var o = n;
                    return n instanceof Error && (o = n.message),
                    void e(r.util.error(new Error("Error fetching MFA token: " + o), {
                        code: t.errorCode
                    }))
                }
                e(null, i)
            }
            )) : e(null)
        }
    })
}
, function(e, t, n) {
    var r = n(0)
      , i = n(12);
    r.WebIdentityCredentials = r.util.inherit(r.Credentials, {
        constructor: function(e, t) {
            r.Credentials.call(this),
            this.expired = !0,
            this.params = e,
            this.params.RoleSessionName = this.params.RoleSessionName || "web-identity",
            this.data = null,
            this._clientConfig = r.util.copy(t || {})
        },
        refresh: function(e) {
            this.coalesceRefresh(e || r.util.fn.callback)
        },
        load: function(e) {
            var t = this;
            t.createClients(),
            t.service.assumeRoleWithWebIdentity((function(n, r) {
                t.data = null,
                n || (t.data = r,
                t.service.credentialsFrom(r, t)),
                e(n)
            }
            ))
        },
        createClients: function() {
            if (!this.service) {
                var e = r.util.merge({}, this._clientConfig);
                e.params = this.params,
                this.service = new i(e)
            }
        }
    })
}
, function(e, t, n) {
    var r = n(0)
      , i = n(118)
      , o = n(12);
    r.CognitoIdentityCredentials = r.util.inherit(r.Credentials, {
        localStorageKey: {
            id: "aws.cognito.identity-id.",
            providers: "aws.cognito.identity-providers."
        },
        constructor: function(e, t) {
            r.Credentials.call(this),
            this.expired = !0,
            this.params = e,
            this.data = null,
            this._identityId = null,
            this._clientConfig = r.util.copy(t || {}),
            this.loadCachedId();
            var n = this;
            Object.defineProperty(this, "identityId", {
                get: function() {
                    return n.loadCachedId(),
                    n._identityId || n.params.IdentityId
                },
                set: function(e) {
                    n._identityId = e
                }
            })
        },
        refresh: function(e) {
            this.coalesceRefresh(e || r.util.fn.callback)
        },
        load: function(e) {
            var t = this;
            t.createClients(),
            t.data = null,
            t._identityId = null,
            t.getId((function(n) {
                n ? (t.clearIdOnNotAuthorized(n),
                e(n)) : t.params.RoleArn ? t.getCredentialsFromSTS(e) : t.getCredentialsForIdentity(e)
            }
            ))
        },
        clearCachedId: function() {
            this._identityId = null,
            delete this.params.IdentityId;
            var e = this.params.IdentityPoolId
              , t = this.params.LoginId || "";
            delete this.storage[this.localStorageKey.id + e + t],
            delete this.storage[this.localStorageKey.providers + e + t]
        },
        clearIdOnNotAuthorized: function(e) {
            "NotAuthorizedException" == e.code && this.clearCachedId()
        },
        getId: function(e) {
            var t = this;
            if ("string" == typeof t.params.IdentityId)
                return e(null, t.params.IdentityId);
            t.cognito.getId((function(n, r) {
                !n && r.IdentityId ? (t.params.IdentityId = r.IdentityId,
                e(null, r.IdentityId)) : e(n)
            }
            ))
        },
        loadCredentials: function(e, t) {
            e && t && (t.expired = !1,
            t.accessKeyId = e.Credentials.AccessKeyId,
            t.secretAccessKey = e.Credentials.SecretKey,
            t.sessionToken = e.Credentials.SessionToken,
            t.expireTime = e.Credentials.Expiration)
        },
        getCredentialsForIdentity: function(e) {
            var t = this;
            t.cognito.getCredentialsForIdentity((function(n, r) {
                n ? t.clearIdOnNotAuthorized(n) : (t.cacheId(r),
                t.data = r,
                t.loadCredentials(t.data, t)),
                e(n)
            }
            ))
        },
        getCredentialsFromSTS: function(e) {
            var t = this;
            t.cognito.getOpenIdToken((function(n, r) {
                n ? (t.clearIdOnNotAuthorized(n),
                e(n)) : (t.cacheId(r),
                t.params.WebIdentityToken = r.Token,
                t.webIdentityCredentials.refresh((function(n) {
                    n || (t.data = t.webIdentityCredentials.data,
                    t.sts.credentialsFrom(t.data, t)),
                    e(n)
                }
                )))
            }
            ))
        },
        loadCachedId: function() {
            if (r.util.isBrowser() && !this.params.IdentityId) {
                var e = this.getStorage("id");
                if (e && this.params.Logins) {
                    var t = Object.keys(this.params.Logins);
                    0 !== (this.getStorage("providers") || "").split(",").filter((function(e) {
                        return -1 !== t.indexOf(e)
                    }
                    )).length && (this.params.IdentityId = e)
                } else
                    e && (this.params.IdentityId = e)
            }
        },
        createClients: function() {
            var e = this._clientConfig;
            if (this.webIdentityCredentials = this.webIdentityCredentials || new r.WebIdentityCredentials(this.params,e),
            !this.cognito) {
                var t = r.util.merge({}, e);
                t.params = this.params,
                this.cognito = new i(t)
            }
            this.sts = this.sts || new o(e)
        },
        cacheId: function(e) {
            this._identityId = e.IdentityId,
            this.params.IdentityId = this._identityId,
            r.util.isBrowser() && (this.setStorage("id", e.IdentityId),
            this.params.Logins && this.setStorage("providers", Object.keys(this.params.Logins).join(",")))
        },
        getStorage: function(e) {
            return this.storage[this.localStorageKey[e] + this.params.IdentityPoolId + (this.params.LoginId || "")]
        },
        setStorage: function(e, t) {
            try {
                this.storage[this.localStorageKey[e] + this.params.IdentityPoolId + (this.params.LoginId || "")] = t
            } catch (e) {}
        },
        storage: function() {
            try {
                var e = r.util.isBrowser() && null !== window.localStorage && "object" == typeof window.localStorage ? window.localStorage : {};
                return e["aws.test-storage"] = "foobar",
                delete e["aws.test-storage"],
                e
            } catch (e) {
                return {}
            }
        }()
    })
}
, function(e, t, n) {
    n(18);
    var r = n(0)
      , i = r.Service
      , o = r.apiLoader;
    o.services.cognitoidentity = {},
    r.CognitoIdentity = i.defineService("cognitoidentity", ["2014-06-30"]),
    n(119),
    Object.defineProperty(o.services.cognitoidentity, "2014-06-30", {
        get: function() {
            var e = n(120);
            return e.paginators = n(121).pagination,
            e
        },
        enumerable: !0,
        configurable: !0
    }),
    e.exports = r.CognitoIdentity
}
, function(e, t, n) {
    var r = n(0);
    r.util.update(r.CognitoIdentity.prototype, {
        getOpenIdToken: function(e, t) {
            return this.makeUnauthenticatedRequest("getOpenIdToken", e, t)
        },
        getId: function(e, t) {
            return this.makeUnauthenticatedRequest("getId", e, t)
        },
        getCredentialsForIdentity: function(e, t) {
            return this.makeUnauthenticatedRequest("getCredentialsForIdentity", e, t)
        }
    })
}
, function(e) {
    e.exports = JSON.parse('{"version":"2.0","metadata":{"apiVersion":"2014-06-30","endpointPrefix":"cognito-identity","jsonVersion":"1.1","protocol":"json","serviceFullName":"Amazon Cognito Identity","serviceId":"Cognito Identity","signatureVersion":"v4","targetPrefix":"AWSCognitoIdentityService","uid":"cognito-identity-2014-06-30"},"operations":{"CreateIdentityPool":{"input":{"type":"structure","required":["IdentityPoolName","AllowUnauthenticatedIdentities"],"members":{"IdentityPoolName":{},"AllowUnauthenticatedIdentities":{"type":"boolean"},"SupportedLoginProviders":{"shape":"S4"},"DeveloperProviderName":{},"OpenIdConnectProviderARNs":{"shape":"S8"},"CognitoIdentityProviders":{"shape":"Sa"},"SamlProviderARNs":{"shape":"Sf"},"IdentityPoolTags":{"shape":"Sg"}}},"output":{"shape":"Sj"}},"DeleteIdentities":{"input":{"type":"structure","required":["IdentityIdsToDelete"],"members":{"IdentityIdsToDelete":{"type":"list","member":{}}}},"output":{"type":"structure","members":{"UnprocessedIdentityIds":{"type":"list","member":{"type":"structure","members":{"IdentityId":{},"ErrorCode":{}}}}}}},"DeleteIdentityPool":{"input":{"type":"structure","required":["IdentityPoolId"],"members":{"IdentityPoolId":{}}}},"DescribeIdentity":{"input":{"type":"structure","required":["IdentityId"],"members":{"IdentityId":{}}},"output":{"shape":"Su"}},"DescribeIdentityPool":{"input":{"type":"structure","required":["IdentityPoolId"],"members":{"IdentityPoolId":{}}},"output":{"shape":"Sj"}},"GetCredentialsForIdentity":{"input":{"type":"structure","required":["IdentityId"],"members":{"IdentityId":{},"Logins":{"shape":"Sz"},"CustomRoleArn":{}}},"output":{"type":"structure","members":{"IdentityId":{},"Credentials":{"type":"structure","members":{"AccessKeyId":{},"SecretKey":{},"SessionToken":{},"Expiration":{"type":"timestamp"}}}}}},"GetId":{"input":{"type":"structure","required":["IdentityPoolId"],"members":{"AccountId":{},"IdentityPoolId":{},"Logins":{"shape":"Sz"}}},"output":{"type":"structure","members":{"IdentityId":{}}}},"GetIdentityPoolRoles":{"input":{"type":"structure","required":["IdentityPoolId"],"members":{"IdentityPoolId":{}}},"output":{"type":"structure","members":{"IdentityPoolId":{},"Roles":{"shape":"S1b"},"RoleMappings":{"shape":"S1d"}}}},"GetOpenIdToken":{"input":{"type":"structure","required":["IdentityId"],"members":{"IdentityId":{},"Logins":{"shape":"Sz"}}},"output":{"type":"structure","members":{"IdentityId":{},"Token":{}}}},"GetOpenIdTokenForDeveloperIdentity":{"input":{"type":"structure","required":["IdentityPoolId","Logins"],"members":{"IdentityPoolId":{},"IdentityId":{},"Logins":{"shape":"Sz"},"TokenDuration":{"type":"long"}}},"output":{"type":"structure","members":{"IdentityId":{},"Token":{}}}},"ListIdentities":{"input":{"type":"structure","required":["IdentityPoolId","MaxResults"],"members":{"IdentityPoolId":{},"MaxResults":{"type":"integer"},"NextToken":{},"HideDisabled":{"type":"boolean"}}},"output":{"type":"structure","members":{"IdentityPoolId":{},"Identities":{"type":"list","member":{"shape":"Su"}},"NextToken":{}}}},"ListIdentityPools":{"input":{"type":"structure","required":["MaxResults"],"members":{"MaxResults":{"type":"integer"},"NextToken":{}}},"output":{"type":"structure","members":{"IdentityPools":{"type":"list","member":{"type":"structure","members":{"IdentityPoolId":{},"IdentityPoolName":{}}}},"NextToken":{}}}},"ListTagsForResource":{"input":{"type":"structure","required":["ResourceArn"],"members":{"ResourceArn":{}}},"output":{"type":"structure","members":{"Tags":{"shape":"Sg"}}}},"LookupDeveloperIdentity":{"input":{"type":"structure","required":["IdentityPoolId"],"members":{"IdentityPoolId":{},"IdentityId":{},"DeveloperUserIdentifier":{},"MaxResults":{"type":"integer"},"NextToken":{}}},"output":{"type":"structure","members":{"IdentityId":{},"DeveloperUserIdentifierList":{"type":"list","member":{}},"NextToken":{}}}},"MergeDeveloperIdentities":{"input":{"type":"structure","required":["SourceUserIdentifier","DestinationUserIdentifier","DeveloperProviderName","IdentityPoolId"],"members":{"SourceUserIdentifier":{},"DestinationUserIdentifier":{},"DeveloperProviderName":{},"IdentityPoolId":{}}},"output":{"type":"structure","members":{"IdentityId":{}}}},"SetIdentityPoolRoles":{"input":{"type":"structure","required":["IdentityPoolId","Roles"],"members":{"IdentityPoolId":{},"Roles":{"shape":"S1b"},"RoleMappings":{"shape":"S1d"}}}},"TagResource":{"input":{"type":"structure","required":["ResourceArn"],"members":{"ResourceArn":{},"Tags":{"shape":"Sg"}}},"output":{"type":"structure","members":{}}},"UnlinkDeveloperIdentity":{"input":{"type":"structure","required":["IdentityId","IdentityPoolId","DeveloperProviderName","DeveloperUserIdentifier"],"members":{"IdentityId":{},"IdentityPoolId":{},"DeveloperProviderName":{},"DeveloperUserIdentifier":{}}}},"UnlinkIdentity":{"input":{"type":"structure","required":["IdentityId","Logins","LoginsToRemove"],"members":{"IdentityId":{},"Logins":{"shape":"Sz"},"LoginsToRemove":{"shape":"Sv"}}}},"UntagResource":{"input":{"type":"structure","required":["ResourceArn"],"members":{"ResourceArn":{},"TagKeys":{"type":"list","member":{}}}},"output":{"type":"structure","members":{}}},"UpdateIdentityPool":{"input":{"shape":"Sj"},"output":{"shape":"Sj"}}},"shapes":{"S4":{"type":"map","key":{},"value":{}},"S8":{"type":"list","member":{}},"Sa":{"type":"list","member":{"type":"structure","members":{"ProviderName":{},"ClientId":{},"ServerSideTokenCheck":{"type":"boolean"}}}},"Sf":{"type":"list","member":{}},"Sg":{"type":"map","key":{},"value":{}},"Sj":{"type":"structure","required":["IdentityPoolId","IdentityPoolName","AllowUnauthenticatedIdentities"],"members":{"IdentityPoolId":{},"IdentityPoolName":{},"AllowUnauthenticatedIdentities":{"type":"boolean"},"SupportedLoginProviders":{"shape":"S4"},"DeveloperProviderName":{},"OpenIdConnectProviderARNs":{"shape":"S8"},"CognitoIdentityProviders":{"shape":"Sa"},"SamlProviderARNs":{"shape":"Sf"},"IdentityPoolTags":{"shape":"Sg"}}},"Su":{"type":"structure","members":{"IdentityId":{},"Logins":{"shape":"Sv"},"CreationDate":{"type":"timestamp"},"LastModifiedDate":{"type":"timestamp"}}},"Sv":{"type":"list","member":{}},"Sz":{"type":"map","key":{},"value":{}},"S1b":{"type":"map","key":{},"value":{}},"S1d":{"type":"map","key":{},"value":{"type":"structure","required":["Type"],"members":{"Type":{},"AmbiguousRoleResolution":{},"RulesConfiguration":{"type":"structure","required":["Rules"],"members":{"Rules":{"type":"list","member":{"type":"structure","required":["Claim","MatchType","Value","RoleARN"],"members":{"Claim":{},"MatchType":{},"Value":{},"RoleARN":{}}}}}}}}}}}')
}
, function(e) {
    e.exports = JSON.parse('{"pagination":{}}')
}
, function(e, t, n) {
    var r = n(0)
      , i = n(12);
    r.SAMLCredentials = r.util.inherit(r.Credentials, {
        constructor: function(e) {
            r.Credentials.call(this),
            this.expired = !0,
            this.params = e
        },
        refresh: function(e) {
            this.coalesceRefresh(e || r.util.fn.callback)
        },
        load: function(e) {
            var t = this;
            t.createClients(),
            t.service.assumeRoleWithSAML((function(n, r) {
                n || t.service.credentialsFrom(r, t),
                e(n)
            }
            ))
        },
        createClients: function() {
            this.service = this.service || new i({
                params: this.params
            })
        }
    })
}
, function(e, t, n) {
    var r = n(2)
      , i = n(11);
    function o() {}
    function s(e, t) {
        for (var n = e.getElementsByTagName(t), r = 0, i = n.length; r < i; r++)
            if (n[r].parentNode === e)
                return n[r]
    }
    function a(e, t) {
        switch (t || (t = {}),
        t.type) {
        case "structure":
            return u(e, t);
        case "map":
            return function(e, t) {
                var n = {}
                  , r = t.key.name || "key"
                  , i = t.value.name || "value"
                  , o = t.flattened ? t.name : "entry"
                  , u = e.firstElementChild;
                for (; u; ) {
                    if (u.nodeName === o) {
                        var c = s(u, r).textContent
                          , l = s(u, i);
                        n[c] = a(l, t.value)
                    }
                    u = u.nextElementSibling
                }
                return n
            }(e, t);
        case "list":
            return function(e, t) {
                var n = []
                  , r = t.flattened ? t.name : t.member.name || "member"
                  , i = e.firstElementChild;
                for (; i; )
                    i.nodeName === r && n.push(a(i, t.member)),
                    i = i.nextElementSibling;
                return n
            }(e, t);
        case void 0:
        case null:
            return function(e) {
                if (null == e)
                    return "";
                if (!e.firstElementChild)
                    return null === e.parentNode.parentNode ? {} : 0 === e.childNodes.length ? "" : e.textContent;
                var t = {
                    type: "structure",
                    members: {}
                }
                  , n = e.firstElementChild;
                for (; n; ) {
                    var r = n.nodeName;
                    Object.prototype.hasOwnProperty.call(t.members, r) ? t.members[r].type = "list" : t.members[r] = {
                        name: r
                    },
                    n = n.nextElementSibling
                }
                return u(e, t)
            }(e);
        default:
            return function(e, t) {
                if (e.getAttribute) {
                    var n = e.getAttribute("encoding");
                    "base64" === n && (t = new i.create({
                        type: n
                    }))
                }
                var r = e.textContent;
                "" === r && (r = null);
                return "function" == typeof t.toType ? t.toType(r) : r
            }(e, t)
        }
    }
    function u(e, t) {
        var n = {};
        return null === e || r.each(t.members, (function(t, r) {
            if (r.isXmlAttribute) {
                if (Object.prototype.hasOwnProperty.call(e.attributes, r.name)) {
                    var i = e.attributes[r.name].value;
                    n[t] = a({
                        textContent: i
                    }, r)
                }
            } else {
                var o = r.flattened ? e : s(e, r.name);
                o ? n[t] = a(o, r) : r.flattened || "list" !== r.type || (n[t] = r.defaultValue)
            }
        }
        )),
        n
    }
    o.prototype.parse = function(e, t) {
        if ("" === e.replace(/^\s+/, ""))
            return {};
        var n, i;
        try {
            if (window.DOMParser) {
                try {
                    n = (new DOMParser).parseFromString(e, "text/xml")
                } catch (e) {
                    throw r.error(new Error("Parse error in document"), {
                        originalError: e,
                        code: "XMLParserError",
                        retryable: !0
                    })
                }
                if (null === n.documentElement)
                    throw r.error(new Error("Cannot parse empty document."), {
                        code: "XMLParserError",
                        retryable: !0
                    });
                var o = n.getElementsByTagName("parsererror")[0];
                if (o && (o.parentNode === n || "body" === o.parentNode.nodeName || o.parentNode.parentNode === n || "body" === o.parentNode.parentNode.nodeName)) {
                    var u = o.getElementsByTagName("div")[0] || o;
                    throw r.error(new Error(u.textContent || "Parser error in document"), {
                        code: "XMLParserError",
                        retryable: !0
                    })
                }
            } else {
                if (!window.ActiveXObject)
                    throw new Error("Cannot load XML parser");
                if ((n = new window.ActiveXObject("Microsoft.XMLDOM")).async = !1,
                !n.loadXML(e))
                    throw r.error(new Error("Parse error in document"), {
                        code: "XMLParserError",
                        retryable: !0
                    })
            }
        } catch (e) {
            i = e
        }
        if (n && n.documentElement && !i) {
            var c = a(n.documentElement, t)
              , l = s(n.documentElement, "ResponseMetadata");
            return l && (c.ResponseMetadata = a(l, {})),
            c
        }
        if (i)
            throw r.error(i || new Error, {
                code: "XMLParserError",
                retryable: !0
            });
        return {}
    }
    ,
    e.exports = o
}
, function(e, t, n) {
    var r = n(0)
      , i = n(125).EventEmitter;
    n(38),
    r.XHRClient = r.util.inherit({
        handleRequest: function(e, t, n, o) {
            var s = this
              , a = e.endpoint
              , u = new i
              , c = a.protocol + "//" + a.hostname;
            80 !== a.port && 443 !== a.port && (c += ":" + a.port),
            c += e.path;
            var l = new XMLHttpRequest
              , h = !1;
            e.stream = l,
            l.addEventListener("readystatechange", (function() {
                try {
                    if (0 === l.status)
                        return
                } catch (e) {
                    return
                }
                this.readyState >= this.HEADERS_RECEIVED && !h && (u.statusCode = l.status,
                u.headers = s.parseHeaders(l.getAllResponseHeaders()),
                u.emit("headers", u.statusCode, u.headers, l.statusText),
                h = !0),
                this.readyState === this.DONE && s.finishRequest(l, u)
            }
            ), !1),
            l.upload.addEventListener("progress", (function(e) {
                u.emit("sendProgress", e)
            }
            )),
            l.addEventListener("progress", (function(e) {
                u.emit("receiveProgress", e)
            }
            ), !1),
            l.addEventListener("timeout", (function() {
                o(r.util.error(new Error("Timeout"), {
                    code: "TimeoutError"
                }))
            }
            ), !1),
            l.addEventListener("error", (function() {
                o(r.util.error(new Error("Network Failure"), {
                    code: "NetworkingError"
                }))
            }
            ), !1),
            l.addEventListener("abort", (function() {
                o(r.util.error(new Error("Request aborted"), {
                    code: "RequestAbortedError"
                }))
            }
            ), !1),
            n(u),
            l.open(e.method, c, !1 !== t.xhrAsync),
            r.util.each(e.headers, (function(e, t) {
                "Content-Length" !== e && "User-Agent" !== e && "Host" !== e && l.setRequestHeader(e, t)
            }
            )),
            t.timeout && !1 !== t.xhrAsync && (l.timeout = t.timeout),
            t.xhrWithCredentials && (l.withCredentials = !0);
            try {
                l.responseType = "arraybuffer"
            } catch (e) {}
            try {
                e.body ? l.send(e.body) : l.send()
            } catch (t) {
                if (!e.body || "object" != typeof e.body.buffer)
                    throw t;
                l.send(e.body.buffer)
            }
            return u
        },
        parseHeaders: function(e) {
            var t = {};
            return r.util.arrayEach(e.split(/\r?\n/), (function(e) {
                var n = e.split(":", 1)[0]
                  , r = e.substring(n.length + 2);
                n.length > 0 && (t[n.toLowerCase()] = r)
            }
            )),
            t
        },
        finishRequest: function(e, t) {
            var n;
            if ("arraybuffer" === e.responseType && e.response) {
                var i = e.response;
                n = new r.util.Buffer(i.byteLength);
                for (var o = new Uint8Array(i), s = 0; s < n.length; ++s)
                    n[s] = o[s]
            }
            try {
                n || "string" != typeof e.responseText || (n = new r.util.Buffer(e.responseText))
            } catch (e) {}
            n && t.emit("data", n),
            t.emit("end")
        }
    }),
    r.HttpClient.prototype = r.XHRClient.prototype,
    r.HttpClient.streamsApiVersion = 1
}
, function(e, t, n) {
    "use strict";
    var r, i = "object" == typeof Reflect ? Reflect : null, o = i && "function" == typeof i.apply ? i.apply : function(e, t, n) {
        return Function.prototype.apply.call(e, t, n)
    }
    ;
    r = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function(e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
    }
    : function(e) {
        return Object.getOwnPropertyNames(e)
    }
    ;
    var s = Number.isNaN || function(e) {
        return e != e
    }
    ;
    function a() {
        a.init.call(this)
    }
    e.exports = a,
    e.exports.once = function(e, t) {
        return new Promise((function(n, r) {
            function i(n) {
                e.removeListener(t, o),
                r(n)
            }
            function o() {
                "function" == typeof e.removeListener && e.removeListener("error", i),
                n([].slice.call(arguments))
            }
            y(e, t, o, {
                once: !0
            }),
            "error" !== t && function(e, t, n) {
                "function" == typeof e.on && y(e, "error", t, n)
            }(e, i, {
                once: !0
            })
        }
        ))
    }
    ,
    a.EventEmitter = a,
    a.prototype._events = void 0,
    a.prototype._eventsCount = 0,
    a.prototype._maxListeners = void 0;
    var u = 10;
    function c(e) {
        if ("function" != typeof e)
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
    }
    function l(e) {
        return void 0 === e._maxListeners ? a.defaultMaxListeners : e._maxListeners
    }
    function h(e, t, n, r) {
        var i, o, s, a;
        if (c(n),
        void 0 === (o = e._events) ? (o = e._events = Object.create(null),
        e._eventsCount = 0) : (void 0 !== o.newListener && (e.emit("newListener", t, n.listener ? n.listener : n),
        o = e._events),
        s = o[t]),
        void 0 === s)
            s = o[t] = n,
            ++e._eventsCount;
        else if ("function" == typeof s ? s = o[t] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n),
        (i = l(e)) > 0 && s.length > i && !s.warned) {
            s.warned = !0;
            var u = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            u.name = "MaxListenersExceededWarning",
            u.emitter = e,
            u.type = t,
            u.count = s.length,
            a = u,
            console && console.warn && console.warn(a)
        }
        return e
    }
    function f() {
        if (!this.fired)
            return this.target.removeListener(this.type, this.wrapFn),
            this.fired = !0,
            0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }
    function d(e, t, n) {
        var r = {
            fired: !1,
            wrapFn: void 0,
            target: e,
            type: t,
            listener: n
        }
          , i = f.bind(r);
        return i.listener = n,
        r.wrapFn = i,
        i
    }
    function p(e, t, n) {
        var r = e._events;
        if (void 0 === r)
            return [];
        var i = r[t];
        return void 0 === i ? [] : "function" == typeof i ? n ? [i.listener || i] : [i] : n ? function(e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                t[n] = e[n].listener || e[n];
            return t
        }(i) : m(i, i.length)
    }
    function g(e) {
        var t = this._events;
        if (void 0 !== t) {
            var n = t[e];
            if ("function" == typeof n)
                return 1;
            if (void 0 !== n)
                return n.length
        }
        return 0
    }
    function m(e, t) {
        for (var n = new Array(t), r = 0; r < t; ++r)
            n[r] = e[r];
        return n
    }
    function y(e, t, n, r) {
        if ("function" == typeof e.on)
            r.once ? e.once(t, n) : e.on(t, n);
        else {
            if ("function" != typeof e.addEventListener)
                throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
            e.addEventListener(t, (function i(o) {
                r.once && e.removeEventListener(t, i),
                n(o)
            }
            ))
        }
    }
    Object.defineProperty(a, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return u
        },
        set: function(e) {
            if ("number" != typeof e || e < 0 || s(e))
                throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
            u = e
        }
    }),
    a.init = function() {
        void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null),
        this._eventsCount = 0),
        this._maxListeners = this._maxListeners || void 0
    }
    ,
    a.prototype.setMaxListeners = function(e) {
        if ("number" != typeof e || e < 0 || s(e))
            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e,
        this
    }
    ,
    a.prototype.getMaxListeners = function() {
        return l(this)
    }
    ,
    a.prototype.emit = function(e) {
        for (var t = [], n = 1; n < arguments.length; n++)
            t.push(arguments[n]);
        var r = "error" === e
          , i = this._events;
        if (void 0 !== i)
            r = r && void 0 === i.error;
        else if (!r)
            return !1;
        if (r) {
            var s;
            if (t.length > 0 && (s = t[0]),
            s instanceof Error)
                throw s;
            var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
            throw a.context = s,
            a
        }
        var u = i[e];
        if (void 0 === u)
            return !1;
        if ("function" == typeof u)
            o(u, this, t);
        else {
            var c = u.length
              , l = m(u, c);
            for (n = 0; n < c; ++n)
                o(l[n], this, t)
        }
        return !0
    }
    ,
    a.prototype.addListener = function(e, t) {
        return h(this, e, t, !1)
    }
    ,
    a.prototype.on = a.prototype.addListener,
    a.prototype.prependListener = function(e, t) {
        return h(this, e, t, !0)
    }
    ,
    a.prototype.once = function(e, t) {
        return c(t),
        this.on(e, d(this, e, t)),
        this
    }
    ,
    a.prototype.prependOnceListener = function(e, t) {
        return c(t),
        this.prependListener(e, d(this, e, t)),
        this
    }
    ,
    a.prototype.removeListener = function(e, t) {
        var n, r, i, o, s;
        if (c(t),
        void 0 === (r = this._events))
            return this;
        if (void 0 === (n = r[e]))
            return this;
        if (n === t || n.listener === t)
            0 == --this._eventsCount ? this._events = Object.create(null) : (delete r[e],
            r.removeListener && this.emit("removeListener", e, n.listener || t));
        else if ("function" != typeof n) {
            for (i = -1,
            o = n.length - 1; o >= 0; o--)
                if (n[o] === t || n[o].listener === t) {
                    s = n[o].listener,
                    i = o;
                    break
                }
            if (i < 0)
                return this;
            0 === i ? n.shift() : function(e, t) {
                for (; t + 1 < e.length; t++)
                    e[t] = e[t + 1];
                e.pop()
            }(n, i),
            1 === n.length && (r[e] = n[0]),
            void 0 !== r.removeListener && this.emit("removeListener", e, s || t)
        }
        return this
    }
    ,
    a.prototype.off = a.prototype.removeListener,
    a.prototype.removeAllListeners = function(e) {
        var t, n, r;
        if (void 0 === (n = this._events))
            return this;
        if (void 0 === n.removeListener)
            return 0 === arguments.length ? (this._events = Object.create(null),
            this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]),
            this;
        if (0 === arguments.length) {
            var i, o = Object.keys(n);
            for (r = 0; r < o.length; ++r)
                "removeListener" !== (i = o[r]) && this.removeAllListeners(i);
            return this.removeAllListeners("removeListener"),
            this._events = Object.create(null),
            this._eventsCount = 0,
            this
        }
        if ("function" == typeof (t = n[e]))
            this.removeListener(e, t);
        else if (void 0 !== t)
            for (r = t.length - 1; r >= 0; r--)
                this.removeListener(e, t[r]);
        return this
    }
    ,
    a.prototype.listeners = function(e) {
        return p(this, e, !0)
    }
    ,
    a.prototype.rawListeners = function(e) {
        return p(this, e, !1)
    }
    ,
    a.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : g.call(e, t)
    }
    ,
    a.prototype.listenerCount = g,
    a.prototype.eventNames = function() {
        return this._eventsCount > 0 ? r(this._events) : []
    }
}
, function(e, t, n) {
    "use strict";
    function r(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function i(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    function o(e, t, n) {
        return t && i(e.prototype, t),
        n && i(e, n),
        e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Observable = void 0;
    var s = function() {
        return "function" == typeof Symbol
    }
      , a = function(e) {
        return s() && Boolean(Symbol[e])
    }
      , u = function(e) {
        return a(e) ? Symbol[e] : "@@" + e
    };
    s() && !a("observable") && (Symbol.observable = Symbol("observable"));
    var c = u("iterator")
      , l = u("observable")
      , h = u("species");
    function f(e, t) {
        var n = e[t];
        if (null != n) {
            if ("function" != typeof n)
                throw new TypeError(n + " is not a function");
            return n
        }
    }
    function d(e) {
        var t = e.constructor;
        return void 0 !== t && null === (t = t[h]) && (t = void 0),
        void 0 !== t ? t : _
    }
    function p(e) {
        return e instanceof _
    }
    function g(e) {
        g.log ? g.log(e) : setTimeout((function() {
            throw e
        }
        ))
    }
    function m(e) {
        Promise.resolve().then((function() {
            try {
                e()
            } catch (e) {
                g(e)
            }
        }
        ))
    }
    function y(e) {
        var t = e._cleanup;
        if (void 0 !== t && (e._cleanup = void 0,
        t))
            try {
                if ("function" == typeof t)
                    t();
                else {
                    var n = f(t, "unsubscribe");
                    n && n.call(t)
                }
            } catch (e) {
                g(e)
            }
    }
    function v(e) {
        e._observer = void 0,
        e._queue = void 0,
        e._state = "closed"
    }
    function b(e, t, n) {
        e._state = "running";
        var r = e._observer;
        try {
            var i = f(r, t);
            switch (t) {
            case "next":
                i && i.call(r, n);
                break;
            case "error":
                if (v(e),
                !i)
                    throw n;
                i.call(r, n);
                break;
            case "complete":
                v(e),
                i && i.call(r)
            }
        } catch (e) {
            g(e)
        }
        "closed" === e._state ? y(e) : "running" === e._state && (e._state = "ready")
    }
    function w(e, t, n) {
        if ("closed" !== e._state) {
            if ("buffering" !== e._state)
                return "ready" !== e._state ? (e._state = "buffering",
                e._queue = [{
                    type: t,
                    value: n
                }],
                void m((function() {
                    return function(e) {
                        var t = e._queue;
                        if (t) {
                            e._queue = void 0,
                            e._state = "ready";
                            for (var n = 0; n < t.length && (b(e, t[n].type, t[n].value),
                            "closed" !== e._state); ++n)
                                ;
                        }
                    }(e)
                }
                ))) : void b(e, t, n);
            e._queue.push({
                type: t,
                value: n
            })
        }
    }
    var S = function() {
        function e(t, n) {
            r(this, e),
            this._cleanup = void 0,
            this._observer = t,
            this._queue = void 0,
            this._state = "initializing";
            var i = new E(this);
            try {
                this._cleanup = n.call(void 0, i)
            } catch (e) {
                i.error(e)
            }
            "initializing" === this._state && (this._state = "ready")
        }
        return o(e, [{
            key: "unsubscribe",
            value: function() {
                "closed" !== this._state && (v(this),
                y(this))
            }
        }, {
            key: "closed",
            get: function() {
                return "closed" === this._state
            }
        }]),
        e
    }()
      , E = function() {
        function e(t) {
            r(this, e),
            this._subscription = t
        }
        return o(e, [{
            key: "next",
            value: function(e) {
                w(this._subscription, "next", e)
            }
        }, {
            key: "error",
            value: function(e) {
                w(this._subscription, "error", e)
            }
        }, {
            key: "complete",
            value: function() {
                w(this._subscription, "complete")
            }
        }, {
            key: "closed",
            get: function() {
                return "closed" === this._subscription._state
            }
        }]),
        e
    }()
      , _ = function() {
        function e(t) {
            if (r(this, e),
            !(this instanceof e))
                throw new TypeError("Observable cannot be called as a function");
            if ("function" != typeof t)
                throw new TypeError("Observable initializer must be a function");
            this._subscriber = t
        }
        return o(e, [{
            key: "subscribe",
            value: function(e) {
                return "object" == typeof e && null !== e || (e = {
                    next: e,
                    error: arguments[1],
                    complete: arguments[2]
                }),
                new S(e,this._subscriber)
            }
        }, {
            key: "forEach",
            value: function(e) {
                var t = this;
                return new Promise((function(n, r) {
                    if ("function" == typeof e)
                        var i = t.subscribe({
                            next: function(t) {
                                try {
                                    e(t, o)
                                } catch (e) {
                                    r(e),
                                    i.unsubscribe()
                                }
                            },
                            error: r,
                            complete: n
                        });
                    else
                        r(new TypeError(e + " is not a function"));
                    function o() {
                        i.unsubscribe(),
                        n()
                    }
                }
                ))
            }
        }, {
            key: "map",
            value: function(e) {
                var t = this;
                if ("function" != typeof e)
                    throw new TypeError(e + " is not a function");
                return new (d(this))((function(n) {
                    return t.subscribe({
                        next: function(t) {
                            try {
                                t = e(t)
                            } catch (e) {
                                return n.error(e)
                            }
                            n.next(t)
                        },
                        error: function(e) {
                            n.error(e)
                        },
                        complete: function() {
                            n.complete()
                        }
                    })
                }
                ))
            }
        }, {
            key: "filter",
            value: function(e) {
                var t = this;
                if ("function" != typeof e)
                    throw new TypeError(e + " is not a function");
                return new (d(this))((function(n) {
                    return t.subscribe({
                        next: function(t) {
                            try {
                                if (!e(t))
                                    return
                            } catch (e) {
                                return n.error(e)
                            }
                            n.next(t)
                        },
                        error: function(e) {
                            n.error(e)
                        },
                        complete: function() {
                            n.complete()
                        }
                    })
                }
                ))
            }
        }, {
            key: "reduce",
            value: function(e) {
                var t = this;
                if ("function" != typeof e)
                    throw new TypeError(e + " is not a function");
                var n = d(this)
                  , r = arguments.length > 1
                  , i = !1
                  , o = arguments[1]
                  , s = o;
                return new n((function(n) {
                    return t.subscribe({
                        next: function(t) {
                            var o = !i;
                            if (i = !0,
                            !o || r)
                                try {
                                    s = e(s, t)
                                } catch (e) {
                                    return n.error(e)
                                }
                            else
                                s = t
                        },
                        error: function(e) {
                            n.error(e)
                        },
                        complete: function() {
                            if (!i && !r)
                                return n.error(new TypeError("Cannot reduce an empty sequence"));
                            n.next(s),
                            n.complete()
                        }
                    })
                }
                ))
            }
        }, {
            key: "concat",
            value: function() {
                for (var e = this, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                    n[r] = arguments[r];
                var i = d(this);
                return new i((function(t) {
                    var r, o = 0;
                    return function e(s) {
                        r = s.subscribe({
                            next: function(e) {
                                t.next(e)
                            },
                            error: function(e) {
                                t.error(e)
                            },
                            complete: function() {
                                o === n.length ? (r = void 0,
                                t.complete()) : e(i.from(n[o++]))
                            }
                        })
                    }(e),
                    function() {
                        r && (r.unsubscribe(),
                        r = void 0)
                    }
                }
                ))
            }
        }, {
            key: "flatMap",
            value: function(e) {
                var t = this;
                if ("function" != typeof e)
                    throw new TypeError(e + " is not a function");
                var n = d(this);
                return new n((function(r) {
                    var i = []
                      , o = t.subscribe({
                        next: function(t) {
                            if (e)
                                try {
                                    t = e(t)
                                } catch (e) {
                                    return r.error(e)
                                }
                            var o = n.from(t).subscribe({
                                next: function(e) {
                                    r.next(e)
                                },
                                error: function(e) {
                                    r.error(e)
                                },
                                complete: function() {
                                    var e = i.indexOf(o);
                                    e >= 0 && i.splice(e, 1),
                                    s()
                                }
                            });
                            i.push(o)
                        },
                        error: function(e) {
                            r.error(e)
                        },
                        complete: function() {
                            s()
                        }
                    });
                    function s() {
                        o.closed && 0 === i.length && r.complete()
                    }
                    return function() {
                        i.forEach((function(e) {
                            return e.unsubscribe()
                        }
                        )),
                        o.unsubscribe()
                    }
                }
                ))
            }
        }, {
            key: l,
            value: function() {
                return this
            }
        }], [{
            key: "from",
            value: function(t) {
                var n = "function" == typeof this ? this : e;
                if (null == t)
                    throw new TypeError(t + " is not an object");
                var r = f(t, l);
                if (r) {
                    var i = r.call(t);
                    if (Object(i) !== i)
                        throw new TypeError(i + " is not an object");
                    return p(i) && i.constructor === n ? i : new n((function(e) {
                        return i.subscribe(e)
                    }
                    ))
                }
                if (a("iterator") && (r = f(t, c)))
                    return new n((function(e) {
                        m((function() {
                            if (!e.closed) {
                                var n = !0
                                  , i = !1
                                  , o = void 0;
                                try {
                                    for (var s, a = r.call(t)[Symbol.iterator](); !(n = (s = a.next()).done); n = !0) {
                                        var u = s.value;
                                        if (e.next(u),
                                        e.closed)
                                            return
                                    }
                                } catch (e) {
                                    i = !0,
                                    o = e
                                } finally {
                                    try {
                                        n || null == a.return || a.return()
                                    } finally {
                                        if (i)
                                            throw o
                                    }
                                }
                                e.complete()
                            }
                        }
                        ))
                    }
                    ));
                if (Array.isArray(t))
                    return new n((function(e) {
                        m((function() {
                            if (!e.closed) {
                                for (var n = 0; n < t.length; ++n)
                                    if (e.next(t[n]),
                                    e.closed)
                                        return;
                                e.complete()
                            }
                        }
                        ))
                    }
                    ));
                throw new TypeError(t + " is not observable")
            }
        }, {
            key: "of",
            value: function() {
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                    n[r] = arguments[r];
                var i = "function" == typeof this ? this : e;
                return new i((function(e) {
                    m((function() {
                        if (!e.closed) {
                            for (var t = 0; t < n.length; ++t)
                                if (e.next(n[t]),
                                e.closed)
                                    return;
                            e.complete()
                        }
                    }
                    ))
                }
                ))
            }
        }, {
            key: h,
            get: function() {
                return this
            }
        }]),
        e
    }();
    t.Observable = _,
    s() && Object.defineProperty(_, Symbol("extensions"), {
        value: {
            symbol: l,
            hostReportError: g
        },
        configurable: !0
    })
}
, function(e) {
    e.exports = JSON.parse('{"name":"@aws-amplify/core","version":"2.3.0","description":"Core category of aws-amplify","main":"./lib/index.js","module":"./lib-esm/index.js","typings":"./lib-esm/index.d.ts","publishConfig":{"access":"public"},"scripts":{"test":"tslint \'src/**/*.ts\' && jest -w 1 --coverage","build-with-test":"npm test && npm run build","build:cjs":"node ./build es5 && webpack && webpack --config ./webpack.config.dev.js","build:esm":"node ./build es6","build:cjs:watch":"node ./build es5 --watch","build:esm:watch":"node ./build es6 --watch","build":"npm run clean && npm run build:esm && npm run build:cjs","clean":"rimraf lib-esm lib dist","format":"echo \\"Not implemented\\"","lint":"tslint \'src/**/*.ts\'"},"react-native":{"./index":"./lib/index.js","./lib/ClientDevice":"./lib/ClientDevice/reactnative.js","./lib/RNComponents":"./lib/RNComponents/reactnative.js","./lib/StorageHelper":"./lib/StorageHelper/reactnative.js"},"repository":{"type":"git","url":"https://github.com/aws-amplify/amplify-js.git"},"author":"Amazon Web Services","license":"Apache-2.0","bugs":{"url":"https://github.com/aws/aws-amplify/issues"},"homepage":"https://aws-amplify.github.io/","devDependencies":{"@react-native-community/netinfo":"4.7.0","find":"^0.2.7","prepend-file":"^1.3.1","react-native":"0.59.0"},"dependencies":{"aws-sdk":"2.518.0","url":"^0.11.0","zen-observable":"^0.8.6"},"peerDependencies":{"@react-native-community/netinfo":"^5.5.0"},"jest":{"globals":{"ts-jest":{"diagnostics":false,"tsConfig":{"lib":["es5","es2015","dom","esnext.asynciterable","es2017.object"],"allowJs":true}}},"transform":{"^.+\\\\.(js|jsx|ts|tsx)$":"ts-jest"},"testRegex":"(/__tests__/.*|\\\\.(test|spec))\\\\.(tsx?|jsx?)$","moduleFileExtensions":["ts","tsx","js","json","jsx"],"testEnvironment":"jsdom","coverageThreshold":{"global":{"branches":0,"functions":0,"lines":0,"statements":0}},"testURL":"http://localhost/","coveragePathIgnorePatterns":["/node_modules/"]},"gitHead":"a105664b4028e06246c6d9f6ceebb8730187d50c"}')
}
, function(e, t, n) {
    "use strict";
    var r = n(5)
      , i = n(43)
      , o = n(129)
      , s = n(49);
    function a(e) {
        var t = new o(e)
          , n = i(o.prototype.request, t);
        return r.extend(n, o.prototype, t),
        r.extend(n, t),
        n
    }
    var u = a(n(46));
    u.Axios = o,
    u.create = function(e) {
        return a(s(u.defaults, e))
    }
    ,
    u.Cancel = n(50),
    u.CancelToken = n(142),
    u.isCancel = n(45),
    u.all = function(e) {
        return Promise.all(e)
    }
    ,
    u.spread = n(143),
    e.exports = u,
    e.exports.default = u
}
, function(e, t, n) {
    "use strict";
    var r = n(5)
      , i = n(44)
      , o = n(130)
      , s = n(131)
      , a = n(49);
    function u(e) {
        this.defaults = e,
        this.interceptors = {
            request: new o,
            response: new o
        }
    }
    u.prototype.request = function(e) {
        "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {},
        (e = a(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
        var t = [s, void 0]
          , n = Promise.resolve(e);
        for (this.interceptors.request.forEach((function(e) {
            t.unshift(e.fulfilled, e.rejected)
        }
        )),
        this.interceptors.response.forEach((function(e) {
            t.push(e.fulfilled, e.rejected)
        }
        )); t.length; )
            n = n.then(t.shift(), t.shift());
        return n
    }
    ,
    u.prototype.getUri = function(e) {
        return e = a(this.defaults, e),
        i(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
    }
    ,
    r.forEach(["delete", "get", "head", "options"], (function(e) {
        u.prototype[e] = function(t, n) {
            return this.request(r.merge(n || {}, {
                method: e,
                url: t
            }))
        }
    }
    )),
    r.forEach(["post", "put", "patch"], (function(e) {
        u.prototype[e] = function(t, n, i) {
            return this.request(r.merge(i || {}, {
                method: e,
                url: t,
                data: n
            }))
        }
    }
    )),
    e.exports = u
}
, function(e, t, n) {
    "use strict";
    var r = n(5);
    function i() {
        this.handlers = []
    }
    i.prototype.use = function(e, t) {
        return this.handlers.push({
            fulfilled: e,
            rejected: t
        }),
        this.handlers.length - 1
    }
    ,
    i.prototype.eject = function(e) {
        this.handlers[e] && (this.handlers[e] = null)
    }
    ,
    i.prototype.forEach = function(e) {
        r.forEach(this.handlers, (function(t) {
            null !== t && e(t)
        }
        ))
    }
    ,
    e.exports = i
}
, function(e, t, n) {
    "use strict";
    var r = n(5)
      , i = n(132)
      , o = n(45)
      , s = n(46);
    function a(e) {
        e.cancelToken && e.cancelToken.throwIfRequested()
    }
    e.exports = function(e) {
        return a(e),
        e.headers = e.headers || {},
        e.data = i(e.data, e.headers, e.transformRequest),
        e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers),
        r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function(t) {
            delete e.headers[t]
        }
        )),
        (e.adapter || s.adapter)(e).then((function(t) {
            return a(e),
            t.data = i(t.data, t.headers, e.transformResponse),
            t
        }
        ), (function(t) {
            return o(t) || (a(e),
            t && t.response && (t.response.data = i(t.response.data, t.response.headers, e.transformResponse))),
            Promise.reject(t)
        }
        ))
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(5);
    e.exports = function(e, t, n) {
        return r.forEach(n, (function(n) {
            e = n(e, t)
        }
        )),
        e
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(5);
    e.exports = function(e, t) {
        r.forEach(e, (function(n, r) {
            r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n,
            delete e[r])
        }
        ))
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(48);
    e.exports = function(e, t, n) {
        var i = n.config.validateStatus;
        !i || i(n.status) ? e(n) : t(r("Request failed with status code " + n.status, n.config, null, n.request, n))
    }
}
, function(e, t, n) {
    "use strict";
    e.exports = function(e, t, n, r, i) {
        return e.config = t,
        n && (e.code = n),
        e.request = r,
        e.response = i,
        e.isAxiosError = !0,
        e.toJSON = function() {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code
            }
        }
        ,
        e
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(137)
      , i = n(138);
    e.exports = function(e, t) {
        return e && !r(t) ? i(e, t) : t
    }
}
, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
    }
}
, function(e, t, n) {
    "use strict";
    e.exports = function(e, t) {
        return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(5)
      , i = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
    e.exports = function(e) {
        var t, n, o, s = {};
        return e ? (r.forEach(e.split("\n"), (function(e) {
            if (o = e.indexOf(":"),
            t = r.trim(e.substr(0, o)).toLowerCase(),
            n = r.trim(e.substr(o + 1)),
            t) {
                if (s[t] && i.indexOf(t) >= 0)
                    return;
                s[t] = "set-cookie" === t ? (s[t] ? s[t] : []).concat([n]) : s[t] ? s[t] + ", " + n : n
            }
        }
        )),
        s) : s
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(5);
    e.exports = r.isStandardBrowserEnv() ? function() {
        var e, t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
        function i(e) {
            var r = e;
            return t && (n.setAttribute("href", r),
            r = n.href),
            n.setAttribute("href", r),
            {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
            }
        }
        return e = i(window.location.href),
        function(t) {
            var n = r.isString(t) ? i(t) : t;
            return n.protocol === e.protocol && n.host === e.host
        }
    }() : function() {
        return !0
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(5);
    e.exports = r.isStandardBrowserEnv() ? {
        write: function(e, t, n, i, o, s) {
            var a = [];
            a.push(e + "=" + encodeURIComponent(t)),
            r.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()),
            r.isString(i) && a.push("path=" + i),
            r.isString(o) && a.push("domain=" + o),
            !0 === s && a.push("secure"),
            document.cookie = a.join("; ")
        },
        read: function(e) {
            var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null
        },
        remove: function(e) {
            this.write(e, "", Date.now() - 864e5)
        }
    } : {
        write: function() {},
        read: function() {
            return null
        },
        remove: function() {}
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(50);
    function i(e) {
        if ("function" != typeof e)
            throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise((function(e) {
            t = e
        }
        ));
        var n = this;
        e((function(e) {
            n.reason || (n.reason = new r(e),
            t(n.reason))
        }
        ))
    }
    i.prototype.throwIfRequested = function() {
        if (this.reason)
            throw this.reason
    }
    ,
    i.source = function() {
        var e;
        return {
            token: new i((function(t) {
                e = t
            }
            )),
            cancel: e
        }
    }
    ,
    e.exports = i
}
, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        return function(t) {
            return e.apply(null, t)
        }
    }
}
, function(e, t, n) {
    var r, i, o, s;
    e.exports = (r = n(3),
    o = (i = r).lib.Base,
    s = i.enc.Utf8,
    void (i.algo.HMAC = o.extend({
        init: function(e, t) {
            e = this._hasher = new e.init,
            "string" == typeof t && (t = s.parse(t));
            var n = e.blockSize
              , r = 4 * n;
            t.sigBytes > r && (t = e.finalize(t)),
            t.clamp();
            for (var i = this._oKey = t.clone(), o = this._iKey = t.clone(), a = i.words, u = o.words, c = 0; c < n; c++)
                a[c] ^= 1549556828,
                u[c] ^= 909522486;
            i.sigBytes = o.sigBytes = r,
            this.reset()
        },
        reset: function() {
            var e = this._hasher;
            e.reset(),
            e.update(this._iKey)
        },
        update: function(e) {
            return this._hasher.update(e),
            this
        },
        finalize: function(e) {
            var t = this._hasher
              , n = t.finalize(e);
            return t.reset(),
            t.finalize(this._oKey.clone().concat(n))
        }
    })))
}
, function(e, t, n) {
    "use strict";
    n.r(t),
    n.d(t, "handleOffline", (function() {
        return di
    }
    )),
    n.d(t, "handleOnline", (function() {
        return pi
    }
    ));
    var r = n(9);
    n(53);
    function i(e, t) {
        for (var n, r = /\r\n|[\n\r]/g, i = 1, o = t + 1; (n = r.exec(e.body)) && n.index < t; )
            i += 1,
            o = t + 1 - (n.index + n[0].length);
        return {
            line: i,
            column: o
        }
    }
    function o(e, t) {
        var n = e.locationOffset.column - 1
          , r = s(n) + e.body
          , i = t.line - 1
          , o = e.locationOffset.line - 1
          , a = t.line + o
          , u = 1 === t.line ? n : 0
          , c = t.column + u
          , l = r.split(/\r\n|[\n\r]/g);
        return "".concat(e.name, " (").concat(a, ":").concat(c, ")\n") + function(e) {
            var t = e.filter((function(e) {
                e[0];
                return void 0 !== e[1]
            }
            ))
              , n = 0
              , r = !0
              , i = !1
              , o = void 0;
            try {
                for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done); r = !0) {
                    var c = a.value[0];
                    n = Math.max(n, c.length)
                }
            } catch (e) {
                i = !0,
                o = e
            } finally {
                try {
                    r || null == u.return || u.return()
                } finally {
                    if (i)
                        throw o
                }
            }
            return t.map((function(e) {
                var t, r = e[0], i = e[1];
                return s(n - (t = r).length) + t + i
            }
            )).join("\n")
        }([["".concat(a - 1, ": "), l[i - 1]], ["".concat(a, ": "), l[i]], ["", s(c - 1) + "^"], ["".concat(a + 1, ": "), l[i + 1]]])
    }
    function s(e) {
        return Array(e + 1).join(" ")
    }
    function a(e, t, n, r, o, s, u) {
        var c = Array.isArray(t) ? 0 !== t.length ? t : void 0 : t ? [t] : void 0
          , l = n;
        if (!l && c) {
            var h = c[0];
            l = h && h.loc && h.loc.source
        }
        var f, d = r;
        !d && c && (d = c.reduce((function(e, t) {
            return t.loc && e.push(t.loc.start),
            e
        }
        ), [])),
        d && 0 === d.length && (d = void 0),
        r && n ? f = r.map((function(e) {
            return i(n, e)
        }
        )) : c && (f = c.reduce((function(e, t) {
            return t.loc && e.push(i(t.loc.source, t.loc.start)),
            e
        }
        ), []));
        var p = u || s && s.extensions;
        Object.defineProperties(this, {
            message: {
                value: e,
                enumerable: !0,
                writable: !0
            },
            locations: {
                value: f || void 0,
                enumerable: Boolean(f)
            },
            path: {
                value: o || void 0,
                enumerable: Boolean(o)
            },
            nodes: {
                value: c || void 0
            },
            source: {
                value: l || void 0
            },
            positions: {
                value: d || void 0
            },
            originalError: {
                value: s
            },
            extensions: {
                value: p || void 0,
                enumerable: Boolean(p)
            }
        }),
        s && s.stack ? Object.defineProperty(this, "stack", {
            value: s.stack,
            writable: !0,
            configurable: !0
        }) : Error.captureStackTrace ? Error.captureStackTrace(this, a) : Object.defineProperty(this, "stack", {
            value: Error().stack,
            writable: !0,
            configurable: !0
        })
    }
    a.prototype = Object.create(Error.prototype, {
        constructor: {
            value: a
        },
        name: {
            value: "GraphQLError"
        },
        toString: {
            value: function() {
                return function(e) {
                    var t = [];
                    if (e.nodes) {
                        var n = !0
                          , r = !1
                          , s = void 0;
                        try {
                            for (var a, u = e.nodes[Symbol.iterator](); !(n = (a = u.next()).done); n = !0) {
                                var c = a.value;
                                c.loc && t.push(o(c.loc.source, i(c.loc.source, c.loc.start)))
                            }
                        } catch (e) {
                            r = !0,
                            s = e
                        } finally {
                            try {
                                n || null == u.return || u.return()
                            } finally {
                                if (r)
                                    throw s
                            }
                        }
                    } else if (e.source && e.locations) {
                        var l = e.source
                          , h = !0
                          , f = !1
                          , d = void 0;
                        try {
                            for (var p, g = e.locations[Symbol.iterator](); !(h = (p = g.next()).done); h = !0) {
                                var m = p.value;
                                t.push(o(l, m))
                            }
                        } catch (e) {
                            f = !0,
                            d = e
                        } finally {
                            try {
                                h || null == g.return || g.return()
                            } finally {
                                if (f)
                                    throw d
                            }
                        }
                    }
                    return 0 === t.length ? e.message : [e.message].concat(t).join("\n\n") + "\n"
                }(this)
            }
        }
    });
    var u = {
        Name: [],
        Document: ["definitions"],
        OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"],
        VariableDefinition: ["variable", "type", "defaultValue", "directives"],
        Variable: ["name"],
        SelectionSet: ["selections"],
        Field: ["alias", "name", "arguments", "directives", "selectionSet"],
        Argument: ["name", "value"],
        FragmentSpread: ["name", "directives"],
        InlineFragment: ["typeCondition", "directives", "selectionSet"],
        FragmentDefinition: ["name", "variableDefinitions", "typeCondition", "directives", "selectionSet"],
        IntValue: [],
        FloatValue: [],
        StringValue: [],
        BooleanValue: [],
        NullValue: [],
        EnumValue: [],
        ListValue: ["values"],
        ObjectValue: ["fields"],
        ObjectField: ["name", "value"],
        Directive: ["name", "arguments"],
        NamedType: ["name"],
        ListType: ["type"],
        NonNullType: ["type"],
        SchemaDefinition: ["directives", "operationTypes"],
        OperationTypeDefinition: ["type"],
        ScalarTypeDefinition: ["description", "name", "directives"],
        ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
        FieldDefinition: ["description", "name", "arguments", "type", "directives"],
        InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"],
        InterfaceTypeDefinition: ["description", "name", "directives", "fields"],
        UnionTypeDefinition: ["description", "name", "directives", "types"],
        EnumTypeDefinition: ["description", "name", "directives", "values"],
        EnumValueDefinition: ["description", "name", "directives"],
        InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
        DirectiveDefinition: ["description", "name", "arguments", "locations"],
        SchemaExtension: ["directives", "operationTypes"],
        ScalarTypeExtension: ["name", "directives"],
        ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
        InterfaceTypeExtension: ["name", "directives", "fields"],
        UnionTypeExtension: ["name", "directives", "types"],
        EnumTypeExtension: ["name", "directives", "values"],
        InputObjectTypeExtension: ["name", "directives", "fields"]
    }
      , c = {};
    function l(e) {
        return Boolean(e && "string" == typeof e.kind)
    }
    function h(e, t, n) {
        var r = e[t];
        if (r) {
            if (!n && "function" == typeof r)
                return r;
            var i = n ? r.leave : r.enter;
            if ("function" == typeof i)
                return i
        } else {
            var o = n ? e.leave : e.enter;
            if (o) {
                if ("function" == typeof o)
                    return o;
                var s = o[t];
                if ("function" == typeof s)
                    return s
            }
        }
    }
    function f(e) {
        return function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : u
              , r = void 0
              , i = Array.isArray(e)
              , o = [e]
              , s = -1
              , a = []
              , f = void 0
              , d = void 0
              , p = void 0
              , g = []
              , m = []
              , y = e;
            do {
                var v = ++s === o.length
                  , b = v && 0 !== a.length;
                if (v) {
                    if (d = 0 === m.length ? void 0 : g[g.length - 1],
                    f = p,
                    p = m.pop(),
                    b) {
                        if (i)
                            f = f.slice();
                        else {
                            var w = {};
                            for (var S in f)
                                f.hasOwnProperty(S) && (w[S] = f[S]);
                            f = w
                        }
                        for (var E = 0, _ = 0; _ < a.length; _++) {
                            var A = a[_][0]
                              , C = a[_][1];
                            i && (A -= E),
                            i && null === C ? (f.splice(A, 1),
                            E++) : f[A] = C
                        }
                    }
                    s = r.index,
                    o = r.keys,
                    a = r.edits,
                    i = r.inArray,
                    r = r.prev
                } else {
                    if (d = p ? i ? s : o[s] : void 0,
                    null == (f = p ? p[d] : y))
                        continue;
                    p && g.push(d)
                }
                var I = void 0;
                if (!Array.isArray(f)) {
                    if (!l(f))
                        throw new Error("Invalid AST Node: " + JSON.stringify(f));
                    var T = h(t, f.kind, v);
                    if (T) {
                        if ((I = T.call(t, f, d, p, g, m)) === c)
                            break;
                        if (!1 === I) {
                            if (!v) {
                                g.pop();
                                continue
                            }
                        } else if (void 0 !== I && (a.push([d, I]),
                        !v)) {
                            if (!l(I)) {
                                g.pop();
                                continue
                            }
                            f = I
                        }
                    }
                }
                void 0 === I && b && a.push([d, f]),
                v ? g.pop() : (r = {
                    inArray: i,
                    index: s,
                    keys: o,
                    edits: a,
                    prev: r
                },
                o = (i = Array.isArray(f)) ? f : n[f.kind] || [],
                s = -1,
                a = [],
                p && m.push(p),
                p = f)
            } while (void 0 !== r);
            return 0 !== a.length && (y = a[a.length - 1][1]),
            y
        }(e, {
            leave: d
        })
    }
    var d = {
        Name: function(e) {
            return e.value
        },
        Variable: function(e) {
            return "$" + e.name
        },
        Document: function(e) {
            return g(e.definitions, "\n\n") + "\n"
        },
        OperationDefinition: function(e) {
            var t = e.operation
              , n = e.name
              , r = y("(", g(e.variableDefinitions, ", "), ")")
              , i = g(e.directives, " ")
              , o = e.selectionSet;
            return n || i || r || "query" !== t ? g([t, g([n, r]), i, o], " ") : o
        },
        VariableDefinition: function(e) {
            var t = e.variable
              , n = e.type
              , r = e.defaultValue
              , i = e.directives;
            return t + ": " + n + y(" = ", r) + y(" ", g(i, " "))
        },
        SelectionSet: function(e) {
            return m(e.selections)
        },
        Field: function(e) {
            var t = e.alias
              , n = e.name
              , r = e.arguments
              , i = e.directives
              , o = e.selectionSet;
            return g([y("", t, ": ") + n + y("(", g(r, ", "), ")"), g(i, " "), o], " ")
        },
        Argument: function(e) {
            return e.name + ": " + e.value
        },
        FragmentSpread: function(e) {
            return "..." + e.name + y(" ", g(e.directives, " "))
        },
        InlineFragment: function(e) {
            var t = e.typeCondition
              , n = e.directives
              , r = e.selectionSet;
            return g(["...", y("on ", t), g(n, " "), r], " ")
        },
        FragmentDefinition: function(e) {
            var t = e.name
              , n = e.typeCondition
              , r = e.variableDefinitions
              , i = e.directives
              , o = e.selectionSet;
            return "fragment ".concat(t).concat(y("(", g(r, ", "), ")"), " ") + "on ".concat(n, " ").concat(y("", g(i, " "), " ")) + o
        },
        IntValue: function(e) {
            return e.value
        },
        FloatValue: function(e) {
            return e.value
        },
        StringValue: function(e, t) {
            var n = e.value;
            return e.block ? function(e, t) {
                var n = e.replace(/"""/g, '\\"""');
                return " " !== e[0] && "\t" !== e[0] || -1 !== e.indexOf("\n") ? '"""\n'.concat(t ? n : v(n), '\n"""') : '"""'.concat(n.replace(/"$/, '"\n'), '"""')
            }(n, "description" === t) : JSON.stringify(n)
        },
        BooleanValue: function(e) {
            return e.value ? "true" : "false"
        },
        NullValue: function() {
            return "null"
        },
        EnumValue: function(e) {
            return e.value
        },
        ListValue: function(e) {
            return "[" + g(e.values, ", ") + "]"
        },
        ObjectValue: function(e) {
            return "{" + g(e.fields, ", ") + "}"
        },
        ObjectField: function(e) {
            return e.name + ": " + e.value
        },
        Directive: function(e) {
            return "@" + e.name + y("(", g(e.arguments, ", "), ")")
        },
        NamedType: function(e) {
            return e.name
        },
        ListType: function(e) {
            return "[" + e.type + "]"
        },
        NonNullType: function(e) {
            return e.type + "!"
        },
        SchemaDefinition: function(e) {
            var t = e.directives
              , n = e.operationTypes;
            return g(["schema", g(t, " "), m(n)], " ")
        },
        OperationTypeDefinition: function(e) {
            return e.operation + ": " + e.type
        },
        ScalarTypeDefinition: p((function(e) {
            return g(["scalar", e.name, g(e.directives, " ")], " ")
        }
        )),
        ObjectTypeDefinition: p((function(e) {
            var t = e.name
              , n = e.interfaces
              , r = e.directives
              , i = e.fields;
            return g(["type", t, y("implements ", g(n, " & ")), g(r, " "), m(i)], " ")
        }
        )),
        FieldDefinition: p((function(e) {
            var t = e.name
              , n = e.arguments
              , r = e.type
              , i = e.directives;
            return t + (n.every((function(e) {
                return -1 === e.indexOf("\n")
            }
            )) ? y("(", g(n, ", "), ")") : y("(\n", v(g(n, "\n")), "\n)")) + ": " + r + y(" ", g(i, " "))
        }
        )),
        InputValueDefinition: p((function(e) {
            var t = e.name
              , n = e.type
              , r = e.defaultValue
              , i = e.directives;
            return g([t + ": " + n, y("= ", r), g(i, " ")], " ")
        }
        )),
        InterfaceTypeDefinition: p((function(e) {
            var t = e.name
              , n = e.directives
              , r = e.fields;
            return g(["interface", t, g(n, " "), m(r)], " ")
        }
        )),
        UnionTypeDefinition: p((function(e) {
            var t = e.name
              , n = e.directives
              , r = e.types;
            return g(["union", t, g(n, " "), r && 0 !== r.length ? "= " + g(r, " | ") : ""], " ")
        }
        )),
        EnumTypeDefinition: p((function(e) {
            var t = e.name
              , n = e.directives
              , r = e.values;
            return g(["enum", t, g(n, " "), m(r)], " ")
        }
        )),
        EnumValueDefinition: p((function(e) {
            return g([e.name, g(e.directives, " ")], " ")
        }
        )),
        InputObjectTypeDefinition: p((function(e) {
            var t = e.name
              , n = e.directives
              , r = e.fields;
            return g(["input", t, g(n, " "), m(r)], " ")
        }
        )),
        DirectiveDefinition: p((function(e) {
            var t = e.name
              , n = e.arguments
              , r = e.locations;
            return "directive @" + t + (n.every((function(e) {
                return -1 === e.indexOf("\n")
            }
            )) ? y("(", g(n, ", "), ")") : y("(\n", v(g(n, "\n")), "\n)")) + " on " + g(r, " | ")
        }
        )),
        SchemaExtension: function(e) {
            var t = e.directives
              , n = e.operationTypes;
            return g(["extend schema", g(t, " "), m(n)], " ")
        },
        ScalarTypeExtension: function(e) {
            return g(["extend scalar", e.name, g(e.directives, " ")], " ")
        },
        ObjectTypeExtension: function(e) {
            var t = e.name
              , n = e.interfaces
              , r = e.directives
              , i = e.fields;
            return g(["extend type", t, y("implements ", g(n, " & ")), g(r, " "), m(i)], " ")
        },
        InterfaceTypeExtension: function(e) {
            var t = e.name
              , n = e.directives
              , r = e.fields;
            return g(["extend interface", t, g(n, " "), m(r)], " ")
        },
        UnionTypeExtension: function(e) {
            var t = e.name
              , n = e.directives
              , r = e.types;
            return g(["extend union", t, g(n, " "), r && 0 !== r.length ? "= " + g(r, " | ") : ""], " ")
        },
        EnumTypeExtension: function(e) {
            var t = e.name
              , n = e.directives
              , r = e.values;
            return g(["extend enum", t, g(n, " "), m(r)], " ")
        },
        InputObjectTypeExtension: function(e) {
            var t = e.name
              , n = e.directives
              , r = e.fields;
            return g(["extend input", t, g(n, " "), m(r)], " ")
        }
    };
    function p(e) {
        return function(t) {
            return g([t.description, e(t)], "\n")
        }
    }
    function g(e, t) {
        return e ? e.filter((function(e) {
            return e
        }
        )).join(t || "") : ""
    }
    function m(e) {
        return e && 0 !== e.length ? "{\n" + v(g(e, "\n")) + "\n}" : ""
    }
    function y(e, t, n) {
        return t ? e + t + (n || "") : ""
    }
    function v(e) {
        return e && "  " + e.replace(/\n/g, "\n  ")
    }
    function b(e) {
        return (b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        )(e)
    }
    function w(e) {
        return e && "object" === b(e) ? "function" == typeof e.inspect ? e.inspect() : Array.isArray(e) ? "[" + e.map(w).join(", ") + "]" : "{" + Object.keys(e).map((function(t) {
            return "".concat(t, ": ").concat(w(e[t]))
        }
        )).join(", ") + "}" : "string" == typeof e ? '"' + e + '"' : "function" == typeof e ? "[function ".concat(e.name, "]") : String(e)
    }
    function S(e, t) {
        if (!e)
            throw new Error(t)
    }
    function E(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    var _, A = function(e, t, n) {
        E(this, "body", void 0),
        E(this, "name", void 0),
        E(this, "locationOffset", void 0),
        this.body = e,
        this.name = t || "GraphQL request",
        this.locationOffset = n || {
            line: 1,
            column: 1
        },
        this.locationOffset.line > 0 || S(0, "line in locationOffset is 1-indexed and must be positive"),
        this.locationOffset.column > 0 || S(0, "column in locationOffset is 1-indexed and must be positive")
    };
    function C(e, t, n) {
        return new a("Syntax Error: ".concat(n),void 0,e,[t])
    }
    function I(e) {
        for (var t = e.split(/\r\n|[\n\r]/g), n = null, r = 1; r < t.length; r++) {
            var i = t[r]
              , o = T(i);
            if (o < i.length && (null === n || o < n) && 0 === (n = o))
                break
        }
        if (n)
            for (var s = 1; s < t.length; s++)
                t[s] = t[s].slice(n);
        for (; t.length > 0 && k(t[0]); )
            t.shift();
        for (; t.length > 0 && k(t[t.length - 1]); )
            t.pop();
        return t.join("\n")
    }
    function T(e) {
        for (var t = 0; t < e.length && (" " === e[t] || "\t" === e[t]); )
            t++;
        return t
    }
    function k(e) {
        return T(e) === e.length
    }
    function x(e, t) {
        var n = new L(O.SOF,0,0,0,0,null);
        return {
            source: e,
            options: t,
            lastToken: n,
            token: n,
            line: 1,
            lineStart: 0,
            advance: P,
            lookahead: R
        }
    }
    function P() {
        return this.lastToken = this.token,
        this.token = this.lookahead()
    }
    function R() {
        var e = this.token;
        if (e.kind !== O.EOF)
            do {
                e = e.next || (e.next = M(this, e))
            } while (e.kind === O.COMMENT);
        return e
    }
    _ = A,
    "function" == typeof Symbol && Symbol.toStringTag && Object.defineProperty(_.prototype, Symbol.toStringTag, {
        get: function() {
            return this.constructor.name
        }
    });
    var O = Object.freeze({
        SOF: "<SOF>",
        EOF: "<EOF>",
        BANG: "!",
        DOLLAR: "$",
        AMP: "&",
        PAREN_L: "(",
        PAREN_R: ")",
        SPREAD: "...",
        COLON: ":",
        EQUALS: "=",
        AT: "@",
        BRACKET_L: "[",
        BRACKET_R: "]",
        BRACE_L: "{",
        PIPE: "|",
        BRACE_R: "}",
        NAME: "Name",
        INT: "Int",
        FLOAT: "Float",
        STRING: "String",
        BLOCK_STRING: "BlockString",
        COMMENT: "Comment"
    });
    function N(e) {
        var t = e.value;
        return t ? "".concat(e.kind, ' "').concat(t, '"') : e.kind
    }
    var U = String.prototype.charCodeAt
      , D = String.prototype.slice;
    function L(e, t, n, r, i, o, s) {
        this.kind = e,
        this.start = t,
        this.end = n,
        this.line = r,
        this.column = i,
        this.value = s,
        this.prev = o,
        this.next = null
    }
    function q(e) {
        return isNaN(e) ? O.EOF : e < 127 ? JSON.stringify(String.fromCharCode(e)) : '"\\u'.concat(("00" + e.toString(16).toUpperCase()).slice(-4), '"')
    }
    function M(e, t) {
        var n = e.source
          , r = n.body
          , i = r.length
          , o = function(e, t, n) {
            var r = e.length
              , i = t;
            for (; i < r; ) {
                var o = U.call(e, i);
                if (9 === o || 32 === o || 44 === o || 65279 === o)
                    ++i;
                else if (10 === o)
                    ++i,
                    ++n.line,
                    n.lineStart = i;
                else {
                    if (13 !== o)
                        break;
                    10 === U.call(e, i + 1) ? i += 2 : ++i,
                    ++n.line,
                    n.lineStart = i
                }
            }
            return i
        }(r, t.end, e)
          , s = e.line
          , a = 1 + o - e.lineStart;
        if (o >= i)
            return new L(O.EOF,i,i,s,a,t);
        var u = U.call(r, o);
        switch (u) {
        case 33:
            return new L(O.BANG,o,o + 1,s,a,t);
        case 35:
            return function(e, t, n, r, i) {
                var o, s = e.body, a = t;
                do {
                    o = U.call(s, ++a)
                } while (null !== o && (o > 31 || 9 === o));
                return new L(O.COMMENT,t,a,n,r,i,D.call(s, t + 1, a))
            }(n, o, s, a, t);
        case 36:
            return new L(O.DOLLAR,o,o + 1,s,a,t);
        case 38:
            return new L(O.AMP,o,o + 1,s,a,t);
        case 40:
            return new L(O.PAREN_L,o,o + 1,s,a,t);
        case 41:
            return new L(O.PAREN_R,o,o + 1,s,a,t);
        case 46:
            if (46 === U.call(r, o + 1) && 46 === U.call(r, o + 2))
                return new L(O.SPREAD,o,o + 3,s,a,t);
            break;
        case 58:
            return new L(O.COLON,o,o + 1,s,a,t);
        case 61:
            return new L(O.EQUALS,o,o + 1,s,a,t);
        case 64:
            return new L(O.AT,o,o + 1,s,a,t);
        case 91:
            return new L(O.BRACKET_L,o,o + 1,s,a,t);
        case 93:
            return new L(O.BRACKET_R,o,o + 1,s,a,t);
        case 123:
            return new L(O.BRACE_L,o,o + 1,s,a,t);
        case 124:
            return new L(O.PIPE,o,o + 1,s,a,t);
        case 125:
            return new L(O.BRACE_R,o,o + 1,s,a,t);
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 95:
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
            return function(e, t, n, r, i) {
                var o = e.body
                  , s = o.length
                  , a = t + 1
                  , u = 0;
                for (; a !== s && null !== (u = U.call(o, a)) && (95 === u || u >= 48 && u <= 57 || u >= 65 && u <= 90 || u >= 97 && u <= 122); )
                    ++a;
                return new L(O.NAME,t,a,n,r,i,D.call(o, t, a))
            }(n, o, s, a, t);
        case 45:
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            return function(e, t, n, r, i, o) {
                var s = e.body
                  , a = n
                  , u = t
                  , c = !1;
                45 === a && (a = U.call(s, ++u));
                if (48 === a) {
                    if ((a = U.call(s, ++u)) >= 48 && a <= 57)
                        throw C(e, u, "Invalid number, unexpected digit after 0: ".concat(q(a), "."))
                } else
                    u = F(e, u, a),
                    a = U.call(s, u);
                46 === a && (c = !0,
                a = U.call(s, ++u),
                u = F(e, u, a),
                a = U.call(s, u));
                69 !== a && 101 !== a || (c = !0,
                43 !== (a = U.call(s, ++u)) && 45 !== a || (a = U.call(s, ++u)),
                u = F(e, u, a));
                return new L(c ? O.FLOAT : O.INT,t,u,r,i,o,D.call(s, t, u))
            }(n, o, u, s, a, t);
        case 34:
            return 34 === U.call(r, o + 1) && 34 === U.call(r, o + 2) ? function(e, t, n, r, i) {
                var o = e.body
                  , s = t + 3
                  , a = s
                  , u = 0
                  , c = "";
                for (; s < o.length && null !== (u = U.call(o, s)); ) {
                    if (34 === u && 34 === U.call(o, s + 1) && 34 === U.call(o, s + 2))
                        return c += D.call(o, a, s),
                        new L(O.BLOCK_STRING,t,s + 3,n,r,i,I(c));
                    if (u < 32 && 9 !== u && 10 !== u && 13 !== u)
                        throw C(e, s, "Invalid character within String: ".concat(q(u), "."));
                    92 === u && 34 === U.call(o, s + 1) && 34 === U.call(o, s + 2) && 34 === U.call(o, s + 3) ? (c += D.call(o, a, s) + '"""',
                    a = s += 4) : ++s
                }
                throw C(e, s, "Unterminated string.")
            }(n, o, s, a, t) : function(e, t, n, r, i) {
                var o = e.body
                  , s = t + 1
                  , a = s
                  , u = 0
                  , c = "";
                for (; s < o.length && null !== (u = U.call(o, s)) && 10 !== u && 13 !== u; ) {
                    if (34 === u)
                        return c += D.call(o, a, s),
                        new L(O.STRING,t,s + 1,n,r,i,c);
                    if (u < 32 && 9 !== u)
                        throw C(e, s, "Invalid character within String: ".concat(q(u), "."));
                    if (++s,
                    92 === u) {
                        switch (c += D.call(o, a, s - 1),
                        u = U.call(o, s)) {
                        case 34:
                            c += '"';
                            break;
                        case 47:
                            c += "/";
                            break;
                        case 92:
                            c += "\\";
                            break;
                        case 98:
                            c += "\b";
                            break;
                        case 102:
                            c += "\f";
                            break;
                        case 110:
                            c += "\n";
                            break;
                        case 114:
                            c += "\r";
                            break;
                        case 116:
                            c += "\t";
                            break;
                        case 117:
                            var l = (h = U.call(o, s + 1),
                            f = U.call(o, s + 2),
                            d = U.call(o, s + 3),
                            p = U.call(o, s + 4),
                            j(h) << 12 | j(f) << 8 | j(d) << 4 | j(p));
                            if (l < 0)
                                throw C(e, s, "Invalid character escape sequence: " + "\\u".concat(o.slice(s + 1, s + 5), "."));
                            c += String.fromCharCode(l),
                            s += 4;
                            break;
                        default:
                            throw C(e, s, "Invalid character escape sequence: \\".concat(String.fromCharCode(u), "."))
                        }
                        ++s,
                        a = s
                    }
                }
                var h, f, d, p;
                throw C(e, s, "Unterminated string.")
            }(n, o, s, a, t)
        }
        throw C(n, o, function(e) {
            if (e < 32 && 9 !== e && 10 !== e && 13 !== e)
                return "Cannot contain the invalid character ".concat(q(e), ".");
            if (39 === e)
                return "Unexpected single quote character ('), did you mean to use a double quote (\")?";
            return "Cannot parse the unexpected character ".concat(q(e), ".")
        }(u))
    }
    function F(e, t, n) {
        var r = e.body
          , i = t
          , o = n;
        if (o >= 48 && o <= 57) {
            do {
                o = U.call(r, ++i)
            } while (o >= 48 && o <= 57);
            return i
        }
        throw C(e, i, "Invalid number, expected digit but got: ".concat(q(o), "."))
    }
    function j(e) {
        return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1
    }
    L.prototype.toJSON = L.prototype.inspect = function() {
        return {
            kind: this.kind,
            value: this.value,
            line: this.line,
            column: this.column
        }
    }
    ;
    var B = Object.freeze({
        NAME: "Name",
        DOCUMENT: "Document",
        OPERATION_DEFINITION: "OperationDefinition",
        VARIABLE_DEFINITION: "VariableDefinition",
        SELECTION_SET: "SelectionSet",
        FIELD: "Field",
        ARGUMENT: "Argument",
        FRAGMENT_SPREAD: "FragmentSpread",
        INLINE_FRAGMENT: "InlineFragment",
        FRAGMENT_DEFINITION: "FragmentDefinition",
        VARIABLE: "Variable",
        INT: "IntValue",
        FLOAT: "FloatValue",
        STRING: "StringValue",
        BOOLEAN: "BooleanValue",
        NULL: "NullValue",
        ENUM: "EnumValue",
        LIST: "ListValue",
        OBJECT: "ObjectValue",
        OBJECT_FIELD: "ObjectField",
        DIRECTIVE: "Directive",
        NAMED_TYPE: "NamedType",
        LIST_TYPE: "ListType",
        NON_NULL_TYPE: "NonNullType",
        SCHEMA_DEFINITION: "SchemaDefinition",
        OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
        SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
        OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
        FIELD_DEFINITION: "FieldDefinition",
        INPUT_VALUE_DEFINITION: "InputValueDefinition",
        INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
        UNION_TYPE_DEFINITION: "UnionTypeDefinition",
        ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
        ENUM_VALUE_DEFINITION: "EnumValueDefinition",
        INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
        DIRECTIVE_DEFINITION: "DirectiveDefinition",
        SCHEMA_EXTENSION: "SchemaExtension",
        SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
        OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
        INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
        UNION_TYPE_EXTENSION: "UnionTypeExtension",
        ENUM_TYPE_EXTENSION: "EnumTypeExtension",
        INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension"
    })
      , V = Object.freeze({
        QUERY: "QUERY",
        MUTATION: "MUTATION",
        SUBSCRIPTION: "SUBSCRIPTION",
        FIELD: "FIELD",
        FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
        FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
        INLINE_FRAGMENT: "INLINE_FRAGMENT",
        VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
        SCHEMA: "SCHEMA",
        SCALAR: "SCALAR",
        OBJECT: "OBJECT",
        FIELD_DEFINITION: "FIELD_DEFINITION",
        ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
        INTERFACE: "INTERFACE",
        UNION: "UNION",
        ENUM: "ENUM",
        ENUM_VALUE: "ENUM_VALUE",
        INPUT_OBJECT: "INPUT_OBJECT",
        INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION"
    });
    function z(e, t) {
        var n = "string" == typeof e ? new A(e) : e;
        if (!(n instanceof A))
            throw new TypeError("Must provide Source. Received: ".concat(w(n)));
        return function(e) {
            var t = e.token;
            return {
                kind: B.DOCUMENT,
                definitions: De(e, O.SOF, K, O.EOF),
                loc: Te(e, t)
            }
        }(x(n, t || {}))
    }
    function H(e) {
        var t = Re(e, O.NAME);
        return {
            kind: B.NAME,
            value: t.value,
            loc: Te(e, t)
        }
    }
    function K(e) {
        if (xe(e, O.NAME))
            switch (e.token.value) {
            case "query":
            case "mutation":
            case "subscription":
            case "fragment":
                return W(e);
            case "schema":
            case "scalar":
            case "type":
            case "interface":
            case "union":
            case "enum":
            case "input":
            case "directive":
                return de(e);
            case "extend":
                return function(e) {
                    var t = e.lookahead();
                    if (t.kind === O.NAME)
                        switch (t.value) {
                        case "schema":
                            return function(e) {
                                var t = e.token;
                                Oe(e, "extend"),
                                Oe(e, "schema");
                                var n = ce(e, !0)
                                  , r = xe(e, O.BRACE_L) ? De(e, O.BRACE_L, me, O.BRACE_R) : [];
                                if (0 === n.length && 0 === r.length)
                                    throw Ne(e);
                                return {
                                    kind: B.SCHEMA_EXTENSION,
                                    directives: n,
                                    operationTypes: r,
                                    loc: Te(e, t)
                                }
                            }(e);
                        case "scalar":
                            return function(e) {
                                var t = e.token;
                                Oe(e, "extend"),
                                Oe(e, "scalar");
                                var n = H(e)
                                  , r = ce(e, !0);
                                if (0 === r.length)
                                    throw Ne(e);
                                return {
                                    kind: B.SCALAR_TYPE_EXTENSION,
                                    name: n,
                                    directives: r,
                                    loc: Te(e, t)
                                }
                            }(e);
                        case "type":
                            return function(e) {
                                var t = e.token;
                                Oe(e, "extend"),
                                Oe(e, "type");
                                var n = H(e)
                                  , r = ye(e)
                                  , i = ce(e, !0)
                                  , o = ve(e);
                                if (0 === r.length && 0 === i.length && 0 === o.length)
                                    throw Ne(e);
                                return {
                                    kind: B.OBJECT_TYPE_EXTENSION,
                                    name: n,
                                    interfaces: r,
                                    directives: i,
                                    fields: o,
                                    loc: Te(e, t)
                                }
                            }(e);
                        case "interface":
                            return function(e) {
                                var t = e.token;
                                Oe(e, "extend"),
                                Oe(e, "interface");
                                var n = H(e)
                                  , r = ce(e, !0)
                                  , i = ve(e);
                                if (0 === r.length && 0 === i.length)
                                    throw Ne(e);
                                return {
                                    kind: B.INTERFACE_TYPE_EXTENSION,
                                    name: n,
                                    directives: r,
                                    fields: i,
                                    loc: Te(e, t)
                                }
                            }(e);
                        case "union":
                            return function(e) {
                                var t = e.token;
                                Oe(e, "extend"),
                                Oe(e, "union");
                                var n = H(e)
                                  , r = ce(e, !0)
                                  , i = Ee(e);
                                if (0 === r.length && 0 === i.length)
                                    throw Ne(e);
                                return {
                                    kind: B.UNION_TYPE_EXTENSION,
                                    name: n,
                                    directives: r,
                                    types: i,
                                    loc: Te(e, t)
                                }
                            }(e);
                        case "enum":
                            return function(e) {
                                var t = e.token;
                                Oe(e, "extend"),
                                Oe(e, "enum");
                                var n = H(e)
                                  , r = ce(e, !0)
                                  , i = _e(e);
                                if (0 === r.length && 0 === i.length)
                                    throw Ne(e);
                                return {
                                    kind: B.ENUM_TYPE_EXTENSION,
                                    name: n,
                                    directives: r,
                                    values: i,
                                    loc: Te(e, t)
                                }
                            }(e);
                        case "input":
                            return function(e) {
                                var t = e.token;
                                Oe(e, "extend"),
                                Oe(e, "input");
                                var n = H(e)
                                  , r = ce(e, !0)
                                  , i = Ce(e);
                                if (0 === r.length && 0 === i.length)
                                    throw Ne(e);
                                return {
                                    kind: B.INPUT_OBJECT_TYPE_EXTENSION,
                                    name: n,
                                    directives: r,
                                    fields: i,
                                    loc: Te(e, t)
                                }
                            }(e)
                        }
                    throw Ne(e, t)
                }(e)
            }
        else {
            if (xe(e, O.BRACE_L))
                return W(e);
            if (pe(e))
                return de(e)
        }
        throw Ne(e)
    }
    function W(e) {
        if (xe(e, O.NAME))
            switch (e.token.value) {
            case "query":
            case "mutation":
            case "subscription":
                return G(e);
            case "fragment":
                return function(e) {
                    var t = e.token;
                    if (Oe(e, "fragment"),
                    e.options.experimentalFragmentVariables)
                        return {
                            kind: B.FRAGMENT_DEFINITION,
                            name: re(e),
                            variableDefinitions: Y(e),
                            typeCondition: (Oe(e, "on"),
                            fe(e)),
                            directives: ce(e, !1),
                            selectionSet: Z(e),
                            loc: Te(e, t)
                        };
                    return {
                        kind: B.FRAGMENT_DEFINITION,
                        name: re(e),
                        typeCondition: (Oe(e, "on"),
                        fe(e)),
                        directives: ce(e, !1),
                        selectionSet: Z(e),
                        loc: Te(e, t)
                    }
                }(e)
            }
        else if (xe(e, O.BRACE_L))
            return G(e);
        throw Ne(e)
    }
    function G(e) {
        var t = e.token;
        if (xe(e, O.BRACE_L))
            return {
                kind: B.OPERATION_DEFINITION,
                operation: "query",
                name: void 0,
                variableDefinitions: [],
                directives: [],
                selectionSet: Z(e),
                loc: Te(e, t)
            };
        var n, r = J(e);
        return xe(e, O.NAME) && (n = H(e)),
        {
            kind: B.OPERATION_DEFINITION,
            operation: r,
            name: n,
            variableDefinitions: Y(e),
            directives: ce(e, !1),
            selectionSet: Z(e),
            loc: Te(e, t)
        }
    }
    function J(e) {
        var t = Re(e, O.NAME);
        switch (t.value) {
        case "query":
            return "query";
        case "mutation":
            return "mutation";
        case "subscription":
            return "subscription"
        }
        throw Ne(e, t)
    }
    function Y(e) {
        return xe(e, O.PAREN_L) ? De(e, O.PAREN_L, X, O.PAREN_R) : []
    }
    function X(e) {
        var t = e.token;
        return e.options.experimentalVariableDefinitionDirectives ? {
            kind: B.VARIABLE_DEFINITION,
            variable: $(e),
            type: (Re(e, O.COLON),
            he(e)),
            defaultValue: Pe(e, O.EQUALS) ? ie(e, !0) : void 0,
            directives: ce(e, !0),
            loc: Te(e, t)
        } : {
            kind: B.VARIABLE_DEFINITION,
            variable: $(e),
            type: (Re(e, O.COLON),
            he(e)),
            defaultValue: Pe(e, O.EQUALS) ? ie(e, !0) : void 0,
            loc: Te(e, t)
        }
    }
    function $(e) {
        var t = e.token;
        return Re(e, O.DOLLAR),
        {
            kind: B.VARIABLE,
            name: H(e),
            loc: Te(e, t)
        }
    }
    function Z(e) {
        var t = e.token;
        return {
            kind: B.SELECTION_SET,
            selections: De(e, O.BRACE_L, Q, O.BRACE_R),
            loc: Te(e, t)
        }
    }
    function Q(e) {
        return xe(e, O.SPREAD) ? function(e) {
            var t, n = e.token;
            if (Re(e, O.SPREAD),
            xe(e, O.NAME) && "on" !== e.token.value)
                return {
                    kind: B.FRAGMENT_SPREAD,
                    name: re(e),
                    directives: ce(e, !1),
                    loc: Te(e, n)
                };
            "on" === e.token.value && (e.advance(),
            t = fe(e));
            return {
                kind: B.INLINE_FRAGMENT,
                typeCondition: t,
                directives: ce(e, !1),
                selectionSet: Z(e),
                loc: Te(e, n)
            }
        }(e) : function(e) {
            var t, n, r = e.token, i = H(e);
            Pe(e, O.COLON) ? (t = i,
            n = H(e)) : n = i;
            return {
                kind: B.FIELD,
                alias: t,
                name: n,
                arguments: ee(e, !1),
                directives: ce(e, !1),
                selectionSet: xe(e, O.BRACE_L) ? Z(e) : void 0,
                loc: Te(e, r)
            }
        }(e)
    }
    function ee(e, t) {
        var n = t ? ne : te;
        return xe(e, O.PAREN_L) ? De(e, O.PAREN_L, n, O.PAREN_R) : []
    }
    function te(e) {
        var t = e.token;
        return {
            kind: B.ARGUMENT,
            name: H(e),
            value: (Re(e, O.COLON),
            ie(e, !1)),
            loc: Te(e, t)
        }
    }
    function ne(e) {
        var t = e.token;
        return {
            kind: B.ARGUMENT,
            name: H(e),
            value: (Re(e, O.COLON),
            se(e)),
            loc: Te(e, t)
        }
    }
    function re(e) {
        if ("on" === e.token.value)
            throw Ne(e);
        return H(e)
    }
    function ie(e, t) {
        var n = e.token;
        switch (n.kind) {
        case O.BRACKET_L:
            return function(e, t) {
                var n = e.token
                  , r = t ? se : ae;
                return {
                    kind: B.LIST,
                    values: Ue(e, O.BRACKET_L, r, O.BRACKET_R),
                    loc: Te(e, n)
                }
            }(e, t);
        case O.BRACE_L:
            return function(e, t) {
                var n = e.token;
                Re(e, O.BRACE_L);
                var r = [];
                for (; !Pe(e, O.BRACE_R); )
                    r.push(ue(e, t));
                return {
                    kind: B.OBJECT,
                    fields: r,
                    loc: Te(e, n)
                }
            }(e, t);
        case O.INT:
            return e.advance(),
            {
                kind: B.INT,
                value: n.value,
                loc: Te(e, n)
            };
        case O.FLOAT:
            return e.advance(),
            {
                kind: B.FLOAT,
                value: n.value,
                loc: Te(e, n)
            };
        case O.STRING:
        case O.BLOCK_STRING:
            return oe(e);
        case O.NAME:
            return "true" === n.value || "false" === n.value ? (e.advance(),
            {
                kind: B.BOOLEAN,
                value: "true" === n.value,
                loc: Te(e, n)
            }) : "null" === n.value ? (e.advance(),
            {
                kind: B.NULL,
                loc: Te(e, n)
            }) : (e.advance(),
            {
                kind: B.ENUM,
                value: n.value,
                loc: Te(e, n)
            });
        case O.DOLLAR:
            if (!t)
                return $(e)
        }
        throw Ne(e)
    }
    function oe(e) {
        var t = e.token;
        return e.advance(),
        {
            kind: B.STRING,
            value: t.value,
            block: t.kind === O.BLOCK_STRING,
            loc: Te(e, t)
        }
    }
    function se(e) {
        return ie(e, !0)
    }
    function ae(e) {
        return ie(e, !1)
    }
    function ue(e, t) {
        var n = e.token;
        return {
            kind: B.OBJECT_FIELD,
            name: H(e),
            value: (Re(e, O.COLON),
            ie(e, t)),
            loc: Te(e, n)
        }
    }
    function ce(e, t) {
        for (var n = []; xe(e, O.AT); )
            n.push(le(e, t));
        return n
    }
    function le(e, t) {
        var n = e.token;
        return Re(e, O.AT),
        {
            kind: B.DIRECTIVE,
            name: H(e),
            arguments: ee(e, t),
            loc: Te(e, n)
        }
    }
    function he(e) {
        var t, n = e.token;
        return Pe(e, O.BRACKET_L) ? (t = he(e),
        Re(e, O.BRACKET_R),
        t = {
            kind: B.LIST_TYPE,
            type: t,
            loc: Te(e, n)
        }) : t = fe(e),
        Pe(e, O.BANG) ? {
            kind: B.NON_NULL_TYPE,
            type: t,
            loc: Te(e, n)
        } : t
    }
    function fe(e) {
        var t = e.token;
        return {
            kind: B.NAMED_TYPE,
            name: H(e),
            loc: Te(e, t)
        }
    }
    function de(e) {
        var t = pe(e) ? e.lookahead() : e.token;
        if (t.kind === O.NAME)
            switch (t.value) {
            case "schema":
                return function(e) {
                    var t = e.token;
                    Oe(e, "schema");
                    var n = ce(e, !0)
                      , r = De(e, O.BRACE_L, me, O.BRACE_R);
                    return {
                        kind: B.SCHEMA_DEFINITION,
                        directives: n,
                        operationTypes: r,
                        loc: Te(e, t)
                    }
                }(e);
            case "scalar":
                return function(e) {
                    var t = e.token
                      , n = ge(e);
                    Oe(e, "scalar");
                    var r = H(e)
                      , i = ce(e, !0);
                    return {
                        kind: B.SCALAR_TYPE_DEFINITION,
                        description: n,
                        name: r,
                        directives: i,
                        loc: Te(e, t)
                    }
                }(e);
            case "type":
                return function(e) {
                    var t = e.token
                      , n = ge(e);
                    Oe(e, "type");
                    var r = H(e)
                      , i = ye(e)
                      , o = ce(e, !0)
                      , s = ve(e);
                    return {
                        kind: B.OBJECT_TYPE_DEFINITION,
                        description: n,
                        name: r,
                        interfaces: i,
                        directives: o,
                        fields: s,
                        loc: Te(e, t)
                    }
                }(e);
            case "interface":
                return function(e) {
                    var t = e.token
                      , n = ge(e);
                    Oe(e, "interface");
                    var r = H(e)
                      , i = ce(e, !0)
                      , o = ve(e);
                    return {
                        kind: B.INTERFACE_TYPE_DEFINITION,
                        description: n,
                        name: r,
                        directives: i,
                        fields: o,
                        loc: Te(e, t)
                    }
                }(e);
            case "union":
                return function(e) {
                    var t = e.token
                      , n = ge(e);
                    Oe(e, "union");
                    var r = H(e)
                      , i = ce(e, !0)
                      , o = Ee(e);
                    return {
                        kind: B.UNION_TYPE_DEFINITION,
                        description: n,
                        name: r,
                        directives: i,
                        types: o,
                        loc: Te(e, t)
                    }
                }(e);
            case "enum":
                return function(e) {
                    var t = e.token
                      , n = ge(e);
                    Oe(e, "enum");
                    var r = H(e)
                      , i = ce(e, !0)
                      , o = _e(e);
                    return {
                        kind: B.ENUM_TYPE_DEFINITION,
                        description: n,
                        name: r,
                        directives: i,
                        values: o,
                        loc: Te(e, t)
                    }
                }(e);
            case "input":
                return function(e) {
                    var t = e.token
                      , n = ge(e);
                    Oe(e, "input");
                    var r = H(e)
                      , i = ce(e, !0)
                      , o = Ce(e);
                    return {
                        kind: B.INPUT_OBJECT_TYPE_DEFINITION,
                        description: n,
                        name: r,
                        directives: i,
                        fields: o,
                        loc: Te(e, t)
                    }
                }(e);
            case "directive":
                return function(e) {
                    var t = e.token
                      , n = ge(e);
                    Oe(e, "directive"),
                    Re(e, O.AT);
                    var r = H(e)
                      , i = we(e);
                    Oe(e, "on");
                    var o = function(e) {
                        Pe(e, O.PIPE);
                        var t = [];
                        do {
                            t.push(Ie(e))
                        } while (Pe(e, O.PIPE));
                        return t
                    }(e);
                    return {
                        kind: B.DIRECTIVE_DEFINITION,
                        description: n,
                        name: r,
                        arguments: i,
                        locations: o,
                        loc: Te(e, t)
                    }
                }(e)
            }
        throw Ne(e, t)
    }
    function pe(e) {
        return xe(e, O.STRING) || xe(e, O.BLOCK_STRING)
    }
    function ge(e) {
        if (pe(e))
            return oe(e)
    }
    function me(e) {
        var t = e.token
          , n = J(e);
        Re(e, O.COLON);
        var r = fe(e);
        return {
            kind: B.OPERATION_TYPE_DEFINITION,
            operation: n,
            type: r,
            loc: Te(e, t)
        }
    }
    function ye(e) {
        var t = [];
        if ("implements" === e.token.value) {
            e.advance(),
            Pe(e, O.AMP);
            do {
                t.push(fe(e))
            } while (Pe(e, O.AMP) || e.options.allowLegacySDLImplementsInterfaces && xe(e, O.NAME))
        }
        return t
    }
    function ve(e) {
        return e.options.allowLegacySDLEmptyFields && xe(e, O.BRACE_L) && e.lookahead().kind === O.BRACE_R ? (e.advance(),
        e.advance(),
        []) : xe(e, O.BRACE_L) ? De(e, O.BRACE_L, be, O.BRACE_R) : []
    }
    function be(e) {
        var t = e.token
          , n = ge(e)
          , r = H(e)
          , i = we(e);
        Re(e, O.COLON);
        var o = he(e)
          , s = ce(e, !0);
        return {
            kind: B.FIELD_DEFINITION,
            description: n,
            name: r,
            arguments: i,
            type: o,
            directives: s,
            loc: Te(e, t)
        }
    }
    function we(e) {
        return xe(e, O.PAREN_L) ? De(e, O.PAREN_L, Se, O.PAREN_R) : []
    }
    function Se(e) {
        var t = e.token
          , n = ge(e)
          , r = H(e);
        Re(e, O.COLON);
        var i, o = he(e);
        Pe(e, O.EQUALS) && (i = se(e));
        var s = ce(e, !0);
        return {
            kind: B.INPUT_VALUE_DEFINITION,
            description: n,
            name: r,
            type: o,
            defaultValue: i,
            directives: s,
            loc: Te(e, t)
        }
    }
    function Ee(e) {
        var t = [];
        if (Pe(e, O.EQUALS)) {
            Pe(e, O.PIPE);
            do {
                t.push(fe(e))
            } while (Pe(e, O.PIPE))
        }
        return t
    }
    function _e(e) {
        return xe(e, O.BRACE_L) ? De(e, O.BRACE_L, Ae, O.BRACE_R) : []
    }
    function Ae(e) {
        var t = e.token
          , n = ge(e)
          , r = H(e)
          , i = ce(e, !0);
        return {
            kind: B.ENUM_VALUE_DEFINITION,
            description: n,
            name: r,
            directives: i,
            loc: Te(e, t)
        }
    }
    function Ce(e) {
        return xe(e, O.BRACE_L) ? De(e, O.BRACE_L, Se, O.BRACE_R) : []
    }
    function Ie(e) {
        var t = e.token
          , n = H(e);
        if (V.hasOwnProperty(n.value))
            return n;
        throw Ne(e, t)
    }
    function Te(e, t) {
        if (!e.options.noLocation)
            return new ke(t,e.lastToken,e.source)
    }
    function ke(e, t, n) {
        this.start = e.start,
        this.end = t.end,
        this.startToken = e,
        this.endToken = t,
        this.source = n
    }
    function xe(e, t) {
        return e.token.kind === t
    }
    function Pe(e, t) {
        var n = e.token.kind === t;
        return n && e.advance(),
        n
    }
    function Re(e, t) {
        var n = e.token;
        if (n.kind === t)
            return e.advance(),
            n;
        throw C(e.source, n.start, "Expected ".concat(t, ", found ").concat(N(n)))
    }
    function Oe(e, t) {
        var n = e.token;
        if (n.kind === O.NAME && n.value === t)
            return e.advance(),
            n;
        throw C(e.source, n.start, 'Expected "'.concat(t, '", found ').concat(N(n)))
    }
    function Ne(e, t) {
        var n = t || e.token;
        return C(e.source, n.start, "Unexpected ".concat(N(n)))
    }
    function Ue(e, t, n, r) {
        Re(e, t);
        for (var i = []; !Pe(e, r); )
            i.push(n(e));
        return i
    }
    function De(e, t, n, r) {
        Re(e, t);
        for (var i = [n(e)]; !Pe(e, r); )
            i.push(n(e));
        return i
    }
    ke.prototype.toJSON = ke.prototype.inspect = function() {
        return {
            start: this.start,
            end: this.end
        }
    }
    ;
    var Le = n(26)
      , qe = function() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++)
            e += arguments[t].length;
        var r = Array(e)
          , i = 0;
        for (t = 0; t < n; t++)
            for (var o = arguments[t], s = 0, a = o.length; s < a; s++,
            i++)
                r[i] = o[s];
        return r
    }
      , Me = {
        VERBOSE: 1,
        DEBUG: 2,
        INFO: 3,
        WARN: 4,
        ERROR: 5
    }
      , Fe = function() {
        function e(e, t) {
            void 0 === t && (t = "WARN"),
            this.name = e,
            this.level = t
        }
        return e.prototype._padding = function(e) {
            return e < 10 ? "0" + e : "" + e
        }
        ,
        e.prototype._ts = function() {
            var e = new Date;
            return [this._padding(e.getMinutes()), this._padding(e.getSeconds())].join(":") + "." + e.getMilliseconds()
        }
        ,
        e.prototype._log = function(t) {
            for (var n = [], r = 1; r < arguments.length; r++)
                n[r - 1] = arguments[r];
            var i = this.level;
            e.LOG_LEVEL && (i = e.LOG_LEVEL),
            "undefined" != typeof window && window.LOG_LEVEL && (i = window.LOG_LEVEL);
            var o = Me[i]
              , s = Me[t];
            if (s >= o) {
                var a = console.log.bind(console);
                "ERROR" === t && console.error && (a = console.error.bind(console)),
                "WARN" === t && console.warn && (a = console.warn.bind(console));
                var u = "[" + t + "] " + this._ts() + " " + this.name;
                if (1 === n.length && "string" == typeof n[0])
                    a(u + " - " + n[0]);
                else if (1 === n.length)
                    a(u, n[0]);
                else if ("string" == typeof n[0]) {
                    var c = n.slice(1);
                    1 === c.length && (c = c[0]),
                    a(u + " - " + n[0], c)
                } else
                    a(u, n)
            }
        }
        ,
        e.prototype.log = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            this._log.apply(this, qe(["INFO"], e))
        }
        ,
        e.prototype.info = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            this._log.apply(this, qe(["INFO"], e))
        }
        ,
        e.prototype.warn = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            this._log.apply(this, qe(["WARN"], e))
        }
        ,
        e.prototype.error = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            this._log.apply(this, qe(["ERROR"], e))
        }
        ,
        e.prototype.debug = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            this._log.apply(this, qe(["DEBUG"], e))
        }
        ,
        e.prototype.verbose = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            this._log.apply(this, qe(["VERBOSE"], e))
        }
        ,
        e.LOG_LEVEL = null,
        e
    }()
      , je = new Fe("Amplify")
      , Be = function() {
        function e() {}
        return e.register = function(t) {
            je.debug("component registered in amplify", t),
            this._components.push(t),
            "function" == typeof t.getModuleName ? e[t.getModuleName()] = t : je.debug("no getModuleName method for component", t)
        }
        ,
        e.configure = function(e) {
            var t = this;
            return e ? (this._config = Object.assign(this._config, e),
            je.debug("amplify config", this._config),
            this._components.map((function(e) {
                e.configure(t._config)
            }
            )),
            this._config) : this._config
        }
        ,
        e.addPluggable = function(e) {
            e && e.getCategory && "function" == typeof e.getCategory && this._components.map((function(t) {
                t.addPluggable && "function" == typeof t.addPluggable && t.addPluggable(e)
            }
            ))
        }
        ,
        e._components = [],
        e._config = {},
        e.Auth = null,
        e.Analytics = null,
        e.API = null,
        e.Storage = null,
        e.I18n = null,
        e.Cache = null,
        e.PubSub = null,
        e.Interactions = null,
        e.Pushnotification = null,
        e.UI = null,
        e.XR = null,
        e.Predictions = null,
        e.DataStore = null,
        e.Logger = Fe,
        e.ServiceWorker = null,
        e
    }()
      , Ve = new Fe("ClientDevice_Browser");
    function ze() {
        return "undefined" == typeof window ? {} : function() {
            if ("undefined" == typeof window)
                return Ve.warn("No window object available to get browser client info"),
                {};
            var e = window.navigator;
            if (!e)
                return Ve.warn("No navigator object available to get browser client info"),
                {};
            var t = e.platform
              , n = e.product
              , r = e.vendor
              , i = e.userAgent
              , o = e.language
              , s = function(e) {
                var t = /.+(Opera[\s[A-Z]*|OPR[\sA-Z]*)\/([0-9\.]+).*/i.exec(e);
                if (t)
                    return {
                        type: t[1],
                        version: t[2]
                    };
                var n = /.+(Trident|Edge)\/([0-9\.]+).*/i.exec(e);
                if (n)
                    return {
                        type: n[1],
                        version: n[2]
                    };
                var r = /.+(Chrome|Firefox|FxiOS)\/([0-9\.]+).*/i.exec(e);
                if (r)
                    return {
                        type: r[1],
                        version: r[2]
                    };
                var i = /.+(Safari)\/([0-9\.]+).*/i.exec(e);
                if (i)
                    return {
                        type: i[1],
                        version: i[2]
                    };
                var o = /.+(AppleWebKit)\/([0-9\.]+).*/i.exec(e);
                if (o)
                    return {
                        type: o[1],
                        version: o[2]
                    };
                var s = /.*([A-Z]+)\/([0-9\.]+).*/i.exec(e);
                if (s)
                    return {
                        type: s[1],
                        version: s[2]
                    };
                return {
                    type: "",
                    version: ""
                }
            }(i)
              , a = (u = /\(([A-Za-z\s].*)\)/.exec((new Date).toString()),
            u && u[1] || "");
            var u;
            return {
                platform: t,
                make: n || r,
                model: s.type,
                version: s.version,
                appVersion: [s.type, s.version].join("/"),
                language: o,
                timezone: a
            }
        }()
    }
    !function() {
        function e() {}
        e.clientInfo = function() {
            return ze()
        }
        ,
        e.dimension = function() {
            return "undefined" == typeof window ? (Ve.warn("No window object available to get browser client info"),
            {
                width: 320,
                height: 320
            }) : {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }();
    var He = function() {
        return (He = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }
        ).apply(this, arguments)
    }
      , Ke = function() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++)
            e += arguments[t].length;
        var r = Array(e)
          , i = 0;
        for (t = 0; t < n; t++)
            for (var o = arguments[t], s = 0, a = o.length; s < a; s++,
            i++)
                r[i] = o[s];
        return r
    }
      , We = new Fe("Hub")
      , Ge = "undefined" != typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("amplify_default") : "@@amplify_default";
    var Je = new (function() {
        function e(e) {
            this.listeners = [],
            this.patterns = [],
            this.protectedChannels = ["core", "auth", "api", "analytics", "interactions", "pubsub", "storage", "xr"],
            this.name = e
        }
        return e.prototype.remove = function(e, t) {
            if (e instanceof RegExp) {
                var n = this.patterns.find((function(t) {
                    return t.pattern.source === e.source
                }
                ));
                if (!n)
                    return void We.warn("No listeners for " + e);
                this.patterns = Ke(this.patterns.filter((function(e) {
                    return e !== n
                }
                )))
            } else {
                var r = this.listeners[e];
                if (!r)
                    return void We.warn("No listeners for " + e);
                this.listeners[e] = Ke(r.filter((function(e) {
                    return e.callback !== t
                }
                )))
            }
        }
        ,
        e.prototype.dispatch = function(e, t, n, r) {
            (void 0 === n && (n = ""),
            this.protectedChannels.indexOf(e) > -1) && (r === Ge || We.warn("WARNING: " + e + " is protected and dispatching on it can have unintended consequences"));
            var i = {
                channel: e,
                payload: He({}, t),
                source: n,
                patternInfo: []
            };
            try {
                this._toListeners(i)
            } catch (e) {
                We.error(e)
            }
        }
        ,
        e.prototype.listen = function(e, t, n) {
            var r;
            if (void 0 === n && (n = "noname"),
            function(e) {
                return void 0 !== e.onHubCapsule
            }(t))
                We.warn("WARNING onHubCapsule is Deprecated. Please pass in a callback."),
                r = t.onHubCapsule.bind(t);
            else {
                if ("function" != typeof t)
                    throw new Error("No callback supplied to Hub");
                r = t
            }
            if (e instanceof RegExp)
                this.patterns.push({
                    pattern: e,
                    callback: r
                });
            else {
                var i = this.listeners[e];
                i || (i = [],
                this.listeners[e] = i),
                i.push({
                    name: n,
                    callback: r
                })
            }
        }
        ,
        e.prototype._toListeners = function(e) {
            var t = e.channel
              , n = e.payload
              , r = this.listeners[t];
            if (r && r.forEach((function(r) {
                We.debug("Dispatching to " + t + " with ", n);
                try {
                    r.callback(e)
                } catch (e) {
                    We.error(e)
                }
            }
            )),
            this.patterns.length > 0) {
                if (!n.message)
                    return void We.warn("Cannot perform pattern matching without a message key");
                var i = n.message;
                this.patterns.forEach((function(t) {
                    var n = i.match(t.pattern);
                    if (n) {
                        var r = n.slice(1)
                          , o = He(He({}, e), {
                            patternInfo: r
                        });
                        try {
                            t.callback(o)
                        } catch (e) {
                            We.error(e)
                        }
                    }
                }
                ))
            }
        }
        ,
        e
    }())("__default__")
      , Ye = new Fe("I18n")
      , Xe = function() {
        function e(e) {
            this._options = null,
            this._lang = null,
            this._dict = {},
            this._options = Object.assign({}, e),
            this._lang = this._options.language,
            !this._lang && "undefined" != typeof window && window && window.navigator && (this._lang = window.navigator.language),
            Ye.debug(this._lang)
        }
        return e.prototype.setLanguage = function(e) {
            this._lang = e
        }
        ,
        e.prototype.get = function(e, t) {
            if (void 0 === t && (t = void 0),
            !this._lang)
                return void 0 !== t ? t : e;
            var n = this._lang
              , r = this.getByLanguage(e, n);
            return r || (n.indexOf("-") > 0 && (r = this.getByLanguage(e, n.split("-")[0])),
            r || (void 0 !== t ? t : e))
        }
        ,
        e.prototype.getByLanguage = function(e, t, n) {
            if (void 0 === n && (n = null),
            !t)
                return n;
            var r = this._dict[t];
            return r ? r[e] : n
        }
        ,
        e.prototype.putVocabulariesForLanguage = function(e, t) {
            var n = this._dict[e];
            n || (n = this._dict[e] = {}),
            Object.assign(n, t)
        }
        ,
        e.prototype.putVocabularies = function(e) {
            var t = this;
            Object.keys(e).map((function(n) {
                t.putVocabulariesForLanguage(n, e[n])
            }
            ))
        }
        ,
        e
    }()
      , $e = new Fe("I18n")
      , Ze = null
      , Qe = null
      , et = function() {
        function e() {}
        return e.configure = function(t) {
            return $e.debug("configure I18n"),
            t ? (Ze = Object.assign({}, Ze, t.I18n || t),
            e.createInstance(),
            Ze) : Ze
        }
        ,
        e.getModuleName = function() {
            return "I18n"
        }
        ,
        e.createInstance = function() {
            $e.debug("create I18n instance"),
            Qe || (Qe = new Xe(Ze))
        }
        ,
        e.setLanguage = function(t) {
            return e.checkConfig(),
            Qe.setLanguage(t)
        }
        ,
        e.get = function(t, n) {
            return e.checkConfig() ? Qe.get(t, n) : void 0 === n ? t : n
        }
        ,
        e.putVocabulariesForLanguage = function(t, n) {
            return e.checkConfig(),
            Qe.putVocabulariesForLanguage(t, n)
        }
        ,
        e.putVocabularies = function(t) {
            return e.checkConfig(),
            Qe.putVocabularies(t)
        }
        ,
        e.checkConfig = function() {
            return Qe || (Qe = new Xe(Ze)),
            !0
        }
        ,
        e
    }();
    Be.register(et);
    var tt, nt = n(4), rt = (tt = function(e, t) {
        return (tt = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        )(e, t)
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        tt(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    );
    new Fe("Util"),
    function(e) {
        function t(t) {
            var n = e.call(this, t) || this;
            return n.nonRetryable = !0,
            n
        }
        rt(t, e)
    }(Error);
    !function() {
        function e() {
            this._queue = [],
            this._pending = !1
        }
        e.prototype.isLocked = function() {
            return this._pending
        }
        ,
        e.prototype.acquire = function() {
            var e = this
              , t = new Promise((function(t) {
                return e._queue.push(t)
            }
            ));
            return this._pending || this._dispatchNext(),
            t
        }
        ,
        e.prototype.runExclusive = function(e) {
            return this.acquire().then((function(t) {
                var n;
                try {
                    n = e()
                } catch (e) {
                    throw t(),
                    e
                }
                return Promise.resolve(n).then((function(e) {
                    return t(),
                    e
                }
                ), (function(e) {
                    throw t(),
                    e
                }
                ))
            }
            ))
        }
        ,
        e.prototype._dispatchNext = function() {
            this._queue.length > 0 ? (this._pending = !0,
            this._queue.shift()(this._dispatchNext.bind(this))) : this._pending = !1
        }
    }();
    /*!
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Christian Speckner <cnspeckn@googlemail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
    var it = n(52)
      , ot = (function() {
        function e() {}
        e.prototype.networkMonitor = function() {
            return new it((function(e) {
                e.next({
                    online: window.navigator.onLine
                });
                var t = function() {
                    return e.next({
                        online: !0
                    })
                }
                  , n = function() {
                    return e.next({
                        online: !1
                    })
                };
                return window.addEventListener("online", t),
                window.addEventListener("offline", n),
                function() {
                    window.removeEventListener("online", t),
                    window.removeEventListener("offline", n)
                }
            }
            ))
        }
    }(),
    {
        clockOffset: 0,
        getDateWithClockOffset: function() {
            return ot.clockOffset ? new Date((new Date).getTime() + ot.clockOffset) : new Date
        },
        getClockOffset: function() {
            return ot.clockOffset
        },
        setClockOffset: function(e) {
            ot.clockOffset = e
        }
    })
      , st = function() {
        return (st = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }
        ).apply(this, arguments)
    }
      , at = function(e, t) {
        var n = {};
        for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
        }
        return n
    }
      , ut = new Fe("Signer")
      , ct = n(6)
      , lt = Le.util.crypto
      , ht = function(e, t, n) {
        return lt.lib.createHmac("sha256", e).update(t, "utf8").digest(n)
    }
      , ft = function(e) {
        var t = e || "";
        return lt.createHash("sha256").update(t, "utf8").digest("hex")
    }
      , dt = function(e) {
        return Object.keys(e).map((function(e) {
            return e.toLowerCase()
        }
        )).sort().join(";")
    }
      , pt = function(e) {
        var t, n, r = ct.parse(e.url);
        return [e.method || "/", encodeURIComponent(r.pathname).replace(/%2F/gi, "/"), (n = r.query,
        n && 0 !== n.length ? n.split("&").map((function(e) {
            var t = e.split("=");
            if (1 === t.length)
                return e;
            var n = t[1].replace(/[!'()*]/g, (function(e) {
                return "%" + e.charCodeAt(0).toString(16).toUpperCase()
            }
            ));
            return t[0] + "=" + n
        }
        )).sort((function(e, t) {
            var n = e.split("=")[0]
              , r = t.split("=")[0];
            return n === r ? e < t ? -1 : 1 : n < r ? -1 : 1
        }
        )).join("&") : ""), (t = e.headers,
        t && 0 !== Object.keys(t).length ? Object.keys(t).map((function(e) {
            return {
                key: e.toLowerCase(),
                value: t[e] ? t[e].trim().replace(/\s+/g, " ") : ""
            }
        }
        )).sort((function(e, t) {
            return e.key < t.key ? -1 : 1
        }
        )).map((function(e) {
            return e.key + ":" + e.value
        }
        )).join("\n") + "\n" : ""), dt(e.headers), ft(e.data)].join("\n")
    }
      , gt = function(e) {
        var t = (ct.parse(e.url).host.match(/([^\.]+)\.(?:([^\.]*)\.)?amazonaws\.com$/) || []).slice(1, 3);
        return "es" === t[1] && (t = t.reverse()),
        {
            service: e.service || t[0],
            region: e.region || t[1]
        }
    }
      , mt = function(e, t, n) {
        return [e, t, n, "aws4_request"].join("/")
    }
      , yt = function(e, t, n, r) {
        return [e, n, r, ft(t)].join("\n")
    }
      , vt = function(e, t, n) {
        ut.debug(n);
        var r = ht("AWS4" + e, t)
          , i = ht(r, n.region)
          , o = ht(i, n.service);
        return ht(o, "aws4_request")
    }
      , bt = function(e, t) {
        return ht(e, t, "hex")
    }
      , wt = function() {
        function e() {}
        return e.sign = function(e, t, n) {
            void 0 === n && (n = null),
            e.headers = e.headers || {};
            var r = ot.getDateWithClockOffset().toISOString().replace(/[:\-]|\.\d{3}/g, "")
              , i = r.substr(0, 8)
              , o = ct.parse(e.url);
            e.headers.host = o.host,
            e.headers["x-amz-date"] = r,
            t.session_token && (e.headers["X-Amz-Security-Token"] = t.session_token);
            var s = pt(e);
            ut.debug(s);
            var a = n || gt(e)
              , u = mt(i, a.region, a.service)
              , c = yt("AWS4-HMAC-SHA256", s, r, u)
              , l = vt(t.secret_key, i, a)
              , h = bt(l, c)
              , f = function(e, t, n, r, i) {
                return [e + " Credential=" + t + "/" + n, "SignedHeaders=" + r, "Signature=" + i].join(", ")
            }("AWS4-HMAC-SHA256", t.access_key, u, dt(e.headers), h);
            return e.headers.Authorization = f,
            e
        }
        ,
        e.signUrl = function(e, t, n, r) {
            var i = "object" == typeof e ? e.url : e
              , o = "object" == typeof e ? e.method : "GET"
              , s = "object" == typeof e ? e.body : void 0
              , a = ot.getDateWithClockOffset().toISOString().replace(/[:\-]|\.\d{3}/g, "")
              , u = a.substr(0, 8)
              , c = ct.parse(i, !0, !0)
              , l = (c.search,
            at(c, ["search"]))
              , h = {
                host: l.host
            }
              , f = n || gt({
                url: ct.format(l)
            })
              , d = f.region
              , p = f.service
              , g = mt(u, d, p)
              , m = t.session_token && "iotdevicegateway" !== p
              , y = st(st(st({
                "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
                "X-Amz-Credential": [t.access_key, g].join("/"),
                "X-Amz-Date": a.substr(0, 16)
            }, m ? {
                "X-Amz-Security-Token": "" + t.session_token
            } : {}), r ? {
                "X-Amz-Expires": "" + r
            } : {}), {
                "X-Amz-SignedHeaders": Object.keys(h).join(",")
            })
              , v = pt({
                method: o,
                url: ct.format(st(st({}, l), {
                    query: st(st({}, l.query), y)
                })),
                headers: h,
                data: s
            })
              , b = yt("AWS4-HMAC-SHA256", v, a, g)
              , w = vt(t.secret_key, u, {
                region: d,
                service: p
            })
              , S = bt(w, b)
              , E = st({
                "X-Amz-Signature": S
            }, t.session_token && {
                "X-Amz-Security-Token": t.session_token
            });
            return ct.format({
                protocol: l.protocol,
                slashes: !0,
                hostname: l.hostname,
                port: l.port,
                pathname: l.pathname,
                query: st(st(st({}, l.query), y), E)
            })
        }
        ,
        e
    }()
      , St = new Fe("Parser")
      , Et = function() {
        function e() {}
        return e.parseMobilehubConfig = function(e) {
            var t, n = {};
            if (e.aws_mobile_analytics_app_id) {
                var r = {
                    AWSPinpoint: {
                        appId: e.aws_mobile_analytics_app_id,
                        region: e.aws_mobile_analytics_app_region
                    }
                };
                n.Analytics = r
            }
            if (e.aws_cognito_identity_pool_id || e.aws_user_pools_id) {
                var i = {
                    userPoolId: e.aws_user_pools_id,
                    userPoolWebClientId: e.aws_user_pools_web_client_id,
                    region: e.aws_cognito_region,
                    identityPoolId: e.aws_cognito_identity_pool_id,
                    identityPoolRegion: e.aws_cognito_region,
                    mandatorySignIn: "enable" === e.aws_mandatory_sign_in
                };
                n.Auth = i
            }
            return t = e.aws_user_files_s3_bucket ? {
                AWSS3: {
                    bucket: e.aws_user_files_s3_bucket,
                    region: e.aws_user_files_s3_bucket_region,
                    dangerouslyConnectToHttpEndpointForTesting: e.aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing
                }
            } : e ? e.Storage || e : {},
            n.Analytics = Object.assign({}, n.Analytics, e.Analytics),
            n.Auth = Object.assign({}, n.Auth, e.Auth),
            n.Storage = Object.assign({}, t),
            St.debug("parse config", e, "to amplifyconfig", n),
            n
        }
        ,
        e
    }()
      , _t = function(e, t, n, r) {
        return new (n || (n = Promise))((function(i, o) {
            function s(e) {
                try {
                    u(r.next(e))
                } catch (e) {
                    o(e)
                }
            }
            function a(e) {
                try {
                    u(r.throw(e))
                } catch (e) {
                    o(e)
                }
            }
            function u(e) {
                var t;
                e.done ? i(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(s, a)
            }
            u((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , At = function(e, t) {
        var n, r, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0])
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }
        ),
        o;
        function a(o) {
            return function(a) {
                return function(o) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; s; )
                        try {
                            if (n = 1,
                            r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                            0) : r.next) && !(i = i.call(r, o[1])).done)
                                return i;
                            switch (r = 0,
                            i && (o = [2 & o[0], i.value]),
                            o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++,
                                {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++,
                                r = o[1],
                                o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(),
                                s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys,
                                (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1],
                                    i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2],
                                    s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(),
                                s.trys.pop();
                                continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e],
                            r = 0
                        } finally {
                            n = i = 0
                        }
                    if (5 & o[0])
                        throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, a])
            }
        }
    }
      , Ct = new Fe("CognitoCredentials")
      , It = new Promise((function(e, t) {
        return nt.a.browserOrNode().isBrowser ? (window.gapi && window.gapi.auth2 ? window.gapi.auth2 : null) ? (Ct.debug("google api already loaded"),
        e()) : void setTimeout((function() {
            return e()
        }
        ), 2e3) : (Ct.debug("not in the browser, directly resolved"),
        e())
    }
    ))
      , Tt = function() {
        function e() {
            this.initialized = !1,
            this.refreshGoogleToken = this.refreshGoogleToken.bind(this),
            this._refreshGoogleTokenImpl = this._refreshGoogleTokenImpl.bind(this)
        }
        return e.prototype.refreshGoogleToken = function() {
            return _t(this, void 0, void 0, (function() {
                return At(this, (function(e) {
                    switch (e.label) {
                    case 0:
                        return this.initialized ? [3, 2] : (Ct.debug("need to wait for the Google SDK loaded"),
                        [4, It]);
                    case 1:
                        e.sent(),
                        this.initialized = !0,
                        Ct.debug("finish waiting"),
                        e.label = 2;
                    case 2:
                        return [2, this._refreshGoogleTokenImpl()]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype._refreshGoogleTokenImpl = function() {
            var e = null;
            return nt.a.browserOrNode().isBrowser && (e = window.gapi && window.gapi.auth2 ? window.gapi.auth2 : null),
            e ? new Promise((function(t, n) {
                e.getAuthInstance().then((function(e) {
                    e || (console.log("google Auth undefiend"),
                    n("google Auth undefiend"));
                    var r = e.currentUser.get();
                    r.isSignedIn() ? (Ct.debug("refreshing the google access token"),
                    r.reloadAuthResponse().then((function(e) {
                        var n = e.id_token
                          , i = e.expires_at
                          , o = r.getBasicProfile();
                        o.getEmail(),
                        o.getName();
                        t({
                            token: n,
                            expires_at: i
                        })
                    }
                    ))) : n("User is not signed in with Google")
                }
                )).catch((function(e) {
                    Ct.debug("Failed to refresh google token", e),
                    n("Failed to refresh google token")
                }
                ))
            }
            )) : (Ct.debug("no gapi auth2 available"),
            Promise.reject("no gapi auth2 available"))
        }
        ,
        e
    }()
      , kt = function(e, t, n, r) {
        return new (n || (n = Promise))((function(i, o) {
            function s(e) {
                try {
                    u(r.next(e))
                } catch (e) {
                    o(e)
                }
            }
            function a(e) {
                try {
                    u(r.throw(e))
                } catch (e) {
                    o(e)
                }
            }
            function u(e) {
                var t;
                e.done ? i(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(s, a)
            }
            u((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , xt = function(e, t) {
        var n, r, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0])
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }
        ),
        o;
        function a(o) {
            return function(a) {
                return function(o) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; s; )
                        try {
                            if (n = 1,
                            r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                            0) : r.next) && !(i = i.call(r, o[1])).done)
                                return i;
                            switch (r = 0,
                            i && (o = [2 & o[0], i.value]),
                            o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++,
                                {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++,
                                r = o[1],
                                o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(),
                                s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys,
                                (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1],
                                    i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2],
                                    s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(),
                                s.trys.pop();
                                continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e],
                            r = 0
                        } finally {
                            n = i = 0
                        }
                    if (5 & o[0])
                        throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, a])
            }
        }
    }
      , Pt = new Fe("CognitoCredentials")
      , Rt = new Promise((function(e, t) {
        return nt.a.browserOrNode().isBrowser ? window.FB ? (Pt.debug("FB SDK already loaded"),
        e()) : void setTimeout((function() {
            return e()
        }
        ), 2e3) : (Pt.debug("not in the browser, directly resolved"),
        e())
    }
    ))
      , Ot = function() {
        function e() {
            this.initialized = !1,
            this.refreshFacebookToken = this.refreshFacebookToken.bind(this),
            this._refreshFacebookTokenImpl = this._refreshFacebookTokenImpl.bind(this)
        }
        return e.prototype.refreshFacebookToken = function() {
            return kt(this, void 0, void 0, (function() {
                return xt(this, (function(e) {
                    switch (e.label) {
                    case 0:
                        return this.initialized ? [3, 2] : (Pt.debug("need to wait for the Facebook SDK loaded"),
                        [4, Rt]);
                    case 1:
                        e.sent(),
                        this.initialized = !0,
                        Pt.debug("finish waiting"),
                        e.label = 2;
                    case 2:
                        return [2, this._refreshFacebookTokenImpl()]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype._refreshFacebookTokenImpl = function() {
            var e = null;
            return nt.a.browserOrNode().isBrowser && (e = window.FB),
            e ? new Promise((function(t, n) {
                e.getLoginStatus((function(e) {
                    e && e.authResponse || (Pt.debug("no response from facebook when refreshing the jwt token"),
                    n("no response from facebook when refreshing the jwt token"));
                    var r = e.authResponse
                      , i = r.accessToken
                      , o = 1e3 * r.expiresIn + (new Date).getTime();
                    i || (Pt.debug("the jwtToken is undefined"),
                    n("the jwtToken is undefined")),
                    t({
                        token: i,
                        expires_at: o
                    })
                }
                ), {
                    scope: "public_profile,email"
                })
            }
            )) : (Pt.debug("no fb sdk available"),
            Promise.reject("no fb sdk available"))
        }
        ,
        e
    }()
      , Nt = new Tt
      , Ut = new Ot
      , Dt = {}
      , Lt = function() {
        function e() {}
        return e.setItem = function(e, t) {
            return Dt[e] = t,
            Dt[e]
        }
        ,
        e.getItem = function(e) {
            return Object.prototype.hasOwnProperty.call(Dt, e) ? Dt[e] : void 0
        }
        ,
        e.removeItem = function(e) {
            return delete Dt[e]
        }
        ,
        e.clear = function() {
            return Dt = {}
        }
        ,
        e
    }()
      , qt = function() {
        function e() {
            try {
                this.storageWindow = window.localStorage,
                this.storageWindow.setItem("aws.amplify.test-ls", 1),
                this.storageWindow.removeItem("aws.amplify.test-ls")
            } catch (e) {
                this.storageWindow = Lt
            }
        }
        return e.prototype.getStorage = function() {
            return this.storageWindow
        }
        ,
        e
    }()
      , Mt = (nt.a.browserOrNode().isBrowser && (new qt).getStorage(),
    function() {
        return (Mt = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }
        ).apply(this, arguments)
    }
    )
      , Ft = function(e, t, n, r) {
        return new (n || (n = Promise))((function(i, o) {
            function s(e) {
                try {
                    u(r.next(e))
                } catch (e) {
                    o(e)
                }
            }
            function a(e) {
                try {
                    u(r.throw(e))
                } catch (e) {
                    o(e)
                }
            }
            function u(e) {
                var t;
                e.done ? i(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(s, a)
            }
            u((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , jt = function(e, t) {
        var n, r, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0])
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }
        ),
        o;
        function a(o) {
            return function(a) {
                return function(o) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; s; )
                        try {
                            if (n = 1,
                            r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                            0) : r.next) && !(i = i.call(r, o[1])).done)
                                return i;
                            switch (r = 0,
                            i && (o = [2 & o[0], i.value]),
                            o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++,
                                {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++,
                                r = o[1],
                                o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(),
                                s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys,
                                (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1],
                                    i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2],
                                    s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(),
                                s.trys.pop();
                                continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e],
                            r = 0
                        } finally {
                            n = i = 0
                        }
                    if (5 & o[0])
                        throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, a])
            }
        }
    }
      , Bt = new Fe("Credentials")
      , Vt = new (function() {
        function e(e) {
            this._gettingCredPromise = null,
            this._refreshHandlers = {},
            this.configure(e),
            this._refreshHandlers.google = Nt.refreshGoogleToken,
            this._refreshHandlers.facebook = Ut.refreshFacebookToken
        }
        return e.prototype.getCredSource = function() {
            return this._credentials_source
        }
        ,
        e.prototype.configure = function(e) {
            if (!e)
                return this._config || {};
            this._config = Object.assign({}, this._config, e);
            var t = this._config.refreshHandlers;
            return t && (this._refreshHandlers = Mt(Mt({}, this._refreshHandlers), t)),
            this._storage = this._config.storage,
            this._storage || (this._storage = (new qt).getStorage()),
            this._storageSync = Promise.resolve(),
            "function" == typeof this._storage.sync && (this._storageSync = this._storage.sync()),
            this._config
        }
        ,
        e.prototype.get = function() {
            return Bt.debug("getting credentials"),
            this._pickupCredentials()
        }
        ,
        e.prototype._pickupCredentials = function() {
            return Bt.debug("picking up credentials"),
            this._gettingCredPromise && this._gettingCredPromise.isPending() ? Bt.debug("getting old cred promise") : (Bt.debug("getting new cred promise"),
            Le.config && Le.config.credentials && Le.config.credentials instanceof Le.Credentials ? this._gettingCredPromise = nt.a.makeQuerablePromise(this._setCredentialsFromAWS()) : this._gettingCredPromise = nt.a.makeQuerablePromise(this._keepAlive())),
            this._gettingCredPromise
        }
        ,
        e.prototype._keepAlive = function() {
            Bt.debug("checking if credentials exists and not expired");
            var e = this._credentials;
            return e && !this._isExpired(e) ? (Bt.debug("credentials not changed and not expired, directly return"),
            Promise.resolve(e)) : (Bt.debug("need to get a new credential or refresh the existing one"),
            Be.Auth && "function" == typeof Be.Auth.currentUserCredentials ? Be.Auth.currentUserCredentials() : Promise.reject("No Auth module registered in Amplify"))
        }
        ,
        e.prototype.refreshFederatedToken = function(e) {
            var t = this;
            Bt.debug("Getting federated credentials");
            var n = e.provider
              , r = e.user
              , i = e.token
              , o = e.expires_at
              , s = e.identity_id
              , a = this;
            return Bt.debug("checking if federated jwt token expired"),
            o > (new Date).getTime() ? (Bt.debug("token not expired"),
            this._setCredentialsFromFederation({
                provider: n,
                token: i,
                user: r,
                identity_id: s,
                expires_at: o
            })) : a._refreshHandlers[n] && "function" == typeof a._refreshHandlers[n] ? (Bt.debug("getting refreshed jwt token from federation provider"),
            a._refreshHandlers[n]().then((function(e) {
                return Bt.debug("refresh federated token sucessfully", e),
                i = e.token,
                s = e.identity_id,
                o = e.expires_at,
                a._setCredentialsFromFederation({
                    provider: n,
                    token: i,
                    user: r,
                    identity_id: s,
                    expires_at: o
                })
            }
            )).catch((function(e) {
                return Bt.debug("refresh federated token failed", e),
                t.clear(),
                Promise.reject("refreshing federation token failed: " + e)
            }
            ))) : (Bt.debug("no refresh handler for provider:", n),
            this.clear(),
            Promise.reject("no refresh handler for provider"))
        }
        ,
        e.prototype._isExpired = function(e) {
            if (!e)
                return Bt.debug("no credentials for expiration check"),
                !0;
            Bt.debug("is this credentials expired?", e);
            var t = (new Date).getTime()
              , n = e.expired
              , r = e.expireTime;
            return !(!n && r > t + 6e5 && t < this._nextCredentialsRefresh)
        }
        ,
        e.prototype._setCredentialsForGuest = function() {
            return Ft(this, void 0, void 0, (function() {
                var e, t, n, r, i, o, s, a = this;
                return jt(this, (function(u) {
                    switch (u.label) {
                    case 0:
                        if (e = !1,
                        Bt.debug("setting credentials for guest"),
                        t = this._config,
                        n = t.identityPoolId,
                        r = t.region,
                        t.mandatorySignIn)
                            return [2, Promise.reject("cannot get guest credentials when mandatory signin enabled")];
                        if (!n)
                            return Bt.debug("No Cognito Federated Identity pool provided"),
                            [2, Promise.reject("No Cognito Federated Identity pool provided")];
                        i = void 0,
                        u.label = 1;
                    case 1:
                        return u.trys.push([1, 3, , 4]),
                        [4, this._storageSync];
                    case 2:
                        return u.sent(),
                        i = this._storage.getItem("CognitoIdentityId-" + n),
                        [3, 4];
                    case 3:
                        return o = u.sent(),
                        Bt.debug("Failed to get the cached identityId", o),
                        [3, 4];
                    case 4:
                        return s = new Le.CognitoIdentityCredentials({
                            IdentityPoolId: n,
                            IdentityId: i || void 0
                        },{
                            region: r
                        }),
                        this,
                        [2, this._loadCredentials(s, "guest", !1, null).then((function(e) {
                            return e
                        }
                        )).catch((function(t) {
                            return Ft(a, void 0, void 0, (function() {
                                var o;
                                return jt(this, (function(a) {
                                    return "ResourceNotFoundException" !== t.code || t.message !== "Identity '" + i + "' not found." || e ? [2, t] : (e = !0,
                                    Bt.debug("Failed to load guest credentials"),
                                    this._storage.removeItem("CognitoIdentityId-" + n),
                                    s.clearCachedId(),
                                    o = new Le.CognitoIdentityCredentials({
                                        IdentityPoolId: n,
                                        IdentityId: void 0
                                    },{
                                        region: r
                                    }),
                                    [2, this._loadCredentials(o, "guest", !1, null)])
                                }
                                ))
                            }
                            ))
                        }
                        ))]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype._setCredentialsFromAWS = function() {
            var e = Le.config.credentials;
            Bt.debug("setting credentials from aws");
            return e instanceof Le.Credentials ? Promise.resolve(e) : (Bt.debug("AWS.config.credentials is not an instance of AWS Credentials"),
            Promise.reject("AWS.config.credentials is not an instance of AWS Credentials"))
        }
        ,
        e.prototype._setCredentialsFromFederation = function(e) {
            var t = e.provider
              , n = e.token
              , r = e.identity_id
              , i = (e.user,
            e.expires_at,
            {
                google: "accounts.google.com",
                facebook: "graph.facebook.com",
                amazon: "www.amazon.com",
                developer: "cognito-identity.amazonaws.com"
            }[t] || t);
            if (!i)
                return Promise.reject("You must specify a federated provider");
            var o = {};
            o[i] = n;
            var s = this._config
              , a = s.identityPoolId
              , u = s.region;
            if (!a)
                return Bt.debug("No Cognito Federated Identity pool provided"),
                Promise.reject("No Cognito Federated Identity pool provided");
            var c = new Le.CognitoIdentityCredentials({
                IdentityPoolId: a,
                IdentityId: r,
                Logins: o
            },{
                region: u
            });
            return this._loadCredentials(c, "federated", !0, e)
        }
        ,
        e.prototype._setCredentialsFromSession = function(e) {
            Bt.debug("set credentials from session");
            var t = e.getIdToken().getJwtToken()
              , n = this._config
              , r = n.region
              , i = n.userPoolId
              , o = n.identityPoolId;
            if (!o)
                return Bt.debug("No Cognito Federated Identity pool provided"),
                Promise.reject("No Cognito Federated Identity pool provided");
            var s = {};
            s["cognito-idp." + r + ".amazonaws.com/" + i] = t;
            var a = new Le.CognitoIdentityCredentials({
                IdentityPoolId: o,
                Logins: s
            },{
                region: r
            });
            return this._loadCredentials(a, "userPool", !0, null)
        }
        ,
        e.prototype._loadCredentials = function(e, t, n, r) {
            var i = this
              , o = this
              , s = this._config.identityPoolId;
            return new Promise((function(a, u) {
                e.get((function(c) {
                    return Ft(i, void 0, void 0, (function() {
                        var i, l, h, f, d, p;
                        return jt(this, (function(g) {
                            switch (g.label) {
                            case 0:
                                if (c)
                                    return Bt.debug("Failed to load credentials", e),
                                    u(c),
                                    [2];
                                if (Bt.debug("Load credentials successfully", e),
                                o._credentials = e,
                                o._credentials.authenticated = n,
                                o._credentials_source = t,
                                o._nextCredentialsRefresh = (new Date).getTime() + 3e6,
                                "federated" !== t)
                                    return [3, 3];
                                i = Object.assign({
                                    id: this._credentials.identityId
                                }, r.user),
                                l = r.provider,
                                h = r.token,
                                f = r.expires_at,
                                d = r.identity_id;
                                try {
                                    this._storage.setItem("aws-amplify-federatedInfo", JSON.stringify({
                                        provider: l,
                                        token: h,
                                        user: i,
                                        expires_at: f,
                                        identity_id: d
                                    }))
                                } catch (e) {
                                    Bt.debug("Failed to put federated info into auth storage", e)
                                }
                                return Be.Cache && "function" == typeof Be.Cache.setItem ? [4, Be.Cache.setItem("federatedInfo", {
                                    provider: l,
                                    token: h,
                                    user: i,
                                    expires_at: f,
                                    identity_id: d
                                }, {
                                    priority: 1
                                })] : [3, 2];
                            case 1:
                                return g.sent(),
                                [3, 3];
                            case 2:
                                Bt.debug("No Cache module registered in Amplify"),
                                g.label = 3;
                            case 3:
                                if ("guest" !== t)
                                    return [3, 7];
                                g.label = 4;
                            case 4:
                                return g.trys.push([4, 6, , 7]),
                                [4, this._storageSync];
                            case 5:
                                return g.sent(),
                                this._storage.setItem("CognitoIdentityId-" + s, e.identityId),
                                [3, 7];
                            case 6:
                                return p = g.sent(),
                                Bt.debug("Failed to cache identityId", p),
                                [3, 7];
                            case 7:
                                return a(o._credentials),
                                [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            ))
        }
        ,
        e.prototype.set = function(e, t) {
            return "session" === t ? this._setCredentialsFromSession(e) : "federation" === t ? this._setCredentialsFromFederation(e) : "guest" === t ? this._setCredentialsForGuest() : (Bt.debug("no source specified for setting credentials"),
            Promise.reject("invalid source"))
        }
        ,
        e.prototype.clear = function() {
            return Ft(this, void 0, void 0, (function() {
                var e, t, n;
                return jt(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return e = this._config,
                        t = e.identityPoolId,
                        n = e.region,
                        t && new Le.CognitoIdentityCredentials({
                            IdentityPoolId: t
                        },{
                            region: n
                        }).clearCachedId(),
                        this._credentials = null,
                        this._credentials_source = null,
                        this._storage.removeItem("aws-amplify-federatedInfo"),
                        Be.Cache && "function" == typeof Be.Cache.setItem ? [4, Be.Cache.removeItem("federatedInfo")] : [3, 2];
                    case 1:
                        return r.sent(),
                        [3, 3];
                    case 2:
                        Bt.debug("No Cache module registered in Amplify"),
                        r.label = 3;
                    case 3:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.shear = function(e) {
            return {
                accessKeyId: e.accessKeyId,
                sessionToken: e.sessionToken,
                secretAccessKey: e.secretAccessKey,
                identityId: e.identityId,
                authenticated: e.authenticated
            }
        }
        ,
        e
    }())(null)
      , zt = (function() {
        function e() {
            this._logger = new Fe("ServiceWorker")
        }
        Object.defineProperty(e.prototype, "serviceWorker", {
            get: function() {
                return this._serviceWorker
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.register = function(e, t) {
            var n = this;
            return void 0 === e && (e = "/service-worker.js"),
            void 0 === t && (t = "/"),
            this._logger.debug("registering " + e),
            this._logger.debug("registering service worker with scope " + t),
            new Promise((function(r, i) {
                if (!navigator || !("serviceWorker"in navigator))
                    return i(new Error("Service Worker not available"));
                navigator.serviceWorker.register(e, {
                    scope: t
                }).then((function(e) {
                    return e.installing ? n._serviceWorker = e.installing : e.waiting ? n._serviceWorker = e.waiting : e.active && (n._serviceWorker = e.active),
                    n._registration = e,
                    n._setupListeners(),
                    n._logger.debug("Service Worker Registration Success: " + e),
                    r(e)
                }
                )).catch((function(e) {
                    return n._logger.debug("Service Worker Registration Failed " + e),
                    i(e)
                }
                ))
            }
            ))
        }
        ,
        e.prototype.enablePush = function(e) {
            var t = this;
            if (!this._registration)
                throw new Error("Service Worker not registered");
            return this._publicKey = e,
            new Promise((function(n, r) {
                if (!nt.a.browserOrNode().isBrowser)
                    return r(new Error("Service Worker not available"));
                t._registration.pushManager.getSubscription().then((function(r) {
                    if (!r)
                        return t._logger.debug("User is NOT subscribed to push"),
                        t._registration.pushManager.subscribe({
                            userVisibleOnly: !0,
                            applicationServerKey: t._urlB64ToUint8Array(e)
                        }).then((function(e) {
                            t._subscription = e,
                            t._logger.debug("User subscribed: " + JSON.stringify(e)),
                            n(e)
                        }
                        )).catch((function(e) {
                            t._logger.error(e)
                        }
                        ));
                    t._subscription = r,
                    t._logger.debug("User is subscribed to push: " + JSON.stringify(r)),
                    n(r)
                }
                ))
            }
            ))
        }
        ,
        e.prototype._urlB64ToUint8Array = function(e) {
            for (var t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), n = window.atob(t), r = new Uint8Array(n.length), i = 0; i < n.length; ++i)
                r[i] = n.charCodeAt(i);
            return r
        }
        ,
        e.prototype.send = function(e) {
            this._serviceWorker && this._serviceWorker.postMessage("object" == typeof e ? JSON.stringify(e) : e)
        }
        ,
        e.prototype._setupListeners = function() {
            var e = this;
            this._serviceWorker.addEventListener("statechange", (function(t) {
                var n = e._serviceWorker.state;
                e._logger.debug("ServiceWorker statechange: " + n),
                Be.Analytics && "function" == typeof Be.Analytics.record && Be.Analytics.record({
                    name: "ServiceWorker",
                    attributes: {
                        state: n
                    }
                })
            }
            )),
            this._serviceWorker.addEventListener("message", (function(t) {
                e._logger.debug("ServiceWorker message event: " + t)
            }
            ))
        }
    }(),
    n(127))
      , Ht = {
        userAgent: "aws-amplify/" + zt.version + " js",
        product: "",
        navigator: null,
        isReactNative: !1
    };
    if ("undefined" != typeof navigator && navigator.product)
        switch (Ht.product = navigator.product || "",
        Ht.navigator = navigator || null,
        navigator.product) {
        case "ReactNative":
            Ht.userAgent = "aws-amplify/" + zt.version + " react-native",
            Ht.isReactNative = !0;
            break;
        default:
            Ht.userAgent = "aws-amplify/" + zt.version + " js",
            Ht.isReactNative = !1
        }
    var Kt = Ht
      , Wt = "undefined" != typeof Symbol && "function" == typeof Symbol.for
      , Gt = (Wt && Symbol.for("INTERNAL_AWS_APPSYNC_PUBSUB_PROVIDER"),
    Wt ? Symbol.for("INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER") : "@@INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER")
      , Jt = {
        userAgent: Kt.userAgent
    }
      , Yt = Be
      , Xt = new Fe("Core");
    Le.util ? Le.util.userAgent = function() {
        return Jt.userAgent
    }
    : Le.config ? Le.config.update({
        customUserAgent: Jt.userAgent
    }) : Xt.warn("No AWS.config");
    var $t, Zt, Qt = n(25), en = n.n(Qt), tn = function() {
        return (tn = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }
        ).apply(this, arguments)
    }, nn = function(e, t, n, r) {
        return new (n || (n = Promise))((function(i, o) {
            function s(e) {
                try {
                    u(r.next(e))
                } catch (e) {
                    o(e)
                }
            }
            function a(e) {
                try {
                    u(r.throw(e))
                } catch (e) {
                    o(e)
                }
            }
            function u(e) {
                var t;
                e.done ? i(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(s, a)
            }
            u((r = r.apply(e, t || [])).next())
        }
        ))
    }, rn = function(e, t) {
        var n, r, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0])
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }
        ),
        o;
        function a(o) {
            return function(a) {
                return function(o) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; s; )
                        try {
                            if (n = 1,
                            r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                            0) : r.next) && !(i = i.call(r, o[1])).done)
                                return i;
                            switch (r = 0,
                            i && (o = [2 & o[0], i.value]),
                            o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++,
                                {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++,
                                r = o[1],
                                o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(),
                                s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys,
                                (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1],
                                    i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2],
                                    s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(),
                                s.trys.pop();
                                continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e],
                            r = 0
                        } finally {
                            n = i = 0
                        }
                    if (5 & o[0])
                        throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, a])
            }
        }
    }, on = function(e, t) {
        var n = {};
        for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
        }
        return n
    }, sn = new Fe("RestClient"), an = n(6), un = function() {
        function e(e) {
            this._region = "us-east-1",
            this._service = "execute-api",
            this._custom_header = void 0;
            e.endpoints;
            this._options = e,
            sn.debug("API Options", this._options)
        }
        return e.prototype.ajax = function(e, t, n) {
            return nn(this, void 0, void 0, (function() {
                var r, i, o, s, a, u, c, l, h, f, d = this;
                return rn(this, (function(p) {
                    switch (p.label) {
                    case 0:
                        return sn.debug(t + " " + e),
                        r = this._parseUrl(e),
                        i = {
                            method: t,
                            url: e,
                            host: r.host,
                            path: r.path,
                            headers: {},
                            data: null,
                            responseType: "json",
                            timeout: 0
                        },
                        o = {},
                        Kt.isReactNative && (s = Kt.userAgent || "aws-amplify/0.1.x",
                        o = {
                            "User-Agent": s
                        }),
                        a = Object.assign({}, n),
                        u = a.response,
                        a.body && (o["Content-Type"] = "application/json; charset=UTF-8",
                        i.data = JSON.stringify(a.body)),
                        a.responseType && (i.responseType = a.responseType),
                        a.withCredentials && (i.withCredentials = a.withCredentials),
                        a.timeout && (i.timeout = a.timeout),
                        i.signerServiceInfo = a.signerServiceInfo,
                        this._custom_header ? [4, this._custom_header()] : [3, 2];
                    case 1:
                        return l = p.sent(),
                        [3, 3];
                    case 2:
                        l = void 0,
                        p.label = 3;
                    case 3:
                        return c = l,
                        i.headers = tn(tn(tn({}, o), c), a.headers),
                        h = an.parse(e, !0, !0),
                        h.search,
                        f = on(h, ["search"]),
                        i.url = an.format(tn(tn({}, f), {
                            query: tn(tn({}, f.query), a.queryStringParameters || {})
                        })),
                        void 0 !== i.headers.Authorization ? (i.headers = Object.keys(i.headers).reduce((function(e, t) {
                            return i.headers[t] && (e[t] = i.headers[t]),
                            e
                        }
                        ), {}),
                        [2, this._request(i, u)]) : [2, Vt.get().then((function(e) {
                            return d._signed(tn({}, i), e, u)
                        }
                        ), (function(e) {
                            return sn.debug("No credentials available, the request will be unsigned"),
                            d._request(i, u)
                        }
                        ))]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.get = function(e, t) {
            return this.ajax(e, "GET", t)
        }
        ,
        e.prototype.put = function(e, t) {
            return this.ajax(e, "PUT", t)
        }
        ,
        e.prototype.patch = function(e, t) {
            return this.ajax(e, "PATCH", t)
        }
        ,
        e.prototype.post = function(e, t) {
            return this.ajax(e, "POST", t)
        }
        ,
        e.prototype.del = function(e, t) {
            return this.ajax(e, "DELETE", t)
        }
        ,
        e.prototype.head = function(e, t) {
            return this.ajax(e, "HEAD", t)
        }
        ,
        e.prototype.endpoint = function(e) {
            var t = this
              , n = this._options.endpoints
              , r = "";
            return Array.isArray(n) ? (n.forEach((function(n) {
                n.name === e && (r = n.endpoint,
                "string" == typeof n.region ? t._region = n.region : "string" == typeof t._options.region && (t._region = t._options.region),
                "string" == typeof n.service ? t._service = n.service || "execute-api" : t._service = "execute-api",
                "function" == typeof n.custom_header ? t._custom_header = n.custom_header : t._custom_header = void 0)
            }
            )),
            r) : r
        }
        ,
        e.prototype._signed = function(e, t, n) {
            var r = e.signerServiceInfo
              , i = on(e, ["signerServiceInfo"])
              , o = this._region || this._options.region
              , s = this._service || this._options.service
              , a = {
                secret_key: t.secretAccessKey,
                access_key: t.accessKeyId,
                session_token: t.sessionToken
            }
              , u = {
                region: o,
                service: s
            }
              , c = Object.assign(u, r)
              , l = wt.sign(i, a, c);
            return l.data && (l.body = l.data),
            sn.debug("Signed Request: ", l),
            delete l.headers.host,
            en()(l).then((function(e) {
                return n ? e : e.data
            }
            )).catch((function(e) {
                throw sn.debug(e),
                e
            }
            ))
        }
        ,
        e.prototype._request = function(e, t) {
            return void 0 === t && (t = !1),
            en()(e).then((function(e) {
                return t ? e : e.data
            }
            )).catch((function(e) {
                throw sn.debug(e),
                e
            }
            ))
        }
        ,
        e.prototype._parseUrl = function(e) {
            var t = e.split("/");
            return {
                host: t[2],
                path: "/" + t.slice(3).join("/")
            }
        }
        ,
        e
    }();
    function cn(e) {
        return e && !!["provider", "customState"].find((function(t) {
            return e.hasOwnProperty(t)
        }
        ))
    }
    function ln(e) {
        return void 0 !== e.redirectSignIn
    }
    !function(e) {
        e.Cognito = "COGNITO",
        e.Google = "Google",
        e.Facebook = "Facebook",
        e.Amazon = "LoginWithAmazon"
    }($t || ($t = {})),
    function(e) {
        e.NoConfig = "noConfig",
        e.MissingAuthConfig = "missingAuthConfig",
        e.EmptyUsername = "emptyUsername",
        e.InvalidUsername = "invalidUsername",
        e.EmptyPassword = "emptyPassword",
        e.EmptyCode = "emptyCode",
        e.SignUpError = "signUpError",
        e.NoMFA = "noMFA",
        e.InvalidMFA = "invalidMFA",
        e.EmptyChallengeResponse = "emptyChallengeResponse",
        e.NoUserSession = "noUserSession",
        e.Default = "default"
    }(Zt || (Zt = {}));
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var hn, fn = function() {
        function e(t) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var n = t || {}
              , r = n.ValidationData
              , i = n.Username
              , o = n.Password
              , s = n.AuthParameters
              , a = n.ClientMetadata;
            this.validationData = r || {},
            this.authParameters = s || {},
            this.clientMetadata = a || {},
            this.username = i,
            this.password = o
        }
        return e.prototype.getUsername = function() {
            return this.username
        }
        ,
        e.prototype.getPassword = function() {
            return this.password
        }
        ,
        e.prototype.getValidationData = function() {
            return this.validationData
        }
        ,
        e.prototype.getAuthParameters = function() {
            return this.authParameters
        }
        ,
        e.prototype.getClientMetadata = function() {
            return this.clientMetadata
        }
        ,
        e
    }(), dn = n(1), pn = n(3), gn = n.n(pn), mn = (n(51),
    n(16)), yn = n.n(mn), vn = n(10), bn = n.n(vn), wn = Sn;
    function Sn(e, t) {
        null != e && this.fromString(e, t)
    }
    function En() {
        return new Sn(null)
    }
    var _n = "undefined" != typeof navigator;
    _n && "Microsoft Internet Explorer" == navigator.appName ? (Sn.prototype.am = function(e, t, n, r, i, o) {
        for (var s = 32767 & t, a = t >> 15; --o >= 0; ) {
            var u = 32767 & this[e]
              , c = this[e++] >> 15
              , l = a * u + c * s;
            i = ((u = s * u + ((32767 & l) << 15) + n[r] + (1073741823 & i)) >>> 30) + (l >>> 15) + a * c + (i >>> 30),
            n[r++] = 1073741823 & u
        }
        return i
    }
    ,
    hn = 30) : _n && "Netscape" != navigator.appName ? (Sn.prototype.am = function(e, t, n, r, i, o) {
        for (; --o >= 0; ) {
            var s = t * this[e++] + n[r] + i;
            i = Math.floor(s / 67108864),
            n[r++] = 67108863 & s
        }
        return i
    }
    ,
    hn = 26) : (Sn.prototype.am = function(e, t, n, r, i, o) {
        for (var s = 16383 & t, a = t >> 14; --o >= 0; ) {
            var u = 16383 & this[e]
              , c = this[e++] >> 14
              , l = a * u + c * s;
            i = ((u = s * u + ((16383 & l) << 14) + n[r] + i) >> 28) + (l >> 14) + a * c,
            n[r++] = 268435455 & u
        }
        return i
    }
    ,
    hn = 28),
    Sn.prototype.DB = hn,
    Sn.prototype.DM = (1 << hn) - 1,
    Sn.prototype.DV = 1 << hn;
    Sn.prototype.FV = Math.pow(2, 52),
    Sn.prototype.F1 = 52 - hn,
    Sn.prototype.F2 = 2 * hn - 52;
    var An, Cn, In = new Array;
    for (An = "0".charCodeAt(0),
    Cn = 0; Cn <= 9; ++Cn)
        In[An++] = Cn;
    for (An = "a".charCodeAt(0),
    Cn = 10; Cn < 36; ++Cn)
        In[An++] = Cn;
    for (An = "A".charCodeAt(0),
    Cn = 10; Cn < 36; ++Cn)
        In[An++] = Cn;
    function Tn(e) {
        return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(e)
    }
    function kn(e, t) {
        var n = In[e.charCodeAt(t)];
        return null == n ? -1 : n
    }
    function xn(e) {
        var t = En();
        return t.fromInt(e),
        t
    }
    function Pn(e) {
        var t, n = 1;
        return 0 != (t = e >>> 16) && (e = t,
        n += 16),
        0 != (t = e >> 8) && (e = t,
        n += 8),
        0 != (t = e >> 4) && (e = t,
        n += 4),
        0 != (t = e >> 2) && (e = t,
        n += 2),
        0 != (t = e >> 1) && (e = t,
        n += 1),
        n
    }
    function Rn(e) {
        this.m = e,
        this.mp = e.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << e.DB - 15) - 1,
        this.mt2 = 2 * e.t
    }
    Rn.prototype.convert = function(e) {
        var t = En();
        return e.abs().dlShiftTo(this.m.t, t),
        t.divRemTo(this.m, null, t),
        e.s < 0 && t.compareTo(Sn.ZERO) > 0 && this.m.subTo(t, t),
        t
    }
    ,
    Rn.prototype.revert = function(e) {
        var t = En();
        return e.copyTo(t),
        this.reduce(t),
        t
    }
    ,
    Rn.prototype.reduce = function(e) {
        for (; e.t <= this.mt2; )
            e[e.t++] = 0;
        for (var t = 0; t < this.m.t; ++t) {
            var n = 32767 & e[t]
              , r = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
            for (e[n = t + this.m.t] += this.m.am(0, r, e, t, 0, this.m.t); e[n] >= e.DV; )
                e[n] -= e.DV,
                e[++n]++
        }
        e.clamp(),
        e.drShiftTo(this.m.t, e),
        e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
    }
    ,
    Rn.prototype.mulTo = function(e, t, n) {
        e.multiplyTo(t, n),
        this.reduce(n)
    }
    ,
    Rn.prototype.sqrTo = function(e, t) {
        e.squareTo(t),
        this.reduce(t)
    }
    ,
    Sn.prototype.copyTo = function(e) {
        for (var t = this.t - 1; t >= 0; --t)
            e[t] = this[t];
        e.t = this.t,
        e.s = this.s
    }
    ,
    Sn.prototype.fromInt = function(e) {
        this.t = 1,
        this.s = e < 0 ? -1 : 0,
        e > 0 ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0
    }
    ,
    Sn.prototype.fromString = function(e, t) {
        var n;
        if (16 == t)
            n = 4;
        else if (8 == t)
            n = 3;
        else if (2 == t)
            n = 1;
        else if (32 == t)
            n = 5;
        else {
            if (4 != t)
                throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
            n = 2
        }
        this.t = 0,
        this.s = 0;
        for (var r = e.length, i = !1, o = 0; --r >= 0; ) {
            var s = kn(e, r);
            s < 0 ? "-" == e.charAt(r) && (i = !0) : (i = !1,
            0 == o ? this[this.t++] = s : o + n > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - o) - 1) << o,
            this[this.t++] = s >> this.DB - o) : this[this.t - 1] |= s << o,
            (o += n) >= this.DB && (o -= this.DB))
        }
        this.clamp(),
        i && Sn.ZERO.subTo(this, this)
    }
    ,
    Sn.prototype.clamp = function() {
        for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e; )
            --this.t
    }
    ,
    Sn.prototype.dlShiftTo = function(e, t) {
        var n;
        for (n = this.t - 1; n >= 0; --n)
            t[n + e] = this[n];
        for (n = e - 1; n >= 0; --n)
            t[n] = 0;
        t.t = this.t + e,
        t.s = this.s
    }
    ,
    Sn.prototype.drShiftTo = function(e, t) {
        for (var n = e; n < this.t; ++n)
            t[n - e] = this[n];
        t.t = Math.max(this.t - e, 0),
        t.s = this.s
    }
    ,
    Sn.prototype.lShiftTo = function(e, t) {
        var n, r = e % this.DB, i = this.DB - r, o = (1 << i) - 1, s = Math.floor(e / this.DB), a = this.s << r & this.DM;
        for (n = this.t - 1; n >= 0; --n)
            t[n + s + 1] = this[n] >> i | a,
            a = (this[n] & o) << r;
        for (n = s - 1; n >= 0; --n)
            t[n] = 0;
        t[s] = a,
        t.t = this.t + s + 1,
        t.s = this.s,
        t.clamp()
    }
    ,
    Sn.prototype.rShiftTo = function(e, t) {
        t.s = this.s;
        var n = Math.floor(e / this.DB);
        if (n >= this.t)
            t.t = 0;
        else {
            var r = e % this.DB
              , i = this.DB - r
              , o = (1 << r) - 1;
            t[0] = this[n] >> r;
            for (var s = n + 1; s < this.t; ++s)
                t[s - n - 1] |= (this[s] & o) << i,
                t[s - n] = this[s] >> r;
            r > 0 && (t[this.t - n - 1] |= (this.s & o) << i),
            t.t = this.t - n,
            t.clamp()
        }
    }
    ,
    Sn.prototype.subTo = function(e, t) {
        for (var n = 0, r = 0, i = Math.min(e.t, this.t); n < i; )
            r += this[n] - e[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
        if (e.t < this.t) {
            for (r -= e.s; n < this.t; )
                r += this[n],
                t[n++] = r & this.DM,
                r >>= this.DB;
            r += this.s
        } else {
            for (r += this.s; n < e.t; )
                r -= e[n],
                t[n++] = r & this.DM,
                r >>= this.DB;
            r -= e.s
        }
        t.s = r < 0 ? -1 : 0,
        r < -1 ? t[n++] = this.DV + r : r > 0 && (t[n++] = r),
        t.t = n,
        t.clamp()
    }
    ,
    Sn.prototype.multiplyTo = function(e, t) {
        var n = this.abs()
          , r = e.abs()
          , i = n.t;
        for (t.t = i + r.t; --i >= 0; )
            t[i] = 0;
        for (i = 0; i < r.t; ++i)
            t[i + n.t] = n.am(0, r[i], t, i, 0, n.t);
        t.s = 0,
        t.clamp(),
        this.s != e.s && Sn.ZERO.subTo(t, t)
    }
    ,
    Sn.prototype.squareTo = function(e) {
        for (var t = this.abs(), n = e.t = 2 * t.t; --n >= 0; )
            e[n] = 0;
        for (n = 0; n < t.t - 1; ++n) {
            var r = t.am(n, t[n], e, 2 * n, 0, 1);
            (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, r, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV,
            e[n + t.t + 1] = 1)
        }
        e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)),
        e.s = 0,
        e.clamp()
    }
    ,
    Sn.prototype.divRemTo = function(e, t, n) {
        var r = e.abs();
        if (!(r.t <= 0)) {
            var i = this.abs();
            if (i.t < r.t)
                return null != t && t.fromInt(0),
                void (null != n && this.copyTo(n));
            null == n && (n = En());
            var o = En()
              , s = this.s
              , a = e.s
              , u = this.DB - Pn(r[r.t - 1]);
            u > 0 ? (r.lShiftTo(u, o),
            i.lShiftTo(u, n)) : (r.copyTo(o),
            i.copyTo(n));
            var c = o.t
              , l = o[c - 1];
            if (0 != l) {
                var h = l * (1 << this.F1) + (c > 1 ? o[c - 2] >> this.F2 : 0)
                  , f = this.FV / h
                  , d = (1 << this.F1) / h
                  , p = 1 << this.F2
                  , g = n.t
                  , m = g - c
                  , y = null == t ? En() : t;
                for (o.dlShiftTo(m, y),
                n.compareTo(y) >= 0 && (n[n.t++] = 1,
                n.subTo(y, n)),
                Sn.ONE.dlShiftTo(c, y),
                y.subTo(o, o); o.t < c; )
                    o[o.t++] = 0;
                for (; --m >= 0; ) {
                    var v = n[--g] == l ? this.DM : Math.floor(n[g] * f + (n[g - 1] + p) * d);
                    if ((n[g] += o.am(0, v, n, m, 0, c)) < v)
                        for (o.dlShiftTo(m, y),
                        n.subTo(y, n); n[g] < --v; )
                            n.subTo(y, n)
                }
                null != t && (n.drShiftTo(c, t),
                s != a && Sn.ZERO.subTo(t, t)),
                n.t = c,
                n.clamp(),
                u > 0 && n.rShiftTo(u, n),
                s < 0 && Sn.ZERO.subTo(n, n)
            }
        }
    }
    ,
    Sn.prototype.invDigit = function() {
        if (this.t < 1)
            return 0;
        var e = this[0];
        if (0 == (1 & e))
            return 0;
        var t = 3 & e;
        return (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) > 0 ? this.DV - t : -t
    }
    ,
    Sn.prototype.addTo = function(e, t) {
        for (var n = 0, r = 0, i = Math.min(e.t, this.t); n < i; )
            r += this[n] + e[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
        if (e.t < this.t) {
            for (r += e.s; n < this.t; )
                r += this[n],
                t[n++] = r & this.DM,
                r >>= this.DB;
            r += this.s
        } else {
            for (r += this.s; n < e.t; )
                r += e[n],
                t[n++] = r & this.DM,
                r >>= this.DB;
            r += e.s
        }
        t.s = r < 0 ? -1 : 0,
        r > 0 ? t[n++] = r : r < -1 && (t[n++] = this.DV + r),
        t.t = n,
        t.clamp()
    }
    ,
    Sn.prototype.toString = function(e) {
        if (this.s < 0)
            return "-" + this.negate().toString();
        var t;
        if (16 == e)
            t = 4;
        else if (8 == e)
            t = 3;
        else if (2 == e)
            t = 1;
        else if (32 == e)
            t = 5;
        else {
            if (4 != e)
                throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
            t = 2
        }
        var n, r = (1 << t) - 1, i = !1, o = "", s = this.t, a = this.DB - s * this.DB % t;
        if (s-- > 0)
            for (a < this.DB && (n = this[s] >> a) > 0 && (i = !0,
            o = Tn(n)); s >= 0; )
                a < t ? (n = (this[s] & (1 << a) - 1) << t - a,
                n |= this[--s] >> (a += this.DB - t)) : (n = this[s] >> (a -= t) & r,
                a <= 0 && (a += this.DB,
                --s)),
                n > 0 && (i = !0),
                i && (o += Tn(n));
        return i ? o : "0"
    }
    ,
    Sn.prototype.negate = function() {
        var e = En();
        return Sn.ZERO.subTo(this, e),
        e
    }
    ,
    Sn.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this
    }
    ,
    Sn.prototype.compareTo = function(e) {
        var t = this.s - e.s;
        if (0 != t)
            return t;
        var n = this.t;
        if (0 != (t = n - e.t))
            return this.s < 0 ? -t : t;
        for (; --n >= 0; )
            if (0 != (t = this[n] - e[n]))
                return t;
        return 0
    }
    ,
    Sn.prototype.bitLength = function() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + Pn(this[this.t - 1] ^ this.s & this.DM)
    }
    ,
    Sn.prototype.mod = function(e) {
        var t = En();
        return this.abs().divRemTo(e, null, t),
        this.s < 0 && t.compareTo(Sn.ZERO) > 0 && e.subTo(t, t),
        t
    }
    ,
    Sn.prototype.equals = function(e) {
        return 0 == this.compareTo(e)
    }
    ,
    Sn.prototype.add = function(e) {
        var t = En();
        return this.addTo(e, t),
        t
    }
    ,
    Sn.prototype.subtract = function(e) {
        var t = En();
        return this.subTo(e, t),
        t
    }
    ,
    Sn.prototype.multiply = function(e) {
        var t = En();
        return this.multiplyTo(e, t),
        t
    }
    ,
    Sn.prototype.divide = function(e) {
        var t = En();
        return this.divRemTo(e, t, null),
        t
    }
    ,
    Sn.prototype.modPow = function(e, t, n) {
        var r, i = e.bitLength(), o = xn(1), s = new Rn(t);
        if (i <= 0)
            return o;
        r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6;
        var a = new Array
          , u = 3
          , c = r - 1
          , l = (1 << r) - 1;
        if (a[1] = s.convert(this),
        r > 1) {
            var h = En();
            for (s.sqrTo(a[1], h); u <= l; )
                a[u] = En(),
                s.mulTo(h, a[u - 2], a[u]),
                u += 2
        }
        var f, d, p = e.t - 1, g = !0, m = En();
        for (i = Pn(e[p]) - 1; p >= 0; ) {
            for (i >= c ? f = e[p] >> i - c & l : (f = (e[p] & (1 << i + 1) - 1) << c - i,
            p > 0 && (f |= e[p - 1] >> this.DB + i - c)),
            u = r; 0 == (1 & f); )
                f >>= 1,
                --u;
            if ((i -= u) < 0 && (i += this.DB,
            --p),
            g)
                a[f].copyTo(o),
                g = !1;
            else {
                for (; u > 1; )
                    s.sqrTo(o, m),
                    s.sqrTo(m, o),
                    u -= 2;
                u > 0 ? s.sqrTo(o, m) : (d = o,
                o = m,
                m = d),
                s.mulTo(m, a[f], o)
            }
            for (; p >= 0 && 0 == (e[p] & 1 << i); )
                s.sqrTo(o, m),
                d = o,
                o = m,
                m = d,
                --i < 0 && (i = this.DB - 1,
                --p)
        }
        var y = s.revert(o);
        return n(null, y),
        y
    }
    ,
    Sn.ZERO = xn(0),
    Sn.ONE = xn(1);
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var On = function(e) {
        return dn.Buffer.from(gn.a.lib.WordArray.random(e).toString(), "hex")
    }
      , Nn = function() {
        function e(t) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.N = new wn("FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF",16),
            this.g = new wn("2",16),
            this.k = new wn(this.hexHash("00" + this.N.toString(16) + "0" + this.g.toString(16)),16),
            this.smallAValue = this.generateRandomSmallA(),
            this.getLargeAValue((function() {}
            )),
            this.infoBits = dn.Buffer.from("Caldera Derived Key", "utf8"),
            this.poolName = t
        }
        return e.prototype.getSmallAValue = function() {
            return this.smallAValue
        }
        ,
        e.prototype.getLargeAValue = function(e) {
            var t = this;
            this.largeAValue ? e(null, this.largeAValue) : this.calculateA(this.smallAValue, (function(n, r) {
                n && e(n, null),
                t.largeAValue = r,
                e(null, t.largeAValue)
            }
            ))
        }
        ,
        e.prototype.generateRandomSmallA = function() {
            var e = On(128).toString("hex");
            return new wn(e,16).mod(this.N)
        }
        ,
        e.prototype.generateRandomString = function() {
            return On(40).toString("base64")
        }
        ,
        e.prototype.getRandomPassword = function() {
            return this.randomPassword
        }
        ,
        e.prototype.getSaltDevices = function() {
            return this.SaltToHashDevices
        }
        ,
        e.prototype.getVerifierDevices = function() {
            return this.verifierDevices
        }
        ,
        e.prototype.generateHashDevice = function(e, t, n) {
            var r = this;
            this.randomPassword = this.generateRandomString();
            var i = "" + e + t + ":" + this.randomPassword
              , o = this.hash(i)
              , s = On(16).toString("hex");
            this.SaltToHashDevices = this.padHex(new wn(s,16)),
            this.g.modPow(new wn(this.hexHash(this.SaltToHashDevices + o),16), this.N, (function(e, t) {
                e && n(e, null),
                r.verifierDevices = r.padHex(t),
                n(null, null)
            }
            ))
        }
        ,
        e.prototype.calculateA = function(e, t) {
            var n = this;
            this.g.modPow(e, this.N, (function(e, r) {
                e && t(e, null),
                r.mod(n.N).equals(wn.ZERO) && t(new Error("Illegal paramater. A mod N cannot be 0."), null),
                t(null, r)
            }
            ))
        }
        ,
        e.prototype.calculateU = function(e, t) {
            return this.UHexHash = this.hexHash(this.padHex(e) + this.padHex(t)),
            new wn(this.UHexHash,16)
        }
        ,
        e.prototype.hash = function(e) {
            var t = e instanceof dn.Buffer ? gn.a.lib.WordArray.create(e) : e
              , n = yn()(t).toString();
            return new Array(64 - n.length).join("0") + n
        }
        ,
        e.prototype.hexHash = function(e) {
            return this.hash(dn.Buffer.from(e, "hex"))
        }
        ,
        e.prototype.computehkdf = function(e, t) {
            var n = gn.a.lib.WordArray.create(dn.Buffer.concat([this.infoBits, dn.Buffer.from(String.fromCharCode(1), "utf8")]))
              , r = e instanceof dn.Buffer ? gn.a.lib.WordArray.create(e) : e
              , i = t instanceof dn.Buffer ? gn.a.lib.WordArray.create(t) : t
              , o = bn()(r, i)
              , s = bn()(n, o);
            return dn.Buffer.from(s.toString(), "hex").slice(0, 16)
        }
        ,
        e.prototype.getPasswordAuthenticationKey = function(e, t, n, r, i) {
            var o = this;
            if (n.mod(this.N).equals(wn.ZERO))
                throw new Error("B cannot be zero.");
            if (this.UValue = this.calculateU(this.largeAValue, n),
            this.UValue.equals(wn.ZERO))
                throw new Error("U cannot be zero.");
            var s = "" + this.poolName + e + ":" + t
              , a = this.hash(s)
              , u = new wn(this.hexHash(this.padHex(r) + a),16);
            this.calculateS(u, n, (function(e, t) {
                e && i(e, null);
                var n = o.computehkdf(dn.Buffer.from(o.padHex(t), "hex"), dn.Buffer.from(o.padHex(o.UValue.toString(16)), "hex"));
                i(null, n)
            }
            ))
        }
        ,
        e.prototype.calculateS = function(e, t, n) {
            var r = this;
            this.g.modPow(e, this.N, (function(i, o) {
                i && n(i, null),
                t.subtract(r.k.multiply(o)).modPow(r.smallAValue.add(r.UValue.multiply(e)), r.N, (function(e, t) {
                    e && n(e, null),
                    n(null, t.mod(r.N))
                }
                ))
            }
            ))
        }
        ,
        e.prototype.getNewPasswordRequiredChallengeUserAttributePrefix = function() {
            return "userAttributes."
        }
        ,
        e.prototype.padHex = function(e) {
            var t = e.toString(16);
            return t.length % 2 == 1 ? t = "0" + t : -1 !== "89ABCDEFabcdef".indexOf(t[0]) && (t = "00" + t),
            t
        }
        ,
        e
    }();
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var Un = function() {
        function e(t) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.jwtToken = t || "",
            this.payload = this.decodePayload()
        }
        return e.prototype.getJwtToken = function() {
            return this.jwtToken
        }
        ,
        e.prototype.getExpiration = function() {
            return this.payload.exp
        }
        ,
        e.prototype.getIssuedAt = function() {
            return this.payload.iat
        }
        ,
        e.prototype.decodePayload = function() {
            var e = this.jwtToken.split(".")[1];
            try {
                return JSON.parse(dn.Buffer.from(e, "base64").toString("utf8"))
            } catch (e) {
                return {}
            }
        }
        ,
        e
    }();
    function Dn(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function Ln(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }
    var qn = function(e) {
        function t() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , r = n.AccessToken;
            return Dn(this, t),
            Ln(this, e.call(this, r || ""))
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, e),
        t
    }(Un);
    function Mn(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function Fn(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var jn = function(e) {
        function t() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , r = n.IdToken;
            return Mn(this, t),
            Fn(this, e.call(this, r || ""))
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, e),
        t
    }(Un);
    function Bn(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var Vn = function() {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , n = t.RefreshToken;
            Bn(this, e),
            this.token = n || ""
        }
        return e.prototype.getToken = function() {
            return this.token
        }
        ,
        e
    }()
      , zn = n(17)
      , Hn = n.n(zn);
    function Kn(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var Wn = function() {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , n = t.IdToken
              , r = t.RefreshToken
              , i = t.AccessToken
              , o = t.ClockDrift;
            if (Kn(this, e),
            null == i || null == n)
                throw new Error("Id token and Access Token must be present.");
            this.idToken = n,
            this.refreshToken = r,
            this.accessToken = i,
            this.clockDrift = void 0 === o ? this.calculateClockDrift() : o
        }
        return e.prototype.getIdToken = function() {
            return this.idToken
        }
        ,
        e.prototype.getRefreshToken = function() {
            return this.refreshToken
        }
        ,
        e.prototype.getAccessToken = function() {
            return this.accessToken
        }
        ,
        e.prototype.getClockDrift = function() {
            return this.clockDrift
        }
        ,
        e.prototype.calculateClockDrift = function() {
            return Math.floor(new Date / 1e3) - Math.min(this.accessToken.getIssuedAt(), this.idToken.getIssuedAt())
        }
        ,
        e.prototype.isValid = function() {
            var e = Math.floor(new Date / 1e3) - this.clockDrift;
            return e < this.accessToken.getExpiration() && e < this.idToken.getExpiration()
        }
        ,
        e
    }();
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var Gn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      , Jn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      , Yn = function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        return e.prototype.getNowString = function() {
            var e = new Date
              , t = Jn[e.getUTCDay()]
              , n = Gn[e.getUTCMonth()]
              , r = e.getUTCDate()
              , i = e.getUTCHours();
            i < 10 && (i = "0" + i);
            var o = e.getUTCMinutes();
            o < 10 && (o = "0" + o);
            var s = e.getUTCSeconds();
            return s < 10 && (s = "0" + s),
            t + " " + n + " " + r + " " + i + ":" + o + ":" + s + " UTC " + e.getUTCFullYear()
        }
        ,
        e
    }();
    function Xn(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var $n = function() {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , n = t.Name
              , r = t.Value;
            Xn(this, e),
            this.Name = n || "",
            this.Value = r || ""
        }
        return e.prototype.getValue = function() {
            return this.Value
        }
        ,
        e.prototype.setValue = function(e) {
            return this.Value = e,
            this
        }
        ,
        e.prototype.getName = function() {
            return this.Name
        }
        ,
        e.prototype.setName = function(e) {
            return this.Name = e,
            this
        }
        ,
        e.prototype.toString = function() {
            return JSON.stringify(this)
        }
        ,
        e.prototype.toJSON = function() {
            return {
                Name: this.Name,
                Value: this.Value
            }
        }
        ,
        e
    }();
    function Zn(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var Qn = {}
      , er = function() {
        function e() {
            Zn(this, e)
        }
        return e.setItem = function(e, t) {
            return Qn[e] = t,
            Qn[e]
        }
        ,
        e.getItem = function(e) {
            return Object.prototype.hasOwnProperty.call(Qn, e) ? Qn[e] : void 0
        }
        ,
        e.removeItem = function(e) {
            return delete Qn[e]
        }
        ,
        e.clear = function() {
            return Qn = {}
        }
        ,
        e
    }()
      , tr = function() {
        function e() {
            Zn(this, e);
            try {
                this.storageWindow = window.localStorage,
                this.storageWindow.setItem("aws.cognito.test-ls", 1),
                this.storageWindow.removeItem("aws.cognito.test-ls")
            } catch (e) {
                this.storageWindow = er
            }
        }
        return e.prototype.getStorage = function() {
            return this.storageWindow
        }
        ,
        e
    }();
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var nr = function() {
        function e(t) {
            if (function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            null == t || null == t.Username || null == t.Pool)
                throw new Error("Username and pool information are required.");
            this.username = t.Username || "",
            this.pool = t.Pool,
            this.Session = null,
            this.client = t.Pool.client,
            this.signInUserSession = null,
            this.authenticationFlowType = "USER_SRP_AUTH",
            this.storage = t.Storage || (new tr).getStorage(),
            this.keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId(),
            this.userDataKey = this.keyPrefix + "." + this.username + ".userData"
        }
        return e.prototype.setSignInUserSession = function(e) {
            this.clearCachedUserData(),
            this.signInUserSession = e,
            this.cacheTokens()
        }
        ,
        e.prototype.getSignInUserSession = function() {
            return this.signInUserSession
        }
        ,
        e.prototype.getUsername = function() {
            return this.username
        }
        ,
        e.prototype.getAuthenticationFlowType = function() {
            return this.authenticationFlowType
        }
        ,
        e.prototype.setAuthenticationFlowType = function(e) {
            this.authenticationFlowType = e
        }
        ,
        e.prototype.initiateAuth = function(e, t) {
            var n = this
              , r = e.getAuthParameters();
            r.USERNAME = this.username;
            var i = 0 !== Object.keys(e.getValidationData()).length ? e.getValidationData() : e.getClientMetadata()
              , o = {
                AuthFlow: "CUSTOM_AUTH",
                ClientId: this.pool.getClientId(),
                AuthParameters: r,
                ClientMetadata: i
            };
            this.getUserContextData() && (o.UserContextData = this.getUserContextData()),
            this.client.request("InitiateAuth", o, (function(e, r) {
                if (e)
                    return t.onFailure(e);
                var i = r.ChallengeName
                  , o = r.ChallengeParameters;
                return "CUSTOM_CHALLENGE" === i ? (n.Session = r.Session,
                t.customChallenge(o)) : (n.signInUserSession = n.getCognitoUserSession(r.AuthenticationResult),
                n.cacheTokens(),
                t.onSuccess(n.signInUserSession))
            }
            ))
        }
        ,
        e.prototype.authenticateUser = function(e, t) {
            return "USER_PASSWORD_AUTH" === this.authenticationFlowType ? this.authenticateUserPlainUsernamePassword(e, t) : "USER_SRP_AUTH" === this.authenticationFlowType || "CUSTOM_AUTH" === this.authenticationFlowType ? this.authenticateUserDefaultAuth(e, t) : t.onFailure(new Error("Authentication flow type is invalid."))
        }
        ,
        e.prototype.authenticateUserDefaultAuth = function(e, t) {
            var n = this
              , r = new Nn(this.pool.getUserPoolId().split("_")[1])
              , i = new Yn
              , o = void 0
              , s = void 0
              , a = {};
            null != this.deviceKey && (a.DEVICE_KEY = this.deviceKey),
            a.USERNAME = this.username,
            r.getLargeAValue((function(u, c) {
                u && t.onFailure(u),
                a.SRP_A = c.toString(16),
                "CUSTOM_AUTH" === n.authenticationFlowType && (a.CHALLENGE_NAME = "SRP_A");
                var l = 0 !== Object.keys(e.getValidationData()).length ? e.getValidationData() : e.getClientMetadata()
                  , h = {
                    AuthFlow: n.authenticationFlowType,
                    ClientId: n.pool.getClientId(),
                    AuthParameters: a,
                    ClientMetadata: l
                };
                n.getUserContextData(n.username) && (h.UserContextData = n.getUserContextData(n.username)),
                n.client.request("InitiateAuth", h, (function(a, u) {
                    if (a)
                        return t.onFailure(a);
                    var c = u.ChallengeParameters;
                    n.username = c.USER_ID_FOR_SRP,
                    o = new wn(c.SRP_B,16),
                    s = new wn(c.SALT,16),
                    n.getCachedDeviceKeyAndPassword(),
                    r.getPasswordAuthenticationKey(n.username, e.getPassword(), o, s, (function(e, o) {
                        e && t.onFailure(e);
                        var s = i.getNowString()
                          , a = gn.a.lib.WordArray.create(dn.Buffer.concat([dn.Buffer.from(n.pool.getUserPoolId().split("_")[1], "utf8"), dn.Buffer.from(n.username, "utf8"), dn.Buffer.from(c.SECRET_BLOCK, "base64"), dn.Buffer.from(s, "utf8")]))
                          , h = gn.a.lib.WordArray.create(o)
                          , f = Hn.a.stringify(bn()(a, h))
                          , d = {};
                        d.USERNAME = n.username,
                        d.PASSWORD_CLAIM_SECRET_BLOCK = c.SECRET_BLOCK,
                        d.TIMESTAMP = s,
                        d.PASSWORD_CLAIM_SIGNATURE = f,
                        null != n.deviceKey && (d.DEVICE_KEY = n.deviceKey);
                        var p = {
                            ChallengeName: "PASSWORD_VERIFIER",
                            ClientId: n.pool.getClientId(),
                            ChallengeResponses: d,
                            Session: u.Session,
                            ClientMetadata: l
                        };
                        n.getUserContextData() && (p.UserContextData = n.getUserContextData()),
                        function e(t, r) {
                            return n.client.request("RespondToAuthChallenge", t, (function(i, o) {
                                return i && "ResourceNotFoundException" === i.code && -1 !== i.message.toLowerCase().indexOf("device") ? (d.DEVICE_KEY = null,
                                n.deviceKey = null,
                                n.randomPassword = null,
                                n.deviceGroupKey = null,
                                n.clearCachedDeviceKeyAndPassword(),
                                e(t, r)) : r(i, o)
                            }
                            ))
                        }(p, (function(e, i) {
                            return e ? t.onFailure(e) : n.authenticateUserInternal(i, r, t)
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            ))
        }
        ,
        e.prototype.authenticateUserPlainUsernamePassword = function(e, t) {
            var n = this
              , r = {};
            if (r.USERNAME = this.username,
            r.PASSWORD = e.getPassword(),
            r.PASSWORD) {
                var i = new Nn(this.pool.getUserPoolId().split("_")[1]);
                this.getCachedDeviceKeyAndPassword(),
                null != this.deviceKey && (r.DEVICE_KEY = this.deviceKey);
                var o = 0 !== Object.keys(e.getValidationData()).length ? e.getValidationData() : e.getClientMetadata()
                  , s = {
                    AuthFlow: "USER_PASSWORD_AUTH",
                    ClientId: this.pool.getClientId(),
                    AuthParameters: r,
                    ClientMetadata: o
                };
                this.getUserContextData(this.username) && (s.UserContextData = this.getUserContextData(this.username)),
                this.client.request("InitiateAuth", s, (function(e, r) {
                    return e ? t.onFailure(e) : n.authenticateUserInternal(r, i, t)
                }
                ))
            } else
                t.onFailure(new Error("PASSWORD parameter is required"))
        }
        ,
        e.prototype.authenticateUserInternal = function(e, t, n) {
            var r = this
              , i = e.ChallengeName
              , o = e.ChallengeParameters;
            if ("SMS_MFA" === i)
                return this.Session = e.Session,
                n.mfaRequired(i, o);
            if ("SELECT_MFA_TYPE" === i)
                return this.Session = e.Session,
                n.selectMFAType(i, o);
            if ("MFA_SETUP" === i)
                return this.Session = e.Session,
                n.mfaSetup(i, o);
            if ("SOFTWARE_TOKEN_MFA" === i)
                return this.Session = e.Session,
                n.totpRequired(i, o);
            if ("CUSTOM_CHALLENGE" === i)
                return this.Session = e.Session,
                n.customChallenge(o);
            if ("NEW_PASSWORD_REQUIRED" === i) {
                this.Session = e.Session;
                var s = null
                  , a = null
                  , u = []
                  , c = t.getNewPasswordRequiredChallengeUserAttributePrefix();
                if (o && (s = JSON.parse(e.ChallengeParameters.userAttributes),
                a = JSON.parse(e.ChallengeParameters.requiredAttributes)),
                a)
                    for (var l = 0; l < a.length; l++)
                        u[l] = a[l].substr(c.length);
                return n.newPasswordRequired(s, u)
            }
            if ("DEVICE_SRP_AUTH" !== i) {
                this.signInUserSession = this.getCognitoUserSession(e.AuthenticationResult),
                this.challengeName = i,
                this.cacheTokens();
                var h = e.AuthenticationResult.NewDeviceMetadata;
                if (null == h)
                    return n.onSuccess(this.signInUserSession);
                t.generateHashDevice(e.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey, e.AuthenticationResult.NewDeviceMetadata.DeviceKey, (function(i) {
                    if (i)
                        return n.onFailure(i);
                    var o = {
                        Salt: dn.Buffer.from(t.getSaltDevices(), "hex").toString("base64"),
                        PasswordVerifier: dn.Buffer.from(t.getVerifierDevices(), "hex").toString("base64")
                    };
                    r.verifierDevices = o.PasswordVerifier,
                    r.deviceGroupKey = h.DeviceGroupKey,
                    r.randomPassword = t.getRandomPassword(),
                    r.client.request("ConfirmDevice", {
                        DeviceKey: h.DeviceKey,
                        AccessToken: r.signInUserSession.getAccessToken().getJwtToken(),
                        DeviceSecretVerifierConfig: o,
                        DeviceName: navigator.userAgent
                    }, (function(t, i) {
                        return t ? n.onFailure(t) : (r.deviceKey = e.AuthenticationResult.NewDeviceMetadata.DeviceKey,
                        r.cacheDeviceKeyAndPassword(),
                        !0 === i.UserConfirmationNecessary ? n.onSuccess(r.signInUserSession, i.UserConfirmationNecessary) : n.onSuccess(r.signInUserSession))
                    }
                    ))
                }
                ))
            } else
                this.getDeviceResponse(n)
        }
        ,
        e.prototype.completeNewPasswordChallenge = function(e, t, n, r) {
            var i = this;
            if (!e)
                return n.onFailure(new Error("New password is required."));
            var o = new Nn(this.pool.getUserPoolId().split("_")[1])
              , s = o.getNewPasswordRequiredChallengeUserAttributePrefix()
              , a = {};
            t && Object.keys(t).forEach((function(e) {
                a[s + e] = t[e]
            }
            )),
            a.NEW_PASSWORD = e,
            a.USERNAME = this.username;
            var u = {
                ChallengeName: "NEW_PASSWORD_REQUIRED",
                ClientId: this.pool.getClientId(),
                ChallengeResponses: a,
                Session: this.Session,
                ClientMetadata: r
            };
            this.getUserContextData() && (u.UserContextData = this.getUserContextData()),
            this.client.request("RespondToAuthChallenge", u, (function(e, t) {
                return e ? n.onFailure(e) : i.authenticateUserInternal(t, o, n)
            }
            ))
        }
        ,
        e.prototype.getDeviceResponse = function(e, t) {
            var n = this
              , r = new Nn(this.deviceGroupKey)
              , i = new Yn
              , o = {};
            o.USERNAME = this.username,
            o.DEVICE_KEY = this.deviceKey,
            r.getLargeAValue((function(s, a) {
                s && e.onFailure(s),
                o.SRP_A = a.toString(16);
                var u = {
                    ChallengeName: "DEVICE_SRP_AUTH",
                    ClientId: n.pool.getClientId(),
                    ChallengeResponses: o,
                    ClientMetadata: t
                };
                n.getUserContextData() && (u.UserContextData = n.getUserContextData()),
                n.client.request("RespondToAuthChallenge", u, (function(t, o) {
                    if (t)
                        return e.onFailure(t);
                    var s = o.ChallengeParameters
                      , a = new wn(s.SRP_B,16)
                      , u = new wn(s.SALT,16);
                    r.getPasswordAuthenticationKey(n.deviceKey, n.randomPassword, a, u, (function(t, r) {
                        if (t)
                            return e.onFailure(t);
                        var a = i.getNowString()
                          , u = gn.a.lib.WordArray.create(dn.Buffer.concat([dn.Buffer.from(n.deviceGroupKey, "utf8"), dn.Buffer.from(n.deviceKey, "utf8"), dn.Buffer.from(s.SECRET_BLOCK, "base64"), dn.Buffer.from(a, "utf8")]))
                          , c = gn.a.lib.WordArray.create(r)
                          , l = Hn.a.stringify(bn()(u, c))
                          , h = {};
                        h.USERNAME = n.username,
                        h.PASSWORD_CLAIM_SECRET_BLOCK = s.SECRET_BLOCK,
                        h.TIMESTAMP = a,
                        h.PASSWORD_CLAIM_SIGNATURE = l,
                        h.DEVICE_KEY = n.deviceKey;
                        var f = {
                            ChallengeName: "DEVICE_PASSWORD_VERIFIER",
                            ClientId: n.pool.getClientId(),
                            ChallengeResponses: h,
                            Session: o.Session
                        };
                        n.getUserContextData() && (f.UserContextData = n.getUserContextData()),
                        n.client.request("RespondToAuthChallenge", f, (function(t, r) {
                            return t ? e.onFailure(t) : (n.signInUserSession = n.getCognitoUserSession(r.AuthenticationResult),
                            n.cacheTokens(),
                            e.onSuccess(n.signInUserSession))
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            ))
        }
        ,
        e.prototype.confirmRegistration = function(e, t, n, r) {
            var i = {
                ClientId: this.pool.getClientId(),
                ConfirmationCode: e,
                Username: this.username,
                ForceAliasCreation: t,
                ClientMetadata: r
            };
            this.getUserContextData() && (i.UserContextData = this.getUserContextData()),
            this.client.request("ConfirmSignUp", i, (function(e) {
                return e ? n(e, null) : n(null, "SUCCESS")
            }
            ))
        }
        ,
        e.prototype.sendCustomChallengeAnswer = function(e, t, n) {
            var r = this
              , i = {};
            i.USERNAME = this.username,
            i.ANSWER = e;
            var o = new Nn(this.pool.getUserPoolId().split("_")[1]);
            this.getCachedDeviceKeyAndPassword(),
            null != this.deviceKey && (i.DEVICE_KEY = this.deviceKey);
            var s = {
                ChallengeName: "CUSTOM_CHALLENGE",
                ChallengeResponses: i,
                ClientId: this.pool.getClientId(),
                Session: this.Session,
                ClientMetadata: n
            };
            this.getUserContextData() && (s.UserContextData = this.getUserContextData()),
            this.client.request("RespondToAuthChallenge", s, (function(e, n) {
                return e ? t.onFailure(e) : r.authenticateUserInternal(n, o, t)
            }
            ))
        }
        ,
        e.prototype.sendMFACode = function(e, t, n, r) {
            var i = this
              , o = {};
            o.USERNAME = this.username,
            o.SMS_MFA_CODE = e;
            var s = n || "SMS_MFA";
            "SOFTWARE_TOKEN_MFA" === s && (o.SOFTWARE_TOKEN_MFA_CODE = e),
            null != this.deviceKey && (o.DEVICE_KEY = this.deviceKey);
            var a = {
                ChallengeName: s,
                ChallengeResponses: o,
                ClientId: this.pool.getClientId(),
                Session: this.Session,
                ClientMetadata: r
            };
            this.getUserContextData() && (a.UserContextData = this.getUserContextData()),
            this.client.request("RespondToAuthChallenge", a, (function(e, n) {
                if (e)
                    return t.onFailure(e);
                if ("DEVICE_SRP_AUTH" !== n.ChallengeName) {
                    if (i.signInUserSession = i.getCognitoUserSession(n.AuthenticationResult),
                    i.cacheTokens(),
                    null == n.AuthenticationResult.NewDeviceMetadata)
                        return t.onSuccess(i.signInUserSession);
                    var r = new Nn(i.pool.getUserPoolId().split("_")[1]);
                    r.generateHashDevice(n.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey, n.AuthenticationResult.NewDeviceMetadata.DeviceKey, (function(e) {
                        if (e)
                            return t.onFailure(e);
                        var o = {
                            Salt: dn.Buffer.from(r.getSaltDevices(), "hex").toString("base64"),
                            PasswordVerifier: dn.Buffer.from(r.getVerifierDevices(), "hex").toString("base64")
                        };
                        i.verifierDevices = o.PasswordVerifier,
                        i.deviceGroupKey = n.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,
                        i.randomPassword = r.getRandomPassword(),
                        i.client.request("ConfirmDevice", {
                            DeviceKey: n.AuthenticationResult.NewDeviceMetadata.DeviceKey,
                            AccessToken: i.signInUserSession.getAccessToken().getJwtToken(),
                            DeviceSecretVerifierConfig: o,
                            DeviceName: navigator.userAgent
                        }, (function(e, r) {
                            return e ? t.onFailure(e) : (i.deviceKey = n.AuthenticationResult.NewDeviceMetadata.DeviceKey,
                            i.cacheDeviceKeyAndPassword(),
                            !0 === r.UserConfirmationNecessary ? t.onSuccess(i.signInUserSession, r.UserConfirmationNecessary) : t.onSuccess(i.signInUserSession))
                        }
                        ))
                    }
                    ))
                } else
                    i.getDeviceResponse(t)
            }
            ))
        }
        ,
        e.prototype.changePassword = function(e, t, n, r) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return n(new Error("User is not authenticated"), null);
            this.client.request("ChangePassword", {
                PreviousPassword: e,
                ProposedPassword: t,
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                ClientMetadata: r
            }, (function(e) {
                return e ? n(e, null) : n(null, "SUCCESS")
            }
            ))
        }
        ,
        e.prototype.enableMFA = function(e) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return e(new Error("User is not authenticated"), null);
            var t = [];
            t.push({
                DeliveryMedium: "SMS",
                AttributeName: "phone_number"
            }),
            this.client.request("SetUserSettings", {
                MFAOptions: t,
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
            }, (function(t) {
                return t ? e(t, null) : e(null, "SUCCESS")
            }
            ))
        }
        ,
        e.prototype.setUserMfaPreference = function(e, t, n) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return n(new Error("User is not authenticated"), null);
            this.client.request("SetUserMFAPreference", {
                SMSMfaSettings: e,
                SoftwareTokenMfaSettings: t,
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
            }, (function(e) {
                return e ? n(e, null) : n(null, "SUCCESS")
            }
            ))
        }
        ,
        e.prototype.disableMFA = function(e) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return e(new Error("User is not authenticated"), null);
            this.client.request("SetUserSettings", {
                MFAOptions: [],
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
            }, (function(t) {
                return t ? e(t, null) : e(null, "SUCCESS")
            }
            ))
        }
        ,
        e.prototype.deleteUser = function(e, t) {
            var n = this;
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return e(new Error("User is not authenticated"), null);
            this.client.request("DeleteUser", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                ClientMetadata: t
            }, (function(t) {
                return t ? e(t, null) : (n.clearCachedUser(),
                e(null, "SUCCESS"))
            }
            ))
        }
        ,
        e.prototype.updateAttributes = function(e, t, n) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return t(new Error("User is not authenticated"), null);
            this.client.request("UpdateUserAttributes", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                UserAttributes: e,
                ClientMetadata: n
            }, (function(e) {
                return e ? t(e, null) : t(null, "SUCCESS")
            }
            ))
        }
        ,
        e.prototype.getUserAttributes = function(e) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return e(new Error("User is not authenticated"), null);
            this.client.request("GetUser", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
            }, (function(t, n) {
                if (t)
                    return e(t, null);
                for (var r = [], i = 0; i < n.UserAttributes.length; i++) {
                    var o = {
                        Name: n.UserAttributes[i].Name,
                        Value: n.UserAttributes[i].Value
                    }
                      , s = new $n(o);
                    r.push(s)
                }
                return e(null, r)
            }
            ))
        }
        ,
        e.prototype.getMFAOptions = function(e) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return e(new Error("User is not authenticated"), null);
            this.client.request("GetUser", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
            }, (function(t, n) {
                return t ? e(t, null) : e(null, n.MFAOptions)
            }
            ))
        }
        ,
        e.prototype.getUserData = function(e, t) {
            var n = this;
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return this.clearCachedUserData(),
                e(new Error("User is not authenticated"), null);
            var r = !!t && t.bypassCache
              , i = this.storage.getItem(this.userDataKey);
            if (!i || r)
                this.client.request("GetUser", {
                    AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
                }, (function(t, r) {
                    if (t)
                        return e(t, null);
                    n.cacheUserData(r);
                    var i = n.signInUserSession.getRefreshToken();
                    if (!i || !i.getToken())
                        return e(null, r);
                    n.refreshSession(i, (function(t, n) {
                        return t ? e(t, null) : e(null, r)
                    }
                    ))
                }
                ));
            else
                try {
                    return e(null, JSON.parse(i))
                } catch (t) {
                    return this.clearCachedUserData(),
                    e(t, null)
                }
        }
        ,
        e.prototype.deleteAttributes = function(e, t) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return t(new Error("User is not authenticated"), null);
            this.client.request("DeleteUserAttributes", {
                UserAttributeNames: e,
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
            }, (function(e) {
                return e ? t(e, null) : t(null, "SUCCESS")
            }
            ))
        }
        ,
        e.prototype.resendConfirmationCode = function(e, t) {
            var n = {
                ClientId: this.pool.getClientId(),
                Username: this.username,
                ClientMetadata: t
            };
            this.client.request("ResendConfirmationCode", n, (function(t, n) {
                return t ? e(t, null) : e(null, n)
            }
            ))
        }
        ,
        e.prototype.getSession = function(e) {
            if (null == this.username)
                return e(new Error("Username is null. Cannot retrieve a new session"), null);
            if (null != this.signInUserSession && this.signInUserSession.isValid())
                return e(null, this.signInUserSession);
            var t = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username
              , n = t + ".idToken"
              , r = t + ".accessToken"
              , i = t + ".refreshToken"
              , o = t + ".clockDrift";
            if (this.storage.getItem(n)) {
                var s = new jn({
                    IdToken: this.storage.getItem(n)
                })
                  , a = new qn({
                    AccessToken: this.storage.getItem(r)
                })
                  , u = new Vn({
                    RefreshToken: this.storage.getItem(i)
                })
                  , c = parseInt(this.storage.getItem(o), 0) || 0
                  , l = new Wn({
                    IdToken: s,
                    AccessToken: a,
                    RefreshToken: u,
                    ClockDrift: c
                });
                if (l.isValid())
                    return this.signInUserSession = l,
                    e(null, this.signInUserSession);
                if (!u.getToken())
                    return e(new Error("Cannot retrieve a new session. Please authenticate."), null);
                this.refreshSession(u, e)
            } else
                e(new Error("Local storage is missing an ID Token, Please authenticate"), null)
        }
        ,
        e.prototype.refreshSession = function(e, t, n) {
            var r = this
              , i = {};
            i.REFRESH_TOKEN = e.getToken();
            var o = "CognitoIdentityServiceProvider." + this.pool.getClientId()
              , s = o + ".LastAuthUser";
            if (this.storage.getItem(s)) {
                this.username = this.storage.getItem(s);
                var a = o + "." + this.username + ".deviceKey";
                this.deviceKey = this.storage.getItem(a),
                i.DEVICE_KEY = this.deviceKey
            }
            var u = {
                ClientId: this.pool.getClientId(),
                AuthFlow: "REFRESH_TOKEN_AUTH",
                AuthParameters: i,
                ClientMetadata: n
            };
            this.getUserContextData() && (u.UserContextData = this.getUserContextData()),
            this.client.request("InitiateAuth", u, (function(n, i) {
                if (n)
                    return "NotAuthorizedException" === n.code && r.clearCachedUser(),
                    t(n, null);
                if (i) {
                    var o = i.AuthenticationResult;
                    return Object.prototype.hasOwnProperty.call(o, "RefreshToken") || (o.RefreshToken = e.getToken()),
                    r.signInUserSession = r.getCognitoUserSession(o),
                    r.cacheTokens(),
                    t(null, r.signInUserSession)
                }
            }
            ))
        }
        ,
        e.prototype.cacheTokens = function() {
            var e = "CognitoIdentityServiceProvider." + this.pool.getClientId()
              , t = e + "." + this.username + ".idToken"
              , n = e + "." + this.username + ".accessToken"
              , r = e + "." + this.username + ".refreshToken"
              , i = e + "." + this.username + ".clockDrift"
              , o = e + ".LastAuthUser";
            this.storage.setItem(t, this.signInUserSession.getIdToken().getJwtToken()),
            this.storage.setItem(n, this.signInUserSession.getAccessToken().getJwtToken()),
            this.storage.setItem(r, this.signInUserSession.getRefreshToken().getToken()),
            this.storage.setItem(i, "" + this.signInUserSession.getClockDrift()),
            this.storage.setItem(o, this.username)
        }
        ,
        e.prototype.cacheUserData = function(e) {
            this.storage.setItem(this.userDataKey, JSON.stringify(e))
        }
        ,
        e.prototype.clearCachedUserData = function() {
            this.storage.removeItem(this.userDataKey)
        }
        ,
        e.prototype.clearCachedUser = function() {
            this.clearCachedTokens(),
            this.clearCachedUserData()
        }
        ,
        e.prototype.cacheDeviceKeyAndPassword = function() {
            var e = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username
              , t = e + ".deviceKey"
              , n = e + ".randomPasswordKey"
              , r = e + ".deviceGroupKey";
            this.storage.setItem(t, this.deviceKey),
            this.storage.setItem(n, this.randomPassword),
            this.storage.setItem(r, this.deviceGroupKey)
        }
        ,
        e.prototype.getCachedDeviceKeyAndPassword = function() {
            var e = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username
              , t = e + ".deviceKey"
              , n = e + ".randomPasswordKey"
              , r = e + ".deviceGroupKey";
            this.storage.getItem(t) && (this.deviceKey = this.storage.getItem(t),
            this.randomPassword = this.storage.getItem(n),
            this.deviceGroupKey = this.storage.getItem(r))
        }
        ,
        e.prototype.clearCachedDeviceKeyAndPassword = function() {
            var e = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username
              , t = e + ".deviceKey"
              , n = e + ".randomPasswordKey"
              , r = e + ".deviceGroupKey";
            this.storage.removeItem(t),
            this.storage.removeItem(n),
            this.storage.removeItem(r)
        }
        ,
        e.prototype.clearCachedTokens = function() {
            var e = "CognitoIdentityServiceProvider." + this.pool.getClientId()
              , t = e + "." + this.username + ".idToken"
              , n = e + "." + this.username + ".accessToken"
              , r = e + "." + this.username + ".refreshToken"
              , i = e + ".LastAuthUser"
              , o = e + "." + this.username + ".clockDrift";
            this.storage.removeItem(t),
            this.storage.removeItem(n),
            this.storage.removeItem(r),
            this.storage.removeItem(i),
            this.storage.removeItem(o)
        }
        ,
        e.prototype.getCognitoUserSession = function(e) {
            var t = new jn(e)
              , n = new qn(e)
              , r = new Vn(e);
            return new Wn({
                IdToken: t,
                AccessToken: n,
                RefreshToken: r
            })
        }
        ,
        e.prototype.forgotPassword = function(e, t) {
            var n = {
                ClientId: this.pool.getClientId(),
                Username: this.username,
                ClientMetadata: t
            };
            this.getUserContextData() && (n.UserContextData = this.getUserContextData()),
            this.client.request("ForgotPassword", n, (function(t, n) {
                return t ? e.onFailure(t) : "function" == typeof e.inputVerificationCode ? e.inputVerificationCode(n) : e.onSuccess(n)
            }
            ))
        }
        ,
        e.prototype.confirmPassword = function(e, t, n, r) {
            var i = {
                ClientId: this.pool.getClientId(),
                Username: this.username,
                ConfirmationCode: e,
                Password: t,
                ClientMetadata: r
            };
            this.getUserContextData() && (i.UserContextData = this.getUserContextData()),
            this.client.request("ConfirmForgotPassword", i, (function(e) {
                return e ? n.onFailure(e) : n.onSuccess()
            }
            ))
        }
        ,
        e.prototype.getAttributeVerificationCode = function(e, t, n) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return t.onFailure(new Error("User is not authenticated"));
            this.client.request("GetUserAttributeVerificationCode", {
                AttributeName: e,
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                ClientMetadata: n
            }, (function(e, n) {
                return e ? t.onFailure(e) : "function" == typeof t.inputVerificationCode ? t.inputVerificationCode(n) : t.onSuccess()
            }
            ))
        }
        ,
        e.prototype.verifyAttribute = function(e, t, n) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return n.onFailure(new Error("User is not authenticated"));
            this.client.request("VerifyUserAttribute", {
                AttributeName: e,
                Code: t,
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
            }, (function(e) {
                return e ? n.onFailure(e) : n.onSuccess("SUCCESS")
            }
            ))
        }
        ,
        e.prototype.getDevice = function(e) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return e.onFailure(new Error("User is not authenticated"));
            this.client.request("GetDevice", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                DeviceKey: this.deviceKey
            }, (function(t, n) {
                return t ? e.onFailure(t) : e.onSuccess(n)
            }
            ))
        }
        ,
        e.prototype.forgetSpecificDevice = function(e, t) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return t.onFailure(new Error("User is not authenticated"));
            this.client.request("ForgetDevice", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                DeviceKey: e
            }, (function(e) {
                return e ? t.onFailure(e) : t.onSuccess("SUCCESS")
            }
            ))
        }
        ,
        e.prototype.forgetDevice = function(e) {
            var t = this;
            this.forgetSpecificDevice(this.deviceKey, {
                onFailure: e.onFailure,
                onSuccess: function(n) {
                    return t.deviceKey = null,
                    t.deviceGroupKey = null,
                    t.randomPassword = null,
                    t.clearCachedDeviceKeyAndPassword(),
                    e.onSuccess(n)
                }
            })
        }
        ,
        e.prototype.setDeviceStatusRemembered = function(e) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return e.onFailure(new Error("User is not authenticated"));
            this.client.request("UpdateDeviceStatus", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                DeviceKey: this.deviceKey,
                DeviceRememberedStatus: "remembered"
            }, (function(t) {
                return t ? e.onFailure(t) : e.onSuccess("SUCCESS")
            }
            ))
        }
        ,
        e.prototype.setDeviceStatusNotRemembered = function(e) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return e.onFailure(new Error("User is not authenticated"));
            this.client.request("UpdateDeviceStatus", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                DeviceKey: this.deviceKey,
                DeviceRememberedStatus: "not_remembered"
            }, (function(t) {
                return t ? e.onFailure(t) : e.onSuccess("SUCCESS")
            }
            ))
        }
        ,
        e.prototype.listDevices = function(e, t, n) {
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return n.onFailure(new Error("User is not authenticated"));
            this.client.request("ListDevices", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                Limit: e,
                PaginationToken: t
            }, (function(e, t) {
                return e ? n.onFailure(e) : n.onSuccess(t)
            }
            ))
        }
        ,
        e.prototype.globalSignOut = function(e) {
            var t = this;
            if (null == this.signInUserSession || !this.signInUserSession.isValid())
                return e.onFailure(new Error("User is not authenticated"));
            this.client.request("GlobalSignOut", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
            }, (function(n) {
                return n ? e.onFailure(n) : (t.clearCachedUser(),
                e.onSuccess("SUCCESS"))
            }
            ))
        }
        ,
        e.prototype.signOut = function() {
            this.signInUserSession = null,
            this.clearCachedUser()
        }
        ,
        e.prototype.sendMFASelectionAnswer = function(e, t) {
            var n = this
              , r = {};
            r.USERNAME = this.username,
            r.ANSWER = e;
            var i = {
                ChallengeName: "SELECT_MFA_TYPE",
                ChallengeResponses: r,
                ClientId: this.pool.getClientId(),
                Session: this.Session
            };
            this.getUserContextData() && (i.UserContextData = this.getUserContextData()),
            this.client.request("RespondToAuthChallenge", i, (function(r, i) {
                return r ? t.onFailure(r) : (n.Session = i.Session,
                "SMS_MFA" === e ? t.mfaRequired(i.challengeName, i.challengeParameters) : "SOFTWARE_TOKEN_MFA" === e ? t.totpRequired(i.challengeName, i.challengeParameters) : void 0)
            }
            ))
        }
        ,
        e.prototype.getUserContextData = function() {
            return this.pool.getUserContextData(this.username)
        }
        ,
        e.prototype.associateSoftwareToken = function(e) {
            var t = this;
            null != this.signInUserSession && this.signInUserSession.isValid() ? this.client.request("AssociateSoftwareToken", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
            }, (function(t, n) {
                return t ? e.onFailure(t) : e.associateSecretCode(n.SecretCode)
            }
            )) : this.client.request("AssociateSoftwareToken", {
                Session: this.Session
            }, (function(n, r) {
                return n ? e.onFailure(n) : (t.Session = r.Session,
                e.associateSecretCode(r.SecretCode))
            }
            ))
        }
        ,
        e.prototype.verifySoftwareToken = function(e, t, n) {
            var r = this;
            null != this.signInUserSession && this.signInUserSession.isValid() ? this.client.request("VerifySoftwareToken", {
                AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
                UserCode: e,
                FriendlyDeviceName: t
            }, (function(e, t) {
                return e ? n.onFailure(e) : n.onSuccess(t)
            }
            )) : this.client.request("VerifySoftwareToken", {
                Session: this.Session,
                UserCode: e,
                FriendlyDeviceName: t
            }, (function(e, t) {
                if (e)
                    return n.onFailure(e);
                r.Session = t.Session;
                var i = {};
                i.USERNAME = r.username;
                var o = {
                    ChallengeName: "MFA_SETUP",
                    ClientId: r.pool.getClientId(),
                    ChallengeResponses: i,
                    Session: r.Session
                };
                r.getUserContextData() && (o.UserContextData = r.getUserContextData()),
                r.client.request("RespondToAuthChallenge", o, (function(e, t) {
                    return e ? n.onFailure(e) : (r.signInUserSession = r.getCognitoUserSession(t.AuthenticationResult),
                    r.cacheTokens(),
                    n.onSuccess(r.signInUserSession))
                }
                ))
            }
            ))
        }
        ,
        e
    }()
      , rr = ir;
    function ir() {}
    ir.prototype.userAgent = "aws-amplify/0.1.x js";
    var or = function() {
        function e(t, n) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.endpoint = n || "https://cognito-idp." + t + ".amazonaws.com/",
            this.userAgent = rr.prototype.userAgent || "aws-amplify/0.1.x js"
        }
        return e.prototype.request = function(e, t, n) {
            var r = {
                headers: {
                    "Content-Type": "application/x-amz-json-1.1",
                    "X-Amz-Target": "AWSCognitoIdentityProviderService." + e,
                    "X-Amz-User-Agent": this.userAgent
                },
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                body: JSON.stringify(t)
            }
              , i = void 0;
            fetch(this.endpoint, r).then((function(e) {
                return i = e,
                e
            }
            ), (function(e) {
                if (e instanceof TypeError)
                    throw new Error("Network error");
                throw e
            }
            )).then((function(e) {
                return e.json().catch((function() {
                    return {}
                }
                ))
            }
            )).then((function(e) {
                if (i.ok)
                    return n(null, e);
                e;
                var t = (e.__type || e.code).split("#").pop()
                  , r = {
                    code: t,
                    name: t,
                    message: e.message || e.Message || null
                };
                return n(r)
            }
            )).catch((function(e) {
                if (!(i && i.headers && i.headers.get("x-amzn-errortype"))) {
                    if (e instanceof Error && "Network error" === e.message) {
                        var t = {
                            code: "NetworkError",
                            name: e.name,
                            message: e.message
                        };
                        return n(t)
                    }
                    return n(e)
                }
                try {
                    var r = i.headers.get("x-amzn-errortype").split(":")[0]
                      , o = {
                        code: r,
                        name: r,
                        statusCode: i.status,
                        message: i.status ? i.status.toString() : null
                    };
                    return n(o)
                } catch (t) {
                    return n(e)
                }
            }
            ))
        }
        ,
        e
    }();
    /*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
    var sr = function() {
        function e(t) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var n = t || {}
              , r = n.UserPoolId
              , i = n.ClientId
              , o = n.endpoint
              , s = n.AdvancedSecurityDataCollectionFlag;
            if (!r || !i)
                throw new Error("Both UserPoolId and ClientId are required.");
            if (!/^[\w-]+_.+$/.test(r))
                throw new Error("Invalid UserPoolId format.");
            var a = r.split("_")[0];
            this.userPoolId = r,
            this.clientId = i,
            this.client = new or(a,o),
            this.advancedSecurityDataCollectionFlag = !1 !== s,
            this.storage = t.Storage || (new tr).getStorage()
        }
        return e.prototype.getUserPoolId = function() {
            return this.userPoolId
        }
        ,
        e.prototype.getClientId = function() {
            return this.clientId
        }
        ,
        e.prototype.signUp = function(e, t, n, r, i, o) {
            var s = this
              , a = {
                ClientId: this.clientId,
                Username: e,
                Password: t,
                UserAttributes: n,
                ValidationData: r,
                ClientMetadata: o
            };
            this.getUserContextData(e) && (a.UserContextData = this.getUserContextData(e)),
            this.client.request("SignUp", a, (function(t, n) {
                if (t)
                    return i(t, null);
                var r = {
                    Username: e,
                    Pool: s,
                    Storage: s.storage
                }
                  , o = {
                    user: new nr(r),
                    userConfirmed: n.UserConfirmed,
                    userSub: n.UserSub,
                    codeDeliveryDetails: n.CodeDeliveryDetails
                };
                return i(null, o)
            }
            ))
        }
        ,
        e.prototype.getCurrentUser = function() {
            var e = "CognitoIdentityServiceProvider." + this.clientId + ".LastAuthUser"
              , t = this.storage.getItem(e);
            if (t) {
                var n = {
                    Username: t,
                    Pool: this,
                    Storage: this.storage
                };
                return new nr(n)
            }
            return null
        }
        ,
        e.prototype.getUserContextData = function(e) {
            if ("undefined" != typeof AmazonCognitoAdvancedSecurityData) {
                var t = AmazonCognitoAdvancedSecurityData;
                if (this.advancedSecurityDataCollectionFlag) {
                    var n = t.getData(e, this.userPoolId, this.clientId);
                    if (n)
                        return {
                            EncodedData: n
                        }
                }
                return {}
            }
        }
        ,
        e
    }()
      , ar = n(8);
    var ur, cr = function() {
        function e(t) {
            if (function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            !t.domain)
                throw new Error("The domain of cookieStorage can not be undefined.");
            this.domain = t.domain,
            t.path ? this.path = t.path : this.path = "/",
            Object.prototype.hasOwnProperty.call(t, "expires") ? this.expires = t.expires : this.expires = 365,
            Object.prototype.hasOwnProperty.call(t, "secure") ? this.secure = t.secure : this.secure = !0
        }
        return e.prototype.setItem = function(e, t) {
            return ar.set(e, t, {
                path: this.path,
                expires: this.expires,
                domain: this.domain,
                secure: this.secure
            }),
            ar.get(e)
        }
        ,
        e.prototype.getItem = function(e) {
            return ar.get(e)
        }
        ,
        e.prototype.removeItem = function(e) {
            return ar.remove(e, {
                path: this.path,
                domain: this.domain,
                secure: this.secure
            })
        }
        ,
        e.prototype.clear = function() {
            var e = ar.get()
              , t = void 0;
            for (t = 0; t < e.length; ++t)
                ar.remove(e[t]);
            return {}
        }
        ,
        e
    }(), lr = n(6), hr = function(e) {
        var t = window.open(e, "_self");
        return t ? Promise.resolve(t) : Promise.reject()
    }, fr = function() {
        return (fr = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }
        ).apply(this, arguments)
    }, dr = function(e, t, n, r) {
        return new (n || (n = Promise))((function(i, o) {
            function s(e) {
                try {
                    u(r.next(e))
                } catch (e) {
                    o(e)
                }
            }
            function a(e) {
                try {
                    u(r.throw(e))
                } catch (e) {
                    o(e)
                }
            }
            function u(e) {
                var t;
                e.done ? i(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(s, a)
            }
            u((r = r.apply(e, t || [])).next())
        }
        ))
    }, pr = function(e, t) {
        var n, r, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0])
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }
        ),
        o;
        function a(o) {
            return function(a) {
                return function(o) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; s; )
                        try {
                            if (n = 1,
                            r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                            0) : r.next) && !(i = i.call(r, o[1])).done)
                                return i;
                            switch (r = 0,
                            i && (o = [2 & o[0], i.value]),
                            o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++,
                                {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++,
                                r = o[1],
                                o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(),
                                s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys,
                                (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1],
                                    i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2],
                                    s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(),
                                s.trys.pop();
                                continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e],
                            r = 0
                        } finally {
                            n = i = 0
                        }
                    if (5 & o[0])
                        throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, a])
            }
        }
    }, gr = n(16), mr = n(17), yr = "undefined" != typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("amplify_default") : "@@amplify_default", vr = function(e, t, n) {
        Je.dispatch("auth", {
            event: e,
            data: t,
            message: n
        }, "Auth", yr)
    }, br = new Fe("OAuth"), wr = function() {
        function e(e) {
            var t = e.config
              , n = e.cognitoClientId
              , r = e.scopes
              , i = void 0 === r ? [] : r;
            this._urlOpener = t.urlOpener || hr,
            this._config = t,
            this._cognitoClientId = n,
            this._scopes = i
        }
        return e.prototype.oauthSignIn = function(e, t, n, r, i, o) {
            void 0 === e && (e = "code"),
            void 0 === i && (i = $t.Cognito);
            var s = this._generateState(32)
              , a = o ? s + "-" + o : s;
            !function(e) {
                window.sessionStorage.setItem("oauth_state", e)
            }(encodeURIComponent(a));
            var u, c = this._generateRandom(128);
            u = c,
            window.sessionStorage.setItem("ouath_pkce_key", u);
            var l = this._generateChallenge(c)
              , h = "https://" + t + "/oauth2/authorize?" + Object.entries(fr(fr({
                redirect_uri: n,
                response_type: e,
                client_id: r,
                identity_provider: i,
                scopes: this._scopes,
                state: a
            }, "code" === e ? {
                code_challenge: l
            } : {}), "code" === e ? {
                code_challenge_method: "S256"
            } : {})).map((function(e) {
                var t = e[0]
                  , n = e[1];
                return encodeURIComponent(t) + "=" + encodeURIComponent(n)
            }
            )).join("&");
            br.debug("Redirecting to " + h),
            this._urlOpener(h, n)
        }
        ,
        e.prototype._handleCodeFlow = function(e) {
            return dr(this, void 0, void 0, (function() {
                var t, n, r, i, o, s, a, u, c, l, h, f;
                return pr(this, (function(d) {
                    switch (d.label) {
                    case 0:
                        return (t = (Object(lr.parse)(e).query || "").split("&").map((function(e) {
                            return e.split("=")
                        }
                        )).reduce((function(e, t) {
                            var n, r = t[0], i = t[1];
                            return fr(fr({}, e), ((n = {})[r] = i,
                            n))
                        }
                        ), {
                            code: void 0
                        }).code) ? (n = "https://" + this._config.domain + "/oauth2/token",
                        vr("codeFlow", {}, "Retrieving tokens from " + n),
                        r = ln(this._config) ? this._cognitoClientId : this._config.clientID,
                        i = ln(this._config) ? this._config.redirectSignIn : this._config.redirectUri,
                        p = window.sessionStorage.getItem("ouath_pkce_key"),
                        window.sessionStorage.removeItem("ouath_pkce_key"),
                        s = fr({
                            grant_type: "authorization_code",
                            code: t,
                            client_id: r,
                            redirect_uri: i
                        }, (o = p) ? {
                            code_verifier: o
                        } : {}),
                        br.debug("Calling token endpoint: " + n + " with", s),
                        a = Object.entries(s).map((function(e) {
                            var t = e[0]
                              , n = e[1];
                            return encodeURIComponent(t) + "=" + encodeURIComponent(n)
                        }
                        )).join("&"),
                        [4, fetch(n, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: a
                        })]) : [2];
                    case 1:
                        return [4, d.sent().json()];
                    case 2:
                        if (u = d.sent(),
                        c = u.access_token,
                        l = u.refresh_token,
                        h = u.id_token,
                        f = u.error)
                            throw new Error(f);
                        return [2, {
                            accessToken: c,
                            refreshToken: l,
                            idToken: h
                        }]
                    }
                    var p
                }
                ))
            }
            ))
        }
        ,
        e.prototype._handleImplicitFlow = function(e) {
            return dr(this, void 0, void 0, (function() {
                var t, n, r;
                return pr(this, (function(i) {
                    return t = Object(lr.parse)(e).hash.substr(1).split("&").map((function(e) {
                        return e.split("=")
                    }
                    )).reduce((function(e, t) {
                        var n, r = t[0], i = t[1];
                        return fr(fr({}, e), ((n = {})[r] = i,
                        n))
                    }
                    ), {
                        id_token: void 0,
                        access_token: void 0
                    }),
                    n = t.id_token,
                    r = t.access_token,
                    vr("implicitFlow", {}, "Got tokens from " + e),
                    br.debug("Retrieving implicit tokens from " + e + " with"),
                    [2, {
                        accessToken: r,
                        idToken: n,
                        refreshToken: null
                    }]
                }
                ))
            }
            ))
        }
        ,
        e.prototype.handleAuthResponse = function(e) {
            return dr(this, void 0, void 0, (function() {
                var t, n, r, i, o, s, a;
                return pr(this, (function(u) {
                    switch (u.label) {
                    case 0:
                        if (u.trys.push([0, 5, , 6]),
                        t = e ? fr(fr({}, (Object(lr.parse)(e).hash || "#").substr(1).split("&").map((function(e) {
                            return e.split("=")
                        }
                        )).reduce((function(e, t) {
                            var n = t[0]
                              , r = t[1];
                            return e[n] = r,
                            e
                        }
                        ), {})), (Object(lr.parse)(e).query || "").split("&").map((function(e) {
                            return e.split("=")
                        }
                        )).reduce((function(e, t) {
                            var n = t[0]
                              , r = t[1];
                            return e[n] = r,
                            e
                        }
                        ), {})) : {},
                        n = t.error,
                        r = t.error_description,
                        n)
                            throw new Error(r);
                        return i = this._validateState(t),
                        br.debug("Starting " + this._config.responseType + " flow with " + e),
                        "code" !== this._config.responseType ? [3, 2] : (o = [{}],
                        [4, this._handleCodeFlow(e)]);
                    case 1:
                        return [2, fr.apply(void 0, [fr.apply(void 0, o.concat([u.sent()])), {
                            state: i
                        }])];
                    case 2:
                        return s = [{}],
                        [4, this._handleImplicitFlow(e)];
                    case 3:
                        return [2, fr.apply(void 0, [fr.apply(void 0, s.concat([u.sent()])), {
                            state: i
                        }])];
                    case 4:
                        return [3, 6];
                    case 5:
                        throw a = u.sent(),
                        br.error("Error handling auth response.", a),
                        a;
                    case 6:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype._validateState = function(e) {
            if (e) {
                var t, n = (t = window.sessionStorage.getItem("oauth_state"),
                window.sessionStorage.removeItem("oauth_state"),
                t), r = e.state;
                if (n && n !== r)
                    throw new Error("Invalid state in OAuth flow");
                return r
            }
        }
        ,
        e.prototype.signOut = function() {
            return dr(this, void 0, void 0, (function() {
                var e, t, n;
                return pr(this, (function(r) {
                    return e = "https://" + this._config.domain + "/logout?",
                    t = ln(this._config) ? this._cognitoClientId : this._config.oauth.clientID,
                    n = ln(this._config) ? this._config.redirectSignOut : this._config.returnTo,
                    e += Object.entries({
                        client_id: t,
                        logout_uri: encodeURIComponent(n)
                    }).map((function(e) {
                        return e[0] + "=" + e[1]
                    }
                    )).join("&"),
                    vr("oAuthSignOut", {
                        oAuth: "signOut"
                    }, "Signing out from " + e),
                    br.debug("Signing out from " + e),
                    [2, this._urlOpener(e)]
                }
                ))
            }
            ))
        }
        ,
        e.prototype._generateState = function(e) {
            for (var t = "", n = e, r = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; n > 0; --n)
                t += r[Math.round(Math.random() * (r.length - 1))];
            return t
        }
        ,
        e.prototype._generateChallenge = function(e) {
            return this._base64URL(gr(e))
        }
        ,
        e.prototype._base64URL = function(e) {
            return e.toString(mr).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
        }
        ,
        e.prototype._generateRandom = function(e) {
            var t = new Uint8Array(e);
            if ("undefined" != typeof window && window.crypto)
                window.crypto.getRandomValues(t);
            else
                for (var n = 0; n < e; n += 1)
                    t[n] = Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~".length | 0;
            return this._bufferToString(t)
        }
        ,
        e.prototype._bufferToString = function(e) {
            for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = [], r = 0; r < e.byteLength; r += 1) {
                var i = e[r] % t.length;
                n.push(t[i])
            }
            return n.join("")
        }
        ,
        e
    }(), Sr = function() {
        var e = function(t, n) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            )(t, n)
        };
        return function(t, n) {
            function r() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
            new r)
        }
    }(), Er = new Fe("AuthError"), _r = function(e) {
        function t(n) {
            var r = this
              , i = Cr[n]
              , o = i.message
              , s = i.log;
            return (r = e.call(this, o) || this).constructor = t,
            Object.setPrototypeOf(r, t.prototype),
            r.name = "AuthError",
            r.log = s || o,
            Er.error(r.log),
            r
        }
        return Sr(t, e),
        t
    }(Error), Ar = function(e) {
        function t(n) {
            var r = e.call(this, n) || this;
            return r.constructor = t,
            Object.setPrototypeOf(r, t.prototype),
            r.name = "NoUserPoolError",
            r
        }
        return Sr(t, e),
        t
    }(_r), Cr = {
        noConfig: {
            message: "Authentication Error",
            log: "\n            Error: Amplify has not been configured correctly.\n            This error is typically caused by one of the following scenarios:\n\n            1. Make sure you're passing the awsconfig object to Amplify.configure() in your app's entry point\n                See https://aws-amplify.github.io/docs/js/authentication#configure-your-app for more information\n            \n            2. There might be multiple conflicting versions of aws-amplify or amplify packages in your node_modules.\n                Try deleting your node_modules folder and reinstalling the dependencies with `yarn install`\n        "
        },
        missingAuthConfig: {
            message: "Authentication Error",
            log: "\n            Error: Amplify has not been configured correctly. \n            The configuration object is missing required auth properties. \n            Did you run `amplify push` after adding auth via `amplify add auth`?\n            See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup for more information\n        "
        },
        emptyUsername: {
            message: "Username cannot be empty"
        },
        invalidUsername: {
            message: "The username should either be a string or one of the sign in types"
        },
        emptyPassword: {
            message: "Password cannot be empty"
        },
        emptyCode: {
            message: "Confirmation code cannot be empty"
        },
        signUpError: {
            message: "Error creating account",
            log: "The first parameter should either be non-null string or object"
        },
        noMFA: {
            message: "No valid MFA method provided"
        },
        invalidMFA: {
            message: "Invalid MFA type"
        },
        emptyChallengeResponse: {
            message: "Challenge response cannot be empty"
        },
        noUserSession: {
            message: "Failed to get the session because the user is empty"
        },
        default: {
            message: "Authentication Error"
        }
    }, Ir = function(e, t, n, r) {
        return new (n || (n = Promise))((function(i, o) {
            function s(e) {
                try {
                    u(r.next(e))
                } catch (e) {
                    o(e)
                }
            }
            function a(e) {
                try {
                    u(r.throw(e))
                } catch (e) {
                    o(e)
                }
            }
            function u(e) {
                var t;
                e.done ? i(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(s, a)
            }
            u((r = r.apply(e, t || [])).next())
        }
        ))
    }, Tr = function(e, t) {
        var n, r, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0])
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }
        ),
        o;
        function a(o) {
            return function(a) {
                return function(o) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; s; )
                        try {
                            if (n = 1,
                            r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                            0) : r.next) && !(i = i.call(r, o[1])).done)
                                return i;
                            switch (r = 0,
                            i && (o = [2 & o[0], i.value]),
                            o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++,
                                {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++,
                                r = o[1],
                                o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(),
                                s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys,
                                (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1],
                                    i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2],
                                    s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(),
                                s.trys.pop();
                                continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e],
                            r = 0
                        } finally {
                            n = i = 0
                        }
                    if (5 & o[0])
                        throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, a])
            }
        }
    }, kr = new Fe("AuthClass"), xr = "undefined" != typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("amplify_default") : "@@amplify_default", Pr = function(e, t, n) {
        Je.dispatch("auth", {
            event: e,
            data: t,
            message: n
        }, "Auth", xr)
    };
    !function(e) {
        e.Cognito = "COGNITO",
        e.Google = "Google",
        e.Facebook = "Facebook",
        e.Amazon = "LoginWithAmazon"
    }(ur || (ur = {}));
    var Rr = function() {
        function e(e) {
            var t = this;
            this.userPool = null,
            this.user = null,
            this.configure(e),
            this.currentUserCredentials = this.currentUserCredentials.bind(this),
            Le.config ? Le.config.update({
                customUserAgent: Jt.userAgent
            }) : kr.warn("No AWS.config"),
            Je.listen("auth", (function(e) {
                switch (e.payload.event) {
                case "signIn":
                    t._storage.setItem("amplify-signin-with-hostedUI", "false");
                    break;
                case "signOut":
                    t._storage.removeItem("amplify-signin-with-hostedUI");
                    break;
                case "cognitoHostedUI":
                    t._storage.setItem("amplify-signin-with-hostedUI", "true")
                }
            }
            ))
        }
        return e.prototype.getModuleName = function() {
            return "Auth"
        }
        ,
        e.prototype.configure = function(e) {
            var t = this;
            if (!e)
                return this._config || {};
            kr.debug("configure Auth");
            var n = Object.assign({}, this._config, Et.parseMobilehubConfig(e).Auth, e);
            this._config = n;
            var r = this._config
              , i = r.userPoolId
              , o = r.userPoolWebClientId
              , s = r.cookieStorage
              , a = r.oauth
              , u = r.region
              , c = r.identityPoolId
              , l = r.mandatorySignIn
              , h = r.refreshHandlers
              , f = r.identityPoolRegion
              , d = r.clientMetadata;
            if (this._config.storage) {
                if (!this._isValidAuthStorage(this._config.storage))
                    throw kr.error("The storage in the Auth config is not valid!"),
                    new Error("Empty storage object");
                this._storage = this._config.storage
            } else
                this._storage = s ? new cr(s) : (new qt).getStorage();
            if (this._storageSync = Promise.resolve(),
            "function" == typeof this._storage.sync && (this._storageSync = this._storage.sync()),
            i) {
                var p = {
                    UserPoolId: i,
                    ClientId: o
                };
                p.Storage = this._storage,
                this.userPool = new sr(p)
            }
            Vt.configure({
                mandatorySignIn: l,
                region: f || u,
                userPoolId: i,
                identityPoolId: c,
                refreshHandlers: h,
                storage: this._storage
            });
            var g = a ? ln(this._config.oauth) ? a : a.awsCognito : void 0;
            if (g) {
                var m = Object.assign({
                    cognitoClientId: o,
                    UserPoolId: i,
                    domain: g.domain,
                    scopes: g.scope,
                    redirectSignIn: g.redirectSignIn,
                    redirectSignOut: g.redirectSignOut,
                    responseType: g.responseType,
                    Storage: this._storage,
                    urlOpener: g.urlOpener,
                    clientMetadata: d
                }, g.options);
                this._oAuthHandler = new wr({
                    scopes: m.scopes,
                    config: m,
                    cognitoClientId: m.cognitoClientId
                });
                var y = {};
                !function(e) {
                    if (nt.a.browserOrNode().isBrowser && window.location)
                        e({
                            url: window.location.href
                        });
                    else if (!nt.a.browserOrNode().isNode)
                        throw new Error("Not supported")
                }((function(e) {
                    var n = e.url;
                    y[n] || (y[n] = !0,
                    t._handleAuthResponse(n))
                }
                ))
            }
            return Pr("configured", null, "The Auth category has been configured successfully"),
            this._config
        }
        ,
        e.prototype.signUp = function(e) {
            for (var t = this, n = [], r = 1; r < arguments.length; r++)
                n[r - 1] = arguments[r];
            if (!this.userPool)
                return this.rejectNoUserPool();
            var i, o = null, s = null, a = [], u = null;
            if (e && "string" == typeof e) {
                o = e,
                s = n ? n[0] : null;
                var c = n ? n[1] : null
                  , l = n ? n[2] : null;
                c && a.push({
                    Name: "email",
                    Value: c
                }),
                l && a.push({
                    Name: "phone_number",
                    Value: l
                })
            } else {
                if (!e || "object" != typeof e)
                    return this.rejectAuthError(Zt.SignUpError);
                o = e.username,
                s = e.password,
                e && e.clientMetadata ? i = e.clientMetadata : this._config.clientMetadata && (i = this._config.clientMetadata);
                var h = e.attributes;
                h && Object.keys(h).map((function(e) {
                    var t = {
                        Name: e,
                        Value: h[e]
                    };
                    a.push(t)
                }
                )),
                u = e.validationData || null
            }
            return o ? s ? (kr.debug("signUp attrs:", a),
            kr.debug("signUp validation data:", u),
            new Promise((function(e, n) {
                t.userPool.signUp(o, s, a, u, (function(t, r) {
                    t ? (Pr("signUp_failure", t, o + " failed to signup"),
                    n(t)) : (Pr("signUp", r, o + " has signed up successfully"),
                    e(r))
                }
                ), i)
            }
            ))) : this.rejectAuthError(Zt.EmptyPassword) : this.rejectAuthError(Zt.EmptyUsername)
        }
        ,
        e.prototype.confirmSignUp = function(e, t, n) {
            if (!this.userPool)
                return this.rejectNoUserPool();
            if (!e)
                return this.rejectAuthError(Zt.EmptyUsername);
            if (!t)
                return this.rejectAuthError(Zt.EmptyCode);
            var r, i = this.createCognitoUser(e), o = !n || "boolean" != typeof n.forceAliasCreation || n.forceAliasCreation;
            return n && n.clientMetadata ? r = n.clientMetadata : this._config.clientMetadata && (r = this._config.clientMetadata),
            new Promise((function(e, n) {
                i.confirmRegistration(t, o, (function(t, r) {
                    t ? n(t) : e(r)
                }
                ), r)
            }
            ))
        }
        ,
        e.prototype.resendSignUp = function(e, t) {
            if (void 0 === t && (t = this._config.clientMetadata),
            !this.userPool)
                return this.rejectNoUserPool();
            if (!e)
                return this.rejectAuthError(Zt.EmptyUsername);
            var n = this.createCognitoUser(e);
            return new Promise((function(e, r) {
                n.resendConfirmationCode((function(t, n) {
                    t ? r(t) : e(n)
                }
                ), t)
            }
            ))
        }
        ,
        e.prototype.signIn = function(e, t, n) {
            if (void 0 === n && (n = this._config.clientMetadata),
            !this.userPool)
                return this.rejectNoUserPool();
            var r = null
              , i = null
              , o = {};
            if ("string" == typeof e)
                r = e,
                i = t;
            else {
                if (!e.username)
                    return this.rejectAuthError(Zt.InvalidUsername);
                void 0 !== t && kr.warn("The password should be defined under the first parameter object!"),
                r = e.username,
                i = e.password,
                o = e.validationData
            }
            if (!r)
                return this.rejectAuthError(Zt.EmptyUsername);
            var s = new fn({
                Username: r,
                Password: i,
                ValidationData: o,
                ClientMetadata: n
            });
            return i ? this.signInWithPassword(s) : this.signInWithoutPassword(s)
        }
        ,
        e.prototype.authCallbacks = function(e, t, n) {
            var r = this
              , i = this;
            return {
                onSuccess: function(o) {
                    return Ir(r, void 0, void 0, (function() {
                        var r, s, a, u;
                        return Tr(this, (function(c) {
                            switch (c.label) {
                            case 0:
                                kr.debug(o),
                                delete e.challengeName,
                                delete e.challengeParam,
                                c.label = 1;
                            case 1:
                                return c.trys.push([1, 4, 5, 9]),
                                [4, Vt.clear()];
                            case 2:
                                return c.sent(),
                                [4, Vt.set(o, "session")];
                            case 3:
                                return r = c.sent(),
                                kr.debug("succeed to get cognito credentials", r),
                                [3, 9];
                            case 4:
                                return s = c.sent(),
                                kr.debug("cannot get cognito credentials", s),
                                [3, 9];
                            case 5:
                                return c.trys.push([5, 7, , 8]),
                                [4, this.currentUserPoolUser()];
                            case 6:
                                return a = c.sent(),
                                i.user = a,
                                Pr("signIn", a, "A user " + e.getUsername() + " has been signed in"),
                                t(a),
                                [3, 8];
                            case 7:
                                return u = c.sent(),
                                kr.error("Failed to get the signed in user", u),
                                n(u),
                                [3, 8];
                            case 8:
                                return [7];
                            case 9:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                },
                onFailure: function(t) {
                    kr.debug("signIn failure", t),
                    Pr("signIn_failure", t, e.getUsername() + " failed to signin"),
                    n(t)
                },
                customChallenge: function(n) {
                    kr.debug("signIn custom challenge answer required"),
                    e.challengeName = "CUSTOM_CHALLENGE",
                    e.challengeParam = n,
                    t(e)
                },
                mfaRequired: function(n, r) {
                    kr.debug("signIn MFA required"),
                    e.challengeName = n,
                    e.challengeParam = r,
                    t(e)
                },
                mfaSetup: function(n, r) {
                    kr.debug("signIn mfa setup", n),
                    e.challengeName = n,
                    e.challengeParam = r,
                    t(e)
                },
                newPasswordRequired: function(n, r) {
                    kr.debug("signIn new password"),
                    e.challengeName = "NEW_PASSWORD_REQUIRED",
                    e.challengeParam = {
                        userAttributes: n,
                        requiredAttributes: r
                    },
                    t(e)
                },
                totpRequired: function(n, r) {
                    kr.debug("signIn totpRequired"),
                    e.challengeName = n,
                    e.challengeParam = r,
                    t(e)
                },
                selectMFAType: function(n, r) {
                    kr.debug("signIn selectMFAType", n),
                    e.challengeName = n,
                    e.challengeParam = r,
                    t(e)
                }
            }
        }
        ,
        e.prototype.signInWithPassword = function(e) {
            var t = this
              , n = this.createCognitoUser(e.getUsername());
            return new Promise((function(r, i) {
                n.authenticateUser(e, t.authCallbacks(n, r, i))
            }
            ))
        }
        ,
        e.prototype.signInWithoutPassword = function(e) {
            var t = this
              , n = this.createCognitoUser(e.getUsername());
            return n.setAuthenticationFlowType("CUSTOM_AUTH"),
            new Promise((function(r, i) {
                n.initiateAuth(e, t.authCallbacks(n, r, i))
            }
            ))
        }
        ,
        e.prototype.getMFAOptions = function(e) {
            return new Promise((function(t, n) {
                e.getMFAOptions((function(e, r) {
                    if (e)
                        return kr.debug("get MFA Options failed", e),
                        void n(e);
                    kr.debug("get MFA options success", r),
                    t(r)
                }
                ))
            }
            ))
        }
        ,
        e.prototype.getPreferredMFA = function(e, t) {
            var n = this;
            return new Promise((function(r, i) {
                var o = !!t && t.bypassCache;
                e.getUserData((function(e, t) {
                    if (e)
                        return kr.debug("getting preferred mfa failed", e),
                        void i(e);
                    var o = n._getMfaTypeFromUserData(t);
                    return o ? void r(o) : void i("invalid MFA Type")
                }
                ), {
                    bypassCache: o
                })
            }
            ))
        }
        ,
        e.prototype._getMfaTypeFromUserData = function(e) {
            var t = null
              , n = e.PreferredMfaSetting;
            if (n)
                t = n;
            else {
                var r = e.UserMFASettingList;
                if (r)
                    0 === r.length ? t = "NOMFA" : kr.debug("invalid case for getPreferredMFA", e);
                else
                    t = e.MFAOptions ? "SMS_MFA" : "NOMFA"
            }
            return t
        }
        ,
        e.prototype._getUserData = function(e, t) {
            return new Promise((function(n, r) {
                e.getUserData((function(e, t) {
                    return e ? (kr.debug("getting user data failed", e),
                    void r(e)) : void n(t)
                }
                ), t)
            }
            ))
        }
        ,
        e.prototype.setPreferredMFA = function(e, t) {
            return Ir(this, void 0, void 0, (function() {
                var n, r, i, o, s;
                return Tr(this, (function(a) {
                    switch (a.label) {
                    case 0:
                        return [4, this._getUserData(e, {
                            bypassCache: !0
                        })];
                    case 1:
                        switch (n = a.sent(),
                        r = null,
                        i = null,
                        t) {
                        case "TOTP":
                            return [3, 2];
                        case "SMS":
                            return [3, 3];
                        case "NOMFA":
                            return [3, 4]
                        }
                        return [3, 6];
                    case 2:
                        return i = {
                            PreferredMfa: !0,
                            Enabled: !0
                        },
                        [3, 7];
                    case 3:
                        return r = {
                            PreferredMfa: !0,
                            Enabled: !0
                        },
                        [3, 7];
                    case 4:
                        return o = n.UserMFASettingList,
                        [4, this._getMfaTypeFromUserData(n)];
                    case 5:
                        if ("NOMFA" === (s = a.sent()))
                            return [2, Promise.resolve("No change for mfa type")];
                        if ("SMS_MFA" === s)
                            r = {
                                PreferredMfa: !1,
                                Enabled: !1
                            };
                        else {
                            if ("SOFTWARE_TOKEN_MFA" !== s)
                                return [2, this.rejectAuthError(Zt.InvalidMFA)];
                            i = {
                                PreferredMfa: !1,
                                Enabled: !1
                            }
                        }
                        return o && 0 !== o.length && o.forEach((function(e) {
                            "SMS_MFA" === e ? r = {
                                PreferredMfa: !1,
                                Enabled: !1
                            } : "SOFTWARE_TOKEN_MFA" === e && (i = {
                                PreferredMfa: !1,
                                Enabled: !1
                            })
                        }
                        )),
                        [3, 7];
                    case 6:
                        return kr.debug("no validmfa method provided"),
                        [2, this.rejectAuthError(Zt.NoMFA)];
                    case 7:
                        return this,
                        [2, new Promise((function(t, n) {
                            e.setUserMfaPreference(r, i, (function(r, i) {
                                if (r)
                                    return kr.debug("Set user mfa preference error", r),
                                    n(r);
                                kr.debug("Set user mfa success", i),
                                kr.debug("Caching the latest user data into local"),
                                e.getUserData((function(e, r) {
                                    return e ? (kr.debug("getting user data failed", e),
                                    n(e)) : t(i)
                                }
                                ), {
                                    bypassCache: !0
                                })
                            }
                            ))
                        }
                        ))]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.disableSMS = function(e) {
            return new Promise((function(t, n) {
                e.disableMFA((function(e, r) {
                    if (e)
                        return kr.debug("disable mfa failed", e),
                        void n(e);
                    kr.debug("disable mfa succeed", r),
                    t(r)
                }
                ))
            }
            ))
        }
        ,
        e.prototype.enableSMS = function(e) {
            return new Promise((function(t, n) {
                e.enableMFA((function(e, r) {
                    if (e)
                        return kr.debug("enable mfa failed", e),
                        void n(e);
                    kr.debug("enable mfa succeed", r),
                    t(r)
                }
                ))
            }
            ))
        }
        ,
        e.prototype.setupTOTP = function(e) {
            return new Promise((function(t, n) {
                e.associateSoftwareToken({
                    onFailure: function(e) {
                        kr.debug("associateSoftwareToken failed", e),
                        n(e)
                    },
                    associateSecretCode: function(e) {
                        kr.debug("associateSoftwareToken sucess", e),
                        t(e)
                    }
                })
            }
            ))
        }
        ,
        e.prototype.verifyTotpToken = function(e, t) {
            return kr.debug("verfication totp token", e, t),
            new Promise((function(n, r) {
                e.verifySoftwareToken(t, "My TOTP device", {
                    onFailure: function(e) {
                        kr.debug("verifyTotpToken failed", e),
                        r(e)
                    },
                    onSuccess: function(e) {
                        kr.debug("verifyTotpToken success", e),
                        n(e)
                    }
                })
            }
            ))
        }
        ,
        e.prototype.confirmSignIn = function(e, t, n, r) {
            var i = this;
            if (void 0 === r && (r = this._config.clientMetadata),
            !t)
                return this.rejectAuthError(Zt.EmptyCode);
            var o = this;
            return new Promise((function(s, a) {
                e.sendMFACode(t, {
                    onSuccess: function(t) {
                        return Ir(i, void 0, void 0, (function() {
                            var n, r;
                            return Tr(this, (function(i) {
                                switch (i.label) {
                                case 0:
                                    kr.debug(t),
                                    i.label = 1;
                                case 1:
                                    return i.trys.push([1, 4, 5, 6]),
                                    [4, Vt.clear()];
                                case 2:
                                    return i.sent(),
                                    [4, Vt.set(t, "session")];
                                case 3:
                                    return n = i.sent(),
                                    kr.debug("succeed to get cognito credentials", n),
                                    [3, 6];
                                case 4:
                                    return r = i.sent(),
                                    kr.debug("cannot get cognito credentials", r),
                                    [3, 6];
                                case 5:
                                    return o.user = e,
                                    Pr("signIn", e, e + " has signed in"),
                                    s(e),
                                    [7];
                                case 6:
                                    return [2]
                                }
                            }
                            ))
                        }
                        ))
                    },
                    onFailure: function(e) {
                        kr.debug("confirm signIn failure", e),
                        a(e)
                    }
                }, n, r)
            }
            ))
        }
        ,
        e.prototype.completeNewPassword = function(e, t, n, r) {
            var i = this;
            if (void 0 === r && (r = this._config.clientMetadata),
            !t)
                return this.rejectAuthError(Zt.EmptyPassword);
            var o = this;
            return new Promise((function(s, a) {
                e.completeNewPasswordChallenge(t, n, {
                    onSuccess: function(t) {
                        return Ir(i, void 0, void 0, (function() {
                            var n, r;
                            return Tr(this, (function(i) {
                                switch (i.label) {
                                case 0:
                                    kr.debug(t),
                                    i.label = 1;
                                case 1:
                                    return i.trys.push([1, 4, 5, 6]),
                                    [4, Vt.clear()];
                                case 2:
                                    return i.sent(),
                                    [4, Vt.set(t, "session")];
                                case 3:
                                    return n = i.sent(),
                                    kr.debug("succeed to get cognito credentials", n),
                                    [3, 6];
                                case 4:
                                    return r = i.sent(),
                                    kr.debug("cannot get cognito credentials", r),
                                    [3, 6];
                                case 5:
                                    return o.user = e,
                                    Pr("signIn", e, e + " has signed in"),
                                    s(e),
                                    [7];
                                case 6:
                                    return [2]
                                }
                            }
                            ))
                        }
                        ))
                    },
                    onFailure: function(e) {
                        kr.debug("completeNewPassword failure", e),
                        Pr("completeNewPassword_failure", e, i.user + " failed to complete the new password flow"),
                        a(e)
                    },
                    mfaRequired: function(t, n) {
                        kr.debug("signIn MFA required"),
                        e.challengeName = t,
                        e.challengeParam = n,
                        s(e)
                    },
                    mfaSetup: function(t, n) {
                        kr.debug("signIn mfa setup", t),
                        e.challengeName = t,
                        e.challengeParam = n,
                        s(e)
                    }
                }, r)
            }
            ))
        }
        ,
        e.prototype.sendCustomChallengeAnswer = function(e, t, n) {
            var r = this;
            if (void 0 === n && (n = this._config.clientMetadata),
            !this.userPool)
                return this.rejectNoUserPool();
            if (!t)
                return this.rejectAuthError(Zt.EmptyChallengeResponse);
            return new Promise((function(i, o) {
                e.sendCustomChallengeAnswer(t, r.authCallbacks(e, i, o), n)
            }
            ))
        }
        ,
        e.prototype.updateUserAttributes = function(e, t, n) {
            void 0 === n && (n = this._config.clientMetadata);
            var r = []
              , i = this;
            return new Promise((function(o, s) {
                i.userSession(e).then((function(i) {
                    for (var a in t)
                        if ("sub" !== a && a.indexOf("_verified") < 0) {
                            var u = {
                                Name: a,
                                Value: t[a]
                            };
                            r.push(u)
                        }
                    e.updateAttributes(r, (function(e, t) {
                        return e ? s(e) : o(t)
                    }
                    ), n)
                }
                ))
            }
            ))
        }
        ,
        e.prototype.userAttributes = function(e) {
            var t = this;
            return new Promise((function(n, r) {
                t.userSession(e).then((function(t) {
                    e.getUserAttributes((function(e, t) {
                        e ? r(e) : n(t)
                    }
                    ))
                }
                ))
            }
            ))
        }
        ,
        e.prototype.verifiedContact = function(e) {
            var t = this;
            return this.userAttributes(e).then((function(e) {
                var n = t.attributesToObject(e)
                  , r = {}
                  , i = {};
                return n.email && (n.email_verified ? i.email = n.email : r.email = n.email),
                n.phone_number && (n.phone_number_verified ? i.phone_number = n.phone_number : r.phone_number = n.phone_number),
                {
                    verified: i,
                    unverified: r
                }
            }
            ))
        }
        ,
        e.prototype.currentUserPoolUser = function(e) {
            var t = this;
            if (!this.userPool)
                return this.rejectNoUserPool();
            var n = this;
            return new Promise((function(r, i) {
                t._storageSync.then((function() {
                    var t = n.userPool.getCurrentUser();
                    if (!t)
                        return kr.debug("Failed to get user from user pool"),
                        void i("No current user");
                    t.getSession((function(o, s) {
                        if (o)
                            return kr.debug("Failed to get the user session", o),
                            void i(o);
                        var a = !!e && e.bypassCache
                          , u = s.getAccessToken().decodePayload().scope;
                        if (!(void 0 === u ? "" : u).split(" ").includes("aws.cognito.signin.user.admin"))
                            return kr.debug("Unable to get the user data because the aws.cognito.signin.user.admin is not in the scopes of the access token"),
                            r(t);
                        t.getUserData((function(e, o) {
                            if (e)
                                return kr.debug("getting user data failed", e),
                                void ("User is disabled." === e.message || "User does not exist." === e.message || "Access Token has been revoked" === e.message ? i(e) : r(t));
                            for (var s = o.PreferredMfaSetting || "NOMFA", a = [], u = 0; u < o.UserAttributes.length; u++) {
                                var c = {
                                    Name: o.UserAttributes[u].Name,
                                    Value: o.UserAttributes[u].Value
                                }
                                  , l = new $n(c);
                                a.push(l)
                            }
                            var h = n.attributesToObject(a);
                            return Object.assign(t, {
                                attributes: h,
                                preferredMFA: s
                            }),
                            r(t)
                        }
                        ), {
                            bypassCache: a
                        })
                    }
                    ))
                }
                )).catch((function(e) {
                    return kr.debug("Failed to sync cache info into memory", e),
                    i(e)
                }
                ))
            }
            ))
        }
        ,
        e.prototype.currentAuthenticatedUser = function(e) {
            return Ir(this, void 0, void 0, (function() {
                var t, n, r, i;
                return Tr(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        kr.debug("getting current authenticated user"),
                        t = null,
                        o.label = 1;
                    case 1:
                        return o.trys.push([1, 3, , 4]),
                        [4, this._storageSync];
                    case 2:
                        return o.sent(),
                        [3, 4];
                    case 3:
                        throw n = o.sent(),
                        kr.debug("Failed to sync cache info into memory", n),
                        n;
                    case 4:
                        try {
                            t = JSON.parse(this._storage.getItem("aws-amplify-federatedInfo")).user
                        } catch (e) {
                            kr.debug("cannot load federated user from auth storage")
                        }
                        return t ? (this.user = t,
                        kr.debug("get current authenticated federated user", this.user),
                        [2, this.user]) : [3, 5];
                    case 5:
                        kr.debug("get current authenticated userpool user"),
                        r = null,
                        o.label = 6;
                    case 6:
                        return o.trys.push([6, 8, , 9]),
                        [4, this.currentUserPoolUser(e)];
                    case 7:
                        return r = o.sent(),
                        [3, 9];
                    case 8:
                        throw "No userPool" === (i = o.sent()) && kr.error("Cannot get the current user because the user pool is missing. Please make sure the Auth module is configured with a valid Cognito User Pool ID"),
                        kr.debug("The user is not authenticated by the error", i),
                        "not authenticated";
                    case 9:
                        return this.user = r,
                        [2, this.user]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.currentSession = function() {
            var e = this;
            return kr.debug("Getting current session"),
            this.userPool ? new Promise((function(t, n) {
                e.currentUserPoolUser().then((function(r) {
                    e.userSession(r).then((function(e) {
                        t(e)
                    }
                    )).catch((function(e) {
                        kr.debug("Failed to get the current session", e),
                        n(e)
                    }
                    ))
                }
                )).catch((function(e) {
                    kr.debug("Failed to get the current user", e),
                    n(e)
                }
                ))
            }
            )) : Promise.reject()
        }
        ,
        e.prototype.userSession = function(e) {
            return e ? new Promise((function(t, n) {
                kr.debug("Getting the session from this user:", e),
                e.getSession((function(r, i) {
                    return r ? (kr.debug("Failed to get the session from user", e),
                    void n(r)) : (kr.debug("Succeed to get the user session", i),
                    void t(i))
                }
                ))
            }
            )) : (kr.debug("the user is null"),
            this.rejectAuthError(Zt.NoUserSession))
        }
        ,
        e.prototype.currentUserCredentials = function() {
            return Ir(this, void 0, void 0, (function() {
                var e, t;
                return Tr(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        this,
                        kr.debug("Getting current user credentials"),
                        n.label = 1;
                    case 1:
                        return n.trys.push([1, 3, , 4]),
                        [4, this._storageSync];
                    case 2:
                        return n.sent(),
                        [3, 4];
                    case 3:
                        throw e = n.sent(),
                        kr.debug("Failed to sync cache info into memory", e),
                        e;
                    case 4:
                        t = null;
                        try {
                            t = JSON.parse(this._storage.getItem("aws-amplify-federatedInfo"))
                        } catch (e) {
                            kr.debug("failed to get or parse item aws-amplify-federatedInfo", e)
                        }
                        return t ? [2, Vt.refreshFederatedToken(t)] : [2, this.currentSession().then((function(e) {
                            return kr.debug("getting session success", e),
                            Vt.set(e, "session")
                        }
                        )).catch((function(e) {
                            return kr.debug("getting session failed", e),
                            Vt.set(null, "guest")
                        }
                        ))]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.currentCredentials = function() {
            return kr.debug("getting current credntials"),
            Vt.get()
        }
        ,
        e.prototype.verifyUserAttribute = function(e, t, n) {
            return void 0 === n && (n = this._config.clientMetadata),
            new Promise((function(r, i) {
                e.getAttributeVerificationCode(t, {
                    onSuccess: function() {
                        return r()
                    },
                    onFailure: function(e) {
                        return i(e)
                    },
                    clientMetadata: n
                })
            }
            ))
        }
        ,
        e.prototype.verifyUserAttributeSubmit = function(e, t, n) {
            return n ? new Promise((function(r, i) {
                e.verifyAttribute(t, n, {
                    onSuccess: function(e) {
                        r(e)
                    },
                    onFailure: function(e) {
                        i(e)
                    }
                })
            }
            )) : this.rejectAuthError(Zt.EmptyCode)
        }
        ,
        e.prototype.verifyCurrentUserAttribute = function(e) {
            var t = this;
            return t.currentUserPoolUser().then((function(n) {
                return t.verifyUserAttribute(n, e)
            }
            ))
        }
        ,
        e.prototype.verifyCurrentUserAttributeSubmit = function(e, t) {
            var n = this;
            return n.currentUserPoolUser().then((function(r) {
                return n.verifyUserAttributeSubmit(r, e, t)
            }
            ))
        }
        ,
        e.prototype.cognitoIdentitySignOut = function(e, t) {
            return Ir(this, void 0, void 0, (function() {
                var n, r, i = this;
                return Tr(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        return o.trys.push([0, 2, , 3]),
                        [4, this._storageSync];
                    case 1:
                        return o.sent(),
                        [3, 3];
                    case 2:
                        throw n = o.sent(),
                        kr.debug("Failed to sync cache info into memory", n),
                        n;
                    case 3:
                        return r = this._oAuthHandler && "true" === this._storage.getItem("amplify-signin-with-hostedUI"),
                        [2, new Promise((function(n, o) {
                            if (!e || !e.global)
                                return kr.debug("user sign out", t),
                                t.signOut(),
                                r ? n(i._oAuthHandler.signOut()) : n();
                            kr.debug("user global sign out", t),
                            t.getSession((function(e, s) {
                                if (e)
                                    return kr.debug("failed to get the user session", e),
                                    o(e);
                                t.globalSignOut({
                                    onSuccess: function(e) {
                                        return kr.debug("global sign out success"),
                                        r ? n(i._oAuthHandler.signOut()) : n()
                                    },
                                    onFailure: function(e) {
                                        return kr.debug("global sign out failed", e),
                                        o(e)
                                    }
                                })
                            }
                            ))
                        }
                        ))]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.signOut = function(e) {
            return Ir(this, void 0, void 0, (function() {
                var t;
                return Tr(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return n.trys.push([0, 2, , 3]),
                        [4, this.cleanCachedItems()];
                    case 1:
                        return n.sent(),
                        [3, 3];
                    case 2:
                        return n.sent(),
                        kr.debug("failed to clear cached items"),
                        [3, 3];
                    case 3:
                        return this.userPool ? (t = this.userPool.getCurrentUser()) ? [4, this.cognitoIdentitySignOut(e, t)] : [3, 5] : [3, 7];
                    case 4:
                        return n.sent(),
                        [3, 6];
                    case 5:
                        kr.debug("no current Cognito user"),
                        n.label = 6;
                    case 6:
                        return [3, 8];
                    case 7:
                        kr.debug("no Congito User pool"),
                        n.label = 8;
                    case 8:
                        return Pr("signOut", this.user, "A user has been signed out"),
                        this.user = null,
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.cleanCachedItems = function() {
            return Ir(this, void 0, void 0, (function() {
                return Tr(this, (function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, Vt.clear()];
                    case 1:
                        return e.sent(),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.changePassword = function(e, t, n, r) {
            var i = this;
            return void 0 === r && (r = this._config.clientMetadata),
            new Promise((function(o, s) {
                i.userSession(e).then((function(i) {
                    e.changePassword(t, n, (function(e, t) {
                        return e ? (kr.debug("change password failure", e),
                        s(e)) : o(t)
                    }
                    ), r)
                }
                ))
            }
            ))
        }
        ,
        e.prototype.forgotPassword = function(e, t) {
            if (void 0 === t && (t = this._config.clientMetadata),
            !this.userPool)
                return this.rejectNoUserPool();
            if (!e)
                return this.rejectAuthError(Zt.EmptyUsername);
            var n = this.createCognitoUser(e);
            return new Promise((function(r, i) {
                n.forgotPassword({
                    onSuccess: function() {
                        r()
                    },
                    onFailure: function(t) {
                        kr.debug("forgot password failure", t),
                        Pr("forgotPassword_failure", t, e + " forgotPassword failed"),
                        i(t)
                    },
                    inputVerificationCode: function(t) {
                        Pr("forgotPassword", n, e + " has initiated forgot password flow"),
                        r(t)
                    }
                }, t)
            }
            ))
        }
        ,
        e.prototype.forgotPasswordSubmit = function(e, t, n, r) {
            if (void 0 === r && (r = this._config.clientMetadata),
            !this.userPool)
                return this.rejectNoUserPool();
            if (!e)
                return this.rejectAuthError(Zt.EmptyUsername);
            if (!t)
                return this.rejectAuthError(Zt.EmptyCode);
            if (!n)
                return this.rejectAuthError(Zt.EmptyPassword);
            var i = this.createCognitoUser(e);
            return new Promise((function(o, s) {
                i.confirmPassword(t, n, {
                    onSuccess: function() {
                        Pr("forgotPasswordSubmit", i, e + " forgotPasswordSubmit successful"),
                        o()
                    },
                    onFailure: function(t) {
                        Pr("forgotPasswordSubmit_failure", t, e + " forgotPasswordSubmit failed"),
                        s(t)
                    }
                }, r)
            }
            ))
        }
        ,
        e.prototype.currentUserInfo = function() {
            return Ir(this, void 0, void 0, (function() {
                var e, t, n, r, i, o, s;
                return Tr(this, (function(a) {
                    switch (a.label) {
                    case 0:
                        return (e = Vt.getCredSource()) && "aws" !== e && "userPool" !== e ? [3, 9] : [4, this.currentUserPoolUser().catch((function(e) {
                            return kr.debug(e)
                        }
                        ))];
                    case 1:
                        if (!(s = a.sent()))
                            return [2, null];
                        a.label = 2;
                    case 2:
                        return a.trys.push([2, 8, , 9]),
                        [4, this.userAttributes(s)];
                    case 3:
                        t = a.sent(),
                        n = this.attributesToObject(t),
                        r = null,
                        a.label = 4;
                    case 4:
                        return a.trys.push([4, 6, , 7]),
                        [4, this.currentCredentials()];
                    case 5:
                        return r = a.sent(),
                        [3, 7];
                    case 6:
                        return i = a.sent(),
                        kr.debug("Failed to retrieve credentials while getting current user info", i),
                        [3, 7];
                    case 7:
                        return [2, {
                            id: r ? r.identityId : void 0,
                            username: s.getUsername(),
                            attributes: n
                        }];
                    case 8:
                        return o = a.sent(),
                        kr.debug("currentUserInfo error", o),
                        [2, {}];
                    case 9:
                        return "federated" === e ? [2, (s = this.user) || {}] : [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.federatedSignIn = function(e, t, n) {
            return Ir(this, void 0, void 0, (function() {
                var r, i, o, s, a, u, c, l, h, f, d;
                return Tr(this, (function(p) {
                    switch (p.label) {
                    case 0:
                        if (!this._config.identityPoolId && !this._config.userPoolId)
                            throw new Error("Federation requires either a User Pool or Identity Pool in config");
                        if (void 0 === e && this._config.identityPoolId && !this._config.userPoolId)
                            throw new Error("Federation with Identity Pools requires tokens passed as arguments");
                        return cn(e) || (g = e) && ["customProvider", "customState"].find((function(e) {
                            return g.hasOwnProperty(e)
                        }
                        )) || void 0 === e ? (r = e || {
                            provider: ur.Cognito
                        },
                        a = cn(r) ? r.provider : r.customProvider,
                        cn(r),
                        i = r.customState,
                        this._config.userPoolId && (o = ln(this._config.oauth) ? this._config.userPoolWebClientId : this._config.oauth.clientID,
                        s = ln(this._config.oauth) ? this._config.oauth.redirectSignIn : this._config.oauth.redirectUri,
                        this._oAuthHandler.oauthSignIn(this._config.oauth.responseType, this._config.oauth.domain, s, o, a, i)),
                        [3, 4]) : [3, 1];
                    case 1:
                        a = e;
                        try {
                            (u = JSON.stringify(JSON.parse(this._storage.getItem("aws-amplify-federatedInfo")).user)) && kr.warn("There is already a signed in user: " + u + " in your app.\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tYou should not call Auth.federatedSignIn method again as it may cause unexpected behavior.")
                        } catch (e) {}
                        return c = t.token,
                        l = t.identity_id,
                        h = t.expires_at,
                        [4, Vt.set({
                            provider: a,
                            token: c,
                            identity_id: l,
                            user: n,
                            expires_at: h
                        }, "federation")];
                    case 2:
                        return f = p.sent(),
                        [4, this.currentAuthenticatedUser()];
                    case 3:
                        return d = p.sent(),
                        Pr("signIn", d, "A user " + d.username + " has been signed in"),
                        kr.debug("federated sign in credentials", f),
                        [2, f];
                    case 4:
                        return [2]
                    }
                    var g
                }
                ))
            }
            ))
        }
        ,
        e.prototype._handleAuthResponse = function(e) {
            return Ir(this, void 0, void 0, (function() {
                var t, n, r, i, o, s, a, u, c, l, h, f, d, p;
                return Tr(this, (function(g) {
                    switch (g.label) {
                    case 0:
                        if (!this._config.userPoolId)
                            throw new Error("OAuth responses require a User Pool defined in config");
                        if (Pr("parsingCallbackUrl", {
                            url: e
                        }, "The callback url is being parsed"),
                        t = e || (nt.a.browserOrNode().isBrowser ? window.location.href : ""),
                        n = !!(Object(lr.parse)(t).query || "").split("&").map((function(e) {
                            return e.split("=")
                        }
                        )).find((function(e) {
                            var t = e[0];
                            return "code" === t || "error" === t
                        }
                        )),
                        r = !!(Object(lr.parse)(t).hash || "#").substr(1).split("&").map((function(e) {
                            return e.split("=")
                        }
                        )).find((function(e) {
                            var t = e[0];
                            return "access_token" === t || "error" === t
                        }
                        )),
                        !n && !r)
                            return [3, 6];
                        this._storage.setItem("amplify-redirected-from-hosted-ui", "true"),
                        g.label = 1;
                    case 1:
                        return g.trys.push([1, 5, , 6]),
                        [4, this._oAuthHandler.handleAuthResponse(t)];
                    case 2:
                        return i = g.sent(),
                        o = i.accessToken,
                        s = i.idToken,
                        a = i.refreshToken,
                        u = i.state,
                        c = new Wn({
                            IdToken: new jn({
                                IdToken: s
                            }),
                            RefreshToken: new Vn({
                                RefreshToken: a
                            }),
                            AccessToken: new qn({
                                AccessToken: o
                            })
                        }),
                        l = void 0,
                        this._config.identityPoolId ? [4, Vt.set(c, "session")] : [3, 4];
                    case 3:
                        l = g.sent(),
                        kr.debug("AWS credentials", l),
                        g.label = 4;
                    case 4:
                        return h = /-/.test(u),
                        f = this.createCognitoUser(c.getIdToken().decodePayload()["cognito:username"]),
                        Pr("signIn", f, "A user " + f.getUsername() + " has been signed in"),
                        Pr("cognitoHostedUI", f, "A user " + f.getUsername() + " has been signed in via Cognito Hosted UI"),
                        h && (d = u.split("-").splice(1).join("-"),
                        Pr("customOAuthState", d, "State for user " + f.getUsername())),
                        f.setSignInUserSession(c),
                        window && void 0 !== window.history && window.history.replaceState({}, null, this._config.oauth.redirectSignIn),
                        [2, l];
                    case 5:
                        return p = g.sent(),
                        kr.debug("Error in cognito hosted auth response", p),
                        Pr("signIn_failure", p, "The OAuth response flow failed"),
                        Pr("cognitoHostedUI_failure", p, "A failure occurred when returning to the Cognito Hosted UI"),
                        Pr("customState_failure", p, "A failure occurred when returning state"),
                        [3, 6];
                    case 6:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.essentialCredentials = function(e) {
            return {
                accessKeyId: e.accessKeyId,
                sessionToken: e.sessionToken,
                secretAccessKey: e.secretAccessKey,
                identityId: e.identityId,
                authenticated: e.authenticated
            }
        }
        ,
        e.prototype.attributesToObject = function(e) {
            var t = {};
            return e && e.map((function(e) {
                "true" === e.Value ? t[e.Name] = !0 : "false" === e.Value ? t[e.Name] = !1 : t[e.Name] = e.Value
            }
            )),
            t
        }
        ,
        e.prototype.createCognitoUser = function(e) {
            var t = {
                Username: e,
                Pool: this.userPool
            };
            t.Storage = this._storage;
            var n = this._config.authenticationFlowType
              , r = new nr(t);
            return n && r.setAuthenticationFlowType(n),
            r
        }
        ,
        e.prototype._isValidAuthStorage = function(e) {
            return !!e && "function" == typeof e.getItem && "function" == typeof e.setItem && "function" == typeof e.removeItem && "function" == typeof e.clear
        }
        ,
        e.prototype.noUserPoolErrorHandler = function(e) {
            return !e || e.userPoolId && e.identityPoolId ? Zt.NoConfig : Zt.MissingAuthConfig
        }
        ,
        e.prototype.rejectAuthError = function(e) {
            return Promise.reject(new _r(e))
        }
        ,
        e.prototype.rejectNoUserPool = function() {
            var e = this.noUserPoolErrorHandler(this._config);
            return Promise.reject(new Ar(e))
        }
        ,
        e
    }()
      , Or = new Fe("Auth")
      , Nr = null;
    Nr || (Or.debug("Create Auth Instance"),
    Nr = new Rr(null));
    var Ur = Nr;
    Yt.register(Ur);
    var Dr = Ur
      , Lr = {
        keyPrefix: "aws-amplify-cache",
        capacityInBytes: 1048576,
        itemMaxSize: 21e4,
        defaultTTL: 2592e5,
        defaultPriority: 5,
        warningThreshold: .8,
        storage: (new qt).getStorage()
    };
    function qr(e) {
        var t = 0;
        t = e.length;
        for (var n = e.length; n >= 0; n -= 1) {
            var r = e.charCodeAt(n);
            r > 127 && r <= 2047 ? t += 1 : r > 2047 && r <= 65535 && (t += 2),
            r >= 56320 && r <= 57343 && (n -= 1)
        }
        return t
    }
    function Mr() {
        return (new Date).getTime()
    }
    function Fr(e) {
        return Number.isInteger ? Number.isInteger(e) : function(e) {
            return "number" == typeof e && isFinite(e) && Math.floor(e) === e
        }(e)
    }
    var jr = {}
      , Br = function() {
        function e() {}
        return e.clear = function() {
            jr = {}
        }
        ,
        e.getItem = function(e) {
            return jr[e] || null
        }
        ,
        e.setItem = function(e, t) {
            jr[e] = t
        }
        ,
        e.removeItem = function(e) {
            delete jr[e]
        }
        ,
        e
    }()
      , Vr = function(e) {
        this.key = e || "",
        this.prevNode = null,
        this.nextNode = null
    }
      , zr = function() {
        function e() {
            this.head = new Vr,
            this.tail = new Vr,
            this.hashtable = {},
            this.length = 0,
            this.head.nextNode = this.tail,
            this.tail.prevNode = this.head
        }
        return e.prototype.insertNodeToHead = function(e) {
            var t = this.head.nextNode;
            this.head.nextNode = e,
            e.nextNode = t,
            e.prevNode = this.head,
            t.prevNode = e,
            this.length = this.length + 1
        }
        ,
        e.prototype.removeNode = function(e) {
            e.prevNode.nextNode = e.nextNode,
            e.nextNode.prevNode = e.prevNode,
            e.prevNode = null,
            e.nextNode = null,
            this.length = this.length - 1
        }
        ,
        e.prototype.isEmpty = function() {
            return 0 === this.length
        }
        ,
        e.prototype.refresh = function(e) {
            var t = this.hashtable[e];
            this.removeNode(t),
            this.insertNodeToHead(t)
        }
        ,
        e.prototype.insertItem = function(e) {
            var t = new Vr(e);
            this.hashtable[e] = t,
            this.insertNodeToHead(t)
        }
        ,
        e.prototype.getLastItem = function() {
            return this.tail.prevNode.key
        }
        ,
        e.prototype.removeItem = function(e) {
            var t = this.hashtable[e];
            this.removeNode(t),
            delete this.hashtable[e]
        }
        ,
        e.prototype.getSize = function() {
            return this.length
        }
        ,
        e.prototype.containsKey = function(e) {
            return e in this.hashtable
        }
        ,
        e.prototype.clearList = function() {
            for (var e = 0, t = Object.keys(this.hashtable); e < t.length; e++) {
                var n = t[e];
                this.hashtable.hasOwnProperty(n) && delete this.hashtable[n]
            }
            this.head.nextNode = this.tail,
            this.tail.prevNode = this.head,
            this.length = 0
        }
        ,
        e.prototype.getKeys = function() {
            return Object.keys(this.hashtable)
        }
        ,
        e.prototype.isHeadNode = function(e) {
            return this.hashtable[e].prevNode === this.head
        }
        ,
        e.prototype.isTailNode = function(e) {
            return this.hashtable[e].nextNode === this.tail
        }
        ,
        e
    }()
      , Hr = new Fe("StorageCache")
      , Kr = function() {
        function e(e) {
            this.config = Object.assign({}, e),
            this.cacheCurSizeKey = this.config.keyPrefix + "CurSize",
            this.checkConfig()
        }
        return e.prototype.getModuleName = function() {
            return "Cache"
        }
        ,
        e.prototype.checkConfig = function() {
            Fr(this.config.capacityInBytes) || (Hr.error("Invalid parameter: capacityInBytes. It should be an Integer. Setting back to default."),
            this.config.capacityInBytes = Lr.capacityInBytes),
            Fr(this.config.itemMaxSize) || (Hr.error("Invalid parameter: itemMaxSize. It should be an Integer. Setting back to default."),
            this.config.itemMaxSize = Lr.itemMaxSize),
            Fr(this.config.defaultTTL) || (Hr.error("Invalid parameter: defaultTTL. It should be an Integer. Setting back to default."),
            this.config.defaultTTL = Lr.defaultTTL),
            Fr(this.config.defaultPriority) || (Hr.error("Invalid parameter: defaultPriority. It should be an Integer. Setting back to default."),
            this.config.defaultPriority = Lr.defaultPriority),
            this.config.itemMaxSize > this.config.capacityInBytes && (Hr.error("Invalid parameter: itemMaxSize. It should be smaller than capacityInBytes. Setting back to default."),
            this.config.itemMaxSize = Lr.itemMaxSize),
            (this.config.defaultPriority > 5 || this.config.defaultPriority < 1) && (Hr.error("Invalid parameter: defaultPriority. It should be between 1 and 5. Setting back to default."),
            this.config.defaultPriority = Lr.defaultPriority),
            (Number(this.config.warningThreshold) > 1 || Number(this.config.warningThreshold) < 0) && (Hr.error("Invalid parameter: warningThreshold. It should be between 0 and 1. Setting back to default."),
            this.config.warningThreshold = Lr.warningThreshold);
            this.config.capacityInBytes > 5242880 && (Hr.error("Cache Capacity should be less than 5MB. Setting back to default. Setting back to default."),
            this.config.capacityInBytes = Lr.capacityInBytes)
        }
        ,
        e.prototype.fillCacheItem = function(e, t, n) {
            var r = {
                key: e,
                data: t,
                timestamp: Mr(),
                visitedTime: Mr(),
                priority: n.priority,
                expires: n.expires,
                type: typeof t,
                byteSize: 0
            };
            return r.byteSize = qr(JSON.stringify(r)),
            r.byteSize = qr(JSON.stringify(r)),
            r
        }
        ,
        e.prototype.configure = function(e) {
            return e ? (e.keyPrefix && Hr.warn("Don't try to configure keyPrefix!"),
            this.config = Object.assign({}, this.config, e, e.Cache),
            this.checkConfig(),
            this.config) : this.config
        }
        ,
        e
    }()
      , Wr = function() {
        var e = function(t, n) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            )(t, n)
        };
        return function(t, n) {
            function r() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
            new r)
        }
    }()
      , Gr = new Fe("Cache")
      , Jr = new (function(e) {
        function t(t) {
            var n = this
              , r = t ? Object.assign({}, Lr, t) : Lr;
            return (n = e.call(this, r) || this).config.storage = r.storage,
            n.getItem = n.getItem.bind(n),
            n.setItem = n.setItem.bind(n),
            n.removeItem = n.removeItem.bind(n),
            n
        }
        return Wr(t, e),
        t.prototype._decreaseCurSizeInBytes = function(e) {
            var t = this.getCacheCurSize();
            this.config.storage.setItem(this.cacheCurSizeKey, (t - e).toString())
        }
        ,
        t.prototype._increaseCurSizeInBytes = function(e) {
            var t = this.getCacheCurSize();
            this.config.storage.setItem(this.cacheCurSizeKey, (t + e).toString())
        }
        ,
        t.prototype._refreshItem = function(e, t) {
            return e.visitedTime = Mr(),
            this.config.storage.setItem(t, JSON.stringify(e)),
            e
        }
        ,
        t.prototype._isExpired = function(e) {
            var t = this.config.storage.getItem(e)
              , n = JSON.parse(t);
            return Mr() >= n.expires
        }
        ,
        t.prototype._removeItem = function(e, t) {
            var n = t || JSON.parse(this.config.storage.getItem(e)).byteSize;
            this._decreaseCurSizeInBytes(n),
            this.config.storage.removeItem(e)
        }
        ,
        t.prototype._setItem = function(e, t) {
            this._increaseCurSizeInBytes(t.byteSize);
            try {
                this.config.storage.setItem(e, JSON.stringify(t))
            } catch (e) {
                this._decreaseCurSizeInBytes(t.byteSize),
                Gr.error("Failed to set item " + e)
            }
        }
        ,
        t.prototype._sizeToPop = function(e) {
            var t = this.getCacheCurSize() + e - this.config.capacityInBytes
              , n = (1 - this.config.warningThreshold) * this.config.capacityInBytes;
            return t > n ? t : n
        }
        ,
        t.prototype._isCacheFull = function(e) {
            return e + this.getCacheCurSize() > this.config.capacityInBytes
        }
        ,
        t.prototype._findValidKeys = function() {
            for (var e = [], t = [], n = 0; n < this.config.storage.length; n += 1)
                t.push(this.config.storage.key(n));
            for (n = 0; n < t.length; n += 1) {
                var r = t[n];
                0 === r.indexOf(this.config.keyPrefix) && r !== this.cacheCurSizeKey && (this._isExpired(r) ? this._removeItem(r) : e.push(r))
            }
            return e
        }
        ,
        t.prototype._popOutItems = function(e, t) {
            for (var n = [], r = t, i = 0; i < e.length; i += 1) {
                var o = this.config.storage.getItem(e[i]);
                if (null != o) {
                    var s = JSON.parse(o);
                    n.push(s)
                }
            }
            n.sort((function(e, t) {
                return e.priority > t.priority ? -1 : e.priority < t.priority ? 1 : e.visitedTime < t.visitedTime ? -1 : 1
            }
            ));
            for (i = 0; i < n.length; i += 1)
                if (this._removeItem(n[i].key, n[i].byteSize),
                (r -= n[i].byteSize) <= 0)
                    return
        }
        ,
        t.prototype.setItem = function(e, t, n) {
            Gr.log("Set item: key is " + e + ", value is " + t + " with options: " + n);
            var r = this.config.keyPrefix + e;
            if (r !== this.config.keyPrefix && r !== this.cacheCurSizeKey)
                if (void 0 !== t) {
                    var i = {
                        priority: n && void 0 !== n.priority ? n.priority : this.config.defaultPriority,
                        expires: n && void 0 !== n.expires ? n.expires : this.config.defaultTTL + Mr()
                    };
                    if (i.priority < 1 || i.priority > 5)
                        Gr.warn("Invalid parameter: priority due to out or range. It should be within 1 and 5.");
                    else {
                        var o = this.fillCacheItem(r, t, i);
                        if (o.byteSize > this.config.itemMaxSize)
                            Gr.warn("Item with key: " + e + " you are trying to put into is too big!");
                        else
                            try {
                                var s = this.config.storage.getItem(r);
                                if (s && this._removeItem(r, JSON.parse(s).byteSize),
                                this._isCacheFull(o.byteSize)) {
                                    var a = this._findValidKeys();
                                    if (this._isCacheFull(o.byteSize)) {
                                        var u = this._sizeToPop(o.byteSize);
                                        this._popOutItems(a, u)
                                    }
                                }
                                this._setItem(r, o)
                            } catch (e) {
                                Gr.warn("setItem failed! " + e)
                            }
                    }
                } else
                    Gr.warn("The value of item should not be undefined!");
            else
                Gr.warn("Invalid key: should not be empty or 'CurSize'")
        }
        ,
        t.prototype.getItem = function(e, t) {
            Gr.log("Get item: key is " + e + " with options " + t);
            var n = null
              , r = this.config.keyPrefix + e;
            if (r === this.config.keyPrefix || r === this.cacheCurSizeKey)
                return Gr.warn("Invalid key: should not be empty or 'CurSize'"),
                null;
            try {
                if (null != (n = this.config.storage.getItem(r))) {
                    if (!this._isExpired(r)) {
                        var i = JSON.parse(n);
                        return (i = this._refreshItem(i, r)).data
                    }
                    this._removeItem(r, JSON.parse(n).byteSize),
                    n = null
                }
                if (t && void 0 !== t.callback) {
                    var o = t.callback();
                    return null !== o && this.setItem(e, o, t),
                    o
                }
                return null
            } catch (e) {
                return Gr.warn("getItem failed! " + e),
                null
            }
        }
        ,
        t.prototype.removeItem = function(e) {
            Gr.log("Remove item: key is " + e);
            var t = this.config.keyPrefix + e;
            if (t !== this.config.keyPrefix && t !== this.cacheCurSizeKey)
                try {
                    var n = this.config.storage.getItem(t);
                    n && this._removeItem(t, JSON.parse(n).byteSize)
                } catch (e) {
                    Gr.warn("removeItem failed! " + e)
                }
        }
        ,
        t.prototype.clear = function() {
            Gr.log("Clear Cache");
            for (var e = [], t = 0; t < this.config.storage.length; t += 1) {
                var n = this.config.storage.key(t);
                0 === n.indexOf(this.config.keyPrefix) && e.push(n)
            }
            try {
                for (t = 0; t < e.length; t += 1)
                    this.config.storage.removeItem(e[t])
            } catch (e) {
                Gr.warn("clear failed! " + e)
            }
        }
        ,
        t.prototype.getAllKeys = function() {
            for (var e = [], t = 0; t < this.config.storage.length; t += 1) {
                var n = this.config.storage.key(t);
                0 === n.indexOf(this.config.keyPrefix) && n !== this.cacheCurSizeKey && e.push(n.substring(this.config.keyPrefix.length))
            }
            return e
        }
        ,
        t.prototype.getCacheCurSize = function() {
            var e = this.config.storage.getItem(this.cacheCurSizeKey);
            return e || (this.config.storage.setItem(this.cacheCurSizeKey, "0"),
            e = "0"),
            Number(e)
        }
        ,
        t.prototype.createInstance = function(e) {
            return e.keyPrefix && e.keyPrefix !== Lr.keyPrefix || (Gr.error("invalid keyPrefix, setting keyPrefix with timeStamp"),
            e.keyPrefix = Mr.toString()),
            new t(e)
        }
        ,
        t
    }(Kr))
      , Yr = function() {
        var e = function(t, n) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            )(t, n)
        };
        return function(t, n) {
            function r() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
            new r)
        }
    }()
      , Xr = new Fe("InMemoryCache")
      , $r = (new (function(e) {
        function t(t) {
            var n = this
              , r = t ? Object.assign({}, Lr, t) : Lr;
            n = e.call(this, r) || this,
            Xr.debug("now we start!"),
            n.cacheList = [],
            n.curSizeInBytes = 0,
            n.maxPriority = 5,
            n.getItem = n.getItem.bind(n),
            n.setItem = n.setItem.bind(n),
            n.removeItem = n.removeItem.bind(n);
            for (var i = 0; i < n.maxPriority; i += 1)
                n.cacheList[i] = new zr;
            return n
        }
        return Yr(t, e),
        t.prototype._decreaseCurSizeInBytes = function(e) {
            this.curSizeInBytes -= e
        }
        ,
        t.prototype._increaseCurSizeInBytes = function(e) {
            this.curSizeInBytes += e
        }
        ,
        t.prototype._isExpired = function(e) {
            var t = Br.getItem(e)
              , n = JSON.parse(t);
            return Mr() >= n.expires
        }
        ,
        t.prototype._removeItem = function(e, t) {
            this.cacheList[t].removeItem(e),
            this._decreaseCurSizeInBytes(JSON.parse(Br.getItem(e)).byteSize),
            Br.removeItem(e)
        }
        ,
        t.prototype._setItem = function(e, t, n) {
            this.cacheList[n].insertItem(e),
            this._increaseCurSizeInBytes(t.byteSize),
            Br.setItem(e, JSON.stringify(t))
        }
        ,
        t.prototype._isCacheFull = function(e) {
            return this.curSizeInBytes + e > this.config.capacityInBytes
        }
        ,
        t.prototype.containsKey = function(e) {
            for (var t = this.config.keyPrefix + e, n = 0; n < this.maxPriority; n += 1)
                if (this.cacheList[n].containsKey(t))
                    return n + 1;
            return -1
        }
        ,
        t.prototype.setItem = function(e, t, n) {
            var r = this.config.keyPrefix + e;
            if (r !== this.config.keyPrefix && r !== this.cacheCurSizeKey)
                if (void 0 !== t) {
                    var i = {
                        priority: n && void 0 !== n.priority ? n.priority : this.config.defaultPriority,
                        expires: n && void 0 !== n.expires ? n.expires : this.config.defaultTTL + Mr()
                    };
                    if (i.priority < 1 || i.priority > 5)
                        Xr.warn("Invalid parameter: priority due to out or range. It should be within 1 and 5.");
                    else {
                        var o = this.fillCacheItem(r, t, i);
                        if (o.byteSize > this.config.itemMaxSize)
                            Xr.warn("Item with key: " + e + " you are trying to put into is too big!");
                        else {
                            var s = this.containsKey(e);
                            -1 !== s && this._removeItem(r, s - 1);
                            for (var a = this.maxPriority - 1; this._isCacheFull(o.byteSize) && a >= 0; )
                                if (this.cacheList[a].isEmpty())
                                    a -= 1;
                                else {
                                    var u = this.cacheList[a].getLastItem();
                                    this._removeItem(u, a)
                                }
                            this._setItem(r, o, Number(o.priority) - 1)
                        }
                    }
                } else
                    Xr.warn("The value of item should not be undefined!");
            else
                Xr.warn("Invalid key: should not be empty or 'CurSize'")
        }
        ,
        t.prototype.getItem = function(e, t) {
            var n = null
              , r = this.config.keyPrefix + e;
            if (r === this.config.keyPrefix || r === this.cacheCurSizeKey)
                return Xr.warn("Invalid key: should not be empty or 'CurSize'"),
                null;
            var i = this.containsKey(e);
            if (-1 !== i) {
                if (!this._isExpired(r)) {
                    n = Br.getItem(r);
                    var o = JSON.parse(n);
                    return this.cacheList[o.priority - 1].refresh(r),
                    o.data
                }
                this._removeItem(r, i - 1)
            }
            if (t && void 0 !== t.callback) {
                var s = t.callback();
                return null !== s && this.setItem(e, s, t),
                s
            }
            return null
        }
        ,
        t.prototype.removeItem = function(e) {
            var t = this.config.keyPrefix + e
              , n = this.containsKey(e);
            -1 !== n && this._removeItem(t, n - 1)
        }
        ,
        t.prototype.clear = function() {
            for (var e = 0; e < this.maxPriority; e += 1)
                for (var t = 0, n = this.cacheList[e].getKeys(); t < n.length; t++) {
                    var r = n[t];
                    this._removeItem(r, e)
                }
        }
        ,
        t.prototype.getAllKeys = function() {
            for (var e = [], t = 0; t < this.maxPriority; t += 1)
                for (var n = 0, r = this.cacheList[t].getKeys(); n < r.length; n++) {
                    var i = r[n];
                    e.push(i.substring(this.config.keyPrefix.length))
                }
            return e
        }
        ,
        t.prototype.getCacheCurSize = function() {
            return this.curSizeInBytes
        }
        ,
        t.prototype.createInstance = function(e) {
            return new t(e)
        }
        ,
        t
    }(Kr)),
    Jr);
    Yt.register(Jr);
    var Zr, Qr = function() {
        return (Qr = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }
        ).apply(this, arguments)
    }, ei = function(e, t, n, r) {
        return new (n || (n = Promise))((function(i, o) {
            function s(e) {
                try {
                    u(r.next(e))
                } catch (e) {
                    o(e)
                }
            }
            function a(e) {
                try {
                    u(r.throw(e))
                } catch (e) {
                    o(e)
                }
            }
            function u(e) {
                var t;
                e.done ? i(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(s, a)
            }
            u((r = r.apply(e, t || [])).next())
        }
        ))
    }, ti = function(e, t) {
        var n, r, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0])
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }
        ),
        o;
        function a(o) {
            return function(a) {
                return function(o) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; s; )
                        try {
                            if (n = 1,
                            r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                            0) : r.next) && !(i = i.call(r, o[1])).done)
                                return i;
                            switch (r = 0,
                            i && (o = [2 & o[0], i.value]),
                            o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++,
                                {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++,
                                r = o[1],
                                o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(),
                                s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys,
                                (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1],
                                    i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2],
                                    s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(),
                                s.trys.pop();
                                continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e],
                            r = 0
                        } finally {
                            n = i = 0
                        }
                    if (5 & o[0])
                        throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, a])
            }
        }
    }, ni = function(e, t) {
        var n = {};
        for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
        }
        return n
    }, ri = new Fe("API"), ii = function() {
        function e(e) {
            this._api = null,
            this._options = e,
            ri.debug("API Options", this._options)
        }
        return e.prototype.getModuleName = function() {
            return "API"
        }
        ,
        e.prototype.configure = function(e) {
            var t = e || {}
              , n = t.API
              , r = void 0 === n ? {} : n
              , i = ni(t, ["API"])
              , o = Qr(Qr({}, i), r);
            if (ri.debug("configure API", {
                opt: o
            }),
            o.aws_project_region) {
                if (o.aws_cloud_logic_custom) {
                    var s = o.aws_cloud_logic_custom;
                    o.endpoints = "string" == typeof s ? JSON.parse(s) : s
                }
                o = Object.assign({}, o, {
                    region: o.aws_project_region,
                    header: {}
                })
            }
            return Array.isArray(o.endpoints) || (o.endpoints = []),
            o.endpoints.forEach((function(e) {
                void 0 !== e.custom_header && "function" != typeof e.custom_header && (ri.warn("API " + e.name + ", custom_header should be a function"),
                e.custom_header = void 0)
            }
            )),
            void 0 !== o.graphql_headers && "function" != typeof o.graphql_headers && (ri.warn("graphql_headers should be a function"),
            o.graphql_headers = void 0),
            this._options = Object.assign({}, this._options, o),
            this.createInstance(),
            this._options
        }
        ,
        e.prototype.createInstance = function() {
            return ri.debug("create API instance"),
            this._options ? (this._api = new un(this._options),
            !0) : Promise.reject("API not configured")
        }
        ,
        e.prototype.get = function(e, t, n) {
            return ei(this, void 0, void 0, (function() {
                var r, i;
                return ti(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        if (this._api)
                            return [3, 4];
                        o.label = 1;
                    case 1:
                        return o.trys.push([1, 3, , 4]),
                        [4, this.createInstance()];
                    case 2:
                        return o.sent(),
                        [3, 4];
                    case 3:
                        return r = o.sent(),
                        [2, Promise.reject(r)];
                    case 4:
                        return 0 === (i = this._api.endpoint(e)).length ? [2, Promise.reject("API " + e + " does not exist")] : [2, this._api.get(i + t, n)]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.post = function(e, t, n) {
            return ei(this, void 0, void 0, (function() {
                var r, i;
                return ti(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        if (this._api)
                            return [3, 4];
                        o.label = 1;
                    case 1:
                        return o.trys.push([1, 3, , 4]),
                        [4, this.createInstance()];
                    case 2:
                        return o.sent(),
                        [3, 4];
                    case 3:
                        return r = o.sent(),
                        [2, Promise.reject(r)];
                    case 4:
                        return 0 === (i = this._api.endpoint(e)).length ? [2, Promise.reject("API " + e + " does not exist")] : [2, this._api.post(i + t, n)]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.put = function(e, t, n) {
            return ei(this, void 0, void 0, (function() {
                var r, i;
                return ti(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        if (this._api)
                            return [3, 4];
                        o.label = 1;
                    case 1:
                        return o.trys.push([1, 3, , 4]),
                        [4, this.createInstance()];
                    case 2:
                        return o.sent(),
                        [3, 4];
                    case 3:
                        return r = o.sent(),
                        [2, Promise.reject(r)];
                    case 4:
                        return 0 === (i = this._api.endpoint(e)).length ? [2, Promise.reject("API " + e + " does not exist")] : [2, this._api.put(i + t, n)]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.patch = function(e, t, n) {
            return ei(this, void 0, void 0, (function() {
                var r, i;
                return ti(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        if (this._api)
                            return [3, 4];
                        o.label = 1;
                    case 1:
                        return o.trys.push([1, 3, , 4]),
                        [4, this.createInstance()];
                    case 2:
                        return o.sent(),
                        [3, 4];
                    case 3:
                        return r = o.sent(),
                        [2, Promise.reject(r)];
                    case 4:
                        return 0 === (i = this._api.endpoint(e)).length ? [2, Promise.reject("API " + e + " does not exist")] : [2, this._api.patch(i + t, n)]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.del = function(e, t, n) {
            return ei(this, void 0, void 0, (function() {
                var r, i;
                return ti(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        if (this._api)
                            return [3, 4];
                        o.label = 1;
                    case 1:
                        return o.trys.push([1, 3, , 4]),
                        [4, this.createInstance()];
                    case 2:
                        return o.sent(),
                        [3, 4];
                    case 3:
                        return r = o.sent(),
                        [2, Promise.reject(r)];
                    case 4:
                        return 0 === (i = this._api.endpoint(e)).length ? [2, Promise.reject("API " + e + " does not exist")] : [2, this._api.del(i + t, n)]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.head = function(e, t, n) {
            return ei(this, void 0, void 0, (function() {
                var r, i;
                return ti(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        if (this._api)
                            return [3, 4];
                        o.label = 1;
                    case 1:
                        return o.trys.push([1, 3, , 4]),
                        [4, this.createInstance()];
                    case 2:
                        return o.sent(),
                        [3, 4];
                    case 3:
                        return r = o.sent(),
                        [2, Promise.reject(r)];
                    case 4:
                        return 0 === (i = this._api.endpoint(e)).length ? [2, Promise.reject("API " + e + " does not exist")] : [2, this._api.head(i + t, n)]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.endpoint = function(e) {
            return ei(this, void 0, void 0, (function() {
                var t;
                return ti(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        if (this._api)
                            return [3, 4];
                        n.label = 1;
                    case 1:
                        return n.trys.push([1, 3, , 4]),
                        [4, this.createInstance()];
                    case 2:
                        return n.sent(),
                        [3, 4];
                    case 3:
                        return t = n.sent(),
                        [2, Promise.reject(t)];
                    case 4:
                        return [2, this._api.endpoint(e)]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype._headerBasedAuth = function(e) {
            return ei(this, void 0, void 0, (function() {
                var t, n, r, i, o, s;
                return ti(this, (function(a) {
                    switch (a.label) {
                    case 0:
                        switch (t = this._options,
                        n = t.aws_appsync_authenticationType,
                        r = t.aws_appsync_apiKey,
                        i = {},
                        e || n || "AWS_IAM") {
                        case "API_KEY":
                            return [3, 1];
                        case "AWS_IAM":
                            return [3, 2];
                        case "OPENID_CONNECT":
                            return [3, 4];
                        case "AMAZON_COGNITO_USER_POOLS":
                            return [3, 6]
                        }
                        return [3, 8];
                    case 1:
                        if (!r)
                            throw new Error("No api-key configured");
                        return i = {
                            Authorization: null,
                            "X-Api-Key": r
                        },
                        [3, 9];
                    case 2:
                        return [4, this._ensureCredentials()];
                    case 3:
                        if (!a.sent())
                            throw new Error("No credentials");
                        return [3, 9];
                    case 4:
                        return [4, $r.getItem("federatedInfo")];
                    case 5:
                        if (!(o = a.sent()) || !o.token)
                            throw new Error("No federated jwt");
                        return i = {
                            Authorization: o.token
                        },
                        [3, 9];
                    case 6:
                        return [4, Dr.currentSession()];
                    case 7:
                        return s = a.sent(),
                        i = {
                            Authorization: s.getAccessToken().getJwtToken()
                        },
                        [3, 9];
                    case 8:
                        return i = {
                            Authorization: null
                        },
                        [3, 9];
                    case 9:
                        return [2, i]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.getGraphqlOperationType = function(e) {
            return z(e).definitions[0].operation
        }
        ,
        e.prototype.graphql = function(e, t) {
            var n = e.query
              , r = e.variables
              , i = void 0 === r ? {} : r
              , o = e.authMode
              , s = z("string" == typeof n ? n : f(n))
              , a = s.definitions.filter((function(e) {
                return "OperationDefinition" === e.kind
            }
            ))[0]
              , u = (void 0 === a ? {} : a).operation;
            switch (u) {
            case "query":
            case "mutation":
                return this._graphql({
                    query: s,
                    variables: i,
                    authMode: o
                }, t);
            case "subscription":
                return this._graphqlSubscribe({
                    query: s,
                    variables: i,
                    authMode: o
                })
            }
            throw new Error("invalid operation type: " + u)
        }
        ,
        e.prototype._graphql = function(e, t) {
            var n = e.query
              , r = e.variables
              , i = e.authMode;
            return void 0 === t && (t = {}),
            ei(this, void 0, void 0, (function() {
                var e, o, s, u, c, l, h, d, p, g, m, y, v, b, w, S, E, _, A, C, I;
                return ti(this, (function(T) {
                    switch (T.label) {
                    case 0:
                        return this._api ? [3, 2] : [4, this.createInstance()];
                    case 1:
                        T.sent(),
                        T.label = 2;
                    case 2:
                        return e = this._options,
                        o = e.aws_appsync_region,
                        s = e.aws_appsync_graphqlEndpoint,
                        u = e.graphql_headers,
                        c = void 0 === u ? function() {
                            return {}
                        }
                        : u,
                        l = e.graphql_endpoint,
                        h = e.graphql_endpoint_iam_region,
                        p = [{}],
                        (g = !l) ? [4, this._headerBasedAuth(i)] : [3, 4];
                    case 3:
                        g = T.sent(),
                        T.label = 4;
                    case 4:
                        return m = [Qr.apply(void 0, p.concat([g]))],
                        (y = l) ? h ? [4, this._headerBasedAuth(i)] : [3, 6] : [3, 8];
                    case 5:
                        return v = T.sent(),
                        [3, 7];
                    case 6:
                        v = {
                            Authorization: null
                        },
                        T.label = 7;
                    case 7:
                        y = v,
                        T.label = 8;
                    case 8:
                        return b = [Qr.apply(void 0, m.concat([y]))],
                        [4, c({
                            query: n,
                            variables: r
                        })];
                    case 9:
                        if (d = Qr.apply(void 0, [Qr.apply(void 0, [Qr.apply(void 0, b.concat([T.sent()])), t]), !l && (I = {},
                        I["x-amz-user-agent"] = Jt.userAgent,
                        I)]),
                        w = {
                            query: f(n),
                            variables: r
                        },
                        S = {
                            headers: d,
                            body: w,
                            signerServiceInfo: {
                                service: l ? "execute-api" : "appsync",
                                region: l ? h : o
                            }
                        },
                        !(E = l || s))
                            throw {
                                data: {},
                                errors: [new a("No graphql endpoint provided.")]
                            };
                        T.label = 10;
                    case 10:
                        return T.trys.push([10, 12, , 13]),
                        [4, this._api.post(E, S)];
                    case 11:
                        return _ = T.sent(),
                        [3, 13];
                    case 12:
                        return A = T.sent(),
                        _ = {
                            data: {},
                            errors: [new a(A.message)]
                        },
                        [3, 13];
                    case 13:
                        if ((C = _.errors) && C.length)
                            throw _;
                        return [2, _]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype._graphqlSubscribe = function(e) {
            var t = e.query
              , n = e.variables
              , r = e.authMode
              , i = this._options
              , o = i.aws_appsync_region
              , s = i.aws_appsync_graphqlEndpoint
              , a = i.aws_appsync_authenticationType
              , u = i.aws_appsync_apiKey
              , c = i.graphql_headers
              , l = void 0 === c ? function() {
                return {}
            }
            : c
              , h = r || a || "AWS_IAM";
            if (Yt.PubSub && "function" == typeof Yt.PubSub.subscribe)
                return Yt.PubSub.subscribe("", {
                    provider: Gt,
                    appSyncGraphqlEndpoint: s,
                    authenticationType: h,
                    apiKey: u,
                    query: f(t),
                    region: o,
                    variables: n,
                    graphql_headers: l
                });
            throw ri.debug("No pubsub module applied for subscription"),
            new Error("No pubsub module applied for subscription")
        }
        ,
        e.prototype._ensureCredentials = function() {
            return Vt.get().then((function(e) {
                if (!e)
                    return !1;
                var t = Vt.shear(e);
                return ri.debug("set credentials for api", t),
                !0
            }
            )).catch((function(e) {
                return ri.warn("ensure credentials error", e),
                !1
            }
            ))
        }
        ,
        e
    }();
    !function(e) {
        e.API_KEY = "API_KEY",
        e.AWS_IAM = "AWS_IAM",
        e.OPENID_CONNECT = "OPENID_CONNECT",
        e.AMAZON_COGNITO_USER_POOLS = "AMAZON_COGNITO_USER_POOLS"
    }(Zr || (Zr = {}));
    var oi = new Fe("API")
      , si = null;
    si || (oi.debug("Create API Instance"),
    si = new ii(null));
    var ai = si;
    Yt.register(ai);
    var ui = ai;
    const ci = '\n  <material-bottom-sheet id="sensor-sheet">\n      <h2 slot="header">Enabling sensors</h2>\n      <div slot="body">\n        <p>\n          When motion sensors are not available on your device, you can follow these steps to enable them.\n        </p>\n        \n        <h3>iOS</h3>\n        <p class="no-support">\n          This only applies to iOS 12. You may need to remove and add the app to the home screen again for the changes \n          to take effect.\n        </p>\n        <p>\n          Open settings and scroll down to find Safari:\n        </p>\n        <p class="img"><img src="src/img/sensors-ios-step1.png"></p>\n        \n        <p>\n          Scroll down to find "Motion & Orientation Access" and toggle the switch on:\n        </p>\n        <p class="img"><img src="src/img/sensors-ios-step2.png"></p>\n      \n        <h3>Android</h3>\n        <p>\n          Open this site in Chrome browser for Android and open the main menu by tapping the icon in the top-right \n          corner: \n        </p>\n\n        <p class="img"><img src="src/img/sensors-step1.jpg"></p>\n        \n        <p>\n          In the menu that opens, tap Settings:\n        </p>\n        \n        <p class="img"><img src="src/img/sensors-step2.jpg"></p>\n        \n        <p>\n          In the Settings, tap Site settings:\n        </p>\n        \n        <p class="img"><img src="src/img/sensors-step3.jpg"></p>\n        \n        <p>\n          In the Site settings menu, tap Motion sensors:\n        </p>\n        \n        <p class="img"><img src="src/img/sensors-step4.jpg"></p>\n        \n        <p>\n          You can now enable Motion sensors:\n        </p>\n        \n        <p class="img"><img src="src/img/sensors-step5.jpg"></p>\n\n      </div>\n      <footer slot="footer">\n        <material-button id="close-sensor-sheet" label="Close"></material-button>\n      </footer>\n    </material-bottom-sheet>\n'
      , li = document.querySelector("#sensor-sheet");
/*    document.querySelector("#close-sensor-sheet").addEventListener("click", ()=>{
        li.close()
    }
    );*/
    (({outlet: e, nav: t, routes: n, onAfterRender: i})=>{
        const o = location.origin;
        e.addEventListener("animationend", t=>{
            if ("fadeout" === t.animationName) {
                const t = e.querySelector(".current");
                t.classList.add("active"),
                t.classList.remove("current")
            }
        }
        );
        const s = t ? [...t.querySelectorAll("a")].map(e=>(e.dataset.href = e.href.replace(o, ""),
        e)) : []
          , a = e=>n.reduce((t,n)=>{
            const r = new URL(e)
              , i = n.url.match(/(:([a-z]+))/g)
              , o = i ? n.url.replace(/(:[a-z]+)/g, "(.+)") : n.url
              , s = i ? i.map(e=>e.substr(1)) : []
              , a = new RegExp(`^${o}$`).exec(r.pathname);
            r.search;
            if (a) {
                const e = a.slice(1).map(e=>e.split("?").shift());
                return n.params = s.reduce((t,n,r)=>(t[n] = e[r],
                t), {}),
                r.search.length && r.searchParams.forEach((e,t)=>n.params[t] = e),
                Object.assign({}, n, {
                    url: a[0]
                })
            }
            return t
        }
        );
        document.addEventListener("visibilitychange", ()=>{
            if ("hidden" === document.visibilityState && Object(r.c)()) {
                const e = document.querySelector(".view.active")
                  , t = e ? e.dataset.view : null;
                if (t) {
                    const e = n.find(e=>e.url === t);
                    e.onExit && "exitOnHidden"in e && e.exitOnHidden && e.onExit()
                }
            }
        }
        );
        const u = ({template: t, url: n},r)=>{
            e.querySelector("[data-shell-content]") && e.querySelectorAll("[data-shell-content]").forEach(e=>e.remove()),
            (t=>null !== e.querySelector(`div[data-view="${t}"]`))(n) || ((t,n,r=!1)=>{
                const i = document.createElement("div");
                i.insertAdjacentHTML("beforeend", n);
                const o = i.querySelector(".view");
                o.dataset.view = t,
                o.classList.add("active"),
                r && o.classList.remove("next-screen"),
                e.insertAdjacentElement("beforeend", o)
            }
            )(n, t, r);
            const o = e.querySelector(".view.active")
              , s = e.querySelector(`div[data-view="${n}"]`);
            setTimeout(()=>{
                if (o === s)
                    o.classList.remove("next-screen");
                else {
                    const e = s.classList.contains("next-screen") ? "prev-screen" : "next-screen"
                      , t = s.classList.contains("prev-screen") ? "current" : "active";
                    o.classList.remove("active"),
                    o.classList.add(e),
                    s.classList.add(t),
                    s.classList.remove("next-screen" === e ? "prev-screen" : "next-screen"),
                    i && "function" == typeof i && i()
                }
            }
            , 10)
        }
          , c = (e,t=!1)=>{
            var n;
            u(e, t),
            n = e.url,
            s.forEach(e=>{
                "/" === e.dataset.href && e.dataset.href === n || "/" !== e.dataset.href && 0 === n.indexOf(e.dataset.href) ? e.classList.add("active") : e.classList.remove("active")
            }
            ),
            "function" == typeof e.controller && e.controller(e.params),
            document.querySelector('meta[property="og:url"]').setAttribute("content", location.href)
        }
          , l = async(e,t=!1)=>{
            const r = a(e);
            if (r) {
                const {template: i} = "string" == typeof r.template ? r : await r.template();
                r.template = i;
                const o = {
                    template: i,
                    url: e
                };
                t || history.pushState(o, null, e);
                const s = document.querySelector(".view.active")
                  , a = s ? s.dataset.view : null;
                if (a) {
                    const e = n.find(e=>e.url === a);
                    e.onExit && e.onExit()
                }
                c(r, t)
            }
        }
          , h = e=>e.href && e.href.includes(o)
          , f = e=>e.classList && e.classList.contains("back")
          , d = e=>{
            const t = e.composedPath()
              , n = t.find(f)
              , i = t.find(h)
              , o = !e.ctrlKey && !e.metaKey;
            if (n)
                history.back();
            else {
                if (i && o)
                    return e.preventDefault(),
                    l(i.href),
                    !1;
                !i && Object(r.b)() && e.preventDefault()
            }
        }
        ;
        e.addEventListener("click", d),
        document.querySelectorAll("a").forEach(e=>e.addEventListener("click", d)),
        window.addEventListener("popstate", e=>{
            if (e.state && e.state.url) {
                const t = a(e.state.url);
                t.template = e.state.template,
                c(t)
            } else
                e.preventDefault(),
                l(location.origin)
        }
        ),
        l(location.href, !0)
    }
    )({
        outlet: document.querySelector("#main-content"),
        nav: null,
        routes: [{
            url: "/",
            template: ()=>n.e(27).then(n.bind(null, 160)),
            controller() {
                const e = document.querySelector("#install-button")
                  , t = document.querySelector("#install-sheet")
                  , n = document.querySelector("#close-install-sheet")
                  , r = "onbeforeinstallprompt"in window;
                window.addEventListener("load", t=>{
                    e.disabled = void 0 === window.deferredPrompt && r
                }
                ),
                window.addEventListener("beforeinstallprompt", t=>{
                    t.preventDefault(),
                    e.disabled = !1
                }
                ),
                e.addEventListener("click", ()=>{
                    window.deferredPrompt ? window.deferredPrompt.prompt() : !r && t.open()
                }
                ),
                n.addEventListener("click", e=>{
                    t.close()
                }
                ),
                window.addEventListener("appinstalled", t=>{
                    e.disabled = !0
                }
                )
            }
        }, {
            url: "/media",
            template: ()=>n.e(3).then(n.bind(null, 179)),
            onExit() {
                const e = document.querySelector("web-cam");
                try {
                    "" !== e.preview.src && e.closeVideo(),
                    e.stream && e.stopVideo()
                } catch (e) {
                    console.error(e)
                }
            },
            exitOnHidden: !0
        }, {
            url: "/audio",
            template: ()=>Promise.all([n.e(0), n.e(28)]).then(n.bind(null, 161)),
            controller() {
                if ("mediaSession"in navigator) {
                    const e = document.querySelector("audio");
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: "Shadows of Ourselves",
                        artist: "Thievery Corporation",
                        album: "The Mirror Conspiracy",
                        artwork: [{
                            src: "https://whatpwacando.today/src/img/media/mirror-conspiracy256x256.jpeg",
                            sizes: "256x256",
                            type: "image/jpeg"
                        }, {
                            src: "https://whatpwacando.today/src/img/media/mirror-conspiracy512x512.jpeg",
                            sizes: "512x512",
                            type: "image/jpeg"
                        }]
                    }),
                    navigator.mediaSession.setActionHandler("play", ()=>e.play()),
                    navigator.mediaSession.setActionHandler("pause", ()=>e.pause()),
                    navigator.mediaSession.setActionHandler("seekbackward", t=>{
                        const n = t.seekOffset || 1;
                        e.currentTime = Math.max(e.currentTime - n, 0)
                    }
                    ),
                    navigator.mediaSession.setActionHandler("seekforward", t=>{
                        const n = t.seekOffset || 1;
                        e.currentTime = Math.min(e.currentTime + n, e.duration)
                    }
                    ),
                    navigator.mediaSession.setActionHandler("seekto", t=>{
                        t.fastSeek && "fastSeek"in e ? e.fastSeek(t.seekTime) : e.currentTime = t.seekTime
                    }
                    ),
                    navigator.mediaSession.setActionHandler("previoustrack", ()=>{
                        e.currentTime = 0
                    }
                    )
                }
            }
        }, {
            url: "/audio-recording",
            template: ()=>Promise.all([n.e(24), n.e(29)]).then(n.bind(null, 162)),
            controller() {
                const e = document.querySelector("audio-recorder")
                  , t = document.querySelector("#mic-permission-dialog")
                  , n = document.querySelector("#dialog-close");
                e.addEventListener("notallowed", ()=>t.open()),
                n.addEventListener("click", ()=>t.close())
            }
        }, {
            url: "/authentication",
            template: ()=>n.e(6).then(n.bind(null, 163)),
            controller() {
                const e = document.querySelector("#register-button")
                  , t = document.querySelector("#authenticate-button")
                  , n = document.querySelector("#delete-button")
                  , r = document.querySelector("#loader")
                  , i = document.querySelector("#auth-dialog")
                  , o = i.querySelector('[slot="body"]');
                document.querySelector("#close-dialog").addEventListener("click", ()=>{
                    i.close()
                }
                );
                const s = e=>btoa(String.fromCharCode(...new Uint8Array(e)))
                  , a = ()=>{
                    localStorage.removeItem("credential"),
                    n.style.display = "none",
                    t.style.display = "none",
                    e.style.display = "block"
                }
                  , u = "https://api.whatpwacando.today/webauthn";
                null !== localStorage.getItem("credential") ? (t.style.display = "block",
                n.style.display = "block") : e.style.display = "block",
                e.addEventListener("click", async()=>{
                    e.disabled = !0,
                    r.style.display = "block";
                    try {
                        const a = await (await fetch(u + "/registration-options", {
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include"
                        })).json();
                        a.challenge = new Uint8Array(a.challenge.data),
                        a.user.id = new Uint8Array(a.user.id.data),
                        a.user.name = "pwa@whatpwacando.today",
                        a.user.displayName = "What PWA Can Do Today";
                        const c = await navigator.credentials.create({
                            publicKey: a
                        })
                          , l = s(c.rawId);
                        localStorage.setItem("credential", JSON.stringify({
                            credentialId: l
                        }));
                        const h = {
                            rawId: l,
                            response: {
                                attestationObject: s(c.response.attestationObject),
                                clientDataJSON: s(c.response.clientDataJSON),
                                id: c.id,
                                type: c.type
                            }
                        };
                        await (await fetch(u + "/register", {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                credential: h
                            }),
                            credentials: "include"
                        })).json(),
                        e.style.display = "none",
                        t.style.display = "block",
                        n.style.display = "block",
                        o.innerHTML = "Registration successful!",
                        i.open()
                    } catch (e) {
                        console.error("registration failed", e),
                        o.innerHTML = "Registration failed",
                        i.open()
                    } finally {
                        e.disabled = !1,
                        r.style.display = "none"
                    }
                }
                ),
                t.addEventListener("click", async()=>{
                    t.disabled = !0,
                    n.disabled = !0,
                    r.style.display = "block";
                    try {
                        const c = await (await fetch(u + "/authentication-options", {
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include"
                        })).json()
                          , {credentialId: l} = JSON.parse(localStorage.getItem("credential"));
                        c.challenge = new Uint8Array(c.challenge.data),
                        c.allowCredentials = [{
                            id: (e = l,
                            Uint8Array.from(atob(e), e=>e.charCodeAt(0))),
                            type: "public-key",
                            transports: ["internal"]
                        }];
                        const h = await navigator.credentials.get({
                            publicKey: c
                        })
                          , f = {
                            rawId: s(h.rawId),
                            response: {
                                authenticatorData: s(h.response.authenticatorData),
                                signature: s(h.response.signature),
                                userHandle: s(h.response.userHandle),
                                clientDataJSON: s(h.response.clientDataJSON),
                                id: h.id,
                                type: h.type
                            }
                        }
                          , d = await fetch(u + "/authenticate", {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                credential: f
                            }),
                            credentials: "include"
                        });
                        if (404 === d.status)
                            o.innerHTML = "Credential has expired, please register a new credential",
                            i.open(),
                            a();
                        else {
                            await d.json();
                            o.innerHTML = "Authentication successful!",
                            i.open()
                        }
                    } catch (e) {
                        console.error("authentication failed", e),
                        o.innerHTML = "Authentication failed",
                        i.open()
                    } finally {
                        t.disabled = !1,
                        n.disabled = !1,
                        r.style.display = "none"
                    }
                    var e
                }
                ),
                n.addEventListener("click", a)
            }
        }, {
            url: "/geolocation",
            template: ()=>n.e(8).then(n.bind(null, 180)),
            controller() {
                customElements.whenDefined("google-map").then(async()=>{
                    const e = document.querySelector("google-map")
                      , t = document.querySelector("#geolocation-dialog")
                      , n = document.querySelector("#geolocation-close");
                    let r;
                    const i = e=>e.preventDefault();
                    n.addEventListener("click", ()=>{
                        t.close(),
                        r.style.overflowY = "auto",
                        r.removeEventListener("touchmove", i)
                    }
                    );
                    try {
                        const {latitude: t, longitude: n} = await e.getCurrentPosition();
                        e.addMarker(t, n)
                    } catch (e) {
                        1 === e.PERMISSION_DENIED && (t.open(),
                        r = document.querySelector(".view.active .content"),
                        r.style.overflowY = "hidden",
                        r.addEventListener("touchmove", i))
                    }
                }
                )
            }
        }, {
            url: "/device-orientation",
            template: ()=>Promise.all([n.e(1), n.e(21)]).then(n.bind(null, 164)),
            controller() {
                const e = document.querySelector("#sensor-button1");
                e && e.addEventListener("click", ()=>{
                    let e = document.querySelector("#sensor-sheet");
                    document.querySelector("#sensor-sheet") ? e.open() : (document.body.insertAdjacentHTML("beforeend", ci),
                    setTimeout(()=>{
                        e = document.querySelector("#sensor-sheet"),
                        document.querySelector("#close-sensor-sheet").addEventListener("click", ()=>{
                            e.close()
                        }
                        ),
                        e.open()
                    }
                    , 1e3))
                }
                )
            }
        }, {
            url: "/device-motion",
            template: ()=>n.e(4).then(n.bind(null, 181)),
            controller() {
                const e = document.querySelector("#sensor-button2");
                e && e.addEventListener("click", ()=>{
                    let e = document.querySelector("#sensor-sheet");
                    document.querySelector("#sensor-sheet") ? e.open() : (document.body.insertAdjacentHTML("beforeend", ci),
                    setTimeout(()=>{
                        e = document.querySelector("#sensor-sheet"),
                        document.querySelector("#close-sensor-sheet").addEventListener("click", ()=>{
                            e.close()
                        }
                        ),
                        e.open()
                    }
                    , 1e3))
                }
                )
            }
        }, {
            url: "/web-share",
            template: ()=>Promise.all([n.e(0), n.e(16)]).then(n.bind(null, 165)),
            controller() {
                const e = document.querySelector("#share-button")
                  , t = document.querySelector("#title").value
                  , n = document.querySelector("#text").value
                  , r = document.querySelector("#url").value
                  , i = document.querySelector("#file")
                  , o = document.querySelector("#file-name");
                e.addEventListener("click", async()=>{
                    const e = i ? i.files : []
                      , o = {
                        title: t,
                        text: n,
                        url: r
                    };
                    e.length && (o.files = e);
                    try {
                        await navigator.share(o)
                    } catch (e) {
                        console.log("share error", e)
                    }
                }
                ),
                i && i.addEventListener("change", e=>{
                    const {files: t} = e.target
                      , {name: n} = t[0];
                    n && (o.innerText = n)
                }
                )
            },
            onExit() {
                const e = document.querySelector("#title")
                  , t = document.querySelector("#text")
                  , n = document.querySelector("#url")
                  , r = document.querySelector("#file")
                  , i = document.querySelector("#file-name");
                e.value = e.getAttribute("value"),
                t.value = t.getAttribute("value"),
                n.value = n.getAttribute("value"),
                r && i && (r.value = "",
                i.innerText = "")
            }
        }, {
            url: "/share-target",
            template: ()=>n.e(26).then(n.bind(null, 166)),
            controller({title: e="", text: t="", url: n=""}) {
                document.querySelector("#shared-content").innerHTML = `\n        <h3 id="title">${e}</h3>\n        <p id="text">${t}</p>\n        <p id="url">${n}</p>\n      `
            },
            onExit() {
                document.querySelector("#shared-content").innerHTML = ""
            }
        }, {
            url: "/multi-touch",
            template: ()=>n.e(19).then(n.bind(null, 182))
        }, {
            url: "/ar-vr",
            template: ()=>Promise.all([n.e(0), n.e(1), n.e(17)]).then(n.bind(null, 167)),
            controller() {
                document.querySelector(".image-model").addEventListener("load", ()=>{
                    document.querySelector("#ar-loader").style.display = "none"
                }
                )
            }
        }, {
            url: "/speech-synthesis",
            template: ()=>n.e(10).then(n.bind(null, 177))
        }, {
            url: "/speech-recognition",
            template: ()=>n.e(20).then(n.bind(null, 178)),
            onExit() {
                document.querySelector("speech-recognition").reset()
            }
        }, {
            url: "/page-lifecycle",
            template: ()=>n.e(25).then(n.bind(null, 168)),
            controller() {
                const e = ()=>"hidden" === document.visibilityState ? "hidden" : document.hasFocus() ? "active" : "passive"
                  , t = document.querySelector(".log");
                let n = e();
                const r = (e,r)=>{
                    if (e !== n) {
                        const i = `[${r}] State change: ${n} >>> ${e}`;
                        console.log(i),
                        (e=>{
                            t.insertAdjacentHTML("beforeend", `<p>${e}</p>`)
                        }
                        )(i),
                        n = e
                    }
                }
                ;
                ["pageshow", "focus", "blur", "visibilitychange", "resume"].forEach(t=>{
                    window.addEventListener(t, ()=>r(e(), t), {
                        capture: !0
                    })
                }
                ),
                document.addEventListener("visibilitychange", ()=>r(e(), "visibilitychange"), {
                    capture: !0
                }),
                window.addEventListener("freeze", ()=>{
                    r("frozen")
                }
                , {
                    capture: !0
                }),
                window.addEventListener("pagehide", e=>{
                    e.persisted ? r("frozen") : r("terminated")
                }
                , {
                    capture: !0
                })
            }
        }, {
            url: "/notifications",
            template: ()=>Promise.all([n.e(0), n.e(15)]).then(n.bind(null, 169)),
            async controller() {
                document.querySelector("#notification");
                const e = document.querySelector("#send")
                  , t = document.querySelector("#subscribe")
                  , n = document.querySelector("#unsubscribe")
                  , r = await navigator.serviceWorker.getRegistration()
                  , i = await r.pushManager.getSubscription()
                  , o = document.querySelector("#title")
                  , s = document.querySelector("#message")
                  , a = document.querySelector("#delay")
                  , u = document.querySelector("#interaction");
                i ? (t.disabled = !0,
                n.disabled = !1,
                e.disabled = !1) : (t.disabled = !1,
                n.disabled = !0,
                e.disabled = !0),
                t.addEventListener("click", async()=>{
                    const i = (await (await fetch(d + "/public-key")).json()).publicKey;
                    await l(r, i),
                    t.disabled = !0,
                    n.disabled = !1,
                    e.disabled = !1
                }
                ),
                n.addEventListener("click", async()=>{
                    const r = await f();
                    try {
                        await h(r) ? (console.log("successfully unsubscribed"),
                        t.disabled = !1,
                        n.disabled = !0,
                        e.disabled = !0) : console.log("unsubscribing was not successful")
                    } catch (e) {
                        console.log("error unsubscribing", e)
                    }
                }
                );
                const c = e=>{
                    const t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/")
                      , n = atob(t)
                      , r = new Uint8Array(n.length);
                    for (let e = 0; e < n.length; ++e)
                        r[e] = n.charCodeAt(e);
                    return r
                }
                  , l = (e,t)=>e.pushManager.subscribe({
                    userVisibleOnly: !0,
                    applicationServerKey: c(t)
                })
                  , h = e=>e.unsubscribe()
                  , f = ()=>r.pushManager.getSubscription()
                  , d = "https://ca9akfgcre.execute-api.us-east-1.amazonaws.com";
                e.addEventListener("click", ()=>{
                    (async({title: e, message: t, delay: n, interaction: r})=>{
                        const i = await f();
                        console.log("sending"),
                        fetch(d + "/send-message", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                pushSubscription: i,
                                title: e,
                                message: t,
                                delay: 1e3 * n,
                                interaction: r
                            })
                        })
                    }
                    )({
                        title: o.value,
                        message: s.value,
                        delay: "" !== a.value ? a.value : 0,
                        interaction: u.checked
                    })
                }
                )
            },
            onExit() {
                const e = document.querySelector("#notification")
                  , t = document.querySelector("#delay") || {};
                e.value = e.getAttribute("value"),
                t.value = e.getAttribute("value")
            }
        }, {
            url: "/bluetooth",
            template: ()=>Promise.all([n.e(0), n.e(12)]).then(n.bind(null, 170)),
            controller() {
                if ("bluetooth"in navigator) {
                    const e = document.querySelector("#scan")
                      , t = document.querySelector("#battery-indicator");
                    e.addEventListener("click", async()=>{
                        await (async({bleService: e, bleCharacteristic: n})=>{
                            try {
                                const r = await navigator.bluetooth.requestDevice({
                                    filters: [{
                                        services: [e]
                                    }]
                                });
                                r.addEventListener("gattserverdisconnected", ()=>{
                                    t.value = 0
                                }
                                );
                                const i = await r.gatt.connect()
                                  , o = await i.getPrimaryService(e)
                                  , s = await o.getCharacteristic(n);
                                return await s.startNotifications(),
                                s.addEventListener("characteristicvaluechanged", e=>{
                                    const r = e.target.value.getUint8(0);
                                    console.log(n + " changed", r),
                                    t.value = r
                                }
                                ),
                                s.readValue(),
                                s
                            } catch (e) {
                                console.error(e)
                            }
                        }
                        )({
                            bleService: "battery_service",
                            bleCharacteristic: "battery_level"
                        })
                    }
                    )
                }
            }
        }, {
            url: "/contacts",
            template: ()=>Promise.all([n.e(0), n.e(22)]).then(n.bind(null, 171)),
            async controller() {
                if ("contacts"in navigator && "ContactsManager"in window) {
                    const e = await navigator.contacts.getProperties()
                      , t = document.querySelector("#contacts")
                      , n = document.querySelector("#select-contacts");
                    t.innerHTML = "";
                    const r = e=>{
                        const n = e.reduce((e,t)=>`${e}\n            <p>\n              <span>\n                <i class="material-icons">person</i>\n                <strong>${t.name.join(", ")}</strong><br>\n              </span>\n              <span>\n                <i class="material-icons">mail_outline</i>\n                ${t.email.join(", ")}<br>\n              </span>\n              <span>\n                <i class="material-icons">phone</i>\n                ${t.tel.join(", ")}</p>\n              </span>\n            `, "");
                        t.innerHTML = n
                    }
                    ;
                    n.addEventListener("click", async t=>{
                        const n = await navigator.contacts.select(e, {
                            multiple: !0
                        });
                        r(n)
                    }
                    )
                }
            },
            onExit() {
                document.querySelector("#contacts").innerHTML = ""
            }
        }, {
            url: "/network-info",
            template: ()=>n.e(5).then(n.bind(null, 183))
        }, {
            url: "/info",
            template: ()=>n.e(9).then(n.bind(null, 172)),
            async controller() {
                await Promise.all([customElements.whenDefined("material-textfield"), customElements.whenDefined("material-button")]);
                const e = document.querySelector("#name")
                  , t = document.querySelector("#email")
                  , n = document.querySelector("#message")
                  , r = document.querySelector("#challenge")
                  , i = document.querySelector("#send-button")
                  , o = document.querySelector("#result")
                  , s = ()=>i.disabled = !(e.isValid() && t.isValid() && "7" === r.value && n.validity.valid);
                e.addEventListener("change", s),
                t.addEventListener("change", s),
                n.addEventListener("keyup", s),
                r.addEventListener("keyup", s),
                i.addEventListener("click", async()=>{
                    i.disabled = !0;
                    const s = {
                        name: e.value,
                        email: t.value,
                        message: n.value,
                        challenge: r.value
                    };
                    ui.post("contactformpwa", "/contact", {
                        body: s
                    }).then(i=>{
                        e.value = "",
                        t.value = "",
                        n.value = "",
                        r.value = "",
                        o.textContent = "Message sent!"
                    }
                    ).catch(e=>{
                        console.log("error", e),
                        o.classList.add("error"),
                        o.textContent = "Something went wrong, please try again"
                    }
                    ).finally(()=>{
                        setTimeout(()=>{
                            o.textContent = "",
                            o.classList.remove("error")
                        }
                        , 5e3)
                    }
                    )
                }
                ),
                s()
            }
        }, {
            url: "/payment",
            template: ()=>Promise.all([n.e(0), n.e(11)]).then(n.bind(null, 173)),
            controller() {
                const e = document.querySelector("#apple-pay-button")
                  , t = document.querySelector("#payment-button")
                  , n = {
                    supportedMethods: "https://apple.com/apple-pay",
                    data: {
                        version: 3,
                        merchantIdentifier: "merchant.whatpwacando.today",
                        merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
                        supportedNetworks: ["amex", "discover", "masterCard", "visa", "maestro"],
                        countryCode: "US"
                    }
                }
                  , r = {
                    supportedMethods: "https://google.com/pay",
                    data: {
                        environment: "TEST",
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        merchantInfo: {
                            merchantName: "What PWA Can Do Today"
                        },
                        allowedPaymentMethods: [{
                            type: "CARD",
                            parameters: {
                                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                                allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
                            },
                            tokenizationSpecification: {
                                type: "PAYMENT_GATEWAY",
                                parameters: {
                                    gateway: "example",
                                    gatewayMerchantId: "exampleGatewayMerchantId"
                                }
                            }
                        }]
                    }
                }
                  , i = {
                    id: "order-123",
                    displayItems: [{
                        label: "PWA Demo Payment",
                        amount: {
                            currency: "USD",
                            value: "0.01"
                        }
                    }],
                    total: {
                        label: "Total",
                        amount: {
                            currency: "USD",
                            value: "0.01"
                        }
                    }
                };
                if (e && e.addEventListener("click", async()=>{
                    const e = new PaymentRequest([n],i)
                      , t = await e.show();
                    console.log(t)
                }
                ),
                t) {
                    const e = {
                        requestPayerEmail: !0,
                        requestPayerName: !0
                    };
                    t.addEventListener("click", async()=>{
                        const t = new PaymentRequest([r],i,e)
                          , n = await t.show();
                        console.log(n)
                    }
                    )
                }
            }
        }, {
            url: "/wake-lock",
            template: ()=>Promise.all([n.e(0), n.e(23)]).then(n.bind(null, 174)),
            controller() {
                const e = document.querySelector("#wake-lock");
                let t = null;
                e.addEventListener("change", ({detail: n})=>{
                    const {checked: r} = n;
                    r ? (async()=>{
                        try {
                            t = await navigator.wakeLock.request("screen"),
                            t.addEventListener("release", ()=>{
                                e.toggle(),
                                console.log("Wake Lock was released")
                            }
                            ),
                            console.log("Wake Lock is active")
                        } catch (e) {
                            console.error(`${e.name}, ${e.message}`)
                        }
                    }
                    )() : (console.log("releasing wakeLock"),
                    t.release(),
                    t = null)
                }
                )
            }
        }, {
            url: "/vibration",
            template: ()=>Promise.all([n.e(0), n.e(13)]).then(n.bind(null, 175)),
            controller() {
                const e = document.querySelector("#pattern-maker")
                  , t = document.querySelector("#pattern-visualizer")
                  , n = document.querySelector("#record")
                  , r = document.querySelector("#play")
                  , i = document.querySelector("#stop")
                  , o = document.querySelector("#ripple");
                t.innerHTML = "";
                let s = [];
                let a = 0
                  , u = 0
                  , c = 0;
                const l = []
                  , h = t.offsetWidth
                  , f = e=>{
                    const t = [...e.changedTouches];
                    if (t.length) {
                        const {pageX: e, pageY: n} = t[0];
                        o.style.top = n + "px",
                        o.style.left = e + "px"
                    }
                }
                  , d = i=>{
                    i.preventDefault();
                    const {type: p} = i
                      , g = [...i.changedTouches];
                    if (l.map(cancelAnimationFrame),
                    "touchstart" === p ? e.addEventListener("touchmove", f) : e.removeEventListener("touchmove", f),
                    o.style.display = "touchstart" === p ? "block" : "none",
                    g.length) {
                        const {pageX: e, pageY: t} = g[0];
                        o.style.top = t + "px",
                        o.style.left = e + "px"
                    }
                    if (0 !== a && Date.now() - a >= 3e3)
                        return !1;
                    0 === a && (a = Date.now(),
                    t.innerHTML = "",
                    s = []),
                    0 !== c && s.push(u - c),
                    c = Date.now();
                    const m = "touchstart" === p ? "on" : "off";
                    t.insertAdjacentHTML("beforeend", `<div class="${m}"></div>`);
                    const y = t.lastChild
                      , v = ()=>{
                        u = Date.now();
                        const i = (u - c) / 3e3 * h;
                        if (y.style.width = i + "px",
                        u - a < 3e3)
                            l.push(requestAnimationFrame(v));
                        else {
                            s.push(u - c),
                            a = 0,
                            u = 0,
                            c = 0,
                            n.disabled = !1,
                            r.disabled = !1,
                            o.style.display = "none";
                            const i = [...t.querySelectorAll("div")].reduce((e,t)=>e + parseFloat(t.style.width), 0)
                              , l = h - i;
                            y.style.width = parseFloat(y.style.width) + l + "px",
                            e.removeEventListener("touchstart", d),
                            e.removeEventListener("touchend", d)
                        }
                    }
                    ;
                    requestAnimationFrame(v)
                }
                ;
                let p;
                r.addEventListener("click", ()=>{
                    r.disabled = !0,
                    i.disabled = !1,
                    navigator.vibrate(s),
                    p = setTimeout(()=>{
                        r.disabled = !1,
                        i.disabled = !0
                    }
                    , 3e3)
                }
                ),
                i.addEventListener("click", ()=>{
                    navigator.vibrate(0),
                    clearTimeout(p),
                    r.disabled = !1,
                    i.disabled = !0
                }
                ),
                n.addEventListener("click", ()=>{
                    t.innerHTML = "",
                    n.disabled = !0,
                    r.disabled = !0,
                    e.addEventListener("touchstart", d),
                    e.addEventListener("touchend", d)
                }
                )
            }
        }, {
            url: "/nfc",
            template: ()=>Promise.all([n.e(0), n.e(14)]).then(n.bind(null, 176)),
            controller() {
                const e = document.querySelector("#scan")
                  , t = document.querySelector("#stop-scan")
                  , n = document.querySelector("#write")
                  , r = document.querySelector("#name")
                  , i = document.querySelector("#age")
                  , o = document.querySelector("#city")
                  , s = document.querySelector("#nfc-dialog")
                  , a = document.querySelector("#close-dialog");
                let u = !1;
                a.addEventListener("click", ()=>{
                    s.close()
                }
                ),
                t.disabled = !0;
                const c = ({message: e})=>{
                    const {records: t} = e;
                    return t.map(e=>{
                        const {id: t, recordType: n, mediaType: r, encoding: i, data: o} = e
                          , a = i ? new TextDecoder(i) : new TextDecoder;
                        switch (n) {
                        case "url":
                        case "text":
                            console.log("data", a.decode(o));
                            break;
                        case "mime":
                            (e=>{
                                s.body = [...Object.entries(e)].reduce((e,[t,n])=>{
                                    return `${e}<p>${r = t,
                                    `${r.substr(0, 1).toUpperCase()}${r.substr(1)}`}: ${n}</p>`;
                                    var r
                                }
                                , ""),
                                s.open()
                            }
                            )(JSON.parse(a.decode(o)))
                        }
                        return ["url", "text"].includes(n) ? a.decode(o) : JSON.parse(a.decode(o))
                    }
                    )
                }
                ;
                let l;
                const h = ()=>{
                    l.abort(),
                    e.disabled = !1,
                    t.disabled = !0,
                    u = !1
                }
                ;
                e.addEventListener("click", ()=>(e.disabled = !0,
                t.disabled = !1,
                new Promise((n,r)=>{
                    try {
                        const e = new NDEFReader;
                        l = new AbortController,
                        e.scan({
                            signal: l.signal
                        }),
                        u = !0,
                        e.addEventListener("reading", e=>n(c(e))),
                        e.addEventListener("readingerror", e=>{
                            console.log("error reading tag", e),
                            r(e)
                        }
                        )
                    } catch (n) {
                        console.log("error scanning tag:", n),
                        e.disabled = !1,
                        t.disabled = !0,
                        u = !1,
                        r(n)
                    }
                }
                ))),
                t.addEventListener("click", h),
                n.addEventListener("click", async()=>{
                    n.disabled = !0,
                    u && h();
                    const e = new TextEncoder
                      , t = {
                        name: r.value,
                        age: i.value,
                        city: o.value
                    }
                      , s = [];
                    s.push({
                        recordType: "mime",
                        mediaType: "application/json",
                        data: e.encode(JSON.stringify(t))
                    });
                    const a = new NDEFReader;
                    l = new AbortController,
                    a.scan({
                        signal: l.signal
                    });
                    try {
                        await a.write({
                            records: s
                        }, {
                            overwrite: !0
                        }),
                        setTimeout(()=>l.abort(), 3e3)
                    } catch (e) {
                        console.log("error writing tag", e)
                    } finally {
                        n.disabled = !1
                    }
                }
                )
            }
        }, {
            url: "/file-system",
            template: ()=>n.e(7).then(n.bind(null, 184)),
            controller() {
                const e = document.querySelector("#file-content")
                  , t = document.querySelector("file-tree")
                  , n = document.querySelector("#save-button")
                  , r = document.querySelector("#save-as-button");
                n.addEventListener("click", ()=>{
                    t.saveFile(e.querySelector("textarea").value)
                }
                ),
                r.addEventListener("click", ()=>t.saveFileAs(e.querySelector("textarea").value)),
                t.addEventListener("file-selected", ({detail: t})=>{
                    n.disabled = !0,
                    r.disabled = !0;
                    const {type: i, contents: o} = t.file;
                    switch (i) {
                    case "image/png":
                    case "image/jpg":
                    case "image/jpeg":
                    case "image/gif":
                        e.innerHTML = `<img src="${o}">`;
                        break;
                    case "image/svg+xml":
                        e.innerHTML = o;
                        break;
                    default:
                        e.innerHTML = `<textarea>${o}</textarea>`,
                        n.disabled = !1,
                        r.disabled = !1
                    }
                }
                )
            }
        }, {
            url: "/barcode",
            template: ()=>n.e(18).then(n.bind(null, 185)),
            controller() {
                const e = document.querySelector("code-reader")
                  , t = document.querySelector("#scan-button")
                  , n = document.querySelector("#stop-scan-button")
                  , r = document.querySelector("#code-dialog")
                  , i = r.querySelector('[slot="body"]')
                  , o = document.querySelector("#cancel-dialog")
                  , s = document.querySelector("#close-dialog");
                t.addEventListener("click", ()=>{
                    e.scan()
                }
                ),
                n.addEventListener("click", ()=>{
                    e.stopScan()
                }
                ),
                s.addEventListener("click", ()=>{
                    r.close()
                }
                ),
                e.addEventListener("scan-start", ()=>{
                    t.disabled = !0,
                    n.disabled = !1
                }
                ),
                e.addEventListener("scan-stop", ()=>{
                    t.disabled = !1,
                    n.disabled = !0
                }
                ),
                e.addEventListener("result", t=>{
                    const {rawValue: n} = t.detail.code;
                    let a, u;
                    try {
                        a = new URL(n),
                        u = `Navigate to ${n}?`
                    } catch (t) {
                        a = null,
                        u = "Detected code: " + n
                    }
                    i.textContent = u,
                    r.open(),
                    s.addEventListener("click", t=>{
                        a && window.open(a, "_blank"),
                        r.close(),
                        e.scan()
                    }
                    ),
                    o.addEventListener("click", ()=>{
                        r.close(),
                        e.scan()
                    }
                    )
                }
                )
            },
            onExit() {
                document.querySelector("code-reader").stopScan()
            }
        }],
        onAfterRender: ()=>{
            "onLine"in navigator && (navigator.onLine ? pi() : di())
        }
    });
    class hi extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({
                mode: "open"
            }).innerHTML = '\n      <style>\n        :host {\n          --header-background: #ffffff;\n          --body-background: #ffffff;\n          --footer-background: #ffffff;\n          --backdrop-color: rgba(128,128,128,0.5);\n          --sheet-width: 100%;\n          --sheet-height: auto;\n          --slide-height: auto;\n          --max-height: auto;\n          --animation-duration: 0.2s;\n          display: none;\n        }\n        \n        @media (min-width: 768px) {\n          :host {\n            --sheet-width: 70%;\n          }\n        }\n        \n        @media (min-width: 1024px) {\n          :host {\n            --sheet-width: 40%;\n          }\n        }\n        \n        @media (min-width: 1200px) {\n          :host {\n            --sheet-width: 30%;\n          }\n        }\n        \n        #backdrop {\n          position: fixed;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          background: var(--backdrop-color);\n          animation-duration: var(--animation-duration);\n          animation-fill-mode: forwards;\n          animation-timing-function: ease-out;\n          z-index: 9999;\n          -webkit-overflow-scrolling: touch;\n        }\n        #sheet {\n          display: flex;\n          flex-direction: column;\n          position: fixed;\n          bottom: var(--slide-height);\n          right: 0;\n          width: var(--sheet-width);\n          height: var(--sheet-height);\n          max-height: var(--max-height);\n          background: transparent;\n          animation-name: slideup;\n          animation-duration: 0.25s;\n          animation-fill-mode: forwards;\n          animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);\n        }\n        :host([left]) #sheet {\n            left: 0;\n        }\n        :host([center]) #sheet {\n            left: 50%;\n            transform: translateX(-50%);\n        }\n        header {\n          background: var(--header-background);\n          /*display: flex;*/\n          align-items: center;\n          padding: 0 10px;\n          max-height: 50px;\n          border-bottom: 1px solid #cccccc;\n          border-radius: 4px 4px 0 0;\n        }\n        main {\n          background: var(--body-background);\n          padding: 0 10px;\n          flex-grow: 1;\n          overflow-y: scroll;\n        }\n        footer {\n          background: var(--footer-background);\n          /*display: flex;*/\n          align-items: center;\n          padding: 0 10px;\n          max-height: 50px;\n          border-top: 1px solid #cccccc;\n        }\n        @supports (padding: max(0px)) {\n          footer {\n            padding-bottom: env(safe-area-inset-bottom);\n          }\n        }\n        ::slotted([slot]) {\n          margin: 10px;\n        }\n        ::slotted([slot]:empty) {\n          margin: 0px;\n        }\n        \n        #backdrop.close {\n          animation-duration: calc(var(--animation-duration) * 1.7);\n          animation-fill-mode: forwards;\n          animation-timing-function: ease-out;\n        }\n        \n        #backdrop.close #sheet {\n          animation-name: slidedown;\n          animation-duration: 0.2s;\n          animation-fill-mode: forwards;\n          animation-timing-function: cubic-bezier(0.4, 0.0, 1, 1);\n        }\n        \n        @keyframes fadein {\n          from {\n            opacity: 0;\n          }\n          to {\n            opacity: 1;\n          }\n        }\n        \n        @keyframes slideup {\n          from {\n            bottom: var(--sheet-height);\n          }\n          to {\n            bottom: var(--slide-height);\n          }\n        }\n        \n        @keyframes fadeout {\n          from {\n            opacity: 1;\n          }\n          to {\n            opacity: 0;\n          }\n        }\n        \n        @keyframes slidedown {\n          from {\n            bottom: var(--slide-height);\n          }\n          to {\n            bottom: var(--sheet-height);\n          }\n        }\n    </style>\n    \n    <div id="backdrop">\n      <div id="sheet">\n        <header>\n          <slot name="header"></slot>\n        </header>\n        <main>\n          <slot name="body"></slot>\n        </main>\n        <footer>\n          <slot name="footer"></slot>\n        </footer>\n      </div>\n    </div>\n  ',
            this.backdrop = this.shadowRoot.querySelector("#backdrop"),
            this.sheet = this.shadowRoot.querySelector("#sheet"),
            this.content = this.shadowRoot.querySelector("main"),
            this.header = this.shadowRoot.querySelector("header")
        }
        connectedCallback() {
            setTimeout(()=>{
                this.style.visibility = "hidden",
                this.style.display = "block",
                this.host = this.shadowRoot.getRootNode().host;
                const {height: e} = this.sheet.getBoundingClientRect()
                  , t = window.innerHeight
                  , n = e > t ? t : e;
                this.startSlideHeight = e >= t ? -t / 2 : e,
                this.host.style.setProperty("--sheet-height", `-${n}px`),
                this.sheet.style.setProperty("--slide-height", "0px"),
                this.sheet.style.setProperty("--max-height", n + "px"),
                this.style.display = "none",
                this.style.visibility = "visible",
                this.backdrop.addEventListener("click", this.handleClick.bind(this)),
                this.backdrop.addEventListener("animationend", this.handleAnimationEnd.bind(this)),
                this.sheet.addEventListener("animationend", this.handleAnimationEnd.bind(this)),
                this.sheet.addEventListener("touchmove", this.handleTouchMove.bind(this), {
                    passive: !1
                }),
                this.sheet.addEventListener("touchstart", this.handleTouchStart.bind(this), {
                    passive: !1
                })
            }
            , 1e3)
        }
        handleTouchStart(e) {
            this.sheet.style.animationName = "none",
            this.startY = e.touches[0].clientY + this.content.scrollTop,
            this.prevY = this.startY,
            this.curY = parseFloat(this.sheet.style.getPropertyValue("--slide-height"))
        }
        handleTouchMove(e) {
            const t = e.touches[0].clientY
              , n = this.prevY < t ? "down" : "up";
            this.prevY = t;
            const r = this.startY - t
              , i = this.curY + r
              , o = i > 0 || i > 0 ? 0 : i;
            0 === this.content.scrollTop && ((i <= 0 || 0 === i && "down" === n) && e.cancelable && e.preventDefault(),
            this.sheet.style.setProperty("--slide-height", o + "px"))
        }
        handleAnimationEnd(e) {
            "slidedown" === e.animationName && (this.backdrop.style.animationName = "fadeout"),
            "fadeout" === e.animationName && (this.style.display = "none",
            this.backdrop.classList.remove("close"),
            this.sheet.style.animationName = "slideup",
            this.backdrop.style.animationName = "none")
        }
        handleClick(e) {
            e.composedPath()[0] === this.backdrop && this.close()
        }
        open() {
            this.sheet.style.setProperty("--slide-height", this.startSlideHeight + "px"),
            this.style.display = "block",
            document.body.style.overflow = "hidden"
        }
        close() {
            this.sheet.style.animationName = "slidedown",
            this.backdrop.classList.add("close"),
            document.body.style.overflow = ""
        }
    }
    customElements.define("material-bottom-sheet", hi);
    var fi = {
        aws_project_region: "us-east-1",
        aws_cloud_logic_custom: [{
            name: "contactformpwa",
            endpoint: "https://6srbe7uzgd.execute-api.us-east-1.amazonaws.com/production",
            region: "us-east-1"
        }, {
            name: "webauthn",
            endpoint: "https://qls9aymov0.execute-api.us-east-1.amazonaws.com/production",
            region: "us-east-1"
        }],
        aws_content_delivery_bucket: "whatpwacandotoday-20191219194136-hostingbucket-production",
        aws_content_delivery_bucket_region: "us-east-1",
        aws_content_delivery_url: "https://d5rbblcrnyxpk.cloudfront.net"
    };
    Yt.configure(fi);
    const di = ()=>{
        document.querySelectorAll(".network-status").forEach(e=>e.classList.add("offline")),
        document.querySelectorAll('material-app-bar [slot="right-content"]').forEach(e=>e.style.display = "block")
    }
      , pi = ()=>{
        document.querySelectorAll(".network-status").forEach(e=>e.classList.remove("offline")),
        document.querySelectorAll('material-app-bar [slot="right-content"]').forEach(e=>e.style.display = "none")
    }
    ;
    window.addEventListener("beforeinstallprompt", e=>{
        e.preventDefault(),
        window.deferredPrompt = e
    }
    ),
    window.addEventListener("offline", di),
    window.addEventListener("online", pi),
    window.addEventListener("load", ()=>{
        Object(r.b)() && di()
    }
    ),
    document.addEventListener("visibilitychange", ()=>{
        console.log("visibilitychange", document.visibilityState),
        "visible" === document.visibilityState && navigator.serviceWorker.controller.postMessage({
            type: "clearBadges"
        })
    }
    ),
    navigator.serviceWorker.addEventListener("message", e=>{
        const {type: t} = e.data;
        switch (t) {
        case "message":
            console.log("message from sw", e.data.message)
        }
    }
    );
    const gi = window.devicePixelRatio || 1
      , mi = window.screen.width * gi
      , yi = window.screen.height * gi;
    if (Object(r.a)() && 1242 === mi && 2688 === yi) {
        const e = document.querySelector('meta[name="viewport"]')
          , t = e.getAttribute("content");
        e.setAttribute("content", t + ", viewport-fit=cover")
    }
    const vi = document.querySelector("main");
    vi && vi.addEventListener("touchmove", e=>{
        e.composedPath().find(e=>e.tagName && (e.matches("material-app-bar") || e.matches("footer"))) && e.preventDefault()
    }
    )
}
]);
