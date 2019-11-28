function queryDay() {
    //Количество заказов за день
    $.post(
        "core.php",
        {
            "action": "queryDay"
        }, function (data1) {
            let query = JSON.parse(data1);
            let out = `<table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Дата</th>
                                <th scope="col">Количество</th>
                                </tr>
                            </thead>`;

            for (let id_order in query) {
                out += `<tbody>
                            <tr>
                            <td>${query[id_order].date}</td>
                            <td>${query[id_order].count}</td>
                            </tr>
                        </tbody>`;
            }
            out += '</table>';
            $('.query-data').html(out);
    });
}

function queryNoOrder() {
    //Ни разу не заказывали
    $.post(
        "core.php",
        {
            "action": "queryNoOrder"
        }, function (data2) {
            let query = JSON.parse(data2);
            let out = `<table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Название</th>
                                </tr>
                            </thead>`;

            for (let id_order in query) {
                out += `<tbody>
                            <tr>
                            <td>${query[id_order].name_menu}</td>
                            </tr>
                        </tbody>`;
            }
            out += '</table>';
            $('.query-no-order').html(out);
    });
}

function queryPopularMenu() {
    //Популярность блюд
    $.post(
        "core.php",
        {
            "action": "queryPopularMenu"
        }, function (data3) {
            query = JSON.parse(data3);
            
            let out = `<table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Название</th>
                                <th scope="col">Количество заказов</th>
                                </tr>
                            </thead>`;

            for (let id_order in query) {
                out += `<tbody>
                            <tr>
                            <td>${query[id_order].name_menu}</td>
                            <td>${query[id_order].count}</td>
                            </tr>
                        </tbody>`;
            }
            out += '</table>';
            $('.query-popular').html(out);
    });
}

function queryMaxPrice() {
    //Блюда по цене
    $.post(
        "core.php",
        {
            "action": "queryMaxPrice"
        }, function (data4) {
            query = JSON.parse(data4);
            let out = `<table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Название</th>
                                <th scope="col">Цена</th>
                                </tr>
                            </thead>`;

            for (let id_order in query) {
                out += `<tbody>
                            <tr>
                            <td>${query[id_order].name_menu}</td>
                            <td>${query[id_order].price_menu}</td>
                            </tr>
                        </tbody>`;
            }
            out += '</table>';
            $('.query-price').html(out);
    });
}

$(document).ready(function () {
    queryDay();
    queryNoOrder();
    queryPopularMenu();
    queryMaxPrice();
});