<?php
$action = $_POST['action'];

require_once 'function.php';

switch ($action) {
    case 'init':
        init();
        break;
    case 'initSize':
        initSize();
        break;
    case 'initStreet':
        initStreet();
        break;
    case 'initOrders':
        initOrders();
        break;
    case 'selectOneGoods':
        selectOneGoods();
        break;
    case 'updateGoods':
        updateGoods();
        break;
    case 'newGoods':
        newGoods();
        break;
    case 'deleteGoods':
        deleteGoods();
        break;
    case 'addToOrders':
        addToOrders();
        break;
}