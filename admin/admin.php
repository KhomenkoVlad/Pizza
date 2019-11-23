<?php
require "auth.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <nav>
        <a href="admin.php?do=logout">Выход</a>
    </nav>
    <div id="goods-out" class="goods-out"></div>
    <h2>Пицца</h2>
    <form enctype="multipart/form-data" method="post">
        <p>Название: <input type="text" id="oname"></p>
        <p>Цена: <input type="text" id="oprice"></p>
        <p>Вес: <input type="text" id="oweight"></p>
        <input type="file" id="oimg">
        <p><button class="add-to-db">Обновить</button> <button class="del-goods">Удалить</button></p>
    </form>


    <br>
    <br>
    <br>
    <br>

    <form action="image.php" enctype="multipart/form-data" method="post">
        <p>
            Название: <input type="text" name="iname">
            <input type="file" name="oimg">
            <input type="submit" value="Отправить">
        </p>
    </form>

    <script src="js/jquery-3.2.1.min.js"></script>
<script src="js/admin.js"></script>
</body>
</html>