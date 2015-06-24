<?php

  require_once '../config.php';

  $id_user = (int)$_GET['id_user'];
  $begin = $_GET['begin'];
  $end = $_GET['end'];

  $query = "SELECT
              A.id_activity, A.name as activity_name, P.name as project_name,
              A.begin_date, A.end_date, A.hrs_planned, A.minutes_planned, A.hrs_reported,A.minutes_reported, A.comments, A.status
            FROM activity_planned as A, project as P
            WHERE A.id_project = P.id_project and A.id_user = $id_user and P.status != 'Cancelado' and  
              (A.begin_date BETWEEN '$begin' AND '$end' or A.end_date BETWEEN '$begin' AND '$end')";

  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);

?>
