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
    <title>Отчёты - Admin - Pizza Arzis</title>
</head>
<body>
<nav class="card-header">
    <div class="container">
        <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
                <a class="nav-link" href="index.php">Заказы</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="admin.php">Добавить</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="query.php">Отчёты</a>
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

<div class="row">
  <div class="col-3">
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Количество заказов за день</a>
      <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Ни разу не заказывали</a>
      <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Популярность блюд</a>
      <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Блюда по цене</a>
    </div>
</div>
<div class="col-9">
    <div class="tab-content" id="v-pills-tabContent">
      <div class="tab-pane fade query-data show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"></div>
      <div class="tab-pane fade query-no-order" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"></div>
      <div class="tab-pane fade query-popular" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"></div>
      <div class="tab-pane fade query-price" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"></div>
    </div>
  </div>
</div>
</div>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/query.js"></script>
</body>
</html>