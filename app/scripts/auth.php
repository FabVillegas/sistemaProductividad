<?php

  require_once './config.php';
  require_once './password.php';
  session_start();

  if(isset($_SESSION['logged']) && $_SESSION['logged'] == true){
    $email = $_SESSION['email'];
    $selectQuery = "SELECT * FROM user WHERE email = '$email'";
    $answer = $mysqli->query($selectQuery);
    $result = array();
    foreach( $answer as $row ){
      array_push($result,$row);
    }
    if($email == $result[0]['email']){
      $password = $result[0]['password'];
      if(password_verify($_SESSION['password'], $password)){
        echo json_encode(array('user' => $_SESSION['email'], 'id' => $_SESSION['id'], 'photo' => $result[0]['photo'],'logged' => true, 'privilege' => $_SESSION['privilege']));
      }
      else{
        echo json_encode(array('user' => $_SESSION['email'], 'logged' => false));
      }
    }
    else{
      echo json_encode(array('user' => $_SESSION['email'], 'logged' => false));
    }
  }
  else{
    echo $json_response = json_encode(array('logged' => false));
  }

?>
