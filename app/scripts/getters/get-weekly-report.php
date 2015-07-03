<?php

  require_once '../config.php';

  $id_user = $_GET['id_user'];
  $monday_date = $_GET['monday_date'];
  $friday_date = $_GET['friday_date'];

  $query = "
    SELECT *
    FROM daily_record
    WHERE id_user = $id_user AND (day_of_record BETWEEN '$monday_date' AND '$friday_date');
  ";

  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
