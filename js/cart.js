var item = [], cart = {};

function init() {
    $.post(
        "admin/core.php",
        {
            "action": "initStreet"
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
    } else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showStreet(data_street) {
    var streets = JSON.parse(data_street);
    var out = '<select id="istreet">';
    for (var id in streets) {
        out += `<option value="${id}">${streets[id].name_street}</option>`;
    }
    out += '</select>';
    $('.select-street').html(out);
}

function showCart(data) {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    } else {
        $.post(
            "admin/core.php",
            {
                "action": "init"
            }, function (data) {
                var menu = JSON.parse(data);
                $.post(
                    "admin/core.php",
                    {
                        "action": "initSize"
                    }, function (data_size) {
                        var sizes = JSON.parse(data_size);
                        console.log('menu = ', menu, 'cart = ', cart);
                        var out = '', total = 0;
                        for (var items in cart) {
                            item = items.split(',');
                            id_menu = item[0];
                            id_size = item[1];
                            out += `<button data-id="${id_menu},${id_size}" class="del-goods">x</button>
                            <img src="img\\pizza\\${menu[id_menu].name_menu}.png">
                            ${menu[id_menu].name_menu}
                            <button data-id="${id_menu},${id_size}" class="minus-goods">-</button> 
                            ${cart[items]}
                            <button data-id="${id_menu},${id_size}" class="plus-goods">+</button>  
                            ${sizes[id_size].name_size}  
                            ${cart[items] * menu[id_menu].price_menu * sizes[id_size].multiply}
                            <br>`;
                            total += cart[items] * menu[id_menu].price_menu * sizes[id_size].multiply;
                            out += `<br>`;
                        }
                        out += '<p>Всего: ' + total + '</p>';
                        $('.main-cart').html(out);
                        $('.del-goods').on('click', delGoods);
                        $('.plus-goods').on('click', plusGoods);
                        $('.minus-goods').on('click', minusGoods);
                    });
            });
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
    if (cart[id] == 1) {
        delete cart[id];
    } else {
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
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}

function addToOrders() {
    const cartJson = new Array();
    const iname = $('#iname').val();
    const imail = $('#imail').val();
    const iphone = $('#iphone').val();
    const istreet = $('#istreet').val();
    const ihouse = $('#ihouse').val();
    const iapart = $('#iapart').val();

    for (var items in cart) {
        item = items.split(',');
        id_menu = item[0];
        id_size = item[1];
        quantity = cart[items];
        cartJson.push({id_menu, id_size, quantity});
        console.log('id_menu = ', id_menu, 'id_size = ', id_size, 'quantity = ', quantity);
    }

    if (iname !== '' && imail !== '' && iphone !== '' && istreet !== '' && ihouse !== '') {
        const user = JSON.stringify({
            iname,
            imail,
            iphone,
            istreet,
            ihouse,
            iapart,
        });
        const cart = JSON.stringify(cartJson);
        if (isEmpty(cart)) {
            $.post(
                "admin/core.php", {
                    'action': 'addToOrders',
                    user,
                    cart,
                },
                function (data) {
                    if (data === 1) {
                        console.log('Заказ отправлен');
                    } else {
                        console.log('Повторите заказ');
                    }
                }
            );
        } else {
            console.log('Корзина пуста');
        }
    } else {
        console.log('Заполните поля');
    }
}

$(document).ready(function () {
    loadCart();
    init();

    $('.send-email').on('click', addToOrders); // отправить письмо с заказом
});