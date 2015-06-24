<?php
  require_once '../config.php';

  $id_activity = $_GET['id_activity'];
  $id_user = $_GET['id_user'];
  $activity_name = $_GET['activity_name'];
  $activity_comments = $_GET['activity_comments'];
  $activity_hrs_planned = $_GET['activity_hrs_planned'];
  $activity_mins_planned = $_GET['activity_mins_planned'];
  $activity_begin_date = $_GET['activity_begin_date'];
  $activity_end_date = $_GET['activity_end_date'];
  $activity_status = $_GET['activity_status'];

  $update_query = "UPDATE activity_planned
                   SET
                    id_user = '$id_user', name = '$activity_name', status = '$activity_status',
                    comments = '$activity_comments', hrs_planned = '$activity_hrs_planned', minutes_planned = '$activity_mins_planned',
                    begin_date = '$activity_begin_date', end_date = '$activity_end_date'
                   WHERE id_activity = $id_activity";
  $update_response = $mysqli->query($update_query);

  echo $json_response = json_encode($update_response);

?>
