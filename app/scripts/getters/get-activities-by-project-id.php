<?php

  require_once '../config.php';

  $id = $_GET['id_project'];
  $query = "SELECT A.id_activity, A.id_activity, A.id_project, A.id_user, U.name as employee,
                   A.begin_date, A.end_date, A.name as activity_name, A.hrs_planned, A.minutes_planned,
                   A.hrs_reported, A.minutes_reported, A.comments, A.status
            FROM `activity_planned` as A,`user` as U
            WHERE A.id_user = U.id_user and A.id_project = $id
            ORDER BY A.begin_date ASC";
  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
