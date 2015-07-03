<?php

  require_once '../config.php';

  $id_project = $_GET['id_project'];
  $id_user = $_GET['id_user'];
  $begin_date = $_GET['begin_date'];
  $end_date = $_GET['end_date'];
  $name = $_GET['name'];
  $hrs_reported = $_GET['hrs_reported'];
  $minutes_reported = $_GET['minutes_reported'];
  $comments = $_GET['comments'];

  $insert_query = "INSERT INTO activity_extra
                    (id_project, id_user, begin_date, end_date, name, hrs_reported, minutes_reported, comments)
                  VALUES ('$id_project','$id_user','$begin_date','$end_date','$name','$hrs_reported','$minutes_reported','$comments')";

  $result = $mysqli->query($insert_query);
  echo $json_response = $mysqli->lastInsertId();
  
?>
