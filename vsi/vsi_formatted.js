(function() {
    (function() {
        /*

Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/
        var g, aa = function(a) {
            var b = 0;
            return function() {
                return b < a.length ? {
                    done: !1,
                    value: a[b++]
                } : {
                    done: !0
                }
            }
        }, ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            if (a == Array.prototype || a == Object.prototype)
                return a;
            a[b] = c.value;
            return a
        }
        , ca = function(a) {
            a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
            for (var b = 0; b < a.length; ++b) {
                var c = a[b];
                if (c && c.Math == Math)
                    return c
            }
            throw Error("Cannot find global object");
        }, da = ca(this), m = function(a, b) {
            if (b)
                a: {
                    var c = da;
                    a = a.split(".");
                    for (var d = 0; d < a.length - 1; d++) {
                        var e = a[d];
                        if (!(e in c))
                            break a;
                        c = c[e]
                    }
                    a = a[a.length - 1];
                    d = c[a];
                    b = b(d);
                    b != d && null != b && ba(c, a, {
                        configurable: !0,
                        writable: !0,
                        value: b
                    })
                }
        };
        m("Symbol", function(a) {
            if (a)
                return a;
            var b = function(e, f) {
                this.g = e;
                ba(this, "description", {
                    configurable: !0,
                    writable: !0,
                    value: f
                })
            };
            b.prototype.toString = function() {
                return this.g
            }
            ;
            var c = 0
              , d = function(e) {
                if (this instanceof d)
                    throw new TypeError("Symbol is not a constructor");
                return new b("jscomp_symbol_" + (e || "") + "_" + c++,e)
            };
            return d
        });
        m("Symbol.iterator", function(a) {
            if (a)
                return a;
            a = Symbol("Symbol.iterator");
            for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
                var d = da[b[c]];
                "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                    configurable: !0,
                    writable: !0,
                    value: function() {
                        return ea(aa(this))
                    }
                })
            }
            return a
        });
        var ea = function(a) {
            a = {
                next: a
            };
            a[Symbol.iterator] = function() {
                return this
            }
            ;
            return a
        }, q = function(a) {
            var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
            return b ? b.call(a) : {
                next: aa(a)
            }
        }, fa = function(a) {
            if (!(a instanceof Array)) {
                a = q(a);
                for (var b, c = []; !(b = a.next()).done; )
                    c.push(b.value);
                a = c
            }
            return a
        }, ha = "function" == typeof Object.create ? Object.create : function(a) {
            var b = function() {};
            b.prototype = a;
            return new b
        }
        , ia;
        if ("function" == typeof Object.setPrototypeOf)
            ia = Object.setPrototypeOf;
        else {
            var ja;
            a: {
                var ka = {
                    a: !0
                }
                  , la = {};
                try {
                    la.__proto__ = ka;
                    ja = la.a;
                    break a
                } catch (a) {}
                ja = !1
            }
            ia = ja ? function(a, b) {
                a.__proto__ = b;
                if (a.__proto__ !== b)
                    throw new TypeError(a + " is not extensible");
                return a
            }
            : null
        }
        var ma = ia
          , na = function(a, b) {
            a.prototype = ha(b.prototype);
            a.prototype.constructor = a;
            if (ma)
                ma(a, b);
            else
                for (var c in b)
                    if ("prototype" != c)
                        if (Object.defineProperties) {
                            var d = Object.getOwnPropertyDescriptor(b, c);
                            d && Object.defineProperty(a, c, d)
                        } else
                            a[c] = b[c];
            a.ib = b.prototype
        }
          , r = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }
          , oa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
            for (var c = 1; c < arguments.length; c++) {
                var d = arguments[c];
                if (d)
                    for (var e in d)
                        r(d, e) && (a[e] = d[e])
            }
            return a
        }
        ;
        m("Object.assign", function(a) {
            return a || oa
        });
        m("Object.is", function(a) {
            return a ? a : function(b, c) {
                return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
            }
        });
        m("Array.prototype.includes", function(a) {
            return a ? a : function(b, c) {
                var d = this;
                d instanceof String && (d = String(d));
                var e = d.length;
                c = c || 0;
                for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                    var f = d[c];
                    if (f === b || Object.is(f, b))
                        return !0
                }
                return !1
            }
        });
        m("String.prototype.includes", function(a) {
            return a ? a : function(b, c) {
                if (null == this)
                    throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
                if (b instanceof RegExp)
                    throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
                return -1 !== (this + "").indexOf(b, c || 0)
            }
        });
        m("Object.entries", function(a) {
            return a ? a : function(b) {
                var c = [], d;
                for (d in b)
                    r(b, d) && c.push([d, b[d]]);
                return c
            }
        });
        var pa = function(a, b) {
            a instanceof String && (a += "");
            var c = 0
              , d = !1
              , e = {
                next: function() {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
            e[Symbol.iterator] = function() {
                return e
            }
            ;
            return e
        };
        m("Array.prototype.entries", function(a) {
            return a ? a : function() {
                return pa(this, function(b, c) {
                    return [b, c]
                })
            }
        });
        m("WeakMap", function(a) {
            function b() {}
            function c(h) {
                var l = typeof h;
                return "object" === l && null !== h || "function" === l
            }
            function d(h) {
                if (!r(h, f)) {
                    var l = new b;
                    ba(h, f, {
                        value: l
                    })
                }
            }
            function e(h) {
                var l = Object[h];
                l && (Object[h] = function(p) {
                    if (p instanceof b)
                        return p;
                    Object.isExtensible(p) && d(p);
                    return l(p)
                }
                )
            }
            if (function() {
                if (!a || !Object.seal)
                    return !1;
                try {
                    var h = Object.seal({})
                      , l = Object.seal({})
                      , p = new a([[h, 2], [l, 3]]);
                    if (2 != p.get(h) || 3 != p.get(l))
                        return !1;
                    p.delete(h);
                    p.set(l, 4);
                    return !p.has(h) && 4 == p.get(l)
                } catch (z) {
                    return !1
                }
            }())
                return a;
            var f = "$jscomp_hidden_" + Math.random();
            e("freeze");
            e("preventExtensions");
            e("seal");
            var n = 0
              , k = function(h) {
                this.g = (n += Math.random() + 1).toString();
                if (h) {
                    h = q(h);
                    for (var l; !(l = h.next()).done; )
                        l = l.value,
                        this.set(l[0], l[1])
                }
            };
            k.prototype.set = function(h, l) {
                if (!c(h))
                    throw Error("Invalid WeakMap key");
                d(h);
                if (!r(h, f))
                    throw Error("WeakMap key fail: " + h);
                h[f][this.g] = l;
                return this
            }
            ;
            k.prototype.get = function(h) {
                return c(h) && r(h, f) ? h[f][this.g] : void 0
            }
            ;
            k.prototype.has = function(h) {
                return c(h) && r(h, f) && r(h[f], this.g)
            }
            ;
            k.prototype.delete = function(h) {
                return c(h) && r(h, f) && r(h[f], this.g) ? delete h[f][this.g] : !1
            }
            ;
            return k
        });
        m("Map", function(a) {
            if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                    return !1;
                try {
                    var k = Object.seal({
                        x: 4
                    })
                      , h = new a(q([[k, "s"]]));
                    if ("s" != h.get(k) || 1 != h.size || h.get({
                        x: 4
                    }) || h.set({
                        x: 4
                    }, "t") != h || 2 != h.size)
                        return !1;
                    var l = h.entries()
                      , p = l.next();
                    if (p.done || p.value[0] != k || "s" != p.value[1])
                        return !1;
                    p = l.next();
                    return p.done || 4 != p.value[0].x || "t" != p.value[1] || !l.next().done ? !1 : !0
                } catch (z) {
                    return !1
                }
            }())
                return a;
            var b = new WeakMap
              , c = function(k) {
                this.i = {};
                this.g = f();
                this.size = 0;
                if (k) {
                    k = q(k);
                    for (var h; !(h = k.next()).done; )
                        h = h.value,
                        this.set(h[0], h[1])
                }
            };
            c.prototype.set = function(k, h) {
                k = 0 === k ? 0 : k;
                var l = d(this, k);
                l.list || (l.list = this.i[l.id] = []);
                l.D ? l.D.value = h : (l.D = {
                    next: this.g,
                    I: this.g.I,
                    head: this.g,
                    key: k,
                    value: h
                },
                l.list.push(l.D),
                this.g.I.next = l.D,
                this.g.I = l.D,
                this.size++);
                return this
            }
            ;
            c.prototype.delete = function(k) {
                k = d(this, k);
                return k.D && k.list ? (k.list.splice(k.index, 1),
                k.list.length || delete this.i[k.id],
                k.D.I.next = k.D.next,
                k.D.next.I = k.D.I,
                k.D.head = null,
                this.size--,
                !0) : !1
            }
            ;
            c.prototype.clear = function() {
                this.i = {};
                this.g = this.g.I = f();
                this.size = 0
            }
            ;
            c.prototype.has = function(k) {
                return !!d(this, k).D
            }
            ;
            c.prototype.get = function(k) {
                return (k = d(this, k).D) && k.value
            }
            ;
            c.prototype.entries = function() {
                return e(this, function(k) {
                    return [k.key, k.value]
                })
            }
            ;
            c.prototype.keys = function() {
                return e(this, function(k) {
                    return k.key
                })
            }
            ;
            c.prototype.values = function() {
                return e(this, function(k) {
                    return k.value
                })
            }
            ;
            c.prototype.forEach = function(k, h) {
                for (var l = this.entries(), p; !(p = l.next()).done; )
                    p = p.value,
                    k.call(h, p[1], p[0], this)
            }
            ;
            c.prototype[Symbol.iterator] = c.prototype.entries;
            var d = function(k, h) {
                var l = h && typeof h;
                "object" == l || "function" == l ? b.has(h) ? l = b.get(h) : (l = "" + ++n,
                b.set(h, l)) : l = "p_" + h;
                var p = k.i[l];
                if (p && r(k.i, l))
                    for (k = 0; k < p.length; k++) {
                        var z = p[k];
                        if (h !== h && z.key !== z.key || h === z.key)
                            return {
                                id: l,
                                list: p,
                                index: k,
                                D: z
                            }
                    }
                return {
                    id: l,
                    list: p,
                    index: -1,
                    D: void 0
                }
            }
              , e = function(k, h) {
                var l = k.g;
                return ea(function() {
                    if (l) {
                        for (; l.head != k.g; )
                            l = l.I;
                        for (; l.next != l.head; )
                            return l = l.next,
                            {
                                done: !1,
                                value: h(l)
                            };
                        l = null
                    }
                    return {
                        done: !0,
                        value: void 0
                    }
                })
            }
              , f = function() {
                var k = {};
                return k.I = k.next = k.head = k
            }
              , n = 0;
            return c
        });
        var t = this || self
          , qa = function(a, b, c) {
            a = a.split(".");
            c = c || t;
            a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
            for (var d; a.length && (d = a.shift()); )
                a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
        }
          , ra = /^[\w+/_-]+[=]{0,2}$/
          , sa = null
          , ta = function(a) {
            return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && ra.test(a) ? a : ""
        }
          , ua = function(a) {
            a.ca = void 0;
            a.K = function() {
                return a.ca ? a.ca : a.ca = new a
            }
        }
          , u = function(a) {
            var b = typeof a;
            return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
        }
          , va = function(a) {
            var b = u(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        }
          , wa = function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        }
          , xa = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        }
          , ya = function(a, b, c) {
            if (!a)
                throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var e = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(e, d);
                    return a.apply(b, e)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        }
          , v = function(a, b, c) {
            Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? v = xa : v = ya;
            return v.apply(null, arguments)
        }
          , x = function(a, b) {
            w.prototype[a] = b
        }
          , y = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.ib = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.pb = function(d, e, f) {
                for (var n = Array(arguments.length - 2), k = 2; k < arguments.length; k++)
                    n[k - 2] = arguments[k];
                return b.prototype[e].apply(d, n)
            }
        }
          , za = function(a) {
            return a
        };
        function Aa(a) {
            if (Error.captureStackTrace)
                Error.captureStackTrace(this, Aa);
            else {
                var b = Error().stack;
                b && (this.stack = b)
            }
            a && (this.message = String(a))
        }
        y(Aa, Error);
        Aa.prototype.name = "CustomError";
        var Ba = function(a, b) {
            a = a.split("%s");
            for (var c = "", d = a.length - 1, e = 0; e < d; e++)
                c += a[e] + (e < b.length ? b[e] : "%s");
            Aa.call(this, c + a[d])
        };
        y(Ba, Aa);
        Ba.prototype.name = "AssertionError";
        var Ca = function(a, b, c, d) {
            var e = "Assertion failed";
            if (c) {
                e += ": " + c;
                var f = d
            } else
                a && (e += ": " + a,
                f = b);
            throw new Ba("" + e,f || []);
        }
          , A = function(a, b, c) {
            a || Ca("", null, b, Array.prototype.slice.call(arguments, 2))
        }
          , B = function(a, b) {
            throw new Ba("Failure" + (a ? ": " + a : ""),Array.prototype.slice.call(arguments, 1));
        }
          , Da = function(a, b, c) {
            "number" !== typeof a && Ca("Expected number but got %s: %s.", [u(a), a], b, Array.prototype.slice.call(arguments, 2));
            return a
        }
          , Ea = function(a, b, c) {
            "string" !== typeof a && Ca("Expected string but got %s: %s.", [u(a), a], b, Array.prototype.slice.call(arguments, 2));
            return a
        }
          , Fa = function(a, b, c) {
            Array.isArray(a) || Ca("Expected array but got %s: %s.", [u(a), a], b, Array.prototype.slice.call(arguments, 2))
        }
          , Ga = function(a, b, c) {
            wa(a) && 1 == a.nodeType || Ca("Expected Element but got %s: %s.", [u(a), a], b, Array.prototype.slice.call(arguments, 2));
            return a
        }
          , Ia = function(a, b, c, d) {
            a instanceof b || Ca("Expected instanceof %s but got %s.", [Ha(b), Ha(a)], c, Array.prototype.slice.call(arguments, 3))
        }
          , Ha = function(a) {
            return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
        };
        var C = Array.prototype.forEach ? function(a, b, c) {
            A(null != a.length);
            Array.prototype.forEach.call(a, b, c)
        }
        : function(a, b, c) {
            for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
                f in e && b.call(c, e[f], f, a)
        }
          , Ja = Array.prototype.map ? function(a, b) {
            A(null != a.length);
            return Array.prototype.map.call(a, b, void 0)
        }
        : function(a, b) {
            for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++)
                f in e && (d[f] = b.call(void 0, e[f], f, a));
            return d
        }
          , Ka = Array.prototype.reduce ? function(a, b, c) {
            A(null != a.length);
            return Array.prototype.reduce.call(a, b, c)
        }
        : function(a, b, c) {
            var d = c;
            C(a, function(e, f) {
                d = b.call(void 0, d, e, f, a)
            });
            return d
        }
          , Ma = Array.prototype.every ? function(a, b) {
            A(null != a.length);
            return Array.prototype.every.call(a, b, void 0)
        }
        : function(a, b) {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && !b.call(void 0, d[e], e, a))
                    return !1;
            return !0
        }
        ;
        function Na(a) {
            return Array.prototype.concat.apply([], arguments)
        }
        function Oa(a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++)
                    c[d] = a[d];
                return c
            }
            return []
        }
        function Pa(a) {
            for (var b = [], c = 0; c < a; c++)
                b[c] = "";
            return b
        }
        ;var Xa = function(a, b) {
            if (b)
                a = a.replace(Qa, "&amp;").replace(Ra, "&lt;").replace(Sa, "&gt;").replace(Ta, "&quot;").replace(Ua, "&#39;").replace(Va, "&#0;");
            else {
                if (!Wa.test(a))
                    return a;
                -1 != a.indexOf("&") && (a = a.replace(Qa, "&amp;"));
                -1 != a.indexOf("<") && (a = a.replace(Ra, "&lt;"));
                -1 != a.indexOf(">") && (a = a.replace(Sa, "&gt;"));
                -1 != a.indexOf('"') && (a = a.replace(Ta, "&quot;"));
                -1 != a.indexOf("'") && (a = a.replace(Ua, "&#39;"));
                -1 != a.indexOf("\x00") && (a = a.replace(Va, "&#0;"))
            }
            return a
        }
          , Qa = /&/g
          , Ra = /</g
          , Sa = />/g
          , Ta = /"/g
          , Ua = /'/g
          , Va = /\x00/g
          , Wa = /[\x00&<>"']/;
        var D;
        a: {
            var Ya = t.navigator;
            if (Ya) {
                var Za = Ya.userAgent;
                if (Za) {
                    D = Za;
                    break a
                }
            }
            D = ""
        }
        var E = function(a) {
            return -1 != D.indexOf(a)
        };
        var $a = function(a, b) {
            for (var c in a)
                b.call(void 0, a[c], c, a)
        }
          , ab = function(a) {
            for (var b in a)
                delete a[b]
        }
          , bb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ")
          , cb = function(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d)
                    a[c] = d[c];
                for (var f = 0; f < bb.length; f++)
                    c = bb[f],
                    Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
        var db = function() {
            return E("Firefox") || E("FxiOS")
        }
          , eb = function() {
            return (E("Chrome") || E("CriOS")) && !E("Edge")
        };
        var fb = function(a) {
            var b = !1, c;
            return function() {
                b || (c = a(),
                b = !0);
                return c
            }
        }
          , gb = function(a) {
            var b = 0
              , c = !1
              , d = []
              , e = function() {
                b = 0;
                c && (c = !1,
                f())
            }
              , f = function() {
                b = t.setTimeout(e, 1E3);
                var n = d;
                d = [];
                a.apply(void 0, n)
            };
            return function(n) {
                d = arguments;
                b ? c = !0 : f()
            }
        };
        var hb, ib = function() {
            if (void 0 === hb) {
                var a = null
                  , b = t.trustedTypes;
                if (b && b.createPolicy) {
                    try {
                        a = b.createPolicy("goog#html", {
                            createHTML: za,
                            createScript: za,
                            createScriptURL: za
                        })
                    } catch (c) {
                        t.console && t.console.error(c.message)
                    }
                    hb = a
                } else
                    hb = a
            }
            return hb
        };
        var kb = function(a, b) {
            this.g = b === jb ? a : ""
        };
        g = kb.prototype;
        g.ba = !0;
        g.aa = function() {
            return this.g.toString()
        }
        ;
        g.ja = !0;
        g.ia = function() {
            return 1
        }
        ;
        g.toString = function() {
            return this.g + ""
        }
        ;
        var jb = {};
        var mb = function(a, b, c) {
            this.g = c === lb ? a : "";
            this.i = b
        };
        g = mb.prototype;
        g.ja = !0;
        g.ia = function() {
            return this.i
        }
        ;
        g.ba = !0;
        g.aa = function() {
            return this.g.toString()
        }
        ;
        g.toString = function() {
            return this.g.toString()
        }
        ;
        var nb = function(a) {
            if (a instanceof mb && a.constructor === mb)
                return a.g;
            B("expected object of type SafeHtml, got '" + a + "' of type " + u(a));
            return "type_error:SafeHtml"
        }
          , ob = function(a) {
            if (a instanceof mb)
                return a;
            var b = "object" == typeof a
              , c = null;
            b && a.ja && (c = a.ia());
            a = Xa(b && a.ba ? a.aa() : String(a));
            a = (b = ib()) ? b.createHTML(a) : a;
            return new mb(a,c,lb)
        }
          , lb = {}
          , pb = new mb(t.trustedTypes && t.trustedTypes.emptyHTML || "",0,lb);
        var qb = {
            MATH: !0,
            SCRIPT: !0,
            STYLE: !0,
            SVG: !0,
            TEMPLATE: !0
        }
          , rb = fb(function() {
            if ("undefined" === typeof document)
                return !1;
            var a = document.createElement("div")
              , b = document.createElement("div");
            b.appendChild(document.createElement("div"));
            a.appendChild(b);
            if (!a.firstChild)
                return !1;
            b = a.firstChild.firstChild;
            a.innerHTML = nb(pb);
            return !b.parentElement
        })
          , sb = function(a, b) {
            if (a.tagName && qb[a.tagName.toUpperCase()])
                throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
            if (rb())
                for (; a.lastChild; )
                    a.removeChild(a.lastChild);
            a.innerHTML = nb(b)
        };
        var tb = function(a) {
            return a = Xa(a, void 0)
        }
          , ub = String.prototype.repeat ? function(a, b) {
            return a.repeat(b)
        }
        : function(a, b) {
            return Array(b + 1).join(a)
        }
          , F = function(a, b) {
            a = String(a);
            var c = a.indexOf(".");
            -1 == c && (c = a.length);
            return ub("0", Math.max(0, b - c)) + a
        };
        var vb = function() {
            return E("iPhone") && !E("iPod") && !E("iPad")
        };
        var wb = function(a) {
            wb[" "](a);
            return a
        };
        wb[" "] = function() {}
        ;
        var xb = E("Opera"), yb = E("Trident") || E("MSIE"), zb = E("Edge"), Ab = E("Gecko") && !(-1 != D.toLowerCase().indexOf("webkit") && !E("Edge")) && !(E("Trident") || E("MSIE")) && !E("Edge"), Bb = -1 != D.toLowerCase().indexOf("webkit") && !E("Edge"), Cb = Bb && E("Mobile"), Db = function() {
            var a = t.document;
            return a ? a.documentMode : void 0
        }, Eb;
        a: {
            var Fb = ""
              , Gb = function() {
                var a = D;
                if (Ab)
                    return /rv:([^\);]+)(\)|;)/.exec(a);
                if (zb)
                    return /Edge\/([\d\.]+)/.exec(a);
                if (yb)
                    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (Bb)
                    return /WebKit\/(\S+)/.exec(a);
                if (xb)
                    return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();
            Gb && (Fb = Gb ? Gb[1] : "");
            if (yb) {
                var Hb = Db();
                if (null != Hb && Hb > parseFloat(Fb)) {
                    Eb = String(Hb);
                    break a
                }
            }
            Eb = Fb
        }
        var Ib = Eb, Jb;
        if (t.document && yb) {
            var Kb = Db();
            Jb = Kb ? Kb : parseInt(Ib, 10) || void 0
        } else
            Jb = void 0;
        var Lb = Jb;
        try {
            (new self.OffscreenCanvas(0,0)).getContext("2d")
        } catch (a) {}
        var Mb;
        (Mb = !yb) || (Mb = 9 <= Number(Lb));
        var Nb = Mb;
        var G = function(a) {
            var b = document;
            Ea(a);
            b = "string" === typeof a ? b.getElementById(a) : a;
            return b = Ga(b, "No element found with id: " + a)
        }
          , Pb = function(a, b) {
            $a(b, function(c, d) {
                c && "object" == typeof c && c.ba && (c = c.aa());
                "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Ob.hasOwnProperty(d) ? a.setAttribute(Ob[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
            })
        }
          , Ob = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        }
          , Sb = function(a, b, c) {
            var d = arguments
              , e = document
              , f = String(d[0])
              , n = d[1];
            if (!Nb && n && (n.name || n.type)) {
                f = ["<", f];
                n.name && f.push(' name="', tb(n.name), '"');
                if (n.type) {
                    f.push(' type="', tb(n.type), '"');
                    var k = {};
                    cb(k, n);
                    delete k.type;
                    n = k
                }
                f.push(">");
                f = f.join("")
            }
            f = Qb(e, f);
            n && ("string" === typeof n ? f.className = n : Array.isArray(n) ? f.className = n.join(" ") : Pb(f, n));
            2 < d.length && Rb(e, f, d);
            return f
        }
          , Rb = function(a, b, c) {
            function d(k) {
                k && b.appendChild("string" === typeof k ? a.createTextNode(k) : k)
            }
            for (var e = 2; e < c.length; e++) {
                var f = c[e];
                if (!va(f) || wa(f) && 0 < f.nodeType)
                    d(f);
                else {
                    a: {
                        if (f && "number" == typeof f.length) {
                            if (wa(f)) {
                                var n = "function" == typeof f.item || "string" == typeof f.item;
                                break a
                            }
                            if ("function" === typeof f) {
                                n = "function" == typeof f.item;
                                break a
                            }
                        }
                        n = !1
                    }
                    C(n ? Oa(f) : f, d)
                }
            }
        }
          , Qb = function(a, b) {
            b = String(b);
            "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
            return a.createElement(b)
        };
        var Vb = function(a, b) {
            this.j = a;
            this.C = b;
            this.i = G("h5-player");
            Tb = this.i.clientWidth;
            Ub = this.i.clientHeight;
            this.B = G("h5-ad-container") || Sb("DIV");
            this.o = !1;
            this.m = null;
            this.u = new window.google.ima.AdDisplayContainer(this.B);
            this.l = new window.google.ima.AdsLoader(this.u);
            this.s = [];
            this.g = null;
            this.A = G("play-button");
            a = this.l.getSettings();
            a.setPlayerType("h5_vsi");
            a.setDisableCustomPlaybackForIOS10Plus(!0);
            this.l.addEventListener(window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.Sa, !1, this);
            this.l.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, this.ka, !1, this);
            var c = null;
            window.addEventListener("resize", function() {
                this.g && (clearTimeout(c),
                c = t.setTimeout(function() {
                    Tb = this.i.clientWidth;
                    Ub = this.i.clientHeight;
                    this.g.resize(this.i.clientWidth, this.i.clientHeight, window.google.ima.ViewMode.NORMAL)
                }
                .bind(this), 100))
            }
            .bind(this))
        }, Tb, Ub;
        g = Vb.prototype;
        g.setVpaidMode = function(a) {
            this.l.getSettings().setVpaidMode(Wb[a])
        }
        ;
        g.pause = function() {
            this.g && this.g.pause()
        }
        ;
        g.setVolume = function(a) {
            this.g && this.g.setVolume(a)
        }
        ;
        g.getVolume = function() {
            return this.g ? this.g.getVolume() : -1
        }
        ;
        g.getCurrentTime = function() {
            return this.g && this.m ? this.m.getDuration() - this.g.getRemainingTime() : -1
        }
        ;
        g.getDuration = function() {
            return this.g && this.m ? this.m.getDuration() : -1
        }
        ;
        g.Sa = function(a) {
            this.j.log("Ads loaded.");
            var b = new window.google.ima.AdsRenderingSettings;
            b.mimeTypes = this.s;
            b.enablePreloading = G("preloading-true").checked;
            a = this.g = a.getAdsManager(this.C.g, b);
            a.addEventListener(window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.Ua, !1, this);
            a.addEventListener(window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.Va, !1, this);
            a.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, this.ka, !1, this);
            for (b = 0; b < Xb.length; b++)
                a.addEventListener(Xb[b], this.Ra, !1, this);
            a.init(this.i.clientWidth, this.i.clientHeight, window.google.ima.ViewMode.NORMAL);
            a.start()
        }
        ;
        g.Ua = function() {
            var a = this.j;
            a.j = !0;
            a.g.pause()
        }
        ;
        g.Va = function() {
            this.o || Yb(this.j)
        }
        ;
        g.Ra = function(a) {
            this.j.o && this.j.o(a);
            this.j.log("Ad event: " + a.type);
            switch (a.type) {
            case window.google.ima.AdEvent.Type.STARTED:
                this.m = a.getAd();
                this.m.isLinear() || Yb(this.j);
                break;
            case window.google.ima.AdEvent.Type.LOG:
                (a = a.getAdData()) && a.adError && this.j.log("Non-fatal error occurred: " + a.adError.getMessage());
                break;
            case window.google.ima.AdEvent.Type.DURATION_CHANGE:
                this.m = a.getAd();
                break;
            case window.google.ima.AdEvent.Type.INTERACTION:
                this.j.log("Interaction ID: " + a.getAdData().id);
                break;
            case window.google.ima.AdEvent.Type.PAUSED:
                this.A.className = "play-button"
            }
        }
        ;
        g.ka = function(a) {
            this.j.log("Ad error: " + a.getError().toString());
            this.g && this.g.destroy();
            Yb(this.j)
        }
        ;
        var Xb = [window.google.ima.AdEvent.Type.AD_METADATA, window.google.ima.AdEvent.Type.ALL_ADS_COMPLETED, window.google.ima.AdEvent.Type.CLICK, window.google.ima.AdEvent.Type.COMPLETE, window.google.ima.AdEvent.Type.DURATION_CHANGE, window.google.ima.AdEvent.Type.FIRST_QUARTILE, window.google.ima.AdEvent.Type.IMPRESSION, window.google.ima.AdEvent.Type.INTERACTION, window.google.ima.AdEvent.Type.LINEAR_CHANGED, window.google.ima.AdEvent.Type.LOADED, window.google.ima.AdEvent.Type.LOG, window.google.ima.AdEvent.Type.MIDPOINT, window.google.ima.AdEvent.Type.PAUSED, window.google.ima.AdEvent.Type.RESUMED, window.google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, window.google.ima.AdEvent.Type.SKIPPED, window.google.ima.AdEvent.Type.STARTED, window.google.ima.AdEvent.Type.THIRD_QUARTILE, window.google.ima.AdEvent.Type.USER_CLOSE, window.google.ima.AdEvent.Type.VOLUME_CHANGED, window.google.ima.AdEvent.Type.VOLUME_MUTED]
          , Wb = {
            "vpaid-enabled": window.google.ima.ImaSdkSettings.VpaidMode.ENABLED,
            "vpaid-insecure": window.google.ima.ImaSdkSettings.VpaidMode.INSECURE,
            "vpaid-disabled": window.google.ima.ImaSdkSettings.VpaidMode.DISABLED
        };
        var Zb = function() {
            this.g = G("h5-player");
            this.i = null
        }
          , $b = function(a, b) {
            Cb ? (a.i = b,
            a.g.addEventListener("loadedmetadata", a.i, !1),
            a.g.load()) : b()
        }
          , ac = function(a) {
            a.i && a.g.removeEventListener("loadedmetadata", a.i, !1)
        };
        g = Zb.prototype;
        g.load = function() {
            this.g.load()
        }
        ;
        g.play = function() {
            this.g.play()
        }
        ;
        g.pause = function() {
            this.g.pause()
        }
        ;
        g.setVolume = function(a) {
            this.g.volume = a
        }
        ;
        g.getCurrentTime = function() {
            return this.g.currentTime
        }
        ;
        g.getDuration = function() {
            return this.g.duration
        }
        ;
        var H = function() {
            this.H = this.B = this.j = !1;
            this.o = this.u = this.F = null;
            this.g = new Zb;
            this.i = new Vb(this,this.g);
            this.C = this.A = "";
            this.s = [];
            this.m = this.l = 0;
            var a = v(this.J, this);
            this.g.g.addEventListener("ended", a, !1)
        };
        H.prototype.setVpaidMode = function(a) {
            this.i.setVpaidMode(a)
        }
        ;
        H.prototype.setVolume = function(a) {
            this.i.setVolume(a);
            this.g.setVolume(a)
        }
        ;
        var cc = function(a, b) {
            a.A = b;
            bc(a);
            $b(a.g, function() {
                ac(a.g);
                var c = a.i
                  , d = a.A
                  , e = new window.google.ima.AdsRequest;
                e.adTagUrl = d;
                e.linearAdSlotWidth = e.nonLinearAdSlotWidth = Tb;
                e.linearAdSlotHeight = e.nonLinearAdSlotHeight = Ub;
                c.l.requestAds(e)
            })
        }
          , dc = function(a, b) {
            a.C = b;
            bc(a);
            $b(a.g, function() {
                ac(a.g);
                var c = a.i
                  , d = a.C
                  , e = new window.google.ima.AdsRequest;
                Tb = c.i.clientWidth;
                Ub = c.i.clientHeight;
                e.adsResponse = d;
                e.linearAdSlotWidth = e.nonLinearAdSlotWidth = c.i.clientWidth;
                e.linearAdSlotHeight = e.nonLinearAdSlotHeight = c.i.clientHeight;
                c.l.requestAds(e)
            })
        }
          , bc = function(a) {
            var b = a.i;
            b.g && b.g.destroy();
            b.l && b.l.contentComplete();
            b.o = !1;
            a.i.s = a.s;
            setInterval(v(a.G, a), 250);
            a.B || (a.g.load(),
            a.i.u.initialize(),
            a.B = !0);
            a.H && (a.g.g.currentTime = 0);
            a.H = !0
        };
        H.prototype.play = function() {
            setInterval(v(this.G, this), 250);
            if (this.j) {
                var a = this.i;
                a.g && a.g.resume()
            } else
                this.g.play()
        }
        ;
        H.prototype.pause = function() {
            this.j ? this.i.pause() : this.g.pause()
        }
        ;
        H.prototype.log = function(a) {
            this.F(a)
        }
        ;
        var Yb = function(a) {
            a.g.play();
            a.j = !1
        };
        H.prototype.G = function() {
            this.j ? (this.l = this.i.getCurrentTime(),
            this.m = this.i.getDuration()) : (this.l = this.g.getCurrentTime(),
            this.m = this.g.getDuration());
            this.u({
                currentTime: this.l,
                duration: this.m
            })
        }
        ;
        H.prototype.J = function() {
            var a = this.i;
            a.o = !0;
            a.l.contentComplete()
        }
        ;
        qa("VideoSuiteInspector.players.h5player.HTML5Player", H, void 0);
        var ec = db()
          , fc = vb() || E("iPod")
          , gc = E("iPad")
          , hc = E("Android") && !(eb() || db() || E("Opera") || E("Silk"))
          , ic = eb()
          , jc = E("Safari") && !(eb() || E("Coast") || E("Opera") || E("Edge") || E("Edg/") || E("OPR") || db() || E("Silk") || E("Android")) && !(vb() || E("iPad") || E("iPod"));
        var I = function() {}
          , kc = "function" == typeof Uint8Array
          , J = function(a, b, c, d) {
            a.g = null;
            b || (b = []);
            a.s = void 0;
            a.l = -1;
            a.i = b;
            a: {
                if (b = a.i.length) {
                    --b;
                    var e = a.i[b];
                    if (!(null === e || "object" != typeof e || Array.isArray(e) || kc && e instanceof Uint8Array)) {
                        a.m = b - a.l;
                        a.j = e;
                        break a
                    }
                }
                a.m = Number.MAX_VALUE
            }
            a.o = {};
            if (c)
                for (b = 0; b < c.length; b++)
                    e = c[b],
                    e < a.m ? (e += a.l,
                    a.i[e] = a.i[e] || lc) : (mc(a),
                    a.j[e] = a.j[e] || lc);
            if (d && d.length)
                for (b = 0; b < d.length; b++)
                    nc(a, d[b])
        }
          , lc = Object.freeze ? Object.freeze([]) : []
          , mc = function(a) {
            var b = a.m + a.l;
            a.i[b] || (a.j = a.i[b] = {})
        }
          , K = function(a, b) {
            if (b < a.m) {
                b += a.l;
                var c = a.i[b];
                return c !== lc ? c : a.i[b] = []
            }
            if (a.j)
                return c = a.j[b],
                c === lc ? a.j[b] = [] : c
        }
          , L = function(a, b, c) {
            a = K(a, b);
            return null == a ? c : a
        }
          , oc = function(a, b, c) {
            Ia(a, I);
            b < a.m ? a.i[b + a.l] = c : (mc(a),
            a.j[b] = c)
        }
          , nc = function(a, b) {
            for (var c, d, e = 0; e < b.length; e++) {
                var f = b[e]
                  , n = K(a, f);
                null != n && (c = f,
                d = n,
                oc(a, f, void 0))
            }
            return c ? (oc(a, c, d),
            c) : 0
        }
          , pc = function(a, b, c) {
            a.g || (a.g = {});
            if (!a.g[c]) {
                var d = K(a, c);
                d && (a.g[c] = new b(d))
            }
            return a.g[c]
        }
          , qc = function(a, b) {
            a.g || (a.g = {});
            if (!a.g[2]) {
                var c = K(a, 2);
                for (var d = [], e = 0; e < c.length; e++)
                    d[e] = new b(c[e]);
                a.g[2] = d
            }
            b = a.g[2];
            b == lc && (b = a.g[2] = []);
            return b
        }
          , rc = function(a) {
            if (a.g)
                for (var b in a.g) {
                    var c = a.g[b];
                    if (Array.isArray(c))
                        for (var d = 0; d < c.length; d++)
                            c[d] && rc(c[d]);
                    else
                        c && rc(c)
                }
            return a.i
        };
        I.prototype.toString = function() {
            return rc(this).toString()
        }
        ;
        var sc = document;
        var tc = function(a, b) {
            var c = void 0 === c ? {} : c;
            this.error = a;
            this.context = b.context;
            this.msg = b.message || "";
            this.id = b.id || "jserror";
            this.meta = c
        };
        var uc = function(a, b, c) {
            a.addEventListener && a.addEventListener(b, c, !1)
        }
          , vc = function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        }
          , wc = function(a) {
            var b = void 0 === b ? {} : b;
            if ("function" === typeof window.CustomEvent)
                var c = new CustomEvent("rum_blp",b);
            else
                c = document.createEvent("CustomEvent"),
                c.initCustomEvent("rum_blp", !!b.bubbles, !!b.cancelable, b.detail);
            a.dispatchEvent(c)
        };
        var xc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/
          , yc = function(a, b) {
            if (a) {
                a = a.split("&");
                for (var c = 0; c < a.length; c++) {
                    var d = a[c].indexOf("=")
                      , e = null;
                    if (0 <= d) {
                        var f = a[c].substring(0, d);
                        e = a[c].substring(d + 1)
                    } else
                        f = a[c];
                    b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
                }
            }
        };
        var zc = function(a) {
            try {
                var b;
                if (b = !!a && null != a.location.href)
                    a: {
                        try {
                            wb(a.foo);
                            b = !0;
                            break a
                        } catch (c) {}
                        b = !1
                    }
                return b
            } catch (c) {
                return !1
            }
        }
          , Ac = function(a, b) {
            if (a)
                for (var c in a)
                    Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
        }
          , Bc = /https?:\/\/[^\/]+/
          , Cc = function(a) {
            return (a = Bc.exec(a)) && a[0] || ""
        };
        var Dc = function(a) {
            a = void 0 === a ? t : a;
            var b = a.context || a.AMP_CONTEXT_DATA;
            if (!b)
                try {
                    b = a.parent.context || a.parent.AMP_CONTEXT_DATA
                } catch (c) {}
            try {
                if (b && b.pageViewId && b.canonicalUrl)
                    return b
            } catch (c) {}
            return null
        };
        var Ec = !!window.google_async_iframe_id
          , Fc = Ec && window.parent || window
          , Gc = function() {
            if (Ec && !zc(Fc)) {
                var a = "." + sc.domain;
                try {
                    for (; 2 < a.split(".").length && !zc(Fc); )
                        sc.domain = a = a.substr(a.indexOf(".") + 1),
                        Fc = window.parent
                } catch (b) {}
                zc(Fc) || (Fc = window)
            }
            return Fc
        };
        var Hc = function() {
            this.S = {}
        }
          , Ic = null
          , Jc = {}
          , Kc = (Jc[8] = "google_prev_ad_formats_by_region",
        Jc[9] = "google_prev_ad_slotnames_by_region",
        Jc);
        var Lc = function() {
            this.name = "CONFIG";
            this.value = 700
        };
        Lc.prototype.toString = function() {
            return this.name
        }
        ;
        var Mc = new Lc, Nc = function() {
            this.level = null;
            this.g = []
        }, Oc = function() {
            this.entries = {};
            var a = new Nc;
            a.level = Mc;
            this.entries[""] = a
        }, Pc, Qc = function(a, b, c) {
            var d = a.entries[b];
            if (d)
                return void 0 !== c && (d.level = c),
                d;
            d = Qc(a, b.substr(0, b.lastIndexOf(".")));
            var e = new Nc;
            a.entries[b] = e;
            d.g.push(e);
            void 0 !== c && (e.level = c);
            return e
        }, Rc = function(a) {
            var b = Qc;
            Pc || (Pc = new Oc);
            b(Pc, a, void 0)
        };
        Rc("contentads.shared.adtech.iabtcfv2.js.PublisherTcCodec");
        Rc("contentads.shared.adtech.iabtcfv2.js.TcfCoreStringCodec");
        var Sc = function() {
            var a;
            this.g = a = void 0 === a ? {} : a
        };
        Sc.prototype.reset = function() {
            this.g = {}
        }
        ;
        var Tc = null;
        var Uc = function() {
            var a = t.performance;
            return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Date.now()
        }
          , Vc = function() {
            var a = void 0 === a ? t : a;
            return (a = a.performance) && a.now ? a.now() : null
        };
        var Wc = function(a, b) {
            var c = Vc() || Uc();
            this.label = a;
            this.type = b;
            this.value = c;
            this.duration = 0;
            this.uniqueId = Math.random();
            this.slotId = void 0
        };
        var M = t.performance
          , Xc = !!(M && M.mark && M.measure && M.clearMarks)
          , Yc = fb(function() {
            var a;
            if (a = Xc) {
                var b;
                if (null === Tc) {
                    Tc = "";
                    try {
                        a = "";
                        try {
                            a = t.top.location.hash
                        } catch (c) {
                            a = t.location.hash
                        }
                        a && (Tc = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                    } catch (c) {}
                }
                b = Tc;
                a = !!b.indexOf && 0 <= b.indexOf("1337")
            }
            return a
        })
          , N = function(a, b) {
            this.events = [];
            this.g = b || t;
            var c = null;
            b && (b.google_js_reporting_queue = b.google_js_reporting_queue || [],
            this.events = b.google_js_reporting_queue,
            c = b.google_measure_js_timing);
            this.o = Yc() || (null != c ? c : Math.random() < a)
        };
        N.prototype.B = function() {
            this.o = !1;
            this.events != this.g.google_js_reporting_queue && (Yc() && C(this.events, Zc),
            this.events.length = 0)
        }
        ;
        N.prototype.G = function(a) {
            !this.o || 2048 < this.events.length || this.events.push(a)
        }
        ;
        var Zc = function(a) {
            a && M && Yc() && (M.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"),
            M.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"))
        };
        N.prototype.start = function(a, b) {
            if (!this.o)
                return null;
            a = new Wc(a,b);
            b = "goog_" + a.label + "_" + a.uniqueId + "_start";
            M && Yc() && M.mark(b);
            return a
        }
        ;
        N.prototype.end = function(a) {
            if (this.o && (A(a),
            "number" === typeof a.value)) {
                a.duration = (Vc() || Uc()) - a.value;
                var b = "goog_" + a.label + "_" + a.uniqueId + "_end";
                M && Yc() && M.mark(b);
                this.G(a)
            }
        }
        ;
        var $c = function(a) {
            var b;
            a.visibilityState ? b = "visibilitychange" : a.mozVisibilityState ? b = "mozvisibilitychange" : a.webkitVisibilityState && (b = "webkitvisibilitychange");
            return b
        };
        var ad = function(a) {
            a = a._google_rum_ns_ = a._google_rum_ns_ || {};
            return a.pq = a.pq || []
        };
        var bd = function(a, b, c) {
            Ac(b, function(d, e) {
                var f = c && c[e];
                !d && 0 !== d || f || (a += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(String(d)),
                c && (c[e] = !0))
            });
            return a
        }
          , gd = function(a, b, c, d, e, f, n, k) {
            f = void 0 === f ? Infinity : f;
            n = void 0 === n ? !1 : n;
            N.call(this, a, k);
            var h = this;
            this.u = 0;
            this.J = f;
            this.U = b;
            this.H = c;
            this.s = d;
            this.V = e;
            a = this.g.navigator;
            this.O = !("csi.gstatic.com" !== this.H || !a || !a.sendBeacon);
            this.l = {};
            this.F = {};
            this.g.performance && this.g.performance.now || O(this, "dat", 1);
            a && a.deviceMemory && O(this, "dmc", a.deviceMemory);
            this.W = !n;
            this.M = function() {
                h.g.setTimeout(function() {
                    return P(h)
                }, 1100)
            }
            ;
            this.Y = [];
            this.P = function() {
                cd(h, 1)
            }
            ;
            this.N = function() {
                cd(h, 2)
            }
            ;
            this.X = gb(function() {
                P(h)
            });
            this.Z = function() {
                var p = h.g.document;
                (null != p.hidden ? p.hidden : null != p.mozHidden ? p.mozHidden : null != p.webkitHidden && p.webkitHidden) && h.X()
            }
            ;
            this.A = this.g.setTimeout(function() {
                return P(h)
            }, 5E3);
            this.m = {};
            this.j = b.length + c.length + d.length + e.length + 3;
            this.i = 0;
            C(this.events, function(p) {
                return dd(h, p)
            });
            this.C = [];
            b = ad(this.g);
            var l = function(p) {
                Fa(p);
                A(2 === p.length);
                var z = Ea(p[0]);
                p = Ea(p[1]);
                var La = z.length + p.length + 2;
                8E3 < h.j + h.i + La && P(h);
                h.C.push([z, p]);
                h.i += La;
                6E3 <= h.j + h.i && P(h);
                return 0
            };
            C(b, function(p) {
                return l(p)
            });
            b.length = 0;
            b.push = l;
            ed(this);
            fd(this)
        };
        na(gd, N);
        var fd = function(a) {
            "complete" === a.g.document.readyState ? a.g.setTimeout(function() {
                return P(a)
            }, 0) : uc(a.g, "load", a.M);
            var b = $c(a.g.document);
            "undefined" !== typeof b && uc(a.g, b, a.Z);
            uc(a.g, "unload", a.P);
            uc(a.g, "pagehide", a.N)
        }
          , O = function(a, b, c) {
            c = String(c);
            a.j = null != a.l[b] ? a.j + (c.length - a.l[b].length) : a.j + (b.length + c.length + 2);
            a.l[b] = c
        }
          , hd = function(a) {
            null != a.l.uet && (a.j -= 3 + a.l.uet.length + 2,
            delete a.l.uet)
        }
          , id = function(a, b, c, d, e) {
            e = void 0 === e ? "" : e;
            var f = null == a.m[b] ? b.length + c.length + 2 : d ? c.length + (void 0 === e ? "" : e).length : c.length - a.m[b].length;
            8E3 < a.j + a.i + f && (P(a),
            f = b.length + c.length + 2);
            a.m[b] = d && null != a.m[b] ? a.m[b] + ("" + (void 0 === e ? "" : e) + c) : c;
            a.i += f;
            6E3 <= a.j + a.i && P(a)
        }
          , P = function(a) {
            if (a.o && a.W) {
                try {
                    if (a.i) {
                        var b = a.m;
                        a.u++;
                        var c = jd(a, b);
                        b = !1;
                        try {
                            b = !!(a.O && a.g.navigator && a.g.navigator.sendBeacon(c, null))
                        } catch (z) {
                            a.O = !1
                        }
                        if (!b) {
                            var d = a.g;
                            d.google_image_requests || (d.google_image_requests = []);
                            var e = d.document.createElement("img");
                            e.src = c;
                            d.google_image_requests.push(e)
                        }
                        ed(a);
                        a.u === a.J && a.B()
                    }
                } catch (z) {
                    c = z;
                    var f = void 0 === f ? "jserror" : f;
                    if (!(Math.random() > (void 0 === n ? .01 : n) || (c.error && c.meta && c.id || (c = new tc(c,{
                        context: 358,
                        id: f
                    })),
                    t.google_js_errors = t.google_js_errors || [],
                    t.google_js_errors.push(c),
                    t.error_rep_loaded))) {
                        var n = t.document;
                        f = t.location.protocol + "//pagead2.googlesyndication.com/pagead/js/err_rep.js";
                        c = (c = ib()) ? c.createScriptURL(f) : f;
                        f = n.createElement("script");
                        c = new kb(c,jb);
                        b: {
                            try {
                                var k = f && f.ownerDocument
                                  , h = k && (k.defaultView || k.parentWindow);
                                h = h || t;
                                if (h.Element && h.Location) {
                                    var l = h;
                                    break b
                                }
                            } catch (La) {}
                            l = null
                        }
                        if (l && "undefined" != typeof l.HTMLScriptElement && (!f || !(f instanceof l.HTMLScriptElement) && (f instanceof l.Location || f instanceof l.Element))) {
                            if (wa(f))
                                try {
                                    var p = f.constructor.displayName || f.constructor.name || Object.prototype.toString.call(f)
                                } catch (La) {
                                    p = "<object could not be stringified>"
                                }
                            else
                                p = void 0 === f ? "undefined" : null === f ? "null" : typeof f;
                            B("Argument is not a %s (or a non-Element, non-Location mock); got: %s", "HTMLScriptElement", p)
                        }
                        c instanceof kb && c.constructor === kb ? l = c.g : (B("expected object of type TrustedResourceUrl, got '" + c + "' of type " + u(c)),
                        l = "type_error:TrustedResourceUrl");
                        f.src = l;
                        (l = f.ownerDocument && f.ownerDocument.defaultView) && l != t ? l = ta(l.document) : (null === sa && (sa = ta(t.document)),
                        l = sa);
                        l && f.setAttribute("nonce", l);
                        (l = n.getElementsByTagName("script")[0]) && l.parentNode && l.parentNode.insertBefore(f, l);
                        t.error_rep_loaded = !0
                    }
                }
                a.m = {};
                a.i = 0;
                a.events.length = 0;
                a.g.clearTimeout(a.A);
                a.A = 0
            }
        }
          , jd = function(a, b) {
            A(2 == a.s.split("?").length);
            A("=" == a.s[a.s.length - 1]);
            var c = a.U + "//" + a.H + a.s + a.V
              , d = {};
            c = bd(c, a.l, d);
            c = bd(c, b, d);
            a.g.google_timing_params && (c = bd(c, a.g.google_timing_params, d),
            a.g.google_timing_params = void 0);
            C(a.C, function(e) {
                A(2 === e.length);
                var f = q(e);
                e = f.next().value;
                f = f.next().value;
                var n = {};
                c = bd(c, (n[e] = f,
                n))
            });
            a.C.length = 0;
            return c
        }
          , ed = function(a) {
            O(a, "puid", (a.u + 1).toString(36) + "~" + Date.now().toString(36))
        }
          , dd = function(a, b) {
            var c = "met." + b.type
              , d = "number" === typeof b.value ? Math.round(b.value).toString(36) : b.value
              , e = Math.round(b.duration);
            b = "" + b.label + (null != b.slotId ? "_" + b.slotId : "") + ("." + d) + (0 < e ? "_" + e.toString(36) : "");
            id(a, c, b, !0, "~")
        };
        gd.prototype.G = function(a) {
            this.o && this.u < this.J && (N.prototype.G.call(this, a),
            dd(this, a))
        }
        ;
        gd.prototype.B = function() {
            N.prototype.B.call(this);
            this.g.clearTimeout(this.A);
            this.i = this.A = 0;
            this.m = {};
            ab(this.F);
            ab(this.l);
            vc(this.g, "load", this.M);
            vc(this.g, "unload", this.P);
            vc(this.g, "pagehide", this.N)
        }
        ;
        var cd = function(a, b) {
            O(a, "uet", b);
            C(a.Y, function(c) {
                try {
                    c()
                } catch (d) {}
            });
            wc(a.g);
            P(a);
            hd(a)
        };
        var Q = function() {
            this.g = new gd(1,"https:","csi.gstatic.com","/csi?v=2&s=","ima",void 0,!0);
            if (Ic)
                var a = Ic;
            else {
                a = ((a = Dc()) ? zc(a.master) ? a.master : null : null) || Gc();
                var b = a.google_persistent_state_async;
                a = null != b && "object" == typeof b && null != b.S && "object" == typeof b.S ? Ic = b : a.google_persistent_state_async = Ic = new Hc
            }
            b = Gc();
            var c = Dc(b);
            if (c)
                (c = c || Dc()) ? (b = c.pageViewId,
                c = c.clientId,
                "string" === typeof c && (b += c.replace(/\D/g, "").substr(0, 6))) : b = null,
                b = +b;
            else {
                c = b;
                for (var d = 0; b && b != b.parent; )
                    b = b.parent,
                    d++,
                    zc(b) && (c = b);
                b = c;
                (c = b.google_global_correlator) || (b.google_global_correlator = c = 1 + Math.floor(Math.random() * Math.pow(2, 43)));
                b = c
            }
            c = Kc[7] || "google_ps_7";
            a = a.S;
            d = a[c];
            a = void 0 === d ? a[c] = b : d;
            null != a && O(this.g, "c", a);
            a = parseInt(this.g.l.c, 10) / 2;
            null != a && O(this.g, "slotId", a);
            Rc("google3.javascript.ads.imalib.instrumentation.Instrumentation")
        }
          , kd = function(a, b, c) {
            if (null != c) {
                a = a.g;
                var d = b + "=" + c;
                a.F[d] || (id(a, b, c, !1),
                1E3 > d.length && (a.F[d] = !0))
            }
        };
        ua(Q);
        var R = function(a, b) {
            this.i = {};
            this.g = [];
            this.j = 0;
            var c = arguments.length;
            if (1 < c) {
                if (c % 2)
                    throw Error("Uneven number of arguments");
                for (var d = 0; d < c; d += 2)
                    this.set(arguments[d], arguments[d + 1])
            } else if (a)
                if (a instanceof R)
                    for (c = a.R(),
                    d = 0; d < c.length; d++)
                        this.set(c[d], a.get(c[d]));
                else
                    for (d in a)
                        this.set(d, a[d])
        };
        R.prototype.T = function() {
            ld(this);
            for (var a = [], b = 0; b < this.g.length; b++)
                a.push(this.i[this.g[b]]);
            return a
        }
        ;
        R.prototype.R = function() {
            ld(this);
            return this.g.concat()
        }
        ;
        var ld = function(a) {
            if (a.j != a.g.length) {
                for (var b = 0, c = 0; b < a.g.length; ) {
                    var d = a.g[b];
                    S(a.i, d) && (a.g[c++] = d);
                    b++
                }
                a.g.length = c
            }
            if (a.j != a.g.length) {
                var e = {};
                for (c = b = 0; b < a.g.length; )
                    d = a.g[b],
                    S(e, d) || (a.g[c++] = d,
                    e[d] = 1),
                    b++;
                a.g.length = c
            }
        };
        R.prototype.get = function(a, b) {
            return S(this.i, a) ? this.i[a] : b
        }
        ;
        R.prototype.set = function(a, b) {
            S(this.i, a) || (this.j++,
            this.g.push(a));
            this.i[a] = b
        }
        ;
        R.prototype.forEach = function(a, b) {
            for (var c = this.R(), d = 0; d < c.length; d++) {
                var e = c[d]
                  , f = this.get(e);
                a.call(b, f, e, this)
            }
        }
        ;
        var S = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        };
        var md = function(a) {
            this.l = this.u = this.j = "";
            this.s = null;
            this.o = this.m = "";
            this.g = !1;
            if (a instanceof md) {
                this.g = a.g;
                nd(this, a.j);
                this.u = a.u;
                this.l = a.l;
                od(this, a.s);
                this.m = a.m;
                var b = a.i;
                var c = new pd;
                c.j = b.j;
                b.g && (c.g = new R(b.g),
                c.i = b.i);
                qd(this, c);
                this.o = a.o
            } else
                a && (b = String(a).match(xc)) ? (this.g = !1,
                nd(this, b[1] || "", !0),
                this.u = rd(b[2] || ""),
                this.l = rd(b[3] || "", !0),
                od(this, b[4]),
                this.m = rd(b[5] || "", !0),
                qd(this, b[6] || "", !0),
                this.o = rd(b[7] || "")) : (this.g = !1,
                this.i = new pd(null,this.g))
        };
        md.prototype.toString = function() {
            var a = []
              , b = this.j;
            b && a.push(sd(b, td, !0), ":");
            var c = this.l;
            if (c || "file" == b)
                a.push("//"),
                (b = this.u) && a.push(sd(b, td, !0), "@"),
                a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
                c = this.s,
                null != c && a.push(":", String(c));
            if (c = this.m)
                this.l && "/" != c.charAt(0) && a.push("/"),
                a.push(sd(c, "/" == c.charAt(0) ? ud : vd, !0));
            (c = this.i.toString()) && a.push("?", c);
            (c = this.o) && a.push("#", sd(c, wd));
            return a.join("")
        }
        ;
        var nd = function(a, b, c) {
            a.j = c ? rd(b, !0) : b;
            a.j && (a.j = a.j.replace(/:$/, ""))
        }
          , od = function(a, b) {
            if (b) {
                b = Number(b);
                if (isNaN(b) || 0 > b)
                    throw Error("Bad port number " + b);
                a.s = b
            } else
                a.s = null
        }
          , qd = function(a, b, c) {
            b instanceof pd ? (a.i = b,
            xd(a.i, a.g)) : (c || (b = sd(b, yd)),
            a.i = new pd(b,a.g))
        }
          , rd = function(a, b) {
            return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
        }
          , sd = function(a, b, c) {
            return "string" === typeof a ? (a = encodeURI(a).replace(b, zd),
            c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            a) : null
        }
          , zd = function(a) {
            a = a.charCodeAt(0);
            return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
        }
          , td = /[#\/\?@]/g
          , vd = /[#\?:]/g
          , ud = /[#\?]/g
          , yd = /[#\?@]/g
          , wd = /#/g
          , pd = function(a, b) {
            this.i = this.g = null;
            this.j = a || null;
            this.l = !!b
        }
          , T = function(a) {
            a.g || (a.g = new R,
            a.i = 0,
            a.j && yc(a.j, function(b, c) {
                a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
            }))
        };
        pd.prototype.add = function(a, b) {
            T(this);
            this.j = null;
            a = Ad(this, a);
            var c = this.g.get(a);
            c || this.g.set(a, c = []);
            c.push(b);
            this.i = Da(this.i) + 1;
            return this
        }
        ;
        var Bd = function(a, b) {
            T(a);
            b = Ad(a, b);
            S(a.g.i, b) && (a.j = null,
            a.i = Da(a.i) - a.g.get(b).length,
            a = a.g,
            S(a.i, b) && (delete a.i[b],
            a.j--,
            a.g.length > 2 * a.j && ld(a)))
        }
          , Cd = function(a, b) {
            T(a);
            b = Ad(a, b);
            return S(a.g.i, b)
        };
        g = pd.prototype;
        g.forEach = function(a, b) {
            T(this);
            this.g.forEach(function(c, d) {
                C(c, function(e) {
                    a.call(b, e, d, this)
                }, this)
            }, this)
        }
        ;
        g.R = function() {
            T(this);
            for (var a = this.g.T(), b = this.g.R(), c = [], d = 0; d < b.length; d++)
                for (var e = a[d], f = 0; f < e.length; f++)
                    c.push(b[d]);
            return c
        }
        ;
        g.T = function(a) {
            T(this);
            var b = [];
            if ("string" === typeof a)
                Cd(this, a) && (b = Na(b, this.g.get(Ad(this, a))));
            else {
                a = this.g.T();
                for (var c = 0; c < a.length; c++)
                    b = Na(b, a[c])
            }
            return b
        }
        ;
        g.set = function(a, b) {
            T(this);
            this.j = null;
            a = Ad(this, a);
            Cd(this, a) && (this.i = Da(this.i) - this.g.get(a).length);
            this.g.set(a, [b]);
            this.i = Da(this.i) + 1;
            return this
        }
        ;
        g.get = function(a, b) {
            if (!a)
                return b;
            a = this.T(a);
            return 0 < a.length ? String(a[0]) : b
        }
        ;
        g.toString = function() {
            if (this.j)
                return this.j;
            if (!this.g)
                return "";
            for (var a = [], b = this.g.R(), c = 0; c < b.length; c++) {
                var d = b[c]
                  , e = encodeURIComponent(String(d));
                d = this.T(d);
                for (var f = 0; f < d.length; f++) {
                    var n = e;
                    "" !== d[f] && (n += "=" + encodeURIComponent(String(d[f])));
                    a.push(n)
                }
            }
            return this.j = a.join("&")
        }
        ;
        var Ad = function(a, b) {
            b = String(b);
            a.l && (b = b.toLowerCase());
            return b
        }
          , xd = function(a, b) {
            b && !a.l && (T(a),
            a.j = null,
            a.g.forEach(function(c, d) {
                var e = d.toLowerCase();
                d != e && (Bd(this, d),
                Bd(this, e),
                0 < c.length && (this.j = null,
                this.g.set(Ad(this, e), Oa(c)),
                this.i = Da(this.i) + c.length))
            }, a));
            a.l = b
        };
        Rc("google3.javascript.ads.imalib.common.hostUtils");
        var Dd = function(a) {
            return (a = a.exec(D)) ? a[1] : ""
        };
        (function() {
            if (ec)
                return Dd(/Firefox\/([0-9.]+)/);
            if (yb || zb || xb)
                return Ib;
            if (ic)
                return vb() || E("iPad") || E("iPod") ? Dd(/CriOS\/([0-9.]+)/) : Dd(/Chrome\/([0-9.]+)/);
            if (jc && !(vb() || E("iPad") || E("iPod")))
                return Dd(/Version\/([0-9.]+)/);
            if (fc || gc) {
                var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(D);
                if (a)
                    return a[1] + "." + a[2]
            } else if (hc)
                return (a = Dd(/Android\s+([0-9.]+)/)) ? a : Dd(/Version\/([0-9.]+)/);
            return ""
        }
        )();
        function Ed(a) {
            var b = [""];
            if (!a)
                return null;
            a = a.toLowerCase().replace("-", "_");
            if (b.includes(a))
                return a;
            a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "";
            return b.includes(a) ? a : null
        }
        ;var Fd = function() {
            this.j = null;
            this.g = "missing-id";
            this.i = !1
        }
          , Hd = function(a) {
            var b = null;
            try {
                b = document.getElementsByClassName("lima-exp-data")
            } catch (c) {
                return Gd("missing-element", a.g),
                null
            }
            if (1 < b.length)
                return Gd("multiple-elements", a.g),
                null;
            b = b[0];
            return b ? b.innerHTML : (Gd("missing-element", a.g),
            null)
        }
          , Id = function() {
            var a = U
              , b = Hd(a);
            if (null !== b)
                if (/^\s*$/.test(b) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(b.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
                    var c = JSON.parse(b);
                    b = c.experimentIds;
                    var d = c.binaryIdentifier;
                    c = c.adEventId;
                    var e = "string" === typeof d;
                    if ("string" == typeof c) {
                        var f = Q.K();
                        null != c && O(f.g, "qqid", c)
                    }
                    e && (a.g = d);
                    "string" !== typeof b ? Gd("missing-flags", a.g) : (e || Gd("missing-binary-id", a.g),
                    a.j = b)
                } else
                    Gd("invalid-json", a.g)
        };
        Fd.prototype.reset = function() {
            this.j = null;
            this.g = "missing-id"
        }
        ;
        var Jd = function(a, b, c, d, e) {
            this.id = a;
            this.h = b;
            this.j = c;
            this.la = !1;
            this.i = d;
            this.g = e;
            this.j && this.i && this.g && (a = this.i) && Object.assign(this.g.g, a)
        };
        Jd.prototype.select = function() {
            this.la = !0;
            if (this.i && this.g) {
                var a = this.i;
                a && Object.assign(this.g.g, a)
            }
        }
        ;
        var V = function() {
            this.g = []
        }
          , Kd = function() {
            this.g = new Map;
            this.i = !1;
            this.m = new V;
            new Jd(0,0,!1);
            this.j = [this.m];
            this.l = new Sc
        }
          , W = function(a) {
            var b = Ld;
            if (b.i)
                B("Cannot register Experiments after selection.");
            else if (b.g.has(a.id))
                B("Cannot define multiple experiments with Id: " + a.id + ".");
            else if (null == a.h && null == a.control)
                B('Experiment Mods must be defined with the name "mods" or a control must be specified with the name "control".');
            else if (0 != a.$) {
                var c = b.m;
                if (null != a.control)
                    for (var d = q(b.j), e = d.next(); !e.done; e = d.next()) {
                        if (e = e.value,
                        e.g.includes(a.control)) {
                            c = e;
                            break
                        }
                    }
                else
                    null != a.v && (c = a.v);
                d = 0;
                null != a.control ? d = a.control.h : null != a.h && (d = a.h);
                a = new Jd(a.id,d,!!a.qb,a.flags,b.l);
                c.g.push(a);
                b.j.includes(c) || b.j.push(c);
                b.g.set(a.id, a)
            }
        };
        Kd.prototype.reset = function() {
            for (var a = q(this.g), b = a.next(); !b.done; b = a.next())
                b = q(b.value),
                b.next(),
                b.next().value.la = !1;
            this.i = !1;
            this.l.reset()
        }
        ;
        var Ld = new Kd;
        var Od = function(a) {
            J(this, a, Md, Nd)
        };
        y(Od, I);
        var Md = [2, 8]
          , Nd = [[3, 4, 5], [6, 7]];
        var Qd = function(a) {
            J(this, a, Pd, null)
        };
        y(Qd, I);
        var Pd = [4];
        var Td = function(a) {
            J(this, a, Rd, Sd)
        };
        y(Td, I);
        var Rd = [5]
          , Sd = [[1, 2, 3, 6, 7]];
        var Vd = function(a) {
            J(this, a, Ud, null)
        };
        y(Vd, I);
        var Ud = [2];
        var Xd = function(a) {
            J(this, a, Wd, null)
        };
        y(Xd, I);
        var Wd = [2];
        var Zd = function(a) {
            J(this, a, Yd, null)
        };
        y(Zd, I);
        var ae = function(a) {
            J(this, a, $d, null)
        };
        y(ae, I);
        var Yd = [1, 4, 2, 3]
          , $d = [2];
        var be = function(a, b) {
            switch (b) {
            case 1:
                return L(a, 1, 0);
            case 2:
                return L(a, 2, 0);
            case 3:
                return L(a, 3, 0);
            case 6:
                return L(a, 6, 0);
            default:
                return null
            }
        }
          , ce = function(a, b) {
            if (!a)
                return null;
            switch (b) {
            case 1:
                var c = void 0 === c ? !1 : c;
                var d = K(a, 1);
                d = null == d ? d : !!d;
                return null == d ? c : d;
            case 7:
                return L(a, 3, "");
            case 2:
                return d = void 0 === d ? 0 : d,
                c = K(a, 2),
                c = null == c ? c : +c,
                null == c ? d : c;
            case 3:
                return L(a, 3, "");
            case 6:
                return K(a, 4);
            default:
                return null
            }
        };
        var de = {}
          , ee = (de[47] = ec,
        de);
        function fe() {
            var a = ge
              , b = qc(new Zd(he), ae);
            1 == b.length && 16 == L(b[0], 1, 0) && qc(b[0], Xd).forEach(function(c) {
                var d = L(c, 1, 0)
                  , e = pc(c, Od, 3)
                  , f = a[L(c, 4, 0)];
                qc(c, Vd).forEach(function(n) {
                    var k = d || L(n, 4, 0)
                      , h = L(n, 1, 0)
                      , l = e || pc(n, Od, 3);
                    l = l ? L(l, 3, 0) : null;
                    l = ee[l];
                    n = ie(qc(n, Td));
                    W({
                        id: h,
                        h: k,
                        v: f,
                        $: l,
                        flags: n
                    })
                })
            })
        }
        function ie(a) {
            if (a.length) {
                var b = {};
                a.forEach(function(c) {
                    var d = nc(c, Sd[0])
                      , e = pc(c, Qd, 4);
                    e && (c = be(c, d),
                    d = ce(e, d),
                    b[c] = d)
                });
                return b
            }
        }
        ;var je = function(a) {
            this.g = a
        };
        je.prototype.i = function(a, b) {
            a = q(this.g);
            for (var c = a.next(); !c.done; c = a.next())
                (c = b.get(c.value)) && c.select()
        }
        ;
        var ke = function(a, b) {
            this.g = a;
            this.j = b
        };
        na(ke, je);
        ke.prototype.i = function(a, b) {
            je.prototype.i.call(this, a, b);
            var c = [];
            a = [];
            for (var d = q(this.g), e = d.next(); !e.done; e = d.next())
                e = e.value,
                b.get(e) ? c.push(e) : a.push(e);
            b = c.map(String).join(",") || "0";
            a = a.map(String).join(",") || "0";
            kd(Q.K(), "sei", b);
            kd(Q.K(), "nsei", a);
            kd(Q.K(), "bi", this.j)
        }
        ;
        var le = function() {
            Fd.apply(this, arguments)
        };
        na(le, Fd);
        var Gd = function(a, b) {
            var c = Q.K();
            kd(c, "eee", a);
            kd(c, "bi", b)
        };
        ua(le);
        function me() {
            return ne.split(",").map(function(a) {
                return parseInt(a, 10)
            }).filter(function(a) {
                return !isNaN(a)
            })
        }
        ;var X = new V
          , oe = new V
          , pe = new V
          , qe = new V
          , re = new V
          , se = new V;
        W({
            id: 318475490,
            h: 0
        });
        W({
            id: 324123032,
            h: 0
        });
        W({
            id: 418572103,
            h: 0
        });
        W({
            id: 420706097,
            h: 10
        });
        W({
            id: 420706098,
            h: 10
        });
        W({
            id: 44736152,
            h: 10
        });
        W({
            id: 44736153,
            h: 10
        });
        W({
            id: 44736284,
            h: 10
        });
        W({
            id: 44736285,
            h: 10
        });
        W({
            id: 21061786,
            h: 10
        });
        W({
            id: 21061817,
            h: 10
        });
        W({
            id: 21061824,
            h: 50
        });
        W({
            id: 21061888,
            h: 10
        });
        W({
            id: 21061893,
            h: 10
        });
        W({
            id: 21062100,
            h: 0
        });
        W({
            id: 21062101,
            h: 0
        });
        W({
            id: 420706109,
            h: 10
        });
        W({
            id: 420706110,
            h: 10
        });
        W({
            id: 21062347,
            h: 0
        });
        W({
            id: 21063070,
            h: 0
        });
        W({
            id: 21063072,
            h: 0
        });
        W({
            id: 21063100,
            h: 0
        });
        W({
            id: 420706105,
            h: 10
        });
        W({
            id: 420706106,
            h: 10
        });
        W({
            id: 75259402,
            h: 10
        });
        W({
            id: 75259403,
            h: 10
        });
        W({
            id: 21064018,
            h: 0
        });
        W({
            id: 21064020,
            h: 0
        });
        W({
            id: 21064022,
            h: 0
        });
        W({
            id: 21064024,
            h: 0
        });
        W({
            id: 21064075,
            h: 0
        });
        W({
            id: 21064201,
            h: 50
        });
        W({
            id: 210640812,
            h: 10
        });
        W({
            id: 420706142,
            h: 0
        });
        W({
            id: 21064347,
            h: 0
        });
        W({
            id: 72811302,
            h: 0
        });
        W({
            id: 318491509,
            h: 0
        });
        W({
            id: 72811303,
            h: 0
        });
        W({
            id: 44719312,
            h: 0
        });
        W({
            id: 75259414,
            h: 0
        });
        W({
            id: 75259415,
            h: 0
        });
        W({
            id: 72811304,
            h: 0
        });
        W({
            id: 44719313,
            h: 0
        });
        W({
            id: 72811305,
            h: 0
        });
        W({
            id: 72811306,
            h: 0
        });
        W({
            id: 72811307,
            h: 0
        });
        W({
            id: 44725460,
            h: 0
        });
        W({
            id: 44725462,
            h: 0
        });
        W({
            id: 21064565,
            h: 0
        });
        W({
            id: 21064567,
            h: 0
        });
        W({
            id: 40819804,
            h: 10
        });
        W({
            id: 40819805,
            h: 10
        });
        W({
            id: 418572006,
            h: 10
        });
        W({
            id: 420706136,
            h: 10
        });
        W({
            id: 420706137,
            h: 10
        });
        W({
            id: 420706138,
            h: 10
        });
        W({
            id: 420706139,
            h: 10
        });
        W({
            id: 420706140,
            h: 10
        });
        W({
            id: 420706141,
            h: 10
        });
        W({
            id: 21065285,
            h: 1
        });
        W({
            id: 21065286,
            h: 1
        });
        W({
            id: 21065287,
            h: 10,
            $: ec
        });
        W({
            id: 21065288,
            h: 10,
            $: ec
        });
        W({
            id: 44740339,
            h: 10
        });
        W({
            id: 44740340,
            h: 10
        });
        W({
            id: 72811314,
            h: 0
        });
        W({
            id: 44714743,
            h: 0
        });
        W({
            id: 44719216,
            h: 0
        });
        W({
            id: 44730895,
            h: 10
        });
        W({
            id: 44730896,
            h: 10
        });
        W({
            id: 44730769,
            h: 0
        });
        W({
            id: 44731465,
            h: 10
        });
        W({
            id: 44731467,
            h: 10
        });
        W({
            id: 44736292,
            h: 10
        });
        W({
            id: 44736293,
            h: 10
        });
        W({
            id: 44739554,
            h: 50,
            v: X
        });
        W({
            id: 44739555,
            h: 50,
            v: X
        });
        W({
            id: 44731964,
            h: 10,
            v: X
        });
        W({
            id: 44731965,
            h: 10,
            v: X
        });
        W({
            id: 668123728,
            h: 10,
            v: X
        });
        W({
            id: 668123729,
            h: 10,
            v: X
        });
        W({
            id: 44727842,
            h: 10,
            v: X
        });
        W({
            id: 44727843,
            h: 10,
            v: X
        });
        W({
            id: 31061774,
            h: 10
        });
        W({
            id: 31061775,
            h: 10
        });
        W({
            id: 44730612,
            h: 50
        });
        W({
            id: 44736270,
            h: 10
        });
        W({
            id: 44736271,
            h: 10
        });
        W({
            id: 44712632,
            h: 10
        });
        W({
            id: 44712633,
            h: 10
        });
        W({
            id: 44715336,
            h: 10
        });
        W({
            id: 44733535,
            h: 1
        });
        W({
            id: 44733536,
            h: 1
        });
        W({
            id: 44729309,
            h: 10
        });
        W({
            id: 21069902,
            h: 50
        });
        W({
            id: 21069903,
            h: 50
        });
        W({
            id: 75259407,
            h: 0
        });
        W({
            id: 75259408,
            h: 0
        });
        W({
            id: 44721472,
            h: 0
        });
        W({
            id: 75259410,
            h: 0
        });
        W({
            id: 75259412,
            h: 0
        });
        W({
            id: 75259413,
            h: 0
        });
        W({
            id: 44725355,
            h: 50,
            v: re
        });
        W({
            id: 44725356,
            h: 50,
            v: re
        });
        W({
            id: 44729226,
            h: 500,
            v: qe
        });
        W({
            id: 44729227,
            h: 500,
            v: qe
        });
        W({
            id: 44724516,
            h: 0
        });
        W({
            id: 44726389,
            h: 10
        });
        W({
            id: 44726392,
            h: 10
        });
        W({
            id: 44726393,
            h: 10
        });
        W({
            id: 44730464,
            h: 10
        });
        W({
            id: 44730465,
            h: 10
        });
        W({
            id: 44733378,
            h: 10
        });
        W({
            id: 44727953,
            h: 0
        });
        W({
            id: 44729911,
            h: 0
        });
        W({
            id: 44730425,
            h: 0
        });
        W({
            id: 44730426,
            h: 0
        });
        W({
            id: 447304389,
            h: 0
        });
        W({
            id: 44732022,
            h: 10
        });
        W({
            id: 44732023,
            h: 10
        });
        W({
            id: 44733246,
            h: 10
        });
        W({
            id: 44736980,
            h: 10
        });
        W({
            id: 44736981,
            h: 10
        });
        W({
            id: 44736979,
            h: 10
        });
        W({
            id: 44735637,
            h: 0
        });
        W({
            id: 44735638,
            h: 0
        });
        W({
            id: 44737598,
            h: 100
        });
        W({
            id: 44737599,
            h: 100
        });
        W({
            id: 44736620,
            h: 10
        });
        W({
            id: 44736621,
            h: 10
        });
        W({
            id: 44737473,
            h: 10,
            v: oe
        });
        W({
            id: 44737475,
            h: 10,
            v: oe
        });
        W({
            id: 44739825,
            h: 100,
            v: pe
        });
        W({
            id: 44739826,
            h: 100,
            v: pe
        });
        W({
            id: 44738437,
            h: 10
        });
        W({
            id: 44738438,
            h: 10
        });
        W({
            id: 44740261,
            h: 10
        });
        W({
            id: 44740262,
            h: 10
        });
        W({
            id: 44740263,
            h: 10
        });
        W({
            id: 44740264,
            h: 10
        });
        var te = {}
          , ge = (te[32] = X,
        te[35] = se,
        te);
        ge = void 0 === ge ? {} : ge;
        if (!/^\{+IMA_EXPERIMENT_STATE_JSPB\}+$/.test("{{IMA_EXPERIMENT_STATE_JSPB}}"))
            try {
                var he = JSON.parse("{{IMA_EXPERIMENT_STATE_JSPB}}");
                he instanceof Array && fe()
            } catch (a) {
                kd(Q.K(), "espe", a.message)
            }
        if ("undefined" === typeof window.v8_flag_map) {
            var U = le.K();
            U.i || (Id(),
            U.i = !0);
            var ne = U.j, ue;
            U.i || (Id(),
            U.i = !0);
            ue = U.g;
            if (null != ne) {
                var ve = new ke(me(),ue)
                  , we = Ld;
                we.i ? B("Cannot select experiments more than once.") : (ve.i(we.j, we.g),
                we.i = !0)
            }
        }
        ;/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
        var xe = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        var ye = /^https?:\/\/(\w|-)+\.cdn\.ampproject\.(net|org)(\?|\/|$)/
          , Ce = function(a) {
            a = a || ze();
            for (var b = new Ae(t.location.href,!1), c = null, d = a.length - 1, e = d; 0 <= e; --e) {
                var f = a[e];
                !c && ye.test(f.url) && (c = f);
                if (f.url && !f.da) {
                    b = f;
                    break
                }
            }
            e = null;
            f = a.length && a[d].url;
            0 != b.depth && f && (e = a[d]);
            return new Be(b,e,c)
        }
          , ze = function() {
            var a = t
              , b = []
              , c = null;
            do {
                var d = a;
                if (zc(d)) {
                    var e = d.location.href;
                    c = d.document && d.document.referrer || null
                } else
                    e = c,
                    c = null;
                b.push(new Ae(e || ""));
                try {
                    a = d.parent
                } catch (f) {
                    a = null
                }
            } while (a && d != a);
            d = 0;
            for (a = b.length - 1; d <= a; ++d)
                b[d].depth = a - d;
            d = t;
            if (d.location && d.location.ancestorOrigins && d.location.ancestorOrigins.length == b.length - 1)
                for (a = 1; a < b.length; ++a)
                    e = b[a],
                    e.url || (e.url = d.location.ancestorOrigins[a - 1] || "",
                    e.da = !0);
            return b
        }
          , Be = function(a, b, c) {
            this.i = a;
            this.j = b;
            this.g = c
        }
          , Ae = function(a, b) {
            this.url = a;
            this.da = !!b;
            this.depth = null
        };
        var De = function(a, b) {
            this.g = a;
            this.depth = b
        }
          , Fe = function() {
            var a = ze()
              , b = Math.max(a.length - 1, 0)
              , c = Ce(a);
            a = c.i;
            var d = c.j
              , e = c.g
              , f = [];
            c = function(k, h) {
                return null == k ? h : k
            }
            ;
            e && f.push(new De([e.url, e.da ? 2 : 0],c(e.depth, 1)));
            d && d != e && f.push(new De([d.url, 2],0));
            a.url && a != e && f.push(new De([a.url, 0],c(a.depth, b)));
            var n = Ja(f, function(k, h) {
                return f.slice(0, f.length - h)
            });
            !a.url || (e || d) && a != e || (d = Cc(a.url)) && n.push([new De([d, 1],c(a.depth, b))]);
            n.push([]);
            Ja(n, function(k) {
                return Ee(b, k)
            })
        };
        function Ee(a, b) {
            A(Ma(b, function(e) {
                return 0 <= e.depth
            }));
            var c = Ka(b, function(e, f) {
                return Math.max(e, f.depth)
            }, -1)
              , d = Pa(c + 2);
            d[0] = a;
            C(b, function(e) {
                return d[e.depth + 1] = e.g
            });
            return d
        }
        ;var w = function() {
            this.j = "always";
            this.A = 4;
            this.g = 1;
            this.i = !0;
            this.u = "en";
            this.s = !1;
            this.C = this.B = "";
            this.m = !1;
            this.l = !0;
            for (var a = Array(36), b = 0, c, d = 0; 36 > d; d++)
                8 == d || 13 == d || 18 == d || 23 == d ? a[d] = "-" : 14 == d ? a[d] = "4" : (2 >= b && (b = 33554432 + 16777216 * Math.random() | 0),
                c = b & 15,
                b >>= 4,
                a[d] = xe[19 == d ? c & 3 | 8 : c]);
            this.o = {};
            try {
                Fe()
            } catch (e) {}
        }
          , Ge = function(a) {
            a = null == a ? "" : String(a);
            /^[\s\xa0]*$/.test(a) || (a = a.substring(0, 20));
            return a
        };
        g = w.prototype;
        g.setCompanionBackfill = function(a) {
            this.j = a
        }
        ;
        g.getCompanionBackfill = function() {
            return this.j
        }
        ;
        g.setNumRedirects = function(a) {
            this.A = a
        }
        ;
        g.getNumRedirects = function() {
            return this.A
        }
        ;
        g.setPpid = function(a) {
            this.F = a
        }
        ;
        g.getPpid = function() {
            return this.F
        }
        ;
        g.setVpaidAllowed = function(a) {
            "boolean" === typeof a && (this.g = a ? 1 : 0)
        }
        ;
        g.setVpaidMode = function(a) {
            this.g = a
        }
        ;
        g.getVpaidMode = function() {
            return this.g
        }
        ;
        g.bb = function(a) {
            this.i = a
        }
        ;
        g.Oa = function() {
            return this.i
        }
        ;
        g.fb = function(a) {
            this.s = a
        }
        ;
        g.Qa = function() {
            return this.s
        }
        ;
        g.setLocale = function(a) {
            if (a = Ed(a))
                this.u = a
        }
        ;
        g.Na = function() {
            return this.u
        }
        ;
        g.setPlayerType = function(a) {
            this.B = Ge(a)
        }
        ;
        g.getPlayerType = function() {
            return this.B
        }
        ;
        g.setPlayerVersion = function(a) {
            this.C = Ge(a)
        }
        ;
        g.getPlayerVersion = function() {
            return this.C
        }
        ;
        g.gb = function() {}
        ;
        g.hb = function() {}
        ;
        g.setDisableCustomPlaybackForIOS10Plus = function(a) {
            this.m = a
        }
        ;
        g.getDisableCustomPlaybackForIOS10Plus = function() {
            return this.m
        }
        ;
        g.Pa = function() {
            return this.l
        }
        ;
        g.cb = function(a) {
            null != a && (this.l = a)
        }
        ;
        g.eb = function() {}
        ;
        g.Ma = function() {
            return !0
        }
        ;
        g.setFeatureFlags = function(a) {
            this.o = a
        }
        ;
        g.getFeatureFlags = function() {
            return this.o
        }
        ;
        x("getFeatureFlags", w.prototype.getFeatureFlags);
        x("setFeatureFlags", w.prototype.setFeatureFlags);
        x("getDisableFlashAds", w.prototype.Ma);
        x("setDisableFlashAds", w.prototype.eb);
        x("setCookiesEnabled", w.prototype.cb);
        x("isCookiesEnabled", w.prototype.Pa);
        x("getDisableCustomPlaybackForIOS10Plus", w.prototype.getDisableCustomPlaybackForIOS10Plus);
        x("setDisableCustomPlaybackForIOS10Plus", w.prototype.setDisableCustomPlaybackForIOS10Plus);
        x("setStreamCorrelator", w.prototype.hb);
        x("setPageCorrelator", w.prototype.gb);
        x("getPlayerVersion", w.prototype.getPlayerVersion);
        x("setPlayerVersion", w.prototype.setPlayerVersion);
        x("getPlayerType", w.prototype.getPlayerType);
        x("setPlayerType", w.prototype.setPlayerType);
        x("getLocale", w.prototype.Na);
        x("setLocale", w.prototype.setLocale);
        x("isVpaidAdapter", w.prototype.Qa);
        x("setIsVpaidAdapter", w.prototype.fb);
        x("isAutoPlayAdBreaks", w.prototype.Oa);
        x("setAutoPlayAdBreaks", w.prototype.bb);
        x("getVpaidMode", w.prototype.getVpaidMode);
        x("setVpaidMode", w.prototype.setVpaidMode);
        x("setVpaidAllowed", w.prototype.setVpaidAllowed);
        x("getPpid", w.prototype.getPpid);
        x("setPpid", w.prototype.setPpid);
        x("getNumRedirects", w.prototype.getNumRedirects);
        x("setNumRedirects", w.prototype.setNumRedirects);
        x("getCompanionBackfill", w.prototype.getCompanionBackfill);
        x("setCompanionBackfill", w.prototype.setCompanionBackfill);
        new w;
        var He = function(a) {
            var b = Qb(document, "BODY");
            b.textContent = a;
            A(b.innerHTML == b.textContent, "String has HTML original: %s, escaped: %s", a, b.innerHTML);
            return a
        };
        var Ie = {
            pa: ["BC", "AD"],
            oa: ["Before Christ", "Anno Domini"],
            sa: "JFMAMJJASOND".split(""),
            za: "JFMAMJJASOND".split(""),
            ra: "January February March April May June July August September October November December".split(" "),
            ya: "January February March April May June July August September October November December".split(" "),
            va: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            Ba: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            Ia: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            Da: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            xa: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            Ca: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            lb: "SMTWTFS".split(""),
            Aa: "SMTWTFS".split(""),
            wa: ["Q1", "Q2", "Q3", "Q4"],
            ta: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
            ma: ["AM", "PM"],
            jb: ["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"],
            nb: ["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"],
            kb: ["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"],
            fa: 6,
            ob: [5, 6],
            ga: 5
        }
          , Je = Ie;
        Je = Ie;
        var Ke = function(a, b, c, d, e) {
            a = new Date(a,b,c);
            e = e || 0;
            return a.valueOf() + 864E5 * (((void 0 !== d ? d : 3) - e + 7) % 7 - ((a.getDay() + 6) % 7 - e + 7) % 7)
        };
        var Le = function() {}
          , Ne = function(a) {
            if ("number" == typeof a) {
                var b = new Le;
                b.j = a;
                var c = a;
                if (0 == c)
                    c = "Etc/GMT";
                else {
                    var d = ["Etc/GMT", 0 > c ? "-" : "+"];
                    c = Math.abs(c);
                    d.push(Math.floor(c / 60) % 100);
                    c %= 60;
                    0 != c && d.push(":", F(c, 2));
                    c = d.join("")
                }
                b.l = c;
                c = a;
                0 == c ? c = "UTC" : (d = ["UTC", 0 > c ? "+" : "-"],
                c = Math.abs(c),
                d.push(Math.floor(c / 60) % 100),
                c %= 60,
                0 != c && d.push(":", c),
                c = d.join(""));
                a = Me(a);
                b.m = [c, c];
                b.g = {
                    mb: a,
                    ha: a
                };
                b.i = [];
                return b
            }
            b = new Le;
            b.l = a.id;
            b.j = -a.std_offset;
            b.m = a.names;
            b.g = a.names_ext;
            b.i = a.transitions;
            return b
        }
          , Me = function(a) {
            var b = ["GMT"];
            b.push(0 >= a ? "+" : "-");
            a = Math.abs(a);
            b.push(F(Math.floor(a / 60) % 100, 2), ":", F(a % 60, 2));
            return b.join("")
        }
          , Oe = function(a, b) {
            b = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate(), b.getUTCHours(), b.getUTCMinutes()) / 36E5;
            for (var c = 0; c < a.i.length && b >= a.i[c]; )
                c += 2;
            return 0 == c ? 0 : a.i[c - 1]
        };
        var Re = function() {
            A(!0, "Pattern must be defined");
            A(void 0 !== Je, "goog.i18n.DateTimeSymbols or explicit symbols must be defined");
            this.i = [];
            this.g = Je;
            var a = "mm:ss";
            for (Pe && (a = a.replace(/\u200f/g, "")); a; ) {
                for (var b = a, c = 0; c < Qe.length; ++c) {
                    var d = a.match(Qe[c]);
                    if (d) {
                        var e = d[0];
                        a = a.substring(e.length);
                        0 == c && ("''" == e ? e = "'" : (e = e.substring(1, "'" == d[1] ? e.length - 1 : e.length),
                        e = e.replace(/''/g, "'")));
                        this.i.push({
                            text: e,
                            type: c
                        });
                        break
                    }
                }
                if (b === a)
                    throw Error("Malformed pattern part: " + a);
            }
        }
          , Qe = [/^'(?:[^']|'')*('|$)/, /^(?:G+|y+|Y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|V+|w+|z+|Z+)/, /^[^'GyYMkSEahKHcLQdmsvVwzZ]+/]
          , Se = function(a) {
            return a.getHours ? a.getHours() : 0
        }
          , Ue = function(a, b) {
            if (!b)
                throw Error("The date to format must be non-null.");
            for (var c = [], d = 0; d < a.i.length; ++d) {
                var e = a.i[d].text;
                1 == a.i[d].type ? c.push(Te(a, e, b, b, b)) : c.push(e)
            }
            return c.join("")
        }
          , Y = function(a, b) {
            b = String(b);
            a = a.g || Je;
            if (void 0 !== a.Ja) {
                for (var c = [], d = 0; d < b.length; d++) {
                    var e = b.charCodeAt(d);
                    c.push(48 <= e && 57 >= e ? String.fromCharCode(a.Ja + e - 48) : b.charAt(d))
                }
                b = c.join("")
            }
            return b
        }
          , Pe = !1
          , Z = function(a) {
            if (!(a.getHours && a.getSeconds && a.getMinutes))
                throw Error("The date to format has no time (probably a goog.date.Date). Use Date or goog.date.DateTime, or use a pattern without time fields.");
        }
          , Te = function(a, b, c, d, e) {
            var f = b.length;
            switch (b.charAt(0)) {
            case "G":
                return c = 0 < d.getFullYear() ? 1 : 0,
                4 <= f ? a.g.oa[c] : a.g.pa[c];
            case "y":
                return c = d.getFullYear(),
                0 > c && (c = -c),
                2 == f && (c %= 100),
                Y(a, F(c, f));
            case "Y":
                return c = (new Date(Ke(d.getFullYear(), d.getMonth(), d.getDate(), a.g.ga, a.g.fa))).getFullYear(),
                0 > c && (c = -c),
                2 == f && (c %= 100),
                Y(a, F(c, f));
            case "M":
                a: switch (c = d.getMonth(),
                f) {
                case 5:
                    f = a.g.sa[c];
                    break a;
                case 4:
                    f = a.g.ra[c];
                    break a;
                case 3:
                    f = a.g.va[c];
                    break a;
                default:
                    f = Y(a, F(c + 1, f))
                }
                return f;
            case "k":
                return Z(e),
                Y(a, F(Se(e) || 24, f));
            case "S":
                return Y(a, (e.getMilliseconds() / 1E3).toFixed(Math.min(3, f)).substr(2) + (3 < f ? F(0, f - 3) : ""));
            case "E":
                return c = d.getDay(),
                4 <= f ? a.g.Ia[c] : a.g.xa[c];
            case "a":
                return Z(e),
                f = Se(e),
                a.g.ma[12 <= f && 24 > f ? 1 : 0];
            case "h":
                return Z(e),
                Y(a, F(Se(e) % 12 || 12, f));
            case "K":
                return Z(e),
                Y(a, F(Se(e) % 12, f));
            case "H":
                return Z(e),
                Y(a, F(Se(e), f));
            case "c":
                a: switch (c = d.getDay(),
                f) {
                case 5:
                    f = a.g.Aa[c];
                    break a;
                case 4:
                    f = a.g.Da[c];
                    break a;
                case 3:
                    f = a.g.Ca[c];
                    break a;
                default:
                    f = Y(a, F(c, 1))
                }
                return f;
            case "L":
                a: switch (c = d.getMonth(),
                f) {
                case 5:
                    f = a.g.za[c];
                    break a;
                case 4:
                    f = a.g.ya[c];
                    break a;
                case 3:
                    f = a.g.Ba[c];
                    break a;
                default:
                    f = Y(a, F(c + 1, f))
                }
                return f;
            case "Q":
                return c = Math.floor(d.getMonth() / 3),
                4 > f ? a.g.wa[c] : a.g.ta[c];
            case "d":
                return Y(a, F(d.getDate(), f));
            case "m":
                return Z(e),
                Y(a, F(e.getMinutes(), f));
            case "s":
                return Z(e),
                Y(a, F(e.getSeconds(), f));
            case "v":
                return f = Ne(c.getTimezoneOffset()),
                f.l;
            case "V":
                return a = Ne(c.getTimezoneOffset()),
                2 >= f ? a.l : 0 < Oe(a, c) ? void 0 !== a.g.na ? a.g.na : a.g.DST_GENERIC_LOCATION : void 0 !== a.g.ha ? a.g.ha : a.g.STD_GENERIC_LOCATION;
            case "w":
                return c = Ke(e.getFullYear(), e.getMonth(), e.getDate(), a.g.ga, a.g.fa),
                Y(a, F(Math.floor(Math.round((c - (new Date((new Date(c)).getFullYear(),0,1)).valueOf()) / 864E5) / 7) + 1, f));
            case "z":
                return a = Ne(c.getTimezoneOffset()),
                4 > f ? a.m[0 < Oe(a, c) ? 2 : 0] : a.m[0 < Oe(a, c) ? 3 : 1];
            case "Z":
                return b = Ne(c.getTimezoneOffset()),
                4 > f ? (f = -(b.j - Oe(b, c)),
                a = [0 > f ? "-" : "+"],
                f = Math.abs(f),
                a.push(F(Math.floor(f / 60) % 100, 2), F(f % 60, 2)),
                f = a.join("")) : f = Y(a, Me(b.j - Oe(b, c))),
                f;
            default:
                return ""
            }
        };
        var Xe = function(a, b) {
            this.g = a;
            this.m = !1;
            this.Y = G("vast-tag-radio");
            this.i = G("vast-tag-url");
            this.M = G("vast-xml");
            this.Ha = G("http-warning");
            this.N = G("advanced-controls-arrow");
            this.u = G("share-link-button");
            this.X = G("shorten-share-link-checkbox-div");
            this.J = G("shorten-share-link-checkbox");
            this.o = G("share-link-text");
            this.O = G("advanced-controls");
            this.s = G("play-button");
            this.ua = G("current-time");
            this.Ea = G("duration-time");
            this.H = G("progress-list");
            this.Ga = G("play-progress");
            this.B = G("volume-button");
            this.A = G("report-events");
            this.F = "";
            this.G = b;
            this.C = this.V = !1;
            this.l = this.j = 0;
            this.U = [];
            this.P = [];
            Ve(this);
            We(this);
            if (a = this.G)
                if (a = (new md(a)).i.get("tag"))
                    this.i.value = decodeURIComponent(a.replace(/\+/g, " "));
            a = v(this.Fa, this);
            this.g.F = a;
            a = v(this.qa, this);
            this.g.u = a;
            a = v(this.Ka, this);
            this.g.o = a
        }
          , Ve = function(a) {
            var b = G("companion-section");
            Ye.forEach(function(c) {
                var d = Sb("DIV");
                d.id = c.name;
                d.className = "vsi-companion-ad";
                d.name = c.name;
                b.appendChild(d);
                a.U.push(d);
                googletag.defineUnit(c.name, [c.width, c.height], c.name).addService(googletag.companionAds())
            });
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices()
        }
          , We = function(a) {
            [{
                id: "sample-tag-link",
                L: a.Ya
            }, {
                id: "vast-xml-radio",
                L: a.ab
            }, {
                id: "advanced-controls-header",
                L: a.Ta
            }, {
                id: "test-ad-button",
                L: a.Za
            }, {
                id: "clear-log-button",
                L: a.Z
            }].forEach(function(b) {
                var c = G(b.id);
                Ze(a, c, b.L)
            });
            Ze(a, a.Y, a.$a);
            Ze(a, a.u, a.W);
            Ze(a, a.J, a.W);
            Ze(a, a.s, a.Wa);
            Ze(a, a.H, a.Xa);
            Ze(a, a.B, a.ea);
            a.B.value = "max";
            a.F = a.i.value;
            setInterval(v(a.La, a), 100)
        };
        g = Xe.prototype;
        g.destroy = function() {
            this.P.forEach(function(a) {
                var b = a.element;
                a = a.L;
                b.addEventListener ? b.removeEventListener("click", a, !1) : b.attachEvent && b.detachEvent("onclick", a)
            })
        }
        ;
        g.$a = function() {
            $e(this, !0);
            af(this);
            this.i.style.display = "inline";
            this.M.style.display = "none"
        }
        ;
        g.ab = function() {
            $e(this, !1);
            af(this);
            this.i.style.display = "none";
            this.M.style.display = "inline"
        }
        ;
        g.Ya = function() {
            this.i.value = "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator="
        }
        ;
        g.La = function() {
            if (this.F != this.i.value) {
                var a = new md(this.i.value);
                this.Ha.style.display = "http" == a.j ? "inline-block" : "none";
                this.F = this.i.value
            }
        }
        ;
        g.Za = function() {
            bf(this);
            cf(this);
            df(this);
            this.Y.checked ? cc(this.g, this.i.value) : dc(this.g, this.M.value);
            this.s.className = "pause-button"
        }
        ;
        var cf = function(a) {
            var b = [];
            [].concat(fa(document.getElementsByClassName("mime-checkbox"))).forEach(function(c) {
                c.checked && b.push(c.getAttribute("id"))
            });
            a.g.s = b
        }
          , df = function(a) {
            [].concat(fa(document.getElementsByName("vpaid-radio-group"))).forEach(function(b) {
                b.checked && a.g.setVpaidMode(b.id)
            })
        };
        Xe.prototype.W = function() {
            this.X.style.display = "inline";
            var a = "https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/vastinspector";
            this.G ? a = this.G : document.referrer && document.referrer.includes("vastinspector") && (a = document.referrer);
            if (a) {
                a = new md(a);
                if ("" !== encodeURIComponent(this.i.value)) {
                    var b = encodeURIComponent(this.i.value);
                    a.i.set("tag", b)
                }
                a = a.toString();
                this.J.checked ? ef(this, a) : ff(this, a)
            } else
                this.o.value = "Error: could not generate sharable URL"
        }
        ;
        var gf = function(a, b) {
            gapi.client.setApiKey("AIzaSyDhwO-mwC66FOUtx1gVxH9nnWWz1je5UlI");
            gapi.client.load("urlshortener", "v1", function() {
                a.V = !0;
                ef(a, b)
            })
        }
          , ef = function(a, b) {
            a.V ? gapi.client.urlshortener.url.insert({
                resource: {
                    longUrl: b
                }
            }).execute(function(c) {
                ff(a, c.id)
            }) : gf(a, b)
        }
          , ff = function(a, b) {
            a.o.value = b;
            a.o.style.display = "block";
            a.o.select()
        }
          , af = function(a) {
            a.o.value = "";
            a.o.style.display = "none"
        }
          , $e = function(a, b) {
            b ? (a.u.disabled = "",
            a.u.classList.add("button-blue")) : (a.u.disabled = "disabled",
            a.u.classList.remove("button-blue"),
            a.X.style.display = "none",
            a.J.checked = "")
        }
          , bf = function(a) {
            a.U.forEach(function(b) {
                b.textContent = ""
            })
        };
        g = Xe.prototype;
        g.Ta = function() {
            this.C ? (sb(this.N, ob("\u25b8")),
            this.O.style.display = "none") : (sb(this.N, ob("\u25be")),
            this.O.style.display = "block");
            this.C = !this.C
        }
        ;
        g.Wa = function() {
            "play-button" === this.s.className ? (this.s.className = "pause-button",
            this.g.play()) : (this.s.className = "play-button",
            this.g.pause())
        }
        ;
        g.Xa = function(a) {
            if (this.l && this.j) {
                var b = this.H.getBoundingClientRect().left;
                a = (a.clientX - b) / this.H.clientWidth;
                this.j = 0 > a ? 0 : 1 < a ? this.l : this.l * a;
                this.j = Math.round(this.j);
                a = this.g;
                a.j || (a.g.g.currentTime = this.j);
                hf(this)
            }
        }
        ;
        g.ea = function() {
            (this.m = !this.m) ? (this.g.setVolume(0),
            this.B.value = "off") : (this.g.setVolume(1),
            this.B.value = "max")
        }
        ;
        g.qa = function(a) {
            this.j = -1 < a.currentTime ? a.currentTime : 0;
            this.l = -1 < a.duration ? a.duration : 0;
            a = new Re;
            this.ua.textContent = He(Ue(a, new Date(0,0,0,0,0,this.j)));
            this.Ea.textContent = He(Ue(a, new Date(0,0,0,0,0,this.l)));
            hf(this)
        }
        ;
        g.Ka = function(a) {
            switch (a.type) {
            case window.google.ima.AdEvent.Type.VOLUME_MUTED:
                this.m || this.ea();
                break;
            case window.google.ima.AdEvent.Type.VOLUME_CHANGED:
                a = this.g.i.getVolume(),
                (0 == a && !this.m || 0 != a && this.m) && this.ea()
            }
        }
        ;
        var hf = function(a) {
            a.Ga.style.width = 0 < a.l ? Math.round(a.j / a.l * 100) + "%" : "0"
        };
        Xe.prototype.Fa = function(a) {
            a = "(" + (new Date).toLocaleTimeString() + ") " + a;
            var b = document.createElement("li");
            b.appendChild(document.createTextNode(a));
            this.A.appendChild(b);
            this.A.scrollTop = this.A.scrollHeight
        }
        ;
        Xe.prototype.Z = function() {
            this.A.textContent = ""
        }
        ;
        var Ze = function(a, b, c) {
            c = c.bind(a);
            b.addEventListener ? b.addEventListener("click", c, !1) : b.attachEvent && b.attachEvent("onclick", c);
            a.P.push({
                element: b,
                L: c
            })
        }
          , Ye = [{
            name: "leaderboard",
            width: 728,
            height: 90
        }, {
            name: "mediumRectangle",
            width: 300,
            height: 250
        }, {
            name: "rectangle",
            width: 180,
            height: 150
        }, {
            name: "button2",
            width: 120,
            height: 60
        }, {
            name: "microBar",
            width: 88,
            height: 31
        }, {
            name: "smallRectangle",
            width: 300,
            height: 60
        }, {
            name: "threeByOne",
            width: 300,
            height: 100
        }, {
            name: "mobileBanner",
            width: 320,
            height: 50
        }, {
            name: "smallBanner",
            width: 468,
            height: 60
        }, {
            name: "halfPageAd",
            width: 300,
            height: 600
        }, {
            name: "wideSkyscraper",
            width: 160,
            height: 600
        }];
        qa("VideoSuiteInspector.ui.UserInterface", Xe, window);
    }
    ).call(this);
}
)();
