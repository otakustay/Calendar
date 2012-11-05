var renderEpoch = (function() {
    function render(calendar, year) {
        // 以10年为单位，前后各推1年
        // 如2012年显示在2009-2020的范围内
        // 需要根据`year`，找到最近的可被10整除的年份，然后减1
        var start = Math.floor(year / 10) * 10 - 1;
        // 随后增加12年即可
        var end = start + 12;
        var navigation = 
            '<nav class="calendar-navigation" data-start="' + start + '">' +
                '<span class="calendar-navigation-previous">&lt;</span>' +
                '<span colspan="5" class="calendar-navigation-title">' + start + '-' + end + '</span>' +
                '<span class="calendar-navigation-next">&gt;</span>' +
            '</nav>';
        var body = '<tbody>';
        for (var row = 0; row < 3; row++) {
            body += '<tr>';
            for (var column = 0; column < 4; column++) {
                var displayYear = (start + row * 4 + column);
                body += '<td' + (displayYear === year ? ' class="calendar-selected"' : '') + '>' + displayYear + '</td>';
            }
            body += '</tr>';
        }
        body += '</tbody>';

        calendar.container.dataset.type = 'epoch';
        calendar.container.innerHTML = navigation + '<div class="calendar-body"><table>' + body + '</table></div>';

        bindEvents(calendar);
    }

    function bindEvents(calendar) {
        var navigation = calendar.container.querySelector('.calendar-navigation');
        var previous = calendar.container.querySelector('.calendar-navigation-previous');
        var next = calendar.container.querySelector('.calendar-navigation-next');
        var body = calendar.container.querySelector('tbody');

        previous.addEventListener(
            'click',
            function() {
                var year = +navigation.dataset.start;;
                // 起始年份始终是10年为单位再减1
                // 因此前一个10年的起始年份为当前起始年份向前9年
                renderEpoch(calendar, year - 9);
                calendar.container.querySelector('.calendar-body').style.webkitAnimation = 'slideLeftToRight .4s';
            },
            false
        );
        next.addEventListener(
            'click',
            function() {
                var year = +navigation.dataset.start;
                // 向后一页即为下一个10年，对应起始年份为当前的结束年份
                // 即当前起始年份向后12年
                renderEpoch(calendar, year + 12);
                calendar.container.querySelector('.calendar-body').style.webkitAnimation = 'slideRightToLeft .4s';
            },
            false
        );

        // 进入月份选择界面
        body.addEventListener(
            'click',
            function(e) {
                if (e.target.nodeName.toLowerCase() !== 'td') {
                    return;
                }
                var year = +parseInt(e.target.innerText);
                renderYear(calendar, year);

                calendar.container.querySelector('.calendar-body').style.webkitAnimation = 'expand .4s';
            },
            false
        );
    }

    return render;
}());