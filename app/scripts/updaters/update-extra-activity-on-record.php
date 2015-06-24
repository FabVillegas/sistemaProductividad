<?php
  require_once '../config.php';

  $id_activity = $_GET['id_activity'];
  $activity_comments = $_GET['activity_comments'];
  $hrs_reported = $_GET['hrs_reported'];
  $minutes_reported = $_GET['mins_reported'];

  $update_query = "UPDATE activity_extra
                   SET
                    comments = '$activity_comments',
                    hrs_reported = '$hrs_reported', minutes_reported = '$minutes_reported'
                   WHERE id_activity = $id_activity";

  $update_response = $mysqli->query($update_query);
  echo $json_response = json_encode($update_response);

?>
