function init() {
    $.post(
        "core.php",
        {
            "action" : "initOrders"
        },
        showOrder
    );
}

function showOrder(data) {
    //вывод заказов
    order = JSON.parse(data);
    let client_past = '', client_now = '', total, active = '', close = '';
    let out = '';
    for (let id_order in order) {
        total = 0;
        client_now = order[id_order].client_order;
        if(order[id_order].client_order != client_past){
            out +=`<div class="card order">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <div class="card-body">
                                    <div class="form-group">
                                        <p class="card-title">Имя: <br>${order[id_order].name_client}</p>
                                        <p class="card-title">Телефон: <br>${order[id_order].phone}</p>
                                        <p class="card-title">Почта: <br>${order[id_order].email}</p>
                                        <p class="card-title">Доставка: <br>${order[id_order].name_street} (${order[id_order].price_delivery} грн.)</p>`;
                                        if($.trim(order[id_order].status) == "Активен")
                                            out += `<button class="close-order btn btn-primary" data-id="${order[id_order].client_order}">Завершить</button>`;
                                        out += `</div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <div class="list-group">
                                        <h5 class="card-title ">Заказ: №${order[id_order].client_order} Статус: ${order[id_order].status}</h5>
                                        <ul class="list-group">`;
            for (let id_menu in order){
                if(order[id_menu].client_order == client_now){
                    out +=`<li class="list-group-item list-group-item-action">${order[id_menu].name_menu}, 
                    ${order[id_menu].name_size}, 
                    кол-во: ${order[id_menu].quantity} шт, цена: ${order[id_menu].cost} грн.</li>`;
                    total += order[id_menu].cost * 1;
                }
            }
            out +=`</ul>
                    <h6 class="bd-title-h3">Итоговая цена: ${total + order[id_order].price_delivery * 1} грн.</h6>
                    <p class="card-text"><small class="text-muted">${order[id_order].date}</small></p>             
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            if($.trim(order[id_order].status) == "Активен"){
                active += out;
                out = '';
            }
            else{
                close += out;
                out = '';
            }
        }
        client_past = order[id_order].client_order;
    }
    $('.orders-active').html('<div class="container order">' + active + '</div>');
    $('.orders-close').html('<div class="container order">' + close + '</div>');
    $('.close-order').on('click', closeOrder);
}

function closeOrder() {
    //перевод заказа в статус "Завершен"
    let id = $(this).attr('data-id');
        $.post(
            "core.php",
            {
                "action" : "closeOrder",
                "id" : id,
            },
            function(){
                init();
            }
        );
}

$(document).ready(function () {
   init();
});