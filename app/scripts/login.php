<?php

  require_once './config.php';
  require_once './password.php';
  session_start();

  if(isset($_GET['name']) && isset($_GET['password'])){
    $email = $_GET['name'];
    $selectQuery = "SELECT * FROM user WHERE email = '$email'";
    $answer = $mysqli->query($selectQuery);
    $result = array();
    foreach( $answer as $row ){
      array_push($result,$row);
    }
    if($email == $result[0]['email']){
      $password = $result[0]['password'];
      if(password_verify($_GET['password'], $password)){
        $_SESSION['email'] = $email;
        $_SESSION['password'] = $_GET['password'];
        $_SESSION['logged'] = true;
        $_SESSION['privilege'] = $result[0]['privilege'];
        $_SESSION['id'] = $result[0]['id_user'];
        echo json_encode(array('logged' => true, 'privilege' => $_SESSION['privilege']));
      }
      else{
        $_SESSION['logged'] = false;
        echo json_encode(array('logged' => false));
      }
    }
    else{
      $_SESSION['logged'] = false;
      echo json_encode(array('logged' => false));
    }
  }
  else{
    echo $json_response = json_encode(array('logged' => false));
  }

?>
