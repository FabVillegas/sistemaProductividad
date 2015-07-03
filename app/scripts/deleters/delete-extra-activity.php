<?php

  require_once '../config.php';

  $id_activity = (int)$_GET['id_activity'];


  $delete_query = "DELETE FROM activity_extra WHERE id_activity = $id_activity;";
  $result = $mysqli->query($delete_query);

  echo $json_response = json_encode($result);

  $delete_query = "DELETE FROM daily_record WHERE id_activity = '$id_activity'";
  $result = $mysqli->query($delete_query);

  echo $json_response = json_encode($result);

?>
