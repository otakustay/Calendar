(function() {
    function renderMonth(container, year, month) {
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

        // 如果起始日不是周日，用上个月最后几天补上
        var date = Date.create(year, month - 1);
        date.setWeekday(0);

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

        bindMonthEvents(container);
    }

    function bindMonthEvents(container) {
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

    function renderYear(container, year) {
        var navigation = 
            '<nav class="calendar-navigation" data-year="' + year + '">' +
                '<span class="calendar-navigation-previous">&lt;</span>' +
                '<span colspan="5" class="calendar-navigation-title">' + year + '</span>' +
                '<span class="calendar-navigation-next">&gt;</span>' +
            '</nav>';
        var body = 
            '<tbody>' + 
                '<tr>' + 
                    '<td>1月</td><td>2月</td><td>3月</td><td>4月</td>' +
                '</tr>' + 
                '<tr>' +
                    '<td>5月</td><td>6月</td><td>7月</td><td>8月</td>' +
                '</tr>' + 
                '<tr>' +
                    '<td>9月</td><td>10月</td><td>11月</td><td>12月</td>' +
                '</tr>' +
            '</tbody>';

        container.dataset.type = 'year';
        container.innerHTML = navigation + '<div class="calendar-body"><table>' + body + '</table></div>';

        bindYearEvents(container);
    }

    function bindYearEvents(container) {
        var navigation = container.querySelector('.calendar-navigation');
        var previous = container.querySelector('.calendar-navigation-previous');
        var next = container.querySelector('.calendar-navigation-next');
        var title = container.querySelector('.calendar-navigation-title');
        var body = container.querySelector('tbody');

        previous.addEventListener(
            'click',
            function() {
                var year = +navigation.dataset.year;
                renderYear(container, year - 1);
                container.querySelector('.calendar-body').style.webkitAnimation = 'slideLeftToRight .4s';
            },
            false
        );
        next.addEventListener(
            'click',
            function() {
                var year = +navigation.dataset.year;
                renderYear(container, year + 1);
                container.querySelector('.calendar-body').style.webkitAnimation = 'slideRightToLeft .4s';
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
                var year = +navigation.dataset.year;
                var month = parseInt(e.target.innerText, 10);
                renderMonth(container, year, month);

                container.querySelector('.calendar-body').style.webkitAnimation = 'expand .4s';
            },
            false
        );
    }

    renderMonth(document.querySelector('div'), 2012, 11);
}());