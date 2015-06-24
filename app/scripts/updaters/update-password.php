<?php
  require_once '../config.php';
  require_once '../password.php';
  session_start();


  $new_password = $_GET['new_password'];
  $user_email = $_SESSION['email'];
  $options = [
    'cost' => 12,
  ];
  $password = password_hash($new_password, PASSWORD_BCRYPT, $options);
  $salt = password_hash($user_email, PASSWORD_BCRYPT, ["cost" => 4]);

  $update_query = "UPDATE user
                   SET password = '$password', salt = '$salt'
                   WHERE email = '$user_email'";
  $update_response = $mysqli->query($update_query);

  echo $json_response = json_encode($update_response);

?>
