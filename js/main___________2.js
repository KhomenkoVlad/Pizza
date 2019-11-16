var cart = {}; // корзина
var size = 0, index = 1;
function init() {
    $.post(
        "admin/core.php",
        {
            "action" : "init"
        },
        showGoods
    );
	//showSize();
}

/*<p><input type="radio" name="size${index}" data-size="1">Малая
<input type="radio" name="size${index}" onclick=sizes(2)>Средняя
<input type="radio" name="size${index}" onclick=sizes(3)>Большая
<select>
<option value="1">Малая</option>
<option value="2">Средняя</option>
<option value="3">Большая</option>
</select></p>*/

/*out +='${'
				out +='$.post("admin/core.php",'
					out +='{'
						out +='"action" : "init_size"'
					out +='},'
					out +='function(data2){'
						out +='data2 = JSON.parse(data2);'
						out +='console.log(data2);'
						out +='var out;'
						out +='for (var id_size in data2) {'
							out +=`<input type="radio" name="size${id_menu}" class="add-to-item-size" data-size="${id_size}" checked>${data2[id_size].name_size}`;
						out +='}'
					out +='});'
			out +='}'*/

function showGoods(data) {
    data = JSON.parse(data);
    var out, index = 1;
    for (var id_menu in data) {
        out +=`<div class="catalog-item">
			<img src="img/pizza/${data[id_menu].name_menu}.png" alt="pizza">
			<p>${data[id_menu].name_menu} (${data[id_menu].weight})</p>
			<p>${data[id_menu].price_menu}</p>
			<div class="catalog-item-size">${showSize()}</div>
			<button class="add-to-cart" data-id="${id_menu}" data-size="${data[id_menu].id_size}">Добавить в корзину</button>
		</div>`;
		
		out += '<div class="catalog-item">'
		out += '<img src="img/pizza/' + data[id_menu].name_menu + '.png" alt="pizza">'
		out += '<p>' + data[id_menu].name_menu + ' (' + data[id_menu].weight + ')</p>'
		out += '<p>' + data[id_menu].price_menu + '</p>'
		out += '<div class="catalog-item-size">';

		$.post("admin/core.php", {
			"action" : "init_size"
		},
		function(data2){
			data2 = JSON.parse(data2);
			console.log(data2);
			var out;
			for (var id_size in data2) {
			out += '<input type="radio" name="size' + index + '" class="add-to-item-size" data-size="' + id_size + '" checked>' + data2[id_size].name_size;
		}
		});

		out += '</div>'
		out += '<button class="add-to-cart" data-id="' + id_menu + '" data-size="' + data[id_menu].id_size + '">Добавить в корзину</button>'
		out += '</div>';
		index++;
    }
    $('.main-catalog').html(out);
	$('.add-to-cart').on('click', addToCart);
	showSize();
}

function showSize() {
	$.post("admin/core.php",
	{
		"action" : "init_size"
	},
	function(data2){
		data2 = JSON.parse(data2);
		console.log(data2);
		var out;
		for (var id_size in data2) {
			out +=`/*<input type="radio" name="size${index}" class="add-to-item-size" data-size="${id_size}" checked>${data2[id_size].name_size}`;
		}
		//index++;
		$('.catalog-item-size').html(out);
		//$('.add-to-item-size').on('click', addToSize);
	});
}

function addToSize() {
    //добавляем товар в корзину
	var id_size = $(this).attr('data-size');
	console.log(id_size);
}
	
function sizes(x){
	size = x;
	//console.log(size);
}

function addToCart() {
    //добавляем товар в корзину
    var id_menu = $(this).attr('data-id');
	//var id_size = $(this).attr('data-size');
	console.log(id_menu);
    //console.log(id_size);
    if (cart[id_menu]==undefined) {
        cart[id_menu] = 1; //если в корзине нет товара - делаем равным 1
    }
    else {
        cart[id_menu]++; //если такой товар есть - увеличиваю на единицу
    }
    showMiniCart();
    saveCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function showMiniCart() {
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

$(document).ready(function () {
   init();
   loadCart();
});