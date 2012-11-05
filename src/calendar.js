var Calendar = (function() {

    // @import month-view
    // @import year-view
    // @import epoch-view

    function Calendar() {
    }

    Calendar.prototype.render = function(container) {
        var today = Date.create();
        renderMonth(container, today.getFullYear(), today.getMonth() + 1);
    };

    return Calendar;
}());