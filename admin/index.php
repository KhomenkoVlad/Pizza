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
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="css/style.css" class="href">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <title>Заказы - Admin - Pizza Arzis</title>
</head>
<body>
<nav class="card-header">
    <div class="container">
        <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
                <a class="nav-link active" href="index.php">Заказы</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="admin.php">Добавить</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="query.php">Отчёты</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="index.php?do=logout">Выход</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../">На главную</a>
            </li>
        </ul>
    </div>
</nav>
<br>
<div class="container">
<ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#home">Активные</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#menu1">Завершённые</a>
    </li>
  </ul>

  <div class="tab-content">
    <div id="home" class="container tab-pane active"><br>
        <div class="orders-active">
        </div>
    </div>
    <div id="menu1" class="container tab-pane fade"><br>
        <div class="orders-close">
        </div>
    </div>
  </div>
</div>


    
    

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/orders.js"></script>
</body>
</html>