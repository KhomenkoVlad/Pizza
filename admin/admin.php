<?php
    require "auth.php";
?><!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
    >
    <link rel="stylesheet" href="css/style.css" class="href">
    <title>Admin - Add goods</title>
</head>
<body>
<nav class="card-header">
    <div class="container">
        <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
                <a class="nav-link" href="index.php">Главная</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="admin.php">Добавить</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="index.php?do=logout">Выход</a>
            </li>
        </ul>
    </div>
</nav>

<div class="container">
    <h1 class="bd-title">Добавить или редактировать</h1>

    <form enctype="multipart/form-data" method="post">
        <div id="goods-out" class="goods-out"></div>

        <div class="form-group">
            <label for="oname">Название:</label>
            <input type="text" id="oname" class="form-control">
        </div>

        <div class="form-group">
            <label for="oprice">Цена:</label>
            <input type="text" id="oprice" class="form-control">
        </div>

        <div class="form-group">
            <label for="oweight">Вес:</label>
            <input type="text" id="oweight" class="form-control">
        </div>

        <div class="form-group">
            <button class="add-to-db btn btn-primary">Обновить</button>
            <button class="del-goods btn btn-primary">Удалить</button>
        </div>
    </form>

    <h3 class="bd-title-h3">Добавить картинку</h3>
    <form action="image.php" enctype="multipart/form-data" method="post">
        <div class="form-group">
            <label for="iname">Название:</label>
            <input type="text" name="iname" class="form-control">
        </div>
        <div class="form-group">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Загрузить</span>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile01"
                           aria-describedby="inputGroupFileAddon01">
                    <label class="custom-file-label" for="inputGroupFile01">Выбрать файл</label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary btn" value="Отправить">
        </div>
    </form>
</div>

<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/admin.js"></script>
</body>
</html>