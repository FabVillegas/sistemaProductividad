<?php

  require_once '../config.php';

  $id_project = $_GET['id_project'];

  $query = "SELECT DISTINCT U.id_user, U.name, U.photo FROM user as U, activity_planned as A WHERE U.id_user = A.id_user and A.id_project = '$id_project'";
  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
