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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/chat.js":
/*!******************************!*\
  !*** ./resources/js/chat.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

Echo.channel('onlinechat').listen('OnlinechatEvent', function (e) {
  if (e.message.content != null) {
    var html = '<div class="message" data-msid="' + e.message.id + '"><img class="author-img" src="' + e.message.user.profile_photo_url + '" alt="' + e.message.user.name + '">';
    html += '<div class="message-group"><div class="author text-muted">' + e.message.user.name;
    html += '</div><div class="message-text">' + e.message.content + '</div></div></div>';
  } else {
    var html = '<div class="message" data-msid="' + e.message.id + '"><img class="author-img" src="' + e.message.user.profile_photo_url + '" alt="' + e.message.user.name + '">';
    html += '<div class="message-group"><div class="author text-muted">' + e.message.user.name;
    html += '</div><div class="message-text"><img src="' + e.message.attachment + '" href="' + e.message.attachment + '"></div></div></div>';
    img_gallery();
  }

  $('.chatbox>.card-body').append(html);
  scrolldown();
});
$(document).ready(function () {
  $('#send-message').submit(function (e) {
    e.preventDefault();

    if ($("input[name='content']").val() != "") {
      var form = $(this).serialize();
      $.ajax({
        type: "post",
        url: "/chats",
        data: form,
        dataType: "JSON",
        success: function success(response) {
          var html = '<div class="message me" data-msid="' + response.id + '"><div class="message-group"><div class="author text-muted">' + response.user.name;
          html += '</div><div class="message-text">' + response.content + '</div></div></div>';
          $('.chatbox>.card-body').append(html);
          $("input[name='content']").val("");
          $("input[name='content']").focus();
          scrolldown();
        }
      });
    } else {
      alert("請輸入訊息!");
    }
  });
  $('#go-back').click(function (e) {
    location.href = '/';
  });
  $('#send-image-file').change(function (e) {
    if (this.files && this.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#send-image-preview").attr('src', e.target.result);
        $("#send-image-preview").css('opacity', '1');
      };

      $("#send-image-label").html(this.files[0].name);
      reader.readAsDataURL(this.files[0]);
    }

    e.preventDefault();
  });
  $('#send-image').submit(function (e) {
    e.preventDefault();

    if ($('#send-image-file').prop('files') && $('#send-image-file').prop('files')[0]) {
      var form = new FormData();
      form.append('_token', $("input[name='_token']").prop('value'));
      form.append('attachment', $('#send-image-file').prop('files')[0]);
      $.ajax({
        type: "post",
        url: "/chats",
        data: form,
        processData: false,
        contentType: false,
        dataType: "JSON",
        success: function success(response) {
          var html = '<div class="message me" data-msid="' + response.id + '"><div class="message-group"><div class="author text-muted">' + response.user.name;
          html += '</div><div class="message-text"><img src="' + response.attachment + '" href="' + response.attachment + '"></div></div></div>';
          $('.chatbox>.card-body').append(html);
          $("input[name='content']").val("");
          $("input[name='content']").focus();
          $('#send-image-modal').modal('hide');
          $('#send-image-file').val('');
          $('#send-image-label').html("選擇檔案");
          $("#send-image-preview").attr('src', '#');
          $("#send-image-preview").css('opacity', '0');
          img_gallery();
          scrolldown();
        },
        error: function error(response) {
          alert("發生錯誤!，請稍後再試!");
        }
      });
    } else {
      alert("請選擇圖片!");
    }
  });
  $(".message").magnificPopup({
    delegate: 'img',
    type: 'image',
    gallery: {
      enabled: false
    }
  });
  img_gallery();
  scrolldown();
});

function scrolldown() {
  $('.card-body').animate({
    scrollTop: $('.card-body').prop("scrollHeight")
  });
}

function img_gallery() {
  $(".message").magnificPopup({
    delegate: 'img',
    type: 'image',
    gallery: {
      enabled: false
    }
  });
}

/***/ }),

/***/ 2:
/*!************************************!*\
  !*** multi ./resources/js/chat.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\web\onlinechat\resources\js\chat.js */"./resources/js/chat.js");


/***/ })

/******/ });