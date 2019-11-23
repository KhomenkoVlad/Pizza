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
    order = JSON.parse(data);
    console.log("order: ", order);
    var client_past = '', client_now = '', total;
    var out = '<div class="container order">';
    for (var id_order in order) {
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
                                        <p class="card-title">Доставка: <br>${order[id_order].name_street} (${order[id_order].price_delivery} грн.)</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <div class="list-group">
                                        <h5 class="card-title ">Заказ: ${order[id_order].status}</h5>
                                        <ul class="list-group">`;
            for (var id_menu in order){
                if(order[id_menu].client_order == client_now){
                    out +=`<li class="list-group-item list-group-item-action">${order[id_menu].name_menu}, 
                    ${order[id_menu].name_size}, 
                    кол-во: ${order[id_menu].quantity} шт, цена: ${order[id_menu].cost} грн.</li>`;
                    total += order[id_menu].cost * 1;
                }
            }
                out +=`</ul>
                       <h6 class="bd-title-h3">Итоговая цена: ${total} грн.</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        }
        client_past = order[id_order].client_order;
    }
    out += '</div>';
    $('.orders').html(out);
}

$(document).ready(function () {
   init();
   //$('.add-to-db').on('click', saveToDb);
});