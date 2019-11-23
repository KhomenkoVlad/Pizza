<?php
session_start();

if(isset($_GET['do']) && $_GET['do'] == 'logout'){
    unset($_SESSION['admin']);
    session_destroy();
}

if(!$_SESSION['admin']){
    header("Location: signin.php");
    exit;
}
