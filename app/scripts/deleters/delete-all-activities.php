<?php

  require_once '../config.php';

  $id_project = (int)$_GET['id_project'];

  $delete_query = "DELETE FROM `activity_planned` WHERE id_project = $id_project";
  $result = $mysqli->query($delete_query);

  echo $json_response = json_encode($result);

?>
