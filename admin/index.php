<?php
$do = '';
require "auth.php";

if ($_POST['submit']) {
    putenv("PGPASSWORD = admin");
    $dumpcmd = array("pg_dump", "-i", "-U", escapeshellarg("postgres"), "-F", "c", "-b", "-v", "-f", escapeshellarg("/backups/backup.sql"), escapeshellarg("Pizzeria"));
    exec( join(' ', $dumpcmd), $cmdout, $cmdresult );
    putenv("PGPASSWORD");
    if ($cmdresult != 0)
    {
        echo "error";
    }
    //echo proc_open('sudo -u root C:/Program Files/PostgreSQL/9.4/bin\pg_dump.exe --host localhost --port 5432 --username "postgres" --no-password  --format custom --blobs --encoding UTF8 --column-inserts --verbose --quote-all-identifiers --file "E:\sites\Pizza\admin\backups\backup1.backup" "Pizzeria"');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <nav>
        <a href="index.php?do=logout">Выход</a>
        <form class="form-signin" method="post">
            <input type="submit" name="submit" value="BackUp">
        </form>
    </nav>
    <div class="orders">

    </div>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/orders.js"></script>
</body>
</html>