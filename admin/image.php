<?php
$iname = $_POST['iname'];
if($_FILES["oimg"]["size"] > 1024*3*1024){
    echo ("Размер файла превышает три мегабайта");
    exit;
}
$new_name = $iname . '.png';
// Проверяем загружен ли файл
if(is_uploaded_file($_FILES["oimg"]["tmp_name"])){
    // Если файл загружен успешно, перемещаем его
    // из временной директории в конечную
    move_uploaded_file($_FILES["oimg"]["tmp_name"], "img/pizza/" . $new_name);
} else {
    echo("Ошибка загрузки файла");
}
?>