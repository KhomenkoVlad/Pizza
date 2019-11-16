<?php include("header.inc.html"); ?>
<?php include("nav.inc.html"); ?>
    <form enctype="multipart/form-data" action="add_item_corct.php" method="post">
        <p>Название:<br><input type="text" name="name_menu"></p>
        <p>Цена:<br><input type="text" name="price_menu"></p>
        <p>Вес/Объем:<br><input type="text"  name="weight"></p>
        <p><input type="hidden" name="MAX_FILE_SIZE" value="30000" />
		Изображение:<br><input type="file" name="imag"></p>
        <p><input type="submit" value="Отправить"></p>
    </form>
<?php include("footer.inc.html"); ?>
