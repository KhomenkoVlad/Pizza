<?php
function connect(){
    $conn = @pg_connect("host=localhost port=5432 dbname=Pizzeria user=postgres password=admin") or die("Error connecttion PostgreSQL");
    return $conn;
}

function init(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT * FROM menu";
    $result = @pg_query($conn, $sql) or die("Error query select menu");

    if (pg_num_rows($result) > 0) {
        $out = array();
        while($row = pg_fetch_assoc($result)) {
            $out[$row["id_menu"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
}

function initSize(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT * FROM size";
    $result = @pg_query($conn, $sql) or die("Error query select size");

    if (pg_num_rows($result) > 0) {
        $out = array();
        while($row = pg_fetch_assoc($result)) {
            $out[$row["id_size"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
}

function initStreet(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT * FROM street";
    $result = @pg_query($conn, $sql) or die("Error query select street");

    if (pg_num_rows($result) > 0) {
        $out = array();
        while($row = pg_fetch_assoc($result)) {
            $out[$row["id_street"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
}

function initOrders(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT orders.id_order, orders.client_order, 
    client.name_client, client.phone, client.email, street.name_street, 
    street.price_delivery, client.house, client.apartment, orders.date, menu.id_menu,
    menu.name_menu, orders.quantity, size.name_size, status_order(orders.status) AS status,
    cost_order(menu.price_menu, size.multiply, orders.quantity) AS cost
    
    FROM orders, client, street, menu, size

    WHERE orders.client_order = client.id_client AND 
    street.id_street = client.street_client AND
    orders.menu_order = menu.id_menu AND
    size.id_size = orders.size_order";
    $result = @pg_query($conn, $sql) or die("Error query select orders");

    if (pg_num_rows($result) > 0) {
        $out = array();
        while($row = pg_fetch_assoc($result)) {
            $out[$row["id_order"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
}

function selectOneGoods(){
    //вывожу список товаров
    $conn = connect();
    $id = $_POST['oid'];
    $sql = "SELECT * FROM menu WHERE id_menu ='$id'";
    $result = @pg_query($conn, $sql) or die("Error query select one goods");
    
    if (pg_num_rows($result) > 0){
        $row = pg_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
}

function updateGoods(){
    $conn = connect();
    $id = $_POST['oid'];
    $name = $_POST['oname'];
    $price = $_POST['oprice'];
    $oweight = $_POST['oweight'];
    $odescrp = $_POST['odescrp'];
    $sql = "UPDATE menu SET name_menu = '$name', price_menu = '$price', weight = '$oweight', description = '$odescrp' WHERE id_menu = '$id'";
    
    $result = @pg_query($conn, $sql) or die("Error query to update one goods");
}

function newGoods(){
    $conn = connect();
    $name = $_POST['oname'];
    $price = $_POST['oprice'];
    $oweight = $_POST['oweight'];
    $odescrp = $_POST['odescrp'];
    $sql = "INSERT INTO menu(name_menu, price_menu, weight, description) VALUES('$name', '$price', '$oweight', '$odescrp')";

    $result = @pg_query($conn, $sql) or die("Error query to insert one goods");
}


function deleteGoods(){
    $conn = connect();
    $id = $_POST['oid'];
    $sql = "DELETE FROM menu WHERE id_menu = $id";

    $result = @pg_query($conn, $sql) or die("Error query to insert one goods");
}


function addToOrders() {
    if (isset($_REQUEST['cart'])) {
        $cart = json_decode($_REQUEST['cart'], true);
    }
    if (isset($_REQUEST['user'])) {
        $user = json_decode($_REQUEST['user'], true);
    }
    $name = $user['iname'];
    $phone = $user['iphone'];
    $mail = $user['imail'];
    $street = $user['istreet'];
    $house = $user['ihouse'];
    $apart = $user['iapart'];

    $conn = connect();
    $sql = "INSERT INTO client (name_client, phone, email, street_client, house, apartment)
        VALUES ('$name', '$phone', '$mail', '$street', '$house', '$apart') RETURNING id_client";
    $result = pg_query($conn, $sql);
    $row = pg_fetch_row($result);
    $new_id = $row['0'];

    for ($i = 0; $i < count($cart); $i++) {
        $id_menu = $cart[$i]['id_menu'];
        $id_size = $cart[$i]['id_size'];
        $quantity = $cart[$i]['quantity'];
        $sql2 = "INSERT INTO orders (menu_order, size_order, client_order, date, status, quantity)
            VALUES ('$id_menu', '$id_size', '$new_id', NOW(), 'true', '$quantity')";
        $result2 = pg_query($conn, $sql2);
    }
    echo $result; 

    $sql3 = "SELECT orders.id_order, menu.name_menu, size.name_size, orders.quantity,
    cost_order(menu.price_menu, size.multiply, orders.quantity) AS cost
    FROM menu, size, orders
    WHERE menu.id_menu = orders.menu_order AND size.id_size = orders.size_order AND orders.client_order = '$new_id'";
    $result3 = pg_query($conn, $sql3);

    if (pg_num_rows($result3) > 0) {
        $out = array();
        while($row3 = pg_fetch_assoc($result3)) {
            $out[$row3["id_order"]] = $row3;
        }
    } else {
        echo "0";
    }

    $sql4 = "SELECT * FROM cost_orders('$new_id')";
    $result4 = @pg_query($conn, $sql4);
    
    if (pg_num_rows($result4) > 0){
        $row4 = pg_fetch_assoc($result4);
    } else {
        echo "0";
    }

    $newOrder = '';
    foreach ($out as $value) {
        $newOrder .=
            $value["name_menu"] . ' ('
            . $value["name_size"] . '), '
            . $value["quantity"] . ' шт. = '
            . $value["cost"] . ' грн.'
            . "\r\n";
    }
    foreach ($row4 as $value) {$newOrder .= 'Всего: ' . $value  . ' грн.';}

    // адрес почты куда придет письмо
    $address = "zatmenie8@gmail.com";
    $subject = "Заказ пиццы";
    // текст письма
    $note_text = "\r\nИмя: $name \r\nНомер телефона: $phone \r\nДополнительная информация: \r\n$newOrder";

    if (isset($phone) && isset($newOrder)) {
        mail($address, $subject, $note_text,"Content-type:text/plain;utf-8");
    }

    $note_text2 = "Уважаемый(ая) $name, Ваше письмо отправленно успешно. \r\nСпасибо. Вам скоро ответят на почту. \r\nВаш заказ\r\n$newOrder";
    if (isset($name) && isset($newOrder)) {
        mail($mail, $subject, $note_text2,"Content-type:text/plain;utf-8");
    }
}

function closeOrder() {
    $id = $_POST['id'];
    $conn = connect();
    $sql = "UPDATE orders SET status = 'FALSE' WHERE client_order = '$id'";

    $result = pg_query($conn, $sql) or die("Error query close Order");
}

function queryDay() {
    $conn = connect();
    $sql = "SELECT date, COUNT(id_order)
            FROM orders 
            GROUP BY date
            ORDER BY date";
    $result = pg_query($conn, $sql) or die("Error query");

    if (pg_num_rows($result) > 0) {
        $out = array();
        while($row = pg_fetch_assoc($result)) {
            $out[$row["date"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
}

function queryNoOrder() {
    $conn = connect();
    $sql = "SELECT id_menu, name_menu
            FROM menu 
            LEFT JOIN orders ON menu.id_menu = orders.menu_order
            WHERE orders.menu_order IS NULL";
    $result = pg_query($conn, $sql) or die("Error query");

    if (pg_num_rows($result) > 0) {
        $out = array();
        while($row = pg_fetch_assoc($result)) {
            $out[$row["id_menu"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
}

function queryPopularMenu() {
    $conn = connect();
    $sql = "SELECT menu.name_menu, SUM(orders.quantity) AS count
            FROM menu, orders
            WHERE orders.menu_order = menu.id_menu
            GROUP BY menu.name_menu
            ORDER BY count DESC";
    $result = pg_query($conn, $sql) or die("Error query");

    if (pg_num_rows($result) > 0) {
        $out = array();
        while($row = pg_fetch_assoc($result)) {
            $out[$row["name_menu"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
}

function queryMaxPrice() {
    $conn = connect();
    $sql = "SELECT name_menu, price_menu
            FROM menu
            ORDER BY price_menu DESC";
    $result = pg_query($conn, $sql) or die("Error query");

    if (pg_num_rows($result) > 0) {
        $out = array();
        while($row = pg_fetch_assoc($result)) {
            $out[$row["name_menu"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
}