<?php
session_start();

if ($_POST['submit']) {
    if ('admin' == $_POST['user'] AND  md5('admin') == md5($_POST['pass'])) {
        $_SESSION['admin'] = true;
        header("Location: index.php");
        exit;
    } else {
        echo '<p>Логин или пароль неверны!</p>';
    }
}
var_dump($_POST);

if($_SESSION['admin']){
    header("Location: index.php");
    exit;
}

?><!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <title>Signin Template · Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
    >

    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>
</head>
<body class="text-center">
<div class="container">
    <div class="row justify-content-md-center">
        <div class="col-sm-4">
            <form class="form-signin" method="post">
                <h1 class="h3 mb-3 font-weight-normal">Войдите</h1>
                <label for="inputUser" class="sr-only">
                    Имя
                </label>
                <input type="text" id="inputUser" class="form-control" placeholder="Имя" name="user" required autofocus>

                <label for="inputPassword" class="sr-only">
                    Пароль
                </label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Пароль" name="pass" required>

                <input type="submit" name="submit" class="btn btn-lg btn-primary btn-block" value="Войти" />
            </form>
        </div>
    </div>
</div>
</body>
</html>