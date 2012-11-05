var renderMonth = (function() {
    function getFirstDay(year, month) {
        var date = Date.create(year, month - 1);
        // 如果起始日不是周日，用上个月最后几天补上
        date.setWeekday(0);
        return date;
    }

    function render(container, year, month, options) {
        var navigation = 
            '<nav class="calendar-navigation" data-year="' + year + '" data-month="' + month + '">' +
                '<span class="calendar-navigation-previous">&lt;</span>' +
                '<span colspan="5" class="calendar-navigation-title">' + year + '年' + month + '月' + '</span>' +
                '<span class="calendar-navigation-next">&gt;</span>' +
            '</nav>';
        var head = 
            '<thead>' + 
                '<tr>' +
                    '<th class="calendar-weekend">日</th>' +
                    '<th>一</th><th>二</th><th>三</th><th>四</th><th>五</th>' + 
                    '<th class="calendar-weekend">六</th>' +
                '</tr>' +
            '</thead>';
        var body = '<tbody>';

        var date = getFirstDay(year, month);

        // 最坏情况下，一个月是31天，第一天是周六，则需要6行，因此生成6行7列的表格
        for (var row = 0; row < 6; row++) {
            body += '<tr>';
            for (var column = 0; column < 7; column ++) {
                var className = [];
                // 如果不是同一个月的，添加一个class
                if (!date.isThisMonth()) {
                    className.push('calendar-not-current-month');
                }
                // 如果是周末，添加一个class
                if (date.isWeekend()) {
                    className.push('calendar-weekend');
                }
                // 如果是今天，添加一个class
                if (date.isToday()) {
                    className.push('calendar-today');
                }
                className = className.length ? ('class="' + className.join(' ') + '"') : '';
                body += '<td ' + className + ' data-date="' + date.format('{yyyy}-{MM}-{dd}') + '">' + date.getDate() + '</td>';

                date = date.addDays(1);
            }
            body += '</tr>';
        }

        body += '</tbody>';

        container.dataset.type = 'month';
        container.innerHTML = navigation + '<div class="calendar-body"><table>' + head + body + '</table></div>';

        bindEvents(container);
    }

    function bindEvents(container) {
        var navigation = container.querySelector('.calendar-navigation');
        var previous = container.querySelector('.calendar-navigation-previous');
        var next = container.querySelector('.calendar-navigation-next');
        var title = container.querySelector('.calendar-navigation-title');
        var body = container.querySelector('tbody');

        previous.addEventListener(
            'click',
            function() {
                // 月份是从0开始的，因此上个月就要减2
                var date = Date.create(+navigation.dataset.year, +navigation.dataset.month).addMonths(-2);
                renderMonth(container, date.getFullYear(), date.getMonth() + 1);
                container.querySelector('.calendar-body').style.webkitAnimation = 'slideLeftToRight .4s';
            },
            false
        );
        next.addEventListener(
            'click',
            function() {
                // 月份是从0开始的，因此下个月就是不加不减
                var date = Date.create(+navigation.dataset.year, +navigation.dataset.month);
                renderMonth(container, date.getFullYear(), date.getMonth() + 1);
                container.querySelector('.calendar-body').style.webkitAnimation = 'slideRightToLeft .4s';
            },
            false
        );

        // 进入月份选择界面
        title.addEventListener(
            'click',
            function(e){
                var year = +navigation.dataset.year;
                renderYear(container, year);

                container.querySelector('.calendar-body').style.webkitAnimation = 'shrink .4s';
            },
            false
        );

        // 选择日期
        body.addEventListener(
            'click',
            function(e) {
                if (e.target.nodeName.toLowerCase() !== 'td') {
                    return;
                }
                var cells = [].slice.call(body.querySelectorAll('td'));
                cells.forEach(function(td) { td.classList.remove('calendar-selected'); })
                e.target.classList.add('calendar-selected');
            },
            false
        );
    }

    return render;
}());