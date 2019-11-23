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
    client.name_client, client.phone, client.email, 
    street.name_street, street.price_delivery, client.house,
    client.apartment, menu.name_menu, orders.quantity, size.name_size,
    cost_order(menu.price_menu, size.multiply, orders.quantity) AS Cost
    
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
    $oimg = $_POST['oimg'];
    $sql = "UPDATE menu SET name_menu = '$name', price_menu = '$price', weight = '$oweight' WHERE id_menu = '$id'";
    $result = @pg_query($conn, $sql) or die("Error query to update one goods");

    if($_FILES[$oimg]["size"] > 1024*3*1024){
        echo ("Размер файла превышает три мегабайта");
        exit;
    }
    // Проверяем загружен ли файл
    if(is_uploaded_file($_FILES[$oimg]["tmp_name"])){
        // Если файл загружен успешно, перемещаем его
        // из временной директории в конечную
        move_uploaded_file($_FILES[$oimg]["tmp_name"], "img/pizza/".$_FILES[$oimg]["name"]);
    } else {
        echo("Ошибка загрузки файла");
    }
}

function newGoods(){
    $conn = connect();
    $name = $_POST['oname'];
    $price = $_POST['oprice'];
    $oweight = $_POST['oweight'];
    $sql = "INSERT INTO menu(name_menu, price_menu, weight) VALUES('$name', '$price', '$oweight')";

    $result = @pg_query($conn, $sql) or die("Error query to insert one goods");

    if($_FILES["oimg"]["size"] > 1024*3*1024){
        echo ("Размер файла превышает три мегабайта");
        exit;
    }
    // Проверяем загружен ли файл
    if(is_uploaded_file($_FILES["oimg"]["tmp_name"])){
        // Если файл загружен успешно, перемещаем его
        // из временной директории в конечную
        move_uploaded_file($_FILES["oimg"]["tmp_name"], "img/pizza/".$_FILES["oimg"]["name"]);
    } else {
        echo("Ошибка загрузки файла");
    }
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
    echo $new_id;

    for ($i = 0; $i < count($cart); $i++) {
        $id_menu = $cart[$i]['id_menu'];
        $id_size = $cart[$i]['id_size'];
        $quantity = $cart[$i]['quantity'];
        $sql = "INSERT INTO orders (menu_order, size_order, client_order, date, status, quantity)
            VALUES ('$id_menu', '$id_size', '$new_id', NOW(), 'true', '$quantity')";
        $result2 = pg_query($conn, $sql);
    }
}