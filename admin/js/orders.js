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
    var out = '', client_past = '', client_now = '', total;
    for (var id_order in order) {
        total = 0;
        client_now = order[id_order].client_order;
        if(order[id_order].client_order != client_past){
            out +=`<div class="clients-order">
            <p>Имя: ${order[id_order].name_client}</p>
            <p>Телефон: ${order[id_order].phone}</p>
            <p>Почта: ${order[id_order].email}</p>
            <p>Доставка по адресу: ${order[id_order].name_street} (${order[id_order].price_delivery})</p>
            <p>Заказ:<br>`;
            
            for (var id_menu in order){
                if(order[id_menu].client_order == client_now){
                    out +=`${order[id_menu].name_menu}, ${order[id_menu].name_size}, 
                    кол-во: ${order[id_menu].quantity}, Цена: ${order[id_menu].cost}</p>`;
                    total += order[id_menu].cost * 1;
                    console.log("total: ", total);
                }
            }
            out +='<p>Цена итоговая: ' + (total + order[id_order].price_delivery * 1) + '</p><p>--------</p></div>';
        }   
        client_past = order[id_order].client_order;
    }
    $('.orders').html(out);
}

$(document).ready(function () {
   init();
   //$('.add-to-db').on('click', saveToDb);
});