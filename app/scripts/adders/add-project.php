<?php

  require_once '../config.php';
  session_start();

  $name = $_GET['projectName'];
  $type = $_GET['projectType'];
  $description = $_GET['projectDescription'];
  $beginDate = $_GET['projectBeginDate'];
  $endDate = $_GET['projectEndDate'];
  $creator = $_SESSION['email'];
  $creationDate = date("Y-m-d");
  echo $creationDate;
  $query = "INSERT INTO `project`(`name`, `description`, `begin_date`, `end_date`, `project_type`, `creator`, `creation_date`, `status`)
            VALUES ('$name','$description','$beginDate','$endDate','$type','$creator','$creationDate','Iniciado')";
  $result = $mysqli->query($query);
  //$count = $result->rowCount();
  echo $json_response = json_encode($result);

?>
