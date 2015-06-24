<?php

  require_once '../config.php';

  $id_user = $_GET['id_user'];
  $begin_date = $_GET['begin_date'];
  $end_date = $_GET['end_date'];

  $select_query = "SELECT
                    AE.id_activity, P.id_project, AE.id_user, P.name as project_name, AE.begin_date,
                    AE.end_date, AE.hrs_reported, AE.minutes_reported, AE.comments,
                    AE.name as activity_name
                  FROM activity_extra as AE, project as P
                  WHERE AE.id_project = P.id_project and AE.id_user = '$id_user' and
                  (AE.begin_date BETWEEN '$begin_date' AND '$end_date' or AE.end_date BETWEEN '$begin_date' AND '$end_date')";

  $answer = $mysqli->query($select_query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
