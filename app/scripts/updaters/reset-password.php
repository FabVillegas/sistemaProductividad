<?php
  require_once '../config.php';
  require_once '../password.php';
  session_start();


  $id_user = $_GET['id_user'];
  $options = [
    'cost' => 12,
  ];
  $password = password_hash('u$aria', PASSWORD_BCRYPT, $options);

  $update_query = "UPDATE user
                   SET password = '$password'
                   WHERE id_user = '$id_user'";
  $update_response = $mysqli->query($update_query);

  echo $json_response = json_encode($update_response);

?>
