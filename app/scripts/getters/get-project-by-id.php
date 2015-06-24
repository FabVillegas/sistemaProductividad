<?php

  require_once '../config.php';
  session_start();

  $id = $_GET['id_project'];
  $query = "SELECT * FROM `project` WHERE `id_project` = $id";
  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }

  echo $json_response = json_encode($result);

?>
