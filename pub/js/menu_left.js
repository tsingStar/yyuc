(function(v) {
    var B = false,
    r = false,
    x = 5000,
    A = 2000,
    D = function() {
        var b = document.getElementsByTagName("script"),
        b = b[b.length - 1].src.split("?")[0];
        return b.split("/").length > 0 ? b.split("/").slice(0, -1).join("/") + "/": ""
    } (),
    w = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || false,
    z = window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || false,
    t = false,
    C = function() {
        if (t) {
            return t
        }
        var d = document.createElement("DIV"),
        b = {
            haspointerlock: "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document
        };
        b.isopera = "opera" in window;
        b.isopera12 = b.isopera && "getUserMedia" in navigator;
        b.isie = "all" in document && "attachEvent" in d && !b.isopera;
        b.isieold = b.isie && !("msInterpolationMode" in d.style);
        b.isie7 = b.isie && !b.isieold && (!("documentMode" in document) || document.documentMode == 7);
        b.isie8 = b.isie && "documentMode" in document && document.documentMode == 8;
        b.isie9 = b.isie && "performance" in window && document.documentMode >= 9;
        b.isie10 = b.isie && "performance" in window && document.documentMode >= 10;
        b.isie9mobile = /iemobile.9/i.test(navigator.userAgent);
        if (b.isie9mobile) {
            b.isie9 = false
        }
        b.isie7mobile = !b.isie9mobile && b.isie7 && /iemobile/i.test(navigator.userAgent);
        b.ismozilla = "MozAppearance" in d.style;
        b.iswebkit = "WebkitAppearance" in d.style;
        b.ischrome = "chrome" in window;
        b.ischrome22 = b.ischrome && b.haspointerlock;
        b.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window;
        b.hasmstouch = window.navigator.msPointerEnabled || false;
        b.ismac = /^mac$/i.test(navigator.platform);
        b.isios = b.cantouch && /iphone|ipad|ipod/i.test(navigator.platform);
        b.isios4 = b.isios && !("seal" in Object);
        b.isandroid = /android/i.test(navigator.userAgent);
        b.trstyle = false;
        b.hastransform = false;
        b.hastranslate3d = false;
        b.transitionstyle = false;
        b.hastransition = false;
        b.transitionend = false;
        for (var f = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"], g = 0; g < f.length; g++) {
            if (typeof d.style[f[g]] != "undefined") {
                b.trstyle = f[g];
                break
            }
        }
        b.hastransform = b.trstyle != false;
        if (b.hastransform) {
            d.style[b.trstyle] = "translate3d(1px,2px,3px)",
            b.hastranslate3d = /translate3d/.test(d.style[b.trstyle])
        }
        b.transitionstyle = false;
        b.prefixstyle = "";
        b.transitionend = false;
        for (var f = "transition,webkitTransition,MozTransition,OTransition,OTransition,msTransition,KhtmlTransition".split(","), h = ",-webkit-,-moz-,-o-,-o,-ms-,-khtml-".split(","), c = "transitionend,webkitTransitionEnd,transitionend,otransitionend,oTransitionEnd,msTransitionEnd,KhtmlTransitionEnd".split(","), g = 0; g < f.length; g++) {
            if (f[g] in d.style) {
                b.transitionstyle = f[g];
                b.prefixstyle = h[g];
                b.transitionend = c[g];
                break
            }
        }
        b.hastransition = b.transitionstyle;
        a: {
            f = ["-moz-grab", "-webkit-grab", "grab"];
            if (b.ischrome && !b.ischrome22 || b.isie) {
                f = []
            }
            for (g = 0; g < f.length; g++) {
                if (h = f[g], d.style.cursor = h, d.style.cursor == h) {
                    f = h;
                    break a
                }
            }
            f = "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"
        }
        b.cursorgrabvalue = f;
        b.hasmousecapture = "setCapture" in d;
        return t = b
    },
    E = function(b, h) {
        function j(l, n, m) {
            n = l.css(n);
            l = parseFloat(n);
            return isNaN(l) ? (l = f[n] || 0, m = l == 3 ? m ? g.win.outerHeight() - g.win.innerHeight() : g.win.outerWidth() - g.win.innerWidth() : 1, g.isie8 && l && (l += 1), m ? l: 0) : l
        }
        function k(o, m) {
            var l = 0,
            n = 0,
            s = 1;
            "wheelDeltaY" in o ? (s = g.opt.mousescrollstep / 48, l = Math.floor(o.wheelDeltaX * s), n = Math.floor(o.wheelDeltaY * s)) : (s = o.detail ? o.detail * -1 : o.wheelDelta / 40) && (m ? l = Math.floor(s * g.opt.mousescrollstep) : n = Math.floor(s * g.opt.mousescrollstep));
            l && (g.scrollmom && g.scrollmom.stop(), g.lastdeltax += l, g.synched("mousewheelx",
            function() {
                var y = g.lastdeltax;
                g.lastdeltax = 0;
                g.rail.drag || g.doScrollLeftBy(y)
            }));
            n && (g.scrollmom && g.scrollmom.stop(), g.lastdeltay += n, g.synched("mousewheely",
            function() {
                var y = g.lastdeltay;
                g.lastdeltay = 0;
                g.rail.drag || g.doScrollBy(y)
            }))
        }
        var g = this;
        this.version = "3.1.0";
        this.name = "nicescroll";
        this.me = h;
        this.opt = {
            doc: v("body"),
            win: false,
            zindex: 9000,
            cursoropacitymin: 0,
            cursoropacitymax: 1,
            cursorcolor: "#424242",
            cursorwidth: "5px",
            cursorborder: "1px solid #fff",
            cursorborderradius: "5px",
            scrollspeed: 60,
            mousescrollstep: 24,
            touchbehavior: false,
            hwacceleration: true,
            usetransition: true,
            boxzoom: false,
            dblclickzoom: true,
            gesturezoom: true,
            grabcursorenabled: true,
            autohidemode: true,
            background: "",
            iframeautoresize: true,
            cursorminheight: 32,
            preservenativescrolling: true,
            railoffset: false,
            bouncescroll: true,
            spacebarenabled: true,
            railpadding: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            },
            disableoutline: true,
            horizrailenabled: true,
            railalign: "right",
            railvalign: "bottom",
            enabletranslate3d: true,
            enablemousewheel: true,
            enablekeyboard: true,
            smoothscroll: true,
            sensitiverail: true
        };
        this.opt.snapbackspeed = 80;
        if (b) {
            for (var d in g.opt) {
                typeof b[d] != "undefined" && (g.opt[d] = b[d])
            }
        }
        this.iddoc = (this.doc = g.opt.doc) && this.doc[0] ? this.doc[0].id || "": "";
        this.ispage = /BODY|HTML/.test(g.opt.win ? g.opt.win[0].nodeName: this.doc[0].nodeName);
        this.haswrapper = g.opt.win !== false;
        this.win = g.opt.win || (this.ispage ? v(window) : this.doc);
        this.docscroll = this.ispage && !this.haswrapper ? v(window) : this.win;
        this.body = v("body");
        this.iframe = this.isfixed = this.viewport = false;
        this.isiframe = this.doc[0].nodeName == "IFRAME" && this.win[0].nodeName == "IFRAME";
        this.istextarea = this.win[0].nodeName == "TEXTAREA";
        this.forcescreen = false;
        this.canshowonmouseevent = g.opt.autohidemode != "scroll";
        this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = false;
        this.scroll = {
            x: 0,
            y: 0
        };
        this.scrollratio = {
            x: 0,
            y: 0
        };
        this.cursorheight = 20;
        this.scrollvaluemax = 0;
        this.observer = this.scrollmom = this.scrollrunning = false;
        do {
            this.id = "ascrail" + A++
        } while ( document . getElementById ( this . id ));
        this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.cursorfreezed = this.cursor = this.rail = false;
        this.visibility = true;
        this.hidden = this.locked = false;
        this.cursoractive = true;
        this.nativescrollingarea = false;
        this.events = [];
        this.saved = {};
        this.delaylist = {};
        this.synclist = {};
        this.lastdeltay = this.lastdeltax = 0;
        this.detected = C();
        var i = v.extend({},
        this.detected);
        this.ishwscroll = (this.canhwscroll = i.hastransform && g.opt.hwacceleration) && g.haswrapper;
        this.istouchcapable = false;
        if (i.cantouch && i.ischrome && !i.isios && !i.isandroid) {
            this.istouchcapable = true,
            i.cantouch = false
        }
        if (i.cantouch && i.ismozilla && !i.isios) {
            this.istouchcapable = true,
            i.cantouch = false
        }
        this.delayed = function(n, m, y, l) {
            var s = g.delaylist[n],
            o = (new Date).getTime();
            if (!l && s && s.tt) {
                return false
            }
            s && s.tt && clearTimeout(s.tt);
            if (s && s.last + y > o && !s.tt) {
                g.delaylist[n] = {
                    last: o + y,
                    tt: setTimeout(function() {
                        g.delaylist[n].tt = 0;
                        m.call()
                    },
                    y)
                }
            } else {
                if (!s || !s.tt) {
                    g.delaylist[n] = {
                        last: o,
                        tt: 0
                    },
                    setTimeout(function() {
                        m.call()
                    },
                    0)
                }
            }
        };
        this.synched = function(m, l) {
            g.synclist[m] = l; (function() {
                if (!g.onsync) {
                    w(function() {
                        g.onsync = false;
                        for (m in g.synclist) {
                            var n = g.synclist[m];
                            n && n.call(g);
                            g.synclist[m] = false
                        }
                    }),
                    g.onsync = true
                }
            })();
            return m
        };
        this.unsynched = function(l) {
            g.synclist[l] && (g.synclist[l] = false)
        };
        this.css = function(l, n) {
            for (var m in n) {
                g.saved.css.push([l, m, l.css(m)]),
                l.css(m, n[m])
            }
        };
        this.scrollTop = function(l) {
            return typeof l == "undefined" ? g.getScrollTop() : g.setScrollTop(l)
        };
        this.scrollLeft = function(l) {
            return typeof l == "undefined" ? g.getScrollLeft() : g.setScrollLeft(l)
        };
        BezierClass = function(y, m, o, s, n, G, l) {
            this.st = y;
            this.ed = m;
            this.spd = o;
            this.p1 = s || 0;
            this.p2 = n || 1;
            this.p3 = G || 0;
            this.p4 = l || 1;
            this.ts = (new Date).getTime();
            this.df = this.ed - this.st
        };
        BezierClass.prototype = {
            B2: function(l) {
                return 3 * l * l * (1 - l)
            },
            B3: function(l) {
                return 3 * l * (1 - l) * (1 - l)
            },
            B4: function(l) {
                return (1 - l) * (1 - l) * (1 - l)
            },
            getNow: function() {
                var m = 1 - ((new Date).getTime() - this.ts) / this.spd,
                l = this.B2(m) + this.B3(m) + this.B4(m);
                return m < 0 ? this.ed: this.st + Math.round(this.df * l)
            },
            update: function(m, l) {
                this.st = this.getNow();
                this.ed = m;
                this.spd = l;
                this.ts = (new Date).getTime();
                this.df = this.ed - this.st;
                return this
            }
        };
        if (this.ishwscroll) {
            this.doc.translate = {
                x: 0,
                y: 0,
                tx: "0px",
                ty: "0px"
            };
            i.hastranslate3d && i.isios && this.doc.css("-webkit-backface-visibility", "hidden");
            var c = function() {
                var l = g.doc.css(i.trstyle);
                return l && l.substr(0, 6) == "matrix" ? l.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : false
            };
            this.getScrollTop = function(l) {
                if (!l) {
                    if (l = c()) {
                        return l.length == 16 ? -l[13] : -l[5]
                    }
                    if (g.timerscroll && g.timerscroll.bz) {
                        return g.timerscroll.bz.getNow()
                    }
                }
                return g.doc.translate.y
            };
            this.getScrollLeft = function(l) {
                if (!l) {
                    if (l = c()) {
                        return l.length == 16 ? -l[12] : -l[4]
                    }
                    if (g.timerscroll && g.timerscroll.bh) {
                        return g.timerscroll.bh.getNow()
                    }
                }
                return g.doc.translate.x
            };
            this.notifyScrollEvent = document.createEvent ?
            function(m) {
                var l = document.createEvent("UIEvents");
                l.initUIEvent("scroll", false, true, window, 1);
                m.dispatchEvent(l)
            }: document.fireEvent ?
            function(m) {
                var l = document.createEventObject();
                m.fireEvent("onscroll");
                l.cancelBubble = true
            }: function() {};
            i.hastranslate3d && g.opt.enabletranslate3d ? (this.setScrollTop = function(m, l) {
                g.doc.translate.y = m;
                g.doc.translate.ty = m * -1 + "px";
                g.doc.css(i.trstyle, "translate3d(" + g.doc.translate.tx + "," + g.doc.translate.ty + ",0px)");
                l || g.notifyScrollEvent(g.win[0])
            },
            this.setScrollLeft = function(m, l) {
                g.doc.translate.x = m;
                g.doc.translate.tx = m * -1 + "px";
                g.doc.css(i.trstyle, "translate3d(" + g.doc.translate.tx + "," + g.doc.translate.ty + ",0px)");
                l || g.notifyScrollEvent(g.win[0])
            }) : (this.setScrollTop = function(m, l) {
                g.doc.translate.y = m;
                g.doc.translate.ty = m * -1 + "px";
                g.doc.css(i.trstyle, "translate(" + g.doc.translate.tx + "," + g.doc.translate.ty + ")");
                l || g.notifyScrollEvent(g.win[0])
            },
            this.setScrollLeft = function(m, l) {
                g.doc.translate.x = m;
                g.doc.translate.tx = m * -1 + "px";
                g.doc.css(i.trstyle, "translate(" + g.doc.translate.tx + "," + g.doc.translate.ty + ")");
                l || g.notifyScrollEvent(g.win[0])
            })
        } else {
            this.getScrollTop = function() {
                return g.docscroll.scrollTop()
            },
            this.setScrollTop = function(l) {
                return g.docscroll.scrollTop(l)
            },
            this.getScrollLeft = function() {
                return g.docscroll.scrollLeft()
            },
            this.setScrollLeft = function(l) {
                return g.docscroll.scrollLeft(l)
            }
        }
        this.getTarget = function(l) {
            return ! l ? false: l.target ? l.target: l.srcElement ? l.srcElement: false
        };
        this.hasParent = function(m, n) {
            if (!m) {
                return false
            }
            for (var l = m.target || m.srcElement || m || false; l && l.id != n;) {
                l = l.parentNode || false
            }
            return l !== false
        };
        var f = {
            thin: 1,
            medium: 3,
            thick: 5
        };
        this.getOffset = function() {
            if (g.isfixed) {
                return {
                    top: parseFloat(g.win.css("top")),
                    left: parseFloat(g.win.css("left"))
                }
            }
            if (!g.viewport) {
                return g.win.offset()
            }
            var m = g.win.offset(),
            l = g.viewport.offset();
            return {
                top: m.top - l.top + g.viewport.scrollTop(),
                left: m.left - l.left + g.viewport.scrollLeft()
            }
        };
        this.updateScrollBar = function(o) {
            if (g.ishwscroll) {
                g.rail.css({
                    height: g.win.innerHeight()
                }),
                g.railh && g.railh.css({
                    width: g.win.innerWidth()
                })
            } else {
                var m = g.getOffset(),
                l = m.top,
                n = m.left;
                l += j(g.win, "border-top-width", true);
                g.win.outerWidth();
                g.win.innerWidth();
                n += g.rail.align ? g.win.outerWidth() - j(g.win, "border-right-width") - g.rail.width: j(g.win, "border-left-width");
                var s = g.opt.railoffset;
                s && (s.top && (l += s.top), g.rail.align && s.left && (n += s.left));
                g.locked || g.rail.css({
                    top: l,
                    left: n,
                    height: o ? o.h: g.win.innerHeight()
                });
                g.zoom && g.zoom.css({
                    top: l + 1,
                    left: g.rail.align == 1 ? n - 20 : n + g.rail.width + 4
                });
                if (g.railh && !g.locked) {
                    l = m.top,
                    n = m.left,
                    o = g.railh.align ? l + j(g.win, "border-top-width", true) + g.win.innerHeight() - g.railh.height: l + j(g.win, "border-top-width", true),
                    n += j(g.win, "border-left-width"),
                    g.railh.css({
                        top: o,
                        left: n,
                        width: g.railh.width
                    })
                }
            }
        };
        this.doRailClick = function(o, n, l) {
            var m; ! (g.rail.drag && g.rail.drag.pt != 1) && !g.locked && !g.rail.drag && (g.cancelScroll(), g.cancelEvent(o), n ? (n = l ? g.doScrollLeft: g.doScrollTop, m = l ? (o.pageX - g.railh.offset().left - g.cursorwidth / 2) * g.scrollratio.x: (o.pageY - g.rail.offset().top - g.cursorheight / 2) * g.scrollratio.y, n(m)) : (n = l ? g.doScrollLeftBy: g.doScrollBy, m = l ? g.scroll.x: g.scroll.y, o = l ? o.pageX - g.railh.offset().left: o.pageY - g.rail.offset().top, l = l ? g.view.w: g.view.h, m >= o ? n(l) : n( - l)))
        };
        g.hasanimationframe = w;
        g.hascancelanimationframe = z;
        g.hasanimationframe ? g.hascancelanimationframe || (z = function() {
            g.cancelAnimationFrame = true
        }) : (w = function(l) {
            return setTimeout(l, 16)
        },
        z = clearInterval);
        this.init = function() {
            g.saved.css = [];
            if (i.isie7mobile) {
                return true
            }
            i.hasmstouch && g.css(g.ispage ? v("html") : g.win, {
                "-ms-touch-action": "none"
            });
            if (!g.ispage || !i.cantouch && !i.isieold && !i.isie9mobile) {
                var L = g.docscroll;
                g.ispage && (L = g.haswrapper ? g.win: g.doc);
                i.isie9mobile || g.css(L, {
                    "overflow-y": "hidden"
                });
                g.ispage && i.isie7 && (g.doc[0].nodeName == "BODY" ? g.css(v("html"), {
                    "overflow-y": "hidden"
                }) : g.doc[0].nodeName == "HTML" && g.css(v("body"), {
                    "overflow-y": "hidden"
                }));
                i.isios && !g.ispage && !g.haswrapper && g.css(v("body"), {
                    "-webkit-overflow-scrolling": "touch"
                });
                var y = v(document.createElement("div"));
                y.css({
                    position: "relative",
                    top: 0,
                    "float": "right",
                    width: g.opt.cursorwidth,
                    height: "0px",
                    "background-color": g.opt.cursorcolor,
                    border: g.opt.cursorborder,
                    "background-clip": "padding-box",
                    "-webkit-border-radius": g.opt.cursorborderradius,
                    "-moz-border-radius": g.opt.cursorborderradius,
                    "border-radius": g.opt.cursorborderradius
                });
                y.hborder = parseFloat(y.outerHeight() - y.innerHeight());
                g.cursor = y;
                var M = v(document.createElement("div"));
                M.attr("id", g.id);
                var N, O, Q = ["left", "right"],
                s;
                for (s in Q) {
                    O = Q[s],
                    (N = g.opt.railpadding[O]) ? M.css("padding-" + O, N + "px") : g.opt.railpadding[O] = 0
                }
                M.append(y);
                M.width = Math.max(parseFloat(g.opt.cursorwidth), y.outerWidth()) + g.opt.railpadding.left + g.opt.railpadding.right;
                M.css({
                    width: M.width + "px",
                    zIndex: g.ispage ? g.opt.zindex: g.opt.zindex + 2,
                    background: g.opt.background
                });
                M.visibility = true;
                M.scrollable = true;
                M.align = g.opt.railalign == "left" ? 0 : 1;
                g.rail = M;
                y = g.rail.drag = false;
                if (g.opt.boxzoom && !g.ispage && !i.isieold && (y = document.createElement("div"), g.bind(y, "click", g.doZoom), g.zoom = v(y), g.zoom.css({
                    cursor: "pointer",
                    "z-index": g.opt.zindex,
                    backgroundImage: "url(" + D + "zoomico.png)",
                    height: 18,
                    width: 18,
                    backgroundPosition: "0px 0px"
                }), g.opt.dblclickzoom && g.bind(g.win, "dblclick", g.doZoom), i.cantouch && g.opt.gesturezoom)) {
                    g.ongesturezoom = function(F) {
                        F.scale > 1.5 && g.doZoomIn(F);
                        F.scale < 0.8 && g.doZoomOut(F);
                        return g.cancelEvent(F)
                    },
                    g.bind(g.win, "gestureend", g.ongesturezoom)
                }
                g.railh = false;
                if (g.opt.horizrailenabled) {
                    g.css(L, {
                        "overflow-x": "hidden"
                    });
                    y = v(document.createElement("div"));
                    y.css({
                        position: "relative",
                        top: 0,
                        height: g.opt.cursorwidth,
                        width: "0px",
                        "background-color": g.opt.cursorcolor,
                        border: g.opt.cursorborder,
                        "background-clip": "padding-box",
                        "-webkit-border-radius": g.opt.cursorborderradius,
                        "-moz-border-radius": g.opt.cursorborderradius,
                        "border-radius": g.opt.cursorborderradius
                    });
                    y.wborder = parseFloat(y.outerWidth() - y.innerWidth());
                    g.cursorh = y;
                    var l = v(document.createElement("div"));
                    l.attr("id", g.id + "-hr");
                    l.height = 1 + Math.max(parseFloat(g.opt.cursorwidth), y.outerHeight());
                    l.css({
                        height: l.height + "px",
                        zIndex: g.ispage ? g.opt.zindex: g.opt.zindex + 2,
                        background: g.opt.background
                    });
                    l.append(y);
                    l.visibility = true;
                    l.scrollable = true;
                    l.align = g.opt.railvalign == "top" ? 0 : 1;
                    g.railh = l;
                    g.railh.drag = false
                }
                if (g.ispage) {
                    M.css({
                        position: "fixed",
                        top: "0px",
                        height: "100%"
                    }),
                    M.align ? M.css({
                        right: "0px"
                    }) : M.css({
                        left: "0px"
                    }),
                    g.body.append(M),
                    g.railh && (l.css({
                        position: "fixed",
                        left: "0px",
                        width: "100%"
                    }), l.align ? l.css({
                        bottom: "0px"
                    }) : l.css({
                        top: "0px"
                    }), g.body.append(l))
                } else {
                    if (g.ishwscroll) {
                        g.win.css("position") == "static" && g.css(g.win, {
                            position: "relative"
                        }),
                        L = g.win[0].nodeName == "HTML" ? g.body: g.win,
                        g.zoom && (g.zoom.css({
                            position: "absolute",
                            top: 1,
                            right: 0,
                            "margin-right": M.width + 4
                        }), L.append(g.zoom)),
                        M.css({
                            position: "absolute",
                            top: 0
                        }),
                        M.align ? M.css({
                            right: 0
                        }) : M.css({
                            left: 0
                        }),
                        L.append(M),
                        l && (l.css({
                            position: "absolute",
                            left: 0,
                            bottom: 0
                        }), l.align ? l.css({
                            bottom: 0
                        }) : l.css({
                            top: 0
                        }), L.append(l))
                    } else {
                        g.isfixed = g.win.css("position") == "fixed";
                        L = g.isfixed ? "fixed": "absolute";
                        if (!g.isfixed) {
                            g.viewport = g.getViewport(g.win[0])
                        }
                        if (g.viewport) {
                            g.body = g.viewport
                        }
                        M.css({
                            position: L
                        });
                        g.zoom && g.zoom.css({
                            position: L
                        });
                        g.updateScrollBar();
                        g.body.append(M);
                        g.zoom && g.body.append(g.zoom);
                        g.railh && (l.css({
                            position: L
                        }), g.body.append(l))
                    }
                    i.isios && g.css(g.win, {
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                        "-webkit-touch-callout": "none"
                    });
                    i.isie && g.opt.disableoutline && g.win.attr("hideFocus", "true");
                    i.iswebkit && g.opt.disableoutline && g.win.css({
                        outline: "none"
                    })
                }
                if (g.opt.autohidemode === false) {
                    g.autohidedom = false
                } else {
                    if (g.opt.autohidemode === true) {
                        if (g.autohidedom = v().add(g.rail), g.railh) {
                            g.autohidedom = g.autohidedom.add(g.railh)
                        }
                    } else {
                        if (g.opt.autohidemode == "scroll") {
                            if (g.autohidedom = v().add(g.rail), g.railh) {
                                g.autohidedom = g.autohidedom.add(g.railh)
                            }
                        } else {
                            if (g.opt.autohidemode == "cursor") {
                                if (g.autohidedom = v().add(g.cursor), g.railh) {
                                    g.autohidedom = g.autohidedom.add(g.railh.cursor)
                                }
                            } else {
                                if (g.opt.autohidemode == "hidden") {
                                    g.autohidedom = false,
                                    g.hide(),
                                    g.locked = false
                                }
                            }
                        }
                    }
                }
                if (i.isie9mobile) {
                    g.scrollmom = new u(g),
                    g.onmangotouch = function() {
                        var I = g.getScrollTop(),
                        H = g.getScrollLeft();
                        if (I == g.scrollmom.lastscrolly && H == g.scrollmom.lastscrollx) {
                            return true
                        }
                        var K = I - g.mangotouch.sy,
                        G = H - g.mangotouch.sx;
                        if (Math.round(Math.sqrt(Math.pow(G, 2) + Math.pow(K, 2))) != 0) {
                            var S = K < 0 ? -1 : 1,
                            J = G < 0 ? -1 : 1,
                            F = +new Date;
                            g.mangotouch.lazy && clearTimeout(g.mangotouch.lazy);
                            if (F - g.mangotouch.tm > 80 || g.mangotouch.dry != S || g.mangotouch.drx != J) {
                                g.scrollmom.stop(),
                                g.scrollmom.reset(H, I),
                                g.mangotouch.sy = I,
                                g.mangotouch.ly = I,
                                g.mangotouch.sx = H,
                                g.mangotouch.lx = H,
                                g.mangotouch.dry = S,
                                g.mangotouch.drx = J,
                                g.mangotouch.tm = F
                            } else {
                                if (g.scrollmom.stop(), g.scrollmom.update(g.mangotouch.sx - G, g.mangotouch.sy - K), g.mangotouch.tm = F, K = Math.max(Math.abs(g.mangotouch.ly - I), Math.abs(g.mangotouch.lx - H)), g.mangotouch.ly = I, g.mangotouch.lx = H, K > 2) {
                                    g.mangotouch.lazy = setTimeout(function() {
                                        g.mangotouch.lazy = false;
                                        g.mangotouch.dry = 0;
                                        g.mangotouch.drx = 0;
                                        g.mangotouch.tm = 0;
                                        g.scrollmom.doMomentum(30)
                                    },
                                    100)
                                }
                            }
                        }
                    },
                    M = g.getScrollTop(),
                    l = g.getScrollLeft(),
                    g.mangotouch = {
                        sy: M,
                        ly: M,
                        dry: 0,
                        sx: l,
                        lx: l,
                        drx: 0,
                        lazy: false,
                        tm: 0
                    },
                    g.bind(g.docscroll, "scroll", g.onmangotouch)
                } else {
                    if (i.cantouch || g.istouchcapable || g.opt.touchbehavior || i.hasmstouch) {
                        g.scrollmom = new u(g);
                        g.ontouchstart = function(G) {
                            if (G.pointerType && G.pointerType != 2) {
                                return false
                            }
                            if (!g.locked) {
                                if (i.hasmstouch) {
                                    for (var H = G.target ? G.target: false; H;) {
                                        var F = v(H).getNiceScroll();
                                        if (F.length > 0 && F[0].me == g.me) {
                                            break
                                        }
                                        if (F.length > 0) {
                                            return false
                                        }
                                        if (H.nodeName == "DIV" && H.id == g.id) {
                                            break
                                        }
                                        H = H.parentNode ? H.parentNode: false
                                    }
                                }
                                g.cancelScroll();
                                if ((H = g.getTarget(G)) && /INPUT/i.test(H.nodeName) && /range/i.test(H.type)) {
                                    return g.stopPropagation(G)
                                }
                                if (! ("clientX" in G) && "changedTouches" in G) {
                                    G.clientX = G.changedTouches[0].clientX,
                                    G.clientY = G.changedTouches[0].clientY
                                }
                                if (g.forcescreen) {
                                    F = G,
                                    G = {
                                        original: G.original ? G.original: G
                                    },
                                    G.clientX = F.screenX,
                                    G.clientY = F.screenY
                                }
                                g.rail.drag = {
                                    x: G.clientX,
                                    y: G.clientY,
                                    sx: g.scroll.x,
                                    sy: g.scroll.y,
                                    st: g.getScrollTop(),
                                    sl: g.getScrollLeft(),
                                    pt: 2
                                };
                                g.opt.touchbehavior && g.isiframe && i.isie && (F = g.win.position(), g.rail.drag.x += F.left, g.rail.drag.y += F.top);
                                g.hasmoving = false;
                                g.lastmouseup = false;
                                g.scrollmom.reset(G.clientX, G.clientY);
                                if (!i.cantouch && !this.istouchcapable && !i.hasmstouch) {
                                    if (!H || !/INPUT|SELECT|TEXTAREA/i.test(H.nodeName)) {
                                        return ! g.ispage && i.hasmousecapture && H.setCapture(),
                                        g.cancelEvent(G)
                                    }
                                    if (/SUBMIT|CANCEL|BUTTON/i.test(v(H).attr("type"))) {
                                        pc = {
                                            tg: H,
                                            click: false
                                        },
                                        g.preventclick = pc
                                    }
                                }
                            }
                        };
                        g.ontouchend = function(F) {
                            if (F.pointerType && F.pointerType != 2) {
                                return false
                            }
                            if (g.rail.drag && g.rail.drag.pt == 2 && (g.scrollmom.doMomentum(), g.rail.drag = false, g.hasmoving && (g.hasmoving = false, g.lastmouseup = true, g.hideCursor(), i.hasmousecapture && document.releaseCapture(), !i.cantouch))) {
                                return g.cancelEvent(F)
                            }
                        };
                        var n = g.opt.touchbehavior && g.isiframe && !i.hasmousecapture;
                        g.ontouchmove = function(I, H) {
                            if (I.pointerType && I.pointerType != 2) {
                                return false
                            }
                            if (g.rail.drag && g.rail.drag.pt == 2) {
                                if (i.cantouch && typeof I.original == "undefined") {
                                    return true
                                }
                                g.hasmoving = true;
                                if (g.preventclick && !g.preventclick.click) {
                                    g.preventclick.click = g.preventclick.tg.onclick || false,
                                    g.preventclick.tg.onclick = g.onpreventclick
                                }
                                I = v.extend({
                                    original: I
                                },
                                I);
                                if ("changedTouches" in I) {
                                    I.clientX = I.changedTouches[0].clientX,
                                    I.clientY = I.changedTouches[0].clientY
                                }
                                if (g.forcescreen) {
                                    var J = I,
                                    I = {
                                        original: I.original ? I.original: I
                                    };
                                    I.clientX = J.screenX;
                                    I.clientY = J.screenY
                                }
                                J = ofy = 0;
                                if (n && !H) {
                                    var G = g.win.position(),
                                    J = -G.left;
                                    ofy = -G.top
                                }
                                var K = I.clientY + ofy,
                                U = g.rail.drag.st - (K - g.rail.drag.y);
                                if (g.ishwscroll && g.opt.bouncescroll) {
                                    U < 0 ? U = Math.round(U / 2) : U > g.page.maxh && (U = g.page.maxh + Math.round((U - g.page.maxh) / 2))
                                } else {
                                    if (U < 0 && (K = U = 0), U > g.page.maxh) {
                                        U = g.page.maxh,
                                        K = 0
                                    }
                                }
                                var T = I.clientX + J;
                                if (g.railh && g.railh.scrollable) {
                                    var F = g.rail.drag.sl - (T - g.rail.drag.x);
                                    if (g.ishwscroll && g.opt.bouncescroll) {
                                        F < 0 ? F = Math.round(F / 2) : F > g.page.maxw && (F = g.page.maxw + Math.round((F - g.page.maxw) / 2))
                                    } else {
                                        if (F < 0 && (T = F = 0), F > g.page.maxw) {
                                            F = g.page.maxw,
                                            T = 0
                                        }
                                    }
                                }
                                g.synched("touchmove",
                                function() {
                                    g.rail.drag && g.rail.drag.pt == 2 && (g.prepareTransition && g.prepareTransition(0), g.rail.scrollable && g.setScrollTop(U), g.scrollmom.update(T, K), g.railh && g.railh.scrollable ? (g.setScrollLeft(F), g.showCursor(U, F)) : g.showCursor(U), i.isie10 && document.selection.clear())
                                });
                                if (!i.ischrome && !g.istouchcapable) {
                                    return g.cancelEvent(I)
                                }
                            }
                        }
                    }
                    i.cantouch || g.opt.touchbehavior ? (g.onpreventclick = function(F) {
                        if (g.preventclick) {
                            return g.preventclick.tg.onclick = g.preventclick.click,
                            g.preventclick = false,
                            g.cancelEvent(F)
                        }
                    },
                    g.onmousedown = g.ontouchstart, g.onmouseup = g.ontouchend, g.onclick = i.isios ? false: function(F) {
                        return g.lastmouseup ? (g.lastmouseup = false, g.cancelEvent(F)) : true
                    },
                    g.onmousemove = g.ontouchmove, i.cursorgrabvalue && (g.css(g.ispage ? g.doc: g.win, {
                        cursor: i.cursorgrabvalue
                    }), g.css(g.rail, {
                        cursor: i.cursorgrabvalue
                    }))) : (g.onmousedown = function(G, H) {
                        if (! (g.rail.drag && g.rail.drag.pt != 1)) {
                            if (g.locked) {
                                return g.cancelEvent(G)
                            }
                            g.cancelScroll();
                            g.rail.drag = {
                                x: G.clientX,
                                y: G.clientY,
                                sx: g.scroll.x,
                                sy: g.scroll.y,
                                pt: 1,
                                hr: !!H
                            };
                            var F = g.getTarget(G); ! g.ispage && i.hasmousecapture && F.setCapture();
                            if (g.isiframe && !i.hasmousecapture) {
                                g.saved.csspointerevents = g.doc.css("pointer-events"),
                                g.css(g.doc, {
                                    "pointer-events": "none"
                                })
                            }
                            return g.cancelEvent(G)
                        }
                    },
                    g.onmouseup = function(F) {
                        if (g.rail.drag && (i.hasmousecapture && document.releaseCapture(), g.isiframe && !i.hasmousecapture && g.doc.css("pointer-events", g.saved.csspointerevents), g.rail.drag.pt == 1)) {
                            return g.rail.drag = false,
                            g.cancelEvent(F)
                        }
                    },
                    g.onmousemove = function(G) {
                        if (g.rail.drag) {
                            if (g.rail.drag.pt == 1) {
                                if (i.ischrome && G.which == 0) {
                                    return g.onmouseup(G)
                                }
                                g.cursorfreezed = true;
                                if (g.rail.drag.hr) {
                                    g.scroll.x = g.rail.drag.sx + (G.clientX - g.rail.drag.x);
                                    if (g.scroll.x < 0) {
                                        g.scroll.x = 0
                                    }
                                    var F = g.scrollvaluemaxw;
                                    if (g.scroll.x > F) {
                                        g.scroll.x = F
                                    }
                                } else {
                                    g.scroll.y = g.rail.drag.sy + (G.clientY - g.rail.drag.y);
                                    if (g.scroll.y < 0) {
                                        g.scroll.y = 0
                                    }
                                    F = g.scrollvaluemax;
                                    if (g.scroll.y > F) {
                                        g.scroll.y = F
                                    }
                                }
                                g.synched("mousemove",
                                function() {
                                    g.rail.drag && g.rail.drag.pt == 1 && (g.showCursor(), g.rail.drag.hr ? g.doScrollLeft(Math.round(g.scroll.x * g.scrollratio.x)) : g.doScrollTop(Math.round(g.scroll.y * g.scrollratio.y)))
                                });
                                return g.cancelEvent(G)
                            }
                        } else {
                            g.checkarea = true
                        }
                    }); (i.cantouch || g.opt.touchbehavior) && g.bind(g.win, "mousedown", g.onmousedown);
                    i.hasmstouch && (g.css(g.rail, {
                        "-ms-touch-action": "none"
                    }), g.css(g.cursor, {
                        "-ms-touch-action": "none"
                    }), g.bind(g.win, "MSPointerDown", g.ontouchstart), g.bind(document, "MSPointerUp", g.ontouchend), g.bind(document, "MSPointerMove", g.ontouchmove), g.bind(g.cursor, "MSGestureHold",
                    function(F) {
                        F.preventDefault()
                    }), g.bind(g.cursor, "contextmenu",
                    function(F) {
                        F.preventDefault()
                    }));
                    this.istouchcapable && (g.bind(g.win, "touchstart", g.ontouchstart), g.bind(document, "touchend", g.ontouchend), g.bind(document, "touchcancel", g.ontouchend), g.bind(document, "touchmove", g.ontouchmove));
                    g.bind(g.cursor, "mousedown", g.onmousedown);
                    g.bind(g.cursor, "mouseup", g.onmouseup);
                    g.railh && (g.bind(g.cursorh, "mousedown",
                    function(F) {
                        g.onmousedown(F, true)
                    }), g.bind(g.cursorh, "mouseup",
                    function(F) {
                        if (! (g.rail.drag && g.rail.drag.pt == 2)) {
                            return g.rail.drag = false,
                            g.hasmoving = false,
                            g.hideCursor(),
                            i.hasmousecapture && document.releaseCapture(),
                            g.cancelEvent(F)
                        }
                    }));
                    g.bind(document, "mouseup", g.onmouseup);
                    i.hasmousecapture && g.bind(g.win, "mouseup", g.onmouseup);
                    g.bind(document, "mousemove", g.onmousemove);
                    g.onclick && g.bind(document, "click", g.onclick); ! i.cantouch && !g.opt.touchbehavior && (g.rail.mouseenter(function() {
                        g.canshowonmouseevent && g.showCursor();
                        g.rail.active = true
                    }), g.rail.mouseleave(function() {
                        g.rail.active = false;
                        g.rail.drag || g.hideCursor()
                    }), g.opt.sensitiverail && (g.rail.click(function(F) {
                        g.doRailClick(F, false, false)
                    }), g.rail.dblclick(function(F) {
                        g.doRailClick(F, true, false)
                    }), g.cursor.click(function(F) {
                        g.cancelEvent(F)
                    }), g.cursor.dblclick(function(F) {
                        g.cancelEvent(F)
                    })), g.railh && (g.railh.mouseenter(function() {
                        g.canshowonmouseevent && g.showCursor();
                        g.rail.active = true
                    }), g.railh.mouseleave(function() {
                        g.rail.active = false;
                        g.rail.drag || g.hideCursor()
                    })), g.zoom && (g.zoom.mouseenter(function() {
                        g.canshowonmouseevent && g.showCursor();
                        g.rail.active = true
                    }), g.zoom.mouseleave(function() {
                        g.rail.active = false;
                        g.rail.drag || g.hideCursor()
                    })));
                    g.opt.enablemousewheel && (g.isiframe || g.bind(i.isie && g.ispage ? document: g.docscroll, "mousewheel", g.onmousewheel), g.bind(g.rail, "mousewheel", g.onmousewheel), g.railh && g.bind(g.railh, "mousewheel", g.onmousewheelhr)); ! g.ispage && !i.cantouch && !/HTML|BODY/.test(g.win[0].nodeName) && (g.win.attr("tabindex") || g.win.attr({
                        tabindex: x++
                    }), g.win.focus(function(F) {
                        B = g.getTarget(F).id || true;
                        g.hasfocus = true;
                        g.canshowonmouseevent && g.noticeCursor()
                    }), g.win.blur(function() {
                        B = false;
                        g.hasfocus = false
                    }), g.win.mouseenter(function(F) {
                        r = g.getTarget(F).id || true;
                        g.hasmousefocus = true;
                        g.canshowonmouseevent && g.noticeCursor()
                    }), g.win.mouseleave(function() {
                        r = false;
                        g.hasmousefocus = false
                    }))
                }
                g.onkeypress = function(I) {
                    if (g.locked && g.page.maxh == 0) {
                        return true
                    }
                    var I = I ? I: window.e,
                    H = g.getTarget(I);
                    if (H && /INPUT|TEXTAREA|SELECT|OPTION/.test(H.nodeName) && (!H.getAttribute("type") && !H.type || !/submit|button|cancel/i.tp)) {
                        return true
                    }
                    if (g.hasfocus || g.hasmousefocus && !B || g.ispage && !B && !r) {
                        var H = I.keyCode,
                        G = I.ctrlKey || false;
                        if (g.locked && H != 27) {
                            return g.cancelEvent(I)
                        }
                        var F = false;
                        switch (H) {
                        case 38:
                        case 63233:
                            g.doScrollBy(72);
                            F = true;
                            break;
                        case 40:
                        case 63235:
                            g.doScrollBy( - 72);
                            F = true;
                            break;
                        case 37:
                        case 63232:
                            g.railh && (G ? g.doScrollLeft(0) : g.doScrollLeftBy(72), F = true);
                            break;
                        case 39:
                        case 63234:
                            g.railh && (G ? g.doScrollLeft(g.page.maxw) : g.doScrollLeftBy( - 72), F = true);
                            break;
                        case 33:
                        case 63276:
                            g.doScrollBy(g.view.h);
                            F = true;
                            break;
                        case 34:
                        case 63277:
                            g.doScrollBy( - g.view.h);
                            F = true;
                            break;
                        case 36:
                        case 63273:
                            g.railh && G ? g.doScrollPos(0, 0) : g.doScrollTo(0);
                            F = true;
                            break;
                        case 35:
                        case 63275:
                            g.railh && G ? g.doScrollPos(g.page.maxw, g.page.maxh) : g.doScrollTo(g.page.maxh);
                            F = true;
                            break;
                        case 32:
                            g.opt.spacebarenabled && (g.doScrollBy( - g.view.h), F = true);
                            break;
                        case 27:
                            g.zoomactive && (g.doZoom(), F = true)
                        }
                        if (F) {
                            return g.cancelEvent(I)
                        }
                    }
                };
                g.opt.enablekeyboard && g.bind(document, i.isopera && !i.isopera12 ? "keypress": "keydown", g.onkeypress);
                g.bind(window, "resize", g.resize);
                g.bind(window, "orientationchange", g.resize);
                g.bind(window, "load", g.resize);
                if (i.ischrome && !g.ispage && !g.haswrapper) {
                    var m = g.win.attr("style"),
                    M = parseFloat(g.win.css("width")) + 1;
                    g.win.css("width", M);
                    g.synched("chromefix",
                    function() {
                        g.win.attr("style", m)
                    })
                }
                g.onAttributeChange = function() {
                    g.lazyResize()
                };
                if (!g.ispage && !g.haswrapper) {
                    "WebKitMutationObserver" in window ? (g.observer = new WebKitMutationObserver(function(F) {
                        F.forEach(g.onAttributeChange)
                    }), g.observer.observe(g.win[0], {
                        attributes: true,
                        subtree: false
                    })) : (g.bind(g.win, i.isie && !i.isie9 ? "propertychange": "DOMAttrModified", g.onAttributeChange), i.isie9 && g.win[0].attachEvent("onpropertychange", g.onAttributeChange))
                } ! g.ispage && g.opt.boxzoom && g.bind(window, "resize", g.resizeZoom);
                g.istextarea && g.bind(g.win, "mouseup", g.resize);
                g.resize()
            }
            if (this.doc[0].nodeName == "IFRAME") {
                var o = function() {
                    g.iframexd = false;
                    try {
                        var G = "contentDocument" in this ? this.contentDocument: this.contentWindow.document
                    } catch(H) {
                        g.iframexd = true,
                        G = false
                    }
                    if (g.iframexd) {
                        return "console" in window && console.log("NiceScroll error: policy restriced iframe"),
                        true
                    }
                    g.forcescreen = true;
                    if (g.isiframe) {
                        g.iframe = {
                            doc: v(G),
                            html: g.doc.contents().find("html")[0],
                            body: g.doc.contents().find("body")[0]
                        },
                        g.getContentSize = function() {
                            return {
                                w: Math.max(g.iframe.html.scrollWidth, g.iframe.body.scrollWidth),
                                h: Math.max(g.iframe.html.scrollHeight, g.iframe.body.scrollHeight)
                            }
                        },
                        g.docscroll = v(g.iframe.body)
                    }
                    if (!i.isios && g.opt.iframeautoresize && !g.isiframe) {
                        g.win.scrollTop(0);
                        g.doc.height("");
                        var F = Math.max(G.getElementsByTagName("html")[0].scrollHeight, G.body.scrollHeight);
                        g.doc.height(F)
                    }
                    g.resize();
                    i.isie7 && g.css(v(g.iframe.html), {
                        "overflow-y": "hidden"
                    });
                    g.css(v(g.iframe.body), {
                        "overflow-y": "hidden"
                    });
                    "contentWindow" in this ? g.bind(this.contentWindow, "scroll", g.onscroll) : g.bind(G, "scroll", g.onscroll);
                    g.opt.enablemousewheel && g.bind(G, "mousewheel", g.onmousewheel);
                    g.opt.enablekeyboard && g.bind(G, i.isopera ? "keypress": "keydown", g.onkeypress);
                    if (i.cantouch || g.opt.touchbehavior) {
                        g.bind(G, "mousedown", g.onmousedown),
                        g.bind(G, "mousemove",
                        function(I) {
                            g.onmousemove(I, true)
                        }),
                        i.cursorgrabvalue && g.css(v(G.body), {
                            cursor: i.cursorgrabvalue
                        })
                    }
                    g.bind(G, "mouseup", g.onmouseup);
                    g.zoom && (g.opt.dblclickzoom && g.bind(G, "dblclick", g.doZoom), g.ongesturezoom && g.bind(G, "gestureend", g.ongesturezoom))
                };
                this.doc[0].readyState && this.doc[0].readyState == "complete" && setTimeout(function() {
                    o.call(g.doc[0], false)
                },
                500);
                g.bind(this.doc, "load", o)
            }
        };
        this.showCursor = function(m, l) {
            if (g.cursortimeout) {
                clearTimeout(g.cursortimeout),
                g.cursortimeout = 0
            }
            if (g.rail) {
                if (g.autohidedom) {
                    g.autohidedom.stop().css({
                        opacity: g.opt.cursoropacitymax
                    }),
                    g.cursoractive = true
                }
                if (typeof m != "undefined" && m !== false) {
                    g.scroll.y = Math.round(m * 1 / g.scrollratio.y)
                }
                if (typeof l != "undefined") {
                    g.scroll.x = Math.round(l * 1 / g.scrollratio.x)
                }
                g.cursor.css({
                    height: g.cursorheight,
                    top: g.scroll.y
                });
                if (g.cursorh) { ! g.rail.align && g.rail.visibility ? g.cursorh.css({
                        width: g.cursorwidth,
                        left: g.scroll.x + g.rail.width
                    }) : g.cursorh.css({
                        width: g.cursorwidth,
                        left: g.scroll.x
                    }),
                    g.cursoractive = true
                }
                g.zoom && g.zoom.stop().css({
                    opacity: g.opt.cursoropacitymax
                })
            }
        };
        this.hideCursor = function(l) {
            if (!g.cursortimeout && g.rail && g.autohidedom) {
                g.cursortimeout = setTimeout(function() {
                    if (!g.rail.active || !g.showonmouseevent) {
                        g.autohidedom.stop().animate({
                            opacity: g.opt.cursoropacitymin
                        }),
                        g.zoom && g.zoom.stop().animate({
                            opacity: g.opt.cursoropacitymin
                        }),
                        g.cursoractive = false
                    }
                    g.cursortimeout = 0
                },
                l || 400)
            }
        };
        this.noticeCursor = function(l, n, m) {
            g.showCursor(n, m);
            g.rail.active || g.hideCursor(l)
        };
        this.getContentSize = g.ispage ?
        function() {
            return {
                w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }
        }: g.haswrapper ?
        function() {
            return {
                w: g.doc.outerWidth() + parseInt(g.win.css("paddingLeft")) + parseInt(g.win.css("paddingRight")),
                h: g.doc.outerHeight() + parseInt(g.win.css("paddingTop")) + parseInt(g.win.css("paddingBottom"))
            }
        }: function() {
            return {
                w: g.docscroll[0].scrollWidth,
                h: g.docscroll[0].scrollHeight
            }
        };
        this.onResize = function(o, m) {
            if (!g.win) {
                return false
            }
            if (!g.haswrapper && !g.ispage) {
                if (g.win.css("display") == "none") {
                    return g.visibility && g.hideRail().hideRailHr(),
                    false
                } else { ! g.hidden && !g.visibility && g.showRail().showRailHr()
                }
            }
            var l = g.page.maxh,
            n = g.page.maxw,
            s = g.view.w;
            g.view = {
                w: g.ispage ? g.win.width() : parseInt(g.win[0].clientWidth),
                h: g.ispage ? g.win.height() : parseInt(g.win[0].clientHeight)
            };
            g.page = m ? m: g.getContentSize();
            g.page.maxh = Math.max(0, g.page.h - g.view.h);
            g.page.maxw = Math.max(0, g.page.w - g.view.w);
            if (g.page.maxh == l && g.page.maxw == n && g.view.w == s) {
                if (g.ispage) {
                    return g
                } else {
                    l = g.win.offset();
                    if (g.lastposition && (n = g.lastposition, n.top == l.top && n.left == l.left)) {
                        return g
                    }
                    g.lastposition = l
                }
            }
            g.page.maxh == 0 ? (g.hideRail(), g.scrollvaluemax = 0, g.scroll.y = 0, g.scrollratio.y = 0, g.cursorheight = 0, g.setScrollTop(0), g.rail.scrollable = false) : g.rail.scrollable = true;
            g.page.maxw == 0 ? (g.hideRailHr(), g.scrollvaluemaxw = 0, g.scroll.x = 0, g.scrollratio.x = 0, g.cursorwidth = 0, g.setScrollLeft(0), g.railh.scrollable = false) : g.railh.scrollable = true;
            g.locked = g.page.maxh == 0 && g.page.maxw == 0;
            if (g.locked) {
                return g.ispage || g.updateScrollBar(g.view),
                false
            } ! g.hidden && !g.visibility ? g.showRail().showRailHr() : !g.hidden && !g.railh.visibility && g.showRailHr();
            g.istextarea && g.win.css("resize") && g.win.css("resize") != "none" && (g.view.h -= 20);
            g.ispage || g.updateScrollBar(g.view);
            g.cursorheight = Math.min(g.view.h, Math.round(g.view.h * (g.view.h / g.page.h)));
            g.cursorheight = Math.max(g.opt.cursorminheight, g.cursorheight);
            g.cursorwidth = Math.min(g.view.w, Math.round(g.view.w * (g.view.w / g.page.w)));
            g.cursorwidth = Math.max(g.opt.cursorminheight, g.cursorwidth);
            g.scrollvaluemax = g.view.h - g.cursorheight - g.cursor.hborder;
            if (g.railh) {
                g.railh.width = g.page.maxh > 0 ? g.view.w - g.rail.width: g.view.w,
                g.scrollvaluemaxw = g.railh.width - g.cursorwidth - g.cursorh.wborder
            }
            g.scrollratio = {
                x: g.page.maxw / g.scrollvaluemaxw,
                y: g.page.maxh / g.scrollvaluemax
            };
            g.getScrollTop() > g.page.maxh ? g.doScroll(g.page.maxh) : (g.scroll.y = Math.round(g.getScrollTop() * (1 / g.scrollratio.y)), g.scroll.x = Math.round(g.getScrollLeft() * (1 / g.scrollratio.x)), g.cursoractive && g.noticeCursor());
            g.scroll.y && g.getScrollTop() == 0 && g.doScrollTo(Math.floor(g.scroll.y * g.scrollratio.y));
            return g
        };
        this.resize = function() {
            g.delayed("resize", g.onResize, 30);
            return g
        };
        this.lazyResize = function() {
            g.delayed("resize", g.resize, 250)
        };
        this._bind = function(o, n, l, m) {
            g.events.push({
                e: o,
                n: n,
                f: l,
                b: m
            });
            o.addEventListener ? o.addEventListener(n, l, m || false) : o.attachEvent ? o.attachEvent("on" + n, l) : o["on" + n] = l
        };
        this.bind = function(o, m, l, s) {
            var n = "jquery" in o ? o[0] : o;
            n.addEventListener ? (i.cantouch && /mouseup|mousedown|mousemove/.test(m) && g._bind(n, m == "mousedown" ? "touchstart": m == "mouseup" ? "touchend": "touchmove",
            function(G) {
                if (G.touches) {
                    if (G.touches.length < 2) {
                        var y = G.touches.length ? G.touches[0] : G;
                        y.original = G;
                        l.call(this, y)
                    }
                } else {
                    if (G.changedTouches) {
                        y = G.changedTouches[0],
                        y.original = G,
                        l.call(this, y)
                    }
                }
            },
            s || false), g._bind(n, m, l, s || false), m == "mousewheel" && g._bind(n, "DOMMouseScroll", l, s || false), i.cantouch && m == "mouseup" && g._bind(n, "touchcancel", l, s || false)) : g._bind(n, m,
            function(y) {
                if ((y = y || window.event || false) && y.srcElement) {
                    y.target = y.srcElement
                }
                return l.call(n, y) === false || s === false ? g.cancelEvent(y) : true
            })
        };
        this._unbind = function(n, m, o, l) {
            n.removeEventListener ? n.removeEventListener(m, o, l) : n.detachEvent ? n.detachEvent("on" + m, o) : n["on" + m] = false
        };
        this.unbindAll = function() {
            for (var m = 0; m < g.events.length; m++) {
                var l = g.events[m];
                g._unbind(l.e, l.n, l.f, l.b)
            }
        };
        this.cancelEvent = function(l) {
            l = l.original ? l.original: l ? l: window.event || false;
            if (!l) {
                return false
            }
            l.preventDefault && l.preventDefault();
            l.stopPropagation && l.stopPropagation();
            l.preventManipulation && l.preventManipulation();
            l.cancelBubble = true;
            l.cancel = true;
            return l.returnValue = false
        };
        this.stopPropagation = function(l) {
            l = l.original ? l.original: l ? l: window.event || false;
            if (!l) {
                return false
            }
            if (l.stopPropagation) {
                return l.stopPropagation()
            }
            if (l.cancelBubble) {
                l.cancelBubble = true
            }
            return false
        };
        this.showRail = function() {
            if (g.page.maxh != 0 && (g.ispage || g.win.css("display") != "none")) {
                g.visibility = true,
                g.rail.visibility = true,
                g.rail.css("display", "block")
            }
            return g
        };
        this.showRailHr = function() {
            if (!g.railh) {
                return g
            }
            if (g.page.maxw != 0 && (g.ispage || g.win.css("display") != "none")) {
                g.railh.visibility = true,
                g.railh.css("display", "block")
            }
            return g
        };
        this.hideRail = function() {
            g.visibility = false;
            g.rail.visibility = false;
            g.rail.css("display", "none");
            return g
        };
        this.hideRailHr = function() {
            if (!g.railh) {
                return g
            }
            g.railh.visibility = false;
            g.railh.css("display", "none");
            return g
        };
        this.show = function() {
            g.hidden = false;
            g.locked = false;
            return g.showRail().showRailHr()
        };
        this.hide = function() {
            g.hidden = true;
            g.locked = true;
            return g.hideRail().hideRailHr()
        };
        this.toggle = function() {
            return g.hidden ? g.show() : g.hide()
        };
        this.remove = function() {
            g.doZoomOut();
            g.unbindAll();
            g.observer !== false && g.observer.disconnect();
            g.events = [];
            if (g.cursor) {
                g.cursor.remove(),
                g.cursor = null
            }
            if (g.cursorh) {
                g.cursorh.remove(),
                g.cursorh = null
            }
            if (g.rail) {
                g.rail.remove(),
                g.rail = null
            }
            if (g.railh) {
                g.railh.remove(),
                g.railh = null
            }
            if (g.zoom) {
                g.zoom.remove(),
                g.zoom = null
            }
            for (var m = 0; m < g.saved.css.length; m++) {
                var l = g.saved.css[m];
                l[0].css(l[1], typeof l[2] == "undefined" ? "": l[2])
            }
            g.saved = false;
            g.me.data("__nicescroll", "");
            g.me = null;
            g.doc = null;
            g.docscroll = null;
            g.win = null;
            return g
        };
        this.scrollstart = function(l) {
            this.onscrollstart = l;
            return g
        };
        this.scrollend = function(l) {
            this.onscrollend = l;
            return g
        };
        this.scrollcancel = function(l) {
            this.onscrollcancel = l;
            return g
        };
        this.zoomin = function(l) {
            this.onzoomin = l;
            return g
        };
        this.zoomout = function(l) {
            this.onzoomout = l;
            return g
        };
        this.isScrollable = function(m) {
            for (m = m.target ? m.target: m; m && m.nodeType == 1 && !/BODY|HTML/.test(m.nodeName);) {
                var l = v(m);
                if (/scroll|auto/.test(l.css("overflowY") || l.css("overflowX") || l.css("overflow") || "")) {
                    return m.clientHeight != m.scrollHeight
                }
                m = m.parentNode ? m.parentNode: false
            }
            return false
        };
        this.getViewport = function(m) {
            for (m = m && m.parentNode ? m.parentNode: false; m && m.nodeType == 1 && !/BODY|HTML/.test(m.nodeName);) {
                var l = v(m);
                if (/scroll|auto/.test(l.css("overflowY") || l.css("overflowX") || l.css("overflow") || "") && m.clientHeight != m.scrollHeight) {
                    return l
                }
                if (l.getNiceScroll().length > 0) {
                    return l
                }
                m = m.parentNode ? m.parentNode: false
            }
            return false
        };
        this.onmousewheel = function(l) {
            if (g.locked) {
                return true
            }
            if (!g.rail.scrollable) {
                return g.railh && g.railh.scrollable ? g.onmousewheelhr(l) : true
            }
            if (g.opt.preservenativescrolling && g.checkarea) {
                g.checkarea = false,
                g.nativescrollingarea = g.isScrollable(l)
            }
            if (g.nativescrollingarea) {
                return true
            }
            if (g.locked) {
                return g.cancelEvent(l)
            }
            if (g.rail.drag) {
                return g.cancelEvent(l)
            }
            k(l, false);
            return g.cancelEvent(l)
        };
        this.onmousewheelhr = function(l) {
            if (g.locked || !g.railh.scrollable) {
                return true
            }
            if (g.opt.preservenativescrolling && g.checkarea) {
                g.checkarea = false,
                g.nativescrollingarea = g.isScrollable(l)
            }
            if (g.nativescrollingarea) {
                return true
            }
            if (g.locked) {
                return g.cancelEvent(l)
            }
            if (g.rail.drag) {
                return g.cancelEvent(l)
            }
            k(l, true);
            return g.cancelEvent(l)
        };
        this.stop = function() {
            g.cancelScroll();
            g.scrollmon && g.scrollmon.stop();
            g.cursorfreezed = false;
            g.scroll.y = Math.round(g.getScrollTop() * (1 / g.scrollratio.y));
            g.noticeCursor();
            return g
        };
        this.getTransitionSpeed = function(m) {
            var l = Math.round(g.opt.scrollspeed * 10),
            m = Math.min(l, Math.round(m / 20 * g.opt.scrollspeed));
            return m > 20 ? m: 0
        };
        g.opt.smoothscroll ? g.ishwscroll && i.hastransition && g.opt.usetransition ? (this.prepareTransition = function(n, o) {
            var l = o ? n > 20 ? n: 0 : g.getTransitionSpeed(n),
            m = l ? i.prefixstyle + "transform " + l + "ms ease-out": "";
            if (!g.lasttransitionstyle || g.lasttransitionstyle != m) {
                g.lasttransitionstyle = m,
                g.doc.css(i.transitionstyle, m)
            }
            return l
        },
        this.doScrollLeft = function(n, m) {
            var l = g.scrollrunning ? g.newscrolly: g.getScrollTop();
            g.doScrollPos(n, l, m)
        },
        this.doScrollTop = function(n, m) {
            var l = g.scrollrunning ? g.newscrollx: g.getScrollLeft();
            g.doScrollPos(l, n, m)
        },
        this.doScrollPos = function(m, o, s) {
            var l = g.getScrollTop(),
            n = g.getScrollLeft(); ((g.newscrolly - l) * (o - l) < 0 || (g.newscrollx - n) * (m - n) < 0) && g.cancelScroll();
            if (g.opt.bouncescroll == false) {
                if (o < 0) {
                    o = 0
                } else {
                    if (o > g.page.maxh) {
                        o = g.page.maxh
                    }
                }
                if (m < 0) {
                    m = 0
                } else {
                    if (m > g.page.maxw) {
                        m = g.page.maxw
                    }
                }
            }
            if (m == g.newscrollx && o == g.newscrolly) {
                return false
            }
            g.newscrolly = o;
            g.newscrollx = m;
            g.newscrollspeed = s || false;
            if (g.timer) {
                return false
            }
            g.timer = setTimeout(function() {
                var y = g.getScrollTop(),
                I = g.getScrollLeft(),
                J,
                K;
                J = m - I;
                K = o - y;
                J = Math.round(Math.sqrt(Math.pow(J, 2) + Math.pow(K, 2)));
                J = g.prepareTransition(g.newscrollspeed ? g.newscrollspeed: J);
                g.timerscroll && g.timerscroll.tm && clearInterval(g.timerscroll.tm);
                if (J > 0) { ! g.scrollrunning && g.onscrollstart && g.onscrollstart.call(g, {
                        type: "scrollstart",
                        current: {
                            x: I,
                            y: y
                        },
                        request: {
                            x: m,
                            y: o
                        },
                        end: {
                            x: g.newscrollx,
                            y: g.newscrolly
                        },
                        speed: J
                    });
                    if (i.transitionend) {
                        if (!g.scrollendtrapped) {
                            g.scrollendtrapped = true,
                            g.bind(g.doc, i.transitionend, g.onScrollEnd, false)
                        }
                    } else {
                        g.scrollendtrapped && clearTimeout(g.scrollendtrapped),
                        g.scrollendtrapped = setTimeout(g.onScrollEnd, J)
                    }
                    g.timerscroll = {
                        bz: new BezierClass(y, g.newscrolly, J, 0, 0, 0.58, 1),
                        bh: new BezierClass(I, g.newscrollx, J, 0, 0, 0.58, 1)
                    };
                    if (!g.cursorfreezed) {
                        g.timerscroll.tm = setInterval(function() {
                            g.showCursor(g.getScrollTop(), g.getScrollLeft())
                        },
                        60)
                    }
                }
                g.synched("doScroll-set",
                function() {
                    g.timer = 0;
                    if (g.scrollendtrapped) {
                        g.scrollrunning = true
                    }
                    g.setScrollTop(g.newscrolly);
                    g.setScrollLeft(g.newscrollx);
                    if (!g.scrollendtrapped) {
                        g.onScrollEnd()
                    }
                })
            },
            50)
        },
        this.cancelScroll = function() {
            if (!g.scrollendtrapped) {
                return true
            }
            var l = g.getScrollTop(),
            m = g.getScrollLeft();
            g.scrollrunning = false;
            i.transitionend || clearTimeout(i.transitionend);
            g.scrollendtrapped = false;
            g._unbind(g.doc, i.transitionend, g.onScrollEnd);
            g.prepareTransition(0);
            g.setScrollTop(l);
            g.railh && g.setScrollLeft(m);
            g.timerscroll && g.timerscroll.tm && clearInterval(g.timerscroll.tm);
            g.timerscroll = false;
            g.cursorfreezed = false;
            g.showCursor(l, m);
            return g
        },
        this.onScrollEnd = function() {
            g.scrollendtrapped && g._unbind(g.doc, i.transitionend, g.onScrollEnd);
            g.scrollendtrapped = false;
            g.prepareTransition(0);
            g.timerscroll && g.timerscroll.tm && clearInterval(g.timerscroll.tm);
            g.timerscroll = false;
            var l = g.getScrollTop(),
            m = g.getScrollLeft();
            g.setScrollTop(l);
            g.railh && g.setScrollLeft(m);
            g.noticeCursor(false, l, m);
            g.cursorfreezed = false;
            if (l < 0) {
                l = 0
            } else {
                if (l > g.page.maxh) {
                    l = g.page.maxh
                }
            }
            if (m < 0) {
                m = 0
            } else {
                if (m > g.page.maxw) {
                    m = g.page.maxw
                }
            }
            if (l != g.newscrolly || m != g.newscrollx) {
                return g.doScrollPos(m, l, g.opt.snapbackspeed)
            }
            g.onscrollend && g.scrollrunning && g.onscrollend.call(g, {
                type: "scrollend",
                current: {
                    x: m,
                    y: l
                },
                end: {
                    x: g.newscrollx,
                    y: g.newscrolly
                }
            });
            g.scrollrunning = false
        }) : (this.doScrollLeft = function(l) {
            var m = g.scrollrunning ? g.newscrolly: g.getScrollTop();
            g.doScrollPos(l, m)
        },
        this.doScrollTop = function(l) {
            var m = g.scrollrunning ? g.newscrollx: g.getScrollLeft();
            g.doScrollPos(m, l)
        },
        this.doScrollPos = function(y, I) {
            function J() {
                if (g.cancelAnimationFrame) {
                    return true
                }
                g.scrollrunning = true;
                if (s = 1 - s) {
                    return g.timer = w(J) || 1
                }
                var F = 0,
                G = sy = g.getScrollTop();
                if (g.dst.ay) {
                    var G = g.bzscroll ? g.dst.py + g.bzscroll.getNow() * g.dst.ay: g.newscrolly,
                    H = G - sy;
                    if (H < 0 && G < g.newscrolly || H > 0 && G > g.newscrolly) {
                        G = g.newscrolly
                    }
                    g.setScrollTop(G);
                    G == g.newscrolly && (F = 1)
                } else {
                    F = 1
                }
                var M = sx = g.getScrollLeft();
                if (g.dst.ax) {
                    M = g.bzscroll ? g.dst.px + g.bzscroll.getNow() * g.dst.ax: g.newscrollx;
                    H = M - sx;
                    if (H < 0 && M < g.newscrollx || H > 0 && M > g.newscrollx) {
                        M = g.newscrollx
                    }
                    g.setScrollLeft(M);
                    M == g.newscrollx && (F += 1)
                } else {
                    F += 1
                }
                if (F == 2) {
                    g.timer = 0;
                    g.cursorfreezed = false;
                    g.bzscroll = false;
                    g.scrollrunning = false;
                    if (G < 0) {
                        G = 0
                    } else {
                        if (G > g.page.maxh) {
                            G = g.page.maxh
                        }
                    }
                    if (M < 0) {
                        M = 0
                    } else {
                        if (M > g.page.maxw) {
                            M = g.page.maxw
                        }
                    }
                    M != g.newscrollx || G != g.newscrolly ? g.doScrollPos(M, G) : g.onscrollend && g.onscrollend.call(g, {
                        type: "scrollend",
                        current: {
                            x: sx,
                            y: sy
                        },
                        end: {
                            x: g.newscrollx,
                            y: g.newscrolly
                        }
                    })
                } else {
                    g.timer = w(J) || 1
                }
            }
            I = typeof I == "undefined" || I === false ? g.getScrollTop(true) : I;
            if (g.timer && g.newscrolly == I && g.newscrollx == y) {
                return true
            }
            g.timer && z(g.timer);
            g.timer = 0;
            var K = g.getScrollTop(),
            l = g.getScrollLeft(); ((g.newscrolly - K) * (I - K) < 0 || (g.newscrollx - l) * (y - l) < 0) && g.cancelScroll();
            g.newscrolly = I;
            g.newscrollx = y;
            if (!g.bouncescroll || !g.rail.visibility) {
                if (g.newscrolly < 0) {
                    g.newscrolly = 0
                } else {
                    if (g.newscrolly > g.page.maxh) {
                        g.newscrolly = g.page.maxh
                    }
                }
            }
            if (!g.bouncescroll || !g.railh.visibility) {
                if (g.newscrollx < 0) {
                    g.newscrollx = 0
                } else {
                    if (g.newscrollx > g.page.maxw) {
                        g.newscrollx = g.page.maxw
                    }
                }
            }
            g.dst = {};
            g.dst.x = y - l;
            g.dst.y = I - K;
            g.dst.px = l;
            g.dst.py = K;
            var m = Math.round(Math.sqrt(Math.pow(g.dst.x, 2) + Math.pow(g.dst.y, 2)));
            g.dst.ax = g.dst.x / m;
            g.dst.ay = g.dst.y / m;
            var n = 0,
            o = m;
            if (g.dst.x == 0) {
                n = K,
                o = I,
                g.dst.ay = 1,
                g.dst.py = 0
            } else {
                if (g.dst.y == 0) {
                    n = l,
                    o = y,
                    g.dst.ax = 1,
                    g.dst.px = 0
                }
            }
            m = g.getTransitionSpeed(m);
            g.bzscroll = m > 0 ? g.bzscroll ? g.bzscroll.update(o, m) : new BezierClass(n, o, m, 0, 1, 0, 1) : false;
            if (!g.timer) { (K == g.page.maxh && I >= g.page.maxh || l == g.page.maxw && y >= g.page.maxw) && g.checkContentSize();
                var s = 1;
                g.cancelAnimationFrame = false;
                g.timer = 1;
                g.onscrollstart && !g.scrollrunning && g.onscrollstart.call(g, {
                    type: "scrollstart",
                    current: {
                        x: l,
                        y: K
                    },
                    request: {
                        x: y,
                        y: I
                    },
                    end: {
                        x: g.newscrollx,
                        y: g.newscrolly
                    },
                    speed: m
                });
                J(); (K == g.page.maxh && I >= K || l == g.page.maxw && y >= l) && g.checkContentSize();
                g.noticeCursor()
            }
        },
        this.cancelScroll = function() {
            g.timer && z(g.timer);
            g.timer = 0;
            g.bzscroll = false;
            g.scrollrunning = false;
            return g
        }) : (this.doScrollLeft = function(n, l) {
            var m = g.getScrollTop();
            g.doScrollPos(n, m, l)
        },
        this.doScrollTop = function(n, l) {
            var m = g.getScrollLeft();
            g.doScrollPos(m, n, l)
        },
        this.doScrollPos = function(n, o) {
            var l = n > g.page.maxw ? g.page.maxw: n;
            l < 0 && (l = 0);
            var m = o > g.page.maxh ? g.page.maxh: o;
            m < 0 && (m = 0);
            g.synched("scroll",
            function() {
                g.setScrollTop(m);
                g.setScrollLeft(l)
            })
        },
        this.cancelScroll = function() {});
        this.doScrollBy = function(n, o) {
            var l = 0,
            l = o ? Math.floor((g.scroll.y - n) * g.scrollratio.y) : (g.timer ? g.newscrolly: g.getScrollTop(true)) - n;
            if (g.bouncescroll) {
                var m = Math.round(g.view.h / 2);
                l < -m ? l = -m: l > g.page.maxh + m && (l = g.page.maxh + m)
            }
            g.cursorfreezed = false;
            py = g.getScrollTop(true);
            if (l < 0 && py <= 0) {
                return g.noticeCursor()
            } else {
                if (l > g.page.maxh && py >= g.page.maxh) {
                    return g.checkContentSize(),
                    g.noticeCursor()
                }
            }
            g.doScrollTop(l)
        };
        this.doScrollLeftBy = function(n, o) {
            var l = 0,
            l = o ? Math.floor((g.scroll.x - n) * g.scrollratio.x) : (g.timer ? g.newscrollx: g.getScrollLeft(true)) - n;
            if (g.bouncescroll) {
                var m = Math.round(g.view.w / 2);
                l < -m ? l = -m: l > g.page.maxw + m && (l = g.page.maxw + m)
            }
            g.cursorfreezed = false;
            px = g.getScrollLeft(true);
            if (l < 0 && px <= 0) {
                return g.noticeCursor()
            } else {
                if (l > g.page.maxw && px >= g.page.maxw) {
                    return g.noticeCursor()
                }
            }
            g.doScrollLeft(l)
        };
        this.doScrollTo = function(l, m) {
            m && Math.round(l * g.scrollratio.y);
            g.cursorfreezed = false;
            g.doScrollTop(l)
        };
        this.checkContentSize = function() {
            var l = g.getContentSize(); (l.h != g.page.h || l.w != g.page.w) && g.resize(false, l)
        };
        g.onscroll = function() {
            g.rail.drag || g.cursorfreezed || g.synched("scroll",
            function() {
                g.scroll.y = Math.round(g.getScrollTop() * (1 / g.scrollratio.y));
                if (g.railh) {
                    g.scroll.x = Math.round(g.getScrollLeft() * (1 / g.scrollratio.x))
                }
                g.noticeCursor()
            })
        };
        g.bind(g.docscroll, "scroll", g.onscroll);
        this.doZoomIn = function(m) {
            if (!g.zoomactive) {
                g.zoomactive = true;
                g.zoomrestore = {
                    style: {}
                };
                var s = "position,top,left,zIndex,backgroundColor,marginTop,marginBottom,marginLeft,marginRight".split(","),
                o = g.win[0].style,
                l;
                for (l in s) {
                    var n = s[l];
                    g.zoomrestore.style[n] = typeof o[n] != "undefined" ? o[n] : ""
                }
                g.zoomrestore.style.width = g.win.css("width");
                g.zoomrestore.style.height = g.win.css("height");
                g.zoomrestore.padding = {
                    w: g.win.outerWidth() - g.win.width(),
                    h: g.win.outerHeight() - g.win.height()
                };
                if (i.isios4) {
                    g.zoomrestore.scrollTop = v(window).scrollTop(),
                    v(window).scrollTop(0)
                }
                g.win.css({
                    position: i.isios4 ? "absolute": "fixed",
                    top: 0,
                    left: 0,
                    "z-index": g.opt.zindex + 100,
                    margin: "0px"
                });
                s = g.win.css("backgroundColor"); (s == "" || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(s)) && g.win.css("backgroundColor", "#fff");
                g.rail.css({
                    "z-index": g.opt.zindex + 110
                });
                g.zoom.css({
                    "z-index": g.opt.zindex + 112
                });
                g.zoom.css("backgroundPosition", "0px -18px");
                g.resizeZoom();
                g.onzoomin && g.onzoomin.call(g);
                return g.cancelEvent(m)
            }
        };
        this.doZoomOut = function(l) {
            if (g.zoomactive) {
                return g.zoomactive = false,
                g.win.css("margin", ""),
                g.win.css(g.zoomrestore.style),
                i.isios4 && v(window).scrollTop(g.zoomrestore.scrollTop),
                g.rail.css({
                    "z-index": g.ispage ? g.opt.zindex: g.opt.zindex + 2
                }),
                g.zoom.css({
                    "z-index": g.opt.zindex
                }),
                g.zoomrestore = false,
                g.zoom.css("backgroundPosition", "0px 0px"),
                g.onResize(),
                g.onzoomout && g.onzoomout.call(g),
                g.cancelEvent(l)
            }
        };
        this.doZoom = function(l) {
            return g.zoomactive ? g.doZoomOut(l) : g.doZoomIn(l)
        };
        this.resizeZoom = function() {
            if (g.zoomactive) {
                var l = g.getScrollTop();
                g.win.css({
                    width: v(window).width() - g.zoomrestore.padding.w + "px",
                    height: v(window).height() - g.zoomrestore.padding.h + "px"
                });
                g.onResize();
                g.setScrollTop(Math.min(g.page.maxh, l))
            }
        };
        this.init();
        v.nicescroll.push(this)
    },
    u = function(c) {
        var b = this;
        this.nc = c;
        this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;
        this.snapy = this.snapx = false;
        this.demuly = this.demulx = 0;
        this.lastscrolly = this.lastscrollx = -1;
        this.timer = this.chky = this.chkx = 0;
        this.time = function() {
            return + new Date
        };
        this.reset = function(d, f) {
            b.stop();
            var g = b.time();
            b.steptime = 0;
            b.lasttime = g;
            b.speedx = 0;
            b.speedy = 0;
            b.lastx = d;
            b.lasty = f;
            b.lastscrollx = -1;
            b.lastscrolly = -1
        };
        this.update = function(d, g) {
            var i = b.time();
            b.steptime = i - b.lasttime;
            b.lasttime = i;
            var i = g - b.lasty,
            h = d - b.lastx,
            f = b.nc.getScrollTop(),
            j = b.nc.getScrollLeft();
            f += i;
            j += h;
            b.snapx = j < 0 || j > b.nc.page.maxw;
            b.snapy = f < 0 || f > b.nc.page.maxh;
            b.speedx = h;
            b.speedy = i;
            b.lastx = d;
            b.lasty = g
        };
        this.stop = function() {
            b.nc.unsynched("domomentum2d");
            b.timer && clearTimeout(b.timer);
            b.timer = 0;
            b.lastscrollx = -1;
            b.lastscrolly = -1
        };
        this.doSnapy = function(d, f) {
            var g = false;
            if (f < 0) {
                f = 0,
                g = true
            } else {
                if (f > b.nc.page.maxh) {
                    f = b.nc.page.maxh,
                    g = true
                }
            }
            if (d < 0) {
                d = 0,
                g = true
            } else {
                if (d > b.nc.page.maxw) {
                    d = b.nc.page.maxw,
                    g = true
                }
            }
            g && b.nc.doScrollPos(d, f, b.nc.opt.snapbackspeed)
        };
        this.doMomentum = function(h) {
            var k = b.time(),
            f = h ? k + h: b.lasttime,
            h = b.nc.getScrollLeft(),
            l = b.nc.getScrollTop(),
            j = b.nc.page.maxh,
            n = b.nc.page.maxw;
            b.speedx = n > 0 ? Math.min(60, b.speedx) : 0;
            b.speedy = j > 0 ? Math.min(60, b.speedy) : 0;
            f = f && k - f <= 50;
            if (l < 0 || l > j || h < 0 || h > n) {
                f = false
            }
            h = b.speedx && f ? b.speedx: false;
            if (b.speedy && f && b.speedy || h) {
                var d = Math.max(16, b.steptime);
                d > 50 && (h = d / 50, b.speedx *= h, b.speedy *= h, d = 50);
                b.demulxy = 0;
                b.lastscrollx = b.nc.getScrollLeft();
                b.chkx = b.lastscrollx;
                b.lastscrolly = b.nc.getScrollTop();
                b.chky = b.lastscrolly;
                var g = b.lastscrollx,
                m = b.lastscrolly,
                i = function() {
                    var o = b.time() - k > 600 ? 0.04 : 0.02;
                    if (b.speedx && (g = Math.floor(b.lastscrollx - b.speedx * (1 - b.demulxy)), b.lastscrollx = g, g < 0 || g > n)) {
                        o = 0.1
                    }
                    if (b.speedy && (m = Math.floor(b.lastscrolly - b.speedy * (1 - b.demulxy)), b.lastscrolly = m, m < 0 || m > j)) {
                        o = 0.1
                    }
                    b.demulxy = Math.min(1, b.demulxy + o);
                    b.nc.synched("domomentum2d",
                    function() {
                        if (b.speedx) {
                            b.nc.getScrollLeft() != b.chkx && b.stop(),
                            b.chkx = g,
                            b.nc.setScrollLeft(g)
                        }
                        if (b.speedy) {
                            b.nc.getScrollTop() != b.chky && b.stop(),
                            b.chky = m,
                            b.nc.setScrollTop(m)
                        }
                        b.timer || (b.nc.hideCursor(), b.doSnapy(g, m))
                    });
                    b.demulxy < 1 ? b.timer = setTimeout(i, d) : (b.stop(), b.nc.hideCursor(), b.doSnapy(g, m))
                };
                i()
            } else {
                b.doSnapy(b.nc.getScrollLeft(), b.nc.getScrollTop())
            }
        }
    },
    e = v.fn.scrollTop;
    v.cssHooks.pageYOffset = {
        get: function(c) {
            var b = v.data(c, "__nicescroll") || false;
            return b && b.ishwscroll ? b.getScrollTop() : e.call(c)
        },
        set: function(d, b) {
            var c = v.data(d, "__nicescroll") || false;
            c && c.ishwscroll ? c.setScrollTop(parseInt(b)) : e.call(d, b);
            return this
        }
    };
    v.fn.scrollTop = function(c) {
        if (typeof c == "undefined") {
            var b = this[0] ? v.data(this[0], "__nicescroll") || false: false;
            return b && b.ishwscroll ? b.getScrollTop() : e.call(this)
        } else {
            return this.each(function() {
                var d = v.data(this, "__nicescroll") || false;
                d && d.ishwscroll ? d.setScrollTop(parseInt(c)) : e.call(v(this), c)
            })
        }
    };
    var p = v.fn.scrollLeft;
    v.cssHooks.pageXOffset = {
        get: function(c) {
            var b = v.data(c, "__nicescroll") || false;
            return b && b.ishwscroll ? b.getScrollLeft() : p.call(c)
        },
        set: function(d, b) {
            var c = v.data(d, "__nicescroll") || false;
            c && c.ishwscroll ? c.setScrollLeft(parseInt(b)) : p.call(d, b);
            return this
        }
    };
    v.fn.scrollLeft = function(c) {
        if (typeof c == "undefined") {
            var b = this[0] ? v.data(this[0], "__nicescroll") || false: false;
            return b && b.ishwscroll ? b.getScrollLeft() : p.call(this)
        } else {
            return this.each(function() {
                var d = v.data(this, "__nicescroll") || false;
                d && d.ishwscroll ? d.setScrollLeft(parseInt(c)) : p.call(v(this), c)
            })
        }
    };
    var q = function(d) {
        var b = this;
        this.length = 0;
        this.name = "nicescrollarray";
        this.each = function(f) {
            for (var g = 0; g < b.length; g++) {
                f.call(b[g])
            }
            return b
        };
        this.push = function(f) {
            b[b.length] = f;
            b.length++
        };
        this.eq = function(f) {
            return b[f]
        };
        if (d) {
            for (a = 0; a < d.length; a++) {
                var c = v.data(d[a], "__nicescroll") || false;
                c && (this[this.length] = c, this.length++)
            }
        }
        return this
    }; (function(c, b, d) {
        for (var f = 0; f < b.length; f++) {
            d(c, b[f])
        }
    })(q.prototype, "show,hide,toggle,onResize,resize,remove,stop,doScrollPos".split(","),
    function(c, b) {
        c[b] = function() {
            var d = arguments;
            return this.each(function() {
                this[b].apply(this, d)
            })
        }
    });
    v.fn.getNiceScroll = function(b) {
        return typeof b == "undefined" ? new q(this) : v.data(this[b], "__nicescroll") || false
    };
    v.extend(v.expr[":"], {
        nicescroll: function(b) {
            return v.data(b, "__nicescroll") ? true: false
        }
    });
    v.fn.niceScroll = function(f, b) {
        typeof b == "undefined" && typeof f == "object" && !("jquery" in f) && (b = f, f = false);
        var c = new q;
        typeof b == "undefined" && (b = {});
        if (f) {
            b.doc = v(f),
            b.win = v(this)
        }
        var d = !("doc" in b);
        if (!d && !("win" in b)) {
            b.win = v(this)
        }
        this.each(function() {
            var g = v(this).data("__nicescroll") || false;
            if (!g) {
                b.doc = d ? v(this) : b.doc,
                g = new E(b, v(this)),
                v(this).data("__nicescroll", g)
            }
            c.push(g)
        });
        return c.length == 1 ? c[0] : c
    };
    window.NiceScroll = {
        getjQuery: function() {
            return v
        }
    };
    if (!v.nicescroll) {
        v.nicescroll = new q
    }
})(jQuery);
var P = {}; (function(i, g) {
    var k = typeof Element !== "undefined" && "ALLOW_KEYBOARD_INPUT" in Element,
    j = (function() {
        var l, b;
        var f = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]];
        var c = 0;
        var e = f.length;
        var d = {};
        for (; c < e; c++) {
            l = f[c];
            if (l && l[1] in g) {
                for (c = 0, b = l.length; c < b; c++) {
                    d[f[0][c]] = l[c]
                }
                return d
            }
        }
        return false
    })(),
    h = {
        request: function(b) {
            var c = j.requestFullscreen;
            b = b || g.documentElement;
            if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
                b[c]()
            } else {
                b[c](k && Element.ALLOW_KEYBOARD_INPUT)
            }
        },
        exit: function() {
            g[j.exitFullscreen]()
        },
        toggle: function(b) {
            if (this.isFullscreen) {
                this.exit()
            } else {
                this.request(b)
            }
        },
        onchange: function() {},
        onerror: function() {},
        raw: j
    };
    if (!j) {
        i.screenfull = false;
        return
    }
    Object.defineProperties(h, {
        isFullscreen: {
            get: function() {
                return !! g[j.fullscreenElement]
            }
        },
        element: {
            enumerable: true,
            get: function() {
                return g[j.fullscreenElement]
            }
        },
        enabled: {
            enumerable: true,
            get: function() {
                return !! g[j.fullscreenEnabled]
            }
        }
    });
    g.addEventListener(j.fullscreenchange,
    function(b) {
        h.onchange.call(h, b)
    });
    g.addEventListener(j.fullscreenerror,
    function(b) {
        h.onerror.call(h, b)
    });
    i.screenfull = h
})(window, document);
P.skn = function() {
    var e = $.cookie("data-theme");
    if (e) {
        var f = $("body"),
        g = $(window.frames.mainFrame.document).find("body");
        f.attr("class", e).attr("data-theme", e);
        g.attr("class", e).attr("data-theme", e)
    }
};
$(document).ready(function() {
    var j = $("#left"),
    h = j.data("no_overflow"),
    g = 0;
    if ($("#shortcutMenu").length > 0) {
        g = $("#shortcutMenu").height() + 20
    }
    j.height($("body").height() - $("#navigation").height() - g);
    window.onresize = function() {
        j.height($("body").height() - $("#navigation").height() - g)
    };
    if (!h) {
        j.niceScroll()
    }
    $("#left div.subnav").each(function() {
        $(this).find(".second-subnav:last").find("a").css("border-bottom", 0);
        $(this).find(".third-subnav:last").css("border-bottom", 0)
    });
    $("#left div.subnav-title").click(function() {
        var c = $(this);
        c.next("ul.subnav-menu").slideToggle(300);
        var b = $(this).find("i").not(".wmfontset");
        var d = c.parent().siblings();
        if (c.hasClass("first-subnav")) {
            $("#left div.first-subnav").removeClass("active");
            if (b.hasClass("icon-angle-up")) {
                $("#left div.first-subnav i").not(".wmfontset").attr("class", "icon-angle-down")
            } else {
                $("#left div.first-subnav i").not(".wmfontset").attr("class", "icon-angle-down");
                b.attr("class", "icon-angle-up");
                c.addClass("active")
            }
        } else {
            if (c.hasClass("second-subnav")) {
                $("#left div.second-subnav").removeClass("active");
                if (b.hasClass("icon-angle-up")) {
                    $("#left div.second-subnav i").not(".icon-space,.wmfontset").attr("class", "icon-angle-down");
                    if (c.next(".subnav-menu").length < 1) {
                        c.addClass("isurl active");
                        c.css("border-bottom", 0)
                    } else {
                        $("#left div.subnav").each(function() {
                            $(this).find(".second-subnav:last").find("a").css("border-bottom", 0)
                        })
                    }
                } else {
                    $("#left div.second-subnav i").not(".icon-space,.wmfontset").attr("class", "icon-angle-down");
                    c.addClass("active");
                    if (c.next(".subnav-menu").length > 0) {
                        b.attr("class", "icon-angle-up");
                        c.find("a").css("border-bottom", "1px solid #d1d1d1")
                    } else {
                        c.addClass("isurl");
                        $(".third-subnav").hide();
                        $(".third-subnav li").removeClass("active");
                        c.css("border-bottom", 0)
                    }
                }
            }
        }
        d.children("ul.subnav-menu").slideUp("slow");
        d.find("a").removeClass("active");
        setTimeout(function() {
            $("#left").getNiceScroll().resize()
        },
        300)
    });
    $(".subnav-menu a").click(function() {
        if (!$(this).parent().hasClass("second-subnav")) {
            var b = $(this).parents(".subnav").siblings(".subnav");
            b.find(".subnav-menu").hide();
            b.find(".subnav-menu .second-subnav").removeClass("active");
            b.find(".subnav-menu .second-subnav i").not(".icon-space,wmfontset").attr("class", "icon-angle-down");
            $("#left").find("li").removeClass("active");
            $("ul.main-nav li").eq(0).addClass("active").siblings().removeClass("active");
            $(this).parent().addClass("active").siblings().removeClass("active")
        }
    });
    function i() {
        $("#left").toggle().toggleClass("forced-hide");
        $("#shortcutMenu").toggle().toggleClass("forced-hide");
        $("div.right").toggleClass("reight_p")
    }
    $(".toggle-nav").click(function(b) {
        b.preventDefault();
        i()
    });
    $(".theme-colors > li > span").hover(function(c) {
        var e = $(this),
        b = $("body"),
        d = $(window).find("body");
        b.attr("class", "").addClass("theme-" + e.attr("class"));
        d.attr("class", "").addClass("theme-" + e.attr("class"))
    },
    function() {
        var b = $(this),
        d = $("body"),
        c = $(window).find("body");
        d.attr("data-theme") !== undefined ? d.attr("class", "").addClass(d.attr("data-theme")) : d.attr("class", "");
        c.attr("data-theme") !== undefined ? c.attr("class", "").addClass(d.attr("data-theme")) : d.attr("class", "")
    });
    $("ul.main-nav li").each(function() {
        var b = $(this);
        var c = b.find("ul li");
        var d = function() {
            b.addClass("active").siblings().removeClass("active")
        };
        if (c.length == 0) {
            b.click(function() {
                d()
            })
        } else {
            c.click(function() {
                d()
            })
        }
    });
    var k = $("#feedback_btn");
    if (k.length > 0) {
        $(window).bind("scroll",
        function() {
            var b = $(document).scrollTop(),
            c = $(window).height();
            k.css("bottom", "50px")
        })
    }
    $(document).on("click", "[data-toggle=fullscreen]",
    function(b) {
        screenfull.toggle()
    })
});
var lfet_select_menu = function(m) {
    var o = $("#left a");
    var k = o.eq(m);
    var n = k.parents(".subnav-menu");
    var l = n.parent();
    var j = l.find("i");
    if (j.hasClass("icon-angle-right")) {
        j.attr("class", "icon-angle-down")
    } else {
        j.attr("class", "icon-angle-right")
    }
    var i = n.parent().siblings();
    i.find("i").attr("class", "icon-angle-right");
    i.find("a").removeClass("active");
    $("#left").find("li").removeClass("active");
    i.children("ul.subnav-menu").slideUp("slow");
    n.slideDown();
    $("ul.main-nav li").eq(0).addClass("active").siblings().removeClass("active");
    k.parent().addClass("active").siblings().removeClass("active")
};;

;