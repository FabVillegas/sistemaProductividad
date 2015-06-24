<?php

  require_once '../config.php';

  $query = "SELECT name, lastname, email, hrs_to_complete, id_user, photo, privilege,id_superior FROM user WHERE is_active=1";
  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
