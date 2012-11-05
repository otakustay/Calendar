var Calendar = (function() {

    // @import month-view
    // @import year-view
    // @import epoch-view

    function Calendar() {
    }

    Calendar.prototype.render = function(container) {
        var today = new Date();
        renderMonth(container, today.getFullYear(), today.getMonth() + 1);
    };

    return Calendar;
}());