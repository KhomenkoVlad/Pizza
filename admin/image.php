<?php
$iname = $_POST['iname'];
if($_FILES["iimg"]["size"] > 1024*3*1024){
    echo ("Размер файла превышает три мегабайта");
    exit;
}
$new_name = $iname . '.png';
// Проверяем загружен ли файл
if(is_uploaded_file($_FILES["iimg"]["tmp_name"]) && isset($iname)){
    // Если файл загружен успешно, перемещаем его из временной директории в конечную
    move_uploaded_file($_FILES["iimg"]["tmp_name"], "img/pizza/" . $new_name);
    header("Location: admin.php");
} else {
    echo("Ошибка загрузки файла");
}
?>