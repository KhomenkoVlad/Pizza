var item = [], cart = {};

function init() {
    /*$.post(
        "admin/core.php",
        {
            "action" : "init"
        },
        showCart
    );*/
    $.post(
        "admin/core.php",
        {
            "action" : "initStreet"
        },
        showStreet
    );
}

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showStreet(data_street){
    /*$.post(
        "admin/core.php",
        {
            "action" : "initStreet"
        }, function (data_street) {*/
            var streets = JSON.parse(data_street);
            var out='<select id="istreet">';
            for (var id in streets) {
                out +=`<option value="${id}">${streets[id].name_street}</option>`;
            }
            out +='</select>';
            $('.select-street').html(out);
        //});
}

function showCart(data) {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    }
    else {
        $.post(
        "admin/core.php",
        {
            "action" : "init"
        }, function (data) {
            var menu = JSON.parse(data);
            $.post(
                "admin/core.php",
                {
                    "action" : "initSize"
                }, function (data_size) {
                    var sizes = JSON.parse(data_size);
                    console.log('menu = ', menu, 'cart = ', cart);
                    var out = '', total = 0;
                    for (var items in cart) {
                        item = items.split(',');
                        id_menu = item[0];
                        id_size = item[1];
                        //console.log(showSize(id_size));
                        out += `<button data-id="${id_menu},${id_size}" class="del-goods">x</button>
                        <img src="img\\pizza\\${menu[id_menu].name_menu}.png">
                        ${menu[id_menu].name_menu}
                        <button data-id="${id_menu},${id_size}" class="minus-goods">-</button> 
                        ${cart[items]}
                        <button data-id="${id_menu},${id_size}" class="plus-goods">+</button>  
                        ${sizes[id_size].name_size}  
                        ${cart[items] * menu[id_menu].price_menu}
                        <br>`;
                        total += cart[items] * menu[id_menu].price_menu;
                        out += `<br>`;
                    }
                    out += '<p>Всего: ' + total + '</p>';
                    $('.main-cart').html(out);
                    $('.del-goods').on('click', delGoods);
                    $('.plus-goods').on('click', plusGoods);
                    $('.minus-goods').on('click', minusGoods);
        });});
    }
}

function delGoods() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    //добавляет товар в корзине
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    //уменьшаем товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var iname = $('#iname').val();
    var imail = $('#imail').val();
    var iphone = $('#iphone').val();
    var istreet = $('#istreet').val();
    var ihouse = $('#ihouse').val();
    var iapart = $('#iapart').val();
    console.log('cart = ', cart);
    for (var items in cart) {
        item = items.split(',');
        id_menu = item[0];
        id_size = item[1];
        quantity = cart[items];
        console.log('id_menu = ', id_menu, 'id_size = ', id_size, 'quantity = ', quantity);
    }
    if (iname!='' && imail!='' && iphone!='' && istreet!='' && ihouse!='') {
        if (isEmpty(cart)) {
            
                $.post(
                    "admin/core.php",
                    {
                        "action" : "addToOrders",
                        "iname" : iname,
                        "imail" : imail,
                        "iphone" : iphone,
                        "istreet" : istreet,
                        "ihouse" : ihouse,
                        "iapart" : iapart,
                        "cart" : cart
                    },
                    function(data){
                        if (data==1) {
                            alert('Заказ отправлен');
                        }
                        else {
                            alert('Повторите заказ');
                        }
                    }
                );
            
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }

}

$(document).ready(function () {
    loadCart();
    init();
   
    $('.send-email').on('click', sendEmail); // отправить письмо с заказом
});