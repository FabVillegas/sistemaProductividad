<?php
  require_once '../config.php';

  $id_project = (int)$_GET['id_project'];
  $project_name = $_GET['project_name'];
  $project_status = $_GET['project_status'];
  $project_begin_date = $_GET['project_begin_date'];
  $project_end_date = $_GET['project_end_date'];

  $update_query = " UPDATE `project`
                    SET name='$project_name',begin_date='$project_begin_date',end_date='$project_end_date',status='$project_status'
                    WHERE id_project = $id_project";

  $update_response = $mysqli->query($update_query);

  echo $json_response = json_encode($update_response);

?>
