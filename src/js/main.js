window.onload = function() {

  var Util = (function() {
    // body...
    var prefix = 'html5_reader_';
    var StorageGetter = function(key) {
      return localStorage.getItem(prefix + key);
    };
    var StorageSetter = function(key,val) {
      return localStorage.setItem(prefix + key,val);
    };
    return {
      StorageGetter:StorageGetter,
      StorageSetter:StorageSetter
    };
  })();

  var Dom = {
    top_nav:$('#top_nav'),
    bottom_nav:$('.js-bottom-nav')
  };
  var Win = $(window);
  var Doc = $(document);

  function main() {
    //to do 整个项目的入口函数
    EventHanlder();
  }

  function ReaderModel() {
    //to do 实现和阅读器相关的数据交互的方法
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
      }
    });

    Win.scroll(function() {
      Dom.top_nav.hide();
      Dom.bottom_nav.hide();
    });
  }

  main();
}();
