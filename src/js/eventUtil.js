var eventUtil = {
  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function(element, type, handler) {
    if (element.removeEventHandler) {
      element.removeEventHandler(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },
  getEvent: function(event) {
    return event ? event : window.event;
  },
  getTarget: function(event) {
    return event.target || event.srcElement;
  },
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      window.returnValue = false;
    }
  },
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
};
/**
event.type
  UI 事件
    load: 当页面被完全加载后在 window 上触发，当所有框架都加载完毕时，在框架集上触发；当图片加载完成时，在<img>元素上触发
    unload: 当页面完全卸载后在 window 上触发；当所有框架都卸载完毕后，在框架集上触发；当嵌入的内容卸载完毕后在<object>元素上触发
    abort
    error
    select
    resize
    scroll
  焦点事件
  鼠标事件
  滚轮事件
  文本事件
  键盘事件
  合成事件
  变动事件
  变动名称事件
 */
