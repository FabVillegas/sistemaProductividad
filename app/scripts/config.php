<?php
/*
  session_start();
  $dsn = 'mysql:dbname=productividadusaria_db;host=localhost';
  $user = 'productividad';
  $password = '8$uPJS3$Ta),';

  try {
      $mysqli = new PDO($dsn, $user, $password);
  } catch (PDOException $e) {
      echo 'Connection failed: ' . $e->getMessage();
  }
  */

  $dsn = 'mysql:dbname=productividadusaria_db;host=localhost';
  $user = 'fab';
  $password = '141009';

  try {
      $mysqli = new PDO($dsn, $user, $password);
  } catch (PDOException $e) {
      echo 'Connection failed: ' . $e->getMessage();
  }


  /*
  $host = 'localhost';
  $username = 'fab';
  $password = '141009';
  $database = 'productividadusaria_db';
  $mysqli = mysql_connect($host,$username,$password,$database);
  */
  //session_start();
  /*
  $host = '198.12.149.25';
  $username = 'producti_user';
  $password = '9oae4um.6';
  $database = 'producti_productividadUsaria_db';
  $mysqli = mysql_connect($host,$username,$password,$database);
  */
?>
