<?php

  require_once '../config.php';

  $user_email = $_GET['email'];
  $user_name = $_GET['name'];
  $user_lastname = $_GET['lastname'];
  $user_photo = $_GET['photo'];
  $user_privilege = $_GET['privilege'];
  $user_superior = $_GET['id_superior'];
  $user_hrs = (int)$_GET['hrs_to_complete'];

  $options = [
    'cost' => 11,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
  ];
  $password = password_hash('u$aria', PASSWORD_BCRYPT, $options);
  $salt = $options['salt'];
  $query = "INSERT INTO user(email, password, salt, name, lastname, photo, privilege, hrs_to_complete, id_superior)
            VALUES ('$user_email','$password','$salt','$user_name','$user_lastname','$user_photo','$user_privilege',$user_hrs, '$user_superior')";
  $result = $mysqli->query($query);
  //$result = $mysqli->affected_rows;
  echo $json_response = json_encode($result);

?>
