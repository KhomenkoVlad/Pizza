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
    //вывод товаров из базы данных
    data = JSON.parse(data);
    let out = '<div class="input-group mb-3">\n' +
        '  <div class="input-group-prepend">\n' +
        '    <label class="input-group-text" for="inputGroupSelect01">Виды товара</label>\n' +
        '  </div>' +
        '<select class="custom-select" id="inputGroupSelect01">';
    out += '<option data-id="0">Новая пицца</option>';
    for (let id_menu in data) {
        out +=`<option data-id="${id_menu}">${data[id_menu].name_menu}</option>`;
    }
    out += `</select></div>`;
    $('.goods-out').html(out);
    $('.goods-out select').on('change', selectGoods);
}

function selectGoods(){
    //вывод данных выбранного товара
    let id = $('.goods-out select option:selected').attr('data-id');
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
            $('#odescrp').val(data.description);
            $('#oid').val(data.id_menu);
        }
    );
}

function delGoods() {
    //удаляем товар
    let id = $('.goods-out select option:selected').attr('data-id');
    $.post(
        "core.php",
        {
            "action" : "deleteGoods",
            "oid" : id
        })
        $('#oname').val('');
        $('#oprice').val('');
        $('#oweight').val('');
        $('#odescrp').val('');
        $('#oid').val('');
    init();
}

function saveToDb(){
    if(document.getElementById('oname').value=='' || document.getElementById('oprice').value=='' || 
    document.getElementById('oweight').value=='' || document.getElementById('odescrp').value=='')  
        alert('Заполните поля');
    else {
        let id = $('#oid').val();
        if(id!=0){
            //обновляем запись
            $.post(
                "core.php",
                {
                    "action" : "updateGoods",
                    "oid" : id,
                    "oname" : $('#oname').val(),
                    "oprice" : $('#oprice').val(),
                    "oweight" : $('#oweight').val(),
                    "odescrp" : $('#odescrp').val(),
                    "oid" : $('#oid').val()
                },
                function(){
                    alert('Запись обновлена');
                    init();
                }
            );
        }
        else {
            //добавляем новую запись
            $.post(
                "core.php",
                {
                    "action" : "newGoods",
                    "oid" : 0,
                    "oname" : $('#oname').val(),
                    "oprice" : $('#oprice').val(),
                    "oweight" : $('#oweight').val(),
                    "odescrp" : $('#odescrp').val(),
                    "oid" : $('#oid').val()
                },
                function(data){
                    alert('Запись добавлена');
                    init();
                }
            );
        }
        //очищаем поля
        $('#oname').val('');
        $('#oprice').val('');
        $('#oweight').val('');
        $('#odescrp').val('');
        $('#oid').val('');
    }
}

$(document).ready(function () {
   init();
   $('.add-to-db').on('click', saveToDb);
   $('.del-goods').on('click', delGoods);
});