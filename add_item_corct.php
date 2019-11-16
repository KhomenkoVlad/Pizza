<?php include("header.inc.html"); ?>
<?php include("nav.inc.html"); ?>

<?php
$connection = @pg_connect("host=localhost port=5432 dbname=Pizzeria user=postgres password=admin") or die("Error connecttion PostgreSQL");

if($connection){
    echo "<p>Connection!</p>";
}

$sql="INSERT INTO menu (name_menu, price_menu, weight) VALUES (";
$sql .= "'".$_REQUEST["name_menu"]."', ";
$sql .= "'".$_REQUEST["price_menu"]."', ";
$sql .= "'".$_REQUEST["weight"]."')";

$result = @pg_query($connection, $sql) or die("Error execute query");
if($result){
	echo "Блюдо добавлено";
}
?>

<p><strong>Номер: </strong><br>
    <?php echo $_REQUEST["id_menu"]; ?></p>
<p><strong>Название: </strong><br>
    <?php echo $_REQUEST["name_menu"]; ?></p>
<p><strong>Цена: </strong><br>
    <?php echo $_REQUEST["price_menu"]; ?></p>
<p><strong>Вес: </strong><br>
    <?php echo $_REQUEST["weight"]; ?></p>

<?php include("footer.inc.html"); ?>
