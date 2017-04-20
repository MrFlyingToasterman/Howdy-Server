<?php

session_start();

  $db_server = "localhost";
  $db_username = "test";
  $db_password = "yolo";
  $connection = new mysqli($db_server,$db_username,$db_password);
  if ($connection->connect_error) {
      die("Connection to database failed: " . $connection->connect_error);
  } else {
    if(isset($_POST['login_submit'])){
            if(!empty($_POST['user_name']) && !empty($_POST['user_password'])){
                $get_username=mysqli_real_escape_string($conn,$_POST['user_name']);
                $get_password=mysqli_real_escape_string($conn,$_POST['user_password']);
                $sql="SELECT * FROM users WHERE username= '$get_username' AND user_password = '$get_password' ";

                if($result=mysqli_query($conn,$sql)){

                    if(mysqli_num_rows($result)==1) {
                        echo "Login erfolgreich";
                    }else {
                        echo "Falsche Nutzerdaten angegeben.";
                    }
                }else {
                    echo "Login Fehler.";
                }
            }else {
                echo "Bitte geben Sie Nutzer und Passwort ein.";
            }
        }
  }

?>

<!DOCTYPE html>
<html>
<head></head>
<body>

</body>
</html>
