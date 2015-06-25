<?php
  require_once '../config.php';

  $id_activity = $_GET['id_activity'];
  $begin_date = $_GET['begin_date'];
  $end_date = $_GET['end_date'];
  $name = $_GET['name'];
  $comments = $_GET['comments'];

  $update_query = "UPDATE activity_extra
                   SET
                    comments = '$comments', begin_date = '$begin_date', end_date = '$end_date', name = '$name'
                   WHERE id_activity = $id_activity";

  $update_response = $mysqli->query($update_query);
  echo $json_response = json_encode($update_response);

?>
