var renderMonth = (function() {
    function pad(str) {
        str = str + '';
        return str.length === 1 ? ('0' + str) : str;
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

        // 找到该月日历的起始日期
        var date = new Date(year, month - 1, 1);
        // 如果起始日不是周日，用上个月最后几天补上
        date.setDate(date.getDay() - date.getDay());
        // 记录今天，但只要日期不要时间，以方便后续比较
        var today = new Date((new Date).toDateString());
        // 记录当前月，以供后续比较
        var thisMonth = today.getMonth();

        // 最坏情况下，一个月是31天，第一天是周六，则需要6行，因此生成6行7列的表格
        for (var row = 0; row < 6; row++) {
            body += '<tr>';
            for (var column = 0; column < 7; column ++) {
                var className = [];
                // 如果不是同一个月的，添加一个class
                if (date.getMonth() !== thisMonth) {
                    className.push('calendar-not-current-month');
                }
                // 如果是周末，添加一个class
                if (date.getDay() === 0 || date.getDay() === 6) {
                    className.push('calendar-weekend');
                }
                // 如果是今天，添加一个class
                if (date === today) {
                    className.push('calendar-today');
                }
                className = className.length ? ('class="' + className.join(' ') + '"') : '';
                body += '<td ' + className + '>' + date.getDate() + '</td>';

                // 往前一天
                date.setDate(date.getDate() + 1);
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
                var date = new Date(+navigation.dataset.year, +navigation.dataset.month - 2, 1);
                renderMonth(container, date.getFullYear(), date.getMonth() + 1);
                container.querySelector('.calendar-body').style.webkitAnimation = 'slideLeftToRight .4s';
            },
            false
        );
        next.addEventListener(
            'click',
            function() {
                // 月份是从0开始的，因此下个月就是不加不减
                var date = new Date(+navigation.dataset.year, +navigation.dataset.month, 1);
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