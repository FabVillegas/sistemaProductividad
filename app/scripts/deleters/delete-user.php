
<?php

  require_once '../config.php';

  $id_user = (int)$_GET['id_user'];

  $delete_query = "UPDATE user
                   SET is_active=0
                   WHERE id_user=$id_user";
  $result = $mysqli->query($delete_query);
  //$result = $mysqli->affected_rows;
  echo $json_response = json_encode($result);

?>
