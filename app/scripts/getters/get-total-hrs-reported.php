<?php
  require_once '../config.php';
  session_start();

  $query;
  $id = (int)$_SESSION['id'];
  if($_SESSION['privilege'] == 'Administrador de Proyecto'){
    $query = "SELECT U.id_user, U.name, U.lastname, U.photo, U.hrs_to_complete, A.total_hrs_planned,
                A.total_minutes_planned, A.total_hrs_reported, A.total_minutes_reported, AE.total_extra_hrs, AE.total_extra_minutes
              FROM (
                 SELECT U.id_user, U.name, U.lastname, U.photo, U.hrs_to_complete
                 FROM user as U
                 WHERE U.is_active = 1 and U.id_user != 11 and U.id_superior = $id
              ) U
              LEFT JOIN (
                 SELECT A.id_user,
                 SUM(hrs_planned) as total_hrs_planned, SUM(minutes_planned) as total_minutes_planned,
                 SUM(hrs_reported) as total_hrs_reported, SUM(minutes_reported) as total_minutes_reported
                 FROM activity_planned as A
                 GROUP BY A.id_user
              ) A ON U.id_user = A.id_user
              LEFT JOIN (
                 SELECT AE.id_user, SUM(hrs_reported) as total_extra_hrs, SUM(minutes_reported) as total_extra_minutes
                 FROM activity_extra as AE
                 GROUP BY AE.id_user
              ) AE ON U.id_user = AE.id_user";
  }
  else if($_SESSION['privilege'] == 'Administrador de Sistema'){
    $query = "SELECT U.id_user, U.name, U.lastname, U.photo, U.hrs_to_complete, A.total_hrs_planned,
                A.total_minutes_planned, A.total_hrs_reported, A.total_minutes_reported, AE.total_extra_hrs, AE.total_extra_minutes
              FROM (
                 SELECT U.id_user, U.name, U.lastname, U.photo, U.hrs_to_complete
                 FROM user as U
                 WHERE U.is_active = 1 and U.id_user != 11
              ) U
              LEFT JOIN (
                 SELECT A.id_user,
                 SUM(hrs_planned) as total_hrs_planned, SUM(minutes_planned) as total_minutes_planned,
                 SUM(hrs_reported) as total_hrs_reported, SUM(minutes_reported) as total_minutes_reported
                 FROM activity_planned as A
                 GROUP BY A.id_user
              ) A ON U.id_user = A.id_user
              LEFT JOIN (
                 SELECT AE.id_user, SUM(hrs_reported) as total_extra_hrs, SUM(minutes_reported) as total_extra_minutes
                 FROM activity_extra as AE
                 GROUP BY AE.id_user
              ) AE ON U.id_user = AE.id_user";
  }
  $answer = $mysqli->query($query);
  $result = array();
  foreach( $answer as $row ){
    array_push($result,$row);
  }
  echo $json_response = json_encode($result);
?>
