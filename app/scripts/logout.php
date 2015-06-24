<?php

  require_once './config.php';
  session_start();

  $_SESSION['email'] = null;
  $_SESSION['password'] = null;
  $_SESSION['logged'] = false;
  $_SESSION['privilege'] = null;

  echo $json_response = json_encode(array('logged' => false));

?>
