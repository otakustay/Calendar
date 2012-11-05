var renderYear = (function() {
    function render(container, year, options) {
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

        // 进入年份选择界面
        title.addEventListener(
            'click',
            function(e) {
                var year = +navigation.dataset.year;
                renderEpoch(container, year);

                container.querySelector('.calendar-body').style.webkitAnimation = 'shrink .4s';
            }
        );

        // 进入日期选择界面
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

    return render;
}());