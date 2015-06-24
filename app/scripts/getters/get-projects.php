<?php

  require_once '../config.php';
  session_start();

  $query = "SELECT P.id_project, P.name, P.description, P.begin_date, P.end_date,
              P.project_type, P.creator, P.creation_date, P.status, A.total_hrs_planned,
              A.total_minutes_planned, A.total_hrs_reported, A.total_minutes_reported, AE.total_extra_hrs, AE.total_extra_minutes
            FROM (
               SELECT P.id_project, P.name, P.description, P.begin_date, P.end_date, P.project_type, P.creator, P.creation_date, P.status
               FROM project as P
               WHERE P.status != 'Cancelado' and P.status != 'Terminado'
            ) P
            LEFT JOIN (
               SELECT
                A.id_project,
                SUM(hrs_planned) as total_hrs_planned,
                SUM(minutes_planned) as total_minutes_planned,
                SUM(hrs_reported) as total_hrs_reported,
                SUM(minutes_reported) as total_minutes_reported
               FROM activity_planned as A
               GROUP BY A.id_project
            ) A ON P.id_project = A.id_project
            LEFT JOIN (
               SELECT
                AE.id_project,
                SUM(hrs_reported) as total_extra_hrs,
                SUM(minutes_reported) as total_extra_minutes
               FROM activity_extra as AE
               GROUP BY AE.id_project
            ) AE ON P.id_project = AE.id_project
            ORDER BY P.id_project";
  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);
?>
