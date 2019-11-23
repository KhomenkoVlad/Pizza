item = [2], cart = {}; // корзина

/*function init() {
    $.post("admin/core.php", {
            "action" : "init"
        }, function(data) {
            goods = JSON.parse(data);
            showGoods(goods);
        }, showGoods
    );
}*/

function init() {
    $.post(
        "admin/core.php",
        {
            "action": "init"
        },
        showGoods
    );
}

function showGoods(data) {
	//выводим товар на страницу
    data = JSON.parse(data);
	console.log('showGoods(data)', data);
    var out = '', index = 1, index_id = 1;
    for (var id_menu in data) {
        out +=`<div class="catalog-item">
			<img src="admin/img/pizza/${data[id_menu].name_menu}.png" class="product__img" alt="pizza">
			<div class="product__info">
                <div class="product__title">${data[id_menu].name_menu}</div>
                <div class="product__price">(${data[id_menu].weight})</div>
                <p class="price${id_menu} product__price">${data[id_menu].price_menu} грн</p>
                <ul class="product__options">
                    <li class="product__option-item">
                        <input class="product__option-input" type="radio" id="item${index_id}" name="size${index}" value="1" checked onClick="$('.price${id_menu}').html(getValue(${data[id_menu].price_menu}, 1))">
                        <label class="product__option-label" for="item${index_id++}">
                            <span class="product__option-unit">Малая</span>
                        </label>
                    </li>
                    <li class="product__option-item">
                        <input class="product__option-input" type="radio" id="item${index_id}" name="size${index}" value="2" onClick="$('.price${id_menu}').html(getValue(${data[id_menu].price_menu}, 1.5))">
                        <label class="product__option-label" for="item${index_id++}">
                            <span class="product__option-unit">Средняя</span>
                        </label>
                    </li>
                    <li class="product__option-item">
                        <input class="product__option-input" type="radio" id="item${index_id}" name="size${index}" value="3" onClick="$('.price${id_menu}').html(getValue(${data[id_menu].price_menu}, 2))">
                        <label class="product__option-label" for="item${index_id++}">
                            <span class="product__option-unit">Большая</span>
                        </label>
                    </li>
                </ul>
                <div class="button__wrap">
                    <button class="product__button add-to-cart" data-id="${id_menu}" data-name="size${index}">Добавить в корзину</button>
		        </div>
		    </div>
        </div>`;
        index++;
    }
    $('.main-catalog').html(out);
	$('.add-to-cart').on('click', addToCart);
}

function addToCart() {
    //добавляем товар в корзину
    var id_menu = $(this).attr('data-id');
    var sizeName = $(this)[0].dataset.name;
    id_size = getCheckedValue(document.getElementsByName(sizeName));
    item = [id_menu, id_size];
    if (cart[item] == undefined) {
        cart[item] = 1;
    } else {
        cart[item]++;
    }
    showMiniCart(cart);
    saveCart(cart);
}

function saveCart(cart) {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function showMiniCart(cart) {
    //показываю мини корзину
    let out = 0;
    for (let key in cart) {
        out += cart[key];
    }
    $('.cart__count').html(out);
}

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart(cart);
    }
}

function getCheckedValue(radioObj) {
    var value = false;
    radioObj.forEach(element => {
        if (element.checked) {
            value = element.value;
        }
    });
    return value;
}

function getValue(x, y) {
    return x * y;
}

$(document).ready(function () {
    loadCart();
    init();
});