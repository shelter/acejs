/**
 * 倒计时插件
 * author: mason wu
 * version: 0.9.0
 * require: jquery.timer.js
 * URL：https://github.com/jchavannes/jquery-timer
 * usage:
 * var countDown = $(id).CountDown({
 *  startTime {number} 单位秒 默认0
 *  callback {fn} 及时结束后出发函数
 *  auto {boolean} 自动倒计时开关 默认 true
 * });
 * methods:
 * countDown.start() 启动倒计时器
 * countDown.pause() 停止倒计时器
 * countDown.stop() 停止并清零倒计时器同时出发callback方法
 * countDown.getUsedTime() 获得已用时间 单位秒
 */

(function ($) {
    "use strict";
    var interval = 1000; //timer调用间隔时间 默认: 1000毫秒
    //辅助
    function pad(number, length) {
        var str = number.toString();
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
    function formatTime(time) {
        var min = parseInt(time / 60, 10);
        return pad(min, 2) + ':' + pad(time - (min * 60), 2);
    }
    //默认方法不执行任何动作
    function noop() {}

    function CountDown(container, config) {
        var self = this;
        if (container.length === 0) {
            throw new Error('未找到目标容器');
        }
        self.container = container;
        self.config = config = $.extend({}, config);
        self.startTime = config.startTime || 0; //初始时间
        self.auto = config.auto || true;
        self.callback = config.callback || noop;

        //初始化计时器
        self.init();
    }

    CountDown.prototype = {
        constructor: CountDown,
        _updateTime: function () {
            var self = this,
                currentTime = self.currentTime;
            currentTime -= 1;
            if (currentTime < 0) { currentTime = 0; }
            self.currentTime = currentTime;
            self.container.html(formatTime(currentTime));
            if (currentTime === 0) {
                self.callback.call(self);
                self.timer.stop();
            }
        },
        start: function () {
            this.timer.play();
        },
        pause: function () {
            this.timer.pause();
        },
        stop: function () {
            var self = this;
            self.currentTime = 0;
            self._updateTime();
        },
        getUsedTime: function () {
            return this.startTime - this.currentTime;
        },
        //初始化方法
        init: function () {
            var self = this;
            self.currentTime = self.startTime;

            self.timer = $.timer(function () {
                self._updateTime.call(self);
            }, interval, self.auto);
            self.container.html(formatTime(self.startTime));
        }
    };
    $.fn.extend({
        countDown: function (config) {
            //TODO: 目前只支持单个选择器
            return new CountDown($(this), config);
        }
    });
})(jQuery);
