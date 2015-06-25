<?php

  require_once '../config.php';

  $id = $_GET['id_project'];
  $select_query = "SELECT AE.id_activity, AE.id_project, AE.id_user, U.name as employee,
                   AE.begin_date, AE.end_date, AE.name as activity_name,
                   AE.hrs_reported, AE.minutes_reported, AE.comments
            FROM activity_extra as AE, user as U
            WHERE AE.id_user = U.id_user and AE.id_project = $id
            ORDER BY AE.begin_date ASC";

  $answer = $mysqli->query($select_query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
