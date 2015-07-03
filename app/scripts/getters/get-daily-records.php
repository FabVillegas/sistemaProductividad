<?php

  require_once '../config.php';

  $id_user = $_GET['id_user'];
  $today_date = $_GET['today_date'];

  $select_query = "SELECT *
                  FROM daily_record
                  WHERE id_user = $id_user AND day_of_record = '$today_date'";

  $answer = $mysqli->query($select_query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
