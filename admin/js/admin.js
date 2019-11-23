function init() {
    $.post(
        "core.php",
        {
            "action" : "init"
        },
        showGoods
    );
}

function showGoods(data) {
    data = JSON.parse(data);
    var out = '<select>';
    out += '<option data-id="0">Новая пицца</option>';
    for (var id_menu in data) {
        out +=`<option data-id="${id_menu}">${data[id_menu].name_menu}</option>`;
    }
    out += `</select>`;
    $('.goods-out').html(out);
    $('.goods-out select').on('change', selectGoods);
}

function selectGoods(){
    var id = $('.goods-out select option:selected').attr('data-id');
    $.post(
        "core.php",
        {
            "action" : "selectOneGoods",
            "oid" : id
        },
        function(data){
            data = JSON.parse(data);
            $('#oname').val(data.name_menu);
            $('#oprice').val(data.price_menu);
            $('#oweight').val(data.weight);
            $('#oid').val(data.id_menu);
        }
    );
}

function delGoods() {
    //удаляем товар
    var id = $('.goods-out select option:selected').attr('data-id');
    $.post(
        "core.php",
        {
            "action" : "deleteGoods",
            "oid" : id
        })
        $('#oname').val('');
        $('#oprice').val('');
        $('#oweight').val('');
        $('#oid').val('');
    init();
}

function saveToDb(){
    var id = $('#oid').val();
    if(id!=0){
        $.post(
            "core.php",
            {
                "action" : "updateGoods",
                "oid" : id,
                "oname" : $('#oname').val(),
                "oprice" : $('#oprice').val(),
                "oweight" : $('#oweight').val(),
                "oid" : $('#oid').val()
            },
            function(){
                alert('Запись обновлена');
                init();
            }
        );
    }
    else {
        $.post(
            "core.php",
            {
                "action" : "newGoods",
                "oid" : 0,
                "oname" : $('#oname').val(),
                "oprice" : $('#oprice').val(),
                "oweight" : $('#oweight').val(),
                "oid" : $('#oid').val()
            },
            function(data){
                alert('Запись добавлена');
                init();
            }
        );
    }
    $('#oname').val('');
    $('#oprice').val('');
    $('#oweight').val('');
    $('#oid').val('');
}

$(document).ready(function () {
   init();
   $('.add-to-db').on('click', saveToDb);
   $('.del-goods').on('click', delGoods);
});