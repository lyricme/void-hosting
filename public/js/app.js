/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var App, Konami, Navigation, NotfoundView, UnsupportedView, browser_test, cursor, dictionary, engine, log, router, routes, settings, win,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	window.PI = Math.PI;

	window.PI_2 = Math.PI * 2;

	window.PI_HALF = Math.PI * 0.5;

	log = __webpack_require__(2);

	browser_test = __webpack_require__(3);

	engine = __webpack_require__(7);

	router = __webpack_require__(21);

	Navigation = __webpack_require__(93);

	Konami = __webpack_require__(96);

	dictionary = __webpack_require__(38);

	settings = __webpack_require__(10);

	UnsupportedView = __webpack_require__(97);

	NotfoundView = __webpack_require__(99);

	routes = __webpack_require__(22);

	cursor = __webpack_require__(101);

	win = __webpack_require__(9);

	App = (function() {
	  function App() {
	    this.start = bind(this.start, this);
	    this.test = bind(this.test, this);
	    window.c = log;
	    c.enable = true;
	    c.log('%c V O I D', 'background:#000; color: #fff');
	    c.log('%c 	Hi-ReS!', 'background:#000; color: #fff');
	    c.enable = !settings.live;
	    browser_test.set_tests(['desktop', 'WebGL', 'AudioContext']);
	    dictionary.once('loaded', this.test);
	    dictionary.load();
	  }

	  App.prototype.test = function() {
	    var i, len, matched, route, url;
	    url = window.location.pathname.replace(settings.base_path, '');
	    matched = false;
	    for (i = 0, len = routes.length; i < len; i++) {
	      route = routes[i];
	      if (url === route.url) {
	        matched = true;
	        break;
	      }
	    }
	    if (!matched) {
	      this.not_found();
	      return;
	    }
	    if (browser_test.supported()) {
	      return this.supported();
	    } else {
	      return this.unsupported();
	    }
	  };

	  App.prototype.not_found = function() {
	    return new NotfoundView;
	  };

	  App.prototype.unsupported = function() {
	    return new UnsupportedView;
	  };

	  App.prototype.supported = function() {
	    engine.once('loaded', this.start);
	    return engine.setup();
	  };

	  App.prototype.start = function() {
	    new Navigation;
	    new Konami;
	    router.start();
	    return cursor.random();
	  };

	  return App;

	})();

	module.exports = new App;


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	var slice = [].slice;

	module.exports = {
	  enable: false,
	  clear: function() {
	    if ((typeof console !== "undefined" && console !== null) && (console.clear != null)) {
	      return console.clear();
	    }
	  },
	  log: function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    if (this.enable) {
	      if ((typeof console !== "undefined" && console !== null) && (console.log != null) && (console.log.apply != null)) {
	        return console.log.apply(console, args);
	      } else {
	        return console.log(args);
	      }
	    }
	  },
	  debug: function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    if (this.enable) {
	      if ((typeof console !== "undefined" && console !== null) && (console.debug != null) && (console.debug.apply != null)) {
	        return console.debug.apply(console, args);
	      } else {
	        return console.log(args);
	      }
	    }
	  },
	  info: function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    if (this.enable) {
	      if ((typeof console !== "undefined" && console !== null) && (console.info != null) && (console.info.apply != null)) {
	        return console.info.apply(console, args);
	      } else {
	        return console.log(args);
	      }
	    }
	  },
	  warn: function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    if (this.enable) {
	      if ((typeof console !== "undefined" && console !== null) && (console.warn != null) && (console.warn.apply != null)) {
	        return console.warn.apply(console, args);
	      } else {
	        return console.log(args);
	      }
	    }
	  },
	  error: function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    if (this.enable) {
	      if ((typeof console !== "undefined" && console !== null) && (console.error != null) && (console.error.apply != null)) {
	        return console.error.apply(console, args);
	      } else {
	        return console.log(args);
	      }
	    }
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var device;

	device = __webpack_require__(4);

	module.exports = new ((function() {
	  function _Class() {
	    this.detect = new MobileDetect(window.navigator.userAgent);
	    this.tests = {};
	    this.messages = {
	      'WebGL': 'WebGL',
	      'desktop': 'Desktop Browser',
	      'tablet': 'Tablet Browser',
	      'mobile': 'Mobile Browser'
	    };
	  }


	  /*
	  	Specify the tests for this experiment
	  	@param tests [Array]
	   */

	  _Class.prototype.set_tests = function(tests) {
	    var i, len, results, supportsWebGL, test;
	    results = [];
	    for (i = 0, len = tests.length; i < len; i++) {
	      test = tests[i];
	      switch (test) {
	        case 'desktop':
	          if (this.detect.tablet() || this.detect.mobile()) {
	            results.push(this.tests['desktop'] = false);
	          } else {
	            results.push(this.tests['desktop'] = true);
	          }
	          break;
	        case 'tablet':
	          results.push(this.tests['tablet'] = this.detect.tablet());
	          break;
	        case 'mobile':
	          results.push(this.tests['mobile'] = this.detect.mobile());
	          break;
	        case 'AudioContext':
	          results.push(this.tests['AudioContext'] = (window.AudioContext || window.webkitAudioContext) !== void 0);
	          break;
	        case 'WebGL':
	          supportsWebGL = (function() {
	            var e, error;
	            try {
	              return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl");
	            } catch (error) {
	              e = error;
	              return false;
	            }
	          });
	          results.push(this.tests['WebGL'] = supportsWebGL());
	          break;
	        default:
	          results.push(void 0);
	      }
	    }
	    return results;
	  };


	  /*
	  	Browser test
	   */

	  _Class.prototype.browser_test = function() {
	    var log_type, required_version, result;
	    log_type = 'debug';
	    result = true;
	    if (env.BROWSER_SPEC[device.name] != null) {
	      required_version = env.BROWSER_SPEC[device.name];
	      if (device.version < required_version) {
	        result = false;
	        this.message = "Unsupported browser";
	        log_type = 'error';
	      } else {
	        result = true;
	        this.message = "supported";
	      }
	    } else {
	      result = false;
	    }
	    c[log_type]("[BrowserTest] " + this.name + " " + this.version + " " + this.message);
	    return result;
	  };


	  /*
	  	Test the browser against the tests
	   */

	  _Class.prototype.supported = function() {
	    var ref, result, supported, test;
	    result = false;
	    ref = this.tests;
	    for (test in ref) {
	      supported = ref[test];
	      if (supported === false) {
	        result = false;
	        break;
	      }
	      if ((test === 'desktop' || test === 'tablet' || test === 'mobile') && supported) {
	        result = true;
	      }
	    }
	    if (result) {
	      result = this.browser_test();
	    }
	    return result;
	  };

	  return _Class;

	})());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Device, bowser, isMobile;

	bowser = (__webpack_require__(5)).browser;

	isMobile = __webpack_require__(6);

	module.exports = new (Device = (function() {
	  function Device() {
	    this.ie = bowser.msie;
	    this.firefox = bowser.firefox;
	    this.ltie10 = bowser.msie && bowser.version < 10;
	    this.name = bowser.name;
	    this.version = bowser.version;
	    this.mobile = isMobile.phone;
	    this.tablet = isMobile.tablet;
	    this.handheld = isMobile.any;
	    this.device = this.tablet || this.mobile;
	    this.desktop = (this.tablet || this.mobile) === false;
	  }

	  return Device;

	})());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  * Bowser - a browser detector
	  * https://github.com/ded/bowser
	  * MIT License | (c) Dustin Diaz 2014
	  */

	!function (name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
	  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else this[name] = definition()
	}('bowser', function () {
	  /**
	    * See useragents.js for examples of navigator.userAgent
	    */

	  var t = true

	  function detect(ua) {

	    function getFirstMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[1]) || '';
	    }

	    function getSecondMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[2]) || '';
	    }

	    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
	      , likeAndroid = /like android/i.test(ua)
	      , android = !likeAndroid && /android/i.test(ua)
	      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
	      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
	      , tablet = /tablet/i.test(ua)
	      , mobile = !tablet && /[^-]mobi/i.test(ua)
	      , result

	    if (/opera|opr/i.test(ua)) {
	      result = {
	        name: 'Opera'
	      , opera: t
	      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/windows phone/i.test(ua)) {
	      result = {
	        name: 'Windows Phone'
	      , windowsphone: t
	      }
	      if (edgeVersion) {
	        result.msedge = t
	        result.version = edgeVersion
	      }
	      else {
	        result.msie = t
	        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/msie|trident/i.test(ua)) {
	      result = {
	        name: 'Internet Explorer'
	      , msie: t
	      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/chrome.+? edge/i.test(ua)) {
	      result = {
	        name: 'Microsoft Edge'
	      , msedge: t
	      , version: edgeVersion
	      }
	    }
	    else if (/chrome|crios|crmo/i.test(ua)) {
	      result = {
	        name: 'Chrome'
	      , chrome: t
	      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (iosdevice) {
	      result = {
	        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
	      }
	      // WTF: version is not part of user agent in web apps
	      if (versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    }
	    else if (/sailfish/i.test(ua)) {
	      result = {
	        name: 'Sailfish'
	      , sailfish: t
	      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/seamonkey\//i.test(ua)) {
	      result = {
	        name: 'SeaMonkey'
	      , seamonkey: t
	      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/firefox|iceweasel/i.test(ua)) {
	      result = {
	        name: 'Firefox'
	      , firefox: t
	      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
	      }
	      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
	        result.firefoxos = t
	      }
	    }
	    else if (/silk/i.test(ua)) {
	      result =  {
	        name: 'Amazon Silk'
	      , silk: t
	      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (android) {
	      result = {
	        name: 'Android'
	      , version: versionIdentifier
	      }
	    }
	    else if (/phantom/i.test(ua)) {
	      result = {
	        name: 'PhantomJS'
	      , phantom: t
	      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
	      result = {
	        name: 'BlackBerry'
	      , blackberry: t
	      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/(web|hpw)os/i.test(ua)) {
	      result = {
	        name: 'WebOS'
	      , webos: t
	      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
	      };
	      /touchpad\//i.test(ua) && (result.touchpad = t)
	    }
	    else if (/bada/i.test(ua)) {
	      result = {
	        name: 'Bada'
	      , bada: t
	      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/tizen/i.test(ua)) {
	      result = {
	        name: 'Tizen'
	      , tizen: t
	      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/safari/i.test(ua)) {
	      result = {
	        name: 'Safari'
	      , safari: t
	      , version: versionIdentifier
	      }
	    }
	    else {
	      result = {
	        name: getFirstMatch(/^(.*)\/(.*) /),
	        version: getSecondMatch(/^(.*)\/(.*) /)
	     };
	   }

	    // set webkit or gecko flag for browsers based on these engines
	    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
	      result.name = result.name || "Webkit"
	      result.webkit = t
	      if (!result.version && versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    } else if (!result.opera && /gecko\//i.test(ua)) {
	      result.name = result.name || "Gecko"
	      result.gecko = t
	      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
	    }

	    // set OS flags for platforms that have multiple browsers
	    if (!result.msedge && (android || result.silk)) {
	      result.android = t
	    } else if (iosdevice) {
	      result[iosdevice] = t
	      result.ios = t
	    }

	    // OS version extraction
	    var osVersion = '';
	    if (result.windowsphone) {
	      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
	    } else if (iosdevice) {
	      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
	      osVersion = osVersion.replace(/[_\s]/g, '.');
	    } else if (android) {
	      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
	    } else if (result.webos) {
	      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
	    } else if (result.blackberry) {
	      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
	    } else if (result.bada) {
	      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
	    } else if (result.tizen) {
	      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
	    }
	    if (osVersion) {
	      result.osversion = osVersion;
	    }

	    // device type extraction
	    var osMajorVersion = osVersion.split('.')[0];
	    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
	      result.tablet = t
	    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
	      result.mobile = t
	    }

	    // Graded Browser Support
	    // http://developer.yahoo.com/yui/articles/gbs
	    if (result.msedge ||
	        (result.msie && result.version >= 10) ||
	        (result.chrome && result.version >= 20) ||
	        (result.firefox && result.version >= 20.0) ||
	        (result.safari && result.version >= 6) ||
	        (result.opera && result.version >= 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
	        (result.blackberry && result.version >= 10.1)
	        ) {
	      result.a = t;
	    }
	    else if ((result.msie && result.version < 10) ||
	        (result.chrome && result.version < 20) ||
	        (result.firefox && result.version < 20.0) ||
	        (result.safari && result.version < 6) ||
	        (result.opera && result.version < 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
	        ) {
	      result.c = t
	    } else result.x = t

	    return result
	  }

	  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

	  bowser.test = function (browserList) {
	    for (var i = 0; i < browserList.length; ++i) {
	      var browserItem = browserList[i];
	      if (typeof browserItem=== 'string') {
	        if (browserItem in bowser) {
	          return true;
	        }
	      }
	    }
	    return false;
	  }

	  /*
	   * Set our detect method to the main bowser object so we can
	   * reuse it to test other user agents.
	   * This is needed to implement future tests.
	   */
	  bowser._detect = detect;

	  return bowser
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * isMobile.js v0.3.9
	 *
	 * A simple library to detect Apple phones and tablets,
	 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
	 * and any kind of seven inch device, via user agent sniffing.
	 *
	 * @author: Kai Mallea (kmallea@gmail.com)
	 *
	 * @license: http://creativecommons.org/publicdomain/zero/1.0/
	 */
	(function (global) {

	    var apple_phone         = /iPhone/i,
	        apple_ipod          = /iPod/i,
	        apple_tablet        = /iPad/i,
	        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
	        android_tablet      = /Android/i,
	        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
	        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
	        windows_phone       = /IEMobile/i,
	        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
	        other_blackberry    = /BlackBerry/i,
	        other_blackberry_10 = /BB10/i,
	        other_opera         = /Opera Mini/i,
	        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
	        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
	        seven_inch = new RegExp(
	            '(?:' +         // Non-capturing group

	            'Nexus 7' +     // Nexus 7

	            '|' +           // OR

	            'BNTV250' +     // B&N Nook Tablet 7 inch

	            '|' +           // OR

	            'Kindle Fire' + // Kindle Fire

	            '|' +           // OR

	            'Silk' +        // Kindle Fire, Silk Accelerated

	            '|' +           // OR

	            'GT-P1000' +    // Galaxy Tab 7 inch

	            ')',            // End non-capturing group

	            'i');           // Case-insensitive matching

	    var match = function(regex, userAgent) {
	        return regex.test(userAgent);
	    };

	    var IsMobileClass = function(userAgent) {
	        var ua = userAgent || navigator.userAgent;
	        // Facebook mobile app's integrated browser adds a bunch of strings that
	        // match everything. Strip it out if it exists.
	        var tmp = ua.split('[FBAN');
	        if (typeof tmp[1] !== 'undefined') {
	            ua = tmp[0];
	        }

	        this.apple = {
	            phone:  match(apple_phone, ua),
	            ipod:   match(apple_ipod, ua),
	            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
	            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
	        };
	        this.amazon = {
	            phone:  match(amazon_phone, ua),
	            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
	            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
	        };
	        this.android = {
	            phone:  match(amazon_phone, ua) || match(android_phone, ua),
	            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
	            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
	        };
	        this.windows = {
	            phone:  match(windows_phone, ua),
	            tablet: match(windows_tablet, ua),
	            device: match(windows_phone, ua) || match(windows_tablet, ua)
	        };
	        this.other = {
	            blackberry:   match(other_blackberry, ua),
	            blackberry10: match(other_blackberry_10, ua),
	            opera:        match(other_opera, ua),
	            firefox:      match(other_firefox, ua),
	            chrome:       match(other_chrome, ua),
	            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
	        };
	        this.seven_inch = match(seven_inch, ua);
	        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
	        // excludes 'other' devices and ipods, targeting touchscreen phones
	        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
	        // excludes 7 inch devices, classifying as phone or tablet is left to the user
	        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

	        if (typeof window === 'undefined') {
	            return this;
	        }
	    };

	    var instantiate = function() {
	        var IM = new IsMobileClass();
	        IM.Class = IsMobileClass;
	        return IM;
	    };

	    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
	        //node
	        module.exports = IsMobileClass;
	    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
	        //browserify
	        module.exports = instantiate();
	    } else if (true) {
	        //AMD
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (global.isMobile = instantiate()), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        global.isMobile = instantiate();
	    }

	})(this);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Index, cameras, controls, default_scene, gui, happens, renderer, settings, win,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	win = __webpack_require__(9);

	settings = __webpack_require__(10);

	gui = __webpack_require__(11);

	cameras = __webpack_require__(16);

	default_scene = __webpack_require__(17);

	renderer = __webpack_require__(18);

	controls = __webpack_require__(19);

	module.exports = new (Index = (function() {
	  var rS;

	  rS = null;

	  Index.prototype.scene = default_scene;

	  Index.prototype.fov = 80;

	  function Index() {
	    this._resize = bind(this._resize, this);
	    this._update = bind(this._update, this);
	    happens(this);
	  }


	  /*
	  	Public API
	   */

	  Index.prototype.setup = function() {
	    var Save, zoom;
	    this.el = $('#void');

	    /*
	    		Camera
	     */
	    zoom = function(camera, zoom) {
	      camera.position.set(1 * zoom, 0.75 * zoom, 1 * zoom);
	      return camera.lookAt(new THREE.Vector3);
	    };
	    zoom(cameras.dev, 160);

	    /*
	    		Renderer
	     */
	    renderer.setSize(win.width, win.height);
	    this.el.append(renderer.domElement);
	    if (settings.debug) {

	      /*
	      			Helpers
	       */
	      this.scene.add(new THREE.GridHelper(50, 10));
	      this.scene.add(new THREE.AxisHelper(10));
	    }

	    /*
	    		Export images
	     */
	    if (!settings.live) {
	      Save = __webpack_require__(20);
	      this.save = new Save;
	      $(window).on('keydown', (function(_this) {
	        return function(event) {
	          var height, img_scale_x, img_scale_y, render_height, render_scale_x, render_scale_y, render_width, width;
	          img_scale_x = 7;
	          img_scale_y = 7;
	          render_scale_x = 3;
	          render_scale_y = 3;
	          render_width = win.width * render_scale_x;
	          render_height = win.height * render_scale_y;
	          width = win.width * img_scale_x;
	          height = win.height * img_scale_y;
	          if (event.keyCode === 80) {
	            renderer.setSize(render_width, render_height);
	            _this._render(cameras.user, 0, 0, render_scale_x, render_scale_y);
	            renderer.render(_this.scene, cameras.user);
	            return _this.save["export"](width, height);
	          }
	        };
	      })(this));
	    }

	    /*
	    		Controls
	     */
	    this.gui = gui.addFolder('controller::engine');
	    this.gui.add(settings, 'debug');
	    this.gui.open();

	    /*
	    		Bind
	     */
	    this._bind();

	    /*
	    		Start
	     */
	    this._update();
	    return this.emit('loaded');
	  };

	  Index.prototype.set_scene = function(scene, config) {
	    this.scene = scene != null ? scene : default_scene;
	    this.config = config != null ? config : {};
	  };


	  /*
	  	Private API
	   */

	  Index.prototype._bind = function() {
	    return win.on('resize', this._resize);
	  };

	  Index.prototype._update = function() {
	    requestAnimationFrame(this._update);
	    this.emit('update');
	    controls.update();
	    cameras.user.fov = this.fov;
	    if (settings.debug) {
	      this._render(cameras.dev, 0, 0, 1, 1);
	      return this._render(cameras.user, 0, 0, 0.25, 0.25);
	    } else {
	      return this._render(cameras.user, 0, 0, 1, 1);
	    }
	  };

	  Index.prototype._render = function(camera, left, bottom, width, height) {
	    var color;
	    left *= win.width;
	    bottom *= win.height;
	    width *= win.width;
	    height *= win.height;
	    cameras.dev.updateProjectionMatrix();
	    cameras.user.updateProjectionMatrix();
	    renderer.setViewport(left, bottom, width, height);
	    renderer.setScissor(left, bottom, width, height);
	    renderer.enableScissorTest(true);
	    if (settings.debug) {
	      color = 0x121212;
	    } else {
	      color = 0x000000;
	    }
	    renderer.setClearColor(color, 1);
	    if (this.config != null) {
	      if (this.config.has_composer) {

	      } else {
	        return renderer.render(this.scene, camera);
	      }
	    }
	  };

	  Index.prototype._resize = function() {
	    cameras.dev.aspect = win.width / win.height;
	    cameras.user.aspect = win.width / win.height;
	    cameras.dev.updateProjectionMatrix();
	    cameras.user.updateProjectionMatrix();
	    return renderer.setSize(win.width, win.height);
	  };

	  return Index;

	})());


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Module constructor
	 * @param  {Object} target Target object to extends methods and properties into
	 * @return {Object}        Target after with extended methods and properties
	 */
	module.exports = function(target) {
	  target = target || {};
	  for(var prop in Happens)
	    target[prop] = Happens[prop];
	  return target;
	};



	/**
	 * Class Happens
	 * @type {Object}
	 */
	var Happens = {

	  /**
	   * Initializes event
	   * @param  {String} event Event name to initialize
	   * @return {Array}        Initialized event pool
	   */
	  __init: function(event) {
	    var tmp = this.__listeners || (this.__listeners = []);
	    return tmp[event] || (tmp[event] = []);
	  },

	  /**
	   * Adds listener
	   * @param  {String}   event Event name
	   * @param  {Function} fn    Event handler
	   */
	  on: function(event, fn) {
	    validate(fn);
	    this.__init(event).push(fn);
	  },

	  /**
	   * Removes listener
	   * @param  {String}   event Event name
	   * @param  {Function} fn    Event handler
	   */
	  off: function(event, fn) {
	    var pool = this.__init(event);
	    pool.splice(pool.indexOf(fn), 1);
	  },

	  /**
	   * Add listener the fires once and auto-removes itself
	   * @param  {String}   event Event name
	   * @param  {Function} fn    Event handler
	   */
	  once: function(event, fn) {
	    validate(fn);
	    var self = this, wrapper = function() {
	      self.off(event, wrapper);
	      fn.apply(this, arguments);
	    };
	    this.on(event, wrapper );
	  },

	  /**
	   * Emit some event
	   * @param  {String} event Event name -- subsequent params after `event` will
	   * be passed along to the event's handlers
	   */
	  emit: function(event /*, arg1, arg2 */ ) {
	    var i, pool = this.__init(event).slice(0);
	    for(i in pool)
	      pool[i].apply(this, [].slice.call(arguments, 1));
	  }
	};



	/**
	 * Validates if a function exists and is an instanceof Function, and throws
	 * an error if needed
	 * @param  {Function} fn Function to validate
	 */
	function validate(fn) {
	  if(!(fn && fn instanceof Function))
	    throw new Error(fn + ' is not a Function');
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Window, happens,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	Window = (function() {
	  Window.prototype.window = $(window);

	  Window.prototype.width = 0;

	  Window.prototype.height = 0;

	  function Window() {
	    this.resize = bind(this.resize, this);
	    happens(this);
	    this.window.on('resize', this.resize);
	    this.resize();
	  }

	  Window.prototype.resize = function() {
	    this.width = this.window.width();
	    this.height = this.window.height();
	    return this.emit('resize');
	  };

	  return Window;

	})();

	module.exports = new Window;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var settings;

	settings = {
	  debug: env.DEBUG,
	  live: env.LIVE,
	  retina: window.devicePixelRatio === 2,
	  base_path: env.BASE_PATH,
	  share_url: window.location.href
	};

	settings.retina_scale = settings.retina ? 2 : 1;

	module.exports = settings;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var GUI, gui, settings;

	settings = __webpack_require__(10);

	GUI = __webpack_require__(12);

	gui = new GUI;

	window.gui = gui;

	module.exports = gui;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Folder, GUIWrapper, dat, settings;

	settings = __webpack_require__(10);

	if (!settings.live) {
	  dat = __webpack_require__(13);
	  module.exports = dat.GUI;
	} else {
	  Folder = (function() {
	    function Folder() {}

	    Folder.prototype.add = function() {
	      return this;
	    };

	    Folder.prototype.listen = function() {
	      return this;
	    };

	    Folder.prototype.name = function() {
	      return this;
	    };

	    Folder.prototype.open = function() {
	      return this;
	    };

	    Folder.prototype.onChange = function() {
	      return this;
	    };

	    Folder.prototype.addFolder = function() {
	      return new Folder;
	    };

	    Folder.prototype.addColor = function() {
	      return this;
	    };

	    return Folder;

	  })();
	  GUIWrapper = (function() {
	    function GUIWrapper() {}

	    GUIWrapper.prototype.add = function() {
	      return this;
	    };

	    GUIWrapper.prototype.addFolder = function() {
	      return new Folder;
	    };

	    GUIWrapper.prototype.name = function() {
	      return this;
	    };

	    GUIWrapper.prototype.close = function() {
	      return this;
	    };

	    GUIWrapper.prototype.step = function() {
	      return this;
	    };

	    GUIWrapper.prototype.onChange = function() {
	      return this;
	    };

	    GUIWrapper.prototype.setValue = function() {
	      return this;
	    };

	    return GUIWrapper;

	  })();
	  module.exports = GUIWrapper;
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14)
	module.exports.color = __webpack_require__(15)

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */

	/** @namespace */
	var dat = module.exports = dat || {};

	/** @namespace */
	dat.gui = dat.gui || {};

	/** @namespace */
	dat.utils = dat.utils || {};

	/** @namespace */
	dat.controllers = dat.controllers || {};

	/** @namespace */
	dat.dom = dat.dom || {};

	/** @namespace */
	dat.color = dat.color || {};

	dat.utils.css = (function () {
	  return {
	    load: function (url, doc) {
	      doc = doc || document;
	      var link = doc.createElement('link');
	      link.type = 'text/css';
	      link.rel = 'stylesheet';
	      link.href = url;
	      doc.getElementsByTagName('head')[0].appendChild(link);
	    },
	    inject: function(css, doc) {
	      doc = doc || document;
	      var injected = document.createElement('style');
	      injected.type = 'text/css';
	      injected.innerHTML = css;
	      doc.getElementsByTagName('head')[0].appendChild(injected);
	    }
	  }
	})();


	dat.utils.common = (function () {
	  
	  var ARR_EACH = Array.prototype.forEach;
	  var ARR_SLICE = Array.prototype.slice;

	  /**
	   * Band-aid methods for things that should be a lot easier in JavaScript.
	   * Implementation and structure inspired by underscore.js
	   * http://documentcloud.github.com/underscore/
	   */

	  return { 
	    
	    BREAK: {},
	  
	    extend: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (!this.isUndefined(obj[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	      
	    },
	    
	    defaults: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (this.isUndefined(target[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	    
	    },
	    
	    compose: function() {
	      var toCall = ARR_SLICE.call(arguments);
	            return function() {
	              var args = ARR_SLICE.call(arguments);
	              for (var i = toCall.length -1; i >= 0; i--) {
	                args = [toCall[i].apply(this, args)];
	              }
	              return args[0];
	            }
	    },
	    
	    each: function(obj, itr, scope) {

	      
	      if (ARR_EACH && obj.forEach === ARR_EACH) { 
	        
	        obj.forEach(itr, scope);
	        
	      } else if (obj.length === obj.length + 0) { // Is number but not NaN
	        
	        for (var key = 0, l = obj.length; key < l; key++)
	          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
	            return;
	            
	      } else {

	        for (var key in obj) 
	          if (itr.call(scope, obj[key], key) === this.BREAK)
	            return;
	            
	      }
	            
	    },
	    
	    defer: function(fnc) {
	      setTimeout(fnc, 0);
	    },
	    
	    toArray: function(obj) {
	      if (obj.toArray) return obj.toArray();
	      return ARR_SLICE.call(obj);
	    },

	    isUndefined: function(obj) {
	      return obj === undefined;
	    },
	    
	    isNull: function(obj) {
	      return obj === null;
	    },
	    
	    isNaN: function(obj) {
	      return obj !== obj;
	    },
	    
	    isArray: Array.isArray || function(obj) {
	      return obj.constructor === Array;
	    },
	    
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	    
	    isNumber: function(obj) {
	      return obj === obj+0;
	    },
	    
	    isString: function(obj) {
	      return obj === obj+'';
	    },
	    
	    isBoolean: function(obj) {
	      return obj === false || obj === true;
	    },
	    
	    isFunction: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Function]';
	    }
	  
	  };
	    
	})();


	dat.controllers.Controller = (function (common) {

	  /**
	   * @class An "abstract" class that represents a given property of an object.
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var Controller = function(object, property) {

	    this.initialValue = object[property];

	    /**
	     * Those who extend this class will put their DOM elements in here.
	     * @type {DOMElement}
	     */
	    this.domElement = document.createElement('div');

	    /**
	     * The object to manipulate
	     * @type {Object}
	     */
	    this.object = object;

	    /**
	     * The name of the property to manipulate
	     * @type {String}
	     */
	    this.property = property;

	    /**
	     * The function to be called on change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onChange = undefined;

	    /**
	     * The function to be called on finishing change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onFinishChange = undefined;

	  };

	  common.extend(

	      Controller.prototype,

	      /** @lends dat.controllers.Controller.prototype */
	      {

	        /**
	         * Specify that a function fire every time someone changes the value with
	         * this Controller.
	         *
	         * @param {Function} fnc This function will be called whenever the value
	         * is modified via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onChange: function(fnc) {
	          this.__onChange = fnc;
	          return this;
	        },

	        /**
	         * Specify that a function fire every time someone "finishes" changing
	         * the value wih this Controller. Useful for values that change
	         * incrementally like numbers or strings.
	         *
	         * @param {Function} fnc This function will be called whenever
	         * someone "finishes" changing the value via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onFinishChange: function(fnc) {
	          this.__onFinishChange = fnc;
	          return this;
	        },

	        /**
	         * Change the value of <code>object[property]</code>
	         *
	         * @param {Object} newValue The new value of <code>object[property]</code>
	         */
	        setValue: function(newValue) {
	          this.object[this.property] = newValue;
	          if (this.__onChange) {
	            this.__onChange.call(this, newValue);
	          }
	          this.updateDisplay();
	          return this;
	        },

	        /**
	         * Gets the value of <code>object[property]</code>
	         *
	         * @returns {Object} The current value of <code>object[property]</code>
	         */
	        getValue: function() {
	          return this.object[this.property];
	        },

	        /**
	         * Refreshes the visual display of a Controller in order to keep sync
	         * with the object's current value.
	         * @returns {dat.controllers.Controller} this
	         */
	        updateDisplay: function() {
	          return this;
	        },

	        /**
	         * @returns {Boolean} true if the value has deviated from initialValue
	         */
	        isModified: function() {
	          return this.initialValue !== this.getValue()
	        }

	      }

	  );

	  return Controller;


	})(dat.utils.common);


	dat.dom.dom = (function (common) {

	  var EVENT_MAP = {
	    'HTMLEvents': ['change'],
	    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
	    'KeyboardEvents': ['keydown']
	  };

	  var EVENT_MAP_INV = {};
	  common.each(EVENT_MAP, function(v, k) {
	    common.each(v, function(e) {
	      EVENT_MAP_INV[e] = k;
	    });
	  });

	  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

	  function cssValueToPixels(val) {

	    if (val === '0' || common.isUndefined(val)) return 0;

	    var match = val.match(CSS_VALUE_PIXELS);

	    if (!common.isNull(match)) {
	      return parseFloat(match[1]);
	    }

	    // TODO ...ems? %?

	    return 0;

	  }

	  /**
	   * @namespace
	   * @member dat.dom
	   */
	  var dom = {

	    /**
	     * 
	     * @param elem
	     * @param selectable
	     */
	    makeSelectable: function(elem, selectable) {

	      if (elem === undefined || elem.style === undefined) return;

	      elem.onselectstart = selectable ? function() {
	        return false;
	      } : function() {
	      };

	      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
	      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
	      elem.unselectable = selectable ? 'on' : 'off';

	    },

	    /**
	     *
	     * @param elem
	     * @param horizontal
	     * @param vertical
	     */
	    makeFullscreen: function(elem, horizontal, vertical) {

	      if (common.isUndefined(horizontal)) horizontal = true;
	      if (common.isUndefined(vertical)) vertical = true;

	      elem.style.position = 'absolute';

	      if (horizontal) {
	        elem.style.left = 0;
	        elem.style.right = 0;
	      }
	      if (vertical) {
	        elem.style.top = 0;
	        elem.style.bottom = 0;
	      }

	    },

	    /**
	     *
	     * @param elem
	     * @param eventType
	     * @param params
	     */
	    fakeEvent: function(elem, eventType, params, aux) {
	      params = params || {};
	      var className = EVENT_MAP_INV[eventType];
	      if (!className) {
	        throw new Error('Event type ' + eventType + ' not supported.');
	      }
	      var evt = document.createEvent(className);
	      switch (className) {
	        case 'MouseEvents':
	          var clientX = params.x || params.clientX || 0;
	          var clientY = params.y || params.clientY || 0;
	          evt.initMouseEvent(eventType, params.bubbles || false,
	              params.cancelable || true, window, params.clickCount || 1,
	              0, //screen X
	              0, //screen Y
	              clientX, //client X
	              clientY, //client Y
	              false, false, false, false, 0, null);
	          break;
	        case 'KeyboardEvents':
	          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
	          common.defaults(params, {
	            cancelable: true,
	            ctrlKey: false,
	            altKey: false,
	            shiftKey: false,
	            metaKey: false,
	            keyCode: undefined,
	            charCode: undefined
	          });
	          init(eventType, params.bubbles || false,
	              params.cancelable, window,
	              params.ctrlKey, params.altKey,
	              params.shiftKey, params.metaKey,
	              params.keyCode, params.charCode);
	          break;
	        default:
	          evt.initEvent(eventType, params.bubbles || false,
	              params.cancelable || true);
	          break;
	      }
	      common.defaults(evt, aux);
	      elem.dispatchEvent(evt);
	    },

	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    bind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.addEventListener)
	        elem.addEventListener(event, func, bool);
	      else if (elem.attachEvent)
	        elem.attachEvent('on' + event, func);
	      return dom;
	    },

	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    unbind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.removeEventListener)
	        elem.removeEventListener(event, func, bool);
	      else if (elem.detachEvent)
	        elem.detachEvent('on' + event, func);
	      return dom;
	    },

	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    addClass: function(elem, className) {
	      if (elem.className === undefined) {
	        elem.className = className;
	      } else if (elem.className !== className) {
	        var classes = elem.className.split(/ +/);
	        if (classes.indexOf(className) == -1) {
	          classes.push(className);
	          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
	        }
	      }
	      return dom;
	    },

	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    removeClass: function(elem, className) {
	      if (className) {
	        if (elem.className === undefined) {
	          // elem.className = className;
	        } else if (elem.className === className) {
	          elem.removeAttribute('class');
	        } else {
	          var classes = elem.className.split(/ +/);
	          var index = classes.indexOf(className);
	          if (index != -1) {
	            classes.splice(index, 1);
	            elem.className = classes.join(' ');
	          }
	        }
	      } else {
	        elem.className = undefined;
	      }
	      return dom;
	    },

	    hasClass: function(elem, className) {
	      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
	    },

	    /**
	     *
	     * @param elem
	     */
	    getWidth: function(elem) {

	      var style = getComputedStyle(elem);

	      return cssValueToPixels(style['border-left-width']) +
	          cssValueToPixels(style['border-right-width']) +
	          cssValueToPixels(style['padding-left']) +
	          cssValueToPixels(style['padding-right']) +
	          cssValueToPixels(style['width']);
	    },

	    /**
	     *
	     * @param elem
	     */
	    getHeight: function(elem) {

	      var style = getComputedStyle(elem);

	      return cssValueToPixels(style['border-top-width']) +
	          cssValueToPixels(style['border-bottom-width']) +
	          cssValueToPixels(style['padding-top']) +
	          cssValueToPixels(style['padding-bottom']) +
	          cssValueToPixels(style['height']);
	    },

	    /**
	     *
	     * @param elem
	     */
	    getOffset: function(elem) {
	      var offset = {left: 0, top:0};
	      if (elem.offsetParent) {
	        do {
	          offset.left += elem.offsetLeft;
	          offset.top += elem.offsetTop;
	        } while (elem = elem.offsetParent);
	      }
	      return offset;
	    },

	    // http://stackoverflow.com/posts/2684561/revisions
	    /**
	     * 
	     * @param elem
	     */
	    isActive: function(elem) {
	      return elem === document.activeElement && ( elem.type || elem.href );
	    }

	  };

	  return dom;

	})(dat.utils.common);


	dat.controllers.OptionController = (function (Controller, dom, common) {

	  /**
	   * @class Provides a select input to alter the property of an object, using a
	   * list of accepted values.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object|string[]} options A map of labels to acceptable values, or
	   * a list of acceptable string values.
	   *
	   * @member dat.controllers
	   */
	  var OptionController = function(object, property, options) {

	    OptionController.superclass.call(this, object, property);

	    var _this = this;

	    /**
	     * The drop down menu
	     * @ignore
	     */
	    this.__select = document.createElement('select');

	    if (common.isArray(options)) {
	      var map = {};
	      common.each(options, function(element) {
	        map[element] = element;
	      });
	      options = map;
	    }

	    common.each(options, function(value, key) {

	      var opt = document.createElement('option');
	      opt.innerHTML = key;
	      opt.setAttribute('value', value);
	      _this.__select.appendChild(opt);

	    });

	    // Acknowledge original value
	    this.updateDisplay();

	    dom.bind(this.__select, 'change', function() {
	      var desiredValue = this.options[this.selectedIndex].value;
	      _this.setValue(desiredValue);
	    });

	    this.domElement.appendChild(this.__select);

	  };

	  OptionController.superclass = Controller;

	  common.extend(

	      OptionController.prototype,
	      Controller.prototype,

	      {

	        setValue: function(v) {
	          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          return toReturn;
	        },

	        updateDisplay: function() {
	          this.__select.value = this.getValue();
	          return OptionController.superclass.prototype.updateDisplay.call(this);
	        }

	      }

	  );

	  return OptionController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);


	dat.controllers.NumberController = (function (Controller, common) {

	  /**
	   * @class Represents a given property of an object that is a number.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberController = function(object, property, params) {

	    NumberController.superclass.call(this, object, property);

	    params = params || {};

	    this.__min = params.min;
	    this.__max = params.max;
	    this.__step = params.step;

	    if (common.isUndefined(this.__step)) {

	      if (this.initialValue == 0) {
	        this.__impliedStep = 1; // What are we, psychics?
	      } else {
	        // Hey Doug, check this out.
	        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
	      }

	    } else {

	      this.__impliedStep = this.__step;

	    }

	    this.__precision = numDecimals(this.__impliedStep);


	  };

	  NumberController.superclass = Controller;

	  common.extend(

	      NumberController.prototype,
	      Controller.prototype,

	      /** @lends dat.controllers.NumberController.prototype */
	      {

	        setValue: function(v) {

	          if (this.__min !== undefined && v < this.__min) {
	            v = this.__min;
	          } else if (this.__max !== undefined && v > this.__max) {
	            v = this.__max;
	          }

	          if (this.__step !== undefined && v % this.__step != 0) {
	            v = Math.round(v / this.__step) * this.__step;
	          }

	          return NumberController.superclass.prototype.setValue.call(this, v);

	        },

	        /**
	         * Specify a minimum value for <code>object[property]</code>.
	         *
	         * @param {Number} minValue The minimum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        min: function(v) {
	          this.__min = v;
	          return this;
	        },

	        /**
	         * Specify a maximum value for <code>object[property]</code>.
	         *
	         * @param {Number} maxValue The maximum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        max: function(v) {
	          this.__max = v;
	          return this;
	        },

	        /**
	         * Specify a step value that dat.controllers.NumberController
	         * increments by.
	         *
	         * @param {Number} stepValue The step value for
	         * dat.controllers.NumberController
	         * @default if minimum and maximum specified increment is 1% of the
	         * difference otherwise stepValue is 1
	         * @returns {dat.controllers.NumberController} this
	         */
	        step: function(v) {
	          this.__step = v;
	          return this;
	        }

	      }

	  );

	  function numDecimals(x) {
	    x = x.toString();
	    if (x.indexOf('.') > -1) {
	      return x.length - x.indexOf('.') - 1;
	    } else {
	      return 0;
	    }
	  }

	  return NumberController;

	})(dat.controllers.Controller,
	dat.utils.common);


	dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {

	  /**
	   * @class Represents a given property of an object that is a number and
	   * provides an input element with which to manipulate it.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerBox = function(object, property, params) {

	    this.__truncationSuspended = false;

	    NumberControllerBox.superclass.call(this, object, property, params);

	    var _this = this;

	    /**
	     * {Number} Previous mouse y position
	     * @ignore
	     */
	    var prev_y;

	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');

	    // Makes it so manually specified values are not truncated.

	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'mousedown', onMouseDown);
	    dom.bind(this.__input, 'keydown', function(e) {

	      // When pressing entire, you can be as precise as you want.
	      if (e.keyCode === 13) {
	        _this.__truncationSuspended = true;
	        this.blur();
	        _this.__truncationSuspended = false;
	      }

	    });

	    function onChange() {
	      var attempted = parseFloat(_this.__input.value);
	      if (!common.isNaN(attempted)) _this.setValue(attempted);
	    }

	    function onBlur() {
	      onChange();
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }

	    function onMouseDown(e) {
	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);
	      prev_y = e.clientY;
	    }

	    function onMouseDrag(e) {

	      var diff = prev_y - e.clientY;
	      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

	      prev_y = e.clientY;

	    }

	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	    }

	    this.updateDisplay();

	    this.domElement.appendChild(this.__input);

	  };

	  NumberControllerBox.superclass = NumberController;

	  common.extend(

	      NumberControllerBox.prototype,
	      NumberController.prototype,

	      {

	        updateDisplay: function() {

	          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
	          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
	        }

	      }

	  );

	  function roundToDecimal(value, decimals) {
	    var tenTo = Math.pow(10, decimals);
	    return Math.round(value * tenTo) / tenTo;
	  }

	  return NumberControllerBox;

	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.common);


	dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {

	  /**
	   * @class Represents a given property of an object that is a number, contains
	   * a minimum and maximum, and provides a slider element with which to
	   * manipulate it. It should be noted that the slider element is made up of
	   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
	   * <code>&lt;slider&gt;</code> element.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   * 
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Number} minValue Minimum allowed value
	   * @param {Number} maxValue Maximum allowed value
	   * @param {Number} stepValue Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerSlider = function(object, property, min, max, step) {

	    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });

	    var _this = this;

	    this.__background = document.createElement('div');
	    this.__foreground = document.createElement('div');
	    


	    dom.bind(this.__background, 'mousedown', onMouseDown);
	    
	    dom.addClass(this.__background, 'slider');
	    dom.addClass(this.__foreground, 'slider-fg');

	    function onMouseDown(e) {

	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);

	      onMouseDrag(e);
	    }

	    function onMouseDrag(e) {

	      e.preventDefault();

	      var offset = dom.getOffset(_this.__background);
	      var width = dom.getWidth(_this.__background);
	      
	      _this.setValue(
	        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
	      );

	      return false;

	    }

	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }

	    this.updateDisplay();

	    this.__background.appendChild(this.__foreground);
	    this.domElement.appendChild(this.__background);

	  };

	  NumberControllerSlider.superclass = NumberController;

	  /**
	   * Injects default stylesheet for slider elements.
	   */
	  NumberControllerSlider.useDefaultStyles = function() {
	    css.inject(styleSheet);
	  };

	  common.extend(

	      NumberControllerSlider.prototype,
	      NumberController.prototype,

	      {

	        updateDisplay: function() {
	          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
	          this.__foreground.style.width = pct*100+'%';
	          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
	        }

	      }



	  );

	  function map(v, i1, i2, o1, o2) {
	    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
	  }

	  return NumberControllerSlider;
	  
	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.css,
	dat.utils.common,
	".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");


	dat.controllers.FunctionController = (function (Controller, dom, common) {

	  /**
	   * @class Provides a GUI interface to fire a specified method, a property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var FunctionController = function(object, property, text) {

	    FunctionController.superclass.call(this, object, property);

	    var _this = this;

	    this.__button = document.createElement('div');
	    this.__button.innerHTML = text === undefined ? 'Fire' : text;
	    dom.bind(this.__button, 'click', function(e) {
	      e.preventDefault();
	      _this.fire();
	      return false;
	    });

	    dom.addClass(this.__button, 'button');

	    this.domElement.appendChild(this.__button);


	  };

	  FunctionController.superclass = Controller;

	  common.extend(

	      FunctionController.prototype,
	      Controller.prototype,
	      {
	        
	        fire: function() {
	          if (this.__onChange) {
	            this.__onChange.call(this);
	          }
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          this.getValue().call(this.object);
	        }
	      }

	  );

	  return FunctionController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);


	dat.controllers.BooleanController = (function (Controller, dom, common) {

	  /**
	   * @class Provides a checkbox input to alter the boolean property of an object.
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var BooleanController = function(object, property) {

	    BooleanController.superclass.call(this, object, property);

	    var _this = this;
	    this.__prev = this.getValue();

	    this.__checkbox = document.createElement('input');
	    this.__checkbox.setAttribute('type', 'checkbox');


	    dom.bind(this.__checkbox, 'change', onChange, false);

	    this.domElement.appendChild(this.__checkbox);

	    // Match original value
	    this.updateDisplay();

	    function onChange() {
	      _this.setValue(!_this.__prev);
	    }

	  };

	  BooleanController.superclass = Controller;

	  common.extend(

	      BooleanController.prototype,
	      Controller.prototype,

	      {

	        setValue: function(v) {
	          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          this.__prev = this.getValue();
	          return toReturn;
	        },

	        updateDisplay: function() {
	          
	          if (this.getValue() === true) {
	            this.__checkbox.setAttribute('checked', 'checked');
	            this.__checkbox.checked = true;    
	          } else {
	              this.__checkbox.checked = false;
	          }

	          return BooleanController.superclass.prototype.updateDisplay.call(this);

	        }


	      }

	  );

	  return BooleanController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);


	dat.color.toString = (function (common) {

	  return function(color) {

	    if (color.a == 1 || common.isUndefined(color.a)) {

	      var s = color.hex.toString(16);
	      while (s.length < 6) {
	        s = '0' + s;
	      }

	      return '#' + s;

	    } else {

	      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

	    }

	  }

	})(dat.utils.common);


	dat.color.interpret = (function (toString, common) {

	  var result, toReturn;

	  var interpret = function() {

	    toReturn = false;

	    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

	    common.each(INTERPRETATIONS, function(family) {

	      if (family.litmus(original)) {

	        common.each(family.conversions, function(conversion, conversionName) {

	          result = conversion.read(original);

	          if (toReturn === false && result !== false) {
	            toReturn = result;
	            result.conversionName = conversionName;
	            result.conversion = conversion;
	            return common.BREAK;

	          }

	        });

	        return common.BREAK;

	      }

	    });

	    return toReturn;

	  };

	  var INTERPRETATIONS = [

	    // Strings
	    {

	      litmus: common.isString,

	      conversions: {

	        THREE_CHAR_HEX: {

	          read: function(original) {

	            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	            if (test === null) return false;

	            return {
	              space: 'HEX',
	              hex: parseInt(
	                  '0x' +
	                      test[1].toString() + test[1].toString() +
	                      test[2].toString() + test[2].toString() +
	                      test[3].toString() + test[3].toString())
	            };

	          },

	          write: toString

	        },

	        SIX_CHAR_HEX: {

	          read: function(original) {

	            var test = original.match(/^#([A-F0-9]{6})$/i);
	            if (test === null) return false;

	            return {
	              space: 'HEX',
	              hex: parseInt('0x' + test[1].toString())
	            };

	          },

	          write: toString

	        },

	        CSS_RGB: {

	          read: function(original) {

	            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	            if (test === null) return false;

	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3])
	            };

	          },

	          write: toString

	        },

	        CSS_RGBA: {

	          read: function(original) {

	            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
	            if (test === null) return false;

	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3]),
	              a: parseFloat(test[4])
	            };

	          },

	          write: toString

	        }

	      }

	    },

	    // Numbers
	    {

	      litmus: common.isNumber,

	      conversions: {

	        HEX: {
	          read: function(original) {
	            return {
	              space: 'HEX',
	              hex: original,
	              conversionName: 'HEX'
	            }
	          },

	          write: function(color) {
	            return color.hex;
	          }
	        }

	      }

	    },

	    // Arrays
	    {

	      litmus: common.isArray,

	      conversions: {

	        RGB_ARRAY: {
	          read: function(original) {
	            if (original.length != 3) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2]
	            };
	          },

	          write: function(color) {
	            return [color.r, color.g, color.b];
	          }

	        },

	        RGBA_ARRAY: {
	          read: function(original) {
	            if (original.length != 4) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2],
	              a: original[3]
	            };
	          },

	          write: function(color) {
	            return [color.r, color.g, color.b, color.a];
	          }

	        }

	      }

	    },

	    // Objects
	    {

	      litmus: common.isObject,

	      conversions: {

	        RGBA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b,
	                a: original.a
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: color.a
	            }
	          }
	        },

	        RGB_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b
	            }
	          }
	        },

	        HSVA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v,
	                a: original.a
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v,
	              a: color.a
	            }
	          }
	        },

	        HSV_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v
	            }
	          }

	        }

	      }

	    }


	  ];

	  return interpret;


	})(dat.color.toString,
	dat.utils.common);


	dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {

	  css.inject(styleSheet);

	  /** Outer-most className for GUI's */
	  var CSS_NAMESPACE = 'dg';

	  var HIDE_KEY_CODE = 72;

	  /** The only value shared between the JS and SCSS. Use caution. */
	  var CLOSE_BUTTON_HEIGHT = 20;

	  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

	  var SUPPORTS_LOCAL_STORAGE = (function() {
	    try {
	      return 'localStorage' in window && window['localStorage'] !== null;
	    } catch (e) {
	      return false;
	    }
	  })();

	  var SAVE_DIALOGUE;

	  /** Have we yet to create an autoPlace GUI? */
	  var auto_place_virgin = true;

	  /** Fixed position div that auto place GUI's go inside */
	  var auto_place_container;

	  /** Are we hiding the GUI's ? */
	  var hide = false;

	  /** GUI's which should be hidden */
	  var hideable_guis = [];

	  /**
	   * A lightweight controller library for JavaScript. It allows you to easily
	   * manipulate variables and fire functions on the fly.
	   * @class
	   *
	   * @member dat.gui
	   *
	   * @param {Object} [params]
	   * @param {String} [params.name] The name of this GUI.
	   * @param {Object} [params.load] JSON object representing the saved state of
	   * this GUI.
	   * @param {Boolean} [params.auto=true]
	   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
	   * @param {Boolean} [params.closed] If true, starts closed
	   */
	  var GUI = function(params) {

	    var _this = this;

	    /**
	     * Outermost DOM Element
	     * @type DOMElement
	     */
	    this.domElement = document.createElement('div');
	    this.__ul = document.createElement('ul');
	    this.domElement.appendChild(this.__ul);

	    dom.addClass(this.domElement, CSS_NAMESPACE);

	    /**
	     * Nested GUI's by name
	     * @ignore
	     */
	    this.__folders = {};

	    this.__controllers = [];

	    /**
	     * List of objects I'm remembering for save, only used in top level GUI
	     * @ignore
	     */
	    this.__rememberedObjects = [];

	    /**
	     * Maps the index of remembered objects to a map of controllers, only used
	     * in top level GUI.
	     *
	     * @private
	     * @ignore
	     *
	     * @example
	     * [
	     *  {
	     *    propertyName: Controller,
	     *    anotherPropertyName: Controller
	     *  },
	     *  {
	     *    propertyName: Controller
	     *  }
	     * ]
	     */
	    this.__rememberedObjectIndecesToControllers = [];

	    this.__listening = [];

	    params = params || {};

	    // Default parameters
	    params = common.defaults(params, {
	      autoPlace: true,
	      width: GUI.DEFAULT_WIDTH
	    });

	    params = common.defaults(params, {
	      resizable: params.autoPlace,
	      hideable: params.autoPlace
	    });


	    if (!common.isUndefined(params.load)) {

	      // Explicit preset
	      if (params.preset) params.load.preset = params.preset;

	    } else {

	      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };

	    }

	    if (common.isUndefined(params.parent) && params.hideable) {
	      hideable_guis.push(this);
	    }

	    // Only root level GUI's are resizable.
	    params.resizable = common.isUndefined(params.parent) && params.resizable;


	    if (params.autoPlace && common.isUndefined(params.scrollable)) {
	      params.scrollable = true;
	    }
	//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

	    // Not part of params because I don't want people passing this in via
	    // constructor. Should be a 'remembered' value.
	    var use_local_storage =
	        SUPPORTS_LOCAL_STORAGE &&
	            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

	    Object.defineProperties(this,

	        /** @lends dat.gui.GUI.prototype */
	        {

	          /**
	           * The parent <code>GUI</code>
	           * @type dat.gui.GUI
	           */
	          parent: {
	            get: function() {
	              return params.parent;
	            }
	          },

	          scrollable: {
	            get: function() {
	              return params.scrollable;
	            }
	          },

	          /**
	           * Handles <code>GUI</code>'s element placement for you
	           * @type Boolean
	           */
	          autoPlace: {
	            get: function() {
	              return params.autoPlace;
	            }
	          },

	          /**
	           * The identifier for a set of saved values
	           * @type String
	           */
	          preset: {

	            get: function() {
	              if (_this.parent) {
	                return _this.getRoot().preset;
	              } else {
	                return params.load.preset;
	              }
	            },

	            set: function(v) {
	              if (_this.parent) {
	                _this.getRoot().preset = v;
	              } else {
	                params.load.preset = v;
	              }
	              setPresetSelectIndex(this);
	              _this.revert();
	            }

	          },

	          /**
	           * The width of <code>GUI</code> element
	           * @type Number
	           */
	          width: {
	            get: function() {
	              return params.width;
	            },
	            set: function(v) {
	              params.width = v;
	              setWidth(_this, v);
	            }
	          },

	          /**
	           * The name of <code>GUI</code>. Used for folders. i.e
	           * a folder's name
	           * @type String
	           */
	          name: {
	            get: function() {
	              return params.name;
	            },
	            set: function(v) {
	              // TODO Check for collisions among sibling folders
	              params.name = v;
	              if (title_row_name) {
	                title_row_name.innerHTML = params.name;
	              }
	            }
	          },

	          /**
	           * Whether the <code>GUI</code> is collapsed or not
	           * @type Boolean
	           */
	          closed: {
	            get: function() {
	              return params.closed;
	            },
	            set: function(v) {
	              params.closed = v;
	              if (params.closed) {
	                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
	              } else {
	                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
	              }
	              // For browsers that aren't going to respect the CSS transition,
	              // Lets just check our height against the window height right off
	              // the bat.
	              this.onResize();

	              if (_this.__closeButton) {
	                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
	              }
	            }
	          },

	          /**
	           * Contains all presets
	           * @type Object
	           */
	          load: {
	            get: function() {
	              return params.load;
	            }
	          },

	          /**
	           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
	           * <code>remember</code>ing
	           * @type Boolean
	           */
	          useLocalStorage: {

	            get: function() {
	              return use_local_storage;
	            },
	            set: function(bool) {
	              if (SUPPORTS_LOCAL_STORAGE) {
	                use_local_storage = bool;
	                if (bool) {
	                  dom.bind(window, 'unload', saveToLocalStorage);
	                } else {
	                  dom.unbind(window, 'unload', saveToLocalStorage);
	                }
	                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
	              }
	            }

	          }

	        });

	    // Are we a root level GUI?
	    if (common.isUndefined(params.parent)) {

	      params.closed = false;

	      dom.addClass(this.domElement, GUI.CLASS_MAIN);
	      dom.makeSelectable(this.domElement, false);

	      // Are we supposed to be loading locally?
	      if (SUPPORTS_LOCAL_STORAGE) {

	        if (use_local_storage) {

	          _this.useLocalStorage = true;

	          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

	          if (saved_gui) {
	            params.load = JSON.parse(saved_gui);
	          }

	        }

	      }

	      this.__closeButton = document.createElement('div');
	      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
	      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
	      this.domElement.appendChild(this.__closeButton);

	      dom.bind(this.__closeButton, 'click', function() {

	        _this.closed = !_this.closed;


	      });


	      // Oh, you're a nested GUI!
	    } else {

	      if (params.closed === undefined) {
	        params.closed = true;
	      }

	      var title_row_name = document.createTextNode(params.name);
	      dom.addClass(title_row_name, 'controller-name');

	      var title_row = addRow(_this, title_row_name);

	      var on_click_title = function(e) {
	        e.preventDefault();
	        _this.closed = !_this.closed;
	        return false;
	      };

	      dom.addClass(this.__ul, GUI.CLASS_CLOSED);

	      dom.addClass(title_row, 'title');
	      dom.bind(title_row, 'click', on_click_title);

	      if (!params.closed) {
	        this.closed = false;
	      }

	    }

	    if (params.autoPlace) {

	      if (common.isUndefined(params.parent)) {

	        if (auto_place_virgin) {
	          auto_place_container = document.createElement('div');
	          dom.addClass(auto_place_container, CSS_NAMESPACE);
	          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
	          document.body.appendChild(auto_place_container);
	          auto_place_virgin = false;
	        }

	        // Put it in the dom for you.
	        auto_place_container.appendChild(this.domElement);

	        // Apply the auto styles
	        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);

	      }


	      // Make it not elastic.
	      if (!this.parent) setWidth(_this, params.width);

	    }

	    dom.bind(window, 'resize', function() { _this.onResize() });
	    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
	    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
	    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
	    this.onResize();


	    if (params.resizable) {
	      addResizeHandle(this);
	    }

	    function saveToLocalStorage() {
	      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
	    }

	    var root = _this.getRoot();
	    function resetWidth() {
	        var root = _this.getRoot();
	        root.width += 1;
	        common.defer(function() {
	          root.width -= 1;
	        });
	      }

	      if (!params.parent) {
	        resetWidth();
	      }

	  };

	  GUI.toggleHide = function() {

	    hide = !hide;
	    common.each(hideable_guis, function(gui) {
	      gui.domElement.style.zIndex = hide ? -999 : 999;
	      gui.domElement.style.opacity = hide ? 0 : 1;
	    });
	  };

	  GUI.CLASS_AUTO_PLACE = 'a';
	  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
	  GUI.CLASS_MAIN = 'main';
	  GUI.CLASS_CONTROLLER_ROW = 'cr';
	  GUI.CLASS_TOO_TALL = 'taller-than-window';
	  GUI.CLASS_CLOSED = 'closed';
	  GUI.CLASS_CLOSE_BUTTON = 'close-button';
	  GUI.CLASS_DRAG = 'drag';

	  GUI.DEFAULT_WIDTH = 245;
	  GUI.TEXT_CLOSED = 'Close Controls';
	  GUI.TEXT_OPEN = 'Open Controls';

	  dom.bind(window, 'keydown', function(e) {

	    if (document.activeElement.type !== 'text' &&
	        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
	      GUI.toggleHide();
	    }

	  }, false);

	  common.extend(

	      GUI.prototype,

	      /** @lends dat.gui.GUI */
	      {

	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.Controller} The new controller that was added.
	         * @instance
	         */
	        add: function(object, property) {

	          return add(
	              this,
	              object,
	              property,
	              {
	                factoryArgs: Array.prototype.slice.call(arguments, 2)
	              }
	          );

	        },

	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.ColorController} The new controller that was added.
	         * @instance
	         */
	        addColor: function(object, property) {

	          return add(
	              this,
	              object,
	              property,
	              {
	                color: true
	              }
	          );

	        },

	        /**
	         * @param controller
	         * @instance
	         */
	        remove: function(controller) {

	          // TODO listening?
	          this.__ul.removeChild(controller.__li);
	          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
	          var _this = this;
	          common.defer(function() {
	            _this.onResize();
	          });

	        },

	        destroy: function() {

	          if (this.autoPlace) {
	            auto_place_container.removeChild(this.domElement);
	          }

	        },

	        /**
	         * @param name
	         * @returns {dat.gui.GUI} The new folder.
	         * @throws {Error} if this GUI already has a folder by the specified
	         * name
	         * @instance
	         */
	        addFolder: function(name) {

	          // We have to prevent collisions on names in order to have a key
	          // by which to remember saved values
	          if (this.__folders[name] !== undefined) {
	            throw new Error('You already have a folder in this GUI by the' +
	                ' name "' + name + '"');
	          }

	          var new_gui_params = { name: name, parent: this };

	          // We need to pass down the autoPlace trait so that we can
	          // attach event listeners to open/close folder actions to
	          // ensure that a scrollbar appears if the window is too short.
	          new_gui_params.autoPlace = this.autoPlace;

	          // Do we have saved appearance data for this folder?

	          if (this.load && // Anything loaded?
	              this.load.folders && // Was my parent a dead-end?
	              this.load.folders[name]) { // Did daddy remember me?

	            // Start me closed if I was closed
	            new_gui_params.closed = this.load.folders[name].closed;

	            // Pass down the loaded data
	            new_gui_params.load = this.load.folders[name];

	          }

	          var gui = new GUI(new_gui_params);
	          this.__folders[name] = gui;

	          var li = addRow(this, gui.domElement);
	          dom.addClass(li, 'folder');
	          return gui;

	        },

	        open: function() {
	          this.closed = false;
	        },

	        close: function() {
	          this.closed = true;
	        },

	        onResize: function() {

	          var root = this.getRoot();

	          if (root.scrollable) {

	            var top = dom.getOffset(root.__ul).top;
	            var h = 0;

	            common.each(root.__ul.childNodes, function(node) {
	              if (! (root.autoPlace && node === root.__save_row))
	                h += dom.getHeight(node);
	            });

	            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
	              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
	            } else {
	              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = 'auto';
	            }

	          }

	          if (root.__resize_handle) {
	            common.defer(function() {
	              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
	            });
	          }

	          if (root.__closeButton) {
	            root.__closeButton.style.width = root.width + 'px';
	          }

	        },

	        /**
	         * Mark objects for saving. The order of these objects cannot change as
	         * the GUI grows. When remembering new objects, append them to the end
	         * of the list.
	         *
	         * @param {Object...} objects
	         * @throws {Error} if not called on a top level GUI.
	         * @instance
	         */
	        remember: function() {

	          if (common.isUndefined(SAVE_DIALOGUE)) {
	            SAVE_DIALOGUE = new CenteredDiv();
	            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
	          }

	          if (this.parent) {
	            throw new Error("You can only call remember on a top level GUI.");
	          }

	          var _this = this;

	          common.each(Array.prototype.slice.call(arguments), function(object) {
	            if (_this.__rememberedObjects.length == 0) {
	              addSaveMenu(_this);
	            }
	            if (_this.__rememberedObjects.indexOf(object) == -1) {
	              _this.__rememberedObjects.push(object);
	            }
	          });

	          if (this.autoPlace) {
	            // Set save row width
	            setWidth(this, this.width);
	          }

	        },

	        /**
	         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
	         * @instance
	         */
	        getRoot: function() {
	          var gui = this;
	          while (gui.parent) {
	            gui = gui.parent;
	          }
	          return gui;
	        },

	        /**
	         * @returns {Object} a JSON object representing the current state of
	         * this GUI as well as its remembered properties.
	         * @instance
	         */
	        getSaveObject: function() {

	          var toReturn = this.load;

	          toReturn.closed = this.closed;

	          // Am I remembering any values?
	          if (this.__rememberedObjects.length > 0) {

	            toReturn.preset = this.preset;

	            if (!toReturn.remembered) {
	              toReturn.remembered = {};
	            }

	            toReturn.remembered[this.preset] = getCurrentPreset(this);

	          }

	          toReturn.folders = {};
	          common.each(this.__folders, function(element, key) {
	            toReturn.folders[key] = element.getSaveObject();
	          });

	          return toReturn;

	        },

	        save: function() {

	          if (!this.load.remembered) {
	            this.load.remembered = {};
	          }

	          this.load.remembered[this.preset] = getCurrentPreset(this);
	          markPresetModified(this, false);

	        },

	        saveAs: function(presetName) {

	          if (!this.load.remembered) {

	            // Retain default values upon first save
	            this.load.remembered = {};
	            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);

	          }

	          this.load.remembered[presetName] = getCurrentPreset(this);
	          this.preset = presetName;
	          addPresetOption(this, presetName, true);

	        },

	        revert: function(gui) {

	          common.each(this.__controllers, function(controller) {
	            // Make revert work on Default.
	            if (!this.getRoot().load.remembered) {
	              controller.setValue(controller.initialValue);
	            } else {
	              recallSavedValue(gui || this.getRoot(), controller);
	            }
	          }, this);

	          common.each(this.__folders, function(folder) {
	            folder.revert(folder);
	          });

	          if (!gui) {
	            markPresetModified(this.getRoot(), false);
	          }


	        },

	        listen: function(controller) {

	          var init = this.__listening.length == 0;
	          this.__listening.push(controller);
	          if (init) updateDisplays(this.__listening);

	        }

	      }

	  );

	  function add(gui, object, property, params) {

	    if (object[property] === undefined) {
	      throw new Error("Object " + object + " has no property \"" + property + "\"");
	    }

	    var controller;

	    if (params.color) {

	      controller = new ColorController(object, property);

	    } else {

	      var factoryArgs = [object,property].concat(params.factoryArgs);
	      controller = controllerFactory.apply(gui, factoryArgs);

	    }

	    if (params.before instanceof Controller) {
	      params.before = params.before.__li;
	    }

	    recallSavedValue(gui, controller);

	    dom.addClass(controller.domElement, 'c');

	    var name = document.createElement('span');
	    dom.addClass(name, 'property-name');
	    name.innerHTML = controller.property;

	    var container = document.createElement('div');
	    container.appendChild(name);
	    container.appendChild(controller.domElement);

	    var li = addRow(gui, container, params.before);

	    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
	    dom.addClass(li, typeof controller.getValue());

	    augmentController(gui, li, controller);

	    gui.__controllers.push(controller);

	    return controller;

	  }

	  /**
	   * Add a row to the end of the GUI or before another row.
	   *
	   * @param gui
	   * @param [dom] If specified, inserts the dom content in the new row
	   * @param [liBefore] If specified, places the new row before another row
	   */
	  function addRow(gui, dom, liBefore) {
	    var li = document.createElement('li');
	    if (dom) li.appendChild(dom);
	    if (liBefore) {
	      gui.__ul.insertBefore(li, params.before);
	    } else {
	      gui.__ul.appendChild(li);
	    }
	    gui.onResize();
	    return li;
	  }

	  function augmentController(gui, li, controller) {

	    controller.__li = li;
	    controller.__gui = gui;

	    common.extend(controller, {

	      options: function(options) {

	        if (arguments.length > 1) {
	          controller.remove();

	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [common.toArray(arguments)]
	              }
	          );

	        }

	        if (common.isArray(options) || common.isObject(options)) {
	          controller.remove();

	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [options]
	              }
	          );

	        }

	      },

	      name: function(v) {
	        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
	        return controller;
	      },

	      listen: function() {
	        controller.__gui.listen(controller);
	        return controller;
	      },

	      remove: function() {
	        controller.__gui.remove(controller);
	        return controller;
	      }

	    });

	    // All sliders should be accompanied by a box.
	    if (controller instanceof NumberControllerSlider) {

	      var box = new NumberControllerBox(controller.object, controller.property,
	          { min: controller.__min, max: controller.__max, step: controller.__step });

	      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
	        var pc = controller[method];
	        var pb = box[method];
	        controller[method] = box[method] = function() {
	          var args = Array.prototype.slice.call(arguments);
	          pc.apply(controller, args);
	          return pb.apply(box, args);
	        }
	      });

	      dom.addClass(li, 'has-slider');
	      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);

	    }
	    else if (controller instanceof NumberControllerBox) {

	      var r = function(returned) {

	        // Have we defined both boundaries?
	        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {

	          // Well, then lets just replace this with a slider.
	          controller.remove();
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [controller.__min, controller.__max, controller.__step]
	              });

	        }

	        return returned;

	      };

	      controller.min = common.compose(r, controller.min);
	      controller.max = common.compose(r, controller.max);

	    }
	    else if (controller instanceof BooleanController) {

	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__checkbox, 'click');
	      });

	      dom.bind(controller.__checkbox, 'click', function(e) {
	        e.stopPropagation(); // Prevents double-toggle
	      })

	    }
	    else if (controller instanceof FunctionController) {

	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__button, 'click');
	      });

	      dom.bind(li, 'mouseover', function() {
	        dom.addClass(controller.__button, 'hover');
	      });

	      dom.bind(li, 'mouseout', function() {
	        dom.removeClass(controller.__button, 'hover');
	      });

	    }
	    else if (controller instanceof ColorController) {

	      dom.addClass(li, 'color');
	      controller.updateDisplay = common.compose(function(r) {
	        li.style.borderLeftColor = controller.__color.toString();
	        return r;
	      }, controller.updateDisplay);

	      controller.updateDisplay();

	    }

	    controller.setValue = common.compose(function(r) {
	      if (gui.getRoot().__preset_select && controller.isModified()) {
	        markPresetModified(gui.getRoot(), true);
	      }
	      return r;
	    }, controller.setValue);

	  }

	  function recallSavedValue(gui, controller) {

	    // Find the topmost GUI, that's where remembered objects live.
	    var root = gui.getRoot();

	    // Does the object we're controlling match anything we've been told to
	    // remember?
	    var matched_index = root.__rememberedObjects.indexOf(controller.object);

	    // Why yes, it does!
	    if (matched_index != -1) {

	      // Let me fetch a map of controllers for thcommon.isObject.
	      var controller_map =
	          root.__rememberedObjectIndecesToControllers[matched_index];

	      // Ohp, I believe this is the first controller we've created for this
	      // object. Lets make the map fresh.
	      if (controller_map === undefined) {
	        controller_map = {};
	        root.__rememberedObjectIndecesToControllers[matched_index] =
	            controller_map;
	      }

	      // Keep track of this controller
	      controller_map[controller.property] = controller;

	      // Okay, now have we saved any values for this controller?
	      if (root.load && root.load.remembered) {

	        var preset_map = root.load.remembered;

	        // Which preset are we trying to load?
	        var preset;

	        if (preset_map[gui.preset]) {

	          preset = preset_map[gui.preset];

	        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {

	          // Uhh, you can have the default instead?
	          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];

	        } else {

	          // Nada.

	          return;

	        }


	        // Did the loaded object remember thcommon.isObject?
	        if (preset[matched_index] &&

	          // Did we remember this particular property?
	            preset[matched_index][controller.property] !== undefined) {

	          // We did remember something for this guy ...
	          var value = preset[matched_index][controller.property];

	          // And that's what it is.
	          controller.initialValue = value;
	          controller.setValue(value);

	        }

	      }

	    }

	  }

	  function getLocalStorageHash(gui, key) {
	    // TODO how does this deal with multiple GUI's?
	    return document.location.href + '.' + key;

	  }

	  function addSaveMenu(gui) {

	    var div = gui.__save_row = document.createElement('li');

	    dom.addClass(gui.domElement, 'has-save');

	    gui.__ul.insertBefore(div, gui.__ul.firstChild);

	    dom.addClass(div, 'save-row');

	    var gears = document.createElement('span');
	    gears.innerHTML = '&nbsp;';
	    dom.addClass(gears, 'button gears');

	    // TODO replace with FunctionController
	    var button = document.createElement('span');
	    button.innerHTML = 'Save';
	    dom.addClass(button, 'button');
	    dom.addClass(button, 'save');

	    var button2 = document.createElement('span');
	    button2.innerHTML = 'New';
	    dom.addClass(button2, 'button');
	    dom.addClass(button2, 'save-as');

	    var button3 = document.createElement('span');
	    button3.innerHTML = 'Revert';
	    dom.addClass(button3, 'button');
	    dom.addClass(button3, 'revert');

	    var select = gui.__preset_select = document.createElement('select');

	    if (gui.load && gui.load.remembered) {

	      common.each(gui.load.remembered, function(value, key) {
	        addPresetOption(gui, key, key == gui.preset);
	      });

	    } else {
	      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
	    }

	    dom.bind(select, 'change', function() {


	      for (var index = 0; index < gui.__preset_select.length; index++) {
	        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
	      }

	      gui.preset = this.value;

	    });

	    div.appendChild(select);
	    div.appendChild(gears);
	    div.appendChild(button);
	    div.appendChild(button2);
	    div.appendChild(button3);

	    if (SUPPORTS_LOCAL_STORAGE) {

	      var saveLocally = document.getElementById('dg-save-locally');
	      var explain = document.getElementById('dg-local-explain');

	      saveLocally.style.display = 'block';

	      var localStorageCheckBox = document.getElementById('dg-local-storage');

	      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
	        localStorageCheckBox.setAttribute('checked', 'checked');
	      }

	      function showHideExplain() {
	        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
	      }

	      showHideExplain();

	      // TODO: Use a boolean controller, fool!
	      dom.bind(localStorageCheckBox, 'change', function() {
	        gui.useLocalStorage = !gui.useLocalStorage;
	        showHideExplain();
	      });

	    }

	    var newConstructorTextArea = document.getElementById('dg-new-constructor');

	    dom.bind(newConstructorTextArea, 'keydown', function(e) {
	      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
	        SAVE_DIALOGUE.hide();
	      }
	    });

	    dom.bind(gears, 'click', function() {
	      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
	      SAVE_DIALOGUE.show();
	      newConstructorTextArea.focus();
	      newConstructorTextArea.select();
	    });

	    dom.bind(button, 'click', function() {
	      gui.save();
	    });

	    dom.bind(button2, 'click', function() {
	      var presetName = prompt('Enter a new preset name.');
	      if (presetName) gui.saveAs(presetName);
	    });

	    dom.bind(button3, 'click', function() {
	      gui.revert();
	    });

	//    div.appendChild(button2);

	  }

	  function addResizeHandle(gui) {

	    gui.__resize_handle = document.createElement('div');

	    common.extend(gui.__resize_handle.style, {

	      width: '6px',
	      marginLeft: '-3px',
	      height: '200px',
	      cursor: 'ew-resize',
	      position: 'absolute'
	//      border: '1px solid blue'

	    });

	    var pmouseX;

	    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
	    dom.bind(gui.__closeButton, 'mousedown', dragStart);

	    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);

	    function dragStart(e) {

	      e.preventDefault();

	      pmouseX = e.clientX;

	      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.bind(window, 'mousemove', drag);
	      dom.bind(window, 'mouseup', dragStop);

	      return false;

	    }

	    function drag(e) {

	      e.preventDefault();

	      gui.width += pmouseX - e.clientX;
	      gui.onResize();
	      pmouseX = e.clientX;

	      return false;

	    }

	    function dragStop() {

	      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.unbind(window, 'mousemove', drag);
	      dom.unbind(window, 'mouseup', dragStop);

	    }

	  }

	  function setWidth(gui, w) {
	    gui.domElement.style.width = w + 'px';
	    // Auto placed save-rows are position fixed, so we have to
	    // set the width manually if we want it to bleed to the edge
	    if (gui.__save_row && gui.autoPlace) {
	      gui.__save_row.style.width = w + 'px';
	    }if (gui.__closeButton) {
	      gui.__closeButton.style.width = w + 'px';
	    }
	  }

	  function getCurrentPreset(gui, useInitialValues) {

	    var toReturn = {};

	    // For each object I'm remembering
	    common.each(gui.__rememberedObjects, function(val, index) {

	      var saved_values = {};

	      // The controllers I've made for thcommon.isObject by property
	      var controller_map =
	          gui.__rememberedObjectIndecesToControllers[index];

	      // Remember each value for each property
	      common.each(controller_map, function(controller, property) {
	        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
	      });

	      // Save the values for thcommon.isObject
	      toReturn[index] = saved_values;

	    });

	    return toReturn;

	  }

	  function addPresetOption(gui, name, setSelected) {
	    var opt = document.createElement('option');
	    opt.innerHTML = name;
	    opt.value = name;
	    gui.__preset_select.appendChild(opt);
	    if (setSelected) {
	      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
	    }
	  }

	  function setPresetSelectIndex(gui) {
	    for (var index = 0; index < gui.__preset_select.length; index++) {
	      if (gui.__preset_select[index].value == gui.preset) {
	        gui.__preset_select.selectedIndex = index;
	      }
	    }
	  }

	  function markPresetModified(gui, modified) {
	    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
	//    console.log('mark', modified, opt);
	    if (modified) {
	      opt.innerHTML = opt.value + "*";
	    } else {
	      opt.innerHTML = opt.value;
	    }
	  }

	  function updateDisplays(controllerArray) {


	    if (controllerArray.length != 0) {

	      requestAnimationFrame(function() {
	        updateDisplays(controllerArray);
	      });

	    }

	    common.each(controllerArray, function(c) {
	      c.updateDisplay();
	    });

	  }

	  return GUI;

	})(dat.utils.css,
	"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
	".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
	dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {

	      return function(object, property) {

	        var initialValue = object[property];

	        // Providing options?
	        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
	          return new OptionController(object, property, arguments[2]);
	        }

	        // Providing a map?

	        if (common.isNumber(initialValue)) {

	          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {

	            // Has min and max.
	            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);

	          } else {

	            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });

	          }

	        }

	        if (common.isString(initialValue)) {
	          return new StringController(object, property);
	        }

	        if (common.isFunction(initialValue)) {
	          return new FunctionController(object, property, '');
	        }

	        if (common.isBoolean(initialValue)) {
	          return new BooleanController(object, property);
	        }

	      }

	    })(dat.controllers.OptionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.StringController = (function (Controller, dom, common) {

	  /**
	   * @class Provides a text input to alter the string property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var StringController = function(object, property) {

	    StringController.superclass.call(this, object, property);

	    var _this = this;

	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');

	    dom.bind(this.__input, 'keyup', onChange);
	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) {
	        this.blur();
	      }
	    });
	    

	    function onChange() {
	      _this.setValue(_this.__input.value);
	    }

	    function onBlur() {
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }

	    this.updateDisplay();

	    this.domElement.appendChild(this.__input);

	  };

	  StringController.superclass = Controller;

	  common.extend(

	      StringController.prototype,
	      Controller.prototype,

	      {

	        updateDisplay: function() {
	          // Stops the caret from moving on account of:
	          // keyup -> setValue -> updateDisplay
	          if (!dom.isActive(this.__input)) {
	            this.__input.value = this.getValue();
	          }
	          return StringController.superclass.prototype.updateDisplay.call(this);
	        }

	      }

	  );

	  return StringController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common),
	dat.controllers.FunctionController,
	dat.controllers.BooleanController,
	dat.utils.common),
	dat.controllers.Controller,
	dat.controllers.BooleanController,
	dat.controllers.FunctionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.OptionController,
	dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {

	  var ColorController = function(object, property) {

	    ColorController.superclass.call(this, object, property);

	    this.__color = new Color(this.getValue());
	    this.__temp = new Color(0);

	    var _this = this;

	    this.domElement = document.createElement('div');

	    dom.makeSelectable(this.domElement, false);

	    this.__selector = document.createElement('div');
	    this.__selector.className = 'selector';

	    this.__saturation_field = document.createElement('div');
	    this.__saturation_field.className = 'saturation-field';

	    this.__field_knob = document.createElement('div');
	    this.__field_knob.className = 'field-knob';
	    this.__field_knob_border = '2px solid ';

	    this.__hue_knob = document.createElement('div');
	    this.__hue_knob.className = 'hue-knob';

	    this.__hue_field = document.createElement('div');
	    this.__hue_field.className = 'hue-field';

	    this.__input = document.createElement('input');
	    this.__input.type = 'text';
	    this.__input_textShadow = '0 1px 1px ';

	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) { // on enter
	        onBlur.call(this);
	      }
	    });

	    dom.bind(this.__input, 'blur', onBlur);

	    dom.bind(this.__selector, 'mousedown', function(e) {

	      dom
	        .addClass(this, 'drag')
	        .bind(window, 'mouseup', function(e) {
	          dom.removeClass(_this.__selector, 'drag');
	        });

	    });

	    var value_field = document.createElement('div');

	    common.extend(this.__selector.style, {
	      width: '122px',
	      height: '102px',
	      padding: '3px',
	      backgroundColor: '#222',
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
	    });

	    common.extend(this.__field_knob.style, {
	      position: 'absolute',
	      width: '12px',
	      height: '12px',
	      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
	      borderRadius: '12px',
	      zIndex: 1
	    });
	    
	    common.extend(this.__hue_knob.style, {
	      position: 'absolute',
	      width: '15px',
	      height: '2px',
	      borderRight: '4px solid #fff',
	      zIndex: 1
	    });

	    common.extend(this.__saturation_field.style, {
	      width: '100px',
	      height: '100px',
	      border: '1px solid #555',
	      marginRight: '3px',
	      display: 'inline-block',
	      cursor: 'pointer'
	    });

	    common.extend(value_field.style, {
	      width: '100%',
	      height: '100%',
	      background: 'none'
	    });
	    
	    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');

	    common.extend(this.__hue_field.style, {
	      width: '15px',
	      height: '100px',
	      display: 'inline-block',
	      border: '1px solid #555',
	      cursor: 'ns-resize'
	    });

	    hueGradient(this.__hue_field);

	    common.extend(this.__input.style, {
	      outline: 'none',
	//      width: '120px',
	      textAlign: 'center',
	//      padding: '4px',
	//      marginBottom: '6px',
	      color: '#fff',
	      border: 0,
	      fontWeight: 'bold',
	      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
	    });

	    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
	    dom.bind(this.__field_knob, 'mousedown', fieldDown);

	    dom.bind(this.__hue_field, 'mousedown', function(e) {
	      setH(e);
	      dom.bind(window, 'mousemove', setH);
	      dom.bind(window, 'mouseup', unbindH);
	    });

	    function fieldDown(e) {
	      setSV(e);
	      // document.body.style.cursor = 'none';
	      dom.bind(window, 'mousemove', setSV);
	      dom.bind(window, 'mouseup', unbindSV);
	    }

	    function unbindSV() {
	      dom.unbind(window, 'mousemove', setSV);
	      dom.unbind(window, 'mouseup', unbindSV);
	      // document.body.style.cursor = 'default';
	    }

	    function onBlur() {
	      var i = interpret(this.value);
	      if (i !== false) {
	        _this.__color.__state = i;
	        _this.setValue(_this.__color.toOriginal());
	      } else {
	        this.value = _this.__color.toString();
	      }
	    }

	    function unbindH() {
	      dom.unbind(window, 'mousemove', setH);
	      dom.unbind(window, 'mouseup', unbindH);
	    }

	    this.__saturation_field.appendChild(value_field);
	    this.__selector.appendChild(this.__field_knob);
	    this.__selector.appendChild(this.__saturation_field);
	    this.__selector.appendChild(this.__hue_field);
	    this.__hue_field.appendChild(this.__hue_knob);

	    this.domElement.appendChild(this.__input);
	    this.domElement.appendChild(this.__selector);

	    this.updateDisplay();

	    function setSV(e) {

	      e.preventDefault();

	      var w = dom.getWidth(_this.__saturation_field);
	      var o = dom.getOffset(_this.__saturation_field);
	      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
	      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;

	      if (v > 1) v = 1;
	      else if (v < 0) v = 0;

	      if (s > 1) s = 1;
	      else if (s < 0) s = 0;

	      _this.__color.v = v;
	      _this.__color.s = s;

	      _this.setValue(_this.__color.toOriginal());


	      return false;

	    }

	    function setH(e) {

	      e.preventDefault();

	      var s = dom.getHeight(_this.__hue_field);
	      var o = dom.getOffset(_this.__hue_field);
	      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;

	      if (h > 1) h = 1;
	      else if (h < 0) h = 0;

	      _this.__color.h = h * 360;

	      _this.setValue(_this.__color.toOriginal());

	      return false;

	    }

	  };

	  ColorController.superclass = Controller;

	  common.extend(

	      ColorController.prototype,
	      Controller.prototype,

	      {

	        updateDisplay: function() {

	          var i = interpret(this.getValue());

	          if (i !== false) {

	            var mismatch = false;

	            // Check for mismatch on the interpreted value.

	            common.each(Color.COMPONENTS, function(component) {
	              if (!common.isUndefined(i[component]) &&
	                  !common.isUndefined(this.__color.__state[component]) &&
	                  i[component] !== this.__color.__state[component]) {
	                mismatch = true;
	                return {}; // break
	              }
	            }, this);

	            // If nothing diverges, we keep our previous values
	            // for statefulness, otherwise we recalculate fresh
	            if (mismatch) {
	              common.extend(this.__color.__state, i);
	            }

	          }

	          common.extend(this.__temp.__state, this.__color.__state);

	          this.__temp.a = 1;

	          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
	          var _flip = 255 - flip;

	          common.extend(this.__field_knob.style, {
	            marginLeft: 100 * this.__color.s - 7 + 'px',
	            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
	            backgroundColor: this.__temp.toString(),
	            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
	          });

	          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'

	          this.__temp.s = 1;
	          this.__temp.v = 1;

	          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

	          common.extend(this.__input.style, {
	            backgroundColor: this.__input.value = this.__color.toString(),
	            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
	            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
	          });

	        }

	      }

	  );
	  
	  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
	  
	  function linearGradient(elem, x, a, b) {
	    elem.style.background = '';
	    common.each(vendors, function(vendor) {
	      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
	    });
	  }
	  
	  function hueGradient(elem) {
	    elem.style.background = '';
	    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
	    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	  }


	  return ColorController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.color.Color = (function (interpret, math, toString, common) {

	  var Color = function() {

	    this.__state = interpret.apply(this, arguments);

	    if (this.__state === false) {
	      throw 'Failed to interpret color arguments';
	    }

	    this.__state.a = this.__state.a || 1;


	  };

	  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

	  common.extend(Color.prototype, {

	    toString: function() {
	      return toString(this);
	    },

	    toOriginal: function() {
	      return this.__state.conversion.write(this);
	    }

	  });

	  defineRGBComponent(Color.prototype, 'r', 2);
	  defineRGBComponent(Color.prototype, 'g', 1);
	  defineRGBComponent(Color.prototype, 'b', 0);

	  defineHSVComponent(Color.prototype, 'h');
	  defineHSVComponent(Color.prototype, 's');
	  defineHSVComponent(Color.prototype, 'v');

	  Object.defineProperty(Color.prototype, 'a', {

	    get: function() {
	      return this.__state.a;
	    },

	    set: function(v) {
	      this.__state.a = v;
	    }

	  });

	  Object.defineProperty(Color.prototype, 'hex', {

	    get: function() {

	      if (!this.__state.space !== 'HEX') {
	        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
	      }

	      return this.__state.hex;

	    },

	    set: function(v) {

	      this.__state.space = 'HEX';
	      this.__state.hex = v;

	    }

	  });

	  function defineRGBComponent(target, component, componentHexIndex) {

	    Object.defineProperty(target, component, {

	      get: function() {

	        if (this.__state.space === 'RGB') {
	          return this.__state[component];
	        }

	        recalculateRGB(this, component, componentHexIndex);

	        return this.__state[component];

	      },

	      set: function(v) {

	        if (this.__state.space !== 'RGB') {
	          recalculateRGB(this, component, componentHexIndex);
	          this.__state.space = 'RGB';
	        }

	        this.__state[component] = v;

	      }

	    });

	  }

	  function defineHSVComponent(target, component) {

	    Object.defineProperty(target, component, {

	      get: function() {

	        if (this.__state.space === 'HSV')
	          return this.__state[component];

	        recalculateHSV(this);

	        return this.__state[component];

	      },

	      set: function(v) {

	        if (this.__state.space !== 'HSV') {
	          recalculateHSV(this);
	          this.__state.space = 'HSV';
	        }

	        this.__state[component] = v;

	      }

	    });

	  }

	  function recalculateRGB(color, component, componentHexIndex) {

	    if (color.__state.space === 'HEX') {

	      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

	    } else if (color.__state.space === 'HSV') {

	      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

	    } else {

	      throw 'Corrupted color state';

	    }

	  }

	  function recalculateHSV(color) {

	    var result = math.rgb_to_hsv(color.r, color.g, color.b);

	    common.extend(color.__state,
	        {
	          s: result.s,
	          v: result.v
	        }
	    );

	    if (!common.isNaN(result.h)) {
	      color.__state.h = result.h;
	    } else if (common.isUndefined(color.__state.h)) {
	      color.__state.h = 0;
	    }

	  }

	  return Color;

	})(dat.color.interpret,
	dat.color.math = (function () {

	  var tmpComponent;

	  return {

	    hsv_to_rgb: function(h, s, v) {

	      var hi = Math.floor(h / 60) % 6;

	      var f = h / 60 - Math.floor(h / 60);
	      var p = v * (1.0 - s);
	      var q = v * (1.0 - (f * s));
	      var t = v * (1.0 - ((1.0 - f) * s));
	      var c = [
	        [v, t, p],
	        [q, v, p],
	        [p, v, t],
	        [p, q, v],
	        [t, p, v],
	        [v, p, q]
	      ][hi];

	      return {
	        r: c[0] * 255,
	        g: c[1] * 255,
	        b: c[2] * 255
	      };

	    },

	    rgb_to_hsv: function(r, g, b) {

	      var min = Math.min(r, g, b),
	          max = Math.max(r, g, b),
	          delta = max - min,
	          h, s;

	      if (max != 0) {
	        s = delta / max;
	      } else {
	        return {
	          h: NaN,
	          s: 0,
	          v: 0
	        };
	      }

	      if (r == max) {
	        h = (g - b) / delta;
	      } else if (g == max) {
	        h = 2 + (b - r) / delta;
	      } else {
	        h = 4 + (r - g) / delta;
	      }
	      h /= 6;
	      if (h < 0) {
	        h += 1;
	      }

	      return {
	        h: h * 360,
	        s: s,
	        v: max / 255
	      };
	    },

	    rgb_to_hex: function(r, g, b) {
	      var hex = this.hex_with_component(0, 2, r);
	      hex = this.hex_with_component(hex, 1, g);
	      hex = this.hex_with_component(hex, 0, b);
	      return hex;
	    },

	    component_from_hex: function(hex, componentIndex) {
	      return (hex >> (componentIndex * 8)) & 0xFF;
	    },

	    hex_with_component: function(hex, componentIndex, value) {
	      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
	    }

	  }

	})(),
	dat.color.toString,
	dat.utils.common),
	dat.color.interpret,
	dat.utils.common),
	dat.utils.requestAnimationFrame = (function () {

	  /**
	   * requirejs version of Paul Irish's RequestAnimationFrame
	   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	   */

	  return window.webkitRequestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	      window.oRequestAnimationFrame ||
	      window.msRequestAnimationFrame ||
	      function(callback, element) {

	        window.setTimeout(callback, 1000 / 60);

	      };
	})(),
	dat.dom.CenteredDiv = (function (dom, common) {


	  var CenteredDiv = function() {

	    this.backgroundElement = document.createElement('div');
	    common.extend(this.backgroundElement.style, {
	      backgroundColor: 'rgba(0,0,0,0.8)',
	      top: 0,
	      left: 0,
	      display: 'none',
	      zIndex: '1000',
	      opacity: 0,
	      WebkitTransition: 'opacity 0.2s linear'
	    });

	    dom.makeFullscreen(this.backgroundElement);
	    this.backgroundElement.style.position = 'fixed';

	    this.domElement = document.createElement('div');
	    common.extend(this.domElement.style, {
	      position: 'fixed',
	      display: 'none',
	      zIndex: '1001',
	      opacity: 0,
	      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
	    });


	    document.body.appendChild(this.backgroundElement);
	    document.body.appendChild(this.domElement);

	    var _this = this;
	    dom.bind(this.backgroundElement, 'click', function() {
	      _this.hide();
	    });


	  };

	  CenteredDiv.prototype.show = function() {

	    var _this = this;
	    


	    this.backgroundElement.style.display = 'block';

	    this.domElement.style.display = 'block';
	    this.domElement.style.opacity = 0;
	//    this.domElement.style.top = '52%';
	    this.domElement.style.webkitTransform = 'scale(1.1)';

	    this.layout();

	    common.defer(function() {
	      _this.backgroundElement.style.opacity = 1;
	      _this.domElement.style.opacity = 1;
	      _this.domElement.style.webkitTransform = 'scale(1)';
	    });

	  };

	  CenteredDiv.prototype.hide = function() {

	    var _this = this;

	    var hide = function() {

	      _this.domElement.style.display = 'none';
	      _this.backgroundElement.style.display = 'none';

	      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
	      dom.unbind(_this.domElement, 'transitionend', hide);
	      dom.unbind(_this.domElement, 'oTransitionEnd', hide);

	    };

	    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
	    dom.bind(this.domElement, 'transitionend', hide);
	    dom.bind(this.domElement, 'oTransitionEnd', hide);

	    this.backgroundElement.style.opacity = 0;
	//    this.domElement.style.top = '48%';
	    this.domElement.style.opacity = 0;
	    this.domElement.style.webkitTransform = 'scale(1.1)';

	  };

	  CenteredDiv.prototype.layout = function() {
	    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
	    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
	  };
	  
	  function lockScroll(e) {
	    console.log(e);
	  }

	  return CenteredDiv;

	})(dat.dom.dom,
	dat.utils.common),
	dat.dom.dom,
	dat.utils.common);

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */

	/** @namespace */
	var dat = module.exports = dat || {};

	/** @namespace */
	dat.color = dat.color || {};

	/** @namespace */
	dat.utils = dat.utils || {};

	dat.utils.common = (function () {
	  
	  var ARR_EACH = Array.prototype.forEach;
	  var ARR_SLICE = Array.prototype.slice;

	  /**
	   * Band-aid methods for things that should be a lot easier in JavaScript.
	   * Implementation and structure inspired by underscore.js
	   * http://documentcloud.github.com/underscore/
	   */

	  return { 
	    
	    BREAK: {},
	  
	    extend: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (!this.isUndefined(obj[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	      
	    },
	    
	    defaults: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (this.isUndefined(target[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	    
	    },
	    
	    compose: function() {
	      var toCall = ARR_SLICE.call(arguments);
	            return function() {
	              var args = ARR_SLICE.call(arguments);
	              for (var i = toCall.length -1; i >= 0; i--) {
	                args = [toCall[i].apply(this, args)];
	              }
	              return args[0];
	            }
	    },
	    
	    each: function(obj, itr, scope) {

	      
	      if (ARR_EACH && obj.forEach === ARR_EACH) { 
	        
	        obj.forEach(itr, scope);
	        
	      } else if (obj.length === obj.length + 0) { // Is number but not NaN
	        
	        for (var key = 0, l = obj.length; key < l; key++)
	          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
	            return;
	            
	      } else {

	        for (var key in obj) 
	          if (itr.call(scope, obj[key], key) === this.BREAK)
	            return;
	            
	      }
	            
	    },
	    
	    defer: function(fnc) {
	      setTimeout(fnc, 0);
	    },
	    
	    toArray: function(obj) {
	      if (obj.toArray) return obj.toArray();
	      return ARR_SLICE.call(obj);
	    },

	    isUndefined: function(obj) {
	      return obj === undefined;
	    },
	    
	    isNull: function(obj) {
	      return obj === null;
	    },
	    
	    isNaN: function(obj) {
	      return obj !== obj;
	    },
	    
	    isArray: Array.isArray || function(obj) {
	      return obj.constructor === Array;
	    },
	    
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	    
	    isNumber: function(obj) {
	      return obj === obj+0;
	    },
	    
	    isString: function(obj) {
	      return obj === obj+'';
	    },
	    
	    isBoolean: function(obj) {
	      return obj === false || obj === true;
	    },
	    
	    isFunction: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Function]';
	    }
	  
	  };
	    
	})();


	dat.color.toString = (function (common) {

	  return function(color) {

	    if (color.a == 1 || common.isUndefined(color.a)) {

	      var s = color.hex.toString(16);
	      while (s.length < 6) {
	        s = '0' + s;
	      }

	      return '#' + s;

	    } else {

	      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

	    }

	  }

	})(dat.utils.common);


	dat.Color = dat.color.Color = (function (interpret, math, toString, common) {

	  var Color = function() {

	    this.__state = interpret.apply(this, arguments);

	    if (this.__state === false) {
	      throw 'Failed to interpret color arguments';
	    }

	    this.__state.a = this.__state.a || 1;


	  };

	  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

	  common.extend(Color.prototype, {

	    toString: function() {
	      return toString(this);
	    },

	    toOriginal: function() {
	      return this.__state.conversion.write(this);
	    }

	  });

	  defineRGBComponent(Color.prototype, 'r', 2);
	  defineRGBComponent(Color.prototype, 'g', 1);
	  defineRGBComponent(Color.prototype, 'b', 0);

	  defineHSVComponent(Color.prototype, 'h');
	  defineHSVComponent(Color.prototype, 's');
	  defineHSVComponent(Color.prototype, 'v');

	  Object.defineProperty(Color.prototype, 'a', {

	    get: function() {
	      return this.__state.a;
	    },

	    set: function(v) {
	      this.__state.a = v;
	    }

	  });

	  Object.defineProperty(Color.prototype, 'hex', {

	    get: function() {

	      if (!this.__state.space !== 'HEX') {
	        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
	      }

	      return this.__state.hex;

	    },

	    set: function(v) {

	      this.__state.space = 'HEX';
	      this.__state.hex = v;

	    }

	  });

	  function defineRGBComponent(target, component, componentHexIndex) {

	    Object.defineProperty(target, component, {

	      get: function() {

	        if (this.__state.space === 'RGB') {
	          return this.__state[component];
	        }

	        recalculateRGB(this, component, componentHexIndex);

	        return this.__state[component];

	      },

	      set: function(v) {

	        if (this.__state.space !== 'RGB') {
	          recalculateRGB(this, component, componentHexIndex);
	          this.__state.space = 'RGB';
	        }

	        this.__state[component] = v;

	      }

	    });

	  }

	  function defineHSVComponent(target, component) {

	    Object.defineProperty(target, component, {

	      get: function() {

	        if (this.__state.space === 'HSV')
	          return this.__state[component];

	        recalculateHSV(this);

	        return this.__state[component];

	      },

	      set: function(v) {

	        if (this.__state.space !== 'HSV') {
	          recalculateHSV(this);
	          this.__state.space = 'HSV';
	        }

	        this.__state[component] = v;

	      }

	    });

	  }

	  function recalculateRGB(color, component, componentHexIndex) {

	    if (color.__state.space === 'HEX') {

	      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

	    } else if (color.__state.space === 'HSV') {

	      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

	    } else {

	      throw 'Corrupted color state';

	    }

	  }

	  function recalculateHSV(color) {

	    var result = math.rgb_to_hsv(color.r, color.g, color.b);

	    common.extend(color.__state,
	        {
	          s: result.s,
	          v: result.v
	        }
	    );

	    if (!common.isNaN(result.h)) {
	      color.__state.h = result.h;
	    } else if (common.isUndefined(color.__state.h)) {
	      color.__state.h = 0;
	    }

	  }

	  return Color;

	})(dat.color.interpret = (function (toString, common) {

	  var result, toReturn;

	  var interpret = function() {

	    toReturn = false;

	    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

	    common.each(INTERPRETATIONS, function(family) {

	      if (family.litmus(original)) {

	        common.each(family.conversions, function(conversion, conversionName) {

	          result = conversion.read(original);

	          if (toReturn === false && result !== false) {
	            toReturn = result;
	            result.conversionName = conversionName;
	            result.conversion = conversion;
	            return common.BREAK;

	          }

	        });

	        return common.BREAK;

	      }

	    });

	    return toReturn;

	  };

	  var INTERPRETATIONS = [

	    // Strings
	    {

	      litmus: common.isString,

	      conversions: {

	        THREE_CHAR_HEX: {

	          read: function(original) {

	            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	            if (test === null) return false;

	            return {
	              space: 'HEX',
	              hex: parseInt(
	                  '0x' +
	                      test[1].toString() + test[1].toString() +
	                      test[2].toString() + test[2].toString() +
	                      test[3].toString() + test[3].toString())
	            };

	          },

	          write: toString

	        },

	        SIX_CHAR_HEX: {

	          read: function(original) {

	            var test = original.match(/^#([A-F0-9]{6})$/i);
	            if (test === null) return false;

	            return {
	              space: 'HEX',
	              hex: parseInt('0x' + test[1].toString())
	            };

	          },

	          write: toString

	        },

	        CSS_RGB: {

	          read: function(original) {

	            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	            if (test === null) return false;

	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3])
	            };

	          },

	          write: toString

	        },

	        CSS_RGBA: {

	          read: function(original) {

	            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
	            if (test === null) return false;

	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3]),
	              a: parseFloat(test[4])
	            };

	          },

	          write: toString

	        }

	      }

	    },

	    // Numbers
	    {

	      litmus: common.isNumber,

	      conversions: {

	        HEX: {
	          read: function(original) {
	            return {
	              space: 'HEX',
	              hex: original,
	              conversionName: 'HEX'
	            }
	          },

	          write: function(color) {
	            return color.hex;
	          }
	        }

	      }

	    },

	    // Arrays
	    {

	      litmus: common.isArray,

	      conversions: {

	        RGB_ARRAY: {
	          read: function(original) {
	            if (original.length != 3) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2]
	            };
	          },

	          write: function(color) {
	            return [color.r, color.g, color.b];
	          }

	        },

	        RGBA_ARRAY: {
	          read: function(original) {
	            if (original.length != 4) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2],
	              a: original[3]
	            };
	          },

	          write: function(color) {
	            return [color.r, color.g, color.b, color.a];
	          }

	        }

	      }

	    },

	    // Objects
	    {

	      litmus: common.isObject,

	      conversions: {

	        RGBA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b,
	                a: original.a
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: color.a
	            }
	          }
	        },

	        RGB_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b
	            }
	          }
	        },

	        HSVA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v,
	                a: original.a
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v,
	              a: color.a
	            }
	          }
	        },

	        HSV_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v
	            }
	          }

	        }

	      }

	    }


	  ];

	  return interpret;


	})(dat.color.toString,
	dat.utils.common),
	dat.color.math = (function () {

	  var tmpComponent;

	  return {

	    hsv_to_rgb: function(h, s, v) {

	      var hi = Math.floor(h / 60) % 6;

	      var f = h / 60 - Math.floor(h / 60);
	      var p = v * (1.0 - s);
	      var q = v * (1.0 - (f * s));
	      var t = v * (1.0 - ((1.0 - f) * s));
	      var c = [
	        [v, t, p],
	        [q, v, p],
	        [p, v, t],
	        [p, q, v],
	        [t, p, v],
	        [v, p, q]
	      ][hi];

	      return {
	        r: c[0] * 255,
	        g: c[1] * 255,
	        b: c[2] * 255
	      };

	    },

	    rgb_to_hsv: function(r, g, b) {

	      var min = Math.min(r, g, b),
	          max = Math.max(r, g, b),
	          delta = max - min,
	          h, s;

	      if (max != 0) {
	        s = delta / max;
	      } else {
	        return {
	          h: NaN,
	          s: 0,
	          v: 0
	        };
	      }

	      if (r == max) {
	        h = (g - b) / delta;
	      } else if (g == max) {
	        h = 2 + (b - r) / delta;
	      } else {
	        h = 4 + (r - g) / delta;
	      }
	      h /= 6;
	      if (h < 0) {
	        h += 1;
	      }

	      return {
	        h: h * 360,
	        s: s,
	        v: max / 255
	      };
	    },

	    rgb_to_hex: function(r, g, b) {
	      var hex = this.hex_with_component(0, 2, r);
	      hex = this.hex_with_component(hex, 1, g);
	      hex = this.hex_with_component(hex, 0, b);
	      return hex;
	    },

	    component_from_hex: function(hex, componentIndex) {
	      return (hex >> (componentIndex * 8)) & 0xFF;
	    },

	    hex_with_component: function(hex, componentIndex, value) {
	      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
	    }

	  }

	})(),
	dat.color.toString,
	dat.utils.common);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var bounds, gui, win;

	win = __webpack_require__(9);

	gui = __webpack_require__(11);

	exports.user = new THREE.PerspectiveCamera(80, win.width / win.height, 0.1, 100000);

	exports.dev = new THREE.PerspectiveCamera(80, win.width / win.height, 0.1, 100000);

	gui = gui.addFolder('controller::cameras');

	bounds = 20000;

	exports.user.name = 'user';

	exports.dev.name = 'dev';

	gui.add(exports.user, 'name');

	gui.add(exports.user, 'fov', 10, 200).listen();

	gui.add(exports.user.position, 'x', -bounds, bounds).name('position x');

	gui.add(exports.user.position, 'y', -bounds, bounds).name('position y');

	gui.add(exports.user.position, 'z', -bounds, bounds).name('position z');

	gui.add(exports.user.rotation, 'x', -PI_2, PI_2).name('rotation x');

	gui.add(exports.user.rotation, 'y', -PI_2, PI_2).name('rotation y');

	gui.add(exports.user.rotation, 'z', -PI_2, PI_2).name('rotation z');

	gui.add(exports.dev, 'name');

	gui.add(exports.dev, 'fov', 10, 200).listen();

	gui.add(exports.dev.position, 'x', -bounds, bounds).name('position x').listen();

	gui.add(exports.dev.position, 'y', -bounds, bounds).name('position y').listen();

	gui.add(exports.dev.position, 'z', -bounds, bounds).name('position z').listen();

	gui.add(exports.dev.rotation, 'x', -PI_2, PI_2).name('rotation x').listen();

	gui.add(exports.dev.rotation, 'y', -PI_2, PI_2).name('rotation y').listen();

	gui.add(exports.dev.rotation, 'z', -PI_2, PI_2).name('rotation z').listen();


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = new THREE.Scene;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var settings;

	settings = __webpack_require__(10);

	module.exports = new THREE.WebGLRenderer({
	  alpha: false,
	  antialias: true,
	  preserveDrawingBuffer: !settings.live
	});


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var camera, cameras, controls, renderer, settings;

	settings = __webpack_require__(10);

	cameras = __webpack_require__(16);

	renderer = __webpack_require__(18);

	camera = cameras.dev;

	controls = new THREE.TrackballControls(camera, $('canvas')[0]);

	controls.rotateSpeed = 1.0;

	controls.zoomSpeed = 1.2;

	controls.panSpeed = 0.8;

	controls.noZoom = false;

	controls.noPan = false;

	controls.staticMoving = true;

	controls.dynamicDampingFactor = 0.5;

	module.exports = controls;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var happens, renderer;

	renderer = __webpack_require__(18);

	happens = __webpack_require__(8);

	module.exports = (function() {
	  function _Class() {
	    happens(this);
	  }

	  _Class.prototype["export"] = function(width, height) {
	    var img;
	    img = Canvas2Image.convertToImage(renderer.domElement, width, height, 'jpeg');
	    return $.ajax({
	      type: 'POST',
	      url: 'save_image.php',
	      dataType: 'text',
	      data: {
	        base64Data: img.src
	      },
	      success: (function(_this) {
	        return function(data) {
	          SaveToDisk("exports/" + data, data);
	          _this.emit('done');
	          return c.log('emit done');
	        };
	      })(this),
	      error: (function(_this) {
	        return function() {
	          return console.log('error');
	        };
	      })(this)
	    });
	  };

	  return _Class;

	})();


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Router, happens, routes, settings,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	settings = __webpack_require__(10);

	routes = __webpack_require__(22);

	happens = __webpack_require__(8);

	module.exports = new (Router = (function() {
	  Router.prototype.route_index = -1;

	  function Router() {
	    this.on_state_change = bind(this.on_state_change, this);
	    var Controller, controller, j, len, route;
	    happens(this);
	    History.Adapter.bind(window, 'statechange', this.on_state_change);

	    /*
	    		Initialise the routes
	     */
	    this.routes = [];
	    for (j = 0, len = routes.length; j < len; j++) {
	      route = routes[j];
	      Controller = __webpack_require__(23);
	      controller = new Controller(route.id);
	      this.routes.push({
	        url: route.url,
	        run: controller.run,
	        destroy: controller.destroy,
	        controller: controller
	      });
	    }
	  }

	  Router.prototype.start = function() {
	    return this.on_state_change();
	  };

	  Router.prototype.on_state_change = function() {
	    var State, index, j, len, route;
	    State = History.getState();
	    this._url = this.get_url();
	    this.previous_route_index = this.route_index;
	    for (index = j = 0, len = routes.length; j < len; index = ++j) {
	      route = routes[index];
	      if (this._url === route.url) {
	        this.route_index = index;
	        break;
	      }
	    }
	    if (this.routes[this.previous_route_index] != null) {
	      if (this.routes[this.previous_route_index].controller.has_transitioned_out()) {
	        this.routes[this.previous_route_index].destroy((function(_this) {
	          return function() {
	            return _this.run();
	          };
	        })(this));
	      } else {
	        this.routes[this.previous_route_index].controller.once('next', (function(_this) {
	          return function() {
	            c.log('router now destroy the view');
	            return _this.routes[_this.previous_route_index].destroy(function() {
	              c.log('view destroyed');
	              return _this.run();
	            });
	          };
	        })(this));
	        this.routes[this.previous_route_index].controller.transition_out();
	      }
	    } else {
	      this.run();
	    }
	    return this.emit('url:changed', this._url);
	  };

	  Router.prototype.run = function() {
	    this.routes[this.route_index].controller.once('transition:in:complete', (function(_this) {
	      return function() {
	        return _this.emit('nav:enable');
	      };
	    })(this));
	    return this.routes[this.route_index].run((function(_this) {
	      return function() {
	        return c.log('router::run -> done');
	      };
	    })(this));
	  };

	  Router.prototype.go = function(url, title, data) {
	    if (title == null) {
	      title = '';
	    }
	    if (data == null) {
	      data = {};
	    }
	    c.debug('go', url, title, data);
	    if (url === this._url) {
	      return;
	    }
	    History.pushState(null, document.title, settings.base_path + url);
	    this.emit('nav:disable');
	    return this.emit('go', url);
	  };

	  Router.prototype.transition_out_then_go = function(url) {
	    if (url === this._url) {
	      return;
	    }
	    return c.log('url', url);
	  };


	  /*
	  	Navigate to the next url in routes
	   */

	  Router.prototype.next = function() {
	    var i, index, j, len, next_route, route, url;
	    for (i = j = 0, len = routes.length; j < len; i = ++j) {
	      route = routes[i];
	      if (route.url.match('/')) {
	        url = settings.base_path + route.url;
	      } else {
	        url = route.url;
	      }
	      if (url.match(window.location.pathname)) {
	        index = (i + 1) < routes.length ? i + 1 : 0;
	        next_route = routes[index];
	        break;
	      }
	    }
	    return this.go(next_route.url);
	  };


	  /*
	  	Get the current chapter id
	   */

	  Router.prototype.get_url = function() {
	    return window.location.pathname.replace(settings.base_path, '');
	  };

	  return Router;

	})());


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = [
	  {
	    id: 'home',
	    url: '/',
	    controller: 'controllers/scene'
	  }, {
	    id: 'blackice',
	    url: '/blackice',
	    controller: 'controllers/scene'
	  }, {
	    id: 'elements',
	    url: '/elements',
	    controller: 'controllers/scene'
	  }, {
	    id: 'kubik',
	    url: '/kubik',
	    controller: 'controllers/scene'
	  }, {
	    id: 'hires',
	    url: '/hires',
	    controller: 'controllers/scene'
	  }, {
	    id: 'calvarium',
	    url: '/calvarium',
	    controller: 'controllers/scene'
	  }, {
	    id: 'liquidice',
	    url: '/liquidice',
	    controller: 'controllers/scene'
	  }, {
	    id: 'epilogue',
	    url: '/epilogue',
	    controller: 'controllers/epilogue'
	  }
	];


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Scene, engine, gui, happens, router,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	engine = __webpack_require__(7);

	gui = __webpack_require__(11);

	router = __webpack_require__(21);

	module.exports = Scene = (function() {
	  function Scene(id) {
	    this.id = id;
	    this.next = bind(this.next, this);
	    this.destroy = bind(this.destroy, this);
	    this.run = bind(this.run, this);
	    happens(this);
	    this.gui = gui.addFolder("controller::" + this.id);
	    this.gui.open();
	  }

	  Scene.prototype.run = function(done) {
	    var View, assets, config;
	    c.log("controller::scene -> run " + this.id);

	    /*
	    		Create a new scene for this view
	     */
	    this.scene = new THREE.Scene;

	    /*
	    		Create the view
	     */
	    View = __webpack_require__(24)("./" + this.id + "/index");
	    assets = __webpack_require__(88)("./" + this.id + "/assets");
	    config = __webpack_require__(90)("./" + this.id + "/config");
	    this.view = new View(this.scene, this.gui, assets, config);

	    /*
	    		Render the black scene while the next one loads
	     */
	    engine.set_scene();
	    this.view.once('setup:complete', (function(_this) {
	      return function() {

	        /*
	        			Set the current scene to be rendered
	         */
	        engine.set_scene(_this.scene, config);
	        _this.view.transition_in();

	        /*
	        			Callback
	         */
	        return done();
	      };
	    })(this));
	    this.view.once('next', this.next);
	    this.view.once('transition:in:complete', (function(_this) {
	      return function() {
	        return _this.emit('transition:in:complete');
	      };
	    })(this));
	    return this.view.load();
	  };

	  Scene.prototype.destroy = function(done) {
	    c.log("controller::" + this.id + " -> destroy");
	    this.view.once('destroyed', (function(_this) {
	      return function() {
	        return done();
	      };
	    })(this));
	    return this.view.destroy();
	  };

	  Scene.prototype.has_transitioned_out = function() {
	    return this.view.has_transitioned_out;
	  };

	  Scene.prototype.transition_out = function() {
	    c.log('transition out scene');

	    /*
	    		Unsubscribe from the next chapter listener
	     */
	    this.view.off('next', this.next);
	    this.view.once('next', (function(_this) {
	      return function() {
	        c.log('next route');
	        return _this.emit('next');
	      };
	    })(this));
	    this.view.transition_out_forward(true);
	    return this.view.disable_transition();
	  };

	  Scene.prototype.next = function() {
	    return (__webpack_require__(21)).next();
	  };

	  return Scene;

	})();


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./blackice/index": 25,
		"./calvarium/index": 49,
		"./elements/index": 54,
		"./epilogue/index": 61,
		"./hires/index": 70,
		"./home/index": 75,
		"./kubik/index": 80,
		"./liquidice/index": 84
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 24;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Blackice, Experiment, Hotspot, Keyboard, Loader, Mouse, PathLookatCurve, PathLookatFixed, UI, assets, cameras, engine, happens, settings, utils, win,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	happens = __webpack_require__(8);

	settings = __webpack_require__(10);

	cameras = __webpack_require__(16);

	engine = __webpack_require__(7);

	Loader = __webpack_require__(26);

	Mouse = __webpack_require__(33);

	utils = __webpack_require__(34);

	Keyboard = __webpack_require__(35);

	win = __webpack_require__(9);

	Experiment = __webpack_require__(36);

	UI = __webpack_require__(37);

	assets = __webpack_require__(45);

	Hotspot = __webpack_require__(46);

	PathLookatFixed = __webpack_require__(47);

	PathLookatCurve = __webpack_require__(48);

	module.exports = Blackice = (function(superClass) {
	  extend(Blackice, superClass);

	  function Blackice() {
	    this.on_click = bind(this.on_click, this);
	    this.update = bind(this.update, this);
	    this.generate_mesh = bind(this.generate_mesh, this);
	    this.on_cubemap_url_loaded = bind(this.on_cubemap_url_loaded, this);
	    this.on_drop = bind(this.on_drop, this);
	    this.on_dragover = bind(this.on_dragover, this);
	    this.setup = bind(this.setup, this);
	    return Blackice.__super__.constructor.apply(this, arguments);
	  }

	  Blackice.prototype.material = null;

	  Blackice.prototype.accel_x = 0.1;

	  Blackice.prototype.accel_y = 0.1;

	  Blackice.prototype.accel_z = 0.1;

	  Blackice.prototype.iteration = 0;

	  Blackice.prototype.interation_lock = true;

	  Blackice.prototype.first_time = false;

	  Blackice.prototype.base_mult = 0;

	  Blackice.prototype.user_added_texture = false;

	  Blackice.prototype.setup = function(manifest) {
	    var j, key, len, ref, ref1, sound;
	    this.manifest = manifest;
	    this.gui.add(this, 'audio_pos_z', -30, 30);
	    this.first_time = true;

	    /*
	    		Engine
	     */
	    engine.fov = this.config.camera_fov;

	    /*
	    		UI
	     */
	    this.ui = new UI('blackice', this.scene, this.gui);

	    /*
	    		Scene
	     */
	    if (this.config.fog_enabled) {
	      this.scene.fog = new THREE.FogExp2(0x000000, this.config.fog_in_start);
	      this.gui.add(this.scene.fog, 'density', 0, 1);
	    }

	    /*
	    		Helpers
	     */
	    if (settings.debug) {
	      this.scene.add(new THREE.GridHelper(50, 10));
	      this.scene.add(new THREE.AxisHelper(10));
	      this.scene.add(new THREE.CameraHelper(cameras.user));
	    }

	    /*
	    		Hotpsot
	     */
	    this.hotspot = new Hotspot(this.ui.ui.hitarea, 'sphere', 70);
	    this.scene.add(this.hotspot.mesh);

	    /*
	    		Create curve for camera
	     */
	    this.path_in = new PathLookatFixed('path_in', this.scene, this.config.path_in, this.config.path_in_lookat, 0x00FF00);
	    this.path_out = new PathLookatCurve('path_out', this.scene, this.config.path_out, this.config.path_out_lookat, 0x00FF00);

	    /*
	    		Mouse
	     */
	    this.mouse = new Mouse($('body'));

	    /*
	    		Sounds
	     */
	    this.audio_pos_z = this.config.audio_pos_z_in;
	    this.sounds = {
	      base_1: utils.get_asset('base_1', this.manifest).data,
	      base_2: utils.get_asset('base_2', this.manifest).data,
	      base_3: utils.get_asset('base_3', this.manifest).data,
	      melody: utils.get_asset('melody', this.manifest).data
	    };
	    this.sounds.melody.volume(0.7);
	    this.sounds.melody.play();
	    this.sound_bases = [this.sounds.base_1, this.sounds.base_2, this.sounds.base_3];
	    ref = this.sound_bases;
	    for (j = 0, len = ref.length; j < len; j++) {
	      sound = ref[j];
	      sound.volume(0);
	      sound.play();
	    }
	    ref1 = this.sounds;
	    for (key in ref1) {
	      sound = ref1[key];
	      sound.loop(true);
	    }

	    /*
	    		Objects
	     */
	    this.container = new THREE.Object3D;
	    this.scene.add(this.container);
	    this.materials = [];
	    this.materials.push(this.generate_material('lvl0'));
	    this.materials.push(this.generate_material('lvl1'));
	    this.materials.push(this.generate_material('lvl2'));
	    this.user_material = this.generate_material('lvl0');
	    this.iteration = 1;
	    this.generate_mesh(this.iteration);
	    this.bind();
	    return this.emit('setup:complete');
	  };

	  Blackice.prototype.generate_material = function(id) {
	    var asset, cubemap, j, len, material, ref, ref1, sides, urls;
	    urls = [];
	    sides = [id + "-pos-x", id + "-neg-x", id + "-pos-y", id + "-neg-y", id + "-pos-z", id + "-neg-z"];
	    ref = this.manifest;
	    for (j = 0, len = ref.length; j < len; j++) {
	      asset = ref[j];
	      if (ref1 = asset.id, indexOf.call(sides, ref1) >= 0) {
	        urls.push(asset.src);
	      }
	    }
	    cubemap = THREE.ImageUtils.loadTextureCube(urls);
	    cubemap.format = THREE.RGBFormat;
	    material = new THREE.MeshBasicMaterial({
	      color: 0xcccccc,
	      envMap: cubemap,
	      shading: THREE.FlatShading,
	      side: THREE.DoubleSide
	    });
	    return material;
	  };

	  Blackice.prototype.bind = function() {
	    Blackice.__super__.bind.call(this);
	    this.hotspot.on('click', this.on_click);
	    this.ui.bind();
	    this.hotspot.bind();
	    this.mouse.bind();
	    return $(window).on('dragover', this.on_dragover).on('drop', this.on_drop);
	  };

	  Blackice.prototype.unbind = function() {
	    Blackice.__super__.unbind.call(this);
	    this.hotspot.off('click', this.on_click);
	    this.ui.unbind();
	    this.hotspot.unbind();
	    this.mouse.unbind();
	    return $(window).off('dragover', this.on_dragover).on('drop', this.on_drop);
	  };

	  Blackice.prototype.on_dragover = function(event) {
	    event.preventDefault();
	    return event.stopPropagation();
	  };

	  Blackice.prototype.on_drop = function(event) {
	    var file, reader;
	    event.preventDefault();
	    event.stopPropagation();
	    file = event.originalEvent.dataTransfer.files[0];
	    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
	      alert('File not supported, use an image instead');
	      return;
	    }
	    reader = new FileReader();
	    reader.onload = (function(_this) {
	      return function(event) {
	        var image;
	        _this.user_added_texture = true;
	        image = event.target.result;
	        return _this.update_cube_map(image);
	      };
	    })(this);
	    return reader.readAsDataURL(file);
	  };

	  Blackice.prototype.update_cube_map = function(image) {
	    var el, img;
	    el = $('#cubemap');
	    img = new Image();
	    img.onload = (function(_this) {
	      return function() {
	        var canvas, context, height, j, len, ref, results, scale, tile_size, url, width;
	        width = img.width;
	        height = img.height;
	        scale = 4;
	        el.css({
	          'width': (width / scale) + 'px',
	          'height': (height / scale) + 'px'
	        });
	        el.find('img').attr('src', image);
	        canvas = document.createElement('canvas');
	        canvas.setAttribute('width', width);
	        canvas.setAttribute('height', height);
	        context = canvas.getContext('2d');
	        context.drawImage(img, 0, 0);
	        if ((height / width) > 1) {
	          tile_size = img.width / 3;
	        } else {
	          tile_size = img.height / 3;
	        }
	        _this.urls = [];
	        _this.urls.push(_this.get_cubemap_tile(context, tile_size, 0, tile_size));
	        _this.urls.push(_this.get_cubemap_tile(context, 0, tile_size, tile_size));
	        _this.urls.push(_this.get_cubemap_tile(context, tile_size, tile_size, tile_size));
	        _this.urls.push(_this.get_cubemap_tile(context, tile_size * 2, tile_size, tile_size));
	        _this.urls.push(_this.get_cubemap_tile(context, tile_size * 3, tile_size, tile_size));
	        _this.urls.push(_this.get_cubemap_tile(context, tile_size, tile_size * 2, tile_size));
	        _this.counter_url = 0;
	        ref = _this.urls;
	        results = [];
	        for (j = 0, len = ref.length; j < len; j++) {
	          url = ref[j];
	          img = new Image;
	          img.onload = _this.on_cubemap_url_loaded;
	          results.push(img.setAttribute('src', url));
	        }
	        return results;
	      };
	    })(this);
	    return img.setAttribute('src', image);
	  };

	  Blackice.prototype.on_cubemap_url_loaded = function() {
	    var i, item, j, len, ref;
	    this.counter_url++;
	    if (this.counter_url === this.urls.length) {
	      ref = this.user_material.envMap.image;
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        item = ref[i];
	        item.removeAttribute('crossorigin');
	        item.setAttribute('src', this.urls[i]);
	      }
	      this.user_material.envMap.needsUpdate = true;
	      this.user_material.needsUpdate = true;
	    }
	    return this.generate_mesh();
	  };

	  Blackice.prototype.get_cubemap_tile = function(context, x, y, tile_size) {
	    var c, ctx, data_url, imgData;
	    c = $('<canvas/>');
	    c.attr('width', tile_size);
	    c.attr('height', tile_size);
	    ctx = c[0].getContext("2d");
	    imgData = context.getImageData(x, y, tile_size, tile_size);
	    ctx.putImageData(imgData, 0, 0);
	    data_url = c[0].toDataURL('image/jpeg');
	    return data_url;
	  };

	  Blackice.prototype.generate_mesh = function() {
	    var NOISE, geometry, i, ice_noise, j, k, l, len, len1, material, ref, ref1, set, sound, v;
	    this.container.remove(this.mesh);
	    ice_noise = [0.35, 0.3, 0.2];
	    NOISE = ice_noise[this.iteration - 1];
	    this.vertex_sets = [0];
	    geometry = new THREE.IcosahedronGeometry(50, 2);
	    for (i = j = 0, ref = this.iteration; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      geometry = this.smooth_geometry(geometry, i);
	      set = geometry.vertices.slice(this.vertex_sets[i], this.vertex_sets[i + 1]);
	      for (k = 0, len = set.length; k < len; k++) {
	        v = set[k];
	        v.multiplyScalar(1 + Math.random() * NOISE);
	      }
	    }
	    if (this.user_added_texture) {
	      material = this.user_material;
	    } else {
	      material = this.materials[this.iteration - 1];
	    }
	    this.mesh = new THREE.Mesh(geometry, material);
	    this.container.add(this.mesh);
	    if (!this.first_time) {
	      ref1 = this.sound_bases;
	      for (l = 0, len1 = ref1.length; l < len1; l++) {
	        sound = ref1[l];
	        sound.fade(1, 0, 500);
	      }
	    }
	    this.sound_bases[this.iteration - 1].fade(0, 1, 500);
	    return this.first_time = false;
	  };

	  Blackice.prototype.smooth_geometry = function(geometry, subdivision) {
	    var modifier, smooth;
	    modifier = new THREE.SubdivisionModifier(subdivision);
	    smooth = geometry.clone();
	    modifier.modify(smooth);
	    this.vertex_sets.push(smooth.vertices.length);
	    return smooth;
	  };

	  Blackice.prototype.transition_in = function() {
	    var params;
	    Blackice.__super__.transition_in.call(this);
	    params = {
	      x: Math.PI * 0.3,
	      y: Math.PI * 0.5,
	      z: Math.PI * 0.2,
	      ease: Power1.easeOut
	    };
	    TweenLite.to(this.mesh.rotation, this.config.camera_in_duration, params);
	    utils.delay(8, (function(_this) {
	      return function() {
	        _this.interation_lock = false;
	        return TweenLite.killTweensOf(_this.mesh.rotation);
	      };
	    })(this));
	    params = {
	      audio_pos_z: 0,
	      ease: Power1.easeOut
	    };
	    return TweenLite.to(this, this.config.camera_in_duration, params);
	  };

	  Blackice.prototype.update = function() {
	    var base, preset, x, y, z;
	    preset = this.get_preset();
	    x = Math.abs(this.mouse.normal_center_x);
	    y = this.mouse.normal_center_y;
	    z = this.audio_pos_z;
	    base = this.sound_bases[this.iteration - 1];
	    base.pos(x, y, z);
	    this.sounds.melody.pos(0, 0, z);
	    x *= preset.vel_x;
	    this.mesh.rotation.x += this.accel_x * (this.mouse.normal_center_x * preset.movement_speed);
	    this.mesh.rotation.y += this.accel_x * (this.mouse.normal_center_y * preset.movement_speed);
	    return this.mesh.rotation.z += this.accel_y * (this.mouse.normal_center_y * preset.movement_speed);
	  };

	  Blackice.prototype.get_preset = function() {
	    return this.config.iteration_preset[this.iteration - 1];
	  };

	  Blackice.prototype.on_click = function() {
	    if (this.is_transitioning_out) {
	      return;
	    }
	    this.force_transition_in_complete();
	    if (this.iteration > 2) {
	      this.iteration = 1;
	    } else {
	      this.iteration++;
	    }
	    return this.generate_mesh(this.iteration);
	  };

	  return Blackice;

	})(Experiment);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var AsyncLoader, BinaryLoader, DataLoader, GeometryLoader, ImageLoader, ScriptLoader, SequenceLoader, SoundLoader, happens,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	DataLoader = __webpack_require__(27);

	BinaryLoader = __webpack_require__(28);

	ImageLoader = __webpack_require__(29);

	ScriptLoader = __webpack_require__(30);

	GeometryLoader = __webpack_require__(31);

	SoundLoader = __webpack_require__(32);

	Element.prototype.remove = function() {
	  this.parentElement.removeChild(this);
	};

	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	  var i, len;
	  i = 0;
	  len = this.length;
	  while (i < len) {
	    if (this[i] && this[i].parentElement) {
	      this[i].parentElement.removeChild(this[i]);
	    }
	    i++;
	  }
	};


	/*
	Load files asynchronously
	 */

	module.exports = AsyncLoader = (function() {
	  function AsyncLoader() {
	    this.error = bind(this.error, this);
	    this.success = bind(this.success, this);
	    happens(this);
	    this.manifest = [];
	  }

	  AsyncLoader.prototype.add = function(id, file, type, data) {
	    var obj;
	    obj = {
	      id: id,
	      src: file,
	      type: type,
	      data: data
	    };
	    return this.manifest.push(obj);
	  };

	  AsyncLoader.prototype.load = function() {
	    var asset, j, l, len1, ref, results;
	    this.count = 0;
	    this.total = this.manifest.length;
	    this.date = new Date();
	    ref = this.manifest;
	    results = [];
	    for (j = 0, len1 = ref.length; j < len1; j++) {
	      asset = ref[j];
	      switch (asset.type) {
	        case 'json':
	        case 'xml':
	          l = new DataLoader;
	          l.once('loaded', this.success);
	          results.push(l.load(asset));
	          break;
	        case 'image':
	          l = new ImageLoader;
	          l.once('loaded', this.success);
	          results.push(l.load(asset));
	          break;
	        case 'binary':
	          l = new BinaryLoader;
	          l.once('loaded', this.success);
	          results.push(l.load(asset));
	          break;
	        case 'js':
	          l = new ScriptLoader;
	          l.once('loaded', this.success);
	          results.push(l.load(asset));
	          break;
	        case 'geometry':
	          l = new GeometryLoader;
	          l.once('loaded', this.success);
	          results.push(l.load(asset));
	          break;
	        case 'sound':
	          l = new SoundLoader;
	          l.once('loaded', this.success);
	          results.push(l.load(asset));
	          break;
	        case 'sequence':
	          l = new SequenceLoader;
	          l.once('loaded', this.success);
	          results.push(l.load(asset));
	          break;
	        default:
	          results.push(void 0);
	      }
	    }
	    return results;
	  };

	  AsyncLoader.prototype.dispose = function() {
	    var asset, j, len1, ref, results;
	    ref = this.manifest;
	    results = [];
	    for (j = 0, len1 = ref.length; j < len1; j++) {
	      asset = ref[j];
	      switch (asset.type) {
	        case 'js':
	          results.push(document.getElementById(asset.id).remove());
	          break;
	        default:
	          results.push(void 0);
	      }
	    }
	    return results;
	  };

	  AsyncLoader.prototype.success = function(asset) {
	    this.count++;
	    if (this.count >= this.total) {
	      return this.emit('loaded', this.manifest);
	    }
	  };

	  AsyncLoader.prototype.error = function(error) {
	    return c.log('error', error);
	  };

	  AsyncLoader.prototype.get_asset = function(id) {
	    var asset, j, len1, ref, result;
	    result = false;
	    ref = this.manifest;
	    for (j = 0, len1 = ref.length; j < len1; j++) {
	      asset = ref[j];
	      if (asset.id.match(id)) {
	        result = asset;
	      }
	    }
	    return result;
	  };

	  return AsyncLoader;

	})();

	SequenceLoader = (function() {
	  function SequenceLoader() {
	    this.images_loaded = bind(this.images_loaded, this);
	    this.data_loaded = bind(this.data_loaded, this);
	    happens(this);
	    this.images = [];
	    this.data_loader = new DataLoader();
	    this.img_loader = new AsyncLoader();
	    this.data_loader.once('loaded', this.data_loaded);
	    this.img_loader.once('loaded', this.images_loaded);
	  }

	  SequenceLoader.prototype.load = function(asset1) {
	    this.asset = asset1;
	    return this.data_loader.load({
	      src: this.asset.src
	    });
	  };

	  SequenceLoader.prototype.data_loaded = function(asset) {
	    var file, i, j, path, ref, segments;
	    this.asset.data = asset.data;
	    segments = asset.src.split('/');
	    path = segments.splice(0, segments.length - 1).join('/');
	    for (i = j = 0, ref = asset.data.total_spritesheets; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      file = path + '/' + i + '.' + asset.data.extensions[0];
	      this.img_loader.add("frame_" + i, file, 'image', {});
	    }
	    return this.img_loader.load();
	  };

	  SequenceLoader.prototype.images_loaded = function(assets) {
	    var asset, j, len1;
	    this.asset.images = [];
	    for (j = 0, len1 = assets.length; j < len1; j++) {
	      asset = assets[j];
	      this.asset.images.push(asset.data);
	    }
	    delete this.data_loader;
	    delete this.img_loader;
	    return this.emit('loaded', this.asset);
	  };

	  return SequenceLoader;

	})();


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var DataLoader, happens;

	happens = __webpack_require__(8);

	module.exports = DataLoader = (function() {
	  function DataLoader() {
	    happens(this);
	  }

	  DataLoader.prototype.load = function(asset) {
	    return $.ajax({
	      url: asset.src,
	      dataType: asset.type,
	      success: (function(_this) {
	        return function(data) {
	          asset.data = data;
	          return _this.emit('loaded', asset);
	        };
	      })(this),
	      error: (function(_this) {
	        return function(error) {
	          return c.error('error', error);
	        };
	      })(this)
	    });
	  };

	  return DataLoader;

	})();


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var BinaryLoader, happens;

	happens = __webpack_require__(8);

	module.exports = BinaryLoader = (function() {
	  function BinaryLoader() {
	    happens(this);
	  }

	  BinaryLoader.prototype.load = function(asset) {
	    var type, xhr;
	    xhr = this.req();
	    if (!type) {
	      type = "arraybuffer";
	      try {
	        if (Blob.prototype.slice) {
	          type = "blob";
	        }
	      } catch (undefined) {}
	    }
	    xhr.open("GET", asset.src, true);
	    xhr.responseType = type;
	    xhr.onprogress = function(e) {};
	    xhr.onreadystatechange = (function(_this) {
	      return function(e) {
	        if (xhr.readyState === 4) {
	          asset.data = xhr.response;
	          _this.emit('loaded', asset);
	          xhr.onreadystatechange = null;
	        }
	      };
	    })(this);
	    return xhr.send(null);
	  };

	  BinaryLoader.prototype.req = function() {
	    if (window.XMLHttpRequest) {
	      return new XMLHttpRequest();
	    }
	    if (window.ActiveXObject) {
	      return new ActiveXObject("MSXML2.XMLHTTP.3.0");
	    }
	  };

	  return BinaryLoader;

	})();


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var ImageLoader, happens;

	happens = __webpack_require__(8);

	module.exports = ImageLoader = (function() {
	  function ImageLoader() {
	    happens(this);
	  }

	  ImageLoader.prototype.load = function(asset) {
	    var image;
	    image = new Image();
	    image.onload = (function(_this) {
	      return function() {
	        asset.data = image;
	        return _this.emit('loaded', asset);
	      };
	    })(this);
	    return image.src = asset.src;
	  };

	  return ImageLoader;

	})();


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var ImageLoader, happens;

	happens = __webpack_require__(8);

	module.exports = ImageLoader = (function() {
	  function ImageLoader() {
	    happens(this);
	  }

	  ImageLoader.prototype.load = function(asset) {
	    var script;
	    script = document.createElement('script');
	    script.setAttribute("type", "text/javascript");
	    script.setAttribute("src", asset.src);
	    script.setAttribute("id", asset.id);
	    script.onload = (function(_this) {
	      return function() {
	        return _this.emit('loaded', asset);
	      };
	    })(this);
	    return document.getElementsByTagName("head")[0].appendChild(script);
	  };

	  return ImageLoader;

	})();


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var GeometryLoader, happens;

	happens = __webpack_require__(8);

	module.exports = GeometryLoader = (function() {
	  function GeometryLoader() {
	    happens(this);
	  }

	  GeometryLoader.prototype.load = function(asset) {
	    var loader;
	    loader = new THREE.JSONLoader();
	    return loader.load(asset.src, (function(_this) {
	      return function(geometry) {
	        asset.data = geometry;
	        return _this.emit('loaded', asset);
	      };
	    })(this));
	  };

	  return GeometryLoader;

	})();


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var SoundLoader, happens;

	happens = __webpack_require__(8);

	module.exports = SoundLoader = (function() {
	  function SoundLoader() {
	    happens(this);
	  }

	  SoundLoader.prototype.load = function(asset) {
	    var sound;
	    return sound = new Howl({
	      src: [asset.src],
	      onload: (function(_this) {
	        return function() {
	          asset.data = sound;
	          return _this.emit('loaded', asset);
	        };
	      })(this)
	    });
	  };

	  return SoundLoader;

	})();


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Mouse, happens, win,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	win = __webpack_require__(9);

	module.exports = Mouse = (function() {
	  Mouse.prototype.mouse_x = 0;

	  Mouse.prototype.mouse_y = 0;

	  Mouse.prototype.mouse_last_x = 0;

	  Mouse.prototype.mouse_last_y = 0;

	  Mouse.prototype.normal_x = 0;

	  Mouse.prototype.normal_y = 0;

	  Mouse.prototype.normal_center_x = 0;

	  Mouse.prototype.normal_center_y = 0;

	  Mouse.prototype.clicked_x = 0;

	  Mouse.prototype.clicked_y = 0;

	  Mouse.prototype.is_down = false;

	  Mouse.prototype.is_dragging = false;

	  function Mouse(el) {
	    this.el = el;
	    this.mouseup = bind(this.mouseup, this);
	    this.mousedown = bind(this.mousedown, this);
	    this.mousemove = bind(this.mousemove, this);
	    happens(this);
	  }

	  Mouse.prototype.bind = function() {
	    this.el.on('mousedown', this.mousedown);
	    this.el.on('mouseup', this.mouseup);
	    return this.el.on('mousemove', this.mousemove);
	  };

	  Mouse.prototype.unbind = function() {
	    this.el.off('mousedown', this.mousedown);
	    this.el.off('mouseup', this.mouseup);
	    return this.el.off('click', this.click);
	  };

	  Mouse.prototype.mousemove = function(event) {
	    var position;
	    this.mouse_last_x = this.mouse_x;
	    this.mouse_last_y = this.mouse_y;
	    position = this._get_event_position(event);
	    this.mouse_x = position.x;
	    this.mouse_y = position.y;
	    this.normal_x = this.mouse_x / win.width;
	    this.normal_y = this.mouse_y / win.height;
	    this.normal_center_x = -0.5 + this.normal_x;
	    this.normal_center_y = -0.5 + this.normal_y;
	    if (this.is_down) {
	      this.is_dragging = true;
	    } else {
	      this.is_dragging = false;
	    }
	    return this.emit('move');
	  };

	  Mouse.prototype.mousedown = function(event) {
	    var position;
	    this.is_down = true;
	    position = this._get_event_position(event);
	    this.clicked_x = position.x;
	    this.clicked_y = position.y;
	    return this.emit('down', position);
	  };

	  Mouse.prototype.mouseup = function(event) {
	    this.is_down = false;
	    return this.emit('up');
	  };

	  Mouse.prototype.distance_to = function(x, y) {
	    return Math.sqrt((x - this.normal_x) * (x - this.normal_x) + (y - this.normal_y) * (y - this.normal_y));
	  };


	  /*
	  	Get the touch / mouse position and return the coords
	  	@param  {Object} event
	  	@return {Object}
	   */

	  Mouse.prototype._get_event_position = function(event) {
	    var evt_x, evt_y;
	    evt_x = event.pageX;
	    evt_y = event.pageY;
	    return {
	      x: evt_x,
	      y: evt_y
	    };
	  };

	  return Mouse;

	})();


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = {
	  lerp: function(min, max, ratio) {
	    return min + ((max - min) * ratio);
	  },
	  random: function(min, max) {
	    return min + Math.random() * (max - min);
	  },
	  radians: function(degrees) {
	    return degrees * Math.PI / 180;
	  },
	  degrees: function(radians) {
	    return radians * 180 / Math.PI;
	  },
	  spline: function(points) {
	    var j, len, point, tmp;
	    tmp = [];
	    for (j = 0, len = points.length; j < len; j++) {
	      point = points[j];
	      tmp.push(point.clone());
	    }
	    return new THREE.SplineCurve3(tmp);
	  },
	  delay: function(delay, func) {
	    return setTimeout(func, delay * 1000);
	  },

	  /*
	  	https://gist.github.com/svlasov-gists/2383751
	   */
	  merge: function(target, source) {
	    var a, l, property, sourceProperty;
	    if (typeof target !== "object") {
	      target = {};
	    }
	    for (property in source) {
	      if (source.hasOwnProperty(property)) {
	        sourceProperty = source[property];
	        if (typeof sourceProperty === "object") {
	          target[property] = this.merge(target[property], sourceProperty);
	          continue;
	        }
	        target[property] = sourceProperty;
	      }
	    }
	    a = 2;
	    l = arguments.length;
	    while (a < l) {
	      merge(target, arguments[a]);
	      a++;
	    }
	    return target;
	  },
	  path: function(scene, positions, color, gui, smoothness) {
	    var bounds, geometry, i, j, k, len, line, mesh, meshes, path_points, point, points, ref, size, spline;
	    if (positions == null) {
	      positions = [];
	    }
	    if (color == null) {
	      color = 0xFF0000;
	    }
	    if (gui == null) {
	      gui = null;
	    }
	    if (smoothness == null) {
	      smoothness = 100;
	    }
	    path_points = (function() {
	      var j, ref, results;
	      results = [];
	      for (i = j = 0, ref = positions.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	        results.push("" + i);
	      }
	      return results;
	    })();
	    bounds = 10000;
	    meshes = [];
	    size = 50;
	    for (i = j = 0, ref = path_points.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 16, 16), new THREE.MeshBasicMaterial({
	        color: color,
	        wireframe: true
	      }));
	      mesh.name = "path_" + i;
	      mesh.position.fromArray(positions[i]);
	      if (gui) {
	        gui.add(mesh, 'name');
	        gui.add(mesh.position, 'x', -bounds, bounds).name('position x');
	        gui.add(mesh.position, 'y', -bounds, bounds).name('position y');
	        gui.add(mesh.position, 'z', -bounds, bounds).name('position z');
	      }
	      meshes.push(mesh);
	    }
	    positions = (function() {
	      var k, len, results;
	      results = [];
	      for (k = 0, len = meshes.length; k < len; k++) {
	        mesh = meshes[k];
	        results.push(mesh.position.clone());
	      }
	      return results;
	    })();
	    spline = this.spline(positions);
	    points = spline.getPoints(smoothness);
	    geometry = new THREE.Geometry;
	    for (k = 0, len = points.length; k < len; k++) {
	      point = points[k];
	      geometry.vertices.push(point.clone());
	    }
	    line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
	      color: color
	    }));
	    return this.spline(points);
	  },
	  gui_controls: function(gui, object, name, position_bounds) {
	    var folder, rotation_bounds;
	    if (position_bounds == null) {
	      position_bounds = 100;
	    }
	    rotation_bounds = Math.PI * 2;
	    object.updateMatrix();
	    folder = gui.addFolder(name);
	    folder.add(object.position, 'x', -position_bounds, position_bounds);
	    folder.add(object.position, 'y', -position_bounds, position_bounds);
	    folder.add(object.position, 'z', -position_bounds, position_bounds);
	    folder.add(object.rotation, 'x', -rotation_bounds, rotation_bounds);
	    folder.add(object.rotation, 'y', -rotation_bounds, rotation_bounds);
	    return folder.add(object.rotation, 'z', -rotation_bounds, rotation_bounds);
	  },
	  get_asset: function(id, manifest) {
	    var asset, j, len, result;
	    result = false;
	    for (j = 0, len = manifest.length; j < len; j++) {
	      asset = manifest[j];
	      if (asset.id.match(id)) {
	        result = asset;
	      }
	    }
	    return result;
	  }
	};

	window.PI = Math.PI;

	window.HALF_PI = Math.PI / 2;

	window.PI_2 = Math.PI * 2;

	Number.prototype.map = function(in_min, in_max, out_min, out_max) {
	  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	};

	String.prototype.capitalizeFirstLetter = function() {
	  return this.charAt(0).toUpperCase() + this.slice(1);
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var Keyboard, happens, win,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	win = __webpack_require__(9);

	module.exports = Keyboard = (function() {
	  Keyboard.prototype.key = 0;

	  Keyboard.prototype._enabled = false;

	  function Keyboard(el) {
	    this.el = el;
	    this.keyup = bind(this.keyup, this);
	    this.keydown = bind(this.keydown, this);
	    happens(this);
	  }

	  Keyboard.prototype.bind = function() {
	    this._enabled = true;
	    this.el.on('keydown', this.keydown);
	    return this.el.on('keyup', this.keyup);
	  };

	  Keyboard.prototype.unbind = function() {
	    return this._enabled = false;
	  };

	  Keyboard.prototype.keydown = function(event) {
	    event.preventDefault();
	    if (!this._enabled) {
	      return;
	    }
	    this.key = event.keyCode;
	    switch (this.key) {
	      case 32:
	        return this.emit('key:down:space');
	    }
	  };

	  Keyboard.prototype.keyup = function(event) {
	    if (this.key === 32) {
	      return this.emit('key:up:space');
	    }
	  };

	  return Keyboard;

	})();


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var Experiment, Keyboard, Loader, cameras, engine, happens, renderer, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	Loader = __webpack_require__(26);

	cameras = __webpack_require__(16);

	renderer = __webpack_require__(18);

	Keyboard = __webpack_require__(35);

	engine = __webpack_require__(7);

	utils = __webpack_require__(34);

	module.exports = Experiment = (function() {
	  Experiment.prototype.has_transitioned_out = false;

	  Experiment.prototype.is_transitioning = false;

	  Experiment.prototype.is_transitioning_in = false;

	  Experiment.prototype.is_transitioning_out = false;

	  Experiment.prototype.transition_progress = 0;

	  Experiment.prototype.is_transition_disabled = false;

	  Experiment.prototype.transition_lock = false;

	  Experiment.prototype.audio_pos_x = 0;

	  Experiment.prototype.audio_pos_y = 0;

	  Experiment.prototype.audio_pos_z = 0;

	  Experiment.prototype.sounds = Array;

	  function Experiment(scene, gui, assets, config) {
	    this.scene = scene;
	    this.gui = gui;
	    this.assets = assets;
	    this.config = config;
	    this.next = bind(this.next, this);
	    this.transition_out_forward = bind(this.transition_out_forward, this);
	    this.transition_out_backward = bind(this.transition_out_backward, this);
	    this.on_key_up = bind(this.on_key_up, this);
	    this.on_key_down = bind(this.on_key_down, this);
	    happens(this);

	    /*
	    		Tweens
	     */
	    this.tweens = [];

	    /*
	    		Keyboard controls
	     */
	    this.keyboard = new Keyboard($(window));
	  }

	  Experiment.prototype.load = function() {

	    /*
	    		Preload the assets
	     */
	    var asset, i, len, ref;
	    this.loader = new Loader;
	    ref = this.assets;
	    for (i = 0, len = ref.length; i < len; i++) {
	      asset = ref[i];
	      this.loader.add(asset.id, asset.url, asset.type);
	    }
	    this.loader.once('loaded', this.setup);
	    return this.loader.load();
	  };

	  Experiment.prototype.bind = function() {
	    engine.on('update', this.update);
	    this.keyboard.on('key:down:space', this.on_key_down);
	    this.keyboard.on('key:up:space', this.on_key_up);
	    return this.keyboard.bind();
	  };

	  Experiment.prototype.unbind = function() {
	    engine.off('update', this.update);
	    this.keyboard.off('key:down:space', this.on_key_down);
	    return this.keyboard.off('key:up:space', this.on_key_up);
	  };

	  Experiment.prototype.on_key_down = function() {
	    if (this.is_transitioning_in) {
	      return;
	    }
	    if (this.is_transition_disabled) {
	      return;
	    }
	    return this.transition_out_forward();
	  };

	  Experiment.prototype.on_key_up = function() {
	    return this.transition_out_backward();
	  };


	  /*
	  	Transition in
	   */

	  Experiment.prototype.transition_in = function() {
	    var params, position, tween, tween_ui;
	    this.emit('transition:in:complete');
	    this.is_transitioning = true;
	    this.is_transitioning_in = true;

	    /*
	    		UI
	     */
	    position = this.config.path_in[0];
	    cameras.user.position.set(position.x, position.y, position.z);
	    cameras.user.lookAt(new THREE.Vector3);
	    this.ui.transition_in();

	    /*
	    		Camera
	     */
	    tween = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      ease: Power2.easeOut,
	      onStart: (function(_this) {
	        return function() {
	          return _this.emit('transition:in:start');
	        };
	      })(this),
	      onUpdate: (function(_this) {
	        return function() {
	          position = _this.path_in.spline.getPointAt(tween.progress);
	          cameras.user.position.copy(position);
	          cameras.user.lookAt(new THREE.Vector3);
	          return _this.emit('transition:in:update', tween.progress);
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          _this.is_transitioning = false;
	          return _this.is_transitioning_in = false;
	        };
	      })(this)
	    };
	    if (this.config.transition_debug) {
	      this.config.camera_in_duration = 0.1;
	    }
	    this.camera_tween = TweenLite.to(tween, this.config.camera_in_duration, params);

	    /*
	    		UI
	     */
	    tween_ui = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      onComplete: (function(_this) {
	        return function() {
	          return _this.ui.transition_out();
	        };
	      })(this)
	    };
	    this.ui_tween = TweenLite.to(tween_ui, this.config.camera_in_duration, params);

	    /*
	    		Sound
	     */
	    params = {
	      audio_pos_z: 0,
	      ease: Power1.easeOut
	    };
	    TweenLite.to(this, this.config.camera_in_duration, params);

	    /*
	    		Fog
	     */
	    if (this.config.fog_enabled) {
	      this.scene.fog.density = this.config.fog_in_start;
	      params = {
	        density: this.config.fog_in_end,
	        ease: Power2.easeOut
	      };
	      if (this.config.transition_debug) {
	        this.config.fog_in_duration = 0;
	      }
	      return this.fog_tween = TweenLite.to(this.scene.fog, this.config.fog_in_duration, params);
	    }
	  };

	  Experiment.prototype.force_transition_in_complete = function() {
	    return utils.delay(2, (function(_this) {
	      return function() {
	        return _this.ui_tween.totalProgress(1).kill();
	      };
	    })(this));
	  };


	  /*
	  	Transition out
	   */

	  Experiment.prototype.transition_out_backward = function() {
	    var duration, params, tween;
	    if (this.is_transition_disabled) {
	      return;
	    }
	    if (this.transition_progress === 0) {
	      return;
	    }
	    if (this.transition_progress > 0.6) {
	      return;
	    }

	    /*
	    		Kill current tweens
	     */
	    this.kill_tweens();

	    /*
	    		UI
	     */
	    this.ui.show();

	    /*
	    		Camera
	     */
	    tween = {
	      progress: this.transition_progress
	    };
	    params = {
	      progress: 0,
	      ease: Power3.easeOut,
	      onUpdate: (function(_this) {
	        return function() {
	          var position, value;
	          position = _this.path_out.spline.getPointAt(tween.progress);
	          cameras.user.position.copy(position);
	          position = _this.path_out.spline_camera.getPointAt(tween.progress);
	          cameras.user.lookAt(position);
	          value = Math.max(value, 0);
	          value = Math.min(value, 1);
	          return _this.audio_pos_z = utils.lerp(0, _this.config.audio_pos_z_out, tween.progress);
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          _this.is_transitioning = false;
	          return _this.is_transitioning_out = false;
	        };
	      })(this)
	    };
	    duration = 1 + (1 * this.transition_progress);
	    this.tweens.push(TweenLite.to(tween, duration, params));

	    /*
	    		Dim
	     */
	    params = {
	      opacity: 0,
	      ease: Power3.easeOut
	    };
	    this.tweens.push(TweenLite.to(this.ui.ui.transition_black, duration, params));

	    /*
	    		Fog
	     */
	    if (this.config.fog_enabled) {
	      params = {
	        density: this.config.fog_in_end,
	        ease: Power2.easeInOut
	      };
	      return this.tweens.push(TweenLite.to(this.scene.fog, duration, params));
	    }
	  };


	  /*
	  	Transition out
	   */

	  Experiment.prototype.transition_out_forward = function(fast_transition) {
	    var axis, params, tween, up;
	    if (fast_transition == null) {
	      fast_transition = false;
	    }
	    if (this.is_transitioning_out) {
	      return;
	    }
	    if (this.is_transition_disabled) {
	      return;
	    }
	    if (this.is_transitioning) {
	      this.transition_out_fast();
	      return;
	    }
	    if (this.is_transitioning) {
	      return;
	    }
	    this.is_transitioning = true;
	    this.is_transitioning_out = true;

	    /*
	    		Kill current tweens
	     */
	    this.kill_tweens();

	    /*
	    		UI
	     */
	    this.ui.hide();

	    /*
	    		Camera
	     */
	    up = new THREE.Vector3(0, 0, -1);
	    axis = new THREE.Vector3;
	    tween = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      ease: Power2.easeIn,
	      onUpdate: (function(_this) {
	        return function() {
	          var position;
	          _this.transition_progress = tween.progress;
	          position = _this.path_out.spline.getPointAt(tween.progress);
	          cameras.user.position.copy(position);
	          position = _this.path_out.spline_camera.getPointAt(tween.progress);
	          cameras.user.lookAt(position);
	          return _this.audio_pos_z = utils.lerp(0, _this.config.audio_pos_z_out, tween.progress);
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          return _this.next();
	        };
	      })(this)
	    };
	    this.tweens.push(TweenLite.to(tween, this.config.camera_out_duration, params));

	    /*
	    		Dim
	     */
	    params = {
	      opacity: 1,
	      ease: Power2.easeIn
	    };
	    this.tweens.push(TweenLite.to(this.ui.ui.transition_black, this.config.camera_out_duration, params));

	    /*
	    		Fog
	     */
	    if (this.config.fog_enabled) {
	      this.scene.fog.density = this.config.fog_out_start;
	      params = {
	        density: this.config.fog_out_end,
	        ease: Power2.easeInOut
	      };
	      return this.tweens.push(TweenLite.to(this.scene.fog, this.config.fog_out_duration, params));
	    }
	  };

	  Experiment.prototype.transition_out_fast = function() {
	    this.ui.once('transition:out:fast:complete', (function(_this) {
	      return function() {
	        _this.kill_tweens();
	        return _this.next();
	      };
	    })(this));
	    return this.ui.transition_out_fast();
	  };

	  Experiment.prototype.next = function() {
	    this.has_transitioned_out = true;
	    return this.emit('next');
	  };

	  Experiment.prototype.kill_tweens = function() {
	    var i, len, ref, results, tween;
	    ref = this.tweens;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      tween = ref[i];
	      results.push(tween != null ? tween.kill() : void 0);
	    }
	    return results;
	  };

	  Experiment.prototype.enable_transition = function() {
	    return this.is_transition_disabled = false;
	  };

	  Experiment.prototype.disable_transition = function() {
	    return this.is_transition_disabled = true;
	  };

	  Experiment.prototype.destroy = function() {
	    var i, key, len, object, ref, ref1, sound;
	    c.log('destroy');
	    ref = this.scene.children;
	    for (i = 0, len = ref.length; i < len; i++) {
	      object = ref[i];
	      this.scene.remove(object);
	    }
	    ref1 = this.sounds;
	    for (key in ref1) {
	      sound = ref1[key];
	      sound.stop();
	      sound.unload();
	    }
	    renderer.shadowMapEnabled = false;
	    renderer.shadowMapSoft = false;
	    this.unbind();
	    this.ui.destroy();
	    this.loader.dispose();
	    return this.emit('destroyed');
	  };

	  return Experiment;

	})();


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var TextFX, UI, cameras, dictionary, happens, scenes, settings, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	dictionary = __webpack_require__(38);

	scenes = __webpack_require__(39);

	utils = __webpack_require__(34);

	cameras = __webpack_require__(16);

	TextFX = __webpack_require__(41);

	settings = __webpack_require__(10);

	module.exports = UI = (function() {
	  UI.prototype.is_overlay_open = true;

	  UI.prototype.ui = Object;

	  UI.prototype._disabled = false;

	  function UI(id1, assets) {
	    var data, id, key, locals, ref, template;
	    this.id = id1;
	    this.assets = assets;
	    this.show_about = bind(this.show_about, this);
	    happens(this);
	    this.ui = {
	      'ui': '.ui',
	      'dim': '.dim',
	      'hitarea': '.hitarea',
	      'transition_black': '.transition_black',
	      'chapter': '.chapter',
	      'chapter_index': '.chapter_index',
	      'title': 'h2',
	      'about': '.about',
	      'interactions': '.interactions',
	      'authors': '.authors',
	      'next': '.next',
	      'next_title': '.next h3',
	      'next_text': '.next .caps-text'
	    };

	    /*
	    		Template
	     */
	    template = __webpack_require__(42);
	    data = scenes.get(this.id);
	    locals = {
	      data: data,
	      base_path: settings.base_path
	    };
	    $('main').append(template(locals));

	    /*
	     		Elements
	     */
	    this.el = $("#" + data.id);
	    ref = this.ui;
	    for (key in ref) {
	      id = ref[key];
	      this.ui[key] = this.el.find(id);
	    }
	    this.ui.letters = this.ui.about.lettering().children();
	    this.ui.next_letters = this.ui.next_text.lettering().children();
	    this.tweens = [];
	  }

	  UI.prototype.bind = function() {
	    return this.ui.next_title.on('click', this.show_about);
	  };

	  UI.prototype.unbind = function() {
	    return this.ui.next_title.off('click', this.show_about);
	  };

	  UI.prototype.disable_ui = function() {
	    this._disabled = true;
	    return this.el.addClass('disable');
	  };

	  UI.prototype.enable_ui = function() {
	    this._disabled = false;
	    return this.el.removeClass('disable');
	  };

	  UI.prototype.transition_in = function() {
	    var fx, params;
	    params = {
	      ease: Power2.easeIn,
	      z: 100
	    };
	    TweenLite.to(this.ui.chapter, 1.6, params);
	    params = {
	      autoAlpha: 1,
	      ease: Power2.easeIn
	    };
	    TweenLite.to(this.ui.chapter_index, 1.6, params);
	    params = {
	      autoAlpha: 1,
	      ease: Power1.easeInOut,
	      delay: 1.6
	    };
	    TweenLite.to(this.ui.title, 3, params);
	    fx = new TextFX;
	    fx.animate(this.ui.letters, 2000);
	    params = {
	      autoAlpha: 1,
	      ease: Power2.easeInOut,
	      delay: 5.7
	    };
	    TweenLite.to(this.ui.interactions, 1.6, params);
	    params = {
	      autoAlpha: 1,
	      ease: Power2.easeInOut,
	      delay: 5.7
	    };
	    return TweenLite.to(this.ui.authors, 1.6, params);
	  };

	  UI.prototype.transition_out = function() {
	    var params;
	    params = {
	      autoAlpha: 0,
	      ease: Power2.easeOut
	    };
	    TweenLite.to(this.ui.dim, 1.6, params);
	    params = {
	      autoAlpha: 0,
	      ease: Power2.easeOut,
	      onComplete: (function(_this) {
	        return function() {
	          params = {
	            autoAlpha: 1,
	            ease: Power2.easeIn,
	            onComplete: function() {
	              var fx;
	              fx = new TextFX;
	              return fx.animate(_this.ui.next_letters, 0);
	            }
	          };
	          return TweenLite.to(_this.ui.next, 1.6, params);
	        };
	      })(this)
	    };
	    return TweenLite.to(this.ui.chapter, 1.6, params);
	  };

	  UI.prototype.transition_out_fast = function() {
	    var params;
	    this.ui.transition_black.removeClass('layer-0').addClass('layer-5');
	    params = {
	      autoAlpha: 1,
	      ease: Power2.easeOut,
	      onComplete: (function(_this) {
	        return function() {
	          return _this.emit('transition:out:fast:complete');
	        };
	      })(this)
	    };
	    return TweenLite.to(this.ui.transition_black, 1.3, params);
	  };

	  UI.prototype.hide = function() {
	    var params;
	    if (this._disabled) {
	      return;
	    }
	    this.kill_tweens();
	    params = {
	      autoAlpha: 0,
	      ease: Power2.easeOut
	    };
	    return this.tweens.push(TweenLite.to(this.ui.ui, 1.6, params));
	  };

	  UI.prototype.show = function() {
	    var params;
	    this.kill_tweens();
	    params = {
	      autoAlpha: 1,
	      delay: 1,
	      ease: Power2.easeOut
	    };
	    return this.tweens.push(TweenLite.to(this.ui.ui, 1, params));
	  };

	  UI.prototype.show_about = function(event) {
	    var params;
	    event.preventDefault();
	    this.is_overlay_open = !this.is_overlay_open;
	    TweenLite.killTweensOf(this.ui.dim);
	    TweenLite.killTweensOf(this.ui.chapter);
	    if (this.is_overlay_open) {
	      params = {
	        autoAlpha: 0,
	        ease: Power2.easeOut
	      };
	      TweenLite.to(this.ui.dim, 0.6, params);
	      params = {
	        autoAlpha: 0,
	        ease: Power2.easeOut
	      };
	      return TweenLite.to(this.ui.chapter, 0.6, params);
	    } else {
	      params = {
	        autoAlpha: 1,
	        ease: Power2.easeOut
	      };
	      TweenLite.to(this.ui.dim, 1.6, params);
	      params = {
	        autoAlpha: 1,
	        delay: 0.5,
	        ease: Power2.easeOut
	      };
	      return TweenLite.to(this.ui.chapter, 1.6, params);
	    }
	  };

	  UI.prototype.kill_tweens = function() {
	    var i, len, ref, results, tween;
	    ref = this.tweens;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      tween = ref[i];
	      results.push(tween != null ? tween.kill() : void 0);
	    }
	    return results;
	  };

	  UI.prototype.destroy = function() {
	    this.unbind;
	    return this.el.remove();
	  };

	  return UI;

	})();


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Dictionary, Loader, happens, settings;

	happens = __webpack_require__(8);

	settings = __webpack_require__(10);

	Loader = __webpack_require__(26);

	Dictionary = (function() {
	  Dictionary.prototype.default_dictionary = 'dictionary.xml';

	  function Dictionary() {
	    happens(this);
	    this.objs = {};
	  }

	  Dictionary.prototype.load = function() {
	    var loader;
	    loader = new Loader;
	    loader.on('loading', (function(_this) {
	      return function(percent) {
	        return c.info('[ PERCENT LOADED ] ->', percent);
	      };
	    })(this));
	    loader.once('loaded', (function(_this) {
	      return function(manifest) {
	        var asset, i, len;
	        for (i = 0, len = manifest.length; i < len; i++) {
	          asset = manifest[i];
	          _this.objs[asset.id] = $(asset.data);
	        }
	        return _this.emit('loaded');
	      };
	    })(this));
	    loader.add('dictionary.xml', settings.base_path + "/xml/dictionary.xml", 'xml');
	    loader.add('scenes.xml', settings.base_path + "/xml/scenes.xml", 'xml');
	    return loader.load();
	  };

	  Dictionary.prototype.get = function(id, dictionary) {
	    var node;
	    if (dictionary == null) {
	      dictionary = this.default_dictionary;
	    }
	    node = this.get_raw(id, dictionary);
	    if (node) {
	      return node.text();
	    } else {
	      return '';
	    }
	  };

	  Dictionary.prototype.get_raw = function(id, dictionary) {
	    if (dictionary == null) {
	      dictionary = this.default_dictionary;
	    }
	    if (this.objs[dictionary].find(id).length) {
	      return this.objs[dictionary].find(id);
	    }
	    return false;
	  };

	  Dictionary.prototype.get_dictionary = function(dictionary) {
	    if (dictionary == null) {
	      dictionary = this.default_dictionary;
	    }
	    return this.objs[dictionary];
	  };

	  return Dictionary;

	})();

	module.exports = new Dictionary;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Author, Interaction, Scene, Scenes, dictionary;

	dictionary = __webpack_require__(38);

	Scene = (__webpack_require__(40)).Scene;

	Author = (__webpack_require__(40)).Author;

	Interaction = (__webpack_require__(40)).Interaction;

	module.exports = new (Scenes = (function() {
	  function Scenes() {}

	  Scenes.prototype.get = function(id) {
	    var model, scene, xml;
	    xml = $(dictionary.get_dictionary('scenes.xml'));
	    scene = xml.find('scene[id="' + id + '"]');
	    model = new Scene;
	    model.id = scene.attr('id');
	    model.chapter = scene.find('chapter').text();
	    model.title = scene.find('title').text();
	    model.nav_title = scene.find('nav_title').text();
	    model.paragraphs = [];
	    model.interactions = [];
	    scene.find('paragraph').each((function(_this) {
	      return function(index, item) {
	        return model.paragraphs.push($(item).text());
	      };
	    })(this));
	    model.authors = [];
	    scene.find('author').each((function(_this) {
	      return function(index, item) {
	        var $item, author;
	        $item = $(item);
	        author = new Author;
	        author.name = $item.find('name').text();
	        author.role = $item.find('role').text();
	        return model.authors.push(author);
	      };
	    })(this));
	    scene.find('interaction').each((function(_this) {
	      return function(index, item) {
	        var $item, interaction;
	        $item = $(item);
	        interaction = new Interaction;
	        interaction.id = $item.attr('id');
	        interaction.text = $item.text();
	        return model.interactions.push(interaction);
	      };
	    })(this));
	    return model;
	  };

	  Scenes.prototype.all = function() {
	    var scenes, xml;
	    xml = $(dictionary.get_dictionary('scenes.xml'));
	    scenes = [];
	    xml.find('scene').each((function(_this) {
	      return function(index, item) {
	        var id;
	        id = $(item).attr('id');
	        return scenes.push(_this.get(id));
	      };
	    })(this));
	    return scenes;
	  };

	  return Scenes;

	})());


/***/ },
/* 40 */
/***/ function(module, exports) {

	var Author, Interaction, Scene;

	exports.Scene = Scene = (function() {
	  function Scene() {}

	  Scene.prototype.id = String;

	  Scene.prototype.title = String;

	  Scene.prototype.paragraphs = Array;

	  Scene.prototype.authors = Array;

	  Scene.prototype.interactions = Array;

	  return Scene;

	})();

	exports.Author = Author = (function() {
	  function Author() {}

	  Author.prototype.role = String;

	  Author.prototype.name = String;

	  return Author;

	})();

	exports.Interaction = Interaction = (function() {
	  function Interaction() {}

	  Interaction.prototype.id = String;

	  Interaction.prototype.text = String;

	  return Interaction;

	})();


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var LetterAnimation, utils,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	utils = __webpack_require__(34);

	module.exports = (function() {
	  _Class.prototype.exclude = Array;

	  function _Class() {
	    this.exclude = [];
	  }

	  _Class.prototype.animate = function(letters, base_delay) {
	    var i, index, len, letter, letter_animation, results;
	    results = [];
	    for (index = i = 0, len = letters.length; i < len; index = ++i) {
	      letter = letters[index];
	      letter_animation = new LetterAnimation($(letter), base_delay);
	      if (indexOf.call(this.exclude, index) >= 0) {
	        results.push(letter_animation.once = true);
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };

	  return _Class;

	})();

	LetterAnimation = (function() {
	  LetterAnimation.prototype.passes = 5;

	  LetterAnimation.prototype.opacity = 0;

	  LetterAnimation.prototype.progress = 0;

	  LetterAnimation.prototype.once = false;

	  function LetterAnimation(el, base_delay1) {
	    this.el = el;
	    this.base_delay = base_delay1;
	    this.increment = 1 / this.passes;
	    this.animate();
	  }

	  LetterAnimation.prototype.animate = function() {
	    var arr, delay, i, random_opacity_index, ref, results;
	    this.progress++;
	    if (this.progress <= this.passes) {
	      this.opacity += this.increment;
	      if (this.progress === 1) {
	        delay = this.base_delay + Math.random() * 2400;
	      } else {
	        delay = Math.random() * 2400;
	      }
	      return this.el.delay(delay).animate({
	        'opacity': this.opacity
	      }, 500, (function(_this) {
	        return function() {
	          return _this.animate();
	        };
	      })(this));
	    } else {
	      if (this.once) {
	        return;
	      }
	      arr = (function() {
	        results = [];
	        for (var i = 0, ref = this.passes; 0 <= ref ? i < ref : i > ref; 0 <= ref ? i++ : i--){ results.push(i); }
	        return results;
	      }).apply(this);
	      random_opacity_index = arr[Math.ceil(utils.random(2, arr.length)) - 1];
	      this.opacity = random_opacity_index * this.increment;
	      this.progress = random_opacity_index;
	      return this.el.delay(delay).animate({
	        'opacity': this.opacity
	      }, 500, (function(_this) {
	        return function() {
	          return _this.animate();
	        };
	      })(this));
	    }
	  };

	  return LetterAnimation;

	})();


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(43);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (element, elements, solid, solids, undefined) {
	buf.push("<div" + (jade.attr("id", "" + (locals.data.id) + "", true, false)) + " class=\"section scene layer layer_0\"><div class=\"transition_black layer layer-0\"></div><div class=\"ui\"><div class=\"dim layer layer-0\"></div><div class=\"content\"><section class=\"chapter layer layer-0\"><p class=\"chapter_index\">" + (jade.escape((jade_interp = locals.data.chapter) == null ? '' : jade_interp)) + "</p><h2>" + (jade.escape((jade_interp = locals.data.title) == null ? '' : jade_interp)) + "</h2>");
	// iterate locals.data.paragraphs
	;(function(){
	  var $$obj = locals.data.paragraphs;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var paragraph = $$obj[$index];

	buf.push("<p class=\"about\">" + (jade.escape((jade_interp = paragraph) == null ? '' : jade_interp)) + "</p>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var paragraph = $$obj[$index];

	buf.push("<p class=\"about\">" + (jade.escape((jade_interp = paragraph) == null ? '' : jade_interp)) + "</p>");
	    }

	  }
	}).call(this);

	buf.push("<ul class=\"interactions\">");
	// iterate locals.data.interactions
	;(function(){
	  var $$obj = locals.data.interactions;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var interaction = $$obj[$index];

	buf.push("<li><div class=\"icon dragdrop\"></div><br/><span>" + (((jade_interp = interaction.text) == null ? '' : jade_interp)) + "</span></li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var interaction = $$obj[$index];

	buf.push("<li><div class=\"icon dragdrop\"></div><br/><span>" + (((jade_interp = interaction.text) == null ? '' : jade_interp)) + "</span></li>");
	    }

	  }
	}).call(this);

	buf.push("</ul></section><div class=\"hitarea layer layer-1\"></div>");
	if(locals.data.id == 'elements')
	{
	solids   = ['hexahedron', 'octahedron', 'tetrahedron', 'icosahedron', 'dodecahedron']
	elements = ['earth', 'air', 'fire', 'water', 'universe']
	buf.push("<section class=\"titles layer layer-1\">");
	for (var i = 0; i < solids.length; ++i){
	{
	solid   = solids[i]
	element = elements[i]
	buf.push("<div" + (jade.attr("data-id", "" + (solid) + "", true, false)) + " class=\"title layer\"><img" + (jade.attr("src", "" + (locals.base_path) + "/img/elements/" + (solid) + ".png", true, false)) + "/><h3>" + (jade.escape((jade_interp = element) == null ? '' : jade_interp)) + "</h3></div>");
	}
	}
	buf.push("</section><nav class=\"geometry layer layer-2\"><ul>");
	// iterate solids
	;(function(){
	  var $$obj = solids;
	  if ('number' == typeof $$obj.length) {

	    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
	      var solid = $$obj[i];

	buf.push("<li><a href=\"#\"" + (jade.attr("data-id", "" + (solid) + "", true, false)) + "><div href=\"#\"" + (jade.attr("data-id", "" + (solid) + "", true, false)) + " data-sequence=\"data-sequence\" class=\"layer\"></div></a></li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var i in $$obj) {
	      $$l++;      var solid = $$obj[i];

	buf.push("<li><a href=\"#\"" + (jade.attr("data-id", "" + (solid) + "", true, false)) + "><div href=\"#\"" + (jade.attr("data-id", "" + (solid) + "", true, false)) + " data-sequence=\"data-sequence\" class=\"layer\"></div></a></li>");
	    }

	  }
	}).call(this);

	buf.push("</ul></nav>");
	}
	buf.push("<nav class=\"next layer layer-2\"><h3><a href=\"#\">" + (jade.escape((jade_interp = locals.data.title) == null ? '' : jade_interp)) + "</a></h3><div class=\"caps-text\">HOLD THE SPACE BAR TO CONTINUE</div></nav></div></div></div>");}.call(this,"element" in locals_for_with?locals_for_with.element:typeof element!=="undefined"?element:undefined,"elements" in locals_for_with?locals_for_with.elements:typeof elements!=="undefined"?elements:undefined,"solid" in locals_for_with?locals_for_with.solid:typeof solid!=="undefined"?solid:undefined,"solids" in locals_for_with?locals_for_with.solids:typeof solids!=="undefined"?solids:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */

	function nulls(val) {
	  return val != null && val !== '';
	}

	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}

	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};


	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];

	  var keys = Object.keys(obj);

	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }

	  return buf.join('');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;

	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}

	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(44).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};

	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 44 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var asset, assets, i, len, settings;

	settings = __webpack_require__(10);

	assets = [
	  {
	    id: 'lvl0-pos-x',
	    url: '/img/blackice/lvl0/pos-x.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl0-neg-x',
	    url: '/img/blackice/lvl0/neg-x.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl0-pos-y',
	    url: '/img/blackice/lvl0/pos-y.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl0-neg-y',
	    url: '/img/blackice/lvl0/neg-y.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl0-pos-z',
	    url: '/img/blackice/lvl0/pos-z.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl0-neg-z',
	    url: '/img/blackice/lvl0/neg-z.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl1-pos-x',
	    url: '/img/blackice/lvl1/pos-x.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl1-neg-x',
	    url: '/img/blackice/lvl1/neg-x.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl1-pos-y',
	    url: '/img/blackice/lvl1/pos-y.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl1-neg-y',
	    url: '/img/blackice/lvl1/neg-y.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl1-pos-z',
	    url: '/img/blackice/lvl1/pos-z.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl1-neg-z',
	    url: '/img/blackice/lvl1/neg-z.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl2-pos-x',
	    url: '/img/blackice/lvl2/pos-x.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl2-neg-x',
	    url: '/img/blackice/lvl2/neg-x.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl2-pos-y',
	    url: '/img/blackice/lvl2/pos-y.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl2-neg-y',
	    url: '/img/blackice/lvl2/neg-y.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl2-pos-z',
	    url: '/img/blackice/lvl2/pos-z.jpg',
	    type: 'image'
	  }, {
	    id: 'lvl2-neg-z',
	    url: '/img/blackice/lvl2/neg-z.jpg',
	    type: 'image'
	  }, {
	    id: 'base_1',
	    url: '/sound/blackice/bass_layer_1.mp3',
	    type: 'sound'
	  }, {
	    id: 'base_2',
	    url: '/sound/blackice/bass_layer_2.mp3',
	    type: 'sound'
	  }, {
	    id: 'base_3',
	    url: '/sound/blackice/bass_layer_3_0.mp3',
	    type: 'sound'
	  }, {
	    id: 'melody',
	    url: '/sound/blackice/melody_layer.mp3',
	    type: 'sound'
	  }
	];

	for (i = 0, len = assets.length; i < len; i++) {
	  asset = assets[i];
	  asset.url = settings.base_path + asset.url;
	}

	module.exports = assets;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var Hotspot, camera, happens,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	camera = (__webpack_require__(16)).user;

	module.exports = Hotspot = (function() {
	  Hotspot.prototype.over = false;

	  Hotspot.prototype.mouse_x = 0;

	  Hotspot.prototype.mouse_y = 0;

	  Hotspot.prototype.enabled = true;

	  Hotspot.prototype.visible = false;

	  function Hotspot(el, shape, size_x, size_y, size_z) {
	    this.el = el;
	    this.shape = shape != null ? shape : 'box';
	    this.size_x = size_x != null ? size_x : 10;
	    this.size_y = size_y != null ? size_y : 10;
	    this.size_z = size_z != null ? size_z : 10;
	    this.on_click = bind(this.on_click, this);
	    this.on_mouse_move = bind(this.on_mouse_move, this);
	    happens(this);
	    if (this.shape === 'box') {
	      this.box();
	    }
	    if (this.shape === 'sphere') {
	      this.sphere();
	    }
	    if (this.shape === 'plane') {
	      this.plane();
	    }
	  }

	  Hotspot.prototype.box = function() {
	    var geometry;
	    geometry = new THREE.BoxGeometry(this.size_x, this.size_y, this.size_z);
	    this.mesh = new THREE.Mesh(geometry, this.material());
	    return this.mesh.visible = this.visible;
	  };

	  Hotspot.prototype.sphere = function() {
	    var geometry;
	    geometry = new THREE.SphereGeometry(this.size_x, 8, 8);
	    this.mesh = new THREE.Mesh(geometry, this.material());
	    return this.mesh.visible = this.visible;
	  };

	  Hotspot.prototype.plane = function() {
	    var geometry;
	    geometry = new THREE.PlaneGeometry(this.size_x, this.size_y, 1, 1);
	    this.mesh = new THREE.Mesh(geometry, this.material());
	    return this.mesh.visible = this.visible;
	  };

	  Hotspot.prototype.material = function() {
	    var params;
	    params = {
	      color: 0x00FF00,
	      wireframe: true,
	      wireframeLinewidth: 5
	    };
	    return new THREE.MeshBasicMaterial(params);
	  };

	  Hotspot.prototype.bind = function() {
	    this.el.on('click', this.on_click);
	    return this.el.on('mousemove', this.on_mouse_move);
	  };

	  Hotspot.prototype.unbind = function() {
	    this.el.off('click', this.on_click);
	    return this.el.off('mousemove', this.on_mouse_move);
	  };

	  Hotspot.prototype.on_mouse_move = function(event) {
	    var intersects, normal_x, normal_y, raycaster, vector;
	    this.mouse_x = event.clientX;
	    this.mouse_y = event.clientY;

	    /*	
	    		Hotspot raycasting
	     */
	    normal_x = (this.mouse_x / window.innerWidth) * 2 - 1;
	    normal_y = -(this.mouse_y / window.innerHeight) * 2 + 1;
	    vector = new THREE.Vector3(normal_x, normal_y, 0.5);
	    vector.unproject(camera);
	    raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	    intersects = raycaster.intersectObject(this.mesh);
	    if (intersects.length > 0) {
	      return this.on_over();
	    } else {
	      return this.on_out();
	    }
	  };

	  Hotspot.prototype.on_over = function() {
	    if (!this.enabled) {
	      return;
	    }
	    if (this.over) {
	      return;
	    }
	    $('body').css('cursor', 'pointer');
	    this.over = true;
	    return this.emit('over');
	  };

	  Hotspot.prototype.on_out = function() {
	    if (!this.enabled) {
	      return;
	    }
	    if (!this.over) {
	      return;
	    }
	    this.over = false;
	    $('body').css('cursor', '');
	    return this.emit('out');
	  };

	  Hotspot.prototype.on_click = function(event) {
	    event.preventDefault();
	    if (!this.over) {
	      return;
	    }
	    return this.emit('click');
	  };

	  Hotspot.prototype.reset = function() {
	    return this.enabled = true;
	  };

	  return Hotspot;

	})();


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Path, camera, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	camera = (__webpack_require__(16)).user;

	utils = __webpack_require__(34);

	module.exports = Path = (function() {
	  Path.prototype.path_curve = null;

	  Path.prototype.camera_position = 0.1;

	  Path.prototype.debug = false;

	  function Path(id, scene, points1, lookat, color, gui, bounds) {
	    var f, folder, i, j, len, marker, p, ref;
	    this.id = id;
	    this.scene = scene;
	    this.points = points1;
	    this.lookat = lookat;
	    this.color = color;
	    this.gui = gui != null ? gui : null;
	    if (bounds == null) {
	      bounds = 100;
	    }
	    this.update_camera = bind(this.update_camera, this);
	    this.update_path = bind(this.update_path, this);
	    if (this.gui) {
	      folder = this.gui.addFolder(this.id);
	      folder.add(this, 'export_data');
	      folder.add(this, 'camera_position', 0, 1).onChange((function(_this) {
	        return function() {
	          return _this.update_camera();
	        };
	      })(this));
	      folder.open();
	    }
	    if (this.gui) {
	      this.lookat_marker = new THREE.Mesh(new THREE.SphereGeometry(2, 8, 8), new THREE.MeshBasicMaterial({
	        color: 0xFF0000
	      }));
	      this.lookat_marker.position.set(this.lookat.x, this.lookat.y, this.lookat.z);
	      this.lookat_marker.visible = this.debug;
	      this.scene.add(this.lookat_marker);
	      f = folder.addFolder("lookat");
	      f.add(this.lookat_marker.position, 'x', -bounds, bounds);
	      f.add(this.lookat_marker.position, 'y', -bounds, bounds);
	      f.add(this.lookat_marker.position, 'z', -bounds, bounds);
	      f.open();
	    }
	    this.markers = [];
	    ref = this.points;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      p = ref[i];
	      if (this.gui) {
	        f = folder.addFolder("point_" + i);
	        f.add(p, 'x', -bounds, bounds).onChange((function(_this) {
	          return function() {
	            return _this.update_path();
	          };
	        })(this));
	        f.add(p, 'y', -bounds, bounds).onChange((function(_this) {
	          return function() {
	            return _this.update_path();
	          };
	        })(this));
	        f.add(p, 'z', -bounds, bounds).onChange((function(_this) {
	          return function() {
	            return _this.update_path();
	          };
	        })(this));
	        f.open();
	      }
	      marker = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), new THREE.MeshBasicMaterial({
	        color: this.color
	      }));
	      marker.visible = this.debug;
	      this.markers.push(marker);
	      this.scene.add(marker);
	    }
	    this.update_path();
	  }

	  Path.prototype.update_path = function() {
	    var geometry, i, j, k, len, len1, point, points, points_vec, ref, spline;
	    points_vec = [];
	    ref = this.points;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      point = ref[i];
	      this.markers[i].position.set(point.x, point.y, point.z);
	      points_vec.push(new THREE.Vector3(point.x, point.y, point.z));
	    }
	    this.scene.remove(this.path_curve);
	    spline = utils.spline(points_vec);
	    points = spline.getPoints(50);
	    geometry = new THREE.Geometry;
	    for (k = 0, len1 = points.length; k < len1; k++) {
	      point = points[k];
	      geometry.vertices.push(point.clone());
	    }
	    this.path_curve = new THREE.Line(geometry, new THREE.LineBasicMaterial(0xFFFFFF * Math.random()));
	    this.path_curve.visible = this.debug;
	    this.scene.add(this.path_curve);
	    return this.spline = utils.spline(points);
	  };

	  Path.prototype.update_camera = function() {
	    var position;
	    position = this.spline.getPointAt(this.camera_position);
	    camera.position.copy(position);
	    return camera.lookAt(this.lookat_marker.position);
	  };

	  Path.prototype.export_data = function() {
	    var data, i, j, json, len, point, ref;
	    json = {};
	    json[this.id] = [];
	    ref = this.points;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      point = ref[i];
	      data = {
	        x: point.x,
	        y: point.y,
	        z: point.z
	      };
	      json[this.id].push(data);
	    }
	    json[this.id + '_lookat'] = {
	      x: this.lookat_marker.position.x,
	      y: this.lookat_marker.position.y,
	      z: this.lookat_marker.position.z
	    };
	    return c.log(JSON.stringify(json, void 0, 4));
	  };

	  return Path;

	})();


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var Path, camera, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	camera = (__webpack_require__(16)).user;

	utils = __webpack_require__(34);

	module.exports = Path = (function() {
	  Path.prototype.path_curve = null;

	  Path.prototype.camera_position = 0.1;

	  Path.prototype.lookat_position = 0.1;

	  Path.prototype.debug = false;

	  function Path(id, scene, points1, lookat_points, color, gui, bounds) {
	    var f, folder, i, j, k, len, len1, marker, marker_radius, p, ref, ref1;
	    this.id = id;
	    this.scene = scene;
	    this.points = points1;
	    this.lookat_points = lookat_points;
	    this.color = color;
	    this.gui = gui != null ? gui : null;
	    if (bounds == null) {
	      bounds = 100;
	    }
	    this.update_camera = bind(this.update_camera, this);
	    this.update_path = bind(this.update_path, this);
	    marker_radius = 1;
	    if (this.gui) {
	      folder = this.gui.addFolder(this.id);
	      folder.add(this, 'export_data');
	      folder.add(this, 'camera_position', 0, 1).onChange((function(_this) {
	        return function() {
	          return _this.update_camera();
	        };
	      })(this));
	      folder.add(this, 'lookat_position', 0, 1).onChange((function(_this) {
	        return function() {
	          return _this.update_camera();
	        };
	      })(this));
	      folder.open();
	    }
	    if (this.gui) {
	      this.lookat_marker = new THREE.Mesh(new THREE.SphereGeometry(marker_radius, 8, 8), new THREE.MeshBasicMaterial({
	        color: 0xFF0000
	      }));
	      this.lookat_marker.visible = false;
	      this.scene.add(this.lookat_marker);
	      f = folder.addFolder("lookat");
	      f.add(this.lookat_marker.position, 'x', -bounds, bounds);
	      f.add(this.lookat_marker.position, 'y', -bounds, bounds);
	      f.add(this.lookat_marker.position, 'z', -bounds, bounds);
	      f.open();
	    }
	    this.markers = [];
	    ref = this.points;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      p = ref[i];
	      if (this.gui) {
	        f = folder.addFolder("point_" + i);
	        f.add(p, 'x', -bounds, bounds).onChange((function(_this) {
	          return function() {
	            return _this.update_path();
	          };
	        })(this));
	        f.add(p, 'y', -bounds, bounds).onChange((function(_this) {
	          return function() {
	            return _this.update_path();
	          };
	        })(this));
	        f.add(p, 'z', -bounds, bounds).onChange((function(_this) {
	          return function() {
	            return _this.update_path();
	          };
	        })(this));
	        f.open();
	      }
	      marker = new THREE.Mesh(new THREE.SphereGeometry(marker_radius, 8, 8), new THREE.MeshBasicMaterial({
	        color: this.color
	      }));
	      marker.visible = this.debug;
	      this.markers.push(marker);
	      this.scene.add(marker);
	    }
	    this.lookat_markers = [];
	    ref1 = this.lookat_points;
	    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
	      p = ref1[i];
	      if (this.gui) {
	        f = folder.addFolder("lookat_point_" + i);
	        f.add(p, 'x', -bounds, bounds).onChange((function(_this) {
	          return function() {
	            return _this.update_path();
	          };
	        })(this));
	        f.add(p, 'y', -bounds, bounds).onChange((function(_this) {
	          return function() {
	            return _this.update_path();
	          };
	        })(this));
	        f.add(p, 'z', -bounds, bounds).onChange((function(_this) {
	          return function() {
	            return _this.update_path();
	          };
	        })(this));
	        f.open();
	      }
	      marker = new THREE.Mesh(new THREE.SphereGeometry(marker_radius, 8, 8), new THREE.MeshBasicMaterial({
	        color: this.color
	      }));
	      marker.visible = this.debug;
	      this.lookat_markers.push(marker);
	      this.scene.add(marker);
	    }
	    this.update_path();
	  }

	  Path.prototype.update_path = function() {
	    var geometry, i, j, k, l, len, len1, len2, len3, m, point, points, points_vec, ref, ref1, spline;
	    points_vec = [];
	    ref = this.points;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      point = ref[i];
	      this.markers[i].position.set(point.x, point.y, point.z);
	      points_vec.push(new THREE.Vector3(point.x, point.y, point.z));
	    }
	    this.scene.remove(this.path_curve);
	    spline = utils.spline(points_vec);
	    points = spline.getPoints(50);
	    geometry = new THREE.Geometry;
	    for (k = 0, len1 = points.length; k < len1; k++) {
	      point = points[k];
	      geometry.vertices.push(point.clone());
	    }
	    this.path_curve = new THREE.Line(geometry, new THREE.LineBasicMaterial(0xFFFFFF * Math.random()));
	    this.path_curve.visible = this.debug;
	    this.scene.add(this.path_curve);
	    this.spline = utils.spline(points);
	    points_vec = [];
	    ref1 = this.lookat_points;
	    for (i = l = 0, len2 = ref1.length; l < len2; i = ++l) {
	      point = ref1[i];
	      this.lookat_markers[i].position.set(point.x, point.y, point.z);
	      points_vec.push(new THREE.Vector3(point.x, point.y, point.z));
	    }
	    this.scene.remove(this.path_camera_curve);
	    spline = utils.spline(points_vec);
	    points = spline.getPoints(50);
	    geometry = new THREE.Geometry;
	    for (m = 0, len3 = points.length; m < len3; m++) {
	      point = points[m];
	      geometry.vertices.push(point.clone());
	    }
	    this.path_camera_curve = new THREE.Line(geometry, new THREE.LineBasicMaterial(0xFFFFFF * Math.random()));
	    this.path_camera_curve.visible = this.debug;
	    this.scene.add(this.path_camera_curve);
	    this.spline_camera = utils.spline(points);
	    return this.update_camera();
	  };

	  Path.prototype.update_camera = function() {
	    var position;
	    position = this.spline.getPointAt(this.camera_position);
	    camera.position.copy(position);
	    position = this.spline_camera.getPointAt(this.lookat_position);
	    if (this.gui) {
	      this.lookat_marker.position.copy(position);
	      return camera.lookAt(this.lookat_marker.position);
	    }
	  };

	  Path.prototype.export_data = function() {
	    var data, i, j, json, len, point, ref;
	    json = {};
	    json[this.id] = [];
	    ref = this.points;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      point = ref[i];
	      data = {
	        x: point.x,
	        y: point.y,
	        z: point.z
	      };
	      json[this.id].push(data);
	    }
	    json[this.id + '_lookat'] = {
	      x: this.lookat_marker.position.x,
	      y: this.lookat_marker.position.y,
	      z: this.lookat_marker.position.z
	    };
	    return c.log(JSON.stringify(json, void 0, 4));
	  };

	  return Path;

	})();


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var Experiment, Loader, Mouse, PathLookatCurve, PathLookatFixed, Skull, UI, assets, cameras, config, engine, happens, lights, renderer, settings, shader, utils, win,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	happens = __webpack_require__(8);

	settings = __webpack_require__(10);

	cameras = __webpack_require__(16);

	engine = __webpack_require__(7);

	renderer = __webpack_require__(18);

	Loader = __webpack_require__(26);

	Mouse = __webpack_require__(33);

	utils = __webpack_require__(34);

	win = __webpack_require__(9);

	Experiment = __webpack_require__(36);

	lights = __webpack_require__(50);

	config = __webpack_require__(51);

	shader = __webpack_require__(52);

	UI = __webpack_require__(37);

	assets = __webpack_require__(53);

	PathLookatFixed = __webpack_require__(47);

	PathLookatCurve = __webpack_require__(48);

	module.exports = Skull = (function(superClass) {
	  extend(Skull, superClass);

	  function Skull() {
	    this.update = bind(this.update, this);
	    this.glitch = bind(this.glitch, this);
	    this.on_mouse_up = bind(this.on_mouse_up, this);
	    this.on_mouse_move = bind(this.on_mouse_move, this);
	    this.on_transition_in_start = bind(this.on_transition_in_start, this);
	    this.on_mouse_down = bind(this.on_mouse_down, this);
	    this.setup = bind(this.setup, this);
	    return Skull.__super__.constructor.apply(this, arguments);
	  }

	  Skull.prototype.xp = 0;

	  Skull.prototype.yp = 0;

	  Skull.prototype.accel = 1;

	  Skull.prototype.reset_amplitude = false;

	  Skull.prototype.audio_pos_z = 0;

	  Skull.prototype.setup = function(manifest) {

	    /*
	    		Engine
	     */
	    var j, len, light;
	    engine.fov = config.camera_fov;

	    /*
	    		UI
	     */
	    this.ui = new UI('calvarium', this.scene, this.gui);
	    TweenLite.set(this.ui.ui.transition_black, {
	      opacity: 1

	      /*
	      		Scene
	       */
	    });
	    if (config.fog_enabled) {
	      this.scene.fog = new THREE.FogExp2(0x000000, config.fog_in_start);
	      this.gui.add(this.scene.fog, 'density', 0, 1);
	    }

	    /*
	    		Helpers
	     */
	    if (settings.debug) {
	      this.scene.add(new THREE.GridHelper(50, 10));
	      this.scene.add(new THREE.AxisHelper(10));
	      this.scene.add(new THREE.CameraHelper(cameras.user));
	    }

	    /*
	    		Lights
	     */
	    for (j = 0, len = lights.length; j < len; j++) {
	      light = lights[j];
	      this.scene.add(light);
	    }

	    /*
	    		Create curve for camera
	     */
	    this.path_in = new PathLookatFixed('path_in', this.scene, config.path_in, config.path_in_lookat, 0x00FF00);
	    this.path_out = new PathLookatCurve('path_out', this.scene, config.path_out, config.path_out_lookat, 0x00FF00);

	    /*
	    		Mouse
	     */
	    this.mouse = new Mouse($('.hitarea'));

	    /*
	    		Sounds
	     */
	    this.audio_pos_z = this.config.audio_pos_z_in;
	    this.sounds = {
	      background: this.loader.get_asset('background').data,
	      glitch: this.loader.get_asset('glitch').data,
	      after: this.loader.get_asset('after').data
	    };
	    this.update_sound_position();
	    this.sounds.glitch.volume(0.5);
	    this.sounds.background.play();
	    this.sounds.background.loop(true);

	    /*
	    		Objects
	     */
	    this.container = new THREE.Object3D;
	    this.scene.add(this.container);

	    /*
	    		Skull
	     */
	    this.attributes = {
	      displacement: {
	        type: 'v3',
	        value: []
	      },
	      customColor: {
	        type: 'c',
	        value: []
	      }
	    };
	    this.uniforms = {
	      amplitude: {
	        type: "f",
	        value: 0
	      }
	    };
	    if (config.fog_enabled) {
	      this.uniforms.topColor = {
	        type: "c",
	        value: new THREE.Color(0x0077ff)
	      };
	      this.uniforms.bottomColor = {
	        type: "c",
	        value: new THREE.Color(0xffffff)
	      };
	      this.uniforms.offset = {
	        type: "f",
	        value: 33
	      };
	      this.uniforms.exponent = {
	        type: "f",
	        value: 0.6
	      };
	      this.uniforms.fogColor = {
	        type: "c",
	        value: this.scene.fog.color
	      };
	      this.uniforms.fogNear = {
	        type: "f",
	        value: this.scene.fog.near
	      };
	      this.uniforms.fogFar = {
	        type: "f",
	        value: this.scene.fog.far
	      };
	      this.uniforms.fogDensity = {
	        type: "f",
	        value: this.scene.fog.density
	      };
	    }
	    window.uniforms = this.uniforms;
	    this.material = new THREE.ShaderMaterial({
	      uniforms: this.uniforms,
	      attributes: this.attributes,
	      vertexShader: shader.vertex(),
	      fragmentShader: shader.fragment(),
	      shading: THREE.FlatShading,
	      side: THREE.DoubleSide,
	      wireframe: true,
	      fog: config.fog_enabled
	    });
	    this.geometry = this.loader.get_asset('skull').data;
	    this.geometry.dynamic = true;
	    this.mesh = new THREE.Mesh(this.geometry, this.material);
	    this.mesh.position.y = 4;
	    this.container.add(this.mesh);
	    this.lookat = new THREE.Vector3;
	    this.tessellate_geometry();
	    this.explode_geometry();
	    this.colors_and_displacement();
	    this.glitch();
	    this.bind();
	    this.emit('setup:complete');
	    return this.ready = true;
	  };

	  Skull.prototype.bind = function() {
	    Skull.__super__.bind.call(this);
	    this.on('transition:in:start', this.on_transition_in_start);
	    this.mouse.on('down', this.on_mouse_down);
	    this.mouse.on('up', this.on_mouse_up);
	    this.mouse.on('move', this.on_mouse_move);
	    this.ui.bind();
	    return this.mouse.bind();
	  };

	  Skull.prototype.unbind = function() {
	    Skull.__super__.unbind.call(this);
	    this.off('transition:in:start', this.on_transition_in_start);
	    this.mouse.off('down', this.on_mouse_down);
	    this.mouse.off('up', this.on_mouse_up);
	    this.mouse.off('move', this.on_mouse_move);
	    this.ui.unbind();
	    return this.mouse.unbind();
	  };

	  Skull.prototype.on_mouse_down = function() {
	    this.uniforms.amplitude.value = 0;
	    this.glitch_pass.generateTrigger();
	    this.glitch_pass.goWild = true;
	    this.sounds.glitch.play();
	    this.sounds.glitch.loop(true);
	    return this.force_transition_in_complete();
	  };

	  Skull.prototype.on_transition_in_start = function() {
	    return TweenLite.to(this.ui.ui.transition_black, 2, {
	      opacity: 0,
	      delay: 3
	    });
	  };

	  Skull.prototype.on_mouse_move = function() {
	    var duration, ease, params, pos_x, ref;
	    pos_x = (Math.abs(this.mouse.normal_center_x)) * 2;
	    this.x = (HALF_PI * 0.5) * this.mouse.normal_center_y;
	    this.y = HALF_PI * this.mouse.normal_center_x;
	    if ((ref = this.rotation_tween) != null) {
	      ref.kill();
	    }
	    if (this.mouse.is_down) {
	      ease = Expo.easeOut;
	      duration = 1.2;
	    } else {
	      ease = Cubic.easeOut;
	      duration = 20;
	    }
	    params = {
	      x: this.x,
	      y: this.y,
	      ease: ease
	    };
	    return this.rotation_tween = TweenLite.to(this.mesh.rotation, duration, params);
	  };

	  Skull.prototype.on_mouse_up = function() {
	    var params, ref;
	    this.glitch_pass.goWild = false;
	    if ((ref = this.speed_tween) != null) {
	      ref.kill();
	    }
	    this.accel = 80;
	    params = {
	      accel: 1,
	      ease: Power1.easeOut
	    };
	    this.speed_tween = TweenLite.to(this, 0.35, params);
	    this.sounds.glitch.stop();
	    return this.sounds.after.play();
	  };

	  Skull.prototype.glitch = function() {
	    this.composer = new THREE.EffectComposer(renderer);
	    this.composer.addPass(new THREE.RenderPass(this.scene, cameras.user));
	    this.glitch_pass = new THREE.GlitchPass;
	    this.glitch_pass.renderToScreen = true;
	    return this.composer.addPass(this.glitch_pass);
	  };

	  Skull.prototype.tessellate_geometry = function() {
	    var i, j, results, tessellateModifier;
	    tessellateModifier = new THREE.TessellateModifier(1);
	    results = [];
	    for (i = j = 0; j <= 12; i = ++j) {
	      results.push(tessellateModifier.modify(this.geometry));
	    }
	    return results;
	  };

	  Skull.prototype.explode_geometry = function() {
	    var explodeModifier;
	    explodeModifier = new THREE.ExplodeModifier;
	    return explodeModifier.modify(this.geometry);
	  };

	  Skull.prototype.colors_and_displacement = function() {
	    var colors, displacement, f, h, i, j, l, ref, results, s, v, x, y, z;
	    colors = this.attributes.customColor.value;
	    displacement = this.attributes.displacement.value;
	    v = 0;
	    results = [];
	    for (f = j = 0, ref = this.geometry.faces.length; 0 <= ref ? j < ref : j > ref; f = 0 <= ref ? ++j : --j) {
	      h = 0 * Math.random();
	      s = 0 * Math.random();
	      l = 0.3 * Math.random();
	      x = 112 * (0.5 - Math.random());
	      y = 112 * (0.5 - Math.random());
	      z = 112 * (0.5 - Math.random());
	      results.push((function() {
	        var k, results1;
	        results1 = [];
	        for (i = k = 0; k <= 2; i = ++k) {
	          colors[v] = new THREE.Color;
	          colors[v].setHSL(h, s, l);
	          colors[v].convertGammaToLinear();
	          displacement[v] = new THREE.Vector3;
	          displacement[v].set(x, y, z);
	          results1.push(v += 1);
	        }
	        return results1;
	      })());
	    }
	    return results;
	  };

	  Skull.prototype.reset_amplitude = function() {
	    var params, ref;
	    if ((ref = this.reset_tween) != null) {
	      ref.kill();
	    }
	    this.animate_calvarium = false;
	    params = {
	      value: 0,
	      ease: Power1.easeInOut
	    };
	    return this.reset_tween = TweenLite.to(this.uniforms.amplitude, 1, params);
	  };

	  Skull.prototype.update_sound_position = function() {
	    this.sounds.background.pos(0, 0, this.audio_pos_z);
	    return this.sounds.glitch.pos(0, 0, this.audio_pos_z);
	  };

	  Skull.prototype.update = function() {
	    if (!this.ready) {
	      return;
	    }
	    if (this.mouse.is_down) {
	      this.uniforms.amplitude.value -= 0.005 * this.accel;
	    } else {
	      this.uniforms.amplitude.value += 0.0008 * this.accel;
	    }
	    this.uniforms.amplitude.value = THREE.Math.clamp(this.uniforms.amplitude.value, 0, 10000);
	    this.update_sound_position();
	    renderer.setSize(win.width, win.height);
	    return this.composer.render();
	  };

	  Skull.prototype.destroy = function() {
	    clearTimeout(this.render_interval);
	    return Skull.__super__.destroy.call(this);
	  };

	  return Skull;

	})(Experiment);


/***/ },
/* 50 */
/***/ function(module, exports) {

	var directional, point;

	directional = new THREE.DirectionalLight(0xFFFFFF, 1);

	directional.position.set(0, 100, 10);

	point = new THREE.PointLight(0xFFFFFF, 1, 1000);

	point.position.set(0, -150, 0);

	exports.lights = [point, directional];


/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = {
	  fog_enabled: true,
	  transition_debug: false,
	  has_composer: true,
	  camera_fov: 80,
	  "path_in": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 400
	    }, {
	      "x": 0,
	      "y": 0,
	      "z": 80
	    }
	  ],
	  "path_in_lookat": {
	    "x": 0,
	    "y": 0,
	    "z": 0
	  },
	  "path_out": [
	    {
	      "x": 0,
	      "y": 0.5714285714285836,
	      "z": 80.57142857142856
	    }, {
	      "x": 0,
	      "y": -10,
	      "z": 0
	    }, {
	      "x": -20,
	      "y": -20,
	      "z": -30
	    }
	  ],
	  "path_out_lookat": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 0
	    }, {
	      "x": 0,
	      "y": 0,
	      "z": -400
	    }
	  ],
	  camera_in_duration: 15,
	  camera_out_duration: 6,
	  fog_in_duration: 16,
	  fog_out_duration: 4,
	  fog_in_start: 0.03,
	  fog_in_end: 0.01,
	  fog_out_start: 0.001,
	  fog_out_end: 0.01,
	  audio_pos_z_in: 10,
	  audio_pos_z_out: -10
	};


/***/ },
/* 52 */
/***/ function(module, exports) {

	exports.vertex = function() {
	  var shader;
	  shader = ['uniform float amplitude;', 'attribute vec3 customColor;', 'attribute vec3 displacement;', 'varying vec3 vNormal;', 'varying vec3 vColor;', 'void main() {', 'vNormal = normal;', 'vColor = customColor;', 'vec3 newPosition = position + amplitude * displacement;', 'gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );', '}'];
	  return shader.join('\n');
	};

	exports.fragment = function() {
	  var shader;
	  shader = ['varying vec3 vNormal;', 'varying vec3 vColor;', THREE.ShaderChunk["fog_pars_fragment"], 'void main() {', 'const float ambient = 0.005;', 'vec3 light = vec3( 1.0 );', 'light = normalize( light );', 'float directional = max( dot( vNormal, light ), 0.0 );', 'gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );', 'gl_FragColor.xyz = sqrt( gl_FragColor.xyz );', THREE.ShaderChunk["fog_fragment"], '}'];
	  return shader.join('\n');
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var asset, assets, i, len, settings;

	settings = __webpack_require__(10);

	assets = [
	  {
	    id: 'GlitchPass',
	    url: '/js/calvarium/GlitchPass.js',
	    type: 'js'
	  }, {
	    id: 'skull',
	    url: '/js/calvarium/skull.js',
	    type: 'geometry'
	  }, {
	    id: 'background',
	    url: '/sound/calvarium/background.mp3',
	    type: 'sound'
	  }, {
	    id: 'glitch',
	    url: '/sound/calvarium/glitch.mp3',
	    type: 'sound'
	  }, {
	    id: 'after',
	    url: '/sound/calvarium/after.mp3',
	    type: 'sound'
	  }
	];

	for (i = 0, len = assets.length; i < len; i++) {
	  asset = assets[i];
	  asset.url = settings.base_path + asset.url;
	}

	module.exports = assets;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var Elements, Experiment, GeometryBuilder, Keyboard, Loader, Mouse, PathLookatCurve, PathLookatFixed, SierpinskiData, UI, cameras, engine, lights, renderer, settings, utils, win,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	settings = __webpack_require__(10);

	cameras = __webpack_require__(16);

	engine = __webpack_require__(7);

	Loader = __webpack_require__(26);

	Mouse = __webpack_require__(33);

	utils = __webpack_require__(34);

	win = __webpack_require__(9);

	renderer = __webpack_require__(18);

	Experiment = __webpack_require__(36);

	lights = __webpack_require__(55);

	UI = __webpack_require__(56);

	SierpinskiData = __webpack_require__(59);

	GeometryBuilder = __webpack_require__(60);

	PathLookatFixed = __webpack_require__(47);

	PathLookatCurve = __webpack_require__(48);

	Keyboard = __webpack_require__(35);

	module.exports = Elements = (function(superClass) {
	  extend(Elements, superClass);

	  function Elements() {
	    this.on_builder_complete = bind(this.on_builder_complete, this);
	    this.generate = bind(this.generate, this);
	    this.on_mouse_down = bind(this.on_mouse_down, this);
	    this.on_move = bind(this.on_move, this);
	    this.update = bind(this.update, this);
	    this.change_geometry = bind(this.change_geometry, this);
	    this.on_key_up = bind(this.on_key_up, this);
	    this.on_key_down = bind(this.on_key_down, this);
	    this.set_props = bind(this.set_props, this);
	    this.setup = bind(this.setup, this);
	    return Elements.__super__.constructor.apply(this, arguments);
	  }

	  Elements.prototype.ready = false;

	  Elements.prototype.geometry = '';

	  Elements.prototype.distance = 0;

	  Elements.prototype.rx = 0.1;

	  Elements.prototype.ry = 0.1;

	  Elements.prototype.rz = 0.1;

	  Elements.prototype.fog_near = 0;

	  Elements.prototype.audio_pos_z = 0;

	  Elements.prototype.current_sound_vol = 0.5;

	  Elements.prototype.fog_color = 0x000000;

	  Elements.prototype.setup = function(manifest) {

	    /*
	    		Engine
	     */
	    var divisions, folder_fog, folder_mesh, id, key, labels, params, ref, sound, sphere_radius;
	    engine.fov = this.config.camera_fov;

	    /*
	    		UI
	     */
	    this.ui = new UI('elements', this.scene, manifest);

	    /*
	    		Keyboard controls
	     */
	    this.keyboard = new Keyboard($(window));

	    /*
	    		Scene
	     */
	    if (this.config.fog_enabled) {
	      this.scene.fog = new THREE.FogExp2(this.fog_color, this.config.fog_in_start);
	      this.gui.add(this.scene.fog, 'density', 0, 1);
	      this.fog_near = this.config.fog_near;
	    }

	    /*
	    		Helpers
	     */
	    if (settings.debug) {
	      this.scene.add(new THREE.GridHelper(50, 10));
	      this.scene.add(new THREE.AxisHelper(10));
	      this.scene.add(new THREE.CameraHelper(cameras.user));
	    }

	    /*
	    		Create curve for camera
	     */
	    this.path_in = new PathLookatFixed('path_in', this.scene, this.config.path_in, this.config.path_in_lookat, 0x00FF00);
	    this.path_out = new PathLookatCurve('path_out', this.scene, this.config.path_out, this.config.path_out_lookat, 0x00FF00);

	    /*
	    		Mouse
	     */
	    this.mouse = new Mouse($('body'));

	    /*
	    		Sounds
	     */
	    this.set_props('octahedron');
	    this.audio_pos_z = this.config.audio_pos_z_in;
	    this.sounds = {
	      background: utils.get_asset('background', manifest).data,
	      dodecahedron: utils.get_asset('aether', manifest).data,
	      octahedron: utils.get_asset('air', manifest).data,
	      hexahedron: utils.get_asset('earth', manifest).data,
	      tetrahedron: utils.get_asset('fire', manifest).data,
	      icosahedron: utils.get_asset('water', manifest).data
	    };
	    ref = this.sounds;
	    for (key in ref) {
	      sound = ref[key];
	      sound.volume(0);
	      sound.play();
	      sound.loop(true);
	    }
	    this.update_sound_position();
	    this.sounds.background.volume(0.5);
	    this.sounds['octahedron'].fade(0, 0.5, 400);

	    /*
	    		Configure engine
	     */
	    renderer.shadowMapEnabled = true;
	    renderer.shadowMapSoft = true;

	    /*
	    		Lights
	     */
	    this.scene.add(lights.ambient);
	    this.scene.add(lights.directional);

	    /*
	    		Objects
	     */
	    this.container = new THREE.Object3D;
	    this.scene.add(this.container);
	    this.mesh_container = new THREE.Object3D;
	    this.container.add(this.mesh_container);
	    this.builder = new GeometryBuilder();
	    this.sierpinski = new SierpinskiData.SierpinskiPolyhedron();
	    params = {
	      color: 0xFF0000,
	      wireframe: true,
	      visible: false
	    };
	    sphere_radius = this.config.sphere_radius;
	    divisions = 64;
	    this.sphere = new THREE.Mesh(new THREE.SphereGeometry(sphere_radius, divisions, divisions), new THREE.MeshLambertMaterial(params));
	    this.scene.add(this.sphere);

	    /*
	    		GUI
	     */
	    labels = [];
	    for (id in this.config.geometries) {
	      labels.push(id);
	    }
	    folder_mesh = this.gui.addFolder('controller::elements::mesh');
	    folder_fog = this.gui.addFolder('controller::elements::fog');
	    folder_mesh.add(this, 'geometry', labels).onChange((function(_this) {
	      return function(val) {
	        return c.log(val);
	      };
	    })(this));
	    folder_mesh.add(this.config, 'radius', 20, 100);
	    folder_mesh.add(this.config, 'scale_ratio', 0, 10);
	    folder_mesh.addColor(this.config, 'color');
	    folder_mesh.add(this.config, 'wireframe');
	    folder_mesh.add(this.config, 'wireframe_thickness', 1, 10);
	    folder_mesh.add(this.config, 'blending', ['NormalBlending', 'AdditiveBlending']);
	    folder_mesh.add(this.config, 'opacity', 0, 1);
	    folder_mesh.add(this.config, 'deform', -5, 5).onChange((function(_this) {
	      return function() {
	        return _this.deform_mesh();
	      };
	    })(this));
	    folder_mesh.add(this, 'rx', 0, Math.PI * 2);
	    folder_mesh.add(this, 'ry', 0, Math.PI * 2);
	    folder_mesh.add(this, 'rz', 0, Math.PI * 2);
	    folder_fog.add(this.config, 'fog_near', 0, 0.1);
	    folder_fog.add(this.config, 'fog_far', 0, 0.2);
	    folder_fog.add(this.config, 'fog', 0, 0.1).listen();
	    this.once('generated', (function(_this) {
	      return function() {
	        _this.bind();
	        return _this.emit('setup:complete');
	      };
	    })(this));
	    return this.generate();
	  };

	  Elements.prototype.set_props = function(geometry_id) {
	    var data, key, results, val;
	    this.geometry_id = geometry_id;
	    data = this.preset();
	    results = [];
	    for (key in data) {
	      val = data[key];
	      results.push(this.config[key] = val);
	    }
	    return results;
	  };

	  Elements.prototype.bind = function() {
	    c.debug('binding');
	    engine.on('update', this.update);
	    this.keyboard.on('key:down:space', this.on_key_down);
	    this.keyboard.on('key:up:space', this.on_key_up);
	    this.ui.on('change:geometry', this.change_geometry);
	    this.mouse.on('move', this.on_move);
	    this.mouse.on('down', this.on_mouse_down);
	    this.ui.bind();
	    this.keyboard.bind();
	    return this.mouse.bind();
	  };

	  Elements.prototype.unbind = function() {
	    c.debug('unbinding');
	    engine.off('update', this.update);
	    this.keyboard.off('key:down:space', this.on_key_down);
	    this.keyboard.off('key:up:space', this.on_key_up);
	    this.ui.off('change:geometry', this.generate);
	    this.mouse.off('move', this.on_move);
	    this.mouse.off('down', this.on_mouse_down);
	    this.ui.unbind();
	    this.keyboard.unbind();
	    return this.mouse.unbind();
	  };

	  Elements.prototype.on_key_down = function() {
	    c.log('down');
	    if (this.is_transitioning_in) {
	      return;
	    }
	    if (this.is_transition_disabled) {
	      return;
	    }
	    c.log('x');
	    return this.transition_out_forward();
	  };

	  Elements.prototype.on_key_up = function() {
	    return this.transition_out_backward();
	  };

	  Elements.prototype.change_geometry = function(id) {
	    var params, preset;
	    this.sounds[this.geometry_id].fade(this.current_sound_vol, 0, 400);
	    this.set_props(id);
	    this.disable_transition();
	    this.ui.show_title(id);
	    params = {
	      opacity: 1,
	      ease: Power3.easeOut,
	      onComplete: (function(_this) {
	        return function() {
	          _this.unbind();
	          return _this.generate();
	        };
	      })(this)
	    };
	    TweenLite.to(this.ui.ui.transition_black, 3.5, params);
	    preset = this.preset();
	    return this.sounds[this.geometry_id].fade(0, 0.5, 400);
	  };

	  Elements.prototype.calc_fog = function() {
	    return this.config.fog_far + this.fog_near;
	  };

	  Elements.prototype.update = function() {
	    var color, near, percent;
	    if (this.config.fog_enabled) {
	      near = Math.max(this.config.fog_near, this.fog_near);
	      if (this.mouse.is_dragging && !this.is_transitioning_out) {
	        percent = Math.abs(this.mouse.normal_center_x) * 2;
	        this.fog_near = utils.lerp(this.config.fog_near, 0.012, percent);
	        this.sounds.background.volume(this.mouse.normal_x);
	        this.current_sound_vol = 1 - this.mouse.normal_x;
	        this.sounds[this.geometry_id].volume(this.current_sound_vol);
	      }

	      /*
	      			need to set cam zoom percent
	       */
	      this.config.fog = this.calc_fog();
	      this.scene.fog.density = this.config.fog;
	    }
	    if (this.ready) {
	      this.mesh.material.wireframe = this.config.wireframe;
	      this.mesh.material.wireframeLinewidth = this.config.wireframe_thickness;
	      this.mesh.material.opacity = this.config.opacity;
	      color = this.config.color.replace('#', '0x');
	      this.mesh.material.color.setHex(color);
	      this.mesh.rotation.x += 0.0005;
	      this.mesh.rotation.y += 0.0005;
	      this.mesh.rotation.z += 0.0005;
	      return this.update_sound_position();
	    }
	  };

	  Elements.prototype.update_sound_position = function() {
	    this.sounds.background.pos(0, 0, this.audio_pos_z);
	    return this.sounds[this.geometry_id].pos(0, 0, this.audio_pos_z);
	  };

	  Elements.prototype.on_move = function() {
	    var angle, bounds, distance, max, min, params, ref, ref1, ref2, ref3, x, y, z;
	    if (this.is_transitioning_out) {
	      return;
	    }
	    if (this.mouse.is_down) {
	      x = (win.width * 0.5) / win.width;
	      y = (win.height * 0.5) / win.height;
	      distance = this.mouse.normal_x;
	      if ((ref = this.deform_tween) != null) {
	        ref.kill();
	      }
	      params = {
	        distance: distance,
	        ease: Power2.easeOut,
	        onUpdate: (function(_this) {
	          return function() {
	            _this.config.deform = _this.distance.map(0, 1, -1, 1, distance);
	            return _this.deform_mesh();
	          };
	        })(this)
	      };
	      this.deform_tween = TweenLite.to(this, 0.3, params);
	      z = -60 * Math.abs(this.mouse.normal_center_x);
	      this.mesh_container.position.z = z;
	    }
	    if (this.ready) {
	      if ((ref1 = this.mesh_rotate_tween) != null) {
	        ref1.kill();
	      }
	      angle = Math.PI * 0.01;
	      y = utils.lerp(-angle, angle, this.mouse.normal_x);
	      params = {
	        y: y,
	        ease: Power4.easeOut
	      };
	      this.mesh_rotate_tween = TweenLite.to(this.mesh_container.rotation, 5, params);
	      bounds = this.config.cam_move_bounds;
	      min = new THREE.Vector2(-bounds, -bounds);
	      max = new THREE.Vector2(bounds, bounds);
	      if ((ref2 = this.mesh_position_tween) != null) {
	        ref2.kill();
	      }
	      x = utils.lerp(min.x, max.x, this.mouse.normal_x);
	      y = utils.lerp(min.y, max.y, this.mouse.normal_y);
	      params = {
	        x: x,
	        y: -y,
	        ease: Power4.easeOut
	      };
	      this.mesh_position_tween = TweenLite.to(this.mesh_container.position, 5, params);
	      return (ref3 = this.cam_position_tween) != null ? ref3.kill() : void 0;
	    }
	  };

	  Elements.prototype.on_mouse_down = function() {
	    return this.force_transition_in_complete();
	  };

	  Elements.prototype.preset = function() {
	    return this.config.geometries[this.geometry_id];
	  };

	  Elements.prototype.generate = function() {
	    var data;
	    if (this.mesh) {
	      this.mesh_container.remove(this.mesh);
	    }
	    this.ready = false;
	    data = this.sierpinski.generate(this.config.geometry, this.config.radius, this.config.iteration, this.config.scale_ratio, 0);
	    return this.builder.build(this.config.geometry, data, this.sierpinski.logarithmic_scale(), 0, this.on_builder_complete);
	  };

	  Elements.prototype.on_builder_complete = function(geometry) {
	    var data, distance, distance_between_vertex_and_sphere_vertex, g_v, i, index, j, k, l, len, len1, params, ref, ref1, s_v;
	    params = {
	      color: this.config.color,
	      wireframe: this.config.wireframe,
	      wireframeLinewidth: this.config.wireframe_thickness,
	      blending: THREE[this.config.blending],
	      opacity: this.config.opacity,
	      transparent: true
	    };
	    this.mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(params));
	    this.mesh.castShadow = true;
	    this.mesh.receiveShadow = true;
	    this.mesh.rotation.x = this.preset().rotate_x;
	    this.mesh.rotation.y = this.preset().rotate_y;
	    this.mesh.rotation.z = this.preset().rotate_z;
	    this.mesh_container.add(this.mesh);
	    this.data_map = [];
	    ref = this.mesh.geometry.vertices;
	    for (i = k = 0, len = ref.length; k < len; i = ++k) {
	      g_v = ref[i];
	      distance = Infinity;
	      index = 0;
	      g_v.weight = Math.random();
	      g_v.position = new THREE.Vector3(g_v.x, g_v.y, g_v.z);
	      ref1 = this.sphere.geometry.vertices;
	      for (j = l = 0, len1 = ref1.length; l < len1; j = ++l) {
	        s_v = ref1[j];
	        distance_between_vertex_and_sphere_vertex = s_v.distanceTo(g_v);
	        if (distance_between_vertex_and_sphere_vertex < distance) {
	          distance = distance_between_vertex_and_sphere_vertex;
	          index = j;
	        }
	      }
	      this.data_map.push({
	        vertex: index,
	        distance: distance
	      });
	    }
	    this.config.deform = 0;
	    this.distance = 0.5;
	    this.deform_mesh();
	    data = this.config.geometries[this.geometry];
	    this.ready = true;
	    this.bind();
	    this.enable_transition();
	    this.mesh_container.position.z = 0;
	    this.fog_near = this.config.fog_near;
	    params = {
	      opacity: 0,
	      ease: Power4.easeOut,
	      delay: 1.5,
	      onComplete: (function(_this) {
	        return function() {
	          return _this.ui.hide_title();
	        };
	      })(this)
	    };
	    TweenLite.to(this.ui.ui.transition_black, 2, params);
	    return utils.delay(0.3, (function(_this) {
	      return function() {
	        return _this.emit('generated');
	      };
	    })(this));
	  };

	  Elements.prototype.deform_mesh = function() {
	    var data, i, k, len, mesh_vertex_index, new_position, percent, ref, sphere_vertex_index, v1, v2;
	    ref = this.data_map;
	    for (i = k = 0, len = ref.length; k < len; i = ++k) {
	      data = ref[i];
	      mesh_vertex_index = i;
	      sphere_vertex_index = data.vertex;
	      percent = data.distance / 50;
	      v1 = this.mesh.geometry.vertices[mesh_vertex_index].position;
	      v2 = this.sphere.geometry.vertices[sphere_vertex_index];
	      if (v1.x === 0 && v1.y === 0 && v1.z === 0) {

	      } else {
	        new_position = v1.clone().lerp(v2.clone(), this.config.deform);
	        this.mesh.geometry.vertices[mesh_vertex_index].x = new_position.x;
	        this.mesh.geometry.vertices[mesh_vertex_index].y = new_position.y;
	        this.mesh.geometry.vertices[mesh_vertex_index].z = new_position.z;
	      }
	    }
	    return this.mesh.geometry.verticesNeedUpdate = true;
	  };

	  return Elements;

	})(Experiment);


/***/ },
/* 55 */
/***/ function(module, exports) {

	var ambient, directional;

	ambient = new THREE.AmbientLight(0xb1b1b1);

	directional = new THREE.DirectionalLight(0xFFFFFF, 0.7);

	directional.position.x = 30;

	directional.position.y = 30;

	directional.position.z = 30;

	directional.shadowCameraNear = 25;

	directional.castShadow = true;

	exports.ambient = ambient;

	exports.directional = directional;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var Sequence, SequencerModes, SequencerPlayer, UI, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	UI = __webpack_require__(37);

	utils = __webpack_require__(34);

	SequencerPlayer = __webpack_require__(57);

	SequencerModes = __webpack_require__(58);

	module.exports = UI = (function(superClass) {
	  extend(UI, superClass);

	  UI.prototype.curent_id = 'octahedron';

	  function UI(id1, gui, assets) {
	    var len, radius;
	    this.id = id1;
	    this.gui = gui;
	    this.assets = assets;
	    this.on_navlink_click = bind(this.on_navlink_click, this);
	    this.on_mouse_out = bind(this.on_mouse_out, this);
	    this.on_mouse_over = bind(this.on_mouse_over, this);
	    UI.__super__.constructor.call(this, this.id, this.assets);
	    this.ui.sequences = this.el.find('[data-sequence]');
	    this.ui.nav_geometry = this.el.find('nav.geometry');
	    this.ui.titles = this.el.find('.titles');

	    /*
	    		Load spritesheets
	     */
	    this.sequences = {};
	    len = this.ui.sequences.length;
	    radius = 300;
	    this.ui.sequences.each((function(_this) {
	      return function(index, item) {
	        var $el, asset, id;
	        $el = $(item);
	        id = $el.data('id');
	        asset = utils.get_asset(id + "_sequence", _this.assets);
	        return _this.sequences[id] = new Sequence($el, asset);
	      };
	    })(this));
	  }

	  UI.prototype.transition_in = function() {
	    var delay, delays;
	    UI.__super__.transition_in.call(this);
	    delay = 9.5;
	    delays = [1, 0.7, 0.3, 0.7, 1];
	    this.ui.sequences.each((function(_this) {
	      return function(index, item) {
	        var $item, params;
	        $item = $(item);
	        params = {
	          autoAlpha: 1,
	          ease: Power2.easeIn,
	          delay: delay + delays[index]
	        };
	        return TweenLite.to($item.parent(), 1.5, params);
	      };
	    })(this));
	    return utils.delay(delay, (function(_this) {
	      return function() {
	        return _this.bind();
	      };
	    })(this));
	  };

	  UI.prototype.bind = function() {
	    UI.__super__.bind.call(this);
	    this.ui.sequences.on('mouseover', this.on_mouse_over);
	    this.ui.sequences.on('mouseleave', this.on_mouse_out);
	    return this.ui.sequences.on('click', this.on_navlink_click);
	  };

	  UI.prototype.unbind = function() {
	    UI.__super__.unbind.call(this);
	    this.ui.sequences.off('mouseover', this.on_mouse_over);
	    this.ui.sequences.off('mouseleave', this.on_mouse_out);
	    return this.ui.sequences.off('click', this.on_navlink_click);
	  };

	  UI.prototype.on_mouse_over = function(event) {
	    var el, id;
	    el = $(event.currentTarget);
	    id = el.data('id');
	    return this.sequences[id].play();
	  };

	  UI.prototype.on_mouse_out = function() {
	    var el, id;
	    el = $(event.currentTarget);
	    id = el.data('id');
	    return this.sequences[id].stop();
	  };

	  UI.prototype.on_navlink_click = function(event) {
	    var $el, id;
	    event.preventDefault();
	    $el = $(event.currentTarget);
	    id = $el.data('id');
	    if (this.curent_id === id) {
	      return;
	    }
	    this.curent_id = id;
	    this.ui.nav_geometry.find('a').removeClass('active');
	    this.ui.nav_geometry.find('a[data-id="' + id + '"]').addClass('active');
	    this.disable_ui();
	    return this.emit('change:geometry', id);
	  };

	  UI.prototype.show_title = function(id) {
	    var params;
	    TweenLite.set(this.ui.titles.find('.title'), {
	      autoAlpha: 0
	    });
	    TweenLite.set(this.ui.titles.find('[data-id="' + id + '"]'), {
	      autoAlpha: 1
	    });
	    params = {
	      ease: Power2.easeIn,
	      autoAlpha: 1
	    };
	    TweenLite.to(this.ui.titles, 1.6, params);
	    params = {
	      ease: Power2.easeIn,
	      autoAlpha: 0
	    };
	    return TweenLite.to(this.ui.next_text, 1.6, params);
	  };

	  UI.prototype.hide_title = function() {
	    var params;
	    this.enable_ui();
	    params = {
	      ease: Power2.easeIn,
	      autoAlpha: 0
	    };
	    TweenLite.to(this.ui.titles, 1.6, params);
	    params = {
	      ease: Power2.easeIn,
	      autoAlpha: 1
	    };
	    return TweenLite.to(this.ui.next_text, 1.6, params);
	  };

	  UI.prototype.destroy = function() {
	    var key, ref, sequence;
	    ref = this.sequences;
	    for (key in ref) {
	      sequence = ref[key];
	      sequence.destroy();
	    }
	    return UI.__super__.destroy.call(this);
	  };

	  return UI;

	})(UI);

	Sequence = (function() {
	  function Sequence(el1, asset) {
	    this.el = el1;
	    this.repeat_for_hover = bind(this.repeat_for_hover, this);
	    this.player = new SequencerPlayer(this.el[0]);
	    this.player.on('setup_complete', (function(_this) {
	      return function() {
	        _this.mode = new SequencerModes.LinearMode(_this.player.data);
	        _this.player.set_mode(_this.mode);
	        _this.mode.frame = 0;
	        return _this.mode._update();
	      };
	    })(this));
	    this.player.noload(asset.data, asset.images);
	  }

	  Sequence.prototype.play = function() {
	    this.mode.play(1, this.mode.total_frames());
	    return this.mode.on('complete', this.repeat_for_hover);
	  };

	  Sequence.prototype.stop = function() {
	    return this.mode.off('complete', this.repeat_for_hover);
	  };

	  Sequence.prototype.repeat_for_hover = function() {
	    return this.mode.play(1, this.mode.total_frames());
	  };

	  Sequence.prototype.destroy = function() {
	    this.mode = null;
	    return this.player.destroy();
	  };

	  return Sequence;

	})();


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Player, Utils, happens,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	module.exports = Player = (function() {
	  Player.prototype.el = null;

	  Player.prototype.current_frame = -1;

	  Player.prototype.spritesheet_index = -1;

	  Player.prototype.offset_x = 0;

	  Player.prototype.offset_y = 0;

	  Player.prototype.mode = null;

	  function Player(el1) {
	    this.el = el1;
	    this.update = bind(this.update, this);
	    this.set_size = bind(this.set_size, this);
	    this.set_mode = bind(this.set_mode, this);
	    this.load = bind(this.load, this);
	    this._resize = bind(this._resize, this);
	    this._update = bind(this._update, this);
	    this._setup = bind(this._setup, this);
	    happens(this);
	    this.el.style.overflow = 'hidden';
	  }

	  Player.prototype._create_frame = function(src, class_name) {
	    var el;
	    el = document.createElement('div');
	    el.className = class_name;
	    el.style.position = 'absolute';
	    el.style.width = '100%';
	    el.style.height = '100%';
	    if (src) {
	      el.style.backgroundImage = "url(" + src + ")";
	    }
	    el.style.backgroundRepeat = "no-repeat";
	    el.style.visibility = 'hidden';
	    return el;
	  };


	  /*
	  	Setup the container
	   */

	  Player.prototype._setup = function() {
	    var el, height, i, img, j, len, ref, width;
	    this.container = document.createElement('div');
	    this.container.style.position = 'absolute';
	    this.el.appendChild(this.container);
	    width = this.data.frame.width * this.data.frame.scale;
	    height = this.data.frame.height * this.data.frame.scale;
	    this.frame_width = this.data.frame.width;
	    this.frame_height = this.data.frame.height;
	    this.max_frames_horizontal = Math.round(this.data.width / this.data.frame.width);
	    this.max_frames_vertical = Math.round(this.data.height / this.data.frame.height);
	    this._frames = [];
	    ref = this._cache;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      img = ref[i];
	      el = this._create_frame(img.src, 'sd_frame');
	      this._frames.push(el);
	      this.container.appendChild(el);
	    }
	    this._cache = null;
	    this.set_size(width, height);
	    return this.emit('setup_complete', this);
	  };

	  Player.prototype._update = function(force) {
	    var background_x, background_y, frame, frames_at_index, index, j, k, ref, ref1, spritesheet_index, tile, x, xpos, y, ypos;
	    if (force == null) {
	      force = false;
	    }
	    frame = this.mode.get_frame();
	    spritesheet_index = Math.floor(frame / this.data.frames_per_spritesheet);
	    frames_at_index = spritesheet_index * this.data.frames_per_spritesheet;
	    tile = frame - frames_at_index;
	    index = -1;
	    xpos = 0;
	    ypos = 0;
	    for (y = j = 0, ref = this.max_frames_vertical; 0 <= ref ? j < ref : j > ref; y = 0 <= ref ? ++j : --j) {
	      for (x = k = 0, ref1 = this.max_frames_horizontal; 0 <= ref1 ? k < ref1 : k > ref1; x = 0 <= ref1 ? ++k : --k) {
	        index++;
	        if (index === tile) {
	          xpos = x;
	          ypos = y;
	          break;
	        }
	      }
	    }
	    background_x = -(xpos * this.frame_width);
	    background_y = -(ypos * this.frame_height);
	    background_x += this.offset_x;
	    background_y += this.offset_y;
	    if (frame !== this.current_frame || force) {
	      if (this._frames[this.spritesheet_index] != null) {
	        this._frames[this.spritesheet_index].style.visibility = 'hidden';
	        this._frames[this.spritesheet_index].style.zIndex = 0;
	      }
	      this.current_frame = frame;
	      this.spritesheet_index = spritesheet_index;
	      x = background_x + 'px';
	      y = background_y + 'px';
	      this._frames[spritesheet_index].style.backgroundPosition = x + " " + y;
	      this._frames[spritesheet_index].style.visibility = 'visible';
	      return this._frames[spritesheet_index].style.zIndex = 1;
	    }
	  };

	  Player.prototype._resize = function() {
	    var $window;
	    $window = $(window);
	    this.set_size($window.width(), $window.height());
	    return this._update(true);
	  };


	  /*----------------------------------------------
	  	@public
	   */

	  Player.prototype.load = function(path, frames) {
	    this.path = path;
	    return $.ajax({
	      url: this.path + '/' + frames,
	      complete: (function(_this) {
	        return function(data) {
	          _this.data = JSON.parse(data.responseText);
	          return _this._load_images();
	        };
	      })(this),
	      error: (function(_this) {
	        return function(error) {};
	      })(this)
	    });
	  };

	  Player.prototype.noload = function(data1, _cache) {
	    this.data = data1;
	    this._cache = _cache;
	    return this._setup();
	  };


	  /*
	  	Set the playback mode
	   */

	  Player.prototype.set_mode = function(mode) {
	    var ref;
	    if ((ref = this.mode) != null) {
	      ref.off('update', this.update);
	    }
	    this.mode = mode;
	    return this.mode.on('update', this.update);
	  };

	  Player.prototype.set_size = function(width1, height1) {
	    var $frames, ref;
	    this.width = width1;
	    this.height = height1;
	    this.el.style.width = this.width + 'px';
	    this.el.style.height = this.height + 'px';
	    this.container.style.width = this.width + 'px';
	    this.container.style.height = this.height + 'px';
	    $frames = $(this.container).find('.sd_frame');
	    ref = Utils.resize_spritesheet($frames, this.data.frame.width, this.data.frame.height, this.width, this.height, this.max_frames_horizontal, this.max_frames_vertical), this.frame_width = ref[0], this.frame_height = ref[1], this.offset_x = ref[2], this.offset_y = ref[3];
	    this.frame_width = Math.floor(this.frame_width);
	    return this.frame_height = Math.floor(this.frame_height);
	  };

	  Player.prototype.update = function() {
	    if (this.mode == null) {
	      return;
	    }
	    return this._update();
	  };


	  /*
	  	Enable the automatic resizing of the sequencer container on window resize
	   */

	  Player.prototype.enable_automatic_resize = function() {
	    $(window).on('resize', this._resize);
	    return this._resize();
	  };


	  /*
	  	Disable the automatic resizing of the sequencer container on window resize
	   */

	  Player.prototype.disable_automatic_resize = function() {
	    return $(window).off('resize', this._resize);
	  };


	  /*
	  	Return the number of frames in the sequence
	  	@return [Int]
	   */

	  Player.prototype.get_total_frames = function() {
	    return this.data.total_frames - 1;
	  };


	  /*
	  	Return the number of frames in the sequence
	  	@return [Int]
	   */

	  Player.prototype.get_total_spritesheets = function() {
	    return this.data.total_spritesheets - 1;
	  };

	  Player.prototype.destroy = function() {
	    this.mode.off('update', this.update);
	    this.mode = null;
	    this.__init = null;
	    this.on = null;
	    this.off = null;
	    this.once = null;
	    this.emit = null;
	    this.data = null;
	    return this.el.innerHTML = '';
	  };

	  return Player;

	})();

	Utils = {
	  calculate_resize: function(image_width, image_height, win_width, win_height) {
	    var image_ratio1, image_ratio2, new_height, new_left, new_top, new_width, window_ratio;
	    window_ratio = win_width / win_height;
	    image_ratio1 = image_width / image_height;
	    image_ratio2 = image_height / image_width;
	    if (window_ratio < image_ratio1) {
	      new_height = win_height;
	      new_width = Math.round(new_height * image_ratio1);
	      new_top = 0;
	      new_left = (win_width * .5) - (new_width * .5);
	    } else {
	      new_width = win_width;
	      new_height = Math.round(new_width * image_ratio2);
	      new_top = (win_height * .5) - (new_height * .5);
	      new_left = 0;
	    }
	    return {
	      x: new_left,
	      y: new_top,
	      width: new_width,
	      height: new_height
	    };
	  },

	  /*
	  	Resize image(s) to the browser size retaining aspect ratio
	  	@param [jQuery]  $images
	  	@param [Number]  image_width
	  	@param [Number]  image_height
	  	@param [Number]  win_width
	  	@param [Number]  win_width
	  	@param [Boolean] backgroundsize
	   */
	  resize: function($images, image_width, image_height, win_width, win_height, backgroundsize) {
	    var data;
	    data = this.calculate_resize(image_width, image_height, win_width, win_height);
	    if (backgroundsize) {
	      return $images.css({
	        'background-size': data.width + "px " + data.height + "px",
	        'background-position': data.x + "px " + data.y + "px"
	      });
	    } else {
	      return $images.css({
	        'margin-top': data.y + "px",
	        'margin-left': data.x + "px",
	        'width': data.width + "px",
	        'height': data.height + "px"
	      });
	    }
	  },
	  resize_spritesheet: function($images, image_width, image_height, win_width, win_height, max_frames_horizontal, max_frames_vertical) {
	    var data, size_x, size_y;
	    data = this.calculate_resize(image_width, image_height, win_width, win_height);
	    size_x = data.width * max_frames_horizontal;
	    size_y = data.height * max_frames_vertical;
	    $images.css({
	      'background-size': size_x + "px " + size_y + "px"
	    });
	    return [data.width, data.height, data.x, data.y];
	  }
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var happens,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	exports.FrameMode = (function() {
	  _Class.prototype.id = 'Delay';

	  _Class.prototype.frame = 0;

	  function _Class(frames, data) {
	    this.frames = frames;
	    this.data = data;
	    this._update = bind(this._update, this);
	    this.get_frame = bind(this.get_frame, this);
	    happens(this);
	  }

	  _Class.prototype.set_frame = function(frame1) {
	    this.frame = frame1;
	  };

	  _Class.prototype.get_frame = function() {
	    var frame;
	    frame = Math.floor(this.frame);
	    frame = Math.min(frame, this.total_frames());
	    frame = Math.max(frame, 0);
	    return frame;
	  };

	  _Class.prototype.total_frames = function() {
	    return this.frames.total_frames - 1;
	  };

	  _Class.prototype._update = function() {
	    return this.emit('update');
	  };

	  return _Class;

	})();

	exports.LinearMode = (function() {
	  _Class.prototype.id = 'Linear';

	  _Class.prototype.frame = 0;

	  function _Class(data) {
	    this.data = data;
	    this._complete = bind(this._complete, this);
	    this._update = bind(this._update, this);
	    this.get_frame = bind(this.get_frame, this);
	    happens(this);
	  }

	  _Class.prototype.play = function(duration, end_frame, ease) {
	    var params;
	    if (duration == null) {
	      duration = 1;
	    }
	    if (end_frame == null) {
	      end_frame = 1;
	    }
	    if (ease == null) {
	      ease = Linear.easeNone;
	    }
	    this.stop();
	    this.frame = 0;
	    params = {
	      frame: end_frame,
	      onUpdate: this._update,
	      onComplete: this._complete,
	      ease: ease
	    };
	    return this.tween = TweenLite.to(this, duration, params);
	  };

	  _Class.prototype.stop = function() {
	    return TweenLite.killTweensOf(this.tween);
	  };

	  _Class.prototype.get_frame = function() {
	    var frame;
	    frame = Math.floor(this.frame);
	    if (frame < 0) {
	      frame = 0;
	    } else if (frame > this.total_frames()) {
	      frame = this.total_frames();
	    }
	    return frame;
	  };

	  _Class.prototype.total_frames = function() {
	    return this.data.total_frames - 1;
	  };

	  _Class.prototype._update = function() {
	    return this.emit('update');
	  };

	  _Class.prototype._complete = function() {
	    this.frame = 0;
	    this._update();
	    return this.emit('complete');
	  };

	  return _Class;

	})();

	exports.RepeatMode = (function() {
	  _Class.prototype.id = 'Linear';

	  _Class.prototype.frame = 0;

	  _Class.prototype.repeat = 1;

	  function _Class(data) {
	    this.data = data;
	    this._reverse_complete = bind(this._reverse_complete, this);
	    this._complete = bind(this._complete, this);
	    this._update = bind(this._update, this);
	    this.get_frame = bind(this.get_frame, this);
	    this.play = bind(this.play, this);
	    happens(this);
	  }

	  _Class.prototype.play = function(duration1, end_frame, ease1) {
	    var params;
	    this.duration = duration1 != null ? duration1 : 1;
	    if (end_frame == null) {
	      end_frame = 1;
	    }
	    this.ease = ease1 != null ? ease1 : Linear.easeNone;
	    params = {
	      frame: this.total_frames(),
	      onUpdate: this._update,
	      onComplete: this._complete,
	      ease: this.ease,
	      repeat: this.repeat
	    };
	    return TweenMax.to(this, this.duration, params);
	  };

	  _Class.prototype.stop = function() {
	    return TweenMax.killTweensOf(this);
	  };

	  _Class.prototype.get_frame = function() {
	    var frame;
	    frame = Math.floor(this.frame);
	    if (frame < 0) {
	      frame = 0;
	    } else if (frame > this.total_frames()) {
	      frame = this.total_frames();
	    }
	    return frame;
	  };

	  _Class.prototype.total_frames = function() {
	    return this.data.total_frames - 1;
	  };

	  _Class.prototype._update = function() {
	    return this.emit('update');
	  };

	  _Class.prototype._complete = function() {
	    return this.emit('complete');
	  };

	  _Class.prototype._reverse_complete = function() {
	    this.emit('reverse_complete');
	    return this.tween.play();
	  };

	  return _Class;

	})();


/***/ },
/* 59 */
/***/ function(module, exports) {

	
	/*

	SierpinskiPolyhedron

	A class for generating Polyhedral Sierpinski fractals.
	The class returns a list of positions that can be used to generate the geometry after.
	 */
	var SierpinskiPolyhedron, SierpinskiSponge;

	SierpinskiPolyhedron = (function() {
	  var PHI, normals;

	  function SierpinskiPolyhedron() {}

	  PHI = 1.61803399;

	  normals = Array;

	  SierpinskiPolyhedron.prototype.presets = {
	    'IcosahedronGeometry': {
	      scale_ratio: 1 + PHI
	    },
	    'TetrahedronGeometry': {
	      scale_ratio: 2
	    },
	    'OctahedronGeometry': {
	      scale_ratio: 2
	    }
	  };

	  SierpinskiPolyhedron.prototype.type = null;

	  SierpinskiPolyhedron.prototype.radius = null;

	  SierpinskiPolyhedron.prototype.iterations = null;

	  SierpinskiPolyhedron.prototype.scale_ratio = null;


	  /*
	  	Generate and return a a list of objects containing information on each icosahedra in the fractal
	  	@param [String] geometry_class
	  	@param [Number] radius
	  	@param [Int]    iterations
	  	@param [Number] scale_ratio
	  	@param [Int] 	detail
	   */

	  SierpinskiPolyhedron.prototype.generate = function(geometry_class, radius1, iterations, scale_ratio, detail) {
	    var geometry, i, k, l, len, positions, radius, ref, ref1, scalar, scale, tmp, v;
	    this.geometry_class = geometry_class != null ? geometry_class : 'IcosahedronGeometry';
	    this.radius = radius1 != null ? radius1 : 20;
	    this.iterations = iterations != null ? iterations : 1;
	    this.scale_ratio = scale_ratio != null ? scale_ratio : 2.61803399;
	    this.detail = detail != null ? detail : 0;
	    scale = 1;
	    if (this.geometry_class === 'BoxGeometry') {
	      geometry = new THREE[this.geometry_class](this.radius, this.radius, this.radius);
	    } else {
	      geometry = new THREE[this.geometry_class](this.radius, this.detail);
	    }
	    positions = [
	      {
	        vertices: [],
	        center: new THREE.Vector3()
	      }
	    ];
	    normals = [];
	    ref = geometry.vertices;
	    for (k = 0, len = ref.length; k < len; k++) {
	      v = ref[k];
	      normals.push(v.clone().normalize());
	      positions[0].vertices.push(v.clone());
	    }
	    scalar = 1 - (1 / this.scale_ratio);
	    for (i = l = 0, ref1 = this.iterations; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
	      scale /= this.scale_ratio;
	      radius = this.radius * scale;
	      tmp = this._generate_data(positions, radius, scalar, i + 1);
	      positions = tmp;
	    }
	    geometry.dispose();
	    return positions;
	  };


	  /*
	  	Returns an list of objects containing information for the center and vertex positions for each successive icosahedron
	  	@param  [Array]  positions
	  	@param  [Number] radius
	  	@param  [Number] scalar
	  	@param  [Int]    iteration
	  	@return [Array]  positions_new
	   */

	  SierpinskiPolyhedron.prototype._generate_data = function(positions, radius, scalar, iteration) {
	    var center_new, data, i, j, k, l, len, len1, len2, m, normal, position, positions_new, ref, vertex, vertices, x, y, z;
	    positions_new = [];
	    for (k = 0, len = positions.length; k < len; k++) {
	      position = positions[k];
	      ref = position.vertices;
	      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
	        vertex = ref[i];
	        vertices = [];
	        center_new = position.center.clone().lerp(vertex.clone(), scalar);
	        for (j = m = 0, len2 = normals.length; m < len2; j = ++m) {
	          normal = normals[j];
	          x = center_new.x + radius * normals[j].x;
	          y = center_new.y + radius * normals[j].y;
	          z = center_new.z + radius * normals[j].z;
	          vertices.push(new THREE.Vector3(x, y, z));
	        }
	        data = {
	          vertices: vertices,
	          center: center_new
	        };
	        positions_new.push(data);
	      }
	    }
	    return positions_new;
	  };


	  /*
	  	Calculate the logarithmic scale of the geometry from the iteration
	  	@return [Number]
	   */

	  SierpinskiPolyhedron.prototype.logarithmic_scale = function() {
	    return this.radius / Math.pow(this.scale_ratio, this.iterations);
	  };

	  return SierpinskiPolyhedron;

	})();


	/*

	SierpinskiSponge

	A class for generating Sierpinski Sponge fractals.
	The class returns a list of positions that can be used to generate the geometry after.
	 */

	SierpinskiSponge = (function() {
	  var inlist;

	  function SierpinskiSponge() {}

	  SierpinskiSponge.prototype.size = null;

	  SierpinskiSponge.prototype.iterations = null;


	  /*
	  	Generate and return a list of Vectors for each cube in the fractal
	  	@param  [Number] radius
	  	@param  [Int]    iterations
	  	@param  [Int]    grid
	  	@param  [Array]  holes
	  	@return [Array]  positions
	   */

	  SierpinskiSponge.prototype.generate = function(size, iterations, grid1, holes1) {
	    var center_offset, cube_size, divisor, i, k, l, len, len1, m, position, positions, ref, tmp;
	    this.size = size != null ? size : 20;
	    this.iterations = iterations != null ? iterations : 2;
	    this.grid = grid1 != null ? grid1 : 3;
	    this.holes = holes1 != null ? holes1 : [4, 10, 12, 13, 14, 16, 22];
	    divisor = 1 / this.grid;
	    cube_size = this.size * divisor;
	    positions = [new THREE.Vector3()];
	    for (i = k = 0, ref = this.iterations; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
	      tmp = [];
	      for (l = 0, len = positions.length; l < len; l++) {
	        position = positions[l];
	        tmp = tmp.concat(this._sponge(position, cube_size, this.grid, this.holes));
	      }
	      cube_size *= divisor;
	      positions = tmp;
	    }
	    center_offset = (this.size / 2) - (this.logarithmic_scale() / 2);
	    for (m = 0, len1 = positions.length; m < len1; m++) {
	      position = positions[m];
	      position.x -= center_offset;
	      position.y -= center_offset;
	      position.z -= center_offset;
	    }
	    return positions;
	  };


	  /*
	  	Generate a sponge and return the center positions
	  	@param  [Vector3] 		   position
	  	@param  [Number]  		   cube_size
	  	@param  [Int]     		   grid
	  	@param  [Array[, Int]]     holes
	  	@return [Array[, Vector3]] positions
	   */

	  SierpinskiSponge.prototype._sponge = function(position, cube_size, grid, holes) {
	    var columns, i, k, l, levels, m, position_new, positions, ref, ref1, ref2, rows;
	    i = 0;
	    positions = [];
	    for (levels = k = 0, ref = grid; 0 <= ref ? k < ref : k > ref; levels = 0 <= ref ? ++k : --k) {
	      for (rows = l = 0, ref1 = grid; 0 <= ref1 ? l < ref1 : l > ref1; rows = 0 <= ref1 ? ++l : --l) {
	        for (columns = m = 0, ref2 = grid; 0 <= ref2 ? m < ref2 : m > ref2; columns = 0 <= ref2 ? ++m : --m) {
	          position_new = new THREE.Vector3;
	          position_new.x = position.x + (rows * cube_size);
	          position_new.y = position.y + (levels * cube_size);
	          position_new.z = position.z + (columns * cube_size);
	          if (!inlist(i, holes)) {
	            positions.push(position_new);
	          }
	          i++;
	        }
	      }
	    }
	    return positions;
	  };


	  /*
	  	Check to see if the val is in the list
	  	@param  [mixed]   val
	  	@param  [Array]   list
	  	@return [Boolean] result
	   */

	  inlist = function(val, list) {
	    var item, k, len, result;
	    result = false;
	    for (k = 0, len = list.length; k < len; k++) {
	      item = list[k];
	      if (item === val) {
	        result = true;
	        break;
	      }
	    }
	    return result;
	  };


	  /*
	  Calculate the logarithmic scale of the geometry from the iteration
	  @return [Number]
	   */

	  SierpinskiSponge.prototype.logarithmic_scale = function() {
	    return this.size / Math.pow(this.grid, this.iterations);
	  };

	  return SierpinskiSponge;

	})();

	exports.SierpinskiPolyhedron = SierpinskiPolyhedron;

	exports.SierpinskiSponge = SierpinskiSponge;


/***/ },
/* 60 */
/***/ function(module, exports) {

	var Builder, GeometryBuilder,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	module.exports = GeometryBuilder = (function() {
	  function GeometryBuilder() {
	    this._on_chunk_complete = bind(this._on_chunk_complete, this);
	  }

	  GeometryBuilder.prototype.chunk_size = 10;

	  GeometryBuilder.prototype.count = 0;

	  GeometryBuilder.prototype.total = 0;

	  GeometryBuilder.prototype.progress = 0;

	  GeometryBuilder.prototype.geometries = [];

	  GeometryBuilder.prototype.build = function(geometry_class, data, size, detail, callback) {
	    var chunk, chunks, i, j, len, results;
	    this.geometry_class = geometry_class;
	    this.data = data;
	    this.size = size;
	    this.detail = detail;
	    this.callback = callback;
	    this._reset();
	    chunks = [];
	    while (this.data.length > 0) {
	      chunks.push(this.data.splice(0, this.chunk_size));
	    }
	    this.total = chunks.length;
	    results = [];
	    for (i = j = 0, len = chunks.length; j < len; i = ++j) {
	      chunk = chunks[i];
	      results.push(new Builder(this.geometry_class, chunk, this.size, this.detail, this._on_chunk_complete));
	    }
	    return results;
	  };

	  GeometryBuilder.prototype._on_chunk_complete = function(geometery) {
	    var geometry, j, len, mesh_geometry, ref;
	    this.count++;
	    this.progress = this.count / this.total;
	    this.geometries.push(geometery);
	    if (this.count === this.total) {
	      mesh_geometry = new THREE.Geometry();
	      ref = this.geometries;
	      for (j = 0, len = ref.length; j < len; j++) {
	        geometry = ref[j];
	        mesh_geometry.merge(geometry);
	      }
	      this.callback(mesh_geometry);
	      return this._reset();
	    }
	  };

	  GeometryBuilder.prototype._reset = function() {
	    this.count = 0;
	    this.total = 0;
	    this.progress = 0;
	    return this.geometries = [];
	  };

	  return GeometryBuilder;

	})();

	Builder = (function() {
	  function Builder(geometry_class, data, size, detail, callback) {
	    this.geometry_class = geometry_class;
	    this.data = data;
	    this.size = size;
	    this.detail = detail;
	    this.callback = callback;
	    this._build = bind(this._build, this);
	    this.progress = 0;
	    this.time_total = 0;
	    this.total = this.data.length;
	    this.geometry = new THREE.Geometry();
	    this._build();
	  }

	  Builder.prototype._build = function() {
	    var i, j, len, ref, tmp_geometry, v;
	    if (this.geometry_class === "BoxGeometry") {
	      tmp_geometry = new THREE[this.geometry_class](this.size, this.size, this.size);
	    } else {
	      tmp_geometry = new THREE[this.geometry_class](this.size, this.detail);
	    }
	    ref = this.data[this.progress].vertices;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      v = ref[i];
	      tmp_geometry.vertices[i].x = v.x;
	      tmp_geometry.vertices[i].y = v.y;
	      tmp_geometry.vertices[i].z = v.z;
	    }
	    this.geometry.merge(tmp_geometry);
	    this.progress++;
	    if (this.progress === this.total) {
	      return this.callback(this.geometry);
	    } else {
	      return window.setTimeout(this._build, 10);
	    }
	  };

	  return Builder;

	})();


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var Home, Keyboard, Loader, PathLookatCurve, UI, assets, cameras, config, engine, happens, lights, settings, shaders, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	settings = __webpack_require__(10);

	cameras = __webpack_require__(16);

	engine = __webpack_require__(7);

	Loader = __webpack_require__(26);

	utils = __webpack_require__(34);

	Keyboard = __webpack_require__(35);

	lights = __webpack_require__(62);

	shaders = __webpack_require__(63);

	config = __webpack_require__(64);

	UI = __webpack_require__(65);

	assets = __webpack_require__(69);

	PathLookatCurve = __webpack_require__(48);

	module.exports = Home = (function() {
	  Home.prototype.camera_path = null;

	  Home.prototype.attributes = null;

	  Home.prototype.ready = false;

	  Home.prototype.tweens = Array;

	  Home.prototype.has_transitioned_out = false;

	  Home.prototype.is_transitioning = false;

	  Home.prototype.transition_progress = 0;

	  Home.prototype.fov_transition_progress = 0;

	  Home.prototype.dolly_transition_progress = 0;

	  function Home(scene, gui) {
	    this.scene = scene;
	    this.gui = gui;
	    this.next = bind(this.next, this);
	    this.update = bind(this.update, this);
	    this.setup = bind(this.setup, this);
	    happens(this);
	  }

	  Home.prototype.load = function() {

	    /*
	    		Preload the assets
	     */
	    var asset, j, len;
	    this.loader = new Loader;
	    for (j = 0, len = assets.length; j < len; j++) {
	      asset = assets[j];
	      this.loader.add(asset.id, asset.url, asset.type);
	    }
	    this.loader.once('loaded', this.setup);
	    return this.loader.load();
	  };

	  Home.prototype.setup = function(manifest) {

	    /*
	    		Engine
	     */
	    var a, bounds, geometry, i, j, k, l, len, light, material, mesh, opacity, percent, r, radius_max, radius_min, ref, ref1, size_max, size_min, uniforms, vector, x, y, y_bounds, y_curve, z;
	    engine.fov = config.camera_fov;

	    /*
	    		UI
	     */
	    this.ui = new UI(this.scene, this.gui, manifest);

	    /*
	    		Keyboard controls
	     */
	    this.keyboard = new Keyboard($(window));

	    /*
	    		Tweens
	     */
	    this.tweens = [];

	    /*
	    		Scene
	     */
	    if (config.fog_enabled) {
	      this.scene.fog = new THREE.FogExp2(0x000000, config.fog_in_start);
	      this.gui.add(this.scene.fog, 'density', 0, 0.001);
	    }

	    /*
	    		Helpers
	     */
	    if (settings.debug) {
	      this.scene.add(new THREE.GridHelper(50, 10));
	      this.scene.add(new THREE.AxisHelper(10));
	      this.scene.add(new THREE.CameraHelper(cameras.user));
	    }

	    /*
	    		Lights
	     */
	    for (j = 0, len = lights.length; j < len; j++) {
	      light = lights[j];
	      this.scene.add(light);
	    }

	    /*
	    		Sounds
	     */

	    /*
	    		Sounds
	     */
	    this.sounds = {
	      start: this.loader.get_asset('start').data,
	      loop: this.loader.get_asset('loop').data,
	      transition_in: this.loader.get_asset('transition_in').data,
	      transition_out: this.loader.get_asset('transition_out').data
	    };
	    this.sounds.start.play();
	    this.sounds.transition_in.play();
	    utils.delay(19, (function(_this) {
	      return function() {
	        _this.sounds.loop.volume(0);
	        _this.sounds.loop.fade(0, 1, 1000);
	        _this.sounds.loop.play();
	        return _this.sounds.loop.loop(true);
	      };
	    })(this));

	    /*
	    		Objects
	     */
	    this.container = new THREE.Object3D;
	    this.scene.add(this.container);
	    this.container.position.fromArray(config.container_position);
	    this.container.rotation.fromArray(config.container_rotation);
	    bounds = 10000;
	    if (config.add_controls) {
	      this.gui.add(this.container.rotation, 'x', 0, PI_2).name('rotation x');
	      this.gui.add(this.container.rotation, 'y', 0, PI_2).name('rotation y');
	      this.gui.add(this.container.rotation, 'z', 0, PI_2).name('rotation z');
	      this.gui.add(this.container.position, 'x', -bounds, bounds).name('position x');
	      this.gui.add(this.container.position, 'y', -bounds, bounds).name('position y');
	      this.gui.add(this.container.position, 'z', -bounds, bounds).name('position z');
	    }

	    /*
	    		Shader
	     */
	    this.attributes = {
	      size: {
	        type: 'f',
	        value: []
	      },
	      alpha: {
	        type: 'f',
	        value: []
	      }
	    };
	    uniforms = {
	      color: {
	        type: "c",
	        value: new THREE.Color(0xFFFFFF)
	      },
	      texture: {
	        type: "t",
	        value: THREE.ImageUtils.loadTexture(this.loader.get_asset('particle').src)
	      }
	    };
	    if (config.fog_enabled) {
	      uniforms.topColor = {
	        type: "c",
	        value: new THREE.Color(0x0077ff)
	      };
	      uniforms.bottomColor = {
	        type: "c",
	        value: new THREE.Color(0xffffff)
	      };
	      uniforms.offset = {
	        type: "f",
	        value: 33
	      };
	      uniforms.exponent = {
	        type: "f",
	        value: 0.6
	      };
	      uniforms.fogColor = {
	        type: "c",
	        value: this.scene.fog.color
	      };
	      uniforms.fogNear = {
	        type: "f",
	        value: this.scene.fog.near
	      };
	      uniforms.fogFar = {
	        type: "f",
	        value: this.scene.fog.far
	      };
	      uniforms.fogDensity = {
	        type: "f",
	        value: this.scene.fog.density
	      };
	    }
	    material = new THREE.ShaderMaterial({
	      uniforms: uniforms,
	      attributes: this.attributes,
	      vertexShader: shaders.vertex(),
	      fragmentShader: shaders.fragment(),
	      blending: THREE.AdditiveBlending,
	      transparent: true,
	      fog: config.fog_enabled
	    });
	    geometry = new THREE.Geometry;
	    radius_min = 350 * config.scale;
	    radius_max = 2000 * config.scale;
	    y_bounds = 10;
	    y_curve = 400 * config.scale;
	    size_min = 20;
	    size_max = 40;
	    for (i = k = 0, ref = config.partices; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
	      a = utils.random(0, PI_2);
	      r = utils.random(radius_min, radius_max);
	      x = r * Math.cos(a);
	      y = y_curve * Math.cos((r / radius_max) * Math.PI);
	      z = r * Math.sin(a);
	      geometry.vertices.push(new THREE.Vector3(x, y, z));
	      this.attributes.alpha.value[i] = utils.random(0.2, 1.0);
	      this.attributes.size.value[i] = utils.random(size_min, size_max);
	    }
	    this.mesh = new THREE.PointCloud(geometry, material);
	    this.container.add(this.mesh);

	    /*
	    		Particles tunnel
	     */
	    size_min = 40;
	    size_max = 80;
	    geometry = new THREE.Geometry;
	    radius_max = radius_min;
	    radius_min = 150 * config.scale;
	    y_curve = 1000 * config.scale;
	    for (i = l = 0, ref1 = config.tunnel_particles; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
	      a = utils.random(0, PI_2);
	      r = utils.random(radius_min, radius_max);
	      percent = Math.random();
	      x = r * Math.cos(a);
	      y = 13422 + y_curve * Math.cos((r / radius_max) * Math.PI);
	      z = r * Math.sin(a);
	      geometry.vertices.push(new THREE.Vector3(x, y, z));
	      opacity = utils.random(0.2, 1.0);
	      percent = y / y_curve;
	      if (percent > 0.5) {
	        opacity += utils.lerp(opacity, 0, 0.5 + percent);
	      }
	      this.attributes.alpha.value[i] = opacity;
	      this.attributes.size.value[i] = utils.random(size_min, size_max);
	    }
	    this.tunnel_mesh = new THREE.PointCloud(geometry, material);
	    this.container.add(this.tunnel_mesh);

	    /*
	    		Calculate the last path position
	     */
	    mesh = new THREE.Mesh(new THREE.SphereGeometry(100, 4, 4));
	    mesh.position.y = 15000;
	    mesh.visible = false;
	    this.container.add(mesh);
	    this.container.updateMatrixWorld();
	    vector = new THREE.Vector3;
	    vector.setFromMatrixPosition(mesh.matrixWorld);
	    config.path_camera_dolly.unshift(vector.toArray());
	    config.path_in.unshift({
	      x: vector.x,
	      y: vector.y,
	      z: vector.z
	    });
	    config.path_out.push({
	      x: vector.x,
	      y: vector.y,
	      z: vector.z
	    });
	    config.path_in_lookat.unshift({
	      x: vector.x,
	      y: vector.y,
	      z: vector.z
	    });

	    /*
	    		Create curve for camera
	     */
	    this.path_in = new PathLookatCurve('path_in', this.scene, config.path_in, config.path_in_lookat, 0x00FF00);
	    this.path_out = new PathLookatCurve('path_out', this.scene, config.path_out, config.path_in_lookat.reverse(), 0x00FF00);

	    /*
	    		Ready
	     */
	    this.ready = true;
	    this.emit('setup:complete');
	    return this.bind();
	  };

	  Home.prototype.bind = function() {
	    this.keyboard.bind();
	    return engine.on('update', this.update);
	  };

	  Home.prototype.unbind = function() {
	    this.keyboard.unbind();
	    return engine.off('update', this.update);
	  };


	  /*
	  	Transition in
	   */

	  Home.prototype.transition_in = function() {
	    var params, tween;
	    this.is_transitioning = true;
	    this.emit('transition:in:complete');
	    cameras.user.position.fromArray(config.path_in[0]);
	    cameras.user.lookAt(new THREE.Vector3);

	    /*
	    		UI
	     */
	    this.ui.transition_in();

	    /*
	    		Kill current tweens
	     */
	    this.kill_tweens();

	    /*
	    		Camera
	     */
	    tween = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      ease: Power2.easeOut,
	      onUpdate: (function(_this) {
	        return function() {
	          var position;
	          position = _this.path_in.spline.getPointAt(tween.progress);
	          cameras.user.position.copy(position);
	          position = _this.path_in.spline_camera.getPointAt(tween.progress);
	          return cameras.user.lookAt(position);
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          return _this.is_transitioning = false;
	        };
	      })(this)
	    };
	    if (config.transition_debug) {
	      config.camera_in_duration = 0.1;
	    }
	    this.tweens.push(TweenLite.to(tween, config.camera_in_duration, params));

	    /*
	    		Fog
	     */
	    if (config.fog_enabled) {
	      this.scene.fog.density = config.fog_in_start;
	      params = {
	        density: config.fog_in_end,
	        ease: Power2.easeOut
	      };
	      if (config.transition_debug) {
	        config.fog_in_duration = 0;
	      }
	      return this.tweens.push(TweenLite.to(this.scene.fog, config.fog_in_duration, params));
	    }
	  };


	  /*
	  	Transition in
	   */

	  Home.prototype.transition_out_forward = function(fast_transition) {
	    var params, tween;
	    if (fast_transition == null) {
	      fast_transition = false;
	    }
	    if (this.is_transitioning) {
	      this.transition_out_fast();
	      return;
	    }
	    this.is_transitioning = true;

	    /*
	    		UI
	     */
	    this.ui.transition_out();

	    /*
	    		Kill current tweens
	     */
	    this.kill_tweens();

	    /*
	    		Camera
	     */
	    tween = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      ease: Power3.easeInOut,
	      onStart: (function(_this) {
	        return function() {
	          return _this.sounds.transition_out.play();
	        };
	      })(this),
	      onUpdate: (function(_this) {
	        return function() {
	          var position;
	          position = _this.path_out.spline.getPointAt(tween.progress);
	          cameras.user.position.copy(position);
	          position = _this.path_out.spline_camera.getPointAt(tween.progress);
	          return cameras.user.lookAt(position);
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          _this.is_transitioning = false;
	          return _this.next();
	        };
	      })(this)
	    };
	    this.tweens.push(TweenLite.to(tween, config.camera_out_duration, params));

	    /*
	    		Fog
	     */
	    if (config.fog_enabled) {
	      this.scene.fog.density = config.fog_in_end;
	      params = {
	        density: config.fog_in_start,
	        ease: Power2.easeOut,
	        delay: config.camera_out_duration - 2
	      };
	      return this.tweens.push(TweenLite.to(this.scene.fog, config.fog_out_duration, params));
	    }
	  };

	  Home.prototype.update = function() {
	    var rotate;
	    if (!this.ready) {
	      return;
	    }
	    rotate = 0.001;
	    this.mesh.rotation.y += rotate;
	    return this.tunnel_mesh.rotation.y += rotate;
	  };

	  Home.prototype.transition_out_fast = function() {
	    c.log('transition_out_fast');
	    this.ui.once('transition:out:fast:complete', (function(_this) {
	      return function() {
	        _this.kill_tweens();
	        return _this.next();
	      };
	    })(this));
	    return this.ui.transition_out_fast();
	  };

	  Home.prototype.next = function() {
	    this.has_transitioned_out = true;
	    return this.emit('next');
	  };

	  Home.prototype.kill_tweens = function() {
	    var j, len, ref, results, tween;
	    ref = this.tweens;
	    results = [];
	    for (j = 0, len = ref.length; j < len; j++) {
	      tween = ref[j];
	      results.push(tween != null ? tween.kill() : void 0);
	    }
	    return results;
	  };

	  Home.prototype.enable_transition = function() {};

	  Home.prototype.disable_transition = function() {};

	  Home.prototype.destroy = function() {
	    var key, ref, sound;
	    ref = this.sounds;
	    for (key in ref) {
	      sound = ref[key];
	      sound.fade(1, 0, 1000);
	    }
	    return utils.delay(1, (function(_this) {
	      return function() {
	        var j, len, object, ref1, ref2;
	        ref1 = _this.scene.children;
	        for (j = 0, len = ref1.length; j < len; j++) {
	          object = ref1[j];
	          _this.scene.remove(object);
	        }
	        ref2 = _this.sounds;
	        for (key in ref2) {
	          sound = ref2[key];
	          sound.stop();
	          sound.unload();
	        }
	        _this.kill_tweens();
	        _this.unbind();
	        _this.ui.destroy();
	        _this.loader.dispose();
	        return _this.emit('destroyed');
	      };
	    })(this));
	  };

	  return Home;

	})();


/***/ },
/* 62 */
/***/ function(module, exports) {

	var ambient, directional;

	ambient = new THREE.AmbientLight(0xFFFFFF);

	directional = new THREE.DirectionalLight(0xFFFFFF, 0.6);

	module.exports = [ambient, directional];


/***/ },
/* 63 */
/***/ function(module, exports) {

	exports.vertex = function() {
	  var shader;
	  shader = ['attribute float alpha;', 'attribute float size;', 'varying float vAlpha;', 'void main() {', 'vAlpha = alpha;', 'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );', 'gl_PointSize = size * ( 100.0 / length( mvPosition.xyz ) );', 'gl_Position = projectionMatrix * mvPosition;', '}'];
	  return shader.join('\n');
	};

	exports.fragment = function() {
	  var shader;
	  shader = ['uniform vec3 color;', 'varying float vAlpha;', 'uniform sampler2D texture;', THREE.ShaderChunk["fog_pars_fragment"], 'void main() {', 'gl_FragColor = vec4( color, vAlpha );', 'gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );', THREE.ShaderChunk["fog_fragment"], '}'];
	  return shader.join('\n');
	};


/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = {
	  add_controls: false,
	  transition_debug: false,
	  fog_enabled: true,
	  camera_fov: 80,
	  camera_fov_out: 120,
	  camera_fov_out_duration: 10,
	  "path_in": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 0
	    }, {
	      "x": 1200,
	      "y": 2571,
	      "z": 9257.142857142859
	    }, {
	      "x": -3164.0482279868447,
	      "y": 13828.571428571428,
	      "z": 9257.142857142859
	    }, {
	      "x": -5034.709535988308,
	      "y": 20000,
	      "z": 8059.919620021923
	    }
	  ],
	  "path_out": [
	    {
	      "x": -5034.709535988308,
	      "y": 20000,
	      "z": 8059.919620021923
	    }, {
	      "x": 1200,
	      "y": 3571,
	      "z": 5000
	    }, {
	      "x": 0,
	      "y": 0,
	      "z": 0
	    }
	  ],
	  "path_in_lookat": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 0
	    }
	  ],
	  path_camera_dolly: [[0, 0, 0]],
	  camera_in_duration: 40,
	  camera_out_duration: 10,
	  fog_in_duration: 2,
	  fog_out_duration: 2,
	  ui_delay: 3,
	  fog_in_start: 0.00070,
	  fog_in_end: 0.00007,
	  scale: 10,
	  partices: 40000 * 10,
	  tunnel_particles: 30000,

	  /*
	  	Objects
	   */
	  container_position: [1500, 1050, 4400],
	  container_rotation: [4.4, 0.01, 0.28]
	};


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Sequence, SequencerModes, SequencerPlayer, Text, TextFX, UI, cameras, config, dictionary, happens, scenes, settings, share, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	cameras = __webpack_require__(16);

	utils = __webpack_require__(34);

	settings = __webpack_require__(10);

	dictionary = __webpack_require__(38);

	Text = __webpack_require__(66);

	config = __webpack_require__(64);

	scenes = __webpack_require__(39);

	TextFX = __webpack_require__(41);

	SequencerPlayer = __webpack_require__(57);

	SequencerModes = __webpack_require__(58);

	share = __webpack_require__(67);

	module.exports = UI = (function() {
	  function UI(scene, gui, assets) {
	    this.scene = scene;
	    this.gui = gui;
	    this.assets = assets;
	    this.on_social_click = bind(this.on_social_click, this);
	    this.ui = {
	      'dim': '.dim',
	      'hitarea': '.hitarea',
	      'transition_black': '.transition_black',
	      'hires': 'h1 a',
	      'preface': 'h2',
	      'paragraphs': '.paragraphs dd, .paragraphs dt',
	      'next': '.next',
	      'social': '.social',
	      'social_links': '.social a'
	    };
	    happens(this);
	    this.tweens = [];
	    this.render();
	  }

	  UI.prototype.render = function() {
	    var asset, data, id, key, ref, template;
	    data = scenes.get('epilogue');

	    /*
	    		Template
	     */
	    template = __webpack_require__(68);
	    $('main').append(template({
	      data: data

	      /*
	       		Elements
	       */
	    }));
	    this.el = $("#" + data.id);
	    ref = this.ui;
	    for (key in ref) {
	      id = ref[key];
	      this.ui[key] = this.el.find(id);
	    }
	    this.ui.letters = this.ui.paragraphs.lettering().children();
	    this.ui.next_letters = this.ui.next.lettering().children();
	    this.ui.dim.remove();

	    /*
	    		Sequence
	     */
	    asset = utils.get_asset("hires_sequence", this.assets);
	    this.ui.sequence = new Sequence(this.ui.hires, asset);
	    return this.bind();
	  };

	  UI.prototype.bind = function() {
	    return this.ui.social_links.on('click', this.on_social_click);
	  };

	  UI.prototype.unbind = function() {
	    return this.ui.social_links.off('click', this.on_social_click);
	  };

	  UI.prototype.on_social_click = function(event) {
	    var $el, sn;
	    event.preventDefault();
	    $el = $(event.currentTarget);
	    sn = $el.data('share');
	    switch (sn) {
	      case 'facebook':
	        return share.facebook(settings.share_url, dictionary.get('share_text'));
	      case 'twitter':
	        return share.twitter(settings.share_url, dictionary.get('share_text'));
	      case 'google':
	        return share.plus(settings.share_url);
	    }
	  };

	  UI.prototype.transition_in = function() {
	    var delay, params;
	    params = {
	      delay: config.ui_delay + 10,
	      autoAlpha: 1,
	      ease: Power4.easeIn
	    };
	    TweenLite.to(this.ui.preface, 1.2, params);
	    utils.delay(config.ui_delay + 14, (function(_this) {
	      return function() {
	        return _this.ui.sequence.play();
	      };
	    })(this));
	    delay = config.ui_delay + 15;
	    utils.delay(delay, (function(_this) {
	      return function() {
	        var fx;
	        fx = new TextFX;
	        return fx.animate(_this.ui.letters, 4000);
	      };
	    })(this));
	    delay = config.ui_delay + 21;
	    params = {
	      delay: delay,
	      autoAlpha: 1,
	      ease: Power2.easeIn
	    };
	    return TweenLite.to(this.ui.social, 1, params);
	  };

	  UI.prototype.transition_out = function() {
	    var params;
	    this.kill_tweens();
	    params = {
	      autoAlpha: 0,
	      ease: Power2.easeOut
	    };
	    return this.tweens.push(TweenLite.to(this.el, 1.6, params));
	  };

	  UI.prototype.transition_out_fast = function() {
	    var params;
	    this.ui.transition_black.removeClass('layer-0').addClass('layer-5');
	    params = {
	      autoAlpha: 1,
	      ease: Power2.easeOut,
	      onComplete: (function(_this) {
	        return function() {
	          return _this.emit('transition:out:fast:complete');
	        };
	      })(this)
	    };
	    return TweenLite.to(this.ui.transition_black, 1.3, params);
	  };

	  UI.prototype.kill_tweens = function() {
	    var i, len, ref, results, tween;
	    ref = this.tweens;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      tween = ref[i];
	      results.push(tween != null ? tween.kill() : void 0);
	    }
	    return results;
	  };

	  UI.prototype.destroy = function() {
	    var ref;
	    this.unbind();
	    if ((ref = this.sequence) != null) {
	      ref.destroy();
	    }
	    return this.el.remove();
	  };

	  return UI;

	})();

	Sequence = (function() {
	  function Sequence(el, asset) {
	    this.el = el;
	    this.player = new SequencerPlayer(this.el[0]);
	    this.player.on('setup_complete', (function(_this) {
	      return function() {
	        _this.mode = new SequencerModes.LinearMode(_this.player.data);
	        return _this.player.set_mode(_this.mode);
	      };
	    })(this));
	    this.player.noload(asset.data, asset.images);
	  }

	  Sequence.prototype.play = function() {
	    this.mode.once('complete', (function(_this) {
	      return function() {
	        _this.mode.frame = _this.mode.total_frames();
	        return _this.mode._update();
	      };
	    })(this));
	    return this.mode.play(5, this.mode.total_frames());
	  };

	  Sequence.prototype.destroy = function() {
	    this.mode = null;
	    return this.player.destroy();
	  };

	  return Sequence;

	})();


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var Text, utils;

	utils = __webpack_require__(34);

	module.exports = Text = (function() {
	  function Text() {}

	  Text.prototype.create = function(_settings) {
	    var geometry, j, len1, material, mesh, ref, settings, v;
	    settings = {
	      text: 'x',
	      size: 80,
	      height: 10,
	      curve_segments: 2,
	      font: 'montserrat',
	      color: 0xFFFFFF
	    };
	    utils.merge(settings, _settings);
	    geometry = new THREE.TextGeometry(settings.text, {
	      size: settings.size,
	      height: settings.height,
	      curveSegments: settings.curve_segments,
	      font: settings.font
	    });
	    geometry.computeBoundingBox();
	    ref = geometry.vertices;
	    for (j = 0, len1 = ref.length; j < len1; j++) {
	      v = ref[j];
	      v.x += -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
	    }
	    material = new THREE.MeshBasicMaterial({
	      color: settings.color,
	      transparent: true
	    });
	    mesh = new THREE.Mesh(geometry, material);
	    return mesh;
	  };

	  Text.prototype.create_multichar = function(_settings) {
	    var char, geometry, i, j, k, len, len1, material, mesh, meshes, offset_x, ref, ref1, settings, v;
	    settings = {
	      text: 'x',
	      size: 80,
	      height: 10,
	      line_height: 160,
	      curve_segments: 2,
	      font: 'montserrat',
	      color: 0xFFFFFF
	    };
	    utils.merge(settings, _settings);
	    len = settings.text.length;
	    meshes = [];
	    offset_x = ((len * settings.size) / 2) - settings.size / 2;
	    for (i = j = 0, ref = len; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      char = settings.text.charAt(i);
	      geometry = new THREE.TextGeometry(char, {
	        size: settings.size,
	        height: settings.height,
	        curveSegments: settings.curve_segments,
	        font: settings.font
	      });
	      geometry.computeBoundingBox();
	      ref1 = geometry.vertices;
	      for (k = 0, len1 = ref1.length; k < len1; k++) {
	        v = ref1[k];
	        v.x += -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
	        v.y += -0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
	      }
	      material = new THREE.MeshBasicMaterial({
	        color: settings.color,
	        transparent: true,
	        depthTest: false
	      });
	      mesh = new THREE.Mesh(geometry, material);
	      mesh.position.x = (i * settings.size) - offset_x;
	      meshes.push(mesh);
	    }
	    return meshes;
	  };

	  Text.prototype.create_multiline = function(_settings) {
	    var geom, geometry, i, j, k, len1, len2, line, lines, material, mesh, ref, settings, v;
	    settings = {
	      text: 'x',
	      size: 80,
	      height: 10,
	      line_height: 160,
	      curve_segments: 2,
	      font: 'montserrat',
	      color: 0xFFFFFF
	    };
	    utils.merge(settings, _settings);
	    lines = settings.text.split("\\n");
	    geometry = new THREE.Geometry;
	    for (i = j = 0, len1 = lines.length; j < len1; i = ++j) {
	      line = lines[i];
	      geom = new THREE.TextGeometry(line, {
	        size: settings.size,
	        height: settings.height,
	        curveSegments: settings.curve_segments,
	        font: settings.font
	      });
	      geom.computeBoundingBox();
	      ref = geom.vertices;
	      for (k = 0, len2 = ref.length; k < len2; k++) {
	        v = ref[k];
	        v.x += -0.5 * (geom.boundingBox.max.x - geom.boundingBox.min.x);
	        v.y -= i * settings.line_height;
	      }
	      geometry.merge(geom);
	    }
	    material = new THREE.MeshBasicMaterial({
	      color: settings.color,
	      transparent: true
	    });
	    mesh = new THREE.Mesh(geometry, material);
	    return mesh;
	  };

	  return Text;

	})();


/***/ },
/* 67 */
/***/ function(module, exports) {

	var Share,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Share = (function() {
	  function Share() {
	    this.weibo = bind(this.weibo, this);
	    this.renren = bind(this.renren, this);
	    this.twitter = bind(this.twitter, this);
	    this.facebook = bind(this.facebook, this);
	    this.tumblr = bind(this.tumblr, this);
	    this.pinterest = bind(this.pinterest, this);
	    this.plus = bind(this.plus, this);
	    this.open_window = bind(this.open_window, this);
	    this.url = window.location.href;
	  }

	  Share.prototype.open_window = function(url, w, h) {
	    var left, top;
	    left = (screen.availWidth - w) >> 1;
	    top = (screen.availHeight - h) >> 1;
	    window.open(url, '', "top=" + top + ",left=" + left + ",width=" + w + ",height=" + h + ",location=no,menubar=no");
	    return false;
	  };

	  Share.prototype.plus = function(url) {
	    url = encodeURIComponent(url || this.url);
	    this.open_window("https://plus.google.com/share?url=" + url, 650, 385);
	    return false;
	  };

	  Share.prototype.pinterest = function(url, media, descr) {
	    url = encodeURIComponent(url || this.url);
	    media = encodeURIComponent(media);
	    descr = encodeURIComponent(descr);
	    this.open_window("http://www.pinterest.com/pin/create/button/?url=" + url + "&media=" + media + "&description=" + descr, 735, 310);
	    return false;
	  };

	  Share.prototype.tumblr = function(url, media, descr) {
	    url = encodeURIComponent(url || this.url);
	    media = encodeURIComponent(media);
	    descr = encodeURIComponent(descr);
	    this.open_window("http://www.tumblr.com/share/photo?source=" + media + "&caption=" + descr + "&click_thru=" + url, 450, 430);
	    return false;
	  };

	  Share.prototype.facebook = function(url, copy) {
	    var decsr;
	    if (copy == null) {
	      copy = '';
	    }
	    url = encodeURIComponent(url || this.url);
	    decsr = encodeURIComponent(copy);
	    this.open_window("http://www.facebook.com/share.php?u=" + url + "&t=" + decsr, 600, 300);
	    return false;
	  };

	  Share.prototype.twitter = function(url, copy) {
	    var descr;
	    if (copy == null) {
	      copy = '';
	    }
	    url = encodeURIComponent(url || this.url);
	    if (copy === '') {
	      copy = 'Generic share text here!';
	    }
	    descr = encodeURIComponent(copy);
	    this.open_window("http://twitter.com/intent/tweet/?text=" + descr + "&url=" + url, 600, 300);
	    return false;
	  };

	  Share.prototype.renren = function(url) {
	    url = encodeURIComponent(url || this.url);
	    this.open_window("http://share.renren.com/share/buttonshare.do?link=" + url, 600, 300);
	    return false;
	  };

	  Share.prototype.weibo = function(url) {
	    url = encodeURIComponent(url || this.url);
	    this.open_window("http://service.weibo.com/share/share.php?url=" + url + "&language=zh_cn", 600, 300);
	    return false;
	  };

	  return Share;

	})();

	module.exports = new Share;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(43);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (undefined) {
	buf.push("<div" + (jade.attr("id", "" + (locals.data.id) + "", true, false)) + " class=\"section scene layer layer_0\"><div class=\"transition_black layer layer-0\"></div><div class=\"ui\"><div class=\"dim layer layer-0\"></div><div class=\"content\"><div class=\"hitarea layer layer-0\"></div><h2 class=\"layer layer-1 font-garamond bold\">EPILOGUE</h2><h1 class=\"hi_res layer layer-1\"><a href=\"http://hi-res.net\" title=\"Hi-ReS!\" target=\"_blank\"></a></h1><div class=\"paragraphs layer\"><dl>");
	// iterate locals.data.paragraphs
	;(function(){
	  var $$obj = locals.data.paragraphs;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var paragraph = $$obj[$index];

	buf.push("" + (((jade_interp = paragraph) == null ? '' : jade_interp)) + "<br/>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var paragraph = $$obj[$index];

	buf.push("" + (((jade_interp = paragraph) == null ? '' : jade_interp)) + "<br/>");
	    }

	  }
	}).call(this);

	buf.push("</dl></div><ul class=\"social layer\"><li><a href=\"#\" data-share=\"facebook\" class=\"facebook\"></a></li><li><a href=\"#\" data-share=\"twitter\" class=\"twitter\"></a></li><li><a href=\"#\" data-share=\"google\" class=\"googleplus\"></a></li></ul></div></div></div>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var asset, assets, i, len, settings;

	settings = __webpack_require__(10);

	assets = [
	  {
	    id: 'particle',
	    url: '/img/home/particle.jpg',
	    type: 'image'
	  }, {
	    id: 'hires_logo',
	    url: '/img/home/hires.png',
	    type: 'image'
	  }, {
	    id: 'hires_sequence',
	    url: '/img/epilogue/hires.frames.json',
	    type: 'sequence'
	  }, {
	    id: 'start',
	    url: '/sound/home/start.mp3',
	    type: 'sound'
	  }, {
	    id: 'loop',
	    url: '/sound/home/loop.mp3',
	    type: 'sound'
	  }, {
	    id: 'transition_in',
	    url: '/sound/epilogue/transition_in.mp3',
	    type: 'sound'
	  }, {
	    id: 'transition_out',
	    url: '/sound/epilogue/transition_out.mp3',
	    type: 'sound'
	  }
	];

	for (i = 0, len = assets.length; i < len; i++) {
	  asset = assets[i];
	  asset.url = settings.base_path + asset.url;
	}

	module.exports = assets;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var Experiment, Hires, Loader, Mouse, PathLookatCurve, PathLookatFixed, UI, assets, cameras, config, engine, happens, lights, settings, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	happens = __webpack_require__(8);

	settings = __webpack_require__(10);

	cameras = __webpack_require__(16);

	engine = __webpack_require__(7);

	Loader = __webpack_require__(26);

	Mouse = __webpack_require__(33);

	utils = __webpack_require__(34);

	Experiment = __webpack_require__(36);

	lights = __webpack_require__(71);

	config = __webpack_require__(72);

	UI = __webpack_require__(37);

	assets = __webpack_require__(73);

	PathLookatFixed = __webpack_require__(47);

	PathLookatCurve = __webpack_require__(48);

	module.exports = Hires = (function(superClass) {
	  extend(Hires, superClass);

	  function Hires() {
	    this.update = bind(this.update, this);
	    this.on_mouse_down = bind(this.on_mouse_down, this);
	    this.setup = bind(this.setup, this);
	    return Hires.__super__.constructor.apply(this, arguments);
	  }

	  Hires.prototype.material = null;

	  Hires.prototype.holding_frames = 0;

	  Hires.prototype.setup = function(manifest) {

	    /*
	    		Engine
	     */
	    var Sound, asset, geometry, j, k, l, len1, len2, len3, light, params, ref, ref1, ref2, shader, urls, v;
	    engine.fov = config.camera_fov;

	    /*
	    		UI
	     */
	    this.ui = new UI('hires', this.scene, this.gui);

	    /*
	    		Scene
	     */
	    if (config.fog_enabled) {
	      this.scene.fog = new THREE.FogExp2(0x000000, config.fog_in_start);
	      this.gui.add(this.scene.fog, 'density', 0, 1);
	    }

	    /*
	    		Helpers
	     */
	    if (settings.debug) {
	      this.scene.add(new THREE.GridHelper(50, 10));
	      this.scene.add(new THREE.AxisHelper(10));
	      this.scene.add(new THREE.CameraHelper(cameras.user));
	    }

	    /*
	    		Lights
	     */
	    ref = lights.all;
	    for (j = 0, len1 = ref.length; j < len1; j++) {
	      light = ref[j];
	      this.scene.add(light);
	    }

	    /*
	    		Create curve for camera
	     */
	    this.path_in = new PathLookatFixed('path_in', this.scene, config.path_in, config.path_in_lookat, 0x00FF00);
	    this.path_out = new PathLookatCurve('path_out', this.scene, config.path_out, config.path_out_lookat, 0x00FF00, this.gui, 100);

	    /*
	    		Mouse
	     */
	    this.mouse = new Mouse($('.hitarea'));

	    /*
	    		GUI
	     */
	    this.gui.addColor(config, 'color_left').name('Left color');
	    this.gui.addColor(config, 'color_right').name('Right color');
	    this.gui.addColor(config, 'color_directional').name('Directional color');
	    this.gui.add(config, 'speed', 0, 2).name("Movement speed");
	    this.gui.add(config, 'camera_fov', 10, 200).listen().name("Field of vision");
	    this.gui.add(config, 'line_thickness', 1, 8).name("Line thickness");

	    /*
	    		Sound
	     */
	    Sound = __webpack_require__(74);
	    this.sound = new Sound;
	    setTimeout((function(_this) {
	      return function() {
	        _this.sound.klank();
	        _this.sound.percolation();
	        _this.sound.clickable_distortion();
	        return _this.sound.background_atmos(15);
	      };
	    })(this), 1000);

	    /*
	    		Objects
	     */
	    this.container = new THREE.Object3D;
	    this.scene.add(this.container);
	    urls = [];
	    for (k = 0, len2 = manifest.length; k < len2; k++) {
	      asset = manifest[k];
	      if ((ref1 = asset.id) === 'pos-x' || ref1 === 'neg-x' || ref1 === 'pos-y' || ref1 === 'neg-y' || ref1 === 'pos-z' || ref1 === 'neg-z') {
	        urls.push(asset.src);
	      }
	    }
	    this.cubemap = THREE.ImageUtils.loadTextureCube(urls);
	    this.cubemap.format = THREE.RGBFormat;
	    shader = THREE.ShaderLib["cube"];
	    shader.uniforms["tCube"].texture = this.cubemap;
	    this.material = new THREE.ShaderMaterial({
	      fragmentShader: shader.fragmentShader,
	      vertexShader: shader.vertexShader,
	      uniforms: shader.uniforms,
	      depthWrite: false,
	      side: THREE.BackSide
	    });
	    geometry = this.loader.get_asset('hires_logo').data;
	    ref2 = geometry.vertices;
	    for (l = 0, len3 = ref2.length; l < len3; l++) {
	      v = ref2[l];
	      v.multiplyScalar(10);
	    }
	    geometry.__dirtyVertices = true;
	    params = {
	      shading: THREE.FlatShading,
	      color: 0xFFFFFF
	    };
	    this.mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(params));
	    this.mesh.position.x = 20;
	    this.scene.add(this.mesh);
	    this.add_triangles();
	    this.bind();
	    return this.emit('setup:complete');
	  };

	  Hires.prototype.add_triangles = function() {
	    var TWO_PI, Triangle, buffer_geom, face, geom, i, index, j, k, l, len, len1, len2, lines, material, max_size, min_size, params, pos, random_vertex, ref, ref1, ref2, size, triangles, v, v1, v2, v3;
	    len = this.mesh.geometry.vertices.length;
	    random_vertex = function(len) {
	      return Math.floor(Math.random() * len);
	    };
	    lines = [];
	    TWO_PI = Math.PI * 2;
	    Triangle = function(size) {
	      var position, tri, v1, v2, v3;
	      position = new THREE.Vector3();
	      v1 = position.clone();
	      v1.x += size * Math.cos(Math.random() * TWO_PI);
	      v1.y += size * Math.sin(Math.random() * TWO_PI);
	      v1.z += size * Math.sin(Math.random() * TWO_PI);
	      v2 = position.clone();
	      v2.x += size * Math.cos(Math.random() * TWO_PI);
	      v2.y += size * Math.sin(Math.random() * TWO_PI);
	      v2.z += size * Math.sin(Math.random() * TWO_PI);
	      v3 = position.clone();
	      v3.x += size * Math.cos(Math.random() * TWO_PI);
	      v3.y += size * Math.sin(Math.random() * TWO_PI);
	      v3.z += size * Math.sin(Math.random() * TWO_PI);
	      tri = new THREE.Geometry();
	      tri.vertices.push(v1);
	      tri.vertices.push(v2);
	      tri.vertices.push(v3);
	      tri.faces.push(new THREE.Face3(0, 1, 2));
	      tri.computeFaceNormals();
	      return tri;
	    };
	    min_size = 1;
	    max_size = 50;
	    triangles = [];
	    buffer_geom = new THREE.Geometry();
	    len = 1000;
	    for (i = j = 0, ref = len; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      pos = this.mesh.geometry.vertices[random_vertex(len)];
	      size = min_size + Math.random() * (max_size - min_size);
	      geom = Triangle(size);
	      ref1 = geom.vertices;
	      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
	        v = ref1[i];
	        geom.vertices[i].x += pos.x;
	        geom.vertices[i].y += pos.y;
	        geom.vertices[i].z += pos.z;
	      }
	      buffer_geom.merge(geom);
	    }
	    params = {
	      envMap: this.cubemap,
	      shading: THREE.FlatShading,
	      wireframe: true,
	      wireframeLinewidth: config.line_thickness
	    };
	    material = new THREE.MeshLambertMaterial(params);
	    this.triangles_mesh = new THREE.Mesh(buffer_geom, material);
	    this.scene.add(this.triangles_mesh);
	    ref2 = this.triangles_mesh.geometry.faces;
	    for (index = l = 0, len2 = ref2.length; l < len2; index = ++l) {
	      face = ref2[index];
	      v1 = this.triangles_mesh.geometry.vertices[face.a];
	      v2 = this.triangles_mesh.geometry.vertices[face.b];
	      v3 = this.triangles_mesh.geometry.vertices[face.c];
	      v1.pos = new THREE.Vector3(v1.x, v1.y, v1.z);
	      v2.pos = new THREE.Vector3(v2.x, v2.y, v2.z);
	      v3.pos = new THREE.Vector3(v3.x, v3.y, v3.z);
	    }
	    return this.ready = true;
	  };

	  Hires.prototype.bind = function() {
	    Hires.__super__.bind.call(this);
	    this.mouse.on('down', this.on_mouse_down);
	    this.ui.bind();
	    return this.mouse.bind();
	  };

	  Hires.prototype.unbind = function() {
	    Hires.__super__.unbind.call(this);
	    this.mouse.off('down', this.on_mouse_down);
	    this.ui.unbind();
	    return this.mouse.unbind();
	  };


	  /*
	  	Transition in
	   */

	  Hires.prototype.transition_in = function() {
	    var params, position, tween, tween_ui;
	    this.emit('transition:in:complete');
	    this.is_transitioning = true;

	    /*
	    		UI
	     */
	    position = this.config.path_in[0];
	    cameras.user.position.set(position.x, position.y, position.z);
	    cameras.user.lookAt(new THREE.Vector3(position.x, position.y, position.z));
	    cameras.user.rotation.z = Math.PI;
	    this.ui.transition_in();

	    /*
	    		Camera
	     */
	    tween = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      ease: Power1.easeInOut,
	      onStart: function() {},
	      onUpdate: (function(_this) {
	        return function() {
	          position = _this.path_in.spline.getPointAt(tween.progress);
	          return cameras.user.position.copy(position);
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          return _this.is_transitioning = false;
	        };
	      })(this)
	    };
	    if (this.config.transition_debug) {
	      this.config.camera_in_duration = 0;
	    }
	    TweenLite.to(tween, this.config.camera_in_duration, params);

	    /*
	    		UI
	     */
	    tween_ui = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      onComplete: (function(_this) {
	        return function() {
	          return _this.ui.transition_out();
	        };
	      })(this)
	    };
	    this.ui_tween = TweenLite.to(tween_ui, this.config.camera_in_duration, params);

	    /*
	    		Camera rotation
	     */
	    params = {
	      z: Math.PI * 2
	    };
	    if (this.config.transition_debug) {
	      this.config.camera_rotation_in = 0;
	    }
	    TweenLite.to(cameras.user.rotation, this.config.camera_rotation_in, params);

	    /*
	    		Fog
	     */
	    if (this.config.fog_enabled) {
	      this.scene.fog.density = this.config.fog_in_start;
	      params = {
	        density: this.config.fog_in_end,
	        ease: Power2.easeOut
	      };
	      if (this.config.transition_debug) {
	        this.config.fog_in_duration = 0;
	      }
	      TweenLite.to(this.scene.fog, this.config.fog_in_duration, params);
	    }

	    /*
	    		Fov
	     */
	    engine.fov = 150;
	    params = {
	      fov: config.camera_fov,
	      ease: Power3.easeOut
	    };
	    if (this.config.transition_debug) {
	      this.config.fov_in_duration = 0;
	    }
	    return TweenLite.to(engine, this.config.fov_in_duration, params);
	  };

	  Hires.prototype.on_mouse_down = function() {
	    return this.force_transition_in_complete();
	  };

	  Hires.prototype.update = function() {
	    var delta_x, delta_y, distance, face, index, j, len1, mouse_pos_x, mouse_pos_y, r, ref, rotation_x, rotation_y, v1, v2, v3;
	    if (!this.ready) {
	      return;
	    }
	    mouse_pos_x = this.mouse.normal_center_x;
	    mouse_pos_y = this.mouse.normal_center_y;
	    rotation_x = (Math.PI * 0.3) * -mouse_pos_y;
	    rotation_y = (Math.PI * 0.3) * -mouse_pos_x;
	    r = this.triangles_mesh.rotation;
	    delta_x = rotation_x - r.x;
	    delta_y = rotation_y - r.y;
	    distance = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
	    this.triangles_mesh.rotation.x += delta_x * config.speed;
	    this.triangles_mesh.rotation.y += delta_y * config.speed;
	    this.mesh.rotation.x = this.triangles_mesh.rotation.x;
	    this.mesh.rotation.y = this.triangles_mesh.rotation.y;
	    this.normalize(this.triangles_mesh);
	    this.normalize(this.mesh);
	    if (this.mouse.is_down && !this.is_transitioning_out) {
	      this.holding_frames += 0.5;
	    } else {
	      this.holding_frames -= 2;
	    }
	    this.holding_frames = Math.max(this.holding_frames, 0);
	    this.holding_frames = Math.min(this.holding_frames, 60);
	    this.noise = (this.holding_frames / 10) || 0.05;
	    ref = this.triangles_mesh.geometry.faces;
	    for (index = j = 0, len1 = ref.length; j < len1; index = ++j) {
	      face = ref[index];
	      v1 = this.triangles_mesh.geometry.vertices[face.a];
	      v2 = this.triangles_mesh.geometry.vertices[face.b];
	      v3 = this.triangles_mesh.geometry.vertices[face.c];
	      v1.x = v1.pos.x + (-this.noise + Math.random() * (this.noise * 2));
	      v1.y = v1.pos.y + (-this.noise + Math.random() * (this.noise * 2));
	      v1.z = v1.pos.z + (-this.noise + Math.random() * (this.noise * 2));
	      v2.x = v2.pos.x + (-this.noise + Math.random() * (this.noise * 2));
	      v2.y = v2.pos.y + (-this.noise + Math.random() * (this.noise * 2));
	      v2.z = v2.pos.z + (-this.noise + Math.random() * (this.noise * 2));
	      v3.x = v3.pos.x + (-this.noise + Math.random() * (this.noise * 2));
	      v3.y = v3.pos.y + (-this.noise + Math.random() * (this.noise * 2));
	      v3.z = v3.pos.z + (-this.noise + Math.random() * (this.noise * 2));
	    }
	    this.triangles_mesh.geometry.verticesNeedUpdate = true;
	    lights.point1.intensity = (Math.abs(mouse_pos_x * 2)) * 0.5;
	    lights.point2.intensity = Math.max(0, mouse_pos_y);
	    lights.point1.color.setHex(String(config.color_left).replace('#', '0x'));
	    lights.point2.color.setHex(String(config.color_right).replace('#', '0x'));
	    lights.directional.color.setHex(String(config.color_directional).replace('#', '0x'));
	    return this.triangles_mesh.material.wireframeLinewidth = config.line_thickness;
	  };

	  Hires.prototype.normalize = function(el) {
	    el.rotation.x = Math.min(0.5, Math.max(-0.5, el.rotation.x));
	    return el.rotation.y = Math.min(0.5, Math.max(-0.5, el.rotation.y));
	  };

	  Hires.prototype.destroy = function() {
	    Hires.__super__.destroy.call(this);
	    return this.sound.stop();
	  };

	  return Hires;

	})(Experiment);


/***/ },
/* 71 */
/***/ function(module, exports) {

	var ambient, directional, point1, point2;

	ambient = new THREE.AmbientLight(0x414141);

	directional = new THREE.DirectionalLight(0xFFFFFF, 1);

	directional.position.x = 100;

	directional.position.y = 100;

	directional.position.z = 100;

	directional.shadowCameraNear = 25;

	directional.castShadow = true;

	point1 = new THREE.PointLight(0xFFFFFF, 1, 1000);

	point1.position.set(50, 50, 50);

	point2 = new THREE.PointLight(0xFFFFFF, 1, 1000);

	point2.position.set(-50, 50, 50);

	point1.intensity = 0.1;

	point2.intensity = 0.1;

	exports.directional = directional;

	exports.point1 = point1;

	exports.point2 = point2;

	exports.all = [ambient, directional, point1, point2];


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var settings;

	settings = __webpack_require__(10);

	module.exports = {
	  fog_enabled: true,
	  transition_debug: false,
	  camera_fov: 66,
	  "path_in": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": -34
	    }, {
	      "x": 0,
	      "y": 0,
	      "z": 142
	    }
	  ],
	  "path_in_lookat": {
	    "x": 0,
	    "y": 0,
	    "z": 0
	  },
	  "path_out": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 142
	    }, {
	      "x": 0,
	      "y": -16,
	      "z": 47
	    }, {
	      "x": 0,
	      "y": -16,
	      "z": -53
	    }
	  ],
	  "path_out_lookat": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": -70
	    }, {
	      "x": 0,
	      "y": -37,
	      "z": -70
	    }
	  ],
	  camera_in_duration: 22.5,
	  camera_out_duration: 4,
	  camera_rotation_in: 21,
	  fog_in_duration: 5,
	  fog_out_duration: 7,
	  fog_in_start: 0.1,
	  fog_in_end: 0.001,
	  fog_out_start: 0.001,
	  fog_out_end: 0.01,
	  audio_pos_z_in: 1,
	  audio_pos_z_out: 1,
	  fov_in_duration: 21,
	  color_left: '#FFFFFF',
	  color_right: '#0bfdfd',
	  color_directional: '#FFFFFF',
	  speed: 0.008,
	  line_thickness: 2
	};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var asset, assets, i, len, settings;

	settings = __webpack_require__(10);

	assets = [
	  {
	    id: 'pos-x',
	    url: '/img/hires/pos-x.jpg',
	    type: 'image'
	  }, {
	    id: 'neg-x',
	    url: '/img/hires/neg-x.jpg',
	    type: 'image'
	  }, {
	    id: 'pos-y',
	    url: '/img/hires/pos-y.jpg',
	    type: 'image'
	  }, {
	    id: 'neg-y',
	    url: '/img/hires/neg-y.jpg',
	    type: 'image'
	  }, {
	    id: 'pos-z',
	    url: '/img/hires/pos-z.jpg',
	    type: 'image'
	  }, {
	    id: 'neg-z',
	    url: '/img/hires/neg-z.jpg',
	    type: 'image'
	  }, {
	    id: 'hires_logo',
	    url: '/js/hires/hires_logo.js',
	    type: 'geometry'
	  }
	];

	for (i = 0, len = assets.length; i < len; i++) {
	  asset = assets[i];
	  asset.url = settings.base_path + asset.url;
	}

	module.exports = assets;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var Sound, happens,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	module.exports = Sound = (function() {
	  Sound.prototype.playing = true;

	  Sound.prototype.rec = null;

	  function Sound(app) {
	    this.app = app;
	    this.start = bind(this.start, this);
	    this.play = bind(this.play, this);
	    this.stop = bind(this.stop, this);
	    happens(this);
	    window.sound = this;
	    c.log('x');
	    this.cc = window.cc = new CoffeeCollider;
	    setTimeout(this.start, 750);
	  }

	  Sound.prototype.tape = function() {};

	  Sound.prototype.stop = function() {
	    cc.reset();
	    return this.playing = false;
	  };

	  Sound.prototype.play = function() {
	    return console.warn("asd");
	  };

	  Sound.prototype.start = function() {
	    this.emit('started');
	    return this.cc.on("sin", function() {
	      return console.dir(arguments[0]);
	    });
	  };

	  Sound.prototype.background_atmos = function(fade_in_time) {
	    return cc.run("(->\n\n	noise = PinkNoise.ar(0.2)\n\n	noise = Mix Array.fill 10, (i)->\n		Resonz.ar(noise, i * 55 + 220, 0.05)\n\n	noise = (noise * 0.2 + noise * Decay.kr(Dust.kr(0.5), 10))\n\n	noise = RHPF.ar( noise, LFNoise0.kr(0.5).range(220, 55), rq:0.001)\n\n	CombL.ar(noise, delaytime:1, decaytime:25).dup() * Line.kr( 0, 0.4, dur: " + fade_in_time + ")\n\n).play()", true);
	  };

	  Sound.prototype.clickable_distortion = function() {
	    return cc.run("(->\n	freq = MouseY.kr(55 / 2, 55, 'exponential')\n	freq1 = freq * MouseX.kr(2, 0.5, lag:2.5)\n	freq2 = freq * MouseX.kr(0.5, 2, lag:2.5)\n	feedback = MouseButton.kr(0, 0.5.pi(), lag:5)\n	SinOscFB.ar([freq1, freq2], feedback, mul:0.25)\n).play()", true);
	  };

	  Sound.prototype.bass_sequence = function() {
	    return cc.run("\nsynth = SynthDef (freq)->\n\n	s = SinOscFB.ar( freq ) * Line.kr(1, 0, dur:0.5, doneAction:2)\n	s = s.dup()\n	Out.ar(0, s) * 0.5\n\n.add()\n\np = Pseq( [ 55,0,0,0 ], Infinity )\n\nTask ->\n	0.wait()\n	p.do syncblock (freq)->\n		# freq = (60 - 24 + i).midicps()\n\n		Synth(synth, freq:freq)\n\n		[0.5].choose().wait()\n.start()\n\np = Pseq( [ 55,0,0,0,55*1.25 ], Infinity )\n\nTask ->\n	0.2.wait()\n	p.do syncblock (freq)->\n		# freq = (60 - 24 + i).midicps()\n\n		Synth(synth, freq:freq)\n\n		[0.5].choose().wait()\n.start()\n", true);
	  };

	  Sound.prototype.percolation = function(d, c, a) {
	    if (d == null) {
	      d = 60;
	    }
	    if (c == null) {
	      c = 7;
	    }
	    if (a == null) {
	      a = 40;
	    }
	    return cc.run("d = " + d + " # number of percolators\nc = " + c + " # number of comb delays\na = " + a + " # number of allpass delays\n(->\n	# sine percolation sound :\n	s = Mix.ar Array.fill d, ->\n		Resonz.ar(Dust.ar(2 / d, 50), 200 + 30000.rand(), 0.003)\n\n	# reverb predelay time :\n	z = DelayN.ar(s, 0.000498)\n\n	# 7 length modulated comb delays in parallel :\n	y = Mix.ar CombL.ar(z, 0.1, LFNoise1.kr(Array.fill(c, (->1.rand())), 0.04, 0.05), 15)\n\n	# chain of 4 allpass delays on each of two channels (8 total) :\n	a.do ->\n		y = AllpassN.ar(y, 0.050, [0.050.rand(), 0.050.rand()], 1)\n\n	# add original sound to reverb and play it :\n	s + 0.2 * y\n).play()", true);
	  };

	  Sound.prototype.klank = function(n, p) {
	    return cc.run("(->\n	n = 5  # number of simultaneous instruments\n	p = 15 # number of partials per instrument\n\n	# filter bank specification :\n	z = $([\n		Array.fill(p, (-> 80 + 10000.linrand() )) # frequencies\n		Array.fill(p, (-> 1.rand2() ))            # amplitudes\n		Array.fill(p, (-> 0.2 + 8.rand() ))       # ring times\n	])\n\n	p = Pan2.ar(Klank.ar(z, Dust.ar(0.07, 0.25)), SinOsc(1))\n\n	40.do ->\n		p = AllpassN.ar(p, 0.050, [0.050.rand(), 0.050.rand()], 1)\n\n	p\n).play()\n", true);
	  };

	  Sound.prototype.glass = function() {
	    return cc.run("d = 60 # number of percolators\nc = 7 # number of comb delays\na = 40 # number of allpass delays\n\nd = 1 # number of percolators\nc = 1 # number of comb delays\na = 1 # number of allpass delays\n\n(->\n	# sine percolation sound :\n	s = Mix.ar Array.fill d, ->\n		Resonz.ar( Dust.ar(2 + d.rand(), 50), 200 + 30000.rand(), 0.003 )\n\n	# reverb predelay time :\n	z = DelayN.ar(s, 0.000498)\n\n	# 7 length modulated comb delays in parallel :\n	y = Mix.ar CombL.ar(z, 0.1, LFNoise1.kr(Array.fill(c, (->1.rand())), 0.04, 0.05), 15)\n\n	# chain of 4 allpass delays on each of two channels (8 total) :\n	a.do ->\n		y = AllpassN.ar(y, 0.050, [0.050.rand(), 0.050.rand()], 1)\n\n	# add original sound to reverb and play it :\n	s + 0.2 * y\n).play()", true);
	  };

	  Sound.prototype.listen_messages = function() {
	    return cc.run("\nMessage.on \"noise\", (value)->\n	console.log \"noise is\" + value.data\n", true);
	  };

	  Sound.prototype.send_messages = function() {
	    return cc.run("\nfreq = MouseY.kr( 10, 100, 'linear' )\n\np = Pseq( [ 10, 20, 30 ], 1 )\n\nTask ->\n	p.do syncblock ( value )->\n\n		# console.log freq\n\n		Message.send \"sin\", ( value * freq  ).exprange( 0, 1)\n\n		0.5.wait()\n.start()\n", true);
	  };

	  return Sound;

	})();


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var Home, Keyboard, Loader, UI, assets, cameras, config, engine, happens, lights, settings, shaders, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	settings = __webpack_require__(10);

	cameras = __webpack_require__(16);

	engine = __webpack_require__(7);

	Loader = __webpack_require__(26);

	utils = __webpack_require__(34);

	Keyboard = __webpack_require__(35);

	lights = __webpack_require__(62);

	shaders = __webpack_require__(63);

	config = __webpack_require__(76);

	UI = __webpack_require__(77);

	assets = __webpack_require__(79);

	module.exports = Home = (function() {
	  Home.prototype.camera_path = null;

	  Home.prototype.attributes = null;

	  Home.prototype.ready = false;

	  Home.prototype.tweens = Array;

	  Home.prototype.has_transitioned_out = false;

	  Home.prototype.is_transitioning = false;

	  Home.prototype.transition_progress = 0;

	  Home.prototype.fov_transition_progress = 0;

	  Home.prototype.dolly_transition_progress = 0;

	  function Home(scene, gui) {
	    this.scene = scene;
	    this.gui = gui;
	    this.next = bind(this.next, this);
	    this.update = bind(this.update, this);
	    this.transition_out_forward = bind(this.transition_out_forward, this);
	    this.transition_out_backward = bind(this.transition_out_backward, this);
	    this.setup = bind(this.setup, this);
	    happens(this);
	  }

	  Home.prototype.load = function() {

	    /*
	    		Preload the assets
	     */
	    var asset, j, len;
	    this.loader = new Loader;
	    for (j = 0, len = assets.length; j < len; j++) {
	      asset = assets[j];
	      this.loader.add(asset.id, asset.url, asset.type);
	    }
	    this.loader.once('loaded', this.setup);
	    return this.loader.load();
	  };

	  Home.prototype.setup = function() {

	    /*
	    		Engine
	     */
	    var a, bounds, geometry, i, j, k, l, len, light, material, mesh, opacity, percent, r, radius_max, radius_min, ref, ref1, size_max, size_min, uniforms, vector, x, y, y_bounds, y_curve, z;
	    engine.fov = config.camera_fov;

	    /*
	    		UI
	     */
	    this.ui = new UI(this.scene, this.gui, {
	      hires_logo: this.loader.get_asset('hires_logo')
	    });

	    /*
	    		Keyboard controls
	     */
	    this.keyboard = new Keyboard($(window));

	    /*
	    		Tweens
	     */
	    this.tweens = [];

	    /*
	    		Scene
	     */
	    if (config.fog_enabled) {
	      this.scene.fog = new THREE.FogExp2(0x000000, config.fog_in_start);
	      this.gui.add(this.scene.fog, 'density', 0, 0.001);
	    }

	    /*
	    		Helpers
	     */
	    if (settings.debug) {
	      this.scene.add(new THREE.GridHelper(50, 10));
	      this.scene.add(new THREE.AxisHelper(10));
	      this.scene.add(new THREE.CameraHelper(cameras.user));
	    }

	    /*
	    		Lights
	     */
	    for (j = 0, len = lights.length; j < len; j++) {
	      light = lights[j];
	      this.scene.add(light);
	    }

	    /*
	    		Sounds
	     */
	    this.sounds = {
	      start: this.loader.get_asset('start').data,
	      loop: this.loader.get_asset('loop').data,
	      transition: this.loader.get_asset('transition').data
	    };
	    this.sounds.start.play();
	    utils.delay(37, (function(_this) {
	      return function() {
	        _this.sounds.loop.volume(0);
	        _this.sounds.loop.fade(0, 1, 1000);
	        _this.sounds.loop.play();
	        return _this.sounds.loop.loop(true);
	      };
	    })(this));

	    /*
	    		Objects
	     */
	    this.container = new THREE.Object3D;
	    this.scene.add(this.container);
	    this.container.position.fromArray(config.container_position);
	    this.container.rotation.fromArray(config.container_rotation);
	    bounds = 10000;
	    if (config.add_controls) {
	      this.gui.add(this.container.rotation, 'x', 0, PI_2).name('rotation x');
	      this.gui.add(this.container.rotation, 'y', 0, PI_2).name('rotation y');
	      this.gui.add(this.container.rotation, 'z', 0, PI_2).name('rotation z');
	      this.gui.add(this.container.position, 'x', -bounds, bounds).name('position x');
	      this.gui.add(this.container.position, 'y', -bounds, bounds).name('position y');
	      this.gui.add(this.container.position, 'z', -bounds, bounds).name('position z');
	    }

	    /*
	    		Shader
	     */
	    this.attributes = {
	      size: {
	        type: 'f',
	        value: []
	      },
	      alpha: {
	        type: 'f',
	        value: []
	      }
	    };
	    uniforms = {
	      color: {
	        type: "c",
	        value: new THREE.Color(0xFFFFFF)
	      },
	      texture: {
	        type: "t",
	        value: THREE.ImageUtils.loadTexture(this.loader.get_asset('particle').src)
	      }
	    };
	    if (config.fog_enabled) {
	      uniforms.topColor = {
	        type: "c",
	        value: new THREE.Color(0x0077ff)
	      };
	      uniforms.bottomColor = {
	        type: "c",
	        value: new THREE.Color(0xffffff)
	      };
	      uniforms.offset = {
	        type: "f",
	        value: 33
	      };
	      uniforms.exponent = {
	        type: "f",
	        value: 0.6
	      };
	      uniforms.fogColor = {
	        type: "c",
	        value: this.scene.fog.color
	      };
	      uniforms.fogNear = {
	        type: "f",
	        value: this.scene.fog.near
	      };
	      uniforms.fogFar = {
	        type: "f",
	        value: this.scene.fog.far
	      };
	      uniforms.fogDensity = {
	        type: "f",
	        value: this.scene.fog.density
	      };
	    }
	    material = new THREE.ShaderMaterial({
	      uniforms: uniforms,
	      attributes: this.attributes,
	      vertexShader: shaders.vertex(),
	      fragmentShader: shaders.fragment(),
	      blending: THREE.AdditiveBlending,
	      transparent: true,
	      fog: config.fog_enabled
	    });
	    geometry = new THREE.Geometry;
	    radius_min = 350 * config.scale;
	    radius_max = 2000 * config.scale;
	    y_bounds = 10;
	    y_curve = 400 * config.scale;
	    size_min = 20;
	    size_max = 40;
	    for (i = k = 0, ref = config.partices; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
	      a = utils.random(0, PI_2);
	      r = utils.random(radius_min, radius_max);
	      x = r * Math.cos(a);
	      y = y_curve * Math.cos((r / radius_max) * Math.PI);
	      z = r * Math.sin(a);
	      geometry.vertices.push(new THREE.Vector3(x, y, z));
	      this.attributes.alpha.value[i] = utils.random(0.2, 1.0);
	      this.attributes.size.value[i] = utils.random(size_min, size_max);
	    }
	    this.mesh = new THREE.PointCloud(geometry, material);
	    this.container.add(this.mesh);
	    this.container.rotation.y = 0.1;

	    /*
	    		Particles tunnel
	     */
	    size_min = 40;
	    size_max = 80;
	    geometry = new THREE.Geometry;
	    radius_max = radius_min;
	    radius_min = 150 * config.scale;
	    y_curve = 1000 * config.scale;
	    for (i = l = 0, ref1 = config.tunnel_particles; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
	      a = utils.random(0, PI_2);
	      r = utils.random(radius_min, radius_max);
	      percent = Math.random();
	      x = r * Math.cos(a);
	      y = 13422 + y_curve * Math.cos((r / radius_max) * Math.PI);
	      z = r * Math.sin(a);
	      geometry.vertices.push(new THREE.Vector3(x, y, z));
	      opacity = utils.random(0.2, 1.0);
	      percent = y / y_curve;
	      if (percent > 0.5) {
	        opacity += utils.lerp(opacity, 0, 0.5 + percent);
	      }
	      this.attributes.alpha.value[i] = opacity;
	      this.attributes.size.value[i] = utils.random(size_min, size_max);
	    }
	    this.tunnel_mesh = new THREE.PointCloud(geometry, material);
	    this.container.add(this.tunnel_mesh);

	    /*
	    		Calculate the last path position
	     */
	    mesh = new THREE.Mesh(new THREE.SphereGeometry(100, 4, 4));
	    mesh.position.y = 15000;
	    mesh.visible = false;
	    this.container.add(mesh);
	    this.container.updateMatrixWorld();
	    vector = new THREE.Vector3;
	    vector.setFromMatrixPosition(mesh.matrixWorld);
	    config.path_camera_dolly.push(vector.toArray());
	    config.path_out.push(vector.toArray());

	    /*
	    		Camera dolly
	     */
	    this.camera_dolly = new THREE.Mesh(new THREE.SphereGeometry(100, 8, 8), new THREE.MeshBasicMaterial({
	      color: 0xFF0000
	    }));
	    this.camera_dolly.visible = false;
	    this.scene.add(this.camera_dolly);

	    /*
	    		Create curve for camera
	     */
	    this.path_in = utils.path(this.scene, config.path_in, 0x00FF00);
	    this.path_out = utils.path(this.scene, config.path_out, 0xFF0000);
	    this.path_camera_dolly = utils.path(this.scene, config.path_camera_dolly, 0x00FF00, null, 5);

	    /*
	    		Ready
	     */
	    this.ready = true;
	    this.emit('setup:complete');
	    return this.bind();
	  };

	  Home.prototype.bind = function() {
	    this.keyboard.on('key:down:space', this.transition_out_forward);
	    this.keyboard.on('key:up:space', this.transition_out_backward);
	    this.keyboard.bind();
	    return engine.on('update', this.update);
	  };

	  Home.prototype.unbind = function() {
	    this.keyboard.off('key:down:space', this.transition_out_forward);
	    this.keyboard.off('key:up:space', this.transition_out_backward);
	    this.keyboard.unbind();
	    return engine.off('update', this.update);
	  };


	  /*
	  	Transition in
	   */

	  Home.prototype.transition_in = function() {
	    var params, tween;
	    this.emit('transition:in:complete');
	    this.is_transitioning = true;
	    cameras.user.position.fromArray(config.path_in[0]);
	    cameras.user.lookAt(new THREE.Vector3);

	    /*
	    		UI
	     */
	    this.ui.transition_in();

	    /*
	    		Camera
	     */
	    tween = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      ease: Power2.easeOut,
	      onUpdate: (function(_this) {
	        return function() {
	          var position;
	          _this.ui.update();
	          position = _this.path_in.getPointAt(tween.progress);
	          cameras.user.position.copy(position);
	          return cameras.user.lookAt(new THREE.Vector3);
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          return _this.is_transitioning = false;
	        };
	      })(this)
	    };
	    this.tweens.push(TweenLite.to(tween, config.camera_in_duration, params));

	    /*
	    		Fog
	     */
	    if (config.fog_enabled) {
	      this.scene.fog.density = config.fog_in_start;
	      params = {
	        density: config.fog_in_end,
	        ease: Power2.easeOut
	      };
	      return this.tweens.push(TweenLite.to(this.scene.fog, config.fog_in_duration, params));
	    }
	  };


	  /*
	  	Transition out
	   */

	  Home.prototype.transition_out_backward = function() {
	    var camera_duration, dolly_duration, dolly_tween, fov_duration, params, tween;
	    if (this.transition_progress === 0) {
	      return;
	    }
	    if (this.transition_progress > 0.6) {
	      return;
	    }

	    /*
	    		Kill current tweens
	     */
	    this.kill_tweens();

	    /*
	    		UI
	     */
	    this.ui.transition_out_backward();

	    /*
	    		Camera
	     */
	    tween = {
	      progress: this.transition_progress,
	      percent: 0
	    };
	    params = {
	      progress: 0,
	      percent: 1,
	      ease: Power3.easeOut,
	      onUpdate: (function(_this) {
	        return function() {
	          var position, vol;
	          position = _this.path_out.getPointAt(tween.progress);
	          cameras.user.position.copy(position);
	          cameras.user.lookAt(_this.camera_dolly.position);
	          _this.sounds.loop.volume(tween.percent);
	          vol = utils.lerp(1, 0, tween.percent);
	          return _this.sounds.transition.volume(vol);
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          _this.is_transitioning = false;
	          return _this.sounds.transition.stop();
	        };
	      })(this)
	    };
	    camera_duration = 2 + (2 * this.transition_progress);
	    this.tweens.push(TweenLite.to(tween, camera_duration, params));

	    /*
	    		Camera dolly
	     */
	    if (this.dolly_transition_progress > 0) {
	      dolly_tween = {
	        progress: this.dolly_transition_progress
	      };
	      params = {
	        progress: 0,
	        ease: Power2.easeOut,
	        onUpdate: (function(_this) {
	          return function() {
	            var position;
	            position = _this.path_camera_dolly.getPointAt(dolly_tween.progress);
	            return _this.camera_dolly.position.copy(position);
	          };
	        })(this)
	      };
	      dolly_duration = 2 + (2 * this.dolly_transition_progress);
	      this.tweens.push(TweenLite.to(dolly_tween, dolly_duration, params));
	    }

	    /*
	    		Engine
	     */
	    if (this.fov_transition_progress > 0) {
	      params = {
	        fov: config.camera_fov,
	        ease: Power3.easeOut
	      };
	      fov_duration = 5 + (5 * this.fov_transition_progress);
	      return this.tweens.push(TweenLite.to(engine, fov_duration, params));
	    }
	  };


	  /*
	  	Transition out
	   */

	  Home.prototype.transition_out_forward = function() {
	    var dolly_tween, fov_tween, params, tween;
	    if (this.is_transitioning) {
	      return;
	    }
	    this.is_transitioning = true;

	    /*
	    		Sounds
	     */
	    this.sounds.transition.volume(1);
	    this.sounds.transition.play();

	    /*
	    		Kill current tweens
	     */
	    this.kill_tweens();

	    /*
	    		UI
	     */
	    this.ui.transition_out();

	    /*
	    		Camera
	     */
	    tween = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      ease: Power2.easeIn,
	      onUpdate: (function(_this) {
	        return function() {
	          var position;
	          _this.transition_progress = tween.progress;
	          position = _this.path_out.getPointAt(tween.progress);
	          cameras.user.position.copy(position);
	          cameras.user.lookAt(_this.camera_dolly.position);
	          return _this.sounds.loop.volume(1 - tween.progress);
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          return _this.next();
	        };
	      })(this)
	    };
	    this.tweens.push(TweenLite.to(tween, config.camera_out_duration, params));

	    /*
	    		Camera dolly
	     */
	    dolly_tween = {
	      progress: 0
	    };
	    params = {
	      progress: 1,
	      delay: 6,
	      ease: Power2.easeIn,
	      onUpdate: (function(_this) {
	        return function() {
	          var position;
	          _this.dolly_transition_progress = dolly_tween.progress;
	          position = _this.path_camera_dolly.getPointAt(dolly_tween.progress);
	          return _this.camera_dolly.position.copy(position);
	        };
	      })(this)
	    };
	    this.tweens.push(TweenLite.to(dolly_tween, 3.7, params));

	    /*
	    		Engine
	     */
	    params = {
	      fov: config.camera_fov_out,
	      delay: 5,
	      ease: Power3.easeOut,
	      onUpdate: (function(_this) {
	        return function() {
	          return _this.fov_transition_progress = fov_tween.progress();
	        };
	      })(this)
	    };
	    fov_tween = TweenLite.to(engine, config.camera_fov_out_duration, params);
	    return this.tweens.push(fov_tween);
	  };

	  Home.prototype.update = function() {
	    var rotate;
	    if (!this.ready) {
	      return;
	    }
	    rotate = 0.001;
	    this.mesh.rotation.y += rotate;
	    return this.tunnel_mesh.rotation.y += rotate;
	  };

	  Home.prototype.next = function() {
	    this.has_transitioned_out = true;
	    return this.emit('next');
	  };

	  Home.prototype.kill_tweens = function() {
	    var j, len, ref, results, tween;
	    ref = this.tweens;
	    results = [];
	    for (j = 0, len = ref.length; j < len; j++) {
	      tween = ref[j];
	      results.push(tween != null ? tween.kill() : void 0);
	    }
	    return results;
	  };

	  Home.prototype.enable_transition = function() {};

	  Home.prototype.disable_transition = function() {};

	  Home.prototype.destroy = function() {
	    var key, ref, sound;
	    ref = this.sounds;
	    for (key in ref) {
	      sound = ref[key];
	      sound.fade(1, 0, 1000);
	    }
	    return utils.delay(1, (function(_this) {
	      return function() {
	        var j, len, object, ref1, ref2;
	        ref1 = _this.sounds;
	        for (key in ref1) {
	          sound = ref1[key];
	          sound.unload();
	        }
	        ref2 = _this.scene.children;
	        for (j = 0, len = ref2.length; j < len; j++) {
	          object = ref2[j];
	          _this.scene.remove(object);
	        }
	        _this.kill_tweens();
	        _this.unbind();
	        _this.ui.destroy();
	        _this.loader.dispose();
	        return _this.emit('destroyed');
	      };
	    })(this));
	  };

	  return Home;

	})();


/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = {
	  add_controls: false,
	  transition_debug: false,
	  fog_enabled: true,
	  camera_fov: 80,
	  camera_fov_out: 120,
	  camera_fov_out_duration: 10,
	  path_in: [[14660.800000000001, -16761.800000000003, 12783.1], [13328, -15238, 11621]],
	  path_out: [[13328, -15238, 11621], [11100, -12545, 9690], [7735, -9383, 7878], [4207, -4813, 5272], [1501, -1205, 3305], [0, 0, 0]],
	  path_camera_dolly: [[0, 0, 0]],
	  camera_in_duration: 2,
	  camera_out_duration: 10,
	  fog_in_duration: 10,
	  hires_in_duration: 2,
	  hires_out_duration: 1,
	  fog_in_start: 0.00070,
	  fog_in_end: 0.00007,
	  scale: 10,
	  partices: 40000 * 10,
	  tunnel_particles: 30000,

	  /* 
	  	Objects
	   */
	  container_position: [1500, 1050, 4400],
	  container_rotation: [4.4, 0.01, 0.28],
	  title_position: [11100, -12000, 9690],
	  title_letter_in_position: [[-1173, -25, 0], [-291, -25, 0], [480, -28, 0], [1068, -28, 0]],
	  title_letter_in_rotation: [[0, 0, -0.08], [0, 0, 0.21], [0, -0.36, 0], [-0.08, 0, 0]],
	  ui_hires_scale: 20,
	  ui_hires_position: [0, 2170, 0],
	  paragraph_positions: [[0, -700, 0], [0, -1435, 0]],
	  enter_position: [0, -2355, 0],
	  enter_letter_in_position: [
	    {
	      x: -20,
	      y: 6,
	      z: 0
	    }, {
	      x: -8,
	      y: 3,
	      z: 0
	    }, {
	      x: 0,
	      y: 0,
	      z: 0
	    }, {
	      x: 7,
	      y: -1,
	      z: 0
	    }, {
	      x: 19,
	      y: -3,
	      z: 0
	    }
	  ],
	  enter_letter_in_rotation: [
	    {
	      x: 0,
	      y: 7,
	      z: 11
	    }, {
	      x: 0,
	      y: 6,
	      z: 0
	    }, {
	      x: 0,
	      y: 0,
	      z: 0
	    }, {
	      x: 0,
	      y: -3,
	      z: 0
	    }, {
	      x: -10,
	      y: 0,
	      z: -5
	    }
	  ]
	};


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var Text, TextFX, UI, cameras, config, happens, scenes, utils;

	happens = __webpack_require__(8);

	cameras = __webpack_require__(16);

	utils = __webpack_require__(34);

	Text = __webpack_require__(66);

	config = __webpack_require__(76);

	scenes = __webpack_require__(39);

	TextFX = __webpack_require__(41);

	module.exports = UI = (function() {
	  function UI(scene, gui, assets) {
	    this.scene = scene;
	    this.gui = gui;
	    this.assets = assets;
	    this.ui = {
	      'dim': '.dim',
	      'hitarea': '.hitarea',
	      'hires': 'h1',
	      'preface': 'h2',
	      'paragraphs': '.paragraphs p',
	      'next': '.next'
	    };
	    happens(this);
	    this.tweens = [];
	    this.render();
	  }

	  UI.prototype.render = function() {
	    var data, i, id, j, key, len, mesh, ref, ref1, template, text3d;
	    data = scenes.get('home');

	    /*
	    		Template
	     */
	    template = __webpack_require__(78);
	    $('main').append(template({
	      data: data

	      /*
	       		Elements
	       */
	    }));
	    this.el = $("#" + data.id);
	    ref = this.ui;
	    for (key in ref) {
	      id = ref[key];
	      this.ui[key] = this.el.find(id);
	    }
	    this.ui.letters = this.ui.paragraphs.lettering().children();
	    this.ui.next_letters = this.ui.next.lettering().children();
	    this.ui.dim.remove();

	    /*
	    		Objects
	     */
	    this.container = new THREE.Object3D;
	    this.scene.add(this.container);
	    this.container.position.fromArray(config.title_position);

	    /*
	    		Text
	     */
	    text3d = new Text;
	    this.title_meshes = text3d.create_multichar({
	      text: 'VOID',
	      size: 490,
	      curve_segments: 10
	    });
	    ref1 = this.title_meshes;
	    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
	      mesh = ref1[i];
	      this.container.add(mesh);
	    }
	    return this.paragraph_meshes = [];
	  };

	  UI.prototype.update = function() {
	    return this.container.lookAt(cameras.user.position);
	  };

	  UI.prototype.transition_in = function() {
	    var fx, i, j, len, mesh, params, params1, params2, params3, position, ref, rotation, timeline;
	    params = {
	      autoAlpha: 1,
	      ease: Power2.easeIn,
	      delay: 2
	    };
	    TweenLite.to(this.ui.hires, 4, params);
	    params = {
	      autoAlpha: 1,
	      ease: Power4.easeIn,
	      delay: 0.5
	    };
	    TweenLite.to(this.ui.preface, 1.2, params);
	    timeline = new TimelineLite;
	    ref = this.title_meshes;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      mesh = ref[i];
	      position = config.title_letter_in_position[i];
	      params1 = {
	        x: position[0],
	        y: position[1],
	        z: position[2],
	        ease: Power3.easeOut
	      };
	      rotation = config.title_letter_in_rotation[i];
	      params2 = {
	        x: rotation[0],
	        y: rotation[1],
	        z: rotation[2],
	        ease: Power3.easeOut
	      };
	      params3 = {
	        opacity: 1,
	        delay: utils.random(0, 1),
	        ease: Power2.easeOut
	      };
	      timeline.to(mesh.position, 20, params1, 1.8);
	      timeline.to(mesh.rotation, 20, params2, 1.8);
	      timeline.to(mesh.material, 5, params3, 2.3);
	    }
	    timeline.play();
	    fx = new TextFX;
	    fx.animate(this.ui.letters, 4000);
	    params = {
	      autoAlpha: 1,
	      ease: Power2.easeIn,
	      delay: 3,
	      onComplete: (function(_this) {
	        return function() {
	          fx = new TextFX;
	          fx.exclude = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
	          return fx.animate(_this.ui.next_letters, 0);
	        };
	      })(this)
	    };
	    return TweenLite.to(this.ui.next, 1.6, params);
	  };

	  UI.prototype.transition_out = function() {
	    var j, len, mesh, params, params1, params2, range, ref, rx, ry, rz, timeline, x, y, z;
	    this.kill_tweens();
	    TweenLite.killTweensOf(this.el);
	    params = {
	      autoAlpha: 0,
	      ease: Power2.easeOut
	    };
	    this.tweens.push(TweenLite.to(this.el, 1.6, params));
	    timeline = new TimelineLite;
	    ref = this.title_meshes;
	    for (j = 0, len = ref.length; j < len; j++) {
	      mesh = ref[j];
	      range = 200;
	      x = mesh.position.x + utils.random(-range, range);
	      y = mesh.position.y + utils.random(-range, range);
	      z = mesh.position.z + utils.random(-range * 2, range * 2);
	      range = Math.PI / 2;
	      rx = utils.random(-range, range);
	      ry = utils.random(-range, range);
	      rz = utils.random(-range, range);
	      params1 = {
	        delay: 4,
	        x: x,
	        y: y,
	        z: z,
	        ease: Power1.easeInOut
	      };
	      params2 = {
	        delay: 4,
	        x: rx,
	        y: ry,
	        z: rz,
	        ease: Power1.easeInOut
	      };
	      timeline.to(mesh.position, 20, params1, 0);
	      timeline.to(mesh.rotation, 20, params2, 0);
	    }
	    timeline.play();
	    return this.tweens.push(timeline);
	  };

	  UI.prototype.transition_out_backward = function() {
	    var i, j, len, mesh, params, params1, params2, position, ref, rotation, timeline;
	    this.kill_tweens();
	    params = {
	      autoAlpha: 1,
	      ease: Power2.easeOut,
	      delay: 2
	    };
	    this.tweens.push(TweenLite.to(this.el, 1.6, params));
	    timeline = new TimelineLite;
	    ref = this.title_meshes;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      mesh = ref[i];
	      position = config.title_letter_in_position[i];
	      params1 = {
	        x: position[0],
	        y: position[1],
	        z: position[2],
	        ease: Power3.easeOut
	      };
	      rotation = config.title_letter_in_rotation[i];
	      params2 = {
	        x: rotation[0],
	        y: rotation[1],
	        z: rotation[2],
	        ease: Power3.easeOut
	      };
	      timeline.to(mesh.position, 20, params1, 1.8);
	      timeline.to(mesh.rotation, 20, params2, 1.8);
	    }
	    timeline.play();
	    return this.tweens.push(timeline);
	  };

	  UI.prototype.kill_tweens = function() {
	    var j, len, ref, results, tween;
	    ref = this.tweens;
	    results = [];
	    for (j = 0, len = ref.length; j < len; j++) {
	      tween = ref[j];
	      results.push(tween != null ? tween.kill() : void 0);
	    }
	    return results;
	  };

	  UI.prototype.destroy = function() {
	    return this.el.remove();
	  };

	  return UI;

	})();


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(43);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (undefined) {
	buf.push("<div" + (jade.attr("id", "" + (locals.data.id) + "", true, false)) + " class=\"section scene layer layer_0\"><div class=\"transition_black layer layer-0\"></div><div class=\"ui\"><div class=\"dim layer layer-0\"></div><div class=\"content\"><div class=\"hitarea layer layer-0\"></div><h1 class=\"hi_res layer layer-1\"><a href=\"http://hi-res.net\" title=\"Hi-ReS!\" target=\"_blank\"></a></h1><h2 class=\"layer layer-1 font-garamond bold\">PREFACE</h2><div class=\"paragraphs layer\">");
	// iterate locals.data.paragraphs
	;(function(){
	  var $$obj = locals.data.paragraphs;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var paragraph = $$obj[$index];

	buf.push("<p>" + (((jade_interp = paragraph) == null ? '' : jade_interp)) + "</p>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var paragraph = $$obj[$index];

	buf.push("<p>" + (((jade_interp = paragraph) == null ? '' : jade_interp)) + "</p>");
	    }

	  }
	}).call(this);

	buf.push("</div><a class=\"next layer layer_2 caps-text\">HOLD THE SPACE BAR TO CONTINUE</a></div></div></div>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var asset, assets, i, len, settings;

	settings = __webpack_require__(10);

	assets = [
	  {
	    id: 'particle',
	    url: '/img/home/particle.jpg',
	    type: 'image'
	  }, {
	    id: 'hires_logo',
	    url: '/img/home/hires.png',
	    type: 'image'
	  }, {
	    id: 'start',
	    url: '/sound/home/start.mp3',
	    type: 'sound'
	  }, {
	    id: 'loop',
	    url: '/sound/home/loop.mp3',
	    type: 'sound'
	  }, {
	    id: 'transition',
	    url: '/sound/home/transition.mp3',
	    type: 'sound'
	  }
	];

	for (i = 0, len = assets.length; i < len; i++) {
	  asset = assets[i];
	  asset.url = settings.base_path + asset.url;
	}

	module.exports = assets;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var Experiment, Kubik, Loader, Mouse, PathLookatCurve, PathLookatFixed, UI, assets, cameras, config, engine, happens, lights, settings, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	happens = __webpack_require__(8);

	settings = __webpack_require__(10);

	cameras = __webpack_require__(16);

	engine = __webpack_require__(7);

	Loader = __webpack_require__(26);

	Mouse = __webpack_require__(33);

	utils = __webpack_require__(34);

	Experiment = __webpack_require__(36);

	lights = __webpack_require__(81);

	config = __webpack_require__(82);

	UI = __webpack_require__(37);

	assets = __webpack_require__(83);

	PathLookatFixed = __webpack_require__(47);

	PathLookatCurve = __webpack_require__(48);

	module.exports = Kubik = (function(superClass) {
	  extend(Kubik, superClass);

	  function Kubik() {
	    this.update = bind(this.update, this);
	    this.on_mouse_move = bind(this.on_mouse_move, this);
	    this.on_mouse_up = bind(this.on_mouse_up, this);
	    this.on_mouse_down = bind(this.on_mouse_down, this);
	    this.setup = bind(this.setup, this);
	    return Kubik.__super__.constructor.apply(this, arguments);
	  }

	  Kubik.prototype.spread = 0;

	  Kubik.prototype.accel_x = 0.1;

	  Kubik.prototype.accel_y = 0.1;

	  Kubik.prototype.accel_z = 0.1;

	  Kubik.prototype.dopplerFactor = 1;

	  Kubik.prototype.speedOfSound = 343.3;

	  Kubik.prototype.setup = function(manifest) {
	    var cube, geometry, group, i, j, key, len, light, num_cubes, params, range, ratio, ref, scale, sound;
	    range = 10;
	    this.gui.add(this, 'audio_pos_x', -range, range);
	    this.gui.add(this, 'audio_pos_y', -range, range);
	    this.gui.add(this, 'audio_pos_z', -range, range);
	    range = 1000;
	    this.gui.add(this, 'accel_x', -range, range);
	    this.gui.add(this, 'accel_y', -range, range);
	    this.gui.add(this, 'accel_z', -range, range);
	    this.gui.add(cameras.user.position, 'z', -100, 1000);

	    /*
	    		Engine
	     */
	    engine.fov = config.camera_fov;

	    /*
	    		UI
	     */
	    this.ui = new UI('kubik', this.scene, this.gui);

	    /*
	    		Scene
	     */
	    if (config.fog_enabled) {
	      this.scene.fog = new THREE.FogExp2(0x000000, config.fog_in_start);
	      this.gui.add(this.scene.fog, 'density', 0, 1);
	    }
	    this.gui.add(engine, 'fov', 0, 200);

	    /*
	    		Helpers
	     */
	    if (settings.debug) {
	      this.scene.add(new THREE.GridHelper(50, 10));
	      this.scene.add(new THREE.AxisHelper(10));
	      this.scene.add(new THREE.CameraHelper(cameras.user));
	    }

	    /*
	    		Lights
	     */
	    for (j = 0, len = lights.length; j < len; j++) {
	      light = lights[j];
	      this.scene.add(light);
	    }

	    /*
	    		Create curve for camera
	     */
	    this.path_in = new PathLookatFixed('path_in', this.scene, config.path_in, config.path_in_lookat, 0x00FF00);
	    this.path_out = new PathLookatCurve('path_out', this.scene, config.path_out, config.path_out_lookat, 0x00FF00);

	    /*
	    		Mouse
	     */
	    this.mouse = new Mouse($('.hitarea'));

	    /*
	    		Sounds
	     */
	    this.audio_pos_x = 0.1;
	    this.audio_pos_z = this.config.audio_pos_z_in;
	    this.sounds = {
	      background: utils.get_asset('background', manifest).data,
	      top: utils.get_asset('top', manifest).data
	    };
	    this.sounds.background.play();
	    this.sounds.top.volume(0);
	    this.sounds.top.play();
	    ref = this.sounds;
	    for (key in ref) {
	      sound = ref[key];
	      sound.loop(true);
	    }

	    /*
	    		Objects
	     */
	    this.container = new THREE.Object3D;
	    this.scene.add(this.container);

	    /*
	    		Kubik
	     */
	    params = {
	      side: THREE.DoubleSide,
	      blending: 2,
	      transparent: true,
	      depthTest: false,
	      wireframeLinewidth: 1,
	      opacity: 0.1,
	      map: THREE.ImageUtils.loadTexture(this.loader.get_asset('texture').src)
	    };
	    this.material = new THREE.MeshLambertMaterial(params);
	    geometry = new THREE.BoxGeometry(1, 1, 1);
	    i = 0;
	    this.cubes = [];
	    num_cubes = 160;
	    this.object = new THREE.Object3D();
	    while (i < num_cubes) {
	      ratio = i / num_cubes;
	      cube = new THREE.Mesh(geometry, this.material);
	      group = new THREE.Object3D;
	      group.add(cube);
	      group.rotation.y = (ratio * 360) * (Math.PI / 180);
	      this.object.add(group);
	      this.cubes.push(cube);
	      i++;
	    }
	    scale = 40;
	    this.object.scale.set(scale, scale, scale);
	    this.object.rotation.x = HALF_PI;
	    this.container.add(this.object);
	    this.spread = 0.1;
	    this.ready = true;
	    this.bind();
	    return this.emit('setup:complete');
	  };

	  Kubik.prototype.spread_cubes = function() {
	    var cube, index, ratio, ref, results;
	    ratio = 0;
	    ref = this.cubes;
	    results = [];
	    for (index in ref) {
	      cube = ref[index];
	      ratio = index / this.cubes.length;
	      results.push(cube.rotation.y = ratio * Math.PI * this.spread);
	    }
	    return results;
	  };

	  Kubik.prototype.bind = function() {
	    Kubik.__super__.bind.call(this);
	    this.mouse.on('move', this.on_mouse_move);
	    this.mouse.on('down', this.on_mouse_down);
	    this.mouse.on('up', this.on_mouse_up);
	    this.ui.bind();
	    return this.mouse.bind();
	  };

	  Kubik.prototype.unbind = function() {
	    Kubik.__super__.unbind.call(this);
	    this.mouse.off('move', this.on_mouse_move);
	    this.mouse.off('down', this.on_mouse_down);
	    this.mouse.off('up', this.on_mouse_up);
	    this.ui.unbind();
	    return this.mouse.unbind();
	  };

	  Kubik.prototype.force_transition_in_complete = function() {
	    Kubik.__super__.force_transition_in_complete.call(this);
	    return this.camera_tween.totalProgress(1).kill();
	  };

	  Kubik.prototype.on_mouse_down = function() {
	    var params, ref, ref1;
	    if (this.is_transitioning_out) {
	      return;
	    }
	    this.force_transition_in_complete();
	    if ((ref = this.fov_tween) != null) {
	      ref.kill();
	    }
	    if ((ref1 = this.pos_tween) != null) {
	      ref1.kill();
	    }
	    params = {
	      fov: 200,
	      ease: Cubic.easeOut
	    };
	    this.fov_tween = TweenLite.to(engine, 0.6, params);
	    params = {
	      z: 33
	    };
	    this.pos_tween = TweenLite.to(cameras.user.position, 0.3, params);
	    this.sounds.background.fade(1, 0.5, 600);
	    return this.sounds.top.fade(0, 1, 600);
	  };

	  Kubik.prototype.on_mouse_up = function() {
	    var params, ref, ref1;
	    if (this.is_transitioning_out) {
	      return;
	    }
	    if ((ref = this.fov_tween) != null) {
	      ref.kill();
	    }
	    if ((ref1 = this.pos_tween) != null) {
	      ref1.kill();
	    }
	    params = {
	      fov: this.config.camera_fov,
	      ease: Cubic.easeOut
	    };
	    this.fov_tween = TweenLite.to(engine, 0.55, params);
	    params = {
	      z: this.config.path_in[1].z
	    };
	    this.pos_tween = TweenLite.to(cameras.user.position, 0.3, params);
	    this.sounds.background.fade(0.5, 1, 600);
	    return this.sounds.top.fade(1, 0, 600);
	  };

	  Kubik.prototype.on_mouse_move = function() {
	    var duration, p1_x, p1_y, p2_x, p2_y, params, ref, ref1, spread, x;
	    p1_x = 0;
	    p1_y = 0;
	    p2_x = this.mouse.normal_center_x;
	    p2_y = this.mouse.normal_center_y;
	    if (this.mouse.is_down) {
	      duration = 0.25;
	    } else {
	      duration = 1;
	    }
	    if ((ref = this.rotation_tween) != null) {
	      ref.kill();
	    }
	    x = HALF_PI + this.mouse.normal_center_y;
	    params = {
	      x: x
	    };
	    this.rotation_tween = TweenLite.to(this.object.rotation, duration, params);
	    if ((ref1 = this.tween) != null) {
	      ref1.kill();
	    }
	    spread = this.mouse.normal_x.map(0, 1, 0, PI_2);
	    params = {
	      spread: spread,
	      ease: Power3.easeOut,
	      onUpdate: (function(_this) {
	        return function() {
	          return _this.spread_cubes();
	        };
	      })(this)
	    };
	    return this.tween = TweenLite.to(this, 1, params);
	  };

	  Kubik.prototype.update = function() {
	    var cube, index, ratio, ref, results;
	    if (!this.ready) {
	      return;
	    }
	    this.audio_pos_x = this.mouse.normal_center_x * 4;
	    this.sounds.background.pos(this.audio_pos_x, null, this.audio_pos_z);
	    ref = this.cubes;
	    results = [];
	    for (index in ref) {
	      cube = ref[index];
	      ratio = index / this.cubes.length;
	      results.push(cube.rotation.x += 0.5 * Math.PI / 180);
	    }
	    return results;
	  };

	  return Kubik;

	})(Experiment);


/***/ },
/* 81 */
/***/ function(module, exports) {

	var light;

	light = new THREE.AmbientLight(0xb1b1b1);

	module.exports = [light];


/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = {
	  fog_enabled: true,
	  transition_debug: false,
	  camera_fov: 80,
	  "path_in": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 300
	    }, {
	      "x": 0,
	      "y": 0,
	      "z": 80
	    }
	  ],
	  "path_in_lookat": {
	    "x": 0,
	    "y": 0,
	    "z": 0
	  },
	  "path_out": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 80
	    }, {
	      "x": 0,
	      "y": -50,
	      "z": 200
	    }
	  ],
	  "path_out_lookat": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 0
	    }, {
	      "x": 0,
	      "y": -50,
	      "z": 0
	    }
	  ],
	  camera_in_duration: 5,
	  camera_out_duration: 4,
	  fog_in_duration: 12,
	  fog_out_duration: 6,
	  fog_in_start: 0.1,
	  fog_in_end: 0.001,
	  fog_out_start: 0.001,
	  fog_out_end: 0.01,
	  audio_pos_z_in: -15,
	  audio_pos_z_out: 6,
	  num_blobs: 30,
	  max_blobs: 50,
	  speed: 0.15,
	  scalar: 1
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var asset, assets, i, len, settings;

	settings = __webpack_require__(10);

	assets = [
	  {
	    id: 'texture',
	    url: '/img/kubik/texture.png',
	    type: 'image'
	  }, {
	    id: 'background',
	    url: '/sound/kubik/background.mp3',
	    type: 'sound'
	  }, {
	    id: 'top',
	    url: '/sound/kubik/top.mp3',
	    type: 'sound'
	  }
	];

	for (i = 0, len = assets.length; i < len; i++) {
	  asset = assets[i];
	  asset.url = settings.base_path + asset.url;
	}

	module.exports = assets;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var Experiment, Liquidice, Loader, Mouse, PathLookatCurve, PathLookatFixed, UI, assets, cameras, config, engine, happens, lights, settings, utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	happens = __webpack_require__(8);

	settings = __webpack_require__(10);

	cameras = __webpack_require__(16);

	engine = __webpack_require__(7);

	Loader = __webpack_require__(26);

	Mouse = __webpack_require__(33);

	utils = __webpack_require__(34);

	Experiment = __webpack_require__(36);

	lights = __webpack_require__(85);

	config = __webpack_require__(86);

	UI = __webpack_require__(37);

	assets = __webpack_require__(87);

	PathLookatFixed = __webpack_require__(47);

	PathLookatCurve = __webpack_require__(48);

	module.exports = Liquidice = (function(superClass) {
	  extend(Liquidice, superClass);

	  function Liquidice() {
	    this.on_mouse_up = bind(this.on_mouse_up, this);
	    this.on_mouse_down = bind(this.on_mouse_down, this);
	    this.update = bind(this.update, this);
	    this.on_transition_out_forward = bind(this.on_transition_out_forward, this);
	    this.on_transition_out_backward = bind(this.on_transition_out_backward, this);
	    this.setup = bind(this.setup, this);
	    return Liquidice.__super__.constructor.apply(this, arguments);
	  }

	  Liquidice.prototype.values = null;

	  Liquidice.prototype.points = null;

	  Liquidice.prototype.positions = [];

	  Liquidice.prototype.material = null;

	  Liquidice.prototype.tween = null;

	  Liquidice.prototype.audio_pos_x = 0.1;

	  Liquidice.prototype.audio_pos_y = 0.1;

	  Liquidice.prototype.audio_pos_z = 0;

	  Liquidice.prototype.setup = function(manifest) {
	    var asset, axisMax, axisMin, axisRange, fShader, i, j, k, key, l, len, len1, light, m, range, ref, ref1, ref2, size, size2, size3, sound, textureCube, uniforms, urls, x, y, z;
	    range = 1;
	    this.gui.add(this, 'audio_pos_x', -range, range);
	    this.gui.add(this, 'audio_pos_y', -range, range);
	    this.gui.add(this, 'audio_pos_z', -range, range);

	    /*
	    		Engine
	     */
	    engine.fov = config.camera_fov;

	    /*
	    		UI
	     */
	    this.ui = new UI('liquidice', this.scene, this.gui);

	    /*
	    		Scene
	     */
	    if (config.fog_enabled) {
	      this.scene.fog = new THREE.FogExp2(0x000000, config.fog_in_start);
	      this.gui.add(this.scene.fog, 'density', 0, 1);
	    }

	    /*
	    		Helpers
	     */
	    if (settings.debug) {
	      this.scene.add(new THREE.GridHelper(50, 10));
	      this.scene.add(new THREE.AxisHelper(10));
	      this.scene.add(new THREE.CameraHelper(cameras.user));
	    }

	    /*
	    		Lights
	     */
	    for (l = 0, len = lights.length; l < len; l++) {
	      light = lights[l];
	      this.scene.add(light);
	    }

	    /*
	    		Create curve for camera
	     */
	    this.path_in = new PathLookatFixed('path_in', this.scene, config.path_in, config.path_in_lookat, 0x00FF00);
	    this.path_out = new PathLookatCurve('path_out', this.scene, config.path_out, config.path_out_lookat, 0x00FF00);

	    /*
	    		Mouse
	     */
	    this.mouse = new Mouse($('body'));

	    /*
	    		Sounds
	     */
	    this.audio_pos_z = this.config.audio_pos_z_in;
	    this.sounds = {
	      background: utils.get_asset('background', manifest).data,
	      top: utils.get_asset('top', manifest).data
	    };
	    this.sounds.background.volume(2);
	    this.sounds.background.play();
	    this.sounds.top.volume(0);
	    this.sounds.top.play();
	    ref = this.sounds;
	    for (key in ref) {
	      sound = ref[key];
	      sound.loop(true);
	    }

	    /*
	    		Objects
	     */
	    this.container = new THREE.Object3D;
	    this.scene.add(this.container);

	    /*
	    		Marching cubes
	     */
	    axisMin = -6;
	    axisMax = 6;
	    axisRange = axisMax - axisMin;
	    size = 16;
	    size2 = size * size;
	    size3 = size * size * size;
	    this.points = [];
	    k = 0;
	    while (k < size) {
	      j = 0;
	      while (j < size) {
	        i = 0;
	        while (i < size) {
	          x = axisMin + axisRange * i / (size - 1);
	          y = axisMin + axisRange * j / (size - 1);
	          z = axisMin + axisRange * k / (size - 1);
	          this.points.push(new THREE.Vector3(x, y, z));
	          i++;
	        }
	        j++;
	      }
	      k++;
	    }
	    this.values = [];
	    i = 0;
	    while (i < size3) {
	      this.values[i] = 0;
	      i++;
	    }

	    /*
	    		Balls
	     */
	    urls = [];
	    for (m = 0, len1 = manifest.length; m < len1; m++) {
	      asset = manifest[m];
	      if ((ref1 = asset.id) === 'pos-x' || ref1 === 'neg-x' || ref1 === 'pos-y' || ref1 === 'neg-y' || ref1 === 'pos-z' || ref1 === 'neg-z') {
	        urls.push(asset.src);
	      }
	    }
	    textureCube = THREE.ImageUtils.loadTextureCube(urls);
	    textureCube.format = THREE.RGBFormat;
	    fShader = THREE.FresnelShader;
	    uniforms = {
	      mRefractionRatio: {
	        type: "f",
	        value: 1.02
	      },
	      mFresnelBias: {
	        type: "f",
	        value: 0.1
	      },
	      mFresnelPower: {
	        type: "f",
	        value: 2.0
	      },
	      mFresnelScale: {
	        type: "f",
	        value: 1.0
	      },
	      tCube: {
	        type: "t",
	        value: textureCube
	      }
	    };
	    if (config.fog_enabled) {
	      uniforms.topColor = {
	        type: "c",
	        value: new THREE.Color(0x0077ff)
	      };
	      uniforms.bottomColor = {
	        type: "c",
	        value: new THREE.Color(0xffffff)
	      };
	      uniforms.offset = {
	        type: "f",
	        value: 33
	      };
	      uniforms.exponent = {
	        type: "f",
	        value: 0.6
	      };
	      uniforms.fogColor = {
	        type: "c",
	        value: 0x000000
	      };
	      uniforms.fogNear = {
	        type: "f",
	        value: 0
	      };
	      uniforms.fogFar = {
	        type: "f",
	        value: 1
	      };
	      uniforms.fogDensity = {
	        type: "f",
	        value: 0.01
	      };
	    }
	    this.material = new THREE.ShaderMaterial({
	      uniforms: uniforms,
	      vertexShader: fShader.vertexShader,
	      fragmentShader: fShader.fragmentShader,
	      fog: true,
	      side: THREE.DoubleSide
	    });
	    i = 0;
	    while (i < config.max_blobs) {
	      ref2 = this.random_sphere_point(0, 0, 0, 4), x = ref2[0], y = ref2[1], z = ref2[2];
	      this.positions.push(new THREE.Vector3(x, y, z));
	      i++;
	    }
	    this.clock = new THREE.Clock;

	    /*
	    		GUI
	     */
	    this.gui.add(config, 'num_blobs', 1, config.max_blobs).name('blobs');
	    this.gui.add(config, 'speed', 0, 1).name;
	    this.ready = true;
	    this.bind();
	    return this.emit('setup:complete');
	  };

	  Liquidice.prototype.bind = function() {
	    Liquidice.__super__.bind.call(this);
	    this.mouse.on('down', this.on_mouse_down);
	    this.mouse.on('up', this.on_mouse_up);
	    this.on('transition:out:backward', this.on_transition_out_backward);
	    this.on('transition:out:forward', this.on_transition_out_forward);
	    this.ui.bind();
	    return this.mouse.bind();
	  };

	  Liquidice.prototype.unbind = function() {
	    Liquidice.__super__.unbind.call(this);
	    this.mouse.off('down', this.on_mouse_down);
	    this.mouse.off('up', this.on_mouse_up);
	    this.off('transition:out:backward', this.on_transition_out_backward);
	    this.off('transition:out:forward', this.on_transition_out_forward);
	    this.ui.unbind();
	    return this.mouse.unbind();
	  };

	  Liquidice.prototype.force_transition_in_complete = function() {
	    Liquidice.__super__.force_transition_in_complete.call(this);
	    this.camera_tween.totalProgress(1).kill();
	    return this.fog_tween.totalProgress(1).kill();
	  };

	  Liquidice.prototype.transition_in = function() {
	    var params;
	    Liquidice.__super__.transition_in.call(this);
	    params = {
	      audio_pos_z: 0,
	      ease: Power1.easeOut
	    };
	    return TweenLite.to(this, this.config.camera_in_duration, params);
	  };

	  Liquidice.prototype.on_transition_out_backward = function(value) {
	    value = Math.max(value, 0);
	    value = Math.min(value, 1);
	    return this.audio_pos_z = utils.lerp(0, this.config.audio_pos_z_out, value);
	  };

	  Liquidice.prototype.on_transition_out_forward = function(value) {
	    return this.audio_pos_z = utils.lerp(0, this.config.audio_pos_z_out, value);
	  };

	  Liquidice.prototype.update = function() {
	    var t;
	    if (!this.ready) {
	      return;
	    }
	    this.audio_pos_x = this.mouse.normal_x;
	    this.audio_pos_y = this.mouse.normal_y;
	    this.sounds.background.pos(this.audio_pos_x, this.audio_pos_y, this.audio_pos_z);
	    this.sounds.top.pos(this.audio_pos_x, this.audio_pos_y, this.audio_pos_z);
	    t = this.clock.getElapsedTime();
	    return this.ballUpdate(config.speed * t);
	  };

	  Liquidice.prototype.ballUpdate = function(t) {
	    var geometry, i, x, y, z;
	    this.resetValues(this.values);
	    i = 0;
	    while (i < config.num_blobs) {
	      x = this.positions[i].x * Math.cos(1.5 * t) * config.scalar;
	      y = this.positions[i].y * Math.cos(2.5 * t) * config.scalar;
	      z = this.positions[i].z * Math.sin(5.7 * t) * config.scalar;
	      this.addBall(this.points, this.values, new THREE.Vector3(x, y, z));
	      i++;
	    }
	    this.container.remove(this.mesh);
	    geometry = this.marchingCubes(this.points, this.values, 0.5);
	    this.mesh = new THREE.Mesh(geometry, this.material);
	    this.container.add(this.mesh);
	    this.container.rotation.x += 0.3 * (this.mouse.normal_center_x * 0.05);
	    this.container.rotation.y += 0.3 * (this.mouse.normal_center_x * 0.05);
	    return this.container.rotation.z += 0.3 * (this.mouse.normal_center_y * 0.05);
	  };

	  Liquidice.prototype.resetValues = function(values) {
	    var i, results;
	    this.values = values;
	    i = 0;
	    results = [];
	    while (i < this.values.length) {
	      this.values[i] = 0;
	      results.push(i++);
	    }
	    return results;
	  };

	  Liquidice.prototype.addBall = function(points, values, center) {
	    var OneMinusD2, i, results;
	    this.points = points;
	    this.values = values;
	    i = 0;
	    results = [];
	    while (i < this.values.length) {
	      OneMinusD2 = 1.0 - center.distanceToSquared(this.points[i]);
	      this.values[i] += Math.exp(-(OneMinusD2 * OneMinusD2));
	      results.push(i++);
	    }
	    return results;
	  };

	  Liquidice.prototype.marchingCubes = function(points, values, isolevel) {
	    var bits, cubeindex, face, geometry, i, index1, index2, index3, mu, p, px, pxy, pxyz, pxz, py, pyz, pz, size, size2, size3, value0, value1, value2, value3, value4, value5, value6, value7, vertexIndex, vlist, x, y, z;
	    this.points = points;
	    this.values = values;
	    size = Math.round(Math.pow(this.values.length, 1 / 3));
	    size2 = size * size;
	    size3 = size * size * size;
	    vlist = new Array(12);
	    geometry = new THREE.Geometry();
	    vertexIndex = 0;
	    z = 0;
	    while (z < size - 1) {
	      y = 0;
	      while (y < size - 1) {
	        x = 0;
	        while (x < size - 1) {
	          p = x + size * y + size2 * z;
	          px = p + 1;
	          py = p + size;
	          pxy = py + 1;
	          pz = p + size2;
	          pxz = px + size2;
	          pyz = py + size2;
	          pxyz = pxy + size2;
	          value0 = this.values[p];
	          value1 = this.values[px];
	          value2 = this.values[py];
	          value3 = this.values[pxy];
	          value4 = this.values[pz];
	          value5 = this.values[pxz];
	          value6 = this.values[pyz];
	          value7 = this.values[pxyz];
	          cubeindex = 0;
	          if (value0 < isolevel) {
	            cubeindex |= 1;
	          }
	          if (value1 < isolevel) {
	            cubeindex |= 2;
	          }
	          if (value2 < isolevel) {
	            cubeindex |= 8;
	          }
	          if (value3 < isolevel) {
	            cubeindex |= 4;
	          }
	          if (value4 < isolevel) {
	            cubeindex |= 16;
	          }
	          if (value5 < isolevel) {
	            cubeindex |= 32;
	          }
	          if (value6 < isolevel) {
	            cubeindex |= 128;
	          }
	          if (value7 < isolevel) {
	            cubeindex |= 64;
	          }
	          bits = THREE.edgeTable[cubeindex];
	          mu = 0.5;
	          if (bits & 1) {
	            mu = (isolevel - value0) / (value1 - value0);
	            vlist[0] = this.points[p].clone().lerp(this.points[px], mu);
	          }
	          if (bits & 2) {
	            mu = (isolevel - value1) / (value3 - value1);
	            vlist[1] = this.points[px].clone().lerp(this.points[pxy], mu);
	          }
	          if (bits & 4) {
	            mu = (isolevel - value2) / (value3 - value2);
	            vlist[2] = this.points[py].clone().lerp(this.points[pxy], mu);
	          }
	          if (bits & 8) {
	            mu = (isolevel - value0) / (value2 - value0);
	            vlist[3] = this.points[p].clone().lerp(this.points[py], mu);
	          }
	          if (bits & 16) {
	            mu = (isolevel - value4) / (value5 - value4);
	            vlist[4] = this.points[pz].clone().lerp(this.points[pxz], mu);
	          }
	          if (bits & 32) {
	            mu = (isolevel - value5) / (value7 - value5);
	            vlist[5] = this.points[pxz].clone().lerp(this.points[pxyz], mu);
	          }
	          if (bits & 64) {
	            mu = (isolevel - value6) / (value7 - value6);
	            vlist[6] = this.points[pyz].clone().lerp(this.points[pxyz], mu);
	          }
	          if (bits & 128) {
	            mu = (isolevel - value4) / (value6 - value4);
	            vlist[7] = this.points[pz].clone().lerp(this.points[pyz], mu);
	          }
	          if (bits & 256) {
	            mu = (isolevel - value0) / (value4 - value0);
	            vlist[8] = this.points[p].clone().lerp(this.points[pz], mu);
	          }
	          if (bits & 512) {
	            mu = (isolevel - value1) / (value5 - value1);
	            vlist[9] = this.points[px].clone().lerp(this.points[pxz], mu);
	          }
	          if (bits & 1024) {
	            mu = (isolevel - value3) / (value7 - value3);
	            vlist[10] = this.points[pxy].clone().lerp(this.points[pxyz], mu);
	          }
	          if (bits & 2048) {
	            mu = (isolevel - value2) / (value6 - value2);
	            vlist[11] = this.points[py].clone().lerp(this.points[pyz], mu);
	          }
	          i = 0;
	          cubeindex <<= 4;
	          while (THREE.triTable[cubeindex + i] !== -1) {
	            index1 = THREE.triTable[cubeindex + i];
	            index2 = THREE.triTable[cubeindex + i + 1];
	            index3 = THREE.triTable[cubeindex + i + 2];
	            geometry.vertices.push(vlist[index1].clone().multiplyScalar(10));
	            geometry.vertices.push(vlist[index2].clone().multiplyScalar(10));
	            geometry.vertices.push(vlist[index3].clone().multiplyScalar(10));
	            face = new THREE.Face3(vertexIndex, vertexIndex + 1, vertexIndex + 2);
	            geometry.faces.push(face);
	            geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]);
	            vertexIndex += 3;
	            i += 3;
	          }
	          x++;
	        }
	        y++;
	      }
	      z++;
	    }
	    geometry.mergeVertices();
	    geometry.computeFaceNormals();
	    geometry.computeVertexNormals();
	    return geometry;
	  };

	  Liquidice.prototype.random_sphere_point = function(x0, y0, z0, radius) {
	    var phi, theta, u, v, x, y, z;
	    if (x0 == null) {
	      x0 = 0;
	    }
	    if (y0 == null) {
	      y0 = 0;
	    }
	    if (z0 == null) {
	      z0 = 0;
	    }
	    if (radius == null) {
	      radius = 1;
	    }
	    u = Math.random();
	    v = Math.random();
	    theta = 2 * Math.PI * u;
	    phi = Math.acos(2 * v - 1);
	    x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
	    y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
	    z = z0 + (radius * Math.cos(phi));
	    return [x, y, z];
	  };

	  Liquidice.prototype.on_mouse_down = function() {
	    var params, ref, ref1;
	    if (this.is_transitioning_out) {
	      return;
	    }
	    this.force_transition_in_complete();
	    if ((ref = this.tween) != null) {
	      ref.kill();
	    }
	    if ((ref1 = this.pos_tween) != null) {
	      ref1.kill();
	    }
	    params = {
	      scalar: 2,
	      ease: Power1.easeIn
	    };
	    this.tween = TweenLite.to(config, 1, params);
	    params = {
	      z: 0
	    };
	    this.pos_tween = TweenLite.to(cameras.user.position, 1, params);
	    this.sounds.background.fade(1, 0.5, 600);
	    return this.sounds.top.fade(0, 2, 600);
	  };

	  Liquidice.prototype.on_mouse_up = function() {
	    var params, ref, ref1;
	    if (this.is_transitioning_out) {
	      return;
	    }
	    if ((ref = this.tween) != null) {
	      ref.kill();
	    }
	    if ((ref1 = this.pos_tween) != null) {
	      ref1.kill();
	    }
	    params = {
	      scalar: 1,
	      ease: Elastic.easeOut
	    };
	    this.tween = TweenLite.to(config, 2, params);
	    params = {
	      z: this.config.path_in[1].z
	    };
	    this.pos_tween = TweenLite.to(cameras.user.position, 0.3, params);
	    this.sounds.background.fade(0.5, 2, 600);
	    return this.sounds.top.fade(2, 0, 600);
	  };

	  return Liquidice;

	})(Experiment);


/***/ },
/* 85 */
/***/ function(module, exports) {

	var light0, light1, light2, light3;

	light0 = new THREE.PointLight(0xff0000);

	light0.position.set(10, 0, 0);

	light1 = new THREE.PointLight(0x00cc00);

	light1.position.set(0, 10, 0);

	light2 = new THREE.PointLight(0x0000ff);

	light2.position.set(0, 0, 10);

	light3 = new THREE.PointLight(0x333333);

	light3.position.set(-10, -10, -10);

	exports.lights = [light0, light1, light2, light3];


/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = {
	  fog_enabled: true,
	  transition_debug: false,
	  camera_fov: 80,
	  "path_in": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 300
	    }, {
	      "x": 0,
	      "y": 0,
	      "z": 80
	    }
	  ],
	  "path_in_lookat": {
	    "x": 0,
	    "y": 0,
	    "z": 0
	  },
	  "path_out": [
	    {
	      "x": 0,
	      "y": 0.5714285714285836,
	      "z": 80.57142857142856
	    }, {
	      "x": 0,
	      "y": -17.714285714285722,
	      "z": 53.14285714285714
	    }, {
	      "x": -20,
	      "y": -90.85714285714286,
	      "z": -38.28571428571429
	    }
	  ],
	  "path_out_lookat": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 0
	    }, {
	      "x": 0,
	      "y": -100,
	      "z": 0
	    }
	  ],
	  camera_in_duration: 15,
	  camera_out_duration: 2.8,
	  fog_in_duration: 15,
	  fog_out_duration: 3,
	  fog_in_start: 0.1,
	  fog_in_end: 0.001,
	  fog_out_start: 0.001,
	  fog_out_end: 0.01,
	  audio_pos_z_in: -8,
	  audio_pos_z_out: 8,
	  num_blobs: 30,
	  max_blobs: 50,
	  speed: 0.15,
	  scalar: 1
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var asset, assets, i, len, settings;

	settings = __webpack_require__(10);

	assets = [
	  {
	    id: 'pos-x',
	    url: '/img/liquidice/pos-x.jpg',
	    type: 'image'
	  }, {
	    id: 'neg-x',
	    url: '/img/liquidice/neg-x.jpg',
	    type: 'image'
	  }, {
	    id: 'pos-y',
	    url: '/img/liquidice/pos-y.jpg',
	    type: 'image'
	  }, {
	    id: 'neg-y',
	    url: '/img/liquidice/neg-y.jpg',
	    type: 'image'
	  }, {
	    id: 'pos-z',
	    url: '/img/liquidice/pos-z.jpg',
	    type: 'image'
	  }, {
	    id: 'neg-z',
	    url: '/img/liquidice/neg-z.jpg',
	    type: 'image'
	  }, {
	    id: 'MarchingCubesData',
	    url: '/js/liquidice/MarchingCubesData.js',
	    type: 'js'
	  }, {
	    id: 'FresnelShader',
	    url: '/js/liquidice/FresnelShader.js',
	    type: 'js'
	  }, {
	    id: 'background',
	    url: '/sound/liquidice/background.mp3',
	    type: 'sound'
	  }, {
	    id: 'top',
	    url: '/sound/liquidice/top.mp3',
	    type: 'sound'
	  }
	];

	for (i = 0, len = assets.length; i < len; i++) {
	  asset = assets[i];
	  asset.url = settings.base_path + asset.url;
	}

	module.exports = assets;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./blackice/assets": 45,
		"./calvarium/assets": 53,
		"./elements/assets": 89,
		"./epilogue/assets": 69,
		"./hires/assets": 73,
		"./home/assets": 79,
		"./kubik/assets": 83,
		"./liquidice/assets": 87
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 88;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var asset, assets, i, len, settings;

	settings = __webpack_require__(10);

	assets = [
	  {
	    id: 'dodecahedron_sequence',
	    url: '/img/elements/dodecahedron/dodecahedron.frames.json',
	    type: 'sequence'
	  }, {
	    id: 'hexahedron_sequence',
	    url: '/img/elements/hexahedron/hexahedron.frames.json',
	    type: 'sequence'
	  }, {
	    id: 'tetrahedron_sequence',
	    url: '/img/elements/tetrahedron/tetrahedron.frames.json',
	    type: 'sequence'
	  }, {
	    id: 'octahedron_sequence',
	    url: '/img/elements/octahedron/octahedron.frames.json',
	    type: 'sequence'
	  }, {
	    id: 'icosahedron_sequence',
	    url: '/img/elements/icosahedron/icosahedron.frames.json',
	    type: 'sequence'
	  }, {
	    id: 'background',
	    url: '/sound/elements/background.mp3',
	    type: 'sound'
	  }, {
	    id: 'aether',
	    url: '/sound/elements/aether.mp3',
	    type: 'sound'
	  }, {
	    id: 'air',
	    url: '/sound/elements/air.mp3',
	    type: 'sound'
	  }, {
	    id: 'earth',
	    url: '/sound/elements/earth.mp3',
	    type: 'sound'
	  }, {
	    id: 'fire',
	    url: '/sound/elements/fire.mp3',
	    type: 'sound'
	  }, {
	    id: 'water',
	    url: '/sound/elements/water.mp3',
	    type: 'sound'
	  }
	];

	for (i = 0, len = assets.length; i < len; i++) {
	  asset = assets[i];
	  asset.url = settings.base_path + asset.url;
	}

	module.exports = assets;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./blackice/config": 91,
		"./calvarium/config": 51,
		"./elements/config": 92,
		"./epilogue/config": 64,
		"./hires/config": 72,
		"./home/config": 76,
		"./kubik/config": 82,
		"./liquidice/config": 86
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 90;


/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = {
	  fog_enabled: true,
	  transition_debug: false,
	  camera_fov: 55,
	  "path_in": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 500
	    }, {
	      "x": 0,
	      "y": 0,
	      "z": 80
	    }
	  ],
	  "path_in_lookat": {
	    "x": 0,
	    "y": 0,
	    "z": 0
	  },
	  "path_out": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 80
	    }, {
	      "x": 0,
	      "y": -40.57142857142857,
	      "z": 71
	    }, {
	      "x": 0,
	      "y": -90.85714285714286,
	      "z": 10
	    }
	  ],
	  "path_out_lookat": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 0
	    }, {
	      "x": 0,
	      "y": -100,
	      "z": 0
	    }
	  ],
	  camera_in_duration: 10,
	  camera_out_duration: 2,
	  fog_in_duration: 10,
	  fog_out_duration: 3,
	  fog_in_start: 0.01,
	  fog_in_end: 0.001,
	  fog_out_start: 0.001,
	  fog_out_end: 0.1,
	  audio_pos_z_in: -10,
	  audio_pos_z_out: 15,
	  iteration_preset: [
	    {
	      movement_speed: 0.02,
	      vel_x: -200
	    }, {
	      movement_speed: 0.05,
	      vel_x: -250
	    }, {
	      movement_speed: 0.07,
	      vel_x: -280
	    }
	  ]
	};


/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = {
	  fog_enabled: true,
	  transition_debug: false,
	  camera_fov: 35,
	  "path_in": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 400
	    }, {
	      "x": 0,
	      "y": 0,
	      "z": 40
	    }
	  ],
	  "path_in_lookat": {
	    "x": 0,
	    "y": 0,
	    "z": 0
	  },
	  "path_out": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": 40
	    }, {
	      "x": 0,
	      "y": -27,
	      "z": 0
	    }, {
	      "x": 0,
	      "y": -60,
	      "z": -20
	    }
	  ],
	  "path_out_lookat": [
	    {
	      "x": 0,
	      "y": 0,
	      "z": -190
	    }, {
	      "x": 0,
	      "y": -260,
	      "z": -190
	    }
	  ],
	  camera_in_duration: 10,
	  camera_out_duration: 5,
	  fog_in_duration: 10,
	  fog_out_duration: 5,
	  fog_in_start: 0.1,
	  fog_in_end: 0.01,
	  fog_out_start: 0.01,
	  fog_out_end: 0.1,
	  audio_pos_z_in: 35,
	  audio_pos_z_out: 15,
	  cam_move_bounds: 0.5,
	  sphere_radius: 30,
	  geometry: '',
	  iteration: 0,
	  radius: 0,
	  scale_ratio: 0,
	  deform: 0,
	  color: '#ffffff',
	  wireframe: true,
	  wireframe_thickness: 0,
	  blending: '',
	  opacity: 0.35,
	  fog_near: 0.029,
	  fog_far: 0.009,
	  cam_zoom_percent: 1,
	  geometries: {
	    "dodecahedron": {
	      "geometry": "DodecahedronGeometry",
	      "iteration": 2,
	      "radius": 20,
	      "scale_ratio": 3.61803399,
	      "color": "#ffffff",
	      "wireframe": true,
	      "wireframe_thickness": 1.5,
	      "blending": 'NormalBlending',
	      "opacity": 1.0,
	      "rotate": true,
	      "fog": 0.03,
	      "deform": 0,
	      "rotate_x": 0,
	      "rotate_y": 1.06,
	      "rotate_z": 0,
	      "sound": "aether"
	    },
	    "icosahedron": {
	      "geometry": "IcosahedronGeometry",
	      "iteration": 3,
	      "radius": 20,
	      "scale_ratio": 2.61803399,
	      "color": "#ffffff",
	      "wireframe": true,
	      "wireframe_thickness": 1.5,
	      "blending": 'NormalBlending',
	      "opacity": 1.0,
	      "rotate": true,
	      "fog": 0.03,
	      "deform": 0,
	      "rotate_x": 1.27,
	      "rotate_y": 1.06,
	      "rotate_z": 0,
	      "sound": "water"
	    },
	    "tetrahedron": {
	      "geometry": "TetrahedronGeometry",
	      "iteration": 6,
	      "radius": 20,
	      "scale_ratio": 2,
	      "color": "#ffffff",
	      "wireframe": true,
	      "wireframe_thickness": 1.5,
	      "blending": 'NormalBlending',
	      "opacity": 1.0,
	      "rotate": true,
	      "fog": 0.03,
	      "deform": 0,
	      "rotate_x": 0,
	      "rotate_y": 0.99,
	      "rotate_z": 2.26,
	      "sound": "fire"
	    },
	    "octahedron": {
	      "geometry": "OctahedronGeometry",
	      "iteration": 5,
	      "radius": 20,
	      "scale_ratio": 2,
	      "color": "#ffffff",
	      "wireframe": true,
	      "wireframe_thickness": 1.5,
	      "blending": 'NormalBlending',
	      "opacity": 1.0,
	      "rotate": true,
	      "fog": 0.046,
	      "deform": 0,
	      "rotate_x": 0.21,
	      "rotate_y": 0,
	      "rotate_z": 0,
	      "sound": "air"
	    },
	    "hexahedron": {
	      "geometry": "BoxGeometry",
	      "iteration": 4,
	      "radius": 20,
	      "scale_ratio": 2.4,
	      "color": "#ffffff",
	      "wireframe": true,
	      "wireframe_thickness": 1.5,
	      "blending": 'NormalBlending',
	      "opacity": 1.0,
	      "rotate": true,
	      "fog": 0.03,
	      "deform": 0,
	      "rotate_x": 0.49,
	      "rotate_y": Math.PI / 4,
	      "rotate_z": 0,
	      "sound": "earth"
	    }
	  }
	};


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var Navigation, View, gui, router, routes, scenes,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	gui = __webpack_require__(11);

	scenes = __webpack_require__(39);

	router = __webpack_require__(21);

	routes = __webpack_require__(22);

	View = __webpack_require__(94);

	module.exports = Navigation = (function() {
	  function Navigation(id1) {
	    var data;
	    this.id = id1;
	    this.disable = bind(this.disable, this);
	    this.enable = bind(this.enable, this);
	    this.on_url_change = bind(this.on_url_change, this);
	    this.gui = gui.addFolder("controller::navigation");
	    this.gui.open();

	    /*
	    		Get chapters
	     */
	    data = scenes.all();
	    this.view = new View(this.gui, data);
	    this.bind();
	    this.on_url_change(router.get_url());
	  }

	  Navigation.prototype.bind = function() {
	    this.view.on('click', this.navigate);
	    router.on('go', this.on_url_change);
	    router.on('nav:disable', this.disable);
	    return router.on('nav:enable', this.enable);
	  };

	  Navigation.prototype.navigate = function(id) {
	    var i, len, next_route, route;
	    next_route = null;
	    for (i = 0, len = routes.length; i < len; i++) {
	      route = routes[i];
	      if (route.id.match(id)) {
	        next_route = route;
	        break;
	      }
	    }
	    return router.go(next_route.url);
	  };

	  Navigation.prototype.on_url_change = function() {
	    var chapter, current_chapter, data, i, len, url;
	    url = router.get_url();
	    url = url.slice(1, url.length);
	    data = scenes.all();
	    current_chapter = null;
	    for (i = 0, len = data.length; i < len; i++) {
	      chapter = data[i];
	      if (chapter.id.match(url)) {
	        current_chapter = chapter;
	        break;
	      }
	    }
	    return this.view.update(current_chapter);
	  };

	  Navigation.prototype.enable = function() {
	    return this.view.enable();
	  };

	  Navigation.prototype.disable = function() {
	    return this.view.disable();
	  };

	  return Navigation;

	})();


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var Navigation, happens,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	happens = __webpack_require__(8);

	module.exports = Navigation = (function() {
	  Navigation.prototype.ui = {
	    'chapters': 'li a'
	  };

	  function Navigation(gui, data) {
	    this.gui = gui;
	    this.data = data;
	    this.on_click = bind(this.on_click, this);
	    this.disable = bind(this.disable, this);
	    this.enable = bind(this.enable, this);
	    happens(this);
	    this.render();
	  }

	  Navigation.prototype.render = function() {

	    /*
	    		Template
	     */
	    var id, key, ref, template;
	    template = __webpack_require__(95);
	    $('main').append(template({
	      data: this.data
	    }));
	    this.el = $('#navigation');
	    ref = this.ui;
	    for (key in ref) {
	      id = ref[key];
	      this.ui[key] = this.el.find(id);
	    }
	    this.transition_in();
	    this.bind();
	    return this.disable();
	  };

	  Navigation.prototype.bind = function() {
	    return this.ui.chapters.on('click', this.on_click);
	  };

	  Navigation.prototype.unbind = function() {
	    return this.ui.chapters.off('click', this.on_click);
	  };

	  Navigation.prototype.enable = function() {
	    return this.ui.chapters.removeClass('disable');
	  };

	  Navigation.prototype.disable = function() {
	    return this.ui.chapters.addClass('disable');
	  };

	  Navigation.prototype.on_click = function(event) {
	    var id;
	    event.preventDefault();
	    id = $(event.currentTarget).data('id');
	    return this.emit('click', id);
	  };

	  Navigation.prototype.transition_in = function() {
	    var params;
	    params = {
	      autoAlpha: 1,
	      ease: Power1.easeInOut,
	      delay: 0.5
	    };
	    return TweenLite.to(this.el, 2, params);
	  };

	  Navigation.prototype.update = function(chapter) {
	    this.ui.chapters.removeClass('active');
	    return this.el.find("a[data-id=" + chapter.id + "]").addClass('active');
	  };

	  return Navigation;

	})();


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(43);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (undefined) {
	buf.push("<div id=\"navigation\" class=\"section layer layer-10\"><div class=\"content\"><nav><ul>");
	// iterate locals.data
	;(function(){
	  var $$obj = locals.data;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var data = $$obj[$index];

	buf.push("<li><a href=\"#\"" + (jade.attr("data-id", "" + (data.id) + "", true, false)) + "><span class=\"title\">" + (jade.escape((jade_interp = data.nav_title) == null ? '' : jade_interp)) + "</span><span class=\"ch\">" + (jade.escape((jade_interp = data.chapter) == null ? '' : jade_interp)) + "</span></a></li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var data = $$obj[$index];

	buf.push("<li><a href=\"#\"" + (jade.attr("data-id", "" + (data.id) + "", true, false)) + "><span class=\"title\">" + (jade.escape((jade_interp = data.nav_title) == null ? '' : jade_interp)) + "</span><span class=\"ch\">" + (jade.escape((jade_interp = data.chapter) == null ? '' : jade_interp)) + "</span></a></li>");
	    }

	  }
	}).call(this);

	buf.push("</ul></nav></div></div>");}.call(this,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var Konami, Loader, Sticker, settings, utils, win,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	utils = __webpack_require__(34);

	settings = __webpack_require__(10);

	Loader = __webpack_require__(26);

	win = __webpack_require__(9);

	module.exports = Konami = (function() {
	  Konami.prototype.num_stickers = 35;

	  function Konami() {
	    this.omg = bind(this.omg, this);
	    this.lols = bind(this.lols, this);
	    var id, key, kkeys, konami, ref;
	    this.el = $('body');
	    this.ui = {
	      'main': 'main'
	    };
	    ref = this.ui;
	    for (key in ref) {
	      id = ref[key];
	      this.ui[key] = this.el.find(id);
	    }

	    /*
	    		http://www.paulirish.com/2009/cornify-easter-egg-with-jquery/
	    		up, up, down, down, left, right, left, right, b, a
	     */
	    kkeys = [];
	    konami = '38,38,40,40,37,39,37,39,66,65';
	    $(document).keydown((function(_this) {
	      return function(e) {
	        kkeys.push(e.keyCode);
	        if (kkeys.toString().indexOf(konami) >= 0) {
	          $(document).unbind('keydown', arguments.callee);
	          _this.wtf();
	          return kkeys = [];
	        }
	      };
	    })(this));
	  }

	  Konami.prototype.wtf = function() {
	    win.on('resize', this.omg);
	    this.ui.main.addClass('konami');
	    this.loader = new Loader;
	    this.loader.add('images', settings.base_path + '/img/konami/images.json', 'json');
	    this.loader.add('lol', settings.base_path + '/sound/konami/lol.mp3', 'sound');
	    this.loader.once('loaded', this.lols);
	    return this.loader.load();
	  };

	  Konami.prototype.lols = function(manifest) {
	    var data, i, j, ref, results, sound, start_delay;
	    data = this.loader.get_asset('images').data.images;
	    sound = this.loader.get_asset('lol').data;
	    sound.play();
	    sound.loop(true);
	    this.stickers = [];
	    results = [];
	    for (i = j = 0, ref = this.num_stickers; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      start_delay = i * 0.2;
	      results.push(this.stickers.push(new Sticker(start_delay, data)));
	    }
	    return results;
	  };

	  Konami.prototype.omg = function() {
	    var i, j, k, len, ref, ref1, results, sticker, total;
	    if (win.width < 1280) {
	      total = 15;
	    } else if (win.width < 1440) {
	      total = 25;
	    } else {
	      total = this.num_stickers;
	    }
	    ref = this.stickers;
	    for (j = 0, len = ref.length; j < len; j++) {
	      sticker = ref[j];
	      sticker.hide();
	    }
	    results = [];
	    for (i = k = 0, ref1 = total; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
	      results.push(this.stickers[i].show());
	    }
	    return results;
	  };

	  return Konami;

	})();

	Sticker = (function() {
	  function Sticker(delay, data1) {
	    this.data = data1;
	    this.img = $('<img/>');
	    this.img.addClass('sticker');
	    $('body').append(this.img);
	    utils.delay(delay, (function(_this) {
	      return function() {
	        return _this.random();
	      };
	    })(this));
	  }

	  Sticker.prototype.src = function() {
	    var src;
	    src = this.data[Math.floor(Math.random() * this.data.length)];
	    return this.img.attr('src', settings.base_path + '/img/konami/' + src);
	  };

	  Sticker.prototype.random = function() {
	    var delay, transform;
	    this.src();
	    transform = "scale(" + (utils.random(0.3, 1)) + ")";
	    this.img.css({
	      'left': utils.random(0, win.width * 0.8) + 'px',
	      'top': utils.random(0, win.height * 0.8) + 'px',
	      'transform': transform
	    });
	    delay = utils.random(5, 10);
	    return utils.delay(delay, (function(_this) {
	      return function() {
	        _this.start_delay = 0;
	        return _this.random();
	      };
	    })(this));
	  };

	  Sticker.prototype.show = function() {
	    return this.img.css('display', 'block');
	  };

	  Sticker.prototype.hide = function() {
	    return this.img.css('display', 'none');
	  };

	  return Sticker;

	})();


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var device, dictionary, settings;

	dictionary = __webpack_require__(38);

	settings = __webpack_require__(10);

	device = __webpack_require__(4);

	module.exports = (function() {
	  function _Class() {
	    var locals, template;
	    template = __webpack_require__(98);
	    locals = {
	      dictionary: dictionary,
	      base_path: settings.base_path,
	      device: device.device
	    };
	    $('body').append(template(locals));
	  }

	  return _Class;

	})();


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(43);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (dictionary) {
	buf.push("<div id=\"unsupported\" class=\"section layer layer-1\"><div class=\"content\"><h1 class=\"hi_res layer layer-1\"><a href=\"http://hi-res.net\" title=\"Hi-ReS!\"></a></h1><div class=\"message layer\"><div class=\"the-future\"><img" + (jade.attr("src", "" + (locals.base_path) + "/img/ui/nyan.gif", true, false)) + " class=\"nyan layer layer-1\"/><img" + (jade.attr("src", "" + (locals.base_path) + "/img/ui/ibm.png", true, false)) + " class=\"ibm layer layer-2\"/></div><h2>" + (jade.escape((jade_interp = dictionary.get('unsupported_title')) == null ? '' : jade_interp)) + "</h2>");
	if ( locals.device)
	{
	buf.push("" + (((jade_interp = dictionary.get('unsupported_text_device')) == null ? '' : jade_interp)) + "");
	}
	else
	{
	buf.push("" + (((jade_interp = dictionary.get('unsupported_text_desktop')) == null ? '' : jade_interp)) + "");
	}
	buf.push("</div></div></div>");}.call(this,"dictionary" in locals_for_with?locals_for_with.dictionary:typeof dictionary!=="undefined"?dictionary:undefined));;return buf.join("");
	}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var dictionary;

	dictionary = __webpack_require__(38);

	module.exports = (function() {
	  function _Class() {
	    var locals, template;
	    template = __webpack_require__(100);
	    locals = {
	      dictionary: dictionary
	    };
	    $('body').append(template(locals));
	  }

	  return _Class;

	})();


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(43);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (dictionary) {
	buf.push("<div id=\"notfound\" class=\"section layer layer-1\"><div class=\"content\"><h1 class=\"hi_res layer layer-1\"></h1><div class=\"message layer\"><img" + (jade.attr("src", "" + (locals.base_path) + "/img/ui/404.jpg", true, false)) + "/><h2>" + (jade.escape((jade_interp = dictionary.get('notfound_title')) == null ? '' : jade_interp)) + "</h2></div></div></div>");}.call(this,"dictionary" in locals_for_with?locals_for_with.dictionary:typeof dictionary!=="undefined"?dictionary:undefined));;return buf.join("");
	}

/***/ },
/* 101 */
/***/ function(module, exports) {

	var Cursor;

	Cursor = (function() {
	  var cursors;

	  function Cursor() {}

	  cursors = ['not-allowed', 'help', 'move', 'all-scroll', 'sw-resize'];

	  Cursor.prototype._random_to = null;

	  Cursor.prototype.random = function() {
	    var funk;
	    funk = (function(_this) {
	      return function() {
	        var cursor;
	        cursor = Math.floor(Math.random() * cursors.length);
	        $('body').css({
	          cursor: cursors[cursor]
	        });
	        return _this._random_to = setTimeout(arguments.callee, Math.random() * 5000);
	      };
	    })(this);
	    return funk();
	  };

	  Cursor.prototype.stop_random = function() {
	    return clearTimeout(this._random_to);
	  };

	  return Cursor;

	})();

	module.exports = new Cursor;


/***/ }
/******/ ]);