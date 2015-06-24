<?php

  require_once '../config.php';

  $id_activity = (int)$_GET['id_activity'];

  $delete_query = "DELETE FROM `activity_planned` WHERE id_activity = $id_activity";
  $result = $mysqli->query($delete_query);

  echo $json_response = json_encode($result);

?>
