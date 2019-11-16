<?php include("header.inc.html"); ?>
<?php include("nav.inc.html"); ?>
<div class="mini-cart">
</div>
<section class="main-catalog">
	<!--div class="catalog-item">
		<img src="img/pizza/Пицца-кебаб.png" alt="pizza">
		<p>Пицца-кебаб</p-->
	</div>
	<?php 
		/*$connection = @pg_connect("host=localhost port=5432 dbname=Pizzeria user=postgres password=admin") or die("Error connecttion PostgreSQL");
		$sql="SELECT name_menu, price_menu, weight FROM menu";
		$result = @pg_query($connection, $sql) or die("Error execute query");
		while($arr = pg_fetch_array($result)){
		$name_menu = $arr["name_menu"];
		$price_menu = $arr["price_menu"];
		$weight = $arr["weight"];
		$display_block .= "
		<div class=\"catalog-item\">
			<img src=\"img/pizza/$name_menu.png\" alt=\"pizza\">
			<p>$name_menu ($weight)</p>
			<p>$price_menu</p>
			<button>Добавить в корзину</button>
		</div>
		";}
		echo "$display_block";*/
	?>
</section>
<?php include("footer.inc.html"); ?>