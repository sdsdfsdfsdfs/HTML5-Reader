(function() {
  'use strict';

  var Util = (function() {
    // to do方法封装
    var prefix = 'html5_reader_';
    var StorageGetter = function(key) {
      return localStorage.getItem(prefix + key);
    };

    var StorageSetter = function(key,val) {
      return localStorage.setItem(prefix + key,val);
    };

    function getBSONP(url, callback) {
      return $.jsonp({
        url : url,
        cache : true,
        callback : "duokan_fiction_chapter",
        success : function(result) {
          var data = $.base64.decode(result);
          var json = decodeURIComponent(escape(data));
          callback(json);
        }
      });
    }

    return {
      StorageGetter:StorageGetter,
      StorageSetter:StorageSetter,
      getBSONP: getBSONP,
    };
  })();

  var Dom = {
    top_nav: $('#top_nav'),
    bottom_nav: $('.js-bottom-nav'),
    // menu_button: $('#menu_button'),
    // menu_container: $('.menu_container'),
    font_button: $('#font_button'),
    font_container: $('.font-container'),
    bg_button: $('.bg-container'),
  };
  var Win = $(window);
  var Doc = $(document);
  var RootContainer = $('#fiction_container');

  // 读取本地存储的背景信息
  var Container = $('.container');
    var bg_color = Util.StorageGetter('background-color');
    if (!bg_color) {
      bg_color = '#f7eee5';
    }
  Container.css('background-color',bg_color);

  //读取本地存储的文字信息
  var initFontSize = Util.StorageGetter('font_size');
    initFontSize = parseInt(initFontSize);
    if (!initFontSize) {
      initFontSize = 14;
    }
  RootContainer.css('font-size',initFontSize);

  function main() {
    //to do 整个项目的入口函数
    var readerModel = ReaderModel();
    readerModel.init();
    EventHanlder();
  }

  function ReaderModel() {
    //to do 实现和阅读器相关的数据交互的方法
    var Chapter_id;
    var init = function() {
      getFictionInfo(function() {
        getCurChapterContent(Chapter_id,function() {
          //to do
        });
      });
    };

    var getFictionInfo = function(callback) {
      $.get('data/chapter.json',function(data){
        //to do 获得章节信息之后的回调
        Chapter_id = data.chapters[1].chapter_id;
        callback && callback();
      },'json');
    };

    var getCurChapterContent = function(chapter_id,data) {
      $.get('data/data' + chapter_id + '.json',function(data) {
        if(data.result == 0) {
          var url = data.jsonp;
          Util.getBSONP(url, function(data) {
            callback && callback(json);
          });
        }
      },'json');
    };

    return {
      init: init
    };
  }

  function ReaderBaseFrame() {
    //to do 渲染基本的UI结构
  }

  function EventHanlder() {
    //to do 交互的事件绑定
    $('#action_mid').click(function() {
      if (Dom.top_nav.css('display') == 'none') {
        Dom.top_nav.show();
        Dom.bottom_nav.show();
      } else {
        Dom.top_nav.hide();
        Dom.bottom_nav.hide();
        Dom.font_container.hide();
        Dom.font_button.removeClass('current');
        $('#font_button .item-wrap div:first-child').removeClass('icon-font-color');
        $('#font_button .item-wrap div:first-child').addClass('icon-font');
      }
    });

    Dom.font_button.click(function() {
      if (Dom.font_container.css('display') == 'none') {
        Dom.font_container.show();
        Dom.font_button.addClass('current');

        // 更改背景图片
        $('#font_button .item-wrap div:first-child').removeClass('icon-font');
        $('#font_button .item-wrap div:first-child').addClass('icon-font-color');


      } else{
        Dom.font_container.hide();
        Dom.font_button.removeClass('current');

        // 更改背景图片
        $('#font_button .item-wrap div:first-child').removeClass('icon-font-color');
        $('#font_button .item-wrap div:first-child').addClass('icon-font');
      }
    });

    /*
    Dom.menu_button.click(function() {
      if (Dom.menu_container.css('display') == 'none') {
        Dom.menu_container.show();
        Dom.menu_button.addClass('current');

        // 更改背景图片
        $('#menu_button .item-wrap div:first-child').removeClass('icon-menu');
        $('#menu_button .item-wrap div:first-child').addClass('icon-menu-color');


      } else{
        Dom.menu_container.hide();
        Dom.menu_button.removeClass('current');

        // 更改背景图片
        $('#menu_button .item-wrap div:first-child').removeClass('icon-menu-color');
        $('#menu_button .item-wrap div:first-child').addClass('icon-menu');
      }
    });

    $('#night_button').click(function() {
      //to do 触发背景切换的事件
      if ($('#night_button .item-wrap .icon-text').html !== '白天') {
        $('#night_button .item-wrap div:first-child').removeClass('icon-night');
        $('#night_button .item-wrap div:first-child').addClass('icon-day');
        $('#night_button .item-wrap .icon-text').html('白天');

        Container.css('background-color','#0f1410');
        Dom.bg_button.empty();// 清空所有父元素的子节点
        $('.bg-container-6').prepend('<div class="bg-container-current"></div>');// 给被点击元素添加子节点

        // Util.StorageSetter('background-color',bg_color);
      } else {
        $('#night_button .item-wrap div:first-child').removeClass('icon-day');
        $('#night_button .item-wrap div:first-child').addClass('icon-night');
        $('#night_button .item-wrap .icon-text').html('夜间');

        Container.css('background-color','#f7eee5');
        Dom.bg_button.empty();// 清空所有父元素的子节点
        $('.bg-container-1').prepend('<div class="bg-container-current"></div>');// 给被点击元素添加子节点
      }
    });
    */

    // 字体的放大与缩小

    $('#large_font').click(function() {
      //to do 放大字体
      if (initFontSize > 20) {
        return;
      }
      initFontSize += 1;
      RootContainer.css('font-size',initFontSize);
      Util.StorageSetter('font_size',initFontSize);
    });

    $('#small_font').click(function() {
      //to do 缩小字体
      if (initFontSize < 12) {
        return;
      }
      initFontSize -= 1;
      RootContainer.css('font-size',initFontSize);
      Util.StorageSetter('font_size',initFontSize);
    });

    Dom.bg_button.click(function() {
      // to do 点击背景按钮切换背景
      var bg_color =  $(this).css('background-color');
      Container.css('background-color',bg_color);
      Dom.bg_button.empty();// 清空所有父元素的子节点
      $(this).prepend('<div class="bg-container-current"></div>');// 给被点击元素添加子节点
      Util.StorageSetter('background-color',bg_color);
    });

    Win.scroll(function() {
      Dom.top_nav.hide();
      Dom.bottom_nav.hide();
      Dom.font_container.hide();
      $('#font_button .item-wrap div:first-child').removeClass('icon-font-color');
      $('#font_button .item-wrap div:first-child').addClass('icon-font');
    });
  }

  main();
})();
