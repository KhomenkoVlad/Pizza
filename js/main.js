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
    var out = '', index = 1;
    for (var id_menu in data) {
        out +=`<div class="catalog-item">
			<img src="img/pizza/${data[id_menu].name_menu}.png" alt="pizza">
			<p>${data[id_menu].name_menu} (${data[id_menu].weight})</p>
            <p class="price${id_menu}">${data[id_menu].price_menu}</p>
            <p>
                <label>
                    <input type="radio" name="size${index}" value="1" checked onClick="$('.price${id_menu}').html(getValue(${data[id_menu].price_menu}, 1))">
                    Малая
                </label>
                <label>                
                    <input type="radio" name="size${index}" value="2" onClick="$('.price${id_menu}').html(getValue(${data[id_menu].price_menu}, 1.5))">
                    Средняя
                </label>
                <label>
                    <input type="radio" name="size${index}" value="3" onClick="$('.price${id_menu}').html(getValue(${data[id_menu].price_menu}, 2))">
                    Большая
                </label>
            </p>
			<button class="add-to-cart" data-id="${id_menu}" data-name="size${index}">Добавить в корзину</button>
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
    var out="";
    for (var key in cart) {
        out += key +' --- '+ cart[key]+'<br>';
    }
    $('.mini-cart').html(out);
}

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
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