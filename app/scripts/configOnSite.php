<?php
  session_start();
  $dsn = 'mysql:dbname=producti_productividadUsaria_db;host=localhost';
  $user = 'productividad';
  $password = '8$uPJS3$Ta),';

  try {
      $mysqli = new PDO($dsn, $user, $password);
  } catch (PDOException $e) {
      echo 'Connection failed: ' . $e->getMessage();
  }
?>
