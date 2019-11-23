<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', true);
ini_set('display_startup_errors', true);

var_dump($_REQUEST);

if (isset($_REQUEST['phone'])) {
    $phone = $_REQUEST['phone'];
}

if (isset($_REQUEST['order'])) {
    $order = json_decode($_REQUEST['order'], true);
}


$newOrder = '';
foreach ($order as $value) {
    $newOrder .=
        $value["id"] . ') '
        . $value["name"] . ' '
        . $value["size"] . ' - '
        . $value["quantity"] . 'шт. * '
        . $value["price"] . 'грн. = '
        . $value["totalPrice"] . 'грн. '
        . "\r\n";
}
$newOrder .= '';

// адрес почты куда придет письмо
$address = "zatmenie8@gmail.com";
$subject = "Заказ еды";
// текст письма
$note_text = "Тема: $subject \r\nНомер телефона: $phone \r\n Дополнительная информация: \r\n$newOrder";

if (isset($phone) && isset($newOrder)) {
     mail($address, $subject, $note_text,"Content-type:text/plain;utf-8");
    // сообщение после отправки формы
    echo "<p style='color:#009900;'>Уважаемый(ая) <b>$phone</b> Ваше письмо отправленно успешно. <br> Спасибо. <br>Вам скоро ответят на почту <b> $newOrder</b>.</p>";
}