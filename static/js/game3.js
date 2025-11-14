function Vector2(t, n) {
    this.x = t || 0;
    this.y = n || 0;
  }
  Vector2.prototype = {
    reset: function (t, n) {
      this.x = t;
      this.y = n;
      return this;
    },
    toString: function (t) {
      t = t || 3;
      var n = Math.pow(10, t);
      return "[" + Math.round(this.x * n) / n + ", " + Math.round(this.y * n) / n + "]";
    },
    clone: function () {
      return new Vector2(this.x, this.y);
    },
    copyTo: function (t) {
      t.x = this.x;
      t.y = this.y;
    },
    copyFrom: function (t) {
      this.x = t.x;
      this.y = t.y;
    },
    magnitude: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    magnitudeSquared: function () {
      return this.x * this.x + this.y * this.y;
    },
    normalise: function () {
      var t = this.magnitude();
      this.x = this.x / t;
      this.y = this.y / t;
      return this;
    },
    reverse: function () {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    },
    plusEq: function (t) {
      this.x += t.x;
      this.y += t.y;
      return this;
    },
    plusNew: function (t) {
      return new Vector2(this.x + t.x, this.y + t.y);
    },
    minusEq: function (t) {
      this.x -= t.x;
      this.y -= t.y;
      return this;
    },
    minusNew: function (t) {
      return new Vector2(this.x - t.x, this.y - t.y);
    },
    multiplyEq: function (t) {
      this.x *= t;
      this.y *= t;
      return this;
    },
    multiplyNew: function (t) {
      return this.clone().multiplyEq(t);
    },
    divideEq: function (t) {
      this.x /= t;
      this.y /= t;
      return this;
    },
    divideNew: function (t) {
      return this.clone().divideEq(t);
    },
    dot: function (t) {
      return this.x * t.x + this.y * t.y;
    },
    angle: function (t) {
      return Math.atan2(this.y, this.x) * (t ? 1 : Vector2Const.TO_DEGREES);
    },
    rotate: function (t, n) {
      var i = Math.cos(t * (n ? 1 : Vector2Const.TO_RADIANS));
      var s = Math.sin(t * (n ? 1 : Vector2Const.TO_RADIANS));
      Vector2Const.temp.copyFrom(this);
      this.x = Vector2Const.temp.x * i - Vector2Const.temp.y * s;
      this.y = Vector2Const.temp.x * s + Vector2Const.temp.y * i;
      return this;
    },
    equals: function (t) {
      return this.x == t.x && this.y == t.x;
    },
    isCloseTo: function (t, n) {
      return !!this.equals(t) || (Vector2Const.temp.copyFrom(this), Vector2Const.temp.minusEq(t), Vector2Const.temp.magnitudeSquared() < n * n);
    },
    rotateAroundPoint: function (t, n, i) {
      Vector2Const.temp.copyFrom(this);
      Vector2Const.temp.minusEq(t);
      Vector2Const.temp.rotate(n, i);
      Vector2Const.temp.plusEq(t);
      this.copyFrom(Vector2Const.temp);
    },
    isMagLessThan: function (t) {
      return this.magnitudeSquared() < t * t;
    },
    isMagGreaterThan: function (t) {
      return this.magnitudeSquared() > t * t;
    }
  };
  Vector2Const = {
    TO_DEGREES: 180 / Math.PI,
    TO_RADIANS: Math.PI / 180,
    temp: new Vector2()
  }; //2024ssd
  var selectSkinModalAjax = 0;
  var selectSkinName = "";
  var port = 443;
  var CONNECTION_URL = "ffa4.agariodns.cyou:" + port;
  var playGameClickEvent = 0;
  var Uping;
  var Uuptime;
  var Uplayers;
  var Sfreeze = false;
  function appendHtmlChild() {
    if (localStorage.gameMode && localStorage.gameMode != undefined && localStorage.gameMode != null) {
      document.querySelector("#gamemode [value=\"" + localStorage.gameMode + "\"]").selected = true;
    }
    if (localStorage.playerNick && localStorage.playerNick != undefined && localStorage.playerNick != null) {
      document.getElementById("nick").value = localStorage.playerNick;
    } else {
      document.getElementById("nick").value = "agario";
    }
    if (localStorage.skin && localStorage.skin != undefined && localStorage.skin != null) {
      document.getElementById("defaultSkin").src = "https://agar.live/skins/" + localStorage.skin + ".png";
      selectSkinName = localStorage.skin;
    } else {
      document.getElementById("defaultSkin").src = "https://agar.live/skins/noskin.png";
    }
    ;
  }
  document.addEventListener("DOMContentLoaded", _0x42fa1b => {
    getScript("https://www.google.com/recaptcha/api.js?render=6LcnrKQUAAAAADohV5Cksikz89WSP-ZPHNA7ViZm");
    console.log("Game is ready");
    appendHtmlChild();
    setserver(CONNECTION_URL);
  });
  function getScript(_0x353d13, _0x2d7ad3) {
    const _0x1a021b = document.createElement("script");
    _0x1a021b.src = _0x353d13;
    _0x1a021b.onload = _0x2d7ad3;
    document.body.appendChild(_0x1a021b);
  }
  (function (_0x1154df, _0x5c642d) {
    _0x1154df.setserver = function () {
      var _0x7f4387 = document.getElementById("gamemode").value;
      if (_0x7f4387 != _0x33ee7e) {
        CONNECTION_URL = _0x7f4387;
        _0x33ee7e = _0x7f4387;
        _0xde92b2(CONNECTION_URL);
        localStorage.gameMode = _0x7f4387;
      }
    };
    _0x1154df.mobile_OpenSettings = function () {
      document.getElementById("mobile_settingsModal").style.display = "block";
    };
    _0x1154df.mobile_CloseSettings = function () {
      document.getElementById("mobile_settingsModal").style.display = "none";
    };
    _0x1154df.mobile_OpenSelectSkinPage = function () {
      if (selectSkinModalAjax == 0) {
        getScript("./skins.js?=v1", () => selectSkinModalAjax = 1);
      }
    };
    _0x1154df.selectSkinPage = function () {
      if (selectSkinModalAjax == 0) {
        if (selectSkinModalAjax == 0) {
          getScript("./skins.js?=v1", () => selectSkinModalAjax = 1);
        }
      }
    };
    _0x1154df.closeSkinPage = function () {
      selectskinmodalclose();
    };
    _0x1154df.setSkinListClick = function (_0x17415e) {
      document.getElementById("defaultSkin").src = "https://agar.live/skins/" + _0x17415e + ".png";
      closeSkinPage();
      localStorage.skin = _0x17415e;
      selectSkinName = _0x17415e;
      console.log(_0x17415e + " 'skin update'");
    };
    function _0x1d0b7d(_0x40b698, _0x58f698, _0x4fa260, _0x117797, _0x3df4b9, _0x2db189) {
      if (_0x40b698 <= _0x3df4b9 && _0x3df4b9 <= _0x4fa260 && _0x58f698 <= _0x2db189 && _0x2db189 <= _0x117797) {
        return true;
      }
      return false;
    }
    Element.prototype.hide = function () {
      this.style.visibility = "hidden";
      if (this.style.opacity == 1) {
        this.style.opacity = 0;
      }
    };
    Element.prototype.show = function (_0x3429ba) {
      this.style.visibility = "visible";
      var _0x86be29 = this;
      if (_0x3429ba) {
        this.style.transition = "opacity " + _0x3429ba + "s ease 0s";
        setTimeout(function () {
          _0x86be29.style.opacity = 1;
        }, 20);
      }
    };
    var _0x2dd0ca = "https://agar.live/skins/";
    var _0xfa086b;
    var _0x1ef7b9;
    var _0x1abc67 = ("createTouch" in document);
    var _0x2adf4e = [];
    var _0x2166a9 = -1;
    var _0x53271f = new Vector2(0, 0);
    var _0x148da7 = new Vector2(0, 0);
    var _0x26ba9e = new Vector2(0, 0);
    var _0x3e66be = 100;
    var _0x39a218 = 20;
    var _0x323587 = "!";
    var _0xd37afc = 0;
    var _0x989085 = 0;
    var _0x5e6b6a = 0;
    var _0x370936 = 0;
    var _0x3d769c = 0;
    var _0x218057 = false;
    var _0x257ead = 0;
    var _0xb388a5 = 0;
    var _0xdfc219 = _0x1154df.location.protocol;
    var _0x37fdcd = _0xdfc219 == "https:";
    var _0xe72a47;
    var _0x16b27b;
    var _0x4fc920;
    var _0x1afb5a;
    var _0x4e0f0e;
    var _0x35ab87;
    var _0x84b5f1;
    var _0x2cf3cf = null;
    var _0x41adc2 = null;
    var _0x4f5429 = 0;
    var _0x1f0529 = 0;
    var _0x1cc1c3 = [];
    var _0x1cf585 = [];
    var _0x44d2ff = {};
    var _0x3e0cc8 = [];
    var _0x551ae1 = [];
    var _0x225ef1 = [];
    var _0x573162 = "RESTART";
    var _0x91b001 = "?";
    var _0x45286b = 3600;
    var _0x48203d = [];
    var _0x7a7861 = 0;
    var _0x2aaf30 = 0;
    var _0x4232df = -1;
    var _0x4ddae1 = -1;
    var _0xe1267f = 0;
    var _0x443ee3 = Date.now();
    var _0x40174c = 0;
    var _0x2be5c9 = 0;
    var _0x5b1d69 = 0;
    var _0x22b0f0 = 0;
    var _0x12d6c2 = 0;
    var _0x55af78 = 10000;
    var _0x13322c = 10000;
    var _0x1402f0 = 1;
    var _0x805aaa = null;
    var _0x5d5ae3 = false;
    var _0x23ab14 = false;
    var _0x319c56 = false;
    var _0x171ae9 = false;
    var _0x4fea95 = 0;
    var _0x2bc39b = 0;
    var _0x456030 = false;
    var _0x16e8c8 = false;
    var _0x2eb996 = false;
    var _0x2582ca = 0.4;
    var _0x7ac7be = false;
    var _0x2653d4 = false;
    var _0x18263b = false;
    var _0x1b6830 = _0x4f5429 = ~~((_0x22b0f0 + _0x55af78) / 2);
    var _0x552165 = _0x1f0529 = ~~((_0x12d6c2 + _0x13322c) / 2);
    var _0x503f66 = 1;
    var _0x33ee7e = "";
    var _0xd46307 = null;
    var _0x1c7fca = true;
    var _0x1fbd55 = false;
    var _0x3a03fd = 0;
    var _0x35d3df = 0;
    var _0x46e881 = 0;
    var _0x52f418 = 0;
    var _0x5d5623 = 0;
    var _0x3bf563 = ["#333333", "#FF3333", "#33FF33", "#3333FF"];
    var _0x339536 = 0.4;
    var _0x3167b9 = "ontouchstart" in _0x1154df && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var _0x14a358 = false;
    var _0x3dce4b = document.createElement("canvas");
    _0x1154df.isSpectating = false;
    var _0x2c6c3e = Date.now();
    var _0x3893ec = 0;
    var _0x3b81f2 = 0;
    function _0x2c91e6() {
      const _0x172f79 = document.querySelector("#chat_textbox");
      _0x172f79.addEventListener("paste", _0x146ccc => _0x146ccc.preventDefault());
      var _0x4bd8d0 = ("ontouchstart" in document.documentElement);
      if (_0x4bd8d0 == true) {} else {}
      if (localStorage.noSkin == null) {
        localStorage.noSkin = false;
      }
      _0x5d5ae3 = localStorage.noSkin === "true";
      document.getElementById("noSkin").checked = _0x5d5ae3;
      if (localStorage.noNames == null) {
        localStorage.noNames = false;
      }
      _0x23ab14 = localStorage.noNames === "true";
      document.getElementById("noNames").checked = _0x23ab14;
      if (localStorage.noColor == null) {
        localStorage.noColor = false;
      }
      _0x319c56 = localStorage.noColor === "true";
      document.getElementById("noColor").checked = _0x319c56;
      if (localStorage.showDarkTheme == null) {
        localStorage.showDarkTheme = false;
      }
      _0x456030 = localStorage.showDarkTheme === "true";
      document.getElementById("darkTheme").checked = _0x456030;
      if (localStorage.hideChat == null) {
        localStorage.hideChat = false;
      }
      _0x2653d4 = localStorage.hideChat === "true";
      document.getElementById("hideChat").checked = _0x2653d4;
      if (_0x2653d4) {
        document.getElementById("chat_textbox").style.display = "none";
      } else {
        document.getElementById("chat_textbox").style.display = "block";
      }
      if (localStorage.smoothRender == null) {
        localStorage.smoothRender = 0.4;
      }
      _0x2582ca = localStorage.smoothRender;
      document.getElementById("smoothRender").checked = _0x2582ca == 2;
      if (localStorage.transparentRender == null) {
        localStorage.transparentRender = false;
      }
      _0x7ac7be = localStorage.transparentRender === "true";
      document.getElementById("transparentRender").checked = _0x7ac7be;
      if (localStorage.showScore == null) {
        localStorage.showScore = false;
      }
      _0x16e8c8 = localStorage.showScore === "true";
      document.getElementById("showScore").checked = _0x16e8c8;
      if (localStorage.zoom == null) {
        localStorage.zoom = false;
      }
      _0x18263b = localStorage.zoom === "true";
      document.getElementById("getZoom").checked = _0x18263b;
      document.getElementById("canvas").focus();
      var _0x404848 = false;
      var _0x470893;
      _0x4fc920 = _0xe72a47 = document.getElementById("canvas");
      _0x16b27b = _0x4fc920.getContext("2d");
      _0x4fc920.onmousemove = function (_0x302370) {
        _0x7a7861 = _0x302370.clientX;
        _0x2aaf30 = _0x302370.clientY;
        _0x439b61();
      };
      _0x4fc920.onmousedown = function (_0x3a6755) {
        var _0x4b074d = _0x3a6755.clientX;
        var _0x2edce9 = _0x3a6755.clientY;
        var _0x4deced = new Date().getTime() - _0xd37afc;
        if (_0x4deced > 5000 && _0x4b074d >= _0x3893ec && _0x4b074d <= _0x3893ec + _0x3e66be && _0x2edce9 >= _0x3b81f2 - 15 - _0x39a218 && _0x2edce9 <= _0x3b81f2 - 15) {
          _0x512281(_0x323587);
          _0xd37afc = new Date().getTime();
        }
      };
      if (_0x1abc67) {
        _0x4fc920.addEventListener("touchstart", _0x549cd7, false);
        _0x4fc920.addEventListener("touchmove", _0x59057e, false);
        _0x4fc920.addEventListener("touchend", _0x316e0b, false);
      }
      _0x4fc920.onmouseup = function () {};
      if (/firefox/i.test(navigator.userAgent)) {
        document.addEventListener("DOMMouseScroll", _0x38a98f, false);
      } else {
        document.body.onmousewheel = _0x38a98f;
      }
      _0x4fc920.onfocus = function () {
        _0x404848 = false;
      };
      document.getElementById("chat_textbox").onblur = function () {
        _0x404848 = false;
      };
      document.getElementById("chat_textbox").onfocus = function () {
        _0x404848 = true;
      };
      var _0x57307f = false;
      var _0x3cb1b5 = false;
      var _0x501f6d = false;
      var _0x12195f = false;
      var _0x5e6dcb = 0;
      _0x1154df.onkeydown = function (_0x1f4f29) {
        var _0x52100a = document.getElementById("main-login-section").style.visibility;
        switch (_0x1f4f29.keyCode) {
          case 32:
            if (!_0x57307f && !_0x404848 && _0x52100a == "hidden") {
              _0x5474e3();
              _0x1519d9(17);
              _0x57307f = true;
            }
            break;
          case 81:
            if (!_0x3cb1b5 && _0x52100a == "hidden") {
              _0x1519d9(18);
              _0x3cb1b5 = true;
            }
            break;
          case 87:
            if (!_0x501f6d && !_0x404848 && _0x52100a == "hidden") {
              _0x5474e3();
              _0x1519d9(21);
              _0x501f6d = true;
            }
            break;
          case 70:
            if (!_0x404848) {
              if (Sfreeze == false) {
                Sfreeze = true;
                _0x105918("Game stopped.");
              } else {
                Sfreeze = false;
                _0x105918("Game resumed.");
              }
            }
            break;
          case 67:
            if (!_0x404848) {
              _0x512281("psx2psx2");
            }
            break;
          case 27:
            _0x4620f0("fast");
            _0x1154df.isSpectating = false;
            break;
          case 13:
            if (_0x404848) {
              _0x404848 = false;
              document.getElementById("chat_textbox").blur();
              _0x470893 = _0x55c47e(document.getElementById("chat_textbox").value);
              if (_0x470893.length > 0) {
                _0x512281(_0x470893);
              }
              document.getElementById("chat_textbox").value = "";
            } else if (!_0x1c7fca) {
              document.getElementById("chat_textbox").focus();
              _0x404848 = true;
            }
            break;
        }
      };
      _0x1154df.onkeyup = function (_0x4c2933) {
        switch (_0x4c2933.keyCode) {
          case 32:
            _0x57307f = false;
            break;
          case 87:
            _0x501f6d = false;
            break;
          case 81:
            if (_0x3cb1b5) {
              _0x1519d9(19);
              _0x3cb1b5 = false;
            }
            break;
        }
      };
      _0x1154df.onblur = function () {
        _0x501f6d = _0x3cb1b5 = _0x57307f = false;
      };
      _0x1154df.onresize = _0x3cca80;
      _0x3cca80();
      if (_0x1154df.requestAnimationFrame) {
        _0x1154df.requestAnimationFrame(_0x4a98c2);
      } else {
        setInterval(_0x5cf431, 1000 / 60);
      }
      document.getElementById("main-login-section").style.visibility = "visible";
      document.getElementById("infoOverlays").style.visibility = "hidden";
    }
    (function () {
      var _0x78996c = 10;
      var _0x4b24ac = 50;
      function _0x2ccdd2(_0x5308eb) {
        if (_0x5308eb.keyCode === 69) {
          for (var _0x1e526c = 0; _0x1e526c < _0x78996c; ++_0x1e526c) {
            setTimeout(function () {
              window.onkeydown({
                keyCode: 87
              });
              window.onkeyup({
                keyCode: 87
              });
            }, _0x1e526c * _0x4b24ac);
          }
        }
      }
      window.addEventListener("keydown", _0x2ccdd2);
    })();
    function _0x105918(_0x21f089) {
      let _0x1d6ffc = "";
      if (_0x1d6ffc == "") {
        _0x1d6ffc = _0x21f089;
      }
      let _0x49804d = document.getElementById("nn");
      _0x49804d.style.position = "absolute";
      _0x49804d.style.display = "block";
      _0x49804d.style.top = "200px";
      _0x49804d.style.fontSize = "20px";
      _0x49804d.style.color = "red";
      _0x49804d.style.zIndex = "2000";
      _0x49804d.style.textAlign = "center";
      _0x49804d.style.width = "100%";
      _0x49804d.innerHTML = _0x1d6ffc;
      _0x49804d.style.opacity = 1;
      _0x49804d.style.fontSize = "7em";
      setTimeout(function () {
        _0x49804d.style.display = "none";
      }, 500);
    }
    function _0x55c47e(_0x1f8159) {
      var _0x559fad = _0x1f8159;
      _0x559fad = _0x559fad.replace("piÃ§", "***");
      _0x559fad = _0x559fad.replace("pussy", String.fromCodePoint(128513));
      _0x559fad = _0x559fad.replace(":)", String.fromCodePoint(128513));
      _0x559fad = _0x559fad.replace(":d", String.fromCodePoint(128513));
      _0x559fad = _0x559fad.replace(":D", String.fromCodePoint(128513));
      _0x559fad = _0x559fad.replace(":(", String.fromCodePoint(128577));
      _0x559fad = _0x559fad.replace(":p", String.fromCodePoint(128541));
      _0x559fad = _0x559fad.replace(":o", String.fromCodePoint(128562));
      _0x559fad = _0x559fad.replace(";)", String.fromCodePoint(128521));
      _0x559fad = _0x559fad.replace(":>", String.fromCodePoint(128535));
      _0x559fad = _0x559fad.replace(":$", String.fromCodePoint(129324));
      _0x559fad = _0x559fad.replace("love", String.fromCodePoint(128149));
      _0x559fad = _0x559fad.replace("okay", String.fromCodePoint(128077));
      _0x559fad = _0x559fad.replace("kiss", String.fromCodePoint(128139));
      _0x559fad = _0x559fad.replace("porn", String.fromCodePoint(128139));
      _0x559fad = _0x559fad.replace("sex", String.fromCodePoint(128139));
      _0x559fad = _0x559fad.replace("PORN", String.fromCodePoint(128139));
      _0x559fad = _0x559fad.replace("SEX", String.fromCodePoint(128139));
      _0x559fad = _0x559fad.replace("S1KEN", String.fromCodePoint(128139));
      _0x559fad = _0x559fad.replace("YARRAK", String.fromCodePoint(128139));
      _0x559fad = _0x559fad.replace("yarak", "***");
      _0x559fad = _0x559fad.replace("party", "***");
      _0x559fad = _0x559fad.replace("prty", "***");
      _0x559fad = _0x559fad.replace("PARTY", "***");
      _0x559fad = _0x559fad.replace("Party", "***");
      _0x559fad = _0x559fad.replace("SÄ°KER", "GULER");
      _0x559fad = _0x559fad.replace("islam", "***");
      _0x559fad = _0x559fad.replace("ISLAM", "***");
      _0x559fad = _0x559fad.replace("MUSLIM", "***");
      _0x559fad = _0x559fad.replace("muslim", "***");
      _0x559fad = _0x559fad.replace("siker", "guler");
      _0x559fad = _0x559fad.replace("ê§…", "***");
      _0x559fad = _0x559fad.replace("turkey", "GULER");
      _0x559fad = _0x559fad.replace("admin", "***");
      _0x559fad = _0x559fad.replace("ADMÄ°N", "***");
      _0x559fad = _0x559fad.replace("ADMIN", "***");
      _0x559fad = _0x559fad.replace("O.Ã‡", "***");
      _0x559fad = _0x559fad.replace("o.Ã§", "***");
      _0x559fad = _0x559fad.replace("amcÄ±k", "***");
      _0x559fad = _0x559fad.replace("amc1", "***");
      _0x559fad = _0x559fad.replace("sikerim", "***");
      _0x559fad = _0x559fad.replace("www.agario.su", "***");
      _0x559fad = _0x559fad.replace("siken", "***");
      _0x559fad = _0x559fad.replace("SÄ°KEN", "***");
      _0x559fad = _0x559fad.replace("sikerler", "***");
      _0x559fad = _0x559fad.replace("discord", "***");
      _0x559fad = _0x559fad.replace("http", "***");
      _0x559fad = _0x559fad.replace("HTTP", "***");
      _0x559fad = _0x559fad.replace("orospu", "***");
      _0x559fad = _0x559fad.replace("yarrak", "***");
      _0x559fad = _0x559fad.replace("skr", "***");
      _0x559fad = _0x559fad.replace("SKR", "***");
      _0x559fad = _0x559fad.replace("S1KER", "***");
      _0x559fad = _0x559fad.replace("sKr", "***");
      _0x559fad = _0x559fad.replace("SkR", "***");
      _0x559fad = _0x559fad.replace("s1keyim", "***");
      _0x559fad = _0x559fad.replace("s1k", "***");
      _0x559fad = _0x559fad.replace("ors", "***");
      _0x559fad = _0x559fad.replace("yarraÄŸÄ±", "***");
      _0x559fad = _0x559fad.replace("gÃ¶t", "***");
      _0x559fad = _0x559fad.replace("fuck", "***");
      _0x559fad = _0x559fad.replace("ATATÃœRK", "***");
      _0x559fad = _0x559fad.replace("parti", "***");
      _0x559fad = _0x559fad.replace("PARTÄ°", "***");
      _0x559fad = _0x559fad.replace("atatÃ¼rk", "***");
      _0x559fad = _0x559fad.replace("fuck", "***");
      _0x559fad = _0x559fad.replace("FCK", "***");
      _0x559fad = _0x559fad.replace("FUCK", "***");
      _0x559fad = _0x559fad.replace("allah", "***");
      _0x559fad = _0x559fad.replace("ALLAH", "***");
      _0x559fad = _0x559fad.replace("HZ", "***");
      _0x559fad = _0x559fad.replace("hz", "***");
      _0x559fad = _0x559fad.replace("TAYYÄ°P", "***");
      _0x559fad = _0x559fad.replace("RTE", "***");
      _0x559fad = _0x559fad.replace("RECEP", "***");
      _0x559fad = _0x559fad.replace("rte", "***");
      _0x559fad = _0x559fad.replace("FUCK", "***");
      _0x559fad = _0x559fad.replace("ð“•ð“¤ð“’ð“š", "***");
      _0x559fad = _0x559fad.replace("ð“•ð“¤ð“’ð“šð“¨ð“žð“¤", "***");
      _0x559fad = _0x559fad.replace("tayyip", "***");
      _0x559fad = _0x559fad.replace("tayyÄ±p", "***");
      _0x559fad = _0x559fad.replace("recep", "***");
      _0x559fad = _0x559fad.replace("skmek", "***");
      _0x559fad = _0x559fad.replace("ananÄ±zÄ±", "***");
      _0x559fad = _0x559fad.replace("sÄ±kmek", "***");
      _0x559fad = _0x559fad.replace("rec", "***");
      _0x559fad = _0x559fad.replace("REC", "***");
      _0x559fad = _0x559fad.replace("BOK", "***");
      _0x559fad = _0x559fad.replace("bok", "***");
      _0x559fad = _0x559fad.replace("Ass", "***");
      _0x559fad = _0x559fad.replace("Vagina", "***");
      _0x559fad = _0x559fad.replace("Bitch", "***");
      _0x559fad = _0x559fad.replace("Sucker", "***");
      _0x559fad = _0x559fad.replace("meme", "***");
      _0x559fad = _0x559fad.replace("yarak", "***");
      _0x559fad = _0x559fad.replace("yaraÄŸÄ±", "***");
      _0x559fad = _0x559fad.replace("sokam", "***");
      _0x559fad = _0x559fad.replace("sikem", "***");
      _0x559fad = _0x559fad.replace("sik", "***");
      _0x559fad = _0x559fad.replace("ANANIZI", "***");
      _0x559fad = _0x559fad.replace("gay", "***");
      _0x559fad = _0x559fad.replace("oÃ§", "***");
      _0x559fad = _0x559fad.replace("o.Ã§", "***");
      _0x559fad = _0x559fad.replace("pkk", "!!!");
      _0x559fad = _0x559fad.replace("PKK", "!!!");
      _0x559fad = _0x559fad.replace("KURDISTAN", "BENGAVATIM");
      _0x559fad = _0x559fad.replace("KÃœRDÄ°STAN", "!!!");
      _0x559fad = _0x559fad.replace("kurdÄ±stan", "!!!");
      _0x559fad = _0x559fad.replace("kÃ¼rdistan", "!!!");
      _0x559fad = _0x559fad.replace("kÃ¼rd", "!!!");
      _0x559fad = _0x559fad.replace("kÃ¼rt", "!!!");
      _0x559fad = _0x559fad.replace("kurt", "!!!");
      _0x559fad = _0x559fad.replace("KÃœRT", "!!!");
      _0x559fad = _0x559fad.replace("KURT", "!!!");
      _0x559fad = _0x559fad.replace("kurd", "!!!");
      _0x559fad = _0x559fad.replace("P K K", "!!!");
      _0x559fad = _0x559fad.replace("P_K_K", "!!!");
      _0x559fad = _0x559fad.replace("P-K-K", "!!!");
      _0x559fad = _0x559fad.replace("p kk", "!!!");
      _0x559fad = _0x559fad.replace("pk k", "!!!");
      _0x559fad = _0x559fad.replace("p_k_k", "!!!");
      _0x559fad = _0x559fad.replace("p-k-k", "!!!");
      _0x559fad = _0x559fad.replace("o.Ã§ocuÄŸu", "***");
      _0x559fad = _0x559fad.replace("penis", "***");
      _0x559fad = _0x559fad.replace("ananÄ±", "***");
      _0x559fad = _0x559fad.replace("anasÄ±nÄ±", "***");
      _0x559fad = _0x559fad.replace("amÄ±na", "***");
      _0x559fad = _0x559fad.replace("Siken", "***");
      _0x559fad = _0x559fad.replace("iken", "***");
      _0x559fad = _0x559fad.replace("Ä°KEN", "***");
      _0x559fad = _0x559fad.replace("sÄ±ktÄ±gÄ±m", "***");
      _0x559fad = _0x559fad.replace("sÄ±kÄ±yÄ±m", "***");
      _0x559fad = _0x559fad.replace("orspu", "***");
      _0x559fad = _0x559fad.replace("annenÄ±zÄ±n", "***");
      _0x559fad = _0x559fad.replace("anneni", "***");
      _0x559fad = _0x559fad.replace("skym", "***");
      _0x559fad = _0x559fad.replace("sikeyim", "***");
      _0x559fad = _0x559fad.replace("SÄ°KEN", "***");
      _0x559fad = _0x559fad.replace("sikeyim", "***");
      _0x559fad = _0x559fad.replace("sikeyim", "***");
      _0x559fad = _0x559fad.replace("vagina", "***");
      _0x559fad = _0x559fad.replace("ILAH", "***");
      _0x559fad = _0x559fad.replace("ilah", "***");
      _0x559fad = _0x559fad.replace("LAILAH", "***");
      _0x559fad = _0x559fad.replace("lailah", "***");
      _0x559fad = _0x559fad.replace("vagina", "***");
      return _0x559fad;
    }
    function _0x549cd7(_0x304c11) {}
    function _0x59057e(_0x4e0986) {}
    function _0x316e0b(_0x53cff8) {}
    function _0x38a98f(_0x339cc0) {
      if (_0x18263b) {
        _0x339536 *= Math.pow(0.9, _0x339cc0.wheelDelta / -120 || _0x339cc0.detail || 0);
        if (_0x339536 < 0.4) {
          _0x339536 = 0.4;
        }
        if (_0x339536 > 10 / _0x1402f0) {
          _0x339536 = 10 / _0x1402f0;
        }
      } else {
        _0x339536 *= Math.pow(0.9, _0x339cc0.wheelDelta / -120 || _0x339cc0.detail || 0);
        if (_0x339536 < 0.01) {
          _0x339536 = 0.01;
        }
        if (_0x339536 > 4 / _0x1402f0) {
          _0x339536 = 4 / _0x1402f0;
        }
      }
    }
    function _0x1a661f() {
      if (_0x1402f0 < 0.4) {
        _0x2cf3cf = null;
      } else {
        var _0xdbefef = Number.POSITIVE_INFINITY;
        var _0x5938f2 = Number.POSITIVE_INFINITY;
        var _0x1d98c4 = Number.NEGATIVE_INFINITY;
        var _0x43a848 = Number.NEGATIVE_INFINITY;
        var _0x5a1ecb = 0;
        for (var _0x208af5 = 0; _0x208af5 < _0x3e0cc8.length; _0x208af5++) {
          var _0x121307 = _0x3e0cc8[_0x208af5];
          if (_0x121307.shouldRender() && !_0x121307.prepareData && _0x121307.size * _0x1402f0 > 20) {
            _0x5a1ecb = Math.max(_0x121307.size, _0x5a1ecb);
            _0xdbefef = Math.min(_0x121307.x, _0xdbefef);
            _0x5938f2 = Math.min(_0x121307.y, _0x5938f2);
            _0x1d98c4 = Math.max(_0x121307.x, _0x1d98c4);
            _0x43a848 = Math.max(_0x121307.y, _0x43a848);
          }
        }
        _0x2cf3cf = _0x2c6038.init({
          minX: _0xdbefef - (_0x5a1ecb + 100),
          minY: _0x5938f2 - (_0x5a1ecb + 100),
          maxX: _0x1d98c4 + (_0x5a1ecb + 100),
          maxY: _0x43a848 + (_0x5a1ecb + 100),
          maxChildren: 2,
          maxDepth: 4
        });
        for (_0x208af5 = 0; _0x208af5 < _0x3e0cc8.length; _0x208af5++) {
          _0x121307 = _0x3e0cc8[_0x208af5];
          if (_0x121307.shouldRender() && !(_0x121307.size * _0x1402f0 <= 20)) {
            for (_0xdbefef = 0; _0xdbefef < _0x121307.points.length; ++_0xdbefef) {
              _0x5938f2 = _0x121307.points[_0xdbefef].x;
              _0x1d98c4 = _0x121307.points[_0xdbefef].y;
              if (!(_0x5938f2 < _0x4f5429 - _0x35ab87 / 2 / _0x1402f0) && !(_0x1d98c4 < _0x1f0529 - _0x84b5f1 / 2 / _0x1402f0) && !(_0x5938f2 > _0x4f5429 + _0x35ab87 / 2 / _0x1402f0) && !(_0x1d98c4 > _0x1f0529 + _0x84b5f1 / 2 / _0x1402f0)) {
                _0x2cf3cf.insert(_0x121307.points[_0xdbefef]);
              }
            }
          }
        }
      }
    }
    function _0x439b61() {
      _0x4232df = (_0x7a7861 - _0x35ab87 / 2) / _0x1402f0 + _0x4f5429;
      _0x4ddae1 = (_0x2aaf30 - _0x84b5f1 / 2) / _0x1402f0 + _0x1f0529;
    }
    function _0x455917() {
      _0x1c7fca = false;
      document.getElementById("main-login-section").hide(1);
    }
    function _0x4620f0(_0x2d44ba) {
      _0x1c7fca = true;
      if (_0x2d44ba == "fast") {
        document.getElementById("main-login-section").show(0.2);
      } else {
        document.getElementById("main-login-section").show(0.5);
      }
    }
    function _0x1dcff8() {
      document.getElementById("stats_hightesmass").innerHTML = _0x2bc39b;
      document.getElementById("stats_timealive").innerHTML = _0xdd7d12((Date.now() - _0x443ee3) / 1000);
      document.getElementById("stats_topposition").innerHTML = _0x40174c == 0 ? ":(" : _0x40174c;
      document.getElementById("infoOverlays").show(0.5);
    }
    function _0x30f669() {
      if (_0x225ef1 == null) {
        return 0;
      }
      for (var _0x11b9af = 0; _0x11b9af < _0x225ef1.length; ++_0x11b9af) {
        if (_0x1cc1c3.indexOf(_0x225ef1[_0x11b9af].id) != -1) {
          return _0x11b9af + 1;
        }
      }
      return 0;
    }
    function _0x52210d(_0x5bbcc8, _0x2cea99) {
      if (_0x5bbcc8.indexOf("{") != -1 && _0x5bbcc8.indexOf("}") != -1) {
        var _0x12169c = _0x5bbcc8.indexOf("{");
        var _0x454cf5 = _0x5bbcc8.indexOf("}");
        var _0x262bb5 = _0x5bbcc8.slice(_0x454cf5 + 1);
        if (_0x2cea99) {
          if (_0x262bb5 == "") {
            _0x262bb5 = "UnnamedCell";
          } else {
            _0x262bb5 = _0x5bbcc8.slice(_0x454cf5 + 1);
          }
        }
        return [_0x5bbcc8.slice(_0x12169c + 1, _0x454cf5), _0x262bb5];
      } else {
        return ["", _0x5bbcc8];
      }
    }
    function _0xdd7d12(_0x597c71) {
      _0x597c71 = ~~_0x597c71;
      var _0x2f3a97 = (_0x597c71 % 60).toString();
      _0x597c71 = (~~(_0x597c71 / 60)).toString();
      if (_0x2f3a97.length < 2) {
        _0x2f3a97 = "0" + _0x2f3a97;
      }
      return _0x597c71 + ":" + _0x2f3a97;
    }
    function _0xde92b2(_0x1ec878) {
      if (_0x41adc2) {
        _0x41adc2.onopen = null;
        _0x41adc2.onmessage = null;
        _0x41adc2.onclose = null;
        try {
          _0x41adc2.close();
        } catch (_0xd99386) {
          console.log("Connection not closed");
        }
        _0x41adc2 = null;
      }
      var _0x54f62b = CONNECTION_URL;
      _0x1ec878 = "wss://" + _0x54f62b;
      _0x1cc1c3 = [];
      _0x1cf585 = [];
      _0x44d2ff = {};
      _0x3e0cc8 = [];
      _0x551ae1 = [];
      _0x225ef1 = [];
      _0x573162 = "RESTART";
      this.countdown = 3599;
      _0x4fc920 = _0xd46307 = null;
      _0x2bc39b = 0;
      _0x4fea95 = 0;
      _0x2be5c9 = 0;
      _0x41adc2 = new WebSocket(_0x1ec878, ["protocol1", "protocol2"]);
      _0x41adc2.binaryType = "arraybuffer";
      _0x41adc2.onopen = _0x4508d4;
      _0x41adc2.onmessage = _0x506b57;
      _0x41adc2.onclose = _0x173bfb;
      _0x41adc2.onerror = function (_0x10ae64) {
        console.log(_0x10ae64);
      };
    }
    function _0x51333f(_0x4d4661) {
      return new DataView(new ArrayBuffer(_0x4d4661));
    }
    function _0x13b31b(_0x9710ef) {
      _0x41adc2.send(_0x9710ef.buffer);
    }
    function _0x3007c8() {
      _0x20007f();
      _0x152ba2();
    }
    function _0x4508d4() {
      console.log("Connected to the game");
      var _0xc65ea6 = _0x51333f(5);
      _0xc65ea6.setUint8(0, 254);
      _0xc65ea6.setUint32(1, 4, true);
      _0x13b31b(_0xc65ea6);
      var _0xc65ea6;
      _0xc65ea6 = _0x51333f(5);
      _0xc65ea6.setUint8(0, 255);
      _0xc65ea6.setUint32(1, 1332175218, true);
      _0x13b31b(_0xc65ea6);
      grecaptcha.ready(function () {
        grecaptcha.execute("6LcnrKQUAAAAADohV5Cksikz89WSP-ZPHNA7ViZm", {
          action: "play_game"
        }).then(function (_0x24fd90) {
          _0x1d7f75(_0x24fd90);
        });
      });
      if (playGameClickEvent == 1) {
        _0x3007c8();
      }
    }
    function _0x173bfb() {
      playGameClickEvent = 0;
      console.log("Connection closed");
      _0x41adc2 = null;
      _0x4620f0("fast");
      _0x1154df.isSpectating = false;
    }
    function _0x506b57(_0x1f8d26) {
      try {
        _0x486d06(new DataView(_0x1f8d26.data));
      } catch (_0x496a06) {
        console.log("Ws Message could not be sent");
      }
    }
    function _0x486d06(_0x1956d7) {
      function _0x26a109() {
        var _0x2a43d9 = "";
        var _0x56402e;
        while ((_0x56402e = _0x1956d7.getUint16(_0x3b5561, true)) != 0) {
          _0x3b5561 += 2;
          _0x2a43d9 += String.fromCharCode(_0x56402e);
        }
        _0x3b5561 += 2;
        return _0x2a43d9;
      }
      var _0x3b5561 = 0;
      var _0xf47615 = false;
      if (_0x1956d7.getUint8(_0x3b5561) == 240) {
        _0x3b5561 += 5;
      }
      switch (_0x1956d7.getUint8(_0x3b5561++)) {
        case 16:
          _0xa513e8(_0x1956d7, _0x3b5561);
          break;
        case 17:
          _0x1b6830 = _0x1956d7.getFloat32(_0x3b5561, true);
          _0x3b5561 += 4;
          _0x552165 = _0x1956d7.getFloat32(_0x3b5561, true);
          _0x3b5561 += 4;
          _0x503f66 = _0x1956d7.getFloat32(_0x3b5561, true);
          _0x3b5561 += 4;
          break;
        case 20:
          _0x1cf585 = [];
          _0x1cc1c3 = [];
          break;
        case 21:
          _0x3a03fd = _0x1956d7.getInt16(_0x3b5561, true);
          _0x3b5561 += 2;
          _0x35d3df = _0x1956d7.getInt16(_0x3b5561, true);
          _0x3b5561 += 2;
          if (!_0x1fbd55) {
            _0x1fbd55 = true;
            _0x46e881 = _0x3a03fd;
            _0x52f418 = _0x35d3df;
          }
          break;
        case 32:
          _0x1cc1c3.push(_0x1956d7.getUint32(_0x3b5561, true));
          _0x3b5561 += 4;
          break;
        case 48:
          _0xf47615 = true;
          _0x14a358 = true;
          break;
        case 49:
          if (!_0xf47615) {
            _0x14a358 = false;
          }
          _0xd46307 = null;
          var _0x582a10 = _0x1956d7.getUint32(_0x3b5561, true);
          _0x3b5561 += 4;
          _0x225ef1 = [];
          for (_0x160c99 = 0; _0x160c99 < _0x582a10; ++_0x160c99) {
            var _0x3f42dd = _0x1956d7.getUint32(_0x3b5561, true);
            _0x3b5561 += 4;
            _0x225ef1.push({
              id: _0x3f42dd,
              name: _0x26a109()
            });
          }
          _0x1cc94d();
          break;
        case 50:
          _0xd46307 = [];
          var _0x19788a = _0x1956d7.getUint32(_0x3b5561, true);
          _0x3b5561 += 4;
          for (var _0x160c99 = 0; _0x160c99 < _0x19788a; ++_0x160c99) {
            _0xd46307.push(_0x1956d7.getFloat32(_0x3b5561, true));
            _0x3b5561 += 4;
          }
          _0x1cc94d();
          break;
        case 64:
          _0x22b0f0 = _0x1956d7.getFloat64(_0x3b5561, true);
          _0x3b5561 += 8;
          _0x12d6c2 = _0x1956d7.getFloat64(_0x3b5561, true);
          _0x3b5561 += 8;
          _0x55af78 = _0x1956d7.getFloat64(_0x3b5561, true);
          _0x3b5561 += 8;
          _0x13322c = _0x1956d7.getFloat64(_0x3b5561, true);
          _0x3b5561 += 8;
          _0x1b6830 = (_0x55af78 + _0x22b0f0) / 2;
          _0x552165 = (_0x13322c + _0x12d6c2) / 2;
          _0x503f66 = 1;
          if (_0x1cf585.length == 0) {
            _0x4f5429 = _0x1b6830;
            _0x1f0529 = _0x552165;
            _0x1402f0 = _0x503f66;
          }
          break;
        case 90:
          Uping = new Date() - latency;
          Uuptime = _0x1956d7.getFloat64(_0x3b5561, true);
          _0x3b5561 += 8;
          Uplayers = _0x1956d7.getFloat64(_0x3b5561, true);
          _0x3b5561 += 8;
          break;
        case 92:
          this.gameName = "";
          var _0xad9cb8;
          while ((_0xad9cb8 = _0x1956d7.getUint16(_0x3b5561, true)) != 0) {
            _0x3b5561 += 2;
            this.gameName += String.fromCharCode(_0xad9cb8);
          }
          break;
        case 96:
          this.countdown = _0x1956d7.getUint16(_0x3b5561, true);
          break;
        case 97:
          _0x573162 = "";
          var _0xad9cb8;
          while ((_0xad9cb8 = _0x1956d7.getUint16(_0x3b5561, true)) != 0) {
            _0x3b5561 += 2;
            _0x573162 += String.fromCharCode(_0xad9cb8);
          }
          break;
        case 109:
          _0x492247(_0x1956d7, _0x3b5561);
          break;
      }
    }
    function _0x492247(_0xa31417, _0x34eaad) {
      function _0x1d4d71() {
        var _0x478ac3 = "";
        var _0x523e66;
        while ((_0x523e66 = _0xa31417.getUint16(_0x34eaad, true)) != 0) {
          _0x34eaad += 2;
          _0x478ac3 += String.fromCharCode(_0x523e66);
        }
        _0x34eaad += 2;
        return _0x478ac3;
      }
      var _0x4d4989 = _0xa31417.getUint8(_0x34eaad++);
      if (_0x4d4989 & 2) {
        _0x34eaad += 4;
      }
      if (_0x4d4989 & 4) {
        _0x34eaad += 8;
      }
      if (_0x4d4989 & 8) {
        _0x34eaad += 16;
      }
      var _0xc965b9 = _0xa31417.getUint8(_0x34eaad++);
      var _0x24c98f = _0xa31417.getUint8(_0x34eaad++);
      var _0x3fb0eb = _0xa31417.getUint8(_0x34eaad++);
      var _0x490cfb = (_0xc965b9 << 16 | _0x24c98f << 8 | _0x3fb0eb).toString(16);
      while (_0x490cfb.length > 6) {
        _0x490cfb = "0" + _0x490cfb;
      }
      _0x490cfb = "#" + _0x490cfb;
      _0x48203d.push({
        name: _0x52210d(_0x1d4d71())[1],
        color: _0x490cfb,
        message: _0x1d4d71(),
        time: Date.now()
      });
    }
    function _0xa513e8(_0x2076cc, _0x5da7e5) {
      _0x5b1d69 = +new Date();
      var _0x20ce4f = Math.random();
      _0x171ae9 = false;
      var _0x272c41 = _0x2076cc.getUint16(_0x5da7e5, true);
      _0x5da7e5 += 2;
      for (_0x35e59d = 0; _0x35e59d < _0x272c41; ++_0x35e59d) {
        var _0x27b968 = _0x44d2ff[_0x2076cc.getUint32(_0x5da7e5, true)];
        var _0x22218e = _0x44d2ff[_0x2076cc.getUint32(_0x5da7e5 + 4, true)];
        _0x5da7e5 += 8;
        if (_0x27b968 && _0x22218e) {
          _0x22218e.destroy();
          _0x22218e.ox = _0x22218e.x;
          _0x22218e.oy = _0x22218e.y;
          _0x22218e.oSize = _0x22218e.size;
          _0x22218e.nx = _0x27b968.x;
          _0x22218e.ny = _0x27b968.y;
          _0x22218e.nSize = _0x22218e.size;
          _0x22218e.updateTime = _0x5b1d69;
        }
      }
      var _0x35e59d = 0;
      for (;;) {
        var _0x85d8cc = _0x2076cc.getUint32(_0x5da7e5, true);
        _0x5da7e5 += 4;
        if (_0x85d8cc == 0) {
          break;
        }
        ++_0x35e59d;
        var _0xc2d3bd;
        var _0x1fee82;
        var _0x30582f = _0x2076cc.getInt16(_0x5da7e5, true);
        _0x5da7e5 += 2;
        _0x1fee82 = _0x2076cc.getInt16(_0x5da7e5, true);
        _0x5da7e5 += 2;
        _0xc2d3bd = _0x2076cc.getInt16(_0x5da7e5, true);
        _0x5da7e5 += 2;
        var _0x2d8deb = _0x2076cc.getUint8(_0x5da7e5++);
        var _0x1d7d68 = _0x2076cc.getUint8(_0x5da7e5++);
        var _0x1e07e = _0x2076cc.getUint8(_0x5da7e5++);
        for (var _0x461718 = (_0x2d8deb << 16 | _0x1d7d68 << 8 | _0x1e07e).toString(16); _0x461718.length < 6;) {
          _0x461718 = "0" + _0x461718;
        }
        var _0x569f7c = "#" + _0x461718;
        var _0x3c289c = _0x2076cc.getUint8(_0x5da7e5++);
        var _0x3a2263 = !!(_0x3c289c & 1);
        var _0x134132 = !!(_0x3c289c & 16);
        if (_0x3c289c & 2) {
          _0x5da7e5 += 4;
        }
        if (_0x3c289c & 4) {
          _0x5da7e5 += 8;
        }
        if (_0x3c289c & 8) {
          _0x5da7e5 += 16;
        }
        var _0x515f62;
        var _0x18b2ec = "";
        while (true) {
          _0x515f62 = _0x2076cc.getUint16(_0x5da7e5, true);
          _0x5da7e5 += 2;
          if (_0x515f62 == 0) {
            break;
          }
          _0x18b2ec += String.fromCharCode(_0x515f62);
        }
        var _0xf2f04d = null;
        if (_0x44d2ff.hasOwnProperty(_0x85d8cc)) {
          _0xf2f04d = _0x44d2ff[_0x85d8cc];
          _0xf2f04d.updatePos();
          _0xf2f04d.ox = _0xf2f04d.x;
          _0xf2f04d.oy = _0xf2f04d.y;
          _0xf2f04d.oSize = _0xf2f04d.size;
          _0xf2f04d.color = _0x569f7c;
        } else {
          _0xf2f04d = new _0x2b0fa0(_0x85d8cc, _0x30582f, _0x1fee82, _0xc2d3bd, _0x569f7c, _0x18b2ec);
          _0x3e0cc8.push(_0xf2f04d);
          _0x44d2ff[_0x85d8cc] = _0xf2f04d;
          _0xf2f04d.ka = _0x30582f;
          _0xf2f04d.la = _0x1fee82;
        }
        _0xf2f04d.isVirus = _0x3a2263;
        _0xf2f04d.isAgitated = _0x134132;
        _0xf2f04d.nx = _0x30582f;
        _0xf2f04d.ny = _0x1fee82;
        _0xf2f04d.nSize = _0xc2d3bd;
        _0xf2f04d.updateCode = _0x20ce4f;
        _0xf2f04d.updateTime = _0x5b1d69;
        _0xf2f04d.flag = _0x3c289c;
        if (_0x18b2ec) {
          _0xf2f04d.setName(_0x18b2ec);
        }
        if (_0x1cc1c3.indexOf(_0x85d8cc) != -1 && _0x1cf585.indexOf(_0xf2f04d) == -1) {
          document.getElementById("main-login-section").style.visibility = "hidden";
          _0x1cf585.push(_0xf2f04d);
          if (_0x1cf585.length == 1) {
            _0x4f5429 = _0xf2f04d.x;
            _0x1f0529 = _0xf2f04d.y;
          }
        }
      }
      _0x272c41 = _0x2076cc.getUint32(_0x5da7e5, true);
      _0x5da7e5 += 4;
      for (_0x35e59d = 0; _0x35e59d < _0x272c41; _0x35e59d++) {
        var _0x5d727f = _0x2076cc.getUint32(_0x5da7e5, true);
        _0x5da7e5 += 4;
        _0xf2f04d = _0x44d2ff[_0x5d727f];
        if (_0xf2f04d != null) {
          _0xf2f04d.destroy();
        }
      }
      if (_0x171ae9 && _0x1cf585.length == 0) {
        _0x1dcff8("slow");
      }
      if (_0x1cf585.length == 0 && _0x218057 == true) {
        _0x370936 = _0x989085;
        _0x3d769c = _0x5e6b6a;
      }
    }
    function _0x5474e3() {
      var _0x21dd44;
      if (_0x2cbf37() && Sfreeze != true) {
        _0x21dd44 = _0x7a7861 - _0x35ab87 / 2;
        var _0xd11589 = _0x2aaf30 - _0x84b5f1 / 2;
        if (_0x21dd44 * _0x21dd44 + _0xd11589 * _0xd11589 >= 64 && (!(Math.abs(_0x5668bb - _0x4232df) < 0.01) || !(Math.abs(_0x12d92b - _0x4ddae1) < 0.01))) {
          _0x5668bb = _0x4232df;
          _0x12d92b = _0x4ddae1;
          _0x21dd44 = _0x51333f(21);
          _0x21dd44.setUint8(0, 16);
          _0x21dd44.setFloat64(1, _0x4232df, true);
          _0x21dd44.setFloat64(9, _0x4ddae1, true);
          _0x21dd44.setUint32(17, 0, true);
          _0x13b31b(_0x21dd44);
        }
      }
    }
    function _0x152ba2() {
      if (_0x2cbf37()) {
        var _0x44cabc = _0x51333f(1);
        _0x44cabc.setUint8(0, 27);
        _0x13b31b(_0x44cabc);
      }
    }
    function _0x20007f() {
      var _0xdbb0c7 = document.getElementById("nick").value;
      localStorage.playerNick = _0xdbb0c7;
      _0xdbb0c7 = _0x55c47e(_0xdbb0c7);
      if (selectSkinName != "") {
        _0xdbb0c7 = "{" + selectSkinName + "}" + _0xdbb0c7;
      }
      if (_0x2cbf37()) {
        var _0x3e378b = _0x51333f(1 + _0xdbb0c7.length * 2);
        _0x3e378b.setUint8(0, 107);
        for (var _0x1d34f4 = 0; _0x1d34f4 < _0xdbb0c7.length; ++_0x1d34f4) {
          _0x3e378b.setUint16(1 + _0x1d34f4 * 2, _0xdbb0c7.charCodeAt(_0x1d34f4), true);
        }
        _0x13b31b(_0x3e378b);
      }
    }
    function _0x1d7f75(_0x349f7e) {
      var _0x41260f = _0x51333f(1 + _0x349f7e.length * 2);
      _0x41260f.setUint8(0, 50);
      for (var _0x53d5b = 0; _0x53d5b < _0x349f7e.length; ++_0x53d5b) {
        _0x41260f.setUint16(1 + _0x53d5b * 2, _0x349f7e.charCodeAt(_0x53d5b), true);
      }
      _0x13b31b(_0x41260f);
    }
    function _0x512281(_0x15ad21) {
      if (_0x2cbf37() && _0x15ad21.length < 200 && _0x15ad21.length > 0) {
        var _0x268806 = _0x51333f(2 + _0x15ad21.length * 2);
        var _0x9b9b3e = 0;
        _0x268806.setUint8(_0x9b9b3e++, 109);
        _0x268806.setUint8(_0x9b9b3e++, 0);
        for (var _0xc567ed = 0; _0xc567ed < _0x15ad21.length; ++_0xc567ed) {
          _0x268806.setUint16(_0x9b9b3e, _0x15ad21.charCodeAt(_0xc567ed), true);
          _0x9b9b3e += 2;
        }
        _0x13b31b(_0x268806);
      }
    }
    function _0x2cbf37() {
      return _0x41adc2 != null && _0x41adc2.readyState == _0x41adc2.OPEN;
    }
    function _0x1519d9(_0x759b8d) {
      if (_0x2cbf37()) {
        var _0x51d083 = _0x51333f(1);
        _0x51d083.setUint8(0, _0x759b8d);
        _0x13b31b(_0x51d083);
      }
    }
    function _0x4a98c2() {
      _0x5cf431();
      _0x1154df.requestAnimationFrame(_0x4a98c2);
    }
    function _0x3cca80() {
      window.scrollTo(0, 0);
      _0x35ab87 = _0x1154df.innerWidth;
      _0x84b5f1 = _0x1154df.innerHeight;
      _0xe72a47.width = _0x35ab87;
      _0xe72a47.height = _0x84b5f1;
      _0x5cf431();
    }
    function _0x951755() {
      var _0x563629;
      _0x563629 = Math.max(_0x84b5f1 / 1080, _0x35ab87 / 1920);
      return _0x563629 * _0x339536;
    }
    function _0x44fc5b() {
      if (_0x1cf585.length != 0) {
        var _0x234bb3 = 0;
        for (var _0x31e00c = 0; _0x31e00c < _0x1cf585.length; _0x31e00c++) {
          _0x234bb3 += _0x1cf585[_0x31e00c].size;
        }
        _0x234bb3 = Math.pow(Math.min(64 / _0x234bb3, 1), 0.4) * _0x951755();
        _0x1402f0 = (_0x1402f0 * 9 + _0x234bb3) / 10;
      }
    }
    let arenaImageTaki = new Image();
let arenaImageLoaded = false;

arenaImageTaki.src = 'https://taki-mitsuha-build.vercel.app/static/images/bg-arena.jpg';
arenaImageTaki.onload = function() {
  arenaImageLoaded = true;
};
    function _0x5cf431() {
      var _0x448cd4;
      var _0x56c4ef = Date.now();
      ++_0xe1267f;
      var _0x17ac81 = Date.now() - _0x2c6c3e;
      if (_0x17ac81 > 50) {
        _0x2c6c3e = Date.now();
        _0x5474e3();
      }
      _0x5b1d69 = _0x56c4ef;
      if (_0x1cf585.length > 0) {
        _0x44fc5b();
        var _0x508a96 = _0x448cd4 = 0;
        for (var _0x4a53dc = 0; _0x4a53dc < _0x1cf585.length; _0x4a53dc++) {
          _0x1cf585[_0x4a53dc].updatePos();
          _0x448cd4 += _0x1cf585[_0x4a53dc].x / _0x1cf585.length;
          _0x508a96 += _0x1cf585[_0x4a53dc].y / _0x1cf585.length;
        }
        _0x1b6830 = _0x448cd4;
        _0x552165 = _0x508a96;
        _0x503f66 = _0x1402f0;
        _0x4f5429 = (_0x4f5429 + _0x448cd4) / 2;
        _0x1f0529 = (_0x1f0529 + _0x508a96) / 2;
      } else {
        _0x4f5429 = (_0x4f5429 * 29 + _0x1b6830) / 30;
        _0x1f0529 = (_0x1f0529 * 29 + _0x552165) / 30;
        _0x1402f0 = (_0x1402f0 * 9 + _0x503f66 * _0x951755()) / 10;
      }
      _0x1a661f();
      _0x439b61();
      _0x16b27b.fillStyle = _0x456030 ? "#111111" : "#F2FBFF";
      
      _0x16b27b.fillRect(0, 0, _0x35ab87, _0x84b5f1);
      _0x3e0cc8.sort(function (_0x3e2c64, _0x58cf05) {
        if (_0x3e2c64.size == _0x58cf05.size) {
          return _0x3e2c64.id - _0x58cf05.id;
        } else {
          return _0x3e2c64.size - _0x58cf05.size;
        }
      });
      _0x16b27b.save();
      _0x16b27b.translate(_0x35ab87 / 2, _0x84b5f1 / 2);
      _0x16b27b.scale(_0x1402f0, _0x1402f0);
      _0x16b27b.translate(-_0x4f5429, -_0x1f0529);
      _0x16b27b.strokeStyle = "#FFFFFF"; // Change border color to white
      _0x16b27b.lineWidth = 70; // Increase border thickness
      _0x16b27b.lineCap = "round";
      _0x16b27b.lineJoin = "round";
      _0x16b27b.shadowColor = "#FFFFFF"; // Add shadow effect
      _0x16b27b.shadowBlur = 20; // Set shadow blur for brightness effect
      _0x16b27b.beginPath();
      _0x16b27b.moveTo(_0x22b0f0, _0x12d6c2);
      _0x16b27b.lineTo(_0x55af78, _0x12d6c2);
      _0x16b27b.lineTo(_0x55af78, _0x13322c);
      _0x16b27b.lineTo(_0x22b0f0, _0x13322c);
      _0x16b27b.closePath();
      _0x16b27b.stroke();
      // _0x16b27b.shadowColor = "transparent"; // Remove shadow effect after border
      // _0x16b27b.shadowBlur = 0; // Reset shadow blur
    // Resim yüklendiyse çiz
    if (arenaImageLoaded) {
      const imageX = _0x22b0f0;
      const imageY = _0x12d6c2;
      const imageWidth = _0x55af78 - _0x22b0f0;
      const imageHeight = _0x13322c - _0x12d6c2;
      _0x16b27b.drawImage(arenaImageTaki, imageX, imageY, imageWidth, imageHeight);
    }
      if (_0x7ac7be == true) {
        _0x16b27b.globalAlpha = 0.6;
      } else {
        _0x16b27b.globalAlpha = 1;
      }
      for (_0x4a53dc = 0; _0x4a53dc < _0x3e0cc8.length; _0x4a53dc++) {
        _0x3e0cc8[_0x4a53dc].drawOneCell(_0x16b27b);
      }
      if (_0x1fbd55) {
        _0x46e881 = (_0x46e881 * 3 + _0x3a03fd) / 4;
        _0x52f418 = (_0x52f418 * 3 + _0x35d3df) / 4;
        _0x16b27b.save();
        _0x16b27b.strokeStyle = "#FFAAAA";
        _0x16b27b.lineWidth = 10;
        _0x16b27b.lineCap = "round";
        _0x16b27b.lineJoin = "round";
        _0x16b27b.globalAlpha = 0.5;
        _0x16b27b.beginPath();
        for (_0x4a53dc = 0; _0x4a53dc < _0x1cf585.length; _0x4a53dc++) {
          _0x16b27b.moveTo(_0x1cf585[_0x4a53dc].x, _0x1cf585[_0x4a53dc].y);
          _0x16b27b.lineTo(_0x46e881, _0x52f418);
        }
        _0x16b27b.stroke();
        _0x16b27b.restore();
      }
      _0x16b27b.restore();
      if (_0x1afb5a && _0x1afb5a.width) {
        _0x16b27b.drawImage(_0x1afb5a, _0x35ab87 - _0x1afb5a.width - 10, 10);
      }
      if (!_0x2653d4) {
        if (_0x4e0f0e != null && _0x4e0f0e.width > 0) {
          _0x16b27b.drawImage(_0x4e0f0e, 0, _0x84b5f1 - _0x4e0f0e.height - 50);
        }
      }
      _0x4fea95 = _0x3af1d3();
      _0x2bc39b = Math.max(_0x2bc39b, _0x4fea95);
      _0x16b27b.globalAlpha = 0.8;
      _0x16b27b.font = "18px Ubuntu"; // Yazı boyutunu küçülttük
      
      // Başlangıç x ve y koordinatlarını ayarla
      let startX = 10;  // Sol üst köşe başlangıç noktası
      const startY = 10; // Üstten biraz boşluk
      
      // Her bir kutunun boyutları
      const boxPadding = 8;  // Kenarlıklar için daha küçük padding
      const boxHeight = 30;  // Kutu yüksekliğini küçülttüm
      const boxMargin = 8;   // Kutular arasındaki boşluk
      
      // Yazılar
      const texts = [
        "Score: " + _0x4fea95,
        "Max: " + _0x2bc39b,
        "FPS: " + Uping + " ms",
        "Uptime: " + Uuptime + " sec",
        "Players: " + Uplayers,
        "Restart: " + Math.floor(this.countdown / 60) + ":" + (this.countdown % 60 < 10 ? "0" : "") + (this.countdown % 60)
      ];
      
      // Her metni kare içine yerleştir ve yan yana hizala
      texts.forEach((text, index) => {
          const textWidth = _0x16b27b.measureText(text).width;
          const boxWidth = textWidth + 2 * boxPadding;
      
          // Eğer metin "Restart" ise farklı bir renk kullan
          if (text.startsWith("Restart")) {
              _0x16b27b.fillStyle = "rgba(255, 69, 0, 0.6)";  // Transparan turuncu (Farklı renk)
          } else {
              _0x16b27b.fillStyle = "rgba(0, 0, 0, 0.5)";  // Transparan lacivert (diğer kutular)
          }
      
          _0x16b27b.fillRect(startX, startY, boxWidth, boxHeight);  // Kutuyu çiz
      
          // Metni kutunun içine ortala
          _0x16b27b.fillStyle = _0x456030 ? "#FFFFFF" : "#000000";  // Metin rengi duruma göre
          _0x16b27b.fillText(text, startX + boxPadding, startY + (boxHeight / 2) + 6);  // Metni kutunun içine hizala
      
          // x koordinatını bir sonraki kutu için güncelle
          startX += boxWidth + boxMargin;  // Kutular arasında boşluk bırak
      });
      
      if (_0x2cbf37()) {
        _0x16b27b.globalAlpha = 1;
        _0x16b27b.font = "16px Ubuntu";
        var _0x473451 = "share";
        var _0x5bf63c = Math.round(_0x4f5429 / 1000) + " , " + Math.round(_0x1f0529 / 1000) + " " + _0x473451;
        _0x3e66be = _0x16b27b.measureText(_0x5bf63c).width;
        _0x39a218 = 16;
        _0x323587 = "*** " + Math.round(_0x4f5429 / 1000) + " , " + Math.round(_0x1f0529 / 1000) + " ***";
        if (_0x456030 == true) {
          _0x16b27b.fillStyle = "#FFFFFF";
        } else {
          _0x16b27b.fillStyle = "#000000";
        }
        _0x16b27b.fillText(_0x5bf63c, _0x3893ec, _0x3b81f2 - 15);
      }
      if (_0x2653d4 == false) {
        var _0x1865c9 = 0;
        for (var _0x42d0b2 = _0x48203d.length - 1; _0x42d0b2 >= 0; _0x42d0b2--) {
          _0x1865c9++;
          if (_0x1865c9 > 15) {
            break;
          }
          var _0xc6a056 = _0x48203d[_0x42d0b2].name.trim();
          if (_0xc6a056 == "") {
            _0xc6a056 = "Agar.io";
          }
          var _0x1612c2 = _0x48203d[_0x42d0b2].message.trim();
          var _0x3a44c9 = " : " + _0x1612c2;
          var _0x5cdd26 = _0x3a44c9.toLowerCase();
          var _0x4e5aac = _0x5cdd26.replace(/[^a-zA-ZÄŸÃ¼ÅŸÄ±Ã¶Ã§ÄžÃœÅžÄ°Ã–Ã‡@)(!,?:^0-9 ]/g, "");
          _0x16b27b.font = "18px Arial";
          _0x48203d[_0x42d0b2].name_x = 15;
          _0x48203d[_0x42d0b2].name_y = _0x84b5f1 - 30 - _0x1865c9 * 20;
          _0x48203d[_0x42d0b2].name_w = _0x16b27b.measureText(_0xc6a056).width;
          _0x48203d[_0x42d0b2].name_h = 18;
          _0x48203d[_0x42d0b2].msg_x = 15 + _0x48203d[_0x42d0b2].name_w;
          _0x48203d[_0x42d0b2].msg_y = _0x48203d[_0x42d0b2].name_y;
          _0x48203d[_0x42d0b2].msg_w = _0x16b27b.measureText(_0x3a44c9).width;
          _0x48203d[_0x42d0b2].msg_h = _0x48203d[_0x42d0b2].name_h;
          _0x16b27b.fillStyle = _0x48203d[_0x42d0b2].color;
          _0x16b27b.fillText(_0xc6a056, _0x48203d[_0x42d0b2].name_x, _0x48203d[_0x42d0b2].name_y);
          if (_0x456030 == true) {
            _0x16b27b.fillStyle = "#FFFFFF";
          } else {
            _0x16b27b.fillStyle = "#000000";
          }
          _0x16b27b.fillText(_0x4e5aac, _0x48203d[_0x42d0b2].msg_x, _0x48203d[_0x42d0b2].msg_y);
        }
      }
      var _0x579343 = Date.now() - _0x56c4ef;
      if (_0x579343 > 1000 / 60) {
        _0xdce442 -= 0.01;
      } else if (_0x579343 < 1000 / 65) {
        _0xdce442 += 0.01;
      }
      if (_0xdce442 < 0.4) {
        _0xdce442 = 0.4;
      }
      if (_0xdce442 > 1) {
        _0xdce442 = 1;
      }
      _0xafbc37();
    }
    function _0xafbc37() {
      if (_0x1cf585.length == 0) {
        return;
      }
      _0x16b27b.save();
      function _0xe0aca4(_0x5cbe4f, _0x910ea2) {
        if (!_0x910ea2) {
          return _0x5cbe4f;
        } else {
          return _0xe0aca4(_0x910ea2, _0x5cbe4f % _0x910ea2);
        }
      }
      _0x16b27b.beginPath();
      _0x16b27b.fillStyle = "rgba(0,0,0,.25)";
      var _0x575a1b = 200;
      _0x16b27b.lineWidth = 1.5;
      var _0x356b6f = _0x35ab87 - _0x575a1b - 10;
      var _0x402af6 = _0x84b5f1 - _0x575a1b - 5;
      _0x16b27b.rect(_0x356b6f, _0x402af6, _0x575a1b, _0x575a1b);
      _0x16b27b.lineWidth = 1.25;
      var _0x3fed4d = _0x4f5429 / (_0x55af78 - _0x22b0f0);
      var _0x4c8419 = _0x1f0529 / (_0x13322c - _0x12d6c2);
      var _0x24dde3 = _0x3fed4d * _0x575a1b + _0x356b6f + _0x575a1b / 2 - 100;
      var _0x4a2b0b = _0x4c8419 * _0x575a1b + _0x402af6 + _0x575a1b / 2 - 100;
      var _0x4ab1d3 = bh = _0x575a1b;
      var _0x46b621 = -1;
      var _0xd386e4 = -1;
      for (var _0x5df9eb = 0; _0x5df9eb <= _0x4ab1d3; _0x5df9eb += 40) {
        if (_0x5df9eb != _0x4ab1d3) {
          var _0x51e9c9 = 0.5 + _0x5df9eb + _0x356b6f;
          var _0x180c33 = _0x402af6;
          if (_0x1d0b7d(_0x51e9c9, _0x180c33, _0x51e9c9 + 40, _0x180c33 + bh, _0x24dde3, _0x4a2b0b)) {
            _0x46b621 = _0x51e9c9;
          }
          if (_0x5df9eb == 0) {
            continue;
          }
          _0x16b27b.moveTo(0.5 + _0x5df9eb + _0x356b6f, _0x402af6);
          _0x16b27b.lineTo(0.5 + _0x5df9eb + _0x356b6f, bh + _0x402af6);
        }
        if (_0x456030 == true) {
          _0x16b27b.fillStyle = "#FFFFFF";
        } else {
          _0x16b27b.fillStyle = "#000000";
        }
        _0x16b27b.font = "700 18px ubuntu";
        _0x16b27b.textAlign = "center";
        _0x16b27b.strokeStyle = "white";
        _0x16b27b.lineWidth = 1;
        _0x16b27b.globalAlpha = 0.35;
        for (var _0x3b6bae = 0; _0x3b6bae < 5; _0x3b6bae++) {
          _0x16b27b.fillText(String.fromCharCode(_0x3b6bae + 65) + _0x5df9eb / 40, 0.5 + _0x5df9eb + _0x356b6f - 20, _0x402af6 + 25.5 + _0x3b6bae * 40);
        }
      }
      for (var _0x171dc9 = 0; _0x171dc9 <= bh; _0x171dc9 += 40) {
        if (_0x171dc9 != bh) {
          var _0x51e9c9 = _0x356b6f;
          var _0x180c33 = 0.5 + _0x171dc9 + _0x402af6;
          if (_0x1d0b7d(_0x51e9c9, _0x180c33, _0x51e9c9 + _0x4ab1d3, _0x180c33 + 40, _0x24dde3, _0x4a2b0b)) {
            _0xd386e4 = _0x180c33;
          }
          if (_0x171dc9 == 0) {
            continue;
          }
          _0x16b27b.moveTo(_0x356b6f, 0.5 + _0x171dc9 + _0x402af6);
          _0x16b27b.lineTo(_0x4ab1d3 + _0x356b6f, 0.5 + _0x171dc9 + _0x402af6);
        }
      }
      if (_0x1cf585.length > 0 && _0x46b621 > -1 && _0xd386e4 > -1) {
        _0x16b27b.fillStyle = "#ccff00";
        _0x16b27b.globalAlpha = 0.3;
        _0x16b27b.fillRect(_0x46b621, _0xd386e4, 40, 40);
      }
      _0x16b27b.globalAlpha = 1;
      _0x16b27b.strokeStyle = "rgba(255,255,255,.2)";
      _0x16b27b.stroke();
      _0x16b27b.closePath();
      for (var _0x3b6bae = 0; _0x3b6bae < _0x1cf585.length; _0x3b6bae++) {
        var _0x5c0015 = _0x1cf585[_0x3b6bae];
        var _0x32d79b = _0x5c0015.ox / (_0x55af78 - _0x22b0f0);
        var _0x5cddea = _0x5c0015.oy / (_0x13322c - _0x12d6c2);
        var _0x5df9eb = _0x32d79b * _0x575a1b + _0x356b6f + _0x575a1b / 2 - 100;
        var _0x171dc9 = _0x5cddea * _0x575a1b + _0x402af6 + _0x575a1b / 2 - 100;
        var _0x1f8273 = Math.max(2, _0x5c0015.size / (_0x575a1b / 2));
        _0x16b27b.fillStyle = _0x5c0015.color;
        if (_0x3b6bae == 0) {
          _0x16b27b.font = "bold " + (14 + _0x1f8273) + "px Ubuntu";
          var _0x2b16c5 = _0x16b27b.measureText(_0x5c0015.name);
          _0x16b27b.strokestyle = "black";
        }
        _0x16b27b.beginPath();
        _0x16b27b.strokeStyle = "black";
        _0x16b27b.lineWidth = 1;
        _0x16b27b.globalAlpha = 1;
        _0x16b27b.arc(_0x5df9eb, _0x171dc9, _0x1f8273, 0, Math.PI * 2);
        _0x16b27b.stroke();
        _0x16b27b.fill();
        _0x16b27b.closePath();
      }
      _0x16b27b.restore();
    }
    function _0x2b6f28() {
      _0x16b27b.fillStyle = _0x456030 ? "#111111" : "#F2FBFF";
      _0x16b27b.fillRect(0, 0, _0x35ab87, _0x84b5f1);
      _0x16b27b.save();
      _0x16b27b.strokeStyle = _0x456030 ? "#AAAAAA" : "#000000";
      _0x16b27b.globalAlpha = 0.2;
      _0x16b27b.scale(_0x1402f0, _0x1402f0);
      var _0x93dde = _0x35ab87 / _0x1402f0;
      var _0x16907d = _0x84b5f1 / _0x1402f0;
      for (var _0x1ebf45 = -0.5 + (-_0x4f5429 + _0x93dde / 2) % 50; _0x1ebf45 < _0x93dde; _0x1ebf45 += 50) {
        _0x16b27b.beginPath();
        _0x16b27b.moveTo(_0x1ebf45, 0);
        _0x16b27b.lineTo(_0x1ebf45, _0x16907d);
        _0x16b27b.stroke();
      }
      for (_0x1ebf45 = -0.5 + (-_0x1f0529 + _0x16907d / 2) % 50; _0x1ebf45 < _0x16907d; _0x1ebf45 += 50) {
        _0x16b27b.beginPath();
        _0x16b27b.moveTo(0, _0x1ebf45);
        _0x16b27b.lineTo(_0x93dde, _0x1ebf45);
        _0x16b27b.stroke();
      }
      _0x16b27b.restore();
    }
    function _0x3af1d3() {
      var _0x4ab1db = 0;
      for (var _0x3016b9 = 0; _0x3016b9 < _0x1cf585.length; _0x3016b9++) {
        _0x4ab1db += _0x1cf585[_0x3016b9].getScore();
      }
      return _0x4ab1db;
    }
    var hsloRingImage = new Image();
hsloRingImage.src = 'https://taki-mitsuha-build.vercel.app/static/images/hslo_ring.png';

function _0x1cc94d() {
  var _0xbc3d59 = 110;
  var _0x4e8f25 = 35;
  var _0x58813a = 125;
  _0x1afb5a = null;
  var _0x574ace = 200;
  if (_0xd46307 != null) {
    _0x574ace = 200;
  }
  if (_0xd46307 != null || _0x225ef1.length != 0) {
    _0x1afb5a = document.createElement("canvas");
  }
  var _0x3f2f0d = _0x1afb5a.getContext("2d");
  var _0xa0e9cf = _0xbc3d59;
  _0xa0e9cf = _0xd46307 == null ? _0xa0e9cf + _0x225ef1.length * 24 : _0xa0e9cf + 180;
  var _0x581137 = Math.min(_0x84b5f1 * 0.22, Math.min(200, _0x35ab87 * 0.3)) / 200;
  _0x1afb5a.width = _0x574ace * _0x581137;
  _0x1afb5a.height = _0xa0e9cf * _0x581137;
  _0x3f2f0d.scale(_0x581137, _0x581137);
  _0x3f2f0d.globalAlpha = 1;
  _0x3f2f0d.fillStyle = "#FFFFFF";
  var _0x251b42;
  var _0x4d066e = ["#FF0000", "#0002fe", "#33E660", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
  
  if (_0xd46307 == null) {
    // Kazanan kişinin yazısını büyüt ve parlaklık ekle
    _0x3f2f0d.fillStyle = "yellow";
    _0x3f2f0d.font = "bold 24px Ubuntu"; // Yazı boyutunu artır ve kalın yap
    _0x3f2f0d.shadowColor = "yellow"; // Parlaklık efekti için gölge rengi
    _0x3f2f0d.shadowBlur = 10; // Gölge bulanıklığı
    var _0x55f3b9 = new Image();
    _0x55f3b9.onload = function () {
      _0x3f2f0d.drawImage(_0x55f3b9, 70, 0);
    };
    // _0x55f3b9.src = "/imgs/lbfirst.png";
    _0x3f2f0d.fillText(_0x573162, 90 - _0x3f2f0d.measureText(this.lastWinner).width / 2, _0x4e8f25);
    
    // Gölge efektini kaldır
    _0x3f2f0d.shadowColor = "transparent";
    _0x3f2f0d.shadowBlur = 0;

    // Diğer oyuncuların yazı boyutunu normal yap
    _0x3f2f0d.font = "16px Ubuntu";
    for (_0x251b42 = 0; _0x251b42 < _0x225ef1.length; ++_0x251b42) {
      let c = _0x225ef1[_0x251b42].name.split("*")[0] || "Unnamed Cell";
      c = _0x52210d(c)[1];
      if (c == "") {
        c = "Unnamed Cell";
      }
      let isPlayer = _0x1cc1c3.indexOf(_0x225ef1[_0x251b42].id) != -1;
      if (isPlayer) {
        if (_0x1cf585[0].name) {
          c = _0x52210d(_0x1cf585[0].name)[1];
        }
        if (c == "") {
          c = "Unnamed Cell";
        }
        _0x3f2f0d.fillStyle = "#FFD700"; // Bright color for the player
        _0x3f2f0d.shadowColor = "#FFD700"; // Add shadow for brightness effect
        _0x3f2f0d.shadowBlur = 10;
      } else {
        _0x3f2f0d.fillStyle = _0x4d066e[_0x251b42];
        _0x3f2f0d.shadowColor = "transparent"; // Remove shadow for other players
        _0x3f2f0d.shadowBlur = 0;
      }

      // Draw the rank square
      _0x3f2f0d.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black
      _0x3f2f0d.fillRect(10, 70 + _0x251b42 * 25, 30, 20);
      _0x3f2f0d.fillStyle = isPlayer ? "#FFD700" : "#FFFFFF";
      _0x3f2f0d.fillText(_0x251b42 + 1 + ".", 15, 85 + _0x251b42 * 25);

      // Draw the name square
      let nameWidth = _0x3f2f0d.measureText(c).width + 10; // Calculate width based on text length
      _0x3f2f0d.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black
      _0x3f2f0d.fillRect(45, 70 + _0x251b42 * 25, nameWidth, 20);
      _0x3f2f0d.fillStyle = isPlayer ? "#FFD700" : _0x4d066e[_0x251b42];
      _0x3f2f0d.fillText(c, 50, 85 + _0x251b42 * 25);
    }
  } else {
    for (_0x251b42 = c = 0; _0x251b42 < _0xd46307.length; ++_0x251b42) {
      var _0x1d03dd = c + _0xd46307[_0x251b42] * Math.PI * 2;
      _0x3f2f0d.fillStyle = _0x3bf563[_0x251b42 + 1];
      _0x3f2f0d.beginPath();
      _0x3f2f0d.moveTo(100, 140);
      _0x3f2f0d.arc(100, 140, 80, c, _0x1d03dd, false);
      _0x3f2f0d.fill();
      c = _0x1d03dd;
    }
  }
}
    function _0x2b0fa0(_0x39b709, _0x3da54c, _0x6b6308, _0x21a90b, _0x4b5169, _0x2c8a27) {
      this.id = _0x39b709;
      this.ox = this.x = _0x3da54c;
      this.oy = this.y = _0x6b6308;
      this.oSize = this.size = _0x21a90b;
      this.color = _0x4b5169;
      this.points = [];
      this.pointsAcc = [];
      this.createPoints();
      this.setName(_0x2c8a27);
    }
    function _0x2a421a(_0x1b0cd5, _0x3a0236, _0x30be8b, _0x489244) {
      if (_0x1b0cd5) {
        this._size = _0x1b0cd5;
      }
      if (_0x3a0236) {
        this._color = _0x3a0236;
      }
      this._stroke = !!_0x30be8b;
      if (_0x489244) {
        this._strokeColor = _0x489244;
      }
    }
    _0x1154df.playGame = function () {
      _0x4fea95 = 0;
      _0x2bc39b = 0;
      if (document.getElementById("nick").value.trim() == "") {
        alert("Enter a nick");
        return;
      }
      _0x455917();
      if (_0x41adc2 == null || _0x41adc2.readyState == 2 || _0x41adc2.readyState == 3) {
        playGameClickEvent = 1;
        _0xde92b2();
      } else {
        _0x3007c8();
      }
      _0x443ee3 = Date.now();
      _0x40174c = 0;
    };
    _0x1154df.spectate = function () {
      _0x1154df.isSpectating = true;
      _0x455917();
      if (_0x41adc2 == null || _0x41adc2.readyState == 2 || _0x41adc2.readyState == 3) {
        _0xde92b2();
      } else {
        _0x1519d9(1);
      }
    };
    _0x1154df.setHideSkins = function (_0x47d6d5) {
      _0x47d6d5 = document.getElementById("noSkin").checked;
      _0x5d5ae3 = _0x47d6d5;
      localStorage.noSkin = _0x47d6d5;
    };
    _0x1154df.setHideNames = function (_0x558819) {
      _0x558819 = document.getElementById("noNames").checked;
      _0x23ab14 = _0x558819;
      localStorage.noNames = _0x558819;
    };
    _0x1154df.setDarkTheme = function (_0x3974c8) {
      _0x3974c8 = document.getElementById("darkTheme").checked;
      _0x456030 = _0x3974c8;
      localStorage.showDarkTheme = _0x3974c8;
    };
    _0x1154df.setNoColor = function (_0x2a16ec) {
      _0x2a16ec = document.getElementById("noColor").checked;
      _0x319c56 = _0x2a16ec;
      localStorage.noColor = _0x2a16ec;
    };
    _0x1154df.setSmooth = function (_0x4e8408) {
      _0x4e8408 = document.getElementById("smoothRender").checked;
      _0x2582ca = _0x4e8408 ? 2 : 0.4;
      localStorage.smoothRender = _0x4e8408 ? 2 : 0.4;
    };
    _0x1154df.setTransparent = function (_0x4dcbc2) {
      _0x4dcbc2 = document.getElementById("transparentRender").checked;
      _0x7ac7be = _0x4dcbc2;
      localStorage.transparentRender = _0x4dcbc2;
    };
    _0x1154df.setShowScore = function (_0x176b58) {
      _0x176b58 = document.getElementById("showScore").checked;
      _0x16e8c8 = _0x176b58;
      localStorage.showScore = _0x176b58;
    };
    _0x1154df.setSimpleGreen = function (_0xd6833a) {
      _0xd6833a = document.getElementById("simpleGreen").checked;
      _0x2eb996 = _0xd6833a;
      localStorage.simpleGreen = _0xd6833a;
    };
    _0x1154df.setHideChat = function (_0x1a509b) {
      _0x1a509b = document.getElementById("hideChat").checked;
      _0x2653d4 = _0x1a509b;
      localStorage.hideChat = _0x1a509b;
      if (_0x1a509b) {
        document.getElementById("chat_textbox").style.display = "none";
      } else {
        document.getElementById("chat_textbox").style.display = "block";
      }
    };
    _0x1154df.setZoom = function (_0x3b15f3) {
      _0x3b15f3 = document.getElementById("getZoom").checked;
      _0x18263b = _0x3b15f3;
      localStorage.zoom = _0x3b15f3;
    };
    _0x1154df.clearChat = function (_0x23c44f) {
      _0x48203d = [];
    };
    _0x1154df.shareLocation = function (_0x10a4b1) {
      _0x512281("psx2psx2");
    };
// Checkbox'ın durumunu güncelleyen fonksiyon
var hsloRingsEnabled = localStorage.hsloRings === 'true';
var rotationAngle = 0;
var lastTime = Date.now();
// Sayfa yüklendiğinde checkbox'ın durumunu ayarla
document.getElementById('hsloRings').checked = hsloRingsEnabled;

_0x1154df.setHsloRings = function () {
    hsloRingsEnabled = document.getElementById('hsloRings').checked;
    localStorage.hsloRings = hsloRingsEnabled;
  };
    setInterval(function () {
      var _0x91f4f9 = _0x30f669();
      if (_0x91f4f9 != 0) {
        ++_0x2be5c9;
        if (_0x40174c == 0) {
          _0x40174c = _0x91f4f9;
        }
        _0x40174c = Math.min(_0x40174c, _0x91f4f9);
      }
    }, 1000);
    setInterval(function () {
      if (_0x2cbf37()) {
        msg = _0x51333f(5);
        msg.setUint8(0, 90);
        msg.setUint32(1, 123456789, true);
        latency = new Date();
        _0x13b31b(msg);
      }
    }, 1000);
    var _0x6a2dc8 = 500;
    var _0x5668bb = -1;
    var _0x12d92b = -1;
    var _0x19ba49 = null;
    var _0xdce442 = 1;
    var _0x275cab = null;
    var _0x460680 = {};
    var _0x4837a9 = {};
    var _0x4ae9a1 = ["_canvas'blob"];
    _0x2b0fa0.prototype = {
      id: 0,
      points: null,
      pointsAcc: null,
      name: null,
      skinName: null,
      hasSkinName: false,
      nameCache: null,
      sizeCache: null,
      x: 0,
      y: 0,
      size: 0,
      ox: 0,
      oy: 0,
      oSize: 0,
      nx: 0,
      ny: 0,
      nSize: 0,
      flag: 0,
      updateTime: 0,
      updateCode: 0,
      drawTime: 0,
      destroyed: false,
      isVirus: false,
      isAgitated: false,
      wasSimpleDrawing: true,
      destroy: function () {
        var _0x2c9ad8;
        for (_0x2c9ad8 = 0; _0x2c9ad8 < _0x3e0cc8.length; _0x2c9ad8++) {
          if (_0x3e0cc8[_0x2c9ad8] == this) {
            _0x3e0cc8.splice(_0x2c9ad8, 1);
            break;
          }
        }
        delete _0x44d2ff[this.id];
        _0x2c9ad8 = _0x1cf585.indexOf(this);
        if (_0x2c9ad8 != -1) {
          _0x171ae9 = true;
          _0x1cf585.splice(_0x2c9ad8, 1);
        }
        _0x2c9ad8 = _0x1cc1c3.indexOf(this.id);
        if (_0x2c9ad8 != -1) {
          _0x1cc1c3.splice(_0x2c9ad8, 1);
        }
        this.destroyed = true;
        _0x551ae1.push(this);
      },
      getNameSize: function () {
        return Math.max(~~(this.size * 0.3), 24);
      },
      setName: function (_0x33c324) {
        if (this.name = _0x33c324) {
          if (this.nameCache == null) {
            this.nameCache = new _0x2a421a(this.getNameSize(), "#FFFFFF", true, "#000000");
            this.nameCache.setValue(this.name);
          } else {
            this.nameCache.setSize(this.getNameSize());
            this.nameCache.setValue(this.name);
          }
        }
      },
      setSkinName: function (_0x2f2cc1) {
        this.skinName = _0x2f2cc1;
      },
      createPoints: function () {
        for (var _0x4f6652 = this.getNumPoints(); this.points.length > _0x4f6652;) {
          var _0x121419 = ~~(Math.random() * this.points.length);
          this.points.splice(_0x121419, 1);
          this.pointsAcc.splice(_0x121419, 1);
        }
        if (this.points.length == 0 && _0x4f6652 > 0) {
          this.points.push({
            ref: this,
            size: this.size,
            x: this.x,
            y: this.y
          });
          this.pointsAcc.push(Math.random() - 0.5);
        }
        while (this.points.length < _0x4f6652) {
          var _0x51082f = ~~(Math.random() * this.points.length);
          var _0x25a973 = this.points[_0x51082f];
          this.points.splice(_0x51082f, 0, {
            ref: this,
            size: _0x25a973.size,
            x: _0x25a973.x,
            y: _0x25a973.y
          });
          this.pointsAcc.splice(_0x51082f, 0, this.pointsAcc[_0x51082f]);
        }
      },
      getNumPoints: function () {
        if (this.id == 0) {
          return 16;
        }
        var _0xbb338f = 10;
        if (this.size < 20) {
          _0xbb338f = 0;
        }
        if (this.isVirus) {
          _0xbb338f = 30;
        }
        var _0x216633 = this.size;
        if (!this.isVirus) {
          _0x216633 *= _0x1402f0;
        }
        _0x216633 *= _0xdce442;
        if (this.flag & 32) {
          _0x216633 *= 0.25;
        }
        return ~~Math.max(_0x216633, _0xbb338f);
      },
      movePoints: function () {
        this.createPoints();
        var _0x3f9575 = this.points;
        var _0x141f04 = this.pointsAcc;
        for (var _0x374cc3 = _0x3f9575.length, _0x48405f = 0; _0x48405f < _0x374cc3; ++_0x48405f) {
          var _0x46a559 = _0x141f04[(_0x48405f - 1 + _0x374cc3) % _0x374cc3];
          var _0x1bedcf = _0x141f04[(_0x48405f + 1) % _0x374cc3];
          _0x141f04[_0x48405f] += (Math.random() - 0.5) * (this.isAgitated ? 3 : 1);
          _0x141f04[_0x48405f] *= 0.7;
          if (_0x141f04[_0x48405f] > 10) {
            _0x141f04[_0x48405f] = 10;
          }
          if (_0x141f04[_0x48405f] < -10) {
            _0x141f04[_0x48405f] = -10;
          }
          _0x141f04[_0x48405f] = (_0x46a559 + _0x1bedcf + _0x141f04[_0x48405f] * 8) / 10;
        }
        var _0x326611 = this;
        var _0x4c4c63 = this.isVirus ? 0 : (this.id / 1000 + _0x5b1d69 / 10000) % (Math.PI * 2);
        for (var _0x2f658e = 0; _0x2f658e < _0x374cc3; ++_0x2f658e) {
          var _0x4d0969 = _0x3f9575[_0x2f658e].size;
          var _0x963d36 = _0x3f9575[(_0x2f658e - 1 + _0x374cc3) % _0x374cc3].size;
          var _0x40e749 = _0x3f9575[(_0x2f658e + 1) % _0x374cc3].size;
          if (this.size > 15 && _0x2cf3cf != null && this.size * _0x1402f0 > 20 && this.id != 0) {
            var _0x4c3100 = false;
            var _0x31ffe4 = _0x3f9575[_0x2f658e].x;
            var _0x595b4e = _0x3f9575[_0x2f658e].y;
            _0x2cf3cf.retrieve2(_0x31ffe4 - 5, _0x595b4e - 5, 10, 10, function (_0x27dd26) {
              if (_0x27dd26.ref != _0x326611 && (_0x31ffe4 - _0x27dd26.x) * (_0x31ffe4 - _0x27dd26.x) + (_0x595b4e - _0x27dd26.y) * (_0x595b4e - _0x27dd26.y) < 25) {
                _0x4c3100 = true;
              }
            });
            if (!_0x4c3100 && _0x3f9575[_0x2f658e].x < _0x22b0f0 || _0x3f9575[_0x2f658e].y < _0x12d6c2 || _0x3f9575[_0x2f658e].x > _0x55af78 || _0x3f9575[_0x2f658e].y > _0x13322c) {
              _0x4c3100 = true;
            }
            if (_0x4c3100) {
              if (_0x141f04[_0x2f658e] > 0) {
                _0x141f04[_0x2f658e] = 0;
              }
              _0x141f04[_0x2f658e] -= 1;
            }
          }
          _0x4d0969 += _0x141f04[_0x2f658e];
          if (_0x4d0969 < 0) {
            _0x4d0969 = 0;
          }
          _0x4d0969 = this.isAgitated ? (_0x4d0969 * 19 + this.size) / 20 : (_0x4d0969 * 12 + this.size) / 13;
          _0x3f9575[_0x2f658e].size = (_0x963d36 + _0x40e749 + _0x4d0969 * 8) / 10;
          _0x963d36 = Math.PI * 2 / _0x374cc3;
          _0x40e749 = this.points[_0x2f658e].size;
          if (this.isVirus && _0x2f658e % 2 == 0) {
            _0x40e749 += 5;
          }
          _0x3f9575[_0x2f658e].x = this.x + Math.cos(_0x963d36 * _0x2f658e + _0x4c4c63) * _0x40e749;
          _0x3f9575[_0x2f658e].y = this.y + Math.sin(_0x963d36 * _0x2f658e + _0x4c4c63) * _0x40e749;
        }
      },
      updatePos: function () {
        if (this.id == 0) {
          return 1;
        }
        var _0x5cc491;
        _0x5cc491 = (_0x5b1d69 - this.updateTime) / 120;
        _0x5cc491 = _0x5cc491 < 0 ? 0 : _0x5cc491 > 1 ? 1 : _0x5cc491;
        var _0x25d5d5 = _0x5cc491 < 0 ? 0 : _0x5cc491 > 1 ? 1 : _0x5cc491;
        this.getNameSize();
        if (this.destroyed && _0x25d5d5 >= 1) {
          var _0x4be2bb = _0x551ae1.indexOf(this);
          if (_0x4be2bb != -1) {
            _0x551ae1.splice(_0x4be2bb, 1);
          }
        }
        this.x = _0x5cc491 * (this.nx - this.ox) + this.ox;
        this.y = _0x5cc491 * (this.ny - this.oy) + this.oy;
        this.size = _0x25d5d5 * (this.nSize - this.oSize) + this.oSize;
        return _0x25d5d5;
      },
      shouldRender: function () {
        if (this.id == 0) {
          return true;
        } else {
          return !(this.x + this.size + 40 < _0x4f5429 - _0x35ab87 / 2 / _0x1402f0) && !(this.y + this.size + 40 < _0x1f0529 - _0x84b5f1 / 2 / _0x1402f0) && !(this.x - this.size - 40 > _0x4f5429 + _0x35ab87 / 2 / _0x1402f0) && !(this.y - this.size - 40 > _0x1f0529 + _0x84b5f1 / 2 / _0x1402f0);
        }
      },
      getScore: function () {
        var _0x2012c3 = ~~(this.nSize * this.nSize / 100);
        return _0x2012c3;
      },
      drawOneCell: function (_0x4c36dc) {
        if (this.shouldRender()) {
            var _0x3ed467 = this.id != 0 && !this.isVirus && !this.isAgitated && _0x2582ca > _0x1402f0;
            if (this.getNumPoints() < 5) {
                _0x3ed467 = true;
            }
            if (this.wasSimpleDrawing && !_0x3ed467) {
                for (var _0x3640bb = 0; _0x3640bb < this.points.length; _0x3640bb++) {
                    this.points[_0x3640bb].size = this.size;
                }
            }
            this.wasSimpleDrawing = _0x3ed467;
            _0x4c36dc.save();
            this.drawTime = _0x5b1d69;
            _0x3640bb = this.updatePos();
            if (this.destroyed) {
                _0x4c36dc.globalAlpha *= 1 - _0x3640bb;
            }
            _0x4c36dc.lineWidth = 10;
            _0x4c36dc.lineCap = "round";
            _0x4c36dc.lineJoin = this.isVirus ? "miter" : "round";
    
            // Dikenlerin rengini ve boyutunu ayarla
            if (this.isVirus) {
                _0x4c36dc.fillStyle = "rgba(255, 255, 0, 0.5)"; // Dikenlerin rengi sarı ve %50 şeffaf
                _0x4c36dc.strokeStyle = "rgba(255, 255, 0, 0.5)"; // Dikenlerin kenar rengi sarı ve %50 şeffaf
                _0x4c36dc.shadowColor = "rgba(255, 255, 0, 0.5)"; // Dikenlerin gölgesi sarı ve %50 şeffaf
                _0x4c36dc.shadowBlur = 20; // Gölge bulanıklığı
                this.size *= 1.2; // Dikenlerin boyutunu %20 artır
            } else if (!this.name) {
                _0x4c36dc.fillStyle = "#FFFFFF";
                _0x4c36dc.strokeStyle = "#FFFFFF";
                _0x4c36dc.globalAlpha = 0.8; // Make it slightly transparent
                _0x4c36dc.shadowColor = "#FFFFFF"; // White shadow
                _0x4c36dc.shadowBlur = 20; // Blur effect for shining
                this.size *= 0.5; // Make the cell smaller
            } else if (_0x319c56) {
                _0x4c36dc.fillStyle = "#FFFFFF";
                _0x4c36dc.strokeStyle = "#AAAAAA";
            } else {
                _0x4c36dc.fillStyle = this.color;
                _0x4c36dc.strokeStyle = this.color;
            }
    
            if (_0x3ed467 || _0x2eb996 == true) {
                _0x4c36dc.beginPath();
                _0x4c36dc.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            } else {
                this.movePoints();
                _0x4c36dc.beginPath();
                var _0x58f52c = this.getNumPoints();
                _0x4c36dc.moveTo(this.points[0].x, this.points[0].y);
                for (_0x3640bb = 1; _0x3640bb <= _0x58f52c; ++_0x3640bb) {
                    var _0x1cb80f = _0x3640bb % _0x58f52c;
                    _0x4c36dc.lineTo(this.points[_0x1cb80f].x, this.points[_0x1cb80f].y);
                }
            }
            _0x4c36dc.closePath();
            _0x3640bb = null;
            if (!this.isAgitated && !_0x5d5ae3 && _0x33ee7e != ":teams") {
                this.skinName = this.name.toLowerCase();
                li = _0x52210d(this.skinName);
                if (!this.isAgitated && this.skinName != "") {
                    if (!_0x460680.hasOwnProperty(this.skinName)) {
                        _0x460680[this.skinName] = new Image();
                        _0x460680[this.skinName].src = "https://agar.live/skins/" + li[0] + ".png";
                        _0x460680[this.skinName].onload = function () {
                            _0x4837a9[this.src] = true;
                        };
                    }
                    if (_0x460680[this.skinName].width != 0 && _0x460680[this.skinName].complete) {
                        _0x3640bb = _0x460680[this.skinName];
                    } else {
                        _0x3640bb = null;
                    }
                } else {
                    _0x3640bb = null;
                }
            }
            _0x3640bb = (_0x1cb80f = _0x3640bb) ? _0x4ae9a1.indexOf(this.skinName) != -1 : false;
            if (!_0x3ed467) {
                _0x4c36dc.stroke();
            }
            _0x4c36dc.fill();
            if (_0x1cb80f != null && !_0x3640bb) {
                if (_0x4837a9.hasOwnProperty(_0x1cb80f.src)) {
                    _0x4c36dc.save();
                    _0x4c36dc.clip();
                    _0x4c36dc.drawImage(_0x1cb80f, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
                    _0x4c36dc.restore();
                }
            }
            if ((_0x319c56 || this.size > 15) && !_0x3ed467) {
                _0x4c36dc.strokeStyle = "#000000";
                _0x4c36dc.globalAlpha *= 0.1;
                _0x4c36dc.stroke();
            }
            _0x4c36dc.globalAlpha = 1;
            if (_0x1cb80f != null && _0x3640bb) {
                if (_0x4837a9.hasOwnProperty(_0x1cb80f.src)) {
                    _0x4c36dc.drawImage(_0x1cb80f, this.x - this.size * 2, this.y - this.size * 2, this.size * 4, this.size * 4);
                }
            }
    
            function isPlayer(id) {
                for (let i = 0; i < _0x1cf585.length; i++) {
                    if (_0x1cf585[i].id === id) {
                        return true;
                    }
                }
                return false;
            }
    
            // HSLO Ring'i döndürmek için:
            if (hsloRingsEnabled && isPlayer(this.id) && (!_0x23ab14 || _0x3640bb) && this.name && hsloRingImage.complete) {
                var ringSize = this.size * 1.13; // Çerçeve boyutunu hücre boyutundan biraz daha büyük yap
                _0x4c36dc.save();
                
                // Hücrenin merkezine git
                _0x4c36dc.translate(this.x, this.y);
                
                // Zaman tabanlı rotasyon açısını hesapla
                var now = Date.now();
                var deltaTime = (now - lastTime) / 1000; // Saniyeler cinsinden geçen süreyi al
                lastTime = now;
            
                // Döndürme hızını sabitle (örn. saniyede 1 tam tur)
                var rotationSpeed = Math.PI * 2 * 0.06; // Saniyede 0.1 tam tur (yavaş döndürme)
                rotationAngle += rotationSpeed * deltaTime;
            
                // Halkayı merkezde döndür, ve orjinal pozisyonuna getir
                _0x4c36dc.rotate(rotationAngle);
            
                _0x4c36dc.drawImage(hsloRingImage, -ringSize, -ringSize, ringSize * 2, ringSize * 2);
                
                _0x4c36dc.restore();
            }
    
            _0x3640bb = _0x1cf585.indexOf(this) != -1;
            var _0xbf4c18;
            if (this.id != 0) {
                var _0x3ed467 = ~~this.y;
                if ((!_0x23ab14 || _0x3640bb) && this.name) {
                    _0x4c36dc.globalAlpha = 1;
                    _0x4c36dc.font = Math.max(~~(this.size * 0.3), 24) + "px Ubuntu";
                    _0x4c36dc.fillStyle = "#FFF";
                    _0x4c36dc.textAlign = "center";
                    _0x4c36dc.fillText(_0x52210d(this.name)[1], this.x, this.y);
                }
                if (_0x16e8c8 == true && !this.isAgitated && ~~(this.size * this.size / 100) >= 20 && this.isVirus == false) {
                    _0x4c36dc.globalAlpha = 1;
                    _0x4c36dc.font = this.getNameSize() + "px Ubuntu";
                    var _0x467122 = this.getScore() + "";
                    _0x4c36dc.fillStyle = "#FFF";
                    _0x4c36dc.textAlign = "center";
                    _0x4c36dc.textBaseline = "middle";
                    _0x4c36dc.fillText(_0x467122, this.x, this.y + this.getNameSize() + 13);
                }
            }
            _0x4c36dc.restore();
        }
    }
    };
    _0x2a421a.prototype = {
      _value: "",
      _color: "#000000",
      _stroke: false,
      _strokeColor: "#000000",
      _size: 16,
      _canvas: null,
      _ctx: null,
      _dirty: false,
      _scale: 1,
      setSize: function (_0x1670b9) {
        if (this._size != _0x1670b9) {
          this._size = _0x1670b9;
          this._dirty = true;
        }
      },
      setScale: function (_0x16badb) {
        if (this._scale != _0x16badb) {
          this._scale = _0x16badb;
          this._dirty = true;
        }
      },
      setStrokeColor: function (_0x3db234) {
        if (this._strokeColor != _0x3db234) {
          this._strokeColor = _0x3db234;
          this._dirty = true;
        }
      },
      setValue: function (_0x49ffb1) {
        if (_0x49ffb1 != this._value) {
          this._value = _0x49ffb1;
          this._dirty = true;
        }
      },
      render: function () {
        if (this._canvas == null) {
          this._canvas = document.createElement("canvas");
          this._ctx = this._canvas.getContext("2d");
        }
        if (this._dirty) {
          this._dirty = false;
          var _0x5fee74 = this._canvas;
          var _0x2a0428 = this._ctx;
          var _0x1dc48b = this._value;
          var _0x2ff3b7 = this._scale;
          var _0x11da08 = this._size;
          var _0x12c1e6 = _0x11da08 + "px Ubuntu";
          _0x2a0428.font = _0x12c1e6;
          var _0x1e2739 = ~~(_0x11da08 * 0.2);
          _0x5fee74.width = (_0x2a0428.measureText(_0x1dc48b).width + 6) * _0x2ff3b7;
          _0x5fee74.height = (_0x11da08 + _0x1e2739) * _0x2ff3b7;
          _0x2a0428.font = _0x12c1e6;
          _0x2a0428.scale(_0x2ff3b7, _0x2ff3b7);
          _0x2a0428.globalAlpha = 1;
          _0x2a0428.lineWidth = 3;
          _0x2a0428.strokeStyle = this._strokeColor;
          _0x2a0428.fillStyle = this._color;
          if (this._stroke) {
            _0x2a0428.strokeText(_0x1dc48b, 3, _0x11da08 - _0x1e2739 / 2);
          }
          _0x2a0428.fillText(_0x1dc48b, 3, _0x11da08 - _0x1e2739 / 2);
        }
        return this._canvas;
      },
      getWidth: function () {
        return _0x16b27b.measureText(this._value).width + 6;
      }
    };
    Date.now ||= function () {
      return new Date().getTime();
    };
    var _0x2c6038 = {
      init: function (_0x3d1be4) {
        function _0x353e58(_0x482b32, _0x3c1d35, _0x476725, _0x1746eb, _0x36d938) {
          this.x = _0x482b32;
          this.y = _0x3c1d35;
          this.w = _0x476725;
          this.h = _0x1746eb;
          this.depth = _0x36d938;
          this.items = [];
          this.nodes = [];
        }
        var _0x5c1143 = _0x3d1be4.maxChildren || 2;
        var _0x802343 = _0x3d1be4.maxDepth || 4;
        _0x353e58.prototype = {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          depth: 0,
          items: null,
          nodes: null,
          exists: function (_0x254c66) {
            for (var _0x3302df = 0; _0x3302df < this.items.length; ++_0x3302df) {
              var _0x628965 = this.items[_0x3302df];
              if (_0x628965.x >= _0x254c66.x && _0x628965.y >= _0x254c66.y && _0x628965.x < _0x254c66.x + _0x254c66.w && _0x628965.y < _0x254c66.y + _0x254c66.h) {
                return true;
              }
            }
            if (this.nodes.length != 0) {
              var _0x232933 = this;
              return this.findOverlappingNodes(_0x254c66, function (_0xdbd449) {
                return _0x232933.nodes[_0xdbd449].exists(_0x254c66);
              });
            }
            return false;
          },
          retrieve: function (_0x3cf4e8, _0x2ab994) {
            for (var _0x20284e = 0; _0x20284e < this.items.length; ++_0x20284e) {
              _0x2ab994(this.items[_0x20284e]);
            }
            if (this.nodes.length != 0) {
              var _0x519a4a = this;
              this.findOverlappingNodes(_0x3cf4e8, function (_0x5f1b36) {
                _0x519a4a.nodes[_0x5f1b36].retrieve(_0x3cf4e8, _0x2ab994);
              });
            }
          },
          insert: function (_0x204c02) {
            if (this.nodes.length != 0) {
              this.nodes[this.findInsertNode(_0x204c02)].insert(_0x204c02);
            } else if (this.items.length >= _0x5c1143 && this.depth < _0x802343) {
              this.devide();
              this.nodes[this.findInsertNode(_0x204c02)].insert(_0x204c02);
            } else {
              this.items.push(_0x204c02);
            }
          },
          findInsertNode: function (_0x618f9b) {
            if (_0x618f9b.x < this.x + this.w / 2) {
              if (_0x618f9b.y < this.y + this.h / 2) {
                return 0;
              } else {
                return 2;
              }
            } else if (_0x618f9b.y < this.y + this.h / 2) {
              return 1;
            } else {
              return 3;
            }
          },
          findOverlappingNodes: function (_0x2763e8, _0xcb1dd4) {
            if (_0x2763e8.x < this.x + this.w / 2 && (_0x2763e8.y < this.y + this.h / 2 && _0xcb1dd4(0) || _0x2763e8.y >= this.y + this.h / 2 && _0xcb1dd4(2)) || _0x2763e8.x >= this.x + this.w / 2 && (_0x2763e8.y < this.y + this.h / 2 && _0xcb1dd4(1) || _0x2763e8.y >= this.y + this.h / 2 && _0xcb1dd4(3))) {
              return true;
            } else {
              return false;
            }
          },
          devide: function () {
            var _0x3be714 = this.depth + 1;
            var _0x2e66eb = this.w / 2;
            var _0x37b29f = this.h / 2;
            this.nodes.push(new _0x353e58(this.x, this.y, _0x2e66eb, _0x37b29f, _0x3be714));
            this.nodes.push(new _0x353e58(this.x + _0x2e66eb, this.y, _0x2e66eb, _0x37b29f, _0x3be714));
            this.nodes.push(new _0x353e58(this.x, this.y + _0x37b29f, _0x2e66eb, _0x37b29f, _0x3be714));
            this.nodes.push(new _0x353e58(this.x + _0x2e66eb, this.y + _0x37b29f, _0x2e66eb, _0x37b29f, _0x3be714));
            _0x3be714 = this.items;
            this.items = [];
            for (_0x2e66eb = 0; _0x2e66eb < _0x3be714.length; _0x2e66eb++) {
              this.insert(_0x3be714[_0x2e66eb]);
            }
          },
          clear: function () {
            for (var _0x1ce43b = 0; _0x1ce43b < this.nodes.length; _0x1ce43b++) {
              this.nodes[_0x1ce43b].clear();
            }
            this.items.length = 0;
            this.nodes.length = 0;
          }
        };
        var _0x52fbbc = {
          x: 0,
          y: 0,
          w: 0,
          h: 0
        };
        return {
          root: new _0x353e58(_0x3d1be4.minX, _0x3d1be4.minY, _0x3d1be4.maxX - _0x3d1be4.minX, _0x3d1be4.maxY - _0x3d1be4.minY, 0),
          insert: function (_0x572299) {
            this.root.insert(_0x572299);
          },
          retrieve: function (_0x2795f9, _0x3af323) {
            this.root.retrieve(_0x2795f9, _0x3af323);
          },
          retrieve2: function (_0x7d09ff, _0x188754, _0x185b45, _0x23d72, _0x45c804) {
            _0x52fbbc.x = _0x7d09ff;
            _0x52fbbc.y = _0x188754;
            _0x52fbbc.w = _0x185b45;
            _0x52fbbc.h = _0x23d72;
            this.root.retrieve(_0x52fbbc, _0x45c804);
          },
          exists: function (_0x49ce91) {
            return this.root.exists(_0x49ce91);
          },
          clear: function () {
            this.root.clear();
          }
        };
      }
    };
    _0x1154df.onload = _0x2c91e6;
  })(window, window.jQuery);
  (function () {
    var _0x3be2ab = 4;
    var _0x245aa6 = 50;
    function _0x1f677a(_0x550daa) {
      if (_0x550daa.keyCode === 17) {
        for (var _0x5c71e8 = 0; _0x5c71e8 < _0x3be2ab; ++_0x5c71e8) {
          setTimeout(function () {
            window.onkeydown({
              keyCode: 32
            });
            window.onkeyup({
              keyCode: 32
            });
          }, _0x5c71e8 * _0x245aa6);
        }
      }
    }
    window.addEventListener("keydown", _0x1f677a);
  })();
