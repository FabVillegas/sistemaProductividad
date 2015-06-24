<?php

  require_once '../config.php';

  $id_user = $_GET['id_user'];
  $begin_date = $_GET['begin_date'];
  $end_date = $_GET['end_date'];

  $query = "INSERT INTO unlocked_week(id_user,begin_date,end_date)
            VALUES ('$id_user','$begin_date','$end_date')";
  $result = $mysqli->query($query);
  echo $json_response = json_encode($result);

?>
