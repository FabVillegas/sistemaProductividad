<?php

  require_once '../config.php';

  $user_email = $_GET['email'];
  $user_name = $_GET['name'];
  $user_lastname = $_GET['lastname'];
  $user_photo = $_GET['photo'];
  $user_privilege = $_GET['privilege'];
  $user_id = (int)$_GET['id'];
  $user_hrs = (int)$_GET['hrs_to_complete'];
  $user_superior = (int)$_GET['id_superior'];

  $update_query = "UPDATE user
                   SET
                    email='$user_email',name='$user_name',lastname='$user_lastname',
                    photo='$user_photo',privilege='$user_privilege',hrs_to_complete='$user_hrs',id_superior=$user_superior
                   WHERE id_user=$user_id";

  $result = $mysqli->query($update_query);
  echo $json_response = json_encode($result);

?>
