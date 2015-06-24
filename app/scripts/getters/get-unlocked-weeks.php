<?php

  require_once '../config.php';
  session_start();

  $id_user = $_GET['id_user'];

  $query = "SELECT * FROM unlocked_week WHERE id_user = '$id_user' ORDER BY begin_date DESC";
  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }

  echo $json_response = json_encode($result);

?>
