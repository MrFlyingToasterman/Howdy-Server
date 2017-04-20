<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="css/login_window.min.css">
  <link rel="stylesheet" type="text/css" href="css/animate.css">
  <meta charset="utf-8">
  <title>Register</title>
</head>
<body>
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/jquery.particleground.min.js"></script>
  <script type="text/javascript">
  $('body').particleground();
  </script>
  <div class="register_window_container">
    <section class="well">
    <img class="animated wobble logo" src="images/logo_text_transparent.png">
    <p><b>Howdy, you wanna get an account ?</b></p>
    <form name="register_form" method="post" enctype="multipart/form-data" action="register_window.php">
      <p>Username</p>
      <p><input type="text" name="user_name" required="true"></p>
      <p>Password</p>
      <p><input type="password" name="user_password" required="true"></p>
      <p><input class="btn btn-primary" name="login_submit" type="submit" value="Register">
    </form>
    <?php
    if (isset($_POST["user_name"])) {
          $username = $_POST["user_name"];
          $password = $_POST["user_password"];

          //Speicher in MySQL DB
          $pdo = new PDO('mysql:host=localhost;dbname=HowdyDB', 'Rainer', 'data');
          $statement = $pdo->prepare("INSERT INTO tbl_Benutzer (Username, Passwort) VALUES (?, ?)");
          $statement->execute(array($username, $password));
    }
    ?>
    </section>
  </div>
  <?php include ("footer.php"); ?>
</body>
</html>
