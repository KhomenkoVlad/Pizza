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
    $sql = "UPDATE menu SET name_menu = '$name', price_menu = '$price', weight = '$oweight' WHERE id_menu = '$id'";

    $result = @pg_query($conn, $sql) or die("Error query to update one goods");
}

function newGoods(){
    $conn = connect();
    $name = $_POST['oname'];
    $price = $_POST['oprice'];
    $oweight = $_POST['oweight'];
    $sql = "INSERT INTO menu(name_menu, price_menu, weight) VALUES('$name', '$price', '$oweight')";

    $result = @pg_query($conn, $sql) or die("Error query to insert one goods");
}

function addToOrders() {
    /*$conn = connect();
    $name = $_POST['iname'];
    $phone = $_POST['iphone'];
    $mail = $_POST['imail'];
    $street = $_POST['istreet'];
    $house = $_POST['ihouse'];
    $apart = $_POST['iapart'];

    $sql = "INSERT INTO client (name_client, phone, email, street_client, house, apartment) 
    VALUES ('$name', '$phone', '$mail', '$street', '$house', '$apart')";
    $result = @pg_query($conn, $sql) or die("Error add clients");*/
}