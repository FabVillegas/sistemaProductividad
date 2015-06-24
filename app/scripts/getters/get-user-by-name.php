<?php

    require_once '../config.php';
    session_start();

    $email = $_SESSION['email'];
    $query = "SELECT id_user, name, hrs_to_complete FROM user WHERE email='$email'";
    $answer = $mysqli->query($query);
    $result = array();
    foreach( $answer as $row ){
      array_push($result,$row);
    }
    echo $json_response = json_encode($result);
    
?>
