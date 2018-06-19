/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./single-courses.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./modules/data.js":
/*!*************************!*\
  !*** ./modules/data.js ***!
  \*************************/
/*! exports provided: data, error404, preloader, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"data\", function() { return data; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"error404\", function() { return error404; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"preloader\", function() { return preloader; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ \"./modules/render.js\");\n\n\nvar reqKeys = ['section', 'subsec', 'video', 'question']\nvar reqValues = location.pathname.split('/').filter(String)\n\nvar settings = {\n\tautoplay : 0,\n\tactiveColor : $('body').css('color')\n}\nvar error404 = function() {\n\ttry {\n\t\tthrow new Error('Resource not found. Please use the course links to navigate to your desired content.');\n\t} catch (e) {\n\t\t_render_js__WEBPACK_IMPORTED_MODULE_0__[\"render\"].title(e);\n\t}\n}\n\n\nvar data = {\n  activeVid : '188703514',\n  object : null,\n  objectify : function(x){\n    this.object = JSON.parse(x);\n  },\n  get : function() {return localStorage.getItem('course_data')},\n  set : function(data) {return localStorage.setItem('course_data',JSON.stringify(data));},\n  update : {\n    get : function() {return localStorage.getItem('__c-update')},\n    set : function() {return localStorage.setItem('__c-update',Math.floor(Date.now()/1000));}\n  },\n  request : function(cdata,method) {\n    $.ajax({\n      url: stajax.rest.url+'/course_data/'+stajax.rest.ID+'/',\n      data: cdata || null,\n      type: method || 'GET',\n      headers: {},\n      success: function(r) {\n        data.update.set();\n        data.set(r);\n       },\n      error: function(x,s,e) {\n        console.log(x,s,e);\n      }\n    })\n  },\n  reset : function(cb) {\n    localStorage.removeItem('course_data');\n    localStorage.removeItem('__c-update');\n    return typeof cb === 'function' && cb()\n  }\n}\n\nvar preloader = {\n  html : '<div class=\"course-preloader\"><div style=\"text-align:center\"><img src=\"'+stajax.contentURL+'/i/sttv-spinner.gif\" /><h3 style=\"text-transform:uppercase;font-weight:700\">Loading</h3></div></div>',\n  fade : function() {\n    $('.course-preloader').fadeToggle(500);\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/data.js?");

/***/ }),

/***/ "./modules/downloads.js":
/*!******************************!*\
  !*** ./modules/downloads.js ***!
  \******************************/
/*! exports provided: downloads */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"downloads\", function() { return downloads; });\nvar downloads = {\n  container : '<div class=\"modal-downloads-container row\"></div>',\n  get : function(s,cb){\n    var cont = $(this.container);\n    $('.modal-loading-overlay').fadeIn(250);\n    $('#course_modal').modal('open');\n    cont.append('<h1><span>'+s+'</span> Downloads</h1>')\n\n    var obj = courses.data.object,\n      res = (typeof obj.sections[s] === 'undefined') ? obj.practice.resources : obj.sections[s].resources;\n\n    var inner = $('<div/>',{\n      \"class\" : \"dls-inner\"\n    });\n\n    if (res.length === 0) {\n      inner.append($('<div/>',{\"class\":\"col s12\",text:\"No downloads found\"}))\n    } else {\n      $.each(res,function(k,v){\n        inner.append($('<a/>',{\n          \"class\" : \"dl-link col s6 m4\",\n          text : k,\n          href : stajax.dlURL+\"?res=\"+k+\"&section=\"+s+\"&test=\"+obj.test+\"&checksum=\"+v\n        }))\n      })\n    }\n    inner.appendTo(cont)\n    cont.appendTo($('.modal-content','#course_modal'))\n\n    typeof cb === 'function' && cb();\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/downloads.js?");

/***/ }),

/***/ "./modules/feedback.js":
/*!*****************************!*\
  !*** ./modules/feedback.js ***!
  \*****************************/
/*! exports provided: feedback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"feedback\", function() { return feedback; });\nvar feedback = {\n  run : function() {\n    $('.modal-loading-overlay').fadeIn(250);\n    $('#course_modal').modal('open');\n    this.req('GET',null,function(e){\n        $('#course_modal .modal-content').append(e.templateHtml)\n        $('.modal-loading-overlay').fadeOut(250)\n      }\n    )\n  },\n  req : function(m,d,suc,err) {\n    _st.request(\n      {\n        method : m,\n        route : stajax.rest.url+'/feedback',\n        cdata : d || {},\n        headers : {'X-WP-Nonce' : stajax.rest.nonce,'Content-Type':'application/json'},\n        success : function(e){\n          typeof suc === 'function' && suc(e);\n        },\n        error: function(z){\n          console.log(z);\n          typeof err === 'function' && err(z);\n        }\n      }\n    );\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/feedback.js?");

/***/ }),

/***/ "./modules/history.js":
/*!****************************!*\
  !*** ./modules/history.js ***!
  \****************************/
/*! exports provided: backHist, pushHist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"backHist\", function() { return backHist; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pushHist\", function() { return pushHist; });\n/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader.js */ \"./modules/loader.js\");\n\n\nvar backHist = function(r) {\n\t_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"setup\"].newRequest(r);\n}\n\nvar pushHist = function(obj,url,cb) {\n\t\turl = url.replace('https://api.supertutortv.com/', 'http://localhost:8888/')\n\t\twindow.history.pushState(obj, document.title, url);\n\t\ttypeof cb === 'function' && cb();\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/history.js?");

/***/ }),

/***/ "./modules/loader.js":
/*!***************************!*\
  !*** ./modules/loader.js ***!
  \***************************/
/*! exports provided: data, reqState, downloads, error404, init, log, modal, preloader, render, settings, setup, shutdown, student */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reqState\", function() { return reqState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setup\", function() { return setup; });\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./modules/data.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"data\", function() { return _data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"error404\", function() { return _data_js__WEBPACK_IMPORTED_MODULE_0__[\"error404\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return _data_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"]; });\n\n/* harmony import */ var _downloads_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./downloads.js */ \"./modules/downloads.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"downloads\", function() { return _downloads_js__WEBPACK_IMPORTED_MODULE_1__[\"downloads\"]; });\n\n/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./log.js */ \"./modules/log.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return _log_js__WEBPACK_IMPORTED_MODULE_2__[\"log\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"student\", function() { return _log_js__WEBPACK_IMPORTED_MODULE_2__[\"student\"]; });\n\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal.js */ \"./modules/modal.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"modal\", function() { return _modal_js__WEBPACK_IMPORTED_MODULE_3__[\"modal\"]; });\n\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render.js */ \"./modules/render.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"]; });\n\n/* harmony import */ var _shutdown_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shutdown.js */ \"./modules/shutdown.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"preloader\", function() { return _shutdown_js__WEBPACK_IMPORTED_MODULE_5__[\"preloader\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"shutdown\", function() { return _shutdown_js__WEBPACK_IMPORTED_MODULE_5__[\"shutdown\"]; });\n\n\n\n\n\n\n\n\nvar reqState = {}\nvar reqKeys = ['content', 'coursename', 'section', 'subsec', 'video', 'question']\nvar reqValues = location.pathname.split('/').filter(String)\nwhile (reqKeys.length > 0){\n\treqState[reqKeys.shift()] = reqValues.shift()\n}\n\nvar setState = function (r){\n\tfor (var i in reqState) {\n\t\treqState[i] = r[i]\n\t}\n}\n\nvar init = function(){\n  if (_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].object === null || Date.now()/1000 - ctrl > 86400) { //86400\n    _data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].reset(\n      _data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].request()\n    );\n  }\n\t_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].objectify(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].get())\n  var ctrl = parseInt(localStorage.getItem('__c-update'));\n  $(document).queue('heartbeat',()=>{\n    console.log('first heartbeat')\n  })\n  _log_js__WEBPACK_IMPORTED_MODULE_2__[\"log\"].access()\n\n  function finish_init() {\n\t\t\t_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].objectify(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].get())\n\t\t  if (_log_js__WEBPACK_IMPORTED_MODULE_2__[\"student\"].alerts.dismissed() === null){\n\t\t    localStorage.setItem('alertsDismissed',JSON.stringify([]));\n\t\t  }\n\t\t  if (JSON.parse(_log_js__WEBPACK_IMPORTED_MODULE_2__[\"student\"].alerts.dismissed()).indexOf(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].object.hash) === -1) {\n\t\t\t\tvar al = JSON.parse(_log_js__WEBPACK_IMPORTED_MODULE_2__[\"student\"].alerts.dismissed())\n\t\t\t\tal.push(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].object.hash)\n\t\t\t\tconsole.log(al)\n\t\t\t\tlocalStorage.setItem('alertsDismissed',JSON.stringify(al))\n\t\t    _modal_js__WEBPACK_IMPORTED_MODULE_3__[\"modal\"].init({\n\t\t      dismissible : false,\n\t\t      complete : function(){\n\t\t        _modal_js__WEBPACK_IMPORTED_MODULE_3__[\"modal\"].destroy()\n\t\t        _modal_js__WEBPACK_IMPORTED_MODULE_3__[\"modal\"].init()\n\t\t      }\n\t\t    },function() {\n\t\t\t\t\tconsole.log('this works')\n\t\t      $(document).queue('afterload',function(){\n\t\t        $('.modal-loading-overlay').fadeIn(250);\n\t\t        $('#course_modal').modal('open');\n\t\t        _modal_js__WEBPACK_IMPORTED_MODULE_3__[\"modal\"].alert(function(d) {\n\t\t          $('#course_modal .modal-content').append(d.html);\n\t\t          $('.modal-loading-overlay').fadeOut(250);\n\t\t        });\n\t\t      })\n\t\t    })\n\t\t  } else {\n\t\t    _modal_js__WEBPACK_IMPORTED_MODULE_3__[\"modal\"].init();\n\t\t  }\n\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].title('')\n    clearInterval(checker);\n\n    console.log('Initialized!');\n\n    setup.run();\n  }\n  var checker = setInterval(function(){\n    if (_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].get() == null) {\n      console.log('localStorage not set');\n      return;\n    }\n\n    finish_init();\n  },100);\n}\n\nvar setup = {\n  processRequest : function() {\n\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].title('')\n    var obj = _data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].object;\n    var req;\n\n\t\tvar q = reqState.question,\n      v = reqState.video,\n      b = reqState.subsec,\n      s = reqState.section\n\n    if (obj.sections[s] != null && obj.sections[s].restricted) {\n\t\t\tvar sec = '#'+reqState.section+' .video-text';\n\t\t\t$(sec).text(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].object.sections[reqState.section].restricted);\n      return\n    }\n\t\ttry {\n\t\t\t\tif (s === 'practice') {\n\t\t\t\t if (q && obj.practice.tests[b].subsec[v].videos[q]) {\n\t\t\t\t\t \t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].singleVid(obj.practice.tests[b].subsec[v].videos[q]);\n\t\t\t    } else if (v && obj.practice.tests[b].subsec[v]) {\n\t\t\t\t\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].courseSidebar();\n\t\t\t    } else {\n\t\t\t\t\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].courseSidebar();\n\t\t\t\t\t}\n\t\t\t\t} else if (s) {\n\t\t\t\t\tif (q) {\n\t\t\t\t\t\tObject(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"error404\"])()\n\t\t\t\t\t\treturn\n\t\t\t\t\t} else if (v && obj.sections[s].subsec[b].videos[v]) {\n\t\t\t\t\t\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].singleVid(obj.sections[s].subsec[b].videos[v]);\n\t\t\t    } else if (b && obj.sections[s].subsec[b]) {\n\t\t\t\t\t\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].courseSidebar();\n\t\t\t\t\t\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].stage.changeActiveVid(obj.sections[s].subsec[b],'Intro');\n\t\t\t    } else {\n\t\t\t        if (typeof obj.sections[s] === 'undefined') {\n\t\t\t\t\t\t\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].singleVid(obj.sections[s]);\n\t\t\t        } else {\n\t\t\t\t\t\t\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].stage.changeActiveVid(obj.sections[s].intro,'Intro');\n\t\t\t\t\t\t\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].courseSidebar();\n\t\t\t        }\n\t\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\treturn\n\t\t\t\t\t// Should render the 'root' option here\n\t\t    }\n\t   } catch (e) {\n\t\t\t console.log(e)\n\t\t\t Object(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"error404\"])()\n\t\t\t return\n\t\t}\n\treturn req;\n\t},\n  newRequest : function(l) {\n\t\tsetState(JSON.parse(l))\n\t\t_render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].courseSidebar()\n\t\tthis.processRequest();\n  },\n  run : function() {\n    try {\n      _render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].courseNav();\n      _render_js__WEBPACK_IMPORTED_MODULE_4__[\"render\"].courseSidebar();\n\t\t\tthis.processRequest()\n    } catch (err) {\n      console.log(err);\n    }\n    console.log('Setup complete');\n    if (typeof _log_js__WEBPACK_IMPORTED_MODULE_2__[\"student\"].firstName !== 'undefined') {\n      $('div.user-bug > div > span').text('Hi '+_log_js__WEBPACK_IMPORTED_MODULE_2__[\"student\"].firstName+'!')\n    }\n    setTimeout(function() {Object(_shutdown_js__WEBPACK_IMPORTED_MODULE_5__[\"shutdown\"])()},1000);\n  },\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/loader.js?");

/***/ }),

/***/ "./modules/log.js":
/*!************************!*\
  !*** ./modules/log.js ***!
  \************************/
/*! exports provided: log, student */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return log; });\n/* harmony import */ var _student_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./student.js */ \"./modules/student.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"student\", function() { return _student_js__WEBPACK_IMPORTED_MODULE_0__[\"student\"]; });\n\n\n\nvar log = {\n  access : function() {\n    _st.request({\n      route : stajax.rest.url+'/course_log',\n      method : 'POST',\n      headers : {'X-WP-Nonce' : stajax.rest.nonce},\n      cdata : {\n        user : _student_js__WEBPACK_IMPORTED_MODULE_0__[\"student\"].userName,\n        UA : navigator.userAgent,\n        uri : location.href\n      },\n      success : function(d){\n        return this\n      },\n      error : function(x) {\n        console.log(x)\n        return this\n      }\n    })\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/log.js?");

/***/ }),

/***/ "./modules/modal.js":
/*!**************************!*\
  !*** ./modules/modal.js ***!
  \**************************/
/*! exports provided: modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"modal\", function() { return modal; });\nvar modal = {\n  init : function(obj,cb) {\n    var o = (typeof obj === 'object') ? obj : {};\n    if ($('#course_modal').length == 0) {\n      $('<div/>',{id:\"course_modal\",\"class\":\"modal\"})\n        .append($('<div/>',{\"class\":\"modal-loading-overlay\"}).html('<div style=\"text-align:center\"><img src=\"'+stajax.contentURL+'/i/sttv-spinner.gif\" /><h3 class=\"modal-message\" style=\"text-transform:uppercase;font-weight:700\"></h3></div>'))\n        .append($('<div/>',{\"class\":\"modal-content\"}))\n        .prependTo('body');\n    }\n    $('#course_modal').modal({\n      dismissible : (typeof o.dismissible === 'boolean' && !o.dismissible)?false:true,\n      opacity : o.opacity || .5,\n      inDuration : o.in || 500,\n      outDuration : o.out || 500,\n      ready : o.ready || _st.fn,\n      complete : o.complete || function(){\n        $('.modal-content',this).empty();\n      }\n    });\n    typeof cb === 'function' && cb();\n  },\n  destroy : function(cb) {\n    $('#course_modal').remove();\n    typeof cb === 'function' && cb();\n  },\n  alert : function(scb,ecb) {\n    _st.request(\n      {\n        method : 'GET',\n        route : stajax.rest.url+'/course_data/'+stajax.rest.ID+'?alert',\n        headers : {'X-WP-Nonce' : stajax.rest.nonce},\n        success : function(e){\n          typeof scb === 'function' && scb(e);\n        },\n        error: function(z){\n          console.log(z);\n        }\n      }\n    );\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/modal.js?");

/***/ }),

/***/ "./modules/preloader.js":
/*!******************************!*\
  !*** ./modules/preloader.js ***!
  \******************************/
/*! exports provided: preloader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"preloader\", function() { return preloader; });\nvar preloader = {\n  html : '<div class=\"course-preloader\"><div style=\"text-align:center\"><img src=\"'+stajax.contentURL+'/i/sttv-spinner.gif\" /><h3 style=\"text-transform:uppercase;font-weight:700\">Loading</h3></div></div>',\n  fade : function() {\n    $('.course-preloader').fadeToggle(500);\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/preloader.js?");

/***/ }),

/***/ "./modules/ratings.js":
/*!****************************!*\
  !*** ./modules/ratings.js ***!
  \****************************/
/*! exports provided: ratings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ratings\", function() { return ratings; });\nvar ratings = {\n  value : 5,\n  content : 'This course is fantastic! Thx Brooke!',\n  run : function() {\n    $('.modal-loading-overlay').fadeIn(250);\n    $('#course_modal').modal('open');\n    courses.ratings.verify(function(){\n      $('.modal-loading-overlay').fadeOut(250)\n    });\n  },\n  verify : function(cb) {\n    _st.request(\n      {\n        method : 'POST',\n        route : stajax.rest.url+'/reviews/',\n        cdata : {'user_id':course.student.id,'post':courses.salesPage},\n        headers : {'X-WP-Nonce' : stajax.rest.nonce,'Content-Type':'application/json'},\n        success : function(e){\n          $('#course_modal .modal-content').append(e.templateHtml);\n          typeof cb === 'function' && cb();\n        },\n        error: function(z){\n          console.log(z);\n        }\n      }\n    );\n  },\n  submit : function(cb) {\n    $('.modal-loading-overlay').fadeToggle(250);\n    _st.request(\n      {\n        method : 'PUT',\n        route : stajax.rest.url+'/reviews/',\n        cdata : {\n          'user_id':course.student.id,\n          'post':courses.salesPage,\n          'rating':courses.ratings.value,\n          'UA':'STTV REST/' + '--browser: ' + navigator.userAgent,\n          'comment_content':courses.ratings.content\n        },\n        headers : {'X-WP-Nonce' : stajax.rest.nonce,'Content-Type':'application/json'},\n        success : function(e){\n          typeof cb === 'function' && cb(e)\n        },\n        error: function(z){\n          console.log(z);\n        }\n      }\n    );\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/ratings.js?");

/***/ }),

/***/ "./modules/render.js":
/*!***************************!*\
  !*** ./modules/render.js ***!
  \***************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./modules/data.js\");\n/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader.js */ \"./modules/loader.js\");\n\n\n\nvar render = {\n  stage : {\n    iframe : function() {\n      $('.sttv-embed-video>iframe').replaceWith(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].activeVid);\n    },\n    setActiveVid : function(id,title) {\n      var html = '<iframe class=\"sttv-course-player\" src=\"https://player.vimeo.com/video/'+id+'?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&autoplay='+_data_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"].autoplay+'\" width=\"1920\" height=\"1080\" frameborder=\"0\" title=\"'+title+'\" webkitallowfullscreen=\"\" mozallowfullscreen=\"\" allowfullscreen=\"\"></iframe>';\n      _data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].activeVid = html;\n    },\n    changeActiveVid : function(id,title) {\n      this.setActiveVid(id,title);\n      this.iframe();\n    }\n  },\n  title : function(txt) {\n    $('#course-after-title h2').css(\"color\",_data_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"].activeColor).html(txt);\n  },\n  content : function() {\n    //$('.tabs a').css(\"color\",settings.activeColor);\n    //$('.tabs .indicator').css(\"background-color\",settings.activeColor);\n  },\n  courseNav : function() {\n    var obj = _data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].object;\n    var nav = $('<ul/>',{\n      \"class\": \"collapsible\",\n      \"data-collapsible\": \"accordion\",\n      id: \"coursenav\"\n    });\n\n    $.each(obj.sections,function(k,v){\n      var active = (k === _loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section) ? ' active' : '' ;\n      var item = $('<li/>').append($('<div/>',{\n        text: v.name,\n        href : _data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].object.link + '/' + k,\n        style: \"color: \"+v.color,\n        \"data-req\" : JSON.stringify({section:k}),\n        \"class\": \"section-link collapsible-header\"+active,\n      })).append($('<div/>',{\n        \"class\": \"collapsible-body\",\n        html: '<span>'+v.description+'</span>'\n      }).append($('<div/>',{\n        \"class\" : \"collapsible-footer\"\n      })));\n\n      $.each(v.subsec,function(a,b){\n        var sub = $('<a/>',{\n          \"class\" : \"cfooter-subsec-link\",\n          text: b.title,\n          href: \"\",\n          style: \"color:\"+v.color\n        }).prepend('<i class=\"material-icons\">web</i>&nbsp;')\n        $('.collapsible-footer',item).append(sub)\n      });\n\n      $('.collapsible-footer',item).append(\n        $('<a/>',{\n          \"class\": \"cfooter-dl-link\",\n          \"data-sec\":k,\n          href: \"\",\n          text: \"downloads\",\n          style: \"color:\"+v.color\n        }).prepend('<i class=\"material-icons\">cloud_download</i>&nbsp;')\n      )\n\n      item.appendTo(nav);\n    });\n\n    var prac = $('<li/>').append($('<a/>',{\n      text: 'Practice Tests',\n      href: '#practice',\n      \"class\": \"section-link practice-section-link collapsible-header\",\n      \"data-req\" : JSON.stringify({section:'practice'}),\n    })).append($('<div/>',{\n      \"class\": \"collapsible-body\",\n      html: '<span>'+obj.practice.description+'</span>'\n    }).append($('<div/>',{\n      \"class\" : \"collapsible-footer\"\n    })));\n\n    $('.collapsible-footer',prac).append(\n      $('<a/>',{\n        \"class\": \"cfooter-dl-link\",\n        \"data-sec\" : \"practice\",\n        href: \"\",\n        text: \"downloads\",\n        style: \"color:gray\"\n      }).prepend('<i class=\"material-icons\">cloud_download</i>&nbsp;')\n    )\n\n    prac.appendTo(nav);\n\n    nav.appendTo($('#course-nav-container'));\n\n    $(document).queue('shutdown',function(){\n      $('.collapsible').collapsible();\n    })\n  },\n  courseSidebar : function() {\n\t\t\tvar wrap = $('<div/>',{\n\t\t\t\t\"class\" : \"col s12 course-right-sidebar-inner\"\n\t\t\t});\n\t\t\tvar a;\n\t\t\tvar div;\n      var obj = _data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].object\n\n\t\t\tif (!_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section) {\n\t\t\t\treturn false;\n\t\t\t} else if (_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section === 'practice') {\n\t\t\t\tvar sec = obj.practice.tests,\n\t\t\t\t\tsub = obj.practice.tests[_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].subsec];\n\n\t\t\t\t\tswitch (sub) {\n\t\t\t\t\t\tcase undefined:\n\t\t\t\t\t\t\t$.each(sec,function(k,v){\n\t\t\t\t\t\t\t\tvar d = $('<div/>',{\n\t\t\t\t\t\t\t\t\t\"class\" : \"row course-subsection-container\",\n\t\t\t\t\t\t\t\t\t\"style\" : \"background-color:white\"\n\t\t\t\t\t\t\t\t}).append('<h3><p>'+v.name+'</p></h3>');\n\n\t\t\t\t\t\t\t\tswitch (v.subsec) {\n\t\t\t\t\t\t\t\t\tcase undefined:\n\t\t\t\t\t\t\t\t\t\t$('<div/>',{\n\t\t\t\t\t\t\t\t\t\t\t\"class\":\"sidebar-sub-link row valign-wrapper\",\n\t\t\t\t\t\t\t\t\t\t\ttext: v.restricted\n\t\t\t\t\t\t\t\t\t\t}).appendTo(d);\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\tdefault:\n\t\t\t\t\t\t\t\t\t\t$.each(v.subsec,function(key,val){\n\t\t\t\t\t\t\t\t\t\t\tvar aReq = {section:'practice',subsec:k,video:key};\n\t\t\t\t\t\t\t\t\t\t\t$('<a/>',{\n\t\t\t\t\t\t\t\t\t\t\t\t\"class\" : 'course-click',\n\t\t\t\t\t\t\t\t\t\t\t\thref : obj.link+'/practice/'+k+'/'+key,\n\t\t\t\t\t\t\t\t\t\t\t\t\"data-req\" : JSON.stringify(aReq),\n\t\t\t\t\t\t\t\t\t\t\t\ttext : val.title,\n\t\t\t\t\t\t\t\t\t\t\t\tstyle : \"display:block;padding:1em;margin-left:1em\"\n\t\t\t\t\t\t\t\t\t\t\t}).append('').appendTo(d);\n\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\td.appendTo(wrap);\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tdefault:\n\t\t\t\t\t\t\tvar pracSec = sub.subsec[_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].video];\n\n\t\t\t\t\t\t\tvar h = $('<div/>',{\n\t\t\t\t\t\t\t\t\"class\" : \"row course-subsection-container\",\n\t\t\t\t\t\t\t\t\"style\" : \"background-color:white\"\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\th.append('<h3><p>'+pracSec.title+'</p></h3>');\n\n\t\t\t\t\t\t\t$.each(pracSec.videos,function(k,v){\n\t\t\t\t\t\t\t\t\tvar y = {section:_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section,subsec:_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].subsec,video:_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].video,question:v.slug},\n\t\t\t\t\t\t\t\t\tdur = Math.floor(v.time / 60) + 'm '+ (v.time % 60) + 's';\n\n\t\t\t\t\t\t\t\ta = $('<a/>',{\n\t\t\t\t\t\t\t\t\t\"class\" : 'course-click',\n                  id : v.slug,\n\t\t\t\t\t\t\t\t\thref : obj.link+'/'+y.section+'/'+y.subsec+'/'+y.video+'/'+v.slug,\n\t\t\t\t\t\t\t\t\t\"data-req\" : JSON.stringify(y)\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\tdiv = $('<div/>',{\n\t\t\t\t\t\t\t\t\t\"class\":\"sidebar-sub-link row valign-wrapper\"\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\tif (!v){\n\t\t\t\t\t\t\t\t\tdiv.text(\"No videos found in this section\");\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t$('<div/>',{\n\t\t\t\t\t\t\t\t\t\t\"class\":\"col s4\",\n\t\t\t\t\t\t\t\t\t\tstyle: \"padding:0px\"\n\t\t\t\t\t\t\t\t\t}).append($('<img/>',{\n\t\t\t\t\t\t\t\t\t\tsrc : v.thumb,\n\t\t\t\t\t\t\t\t\t\tstyle : \"width:100%;height:auto;display:block\"\n\t\t\t\t\t\t\t\t\t})).appendTo(div);\n\t\t\t\t\t\t\t\t\t$('<div/>',{\n\t\t\t\t\t\t\t\t\t\t\"class\":\"col s8\"\n\t\t\t\t\t\t\t\t\t}).append($('<span/>',{\n\t\t\t\t\t\t\t\t\t\t\"class\" : 'course-video-title',\n\t\t\t\t\t\t\t\t\t\ttext : v.name\n\t\t\t\t\t\t\t\t\t})).append($('<span/>',{\n\t\t\t\t\t\t\t\t\t\t\"class\":\"course-video-duration\",\n\t\t\t\t\t\t\t\t\t\ttext : dur\n\t\t\t\t\t\t\t\t\t})).appendTo(div);\n\t\t\t\t\t\t\t\t\tdiv.appendTo(a);\n\t\t\t\t\t\t\t\t\ta.appendTo(h);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\th.appendTo(wrap);\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t} else {\n\n\t\t\t\t$.each(obj.sections[_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section].subsec, function(key, value){\n\n\t\t\t\t\tvar h = $('<div/>',{\n\t\t\t\t\t\t\"class\" : \"row course-subsection-container\",\n\t\t\t\t\t\t\"style\" : \"background-color:white\"\n\t\t\t\t\t});\n\t\t\t\t\th.append('<h3><p>'+key+'</p></h3>');\n\t\t\t\t\tif (!value.videos){\n\t\t\t\t\t\th.append(\"<span>No videos found in this section</span>\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\t$.each(value.videos,function(k,v){\n\t\t\t\t\t\t\tvar z = {section:_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section,subsec:key,video:v.slug},\n\t\t\t\t\t\t\t\tdur = Math.floor(v.time / 60) + 'm '+ (v.time % 60) + 's';\n\t\t\t\t\t\t\ta = $('<a/>',{\n\t\t\t\t\t\t\t\t\t\"class\" : 'course-click',\n                  id : v.slug,\n\t\t\t\t\t\t\t\t\thref : obj.link+'/'+z.section+'/'+key+'/'+v.slug,\n\t\t\t\t\t\t\t\t\t\"data-req\" : JSON.stringify(z)\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\tdiv = $('<div/>',{\n\t\t\t\t\t\t\t\t\"class\":\"sidebar-sub-link row valign-wrapper\"\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\tif (!v){\n\t\t\t\t\t\t\t\tdiv.text(\"No videos found in this section\");\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t$('<div/>',{\n\t\t\t\t\t\t\t\t\t\"class\":\"col s4\",\n\t\t\t\t\t\t\t\t\tstyle: \"padding:0px\"\n\t\t\t\t\t\t\t\t}).append($('<img/>',{\n\t\t\t\t\t\t\t\t\tsrc : v.thumb,\n\t\t\t\t\t\t\t\t\tstyle : \"width:100%;height:auto;display:block\"\n\t\t\t\t\t\t\t\t})).appendTo(div);\n\n\t\t\t\t\t\t\t\t$('<div/>',{\n\t\t\t\t\t\t\t\t\t\"class\":\"col s8\"\n\t\t\t\t\t\t\t\t}).append($('<span/>',{\n\t\t\t\t\t\t\t\t\t\"class\" : 'course-video-title',\n\t\t\t\t\t\t\t\t\ttext : v.name\n\t\t\t\t\t\t\t\t})).append($('<span/>',{\n\t\t\t\t\t\t\t\t\t\"class\":\"course-video-duration\",\n\t\t\t\t\t\t\t\t\ttext : dur\n\t\t\t\t\t\t\t\t})).appendTo(div);\n\n\t\t\t\t\t\t\t\t/*$('<div/>',{\n\t\t\t\t\t\t\t\t\t\"class\":\"col s2 m1\"\n\t\t\t\t\t\t\t\t}).append('<div class=\"valign-wrapper\"><span>W</span></div>').appendTo(div);*/\n\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tdiv.appendTo(a);\n\t\t\t\t\t\t\ta.appendTo(h);\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t\th.appendTo(wrap);\n\t\t\t\t});\n\t\t\t}\n\t\t\t$('#courses-right-sidebar').empty().append(wrap);\n\t\t},\n  singleVid : function(req) {\n    render.stage.changeActiveVid(req.ID,req.title);\n    var txt = '';\n    var obj = _data_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"].object;\n    var color = _data_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"].activeColor\n    if (_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section === 'practice') {\n      txt = _loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section+' &raquo; ' + obj.practice.tests[_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].subsec].name + ' &raquo; ' + obj.practice.tests[_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].subsec].subsec[_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].video].title + ' &raquo; ' + req.name;\n      color = obj.practice.tests[_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].subsec].color\n    } else {\n      txt = _loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section+' &raquo; ' + _loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].subsec+' &raquo; ' + req.name;\n      color = obj.sections[_loader_js__WEBPACK_IMPORTED_MODULE_1__[\"reqState\"].section].color\n    }\n    render.title(txt)\n    this.highlightVid(req.slug, color)\n  },\n  highlightVid : function(slug, color) {\n    $('.course-click .sidebar-sub-link').css({\"color\" : \"\",\"background-color\" : \"\"}).removeClass('z-depth-1 course-active');\n    $('#' + slug).children('.sidebar-sub-link',this).css(\n      {\n        color: \"white\",\n        \"background-color\": color\n      }\n    ).addClass('z-depth-1 course-active');\n    $('#course-after-title').css('color', color)\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/render.js?");

/***/ }),

/***/ "./modules/shutdown.js":
/*!*****************************!*\
  !*** ./modules/shutdown.js ***!
  \*****************************/
/*! exports provided: shutdown, preloader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shutdown\", function() { return shutdown; });\n/* harmony import */ var _preloader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./preloader.js */ \"./modules/preloader.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"preloader\", function() { return _preloader_js__WEBPACK_IMPORTED_MODULE_0__[\"preloader\"]; });\n\n\n\nvar shutdown = function(){\n  var hb = setInterval(()=>{\n    if ($(document).queue('heartbeat').length >= 1){\n      _st.heartBeat()\n    }\n  }\n  ,3000);\n  _preloader_js__WEBPACK_IMPORTED_MODULE_0__[\"preloader\"].fade()\n  $(document).dequeue('shutdown')\n  console.log('Shutdown complete')\n  $(document).dequeue('afterload')\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/shutdown.js?");

/***/ }),

/***/ "./modules/student.js":
/*!****************************!*\
  !*** ./modules/student.js ***!
  \****************************/
/*! exports provided: student */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"student\", function() { return student; });\nvar student = {\n\tid : '',\n\tuserName : '',\n\tfirstName : '',\n\tlastName : '',\n\talerts : {\n\t\tdismissed : function() {return localStorage.getItem('alertsDismissed')}\n\t}\n}\n\n\n\n\n//# sourceURL=webpack:///./modules/student.js?");

/***/ }),

/***/ "./single-courses.js":
/*!***************************!*\
  !*** ./single-courses.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/loader.js */ \"./modules/loader.js\");\n/* harmony import */ var _modules_feedback_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/feedback.js */ \"./modules/feedback.js\");\n/* harmony import */ var _modules_history_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/history.js */ \"./modules/history.js\");\n/* harmony import */ var _modules_ratings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/ratings */ \"./modules/ratings.js\");\n\n\n\n\n\n\n\n\nvar courses = {\n\tdata : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"data\"],\n\treqState : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"reqState\"],\n\tdownloads : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"downloads\"],\n\terror404 : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"error404\"],\n\tinit : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"init\"],\n\tlog : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"log\"],\n\tmodal : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"modal\"],\n\tpreloader : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"preloader\"],\n\trender : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n\tsettings : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"],\n\tsetup : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"setup\"],\n\tshutdown : _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"shutdown\"],\n\tstudent: _modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"student\"],\n\tfeedback : _modules_feedback_js__WEBPACK_IMPORTED_MODULE_1__[\"feedback\"],\n\tbackHist : _modules_history_js__WEBPACK_IMPORTED_MODULE_2__[\"backHist\"],\n\tpushHist : _modules_history_js__WEBPACK_IMPORTED_MODULE_2__[\"pushHist\"],\n\tratings : _modules_ratings__WEBPACK_IMPORTED_MODULE_3__[\"ratings\"]\n}; //end courses object\n\n\nwindow.onpopstate = function(e){\n\tif (e.state == null) {window.location.reload();}\n\tcourses.backHist(JSON.stringify(e.state));\n};\n\nvar handlers = '.section-link, .course-rating, .course-feedback, .ratings-submit-button, .feedback-submit-button, .course-updater, .cfooter-dl-link, .cfooter-subsec-link, .alert-dismiss';\n\n$(document).on('click',handlers,function(e){\n\te.preventDefault();\n\tvar t = $(this);\n\tvar s = e.handleObj.selector.split(/,\\s+/);\n\tvar c = t.attr('class').split(/\\s+/);\n\n\tvar f = {\n\t\t'alert-dismiss' : function() {\n\t\t\tt.closest('#course_modal').modal('close')\n\t\t},\n\t\t'cfooter-dl-link' : function() {\n\t\t\tcourses.downloads.get(t.attr('data-sec'),function(){\n\t\t\t\t$('.modal-loading-overlay').fadeOut(250)\n\t\t\t})\n\t\t},\n\t\t'cfooter-subsec-link' : function() {\n\t\t\treturn false;\n\t\t},\n\t\t'course-rating' : function() {\n\t\t\tcourses.ratings.run()\n\t\t},\n\t\t'course-feedback' : function() {\n\t\t\tcourses.feedback.run()\n\t\t},\n\t\t'course-updater' : function() {\n\t\t\tif (confirm('Only do this if advised by a technician at SupertutorTV, as access to your course could be broken or interrupted. Are you sure you want to proceed?')){\n\t\t\t\tcourses.data.reset(window.location.reload());\n\t\t\t}\n\t\t},\n\t\t'ratings-submit-button' : function() {\n\t\t\tif (!$('#review-content').val()) {\n\t\t\t\t$('#review-content')\n\t\t\t\t\t.focus()\n\t\t\t\t\t.attr('placeholder','You must enter a review')\n\t\t\t\treturn false\n\t\t\t} else {\n\t\t\t\tcourses.ratings.content = $('#review-content').val()\n\t\t\t}\n\n\t\t\tcourses.ratings.submit(function(data){\n\t\t\t\tif (data.error){\n\t\t\t\t\t$('.modal-error').text(data.error);\n\t\t\t\t} else {\n\t\t\t\t\t$('#course_modal .modal-content').html(data.templateHtml);\n\t\t\t\t}\n\t\t\t\t$('.modal-loading-overlay').fadeToggle(250);\n\t\t\t});\n\t\t},\n\t\t'feedback-submit-button' : function() {\n\t\t\tif (t.hasClass('disabled')){return;}\n\t\t\tvar content = $('#feedback-post-form>textarea').val();\n\t\t\tif (!content){\n\t\t\t\t$('#feedback-post-form>textarea')\n\t\t\t\t\t.focus()\n\t\t\t\t\t.attr('placeholder','You must enter some feedback before you submit')\n\t\t\t\treturn false\n\t\t\t}\n\n\t\t\t$('.modal-loading-overlay').fadeToggle(250);\n\t\t\t_st.request(\n\t\t\t\t{\n\t\t\t\t\tmethod : 'POST',\n\t\t\t\t \troute : stajax.rest.url+'/feedback',\n\t\t\t\t\tcdata : {\n\t\t\t\t\t\tstudent : course.student.id,\n\t\t\t\t\t\tpostID : courses.data.object.id,\n\t\t\t\t\t\tcontent : content\n\t\t\t\t\t},\n\t\t\t\t\theaders : {'X-WP-Nonce' : stajax.rest.nonce,'Content-Type':'application/json'},\n\t\t\t\t \tsuccess : function(e){\n\t\t\t\t\t\t$('.modal-loading-overlay').fadeToggle(250);\n\t\t\t\t\t\tif (e) {\n\t\t\t\t\t\t\t$('#course_modal').modal('close')\n\t\t\t\t\t\t\tMaterialize.toast('Feedback sent. Thanks!', 5000)\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t$('.modal-content').empty().append($('<pre/>',{\n\t\t\t\t\t\t\t\ttext : 'Something went wrong. Please email techsupport@supertutortv.com with your issue.'\n\t\t\t\t\t\t\t}))\n\t\t\t\t\t\t\t$('.modal-loading-overlay').fadeToggle(250);\n\t\t\t\t\t\t}\n\t\t\t\t\t},\n\t\t\t\t\terror: function(x){\n\t\t\t\t\t\tconsole.log('error')\n\t\t\t\t\t\t$('.modal-content').empty().append($('<pre/>',{\n\t\t\t\t\t\t\ttext : JSON.stringify(x[0]['responseJSON'])\n\t\t\t\t\t\t}))\n\t\t\t\t\t\t$('.modal-loading-overlay').fadeToggle(250);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t);\n\t\t},\n\t\t'section-link' : function() {\n\t\t\tvar d = JSON.parse(t.attr('data-req'));\n\t\t\tvar a = courses.setup.newRequest(t.attr('data-req'));\n\t\t\tvar b = courses.data.object.link+'/'+d.section;\n\t\t\tcourses.pushHist(_modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"reqState\"],b,function(){\n\t\t\t\t$('.indicator').css('background-color',t.css('color'));\n\t\t\t});\n\t\t}\n\t}\n\tc.some(function(v){typeof f[v] !== 'undefined' && f[v]()});\n});\n\n// Reads Vimeo Player\n$(window).on('load',function() {\n\tvar video = document.querySelector('iframe.sttv-course-player');\n\tvar player = new Vimeo.Player(video);\n\tplayer.on('timeupdate',function(d){\n\t\tif (d.percent<0.5) {\n\t\t\treturn false;\n\t\t} else {\n\t\t\tconsole.log(d)\n\t\t}\n\t});\n})\n\n$(document).on('click','.course-click',function(e) {\n\t\te.preventDefault();\n\t\tvar t = this,\n\t\t\to = $(t).attr('data-req'),\n\t\t\tg = $(t).attr('href'),\n\t\t\ta = courses.setup.newRequest(o)\n\n\t\tcourses.pushHist(_modules_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"reqState\"],g);\n\t}\n);\n\n$(document).on({\n\tclick : function(){\n\t\tvar onStar = parseInt($(this).data('value'), 10); // The star currently selected\n\t\tvar stars = $(this).parent().children('li.star');\n\t\tfor (i = 0; i < stars.length; i++) {\n\t\t  $(stars[i]).removeClass('selected');\n\t\t}\n\n\t\tfor (i = 0; i < onStar; i++) {\n\t\t  $(stars[i]).addClass('selected');\n\t\t}\n\n\t\tcourses.ratings.value = onStar;\n\t},\n\tmouseover: function(){\n\t\tvar onStar = parseInt($(this).data('value'), 10); // The star currently mouse on\n\n\t\t// Now highlight all the stars that's not after the current hovered star\n\t\t$(this).parent().children('li.star').each(function(e){\n\t\t  if (e < onStar) {\n\t\t\t$(this).addClass('hover');\n\t\t  }\n\t\t  else {\n\t\t\t$(this).removeClass('hover');\n\t\t  }\n\t\t});\n\t},\n\tmouseout: function(){\n\t\t$(this).parent().children('li.star').each(function(e){\n\t\t  $(this).removeClass('hover');\n\t\t});\n\t}\n},'#stars li');\n\n$(document).ready(function(){\n\tcourses.init();\n\t$('.sttv-vid-clicker').click(function(e){\n\t\te.preventDefault();\n\t\tvar id = $(this).attr('data-vid');\n\t\tcourses.render.stage.setActiveVid(id);\n\t\tcourses.render.stage.iframe();\n\t\treturn false;\n\t});\n});\n\n\n//# sourceURL=webpack:///./single-courses.js?");

/***/ })

/******/ });