/*cloneObject = function cloneObject(source) {
    return Object.assign(Object.create(Object.getPrototypeOf(source)), source);
};*/
  

item = [2], cart = {}, size = 0, goods = {}; // корзина

function init() {
    $.post("admin/core.php", {
            "action" : "init"
        }, function(data) {
            goods = JSON.parse(data);
            showGoods(goods);
        },
    );

}

function showGoods(data) {
	//выводим товар на страницу
	console.log('showGoods(data)', data);
    var out, index = 1;
    for (var id_menu in data) {
        out +=`<div class="catalog-item">
			<img src="img/pizza/${data[id_menu].name_menu}.png" alt="pizza">
			<p>${data[id_menu].name_menu} (${data[id_menu].weight})</p>
            <p>${data[id_menu].price_menu}</p>
            <p>
                <label>
                    <input type="radio" name="size${index}" value="1" checked>
                    Малая
                </label>
                <label>                
                    <input type="radio" name="size${index}" value="2">
                    Средняя
                </label>
                <label>
                    <input type="radio" name="size${index}" value="3">
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
    //var id_size = $(this).attr('value');
    var sizeName = $(this)[0].dataset.name;
    id_size = getCheckedValue(document.getElementsByName(sizeName));

    /*item = "{\"id_menu\":\"" + id_menu + "\"," + "\"id_size\":\"" + id_size + "\"}";
    console.log(item);
    data_item = JSON.parse(item);
    console.log(data_item);*/
    //quantity

    item = [id_menu, id_size];

    /*let product = goods.map(item => {item.id === id_size});
    
    let found = cart.find((product) => {
        return product.name === currentItem.name && product.price === currentItem.price;
    });

    console.log('product', product);
    console.log('found', found);*/

    if (cart[item] == undefined) {
        //cart = cloneObject(cart[item]);
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

$(document).ready(function () {
   init();
   loadCart();
});