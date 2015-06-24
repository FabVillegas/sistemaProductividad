<?php

  require_once '../config.php';

  $firstDay = $_GET['firstDay'];
  $id_user = $_GET['id_user'];

  $query = "CALL hrs_monthly_report('$firstDay','$id_user');";
  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
