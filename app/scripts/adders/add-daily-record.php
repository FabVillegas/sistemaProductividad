<?php

  require_once '../config.php';

  $id_user = (int)$_GET['id_user'];
  $id_activity = (int)$_GET['id_activity'];
  $today = $_GET['today'];
  $name_activity = $_GET['name_activity'];
  $hrs_reported = (int)$_GET['hrs_reported'];
  $minutes_reported = (int)$_GET['minutes_reported'];
  $type = $_GET['type'];

  $query = "INSERT INTO
            	daily_record(id_user, id_activity, day_of_record, name_activity, type, hrs_reported, minutes_reported)
            VALUES ($id_user, $id_activity, '$today', '$name_activity', '$type', $hrs_reported, $minutes_reported)
            ON DUPLICATE KEY
            UPDATE hrs_reported = ( hrs_reported + $hrs_reported ), minutes_reported = ( minutes_reported + $minutes_reported )";

  $queryAnswer = $mysqli->query($query);
  echo $json_response = json_encode($queryAnswer);

?>
