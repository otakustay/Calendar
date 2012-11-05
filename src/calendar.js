var Calendar = (function() {

    // @import month-view
    // @import year-view
    // @import epoch-view

    function Calendar() {
        this._events = {};
    }

    // 事件模型
    Calendar.prototype.on = function(name, handler) {
        var queue = this._events[name] || (this._events[name] = []);
        if (queue.indexOf(handler) < 0) {
            queue.push(handler);
        }
    };

    Calendar.prototype.off = function(name, handler) {
        var queue = this._events[name];
        if (queue) {
            return;
        }
        if (handler) {
            for (var i = 0; i < queue.length; i++) {
                if (queue[i] === handler) {
                    queue.splice(i, 1);
                    return;
                }
            }
        }
        else {
            queue.length = 0;
        }
    };

    Calendar.prototype._trigger = function(name) {
        var queue = this._events[name];

        if (!queue) {
            return;
        }

        var args = [].slice.call(arguments, 1);
        queue.forEach(function(handler) { handler.apply(this, args); });
    };

    Calendar.prototype.render = function(container) {
        this.container = container;
        var today = new Date();
        renderMonth(this, today.getFullYear(), today.getMonth() + 1);
    };

    return Calendar;
}());