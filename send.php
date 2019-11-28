<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', true);
ini_set('display_startup_errors', true);

if (isset($_REQUEST['iphone'])) {
    $phone = $_REQUEST['iphone'];
}

if (isset($_REQUEST['cart'])) {
    $order = json_decode($_REQUEST['cart'], true);
}

$newOrder = '';/*
foreach ($order as $value) {
    $newOrder .=
        $value["id_order"] . ') '
        . $value["name_menu"] . ' '
        . $value["name_size"] . ' - '
        . $value["quantity"] . 'шт., '
        . $value["cost"] . 'грн.'
        . "\r\n";
}*/
foreach ($order as $value) {
    $newOrder .=
        $value["id_menu"] . ') '
        . $value["id_size"] . ' '
        . $value["quantity"] . 'шт. '
        . "\r\n";
}
$newOrder .= '';

// адрес почты куда придет письмо
$address = "zatmenie8@gmail.com";
$subject = "Заказ пиццы";
// текст письма
$note_text = "Тема: $subject \r\nНомер телефона: $phone \r\nДополнительная информация: \r\n$newOrder";

if (isset($phone) && isset($newOrder)) {
    mail($address, $subject, $note_text,"Content-type:text/plain;utf-8");
    // сообщение после отправки формы
    echo "<p style='color:#009900;'>Уважаемый(ая) <b>$phone</b> Ваше письмо отправленно успешно. <br> Спасибо. <br>Вам скоро ответят на почту <b> $newOrder</b>.</p>";
}