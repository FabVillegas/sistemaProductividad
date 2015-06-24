<?php

  require_once '../config.php';

  $query = "SELECT id_project, name FROM project";
  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
