<?php

  require_once '../config.php';
  session_start();

  $idProject = $_GET['id_project'];
  $nameUser = $_GET['name_user'];
  $beginDate = $_GET['begin_date'];
  $endDate = $_GET['end_date'];
  $nameActivity = $_GET['name_activity'];
  $hrs_planned = (int)$_GET['hrs_planned'];
  $mins_planned = (int)$_GET['mins_planned'];
  $comments = $_GET['comments'];

  $userID_query = "SELECT `id_user` FROM `user` WHERE name = '$nameUser'";
  $queryAnswer = $mysqli->query($userID_query);
  $result_user = array();
  foreach( $queryAnswer as $row ){
    array_push($result_user,$row);
  }
  $idUser = (int)$result_user[0]['id_user'];

  $insertActivity_query = "INSERT INTO
                          `activity_planned`(`id_project`, `id_user`, `begin_date`, `end_date`, `name`, `hrs_planned`, `minutes_planned`, `hrs_reported`, `minutes_reported`, `comments`,`status`)
                          VALUES ($idProject,$idUser,'$beginDate','$endDate','$nameActivity',$hrs_planned, $mins_planned,0,0,'$comments','Iniciado')";
  $response = $mysqli->query($insertActivity_query);
  echo $json_response = json_encode($response);

?>
