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

    <h2>Добавить или редактировать пиццу</h2> <div id="goods-out" class="goods-out"></div>
    <form enctype="multipart/form-data" method="post">
        <p>Название: <input type="text" id="oname"></p>
        <p>Цена: <input type="text" id="oprice"></p>
        <p>Вес: <input type="text" id="oweight"></p>
        <p><button class="add-to-db">Обновить</button> <button class="del-goods">Удалить</button></p>
    </form>

    <h2>Добавить картинку</h2>
    <form action="image.php" enctype="multipart/form-data" method="post">
        <p>Название: <input type="text" name="iname"></p>
        <p><input type="file" name="oimg"></p>
        <p><input type="submit" value="Отправить"></p>
    </form>

    <script src="js/jquery-3.2.1.min.js"></script>
<script src="js/admin.js"></script>
</body>
</html>