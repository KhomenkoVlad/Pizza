<?php
$do = '';
require "auth.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
    >
    <title>Title</title>
</head>
<body>
<nav class="card-header">
    <div class="container">
        <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
                <a class="nav-link active" href="index.php">Главная</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="admin.php">Добавить</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="index.php?do=logout">Выход</a>
            </li>
        </ul>
    </div>
</nav>
    <div class="orders">

    </div>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/orders.js"></script>
</body>
</html>