let item = [], cart = {};

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
    //получаем данные из таблицы "улицы", и выводим их
    let streets = JSON.parse(data_street);
    let out = '<select id="istreet" class="input-field">';
    for (let id in streets) {
        out += `<option value="${id}">${streets[id].name_street}</option>`;
    }
    out += '</select>';
    $('.select-street').html(out);
}

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    } else {
        $.post(
            "admin/core.php",
            {
                "action": "init"
            }, function (data) {
                let menu = JSON.parse(data);
                $.post(
                    "admin/core.php",
                    {
                        "action": "initSize"
                    }, function (data_size) {
                        let sizes = JSON.parse(data_size);
                        let out = '<ul class="cart__list">', total = 0;
                        for (let items in cart) {
                            item = items.split(',');
                            id_menu = item[0];
                            id_size = item[1];
                            out += `<li class="cart__item">
                                
                                <div class="cart__line-product">${menu[id_menu].name_menu} ${sizes[id_size].name_size}</div>
                                <div class="cart__line-count-control">
                                    <button data-id="${id_menu},${id_size}" class="minus-goods product__button button--control">-</button> 
                                    <span>${cart[items]}</span>
                                    <button data-id="${id_menu},${id_size}" class="plus-goods product__button button--control">+</button>  
                                    <div class="cart__line-price">${cart[items] * menu[id_menu].price_menu * sizes[id_size].multiply}</div>
                                    <div class="cart__line-delete">
                                        <button data-id="${id_menu},${id_size}" class="del-goods product__button">Удалить</button>
                                    </div>
                                </div>
                                <br>
                            </li>`;
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
    let id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function plusGoods() {
    //добавляет товар в корзине
    let id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}

function minusGoods() {
    //уменьшаем товар в корзине
    let id = $(this).attr('data-id');
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
    //добавляем товар
    const cartJson = new Array();
    const iname = $('#iname').val();
    const imail = $('#imail').val();
    const iphone = $('#iphone').val();
    const istreet = $('#istreet').val();
    const ihouse = $('#ihouse').val();
    const iapart = $('#iapart').val();

    for (let items in cart) {
        item = items.split(',');
        id_menu = item[0];
        id_size = item[1];
        quantity = cart[items];
        cartJson.push({id_menu, id_size, quantity});
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
        cart = JSON.stringify(cartJson);
        console.log("cartJson", cartJson);
        if (isEmpty(cart)) {
            $.post(
                "admin/core.php", {
                    'action': 'addToOrders',
                    user,
                    cart,
                },
                function (data) {
                    if (data) {
                        alert('Заказ отправлен! Спасибо за покупку!');
                        cart = {}; //очищаем корзину
                        saveCart();
                        loadCart();
                        $('#iname').val('');
                        $('#imail').val('');
                        $('#iphone').val('');
                        $('#istreet').val('');
                        $('#ihouse').val('');
                        $('#iapart').val('');
                    } else {
                        alert('Повторите заказ');
                    }
                }
            );
        } else {
            alert('Корзина пуста');
        }
    } else {
        alert('Заполните поля');
    }
}

$(document).ready(function () {
    loadCart();
    init();
    $('.send-email').on('click', addToOrders); // отправить письмо с заказом и добавить запись о заказе
});